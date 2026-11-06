import {readFileSync} from 'node:fs';
import {gunzipSync} from 'node:zlib';
import {createSave,restoreSave,encodeSave,saveToken,sameToken} from '../src/storage/format.js';
import {createStoredSession} from '../src/storage/session.js';
import {readStory} from '../src/runtime/story.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {eventWorld} from './support/event-fixtures.js';
import {request,event,id} from './support/runtime.js';
import {academicAt,academicApply,seniorMarks,throughMay,fiveTerms} from './support/senior-academic.js';
import {prepareWorldOperation,prepareWorldSequence} from '../src/runtime/transactions.js';
import {runtimeOf,restoreWorldState} from '../src/runtime/model.js';
import {formalSlot} from '../src/runtime/schedule.js';
import {aftercareActive} from '../src/runtime/aftercare-calendar.js';
import {readAftercare,nextAftercareOperation,adoptionData} from '../src/runtime/aftercare.js';
import {graduationSummary} from '../src/runtime/graduation.js';
import {readSeniorAcademicReview,academicState,readAdmissions} from '../src/runtime/academics.js';
import {calendarDay,THREE_YEAR,SENIOR_CALENDAR_VERSION} from '../src/calendar/calendar.js';
import {buildEventCandidates,eventIndex} from '../src/runtime/event-candidates.js';
import {homeroomCatalogue,aftercareCatalogue} from '../src/runtime/story-content.js';
const r=runtimeOf;
function base(date='2029-06-02') {let w=academicAt(eventWorld(74,date,calendarDay(date,3,SENIOR_CALENDAR_VERSION).slots[0].id,{version:1,mode:THREE_YEAR,difficulty:'hard'}),date);return academicApply(w,[{type:'academic',action:'open'}]);}
/** Date-isolated registry/timetable fixture with genuine continuing lower-grade classes. */
function mixedBase(){let w=eventWorld(74,null,null,{version:1,mode:THREE_YEAR,difficulty:'hard'});for(const date of ['2027-02-19','2027-09-01','2028-02-21','2028-09-01','2029-06-02'])w=academicAt(w,date);return academicApply(w,[{type:'academic',action:'open'}]);}
function week(w){const q=nextAftercareOperation(w);assert.equal(q.status,'advance');return prepareWorldOperation(w,q.request).world;}

