import test from 'node:test';
import assert from 'node:assert/strict';
import { createId, validateId, validateMoment, validateEventEnvelope, validateFoundationEnvelope, restoreFoundationEnvelope } from '../src/contracts/foundation.js';
import { restoreSettlement } from '../src/changes/settlement.js';
import { foundationScenario } from './support/scenarios.js';

const base = foundationScenario();
const copy = () => structuredClone(base);

test('contract: typed tuple IDs are deterministic, collision-safe and preserve repeated parts', () => {
  const a=createId('event',['a:b','c']), b=createId('event',['a','b:c']);
  assert.notEqual(a,b); assert.equal(validateId(a,'event'),a);
  assert.equal(createId('attempt',['1','1']), 'attempt:["1","1"]');
  for (const call of [() => createId('person', ['a']), () => createId('event',[]), () => createId('event',['']),
    () => createId('event',Array(2)), () => createId('event',[1]), () => validateId(a,'fact'),
    () => validateId('event: ["a"]','event'), () => validateId('event:[','event')]) assert.throws(call);
});

test('contract: civil moments allow opaque slots, never certify a school calendar', () => {
  const moment={date:'2028-02-29',slotId:'future-calendar-key'};
  assert.equal(validateMoment(moment),moment);
  assert.throws(()=>validateMoment(base.position));
  for (const date of ['2026-02-29','2026-8-03','0000-01-01']) assert.throws(()=>validateMoment({...moment,date}));
  assert.throws(()=>validateMoment({...moment,slotId:''}));
});

test('contract: numeric v1 is preserved and roundtrip returns detached data without draws', () => {
  const before=JSON.stringify(base), restored=restoreFoundationEnvelope(before);
  assert.deepEqual(restored,base); assert.deepEqual(restoreSettlement(restored.numeric),base.numeric);
  restored.numeric.evolution.world.player.current.person['2-3']=20;
  restored.events[0].choice.options[0].id='outside';
  assert.equal(JSON.stringify(base),before);
  assert.equal(validateFoundationEnvelope(base),base);
});

test('contract: legacy attempt IDs remain accepted without renaming existing numeric identities', () => {
  const x=copy(); x.identity.attemptId=x.numeric.attemptId='legacy:Y1:A1';
  assert.equal(restoreFoundationEnvelope(x).numeric.attemptId,'legacy:Y1:A1');
  assert.deepEqual(x.numeric.evolution.world,base.numeric.evolution.world);
});

test('contract: same natural person can carry distinct cross-cohort enrollment references', () => {
  assert.equal(base.enrollments[0].personId,base.enrollments[1].personId);
  assert.notEqual(base.enrollments[0].id,base.enrollments[1].id);
  assert.notEqual(base.enrollments[0].classId,base.enrollments[1].classId);
  assert.doesNotThrow(() => validateFoundationEnvelope(base));
  for (const mutate of [x=>{x.enrollments[1].id=x.enrollments[0].id;}, x=>{x.enrollments[0].personId='missing';},
    x=>{x.enrollments[0].until={date:'2025-01-01',slotId:'end'};}, x=>{x.enrollments[0].cohortId=x.enrollments[0].id;}]) {
    const x=copy(); mutate(x); assert.throws(() => validateFoundationEnvelope(x));
  }
});

test('contract: one objective fact supports multiple subjects and facets without duplicating effects', () => {
  const x=copy(), e=x.events[0], first=e.results[0];
  e.results.push({...first,id:createId('result',['another-facet']),facet:'relationship',effectIds:[]});
  assert.equal(new Set(e.results.map(r=>r.factId)).size,1);
  assert.doesNotThrow(()=>validateFoundationEnvelope(x));
  for (const mutate of [v=>{v.results[1].id=v.results[0].id;}, v=>{v.results[1].effectIds=v.results[0].effectIds;},
    v=>{v.results[1].subjectId='teacher';}, v=>{v.results[1].factId=createId('fact',['missing']);},
    v=>{v.results[1].subjectId=v.results[0].subjectId;}]) {
    const event=structuredClone(base.events[0]); mutate(event); assert.throws(()=>validateEventEnvelope(event));
  }
});

