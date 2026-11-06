import test from 'node:test';
import assert from 'node:assert/strict';
import {makeTeacherProfile,teacherDisplayName,TEACHER_PROFILE_KEY} from '../src/runtime/teacher-profile.js';
import {createCareerOpening} from '../src/runtime/opening.js';
import {createCandidate} from '../src/player/creation.js';
import {restoreWorldState} from '../src/runtime/model.js';

test('Teacher display names accept Chinese single/compound surnames and reject invalid input',()=>{
 for(const [surname,givenName] of [['陳','小明'],['歐陽','娜娜'],['王','小芳芳']]){
  const p=makeTeacherProfile(surname,givenName);
  assert.equal(teacherDisplayName({extensions:{[TEACHER_PROFILE_KEY]:p}}),surname+givenName);
 }
 for(const [surname,givenName] of [['','小明'],['王',''],['王','小明明明'],['A','小明'],['王','明1']]){
  assert.throws(()=>makeTeacherProfile(surname,givenName));
 }
 assert.equal(teacherDisplayName({extensions:{}}),'導師');
});

test('Named teacher survives formal opening without changing player identity',()=>{
 const playerId='teacher',candidate=createCandidate({seed:118,playerId,schoolId:'school'});
 const w=createCareerOpening({candidate,seed:119,taipeiDate:'2026-11-06',difficulty:'hard',subject:'國文',careerKey:'teacher-profile-targeted',teacherName:{surname:'陳',givenName:'明德'}});
 assert.equal(w.identity.playerId,playerId);
 assert.equal(teacherDisplayName(w),'陳明德');
 const roundtrip=restoreWorldState(JSON.parse(JSON.stringify(w)));
 assert.equal(teacherDisplayName(roundtrip),'陳明德');
 assert.equal(roundtrip.identity.playerId,playerId);
});
