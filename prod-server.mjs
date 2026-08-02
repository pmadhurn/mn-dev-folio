// Production server: serves dist/ with SPA fallback and proxies /api/* to the
// FastAPI chat backend (server.py) with the /api prefix stripped, mirroring the
// Vite dev proxy in vite.config.ts.
import http from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = Number(process.env.PORT || 8090);
const API_TARGET = process.env.CHAT_API_TARGET || 'http://127.0.0.1:5000';
const DIST = join(fileURLToPath(new URL('.', import.meta.url)), 'dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.map': 'application/json',
};

function serveFile(res, filePath) {
  const ext = extname(filePath).toLowerCase();
  const headers = {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'X-Content-Type-Options': 'nosniff',
  };
  // Hashed assets are immutable; index.html must always revalidate.
  headers['Cache-Control'] = filePath.includes('/assets/')
    ? 'public, max-age=31536000, immutable'
    : 'no-cache';
  res.writeHead(200, headers);
  createReadStream(filePath).pipe(res);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (url.pathname === '/api' || url.pathname.startsWith('/api/')) {
    const targetPath = url.pathname.replace(/^\/api/, '') || '/';
    const proxyReq = http.request(
      `${API_TARGET}${targetPath}${url.search}`,
      { method: req.method, headers: { ...req.headers, host: new URL(API_TARGET).host } },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);
      }
    );
    proxyReq.on('error', () => {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Chat backend is unavailable.' }));
    });
    req.pipe(proxyReq);
    return;
  }

  // Static files with SPA fallback; block path traversal.
  const safePath = normalize(url.pathname).replace(/^(\.\.[/\\])+/, '');
  let filePath = join(DIST, safePath);
  if (!filePath.startsWith(DIST)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }
  if (existsSync(filePath) && statSync(filePath).isFile()) {
    return serveFile(res, filePath);
  }
  serveFile(res, join(DIST, 'index.html'));
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`devfolio serving ${DIST} on http://127.0.0.1:${PORT}, /api -> ${API_TARGET}`);
});
