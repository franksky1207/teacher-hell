import {restoreWorldState,findFact} from '../src/runtime/model.js';
import {createId} from '../src/contracts/foundation.js';
import {isCampOpeningPosition} from '../src/runtime/schedule.js';
import {eventWorld} from './support/event-fixtures.js';
import {academicAt} from './support/senior-academic.js';
import {THREE_YEAR,positionFor,CALENDAR_VERSION,calendarDay} from '../src/calendar/calendar.js';
import {aftercareCellIsEmpty,scheduledPhase} from '../web/presentation.js';
import {slotOccupancy} from '../src/calendar/calendar.js';
import {fiveTerms} from './support/senior-academic.js';
import {projectNotebookAcademics} from '../web/notebook-academics.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {gunzipSync} from 'node:zlib';
import {createCandidate} from '../src/player/creation.js';
import {createCareerOpening} from '../src/runtime/opening.js';
import {nextProgression,progressionContext,planProgression} from '../src/runtime/progression.js';
import {prepareWorldSequence,prepareWorldOperation} from '../src/runtime/transactions.js';
import {academicState,academicTermStatus,withAcademicProjection} from '../src/runtime/academics.js';
import {restoreSave} from '../src/storage/format.js';
import {projectSeniorSummary,renderSeniorSummary} from '../web/senior-summary.js';
const opening=()=>createCareerOpening({candidate:createCandidate({seed:74,playerId:'teacher',schoolId:'school'}),seed:75,taipeiDate:'2026-11-06',difficulty:'normal',subject:'國文',careerKey:'h5-test'});
test('H5 controller emits checked actions and deterministic revision ids without mutating state',()=>{
 let w=opening();const before=JSON.stringify(w),a=nextProgression(w);assert.equal(a.status,'action');assert.deepEqual(a,nextProgression(w));assert.equal(JSON.stringify(w),before);
 w=prepareWorldOperation(w,a.request).world;assert.notEqual(nextProgression(w).request.id,a.request.id);
 assert.equal(prepareWorldOperation(w,a.request).duplicate,true);
});
test('H5 controller gates review, completion, failure and event attention before any advance',()=>{
 const c=progressionContext(opening());assert.equal(planProgression({...c,pendingReview:'review'}).status,'review-required');
 assert.equal(planProgression({...c,completed:true}).status,'completed');assert.equal(planProgression({...c,failed:true}).status,'failed');
 assert.equal(planProgression({...c,stories:[{waiting:false,eventId:'event'}]}).status,'attention-required');
 const aftercare={...c,schoolEnabled:true,catalogueIds:['aftercare:representatives-v1'],aftercare:{status:'advance',request:{},activeWeek:false}};assert.equal(planProgression(aftercare).label,'推進一週善後');assert.equal(planProgression({...aftercare,aftercare:{...aftercare.aftercare,activeWeek:true}}).label,'繼續本週善後');
});
test('H5 real old June terminal selects the unique annual entry, never another week',()=>{
 const fixtures=JSON.parse(gunzipSync(readFileSync(new URL('./fixtures/h4-pre-5c21854.json.gz',import.meta.url))));
 const w=restoreSave(fixtures.terminal).world,c=progressionContext(w),next=planProgression(c);
 assert.equal(w.position.date,'2029-06-29');assert.equal(next.status,'action');assert.deepEqual(next.request.operations,[{type:'settle-school-year'}]);
 const reserved=restoreSave(fixtures.reserved).world,before=JSON.stringify(reserved),view=progressionContext(reserved);assert.ok(view.reserved.length);view.reserved[0].date='2099-01-01';assert.equal(JSON.stringify(reserved),before);
 const adoption=nextProgression(reserved);assert.equal(adoption.request.operations[0].type,'register-event-catalogue');const retired=prepareWorldOperation(reserved,adoption.request).world;assert.ok(retired.extensions['teacher-hell/world'].history.find(h=>h.type==='aftercare-adoption').data.retiredReservationIds.length);assert.equal(progressionContext(retired).reserved.length,0);assert.deepEqual(retired.extensions['teacher-hell/world'].history.slice(0,reserved.extensions['teacher-hell/world'].history.length),reserved.extensions['teacher-hell/world'].history);
 const oldAfter=restoreSave(fixtures.after).world,adopted=prepareWorldOperation(oldAfter,nextProgression(oldAfter).request).world,p=adopted.extensions['teacher-hell/world'].plan,table=p.tables.at(-1);
 const early=slotOccupancy(adopted.position.date,3,'early',table,p.calendarVersion);assert.equal(aftercareCellIsEmpty(adopted,adopted.position.date,early,early),false);
 const late=slotOccupancy(adopted.position.date,3,'p8',table,p.calendarVersion);assert.equal(aftercareCellIsEmpty(adopted,adopted.position.date,late,late),true);
 assert.equal(next.request.expectedRevision,c.revision);assert.equal(next.settlement,true);
 assert.equal(planProgression({...c,stories:[{waiting:false,eventId:'necessary'}]}).status,'attention-required');
 assert.equal(planProgression({...c,reserved:[{eventId:'necessary'}]}).request.operations[0].type,'admit-event');
});
test('H5 saved summary does not fabricate ceremony, offers or future results at opening',()=>{
 const w=opening(),before=JSON.stringify(w),d=projectSeniorSummary(w);assert.equal(d.ceremony,null);assert.equal(d.knownOffers,0);assert.equal(d.weeks.length,0);assert.equal(renderSeniorSummary(d),'');assert.equal(JSON.stringify(w),before);
});
test('H5 saved narrative renderer escapes text and preserves unknown future results',()=>{
 const html=renderSeniorSummary({date:'2029-06-29',ceremony:{description:'<script>',representatives:[{interaction:'<img>'}]},weeks:[{startDate:'2029-06-23',endDate:'2029-06-29',summary:'<svg>'}],knownOffers:3,confirmed:2,pending:9});
 assert.match(html,/&lt;script&gt;/);assert.doesNotMatch(html,/<script>|<img>|<svg>/);assert.match(html,/七、八月尚未公布的結果維持未知/);
});

