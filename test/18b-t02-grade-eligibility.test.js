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


test('18-B T02: 20 explicitly year-bound narratives use valid grade eligibility',()=>{
 const expected={
  '01':{'05':[1],'08':[1],'09':[1],'15':[1],'16':[1],'18':[2,3],'22':[1],'25':[1],'26':[1],'27':[2,3]},
  '03':{'05':[3],'06':[3],'20':[3],'21':[3],'28':[3]},
  '04':{'04':[3],'12':[1],'15':[3],'25':[3]},
  '08':{'23':[3]}
 };
 const definitions=[];let checked=0;
 for(const [topic,ids] of Object.entries(expected)){
  const file=JSON.parse(readFileSync(new URL('../work/18b-t02-'+topic+'-authoring.json',import.meta.url),'utf8'));
  for(const [id,grades] of Object.entries(ids)){
   const pair=file.records.find(x=>x.definition.id==='content:18b-t02-'+topic+'-'+id);
   assert.ok(pair,topic+'-'+id);
   assert.deepEqual(pair.definition.eligibility.grades,grades,topic+'-'+id);
   assert.doesNotThrow(()=>validateStory(pair.story));
   definitions.push(pair.definition);checked++;
  }
 }
 assert.equal(checked,20);
 assert.doesNotThrow(()=>validateEventDefinitions(definitions));
 const file=JSON.parse(readFileSync(new URL('../work/18b-t02-03-authoring.json',import.meta.url),'utf8'));
 const graduation=file.records.find(x=>x.definition.id==='content:18b-t02-03-28');
 assert.deepEqual(graduation.definition.eligibility.dayKinds,['school']);
 assert.ok(graduation.story.stages[0].pages.every(p=>p.scene==='school:classroom'));
 assert.ok(!graduation.story.stages[0].pages.some(p=>p.text.includes('彩排')));
});


test('18-B T02: 23 repaired school-time and admissions-stage story records remain structurally legal',()=>{
 const changed={
  '05':['04','09','10','15','17','20','21','27'],
  '06':['08','13','14','19','21','23','26','28'],
  '07':['02','05','09','12','15','21','26']
 };
 const all=[],byId=new Map();
 for(const [topic,ids] of Object.entries(changed)){
  const file=JSON.parse(readFileSync(new URL('../work/18b-t02-'+topic+'-authoring.json',import.meta.url),'utf8'));
  for(const id of ids){
   const key='content:18b-t02-'+topic+'-'+id,record=file.records.find(r=>r.definition.id===key);
   assert.ok(record,key+' must be present');
   assert.doesNotThrow(()=>validateStory(record.story),key+' validateStory');
   assert.equal(record.story.status,'engineering-test');
   assert.equal(record.definition.content.status,'engineering-test');
   all.push(record.definition);
   byId.set(key,record);
  }
 }
 assert.equal(all.length,23);
 assert.doesNotThrow(()=>validateEventDefinitions(all));
 const kinds=key=>(byId.get('content:18b-'+key).definition.eligibility.entrance??[]).map(e=>e.kind+':'+(e.value??''));
 assert.ok(kinds('t02-06-08').includes('application-screened:'));
 assert.ok(kinds('t02-06-21').includes('milestone-completed:application-register'));
 assert.ok(kinds('t02-06-26').includes('milestone-completed:application-result'));
 for(const id of ['12','15','26'])assert.ok(kinds('t02-07-'+id).includes('gsat-published:'));
 for(const t of ['t02-07-12','t02-06-26']){
  const pages=byId.get('content:18b-'+t).story.stages[0].pages;
  const rec=byId.get('content:18b-'+t);
  const spoken=pages.find(p=>p.speaker==='participant')?.text;
  for(const c of rec.story.stages[0].choices)for(const claim of c.outcome.claims??[])if(claim.role==='participant')assert.equal(claim.statement,spoken,t);
 }
});


test('18-B T02 Hydrogen: remote chat must not fabricate physical contact; caregiver phone has proper provenance',()=>{
 const physicallyRemote=new Set(['01-25','02-12','06-08','06-12','06-14','06-20','06-21','06-27','06-28','07-12','07-20','07-26']);
 const caregiverPhone=new Set(['02-08','02-22','03-14','04-13','04-23']);
 const ids=new Set([...physicallyRemote,...caregiverPhone]);
 for(const [topic] of [...new Set([...ids].map(x=>x.slice(0,2)))].map(x=>[x])){
  const records=JSON.parse(readFileSync(new URL('../work/18b-t02-'+topic+'-authoring.json',import.meta.url),'utf8')).records;
  for(const shortId of [...ids].filter(x=>x.startsWith(topic+'-'))){
   const pair=records.find(x=>x.definition.id==='content:18b-t02-'+shortId);
   assert.ok(pair,'missing '+shortId);
   const stage=pair.story.stages[0];
   if(physicallyRemote.has(shortId))for(const c of stage.choices)assert.deepEqual(c.outcome.world.contacts,[],shortId+' must not record in-person encounter');
   if(caregiverPhone.has(shortId)){
    assert.equal(stage.pages[1].presentation,'phone',shortId);
    for(const c of stage.choices)for(const t of c.outcome.world.transmissions)assert.ok(!t.description.startsWith('學生以遠距通訊'),shortId);
   }
   assert.doesNotThrow(()=>validateStory(pair.story),shortId);
  }
 }
});
