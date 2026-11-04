import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runtimeScenario,request,event,fact,open,id,observation,result } from './support/runtime.js';
import { prepareWorldOperation,createWorldSession,forkWorldAttempt,startWorld } from '../src/runtime/transactions.js';
import { restoreWorldState,runtimeOf,HISTORY_CODES } from '../src/runtime/model.js';
import { readPlayerView,readActorView,readHistoricalReview } from '../src/runtime/views.js';
import { canonicalData } from '../src/changes/settlement.js';
import { foundationScenario } from './support/scenarios.js';
const apply=(w,tag,ops,pre)=>prepareWorldOperation(w,request(w,tag,ops,pre)).world;
const sample={type:'sample',stream:'events',id:'selection',weights:[1,2,3]};
const advance={type:'advance-time',planId:'synthetic-order',steps:1};
function setup(){const w=runtimeScenario(),e=event(w);return {w:apply(w,'open',[open(e),fact(e)]),e,a:e.participantIds[1],b:e.participantIds[2]};}
function informed(){let {w,e,a,b}=setup();const claim={type:'claim',id:id('claim','one'),versionId:'v1',factId:id('fact','one'),statement:'A mistaken account',sourceId:a};
 w=apply(w,'learn',[claim,{type:'learn',actorId:a,claimId:claim.id,versionId:'v1',source:observation(a),belief:'believed',confidence:0.9}]);return {w,e,a,b,claim};}

test('runtime: foundation adoption is explicit; supplied time remains unverified',()=>{
 const w=runtimeScenario();assert.equal(runtimeOf(w).revision,0);assert.equal(readPlayerView(w).calendarValidation,'unverified');
 assert.throws(()=>startWorld(foundationScenario(),runtimeOf(w).plan),/MIGRATION/);
 const bad=structuredClone(w);bad.position.slotId='unknown';assert.throws(()=>restoreWorldState(bad));
 assert.equal(HISTORY_CODES.length,60);const spec=readFileSync(new URL('../docs/02-隱藏數值與事件引擎.md',import.meta.url),'utf8');
 assert.deepEqual([...spec.matchAll(/\| (H\d{2}-\d) \|/g)].map(m=>m[1]),HISTORY_CODES);
});

test('runtime: multiperson atomic effects use N6, unique semantic results, and receipt replay',()=>{
 const {w,e,a,b}=setup(),before=canonicalData(w),q=request(w,'effects',[result(e,a,'trust'),result(e,b,'stress')]);
 const p=prepareWorldOperation(w,q);assert.equal(canonicalData(w),before);assert.equal(p.world.numeric.receipts.length,2);assert.equal(runtimeOf(p.world).effects.length,2);
 assert.deepEqual(prepareWorldOperation(p.world,q).world,p.world);assert.equal(prepareWorldOperation(p.world,q).duplicate,true);
 assert.throws(()=>prepareWorldOperation(p.world,{...q,operations:[sample]}),/CONFLICT/);
 assert.throws(()=>apply(p.world,'renamed',[result(e,a,'another',4,'trust')]),/DUPLICATE/);
 assert.equal(runtimeOf(apply(p.world,'different-facet',[result(e,a,'later',2,'later')])).revision,3);
});

test('runtime: mid-operation failure rolls back numeric, facts, time, history and random',()=>{
 const {w,e,a}=setup(),before=canonicalData(w);
 const ops=[result(e,a),sample,advance,fact(e,'temporary'),{type:'unimplemented'}];
 assert.throws(()=>apply(w,'fail',ops),/OPERATION/);assert.equal(canonicalData(w),before);
 const q=request(w,'fail',[sample]);assert.equal(prepareWorldOperation(w,q).duplicate,false);
 for(const malformed of [{...result(e,a),effects:[{id:id('effect','bad'),operation:{type:'direct',changes:[{target:{kind:'person',id:a},code:'1-1',delta:NaN}]}}]}, {...fact(e,'bad'),subjectIds:['absent']}])assert.throws(()=>apply(w,'bad',[malformed]));
 assert.equal(canonicalData(w),before);
});

