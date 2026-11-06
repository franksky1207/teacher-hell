import test from 'node:test';
import assert from 'node:assert/strict';
import {seniorRosterAt} from '../src/runtime/academic-roster.js';
import {event,open,fact,request} from './support/runtime.js';
import {academicAt,academicApply as apply} from './support/senior-academic.js';
import {restoreSave,createSave,encodeSave} from '../src/storage/format.js';
import {runtimeOf} from '../src/runtime/model.js';
import {prepareWorldOperation} from '../src/runtime/transactions.js';
import {academicState} from '../src/runtime/academics.js';
import {readFileSync} from 'node:fs';
import {gunzipSync} from 'node:zlib';
const entry=(id,personId,from,until,reason='initial',classId='home')=>({id,personId,from,until,reason,classId});
const row=(change,order)=>({type:'school',order,at:{date:'2029-05-31'},data:{change}});
const world=(entries,history)=>({numeric:{evolution:{world:{registry:{homeClassId:'home',classes:{home:{cohortStart:2026},other:{cohortStart:2025}},enrollments:entries,transfers:[]}}}},extensions:{'teacher-hell/world':{history}}});

test('H2 roster: a same-day departure belongs only to prefixes after its receipt',()=>{
 const entries=[entry('1','a','2026-07-20','2029-05-31'),entry('2','b','2026-07-20',null)];
 assert.deepEqual(seniorRosterAt(world(entries,[]),'2029-05-31').people.map(p=>p.id),['a','b']);
 assert.deepEqual(seniorRosterAt(world(entries,[row({type:'school-leave',personId:'a'},1)]),'2029-05-31').people.map(p=>p.id),['b']);
});
test('H2 roster: a later same-day arrival cannot leak into an earlier qualification snapshot',()=>{
 const entries=[entry('1','a','2026-07-20',null),entry('2','c','2029-05-31',null,'arrival')],later=row({type:'school-enroll',personId:null,classId:'home',source:'arrival'},2);
 assert.deepEqual(seniorRosterAt(world(entries,[]),'2029-05-31').people.map(p=>p.id),['a']);
 assert.deepEqual(seniorRosterAt(world(entries,[later]),'2029-05-31').people.map(p=>p.id),['a','c']);
});
test('H2 roster: class changes and returns preserve durable identities and known prior cohorts',()=>{
 const entries=[entry('1','a','2027-02-01','2029-05-31','initial','other'),entry('2','a','2029-05-31',null,'return')],h=row({type:'school-enroll',personId:'a',classId:'home',source:'return'},2);
 assert.deepEqual(seniorRosterAt(world(entries,[]),'2029-05-31').people,[]);assert.deepEqual(seniorRosterAt(world(entries,[h]),'2029-05-31').people,[{id:'a',cohort:2026,entryYears:[2025,2026]}]);
});
function procedure(w,ops,tag){return prepareWorldOperation(w,{...request(w,tag+'-'+runtimeOf(w).revision,ops),calendarContext:{kind:'procedure'}}).world;}
function cause(w,tag){const e=event(w,tag);e.definitionId='procedure:academic-roster';const f=fact(e,tag,{subjectIds:e.participantIds});return {world:procedure(w,[open(e),f],tag),id:f.id};}
test('H2 roster production: release after a departure and later arrival replays by exact prefix through save roundtrip',()=>{
 const old=JSON.parse(gunzipSync(readFileSync(new URL('./fixtures/h2-pre-061bf63.json.gz',import.meta.url))));let w=apply(old.h1.world,[{type:'academic',action:'adopt-senior-policy'}]);w=academicAt(w,'2029-05-08','p8');w=apply(w,[{type:'school-action',activity:'automatic'}]);w=apply(w,[{type:'school-action',activity:'rest'}]);
 const id=w.numeric.evolution.world.classroom.studentIds[0];let c=cause(w,'depart');w=procedure(c.world,[{type:'school',basisFactId:c.id,change:{type:'school-leave',personId:id,status:'transferred-out',reason:c.id}}],'leave');
 w=apply(w,[{type:'school-action',activity:'routine'}]);const release=runtimeOf(w).history.find(h=>h.type==='academic'&&h.data.input.action==='release');assert.equal(release.data.input.activeIds.length,39);assert.ok(!release.data.input.activeIds.includes(id));
 c=cause(w,'arrive');w=procedure(c.world,[{type:'school',basisFactId:c.id,change:{type:'school-enroll',personId:null,classId:w.numeric.evolution.world.registry.homeClassId,action:'transfer-in',source:c.id}}],'enroll');assert.equal(w.numeric.evolution.world.classroom.studentIds.length,40);assert.equal(academicState(w).terms['2029:spring'].publishedAt,'2029-05-09');assert.deepEqual(restoreSave(encodeSave(createSave(w))).world,w);
});
