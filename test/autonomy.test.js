import test from 'node:test';
import assert from 'node:assert/strict';
import { npcRoute,npcRequest,npcApply,peerScenario,npcReport } from './support/npc-scenario.js';
import { eventWorld } from './support/event-fixtures.js';
import { compileNpcUpdate,npcGroups,npcWork,AUTONOMY_BUDGET } from '../src/runtime/autonomy.js';
import { prepareWorldOperation } from '../src/runtime/transactions.js';
import { runtimeOf,restoreWorldState } from '../src/runtime/model.js';
import { readPlayerView } from '../src/runtime/views.js';
import { createRandom } from '../src/numeric/random.js';
const clone=structuredClone;
test('npc: both story choices generate distinct known claims and persistent reactions without new admissions',()=>{
 const a=npcRoute('listen'),b=npcRoute('angry');
 for(const {world:w,eventId} of [a,b]){const report=npcReport(w);assert.ok(report.restored);assert.ok(report.decisions.some(d=>d.kind==='reaction'));assert.equal(report.formalSelections,1);assert.equal(w.events.find(e=>e.id===eventId).results.length,1);assert.ok(!JSON.stringify(readPlayerView(w)).includes('人物依已知說法'));assert.ok(report.candidateCount>0);}
 assert.notEqual(npcReport(a.world).decisions.find(d=>d.kind==='reaction').statement,npcReport(b.world).decisions.find(d=>d.kind==='reaction').statement);
});
test('npc: no motive is idle and pure queries never change state or random',()=>{const w=eventWorld(),before=JSON.stringify(w);assert.equal(npcWork(w).length,0);assert.equal(compileNpcUpdate(w).decisions.length,0);assert.equal(JSON.stringify(w),before);const next=npcApply(w,[{type:'npc-update'}]);assert.deepEqual(next.numeric,w.numeric);assert.deepEqual(next.random,w.random);});
test('npc: autonomous peer repair / distance / assistance needs no player knowledge',()=>{const {world:w,a,b}=peerScenario();const next=npcApply(w,[{type:'npc-update'}]),d=npcReport(next).decisions.find(d=>d.kind==='repair');assert.ok(d&&d.actorId===a&&d.toId===b);assert.ok(['repair','distant','seek-help'].includes(d.action));assert.equal(readPlayerView(next).facts.length,0);assert.equal(readPlayerView(next).claims.length,0);assert.equal(runtimeOf(next).history.filter(h=>h.data.calendarAdmission).length,0);});
test('npc: same slot different operation does not repeat; exact request replays after restore',()=>{const {world:w}=peerScenario(),q=npcRequest(w,[{type:'npc-update'}]),next=prepareWorldOperation(w,q).world;assert.ok(prepareWorldOperation(restoreWorldState(JSON.stringify(next)),q).duplicate);const repeat=npcApply(next,[{type:'npc-update'}]);assert.deepEqual(repeat.numeric,next.numeric);assert.deepEqual(repeat.random,next.random);assert.equal(runtimeOf(repeat).history.filter(h=>h.type==='npc-update').length,1);});
test('npc: failed transaction rolls back world, relationship, history and random',()=>{const {world:w}=peerScenario(),before=clone(w);assert.throws(()=>prepareWorldOperation(w,npcRequest(w,[{type:'npc-update'},{type:'invalid'}])));assert.deepEqual(w,before);assert.deepEqual(npcApply(w,[{type:'npc-update'}]),npcApply(w,[{type:'npc-update'}]));});
test('npc: same state reproduces and different seeds permit multiple reasonable actions',()=>{const {world:w}=peerScenario();const actions=new Set();for(let seed=1;seed<=16;seed++){const draft=clone(w);draft.random.social=createRandom(seed).snapshot();const a=compileNpcUpdate(draft),b=compileNpcUpdate(draft);assert.deepEqual(a,b);actions.add(a.decisions.find(d=>d.kind==='repair').action);}assert.ok(actions.size>=2);assert.ok(npcWork(w).length<=AUTONOMY_BUDGET);});
test('npc: group formation / join / leave / end retain causal membership history',()=>{let {world:w,a,b,contactId}=peerScenario();w=npcApply(w,[{type:'npc-group',groupId:'peer-cooperation',action:'join',memberIds:[a,b],basisFactId:contactId}]);assert.deepEqual(npcGroups(w)[0].memberIds,[a,b]);w=npcApply(w,[{type:'npc-group',groupId:'peer-cooperation',action:'leave',memberIds:[b],basisFactId:contactId}]);assert.deepEqual(npcGroups(w)[0].memberIds,[a]);w=npcApply(w,[{type:'npc-group',groupId:'peer-cooperation',action:'end',memberIds:[a],basisFactId:contactId}]);assert.ok(npcGroups(w)[0].ended);assert.throws(()=>npcApply(w,[{type:'npc-group',groupId:'peer-cooperation',action:'join',memberIds:[a,b],basisFactId:contactId}]));});
test('npc: corrupt decision / consequence / PRNG / unknown actor rejected on restore',()=>{const {world}=peerScenario(),w=npcApply(world,[{type:'npc-update'}]);for(const mutate of [d=>d.version='unknown',d=>d.decisions[0].actorId='missing-person',d=>d.randomAfter=createRandom(999).snapshot(),d=>d.operations.find(o=>o.type==='fact').description='invented']){const bad=clone(w);mutate(runtimeOf(bad).history.find(h=>h.type==='npc-update').data);assert.throws(()=>restoreWorldState(bad));}});
test('npc: sourced forwarding permits partial / mistaken versions and three independent beliefs',async()=>{
 const {informationScenario}=await import('./support/npc-scenario.js');const {world:w,a,b,claimId}=informationScenario();const modes=new Set(),beliefs=new Set();let chosen=null;
 for(let seed=1;seed<=120;seed++){const draft=clone(w);draft.random.social=createRandom(seed).snapshot();const data=compileNpcUpdate(draft);for(const d of data.decisions.filter(d=>d.kind==='forward'&&d.toId===b&&d.action==='forward')){modes.add(d.mode);beliefs.add(d.belief);if(d.mode!=='verbatim')chosen=draft;}}
 assert.equal(modes.size,3);assert.equal(beliefs.size,3);assert.ok(chosen);const next=npcApply(chosen,[{type:'npc-update'}]);const r=runtimeOf(next);assert.ok(r.knowledge.some(k=>k.actorId===b&&k.claimId===claimId));assert.ok(r.claims.some(c=>c.id===claimId&&c.versionId!=='original'));assert.equal(readPlayerView(next).claims.length,0);assert.equal(r.disclosures.length,0);assert.ok(!r.knowledge.some(k=>k.actorId!==a&&k.actorId!==b));assert.ok(npcReport(next).restored);
});
test('npc: evidence clarification requires actual informed witness and contact, preserving one conclusion',async()=>{
 const {informationScenario}=await import('./support/npc-scenario.js');let {world:w,a,b,claimId,contactId}=informationScenario();
 w=npcApply(w,[{type:'learn',actorId:b,claimId,versionId:'original',source:{kind:'communication',actorId:a,basisFactId:contactId},belief:'rejected',confidence:.6}]);
 const op={type:'npc-clarify',sourceId:a,toId:b,claimId,versionId:'original',contactId};w=npcApply(w,[op]);assert.equal(runtimeOf(w).knowledge.find(k=>k.actorId===b).belief,'uncertain');assert.ok(npcReport(w).restored);assert.throws(()=>npcApply(w,[{...op,contactId:'missing'}]));
 const f=runtimeOf(w).facts[0];w=npcApply(w,[{type:'claim',id:claimId,versionId:'alternative',factId:f.id,statement:'另一項未查證說法。',sourceId:a},{type:'learn',actorId:a,claimId,versionId:'alternative',source:{kind:'observation',actorId:a,basisFactId:f.id},belief:'believed',confidence:.6}]);assert.equal(runtimeOf(w).knowledge.filter(k=>k.actorId===a&&k.belief==='believed').length,1);
});
test('npc: missing contact path cannot transmit and protected activities do no background work',async()=>{
 const {informationScenario}=await import('./support/npc-scenario.js'),{positionFor,cursorFor}=await import('../src/calendar/calendar.js');const {world:w}=informationScenario();const r=runtimeOf(w);w.position=positionFor('2026-11-20','p6',2026);r.plan.cursor=cursorFor(w.position.date,w.position.slotId,2026);assert.deepEqual(npcWork(w),[]);assert.equal(compileNpcUpdate(w).decisions.length,0);
});
test('npc: former pupils and private-life NPCs keep identity and have contact-driven lightweight continuation',()=>{
 let {world:w,a,b,conflictId,contactId}=peerScenario();
 const sourceEvent=w.events[0];w=npcApply(w,[{type:'fact',id:'fact:["private-cause"]',eventId:sourceEvent.id,stageId:sourceEvent.stageId,subjectIds:[w.identity.playerId],witnessIds:[w.identity.playerId],description:'教師的私人朋友建立聯繫。',data:{type:'private-context'},categoryCodes:[],causeIds:[]}]);
 w=npcApply(w,[{type:'school',basisFactId:conflictId,change:{type:'school-leave',personId:a,status:'transferred-out',reason:'documented departure'}},{type:'school',basisFactId:'fact:["private-cause"]',change:{type:'school-staff',personId:'private-friend',roleIds:[34]}}]);
 // A private-life person is an independent person, not a recovery multiplier.
 assert.ok(w.numeric.evolution.world.people['private-friend']);assert.ok(w.numeric.evolution.world.people[a].roleIds.includes(18));
 const e=w.events.find(e=>e.facts.some(f=>f.id===contactId));
 w=npcApply(w,[{type:'fact',id:'fact:["private-contact"]',eventId:e.id,stageId:e.stageId,subjectIds:['private-friend',b],witnessIds:['private-friend',b],description:'朋友在既有共同活動中與學生交談。',data:{type:'contact'},categoryCodes:[],causeIds:[conflictId]}]);
 const next=npcApply(w,[{type:'npc-update'}]),decisions=npcReport(next).decisions;
 assert.ok(decisions.some(d=>d.kind==='life'&&d.actorId===a));assert.ok(decisions.some(d=>d.kind==='life'&&d.actorId==='private-friend'));assert.ok(next.numeric.evolution.world.people[a].roleIds.includes(18));assert.equal(readPlayerView(next).facts.length,0);
});
test('npc: group eligibility changes through membership history and querying never accumulates results',async()=>{
 const {buildEventCandidates}=await import('../src/runtime/event-candidates.js'),{definition}=await import('./support/event-fixtures.js');let {world:w,a,b,contactId}=peerScenario();const d=definition('test:group');d.topicId='E03-08';d.eligibility.groups=[{groupId:'shared-project'}];
 assert.equal(buildEventCandidates(w,[d],{engineering:true}).candidates.length,0);
 w=npcApply(w,[{type:'npc-group',groupId:'shared-project',action:'join',memberIds:[a,b],basisFactId:contactId}]);const before=JSON.stringify(w);assert.equal(buildEventCandidates(w,[d],{engineering:true}).candidates.length,2);assert.equal(buildEventCandidates(w,[d],{engineering:true}).candidates.length,2);assert.equal(JSON.stringify(w),before);
 w=npcApply(w,[{type:'npc-group',groupId:'shared-project',action:'end',memberIds:[a,b],basisFactId:contactId}]);assert.equal(buildEventCandidates(w,[d],{engineering:true}).candidates.length,0);
});
test('npc: forty current pupils independently react to one known experience within the shared budget',()=>{
 let {world:w}=peerScenario();const e=w.events[0],ids=w.numeric.evolution.world.classroom.studentIds,factId='fact:["class-experience"]',claimId='claim:["class-experience"]';
 const operations=[{type:'fact',id:factId,eventId:e.id,stageId:e.stageId,subjectIds:ids,witnessIds:ids,description:'全班共同經歷一項合作安排。',data:{type:'shared-experience'},categoryCodes:[],causeIds:[]},{type:'claim',id:claimId,versionId:'1',factId,statement:'有人認為安排公平，也有人仍在觀察。',sourceId:ids[0]},...ids.map(actorId=>({type:'learn',actorId,claimId,versionId:'1',source:{kind:'observation',actorId,basisFactId:factId},belief:'uncertain',confidence:.5}))];
 w=npcApply(w,operations);assert.equal(npcWork(w).length,AUTONOMY_BUDGET);const data=compileNpcUpdate(w);assert.ok(new Set(data.decisions.filter(d=>d.kind==='reaction').map(d=>d.action)).size>=2);const next=npcApply(w,[{type:'npc-update'}]);assert.equal(runtimeOf(next).history.findLast(h=>h.type==='npc-update').data.decisions.length,AUTONOMY_BUDGET);assert.equal(readPlayerView(next).claims.length,0);
});
test('npc: concurrent sources reserve one recipient / claim and cannot double-learn',async()=>{
 const {informationScenario}=await import('./support/npc-scenario.js');let {world:w,a,b,claimId,conflictId}=informationScenario();const c=w.numeric.evolution.world.classroom.studentIds[2],e=w.events[0],contactId='fact:["multi-source-contact"]';
 w=npcApply(w,[{type:'fact',id:contactId,eventId:e.id,stageId:e.stageId,subjectIds:[a,b,c],witnessIds:[a,b,c],description:'三名同學在場交談。',data:{type:'contact'},categoryCodes:[],causeIds:[conflictId]},{type:'learn',actorId:c,claimId,versionId:'original',source:{kind:'communication',actorId:a,basisFactId:contactId},belief:'uncertain',confidence:.5}]);
 assert.equal(npcWork(w).filter(x=>x.kind==='forward'&&x.toId===b&&x.claimId===claimId).length,1);assert.doesNotThrow(()=>npcApply(w,[{type:'npc-update'}]));
});
test('npc: leaving school later preserves earlier autonomous history and its original qualification',()=>{
 let {world:w,a,conflictId}=peerScenario();w=npcApply(w,[{type:'npc-update'}]);const prior=clone(runtimeOf(w).history.find(h=>h.type==='npc-update').data);
 w=npcApply(w,[{type:'school',basisFactId:conflictId,change:{type:'school-leave',personId:a,status:'transferred-out',reason:'documented later departure'}}]);assert.ok(w.numeric.evolution.world.people[a].roleIds.includes(18));assert.deepEqual(runtimeOf(restoreWorldState(JSON.stringify(w))).history.find(h=>h.type==='npc-update').data,prior);
});
test('npc: weekday private time permits household contact; grade-three Saturday school time does not',async()=>{
 const {informationScenario}=await import('./support/npc-scenario.js'),{positionFor,cursorFor}=await import('../src/calendar/calendar.js');const {world:w,a}=informationScenario();
 const at=(date,slot)=>{const draft=clone(w);draft.position=positionFor(date,slot,2026);runtimeOf(draft).plan.cursor=cursorFor(date,slot,2026);return draft;};
 const caregiver=w.numeric.evolution.world.careLinks.find(l=>l.studentId===a).caregiverId;
 assert.ok(npcWork(at(w.position.date,'private')).some(x=>x.kind==='forward'&&x.toId===caregiver));
 assert.ok(!npcWork(at('2028-09-09','morning')).some(x=>x.kind==='forward'&&x.toId===caregiver));
});
test('npc: witnessed version-specific evidence may support and later refute a rumor without rewriting truth',async()=>{
 const {informationScenario}=await import('./support/npc-scenario.js');let {world:w,a,b,claimId,contactId}=informationScenario();const e=w.events[0];
 for(const conclusion of ['believed','rejected']){
  const factId=`fact:["evidence-${conclusion}"]`;
  w=npcApply(w,[{type:'fact',id:factId,eventId:e.id,stageId:e.stageId,subjectIds:[a],witnessIds:[a],description:'當事人查得與該說法相關的可核對資料。',data:{type:'claim-evidence',claimId,versionId:'original',conclusion},categoryCodes:[],causeIds:[]},{type:'npc-clarify',sourceId:a,toId:b,claimId,versionId:'original',contactId,evidence:{factId,conclusion}}]);
  assert.equal(runtimeOf(w).knowledge.find(k=>k.actorId===b&&k.claimId===claimId).belief,conclusion);
 }
 assert.equal(readPlayerView(w).facts.length,0);assert.ok(npcReport(w).restored);
 assert.throws(()=>npcApply(w,[{type:'npc-clarify',sourceId:b,toId:a,claimId,versionId:'original',contactId,evidence:{factId:'fact:["evidence-rejected"]',conclusion:'rejected'}}]));
});