test('contract: objective occurrence does not grant player knowledge or belief', () => {
  const e=base.events[0];
  assert.ok(e.participantIds.includes('teacher')); assert.ok(!e.knowledge.some(k=>k.actorId==='teacher'));
  assert.equal(e.knowledge[0].believed,false);
  for (const mutate of [v=>{v.knowledge[0].actorId='missing';},v=>{v.knowledge[0].factId=createId('fact',['missing']);},
    v=>{v.knowledge[0].acquiredAt.date='2026-08-02';},v=>{v.knowledge[0].believed='true';},
    v=>{v.knowledge.push(structuredClone(v.knowledge[0]));}]) {
    const event=structuredClone(e); mutate(event); assert.throws(()=>validateEventEnvelope(event));
  }
});

test('contract: choice carrier enforces count, emotion marker and confirmed-option reference only', () => {
  for (const count of [3,8]) {
    const e=structuredClone(base.events[0]);
    e.choice.options=Array.from({length:count},(_,i)=>({id:String(i),emotional:i===0}));e.choice.confirmedOptionId='0';
    assert.doesNotThrow(()=>validateEventEnvelope(e));
  }
  for (const mutate of [e=>{e.choice.options.pop();},e=>{e.choice.options=Array.from({length:9},(_,i)=>({id:String(i),emotional:true}));},
    e=>{e.choice.options.forEach(o=>{o.emotional=false;});},e=>{e.choice.options[1].id=e.choice.options[0].id;},
    e=>{e.choice.confirmedOptionId='missing';},e=>{e.type='followup';}]) {
    const e=structuredClone(base.events[0]);mutate(e);assert.throws(()=>validateEventEnvelope(e));
  }
  const e=structuredClone(base.events[0]);e.choice=null;assert.doesNotThrow(()=>validateEventEnvelope(e));
});

test('contract: mismatched versions, clock, identity and malformed numeric sources fail with context', () => {
  for (const mutate of [x=>{x.schemaVersion=2;},x=>{x.versions.save=2;},x=>{x.versions.world=2;},
    x=>{x.versions.rules='';},x=>{x.position.serviceYear=31;},x=>{x.position.serviceYear=2;},
    x=>{x.position.date='2026-08-04';},x=>{x.position.schoolYearId='other';},x=>{x.position.openingId='other';},
    x=>{x.identity.playerId='other';},x=>{x.identity.attemptId='other';},x=>{x.identity.schoolId='other';},
    x=>{x.random.events.version=2;},x=>{x.random.natural=x.random.events;},x=>{x.extensions.bad={};},x=>{x.extra={};},
    x=>{x.numeric.evolution.world.player.current.person['2-3']=NaN;}]) {
    const x=copy();mutate(x);assert.throws(()=>restoreFoundationEnvelope(x));
  }
  const x=copy();x.position.serviceYear=0;assert.throws(()=>restoreFoundationEnvelope(x),/position.serviceYear/);
});

test('contract: hostile non-JSON inputs reject before getters or alias mutation', () => {
  let called=false;const x=copy();Object.defineProperty(x,'events',{enumerable:true,get(){called=true;return [];}});
  assert.throws(()=>restoreFoundationEnvelope(x));assert.equal(called,false);
  for (const mutate of [v=>{v.events=Array(1);},v=>{v.extensions['teacher-hell/test']={bad:undefined};},
    v=>{v.random.events={algorithm:'other',version:1,state:0};},v=>{v.events[0].participantIds.push('missing');}]) {
    const v=copy();mutate(v);assert.throws(()=>restoreFoundationEnvelope(v));
  }
});

test('contract: shared fact references across events must agree; IDs and effects remain unique', () => {
  const x=copy(), e=structuredClone(x.events[0]);e.id=createId('event',['linked']);e.results=[];x.events.push(e);
  assert.doesNotThrow(()=>validateFoundationEnvelope(x));
  e.facts[0].occurredAt.date='2026-08-02';assert.throws(()=>validateFoundationEnvelope(x),/conflicting shared fact/);
});
