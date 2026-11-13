/** Exactly five directed groups. Skipped-date baselines explicitly do not claim
 * continuous annual gameplay; no semester/year simulation is run. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { eventWorld } from './support/event-fixtures.js';
import { experiencedOpening } from './support/calendar.js';
import { runFailure } from './support/failure-scenario.js';
import { id,request,runtimeScenario } from './support/runtime.js';
import { initializeSemesterReviews,REVIEW_KEY,pendingSemesterReview } from '../src/runtime/reviews.js';
import { prepareWorldOperation,forkWorldAttempt } from '../src/runtime/transactions.js';
import { restoreWorldState,runtimeOf } from '../src/runtime/model.js';
import { failureResult } from '../src/runtime/homeroom.js';
import { yearData,calendarDay,gradeAt,positionFor,cursorFor,planMode,nextPosition } from '../src/calendar/calendar.js';
import { schoolCatalogue,applySchoolOperation } from '../src/world/registry.js';
import { createSave,restoreSave,encodeSave,sameToken,saveToken } from '../src/storage/format.js';
import { createStoredSession } from '../src/storage/session.js';
import { packStoredText,unpackStoredText,createIndexedDBStorage } from '../src/storage/indexeddb.js';
import { validateRetryCheckpoint,validateRetryPair,captureRetryCheckpoint,retrySemester } from '../src/runtime/retry-checkpoint.js';
import { readFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
const career={version:1,mode:'three-year',difficulty:'hard'},clone=structuredClone;
const apply=(w,ops,tag='boundary')=>prepareWorldOperation(w,{...request(w,tag+'-'+runtimeOf(w).revision,ops),calendarContext:{kind:'routine'}}).world;
function relocate(w,date,slot){
 w=clone(w);const r=runtimeOf(w),p=positionFor(date,slot,2026,planMode(r.plan),r.plan.calendarVersion);w.position=p;r.plan.cursor=cursorFor(date,slot,2026,r.plan.calendarVersion);
 Object.assign(w.numeric.evolution.clock,{date,lastNaturalDate:null,schoolYearId:p.schoolYearId,openingId:p.openingId});w.numeric.evolution.world.player.year=p.serviceYear;return restoreWorldState(w);
}
const options=(w,tag,checkpoint=w)=>({attemptId:id('attempt',tag),seeds:{settlement:33,streams:Object.fromEntries(Object.keys(checkpoint.random).map(k=>[k,55]))},...(failureResult(w)?{failureId:failureResult(w).id,failedAttemptId:w.identity.attemptId,schoolYearId:w.position.schoolYearId,expectedRevision:runtimeOf(w).revision}:{})});
function summer(year){
 if(year===2026)return initializeSemesterReviews(eventWorld(74,null,null,career));
 const date=yearData(year).summerCamp,before=new Date(Date.parse(date)-86400000).toISOString().slice(0,10);
 let w=eventWorld(74,before,'vacation-day',career),n=w.numeric.evolution.world;
 // Minimal legal promoted numeric baseline; no invented annual-success history.
 for(let y=2027;y<=year;y++)n=applySchoolOperation(n,{type:'school-year',academicYear:y},before);
 w.numeric.evolution.world=n;w=restoreWorldState(w);
 w.extensions[REVIEW_KEY]=clone(summer(2026).extensions[REVIEW_KEY]);
 w=apply(w,[{type:'prepare-semester',semesterId:`${year}:autumn`,classes:schoolCatalogue(n,['國文']),homeClassId:n.registry.homeClassId}]);
 return apply(w,[{type:'finish-slot',completedActivityIds:[]},{type:'advance-time',planId:runtimeOf(w).plan.id,steps:1}]);
}
function winter(year){
 const cp=summer(year-1),date=yearData(year).winterFinal;
 const before=relocate(cp,date,'private');const finished=apply(before,[{type:'finish-slot',completedActivityIds:[]}]);
 const report=pendingSemesterReview(finished);assert.ok(report);
 const read=request(finished,'read-'+year,[{type:'read-semester-review',reviewId:report.id}]);
 return {upper:cp,before,finished,read,checkpoint:prepareWorldOperation(finished,read).world};
}
function memory(){const slots=new Map();let fail=false;return {fail(){fail=true;},async read(n){assert.ok([1,2,3].includes(n));return clone(slots.get(n)??{payload:null,token:null});},async write(n,payload,expected){const old=await this.read(n);if(!sameToken(expected,old.token))throw Object.assign(Error('stale'),{code:'STALE'});if(fail){fail=false;throw Error('quota');}const checked=restoreSave(payload),saved={payload:checked,token:saveToken({payload:checked,generation:(old.token?.generation??0)+1})};slots.set(n,saved);return clone(saved);}};}

test('group 1: three summer entries, immutable capture, cross-autumn restoration',async()=>{
 for(const year of [2026,2027,2028]){
  const cp=summer(year);validateRetryCheckpoint(cp);assert.equal(cp.position.date,yearData(year).summerCamp);
  const later=relocate(cp,yearData(year).autumnStart,'early');validateRetryPair(cp,later);assert.equal(captureRetryCheckpoint(cp,later,cp),false);
  const retried=forkWorldAttempt(cp,options(later,'summer-'+year),later);assert.deepEqual(retried.position,cp.position);assert.deepEqual(retried.numeric.evolution,cp.numeric.evolution);
  assert.deepEqual(restoreSave(encodeSave(createSave(retried,cp))).opening,cp);
  if(year>2026)assert.throws(()=>validateRetryPair(summer(2026),later),/semester/);
 }
});

test('group 2: three winter confirmations, atomic capture, next original slot and no second day-end',async()=>{
 for(const year of [2027,2028,2029]){
  const {upper,finished,read,checkpoint:cp}=winter(year);assert.throws(()=>validateRetryCheckpoint(finished));validateRetryCheckpoint(cp);
  const db=memory();await db.write(1,createSave(finished,upper),null);const session=await createStoredSession(db,1);
  const before=clone(finished.numeric);await session.execute(read);assert.deepEqual(session.snapshot().payload.opening,cp);assert.deepEqual(cp.numeric,before);
  const saved=session.snapshot();await session.execute(read);assert.deepEqual(session.snapshot(),saved);await session.recover();assert.deepEqual(session.snapshot(),saved);
  const next=apply(cp,[{type:'advance-time',planId:runtimeOf(cp).plan.id,steps:1}]);assert.deepEqual(next.position,nextPosition(cp.position,2026,'three-year',runtimeOf(cp).plan.calendarVersion));
  let prepared=relocate(next,new Date(Date.parse(yearData(year).winterCamp)-86400000).toISOString().slice(0,10),'vacation-day');
  prepared=apply(prepared,[{type:'prepare-semester',semesterId:`${year}:spring`,classes:schoolCatalogue(prepared.numeric.evolution.world,['國文']),homeClassId:prepared.numeric.evolution.world.registry.homeClassId}]);
  const spring=relocate(prepared,yearData(year).springStart,'early');const retry=forkWorldAttempt(cp,options(spring,'winter-'+year),spring);assert.deepEqual(retry.position,cp.position);
  const resumed=apply(retry,[{type:'advance-time',planId:runtimeOf(retry).plan.id,steps:1}]);assert.deepEqual(resumed.position,next.position);
  assert.equal(runtimeOf(resumed).history.filter(h=>h.type==='slot-complete'&&h.at.date===cp.position.date).length,1);
  assert.throws(()=>createSave(spring,upper),/semester/);
 }
});

test('group 3: real failure authorization, whole-world rollback, history isolation and unique attempts',()=>{
 const cp=experiencedOpening('hard');const failed=runFailure(cp,{route:'social',maxDays:3});assert.ok(failed.failed);
 const opts=options(failed.world,'actual-retry',cp),retry=forkWorldAttempt(cp,opts,failed.world);
 for(const key of ['events','enrollments'])assert.deepEqual(retry[key],cp[key]);
 assert.deepEqual(retry.numeric.evolution,cp.numeric.evolution);assert.deepEqual(retry.numeric.receipts,[]);
 for(const [key,value] of Object.entries(cp.extensions))if(key!=='teacher-hell/world')assert.deepEqual(retry.extensions[key],value);
 const r=runtimeOf(retry),base=runtimeOf(cp);for(const key of Object.keys(base))if(!['revision','history','commits','numericArchives'].includes(key))assert.deepEqual(r[key],base[key]);
 assert.deepEqual(r.history.slice(0,-1),base.history);assert.equal(failureResult(retry),null);assert.notDeepEqual(retry.random,cp.random);
 assert.throws(()=>forkWorldAttempt(cp,{...opts,failureId:'forged'},failed.world),{code:'RETRY_UNAUTHORIZED'});
 assert.throws(()=>forkWorldAttempt(cp,{...opts,attemptId:cp.identity.attemptId},failed.world),{code:'ATTEMPT'});
 const second=runFailure(retry,{route:'social',maxDays:3});assert.ok(second.failed);
 assert.throws(()=>forkWorldAttempt(cp,options(second.world,'actual-retry',cp),second.world),{code:'ATTEMPT'});
 const fresh=forkWorldAttempt(cp,options(second.world,'actual-retry-2',cp),second.world);assert.equal(runtimeOf(fresh).history.filter(h=>h.type==='annual-failure').length,0);
 assert.deepEqual(cp,experiencedOpening('hard'));
});

test('group 4: prior semester evidence retained, no extra annual or career settlement, baseline guards',()=>{
 const {checkpoint:cp}=winter(2028),advanced=apply(cp,[{type:'advance-time',planId:runtimeOf(cp).plan.id,steps:1}]),next=apply(advanced,[{type:'sample',stream:'events',id:'discard',weights:[1,2]}]);
 const retry=forkWorldAttempt(cp,options(next,'retained'),next);
 for(const type of ['semester-review','semester-review-read','annual-success','year-transition','career-completion','cohort-completion'])assert.deepEqual(runtimeOf(retry).history.filter(h=>h.type===type),runtimeOf(cp).history.filter(h=>h.type===type));
 assert.deepEqual(retry.numeric.evolution.world.registry,cp.numeric.evolution.world.registry);
 const bad=clone(next);bad.extensions['teacher-hell/annual-observations']={invented:true};assert.throws(()=>validateRetryPair(cp,bad),/baseline/);
 // Read-only contract doubles explicitly exercise the cross-opening baseline bridge.
 const source=clone(cp),target=clone(cp),baseline={proof:'prior annual success'},duty={proof:'assigned duty'};
 source.extensions['teacher-hell/annual-observations']=baseline;source.extensions['teacher-hell/homeroom-continuity']=duty;
 target.extensions['teacher-hell/annual-observations']={proof:'new annual'};
 runtimeOf(target).history.push({type:'academic-opening',data:{previousAnnual:baseline,previousHomeroom:duty}});
 validateRetryPair(source,target);runtimeOf(target).history.at(-1).data.previousAnnual={wrong:true};assert.throws(()=>validateRetryPair(source,target),/baseline/);
 for(const file of ['src/runtime/annual.js','src/runtime/career.js','src/runtime/homeroom.js','src/calendar/fixed.js'])assert.ok(readFileSync(new URL('../'+file,import.meta.url)).length);
});

test('group 5: v2 roundtrip, gzip, three slots, CAS/failed-write atomicity and single save capacity',async t=>{
 const engineering=runtimeScenario();assert.deepEqual(restoreSave(encodeSave(createSave(engineering,engineering))).world,engineering);
 const {upper,finished,read,checkpoint:cp}=winter(2027),db=memory();await db.write(1,createSave(finished,upper),null);const s=await createStoredSession(db,1),before=s.snapshot();
 db.fail();await assert.rejects(s.execute(read),/quota/);assert.deepEqual(s.snapshot(),before);assert.deepEqual(await db.read(1),before);
 await s.execute(read);const text=await s.export();assert.equal(JSON.parse(text).version,2);const packed=await packStoredText(text);assert.equal(packed.metadata.codec,'gzip');assert.equal(await unpackStoredText(packed.metadata,packed.pages),text);
 const copy=await createStoredSession(db,2);await copy.import(text,{expectedToken:null});assert.deepEqual(copy.snapshot().payload,createSave(cp,cp));assert.equal((await db.read(3)).payload,null);
 await assert.rejects(s.import(text,{expectedToken:before.token,confirmed:true}),{code:'STALE'});
 assert.throws(()=>restoreSave({...JSON.parse(text),version:1}),{code:'VERSION'});
 const adapter=createIndexedDBStorage({factory:{open(){throw Error('unexpected');}},namespace:'test',testId:'semester'});await assert.rejects(adapter.read(4),{code:'SLOT'});
 assert.match(readFileSync(new URL('../web/progress-worker.js',import.meta.url),'utf8'),/retryStreams:Object.keys\(snap.payload\?\.opening\?\.random/);
 assert.match(readFileSync(new URL('../web/game.js',import.meta.url),'utf8'),/current.snapshot\(\).retryStreams.map/);
 const oldText=JSON.stringify({kind:'teacher-hell-save',version:1,world:cp,opening:upper}),oldPacked=await packStoredText(oldText);
 t.diagnostic(JSON.stringify({representative:'2027-01-22 final confirmation',before:{json:Buffer.byteLength(oldText),gzip:oldPacked.pages.reduce((n,p)=>n+p.byteLength,0)},after:{json:Buffer.byteLength(text),gzip:packed.pages.reduce((n,p)=>n+p.byteLength,0)}}));
 // Completion read-only remains enforced by the unchanged transaction barrier.
 assert.match(readFileSync(new URL('../src/runtime/transactions.js',import.meta.url),'utf8'),/ensure\(!careerResult\(world\),'CAREER_COMPLETE'/);
});


// Supplemental group only: do not report a date-only fixture as annual handoff
// acceptance. This prerequisite gate records both blocked scenarios explicitly.
test('supplemental: summer cross-year handoff prerequisites (pending legal fixtures)',async t=>{
 const source=JSON.parse(gunzipSync(readFileSync(new URL('../simulation/sources/h5-before-completion.json.gz',import.meta.url))));
 const initial=JSON.parse(gunzipSync(readFileSync(new URL('../simulation/sources/h5-opening.json.gz',import.meta.url))));
 const candidates=[initial.world,initial.opening,source.opening,source.world];
 t.diagnostic('Existing full-world source positions: '+[...new Set(candidates.map(w=>w.position.date))].join(', '));
 for(const [label,summerDate,autumnDate] of [
  ['A: grade 2','2027-07-19','2027-08-23'],
  ['B: grade 3','2028-07-24','2028-08-28']
 ]){
  const checkpoint=candidates.find(w=>w.position.date===summerDate&&w.extensions['teacher-hell/annual-observations']&&runtimeOf(w).history.some(h=>h.type==='annual-success'));
  assert.equal(checkpoint,undefined,'A suitable source is now available: replace this pending gate with official opening/failure/retry transactions before claiming acceptance');
  await t.test(label+' '+summerDate+' -> '+autumnDate,{skip:'Missing a complete legal summer checkpoint with retained prior annual success; no official opening or retry was executed'},()=>{});
 }
});
