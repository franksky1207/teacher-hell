/** Runtime lookup of one finite, versioned, precompiled calendar; no host calendar/lunar APIs. */
import { THREE_YEAR_SENIOR_CALENDAR as SENIOR_CALENDAR } from './three-year-senior.js';
import { LEGACY_SENIOR_CALENDAR } from './senior-fixed-v1.js';
import { FIXED_CALENDAR } from './fixed.js';
import { THREE_YEAR_FIXED_CALENDAR } from './three-year-calendar.js';
import { addDays,dayNumber,weekday,weekMonday,requireCalendar as need,freezeData } from './civil.js';
import { validateTimetable } from './timetable.js';
export const CALENDAR=freezeData(FIXED_CALENDAR);
/** Cohort-only projection: the retained 40-year calendar remains unmodified. */
export const THREE_YEAR_CALENDAR=freezeData(THREE_YEAR_FIXED_CALENDAR);
const calendarFor=version=>version===SENIOR_CALENDAR_VERSION?THREE_YEAR_CALENDAR:CALENDAR;
export const CALENDAR_VERSION=CALENDAR.version;
export const SENIOR_CALENDAR_VERSION=SENIOR_CALENDAR.version;
export const LEGACY_SENIOR_CALENDAR_VERSION=LEGACY_SENIOR_CALENDAR.version;
const isSeniorVersion=version=>version===SENIOR_CALENDAR_VERSION||version===LEGACY_SENIOR_CALENDAR_VERSION;
export const seniorCalendar=freezeData(SENIOR_CALENDAR);
export const legacySeniorCalendar=freezeData(LEGACY_SENIOR_CALENDAR);
export function requireCalendarVersion(version){need([CALENDAR_VERSION,SENIOR_CALENDAR_VERSION,LEGACY_SENIOR_CALENDAR_VERSION].includes(version),'CALENDAR_VERSION','Unknown calendar projection');return version;}
/** Stable H2 contract: formal rounds only; ordinary/closure policy belongs to H2. */
export function examSchedule(termId,grade,version=CALENDAR_VERSION){
 requireCalendarVersion(version);const t=semester(termId,version),senior=isSeniorVersion(version)&&grade===3&&t.kind==='spring';
 const dates=senior?t.exams.slice(0,2):grade===2&&t.grade2SecondExam?[t.exams[0],t.grade2SecondExam,t.exams[2]]:t.exams;
 return dates.map((original,i)=>({round:i+1,kind:senior&&i===1?'graduation-exam':'term-exam',dates:[...(t.gradeExamOverrides?.[grade]?.[i+1]??original)],countsTowardSemester:true}));
}
const years=new Map(CALENDAR.years.map(y=>[y.year,y])),holidays=new Map(CALENDAR.holidays),activities=new Map(),terms=CALENDAR.years.flatMap(y=>y.terms);
const cohortYears=new Map(THREE_YEAR_CALENDAR.years.map(y=>[y.year,y])),cohortHolidays=new Map(THREE_YEAR_CALENDAR.holidays),cohortActivities=new Map(),cohortTerms=THREE_YEAR_CALENDAR.years.flatMap(y=>y.terms);
const yearsFor=version=>version===SENIOR_CALENDAR_VERSION?cohortYears:years;
const holidaysFor=version=>version===SENIOR_CALENDAR_VERSION?cohortHolidays:holidays;
const activitiesFor=version=>version===SENIOR_CALENDAR_VERSION?cohortActivities:activities;
const termsFor=version=>version===SENIOR_CALENDAR_VERSION?cohortTerms:terms;
for(const [data,map] of [[CALENDAR,activities],[THREE_YEAR_CALENDAR,cohortActivities]])for(const y of data.years)for(const a of y.activities){const list=map.get(a.date)??[];need(!list.some(old=>old.id===a.id),'CALENDAR','Duplicate activity ID');list.push(a);map.set(a.date,list);}
/** H1 exposes dates/rounds, and explicitly leaves the new academic closing policy to H2. */
export function assessmentCalendar(termId,grade,version=CALENDAR_VERSION){
 const exams=examSchedule(termId,grade,version),senior=exams.length===2;
 const lastExam=exams.at(-1).dates.at(-1),earlySeniorAutumnClose=version===SENIOR_CALENDAR_VERSION&&grade===3&&termId==='2028:autumn';let studyCompletionDate=null,ceremonyDate=null;
 if(senior){ceremonyDate=calendarFor(version).years.flatMap(y=>y.activities).find(a=>a.kind==='graduation'&&a.date>=semester(termId,version).start&&a.date<=semester(termId,version).end)?.date;need(ceremonyDate,'CALENDAR','Missing graduation ceremony');studyCompletionDate=addDays(ceremonyDate,-1);while(weekday(studyCompletionDate)>5||(holidaysFor(version).get(studyCompletionDate)??[]).some(h=>!h.grades||h.grades.includes(3)))studyCompletionDate=addDays(studyCompletionDate,-1);}
 const publicationOverrides={'2026:autumn:1:2':'2026-12-07','2026:autumn:2:2':'2026-12-07','2027:spring:1:2':'2027-05-10','2027:autumn:1:2':'2027-12-06','2027:autumn:2:2':'2027-12-06','2028:spring:1:2':'2028-05-15','2028:spring:2:2':'2028-05-15','2028:autumn:1:2':'2028-12-04','2028:autumn:2:2':'2028-12-04','2029:spring:1:2':'2029-05-14','2029:spring:2:2':'2029-05-14'};
 const publicationFor=round=>publicationOverrides[termId+':'+grade+':'+round.round]??addDays(round.dates.at(-1),1);
 return {version,termId,grade,exams,examPublications:exams.map(round=>({round:round.round,date:version===SENIOR_CALENDAR_VERSION?publicationFor(round):addDays(round.dates.at(-1),1)})),ordinaryAssessmentDates:exams.at(-1).dates,closurePolicy:senior?'senior-spring-h2-v1':'standard',teacherTermEnd:semester(termId,version).end,...(earlySeniorAutumnClose?{marksCloseDate:lastExam,publicationDate:addDays(lastExam,1)}:{}),...(senior?{assessmentPolicy:'senior-spring-403030-v1',marksCloseDate:lastExam,publicationDate:addDays(lastExam,1),makeupFrom:addDays(lastExam,2),makeupUntil:[addDays(lastExam,30),studyCompletionDate].sort()[0],studyCompletionDate,ceremonyDate}:{})};
}
export function requireDate(date){dayNumber(date);need(date>=CALENDAR.range[0]&&date<=CALENDAR.range[1],'RANGE','Calendar date outside supported range');return date;}
export function yearData(year,version=CALENDAR_VERSION){const rows=yearsFor(version);need(rows.has(year),'RANGE',`Unsupported calendar year ${year}`);return rows.get(year);}
export function semester(id,version=CALENDAR_VERSION){const value=termsFor(version).find(t=>t.id===id);need(value,'CALENDAR',`Unknown semester ${id}`);return value;}
const inRange=(d,a,b)=>d>=a&&d<=b;
export function teachingTerm(date,version=CALENDAR_VERSION){requireDate(date);const y=yearData(Number(date.slice(0,4)),version),normal=termsFor(version).find(t=>inRange(date,t.start,t.end));
 if(inRange(date,y.summerCamp,y.summerCampEnd))return {id:`${y.year}:autumn`,academicYear:y.year,camp:'summer'};
 if(inRange(date,y.winterCamp,addDays(y.winterCamp,4)))return {id:`${y.year}:spring`,academicYear:y.year-1,camp:'winter'};
 return normal?{id:normal.id,academicYear:normal.academicYear,camp:null}:null;
}
/** Latest semester whose camp has begun, including its intervening vacation dates. */
export function latestPreparedSemester(date){
 requireDate(date);const y=yearData(Number(date.slice(0,4)));
 if(date>=y.summerCamp)return {id:`${y.year}:autumn`,academicYear:y.year};
 if(date>=y.winterCamp)return {id:`${y.year}:spring`,academicYear:y.year-1};
 return {id:`${y.year-1}:autumn`,academicYear:y.year-1};
}
function basicDay(date,grade,version=CALENDAR_VERSION){
 requireDate(date);need([1,2,3].includes(grade),'CALENDAR','Grade must be 1, 2 or 3');
 const y=yearData(Number(date.slice(0,4)),version),dow=weekday(date),originalTerm=teachingTerm(date,version),term=version===SENIOR_CALENDAR_VERSION&&grade===3&&((originalTerm?.camp==='winter'&&date>='2029-01-22')||date>'2029-06-01')?null:originalTerm,newYear=inRange(date,addDays(y.cny,-1),addDays(y.cny,4));
 const holiday=(holidaysFor(version).get(date)??[]).filter(h=>!h.grades||h.grades.includes(grade));
 let kind;
 if(newYear)kind='spring-festival';
 else if(!term)kind='long-vacation';
 else if(holiday.length)kind='holiday';
 else if(dow===7||dow===6&&(grade!==3||isSeniorVersion(version)&&term.id.endsWith(':spring')&&!term.camp))kind='weekend';
 else if(dow===6)kind='grade3-saturday';
 else kind=term.camp?term.camp+'-camp':'school';
 return {date,grade,weekday:dow,kind,holiday,term};
}
const dayCache=new Map();
export function calendarDay(date,grade,version=CALENDAR_VERSION){
 requireCalendarVersion(version);if(version===SENIOR_CALENDAR_VERSION)need(date>=THREE_YEAR_CALENDAR.range[0]&&date<=THREE_YEAR_CALENDAR.range[1],'RANGE','Outside three-year cohort calendar');
 const cacheKey=`${version}:${date}:${grade}`;if(dayCache.has(cacheKey))return dayCache.get(cacheKey);
 const base=basicDay(date,grade,version),y=yearData(Number(date.slice(0,4)),version),acts=[...(activitiesFor(version).get(date)??[]),...(isSeniorVersion(version)?(version===LEGACY_SENIOR_CALENDAR_VERSION?LEGACY_SENIOR_CALENDAR.nodes:SENIOR_CALENDAR.nodes).filter(n=>n.date===date||n.dates?.includes(date)):[])].filter(a=>a.grades.includes(grade));
 const school=['school','summer-camp','winter-camp'].includes(base.kind);
 let slotIds=school?['early','p1','p2','p3','p4','lunch','noon','p5','p6','p7','p8']:base.kind==='spring-festival'?['festival-day']:base.kind==='long-vacation'?['vacation-day']:['morning','afternoon'];
 if(school&&(isSeniorVersion(version)&&grade===3&&base.term.id.endsWith(':spring')&&!base.term.camp?[1,4]:({1:[2,4],2:[1,4,5],3:[1,2,4,5]})[grade]).includes(base.weekday))slotIds.push('dinner','study1','study2','study3');
 if(!['spring-festival','long-vacation'].includes(base.kind))slotIds.push(school||base.kind==='grade3-saturday'?'private':'evening');
 const full=acts.find(a=>a.slots.includes('all'));
 if(full)slotIds=full.kind.startsWith('graduation-trip')?['travel-day']:['morning','afternoon','private'];
 const normal=termsFor(version).find(t=>inRange(date,t.start,t.end)),examNode=normal?examSchedule(normal.id,grade,version).find(e=>e.dates.includes(date)):null,exam=!!examNode;
 const week=normal?Math.floor((dayNumber(date)-dayNumber(normal.start))/7)+1:null;
 const slots=slotIds.map(id=>{
  const occupying=acts.filter(a=>a.slots.includes(id)||a.slots.includes('morning')&&['early','p1','p2','p3','p4'].includes(id)||a.slots.includes('afternoon')&&['p5','p6','p7','p8'].includes(id)||a.slots.includes('all')&&id!=='private');
  const period=/^p[1-8]$/.test(id)?Number(id.slice(1)):null;
  const fixed=base.weekday===5&&[6,7].includes(period)&&week!==null&&week%2===0?(period===6?'assembly':'class-meeting'):null;
  return {id,period,kind:occupying.length?'activity':exam&&period?'exam':fixed??(period?'period':id),activityIds:occupying.map(a=>a.id),protected:occupying.length>0,...(isSeniorVersion(version)&&grade===3&&exam&&period?{examRound:examNode.round,examKind:examNode.kind}:{})};
 });
 let quota=school?{kind:'school-day',min:0,max:5,nightStudyMax:1}:base.kind==='grade3-saturday'?{kind:'saturday',morningMax:1,afternoonMax:1,privateMax:0}:['weekend','holiday'].includes(base.kind)?{kind:'holiday',min:0,max:1}:null;
 let segment=null;
 if(base.kind==='spring-festival')segment={id:`festival:${y.year}`,start:addDays(y.cny,-1),end:addDays(y.cny,4),quota:1};
 if(base.kind==='long-vacation'){
  let start=date,end=date;while(start>calendarFor(version).range[0]&&basicDay(addDays(start,-1),grade,version).kind==='long-vacation'start=addDays(start,-1);while(end<calendarFor(version).range[1]&&basicDay(addDays(end,1),grade,version).kind==='long-vacation'end=addDays(end,1);
  const bucket=Math.floor((dayNumber(date)-dayNumber(start))/7),bucketStart=addDays(start,bucket*7),bucketEnd=[addDays(bucketStart,6),end].sort()[0];
  segment={id:`vacation:${start}:${end}:${bucket}`,start:bucketStart,end:bucketEnd,continuousStart:start,continuousEnd:end,quota:1};
 }
 if(full)quota={kind:'protected-day',min:0,max:0};
 const result=freezeData({...base,activities:acts,exam,week,slots,quota,segment,courseSemesterId:base.term?.id??null,legalOpening:date===y.autumnStart,finalReview:date===y.winterFinal||date===y.springFinal,annualBoundary:date===y.springFinal&&!CALENDAR.conflicts.some(c=>c.code==='ANNUAL_FINAL_BOUNDARY'&&c.year===y.year),annualBoundaryStatus:date===y.springFinal?(CALENDAR.conflicts.some(c=>c.code==='ANNUAL_FINAL_BOUNDARY'&&c.year===y.year)?'unresolved':'eligible'):'none',backgroundProceduresContinue:true,...(version===SENIOR_CALENDAR_VERSION&&grade===3?{admissions:(SENIOR_CALENDAR.admissions??[]).filter(p=>p.start<=date&&date<=p.end)}:{})});
 // Bounded cache; callers retain frozen results but runtime need not retain forty years × three grades.
 if(dayCache.size>=2048)dayCache.clear();dayCache.set(cacheKey,result);return result;
}
/** H3 handoff contains scheduling facts only, never individual scores or eligibility guesses. */
export function mockPhaseSummary(date,grade,slotId,version=CALENDAR_VERSION){
 const day=calendarDay(date,grade,version),slot=day.slots.find(s=>s.id===slotId);need(slot,'SLOT','Unknown mock phase slot');
 const node=day.activities.find(a=>a.kind.startsWith('mock-')&&slot.activityIds.includes(a.id));
 return node?{nodeId:node.id,phase:slotId,family:node.family,countsTowardSemester:false,resultScope:node.resultScope,eligibilityContract:node.eligibilityContract,individualResults:null}:null;
}
export function slotOccupancy(date,grade,slotId,table=null,version=CALENDAR_VERSION){
 const day=calendarDay(date,grade,version),slot=day.slots.find(s=>s.id===slotId);need(slot,'SLOT',`Unknown ${date} grade ${grade} slot ${slotId}`);
 let lesson=null;if(table){validateTimetable(table);need(day.courseSemesterId===table.semesterId,'TIMETABLE','Wrong semester timetable');if(!slot.protected&&!day.exam&&['school','summer-camp','winter-camp'].includes(day.kind)&&slot.period)lesson=table.lessons.find(l=>l.weekday===day.weekday&&l.period===slot.period)??null;}
 return {...slot,lesson,teachingAutomatic:lesson!==null};
}
export const CAREER_30='career-30',THREE_YEAR='three-year';
export const DIFFICULTY_TENURE=Object.freeze({easy:20,normal:10,hard:1});
/** v1 is exclusively the retained 30-year core; v2 requires an explicit three-year identity. */
export function planMode(plan){
 if(plan.validation==='fixed-calendar-v1'){need(!Object.hasOwn(plan,'career'),'MODE','Legacy calendar cannot carry three-year identity');return CAREER_30;}
 need(plan.validation==='fixed-calendar-v2','MODE','Unknown formal calendar mode');
 const c=plan.career;
 need(c&&Object.keys(c).sort().join(',')===(c.version===2?'backgroundSeed,difficulty,mode,version':'difficulty,mode,version')&&[1,2].includes(c.version)&&c.mode===THREE_YEAR&&typeof c.difficulty==='string'&&Object.hasOwn(DIFFICULTY_TENURE,c.difficulty),'MODE','Invalid three-year career identity');
 if(c.version===2)need(Number.isInteger(c.backgroundSeed)&&c.backgroundSeed>=0&&c.backgroundSeed<=0xffffffff,'MODE','Explicit uint32 background seed required');
 return THREE_YEAR;
}
export function careerYears(mode=CAREER_30){need([CAREER_30,THREE_YEAR].includes(mode),'MODE','Unknown career mode');return mode===THREE_YEAR?3:30;}
/** New three-year careers share the 2026 cohort; saved plans retain their own start year. */
export function newThreeYearStart(taipeiDate){dayNumber(taipeiDate);return careerRange(2026,THREE_YEAR);}
export function careerRange(startYear,mode=CAREER_30){
 const version=mode===THREE_YEAR?SENIOR_CALENDAR_VERSION:CALENDAR_VERSION;
 const first=yearData(startYear,version),last=yearData(startYear+careerYears(mode),version); // Year 1 ends the following June.
 need(calendarFor(version).conflicts.length===0,'COLLISION','Fixed calendar has unresolved scheduling constraints');
 return {start:first.summerCamp,end:last.springFinal,startYear};
}
export function newCareerStart(realDate){requireDate(realDate);let y=Number(realDate.slice(0,4));if(realDate<yearData(y).summerCamp)y--;return careerRange(y);}
export function gradeAt(date,startYear){const y=Number(date.slice(0,4)),academic=y-(date<yearData(y).summerCamp?1:0);return ((academic-startYear)%3+3)%3+1;}
export function positionFor(date,slotId,startYear,mode=CAREER_30,version=CALENDAR_VERSION){
 const range=careerRange(startYear,mode);need(date>=range.start&&date<=range.end,'RANGE',`Date outside supported ${careerYears(mode)}-year career`);const y=Number(date.slice(0,4)),meta=yearData(y),lastOpening=date>=meta.autumnStart?y:y-1;
 const serviceYear=Math.max(1,lastOpening-startYear+1),openingDate=serviceYear===1?range.start:yearData(startYear+serviceYear-1).autumnStart;
 const stats=date>meta.springFinal?`${y}:autumn`:date>meta.winterFinal?`${y}:spring`:`${y-1}:autumn`;
 slotOccupancy(date,gradeAt(date,startYear),slotId,null,version);
 return {date,slotId,schoolYearId:`challenge:${startYear}:${serviceYear}`,openingId:`opening:${openingDate}`,serviceYear,statisticsPeriodId:stats};
}
export const cursorFor=(date,slotId,startYear,version=CALENDAR_VERSION)=>{const slots=calendarDay(date,gradeAt(date,startYear),version).slots,index=slots.findIndex(s=>s.id===slotId);need(index>=0,'SLOT','Unknown slot');return dayNumber(date)*32+index;};
export function positionAt(cursor,startYear,mode=CAREER_30,version=CALENDAR_VERSION){const range=calendarFor(version).range;need(Number.isSafeInteger(cursor)&&cursor>=dayNumber(range[0])*32&&cursor<=(dayNumber(range[1])+1)*32-1,'TIME','Calendar cursor outside supported civil dates');const date=new Date(Math.floor(cursor/32)*86400000).toISOString().slice(0,10),slot=calendarDay(date,gradeAt(date,startYear),version).slots[cursor%32];need(slot,'SLOT','Calendar cursor points into nonexistent slot');return positionFor(date,slot.id,startYear,mode,version);}
export function nextPosition(position,startYear,mode=CAREER_30,version=CALENDAR_VERSION){const slots=calendarDay(position.date,gradeAt(position.date,startYear),version).slots,index=slots.findIndex(s=>s.id===position.slotId);need(index>=0,'SLOT','Unknown current slot');const date=index+1<slots.length?position.date:addDays(position.date,1),id=index+1<slots.length?slots[index+1].id:calendarDay(date,gradeAt(date,startYear),version).slots[0].id;return positionFor(date,id,startYear,mode,version);}
