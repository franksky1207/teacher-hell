import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {gunzipSync} from 'node:zlib';
import {semesterScore,curriculum,graduation,rulesFor,standard} from '../src/academics/rules.js';
import {emptyAcademics,openTerm,assess,closeTerm} from '../src/academics/learning.js';
import {SENIOR_ASSESSMENT_POLICY as POLICY} from '../src/academics/policy.js';
import {createRandom} from '../src/numeric/random.js';
import {applyAcademic,academicState,academicVersion,readAcademicQualification,readSeniorAcademicReview,readGrades,academicTermClosed,academicSupport} from '../src/runtime/academics.js';
import {runtimeOf,restoreWorldState,WorldError} from '../src/runtime/model.js';
import {prepareWorldOperation} from '../src/runtime/transactions.js';
import {assessmentCalendar,CALENDAR_VERSION,SENIOR_CALENDAR_VERSION,calendarDay} from '../src/calendar/calendar.js';
import {calendarMilestones} from '../src/runtime/schedule.js';
import {createSave,encodeSave,restoreSave,sameToken,saveToken} from '../src/storage/format.js';
import {createStoredSession} from '../src/storage/session.js';
import {projectNotebookAcademics,renderNotebookAcademics,isExamScorePublished} from '../web/notebook-academics.js';
import {fiveTerms,seniorMarks,academicApply as apply,academicAt as at,throughMay} from './support/senior-academic.js';
import {compileCohortCompletion} from '../src/runtime/cohort.js';
import {request} from './support/runtime.js';
const legacy=()=>JSON.parse(gunzipSync(readFileSync(new URL('./fixtures/h2-pre-061bf63.json.gz',import.meta.url))));
let savedMarks,savedClose,savedMay,savedMayEve,reviewFailure;
const marks=()=>structuredClone(savedMarks??=seniorMarks());
const closed=()=>structuredClone(savedClose??=apply(marks(),[{type:'campus',activity:'rest'},{type:'finish-slot',completedActivityIds:[]}],'close-May'));
const mayEve=()=>{if(reviewFailure)throw reviewFailure;try{return structuredClone(savedMayEve??=throughMay(closed(),{stopBeforeReview:true}));}catch(error){reviewFailure=error;throw error;}};
const reviewed=()=>structuredClone(savedMay??=apply(mayEve(),[{type:'school-action',activity:'rest'}],'review-May'));
const final=w=>academicState(w).terms['2029:spring'];
const pupil=w=>w.numeric.evolution.world.classroom.studentIds[0];

test('H2-A: exact 40/30/30, decimal half-up, bounded marks and no third-score placeholder',()=>{
 assert.equal(semesterScore(80,[60,90],2,POLICY),77);assert.equal(semesterScore(49.5,[49.5,49.5],2,POLICY),50);
 for(let n=0;n<=1000;n++)assert.equal(semesterScore(n/10,[n/10,n/10],2,POLICY),Math.round(n/10));
 assert.throws(()=>semesterScore(80,[60,90,0],2,POLICY),/marks/);assert.throws(()=>semesterScore(80,[60],2,POLICY),/marks/);assert.throws(()=>semesterScore(80,[60,101],2,POLICY),/marks/);assert.throws(()=>semesterScore(80,[60,90],2,'unknown'),/policy/);
 for(const version of [1,2])for(const ordinary of [0,49.5,60,100])assert.equal(semesterScore(ordinary,[34,60,90],version),Math.round(ordinary*.4+(34+60+90)*.2));
});

test('H2-A: original five terms keep exact policies; senior school marks and individual credits use one contract',()=>{
 const old=academicState(fiveTerms());assert.equal(Object.values(old.terms).length,5);assert.ok(Object.values(old.terms).every(t=>!t.assessmentPolicy&&t.assessments.length===4));
 const w=closed(),state=academicState(w),t=state.terms['2029:spring'];assert.equal(t.assessmentPolicy,POLICY);assert.deepEqual(t.assessments.map(a=>a.round),[1,2,0]);assert.equal(t.closedAt,'2029-05-08');
 for(const row of t.results.filter(r=>r.courses))for(const course of row.courses){const a=round=>t.assessments.find(a=>a.round===round).marks.find(m=>m.id===row.id).marks[course.subject];assert.equal(course.originalMark,semesterScore(a(0),[a(1),a(2)],2,POLICY));assert.equal(course.earned,course.originalMark>=standard(rulesFor(t.year),state.students[row.id].status,3).pass?course.credits:0);assert.equal(course.completed,false);}
 assert.deepEqual(state.terms['2028:autumn'].assessments,old.terms['2028:autumn'].assessments);assert.deepEqual(state.terms['2028:autumn'].results.map(r=>r.courses?.map(c=>c.originalMark)),old.terms['2028:autumn'].results.map(r=>r.courses?.map(c=>c.originalMark)));assert.equal(readGrades(w,pupil(w),'2029:spring').assessments.length,3);
 assert.throws(()=>apply(at(w,'2029-05-09','early'),[{type:'academic',action:'assess',round:3}]),/round unavailable/);
});

