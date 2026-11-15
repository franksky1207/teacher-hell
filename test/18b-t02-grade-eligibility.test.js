import {readFileSync} from 'node:fs';
/** Grade-only eligibility regression: no whole-career simulation or real draft publication. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {eventWorld,definition} from './support/event-fixtures.js';
import {buildEventCandidates,validateEventDefinitions,findReunionContact} from '../src/runtime/event-candidates.js';
import {gradeAt,assessmentCalendar,SENIOR_CALENDAR_VERSION} from '../src/calendar/calendar.js';
import {admissionCalendar} from '../src/calendar/admissions.js';
import {validateStory} from '../src/runtime/story-content.js';
import {entranceCondition,graduatedEntrantsForAftercarePhase} from '../src/runtime/entrance.js';

test('18-B T02: year-three-only story cannot enter year-one candidate pool',()=>{
 const world=eventWorld(1,'2026-09-10','early'),currentGrade=gradeAt(world.position.date,world.numeric.evolution.world.registry.cohortStart);
 assert.equal(currentGrade,1);
 const eligible=definition('test:grade-one');
 eligible.eligibility.grades=[1];
 const blocked=definition('test:grade-three');
 blocked.eligibility.grades=[3];
 validateEventDefinitions([eligible,blocked]);
 const result=buildEventCandidates(world,[eligible,blocked],{engineering:true});
 assert.ok(result.candidates.some(c=>c.definitionId===eligible.id),'same-day correct grade stays eligible');
 assert.ok(!result.candidates.some(c=>c.definitionId===blocked.id),'senior event never appears in grade one');
 assert.ok(result.rejected.some(c=>c.reason==='grade-condition'),'explicit grade rejection is traceable');
});

test('18-B T02: invalid grade qualification fails original definition validator',()=>{
 const broken=definition('test:invalid-grade');
 broken.eligibility.grades=[4];
 assert.throws(()=>validateEventDefinitions([broken]),RangeError);
});


test('18-B T02: cohort-based calendar advances to grade three and only that grade qualifies',()=>{
 const world=eventWorld(1,'2028-09-11','early');
 assert.equal(gradeAt(world.position.date,world.numeric.evolution.world.registry.cohortStart),3);
 const senior=definition('test:senior-eligible');senior.eligibility.grades=[3];
 const junior=definition('test:junior-blocked');junior.eligibility.grades=[1];
 const result=buildEventCandidates(world,[senior,junior],{engineering:true});
 assert.ok(result.candidates.some(c=>c.definitionId===senior.id));
 assert.ok(!result.candidates.some(c=>c.definitionId===junior.id));
});

test('18-B T02: admissions milestone requires a recorded phase, not a story date alone',()=>{
 const studentId='student-example';
 const pending={entrance:{students:{[studentId]:{route:'subject-preparing',applications:[],offers:[]}},completed:[]}};
 const milestone={kind:'milestone-completed',value:'application-screen'};
 assert.equal(entranceCondition(pending,studentId,milestone),false);
 const completed={entrance:{...pending.entrance,completed:[{id:'application-screen'}]}};
 assert.equal(entranceCondition(completed,studentId,milestone),true);
 assert.equal(entranceCondition(completed,studentId,{kind:'subject-preparing'}),true);
});


test('18-B T02: alumni reunion must be supported by a same-day contact with the teacher',()=>{
 const facts=new Map([
  ['earlier',{id:'earlier',data:{type:'contact'},subjectIds:['graduate','teacher'],occurredAt:{date:'2029-07-10'}}],
  ['no-teacher',{id:'no-teacher',data:{type:'contact'},subjectIds:['graduate','other'],occurredAt:{date:'2029-07-11'}}],
  ['valid',{id:'valid',data:{type:'contact'},subjectIds:['graduate','teacher'],occurredAt:{date:'2029-07-11'}}]
 ]);
 assert.equal(findReunionContact(facts,'graduate','teacher','2029-07-11')?.id,'valid');
 assert.equal(findReunionContact(facts,'graduate','teacher','2029-07-12'),null);
 assert.equal(findReunionContact(facts,'other','teacher','2029-07-11'),null);
});


test('18-B T02: pre-graduation subject stories use reachable recorded stages',()=>{
 const source=JSON.parse(readFileSync(new URL('../work/18b-t02-07-authoring.json',import.meta.url),'utf8'));
 const byId=new Map(source.records.map(record=>[record.definition.id,record.definition]));
 const ids=['01','04','08','09','11','25'];
 assert.equal(gradeAt('2029-05-30',2026),3);
 const ceremony=assessmentCalendar('2029:spring',3,SENIOR_CALENDAR_VERSION).ceremonyDate;
 const registration=admissionCalendar(2026,SENIOR_CALENDAR_VERSION).find(x=>x.kind==='subject-register').date;
 assert.ok(ceremony<registration,'the game school graduation precedes subject registration');
 for(const id of ids){
  const definition=byId.get('content:18b-t02-07-'+id);
  assert.deepEqual(definition.eligibility.grades,[3]);
  assert.ok(definition.eligibility.entrance.length>0);
  assert.ok(!definition.eligibility.entrance.some(g=>g.kind==='subject-preparing'),id+' may not depend on post-graduation subject registration');
 }
 for(const id of ['08','25']){
  assert.ok(byId.get('content:18b-t02-07-'+id).eligibility.entrance.some(g=>g.kind==='milestone-completed'));
 }
 const laterCase=byId.get('content:18b-t02-07-07');
 assert.ok(laterCase.eligibility.entrance.some(g=>g.kind==='subject-preparing'));
 assert.deepEqual(laterCase.eligibility.people,['reunion']);
 assert.deepEqual(laterCase.eligibility.dayKinds,['aftercare']);
 assert.deepEqual(laterCase.eligibility.slotIds,['private']);
 assert.ok(laterCase.eligibility.entrance.some(g=>g.kind==='milestone-completed'&&g.value==='subject-register'));
 assert.ok(!laterCase.eligibility.dayKinds.includes('school'));
 validateEventDefinitions([laterCase]);
});


test('18-B T02: post-ceremony subject registration retains graduated students, not transfer-outs or other cohorts',()=>{
 const registry={classes:{own:{cohortStart:2026},other:{cohortStart:2025}},enrollments:[
  {personId:'grad',classId:'own',status:'graduated'},
  {personId:'transfer',classId:'own',status:'transferred-out'},
  {personId:'unfinished',classId:'own',status:'incomplete'},
  {personId:'older',classId:'other',status:'graduated'},
  {personId:'not-adopted',classId:'own',status:'graduated'}
 ]};
 const entrance={cohort:2026,students:{grad:{continuous:true},transfer:{},unfinished:{},older:{}}};
 assert.deepEqual(graduatedEntrantsForAftercarePhase(registry,entrance,'subject-register',true),['grad']);
 assert.deepEqual(graduatedEntrantsForAftercarePhase(registry,null,'subject-register',true),[]);
 for(const phase of ['stars8-result','application-allocation','application-confirm','subject-register'])assert.deepEqual(graduatedEntrantsForAftercarePhase(registry,entrance,phase,true),['grad'],phase);
 for(const phase of ['init','guidance','withdraw','decision','eligibility'])assert.deepEqual(graduatedEntrantsForAftercarePhase(registry,entrance,phase,true),[],phase);
 assert.deepEqual(graduatedEntrantsForAftercarePhase(registry,entrance,'subject-register',false),[]);
});


test('18-B T02: five targeted revised story/definition pairs compile under official validators',()=>{
 const selected={"05":['28'],"06":['20'],"07":['01','07'],"08":['28']};
 for(const [topic,ids] of Object.entries(selected)){
  const file=JSON.parse(readFileSync(new URL('../work/18b-t02-'+topic+'-authoring.json',import.meta.url),'utf8'));
  for(const id of ids){
   const expectedId='content:18b-t02-'+topic+'-'+id;
   const pair=file.records.find(x=>x.definition.id===expectedId);
   assert.ok(pair,expectedId+' must exist');
   assert.doesNotThrow(()=>validateStory(pair.story),expectedId+' story');
   assert.doesNotThrow(()=>validateEventDefinitions([pair.definition]),expectedId+' definition');
   assert.equal(pair.story.definitionId,pair.definition.id);
   assert.equal(pair.story.status,'engineering-test');
  }
 }
});


test('18-B T02: one-shot structural validation of all 208 isolated author records',()=>{
 const errors=[],ids=new Set(),all=[];
 for(let part=1;part<=8;part++){
  const topic=String(part).padStart(2,'0');
  const file=JSON.parse(readFileSync(new URL('../work/18b-t02-'+topic+'-authoring.json',import.meta.url),'utf8'));
  assert.equal(file.records.length,26,'T02-'+topic+' record count');
  for(const pair of file.records){
   const id=pair.definition?.id??'(missing-id)';
   if(ids.has(id))errors.push(id+': duplicate definition ID');
   ids.add(id);all.push(pair);
   try{validateStory(pair.story);}catch(e){errors.push(id+': story '+e.message);}
   try{validateEventDefinitions([pair.definition]);}catch(e){errors.push(id+': definition '+e.message);}
   if(pair.story?.definitionId!==id||pair.story?.resourceId!==pair.definition?.content?.resourceId)errors.push(id+': mismatched resource reference');
  }
 }
 assert.equal(all.length,208);
 assert.deepEqual(errors,[],errors.join('\\n'));
});