test('H4 preserves pre-ceremony lessons and uses the formal protected ceremony date',()=>{
 let w=base('2029-05-30');assert.equal(aftercareActive(w),false);assert.equal(formalSlot(w).day.kind,'school');assert.ok(calendarDay('2029-05-30',3,r(w).plan.calendarVersion).slots.some(s=>s.period));
 w=academicAt(w,'2029-06-01','morning');assert.equal(formalSlot(w).slot.protected,true);assert.equal(formalSlot(w).day.quota.max,0);
 const draw={type:'draw-events',definitions:[],bindings:[],engineering:true};w=prepareWorldOperation(w,request(w,'ceremony-empty-draw',[draw])).world;assert.equal(r(w).history.findLast(h=>h.type==='event-selection').data.selected.length,0);
 assert.equal(graduationSummary(w).count.unknown,40);assert.equal(graduationSummary(w).representatives.length,3);
 // Read-only archive projection probe: no fabricated T4 success or valid save claim.
 const archived=structuredClone(w),n=archived.numeric.evolution.world;n.classroom.studentIds=[];for(const e of n.registry.enrollments)if(e.classId===n.registry.homeClassId)e.until='2029-06-29';assert.deepEqual(graduationSummary(archived).students,graduationSummary(w).students);
});
test('H4 late adoption is additive and removes all original classroom uses',()=>{
 const w=base(),a=readAftercare(w);assert.equal(a.adoption.mode,'late-adoption');assert.equal(a.adoption.ceremonyFactId,null);assert.equal(w.numeric.evolution.world.classroom.studentIds.length,40);
 const day=formalSlot(w).day;assert.equal(day.kind,'aftercare');assert.ok(day.slots.every(s=>!s.period&&!s.activityIds.length));assert.equal(formalSlot(w).slot.lesson,null);assert.equal(day.segment.quota,1);
 assert.throws(()=>academicApply(w,[{type:'school-action',activity:'rest'}]),/weekly aftercare/);
 const original=homeroomCatalogue().definitions.find(d=>d.eligibility.homeroom==='ordinary');assert.equal(buildEventCandidates(w,[original]).candidates.length,0);
});
test('H4 one weekly operation traverses original slots and emits one summary, with replay and retry',()=>{
 const w=mixedBase(),q=nextAftercareOperation(w).request,next=prepareWorldOperation(w,q).world;
 assert.equal(next.position.date,'2029-06-09');assert.equal(readAftercare(next).weeks.length,1);assert.equal(readAftercare(next).weeks[0].startDate,'2029-06-02');assert.equal(readAftercare(next).weeks[0].endDate,'2029-06-08');
 assert.equal(r(next).history.filter(h=>h.type==='event-selection').length,7);const campus=r(next).history.filter(h=>h.type==='campus'),table=r(next).plan.tables.at(-1),registry=next.numeric.evolution.world.registry,continues=table.lessons.filter(l=>registry.academicYear-registry.classes[l.classId].cohortStart+1<3);assert.ok(continues.length>0);assert.deepEqual(r(next).plan.tables,r(w).plan.tables);assert.equal(next.numeric.evolution.world.classroom.studentIds.length,40);assert.equal(campus.filter(h=>!h.data.slot.teachingAutomatic).length,7);assert.equal(campus.filter(h=>h.data.slot.teachingAutomatic).length,continues.length);assert.ok(campus.every(h=>!h.data.slot.lesson||registry.academicYear-registry.classes[h.data.slot.lesson.classId].cohortStart+1<3));
 assert.deepEqual(restoreWorldState(JSON.stringify(next)),next);assert.equal(prepareWorldOperation(next,q).duplicate,true);
 let supplied=false;const sequenced=prepareWorldSequence(w,()=>{if(supplied)return null;supplied=true;return q;});assert.deepEqual(sequenced.world,next);assert.deepEqual(sequenced.receipts[0],r(next).commits.at(-1));
 const bad=structuredClone(next);r(bad).history.find(h=>h.type==='aftercare-week-summary').data.endDate='2029-06-09';assert.throws(()=>restoreWorldState(bad),/summary|interval/);
});
test('H4 final partial week stops at June boundary without settling or entering July',()=>{
 let w=base('2029-06-27');const before=academicState(w).terms['2029:spring'];w=week(w);assert.equal(w.position.date,'2029-06-29');assert.equal(w.position.slotId,'private');assert.equal(readAftercare(w).weeks.length,1);assert.equal(nextAftercareOperation(w).status,'boundary');
 assert.deepEqual(academicState(w).terms['2029:spring'],before);assert.ok(!r(w).history.some(h=>['annual-success','career-completion','cohort-completion'].includes(h.type)));
 assert.throws(()=>week(w));assert.equal(w.numeric.evolution.world.classroom.studentIds.length,40);
});
test('H4 June due admissions nodes are processed and July/August remain pending',()=>{
 let w=base();while(nextAftercareOperation(w).status==='advance')w=week(w);
 const e=readAdmissions(w),nodes=e.completed.map(n=>n.kind);for(const kind of ['stars8-result','application-allocation','application-confirm','subject-register'])assert.ok(nodes.includes(kind),kind);
 for(const p of Object.values(e.students)){assert.equal(p.subject?.officialScore??null,null);assert.equal(p.subject?.distribution??null,null);}
 assert.ok(!r(w).history.some(h=>h.type==='academic'&&h.data.input.action==='assess'));
});
test('H4 other grades and original 30 year core never adopt aftercare',()=>{
 const old=eventWorld(),first=academicAt(eventWorld(74,null,null,{version:1,mode:THREE_YEAR,difficulty:'hard'}),'2027-06-07');
 assert.equal(readAftercare(old).next.status,'idle');assert.equal(readAftercare(first).next.status,'idle');assert.equal(formalSlot(first).day.kind,'school');
});
test('H4 real May review feeds graduation without recalculating qualifications or admissions',()=>{
 let w=throughMay(seniorMarks());const before=readSeniorAcademicReview(w,'2029:spring'),term=academicState(w).terms['2029:spring'];
 assert.equal(w.position.date,'2029-06-01');const summary=graduationSummary(w);assert.deepEqual(summary.students.map(p=>p.qualification),w.numeric.evolution.world.classroom.studentIds.map(id=>before.outcomes.find(o=>o.personId===id).qualification));
 assert.equal(summary.count.unknown,0);assert.ok(summary.count.incomplete>0);
 for(const activity of ['automatic','automatic','rest'])w=academicApply(w,[{type:'school-action',activity}]);
 assert.equal(aftercareActive(w),true);const facts=r(w).facts.filter(f=>f.data.graduationSummary);assert.equal(facts.length,1);assert.deepEqual(facts[0].data.graduationSummary,summary);
 w=week(w);assert.deepEqual(readSeniorAcademicReview(w,'2029:spring'),before);assert.deepEqual(academicState(w).terms['2029:spring'],term);
 assert.deepEqual(restoreWorldState(JSON.stringify(w)),w);
});