test('runtime: stale revisions, wrong attempts, failed prerequisites and unmanaged randomness are rejected',()=>{
 const {w}=setup(),q=request(w,'next',[sample]),next=prepareWorldOperation(w,q).world;
 assert.throws(()=>prepareWorldOperation(next,request(w,'stale',[sample])),/STALE/);
 assert.throws(()=>prepareWorldOperation(w,{...q,attemptId:'another'}),/ATTEMPT/);
 assert.throws(()=>apply(w,'prerequisite',[sample],[{type:'at',date:w.position.date,slotId:'not-here'}]),/PRECONDITION/);
 assert.throws(()=>apply(w,'rng',[{...sample,stream:'unknown'}]),/RANDOM/);
 const malicious={...q};Object.defineProperty(malicious,'actorId',{get(){throw Error('getter ran');},enumerable:true});assert.throws(()=>prepareWorldOperation(w,malicious),/data properties|data object|INVALID/);
});

test('runtime: objective occurrence does not grant any knowledge or disclose hidden values',()=>{
 const {w,a}=setup();assert.equal(readPlayerView(w).facts.length,0);assert.equal(readPlayerView(w).claims.length,0);assert.equal(readActorView(w,a).facts.length,0);
 const view=JSON.stringify(readPlayerView(w));for(const secret of ['Objective synthetic occurrence','witnessIds','numeric','random','receipts','participantIds'])assert.ok(!view.includes(secret));
 assert.equal(readHistoricalReview(w).facts[0].description,'Objective synthetic occurrence');
 assert.equal(readHistoricalReview(w).mode,'retrospective-objective');
});

test('runtime: NPC misinformation, independent beliefs and later truth use explicit sources',()=>{
 let {w,e,a,b,claim}=informed();assert.equal(readActorView(w,a).claims[0].belief,'believed');assert.equal(readPlayerView(w).claims.length,0);
 assert.throws(()=>apply(w,'no-contact',[{type:'learn',actorId:b,claimId:claim.id,versionId:'v1',source:{kind:'communication',actorId:a,basisFactId:id('fact','one')},belief:'uncertain',confidence:0.3}]),/KNOWLEDGE/);
 const contact=fact(e,'contact',{subjectIds:[a,b,'teacher'],witnessIds:[],data:{type:'contact'},description:'Explicit contact'});
 w=apply(w,'contact',[contact,{type:'learn',actorId:b,claimId:claim.id,versionId:'v1',source:{kind:'communication',actorId:a,basisFactId:contact.id},belief:'rejected',confidence:0.2}]);
 assert.equal(readActorView(w,b).claims[0].belief,'rejected');assert.equal(runtimeOf(w).facts[0].description,'Objective synthetic occurrence');
 w=apply(w,'correct-belief',[{type:'belief',actorId:a,claimId:claim.id,versionId:'v1',belief:'rejected',confidence:0.1}]);
 assert.equal(readActorView(w,a).claims[0].belief,'rejected');
 const access=fact(e,'access',{subjectIds:['teacher'],witnessIds:[],data:{type:'access',factIds:[id('fact','one')],claimRefs:[{id:claim.id,versionId:'v1'}]},description:'Document accessed'});
 w=apply(w,'document',[access,{type:'learn',actorId:'teacher',claimId:claim.id,versionId:'v1',source:{kind:'document',actorId:'teacher',basisFactId:access.id},belief:'uncertain',confidence:0.4},{type:'reveal',actorId:'teacher',factId:id('fact','one'),source:{kind:'document',actorId:'teacher',basisFactId:access.id}}]);
 assert.equal(readPlayerView(w).claims.length,1);assert.equal(readPlayerView(w).facts[0].description,'Objective synthetic occurrence');assert.ok(!JSON.stringify(readPlayerView(w)).includes('claimRefs'));
 const tampered=structuredClone(w);runtimeOf(tampered).knowledge[0].belief='believed';assert.throws(()=>restoreWorldState(tampered),/Belief/);
});

