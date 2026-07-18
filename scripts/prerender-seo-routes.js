import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { canonicalForPath, publicSeoRoutes, SITE_URL } from '../src/lib/public-seo-routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const templatePath = path.join(distDir, 'index.html');

const escapeHtml = (value = '') => {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

const removeSeoTags = (html) => {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/gi, '')
    .replace(/<meta\s+name=["']description["'][^>]*>\s*/gi, '')
    .replace(/<meta\s+name=["']keywords["'][^>]*>\s*/gi, '')
    .replace(/<meta\s+name=["']robots["'][^>]*>\s*/gi, '')
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, '')
    .replace(/<meta\s+property=["']og:(title|description|image|url|type)["'][^>]*>\s*/gi, '')
    .replace(/<meta\s+name=["']twitter:(title|description|image|card)["'][^>]*>\s*/gi, '');
};

const routeSeoBlock = (route) => {
  const canonicalUrl = canonicalForPath(route.path);
  const pageType = route.pageType || 'website';
  const imageUrl = `${SITE_URL}${route.ogImage || '/og-header.png'}`;

  return [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    `<meta name="keywords" content="${escapeHtml(route.keywords)}" />`,
    '<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />',
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta property="og:image" content="${escapeHtml(imageUrl)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
    `<meta property="og:type" content="${escapeHtml(pageType)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />`
  ].join('\n  ');
};

const routeOutputPath = (routePath) => {
  if (routePath === '/') return path.join(distDir, 'index.html');
  return path.join(distDir, routePath.replace(/^\//, ''), 'index.html');
};

const writeRouteHtml = (template, route, appHtml) => {
  const htmlWithSeo = removeSeoTags(template).replace('</head>', `  ${routeSeoBlock(route)}\n</head>`);
  const html = htmlWithSeo.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  const outputPath = routeOutputPath(route.path);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html);
  fs.writeFileSync(`${outputPath}.gz`, zlib.gzipSync(html, { level: 9 }));
  fs.writeFileSync(`${outputPath}.br`, zlib.brotliCompressSync(html));
};

if (!fs.existsSync(templatePath)) {
  throw new Error(`Build output not found at ${templatePath}. Run vite build before prerendering.`);
}

const template = fs.readFileSync(templatePath, 'utf8');
const vite = await createServer({
  root: projectRoot,
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true }
});

try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');

  for (const route of publicSeoRoutes) {
    const appHtml = await render(route.path);
    writeRouteHtml(template, route, appHtml);
    console.log(`Prerendered ${route.path}`);
  }
} finally {
  await vite.close();
}
