import test from 'node:test';
import assert from 'node:assert/strict';
import {storyHistoryView,auditStoryNumericWitness,captureStoryNumeric,replayStoryNumeric} from '../src/runtime/story-history-view.js';
import {HISTORY_CONTRACT_STORY,validateStory} from '../src/runtime/story-content.js';
import {runtimeOf,restoreWorldState} from '../src/runtime/model.js';
import {readStory,validateStoryHistory,availableStoryChoices,compileStory} from '../src/runtime/story.js';
import {beginDemo,apply,storyAction,storyRequest} from './support/story-scenario.js';
import {prepareWorldOperation,forkWorldAttempt} from '../src/runtime/transactions.js';
import {eventWorld} from './support/event-fixtures.js';
import {createId} from '../src/contracts/foundation.js';
import {createSave,restoreSave} from '../src/storage/format.js';

test('history slice: future facts, acquisition, beliefs and numeric state are bounded',()=>{
 const {world:w}=beginDemo(),r=runtimeOf(w),actor=w.identity.playerId;
 // A small journal projection probe; no synthetic world is claimed as valid.
 r.history=[{order:1,type:'knowledge',data:{belief:'uncertain',confidence:.5}},{order:2,type:'belief',data:{actorId:actor,claimId:'q',versionId:'1',after:{belief:'believed',confidence:.9}}}];
 r.facts=[{id:'past',order:1},{id:'future',order:2}];r.claims=[{id:'q',versionId:'1',order:1}];
 r.knowledge=[{actorId:actor,claimId:'q',versionId:'1',order:1,belief:'believed',confidence:.9},{actorId:'later',claimId:'q',versionId:'1',order:2}];
 const target={kind:'player-person',id:actor},inputs=[{target,code:'3-1',value:12},{target:{kind:'relationship',id:'a-to-b'},code:'1-1',value:23}];
 const view=storyHistoryView(w,{beforeOrder:2,inputs});
 const stage=structuredClone(HISTORY_CONTRACT_STORY.stages[0]),event=w.events[0];stage.choices[3].replacement.requires=[{type:'fact',id:'future'}];
 assert.equal(availableStoryChoices(w,event,stage,view)[3].id,'support');
 assert.equal(availableStoryChoices(w,event,stage)[3].id,'guided-support');
 assert.equal(view.fact('future'),null);assert.ok(view.fact('past'));assert.equal(view.knowledge(actor,'q','1').belief,'uncertain');assert.equal(view.knowledge('later','q','1'),null);
 assert.equal(view.numeric(target,'3-1'),12);assert.equal(view.relationship('a-to-b','1-1'),23);assert.throws(()=>view.numeric(target,'3-2'),/witness/);
 view.fact('past').id='edited';assert.ok(view.fact('past'));assert.throws(()=>storyHistoryView(w,{beforeOrder:2}).numeric(target,'3-1'),/witness/);
});

test('legacy compatibility: unchanged v1 history, immutable contract and integrity checks',t=>{
 const {world:w}=beginDemo(),saved=JSON.stringify(w);
 assert.equal(runtimeOf(w).history.find(h=>h.type==='story').data.compilerContract,undefined);
 assert.equal(JSON.stringify(restoreWorldState(saved)),saved);
 const bad=structuredClone(w);runtimeOf(bad).history.find(h=>h.type==='story').data.compilerContract=2;assert.throws(()=>restoreWorldState(bad),/contract/);
 const content=structuredClone(HISTORY_CONTRACT_STORY);content.compilerContract=3;assert.throws(()=>validateStory(content),/contract/i);
 const tampered=structuredClone(w);runtimeOf(tampered).history.find(h=>h.type==='story').data.state.page=99;assert.throws(()=>restoreWorldState(tampered));
 // DEMO's premise only appends a fact/disclosure: this is the exact unchanged
 // numeric input at start, also valid in the previously shipped witness-v1 format.
 const {world:oldV2,eventId}=beginDemo(1,HISTORY_CONTRACT_STORY),row=runtimeOf(oldV2).history.find(h=>h.type==='story');
 const compact=JSON.stringify(row.data.numericWitness);
 row.data.numericWitness={version:1,attemptId:row.attemptId,cursor:row.cursor,world:structuredClone(oldV2.numeric.evolution.world)};
 const oldBytes=Buffer.byteLength(JSON.stringify(row.data.numericWitness)),newBytes=Buffer.byteLength(compact);
 assert.ok(newBytes<oldBytes/10);t.diagnostic(`start witness UTF-8 JSON: legacy=${oldBytes} bytes, compact=${newBytes} bytes`);
 const encoded=JSON.stringify(oldV2);assert.equal(JSON.stringify(restoreWorldState(encoded)),encoded);
 const mixed=apply(oldV2,[storyAction(eventId,'next')]);assert.equal(runtimeOf(mixed).history.filter(h=>h.type==='story').at(-1).data.numericWitness.version,2);
 assert.equal(runtimeOf(mixed).history.find(h=>h.type==='story').data.numericWitness.version,1);
 assert.deepEqual(restoreWorldState(JSON.stringify(mixed)),mixed);

});

