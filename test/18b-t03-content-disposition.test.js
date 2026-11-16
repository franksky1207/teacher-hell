import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=path=>JSON.parse(readFileSync(new URL('../'+path,import.meta.url),'utf8'));
const disposition=read('work/18b-t03-controller-content-disposition.json');

test('T03 all eight semantic decisions cover every isolated story exactly once',()=>{
 assert.equal(disposition.kind,'controller-content-disposition-not-engineering-release');
 assert.equal(disposition.byTopic.length,8);
 const all=disposition.records,seen=new Set();
 let accepted=0,held=0;
 for(let i=1;i<=8;i++){
  const sub=String(i).padStart(2,'0'),topic='T03-'+sub;
  const src=read('work/18b-t03-'+sub+'-authoring.json');
  const rev=read('work/18b-t03-'+sub+'-controller-semantic-review.json');
  const index=disposition.byTopic.find(x=>x.topicId===topic);
  assert.ok(index,topic);
  assert.equal(src.records.length,rev.records.length,topic);
  assert.equal(index.authored,src.records.length,topic);
  const matching=all.filter(x=>x.topicId===topic);
  assert.equal(matching.length,src.records.length,topic);
  for(const s of src.records){
   const id=s.definition.id;
   assert.ok(!seen.has(id),id);seen.add(id);
   assert.equal(s.story.status,'engineering-test',id);
   assert.equal(s.definition.content.status,'engineering-test',id);
   const local=rev.records.filter(x=>x.id===id),global=matching.filter(x=>x.id===id);
   assert.equal(local.length,1,id);assert.equal(global.length,1,id);
   assert.equal(global[0].contentVerdict,local[0].contentVerdict,id);
   assert.equal(global[0].title,s.editorial.title,id);
   assert.ok(typeof global[0].reason==='string'&&global[0].reason.length>10,id);
  }
  const ok=matching.filter(x=>x.contentVerdict==='controller-content-accepted').length;
  assert.ok(ok>=20,'At least 20 meaningful reviewed stories, not 20 unreviewed drafts: '+topic);
  assert.equal(index.accepted,ok,topic);
  assert.equal(index.held,index.authored-ok,topic);
  accepted+=ok;held+=index.held;
 }
 assert.equal(all.length,seen.size);
 assert.equal(disposition.totals.authored,all.length);
 assert.equal(disposition.totals.accepted,accepted);
 assert.equal(disposition.totals.held,held);
 assert.equal(disposition.totals.published,0);
});
