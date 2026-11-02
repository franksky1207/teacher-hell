/** Engineering-only definitions: no official story coverage claim. */
import { foundationScenario } from './scenarios.js';
import { startSchoolCareer } from '../../src/runtime/transactions.js';
import { runtimeOf, restoreWorldState } from '../../src/runtime/model.js';
import { generateTimetable } from '../../src/calendar/timetable.js';
import { positionFor,cursorFor,latestPreparedSemester } from '../../src/calendar/calendar.js';
import { startEvolution } from '../../src/evolution/time.js';
import { startSettlement } from '../../src/changes/settlement.js';
export function eventWorld(seed=74,date=null,slot=null){
 const f=foundationScenario(seed);f.events=[];f.enrollments=[];
 const w=startSchoolCareer(f,{startYear:2026,subject:'國文',seed:75});
 if(date){
 const plan=runtimeOf(w).plan,latest=latestPreparedSemester(date),last=(latest.academicYear-2026)*2+(latest.id.endsWith(':spring')?1:0);
 for(let i=1;i<=last;i++){
  const academicYear=2026+Math.floor(i/2),semesterId=`${2026+Math.ceil(i/2)}:${i%2?'spring':'autumn'}`;
  const classes=Object.values(w.numeric.evolution.world.registry.classes).filter(c=>academicYear-c.cohortStart<=2).map(c=>({id:c.id,cohortStart:c.cohortStart,subjects:['國文']}));
  const generated=generateTimetable({subject:'國文',academicYear,semesterId,classes,homeClassId:w.numeric.evolution.world.registry.homeClassId,previous:plan.tables.at(-1),random:w.random.schedule});
  plan.tables.push(generated.table);w.random.schedule=generated.random;
 }
 const p=positionFor(date,slot??'early',2026);w.position=p;runtimeOf(w).plan.cursor=cursorFor(date,p.slotId,2026);
 const n=w.numeric.evolution.world;n.player.year=p.serviceYear;w.numeric=startSettlement(startEvolution(n,{seed:44,date,schoolYearId:p.schoolYearId,openingId:p.openingId}),{seed:45,attemptId:w.identity.attemptId});}
 return restoreWorldState(w);
}
export function definition(id='test:one',overrides={}){
 return {id,topicId:'E01-01',type:'direct',content:{status:'engineering-test',version:'engineering-v1',resourceId:'test-only:'+id},
 coreCodes:['1-2','1-3','1-4'],additionalCodes:['3-1','3-2','3-3'],weights:Array(6).fill(1/6),directions:Array(6).fill(1),
 eligibility:{people:['student'],dayKinds:[],slotIds:[],from:null,until:null,facts:[],history:[],numeric:[],enrollment:null},
 repetition:{cooldownDays:2,exclusionGroups:[],sameFact:true,reason:'Engineering-only two-day repeat spacing'},...overrides};
}
export const binding=d=>({definitionId:d.id,sources:Array(6).fill('participant'),valence:'neutral'});
export const draw=(definitions=[definition()])=>({type:'draw-events',definitions,bindings:definitions.map(binding),engineering:true});
