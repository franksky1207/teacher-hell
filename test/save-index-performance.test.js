/** Package 5 only: exactly three bounded groups; no full-semester simulation. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {performance} from 'node:perf_hooks';
import {eventWorld,definition,draw,binding} from './support/event-fixtures.js';
import {apply,storyAction,storyRequest,advanceDemo,beginDemo} from './support/story-scenario.js';
import {event,fact,open,id,result} from './support/runtime.js';
import {PACKAGE4_STORIES,PACKAGE3_STORY} from '../src/runtime/story-content.js';
import {runtimeOf,restoreWorldState,validateWorldState} from '../src/runtime/model.js';
import {prepareWorldOperation,forkWorldAttempt} from '../src/runtime/transactions.js';
import {projectIssues} from '../src/runtime/issues.js';
import {storyHistoryView} from '../src/runtime/story-history-view.js';
import {buildEventCandidates,eventIndex,weighEventCandidate} from '../src/runtime/event-candidates.js';
import {createSave,restoreSave,encodeSave,sameToken,saveToken} from '../src/storage/format.js';
import {createStoredSession} from '../src/storage/session.js';
import {directedKey} from '../src/world/relationships.js';
import {initializeSemesterReviews,pendingSemesterReview} from '../src/runtime/reviews.js';
import {validateRetryCheckpoint,validateRetryPair,retrySemester} from '../src/runtime/retry-checkpoint.js';
import {yearData,positionFor,cursorFor} from '../src/calendar/calendar.js';
function def(index=0){const c=PACKAGE4_STORIES[index],d=definition(c.definitionId,{topicId:c.topicId,content:{resourceId:c.resourceId,version:c.version,status:c.status}});d.eligibility.issue={version:1,binding:'transport',kind:'transport-arrangement',states:['open'],actors:[{role:'participant',scope:'student'}],knowledge:[{role:'teacher',source:'root'}]};d.repetition.issueScope={version:1,scope:'issue'};return d;}
function roots(w=eventWorld(1)){
 const e=event(w,'package5-root'),student=e.participantIds[1],root=fact(e,'package5-root',{witnessIds:[w.identity.playerId,student],categoryCodes:['H01-1'],data:{type:'contact',causality:{version:1,operations:[0,1,2].map(i=>({type:'open',localKey:'transport'+i,kind:'transport-arrangement',actors:[student],details:'固定工程樣本的接送安排',evidenceFactIds:[id('fact','package5-root')]}))}}});
 const receipt=result(e,student,'package5-root');receipt.factId=root.id;receipt.effects[0].operation.changes[0].code='5-1';receipt.effects[0].operation.changes[0].target={kind:'relationship',id:directedKey(student,w.identity.playerId)};
 w=apply(w,[open(e),root,{type:'reveal',actorId:w.identity.playerId,factId:root.id,source:{kind:'observation',actorId:w.identity.playerId,basisFactId:root.id}},receipt]);return {w,e,student};
}
function reserve(w){w=apply(w,[draw([def()])]);const s=runtimeOf(w).history.findLast(h=>h.type==='event-selection').data.selected[0];assert.ok(s,'fixed seed must reserve a bound event');for(let i=0;w.position.slotId!==s.slotId&&i<12;i++)w=advanceDemo(w);assert.equal(w.position.slotId,s.slotId);return {w,s};}
function confirmed(){const opening=eventWorld(1);let {w}=roots(opening),s;({w,s}=reserve(w));w=apply(w,[{type:'admit-event',eventId:s.eventId}]);w=apply(w,[storyAction(s.eventId,'select','act')]);const request=storyRequest(w,[storyAction(s.eventId,'confirm')]);w=prepareWorldOperation(w,request).world;return {opening,w,s,request};}
const candidates=w=>buildEventCandidates(w,[def(),def(1)],{engineering:true});
function memory(){const slots=new Map();return {async read(n){return structuredClone(slots.get(n)??{payload:null,token:null});},async write(n,payload,expected){const old=await this.read(n);assert.ok(sameToken(old.token,expected));const checked=restoreSave(payload),saved={payload:checked,token:saveToken({payload:checked,generation:(old.token?.generation??0)+1})};slots.set(n,saved);return structuredClone(saved);}};}
const retryOptions=(w,tag)=>({attemptId:id('attempt',tag),seeds:{settlement:31,streams:Object.fromEntries(Object.keys(w.random).map(k=>[k,32]))}});
function progress(w,e,issue,tag){const f=fact(e,tag,{causeIds:[...new Set([issue.createdBy.factId,issue.latestOperation.factId])],data:{causality:{version:1,operations:[{type:'progress',issueId:issue.id,expectedPreviousOperation:issue.latestOperation.id,assessment:'improved',details:'分支之後才確認的進展',evidenceFactIds:[id('fact',tag)]}]}}});return apply(w,[f]);}

test('1 save: current/opening, stored export/import, locked root and legacy',async()=>{
 const {opening,w,s,request}=confirmed(),payload=createSave(w,opening),text=encodeSave(payload),restored=restoreSave(text),before=JSON.stringify(w);
 assert.deepEqual(restored,payload);assert.deepEqual(restored.opening,opening);assert.deepEqual(projectIssues(restored.world),projectIssues(w));assert.deepEqual(candidates(restored.world),candidates(w));assert.deepEqual(eventIndex(restored.world),eventIndex(w));assert.deepEqual(restored.world.random,w.random);assert.deepEqual(restored.world.numeric,w.numeric);
 assert.equal(runtimeOf(restored.world).history.find(h=>h.type==='event-selection').data.selected[0].issueBindings[0].issueId,s.issueBindings[0].issueId);
 assert.ok(runtimeOf(w).disclosures.length);assert.ok(runtimeOf(w).facts.some(f=>f.data.causality));assert.ok(w.numeric.receipts.some(r=>r.changes.some(c=>c.target.kind==='relationship')));assert.ok(runtimeOf(w).history.some(h=>h.type==='story'&&h.data.numericWitness?.version===2));
 const db=memory();await db.write(1,payload,null);const session=await createStoredSession(db,1);assert.equal(await session.export(),text);await session.recover();assert.deepEqual(session.snapshot().payload,payload);
 const imported=await createStoredSession(db,2);const review=await imported.reviewImport(text);await imported.import(text,{expectedToken:review.token});assert.deepEqual(imported.snapshot().payload,payload);const token=imported.snapshot().token;assert.ok((await imported.execute(request)).duplicate);assert.deepEqual(imported.snapshot().token,token);assert.equal(JSON.stringify(w),before);
 const legacy=beginDemo().world;assert.deepEqual(restoreSave(encodeSave(createSave(legacy,opening))).world,legacy);assert.deepEqual(projectIssues(legacy),[]);
 let old=beginDemo(1,PACKAGE3_STORY);old.world=apply(old.world,[storyAction(old.eventId,'select','listen')]);old.world=apply(old.world,[storyAction(old.eventId,'confirm')]);assert.deepEqual(restoreSave(encodeSave(createSave(old.world,opening))).world,old.world);
 const bad=JSON.parse(text);runtimeOf(bad.world).facts.find(f=>f.data.causality?.operations.some(o=>o.type==='progress')).data.causality.operations[0].expectedPreviousOperation='forged';assert.throws(()=>restoreSave(bad));
 const invalidOpening=structuredClone(w);assert.throws(()=>createSave(w,invalidOpening),/SNAPSHOT/);
});

test('2 attempt: retained winter checkpoint, discarded future and historical boundaries',async t=>{
 // Same bounded skipped-date baseline as semester-retry.test.js: this is NOT
 // continuous semester gameplay, an annual failure or a cross-year handoff.
 let initial=initializeSemesterReviews(eventWorld(1,null,null,{version:1,mode:'three-year',difficulty:'hard'})),w=structuredClone(initial);
 const date=yearData(2027).winterFinal,p=positionFor(date,'private',2026,'three-year',runtimeOf(w).plan.calendarVersion);w.position=p;runtimeOf(w).plan.cursor=cursorFor(date,'private',2026,runtimeOf(w).plan.calendarVersion);Object.assign(w.numeric.evolution.clock,{date,lastNaturalDate:null,schoolYearId:p.schoolYearId,openingId:p.openingId});w=restoreWorldState(w);
 let e;({w,e}=roots(w));w=apply(w,[{type:'finish-slot',completedActivityIds:[]}]);const review=pendingSemesterReview(w);assert.ok(review);assert.throws(()=>validateRetryCheckpoint(w));
 // Execute the actual final-review operation through storage: automatic opening capture.
 const db=memory();await db.write(1,createSave(w,initial),null);const session=await createStoredSession(db,1),read=storyRequest(w,[{type:'read-semester-review',reviewId:review.id}]);await session.execute(read);const saved=session.snapshot().payload,cp=saved.opening;assert.deepEqual(cp,saved.world);validateRetryCheckpoint(cp);assert.equal(retrySemester(cp),'2027:spring');assert.ok((await session.execute(read)).duplicate);
 const issue=projectIssues(cp)[0],view=storyHistoryView(cp);let later=apply(cp,[{type:'advance-time',planId:runtimeOf(cp).plan.id,steps:1}]);later=progress(later,e,issue,'package5-future');const boundary=runtimeOf(later).facts.at(-1).order;
 assert.equal(storyHistoryView(later,{beforeOrder:boundary}).issue(issue.id).operations.length,1);assert.equal(storyHistoryView(later,{beforeOrder:boundary+1}).issue(issue.id).operations.length,2);assert.equal(view.issue(issue.id).operations.length,1);
 validateRetryPair(cp,later);const retry=forkWorldAttempt(cp,retryOptions(cp,'package5-winter'),later);assert.notEqual(retry.identity.attemptId,cp.identity.attemptId);assert.deepEqual(projectIssues(retry),projectIssues(cp));assert.deepEqual(retry.numeric.evolution,cp.numeric.evolution);assert.deepEqual(retry.numeric.receipts,[]);assert.deepEqual(runtimeOf(retry).numericArchives.at(-1).receipts,cp.numeric.receipts);assert.deepEqual(retry.events,cp.events);assert.deepEqual(eventIndex(retry),eventIndex(cp));assert.deepEqual(candidates(retry),candidates(cp));assert.deepEqual(runtimeOf(retry).history.slice(0,-1),runtimeOf(cp).history);assert.equal(runtimeOf(retry).facts.some(f=>f.id===id('fact','package5-future')),false);assert.deepEqual(restoreSave(encodeSave(createSave(retry,cp))).world,retry);
 const branch=apply(retry,[{type:'advance-time',planId:runtimeOf(retry).plan.id,steps:1}]),forked=progress(branch,e,projectIssues(branch)[0],'package5-new-branch');assert.equal(projectIssues(forked)[0].operations.length,2);assert.equal(projectIssues(later)[0].latestOperation.factId,id('fact','package5-future'));assert.deepEqual(forked.numeric,branch.numeric);
 assert.throws(()=>forkWorldAttempt(cp,retryOptions(cp,'package5-winter'),retry),/ATTEMPT/);assert.throws(()=>forkWorldAttempt(later,retryOptions(later,'package5-invalid'),later),{code:'SNAPSHOT'});
 const fresh=eventWorld(1),empty=forkWorldAttempt(fresh,retryOptions(fresh,'package5-empty'),confirmed().w);assert.deepEqual(projectIssues(empty),[]);assert.equal(candidates(empty).candidates.length,0);assert.equal(eventIndex(empty).records.length,0);
 t.diagnostic('Executed one real winter review/read checkpoint and fork on a skipped-date fixture. Continuous semester, annual-failure authorization, grade 2/3 summer handoff: NOT tested.');
});

test('3 equivalence and bounded measurement',t=>{
 const {opening,w,s}=confirmed(),random=structuredClone(w.random),before=JSON.stringify(w),issues=projectIssues(w),view=storyHistoryView(w),built=candidates(w),index=eventIndex(w);
 for(const issue of issues){assert.deepEqual(view.issue(issue.id),issue);assert.deepEqual(view.issues().find(i=>i.id===issue.id),issue);assert.deepEqual(storyHistoryView(w,{beforeOrder:issue.latestOperation.order}).issues(),projectIssues(w,{beforeOrder:issue.latestOperation.order}));}
 assert.equal(view.issue('missing'),null);const detached=view.issues();detached[0].latestOperation.type='tampered';assert.deepEqual(view.issues(),issues);const single=view.issue(issues[0].id);single.actors.length=0;assert.deepEqual(view.issue(issues[0].id),issues[0]);
 assert.deepEqual(candidates(restoreWorldState(JSON.stringify(w))),built);assert.deepEqual(eventIndex(restoreWorldState(w)),index);
 const weights=built.candidates.map(c=>weighEventCandidate(w,c,[def(),def(1)].find(d=>d.id===c.definitionId),binding([def(),def(1)].find(d=>d.id===c.definitionId)),index));assert.deepEqual(weights,built.candidates.map(c=>weighEventCandidate(w,c,[def(),def(1)].find(d=>d.id===c.definitionId),binding([def(),def(1)].find(d=>d.id===c.definitionId)),eventIndex(w))));
 // Rebuild the fixed pre-draw fixture, then reload that exact world as JSON.
 // Both runs use identical authoritative facts/RNG; compare full root receipts.
 const source=roots(opening).w,a=apply(source,[draw([def()])]),b=apply(restoreWorldState(JSON.stringify(source)),[draw([def()])]);assert.deepEqual(a,b);assert.deepEqual(runtimeOf(a).commits.at(-1).draws,runtimeOf(b).commits.at(-1).draws);assert.equal(runtimeOf(a).history.findLast(h=>h.type==='event-selection').data.selected[0].issueBindings[0].issueId,s.issueBindings[0].issueId);
 const measure=fn=>{const start=performance.now();const value=fn();return {ms:Number((performance.now()-start).toFixed(3)),value};};
 const projection=measure(()=>projectIssues(w)),lookup=measure(()=>{const v=storyHistoryView(w);return issues.map(i=>v.issue(i.id));}),query=measure(()=>candidates(w)),validation=measure(()=>validateWorldState(w)),encoded=measure(()=>encodeSave(createSave(w,opening)));
 assert.deepEqual(lookup.value,projection.value);assert.deepEqual(query.value,built);assert.deepEqual(w.random,random);assert.equal(JSON.stringify(w),before);
 t.diagnostic(JSON.stringify({node:process.version,sample:{history:runtimeOf(w).history.length,facts:runtimeOf(w).facts.length,issues:issues.length,storyRows:runtimeOf(w).history.filter(h=>h.type==='story').length,commits:runtimeOf(w).commits.length,candidateGroups:built.candidates.length,boundEvents:1},ms:{projectIssues:projection.ms,viewThreeIssueLookups:lookup.ms,candidates:query.ms,validateWorldState:validation.ms,createAndEncodeSave:encoded.ms},jsonBytes:{save:Buffer.byteLength(encoded.value),current:Buffer.byteLength(JSON.stringify(w)),opening:Buffer.byteLength(JSON.stringify(opening))},limits:'one sample per measurement, no warmup/repeated loops; no speedup claim'}));
});
