import test from 'node:test';
import assert from 'node:assert/strict';
import { failureOpening,runFailure,failureRequest,failureApply } from './support/failure-scenario.js';
import { failureResult,crisisContext,HOMEROOM_KEY } from '../src/runtime/homeroom.js';
import { prepareWorldOperation,forkWorldAttempt } from '../src/runtime/transactions.js';
import { runtimeOf,restoreWorldState,WorldError } from '../src/runtime/model.js';
import { createSave,restoreSave,sameToken,saveToken } from '../src/storage/format.js';
import { createStoredSession } from '../src/storage/session.js';
import { readAnnualFailure } from '../src/runtime/views.js';
import { id } from './support/runtime.js';
const clone=structuredClone;
let social,physical,beforeCrisis;
function outcome(route){if(route==='social')return social??=(runFailure(failureOpening(),{route}).world);return physical??=(runFailure(failureOpening(),{route,maxDays:20,onWorld:w=>{const c=crisisContext(w);if(!beforeCrisis&&c.ordinary>=3&&(c.risk.band!=='一般'||Object.values(c.risk.single).some(x=>x.hit))&&!runtimeOf(w).history.some(h=>h.type==='event-selection'&&h.at.date===w.position.date))beforeCrisis=clone(w);}}).world);}
function memory(){const slots=new Map();let fail=false;return {fail(){fail=true;},async read(slot){return clone(slots.get(slot)??{payload:null,token:null});},async write(slot,payload,expected){const previous=await this.read(slot);if(!sameToken(previous.token,expected))throw new WorldError('STALE','changed');if(fail){fail=false;throw Error('quota');}const token=saveToken({payload,generation:(previous.token?.generation??0)+1}),saved={payload:restoreSave(payload),token};slots.set(slot,saved);return clone(saved);}};}
const retryOptions=(w,n)=>({attemptId:id('attempt','formal-retry-'+n),seeds:{settlement:33+n,streams:Object.fromEntries(Object.keys(failureOpening().random).map(k=>[k,n]))},failureId:failureResult(w).id,failedAttemptId:w.identity.attemptId,schoolYearId:w.position.schoolYearId,expectedRevision:runtimeOf(w).revision});

test('failure: real healthy teacher, notice, cross-day executed unfair replacement, unique known terminal and no success grade',()=>{
 const w=outcome('social'),h=failureResult(w);assert.ok(h);assert.equal(crisisContext(w).risk.band,'一般');
 const notice=runtimeOf(w).history.find(h=>h.type==='homeroom-result'&&h.data.kind==='notice');assert.ok(notice.at.date<h.at.date);assert.equal(h.data.kinds[0],'replaced');assert.equal(h.data.score,null);assert.equal(h.data.grade,null);
 assert.equal(runtimeOf(w).history.filter(h=>h.type==='annual-failure').length,1);assert.equal(runtimeOf(w).history.some(h=>h.type==='annual-success'),false);
 const baseline=w.extensions[HOMEROOM_KEY],a=w.numeric.evolution.world.registry.assignments.find(a=>a.id===baseline.assignmentId);assert.equal(a.until,h.at.date);assert.equal(w.numeric.evolution.world.player.year,1);assert.equal(w.numeric.evolution.world.classroom.studentIds.length,40);
 const visible=readAnnualFailure(w);assert.equal(Object.keys(visible.comparison).length,12);for(const k of ['memory','risk','sourceHistoryIds','attemptId','playerId','factIds'])assert.equal(k in visible,false);assert.match(visible.summary,/爭議/);
 const last=JSON.parse(runtimeOf(w).commits.at(-1).request);assert.equal(prepareWorldOperation(w,last).duplicate,true);
 for(const ops of [[{type:'advance-time',planId:runtimeOf(w).plan.id,steps:1}],[{type:'settle-school-year'}],[{type:'sample',stream:'events',id:'after-failure',weights:[1]}]])assert.throws(()=>prepareWorldOperation(w,failureRequest(w,ops,'routine')),{code:'YEAR_FAILED'});
});

test('failure: ordinary pressure via real choices opens N7 crisis and naturally becomes effective resignation; no injected states',()=>{
 const w=outcome('physical'),h=failureResult(w);assert.ok(h);assert.ok(crisisContext(w).ordinary>=3);assert.ok(beforeCrisis);assert.equal(failureResult(beforeCrisis),null);assert.ok(Object.values(crisisContext(beforeCrisis).risk.single).some(x=>x.hit)||crisisContext(beforeCrisis).risk.band!=='一般');
 assert.equal(h.data.kinds[0],'resigned');assert.deepEqual(h.data.kinds,['resigned','unable']);assert.equal(runtimeOf(w).history.filter(h=>h.type==='annual-failure').length,1);assert.ok(runtimeOf(w).history.filter(h=>h.type==='homeroom-result'&&h.data.kind==='pressure').length>=3);assert.ok(runtimeOf(w).history.some(h=>h.type==='choice'&&h.data.optionId==='help'));
 const bad=clone(w);runtimeOf(bad).history.find(h=>h.type==='annual-failure').data.kinds=['unable'];assert.throws(()=>restoreWorldState(bad));
 const missing=clone(w);runtimeOf(missing).history.find(h=>h.type==='homeroom-result'&&h.data.kind==='resigned').data.effectiveAt=null;assert.throws(()=>restoreWorldState(missing));
 const observation=clone(w);runtimeOf(observation).history.find(h=>h.type==='crisis-observation').data.memory++;assert.throws(()=>restoreWorldState(observation));
});

