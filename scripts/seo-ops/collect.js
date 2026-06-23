#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const DEFAULT_OUTPUT_DIR = 'Pentridge AI Search Sprint/06 Reports';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';

function stripTrailingSlash(value) {
  return value.replace(/\/+$/, '');
}

function boolEnv(name, fallback = false) {
  const value = process.env[name];
  if (value == null || value === '') return fallback;
  return ['1', 'true', 'yes', 'y'].includes(value.toLowerCase());
}

function intEnv(name, fallback) {
  const value = Number.parseInt(process.env[name] || '', 10);
  return Number.isFinite(value) ? value : fallback;
}

function parseEnvLine(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return null;
  const index = trimmed.indexOf('=');
  if (index === -1) return null;
  const key = trimmed.slice(0, index).trim();
  let value = trimmed.slice(index + 1).trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }
  return { key, value };
}

async function loadLocalEnv() {
  const envPath = path.join(ROOT, '.env.seo');
  try {
    const text = await fs.readFile(envPath, 'utf8');
    for (const line of text.split(/\r?\n/)) {
      const parsed = parseEnvLine(line);
      if (parsed && !process.env[parsed.key]) {
        process.env[parsed.key] = parsed.value;
      }
    }
    return { loaded: true, path: envPath };
  } catch {
    return { loaded: false, path: envPath };
  }
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function dateDaysAgo(days) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}

function decodeBasicEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripTags(value) {
  return decodeBasicEntities(value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

function parseAttributes(tag) {
  const attrs = {};
  const attrPattern = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/g;
  let match;
  while ((match = attrPattern.exec(tag))) {
    attrs[match[1].toLowerCase()] = decodeBasicEntities(match[3] ?? match[4] ?? match[5] ?? '');
  }
  return attrs;
}

function getMetaContent(html, name) {
  const target = name.toLowerCase();
  const metaPattern = /<meta\b[^>]*>/gi;
  let match;
  while ((match = metaPattern.exec(html))) {
    const attrs = parseAttributes(match[0]);
    if ((attrs.name || attrs.property || '').toLowerCase() === target) {
      return attrs.content || '';
    }
  }
  return '';
}

function getCanonical(html) {
  const linkPattern = /<link\b[^>]*>/gi;
  let match;
  while ((match = linkPattern.exec(html))) {
    const attrs = parseAttributes(match[0]);
    if ((attrs.rel || '').toLowerCase().split(/\s+/).includes('canonical')) {
      return attrs.href || '';
    }
  }
  return '';
}

function collectJsonLdTypes(value, out = new Set()) {
  if (Array.isArray(value)) {
    for (const item of value) collectJsonLdTypes(item, out);
    return out;
  }
  if (!value || typeof value !== 'object') return out;
  const type = value['@type'];
  if (Array.isArray(type)) {
    for (const item of type) out.add(String(item));
  } else if (type) {
    out.add(String(type));
  }
  for (const item of Object.values(value)) collectJsonLdTypes(item, out);
  return out;
}

function getSchemaTypes(html) {
  const types = new Set();
  const scriptPattern = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = scriptPattern.exec(html))) {
    try {
      const parsed = JSON.parse(match[1].trim());
      collectJsonLdTypes(parsed, types);
    } catch {
      types.add('Invalid JSON-LD');
    }
  }
  return [...types].sort();
}

function extractPageDiagnostics(html) {
  const title = stripTags((html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '');
  const description = getMetaContent(html, 'description');
  const robots = getMetaContent(html, 'robots');
  const canonical = getCanonical(html);
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => stripTags(match[1]));
  const schemaTypes = getSchemaTypes(html);
  return { title, description, robots, canonical, h1s, schemaTypes };
}

function parseSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>\s*([\s\S]*?)\s*<\/loc>/gi)].map((match) => decodeBasicEntities(match[1].trim()));
}

async function fetchText(url, options = {}) {
  const startedAt = Date.now();
  const response = await fetch(url, { redirect: 'follow', ...options });
  const text = await response.text();
  return {
    url,
    finalUrl: response.url,
    status: response.status,
    ok: response.ok,
    ms: Date.now() - startedAt,
    headers: Object.fromEntries(response.headers.entries()),
    text,
  };
}

async function fetchJson(url, options = {}) {
  const result = await fetchText(url, options);
  let json = null;
  try {
    json = result.text ? JSON.parse(result.text) : null;
  } catch {
    json = { parseError: true, raw: result.text.slice(0, 1000) };
  }
  return { ...result, json, text: undefined };
}

