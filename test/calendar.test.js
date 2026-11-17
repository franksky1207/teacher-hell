import test from 'node:test';
import assert from 'node:assert/strict';
import {CALENDAR,CALENDAR_VERSION,SENIOR_CALENDAR_VERSION,THREE_YEAR,calendarDay,yearData,semester,examSchedule,careerRange,newCareerStart,newThreeYearStart,gradeAt,positionFor,positionAt,cursorFor,nextPosition,slotOccupancy} from '../src/calendar/calendar.js';
import {addDays,weekday} from '../src/calendar/civil.js';
import {SUBJECT_LOAD,generateTimetable,validateTimetable} from '../src/calendar/timetable.js';
import {createRandom} from '../src/numeric/random.js';
import {catalogue} from './support/calendar.js';

test('calendar: only the fixed 2026–2029 cohort and six semesters exist',()=>{
 assert.deepEqual(CALENDAR.range,['2026-07-20','2029-06-29']);
 assert.deepEqual(CALENDAR.years.map(y=>y.year),[2026,2027,2028,2029]);
 assert.equal(CALENDAR_VERSION,SENIOR_CALENDAR_VERSION);
 assert.deepEqual(CALENDAR.years.flatMap(y=>y.terms).map(t=>t.id),['2026:autumn','2027:spring','2027:autumn','2028:spring','2028:autumn','2029:spring']);
 assert.deepEqual(CALENDAR.conflicts,[]);
 for(const date of ['2026-07-19','2029-06-30','2065-12-31'])assert.throws(()=>calendarDay(date,1));
 assert.throws(()=>careerRange(2026,'career-30'));
 assert.throws(()=>careerRange(2027,THREE_YEAR));
 assert.throws(()=>calendarDay('2028-09-01',3,'tw-school-2026-2065-senior-h1-v1'));
});
test('calendar: legal dates, protected activities and grade-specific exams',()=>{
 for(const date of ['2026-07-20','2026-12-04','2027-05-07','2027-12-03','2028-05-10','2028-07-27','2028-12-13','2029-01-19','2029-01-22','2029-05-09','2029-06-01','2029-06-29']){
  for(const grade of [1,2,3]){
   const d=calendarDay(date,grade),slots=d.slots.map(x=>x.id);
   assert.equal(d.date,date);assert.ok(slots.length>0&&slots.length<32);
   assert.equal(slots.length,new Set(slots).size);
   assert.ok(d.slots.every(s=>s.protected===Boolean(s.activityIds.length)));
   assert.equal(d.backgroundProceduresContinue,true);
  }
 }
 assert.deepEqual(examSchedule('2029:spring',3).map(x=>x.dates),[['2029-04-05','2029-04-06'],['2029-05-09','2029-05-10']]);
 assert.deepEqual(examSchedule('2029:spring',2)[1].dates,['2029-05-07','2029-05-08']);
 assert.equal(calendarDay('2029-01-19',3).kind,'holiday');
 assert.equal(calendarDay('2029-01-19',1).kind,'school');
 assert.equal(calendarDay('2029-01-22',3).kind,'long-vacation');
 assert.equal(calendarDay('2029-01-22',1).kind,'winter-camp');
 assert.equal(calendarDay('2029-06-02',3).kind,'long-vacation');
 assert.ok(calendarDay('2028-07-27',3).activities.some(a=>a.kind==='mock-gsat'));
 assert.ok(calendarDay('2029-01-20',3).activities.some(a=>a.kind==='formal-gsat'));
});
test('2029-01-19: senior GSAT study leave, review day, adjacent school days and national exam',()=>{
 const before=calendarDay('2029-01-18',3),leave=calendarDay('2029-01-19',3),junior=calendarDay('2029-01-19',1),middle=calendarDay('2029-01-19',2);
 assert.equal(before.kind,'school');
 assert.equal(before.finalReview,false);
 assert.ok(before.slots.some(slot=>slot.period!==null),'senior students still attend Jan 18');
 assert.equal(leave.kind,'holiday');
 assert.deepEqual(leave.holiday.map(h=>h.name),['高三學測考前放假']);
 assert.equal(leave.courseSemesterId,'2028:autumn');
 assert.equal(leave.finalReview,true);
 assert.equal(leave.annualBoundary,false);
 assert.equal(leave.quota.kind,'holiday');
 assert.deepEqual(leave.slots.map(slot=>slot.id),['morning','afternoon','evening']);
 assert.ok(leave.slots.every(slot=>slot.period===null));
 for(const other of [junior,middle]){
  assert.equal(other.kind,'school');
  assert.equal(other.holiday.length,0);
  assert.ok(other.slots.some(slot=>slot.period!==null));
 }
 const last=leave.slots.at(-1).id,pos=positionFor('2029-01-19',last,2026);
 assert.equal(pos.statisticsPeriodId,'2028:autumn');
 const next=nextPosition(pos,2026);
 assert.deepEqual([next.date,next.slotId],['2029-01-20','morning']);
 for(const date of ['2029-01-20','2029-01-21','2029-01-22']){
  const exam=calendarDay(date,3);
  assert.ok(exam.activities.some(a=>a.kind==='formal-gsat'));
  assert.ok(exam.slots.filter(s=>s.id!=='private').every(s=>s.protected));
  assert.equal(exam.quota.max,0,'GSAT day must not draw regular events');
 }
 assert.equal(calendarDay('2029-01-22',3).kind,'long-vacation','seniors do not attend winter camp');
 assert.equal(calendarDay('2029-01-22',1).kind,'winter-camp');
 assert.equal(calendarDay('2029-01-22',2).kind,'winter-camp');
});

