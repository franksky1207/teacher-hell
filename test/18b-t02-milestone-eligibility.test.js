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
