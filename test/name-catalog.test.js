import test from 'node:test';
import assert from 'node:assert/strict';
import {chooseSurname,chooseGivenName,surnameOf,NAME_CATALOG_COUNTS,GIVEN_NAME_CATALOG} from '../src/world/name-catalog.js';
import {createCandidate} from '../src/player/creation.js';
import {createCareerOpening} from '../src/runtime/opening.js';
import {readSchoolRoster} from '../src/runtime/views.js';

test('Extensive offline surname and given-name sources, with no unbounded retries',()=>{
 assert.ok(NAME_CATALOG_COUNTS.surnames>=200);
 assert.ok(NAME_CATALOG_COUNTS.male>=2500&&NAME_CATALOG_COUNTS.female>=2500);
 assert.equal(GIVEN_NAME_CATALOG.male.filter(name=>GIVEN_NAME_CATALOG.female.includes(name)).length,0,'No name belongs to both male and female pools');
 const rng={integer:(a,b)=>a};
 const used=new Set();
 assert.equal(chooseGivenName(rng,'male',used),GIVEN_NAME_CATALOG.male[0]);
 assert.equal(chooseGivenName(rng,'male',used),GIVEN_NAME_CATALOG.male[1]);
 assert.equal(surnameOf('歐陽宇軒'),'歐陽');
 assert.equal(surnameOf('陳宇軒'),'陳');
 assert.ok(chooseSurname(rng));
});
test('New school creates 40 distinct student given names, with family-aware parent surnames',()=>{
 const candidate=createCandidate({seed:1401,playerId:'teacher',schoolId:'school'});
 const w=createCareerOpening({candidate,seed:1402,taipeiDate:'2026-11-06',difficulty:'hard',subject:'國文',careerKey:'names-unique-family'});
 const roster=readSchoolRoster(w),reg=w.numeric.evolution.world.registry;
 assert.equal(roster.students.length,40);
 assert.deepEqual(roster.students.map(s=>s.seatNo),Array.from({length:40},(_,i)=>i+1));
 assert.equal(roster.students.filter(s=>s.gender==='male').length,20);
 assert.equal(roster.students.filter(s=>s.gender==='female').length,20);
 const allNames=Object.values(reg.profiles).map(p=>p.displayName.slice(surnameOf(p.displayName).length));
 assert.equal(new Set(allNames).size,allNames.length,'Parent, student and school staff given names must not collide');
 const given=roster.students.map(s=>s.name.slice(surnameOf(s.name).length));
 assert.equal(new Set(given).size,40);
 for(const student of roster.students){
  const surname=surnameOf(student.name),p=reg.profiles[student.id];
  for(const carer of student.caregivers){
   const c=reg.profiles[carer.id];
   if(c.familyRole==='father'&&p.appearance.variant%16!==0)assert.equal(surnameOf(c.displayName),surname);
   if(c.familyRole==='mother'&&p.appearance.variant%16===0)assert.equal(surnameOf(c.displayName),surname);
  }
 }
});
