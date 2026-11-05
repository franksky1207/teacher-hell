/** Engineering orchestration only; every date/slot/draw/decision runs normal core.
 * No date baselines, skipped routines, injected grades or alternate simulation. */
import { foundationScenario } from './scenarios.js';
import { demoDefinition } from './story-scenario.js';
import { binding } from './event-fixtures.js';
import { ACADEMIC_STORY } from '../../src/runtime/story-content.js';
import { startAnnualSchoolCareer,startFailureSchoolCareer,startThreeYearSchoolCareer,prepareWorldOperation,prepareWorldSequence } from '../../src/runtime/transactions.js';
import { runtimeOf } from '../../src/runtime/model.js';
import { createRandom } from '../../src/numeric/random.js';
import { createId } from '../../src/contracts/foundation.js';
import { calendarDay,gradeAt,nextPosition,teachingTerm,yearData } from '../../src/calendar/calendar.js';

export function annualOpening({seed=74,events=true,continuity=false,difficulty=null,onOpening=()=>{}}={}){
 const f=foundationScenario(seed);f.events=[];f.enrollments=[];f.random.events=createRandom(1).snapshot();
 let w=difficulty===null?(continuity?startFailureSchoolCareer:startAnnualSchoolCareer)(f,{startYear:2026,subject:'國文',seed:75}):startThreeYearSchoolCareer(f,{taipeiDate:'2026-11-05',difficulty,subject:'國文',seed:75});
 onOpening(w);
 const apply=(operations,kind)=>{w=prepareWorldOperation(w,{id:createId('operation',[w.identity.attemptId,'annual-setup',String(runtimeOf(w).revision)]),attemptId:w.identity.attemptId,expectedRevision:runtimeOf(w).revision,actorId:w.identity.playerId,preconditions:[],operations,calendarContext:{kind}}).world;};
 apply([{type:'academic',action:'open',termId:'2026:autumn'}],'routine');
 const d=demoDefinition(ACADEMIC_STORY),person=w.numeric.evolution.world.classroom.studentIds[0];
 d.eligibility.from=w.position.date;d.eligibility.until=w.position.date;
 d.eligibility.numeric=[{source:'participant',code:'1-2',min:w.numeric.evolution.world.people[person].values['1-2'],max:w.numeric.evolution.world.people[person].values['1-2']}];
 apply([{type:'register-event-catalogue',catalogueId:'engineering:annual-core',definitions:events?[d]:[],bindings:events?[binding(d)]:[],engineering:true}],'formal-event');
 return w;
}
export function runAnnual(w,{option='listen',stopDate=null,stopBeforeSettlement=false,stopAtReview=false,catalogueId='engineering:annual-core',continueAfterSuccess=false,stopAtOpening=false,stopBeforeOpening=false,stopBeforeTransition=false,onDate=()=>{},onRequest=()=>{}}={}){
 let lastDate=null;const initialYear=w.position.serviceYear;
 return prepareWorldSequence(w,c=>{
  if(c.failed||(c.annualSettled&&!continueAfterSuccess)||(stopAtOpening&&c.position.serviceYear>initialYear)||stopDate&&c.position.date>stopDate)return null;
  if(lastDate!==c.position.date){lastDate=c.position.date;onDate(lastDate,c.revision);}
  const request=(operations,kind='routine')=>{const q={id:createId('operation',[c.identity.attemptId,'annual-driver',String(c.revision)]),attemptId:c.identity.attemptId,expectedRevision:c.revision,actorId:c.identity.playerId,preconditions:[],operations,calendarContext:{kind}};onRequest(q);return q;};
  if(c.pendingReview)return stopAtReview?null:request([{type:'read-semester-review',reviewId:c.pendingReview}]);
  const day=calendarDay(c.position.date,gradeAt(c.position.date,c.plan.startYear));
  if(!c.annualSettled&&day.annualBoundary&&day.slots.at(-1).id===c.position.slotId&&c.slotComplete)return stopBeforeSettlement?null:request([{type:'settle-school-year'}]);
  if(!c.dayDrawn)return request([{type:'draw-events',catalogueId}],'formal-event');
  if(c.reserved.length)return request([{type:'admit-event',eventId:c.reserved[0].eventId}],'formal-event');
  const story=c.stories.find(s=>!s.waiting||s.canResume);
  if(story){let action,optionId=null;
   if(story.canResume)action='resume';else if(story.canNext)action='next';else if(story.confirmation)action='confirm';else if(story.choices.length){action='select';optionId=(story.choices.find(o=>o.id===option)??story.choices[0]).id;}else if(story.canFinish)action='finish';else throw Error('Unknown story attention');
   return request([{type:'story',eventId:story.eventId,action,optionId}],'formal-event');
  }
  const next=nextPosition(c.position,c.plan.startYear),term=teachingTerm(next.date);
  if(stopBeforeOpening&&next.serviceYear>c.position.serviceYear){if(stopBeforeOpening==='uncompleted')return null;if(c.slotComplete)return null;return request([{type:'campus',activity:'rest'},{type:'finish-slot',completedActivityIds:[]}]);}
  if(next.date===yearData(Number(next.date.slice(0,4))).summerCamp&&next.slotId==='early'&&c.academicYear<Number(next.date.slice(0,4))){if(!c.slotComplete)return request([{type:'campus',activity:'rest'},{type:'finish-slot',completedActivityIds:[]}]);if(stopBeforeTransition)return null;return request([{type:'transition-school-year'}]);}
  if(term&&!c.plan.tables.some(t=>t.semesterId===term.id))return request([{type:'prepare-semester',semesterId:term.id,classes:c.classes,homeClassId:c.homeClassId}]);
  if(c.slotComplete)return request([{type:'advance-time',planId:c.plan.id,steps:1}]);
  const activity=['automatic','class-talk','prepare','supervise','rest','routine'].find(a=>c.actions.includes(a));
  if(!activity)throw Error('No legal routine at '+JSON.stringify(c.position));
  return request([{type:'school-action',activity}]);
 });
}
