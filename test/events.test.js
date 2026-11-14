import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { performance } from 'node:perf_hooks';
import { EVENT_TOPICS,V2_EVENT_TOPICS,TOPIC_IDS } from '../src/runtime/topics.js';
import { buildEventCandidates,validateEventDefinitions,eventIndex,weighEventCandidate,candidateConflict } from '../src/runtime/event-candidates.js';
import { selectWorldEvents,readEventContinuations } from '../src/runtime/event-selection.js';
import { prepareWorldOperation,createWorldSession,forkWorldAttempt } from '../src/runtime/transactions.js';
import { restoreWorldState,runtimeOf } from '../src/runtime/model.js';
import { readPlayerView } from '../src/runtime/views.js';
import { createId } from '../src/contracts/foundation.js';
import { createRandom,restoreRandom } from '../src/numeric/random.js';
import { calendarDay,gradeAt } from '../src/calendar/calendar.js';
import { eventWorld,definition,binding,draw } from './support/event-fixtures.js';
import { request,fact } from './support/runtime.js';
import { advanceRequest } from './support/calendar.js';
const run=(w,op=draw(),tag='draw')=>prepareWorldOperation(w,request(w,tag,[op]));
const selection=w=>runtimeOf(w).history.find(h=>h.type==='event-selection').data;
function positiveWorld(){const w=eventWorld();for(let seed=0;seed<100;seed++){w.random.events=createRandom(seed).snapshot();const next=run(w).world;if(selection(next).selected.length)return {w,next};}throw Error('No seed selected');}

