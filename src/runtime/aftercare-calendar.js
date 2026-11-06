/** H4 is an opt-in runtime phase, not a new calendar version or cursor layout.
 * Historical slots remain addressable for coverage/replay; their classroom use ends. */
import { calendarDay,gradeAt,assessmentCalendar,teachingTerm,SENIOR_CALENDAR_VERSION,THREE_YEAR,planMode } from '../calendar/calendar.js';
import { addDays,dayNumber } from '../calendar/civil.js';
const runtime=w=>w.extensions['teacher-hell/world'];
export function aftercareWindow(w,date=w.position.date){
 const p=runtime(w).plan;if(p.calendarVersion!==SENIOR_CALENDAR_VERSION||planMode(p)!==THREE_YEAR)return null;
 const t=teachingTerm(date);if(!t||t.camp||!t.id.endsWith(':spring')||gradeAt(date,p.startYear)!==3)return null;
 const policy=assessmentCalendar(t.id,3,p.calendarVersion);
 return {termId:t.id,ceremonyDate:policy.ceremonyDate,startDate:addDays(policy.ceremonyDate,1),endDate:policy.teacherTermEnd};
}
export function aftercareAdoption(w){if(runtime(w).plan.calendarVersion!==SENIOR_CALENDAR_VERSION)return null;return runtime(w).history.find(h=>h.type==='aftercare-adoption')??null;}
export function aftercareActive(w,date=w.position.date){const a=aftercareAdoption(w);return !!a&&date>=a.data.startDate&&date<=a.data.endDate;}
export function runtimeCalendarDay(w,date=w.position.date,cursor=null,order=null){
 const p=runtime(w).plan,day=calendarDay(date,gradeAt(date,p.startYear),p.calendarVersion);if(!aftercareActive(w,date)||order!==null&&order<aftercareAdoption(w).order||cursor!==null&&cursor<aftercareAdoption(w).data.startCursor)return day;
 const a=aftercareAdoption(w).data,bucket=Math.floor((dayNumber(date)-dayNumber(a.startDate))/7),start=addDays(a.startDate,bucket*7),end=[addDays(start,6),a.endDate].sort()[0];
 return {...day,kind:'aftercare',activities:[],exam:false,quota:{kind:'aftercare',min:0,max:1},segment:{id:`aftercare:${a.startDate}:${bucket}`,start,end,quota:1},slots:day.slots.map(s=>({...s,period:null,kind:'aftercare',activityIds:[],protected:false}))};
}
export function runtimeSlot(w,date=w.position.date,slotId=w.position.slotId,ordinary=null){
 if(!aftercareActive(w,date))return ordinary;
 const day=runtimeCalendarDay(w,date),index=day.slots.findIndex(s=>s.id===slotId);if(date===aftercareAdoption(w).data.startDate&&index<aftercareAdoption(w).data.startCursor%32)return ordinary;
 const slot=day.slots.find(s=>s.id===slotId);return {...slot,lesson:null,teachingAutomatic:false};
}
/** Explicitly qualified remote/administrative interactions only. */
export function aftercareDefinition(d){return d.eligibility.dayKinds.includes('aftercare')||['crisis','support','social'].includes(d.eligibility.homeroom);}
/** Automatic children remain bound to the weekly command and actual slot evidence. */
export function aftercareOwnsSlot(w,h){
 if(runtime(w).plan.calendarVersion!==SENIOR_CALENDAR_VERSION)return false;
 const state=runtime(w),owner=state.commits.find(c=>c.id===h.operationId&&c.attemptId===h.attemptId),ops=owner?JSON.parse(owner.request).operations:[];
 return ops.length===1&&ops[0].type==='aftercare-week'&&aftercareAdoption(w)?.order<h.order&&state.history.some(s=>s.type==='slot-complete'&&s.operationId===h.operationId&&s.attemptId===h.attemptId&&s.cursor===h.cursor);
}

export function retiredAftercareReservation(w,eventId){return aftercareAdoption(w)?.data.retiredReservationIds?.includes(eventId)??false;}