test('H2-A: learner standards, attendance zero, integer credits and 30-year grade-three policy stay intact',()=>{
 const s=emptyAcademics(),rng=createRandom(42),termId='2029:spring',meta=assessmentCalendar(termId,3,SENIOR_CALENDAR_VERSION);
 openTerm(s,{termId,year:2028,grade:3,roster:[{id:'e',personId:'p',classId:'home'}],classes:[{id:'home',size:1}],offered:null,assessmentPolicy:POLICY,assessmentWindow:meta},rng);
 s.students.p.status={kind:'individual-plan',pass:50,makeup:30};const c=s.terms[termId].rows[0].courses[0];s.students.p.subjects[c.subject].absence={totalPeriods:c.credits*18,unexcused:c.credits*6,personal:0,exemptPersonal:0};
 for(const round of [1,2,0])assess(s,{termId,round,activeIds:['p']},rng);closeTerm(s,{termId,date:'2029-05-08',activeIds:['p']});const blocked=s.terms[termId].results[0].courses[0];assert.equal(blocked.mark,0);assert.equal(blocked.earned,0);assert.equal(blocked.thresholds.pass,50);assert.equal(blocked.makeupEligible,false);
 assert.equal(assessmentCalendar(termId,3,CALENDAR_VERSION).closurePolicy,'standard');assert.equal(assessmentCalendar(termId,3,CALENDAR_VERSION).exams.length,3);
});

test('H2-B: May computation is unique, unpublished and provisional; future instruction is never granted',()=>{
 const w=closed(),id=pupil(w),before=JSON.stringify(w);assert.equal(final(w).publishedAt,undefined);assert.ok(!readAcademicQualification(w,id).eligible);assert.ok(!readAcademicQualification(w,id).complete);
 assert.equal(readAcademicQualification(w,id).offered,152);assert.equal(calendarMilestones(w).annualSettlementReady,false);
 assert.throws(()=>apply(w,[{type:'academic',action:'release'}]),{code:'TIME_BARRIER'});const later=at(w,'2029-05-09','private');assert.throws(()=>apply(later,[{type:'academic',action:'complete-study'}]),/uncompleted/);assert.throws(()=>apply(later,[{type:'academic',action:'review'}]),/day end|study/);assert.throws(()=>apply(later,[{type:'academic',action:'close'}]),/assessments/);assert.equal(JSON.stringify(w),before);
 assert.equal(runtimeOf(w).history.filter(h=>['semester-review','annual-success','cohort-completion','career-completion'].includes(h.type)&&h.at.date.startsWith('2029-05')).length,0);
});

test('H2-B notebook: no unpublished-score or aggregate leak, one graduation column, no ghost third exam',()=>{
 const w=closed(),id=pupil(w),hidden=projectNotebookAcademics(w,id,'2029:spring');assert.equal(hidden.pendingPublication,true);assert.equal(hidden.qualification,null);assert.deepEqual(hidden.transcript.courses,[]);assert.equal(hidden.transcript.assessments.find(a=>a.round===0).marks,null);assert.equal(hidden.transcript.assessments.find(a=>a.round===2).marks,null);
 const older=projectNotebookAcademics(w,id,'2028:autumn');assert.equal(older.qualification,null,'viewing older term must not expose unpublished current aggregate');
 const html=renderNotebookAcademics(hidden);assert.match(html,/畢業考/);assert.doesNotMatch(html,/三段|二段/);assert.equal(isExamScorePublished('2029:spring',3,2,'2029-05-08',SENIOR_CALENDAR_VERSION),false);assert.equal(isExamScorePublished('2029:spring',3,2,'2029-05-09',SENIOR_CALENDAR_VERSION),true);
 let published=at(w,'2029-05-09','early');published=apply(published,[{type:'school-action',activity:'routine'}]);const p=projectNotebookAcademics(published,id,'2029:spring');assert.equal(p.pendingPublication,false);assert.ok(p.transcript.courses.length);assert.ok(p.transcript.courses.every(c=>c.earned===null&&c.creditPending));assert.equal(final(published).publishedAt,'2029-05-09');assert.match(renderNotebookAcademics(p),/待修習完成/);
});

