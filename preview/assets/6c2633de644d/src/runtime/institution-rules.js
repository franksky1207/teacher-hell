/** Offline institutional resources. Dates refer to verified promulgation, not predicted law. */
import { addDays,dayNumber,weekday,freezeData } from '../calendar/civil.js';
import { calendarDay } from '../calendar/calendar.js';
export const need=(ok,message)=>{if(!ok)throw new RangeError(`PROCEDURE: ${message}`);};
export const PROCEDURE_TYPES=['bullying','gender','teacher-conduct','safety','self-harm','counselling','administrative-review','employment'];
const rule=(body,accept,investigate,appeal,steps)=>({body,accept,investigate,appeal,steps});
const days=n=>({unit:'days',value:n,rollHoliday:true});
const work=n=>({unit:'working-days',value:n,rollHoliday:false});
const months=n=>({unit:'months',value:n,rollHoliday:true});
const profiles={
 bullying:rule('bullying-committee',work(20),months(2),days(30),['accept','panel','investigate','decide','notify','appeal','close','follow-up']),
 gender:rule('gender-committee',days(20),months(2),days(30),['accept','refer','investigate','decide','notify','appeal','close','follow-up']),
 'teacher-conduct':rule('campus-meeting',days(20),months(2),days(30),['accept','panel','investigate','decide','notify','appeal','close','follow-up']),
 safety:rule('student-affairs',null,null,null,['protect','report','refer','close','follow-up']),
 'self-harm':rule('counselling-office',null,null,null,['protect','report','refer','close','follow-up']),
 counselling:rule('counselling-office',null,null,null,['protect','refer','close','follow-up']),
 'administrative-review':rule('competent-authority',null,null,days(30),['accept','investigate','decide','notify','appeal','close']),
 employment:rule('teacher-appeal-panel',null,months(3),days(30),['accept','investigate','decide','notify','appeal','close']),
};
export const INSTITUTION_VERSION='tw-campus-2026-v1';
export const RULE_PROFILES=freezeData(profiles);
export function rulesForProcedure(type,date){
 need(PROCEDURE_TYPES.includes(type),'unknown procedure type');dayNumber(date);need(date>='2026-01-01'&&date<='2065-12-31','unsupported rule date');
 const era=date<'2026-01-14'?'2024-teacher-rules':date<'2026-10-09'?'2026-before-teacher-amendment':'2026-teacher-amendment';
 return {...profiles[type],admission:({bullying:'bullying-review','teacher-conduct':'teacher-admission'})[type]??null,investigator:({bullying:'bullying-panel',gender:'gender-panel','teacher-conduct':'teacher-panel'})[type]??profiles[type].body,id:`${INSTITUTION_VERSION}:${date>='2027-01-01'?'future-frozen:':''}${era}:${type}`,version:1,type,era,
  assumption:date>='2027-01-01'?'frozen-game-world-assumption':null,
  // General review is an engineering case container; only teacher appeals use the statutory 3 months.
  scope:type==='administrative-review'?'engineering-review-no-general-statutory-clock':'representative-statutory-route'};
}
export function workingDay(date){return weekday(date)<=5&&!calendarDay(date,1).holiday.some(h=>!h.grades);}
export function deadline(date,period){
 if(period===null)return null;dayNumber(date);let result=date;
 if(period.unit==='days')result=addDays(date,period.value);
 else if(period.unit==='working-days'){for(let n=0;n<period.value;){result=addDays(result,1);if(workingDay(result))n++;}}
 else if(period.unit==='months'){
  const [y,m,d]=date.split('-').map(Number),first=new Date(Date.UTC(y,m-1+period.value,1)),last=new Date(Date.UTC(first.getUTCFullYear(),first.getUTCMonth()+1,0)).getUTCDate();result=new Date(Date.UTC(first.getUTCFullYear(),first.getUTCMonth(),Math.min(d,last))).toISOString().slice(0,10);
 }else need(false,'unknown period unit');
 if(period.rollHoliday)while(!workingDay(result))result=addDays(result,1);
 return result;
}
export const legalPeriods=freezeData({days,work,months});
export const DUTY_KINDS=freezeData(['subject-convener','school-committee','project','activity-organizer','temporary-assistance']);
export const POLICY_LAYERS=freezeData(['law','school-rule','instruction','practice','deviation']);

/** Projection of existing slots for hour-based obligations; no independently advancing clock. */
export function minuteOfMoment(at){const minutes={early:450,p1:480,p2:540,p3:600,p4:660,lunch:720,noon:750,p5:780,p6:840,p7:900,p8:960,dinner:1020,study1:1080,study2:1140,study3:1200,private:1260,morning:480,afternoon:780,evening:1140,'vacation-day':480,'festival-day':480,'travel-day':480};need(Object.hasOwn(minutes,at.slotId),'hour deadlines require a recognized calendar slot');return dayNumber(at.date)*1440+minutes[at.slotId];}
/** Art.48 Saturday expiry is the following Monday morning, not Monday night. */
export function deadlineMinute(date,period){
 if(period===null)return null;const raw=deadline(date,{...period,rollHoliday:false}),end=deadline(date,period);
 return dayNumber(end)*1440+(period.rollHoliday&&weekday(raw)===6&&weekday(end)===1?720:1439);
}
