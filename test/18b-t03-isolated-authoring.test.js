import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {T03_BATCH_RECORDS} from '../src/runtime/content/t03.js';
import {validateStory} from '../src/runtime/story-content.js';
import {validateEventDefinitions,buildEventCandidates} from '../src/runtime/event-candidates.js';
import {eventWorld} from './support/event-fixtures.js';
import {applySchoolOperation} from '../src/world/registry.js';
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
  assert.ok(explored.scenarios.length>20);
  assert.equal(screen.evaluations.length,explored.scenarios.length);
  assert.ok(drafts.records.every(r=>r.definition.content.status==='engineering-test'));
  assert.ok(new Set(drafts.records.map(r=>r.definition.id)).size===drafts.records.length);
  assert.ok(drafts.records.every(r=>r.story.status!=='ready'));
 }
});

test('Newcomer narratives cannot be assigned to the original 40 students',()=>{
 const gated=new Set([1,2,3,4,5,10,12,13,14,17,21,22,24,25].map(n=>'content:18b-t03-05-'+String(n).padStart(2,'0')));
 const definitions=source('05').records.map(r=>r.definition);
 for(const d of definitions)if(gated.has(d.id))assert.deepEqual(d.eligibility.roleIds,[17],d.id);
 const w=eventWorld(74,'2028-09-11','early');
 const roster=w.numeric.evolution.world.classroom.studentIds;
 assert.equal(roster.length,40);
 assert.ok(roster.every(id=>!w.numeric.evolution.world.people[id].roleIds.includes(17)));
 const candidates=buildEventCandidates(w,definitions.filter(d=>gated.has(d.id)),{engineering:true});
 assert.equal(candidates.candidates.length,0,'Opening-class students must not be mistaken for new transfers');
});

test('T03 genuine enrollment history produces legitimate candidates while initial roster is excluded',()=>{
 const newcomer=source('05').records.find(r=>r.definition.id==='content:18b-t03-05-01').definition;
 const returning=source('06').records.find(r=>r.definition.id==='content:18b-t03-06-05').definition;
 const w=eventWorld(74,'2027-03-11','early');
 const n=w.numeric.evolution.world;
 const first=n.classroom.studentIds[0],home=n.registry.homeClassId;
 const old=buildEventCandidates(w,[newcomer,returning],{engineering:true});
 assert.equal(old.candidates.length,0,'No original student may masquerade as a newcomer or recent returnee');
 applySchoolOperation(n,{type:'school-leave',personId:first,status:'suspended',reason:'test:documented-leave'},'2027-02-01');
 applySchoolOperation(n,{type:'school-enroll',personId:first,classId:home,action:'return',source:'test:documented-return'},'2027-03-01');
 const before=new Set(Object.keys(n.people));
 applySchoolOperation(n,{type:'school-enroll',personId:null,classId:home,action:'transfer-in',source:'test:transfer'},'2027-03-08');
 const entrant=Object.keys(n.people).find(id=>!before.has(id)&&n.people[id].kind==='student');
 assert.ok(entrant,'real transfer generated a student');
 assert.ok(n.people[entrant].roleIds.includes(17),'newcomer role comes from registry');
 const chosen=buildEventCandidates(w,[newcomer,returning],{engineering:true}).candidates;
 assert.ok(chosen.some(c=>c.definitionId===newcomer.id&&c.participantIds[0]===entrant),'newcomer is actually eligible');
 assert.ok(chosen.some(c=>c.definitionId===returning.id&&c.participantIds[0]===first),'returned student is eligible');
 assert.ok(!chosen.some(c=>c.definitionId===newcomer.id&&c.participantIds[0]===first),'returnee is not masquerading as transfer newcomer');
});