test('17-E: old 96 topics remain stable; new 128 themes are distinct, not 128 invented playable stories',()=>{
 const source=readFileSync(new URL('../docs/03-劇情與事件呈現.md',import.meta.url),'utf8');
 const legacy=[...source.matchAll(/\| (E\d{2}-\d{2}) \| ([^|]+) \|/g)];
 const modern=[...source.matchAll(/\| (T\d{2}-\d{2}) \| ([^|]+) \|/g)];
 const original=EVENT_TOPICS.filter(t=>t.id.startsWith('E'));
 assert.equal(original.length,96);
 assert.deepEqual(original.map(t=>[t.id,t.name]),legacy.map(m=>[m[1],m[2].trim()]));
 assert.equal(new Set(original.map(t=>t.categoryId)).size,12);
 assert.equal(V2_EVENT_TOPICS.length,128);
 assert.equal(new Set(V2_EVENT_TOPICS.map(t=>t.categoryId)).size,16);
 assert.deepEqual(V2_EVENT_TOPICS.map(t=>[t.id,t.name]),modern.map(m=>[m[1],m[2].trim()]));
 assert.equal(EVENT_TOPICS.length,224);
 assert.equal(TOPIC_IDS.length,new Set(TOPIC_IDS).size);
 assert.ok(EVENT_TOPICS.every(t=>t.status==='unwritten'),'topic dictionary status is not a playable-story inventory');
});
test('events: contract rejects duplicate direct/cumulative, wrong core and malformed six weights',()=>{
 const d=definition();assert.throws(()=>validateEventDefinitions([d,{...d,type:'cumulative'}]));
 assert.throws(()=>validateEventDefinitions([{...d,type:'cumulative'}]));
 assert.throws(()=>validateEventDefinitions([d,{...definition('other'),coreCodes:['2-1','2-2','2-3']}])) ;
 assert.throws(()=>validateEventDefinitions([{...d,weights:[1,1,1,1,1,1]}]));
 assert.throws(()=>validateEventDefinitions([{...d,topicId:'invented'}]));
});
test('events: candidate queries stay pure; daily count locks before candidate scarcity',()=>{
 const w=eventWorld(),before=structuredClone(w),d=definition(),built=buildEventCandidates(w,[d],{engineering:true});
 assert.equal(built.candidates.length,40);assert.deepEqual(w,before);assert.deepEqual(buildEventCandidates(w,[d]).candidates,[]);
 const none=definition('none',{eligibility:{...d.eligibility,numeric:[{source:'participant',code:'1-1',min:100,max:100}]}});
 const counter=restoreRandom(w.random.events),expected=counter.weightedIndex(Array(6).fill(1));
 const no=run(w,draw([none])).world;assert.deepEqual(no.random.events,counter.snapshot());assert.equal(selection(no).requested,expected);assert.equal(selection(no).selected.length,0);assert.equal(selection(run(w,draw([d])).world).requested,expected);assert.equal(runtimeOf(no).commits.at(-1).draws[0].id,'event-count:'+w.position.date);
 assert.ok(selection(no).rejected.length>0);
});
test('events: exact K scales B only; cross-holder sources and reversed directions',()=>{
 const w=eventWorld(),d=definition(),c=buildEventCandidates(w,[d],{engineering:true}).candidates[0],index=eventIndex(w);
 const values=['negative','neutral','positive'].map(valence=>weighEventCandidate(w,c,d,{...binding(d),valence},index));
 assert.equal(values[0].effectiveWeight,values[1].rawWeight*1.6);assert.equal(values[2].effectiveWeight,values[1].rawWeight*0.7);
 const reverse=weighEventCandidate(w,c,{...d,directions:Array(6).fill(-1)},binding(d),index);assert.ok(Math.abs(reverse.rawWeight+values[1].rawWeight-100)<1e-10);
 const cross={...binding(d),sources:['participant','participant','participant','participant','player-person','player-person']};assert.ok(weighEventCandidate(w,c,d,cross,index).effectiveWeight>=0);
});
test('events: deterministic weighted daily selection, 0–5 bounds, insufficient pool and no reroll',()=>{
 const {w,next}=positiveWorld(),q=request(w,'draw',[draw()]),again=prepareWorldOperation(restoreWorldState(JSON.stringify(w)),q);
 assert.deepEqual(next,again.world);assert.ok(selection(next).selected.length<=5);
 assert.equal(prepareWorldOperation(next,q).duplicate,true);assert.throws(()=>run(next,draw(),'different-id'),/already decided/);
 const d=definition('player',{eligibility:{...definition().eligibility,people:['player']}});for(let seed=0;seed<16;seed++){const x=structuredClone(w);x.random.events=createRandom(seed).snapshot();assert.ok(selection(run(x,draw([d])).world).selected.length<=1);}
});
test('events: holidays/weekends share 0–1; vacation and six-day festival consume fixed segment once',()=>{
 for(const [date,slot] of [['2026-08-01','morning'],['2026-09-28','morning'],['2026-08-17','vacation-day'],['2027-02-05','festival-day']]){
  const day=calendarDay(date,1);if(date.startsWith('2027'))assert.equal(day.segment.quota,1);
  const w=eventWorld(74,date,slot),next=run(w).world,s=selection(next);assert.ok(s.selected.length<=1);
  if(day.segment)assert.equal(s.requested,1);
  if(s.selected.length){const moved=prepareWorldOperation(next,request(next,'admit',[{type:'admit-event',eventId:s.selected[0].eventId}])).world;assert.equal(moved.events.length,1);}
 }
});
test('events: special activity full-day cannot draw; short protected slot schedules outside protection',()=>{
 const w=eventWorld(74,'2026-10-01','p6'),result=run(w).world,day=calendarDay(w.position.date,1);
 for(const s of selection(result).selected)assert.equal(day.slots.find(x=>x.id===s.slotId).protected,false);
 // school anniversary is an all-day protected quota even with a private slot remaining.
 let full;for(let month=8;month<=12&&!full;month++)for(let n=1;n<=28;n++){const date=`2026-${String(month).padStart(2,'0')}-${String(n).padStart(2,'0')}`,day=calendarDay(date,1);if(day.quota?.kind==='protected-day'){full=day;break;}}
 assert.ok(full);assert.equal(selection(run(eventWorld(74,full.date,full.slots[0].id)).world).selected.length,0);
});
test('events: student/caregiver/staff eligibility uses official identities; reunion needs objective contact',()=>{
 const w=eventWorld(),n=w.numeric.evolution.world,d=definition();
 for(const scope of ['student','caregiver','staff','player']){const pool=buildEventCandidates(w,[{...d,eligibility:{...d.eligibility,people:[scope]}}],{engineering:true});assert.ok(pool.candidates.length>0);assert.ok(pool.candidates.every(c=>c.participantIds[0]===w.identity.playerId||n.people[c.participantIds[0]]));}
 const impossible={...d,eligibility:{...d.eligibility,enrollment:{action:'transfer-in',classId:n.registry.homeClassId}}};assert.equal(buildEventCandidates(w,[impossible],{engineering:true}).candidates.length,0);
});
test('events: reservation opens once at locked slot, preserves identity and blocks skipping',()=>{
 const {next}=positiveWorld(),s=selection(next).selected[0];assert.equal(s.slotId,next.position.slotId);
 assert.throws(()=>prepareWorldOperation(next,advanceRequest(next)),/Admit the locked/);
 const q=request(next,'admit',[{type:'admit-event',eventId:s.eventId}]),opened=prepareWorldOperation(next,q).world;
 assert.equal(opened.events[0].id,s.eventId);assert.equal(prepareWorldOperation(opened,q).duplicate,true);assert.throws(()=>prepareWorldOperation(opened,request(opened,'new-admit',q.operations)),/Already admitted/);
 assert.equal(eventIndex(opened).records[0].status,'active');
});
test('events: active continuation, ended history, cooldown and different people are separate',()=>{
 const {next}=positiveWorld(),s=selection(next).selected[0],opened=prepareWorldOperation(next,request(next,'admit',[{type:'admit-event',eventId:s.eventId}])).world,e=opened.events[0],f=fact(e,'lifecycle');
 const ended=prepareWorldOperation(opened,request(opened,'end',[f,{type:'event-lifecycle',eventId:e.id,status:'ended',basisFactId:f.id}])).world;
 assert.equal(eventIndex(ended).records[0].status,'ended');assert.equal(ended.events[0].id,e.id);assert.equal(runtimeOf(ended).facts.length,1);
 const prior=eventIndex(ended).records[0];assert.equal(candidateConflict(s,prior,s.date),'same-day-instance');
 assert.equal(candidateConflict({...s,key:'other',participantIds:['different']},prior,'2026-08-04'),null);
 assert.equal(candidateConflict(s,prior,'2026-07-22'),'topic-cooldown');assert.equal(candidateConflict(s,prior,'2026-08-10'),null);
 const active={...prior,status:'active'};assert.equal(candidateConflict(s,active,'2026-08-10'),'active-topic-participants');
});
test('events: cumulative threshold reads unique H facts without daily accumulation',()=>{
 const {next}=positiveWorld(),s=selection(next).selected[0],opened=prepareWorldOperation(next,request(next,'admit',[{type:'admit-event',eventId:s.eventId}])).world,e=opened.events[0];
 const w=prepareWorldOperation(opened,request(opened,'fact',[fact(e,'cumulative')])).world,d=definition('cumulative',{topicId:'E02-01',type:'cumulative'});d.eligibility.history=[{code:'H01-1',minimum:1,status:'any'}];
 const before=structuredClone(w),pool=buildEventCandidates(w,[d],{engineering:true});assert.equal(pool.candidates.length,1);buildEventCandidates(w,[d],{engineering:true});assert.deepEqual(w,before);
 d.eligibility.history[0].minimum=2;assert.equal(buildEventCandidates(w,[d],{engineering:true}).candidates.length,0);
});
test('events: mutual exclusion is reapplied during selection, no forced fill',()=>{
 const w=eventWorld(),a=definition('a'),b=definition('b',{topicId:'E02-01'});a.repetition.exclusionGroups=['test-global'];b.repetition.exclusionGroups=['test-global'];
 for(let seed=0;seed<20;seed++){w.random.events=createRandom(seed).snapshot();assert.ok(selection(run(w,draw([a,b])).world).selected.length<=1);}
});
test('events: draft failure rolls back RNG and selection; discarded session ticket has no effects',()=>{
 const w=eventWorld(),before=structuredClone(w);assert.throws(()=>prepareWorldOperation(w,request(w,'fail',[draw(),{type:'invalid'}])));assert.deepEqual(w,before);
 const session=createWorldSession(w),ticket=session.prepare(request(w,'draft',[draw()]));session.discard(ticket);assert.deepEqual(session.snapshot(),w);
 const failed=definition('bad-source');const op=draw([failed]);op.bindings[0].sources=Array(6).fill('person|missing');assert.equal(selection(run(w,op).world).selected.length,0);assert.deepEqual(w,before);
});
test('events: restore rejects corrupt reservation/lifecycle; retry from opening has no ghost draws',()=>{
 const {w,next}=positiveWorld(),bad=structuredClone(next);selection(bad).selected[0].eventId=createId('event',['forged']);assert.throws(()=>restoreWorldState(bad));
 const retry=forkWorldAttempt(w,{attemptId:createId('attempt',['events-retry']),seeds:{settlement:81,streams:{events:82,schedule:83}}});assert.equal(eventIndex(retry).records.length,0);
 assert.equal(runtimeOf(retry).history.filter(h=>h.type==='event-selection').length,0);
});
test('events: player view never exposes pool, weight, hidden values or reserved motives',()=>{
 const {next}=positiveWorld(),view=readPlayerView(next);assert.equal(view.facts.length,0);assert.equal(view.claims.length,0);
 for(const key of ['rawWeight','effectiveWeight','event-selection','engineering-v1','reserved','randomBefore'])assert.ok(!JSON.stringify(view).includes(key));
});
test('events: reproducible statistical K direction, tolerant frequency bands',()=>{
 const w=eventWorld(),defs=['negative','neutral','positive'].map((v,i)=>definition(v,{topicId:`E0${i+1}-01`,eligibility:{...definition().eligibility,people:['player']}})),op=draw(defs);op.bindings.forEach((b,i)=>b.valence=defs[i].id);
 const counts={negative:0,neutral:0,positive:0};for(let seed=0;seed<3000;seed++){w.random.events=createRandom(seed).snapshot();const data=selectWorldEvents(w,op,{id:'engineering'}, {draws:[]});if(data.selected.length)counts[data.selected[0].definitionId]++;}
 const total=Object.values(counts).reduce((a,b)=>a+b,0);for(const [v,k] of Object.entries({negative:1.6,neutral:1,positive:.7}))assert.ok(Math.abs(counts[v]/total-k/3.3)<.04,JSON.stringify(counts));
 assert.ok(counts.negative>counts.neutral&&counts.neutral>counts.positive);
});
test('events: 1920 subtopic engineering scale uses current people without persisted content loading',()=>{
 const w=eventWorld(),defs=Array.from({length:1920},(_,i)=>definition('scale:'+i,{topicId:EVENT_TOPICS[Math.floor(i/20)].id}));const start=performance.now(),built=buildEventCandidates(w,defs,{engineering:true});
 assert.equal(built.candidates.length,76800);assert.ok(performance.now()-start<15000);console.log('event eligibility scale ms',Math.round(performance.now()-start));
 assert.equal(runtimeOf(w).history.length,1);
});

