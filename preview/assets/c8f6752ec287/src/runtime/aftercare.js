/** Graduation/weekly aftercare contracts over the existing transaction journal. */
import { aftercareWindow,aftercareAdoption,aftercareActive,runtimeCalendarDay,aftercareDefinition } from './aftercare-calendar.js';
import { readSeniorAcademicReview,readAdmissions,withAcademicProjection } from './academics.js';
import { createId } from '../contracts/foundation.js';
import { canonicalData } from '../changes/settlement.js';
import { pendingSchoolEvent } from './campus.js';
const r=w=>w.extensions['teacher-hell/world'];
const need=(x,m)=>{if(!x)throw new RangeError(`AFTERCARE: ${m}`);};
function retiredReservations(w){
 const state=r(w),retired=[];
 for(const h of state.history.filter(h=>h.type==='event-selection')){
  const catalogue=h.data.catalogueId?state.history.find(c=>c.type==='event-catalogue'&&c.data.catalogueId===h.data.catalogueId)?.data:JSON.parse(state.commits.find(c=>c.id===h.operationId&&c.attemptId===h.attemptId).request).operations.find(o=>o.type==='draw-events');
  for(const s of h.data.selected){const d=catalogue?.definitions.find(d=>d.id===s.definitionId),e=d?.eligibility;
   if(s.date>=w.position.date&&!state.history.some(open=>open.type==='stage'&&open.eventId===s.eventId&&open.data.definitionId)&&d&&!aftercareDefinition(d)&&!e.entrance&&!e.academic&&!e.procedure)retired.push(s.eventId);
  }
 }
 return retired;
}
export function adoptionData(w){
 const bounds=aftercareWindow(w);if(!bounds||w.position.date<bounds.startDate||aftercareAdoption(w))return null;
 const ceremony=r(w).facts.find(f=>f.order<=r(w).history.length&&f.data.type==='campus-outcome'&&f.data.graduationSummary);
 return {version:1,...bounds,startDate:w.position.date,startCursor:r(w).plan.cursor,mode:ceremony?'after-ceremony':'late-adoption',ceremonyFactId:ceremony?.id??null,retiredReservationIds:retiredReservations(w),notice:ceremony?'畢典已結束，原班學生離校；教師轉入六月善後。':'由目前日期接續善後；不補演已錯過的畢典，也不改寫先前上課與招生歷史。'};
}
export function activeAftercareWeek(w){const h=r(w).history.findLast(h=>h.type==='aftercare-week-start');return h&&!r(w).history.some(s=>s.type==='aftercare-week-summary'&&s.data.weekId===h.data.weekId)?h:null;}
export function weekStartData(w){
 need(aftercareActive(w),'weekly operation requires an adopted senior aftercare phase');need(!activeAftercareWeek(w),'week already active');
 const day=runtimeCalendarDay(w),weekId=day.segment.id;
 need(!r(w).history.some(h=>h.type==='aftercare-week-summary'&&h.data.weekId===weekId),'week already summarized');
 return {version:1,weekId,startDate:w.position.date,endDate:day.segment.end,startCursor:r(w).plan.cursor,fromOrder:r(w).history.length};
}
export function weekSummary(w,task){
 const history=r(w).history.filter(h=>h.order>task.fromOrder),admissions=readAdmissions(w),review=readSeniorAcademicReview(w,aftercareWindow(w).termId);
 return {...task,sourceOrders:history.filter(h=>['slot-complete','academic','story','institution','campus'].includes(h.type)).map(h=>h.order),academicReviewDate:review?.date??null,admissionsNodes:admissions?.completed??[],pending:admissions?Object.values(admissions.students).flatMap(p=>p.pending??[]):[],pendingRemedies:review?.outcomes.filter(p=>p.pendingRemedies.length).map(p=>({personId:p.personId,remedies:p.pendingRemedies}))??[],summary:history.some(h=>h.type==='slot-complete')?`${['整理班級資料與行政交接','核對個別學生補救及升學待辦','整理必要的學生、家長與行政聯繫','彙整任期末交接資料'][r(w).history.filter(h=>h.type==='aftercare-week-summary').length%4]}。本週完成${history.filter(h=>h.type==='academic'&&h.data.input.action==='entrance').length}項到期招生程序，保留五月資格與未完事項；教師安排休息及私人生活。三年任期仍待六月原結算。`:'接續時目前區間的合法時段已完成，沿用既有紀錄；不補造善後工作或學業成果，仍等待六月原結算。'};
}
/** Call again after resolving the named event. The saved cursor/week are authoritative. */
export function nextAftercareOperation(w){
 if(r(w).history.some(h=>h.type==='career-completion'||h.type==='annual-failure'&&h.data.year===w.position.serviceYear))return {status:'idle'};
 const bounds=aftercareWindow(w);if(!aftercareActive(w)&&(!bounds||w.position.date<bounds.startDate))return {status:'idle'};
 const state=r(w),task=activeAftercareWeek(w),last=state.history.findLast(h=>h.type==='aftercare-week-summary');
 const endDate=aftercareAdoption(w)?.data.endDate??bounds.endDate;
 if(w.position.date===endDate&&(last?.data.endDate===w.position.date||!task&&runtimeCalendarDay(w).slots.at(-1).id===w.position.slotId&&state.history.some(h=>h.type==='slot-complete'&&h.cursor===state.plan.cursor)))return {status:'boundary'};
 if(aftercareActive(w)&&pendingSchoolEvent(w))return {status:'attention-required',date:w.position.date,weekId:task?.data.weekId??null};
 return {status:'advance',request:{id:createId('operation',[w.identity.attemptId,'aftercare-week',String(state.revision)]),attemptId:w.identity.attemptId,expectedRevision:state.revision,actorId:w.identity.playerId,preconditions:[],calendarContext:{kind:'routine'},operations:[{type:'aftercare-week'}]}};
}
export function readAftercare(w){return {version:1,adoption:structuredClone(aftercareAdoption(w)?.data??null),activeWeek:structuredClone(activeAftercareWeek(w)?.data??null),weeks:r(w).history.filter(h=>h.type==='aftercare-week-summary').map(h=>structuredClone(h.data)),next:nextAftercareOperation(w)};}
/** Verify the additive protocol without retroactively interpreting pre-H4 history. */
export function validateAftercareHistory(w){
 const state=r(w),adoptions=state.history.filter(h=>h.type==='aftercare-adoption');need(adoptions.length<=1,'duplicate adoption');if(!adoptions.length){need(!state.history.some(h=>h.type.startsWith('aftercare-')),'missing adoption');return;}
 const a=adoptions[0],prefix={...w,position:{...w.position,...a.at},extensions:{...w.extensions,'teacher-hell/world':{...state,plan:{...state.plan,cursor:a.cursor},history:state.history.slice(0,a.order-1)}}};
 need(canonicalData(a.data)===canonicalData(adoptionData(prefix)),'adoption differs from source');
 // One private, forward-only academic replay across the original summary prefixes.
 // Independent validateAcademicHistory still verifies every academic receipt first.
 const projected={...prefix};
 return withAcademicProjection(projected,()=>{
 let task=null;const weeks=new Set();
 for(const h of state.history){
  if(['aftercare-week-start','aftercare-week-summary'].includes(h.type)){const owner=state.commits.find(c=>c.id===h.operationId&&c.attemptId===h.attemptId),ops=JSON.parse(owner.request).operations;need(ops.length===1&&ops[0].type==='aftercare-week','unowned weekly history');}
  if(h.type==='aftercare-week-start'){
   need(h.order>a.order&&!task&&!weeks.has(h.data.weekId),'duplicate/overlapping week');
   const before={...w,position:{...w.position,...h.at},extensions:{...w.extensions,'teacher-hell/world':{...state,plan:{...state.plan,cursor:h.cursor},history:state.history.slice(0,h.order-1)}}};
   need(canonicalData(h.data)===canonicalData(weekStartData(before)),'invalid week interval');task=h.data;
  }else if(h.type==='aftercare-week-summary'){
   need(task&&task.weekId===h.data.weekId&&h.at.date===task.endDate,'summary has no completed week');
   const slots=state.history.filter(x=>x.cursor>=task.startCursor&&x.order<h.order&&x.type==='slot-complete');
   const expected=[];for(let date=task.startDate;date<=task.endDate;date=new Date(Date.parse(date+'T00:00:00Z')+86400000).toISOString().slice(0,10))for(const [index,slot] of runtimeCalendarDay(w,date).slots.entries()){const cursor=Math.floor(Date.parse(date+'T00:00:00Z')/86400000)*32+index;if(cursor>=task.startCursor)expected.push(`${date}/${slot.id}`);}
   need(expected.every(key=>slots.some(x=>`${x.at.date}/${x.at.slotId}`===key)),'summary skips required slots');
   const before={...w,position:{...w.position,...h.at},extensions:{...w.extensions,'teacher-hell/world':{...state,history:state.history.slice(0,h.order-1)}}};
   need(r(before).history.length>=r(projected).history.length,'summary prefixes must advance');
   projected.position=before.position;projected.extensions=before.extensions;
   need(canonicalData(h.data)===canonicalData(weekSummary(projected,task)),'summary differs from journal');weeks.add(task.weekId);task=null;
  }
 }
 });
}