test('runtime: claim versions can be corrected without overwriting earlier claims or truth',()=>{
 let {w,a,claim}=informed();w=apply(w,'version2',[{...claim,versionId:'v2',statement:'Later correction'},{type:'learn',actorId:a,claimId:claim.id,versionId:'v2',source:observation(a),belief:'believed',confidence:0.8}]);
 assert.equal(readActorView(w,a).claims.length,2);assert.equal(runtimeOf(w).facts.length,1);
 assert.throws(()=>apply(w,'no-source',[{type:'reveal',actorId:'teacher',factId:id('fact','one'),source:observation('teacher')}]),/KNOWLEDGE/);
 const broken=structuredClone(w);runtimeOf(broken).commits[0].request=canonicalData({...JSON.parse(runtimeOf(broken).commits[0].request),id:id('operation','changed')});assert.throws(()=>restoreWorldState(broken),/identity/);
});

test('runtime: managed RNG, JSON restoration and explicit time order reproduce subsequent results',()=>{
 const {w}=setup(),q=request(w,'draw-time',[sample,advance,advance]);const one=prepareWorldOperation(w,q),two=prepareWorldOperation(JSON.stringify(w),q);
 assert.deepEqual(one,two);assert.equal(one.world.position.date,'2026-08-04');assert.notDeepEqual(one.world.random,w.random);
 const saved=restoreWorldState(JSON.stringify(one.world));assert.deepEqual(saved,one.world);
 assert.deepEqual(apply(saved,'continue',[sample,advance]),apply(one.world,'continue',[sample,advance]));
 assert.throws(()=>apply(saved,'back',[{...advance,steps:-1}]),/TIME/);
 assert.throws(()=>apply(saved,'exhausted',[{...advance,steps:100}]),/TIME/);
});

test('runtime: current event stages, locked choices, continuations and concurrent events have separate identity',()=>{
 const w0=runtimeScenario(),choice={nodeId:'node',options:[{id:'a',emotional:true},{id:'b',emotional:false},{id:'c',emotional:false}],confirmedOptionId:null},e=event(w0,'one',choice);
 let w=apply(w0,'open',[open(e),fact(e)]);const transition={type:'stage',eventId:e.id,fromStageId:e.stageId,stageId:id('stage','one',2),choice:null};
 assert.throws(()=>apply(w,'premature',[transition]),/CHOICE/);
 w=apply(w,'choice',[{type:'confirm-choice',eventId:e.id,stageId:e.stageId,optionId:'b',optionText:'Synthetic choice'},transition]);
 assert.equal(readPlayerView(w).choices.length,1);assert.throws(()=>apply(w,'old-stage',[fact(e,'old')]),/STAGE/);
 const e2=event(w,'two');w=apply(w,'parallel',[open(e2),fact(e2,'new',{causeIds:[id('fact','one')]})]);
 w=apply(w,'continuation',[{type:'link-fact',eventId:e2.id,stageId:e2.stageId,factId:id('fact','one')}]);assert.equal(w.events.length,2);assert.equal(runtimeOf(w).facts.length,2);
});

test('runtime: reconciliation/repair is a new causal fact, never re-applies an old consequence',()=>{
 let {w,e,a}=setup();w=apply(w,'harm',[result(e,a,'harm')]);
 w=apply(w,'repair',[fact(e,'repair',{description:'Reconciliation',categoryCodes:['H01-5'],causeIds:[id('fact','one')]}),{...result(e,a,'repair',2),factId:id('fact','repair')}]);
 assert.deepEqual(readHistoricalReview(w).counts,{'H01-1':1,'H01-5':1});assert.equal(runtimeOf(w).facts.length,2);
 assert.throws(()=>apply(w,'repair-again',[{...result(e,a,'repair-copy',2,'repair'),factId:id('fact','repair')}]),/DUPLICATE/);
 const bad=structuredClone(w);runtimeOf(bad).facts[0].causeIds=[id('fact','repair')];assert.throws(()=>restoreWorldState(bad),/CAUSALITY/);
});

