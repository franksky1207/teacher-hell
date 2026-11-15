/** Grade-only eligibility regression: no whole-career simulation or real draft publication. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {eventWorld,definition} from './support/event-fixtures.js';
import {buildEventCandidates,validateEventDefinitions} from '../src/runtime/event-candidates.js';
import {gradeAt} from '../src/calendar/calendar.js';

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