function pageIssues(page) {
  const issues = [];
  if (page.status >= 400) issues.push(`HTTP ${page.status}`);
  if (!page.title) issues.push('Missing title');
  if (page.title && page.title.length > 65) issues.push('Title over 65 chars');
  if (!page.description) issues.push('Missing meta description');
  if (page.description && page.description.length > 160) issues.push('Meta description over 160 chars');
  if (!page.h1s.length) issues.push('Missing H1');
  if (page.h1s.length > 1) issues.push('Multiple H1s');
  if ((page.robots || '').toLowerCase().includes('noindex')) issues.push('Noindex meta tag');
  return issues;
}

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function getGoogleAccessToken(scopes) {
  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!credentialsPath) return null;

  const raw = await fs.readFile(credentialsPath, 'utf8');
  const credentials = JSON.parse(raw);
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = base64url(
    JSON.stringify({
      iss: credentials.client_email,
      scope: scopes.join(' '),
      aud: credentials.token_uri || GOOGLE_TOKEN_URL,
      exp: now + 3600,
      iat: now,
    }),
  );
  const signingInput = `${header}.${payload}`;
  const signature = crypto.sign('RSA-SHA256', Buffer.from(signingInput), credentials.private_key);
  const assertion = `${signingInput}.${base64url(signature)}`;
  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion,
  });

  const response = await fetch(credentials.token_uri || GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body,
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(`Google token request failed: ${JSON.stringify(json)}`);
  }
  return json.access_token;
}

