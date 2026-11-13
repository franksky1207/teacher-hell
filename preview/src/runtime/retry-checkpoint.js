/** Semester retry authority is independent of autumn annual-observation identity.
 * The save retains one full checkpoint in its existing `opening` field. */
import { planMode,THREE_YEAR,yearData,calendarDay,gradeAt } from '../calendar/calendar.js';
import { isFormal,validateOpeningSnapshot } from './schedule.js';
import { canonicalData } from '../changes/settlement.js';
const runtime=w=>w.extensions['teacher-hell/world'];
const need=(ok,message)=>{if(!ok)throw Object.assign(new RangeError(message),{code:'SNAPSHOT'});};
export const semesterRetry=w=>isFormal(runtime(w).plan)&&planMode(runtime(w).plan)===THREE_YEAR;
export function retrySemester(w){
 const r=runtime(w),date=w.position.date;let key=null;
 for(let i=0;i<3;i++){
  const year=r.plan.startYear+i,summer=yearData(year).summerCamp,winter=yearData(year+1).winterFinal;
  if(date>=summer)key=`${year}:autumn`;
  const read=r.history.some(h=>h.type==='semester-review-read'&&h.at.date===winter);
  if(date>winter||date===winter&&read)key=`${year+1}:spring`;
 }
 need(key,'Outside semester retry range');return key;
}
export function validateRetryCheckpoint(w){
 if(!semesterRetry(w)){validateOpeningSnapshot(w);return;}
 const r=runtime(w),p=w.position,date=p.date,y=yearData(Number(date.slice(0,4))),day=calendarDay(date,gradeAt(date,r.plan.startYear),r.plan.calendarVersion),last=r.commits.at(-1);
 if(date===yearData(r.plan.startYear).summerCamp){validateOpeningSnapshot(w);return;}
 const entries=r.history.filter(h=>h.cursor===r.plan.cursor);
 if(date===y.summerCamp){
  need(p.slotId===day.slots[0].id&&entries.some(h=>h.type==='time')&&entries.every(h=>h.operationId===last?.id),'Capture summer on entry before its first action');
  need(w.numeric.evolution.world.registry.academicYear===Number(date.slice(0,4))&&r.plan.tables.at(-1).semesterId===`${date.slice(0,4)}:autumn`,'Summer requires promoted affiliations and prepared timetable');
  return;
 }
 need(date===y.winterFinal&&p.slotId===day.slots.at(-1).id&&entries.some(h=>h.type==='slot-complete'),'Winter checkpoint follows the completed final slot');
 const review=entries.find(h=>h.type==='semester-review'),read=entries.find(h=>h.type==='semester-review-read'&&h.data.reviewId===review?.id);
 need(review&&read&&read.operationId===last?.id&&JSON.parse(last.request).operations.length===1&&JSON.parse(last.request).operations[0].type==='read-semester-review','Capture winter only after the final review confirmation');
}
export function validateRetryPair(checkpoint,world){
 validateRetryCheckpoint(checkpoint);
 if(!semesterRetry(world)){
  need(checkpoint.position.openingId===world.position.openingId&&checkpoint.position.schoolYearId===world.position.schoolYearId,'Opening belongs to another year');return;
 }
 need(semesterRetry(checkpoint)&&retrySemester(checkpoint)===retrySemester(world),'Checkpoint belongs to another semester');
 const opening=runtime(world).history.slice(runtime(checkpoint).history.length).find(h=>h.type==='academic-opening');
 for(const [key,previous] of [['teacher-hell/annual-observations','previousAnnual'],['teacher-hell/homeroom-continuity','previousHomeroom']]){
  const expected=opening?opening.data[previous]:world.extensions[key];
  need(canonicalData(checkpoint.extensions[key]??null)===canonicalData(expected??null),'Retry baseline differs from annual history');
 }
 // World validators own the autumn baseline chain; prefix equality proves that
 // retained annual evidence is the same actual history, even across autumn.
 for(const field of ['commits','history'])need(runtime(checkpoint)[field].every((h,i)=>canonicalData(h)===canonicalData(runtime(world)[field][i])),'Checkpoint history is not a prefix of this world');
}
export function captureRetryCheckpoint(previous,next,checkpoint){
 if(!semesterRetry(next))return next.position.openingId!==previous.position.openingId;
 if(retrySemester(next)===retrySemester(checkpoint))return false;
 validateRetryCheckpoint(next);return true;
}
