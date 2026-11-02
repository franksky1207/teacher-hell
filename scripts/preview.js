/** Loopback development server. Serves only an existing build, never repo/credentials. */
import { createServer } from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';

const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8'};
export async function createPreviewServer(directory) {
  const root = await realpath(directory);
  return createServer(async (request,response) => {
    if (!['GET','HEAD'].includes(request.method)) { response.writeHead(405,{Allow:'GET, HEAD'}); response.end(); return; }
    try {
      const pathname = decodeURIComponent(new URL(request.url,'http://localhost').pathname);
      const candidate = resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
      let path = await realpath(candidate);
      if ((await stat(path)).isDirectory()) path = await realpath(resolve(path,'index.html'));
      if (!path.startsWith(root+sep) || !(await stat(path)).isFile()) throw new Error('Outside build');
      const data = await readFile(path);
      response.writeHead(200,{'Content-Type':types[extname(path)] ?? 'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
      response.end(request.method === 'HEAD' ? undefined : data);
    } catch {
      response.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'}); response.end('Build file not found');
    }
  });
}
