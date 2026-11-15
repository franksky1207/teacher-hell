import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateStory} from '../src/runtime/story-content.js';
import {validateEventDefinitions} from '../src/runtime/event-candidates.js';

// These are editorial drafts, not the production catalogue. Never count as published.
const topics=['T01-01','T01-02','T01-03','T01-04'];
const drafts=topics.flatMap(topic=>{
 const f='work/18b-t01-'+topic.slice(-2)+'-authoring.json';
 const data=JSON.parse(readFileSync(f,'utf8'));
 return data.records.map(record=>({...record,_topic:topic}));
});
test('all first-round T01 draft story structures (no runtime publication)',()=>{
 assert.ok(drafts.length>80);
 const ids=new Set(),causes=new Set();
 for(const record of drafts){
  const s=record.story;
  assert.equal(s.topicId,record._topic);
  assert.equal(s.status,'engineering-test');
  assert.ok(!ids.has(s.definitionId)); ids.add(s.definitionId);
  assert.ok(!causes.has(s.premise.description)); causes.add(s.premise.description);
  assert.equal(s.stages[0].choices.length,4);
  assert.equal(s.stages[0].choices.filter(x=>x.emotional).length,1);
  validateStory(s);
 }
 assert.equal(ids.size,drafts.length);
});
test('draft candidate metadata can meet six-axis contract without registering',()=>{
 const defs=drafts.map(record=>({
  id:record.story.definitionId,
  topicId:record.story.topicId,
  type:'direct',
  content:{resourceId:record.story.resourceId,version:'1',status:'engineering-test'},
  coreCodes:['1-2','1-3','1-4'],additionalCodes:['3-1','3-2','3-3'],
  weights:Array(6).fill(1/6),directions:[1,1,1,1,1,1],
  eligibility:{people:['student'],dayKinds:['school'],slotIds:['early','p4','p5','p6','p7','p8','lunch'],from:null,until:null,facts:[],history:[],numeric:[],enrollment:null},
  repetition:{cooldownDays:30,exclusionGroups:[],sameFact:true,reason:'Draft authoring placeholder, not yet licensed for publication'}
 }));
 validateEventDefinitions(defs);
 assert.equal(defs.length,drafts.length);
});