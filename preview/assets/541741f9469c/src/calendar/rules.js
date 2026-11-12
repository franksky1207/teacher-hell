/** Offline compiler for the finite 2026–2065 game calendar. Runtime reads its generated data.
 * Academic anchors are explicit school-world conventions, not government calendars. */
import { ASTRONOMY } from './astronomy.js';
import { addDays,weekday,weekMonday,onOrAfter,onOrBefore,datesBetween,requireCalendar } from './civil.js';
export const CALENDAR_VERSION='tw-school-2026-2065-v1';
export const FIRST_DATE='2026-01-01',LAST_DATE='2065-12-31';
export function compileCalendar(){
 const holidays=new Map(),years=[],conflicts=[];
 const put=(date,name,basis,observedFor=null)=>{if(date<FIRST_DATE||date>LAST_DATE)return;const rows=holidays.get(date)??[];if(!rows.some(r=>r.name===name&&r.observedFor===observedFor))rows.push({name,basis,observedFor,...(basis==='school-activity-v1'?{grades:[1,2]}:{})});holidays.set(date,rows);};
 const fixed=[['01-01','開國紀念日'],['02-28','和平紀念日'],['04-04','兒童節'],['05-01','勞動節'],['09-28','教師節／孔子誕辰'],['10-10','國慶日'],['10-25','臺灣光復暨金門古寧頭大捷'],['12-25','行憲紀念日']];
 const base=[];
 for(const a of ASTRONOMY){
  for(const [md,name]of fixed)base.push({date:`${a.year}-${md}`,name});
  for(const [key,name]of [['qingming','清明節'],['dragon','端午節'],['midAutumn','中秋節']])base.push({date:a[key],name});
  // Statute art.6: day BEFORE lunar eve through lunar Jan3 (five statutory days).
  for(let offset=-2;offset<=2;offset++)base.push({date:addDays(a.cny,offset),name:'除夕及春節',lunar:true});
 }
 for(const h of base)put(h.date,h.name,'statute-2025-05-28');
 // Children/Qingming coincide: art.6 special separate holiday before (after if Thursday).
 for(const a of ASTRONOMY)if(a.qingming===`${a.year}-04-04`){const q=addDays(a.qingming,weekday(a.qingming)===4?1:-1);base.push({date:q,name:'兒童節同日調移'});put(q,'兒童節同日調移','statute-art6',a.qingming);}
 for(const h of base){
  // The coincident Apr4 is one base date plus its dedicated shifted holiday, not two compensations.
  if(h.name==='兒童節'&&ASTRONOMY.find(a=>a.year===Number(h.date.slice(0,4)))?.qingming===h.date)continue;
  if(weekday(h.date)<6)continue;
  // School-world freeze of Sat→previous working day, Sun→next working day.
  const direction=h.lunar?1:weekday(h.date)===6?-1:1;let date=addDays(h.date,direction);
  while(weekday(date)>5||holidays.has(date))date=addDays(date,direction);
  put(date,h.name+'補假','game-observance-v1',h.date);
 }
 const free=d=>weekday(d)<=5&&!holidays.has(d);
 function examPair(anchor,start,end){
  const candidates=datesBetween(start,end).filter(d=>free(d)&&free(addDays(d,1))&&weekday(addDays(d,1))<=5&&addDays(d,1)<=end);
  candidates.sort((a,b)=>Math.abs(Date.parse(a)-Date.parse(anchor))-Math.abs(Date.parse(b)-Date.parse(anchor))||a.localeCompare(b));
  requireCalendar(candidates.length,'COLLISION',`No two consecutive school days near ${anchor}`);return [candidates[0],addDays(candidates[0],1)];
 }
 function finalExam(targetFriday){
  let friday=targetFriday;
  for(let attempt=0;attempt<8;attempt++,friday=addDays(friday,-7)){
   const standard=[-2,-1,0].map(n=>addDays(friday,n));
   if(standard.every(free))return {dates:standard,rule:friday===targetFriday?'wednesday-friday':'prior-legal-week'};
   const interrupted=datesBetween(addDays(friday,-3),friday).filter(free).slice(0,3);
   if(interrupted.length===3)return {dates:interrupted,rule:'tuesday-skip-holiday'};
  }
  requireCalendar(false,'COLLISION',`No legal final examination block near ${targetFriday}`);
 }
 for(const a of ASTRONOMY){
  const y=a.year,springExam=finalExam(onOrBefore(`${y}-06-30`,5)),springFinal=springExam.dates.at(-1);
  const summerStart=onOrAfter(addDays(springFinal,1),1),summerCamp=addDays(summerStart,21),autumnStart=addDays(summerStart,56);
  requireCalendar(free(autumnStart),'COLLISION',`Autumn Monday holiday ${autumnStart}`);
  const winterExam=finalExam(onOrBefore(`${y}-01-23`,5)),winterFinal=winterExam.dates.at(-1);
  const primary=onOrAfter(addDays(winterFinal,1),1),newYearEnd=addDays(a.cny,4);
  const cnyConflict=datesBetween(primary,addDays(primary,4)).some(d=>d>=addDays(a.cny,-2)&&d<=newYearEnd);
  let springStart=onOrAfter([`${y}-02-08`,addDays(newYearEnd,1),addDays(winterFinal,10)].sort().at(-1),1);
  let winterCamp=primary;
  if(cnyConflict){
   while(!free(springStart)||!datesBetween(addDays(springStart,-7),addDays(springStart,-3)).every(d=>free(d)&&!(d>=addDays(a.cny,-1)&&d<=newYearEnd)))springStart=addDays(springStart,7);
   winterCamp=addDays(springStart,-7);
  }else while(!free(springStart)||springStart<=addDays(winterCamp,4))springStart=addDays(springStart,7);
  const previousAutumn=years.at(-1)?.autumnStart??onOrAfter(`${y-1}-08-24`,1);
  const terms=[{id:`${y-1}:autumn`,academicYear:y-1,kind:'autumn',start:previousAutumn,end:winterFinal,finalExamRule:winterExam.rule},{id:`${y}:spring`,academicYear:y-1,kind:'spring',start:springStart,end:springFinal,finalExamRule:springExam.rule}];
  for(const term of terms){
   const count=Math.floor((Date.parse(term.end)-Date.parse(term.start))/604800000)+1;
   const anchor1=addDays(term.start,(Math.max(1,Math.round(count*7/(term.kind==='autumn'?21:20)))-1)*7);
   const anchor2=addDays(term.start,(Math.max(2,Math.round(count*(term.kind==='autumn'?14:13)/(term.kind==='autumn'?21:20)))-1)*7);
   term.exams=[examPair(anchor1,addDays(term.start,21),addDays(term.end,-28)),examPair(anchor2,addDays(term.start,49),addDays(term.end,-14)),(term.kind==='autumn'?winterExam:springExam).dates];
   term.weeks=count;
  }
  years.push({year:y,cny:a.cny,winterFinal,winterCamp,winterCampMoved:cnyConflict,springStart,springFinal,summerStart,summerCamp,summerCampEnd:addDays(summerCamp,27),autumnStart,terms,activities:[]});
 }
 const last=years.at(-1),tailStart=last.autumnStart;
 last.terms.push({id:'2065:autumn',academicYear:2065,kind:'autumn',start:tailStart,end:LAST_DATE,truncated:true,weeks:null,exams:[examPair(addDays(tailStart,42),addDays(tailStart,21),addDays(tailStart,70)),examPair(addDays(tailStart,91),addDays(tailStart,70),addDays(tailStart,105)),[]]});
 // Activities are compiled per semester/grade; unspecified weekdays are yearly solver choices, not new fixed rules.
 function addActivity(year,term,kind,grades,date,slots,rule){
  if(date<FIRST_DATE||date>LAST_DATE)return;
  const originalDate=date;
  if(kind==='parents'){
   while(holidays.has(date)&&date<=term.end)date=addDays(date,7);
   if(date>term.end){conflicts.push({code:'PARENTS_HOLIDAY',date,rule});return;}
  }else if(holidays.has(date)){
   do{date=addDays(date,-1);}while(weekMonday(date)===weekMonday(originalDate)&&(holidays.has(date)||weekday(date)>5));
   if(weekMonday(date)!==weekMonday(originalDate)){conflicts.push({code:'ACTIVITY_WEEK_EXHAUSTED',date:originalDate,rule});return;}
  }
  const entry={id:`${term?.id??year.year}:${kind}:${grades.join('')}`,kind,grades,date,slots,rule,originalDate};
  if(holidays.has(date)){
   conflicts.push({code:'ACTIVITY_HOLIDAY',activityId:entry.id,date,holiday:holidays.get(date).map(h=>h.name),rule});return;
  }
  const overlaps=year.activities.filter(a=>a.date===date&&a.grades.some(g=>grades.includes(g))&&a.slots.some(s=>slots.includes(s)||s==='all'||slots.includes('all')));
  if(overlaps.length){conflicts.push({code:'ACTIVITY_COLLISION',activityId:entry.id,date,other:overlaps.map(a=>a.id),rule});return;}
  year.activities.push(entry);
 }
 for(const year of years){
  for(const term of year.terms){
   const [first,second]=term.exams;
   const secondWeek=weekMonday(second[0]),firstWeek=weekMonday(first[0]);
   const legal=d=>d>=term.start&&d<=term.end&&free(d)&&!term.exams.flat().includes(d);
   const choose=(candidates,grades,slots)=>candidates.find(d=>legal(d)&&!year.activities.some(a=>a.date===d&&a.grades.some(g=>grades.includes(g))&&a.slots.some(s=>s==='all'||slots.includes(s)||slots.includes('all'))));
   const all=[1,2,3];
   addActivity(year,term,'parents',all,addDays(term.start,12),['morning'],'second-saturday');
   if(term.kind==='autumn'){
    addActivity(year,term,'anniversary',[1,2],addDays(secondWeek,12),['all'],'second-exam-next-week-saturday');
    const compensatory=addDays(secondWeek,14);put(compensatory,'校慶補假','school-activity-v1');
    addActivity(year,term,'class-song',[1],addDays(secondWeek,-10),['p6','p7'],'second-exam-minus-two-weeks-friday');
    addActivity(year,term,'english-song',[2],addDays(secondWeek,-10),['p6','p7'],'second-exam-minus-two-weeks-friday');
   }else{
    addActivity(year,term,'sports',all,onOrAfter(addDays(first.at(-1),1),5),['all'],'friday-after-first-exam');
    addActivity(year,term,'fair',all,addDays(secondWeek,11),['all'],'second-exam-next-week-friday');
    // Preserve three consecutive non-holiday weekdays within the second exam week.
    const trip=datesBetween(secondWeek,addDays(secondWeek,2)).reverse().find(d=>[0,1,2].every(n=>legal(addDays(d,n))||term.exams[1].includes(addDays(d,n)))&&[0,1,2].every(n=>free(addDays(d,n))));
    if(trip){
     const early=examPair(addDays(trip,-2),addDays(term.start,35),addDays(trip,-1));term.grade2SecondExam=early;
     for(let n=0;n<3;n++)addActivity(year,term,'graduation-trip-'+(n+1),[2],addDays(trip,n),['all'],'three-weekdays-after-grade2-early-exam');
    }else conflicts.push({code:'TRIP_WEEK',term:term.id,week:secondWeek});
    const graduation=choose(datesBetween(`${year.year}-06-01`,`${year.year}-06-10`),[3],['all']);
    if(graduation)addActivity(year,term,'graduation',[3],graduation,['all'],'early-june');else conflicts.push({code:'GRADUATION',term:term.id});
    for(const g of [1,2]){
     const d=choose(datesBetween(addDays(firstWeek,-14),addDays(firstWeek,-10)),[g],['p6','p7']);
     if(d)addActivity(year,term,'university-fair',[g],d,['p6','p7'],'first-exam-minus-two-weeks-variable-weekday');else conflicts.push({code:'UNIVERSITY_FAIR',term:term.id,grade:g});
    }
    const japan=choose(datesBetween(addDays(firstWeek,7),addDays(firstWeek,11)),[1],['all']);
    if(japan)addActivity(year,term,'japan-visit',[1],japan,['all'],'first-exam-next-week-variable-weekday');else conflicts.push({code:'JAPAN_VISIT',term:term.id});
   }
   // Grade 2 spring graduation trip replaces the semester's ordinary field trip.
   for(const g of (term.kind==='spring'?[1]:[1,2])){
    const choices=datesBetween(addDays(secondWeek,7),addDays(term.end,-7)).filter(d=>weekday(d)===5);
    const travel=choose(choices,[g],['all']);if(travel)addActivity(year,term,'field-trip',[g],travel,['all'],'after-second-exam-friday');else conflicts.push({code:'FIELD_TRIP',term:term.id,grade:g});
   }
   const club=term.truncated?null:choose(datesBetween(addDays(term.end,-21),addDays(term.end,-3)).filter(d=>weekday(d)===5&&((Math.floor((Date.parse(d)-Date.parse(term.start))/604800000)+1)%2===0)),all,['p6','p7']);
   if(club)addActivity(year,term,'clubs',all,club,['p6','p7'],'pre-final-even-week-friday');else if(!term.truncated)conflicts.push({code:'CLUBS',term:term.id});
  }
  const autumn=years.find(y=>y.year===year.year+1)?.terms[0]??{id:`${year.year}:autumn`};
  addActivity(year,autumn,'teachers-day',[1,2,3],addDays(weekMonday(`${year.year}-09-28`),3),['p6','p7'],'teachers-day-week-thursday');
  const halloween=datesBetween(weekMonday(`${year.year}-10-31`),addDays(weekMonday(`${year.year}-10-31`),4)).find(d=>free(d)&&!year.activities.some(a=>a.date===d));
  if(halloween)addActivity(year,autumn,'halloween',[1,2,3],halloween,['p6','p7'],'halloween-week-variable-weekday');else conflicts.push({code:'HALLOWEEN',year:year.year});
  addActivity(year,autumn,'christmas',[1,2,3],onOrBefore(addDays(`${year.year}-12-25`,-1),4),['private'],'thursday-evening-before-christmas');
 }
 return {version:CALENDAR_VERSION,range:[FIRST_DATE,LAST_DATE],provenance:{law:'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020095',astronomy:'https://www.hko.gov.hk/tc/gts/time/calendar/text/',policy:'game-world freeze of 2025 statute; future observances NOT government announcements',schoolAnchors:'June final week; interrupted finals start Tuesday and skip holidays; eight summer weeks; last legal Friday on/before Jan23; spring Monday after lunar Jan5 and Feb8'},years,holidays:[...holidays].sort(([a],[b])=>a.localeCompare(b)),conflicts};
}
