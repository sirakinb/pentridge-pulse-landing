#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const OUTPUT_DIR = 'Pentridge AI Search Sprint/01 Baseline';

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
  const text = await fs.readFile(envPath, 'utf8');
  for (const line of text.split(/\r?\n/)) {
    const parsed = parseEnvLine(line);
    if (parsed && !process.env[parsed.key]) process.env[parsed.key] = parsed.value;
  }
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
  if (!credentialsPath) throw new Error('GOOGLE_APPLICATION_CREDENTIALS is not set in .env.seo.');

  const credentials = JSON.parse(await fs.readFile(credentialsPath, 'utf8'));
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
  if (!response.ok) throw new Error(`Google token request failed: ${JSON.stringify(json)}`);
  return json.access_token;
}

function isoDaysAgo(days) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}

function csvEscape(value) {
  const text = value == null ? '' : String(value);
  if (!/[",\n\r]/.test(text)) return text;
  return `"${text.replace(/"/g, '""')}"`;
}

function rowsToCsv(headers, rows) {
  return [
    headers.map(csvEscape).join(','),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(',')),
  ].join('\n');
}

async function searchAnalytics({ token, siteUrl, startDate, endDate, dimensions }) {
  const encodedSite = encodeURIComponent(siteUrl);
  const response = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions,
        rowLimit: 25000,
      }),
    },
  );
  const json = await response.json();
  if (!response.ok) throw new Error(`Search Analytics request failed: ${JSON.stringify(json)}`);
  return json.rows || [];
}

function normalizeRows(rows, keyName) {
  return rows.map((row) => ({
    [keyName]: row.keys?.[0] || '',
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    ctr: row.ctr ?? 0,
    position: row.position ?? 0,
  }));
}

async function main() {
  await loadLocalEnv();
  const siteUrl = process.env.GSC_SITE_URL;
  if (!siteUrl) throw new Error('GSC_SITE_URL is not set in .env.seo.');

  const endDate = isoDaysAgo(1);
  const startDate = isoDaysAgo(90);
  const token = await getGoogleAccessToken(['https://www.googleapis.com/auth/webmasters.readonly']);
  const outputDir = path.join(ROOT, OUTPUT_DIR);
  await fs.mkdir(outputDir, { recursive: true });

  const queryRows = normalizeRows(
    await searchAnalytics({ token, siteUrl, startDate, endDate, dimensions: ['query'] }),
    'query',
  );
  const pageRows = normalizeRows(
    await searchAnalytics({ token, siteUrl, startDate, endDate, dimensions: ['page'] }),
    'page',
  );

  const queriesCsv = rowsToCsv(['query', 'clicks', 'impressions', 'ctr', 'position'], queryRows);
  const pagesCsv = rowsToCsv(['page', 'clicks', 'impressions', 'ctr', 'position'], pageRows);
  const metadata = {
    generatedAt: new Date().toISOString(),
    property: siteUrl,
    dateRange: { startDate, endDate },
    queryRows: queryRows.length,
    pageRows: pageRows.length,
  };

  await fs.writeFile(path.join(outputDir, 'gsc_queries_last_3_months.csv'), `${queriesCsv}\n`);
  await fs.writeFile(path.join(outputDir, 'gsc_pages_last_3_months.csv'), `${pagesCsv}\n`);
  await fs.writeFile(path.join(outputDir, 'gsc_exports_metadata.json'), `${JSON.stringify(metadata, null, 2)}\n`);

  console.log(`GSC Queries rows: ${queryRows.length}`);
  console.log(`GSC Pages rows: ${pageRows.length}`);
  console.log(`Date range: ${startDate} to ${endDate}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