test('events: grade-three Saturday has separate morning/afternoon places, private evening adds none',()=>{
 const w=eventWorld(74,'2028-09-02','morning'),day=calendarDay(w.position.date,3);assert.equal(day.quota.kind,'saturday');
 for(let seed=0;seed<12;seed++){w.random.events=createRandom(seed).snapshot();const data=selection(run(w).world);assert.ok(data.selected.length<=2);assert.equal(new Set(data.selected.map(s=>s.slotId)).size,data.selected.length);assert.ok(data.selected.every(s=>['morning','afternoon'].includes(s.slotId)));}
 const privateWorld=eventWorld(74,'2028-09-02','private');assert.equal(selection(run(privateWorld).world).requested,0);
});
test('events: long vacation / festival fixed buckets cannot be multiplied by daily or split requests',()=>{
 for(const [date,slot,days] of [['2026-08-17','vacation-day',4],['2027-02-05','festival-day',6]]){
  let w=eventWorld(74,date,slot),selectedCount=0,group=null;
  for(let i=0;i<days;i++){
   const d=definition('segment-'+i,{topicId:EVENT_TOPICS[i].id}),next=run(w,draw([d]),'segment-draw-'+i).world,data=runtimeOf(next).history.filter(h=>h.type==='event-selection').at(-1).data;
   if(group!==null)assert.equal(data.groupId,group);group=data.groupId;selectedCount+=data.selected.length;w=next;
   for(const s of data.selected)w=prepareWorldOperation(w,request(w,'segment-admit-'+i,[{type:'admit-event',eventId:s.eventId}])).world;
   if(i<days-1)w=prepareWorldOperation(w,advanceRequest(w,'segment-advance-'+i)).world;
  }
  assert.equal(selectedCount,1);
 }
});
test('events: low exposure changes chance only after disclosed substantive interaction, independent of valence',()=>{
 const {next}=positiveWorld(),s=selection(next).selected[0];assert.equal(eventIndex(next).exposures.size,0);
 let w=prepareWorldOperation(next,request(next,'exposure-admit',[{type:'admit-event',eventId:s.eventId}])).world;
 assert.equal(eventIndex(w).exposures.size,0);const e=w.events[0],f=fact(e,'substantive',{subjectIds:[...e.participantIds,w.identity.playerId],witnessIds:[w.identity.playerId]});
 w=prepareWorldOperation(w,request(w,'interaction',[f,{type:'reveal',actorId:w.identity.playerId,factId:f.id,source:{kind:'observation',actorId:w.identity.playerId,basisFactId:f.id}},{type:'event-exposure',eventId:e.id,participantIds:s.participantIds,basisFactId:f.id}])).world;
 assert.equal(eventIndex(w).exposures.get(s.participantIds[0]),1);
 const d=definition('exposure-other',{topicId:'E02-01'}),built=buildEventCandidates(w,[d],{engineering:true}),index=eventIndex(w);
 const high=built.candidates.find(c=>c.participantIds[0]===s.participantIds[0]),low=built.candidates.find(c=>c.participantIds[0]!==s.participantIds[0]);
 assert.equal(weighEventCandidate(w,high,d,binding(d),index).exposureFactor,1);assert.equal(weighEventCandidate(w,low,d,binding(d),index).exposureFactor,1.1);
 assert.throws(()=>prepareWorldOperation(w,request(w,'exposure-repeat',[{type:'event-exposure',eventId:e.id,participantIds:s.participantIds,basisFactId:f.id}])));
});
test('events: continuing identity/stage is separate from daily draws and ended event cannot progress',()=>{
 const {next}=positiveWorld(),s=selection(next).selected[0];let w=prepareWorldOperation(next,request(next,'cont-admit',[{type:'admit-event',eventId:s.eventId}])).world;
 assert.equal(readEventContinuations(w)[0].eventId,s.eventId);const stageId=createId('stage',[s.eventId,'continuation']);
 w=prepareWorldOperation(w,request(w,'cont-stage',[{type:'stage',eventId:s.eventId,fromStageId:s.stageId,stageId,choice:null}])).world;assert.equal(readEventContinuations(w)[0].stageId,stageId);
 const f=fact(w.events[0],'cont-end');w=prepareWorldOperation(w,request(w,'cont-end',[f,{type:'event-lifecycle',eventId:s.eventId,status:'ended',basisFactId:f.id}])).world;
 assert.deepEqual(readEventContinuations(w),[]);assert.throws(()=>prepareWorldOperation(w,request(w,'cont-after-end',[{type:'stage',eventId:s.eventId,fromStageId:stageId,stageId:createId('stage',[s.eventId,'invalid']),choice:null}])));
});
test('events: actual multi-person candidates need current objective contact, dedup uses IDs and fact',()=>{
 const {next}=positiveWorld(),s=selection(next).selected[0];let w=prepareWorldOperation(next,request(next,'multi-admit',[{type:'admit-event',eventId:s.eventId}])).world;
 const other=w.numeric.evolution.world.classroom.studentIds.find(id=>id!==s.participantIds[0]),f=fact(w.events[0],'contact',{subjectIds:[s.participantIds[0],other],witnessIds:[],data:{type:'contact'}});
 w=prepareWorldOperation(w,request(w,'contact-fact',[f])).world;
 const d=definition('multi',{topicId:'E02-01'});d.eligibility.companions=[{personId:other,contactFactId:f.id}];d.eligibility.facts=[{id:f.id,participant:true}];
 const built=buildEventCandidates(w,[d],{engineering:true});assert.ok(built.candidates.some(c=>c.participantIds.length===2));
 d.eligibility.companions[0].contactFactId=createId('fact',['missing']);assert.equal(buildEventCandidates(w,[d],{engineering:true}).candidates.length,0);
 const c={...s,definitionId:'same-cause',factIds:[f.id],sameFact:true},prior={...c,date:'2026-07-20',status:'ended'};assert.equal(candidateConflict({...c,key:'different'},prior,'2026-08-20'),'same-objective-cause');
});
test('events: raw open cannot bypass locked admission; protected activity cannot run lifecycle/continuation',()=>{
 const w=eventWorld(),e={schemaVersion:1,id:createId('event',['raw']),definitionId:'formal:unselected',contentVersion:'v1',type:'direct',participantIds:[w.identity.playerId],stageId:createId('stage',['raw']),facts:[],knowledge:[],results:[],choice:null};
 assert.throws(()=>prepareWorldOperation(w,request(w,'raw-open',[{type:'open-event',event:e}])),/locked selection/);
 const protectedWorld=eventWorld(74,'2026-10-01','p6');assert.deepEqual(readEventContinuations(protectedWorld),[]);
 assert.throws(()=>prepareWorldOperation(protectedWorld,request(protectedWorld,'protected-lifecycle',[{type:'event-lifecycle',eventId:e.id,status:'ended',basisFactId:createId('fact',['raw'])}])),/ACTIVITY_PROTECTED/);
});

