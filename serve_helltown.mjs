import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { extname, join } from 'path';

const ROOT = 'C:/Users/13306/Desktop/helltownohio-site';
const PORT = 3002;

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png':  'image/png',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

createServer(async (req, res) => {
  let path = req.url === '/' ? '/index.html' : req.url;
  const filePath = join(ROOT, decodeURIComponent(path));
  try {
    const data = await readFile(filePath);
    const ext  = extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404); res.end('Not found');
  }
}).listen(PORT, () => console.log(`Serving at http://localhost:${PORT}`));
