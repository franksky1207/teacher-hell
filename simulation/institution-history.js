/** Synthetic journal durability. Not the batch-11 school-year/cohort/gameplay controller. */
import { performance } from 'node:perf_hooks';
import { writeFile,mkdir } from 'node:fs/promises';
import { procedureWorld,executeProcedure,openProcedure,offices,sourceFact } from '../test/support/procedure-scenario.js';
import { startWorld,prepareWorldOperation } from '../src/runtime/transactions.js';
import { runtimeOf } from '../src/runtime/model.js';
import { institutionState } from '../src/runtime/procedures.js';
import { datesBetween } from '../src/calendar/civil.js';
import { createSave,encodeSave,restoreSave } from '../src/storage/format.js';
import { request } from '../test/support/runtime.js';
const started=performance.now(),baseline=procedureWorld(),f=structuredClone(baseline);delete f.extensions['teacher-hell/world'];
const positions=datesBetween('2026-07-20','2055-07-20').map(date=>{const y=Number(date.slice(0,4))-(date.slice(5)<'07-20'?1:0),serviceYear=y-2026+1;return {date,slotId:'morning',serviceYear,schoolYearId:'synthetic-year:'+y,openingId:'synthetic-opening:'+y,statisticsPeriodId:'synthetic-period:'+y};});
f.position=positions[0];Object.assign(f.numeric.evolution.clock,{date:f.position.date,schoolYearId:f.position.schoolYearId,openingId:f.position.openingId,lastNaturalDate:null});
let w=startWorld(f,{id:'synthetic-procedure-durability',validation:'unverified',positions});
for(let i=0;i<12;i++){w=executeProcedure(w,{action:'duty-offer',id:'durable-duty:'+i,personId:w.identity.playerId,kind:'project',description:'合成多年專案'+i,until:'2056-06-30',endCondition:'人工驗收或交接',mandatory:false}).world;w=executeProcedure(w,{action:'duty-response',id:'durable-duty:'+i,response:'accept'},w.identity.playerId).world;}
const measures=[];
for(let year=2026;year<=2055;year++){
 // Explicit synthetic baseline: no assertion that skipped years of teaching/NPC life were played.
 const date=year+'-07-20',cursor=positions.findIndex(p=>p.date===date);runtimeOf(w).plan.cursor=cursor;w.position=structuredClone(positions[cursor]);w.numeric.evolution.world.player.year=w.position.serviceYear;Object.assign(w.numeric.evolution.clock,{date,schoolYearId:w.position.schoolYearId,openingId:w.position.openingId,lastNaturalDate:null});
 if(year===2030){const departed=w.numeric.evolution.world.classroom.studentIds.slice(0,2),source=sourceFact(w,{type:'synthetic-sourced-transfer'},[w.identity.playerId,...departed],[offices(w,1)[0]]);w=source.world;w=prepareWorldOperation(w,{...request(w,'synthetic-former-pupils',departed.map(personId=>({type:'school',basisFactId:source.fact.id,change:{type:'school-leave',personId,status:'transferred-out',reason:'合成跨年轉學來源'}}))),calendarContext:{kind:'procedure'}}).world;}
 const out=openProcedure(w,['bullying','gender','counselling'][year%3],'durability-'+year);w=out.world;
 if(year%3===0){const current=institutionState(w).cases.find(c=>c.id===out.caseId),handlerId=offices(w,3)[1];if(current.handlerRoles.includes(3))w=executeProcedure(w,{action:'handover',caseId:current.id,handlerId}).world;}
 const begin=performance.now(),json=encodeSave(createSave(w)),encodeMs=performance.now()-begin,readStart=performance.now(),saved=restoreSave(json);if(JSON.stringify(saved.world)!==JSON.stringify(w))throw Error('synthetic history restore differs');
 measures.push({year,bytes:new TextEncoder().encode(json).length,encodeMs,restoreMs:performance.now()-readStart,cases:institutionState(w).cases.length,history:runtimeOf(w).history.length});
}
const report={kind:'synthetic-30-year-procedure-journal-not-gameplay',seed:74,years:30,syntheticTimeline:true,schoolCohortsSimulated:false,playerAnnualVerdicts:false,actualWorldTransactions:runtimeOf(w).commits.length,parallelCases:institutionState(w).cases.length,multiyearDuties:institutionState(w).duties.length,formerPupils:w.numeric.evolution.world.registry.enrollments.filter(e=>e.until!==null).length,retainedPeople:Object.keys(w.numeric.evolution.world.people).length,measurements:measures,memory:process.memoryUsage(),elapsedMs:performance.now()-started};
await mkdir('work/procedures',{recursive:true});await writeFile('work/procedures/synthetic-world.json',encodeSave(createSave(w))+'\n');await writeFile('work/procedures/synthetic-long.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
