/** Date-isolated six-term academic fixture. No natural three-year gameplay claim.
 * Marks and credits are produced by real academic operations; no score injection. */
import {eventWorld} from './event-fixtures.js';
import {request} from './runtime.js';
import {runtimeOf,restoreWorldState} from '../../src/runtime/model.js';
import {prepareWorldOperation,prepareWorldSequence} from '../../src/runtime/transactions.js';
import {academicState} from '../../src/runtime/academics.js';
import {calendarDay,gradeAt,positionFor,cursorFor,latestPreparedSemester,semester,THREE_YEAR} from '../../src/calendar/calendar.js';
import {generateTimetable} from '../../src/calendar/timetable.js';
import {schoolCatalogue,applySchoolOperation} from '../../src/world/registry.js';
export function academicApply(w,ops,tag='h2'){return prepareWorldOperation(w,{...request(w,tag+'-'+runtimeOf(w).revision,ops),calendarContext:{kind:'routine'}}).world;}
export function academicAt(w,date,slot=null){
 w=structuredClone(w);const p=runtimeOf(w).plan,n=w.numeric.evolution.world,latest=latestPreparedSemester(date);
 for(let y=n.registry.academicYear+1;y<=latest.academicYear;y++)applySchoolOperation(n,{type:'school-year',academicYear:y},`${y}-07-23`);
 const count=(latest.academicYear-2026)*2+(latest.id.endsWith('spring')?2:1);
 while(p.tables.length<count){const i=p.tables.length,academicYear=2026+Math.floor(i/2),semesterId=`${2026+Math.ceil(i/2)}:${i%2?'spring':'autumn'}`,generated=generateTimetable({subject:p.subject,academicYear,semesterId,classes:schoolCatalogue(n,['國文']),homeClassId:n.registry.homeClassId,previous:p.tables.at(-1),random:w.random.schedule});p.tables.push(generated.table);w.random.schedule=generated.random;}
 const day=calendarDay(date,gradeAt(date,p.startYear),p.calendarVersion);w.position=positionFor(date,slot??day.slots[0].id,p.startYear,THREE_YEAR,p.calendarVersion);p.cursor=cursorFor(date,w.position.slotId,p.startYear,p.calendarVersion);n.player.year=w.position.serviceYear;
 Object.assign(w.numeric.evolution.clock,{date,lastNaturalDate:null,schoolYearId:w.position.schoolYearId,openingId:w.position.openingId});return restoreWorldState(w);
}
let cached;
export function fiveTerms(){
 if(cached)return structuredClone(cached);
 let w=eventWorld(74,null,null,{version:1,mode:THREE_YEAR,difficulty:'hard'});
 for(const termId of ['2026:autumn','2027:spring','2027:autumn','2028:spring','2028:autumn']){
  const meta=semester(termId);w=academicAt(w,meta.start);w=academicApply(w,[{type:'academic',action:'open',termId}]);
  for(const round of [1,2,3,0]){w=academicAt(w,meta.exams[round===0?2:round-1].at(-1),'private');w=academicApply(w,[{type:'academic',action:'assess',termId,round}]);}
  w=academicApply(w,[{type:'academic',action:'close',termId}]);
 }
 cached=w;return structuredClone(w);
}
export function seniorMarks(){let w=academicAt(fiveTerms(),'2029-02-19');w=academicApply(w,[{type:'academic',action:'open'}]);w=academicAt(w,'2029-04-06','p8');w=academicApply(w,[{type:'academic',action:'assess',round:1}]);w=academicAt(w,'2029-05-08','p8');return academicApply(w,[{type:'school-action',activity:'automatic'}]);}
/** Execute every legal slot from May 8 to May 31 using the existing draft owner. */
export function throughMay(w,{stopBeforeReview=false}={}){return prepareWorldSequence(w,c=>{
 if(c.position.date>'2029-05-31'||stopBeforeReview&&c.position.date==='2029-05-31'&&c.position.slotId==='private')return null;
 if(c.slotComplete)return {...request({identity:c.identity,extensions:{'teacher-hell/world':{revision:c.revision}}},'h2-may-'+c.revision,[{type:'advance-time',planId:c.plan.id,steps:1}]),calendarContext:{kind:'routine'}};
 const activity=['automatic','rest','prepare','routine','supervise'].find(a=>c.actions.includes(a));
 return {...request({identity:c.identity,extensions:{'teacher-hell/world':{revision:c.revision}}},'h2-may-'+c.revision,[{type:'school-action',activity}]),calendarContext:{kind:'routine'}};
}).world;}
