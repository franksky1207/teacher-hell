/** T02 targeted entrance milestone validation; no full-world simulation. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { entranceCondition } from '../src/runtime/entrance.js';
import { validateEventDefinitions } from '../src/runtime/event-candidates.js';
import { definition } from './support/event-fixtures.js';

test('T02: admissions story cannot trigger before its real completed node',()=>{
 const s={entrance:{completed:[],students:{student1:{route:'subject-preparing',applications:[]}}}};
 const gate={kind:'milestone-completed',value:'application-screen'};
 assert.equal(entranceCondition(s,'student1',gate),false);
 s.entrance.completed.push({id:'gsat-release',kind:'gsat-release',date:'2029-02-26'});
 assert.equal(entranceCondition(s,'student1',gate),false);
 s.entrance.completed.push({id:'application-screen',kind:'application-screen',date:'2029-04-16'});
 assert.equal(entranceCondition(s,'student1',gate),true);
 assert.equal(entranceCondition(s,'unknown',gate),false);
});

test('T02: known milestone condition retains strict event definition validation',()=>{
 const d=definition('test:t02-milestone');
 d.eligibility.grades=[3];
 d.eligibility.entrance=[{kind:'milestone-completed',value:'application-result'}];
 assert.doesNotThrow(()=>validateEventDefinitions([d]));
 d.eligibility.entrance=[{kind:'milestone-completed'}];
 assert.throws(()=>validateEventDefinitions([d]),RangeError);
});

test('T02: applicant stages are checked per actual student, not only school-wide dates',()=>{
 const s={entrance:{completed:[{id:'application-screen'},{id:'application-review'},{id:'application-result'}],students:{
  screened:{applications:[{status:'screened',screenedAt:'2029-04-16'}],offers:[]},
  rejected:{applications:[{status:'rejected',screenedAt:'2029-04-16'}],offers:[]},
  reviewed:{applications:[{status:'rejected',reviewedAt:'2029-05-15'}],offers:[]},
  admitted:{applications:[{status:'regular',reviewedAt:'2029-05-15'}],offers:[{route:'application',status:'regular'}]},
  waiting:{applications:[{status:'waitlist',reviewedAt:'2029-05-15'}],offers:[{route:'application',status:'waitlist'}]}
 }}};
 assert.equal(entranceCondition(s,'screened',{kind:'application-screened'}),true);
 assert.equal(!!entranceCondition(s,'rejected',{kind:'application-screened'}),false);
 assert.equal(entranceCondition(s,'reviewed',{kind:'application-reviewed'}),true);
 assert.equal(entranceCondition(s,'admitted',{kind:'application-accepted'}),true);
 assert.equal(!!entranceCondition(s,'waiting',{kind:'application-accepted'}),false);
});