test('H2-B: real May slots publish, remedy, accumulate actual hours and review before ceremony',()=>{
 const w=reviewed(),t=final(w),r=runtimeOf(w),review=readSeniorAcademicReview(w,'2029:spring');assert.equal(w.position.date,'2029-06-01');assert.equal(t.studyCompletedAt,'2029-05-31');assert.equal(review.date,'2029-05-31');assert.equal(review.outcomes.length,w.numeric.evolution.world.classroom.studentIds.length);assert.ok(t.studyEvidence.slotCount>100);
 const support=r.history.filter(h=>h.type==='academic'&&h.data.input.action==='support'&&h.at.date>='2029-05-08');assert.ok(support.length>1);assert.ok(support.flatMap(h=>h.data.result.makeups).length>0);
 for(const h of support){if(!h.data.input.studyAllowed){assert.deepEqual(h.data.result.study,[]);assert.ok(!h.data.result.makeups.some(m=>m.termId==='2029:spring'));}const perStudent=new Map();for(const row of h.data.result.study)perStudent.set(row.personId,(perStudent.get(row.personId)??0)+row.periods);assert.ok([...perStudent.values()].every(n=>n<=2));for(const m of h.data.result.makeups.filter(m=>m.termId==='2029:spring'))assert.ok(h.at.date>='2029-05-10'&&h.at.date<='2029-05-31');}
 assert.equal(r.history.filter(h=>h.type==='academic'&&h.data.input.action==='review').length,1);assert.equal(r.history.filter(h=>h.type==='career-completion').length,0);assert.deepEqual(restoreSave(encodeSave(createSave(w))).world,w);
});

test('H2-B: graduation and pending results derive from six real term records, not an assigned graduation rate',()=>{
 const w=reviewed(),s=academicState(w),review=readSeniorAcademicReview(w,'2029:spring');for(const out of review.outcomes){const records=Object.values(s.terms).flatMap(t=>(t.results.find(r=>r.id===out.personId)?.courses??[]).map(c=>({...c,level:t.grade,half:t.termId.endsWith('spring')?'spring':'autumn'})));const expected=graduation(records,rulesFor(2026),{studyPeriodComplete:true,netMajorDemerits:0});assert.equal(out.qualification.eligible,expected.eligible);assert.equal(out.qualification.earned,expected.earned);assert.equal(out.qualification.requiredEarned,expected.requiredEarned);assert.equal(out.qualification.electiveEarned,expected.electiveEarned);assert.equal(out.qualification.complete,expected.complete);assert.deepEqual(readAcademicQualification(w,out.personId,s),out.qualification);for(const plan of out.pendingRemedies)assert.ok(plan.studiedPeriods<plan.requiredPeriods||plan.kind==='makeup');}
 const all=[1,2,3].flatMap(level=>['autumn','spring'].flatMap(half=>curriculum(level,'undecided',null,null,2,half).map(c=>({...c,level,half,earned:c.credits}))));assert.equal(graduation(all,rulesFor(2026)).eligible,true);assert.equal(graduation(all.map(c=>({...c,earned:0})),rulesFor(2026)).eligible,false);assert.equal(graduation(all,rulesFor(2026),{netMajorDemerits:3}).eligible,false);
});

test('H2-C: June teacher boundary consumes frozen May results; no second scoring, credits or review',()=>{
 let w=reviewed(),before=academicState(w),id=pupil(w);assert.equal(academicTermClosed(w,final(w)),true);const windowData=assessmentCalendar('2029:spring',3,SENIOR_CALENDAR_VERSION);assert.equal(windowData.teacherTermEnd,'2029-06-29');
 w=at(w,'2029-06-29','private');w=apply(w,[{type:'aftercare-week'}]);assert.deepEqual(academicState(w),before);assert.equal(readAcademicQualification(w,id).eligible,readSeniorAcademicReview(w,'2029:spring').outcomes[0].qualification.eligible);
 assert.throws(()=>apply(w,[{type:'academic',action:'review'}]),{code:'TIME_BARRIER'});assert.throws(()=>apply(w,[{type:'academic',action:'close'}]),{code:'TIME_BARRIER'});const another=at(reviewed(),'2029-06-28','private');assert.throws(()=>apply(another,[{type:'academic',action:'review'}]),/open senior academic lifecycle/);assert.throws(()=>apply(another,[{type:'academic',action:'close'}]),/exact term policy assessments/);assert.equal(runtimeOf(w).history.filter(h=>h.type==='academic'&&h.at.date.startsWith('2029-06')).length,0);
 const cohort=compileCohortCompletion(w,'h2-domain-probe',{terminal:true});assert.deepEqual(cohort.archive.data.outcomes,readSeniorAcademicReview(w,'2029:spring').outcomes.map(o=>({personId:o.personId,qualification:o.qualification})));assert.deepEqual(academicState(w),before);
 const incomplete=closed();assert.equal(academicTermClosed(incomplete,final(incomplete)),false,'May marks alone cannot satisfy T4');
});