test('calendar: daily slots and vacations do not create phantom school periods',()=>{
 const y=yearData(2026),school=calendarDay(y.autumnStart,1);
 assert.equal(school.quota.max,5);
 assert.ok(school.slots.some(s=>s.id==='private'));
 const tue=calendarDay(addDays(y.autumnStart,1),1);
 assert.equal(tue.slots.filter(s=>s.id.startsWith('study')).length,3);
 assert.equal(tue.quota.nightStudyMax,1);
 assert.equal(calendarDay('2028-09-16',3).kind,'grade3-saturday');
 assert.deepEqual(calendarDay('2028-09-16',3).slots.map(s=>s.id),['morning','afternoon','private']);
 assert.equal(calendarDay('2029-03-17',3).kind,'weekend');
 assert.equal(calendarDay('2029-03-17',3).quota.max,1);
 const vacation=calendarDay('2027-07-05',1);assert.equal(vacation.kind,'long-vacation');assert.equal(vacation.segment.quota,1);
 const festival=calendarDay('2029-02-12',1);assert.equal(festival.kind,'spring-festival');assert.equal(festival.segment.quota,1);
});
test('calendar: nine timetable subjects preserve legal 18-lesson distributions in the six semesters',()=>{
 let count=0;
 for(const subject of Object.keys(SUBJECT_LOAD)){
  for(const [i,id] of CALENDAR.years.flatMap(y=>y.terms).map(t=>t.id).entries()){
   const academicYear=2026+Math.floor(i/2),classes=catalogue(academicYear),homeClassId=classes[0].id;
   const result=generateTimetable({subject,academicYear,semesterId:id,classes,homeClassId,random:createRandom(37).snapshot()});
   validateTimetable(result.table);assert.equal(result.table.lessons.length,18);
   for(let day=1;day<=5;day++)assert.ok([3,4].includes(result.table.lessons.filter(l=>l.weekday===day).length));
   count++;
  }
 }
 assert.equal(count,Object.keys(SUBJECT_LOAD).length*6);
});
test('calendar: protected activities override lessons without modifying the timetable',()=>{
 const classes=catalogue(2026),table=generateTimetable({subject:'國文',semesterId:'2026:autumn',academicYear:2026,classes,homeClassId:classes[0].id,random:createRandom(71).snapshot()}).table;
 const before=JSON.stringify(table);
 for(const date of ['2026-10-05','2026-12-04']){
  for(const slot of calendarDay(date,1).slots.filter(s=>s.period)){
   if(calendarDay(date,1).exam||slot.protected)assert.equal(slotOccupancy(date,1,slot.id,table).lesson,null);
  }
 }
 assert.equal(JSON.stringify(table),before);
});
test('calendar: fixed three-year cursor roundtrip and post-completion boundary',()=>{
 const range=careerRange(2026,THREE_YEAR);
 assert.deepEqual(range,{start:'2026-07-20',end:'2029-06-29',startYear:2026});
 for(const date of ['2026-07-20','2027-06-25','2027-07-19','2028-06-30','2028-07-24','2029-06-29']){
  const grade=gradeAt(date,2026),d=calendarDay(date,grade),slot=d.slots.at(-1).id,p=positionFor(date,slot,2026);
  const cursor=cursorFor(date,slot,2026);
  assert.deepEqual(positionAt(cursor,2026),p);
  assert.ok([1,2,3].includes(p.serviceYear));
 }
 const end=calendarDay(range.end,gradeAt(range.end,2026)),last=positionFor(range.end,end.slots.at(-1).id,2026);
 assert.equal(last.serviceYear,3);assert.throws(()=>nextPosition(last,2026),/RANGE/);
 for(const date of ['2026-01-01','2027-06-30','2028-11-01','2029-06-29']){
  assert.deepEqual(newThreeYearStart(date),range);assert.deepEqual(newCareerStart(date),range);
 }
 for(const date of ['2027-02-29','2028-02-30','2027-06-30T00:00:00+08:00'])assert.throws(()=>newThreeYearStart(date));
});
