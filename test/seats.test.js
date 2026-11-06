import test from 'node:test';
import assert from 'node:assert/strict';
import {seatNumbers,schoolGender,compareSeatCandidates} from '../src/runtime/seats.js';
import {createCandidate} from '../src/player/creation.js';
import {createCareerOpening} from '../src/runtime/opening.js';
import {readSchoolRoster} from '../src/runtime/views.js';

const profile=(name,gender)=>({displayName:name,appearance:{variant:gender==='male'?2:3},gender});
const entry=(id,name,gender)=>({id,name,gender});
test('seat order: male before female; equal-surname pupils remain consecutive; given name is next',()=>{
 const registry={classes:{class1:{}},cohorts:[{classId:'class1',initialStudentIds:['m3','f2','m2','f1','m1']}],
  profiles:{m1:profile('王大明','male'),m2:profile('王志明','male'),m3:profile('吳小華','male'),
   f1:profile('王小華','female'),f2:profile('王志華','female')},enrollments:[]};
 const seats=seatNumbers(registry,'class1');
 assert.deepEqual([...seats.entries()].sort((a,b)=>a[1]-b[1]).map(([id])=>id),['m1','m2','m3','f1','f2']);
 assert.equal(compareSeatCandidates(entry('a','王大華','male'),entry('b','王志華','male'))<0,true);
 assert.equal(compareSeatCandidates(entry('a','王小宇','male'),entry('b','王大明','male'))<0,true,'second given-name stroke decides when first given-name strokes tie');
 assert.equal(compareSeatCandidates(entry('a','吳小華','male'),entry('b','李小華','male'))<0,true);
});
test('seat number remains stable after transfer out and re-entry; arrival goes after original 40',()=>{
 const ids=Array.from({length:40},(_,i)=>'s'+i),classId='class1';
 const registry={classes:{[classId]:{}},cohorts:[{classId,initialStudentIds:ids}],
  profiles:Object.fromEntries(ids.map((id,i)=>[id,profile('王'+(i%2?'志':'小')+'明',i%2?'female':'male')])),
  enrollments:[]};
 const original=seatNumbers(registry,classId),away=original.get('s0');
 registry.enrollments.push({id:'school-enrollment:41',personId:'new',classId,reason:'transfer-in'});
 registry.profiles.new=profile('王大華','male');
 const next=seatNumbers(registry,classId);
 assert.equal(next.size,41);assert.equal(next.get('new'),41);assert.equal(next.get('s0'),away);
 registry.enrollments.push({id:'school-enrollment:42',personId:'s0',classId,reason:'return'});
 assert.equal(seatNumbers(registry,classId).get('s0'),away);
 registry.enrollments.push({id:'school-enrollment:43',personId:'later',classId,reason:'transfer-in'});
 registry.profiles.later=profile('李志明','male');
 assert.equal(seatNumbers(registry,classId).get('later'),42);
});
test('formal initial roster has 40 fixed, unique, sorted seat numbers without altering saved world',()=>{
 const candidate=createCandidate({seed:31,playerId:'teacher',schoolId:'school'});
 const world=createCareerOpening({candidate,seed:32,taipeiDate:'2026-11-06',difficulty:'hard',subject:'國文',careerKey:'seat-targeted'});
 const before=JSON.stringify(world);
 const roster=readSchoolRoster(world);
 assert.deepEqual(roster.students.map(x=>x.seatNo),Array.from({length:40},(_,i)=>i+1));
 assert.equal(roster.students.every(x=>['male','female'].includes(x.gender)),true);
 assert.equal(JSON.stringify(world),before);
 const firstGirl=roster.students.findIndex(x=>x.gender==='female');
 if(firstGirl>=0)assert.equal(roster.students.slice(firstGirl).every(x=>x.gender==='female'),true);
 // Old profiles with no gender remain deterministic and need no migration.
 assert.equal(schoolGender({appearance:{variant:2}}),'male');
 assert.equal(schoolGender({appearance:{variant:3}}),'female');
});