test('failure: thoughts, pending resignation, interim notice and effective pre-execution remedy do not end the year',()=>{
 const thought=runFailure(failureOpening(),{route:'pressure',option:'think',maxDays:0}).world;assert.equal(failureResult(thought),null);assert.ok(runtimeOf(thought).history.some(h=>h.type==='homeroom-result'&&h.data.kind==='thought'));
 const pending=runFailure(failureOpening(),{route:'social',option:'pending',stopBeforeFailure:true}).world;assert.equal(failureResult(pending),null);assert.ok(runtimeOf(pending).history.some(h=>h.type==='homeroom-result'&&h.data.kind==='resignation-pending'));
 const preserved=runFailure(failureOpening(),{route:'social',option:'review',maxDays:2}).world;assert.equal(failureResult(preserved),null);assert.ok(runtimeOf(preserved).history.some(h=>h.type==='homeroom-result'&&h.data.kind==='restored'));
 const w=outcome('social');assert.throws(()=>forkWorldAttempt(failureOpening(),retryOptions(w,1),pending),{code:'RETRY_UNAUTHORIZED'});
});

test('failure: actual support/temporary cover can improve the same threatened world without erasing retained crisis',()=>{
 outcome('physical');const original=crisisContext(beforeCrisis),supported=runFailure(beforeCrisis,{route:'support',option:'leave',maxDays:3}).world;
 assert.equal(failureResult(supported),null);assert.ok(runtimeOf(supported).history.some(h=>h.type==='homeroom-result'&&h.data.kind==='temporary'));assert.ok(crisisContext(supported).risk.score>original.risk.score);assert.ok(crisisContext(supported).memory>0);
});

test('failure: full three retries, reload/export/import, CAS, wrong authorization, rollback and pristine opening isolation',async()=>{
 const opening=failureOpening(),db=memory(),s=await createStoredSession(db,1);await s.initialize(opening);
 const empty=s.snapshot();await assert.rejects(s.retry({attemptId:id('attempt','unfailed'),seeds:{}}),{code:'RETRY_UNAUTHORIZED'});assert.deepEqual(s.snapshot(),empty);
 let w=outcome('social');
 for(let n=1;n<=3;n++){
  if(n>1)w=runFailure(s.snapshot().payload.world,{route:'social',maxDays:5}).world;
  await s.import(createSave(w,opening),{expectedToken:s.snapshot().token,confirmed:true});
  const text=await s.export(),copy=await createStoredSession(db,2);await copy.import(text,{expectedToken:copy.snapshot().token,confirmed:!!copy.snapshot().payload});const reloaded=await createStoredSession(db,2);assert.ok(failureResult(reloaded.snapshot().payload.world));
  const opts=retryOptions(w,n),before=s.snapshot();
  for(const change of [{failureId:'forged'},{failedAttemptId:id('attempt','wrong')},{schoolYearId:'wrong'},{expectedRevision:0}])await assert.rejects(s.retry({...opts,...change}),{code:'RETRY_UNAUTHORIZED'});
  db.fail();await assert.rejects(s.retry(opts),/quota/);assert.deepEqual(s.snapshot(),before);assert.deepEqual(await db.read(1),before);
  const stale=await createStoredSession(db,1);await s.retry(opts);const fresh=s.snapshot();assert.equal((await s.retry(opts)).duplicate,true);assert.deepEqual(s.snapshot(),fresh);await assert.rejects(stale.retry(opts),{code:'STALE'});
  assert.deepEqual(fresh.payload.opening,opening);assert.deepEqual(fresh.payload.world.numeric.evolution,opening.numeric.evolution);assert.deepEqual(fresh.payload.world.events,opening.events);assert.equal(failureResult(fresh.payload.world),null);assert.equal(runtimeOf(fresh.payload.world).facts.length,0);assert.equal(runtimeOf(fresh.payload.world).commits.length,2);
  for(let old=1;old<n;old++)assert.throws(()=>forkWorldAttempt(opening,{...opts,attemptId:id('attempt','formal-retry-'+old)},w),{code:'ATTEMPT'});
  await assert.rejects(s.execute(failureRequest(w,[{type:'sample',stream:'events',id:'old',weights:[1]}])),{code:'ATTEMPT'});
  await s.execute(failureRequest(fresh.payload.world,[{type:'academic',action:'open',termId:'2026:autumn'}],'routine'));assert.ok(s.snapshot().payload.world.numeric.evolution.world.registry);
 }
});

test('failure: legacy annual saves remain compatible, explicit opening-only opt-in and unknown extension versions reject',()=>{
 const w=failureOpening(),unowned=clone(w);unowned.numeric.evolution.world.registry.assignments.find(a=>a.id===unowned.extensions[HOMEROOM_KEY].assignmentId).until=w.position.date;assert.throws(()=>restoreWorldState(unowned));const bad=clone(w);bad.extensions[HOMEROOM_KEY].version=2;assert.throws(()=>restoreWorldState(bad));const stripped=clone(w);delete stripped.extensions[HOMEROOM_KEY];assert.deepEqual(restoreSave(createSave(stripped,stripped)).world,stripped);assert.throws(()=>createSave(w,stripped));
});
