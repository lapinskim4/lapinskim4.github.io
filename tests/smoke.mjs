import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { extname, join, resolve } from 'path';

const PORT = 8765;
const ROOT = resolve('..');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = createServer(async (req, res) => {
  let path = decodeURIComponent(req.url.split('?')[0]);
  if (path === '/') path = '/index.html';
  if (path.includes('..')) {
    res.statusCode = 400;
    return res.end();
  }
  try {
    const data = await readFile(join(ROOT, path));
    res.setHeader('Content-Type', MIME[extname(path)] || 'application/octet-stream');
    res.end(data);
  } catch {
    res.statusCode = 404;
    res.end();
  }
});

await new Promise((r) => server.listen(PORT, r));

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];

page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));

const pages = ['/', '/uses.html'];

for (const path of pages) {
  let response;
  try {
    response = await page.goto(`http://localhost:${PORT}${path}`, {
      waitUntil: 'load',
      timeout: 15000,
    });
  } catch (e) {
    errors.push(`[${path}] navigation failed: ${e.message}`);
    continue;
  }

  if (response && !response.ok()) {
    errors.push(`[${path}] page returned status ${response.status()}`);
  }

  await page.waitForTimeout(2000);

  const h1 = await page.locator('h1').first().textContent().catch(() => null);
  if (!h1 || !h1.trim()) {
    errors.push(`[${path}] h1 not found or empty`);
  } else {
    console.log(`[${path}] h1: "${h1.trim()}"`);
  }
}

await browser.close();
server.close();

if (errors.length) {
  console.error('Smoke test FAILED:');
  errors.forEach((e) => console.error('  - ' + e));
  process.exit(1);
}

console.log('Smoke test PASSED');
