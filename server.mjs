import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const base = join(dirname(fileURLToPath(import.meta.url)), 'public');
const port = Number(process.env.PORT || 3000);
const routes = {
  '/': ['index.html', 'text/html; charset=utf-8'],
  '/privacy': ['privacy.html', 'text/html; charset=utf-8'],
  '/terms': ['terms.html', 'text/html; charset=utf-8'],
  '/styles.css': ['styles.css', 'text/css; charset=utf-8'],
};
createServer(async (req, res) => {
  const path = new URL(req.url || '/', 'http://localhost').pathname.replace(/\/$/, '') || '/';
  if (path === '/health') { res.writeHead(200, {'content-type':'text/plain; charset=utf-8'}); return res.end('ok'); }
  if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405, {allow:'GET, HEAD'}); return res.end(); }
  const match = routes[path];
  if (!match) { res.writeHead(404, {'content-type':'text/plain; charset=utf-8'}); return res.end('Not found'); }
  try {
    const body = await readFile(join(base, match[0]));
    res.writeHead(200, {
      'content-type': match[1],
      'cache-control': match[0] === 'styles.css' ? 'public, max-age=3600' : 'public, max-age=300',
      'x-content-type-options': 'nosniff',
      'referrer-policy': 'strict-origin-when-cross-origin',
      'x-frame-options': 'DENY',
      'content-security-policy': "default-src 'none'; style-src 'self'; img-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
    });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(500); res.end('Unable to serve page'); }
}).listen(port, '0.0.0.0', () => console.log(`OAuth information site listening on ${port}`));