test('events: immutable catalogue is registered once; formal daily request references metadata and compact receipts',()=>{
 const w=eventWorld(),definitions=Array.from({length:96},(_,i)=>definition('catalogue-'+i,{topicId:EVENT_TOPICS[i].id})),register={type:'register-event-catalogue',catalogueId:'engineering-catalogue-v1',definitions,bindings:definitions.map(binding),engineering:true};
 const registered=prepareWorldOperation(w,request(w,'catalogue-register',[register])).world;
 assert.throws(()=>prepareWorldOperation(registered,request(registered,'catalogue-replace',[register])),/already registered/);
 const op={type:'draw-events',catalogueId:register.catalogueId},q=request(registered,'catalogue-draw',[op]),result=prepareWorldOperation(registered,q),s=selection(result.world);
 assert.equal(s.catalogueId,register.catalogueId);assert.ok(JSON.stringify(q).length<1000);assert.equal(s.poolSize,3840);
 assert.ok(JSON.stringify(result.receipt).length<6000);assert.ok(result.receipt.draws.filter(d=>d.poolSize).every(d=>!Object.hasOwn(d,'weights')));
 assert.deepEqual(restoreWorldState(JSON.stringify(result.world)),result.world);
 const corrupt=structuredClone(result.world);runtimeOf(corrupt).history.find(h=>h.type==='event-catalogue').data.definitions[0].type='cumulative';assert.throws(()=>restoreWorldState(corrupt));
});