test('H5 narrow academic lifecycle reads and controller contexts cannot mutate their source',()=>{
 let w=opening();w=prepareWorldOperation(w,nextProgression(w).request).world;
 const before=JSON.stringify(w),c=progressionContext(w);c.plan.cursor++;c.position.date='2099-01-01';
 withAcademicProjection(w,()=>{const term=Object.values(academicState(w).terms)[0],status=academicTermStatus(w,term.termId);assert.equal(status.grade,term.grade);assert.equal(status.closed,term.closed);status.rows[0].id='changed';assert.notEqual(academicTermStatus(w,term.termId).rows[0].id,'changed');});
 assert.equal(JSON.stringify(w),before);
});
test('H5 ordered formal controller requests replay identically to individual transactions',()=>{
 const w=opening();let a=w;const receipts=[];for(let i=0;i<4;i++){const result=prepareWorldOperation(a,nextProgression(a).request);a=result.world;receipts.push(result.receipt);}
 let n=0;const batch=prepareWorldSequence(w,c=>n++<4?planProgression(c).request:null);
 assert.deepEqual(batch.world,a);assert.deepEqual(batch.receipts,receipts);
});

test('H5 notebook lists semesters chronologically and defaults to senior autumn, with formal academic-year labels',()=>{
 const w=fiveTerms(),base=projectNotebookAcademics(w),d=projectNotebookAcademics(w,base.students[0].id);
 assert.deepEqual(d.terms.map(t=>t.id),['2026:autumn','2027:spring','2027:autumn','2028:spring','2028:autumn']);assert.equal(d.selectedTerm,'2028:autumn');assert.equal(d.terms[1].label,'2026學年度下學期');assert.equal(d.terms.at(-1).label,'2028學年度上學期');
});

test('H5 frozen senior summer mock is a legal first-slot transition and future timetable boundary',()=>{
 let w=eventWorld(74,null,null,{version:1,mode:THREE_YEAR,difficulty:'hard'});for(const date of ['2027-02-19','2027-09-01','2028-02-21'])w=academicAt(w,date);w=academicAt(w,'2028-07-24','morning');w=academicAt(w,'2028-07-23',calendarDay('2028-07-23',2,w.extensions['teacher-hell/world'].plan.calendarVersion).slots.at(-1).id);const c=progressionContext(w),p=c.plan;
 assert.equal(isCampOpeningPosition(p,{date:'2028-07-24',slotId:'morning'}),true);assert.equal(isCampOpeningPosition(p,{date:'2028-07-24',slotId:'early'}),false);assert.equal(isCampOpeningPosition(p,{date:'2028-07-24',slotId:'afternoon'}),false);
 assert.equal(isCampOpeningPosition({...p,calendarVersion:CALENDAR_VERSION},{date:'2028-07-24',slotId:'early'}),true);
 assert.equal(p.tables.length,5);assert.throws(()=>academicAt(w,'2028-07-22'),/future semester|TIMETABLE/);
 const ready={...c,schoolEnabled:true,annualSettled:true,academicYear:2027,dayDrawn:true,slotComplete:true,catalogueIds:['entrance:guidance-v1']};assert.equal(planProgression(ready).request.operations[0].type,'transition-school-year');
});

