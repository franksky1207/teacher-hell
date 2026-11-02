/** Shared synthetic lifecycle baselines, not a second world simulator. */
import { runtimeScenario,request,event,fact,open } from './runtime.js';
import { prepareWorldOperation } from '../../src/runtime/transactions.js';
import { restoreWorldState,runtimeOf } from '../../src/runtime/model.js';
import { calendarDay,yearData,positionFor,gradeAt,careerRange } from '../../src/calendar/calendar.js';
import { addDays } from '../../src/calendar/civil.js';
export const n=w=>w.numeric.evolution.world;
export const school=(change,basisFactId=null)=>({type:'school',change,basisFactId});
export function commit(w,tag,ops){return prepareWorldOperation(w,{...request(w,tag,ops),calendarContext:{kind:'procedure'}}).world;}
export function initial(seed=11){let w=runtimeScenario(seed);w.enrollments=[];return commit(w,'initialize',[school({type:'school-initialize',academicYear:2026})]);}
export function cause(w,tag,ids=[w.identity.playerId,...n(w).classroom.studentIds]){
 const e=event(w,tag);e.definitionId='procedure:school';e.participantIds=ids;
 const f=fact(e,tag,{subjectIds:ids,witnessIds:[],categoryCodes:['H01-1']});
 return {world:commit(w,tag,[open(e),f]),id:f.id};
}
export function change(w,tag,changes){const c=cause(w,tag,[w.identity.playerId,...Object.keys(n(w).people)]);return commit(c.world,tag+'-apply',changes.map(x=>school(x,c.id)));}
export const leave=(id,status='transferred-out')=>({type:'school-leave',personId:id,status,reason:'documented enrollment decision'});
export const enter=(classId,personId=null,action='transfer-in')=>({type:'school-enroll',classId,personId,action,source:'documented source school'});

/** Engineering date baselines only: retain identity and history, do not claim daily gameplay. */
export function longPlan(w){
 const positions=[];for(let date=w.position.date;date<=careerRange(2026).end;date=addDays(date,1)){
  const p=date===w.position.date?structuredClone(w.position):positionFor(date,calendarDay(date,gradeAt(date,2026)).slots[0].id,2026);if(p.serviceYear===1){p.schoolYearId=w.position.schoolYearId;p.openingId=w.position.openingId;}if(p.serviceYear<=30)positions.push(p);
 }
 runtimeOf(w).plan={id:'synthetic-school-thirty-year-baselines',validation:'unverified',positions,cursor:0};w.position=structuredClone(positions[0]);
 Object.assign(w.numeric.evolution.clock,{date:w.position.date,schoolYearId:w.position.schoolYearId,openingId:w.position.openingId,lastNaturalDate:null});return restoreWorldState(w);
}
export function baseline(w,date){
 w=structuredClone(w);const p=runtimeOf(w).plan;const cursor=p.positions.findIndex(x=>x.date===date);if(cursor<p.cursor)throw Error('Synthetic baseline cannot move backwards');
 p.cursor=cursor;w.position=structuredClone(p.positions[cursor]);n(w).player.year=w.position.serviceYear;
 Object.assign(w.numeric.evolution.clock,{date,schoolYearId:w.position.schoolYearId,openingId:w.position.openingId,lastNaturalDate:null});return restoreWorldState(w);
}
export function year(w,y){w=baseline(w,yearData(y).summerCamp);return commit(w,'year-'+y,[school({type:'school-year',academicYear:y})]);}

