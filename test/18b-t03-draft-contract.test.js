import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {T03_BATCH_RECORDS} from '../src/runtime/content/t03.js';
import {validateStory} from '../src/runtime/story-content.js';
import {validateEventDefinitions} from '../src/runtime/event-candidates.js';
const read=path=>JSON.parse(readFileSync(new URL('../'+path,import.meta.url),'utf8'));

test('T03 engineering drafts stay isolated and synchronized with authoring sources',()=>{
 const src=Array.from({length:8},(_,i)=>read('work/18b-t03-'+String(i+1).padStart(2,'0')+'-authoring.json'));
 assert.equal(T03_BATCH_RECORDS.length,src.reduce((n,x)=>n+x.records.length,0));
 assert.ok(T03_BATCH_RECORDS.length>=45);
 const ids=new Set();
 for(const batch of src){
  assert.ok(batch.records.length,'missing subtopic authoring records');
  for(const record of batch.records){
   assert.ok(!ids.has(record.definition.id),'duplicate '+record.definition.id);
   ids.add(record.definition.id);
   assert.equal(record.story.status,'engineering-test');
   assert.equal(record.definition.content.status,'engineering-test');
   assert.equal(record.definition.content.version,'1');
   assert.equal(record.story.resourceId,record.definition.id);
   assert.equal(record.story.topicId,record.definition.topicId);
   validateStory(record.story);
  }
 }
 const generated=T03_BATCH_RECORDS.map(r=>[r.story,r.definition,r.binding]);
 const originals=src.flatMap(batch=>batch.records.map(r=>[r.story,r.definition,r.binding]));
 assert.deepEqual(generated,originals);
 validateEventDefinitions(T03_BATCH_RECORDS.map(r=>r.definition));
});

test('T03 exploration has eight open pools larger than 20 and does not count as authored',()=>{
 let total=0;
 for(let i=1;i<=8;i++){
  const id='T03-'+String(i).padStart(2,'0');
  const source=read('work/18b-t03-'+String(i).padStart(2,'0')+'-exploration.json');
  assert.equal(source.subtopic,id);
  assert.ok(source.scenarios.length>20);
  assert.equal(source.candidateCount,source.scenarios.length);
  total+=source.scenarios.length;
 }
 assert.ok(total>=240);
});