test('H5 validation reference indexes release after success and failure without hiding live mutations',()=>{
 let w=opening();for(let i=0;i<4;i++)w=prepareWorldOperation(w,nextProgression(w).request).world;const r=w.extensions['teacher-hell/world'],f=r.facts[0],saved=JSON.stringify(w),id=f.id,causes=f.causeIds;
 assert.deepEqual(restoreWorldState(w),w);f.causeIds=[createId('fact',['missing-index-cause'])];assert.throws(()=>restoreWorldState(w),/Unknown fact/);f.causeIds=causes;
 f.id=createId('fact',['changed-live-id']);assert.throws(()=>findFact(w,id),/Unknown fact/);f.id=id;assert.equal(findFact(w,id),f);assert.equal(JSON.stringify(w),saved);assert.deepEqual(restoreWorldState(w),w);
});

test('H5 missing versioned admissions remain unknown, never fabricated zero confirmations',()=>{
 const html=renderSeniorSummary({date:'2029-06-29',ceremony:null,weeks:[],outcomes:[{id:'x',name:'學生',status:'incomplete'}],admissionsKnown:false,legacyAdmissionsCount:1,knownOffers:0,confirmed:0,pending:0});
 assert.match(html,/原保存政策的升學階段紀錄/);assert.match(html,/不推定新制錄取或確認/);assert.doesNotMatch(html,/確認錄取 0 人|仍有待辦 0 人/);
});

import {SENIOR_CALENDAR_VERSION,examSchedule} from '../src/calendar/calendar.js';
test('H5 current phase names follow formal mock/exam calendar without leaking results into free slots',()=>{
 for(const [date,name] of [['2028-07-24','學測'],['2029-03-01','分科']]){const d=calendarDay(date,3,SENIOR_CALENDAR_VERSION);assert.equal(scheduledPhase(d,'morning'),name+'模考・上午（不計入學期成績）');assert.equal(scheduledPhase(d,'afternoon'),name+'模考・下午（不計入學期成績）');assert.equal(scheduledPhase(d,'private'),null);}
 for(const exam of examSchedule('2029:spring',3,SENIOR_CALENDAR_VERSION)){const d=calendarDay(exam.dates[0],3,SENIOR_CALENDAR_VERSION);assert.equal(scheduledPhase(d,'p1'),exam.round===1?'第一次段考':'畢業考');assert.equal(scheduledPhase(d,'noon'),null);}
 assert.equal(scheduledPhase(calendarDay('2029-06-04',3,SENIOR_CALENDAR_VERSION),'p1'),null);
});

test('H5 June projection stays disabled for the original 30-year career',()=>{
 const w=eventWorld(74),before=JSON.stringify(w);assert.equal(w.extensions['teacher-hell/world'].plan.validation,'fixed-calendar-v1');assert.equal(projectSeniorSummary(w),null);assert.equal(JSON.stringify(w),before);
});

import {CAREER_30,careerRange} from '../src/calendar/calendar.js';
test('H5 original 30-year boundary uses its existing career entry only after annual settlement',()=>{
 const c=progressionContext(eventWorld(74)),end=careerRange(c.plan.startYear,CAREER_30).end,day=calendarDay(end,3,c.plan.calendarVersion);
 // Pure planner context only; no fabricated completed world or natural30 claim.
 const at={...c,position:positionFor(end,day.slots.at(-1).id,c.plan.startYear,CAREER_30,c.plan.calendarVersion),slotComplete:true,schoolEnabled:true,annualSettled:false};
 assert.equal(at.position.serviceYear,30);assert.deepEqual(planProgression(at).request.operations,[{type:'settle-school-year'}]);
 const next=planProgression({...at,annualSettled:true});assert.deepEqual(next.request.operations,[{type:'settle-career'}]);assert.equal(next.settlement,true);
 assert.equal(planProgression({...at,annualSettled:true,pendingReview:'pending'}).status,'review-required');assert.equal(planProgression({...at,completed:true}).status,'completed');
});