function formal(w,operations,tag='h4-formal'){return prepareWorldOperation(w,request(w,tag+'-'+r(w).revision,operations)).world;}
function finishStory(w,eventId){for(let i=0;i<20;i++){const v=readStory(w,eventId);if(v.ended)return w;const action=v.canNext?'next':v.confirmation?'confirm':v.choices.length?'select':v.canFinish?'finish':v.canResume?'resume':null;assert.ok(action);w=formal(w,[{type:'story',eventId,action,optionId:action==='select'?v.choices[0].id:null}]);}throw Error('story did not terminate');}
test('H4 formal weekly contact interrupts and resumes without repeating event or week summary',()=>{
 let w=base();w=academicApply(w,[aftercareCatalogue()]);const before=nextAftercareOperation(w).request;w=prepareWorldOperation(w,before).world;
 assert.equal(nextAftercareOperation(w).status,'attention-required');assert.equal(readAftercare(w).weeks.length,0);assert.ok(readAftercare(w).activeWeek);
 assert.equal(prepareWorldOperation(w,before).duplicate,true);
 const selected=r(w).history.filter(h=>h.type==='event-selection').flatMap(h=>h.data.selected);assert.equal(selected.length,1);assert.equal(selected[0].definitionId,'aftercare:contact');
 w=formal(w,[{type:'admit-event',eventId:selected[0].eventId}]);w=restoreSave(encodeSave(createSave(w))).world;w=finishStory(w,selected[0].eventId);w=week(w);
 assert.equal(readAftercare(w).weeks.length,1);assert.equal(w.position.date,'2029-06-09');
 assert.equal(r(w).history.filter(h=>h.type==='event-selection').flatMap(h=>h.data.selected).length,1);assert.equal(readAftercare(w).activeWeek,null);
});
test('H4 an unresolved major decision stops weekly time at its exact cursor',()=>{
 let w=base();const e={...event(w,'h4-major',{nodeId:'major',options:[{id:'a',emotional:true},{id:'b',emotional:false},{id:'c',emotional:false}],confirmedOptionId:null}),definitionId:'procedure:h4-major'};
 w=prepareWorldOperation(w,{...request(w,'h4-major-open',[{type:'open-event',event:e}]),calendarContext:{kind:'procedure'}}).world;
 const cursor=r(w).plan.cursor,q=request(w,'h4-interrupted',[{type:'aftercare-week'}]);q.calendarContext={kind:'routine'};
 const stopped=prepareWorldOperation(w,q).world;assert.equal(r(stopped).plan.cursor,cursor);assert.equal(readAftercare(stopped).weeks.length,0);assert.equal(nextAftercareOperation(stopped).status,'attention-required');
 w=formal(stopped,[{type:'confirm-choice',eventId:e.id,stageId:e.stageId,optionId:'b',optionText:'保留既有案件並繼續處理'}]);w=week(w);assert.equal(readAftercare(w).weeks.length,1);assert.equal(r(w).history.filter(h=>h.type==='aftercare-week-start').length,1);
});
function memory(){const slots=new Map();let fail=false;return {fail(){fail=true;},async read(n){return structuredClone(slots.get(n)??{payload:null,token:null});},async write(n,payload,expected){const old=await this.read(n);if(!sameToken(old.token,expected))throw Object.assign(Error('stale'),{code:'STALE'});if(fail){fail=false;throw Error('quota');}const saved={payload:structuredClone(payload),token:saveToken({payload,generation:(old.token?.generation??0)+1})};slots.set(n,saved);return structuredClone(saved);}};}
test('H4 weekly CAS failure rolls back; retry, stale peer, export/import and resume preserve receipts',async()=>{
 const db=memory(),s=await createStoredSession(db,1);await s.import(createSave(base()),{expectedToken:null});const peer=await createStoredSession(db,1),before=s.snapshot(),q=nextAftercareOperation(before.payload.world).request;
 db.fail();await assert.rejects(s.execute(q),/quota/);assert.deepEqual(s.snapshot(),before);assert.deepEqual(await db.read(1),before);
 await s.execute(q);assert.equal((await s.execute(q)).duplicate,true);assert.equal((await peer.execute(q)).duplicate,true);
 const stale=await createStoredSession(db,1);const q2=nextAftercareOperation(s.snapshot().payload.world).request;await s.execute(q2);await assert.rejects(stale.execute({...q2,id:id('operation','h4-stale')}),{code:'STALE'});
 const exported=await s.export(),copy=await createStoredSession(db,2);await copy.import(exported,{expectedToken:null});assert.deepEqual(copy.snapshot().payload,s.snapshot().payload);
 await copy.execute(nextAftercareOperation(copy.snapshot().payload.world).request);assert.equal(readAftercare(copy.snapshot().payload.world).weeks.length,3);
});