test('H2-D: actual pre-H2 v2 save replays exactly, old three-exam transcript and original calendar stay frozen',()=>{
 const p=legacy().v2,loaded=restoreSave(p);assert.deepEqual(loaded,p);assert.equal(encodeSave(loaded),encodeSave(p));assert.equal(academicVersion(loaded.world),2);const t=academicState(loaded.world).terms['2026:autumn'];assert.equal(t.assessments.length,4);assert.equal(t.assessmentPolicy,undefined);assert.equal(runtimeOf(loaded.world).plan.calendarVersion,CALENDAR_VERSION);
});

test('H2-D: H1 unversioned senior log adopts by an appended operation, preserving every old mark and row',()=>{
 const p=legacy().h1,w=restoreSave(p).world,before=runtimeOf(w).history,marks=final(w).assessments;assert.equal(final(w).assessmentPolicy,undefined);
 const adopted=apply(w,[{type:'academic',action:'adopt-senior-policy'}]);assert.deepEqual(runtimeOf(adopted).history.slice(0,before.length),before);assert.deepEqual(final(adopted).assessments,marks);assert.equal(final(adopted).assessmentPolicy,POLICY);assert.deepEqual(restoreSave(encodeSave(createSave(adopted))).world,adopted);
 assert.throws(()=>apply(adopted,[{type:'academic',action:'adopt-senior-policy'}]),/unversioned/);assert.throws(()=>apply(adopted,[{type:'academic',action:'assess',round:3}]),/round unavailable/);assert.throws(()=>apply(legacy().v2.world,[{type:'academic',action:'adopt-senior-policy'}]),/unversioned/);
 const late=apply(at(legacy().h1.world,'2029-05-15','private'),[{type:'academic',action:'adopt-senior-policy'}]);assert.deepEqual(final(late).assessments,marks);assert.throws(()=>apply(late,[{type:'academic',action:'assess',round:0}]),/actual final day/);assert.throws(()=>apply(late,[{type:'academic',action:'close'}]),/exact term policy assessments/);assert.equal(final(late).assessments.some(a=>a.round===0||a.round===3),false);
});

test('H2-D: imports reject changed term policy, calendar, final marks, sources, future completion and review outcomes',()=>{
 for(const mutate of [w=>{runtimeOf(w).history.find(h=>h.type==='academic'&&h.data.input.assessmentPolicy).data.input.assessmentPolicy='unknown';},w=>{runtimeOf(w).history.find(h=>h.type==='academic'&&h.data.input.action==='close'&&h.data.input.termId==='2029:spring').data.result[0].courses[0].mark++;},w=>{runtimeOf(w).history.find(h=>h.type==='academic'&&h.data.input.action==='complete-study').data.input.studyEvidence.historyOrders.pop();},w=>{runtimeOf(w).history.find(h=>h.type==='academic'&&h.data.input.action==='review').data.result.outcomes[0].qualification.earned++;}]){const bad=reviewed();mutate(bad);assert.throws(()=>restoreWorldState(bad));}
 const missing=at(closed(),'2029-05-31','private');assert.throws(()=>apply(missing,[{type:'academic',action:'complete-study'}]),/uncompleted/);
});

