/** Bounded calendar-only assertions; never starts an NPC, event, or three-year simulation. */
import assert from 'node:assert/strict';
import {calendarDay,examSchedule,assessmentCalendar,THREE_YEAR_CALENDAR,seniorCalendar,CALENDAR_VERSION,SENIOR_CALENDAR_VERSION,LEGACY_SENIOR_CALENDAR_VERSION,planMode,careerYears,careerRange,THREE_YEAR} from '../src/calendar/calendar.js';
import {addDays,weekday} from '../src/calendar/civil.js';
import {admissionCalendar} from '../src/calendar/admissions.js';
const V=SENIOR_CALENDAR_VERSION, OLD=LEGACY_SENIOR_CALENDAR_VERSION;
let checks=0, scanned=0;
checkSourceIntegrity();
function checkSourceIntegrity(){
 assert.deepEqual(THREE_YEAR_CALENDAR.range,['2026-07-20','2029-06-29']);
 assert.equal(THREE_YEAR_CALENDAR.years.length,4);
 assert.equal(THREE_YEAR_CALENDAR.years.flatMap(y=>y.terms).length,6);
 assert.ok(THREE_YEAR_CALENDAR.years.flatMap(y=>y.activities).every(a=>a.date>=THREE_YEAR_CALENDAR.range[0]&&a.date<=THREE_YEAR_CALENDAR.range[1]));
 assert.ok(seniorCalendar.nodes.every(n=>n.date>='2028-07-20'&&n.date<='2029-06-29'));
}

function check(ok,msg){assert.ok(ok,msg);checks++;}
check(planMode({validation:'fixed-calendar-v2',career:{version:1,mode:THREE_YEAR,difficulty:'easy'}})===THREE_YEAR,'Three-year mode accepted');
check(careerYears(THREE_YEAR)===3,'Three playable years');
check(careerRange(2026,THREE_YEAR).start==='2026-07-20'&&careerRange(2026,THREE_YEAR).end==='2029-06-29','Fixed three-year start/end');
for(const invalid of [{validation:'fixed-calendar-v1'},{validation:'fixed-calendar-v2',career:{version:1,mode:'career-30',difficulty:'hard'}}])check((()=>{try{planMode(invalid);return false;}catch{return true;}})(),'Retired mode must be rejected');
check((()=>{try{careerRange(2027,THREE_YEAR);return false;}catch{return true;}})(),'Non-2026 cohort is not playable');
check((()=>{try{careerRange(2026,'career-30');return false;}catch{return true;}})(),'30-year range is not playable');
const day=(date,grade)=>calendarDay(date,grade,V);
const has=(date,grade,kind)=>day(date,grade).activities.some(a=>a.kind===kind);
const exam=(term,grade,round)=>examSchedule(term,grade,V)[round-1].dates.join(',');
for(const [term,grade,round,expected] of [
 ['2026:autumn',1,2,'2026-12-02,2026-12-03'],
 ['2027:spring',1,2,'2027-05-05,2027-05-06'],
 ['2027:autumn',2,2,'2027-12-01,2027-12-02'],
 ['2028:spring',2,2,'2028-05-08,2028-05-09'],
 ['2028:autumn',3,3,'2028-12-26,2028-12-27'],
 ['2029:spring',1,2,'2029-05-09,2029-05-10'],
 ['2029:spring',2,2,'2029-05-07,2029-05-08'],
 ['2029:spring',3,2,'2029-05-09,2029-05-10']
])check(exam(term,grade,round)===expected,'Wrong exam: '+term+' grade '+grade+' round '+round);
check(has('2026-11-11',1,'japan-visit')&&!has('2027-04-07',1,'japan-visit'),'Japanese visit moved to grade 1 autumn');
check(has('2027-04-09',1,'class-song')&&!has('2026-11-20',1,'class-song'),'Class song moved to spring');
for(const [date,grade,kind] of [
 ['2026-12-04',1,'field-trip'],['2027-05-07',1,'field-trip'],['2027-12-03',2,'field-trip'],
 ['2028-05-10',2,'graduation-trip-1'],['2028-05-12',2,'graduation-trip-3'],
 ['2026-12-11',1,'sports'],['2027-12-10',2,'sports'],['2028-12-08',3,'sports'],
 ['2026-12-12',3,'anniversary'],['2027-12-11',3,'anniversary'],['2028-12-09',3,'anniversary'],
 ['2029-05-18',3,'fair']
])check(has(date,grade,kind),'Missing activity '+kind+' '+date);
for(const date of ['2027-04-02','2028-03-31','2029-04-13'])
 check(!has(date,1,'sports'),'Spring has no sports meet '+date);
