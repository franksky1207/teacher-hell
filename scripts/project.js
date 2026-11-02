import { readFile, readdir, mkdir, cp, rm, writeFile } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { parse } from 'acorn';
import { analyzeArchitecture } from './architecture.js';
import { runTests } from './test.js';
import { createPreviewServer } from './preview.js';

export const root = fileURLToPath(new URL('../', import.meta.url));
export async function filesUnder(directory) {
  const files = [];
  for (const entry of await readdir(directory, {withFileTypes:true})) {
    const path = resolve(directory,entry.name);
    if (entry.isDirectory()) files.push(...await filesUnder(path));
    else if (entry.isFile()) files.push(path);
    else throw new Error(`Unsupported source entry: ${path}`);
  }
  return files.sort();
}
export async function checkProject() {
  const sources = new Map(); let count = 0;
  for (const directory of ['src','web','scripts','test','simulation']) {
    for (const path of await filesUnder(resolve(root,directory))) {
      if (!path.endsWith('.js')) continue;
      const name = relative(root,path).split(sep).join('/'), source = await readFile(path,'utf8');
      try { parse(source,{ecmaVersion:'latest',sourceType:'module'}); }
      catch (error) { throw new Error(`${name}: ${error.message}`,{cause:error}); }
      if (directory === 'src' || directory === 'web') sources.set(name,source);
      count++;
    }
  }
  const result = analyzeArchitecture(sources);
  if (result.errors.length) throw new Error(result.errors.join('\n'));
  console.log(`PASS syntax: ${count} JavaScript files; architecture: ${result.graph.size} runtime modules; no cycles/boundary violations.`);
  return result;
}
export async function buildProject() {
  await checkProject();
  const destination = resolve(root,'dist');
  await rm(destination,{recursive:true,force:true}); await mkdir(destination);
  await cp(resolve(root,'src'),resolve(destination,'src'),{recursive:true});
  for (const file of await filesUnder(resolve(root,'web'))) {
    const target = resolve(destination, file.endsWith(`${sep}index.html`) ? 'index.html' : relative(root,file));
    await mkdir(resolve(target,'..'),{recursive:true});
    await cp(file,target);
  }
  // Engineering preview only. Synthetic test data never enters a player save store.
  const { foundationScenario } = await import('../test/support/scenarios.js');
  await writeFile(resolve(destination,'health-fixture.json'),JSON.stringify(foundationScenario(11))+'\n');
  const manifest = {};
  for (const path of await filesUnder(destination)) manifest[relative(destination,path).split(sep).join('/')] = createHash('sha256').update(await readFile(path)).digest('hex');
  await writeFile(resolve(destination,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
  console.log(`PASS build: ${Object.keys(manifest).length} files + deterministic manifest; engineering preview only, no deployment.`);
  return manifest;
}
async function main(args) {
  const [command,...options] = args;
  if (command === 'test') { process.exitCode = runTests(options); return; }
  if (command === 'check' && !options.length) { await checkProject(); return; }
  if (command === 'build' && !options.length) { await buildProject(); return; }
  if (command === 'preview' && options.length <= 1) {
    const port = options.length ? Number(options[0]) : 4173;
    if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('Expected port 0..65535');
    const server = await createPreviewServer(resolve(root,'dist'));
    server.listen(port,'127.0.0.1',() => console.log(`Engineering preview: http://127.0.0.1:${server.address().port} (Ctrl+C to stop; no deployment)`));
    server.on('error',error => { console.error(error.message); process.exitCode=1; });
    return;
  }
  throw new Error('Usage: node scripts/project.js check|build|preview [port]|test [suite|module=name,...] [--name regex] [--coverage]');
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch(error => { console.error(error.stack); process.exitCode=1; });
}