test('runtime: old people retain identity/history, multiple enrollment references and role changes',()=>{
 let {w,e,a}=setup();const originalCount=Object.keys(w.numeric.evolution.world.people).length;
 const record={...w.enrollments[0],id:id('enrollment','third'),cohortId:id('cohort','third')};
 w=apply(w,'reference',[{type:'enrollment-reference',record,basisFactId:id('fact','one')},{type:'role',personId:a,roleIds:[11,14],basisFactId:id('fact','one')}]);
 assert.equal(w.enrollments.filter(r=>r.personId===a).length,3);assert.deepEqual(w.numeric.evolution.world.people[a].roleIds,[11,14]);assert.equal(Object.keys(w.numeric.evolution.world.people).length,originalCount);assert.equal(runtimeOf(w).facts[0].subjectIds.includes(a),true);
 const old=Object.values(w.numeric.evolution.world.people).find(p=>!w.numeric.evolution.world.classroom.studentIds.includes(p.id));assert.ok(old);
 w=apply(w,'outside-class',[fact(e,'outside',{subjectIds:[old.id],witnessIds:[]})]);assert.equal(runtimeOf(restoreWorldState(JSON.stringify(w))).facts[1].subjectIds[0],old.id);
});

test('runtime: sessions publish once, isolate readonly drafts, reject stale/foreign tickets and discard safely',()=>{
 const w=runtimeScenario(),session=createWorldSession(w),q=request(w,'one',[sample]);const t=session.prepare(q),other=session.prepare(request(w,'two',[sample]));
 assert.deepEqual(session.snapshot(),w);assert.throws(()=>{t.world.position.date='2099-01-01';},TypeError);
 session.discard(other);assert.throws(()=>session.commit(other),/TICKET/);session.commit(t);assert.throws(()=>session.commit(t),/TICKET/);
 const next=session.snapshot();assert.notDeepEqual(next.random,w.random);const duplicate=session.prepare(q);assert.equal(duplicate.duplicate,true);session.commit(duplicate);assert.deepEqual(session.snapshot(),next);
 const stale=session.prepare(request(next,'stale',[sample])),fresh=session.prepare(request(next,'fresh',[sample]));session.commit(fresh);assert.throws(()=>session.commit(stale),/STALE/);
 assert.throws(()=>createWorldSession(w).commit(stale),/TICKET/);const detached=session.snapshot();detached.position.slotId='changed';assert.notEqual(session.snapshot().position.slotId,'changed');
});

test('runtime: explicit retry forks the opening snapshot, preserves prior history and archives N6 receipts',()=>{
 let {w,e,a}=setup();w=apply(w,'opening-outcome',[result(e,a,'prior')]);const opening=structuredClone(w);
 const failed=apply(w,'failed-year',[fact(e,'failed'),sample,advance]);
 const attemptId=id('attempt','retry'),seeds={settlement:33,streams:{events:44}},retry=forkWorldAttempt(opening,{attemptId,seeds});
 assert.equal(retry.identity.attemptId,attemptId);assert.equal(retry.numeric.receipts.length,0);assert.equal(runtimeOf(retry).numericArchives[0].receipts.length,1);assert.equal(runtimeOf(retry).facts.length,1);assert.equal(runtimeOf(failed).facts.length,2);assert.deepEqual(retry.position,opening.position);
 assert.deepEqual(forkWorldAttempt(JSON.stringify(opening),{attemptId,seeds}),retry);assert.deepEqual(restoreWorldState(JSON.stringify(retry)),retry);
 assert.throws(()=>apply(retry,'again',[result(e,a,'same-semantic',3,'prior')]),/DUPLICATE/);
 assert.throws(()=>forkWorldAttempt(retry,{attemptId,seeds}),/ATTEMPT/);assert.throws(()=>forkWorldAttempt(opening,{attemptId,seeds:{settlement:33,streams:{}}}));
});

