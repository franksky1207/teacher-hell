/** Explicit synthetic school catalogue and late-date baselines. No lifecycle/gameplay claim. */
import { foundationScenario } from './scenarios.js';
import { startCalendarWorld,prepareWorldOperation,startThreeYearSchoolCareer } from '../../src/runtime/transactions.js';
import { runtimeOf,restoreWorldState } from '../../src/runtime/model.js';
import { createRandom } from '../../src/numeric/random.js';
import { startEvolution } from '../../src/evolution/time.js';
import { startSettlement } from '../../src/changes/settlement.js';
import { SUBJECT_LOAD,generateTimetable } from '../../src/calendar/timetable.js';
import { calendarDay,gradeAt,positionFor,cursorFor,teachingTerm,latestPreparedSemester,yearData } from '../../src/calendar/calendar.js';
import { request } from './runtime.js';
export function catalogue(year,homeId=null){return Array.from({length:30},(_,i)=>({id:i%10===0&&year-Math.floor(i/10)===2026&&homeId?homeId:`catalogue:${year-Math.floor(i/10)}:${i%10}`,cohortStart:year-Math.floor(i/10),subjects:Object.keys(SUBJECT_LOAD)}));}
export function calendarWorld(seed=31){const f=foundationScenario(seed);f.events=[];return startCalendarWorld(f,{startYear:2026,subject:'國文',classes:catalogue(2026,f.numeric.evolution.world.classroom.id),homeClassId:f.numeric.evolution.world.classroom.id,seed});}
export function advanceRequest(w,tag='advance'){const p=runtimeOf(w).plan,day=calendarDay(w.position.date,gradeAt(w.position.date,p.startYear)),slot=day.slots.find(s=>s.id===w.position.slotId);return request(w,tag,[{type:'finish-slot',completedActivityIds:slot.activityIds},{type:'advance-time',planId:p.id,steps:1}]);}
export function atDate(date,slotId=null){
 const w=calendarWorld(),p=runtimeOf(w).plan,latest=latestPreparedSemester(date),targetAcademic=latest.academicYear;
 const requiredIndex=(targetAcademic-2026)*2+(latest.id.endsWith(':spring')?1:0);
 let random=w.random.schedule;
 for(let index=1;index<=requiredIndex;index++){
  const academicYear=2026+Math.floor(index/2),semesterId=`${2026+Math.ceil(index/2)}:${index%2?'spring':'autumn'}`,previous=p.tables.at(-1),home=previous.homeClassId,classes=catalogue(academicYear,w.numeric.evolution.world.classroom.id);
  // This fixture only spans first cohort. Later lifecycle catalogues have separate pure scheduling tests.
  const table=generateTimetable({subject:p.subject,academicYear,semesterId,previous,classes,homeClassId:home,random});p.tables.push(table.table);random=table.random;
 }
 w.random.schedule=random;const day=calendarDay(date,gradeAt(date,2026)),position=positionFor(date,slotId??day.slots[0].id,2026);w.position=position;p.cursor=cursorFor(date,position.slotId,2026);
 const evolution=startEvolution(w.numeric.evolution.world,{seed:44,date,schoolYearId:position.schoolYearId,openingId:position.openingId});evolution.world.player.year=position.serviceYear;
 w.numeric=startSettlement(evolution,{seed:45,attemptId:w.identity.attemptId});return restoreWorldState(w);
}
export const advance=(w,tag)=>prepareWorldOperation(w,advanceRequest(w,tag)).world;

/** Actual T2 product opening; no invented runtime history or old students. */
export function experiencedOpening(difficulty='easy',seed=75){const f=foundationScenario(74);f.events=[];f.enrollments=[];return startThreeYearSchoolCareer(f,{taipeiDate:'2026-11-05',difficulty,subject:'國文',seed});}