for(const date of ['2028-07-27','2028-07-28','2028-09-06','2028-09-07','2028-10-26','2028-10-27','2028-12-13','2028-12-14'])
 check(has(date,3,'mock-gsat'),'Missing two-day senior mock '+date);
check(day('2028-10-25',3).kind==='holiday'&&!has('2028-10-25',3,'mock-gsat'),'Third mock must avoid national holiday');
check(day('2029-01-19',3).kind==='holiday'&&day('2029-01-19',3).finalReview,'Senior Jan19 preparation leave / semester review');
check(day('2029-01-19',1).kind==='school','First-years still attend Jan19');
check(day('2029-01-22',3).kind!=='winter-camp'&&day('2029-01-22',1).kind==='winter-camp','Senior is exempt from winter camp');
check(day('2027-01-25',3).kind==='winter-camp'&&day('2028-02-07',3).kind==='winter-camp','Only final-year winter camp is exempt');
check(day('2029-06-02',3).kind==='long-vacation'&&day('2029-06-02',1).kind!=='long-vacation','Graduates have no regular classes after June 1');
for(const date of ['2029-01-20','2029-01-21','2029-01-22'])
 check(has(date,3,'formal-gsat'),'Formal GSAT protected '+date);
check(has('2028-10-21',3,'formal-gsat')===false,'English listening is an admissions milestone, not GSAT');
check(admissionCalendar(2026,V).some(n=>n.kind==='listening-exam-second'&&n.date==='2028-12-16'),'Second English listening exam');
check(!has('2028-12-29',3,'clubs')&&has('2028-12-29',1,'clubs'),'Grade 3 does not attend club performance');
check(assessmentCalendar('2028:spring',2,V).examPublications[1].date==='2028-05-15','Grade2 grades publish after trip');
check(assessmentCalendar('2029:spring',3,V).marksCloseDate==='2029-05-10','Grade3 graduation assessment synchronized with grade1');

check(assessmentCalendar('2028:autumn',3,V).marksCloseDate==='2028-12-27','Senior autumn marks close Dec27 while semester continues');
check(assessmentCalendar('2028:autumn',3,V).publicationDate==='2028-12-28','Senior autumn results may publish Dec28');
const admissions=admissionCalendar(2026,V),legacyAdmissions=admissionCalendar(2026,OLD);
for(const [stage,date] of [
 ['gsat-exam','2029-01-22'],['gsat-release','2029-02-26'],
 ['stars-nominate','2029-03-09'],['stars-screen','2029-03-21'],
 ['application-register','2029-03-23'],['application-screen','2029-03-30'],
 ['application-result','2029-05-31'],['application-allocation','2029-06-12'],
 ['subject-register','2029-06-19']
])check(admissions.find(n=>n.kind===stage)?.date===date,'H3 admissions phase mismatched '+stage);
check(legacyAdmissions.find(n=>n.kind==='gsat-exam')?.date==='2029-01-29','Existing senior H1 v1 GSAT milestones preserved');

check(day('2029-06-19',3).admissions.some(a=>a.kind==='subject-registration'),'Subject registration deadline June19');
check(LEGACY_SENIOR_CALENDAR_VERSION!==V,'Versioned cohort projection');
check(examSchedule('2028:autumn',3,OLD)[2].dates.at(-1)==='2029-01-19','Legacy senior dates preserved');
check(!calendarDay('2029-01-20',3,OLD).activities.some(a=>a.kind==='formal-gsat'),'Legacy saved projections do not inherit new GSAT');
check(examSchedule('2028:autumn',3,CALENDAR_VERSION)[2].dates.at(-1)==='2029-01-19','Legacy 40-year fixed calendar unchanged');
// Calendar-data scan only. No stories, players, NPCs, RNG, or game advancement.
for(let date='2026-07-20';date<='2029-06-29';date=addDays(date,1)){
 for(const grade of [1,2,3]){
  const d=day(date,grade),a=d.activities,full=a.filter(x=>x.slots.includes('all'));
  scanned++;
  check(full.length<=1,'More than one all-day activity '+date+' grade '+grade);
  check(!(full.length&&a.length>1),'Full-day activity overlaps another activity '+date+' grade '+grade);
  check(!(d.exam&&full.length),'Exam collides with an all-day activity '+date+' grade '+grade);
  for(const activity of a){
   if(activity.kind.startsWith('mock-')||activity.kind==='formal-gsat')continue;
   check(!d.holiday.length,'School activity on holiday '+date+' grade '+grade+' '+activity.kind);
   check(weekday(date)<6||['parents','anniversary'].includes(activity.kind),'Unauthorized weekend school activity '+date+' grade '+grade+' '+activity.kind);
  }
 }
}
console.log('PASS three-year calendar precision: '+checks+' assertions; '+scanned+' date-by-grade rows; legacy version intact');
