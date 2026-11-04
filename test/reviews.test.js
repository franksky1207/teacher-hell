import test from 'node:test';
import assert from 'node:assert/strict';
import { startReviewedSchoolCareer, prepareWorldOperation } from '../src/runtime/transactions.js';
import { restoreWorldState, runtimeOf } from '../src/runtime/model.js';
import { REVIEW_KEY, readSemesterReviews, initializeSemesterReviews, representativeEvents } from '../src/runtime/reviews.js';
import { createSave, encodeSave, restoreSave } from '../src/storage/format.js';
import { yearData, nextPosition, semester } from '../src/calendar/calendar.js';
import { foundationScenario } from './support/scenarios.js';
import { academicBaseline } from './support/academic-scenario.js';
import { request } from './support/runtime.js';

function initial(seed=74){const f=foundationScenario(seed);f.events=[];f.enrollments=[];return startReviewedSchoolCareer(f,{startYear:2026,subject:'國文',seed:75});}
// Boundary tests only. This explicit skipped-date baseline is not an academic year run.
const atFinal=(w,date=yearData(2027).winterFinal)=>academicBaseline(w,date,'private');
const apply=(w,tag,ops)=>prepareWorldOperation(w,{...request(w,tag,ops),calendarContext:{kind:'routine'}}).world;
const finish=w=>apply(w,'finish-'+runtimeOf(w).plan.cursor+'-'+runtimeOf(w).revision,[{type:'finish-slot',completedActivityIds:[]}]);
const advance=w=>apply(w,'advance-'+runtimeOf(w).revision,[{type:'advance-time',planId:runtimeOf(w).plan.id,steps:1}]);

test('reviews: initial real summer baseline, strict restore and independent new career',()=>{
 const w=initial(),p=structuredClone(w);assert.equal(w.position.date,yearData(2026).summerCamp);assert.deepEqual(readSemesterReviews(w),[]);
 assert.deepEqual(restoreSave(encodeSave(createSave(w,w))).world,w);assert.deepEqual(w,p);
 assert.throws(()=>initializeSemesterReviews(w),/Formal initial/);
 const bad=structuredClone(w);bad.extensions[REVIEW_KEY].cursor++;assert.throws(()=>restoreWorldState(bad),/baseline/);
 assert.deepEqual(readSemesterReviews(initial(75)),[]);
});
test('reviews: final slot saves six comparisons including zero; read blocks time and survives restore',()=>{
 const w=atFinal(initial()),next=finish(w),saved=readSemesterReviews(next);assert.equal(saved.length,1);assert.equal(saved[0].status,'unread');assert.equal(Object.keys(saved[0].abilities).length,6);
 assert.ok(Object.values(saved[0].abilities).every(a=>a.delta===a.end-a.start));assert.equal(saved[0].states,undefined);assert.deepEqual(saved[0].events,[]);
 assert.throws(()=>advance(next),/REVIEW_PENDING/);assert.deepEqual(readSemesterReviews(restoreSave(encodeSave(createSave(next))).world),saved);
 const badActor={...request(next,'npc-cannot-read',[{type:'read-semester-review',reviewId:saved[0].id}]),actorId:next.numeric.evolution.world.classroom.studentIds[0]};assert.throws(()=>prepareWorldOperation(next,badActor),/ACTOR/);
 const before=structuredClone(next),q=request(next,'read',[{type:'read-semester-review',reviewId:saved[0].id}]),ack=prepareWorldOperation(next,q).world;
 assert.equal(readSemesterReviews(ack)[0].status,'read');assert.deepEqual(ack.position,before.position);assert.deepEqual(ack.numeric,before.numeric);assert.deepEqual(ack.random,before.random);
 assert.equal(prepareWorldOperation(ack,q).duplicate,true);assert.throws(()=>apply(ack,'read-again',[{type:'read-semester-review',reviewId:saved[0].id}]),/already read/);
 assert.deepEqual(advance(ack).position,nextPosition(ack.position,2026));
});
test('reviews: no report before final slot, single generation and forged summary rejection',()=>{
 let w=academicBaseline(initial(),yearData(2027).winterFinal,'p8');w=finish(w);assert.equal(readSemesterReviews(w).length,0);
 w=advance(w);w=finish(w);assert.equal(readSemesterReviews(w).length,1);assert.throws(()=>finish(w),/REVIEW_PENDING/);
 for(const mutate of [d=>d.delta.教學能力++,d=>d.periodId='fake',d=>d.events.push({eventId:'fake'}),d=>d.fromOrder++]){const bad=structuredClone(w);mutate(runtimeOf(bad).history.find(h=>h.type==='semester-review').data);assert.throws(()=>restoreWorldState(bad));}
 const before=JSON.stringify(w);readSemesterReviews(w);readSemesterReviews(w);assert.equal(JSON.stringify(w),before);
});
test('reviews: school action stops at unread report instead of silently advancing',()=>{
 let w=initial();w=apply(w,'open',[{type:'academic',action:'open',termId:'2026:autumn'}]);
 const meta=semester('2026:autumn');
 for(const round of [1,2,3,0]){w=academicBaseline(w,meta.exams[round===0?2:round-1].at(-1));w=apply(w,'assess-'+round,[{type:'academic',action:'assess',termId:meta.id,round}]);}
 const at=structuredClone(w.position);
 w=apply(w,'school-action-final',[{type:'school-action',activity:'rest'}]);
 assert.deepEqual(w.position,at);assert.equal(readSemesterReviews(w)[0].status,'unread');
 assert.throws(()=>apply(w,'no-extra-action',[{type:'sample',stream:'events',id:'extra',weights:[1]}]),/REVIEW_PENDING/);
});
test('reviews: importance threshold, tenth ties, no hidden fact leak or old-term recycling',()=>{
 // Read-only rubric unit fixture, never accepted as a formal saved world.
 const w=initial(),r=runtimeOf(w);w.events=[];r.history=[];r.facts=[];
 for(let i=0;i<12;i++){const eventId='rubric-'+String(i).padStart(2,'0'),factId='known-'+i,subjectIds=[w.identity.playerId,'student-'+i];w.events.push({id:eventId,participantIds:subjectIds});r.facts.push({id:factId,eventId,subjectIds,witnessIds:i===11?[]:[w.identity.playerId],description:'已知實際發展'});for(const type of ['choice','result','fact'])r.history.push({id:'h-'+r.history.length,order:r.history.length+1,eventId,type,factIds:[factId],data:{}});}
 const results=representativeEvents(w,0,r.history.length);assert.equal(results.length,11);assert.ok(results.every(e=>e.score===7));assert.ok(results.every(e=>e.eventId!=='rubric-11'));assert.deepEqual(representativeEvents(w,r.history.length,r.history.length),[]);
});