test('runtime: abandoned-world retry tracks retired identities and rejects foreign opening prefixes',()=>{
 const initial=runtimeScenario(),options=tag=>({attemptId:id('attempt',tag),seeds:{settlement:33,streams:{events:44}}});
 const first=forkWorldAttempt(initial,options('lineage-first'));
 const second=forkWorldAttempt(initial,options('lineage-second'),first);
 assert.deepEqual(forkWorldAttempt(initial,options('lineage-second'),first),second);
 assert.throws(()=>forkWorldAttempt(initial,options('lineage-first'),second),{code:'ATTEMPT'});
 const foreign=structuredClone(first);foreign.identity.careerId=id('career','foreign-lineage');
 assert.throws(()=>forkWorldAttempt(initial,options('foreign-retry'),foreign),{code:'SNAPSHOT'});
 const opening=apply(initial,'one-opening',[sample]),unrelated=apply(initial,'other-opening',[sample]);
 assert.throws(()=>forkWorldAttempt(opening,options('unrelated-retry'),unrelated),{code:'SNAPSHOT'});
 assert.equal(runtimeOf(second).history.length,1);assert.equal(runtimeOf(second).history[0].data.abandonedAttemptId,first.identity.attemptId);
});

test('runtime: a genuine later stage may affect the same facet; replay in that stage still cannot',()=>{
 let {w,e,a}=setup();w=apply(w,'first-effect',[result(e,a,'first',2,'trust')]);
 const stageId=id('stage','one','later');w=apply(w,'later-stage',[{type:'stage',eventId:e.id,fromStageId:e.stageId,stageId,choice:null}]);
 w=apply(w,'later-effect',[{...result(e,a,'second',3,'trust'),stageId}]);assert.equal(w.numeric.receipts.length,2);
 assert.throws(()=>apply(w,'rename-later',[{...result(e,a,'third',3,'trust'),stageId}]),/DUPLICATE/);
});

test('runtime: shock and recovery delegate unchanged to the original N6 session',async()=>{
 const {createSettlementSession}=await import('../src/changes/settlement.js');const {w,e,a}=setup();
 const r=result(e,a,'numeric');r.effects=[{id:id('effect','shock'),operation:{type:'shock',effects:[{target:{kind:'player-person',id:'teacher'},code:'2-3',severity:'major',direction:1,scale:1}]}},{id:id('effect','recovery'),operation:{type:'recovery',context:{kind:'weekend',periodId:'provided-synthetic',startHour:12,hours:4,availableHours:8,resources:1,permitted:true}}}];
 const numeric=createSettlementSession(w.numeric);numeric.advanceDay({date:w.position.date,schoolYearId:w.position.schoolYearId,openingId:w.position.openingId,serviceYear:w.position.serviceYear});
 for(const effect of r.effects)numeric.settle({attemptId:w.identity.attemptId,id:effect.id,sequence:numeric.cursor().nextSequence,date:w.position.date,operation:effect.operation});
 const next=apply(w,'numeric',[r]);assert.deepEqual(next.numeric,numeric.snapshot());
 const before=canonicalData(w);assert.throws(()=>apply(w,'late-fail',[r,{type:'unknown'}]));assert.equal(canonicalData(w),before);
});

test('runtime: invalid intermediate beliefs and pre-confirmed future stages cannot bypass validation',()=>{
 const {w,e,a,claim}=informed();
 assert.throws(()=>apply(w,'bad-belief',[{type:'belief',actorId:a,claimId:claim.id,versionId:'v1',belief:'invented',confidence:0.5},{type:'belief',actorId:a,claimId:claim.id,versionId:'v1',belief:'believed',confidence:0.5}]),/KNOWLEDGE/);
 const choice={nodeId:'node',options:[{id:'a',emotional:true},{id:'b',emotional:false},{id:'c',emotional:false}],confirmedOptionId:'a'};
 assert.throws(()=>apply(w,'bypass-choice',[{type:'stage',eventId:e.id,fromStageId:e.stageId,stageId:id('stage','bypass'),choice}]),/CHOICE/);
 const settled=apply(w,'effect',[result(e,a)]),corrupt=structuredClone(settled);corrupt.events[0].results[0].settlementId=id('settlement','unrelated');assert.throws(()=>restoreWorldState(corrupt),/different operation/);
});