async function collectSearchConsole(siteUrl, sitemapUrl, urls) {
  const gscSiteUrl = process.env.GSC_SITE_URL;
  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!gscSiteUrl || !credentialsPath) {
    return {
      configured: false,
      reason: 'Set GOOGLE_APPLICATION_CREDENTIALS and GSC_SITE_URL in .env.seo.',
    };
  }

  try {
    const token = await getGoogleAccessToken(['https://www.googleapis.com/auth/webmasters']);
    const authHeaders = { authorization: `Bearer ${token}` };
    const encodedSite = encodeURIComponent(gscSiteUrl);
    const endDate = dateDaysAgo(1);
    const startDate = dateDaysAgo(90);

    const sites = await fetchJson('https://searchconsole.googleapis.com/webmasters/v3/sites', {
      headers: authHeaders,
    });

    const sitemaps = await fetchJson(
      `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodedSite}/sitemaps`,
      { headers: authHeaders },
    );

    let sitemapSubmit = { skipped: true };
    if (boolEnv('SEO_SUBMIT_GSC_SITEMAP')) {
      sitemapSubmit = await fetchJson(
        `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodedSite}/sitemaps/${encodeURIComponent(sitemapUrl)}`,
        { method: 'PUT', headers: authHeaders },
      );
    }

    const searchAnalytics = await fetchJson(
      `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: { ...authHeaders, 'content-type': 'application/json' },
        body: JSON.stringify({
          startDate,
          endDate,
          dimensions: ['query', 'page'],
          rowLimit: 25000,
        }),
      },
    );

    let urlInspection = { skipped: true };
    if (boolEnv('SEO_RUN_URL_INSPECTION')) {
      const inspectUrls = urls.slice(0, Math.min(10, urls.length));
      urlInspection = [];
      for (const inspectionUrl of inspectUrls) {
        const result = await fetchJson('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
          method: 'POST',
          headers: { ...authHeaders, 'content-type': 'application/json' },
          body: JSON.stringify({ inspectionUrl, siteUrl: gscSiteUrl }),
        });
        urlInspection.push({
          url: inspectionUrl,
          status: result.status,
          ok: result.ok,
          result: result.json,
        });
      }
    }

    return {
      configured: true,
      property: gscSiteUrl,
      dateRange: { startDate, endDate },
      sites: sites.json,
      sitemaps: sitemaps.json,
      sitemapSubmit: sitemapSubmit.skipped
        ? sitemapSubmit
        : { status: sitemapSubmit.status, ok: sitemapSubmit.ok, response: sitemapSubmit.json },
      searchAnalytics: searchAnalytics.json,
      urlInspection,
    };
  } catch (error) {
    return { configured: true, error: error.message };
  }
}

async function collectGa4() {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!propertyId || !credentialsPath) {
    return {
      configured: false,
      reason: 'Set GOOGLE_APPLICATION_CREDENTIALS and GA4_PROPERTY_ID in .env.seo.',
    };
  }

  try {
    const token = await getGoogleAccessToken(['https://www.googleapis.com/auth/analytics.readonly']);
    const endDate = 'yesterday';
    const startDate = '90daysAgo';
    const report = await fetchJson(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          dateRanges: [{ startDate, endDate }],
          dimensions: [{ name: 'pagePath' }],
          metrics: [
            { name: 'sessions' },
            { name: 'activeUsers' },
            { name: 'screenPageViews' },
            { name: 'eventCount' },
          ],
          orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
          limit: 100,
        }),
      },
    );
    return {
      configured: true,
      propertyId,
      dateRange: { startDate, endDate },
      report: report.json,
    };
  } catch (error) {
    return { configured: true, error: error.message };
  }
}

async function collectBing(urls) {
  const apiKey = process.env.BING_WEBMASTER_API_KEY;
  const bingSiteUrl = process.env.BING_SITE_URL || process.env.SEO_SITE_URL;
  if (!apiKey || !bingSiteUrl) {
    return {
      configured: false,
      reason: 'Set BING_WEBMASTER_API_KEY and BING_SITE_URL in .env.seo.',
    };
  }

  try {
    const quotaUrl = `https://ssl.bing.com/webmaster/api.svc/json/GetUrlSubmissionQuota?siteUrl=${encodeURIComponent(
      bingSiteUrl,
    )}&apikey=${encodeURIComponent(apiKey)}`;
    const quota = await fetchJson(quotaUrl);

    let submission = { skipped: true };
    if (boolEnv('SEO_SUBMIT_BING_URLS')) {
      submission = await fetchJson(
        `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlBatch?apikey=${encodeURIComponent(apiKey)}`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json; charset=utf-8' },
          body: JSON.stringify({ siteUrl: bingSiteUrl, urlList: urls.slice(0, 500) }),
        },
      );
    }

    return {
      configured: true,
      siteUrl: bingSiteUrl,
      quota: quota.json,
      submission: submission.skipped
        ? submission
        : { status: submission.status, ok: submission.ok, response: submission.json },
    };
  } catch (error) {
    return { configured: true, error: error.message };
  }
}

async function submitIndexNow(urls) {
  const key = process.env.INDEXNOW_KEY;
  const keyLocation = process.env.INDEXNOW_KEY_LOCATION;
  if (!boolEnv('SEO_SUBMIT_INDEXNOW')) return { skipped: true };
  if (!key || !keyLocation) {
    return { skipped: true, reason: 'Set INDEXNOW_KEY and INDEXNOW_KEY_LOCATION.' };
  }

  try {
    const siteUrl = new URL(process.env.SEO_SITE_URL || 'https://www.pentridgemedia.com');
    const result = await fetchJson('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: siteUrl.host,
        key,
        keyLocation,
        urlList: urls.slice(0, 10000),
      }),
    });
    return { status: result.status, ok: result.ok, response: result.json };
  } catch (error) {
    return { error: error.message };
  }
}

async function collectPageSpeed(urls) {
  if (!boolEnv('SEO_RUN_PAGESPEED')) return { skipped: true };
  const apiKey = process.env.PAGESPEED_API_KEY;
  const results = [];
  for (const url of urls.slice(0, 3)) {
    const params = new URLSearchParams({ url, strategy: 'mobile', category: 'performance', category: 'seo' });
    if (apiKey) params.set('key', apiKey);
    const result = await fetchJson(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`);
    const lighthouse = result.json?.lighthouseResult;
    results.push({
      url,
      status: result.status,
      ok: result.ok,
      categories: lighthouse?.categories
        ? Object.fromEntries(
            Object.entries(lighthouse.categories).map(([key, category]) => [key, category.score]),
          )
        : null,
      error: result.json?.error,
    });
  }
  return results;
}

