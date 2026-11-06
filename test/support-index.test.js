/** Old H4 witnesses, including all unrelated state, not an implementation mirror. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {gunzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import {academicSupport} from '../src/runtime/academics.js';
import {restoreRandom} from '../src/numeric/random.js';
const hash=s=>createHash('sha256').update(JSON.stringify(s)).digest('hex');
test('H5 support indexing preserves H4 results, all state and RNG across eight real-entry probes',async t=>{
 const f=JSON.parse(gunzipSync(readFileSync(new URL('./fixtures/h5-support-pre-index.json.gz',import.meta.url)))),state=structuredClone(f.initial.state),rng=restoreRandom(f.initial.randomBefore);let elapsed=0;
 assert.equal(f.sourceCommit,'bb1a598a6245c28336d10fdb51f470521f316504');assert.equal(f.probes.length,8);
 for(const p of f.probes)await t.test(p.input.date,()=>{
  assert.equal(hash(state),p.before);assert.deepEqual(rng.snapshot(),p.randomBefore);
  const start=performance.now(),result=academicSupport(state,structuredClone(p.input),rng);elapsed+=performance.now()-start;
  assert.deepEqual(result,p.result);assert.equal(hash(state),p.after);assert.deepEqual(rng.snapshot(),p.randomAfter);
  for(const id of new Set(result.study.map(x=>x.personId)))assert.ok(result.study.filter(x=>x.personId===id).reduce((n,x)=>n+x.periods,0)<=2);
 });
 t.diagnostic(JSON.stringify({kind:'support-index-parity',baselineMs:f.probes.reduce((n,p)=>n+p.baselineMs,0),indexedMs:elapsed,probes:f.probes.length}));
});