test('H4 actual pre-H4 saves preserve old history and adopt explicitly from their current cursor',()=>{
 const old=JSON.parse(gunzipSync(readFileSync(new URL('./fixtures/h4-pre-5c21854.json.gz',import.meta.url))));
 assert.equal(old.source,'5c2185472b6831cce805d7d3368692dfdf7c7616');
 const terminal=restoreSave(old.terminal).world,unchanged=JSON.stringify(terminal);assert.equal(nextAftercareOperation(terminal).status,'boundary');assert.equal(JSON.stringify(terminal),unchanged);
 for(const key of ['before','after'])assert.deepEqual(restoreSave(JSON.stringify(old[key])),old[key]);
 let w=restoreSave(old.after).world;const prefix=structuredClone(r(w).history),cursor=r(w).plan.cursor;
 assert.equal(readAftercare(w).adoption,null);w=prepareWorldOperation(w,nextAftercareOperation(w).request).world;
 assert.deepEqual(r(w).history.slice(0,prefix.length),prefix);assert.equal(readAftercare(w).adoption.startCursor,cursor);assert.equal(readAftercare(w).adoption.mode,'late-adoption');assert.equal(r(w).facts.filter(f=>f.data.graduationSummary).length,0);
 assert.deepEqual(restoreSave(encodeSave(createSave(w))).world,w);
 w=academicAt(restoreSave(old.before).world,'2029-06-01','morning');assert.equal(readAftercare(w).adoption,null);assert.equal(graduationSummary(w).count.unknown,40);
});