test('world isolation: v2 transactions, save pair, restore and retry keep their own inputs',()=>{
 let {world:w,eventId}=beginDemo(1,HISTORY_CONTRACT_STORY);const opening=eventWorld(1);
 while(readStory(w,eventId).canNext)w=apply(w,[storyAction(eventId,'next')]);
 w=apply(w,[storyAction(eventId,'select','listen')]);
 const request=storyRequest(w,[storyAction(eventId,'confirm')]),before=JSON.stringify(w);
 assert.throws(()=>prepareWorldOperation(w,{...request,operations:[...request.operations,{type:'invalid'}]}));assert.equal(JSON.stringify(w),before);
 w=prepareWorldOperation(w,request).world;assert.ok(prepareWorldOperation(w,request).duplicate);
 const snapshot=structuredClone(runtimeOf(w).history.find(h=>h.type==='story').data.numericWitness);
 const stories=runtimeOf(w).history.filter(h=>h.type==='story');
 assert.ok(stories.every(h=>h.data.numericWitness.version===2&&!Object.hasOwn(h.data.numericWitness,'world')));
 const passive=stories.find(h=>h.data.action.action==='next').data.numericWitness;assert.deepEqual(passive.reads,[]);assert.equal(passive.panel,null);
 const confirmed=stories.find(h=>h.data.action.action==='confirm'),audit=auditStoryNumericWitness(w,confirmed);
 assert.ok(audit.endpointChecks>0);assert.ok(audit.observationChecks>0);
 const forged=structuredClone(w),forgedRow=runtimeOf(forged).history.find(h=>h.id===confirmed.id);
 // These inputs are internally consistent and do not change any chosen option.
 // Only the independent same-day numeric endpoint exposes the forgery.
 forgedRow.data.numericWitness.panel.person['1-4']+=1;
 assert.throws(()=>restoreWorldState(forged),/historical source endpoint/);
 const missing=structuredClone(w);runtimeOf(missing).history.find(h=>h.type==='story').data.numericWitness.reads.pop();assert.throws(()=>restoreWorldState(missing),/numeric read/);
 const extra=structuredClone(w);runtimeOf(extra).history.find(h=>h.type==='story').data.numericWitness.reads.push({target:{kind:'player-person',id:w.identity.playerId},code:'1-1',value:50});assert.throws(()=>restoreWorldState(extra),/unused numeric read/);

 w=apply(w,[storyAction(eventId,'finish')]);
 assert.equal(readStory(w,eventId).waiting,true);
 // Isolated modifier/compiler probe, not a claim of a legal cross-day route.
 const probe=structuredClone(w),state=runtimeOf(probe).history.findLast(h=>h.type==='story').data.state;
 Object.assign(state,{stage:'listen',mode:'confirming',pending:'agency',choiceOrder:['plan','sigh','refuse','agency']});
 const confirm=storyAction(eventId,'confirm'),context=captureStoryNumeric(probe,confirm,{operationId:'probe',beforeOrder:runtimeOf(probe).history.length+1,contentDigest:state.contentDigest});
 const compiled=compileStory(probe,confirm,{numericContext:context}),witness=context.finish();
 assert.ok(witness.reads.some(row=>row.code==='3-1'));probe.numeric.evolution.world=null;
 const replay=replayStoryNumeric(witness);assert.deepEqual(compileStory(probe,confirm,{numericContext:replay}),compiled);replay.assertConsumed();

 const saved=restoreSave(JSON.stringify(createSave(w,opening)));assert.deepEqual(saved.world,w);assert.deepEqual(saved.opening,opening);
 validateStoryHistory(saved.world);
 const retried=forkWorldAttempt(opening,{attemptId:createId('attempt',['history-contract-retry']),seeds:{settlement:31,streams:Object.fromEntries(Object.keys(opening.random).map(k=>[k,32]))}});
 assert.notEqual(retried.identity.attemptId,w.identity.attemptId);assert.deepEqual(runtimeOf(w).history.find(h=>h.type==='story').data.numericWitness,snapshot);
 assert.equal(storyHistoryView(retried).attemptId,retried.identity.attemptId);
 assert.deepEqual(restoreWorldState(JSON.stringify(retried)),retried);
 const wrongWitness=structuredClone(w);runtimeOf(wrongWitness).history.find(h=>h.type==='story').data.numericWitness.attemptId=retried.identity.attemptId;assert.throws(()=>restoreWorldState(wrongWitness),/context/);
 const bad=structuredClone(w);runtimeOf(bad).history.find(h=>h.type==='story').data.beforeOrder++;assert.throws(()=>restoreWorldState(bad),/boundary/);
});
