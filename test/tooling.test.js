import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm, symlink, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { once } from 'node:events';
import { spawnSync } from 'node:child_process';
import { buildProject, root } from '../scripts/project.js';
import { testSelection } from '../scripts/test.js';
import { createPreviewServer } from '../scripts/preview.js';

test('tooling: suite/module/name selection is precise; invalid and duplicate inputs fail', () => {
  assert.deepEqual(testSelection(['module=numeric']).files,['test/core.test.js','test/random.test.js']);
  assert.deepEqual(testSelection(['module=world,contracts','--name','JSON','--coverage']),{
    selection:'module=world,contracts',files:['test/world.test.js','test/contracts.test.js'],pattern:'JSON',coverage:true,
  });
  assert.equal(testSelection(['quick']).coverage,false);
  for (const args of [['missing'],['module='],['module=../secret'],['module=world,world'],['module=numeric,core'],
    ['quick','--name'],['quick','--name','['],['quick','--bad'],['quick','--coverage','--coverage']]) assert.throws(()=>testSelection(args));
});

test('tooling: a name filter matching no tests cannot report a green suite', () => {
  const result=spawnSync(process.execPath,['scripts/project.js','test','module=core','--name','^does-not-exist$'],{cwd:root,encoding:'utf8'});
  assert.equal(result.status,1); assert.match(result.stderr,/no tests executed/);
});

test('tooling: repeated static builds have identical bytes and exclude test/dev dependencies', async () => {
  const a=await buildProject(), first=await readFile(resolve(root,'dist/manifest.json'),'utf8');
  const b=await buildProject(); assert.deepEqual(a,b);
  assert.equal(await readFile(resolve(root,'dist/manifest.json'),'utf8'),first);
  assert.ok(Object.hasOwn(a,'src/contracts/foundation.js'));
  assert.ok(Object.hasOwn(a,'web/health.js'));
  assert.ok(!Object.keys(a).some(p=>/node_modules|test\/|scripts\/|simulation\//.test(p)));
});

test('tooling: preview serves modules with MIME and refuses writes/outside files/symlinks', async () => {
  const dir=await mkdtemp(join(tmpdir(),'teacher-hell-preview-'));
  let server;
  try {
    await writeFile(join(dir,'index.html'),'<p>synthetic preview</p>');
    await writeFile(join(dir,'module.js'),'export const value=1;');
    await symlink(resolve(root,'package.json'),join(dir,'outside.json'));
    server=await createPreviewServer(dir);server.listen(0,'127.0.0.1');await once(server,'listening');
    const url=`http://127.0.0.1:${server.address().port}`;
    const index=await fetch(url);assert.equal(index.status,200);assert.match(await index.text(),/synthetic preview/);
    const module=await fetch(url+'/module.js');assert.match(module.headers.get('content-type'),/text\/javascript/);
    assert.equal(module.headers.get('cache-control'),'no-store');
    for (const path of ['/outside.json','/../package.json','/%2e%2e%2fpackage.json','/%00','/missing']) assert.equal((await fetch(url+path)).status,404);
    assert.equal((await fetch(url,{method:'POST'})).status,405);
    assert.equal(await (await fetch(url+'/module.js',{method:'HEAD'})).text(),'');
  } finally {
    if (server) await new Promise((resolve,reject)=>server.close(error=>error?reject(error):resolve()));
    await rm(dir,{recursive:true,force:true});
  }
});