function memory(){let record={payload:null,token:null},generation=0,fail=false;return {fail(){fail=true;},async read(){return structuredClone(record);},async write(slot,payload,expected){if(!sameToken(record.token,expected))throw new WorldError('STALE','changed');if(fail){fail=false;throw Error('quota');}record={payload:restoreSave(payload),token:saveToken({payload,generation:++generation})};return structuredClone(record);}};}
test('H2-D CAS: May close rolls back failed writes, commits once, exports/reloads and rejects stale peers',async()=>{
 const w=marks(),db=memory(),s=await createStoredSession(db,1);await s.import(createSave(w),{expectedToken:null});const peer=await createStoredSession(db,1),q={...request(w,'H2-May-close',[{type:'campus',activity:'rest'},{type:'finish-slot',completedActivityIds:[]}]),calendarContext:{kind:'routine'}},before=s.snapshot();db.fail();await assert.rejects(s.execute(q),/quota/);assert.deepEqual(s.snapshot(),before);await s.execute(q);assert.equal((await s.execute(q)).duplicate,true);await assert.rejects(peer.execute({...q,id:q.id+'-other'}),/STALE/);const saved=s.snapshot(),reloaded=await createStoredSession(db,1);assert.deepEqual(reloaded.snapshot(),saved);assert.deepEqual(restoreSave(await s.export()),saved.payload);assert.equal(final(saved.payload.world).closed,true);assert.equal(runtimeOf(saved.payload.world).history.filter(h=>h.type==='academic'&&h.data.input.action==='close'&&h.data.input.termId==='2029:spring').length,1);
});

 test('H2-D CAS: completion evidence and May qualification review publish atomically and deduplicate',async()=>{
 const w=mayEve(),db=memory(),s=await createStoredSession(db,1);await s.import(createSave(w),{expectedToken:null});const peer=await createStoredSession(db,1),q={...request(w,'H2-May-review',[{type:'school-action',activity:'rest'}]),calendarContext:{kind:'routine'}},before=s.snapshot();db.fail();await assert.rejects(s.execute(q),/quota/);assert.deepEqual(s.snapshot(),before);assert.equal(final(s.snapshot().payload.world).review,undefined);await s.execute(q);assert.equal((await s.execute(q)).duplicate,true);await assert.rejects(peer.execute({...q,id:q.id+'-other'}),/STALE/);const out=s.snapshot().payload.world;assert.equal(readSeniorAcademicReview(out,'2029:spring').outcomes.length,40);assert.equal(runtimeOf(out).history.filter(h=>h.type==='academic'&&h.data.input.action==='complete-study').length,1);assert.equal(runtimeOf(out).history.filter(h=>h.type==='academic'&&h.data.input.action==='review').length,1);assert.deepEqual(restoreSave(await s.export()).world,out);
 });

test('H2-B domain unit: late verified attendance zero preserves assessments and cannot award unfinished credits',()=>{
 const s=emptyAcademics(),rng=createRandom(42),termId='2029:spring',assessmentWindow=assessmentCalendar(termId,3,SENIOR_CALENDAR_VERSION);
 openTerm(s,{termId,year:2028,grade:3,roster:[{id:'e',personId:'p',classId:'home'}],classes:[{id:'home',size:1}],offered:null,assessmentPolicy:POLICY,assessmentWindow},rng);for(const round of [1,2,0])assess(s,{termId,round,activeIds:['p']},rng);closeTerm(s,{termId,date:'2029-05-08',activeIds:['p']});applyAcademic(s,{action:'release',termId,date:'2029-05-09'},rng);
 const t=s.terms[termId],course=t.results[0].courses[0],original=course.originalMark,assessments=structuredClone(t.assessments);applyAcademic(s,{action:'attendance',termId,personId:'p',subject:course.subject,date:'2029-05-30',attendance:{totalPeriods:course.credits*18,unexcused:course.credits*6,personal:0,exemptPersonal:0}},rng);
 // Keep a separate domain input representing a previously recognized retake under a verified individual standard.
 const retakeCase=structuredClone(s),retakeCourse=retakeCase.terms[termId].results[0].courses[0];retakeCase.students.p.status={kind:'individual-plan',pass:50,makeup:30};retakeCourse.retake={mark:55,registered:50};retakeCourse.earned=retakeCourse.credits;retakeCourse.method='retake';
 // Domain-only evidence stub. Production acceptance separately requires every real slot order.
 const result=applyAcademic(s,{action:'complete-study',termId,date:'2029-05-31',activeIds:['p'],studyEvidence:{slotCount:1}},rng);assert.equal(course.mark,0);assert.equal(course.earned,0);assert.equal(course.assessedMark,original);assert.equal(course.makeupEligible,false);assert.equal(course.completed,true);assert.equal(result.attendanceAdjustments.length,1);assert.deepEqual(t.assessments,assessments);applyAcademic(retakeCase,{action:'complete-study',termId,date:'2029-05-31',activeIds:['p'],studyEvidence:{slotCount:1}},rng);assert.equal(retakeCourse.mark,0);assert.equal(retakeCourse.earned,retakeCourse.credits,'a legitimate earlier individual-standard retake is not revoked by an obsolete semester pass threshold');
});