test('H4 legacy unadmitted classroom reservations retire additively without replaying a class event',()=>{
 const old=JSON.parse(gunzipSync(readFileSync(new URL('./fixtures/h4-pre-5c21854.json.gz',import.meta.url))));let w=restoreSave(old.reserved).world;
 const history=structuredClone(r(w).history),selected=history.filter(h=>h.type==='event-selection').flatMap(h=>h.data.selected);assert.ok(selected.length>0);
 // A later event projection is not evidence of admission in the adoption prefix.
 const future=structuredClone(w);future.events.push({id:selected[0].eventId});assert.deepEqual(adoptionData(future).retiredReservationIds,adoptionData(w).retiredReservationIds);
 w=prepareWorldOperation(w,nextAftercareOperation(w).request).world;assert.deepEqual(r(w).history.slice(0,history.length),history);
 assert.deepEqual(readAftercare(w).adoption.retiredReservationIds,selected.map(s=>s.eventId));assert.equal(readAftercare(w).weeks.length,1);
 const bad=structuredClone(w);r(bad).history.find(h=>h.type==='aftercare-adoption').data.retiredReservationIds=[];assert.throws(()=>restoreWorldState(bad),/adoption differs/);
 for(const s of selected){assert.equal(eventIndex(w).records.find(e=>e.eventId===s.eventId).status,'ended');assert.ok(!w.events.some(e=>e.id===s.eventId));assert.throws(()=>formal(w,[{type:'admit-event',eventId:s.eventId}]),/retired/);}
 assert.deepEqual(restoreSave(encodeSave(createSave(w))).world,w);
});
test('H4 ceremony reads genuine published offers while June allocations and later results stay absent',async()=>{
 const {admissionCalendar}=await import('../src/calendar/admissions.js');let w=base('2028-10-16');
 for(const kind of ['special-register','gsat-register','special-result','special-confirm','gsat-exam','gsat-release','application-register','application-screen','application-review','application-result']){
  const node=admissionCalendar(2026,SENIOR_CALENDAR_VERSION).find(n=>n.kind===kind),day=calendarDay(node.date,3,SENIOR_CALENDAR_VERSION);w=academicAt(w,node.date,day.slots.at(-1).id);
  w=academicApply(w,[{type:'campus',activity:day.slots.at(-1).protected?'automatic':'rest'},{type:'finish-slot',completedActivityIds:day.slots.at(-1).activityIds}]);
 }
 w=academicAt(w,'2029-06-01','morning');const known=readAdmissions(w),summary=graduationSummary(w);
 assert.ok(Object.values(known.students).some(p=>p.offers.length>0));
 for(const p of summary.students){assert.deepEqual(p.confirmed,known.students[p.personId].confirmed??null);assert.deepEqual(p.publishedOffers,known.students[p.personId].offers.map(o=>({id:o.id,route:o.route,programmeLabel:o.programmeLabel,publishedStatus:o.publishedStatus,status:o.status,publishedAt:o.publishedAt})));}
 assert.ok(summary.admissionsNodes.every(n=>n.date<='2029-06-01'));assert.ok(!summary.admissionsNodes.some(n=>['stars8-result','application-allocation','application-confirm','subject-register'].includes(n.kind)));
 const before=academicState(w);w=academicApply(w,[{type:'school-action',activity:'automatic'}]);assert.deepEqual(academicState(w),before);
 assert.deepEqual(restoreSave(encodeSave(createSave(w))).world,w);
 for(const activity of ['automatic','rest'])w=academicApply(w,[{type:'school-action',activity}]);
 w=week(w);const q=nextAftercareOperation(w).request,normal=prepareWorldOperation(w,q).world;let supplied=false;
 const sequenced=prepareWorldSequence(w,()=>{if(supplied)return null;supplied=true;return q;});assert.deepEqual(sequenced.world,normal);
 const june=readAdmissions(normal);for(const [kind,date] of [['stars8-result','2029-06-04'],['application-allocation','2029-06-11'],['application-confirm','2029-06-13']])assert.equal(june.completed.find(n=>n.kind===kind).date,date);
 assert.ok(Object.values(june.students).every(p=>p.offers.filter(o=>o.status==='confirmed').length<=1));
 assert.deepEqual(readAftercare(normal).weeks.map(s=>s.endDate),['2029-06-08','2029-06-15']);
});
