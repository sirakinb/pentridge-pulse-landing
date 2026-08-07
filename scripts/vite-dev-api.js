import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { Buffer } from 'node:buffer';
import { loadEnv } from 'vite';

// Serves the /api handlers during `npm run dev`.
//
// In production these files are Vercel serverless functions. `vite dev` knows
// nothing about them, so before this plugin every form on localhost — waitlist,
// newsletter, ROI report — POSTed to a 404 and showed "Something went wrong".
// The failure only ever appeared locally, which made it look like a bug in the
// form.
//
// The handlers are loaded through Vite's SSR module graph, so they pick up edits
// without a restart, and .env is read with an empty prefix because these are
// server-side secrets (RESEND_API_KEY) rather than VITE_-prefixed client vars.
//
// Dev only — `apply: 'serve'` keeps it out of the build entirely.

function readBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) return resolve({});
      try { resolve(JSON.parse(raw)); } catch { resolve({}); }
    });
    req.on('error', () => resolve({}));
  });
}

// The handlers are written against Vercel's res, which is a Node response plus
// Express-style status()/json(). Adding those two is the whole shim.
function vercelify(res) {
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (body) => {
    if (!res.headersSent) res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(body));
    return res;
  };
  return res;
}

export default function devApi() {
  return {
    name: 'pentridge-dev-api',
    apply: 'serve',
    configResolved(config) {
      Object.assign(process.env, loadEnv(config.mode, config.root, ''));
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) return next();

        const route = req.url.split('?')[0].replace(/^\/api\//, '').replace(/\/$/, '');
        const file = path.join(server.config.root, 'api', `${route}.js`);
        if (!route || !fs.existsSync(file)) return next();

        try {
          const mod = await server.ssrLoadModule(`/api/${route}.js`);
          const handler = mod.default;
          if (typeof handler !== 'function') return next();
          req.body = await readBody(req);
          await handler(req, vercelify(res));
        } catch (err) {
          server.config.logger.error(`[dev-api] /api/${route} threw: ${err?.stack || err}`);
          if (!res.writableEnded) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ error: 'Handler threw in dev. See the terminal.' }));
          }
        }
      });
    },
  };
}