function markdownSummary(report) {
  const pages = report.technical.pages || [];
  const issueCount = pages.reduce((sum, page) => sum + page.issues.length, 0);
  const issueLines = pages
    .filter((page) => page.issues.length)
    .slice(0, 20)
    .map((page) => `- ${page.url}: ${page.issues.join(', ')}`)
    .join('\n');

  return `# SEO Collection Report

Generated: ${report.generatedAt}

Site: ${report.siteUrl}

## Technical Summary

- Robots status: ${report.technical.robots?.status ?? 'not checked'}
- Sitemap status: ${report.technical.sitemap?.status ?? 'not checked'}
- Sitemap URLs found: ${report.technical.sitemapUrlCount ?? 0}
- Pages checked: ${pages.length}
- Page issues found: ${issueCount}

${issueLines || 'No page-level issues found in the checked URL sample.'}

## API Status

- Search Console: ${report.searchConsole.configured ? 'configured' : 'not configured'}
- GA4: ${report.ga4.configured ? 'configured' : 'not configured'}
- Bing Webmaster Tools: ${report.bing.configured ? 'configured' : 'not configured'}
- IndexNow: ${report.indexNow.skipped ? 'not submitted' : 'submitted'}

`;
}

async function main() {
  const env = await loadLocalEnv();
  const siteUrl = stripTrailingSlash(process.env.SEO_SITE_URL || 'https://www.pentridgemedia.com');
  const outputDir = path.resolve(ROOT, process.env.SEO_OUTPUT_DIR || DEFAULT_OUTPUT_DIR);
  const maxUrls = intEnv('SEO_MAX_URLS', 30);
  await fs.mkdir(outputDir, { recursive: true });

  const robotsUrl = `${siteUrl}/robots.txt`;
  const sitemapUrl = `${siteUrl}/sitemap.xml`;
  const report = {
    generatedAt: new Date().toISOString(),
    env,
    siteUrl,
    technical: {},
  };

  try {
    const robots = await fetchText(robotsUrl);
    report.technical.robots = {
      url: robotsUrl,
      status: robots.status,
      ok: robots.ok,
      finalUrl: robots.finalUrl,
      disallowAll: /^\s*disallow:\s*\/\s*$/im.test(robots.text),
      sitemapLines: robots.text
        .split(/\r?\n/)
        .filter((line) => /^\s*sitemap:/i.test(line))
        .map((line) => line.trim()),
    };
  } catch (error) {
    report.technical.robots = { url: robotsUrl, error: error.message };
  }

  let sitemapUrls = [siteUrl];
  try {
    const sitemap = await fetchText(sitemapUrl);
    const parsedUrls = parseSitemapUrls(sitemap.text);
    sitemapUrls = parsedUrls.length ? parsedUrls : sitemapUrls;
    report.technical.sitemap = {
      url: sitemapUrl,
      status: sitemap.status,
      ok: sitemap.ok,
      finalUrl: sitemap.finalUrl,
    };
    report.technical.sitemapUrlCount = parsedUrls.length;
  } catch (error) {
    report.technical.sitemap = { url: sitemapUrl, error: error.message };
    report.technical.sitemapUrlCount = 0;
  }

  const urlsToCheck = [...new Set(sitemapUrls)].slice(0, maxUrls);
  const pages = [];
  for (const url of urlsToCheck) {
    try {
      const fetched = await fetchText(url);
      const diagnostics = extractPageDiagnostics(fetched.text);
      const page = {
        url,
        finalUrl: fetched.finalUrl,
        status: fetched.status,
        ok: fetched.ok,
        ms: fetched.ms,
        ...diagnostics,
      };
      page.issues = pageIssues(page);
      pages.push(page);
    } catch (error) {
      pages.push({ url, error: error.message, issues: [error.message] });
    }
  }
  report.technical.pages = pages;
  report.technical.pageSpeed = await collectPageSpeed(urlsToCheck);
  report.searchConsole = await collectSearchConsole(siteUrl, sitemapUrl, urlsToCheck);
  report.ga4 = await collectGa4();
  report.bing = await collectBing(urlsToCheck);
  report.indexNow = await submitIndexNow(urlsToCheck);

  const basename = `${todayIso()}-seo-collect`;
  const jsonPath = path.join(outputDir, `${basename}.json`);
  const mdPath = path.join(outputDir, `${basename}.md`);
  await fs.writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`);
  await fs.writeFile(mdPath, markdownSummary(report));

  console.log(`SEO report written: ${jsonPath}`);
  console.log(`Summary written: ${mdPath}`);
  console.log(`Pages checked: ${pages.length}`);
  console.log(`Page issues found: ${pages.reduce((sum, page) => sum + page.issues.length, 0)}`);
  if (!report.searchConsole.configured) console.log(`Search Console: ${report.searchConsole.reason}`);
  if (!report.ga4.configured) console.log(`GA4: ${report.ga4.reason}`);
  if (!report.bing.configured) console.log(`Bing: ${report.bing.reason}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
