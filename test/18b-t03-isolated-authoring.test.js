import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {T03_BATCH_RECORDS} from '../src/runtime/content/t03.js';
import {validateStory} from '../src/runtime/story-content.js';
import {validateEventDefinitions} from '../src/runtime/event-candidates.js';
import {canonicalData} from '../src/changes/settlement.js';

const source=sub=>JSON.parse(readFileSync(new URL('../work/18b-t03-'+sub+'-authoring.json',import.meta.url),'utf8'));
test('T03 engineering drafts preserve all eight independent source files and isolation',()=>{
 const all=Array.from({length:8},(_,i)=>source(String(i+1).padStart(2,'0')).records).flat();
 assert.equal(T03_BATCH_RECORDS.length,all.length);
 assert.equal(new Set(all.map(r=>r.definition.id)).size,all.length);
 assert.ok(all.length>=45);
 for(let i=0;i<all.length;i++){
  const r=all[i],built=T03_BATCH_RECORDS[i];
  assert.equal(canonicalData(built),canonicalData({story:r.story,definition:r.definition,binding:r.binding}),r.definition.id);
  assert.equal(r.story.status,'engineering-test',r.definition.id);
  assert.equal(r.definition.content.status,'engineering-test',r.definition.id);
  assert.equal(r.story.definitionId,r.definition.id);
  assert.equal(r.story.topicId,r.definition.topicId);
  assert.equal(r.story.version,r.definition.content.version);
  assert.equal(r.story.resourceId,r.definition.content.resourceId);
 }
});
test('T03 story compiler and event eligibility contracts accept only isolated draft sources',()=>{
 const all=T03_BATCH_RECORDS;
 for(const item of all){
  assert.doesNotThrow(()=>validateStory(item.story),item.definition.id);
 }
 assert.doesNotThrow(()=>validateEventDefinitions(all.map(r=>r.definition)));
});
test('T03 exploration counts are not falsely counted as reviewed playable events',()=>{
 for(let i=1;i<=8;i++){
  const sub=String(i).padStart(2,'0');
  const explored=JSON.parse(readFileSync(new URL('../work/18b-t03-'+sub+'-exploration.json',import.meta.url),'utf8'));
  const screen=JSON.parse(readFileSync(new URL('../work/18b-t03-'+sub+'-screening.json',import.meta.url),'utf8'));
  const drafts=source(sub);
  assert.equal(explored.scenarios.length,30);
  assert.equal(screen.evaluations.length,30);
  assert.ok(drafts.records.length<explored.scenarios.length);
  assert.ok(drafts.records.every(r=>r.story.status!=='ready'));
 }
});
