import test from 'node:test';
import assert from 'node:assert/strict';
import {PACKAGE3_STORY} from '../src/runtime/story-content.js';
import {beginDemo,apply,storyAction,storyRequest} from './support/story-scenario.js';
import {runtimeOf,restoreWorldState} from '../src/runtime/model.js';
import {prepareWorldOperation,forkWorldAttempt} from '../src/runtime/transactions.js';
import {projectIssues} from '../src/runtime/issues.js';
import {compileConsequences} from '../src/runtime/story-consequences.js';
import {eventWorld} from './support/event-fixtures.js';
import {createId} from '../src/contracts/foundation.js';
import {directedKey} from '../src/world/relationships.js';
const start=()=>beginDemo(1,PACKAGE3_STORY);
const select=(w,id,option='listen')=>apply(w,[storyAction(id,'select',option)]);
const confirm=(w,id)=>apply(w,[storyAction(id,'confirm')]);
test('1: confirmed result opens and resolves one issue; unchosen outcome does nothing',()=>{
 let {world:w,eventId:id}=start();w=select(w,id);assert.equal(projectIssues(w).length,0);w=confirm(w,id);assert.equal(projectIssues(w)[0].state,'open');
 w=apply(w,[storyAction(id,'finish')]);w=select(w,id);w=confirm(w,id);assert.equal(projectIssues(w).length,1);assert.equal(projectIssues(w)[0].state,'closed');assert.deepEqual(restoreWorldState(JSON.stringify(w)),w);
 const other=start();assert.equal(projectIssues(confirm(select(other.world,other.eventId,'b'),other.eventId)).length,0);
});
test('2: precise witnesses and directional direct effect; missing evidence rejects',()=>{
 let {world:w,eventId:id}=start();const student=w.events[0].participantIds[0],teacher=w.identity.playerId;
 const office='staff:school:office:10:2';assert.equal(w.numeric.evolution.world.relationships[directedKey(office,teacher)],undefined);
 w=confirm(select(w,id),id);assert.ok(w.numeric.evolution.world.relationships[directedKey(office,teacher)]);const r=runtimeOf(w),row=r.history.find(h=>h.type==='effect'),changes=row.data.changes;
 assert.ok(changes.some(c=>c.target.id===directedKey(student,teacher)&&c.delta===2));assert.ok(!changes.some(c=>c.target.id===directedKey(teacher,student)));
 const fact=r.facts.find(f=>f.data.type==='story-action');assert.deepEqual(fact.witnessIds,[teacher,student]);assert.deepEqual(r.disclosures.filter(d=>d.factId===fact.id).map(d=>d.actorId),[teacher,student,office]);
 assert.equal(r.knowledge.find(k=>k.actorId===teacher).belief,'uncertain');
 const absent=w.numeric.evolution.world.classroom.studentIds.find(x=>x!==student);assert.ok(!r.disclosures.some(d=>d.actorId===absent));
 const out=structuredClone(PACKAGE3_STORY.stages[0].choices[0].outcome);out.world.contacts=[];
 assert.throws(()=>compileConsequences(w,w.events[0],PACKAGE3_STORY,out,{teacher,participant:student,office},'probe',null),/evidence/);
 assert.deepEqual(restoreWorldState(JSON.stringify(w)),w);
});
test('3: atomic rollback, idempotency, legacy and attempt isolation',()=>{
 let {world:w,eventId:id}=start();w=select(w,id);const request=storyRequest(w,[storyAction(id,'confirm')]),before=JSON.stringify(w);
 assert.throws(()=>prepareWorldOperation(w,{...request,operations:[...request.operations,{type:'invalid'}]}));assert.equal(JSON.stringify(w),before);
 const result=prepareWorldOperation(w,request);assert.ok(prepareWorldOperation(result.world,request).duplicate);assert.deepEqual(restoreWorldState(JSON.stringify(result.world)),result.world);
 const legacy=beginDemo().world;assert.deepEqual(restoreWorldState(JSON.stringify(legacy)),legacy);
 const opening=eventWorld(1),other=forkWorldAttempt(opening,{attemptId:createId('attempt',['package3-retry']),seeds:{settlement:31,streams:Object.fromEntries(Object.keys(opening.random).map(k=>[k,32]))}});assert.notEqual(other.identity.attemptId,w.identity.attemptId);assert.equal(projectIssues(other).length,0);assert.deepEqual(restoreWorldState(JSON.stringify(other)),other);assert.equal(JSON.stringify(w),before);
});
