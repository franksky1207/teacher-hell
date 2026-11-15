import {progressionContext} from '../src/runtime/progression.js';
import {pendingSchoolEvent} from '../src/runtime/campus.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {eventWorld,definition,binding,draw} from './support/event-fixtures.js';
import {apply,storyAction,storyRequest,advanceDemo,beginDemo} from './support/story-scenario.js';
import {event,fact,open,id} from './support/runtime.js';
import {PACKAGE4_STORIES,PACKAGE3_STORY} from '../src/runtime/story-content.js';
import {runtimeOf,restoreWorldState} from '../src/runtime/model.js';
import {prepareWorldOperation} from '../src/runtime/transactions.js';
import {projectIssues} from '../src/runtime/issues.js';
import {buildEventCandidates,eventIndex,weighEventCandidate,candidateConflict,validateIssueReservation} from '../src/runtime/event-candidates.js';
import {admissionEvent,readEventContinuations} from '../src/runtime/event-selection.js';
import {storyHistoryView} from '../src/runtime/story-history-view.js';
import {readStory,compileStory} from '../src/runtime/story.js';
const q=()=>({version:1,binding:'transport',kind:'transport-arrangement',states:['open'],actors:[{role:'participant',scope:'student'}],knowledge:[{role:'teacher',source:'root'}],condition:{all:[{latestType:'open'},{any:[{latestType:'open'},{assessment:'improved'}]}]}});
function def(index=0){const c=PACKAGE4_STORIES[index],d=definition(c.definitionId,{topicId:c.topicId,content:{resourceId:c.resourceId,version:c.version,status:c.status}});d.eligibility.issue=q();delete d.eligibility.issue.condition;d.repetition.issueScope={version:1,scope:'issue'};return d;}
function setup(count=3,{caregiver=false}={}){let w=eventWorld(1),e=event(w,'package4-root'),student=e.participantIds[1];const parent=w.numeric.evolution.world.careLinks.find(l=>l.studentId===student).caregiverId;if(caregiver)e.participantIds.push(parent);const root=fact(e,'package4-root',{witnessIds:[w.identity.playerId,student],categoryCodes:[],data:{causality:{version:1,operations:Array.from({length:count},(_,i)=>({type:'open',localKey:'transport'+i,kind:'transport-arrangement',actors:caregiver?[student,parent]:[student],details:'家庭接送安排尚待協調',evidenceFactIds:[id('fact','package4-root')]}))}}});w=apply(w,[open(e),root,{type:'reveal',actorId:w.identity.playerId,factId:root.id,source:{kind:'observation',actorId:w.identity.playerId,basisFactId:root.id}}]);return {w,e,student,root};}
function reserve(w,definitions=[def()]){return apply(w,[draw(definitions)]);}
function atReservation(w){const s=selected(w);while(w.position.slotId!==s.slotId)w=advanceDemo(w);return w;}
function leaveStudent(w,student){const e=event(w,'package4-transfer');e.definitionId='procedure:package4-transfer';const f=fact(e,'package4-transfer',{subjectIds:[w.identity.playerId,student],witnessIds:[w.identity.playerId],categoryCodes:[]});return prepareWorldOperation(w,{...storyRequest(w,[open(e),f,{type:'school',basisFactId:f.id,change:{type:'school-leave',personId:student,status:'transferred-out',reason:'documented transfer'}}]),calendarContext:{kind:'procedure'}}).world;}
const selected=w=>runtimeOf(w).history.findLast(h=>h.type==='event-selection').data.selected[0];
function closeRoot(w,e,issue){const f=fact(e,'package4-close',{witnessIds:[w.identity.playerId],categoryCodes:[],causeIds:[...new Set([issue.createdBy.factId,issue.latestOperation.factId])],data:{causality:{version:1,operations:[{type:'close',issueId:issue.id,expectedPreviousOperation:issue.latestOperation.id,reason:'fulfilled',evidenceFactIds:[id('fact','package4-close')]}]}}});return apply(w,[f]);}
test('1 dynamic candidates and fair group weight',()=>{
 const {w,student}=setup(),d=def(),before=JSON.stringify(w.random),built=buildEventCandidates(w,[d],{engineering:true});assert.equal(built.candidates.length,1);const c=built.candidates[0];assert.equal(c.issueOptions.length,3);assert.equal(c.participantIds[0],student);assert.equal(JSON.stringify(w.random),before);
 const one=setup(1).w,weighted=x=>weighEventCandidate(x,buildEventCandidates(x,[d],{engineering:true}).candidates[0],d,binding(d),eventIndex(x));assert.equal(weighted(w).effectiveWeight,weighted(one).effectiveWeight);
 const conditioned=structuredClone(d);conditioned.eligibility.issue=q();assert.equal(buildEventCandidates(w,[conditioned],{engineering:true}).candidates[0].issueOptions.length,3);
 const bad=structuredClone(conditioned);bad.eligibility.issue.condition={all:[{execute:'javascript'}]};assert.throws(()=>buildEventCandidates(w,[bad],{engineering:true}),/predicate/);
 const legacy=definition();assert.deepEqual(buildEventCandidates(w,[legacy],{engineering:true}),buildEventCandidates(one,[legacy],{engineering:true}));
 const drawn=reserve(w),s=selected(drawn);assert.ok(s);assert.equal(s.issueBindings.length,1);assert.equal(s.issueOptions,undefined);assert.ok(c.issueOptions.some(b=>b.issueId===s.issueBindings[0].issueId));assert.equal(runtimeOf(drawn).history.findLast(h=>h.type==='event-selection').data.poolSize,1);assert.ok(runtimeOf(drawn).commits.at(-1).draws.some(d=>d.id.startsWith('event-root:')));assert.deepEqual(restoreWorldState(JSON.stringify(drawn)),drawn);
 // Existing caregiver identity alone gives no root knowledge or present contact.
 const parent=w.numeric.evolution.world.careLinks.find(l=>l.studentId===student).caregiverId;
 const extra=structuredClone(d);extra.eligibility.issue.actors.push({role:'companion',scope:'caregiver'});assert.equal(buildEventCandidates(w,[extra],{engineering:true}).candidates.length,0);
 let ew=structuredClone(w),e=event(ew,'parent-contact');e.participantIds=[w.identity.playerId,student,parent];const f=fact(e,'parent-contact',{data:{type:'contact'},categoryCodes:[]});ew=apply(ew,[open(e),f]);
 // Parent must actually be an actor of this problem, not just a careLink.
 assert.equal(buildEventCandidates(ew,[extra],{engineering:true}).candidates.length,0);
 const family=setup(1,{caregiver:true});let fw=family.w;const ce=event(fw,'family-contact'),cf=fact(ce,'family-contact',{subjectIds:[fw.identity.playerId,parent],witnessIds:[fw.identity.playerId,parent],data:{type:'contact'},categoryCodes:[]});fw=apply(fw,[open(ce),cf]);
 const fc=buildEventCandidates(fw,[extra],{engineering:true}).candidates;assert.equal(fc.length,1);assert.equal(fc[0].issueOptions[0].roleBindings.companion,parent);
 const unknown=structuredClone(extra);unknown.eligibility.issue.knowledge.push({role:'companion',source:'root'});assert.equal(buildEventCandidates(fw,[unknown],{engineering:true}).candidates.length,0);
 fw=atReservation(reserve(fw,[extra]));const fs=selected(fw);assert.equal(fs.participantIds[1],parent);fw=apply(fw,[{type:'admit-event',eventId:fs.eventId}]);assert.deepEqual(restoreWorldState(JSON.stringify(fw)),fw);
});
test('2 cross-topic same-root conflict and legal admission',()=>{
 const {w,e}=setup(),a=def(),b=def(1),built=buildEventCandidates(w,[a,b],{engineering:true});assert.equal(built.candidates.length,2);
 const root=built.candidates[0].issueOptions[0],make=(c,r=root)=>({...c,issueOptions:undefined,issueBindings:[r],status:'ended'}),x=make(built.candidates[0]),y=make(built.candidates[1]);assert.equal(candidateConflict(y,x,w.position.date),'same-day-issue');assert.equal(candidateConflict(y,x,new Date(Date.parse(w.position.date)+86400000).toISOString().slice(0,10)),'issue-cooldown');const other=make(built.candidates[1],built.candidates[1].issueOptions[1]);assert.equal(candidateConflict(other,x,w.position.date),null);
 const sameTopic={...other,topicId:x.topicId};assert.equal(candidateConflict(sameTopic,x,w.position.date),null);assert.equal(candidateConflict({...sameTopic,issueScope:{version:1,scope:'topic'}},x,w.position.date),'issue-topic-cooldown');assert.equal(candidateConflict({...other,issueScope:{version:1,scope:'person'}},x,w.position.date),'person-cooldown');
 assert.equal(candidateConflict(y,{...x,status:'waiting'},new Date(Date.parse(w.position.date)+5*86400000).toISOString().slice(0,10)),'active-issue');
 const drawn=atReservation(reserve(w)),s=selected(drawn),before=JSON.stringify(drawn);assert.ok(admissionEvent(drawn,{type:'admit-event',eventId:s.eventId}));
 const issue=projectIssues(drawn).find(i=>i.id===s.issueBindings[0].issueId),closed=closeRoot(drawn,e,issue);assert.equal(projectIssues(closed).filter(i=>i.state==='open').length,2);const rejected=apply(closed,[{type:'admit-event',eventId:s.eventId}]);assert.equal(rejected.events.some(e=>e.id===s.eventId),false);assert.ok(runtimeOf(rejected).history.some(h=>h.type==='event-admission-rejection'&&h.data.reason.includes('bound')));assert.equal(progressionContext(rejected).reserved.length,0);assert.equal(pendingSchoolEvent(rejected),false);assert.deepEqual(rejected.random,closed.random);assert.deepEqual(rejected.numeric,closed.numeric);assert.deepEqual(restoreWorldState(JSON.stringify(rejected)),rejected);assert.equal(advanceDemo(rejected).position.slotId===rejected.position.slotId,false);assert.equal(JSON.stringify(drawn),before);
 const absent=leaveStudent(drawn,s.participantIds[0]);assert.throws(()=>admissionEvent(absent,{type:'admit-event',eventId:s.eventId}),/pool|eligible/);
 const late=structuredClone(drawn);late.position.slotId='after-school';assert.throws(()=>admissionEvent(late,{type:'admit-event',eventId:s.eventId}),/slot/);
 let cross=atReservation(reserve(w,[b]));const cs=selected(cross);assert.equal(cs.issueBindings[0].issueId,s.issueBindings[0].issueId);cross=apply(cross,[{type:'admit-event',eventId:cs.eventId}]);cross=apply(cross,[storyAction(cs.eventId,'select','act')]);cross=apply(cross,[storyAction(cs.eventId,'confirm')]);assert.equal(projectIssues(cross).find(i=>i.id===cs.issueBindings[0].issueId).operations.length,2);
 const two=reserve(w,[a,b]),rows=runtimeOf(two).history.findLast(h=>h.type==='event-selection').data.selected;if(rows.length===2)assert.notEqual(rows[0].issueBindings[0].issueId,rows[1].issueBindings[0].issueId);
});
test('3 story bound source, cross-day continuation, replay and idempotency',()=>{
 let {w}=setup();w=atReservation(reserve(w));const s=selected(w),root=s.issueBindings[0].issueId;w=apply(w,[{type:'admit-event',eventId:s.eventId}]);w=apply(w,[storyAction(s.eventId,'select','act')]);const request=storyRequest(w,[storyAction(s.eventId,'confirm')]),before=JSON.stringify(w);assert.throws(()=>prepareWorldOperation(w,{...request,operations:[...request.operations,{type:'invalid'}]}));assert.equal(JSON.stringify(w),before);
 const result=prepareWorldOperation(w,request);w=result.world;assert.ok(prepareWorldOperation(w,request).duplicate);assert.equal(projectIssues(w).find(i=>i.id===root).operations.length,2);assert.equal(projectIssues(w).filter(i=>i.operations.length===1).length,2);assert.deepEqual(restoreWorldState(JSON.stringify(w)),w);
 const prefix=runtimeOf(w).facts.find(f=>f.eventId===s.eventId&&f.data.causality).order;assert.equal(storyHistoryView(w,{beforeOrder:prefix}).issue(root).operations.length,1);
 w=apply(w,[storyAction(s.eventId,'finish')]);const date=w.position.date;while(w.position.date===date)w=advanceDemo(w);assert.equal(readStory(w,s.eventId).canResume,true);assert.equal(readEventContinuations(w)[0].eventId,s.eventId);
 const absent=leaveStudent(w,s.participantIds[0]);assert.equal(projectIssues(absent).find(i=>i.id===root).state,'open');assert.throws(()=>validateIssueReservation(absent,s),/pool|eligible/);assert.equal(readStory(absent,s.eventId).canResume,false);assert.equal(readEventContinuations(absent)[0].applicable,false);assert.equal(pendingSchoolEvent(absent),false);assert.throws(()=>apply(absent,[storyAction(s.eventId,'resume')]),/pool|eligible|bound/);
 for(const action of [storyAction(s.eventId,'resume'),storyAction(s.eventId,'select','act'),storyAction(s.eventId,'confirm')])w=apply(w,[action]);assert.equal(projectIssues(w).find(i=>i.id===root).state,'closed');assert.equal(selected(w).issueBindings[0].issueId,root);assert.deepEqual(restoreWorldState(JSON.stringify(w)),w);
 const candidates=buildEventCandidates(w,[def(1)],{engineering:true});assert.ok(candidates.candidates.every(c=>c.issueOptions.every(b=>b.issueId!==root)));
 const legacy=beginDemo().world;assert.deepEqual(restoreWorldState(JSON.stringify(legacy)),legacy);
 let old=beginDemo(1,PACKAGE3_STORY);for(const action of [storyAction(old.eventId,'select','listen'),storyAction(old.eventId,'confirm'),storyAction(old.eventId,'finish'),storyAction(old.eventId,'select','listen'),storyAction(old.eventId,'confirm')])old.world=apply(old.world,[action]);assert.equal(projectIssues(old.world)[0].state,'closed');assert.deepEqual(restoreWorldState(JSON.stringify(old.world)),old.world);
});
