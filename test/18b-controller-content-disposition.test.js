import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url),'utf8'));
const decisions=read('work/18b-t01-t02-controller-content-disposition.json'),registry=read('work/18b-global-event-isolation.json');
test('Controller content decisions cover exactly 408 original events, with 390 pass and 18 holds',()=>{
 const records=decisions.records,ids=new Set(records.map(x=>x.id));
 assert.equal(records.length,408);assert.equal(ids.size,408);
 const accepted=records.filter(x=>['controller-accepted','previous-review-accepted'].includes(x.contentVerdict));
 const holds=records.filter(x=>['isolated','hold-world-precondition'].includes(x.contentVerdict));
 assert.equal(accepted.length,390);assert.equal(holds.length,18);
 assert.equal(records.filter(x=>x.contentVerdict==='controller-accepted').length,359);
 assert.equal(records.filter(x=>x.contentVerdict==='previous-review-accepted').length,31);
 assert.equal(holds.filter(x=>x.contentVerdict==='isolated').length,17);
 assert.deepEqual(holds.map(x=>x.id).sort(),[...registry.t02.entries.map(x=>x.id),'content:18b-t02-05-23'].sort());
});
test('Every accepted event exists in unchanged engineering authoring sources and cannot be a published record',()=>{
 const all=['t01','t02'].flatMap(t=>Array.from({length:8},(_,i)=>read('work/18b-'+t+'-'+String(i+1).padStart(2,'0')+'-authoring.json').records));
 const byId=new Map(all.map(x=>[x.definition.id,x]));
 assert.equal(byId.size,408);
 for(const q of decisions.records){
  const record=byId.get(q.id);
  assert.ok(record,q.id);
  assert.equal(record.story.status,'engineering-test',q.id);
  assert.equal(record.definition.content.status,'engineering-test',q.id);
  assert.equal(q.externalSignoffRequired,false,q.id);
 }
 assert.equal(decisions.gates.published,0);
});
