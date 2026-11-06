/** One read-only controller over existing transactions; no clock, scores or results. */
import { createId } from '../contracts/foundation.js';
import { calendarDay,gradeAt,nextPosition,teachingTerm,yearData,planMode } from '../calendar/calendar.js';
import { schoolCatalogue } from '../world/registry.js';
import { SUBJECT_LOAD } from '../calendar/timetable.js';
import { schoolActions,schoolEnabled } from './campus.js';
import { pendingSemesterReview } from './reviews.js';
import { annualResult } from './annual.js';
import { failureResult } from './homeroom.js';
import { careerResult } from './career.js';
import { readStory,storyContent } from './story.js';
import { nextAftercareOperation,activeAftercareWeek } from './aftercare.js';
import { aftercareWindow,retiredAftercareReservation } from './aftercare-calendar.js';
import { entranceCatalogue,aftercareCatalogue } from './story-content.js';
export function progressionContext(w){
 const r=w.extensions['teacher-hell/world'],n=w.numeric.evolution.world,selected=r.history.filter(h=>h.type==='event-selection').flatMap(h=>h.data.selected),selectedIds=new Set(selected.map(s=>s.eventId)),states=new Map(r.history.filter(h=>h.type==='story').map(h=>[h.eventId,h.data.state]));
 return {identity:{...w.identity},position:{...w.position},revision:r.revision,plan:structuredClone(r.plan),actions:schoolActions(w),pendingReview:pendingSemesterReview(w)?.id??null,failed:!!failureResult(w),completed:!!careerResult(w),annualSettled:!!annualResult(w),schoolEnabled:schoolEnabled(w),academicYear:n.registry?.academicYear??null,homeClassId:n.registry?.homeClassId??null,classes:n.registry?schoolCatalogue(n,Object.keys(SUBJECT_LOAD)):[],catalogueIds:r.history.filter(h=>h.type==='event-catalogue').map(h=>h.data.catalogueId),
 dayDrawn:r.history.some(h=>h.type==='event-selection'&&h.at.date===w.position.date),slotComplete:r.history.some(h=>h.type==='slot-complete'&&h.cursor===r.plan.cursor),reserved:selected.filter(s=>s.date===w.position.date&&s.slotId===w.position.slotId&&!retiredAftercareReservation(w,s.eventId)&&!w.events.some(e=>e.id===s.eventId)).map(s=>structuredClone(s)),stories:w.events.filter(e=>selectedIds.has(e.id)&&storyContent(w,e.id)&&states.get(e.id)?.mode!=='ended').map(e=>structuredClone(readStory(w,e.id))),aftercare:aftercareWindow(w)&&w.position.date>=aftercareWindow(w).startDate?{...nextAftercareOperation(w),activeWeek:!!activeAftercareWeek(w)}:null};
}
export function planProgression(c,{activity=null}={}){
 const request=(operations,kind='routine')=>({status:'action',request:{id:createId('operation',[c.identity.attemptId,'progression',String(c.revision)]),attemptId:c.identity.attemptId,expectedRevision:c.revision,actorId:c.identity.playerId,preconditions:[],calendarContext:{kind},operations}});
 if(c.completed)return {status:'completed'};
 if(c.failed)return {status:'failed'};
 if(c.pendingReview)return {status:'review-required',reviewId:c.pendingReview};
 const day=calendarDay(c.position.date,gradeAt(c.position.date,c.plan.startYear),c.plan.calendarVersion);
 if(c.reserved.length)return {...request([{type:'admit-event',eventId:c.reserved[0].eventId}],'formal-event'),label:'處理待辦事件'};
 const story=c.stories.find(s=>!s.waiting||s.canResume);if(story)return {status:'attention-required',eventId:story.eventId};
 if(!c.annualSettled&&day.annualBoundary&&day.slots.at(-1).id===c.position.slotId&&c.slotComplete)return {...request([{type:'settle-school-year'}]),label:planMode(c.plan)==='three-year'&&c.position.serviceYear===3?'完成三年任期結算':'完成本學年結算',settlement:true};
 if(!c.schoolEnabled)return {...request([{type:'academic',action:'open'}]),label:'開始今日校務'};
 if(c.aftercare){
  if(c.aftercare.status==='boundary')return {status:'boundary',label:'等待六月結算'};
  if(!c.catalogueIds.includes('aftercare:representatives-v1'))return {...request([aftercareCatalogue()]),label:'接續六月善後'};
  if(c.aftercare.status==='advance')return {status:'action',request:c.aftercare.request,label:c.aftercare.activeWeek?'繼續本週善後':'推進一週善後',weekly:true};
  return {status:'attention-required',label:'請先處理待辦事件'};
 }
 if(!c.catalogueIds.includes('entrance:guidance-v1'))return {...request([entranceCatalogue()]),label:'接續校園日常'};
 if(!c.dayDrawn)return {...request([{type:'draw-events',catalogueId:'entrance:guidance-v1'}],'formal-event'),label:'查看今日進展'};
 const next=nextPosition(c.position,c.plan.startYear,planMode(c.plan),c.plan.calendarVersion),term=teachingTerm(next.date);
 if(next.date===yearData(Number(next.date.slice(0,4))).summerCamp&&next.slotId==='early'&&c.academicYear<Number(next.date.slice(0,4))){
  if(!c.slotComplete)return {...request([{type:'campus',activity:'rest'},{type:'finish-slot',completedActivityIds:[]}]),label:'完成今日活動'};
  return {...request([{type:'transition-school-year'}]),label:'接續下一學年'};
 }
 if(term&&!c.plan.tables.some(t=>t.semesterId===term.id))return {...request([{type:'prepare-semester',semesterId:term.id,classes:c.classes,homeClassId:c.homeClassId}]),label:'確認新學期課表'};
 if(c.slotComplete)return {...request([{type:'advance-time',planId:c.plan.id,steps:1}]),label:'繼續日程'};
 if(activity!==null&&!c.actions.includes(activity))throw new RangeError('Unavailable routine activity');
 const chosen=activity??['automatic','rest','routine','supervise','class-talk','prepare','private-life'].find(a=>c.actions.includes(a));
 if(!chosen)return {status:'attention-required',label:'請先處理待辦'};
 return {...request([{type:'school-action',activity:chosen}]),label:chosen==='automatic'?'繼續活動／課程':'完成日常活動',activities:c.actions};
}
export const nextProgression=(w,options)=>planProgression(progressionContext(w),options);