test('events: transfer changes candidate affiliation immediately; former people need present contact',()=>{
 let w=eventWorld();const student=w.numeric.evolution.world.classroom.studentIds[0],p=w.identity.playerId;
 const e={schemaVersion:1,id:createId('event',['transfer-cause']),definitionId:'procedure:transfer',contentVersion:'test',type:'direct',participantIds:[p,student],stageId:createId('stage',['transfer-cause']),facts:[],knowledge:[],results:[],choice:null},f=fact(e,'transfer-cause',{witnessIds:[]});
 w=prepareWorldOperation(w,{...request(w,'leave',[{type:'open-event',event:e},f,{type:'school',basisFactId:f.id,change:{type:'school-leave',personId:student,status:'transferred-out',reason:'Engineering documented transfer'}}]),calendarContext:{kind:'procedure'}}).world;
 const d=definition(),pool=buildEventCandidates(w,[d],{engineering:true});assert.equal(pool.candidates.length,39);assert.ok(!pool.candidates.some(c=>c.participantIds.includes(student)));
 const reunion=definition('reunion',{topicId:'E02-01',eligibility:{...d.eligibility,people:['reunion'],facts:[{id:f.id,participant:true}]}});
 assert.equal(buildEventCandidates(w,[reunion],{engineering:true}).candidates.length,0);
 const contact=fact(e,'reunion-contact',{witnessIds:[p],data:{type:'contact'}});
 w=prepareWorldOperation(w,{...request(w,'reunion-contact',[contact]),calendarContext:{kind:'procedure'}}).world;reunion.eligibility.facts[0].id=contact.id;
 assert.deepEqual(buildEventCandidates(w,[reunion],{engineering:true}).candidates.map(c=>c.participantIds[0]),[student]);
 const affiliated=definition('affiliation',{eligibility:{...d.eligibility,affiliation:{classId:w.numeric.evolution.world.classroom.id,status:'active'},roleIds:[11]}});
 assert.equal(buildEventCandidates(w,[affiliated],{engineering:true}).candidates.length,39);
 const noKnowledge=definition('unknown',{eligibility:{...d.eligibility,knowledge:[{actorId:'participant',claimId:'missing',versionId:'missing',belief:'any'}]}});assert.equal(buildEventCandidates(w,[noKnowledge],{engineering:true}).candidates.length,0);
});
