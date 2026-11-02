import test from 'node:test';
import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { compileCalendar } from '../src/calendar/rules.js';
import { ASTRONOMY } from '../src/calendar/astronomy.js';
import { CALENDAR,calendarDay,yearData,careerRange,newCareerStart,gradeAt,positionFor,nextPosition,slotOccupancy } from '../src/calendar/calendar.js';
import { addDays,dayNumber,weekday,datesBetween,weekMonday } from '../src/calendar/civil.js';
import { SUBJECT_LOAD,generateTimetable,validateTimetable } from '../src/calendar/timetable.js';
import { createRandom } from '../src/numeric/random.js';
import { catalogue } from './support/calendar.js';

test('calendar: fixed 40-year source is reproducible, versioned and has no unresolved collisions',()=>{
 assert.deepEqual(compileCalendar(),CALENDAR);assert.equal(CALENDAR.years.length,40);assert.equal(ASTRONOMY.length,40);assert.deepEqual(CALENDAR.conflicts,[]);
 assert.equal(ASTRONOMY[0].cny,'2026-02-17');assert.equal(ASTRONOMY[0].qingming,'2026-04-05');assert.equal(ASTRONOMY[0].midAutumn,'2026-09-25');assert.ok(ASTRONOMY.every(a=>/^[0-9a-f]{64}$/.test(a.sha256)));
});
test('calendar: exhaustive every date and grade 2026–2065 has stable legal slots / dates / leap years',t=>{
 const at=performance.now();let days=0,leap=0,slots=0;
 for(let date='2026-01-01';date<='2065-12-31';date=addDays(date,1)){
  days++;const ms=Date.parse(date+'T00:00:00Z'),host=(new Date(ms).getUTCDay()+6)%7+1;assert.equal(weekday(date),host);if(date.endsWith('02-29'))leap++;
  for(const grade of [1,2,3]){const d=calendarDay(date,grade);assert.equal(d.date,date);assert.ok(d.slots.length>0&&d.slots.length<32);assert.equal(new Set(d.slots.map(s=>s.id)).size,d.slots.length);assert.ok(d.slots.every(s=>s.protected===Boolean(s.activityIds.length)));assert.equal(d.backgroundProceduresContinue,true);slots+=d.slots.length;
   if(d.holiday.length)assert.ok(!['school','summer-camp','winter-camp','grade3-saturday'].includes(d.kind));
  }
 }
 assert.equal(days,14610);assert.equal(leap,10);t.diagnostic(JSON.stringify({days,gradeDays:days*3,slots,elapsedMs:Math.round(performance.now()-at)}));
});
test('calendar: all forty years preserve camps, Monday openings, legal exams and trips',()=>{
 let moved=0;
 for(const y of CALENDAR.years){
  assert.equal(weekday(y.summerCamp),1);assert.equal(dayNumber(y.summerCamp)-dayNumber(y.summerStart),21);assert.equal(dayNumber(y.summerCampEnd)-dayNumber(y.summerCamp),27);assert.equal(dayNumber(y.autumnStart)-dayNumber(y.summerStart),56);assert.equal(weekday(y.autumnStart),1);assert.equal(weekday(y.winterCamp),1);assert.equal(weekday(y.springStart),1);
  if(y.winterCampMoved){moved++;assert.equal(y.winterCamp,addDays(y.springStart,-7));}else assert.equal(y.winterCamp,addDays(y.winterFinal,3));
  for(const date of datesBetween(y.winterCamp,addDays(y.winterCamp,4)))assert.equal(calendarDay(date,1).kind,'winter-camp');
  for(const term of y.terms){for(const pair of term.exams){for(const d of pair){assert.ok(weekday(d)<=5);if(d>='2026-01-01'&&d<='2065-12-31')assert.equal(calendarDay(d,1).holiday.length,0);}for(let i=1;i<pair.length;i++)assert.equal(pair[i],addDays(pair[i-1],1));}if(!term.truncated)assert.deepEqual(term.exams[2],[-2,-1,0].map(n=>addDays(term.end,n)));}
  const trips=y.activities.filter(a=>a.kind.startsWith('graduation-trip')).sort((a,b)=>a.date.localeCompare(b.date));assert.equal(trips.length,3);assert.deepEqual(trips.map(a=>a.date),[0,1,2].map(n=>addDays(trips[0].date,n)));assert.ok(trips.every(a=>weekday(a.date)<=5));const spring=y.terms.find(t=>t.kind==='spring');assert.ok(spring.grade2SecondExam.at(-1)<trips[0].date);assert.ok(spring.exams[1].every(d=>calendarDay(d,1).exam));
 }
 assert.ok(moved>0&&moved<40);
});
test('calendar: all required activities survive, obey priority, holiday backward adjustment and class coverage',()=>{
 const ids=new Set();let shifted=0;
 for(const y of CALENDAR.years)for(const a of y.activities){assert.ok(!ids.has(a.id));ids.add(a.id);for(const grade of a.grades){const day=calendarDay(a.date,grade);assert.equal(day.holiday.length,0);assert.ok(day.slots.some(s=>s.activityIds.includes(a.id)));assert.ok(day.slots.filter(s=>s.activityIds.includes(a.id)).every(s=>s.protected));}
  if(a.date!==a.originalDate){shifted++;assert.ok(a.date<a.originalDate);assert.equal(weekMonday(a.date),weekMonday(a.originalDate));}
 }
 assert.ok(shifted>=6);assert.ok(CALENDAR.years.some(y=>y.activities.some(a=>a.kind==='teachers-day'&&a.originalDate==='2028-09-28'&&a.date==='2028-09-27')));
});
test('calendar: day quotas / night study / grade 3 Saturdays / private evenings remain separate',()=>{
 const y=yearData(2026),school=calendarDay(y.autumnStart,1);assert.equal(school.quota.max,5);assert.ok(school.slots.some(s=>s.id==='private'));
 const tue=calendarDay(addDays(y.autumnStart,1),1);assert.equal(tue.slots.filter(s=>s.id.startsWith('study')).length,3);assert.equal(tue.quota.nightStudyMax,1);assert.equal(tue.slots.at(-1).id,'private');
 const sat=calendarDay(addDays(y.autumnStart,5),3);assert.equal(sat.kind,'grade3-saturday');assert.deepEqual(sat.slots.map(s=>s.id),['morning','afternoon','private']);assert.equal(sat.quota.privateMax,0);
 assert.equal(calendarDay('2026-09-28',3).kind,'holiday');assert.equal(calendarDay('2026-09-28',3).quota.max,1);
});
test('calendar: vacation buckets are absolute and split-proof, festival has six days / one separate quota',()=>{
 for(const y of CALENDAR.years){const festival=datesBetween(addDays(y.cny,-1),addDays(y.cny,4)).map(d=>calendarDay(d,1));assert.ok(festival.every(d=>d.kind==='spring-festival'&&d.slots.length===1&&d.segment.id===`festival:${y.year}`));assert.equal(festival[0].segment.quota,1);
  const start=y.summerStart;for(let offset=0;offset<21;offset++){const d=calendarDay(addDays(start,offset),1);assert.equal(d.kind,'long-vacation');assert.equal(d.segment.start,addDays(d.segment.continuousStart,Math.floor((dayNumber(d.date)-dayNumber(d.segment.continuousStart))/7)*7));assert.equal(d.segment.quota,1);}assert.equal(calendarDay(y.summerCamp,1).kind,'summer-camp');
 }
});
test('calendar: nine subjects across sixty semester schedules retain classes and exact 18 lessons',t=>{
 const at=performance.now();let count=0;
 for(const subject of Object.keys(SUBJECT_LOAD)){let previous=null,random=createRandom(37).snapshot();for(let i=0;i<60;i++){
  const academicYear=2026+Math.floor(i/2),semesterId=`${2026+Math.ceil(i/2)}:${i%2?'spring':'autumn'}`,classes=catalogue(academicYear),homeClassId=`catalogue:${2026+Math.floor((academicYear-2026)/3)*3}:0`;
  const input={subject,academicYear,semesterId,classes,homeClassId,previous,random},result=generateTimetable(input);validateTimetable(result.table);assert.deepEqual(generateTimetable(input),result);for(let day=1;day<=5;day++)assert.ok([3,4].includes(result.table.lessons.filter(l=>l.weekday===day).length));previous=result.table;random=result.random;count++;
 }}assert.equal(count,540);t.diagnostic(JSON.stringify({schedules:count,elapsedMs:Math.round(performance.now()-at)}));
});
test('calendar: timetable conflicts and impossible offered subjects are rejected',()=>{
 const input={subject:'公民',semesterId:'2026:autumn',academicYear:2026,classes:catalogue(2026),homeClassId:'catalogue:2026:0',random:createRandom(3).snapshot()},table=generateTimetable(input).table;
 for(const mutate of [t=>t.lessons.pop(),t=>t.lessons[1]={...t.lessons[0]},t=>t.lessons[0].period=9,t=>t.classes[0].subjects=[],t=>t.version=2]){const bad=structuredClone(table);mutate(bad);assert.throws(()=>validateTimetable(bad));}
 assert.throws(()=>generateTimetable({...input,classes:input.classes.slice(0,8)}));assert.throws(()=>generateTimetable({...input,subject:'地球科學'}));
});
test('calendar: nominal lesson overwritten by exams / activities without redrawing or adding makeup lessons',()=>{
 const classes=catalogue(2026),table=generateTimetable({subject:'國文',semesterId:'2026:autumn',academicYear:2026,classes,homeClassId:classes[0].id,random:createRandom(71).snapshot()}).table,before=JSON.stringify(table);
 const y=yearData(2027),term=y.terms[0],exam=term.exams[0][0];for(const slot of calendarDay(exam,1).slots)assert.equal(slotOccupancy(exam,1,slot.id,table).lesson,null);
 for(const a of y.activities.filter(a=>a.id.startsWith(table.semesterId+':')&&a.grades.includes(1)&&a.slots.includes('all')))for(const slot of calendarDay(a.date,1).slots.filter(s=>s.protected))assert.equal(slotOccupancy(a.date,1,slot.id,table).lesson,null);
 assert.equal(JSON.stringify(table),before);assert.equal(table.lessons.length,18);
});
test('calendar: supported career start uses supplied real date and rejects insufficient horizon / invalid civil dates',()=>{
 assert.equal(newCareerStart('2026-11-02').start,yearData(2026).summerCamp);assert.equal(newCareerStart(yearData(2027).summerCamp).startYear,2027);assert.equal(newCareerStart(addDays(yearData(2027).summerCamp,-1)).startYear,2026);
 for(let y=2026;y<=2035;y++){const r=careerRange(y);assert.equal(r.end,yearData(y+30).springFinal);assert.ok(r.end<='2065-12-31');}
 for(const d of ['2026-02-29','2028-02-30','2025-12-31','2066-01-01'])assert.throws(()=>calendarDay(d,1));assert.throws(()=>newCareerStart('2026-01-01'));assert.throws(()=>newCareerStart('2036-12-01'));assert.throws(()=>careerRange(2036));
});
test('calendar: continuous 30-year per-day positions preserve service/opening/statistics boundaries',t=>{
 const at=performance.now(),range=careerRange(2026);let days=0,last=null,openings=0;
 for(let date=range.start;date<=range.end;date=addDays(date,1)){
  const d=calendarDay(date,gradeAt(date,2026)),p=positionFor(date,d.slots[0].id,2026);assert.ok(p.serviceYear>=1&&p.serviceYear<=30);if(last&&p.serviceYear!==last.serviceYear){assert.equal(p.serviceYear,last.serviceYear+1);assert.ok(d.legalOpening);openings++;}last=p;days++;
  const end=positionFor(date,d.slots.at(-1).id,2026);if(date<range.end){const next=nextPosition(end,2026);assert.equal(next.date,addDays(date,1));}
 }
 assert.equal(openings,29);assert.equal(last.serviceYear,30);t.diagnostic(JSON.stringify({continuousDays:days,serviceOpenings:openings,elapsedMs:Math.round(performance.now()-at),note:'Calendar traversal, not 30-year NPC/gameplay simulation'}));
});
