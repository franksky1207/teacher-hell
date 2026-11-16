/** 18-B immutable editorial evidence check — no independent re-review and no game simulation. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const load=path=>JSON.parse(readFileSync(new URL('../'+path,import.meta.url),'utf8'));
const records=topic=>Array.from({length:8},(_,i)=>load('work/18b-'+topic+'-'+String(i+1).padStart(2,'0')+'-authoring.json').records).flat();
const sha=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const sorted=x=>Array.isArray(x)?x.map(sorted):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,sorted(x[k])])):x;
const stableSha=x=>sha(sorted(x));
const t01=records('t01'),t02=records('t02');
const approval=load('docs/reviews/18b-t01-eight-independent-approval.json');
const corrections=load('work/18b-t02-hydrogen-corrections.json');
const register=load('work/18b-global-event-isolation.json');
const by01=new Map(t01.map(r=>[r.definition.id,r])),by02=new Map(t02.map(r=>[r.definition.id.slice(-5),r]));
test('Existing eight T01 independent approvals are unchanged at current source',()=>{
 assert.equal(approval.records.length,8);
 for(const item of approval.records){
  assert.equal(item.editorialReview.verdict,'approved',item.eventId);
  const r=by01.get(item.eventId);assert.ok(r,item.eventId);
  assert.equal(sha(r.story),item.editorialReview.storySha256,item.eventId+' story');
  assert.equal(sha(r.definition),item.editorialReview.definitionSha256,item.eventId+' definition');
 }
});
test('Hydrogen 23 passed unchanged T02 stories retain their reviewed hashes',()=>{
 assert.equal(Object.keys(corrections.passedUnchanged).length,23);
 for(const [id,hash] of Object.entries(corrections.passedUnchanged)){
  const r=by02.get(id);assert.ok(r,id);assert.equal(stableSha(r),hash,id);
 }
});
test('Eight held T02 sources retain exact hashes and all 18 remain isolated',()=>{
 assert.equal(Object.keys(corrections.held).length,8);
 assert.equal(Object.keys(corrections.blocked).length,9);
 for(const [id,hold] of Object.entries(corrections.held)){
  const r=by02.get(id);assert.ok(r,id);assert.equal(stableSha(r),hold.sha256,id);
 }
 const actual=register.t02.entries.map(x=>x.id).sort();
 const expected=[...new Set([...Object.keys(corrections.held),...Object.keys(corrections.blocked),'05-23'])].map(x=>'content:18b-t02-'+x).sort();
 assert.deepEqual(actual,expected);
});
test('Remaining review and release gaps are recorded, not silently promoted',()=>{
 assert.equal(t01.length,200);assert.equal(t02.length,208);
 assert.equal(new Set([...t01,...t02].map(x=>x.definition.id)).size,408);
 assert.equal(Object.keys(corrections.modified).length,176);
 assert.equal(corrections.counts.published,0);
 for(const r of [...t01,...t02]){
  assert.equal(r.story.status,'engineering-test',r.definition.id);
  assert.equal(r.definition.content.status,'engineering-test',r.definition.id);
 }
});


test('Optional independent review reference preserves original 360 IDs without invented signoffs',()=>{
 const handoff=load('work/18b-t01-t02-independent-review-handoff.json');
 const gates=load('work/18b-t01-t02-release-gates.json');
 assert.equal(handoff.entries.length,360);
 assert.equal(handoff.summary.t01Pending,192);
 assert.equal(handoff.summary.t02Pending,168);
 const expected=[...t01.filter(r=>!approval.records.some(a=>a.eventId===r.definition.id)).map(r=>r.definition.id),
   ...corrections.resolvedIds.map(id=>'content:18b-t02-'+id)].sort();
 assert.deepEqual(handoff.entries.map(x=>x.id).sort(),expected);
 for(const row of handoff.entries){
  assert.equal(row.verdict,null,row.id);
  assert.equal(row.reviewer,null,row.id);
  assert.equal(row.reviewedDigest,null,row.id);
 }
 assert.deepEqual(gates.currentReleaseHolds,['content:18b-t02-05-23']);
 assert.ok(register.t02.entries.some(e=>e.id==='content:18b-t02-05-23'));
 assert.equal(gates.premiseVerification.filter(x=>x.releaseHold===true).length,1);
});
