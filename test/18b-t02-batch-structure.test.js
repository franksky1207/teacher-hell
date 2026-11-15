/** Single focused structural gate for T02 drafts. No simulations or publication. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateStory} from '../src/runtime/story-content.js';
import {validateEventDefinitions} from '../src/runtime/event-candidates.js';

const topics=Array.from({length:8},(_,i)=>String(i+1).padStart(2,'0'));
const batches=topics.map(topic=>{
 const filename=new URL('../work/18b-t02-'+topic+'-authoring.json',import.meta.url);
 const records=JSON.parse(readFileSync(filename,'utf8')).records;
 return {topic,records};
});
const all=batches.flatMap(b=>b.records);

test('18-B T02: all 208 distinct IDs and official definition contracts',()=>{
 assert.equal(all.length,208);
 assert.equal(new Set(all.map(r=>r.definition.id)).size,208);
 assert.equal(new Set(all.map(r=>r.story.resourceId)).size,208);
 assert.doesNotThrow(()=>validateEventDefinitions(all.map(r=>r.definition)));
});

for(const {topic,records} of batches){
 test('18-B T02-'+topic+': 26 draft stories pass original validateStory without being published',()=>{
  assert.equal(records.length,26);
  const problems=[];
  for(const r of records){
   try{
    assert.equal(r.story.resourceId,r.definition.content.resourceId);
    assert.equal(r.story.definitionId,r.definition.id);
    assert.equal(r.story.topicId,r.definition.topicId);
    assert.equal(r.story.status,'engineering-test');
    assert.equal(r.definition.content.status,'engineering-test');
    validateStory(r.story);
   }catch(error){problems.push(r.definition.id+': '+error.message);}
  }
  assert.deepEqual(problems.slice(0,20),[],problems.length+' structural problem(s) in '+topic);
 });
}
