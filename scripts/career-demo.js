/** Continuous formal 11-D acceptance. Checkpoints are full validated production saves. */
import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {canonicalData} from '../src/changes/settlement.js';
import {createHash} from 'node:crypto';
import {performance} from 'node:perf_hooks';
import {annualOpening,runAnnual} from '../test/support/annual-scenario.js';
import {runtimeOf} from '../src/runtime/model.js';
import {encodeSave,restoreSave,SAVE_KIND} from '../src/storage/format.js';
import {readAnnualResults} from '../src/runtime/annual.js';
import {pendingSemesterReview} from '../src/runtime/reviews.js';
import {prepareWorldOperation} from '../src/runtime/transactions.js';
import {failureRequest} from '../test/support/failure-scenario.js';
import {openProcedure,executeProcedure} from '../test/support/procedure-scenario.js';
import {homeroomCatalogue,PLACEMENT_STORY} from '../src/runtime/story-content.js';
import {institutionState} from '../src/runtime/procedures.js';
import {validateOpeningSnapshot} from '../src/runtime/schedule.js';
const root='work/career';await mkdir(root,{recursive:true});const started=performance.now();
let w,opening,report={provenance:'continuous legal production dates, draws, school actions, reviews, N7 and transactions; fixed seeds, engineering catalogue, no injected success or failure',years:[],openings:[],commands:0};
const resume=process.argv.find(a=>a.startsWith('--resume='))?.slice(9);
if(resume){const source=await readFile(`${root}/${resume}.json`,'utf8');report=JSON.parse(await readFile(`${root}/report.json`,'utf8'));assert.equal(createHash('sha256').update(source).digest('hex'),report.checkpoints[resume]?.sha256,'checkpoint source differs');const payload=restoreSave(source);w=payload.world;opening=payload.opening;}
else w=annualOpening({continuity:true,onOpening:x=>opening=x});
const persist=async tag=>{global.gc?.();report.commands=runtimeOf(w).revision;const at=performance.now(),payload=encodeSave({kind:SAVE_KIND,version:1,world:w,opening}),encodeMs=performance.now()-at,restoreAt=performance.now(),saved=restoreSave(payload),restoreMs=performance.now()-restoreAt;assert.equal(createHash('sha256').update(canonicalData(saved.world)).digest('hex'),createHash('sha256').update(canonicalData(w)).digest('hex'),'canonical save roundtrip differs');await writeFile(`${root}/${tag}.json`,payload);report.checkpoints??={};report.checkpoints[tag]={sha256:createHash('sha256').update(payload).digest('hex'),revision:runtimeOf(w).revision,date:w.position.date};await writeFile(`${root}/report.json`,JSON.stringify(report,null,2));console.log(JSON.stringify({tag,date:w.position.date,year:w.position.serviceYear,saveBytes:Buffer.byteLength(payload),openingBytes:Buffer.byteLength(JSON.stringify(opening)),encodeMs,restoreMs,elapsedMs:performance.now()-started}));global.gc?.();return {saveBytes:Buffer.byteLength(payload),openingBytes:Buffer.byteLength(JSON.stringify(opening)),encodeMs,restoreMs,people:Object.keys(w.numeric.evolution.world.people).length,relationships:Object.keys(w.numeric.evolution.world.relationships).length,enrollments:w.numeric.evolution.world.registry.enrollments.length,archives:runtimeOf(w).numericArchives.length};};
const originalIds=opening.numeric.evolution.world.registry.cohorts[0].initialStudentIds;
while(w.position.serviceYear<=3){
 const year=w.position.serviceYear;
 if(!readAnnualResults(w).some(a=>a.year===year)){
  for(;;){w=runAnnual(w,{stopAtReview:true,onDate:(date,revision)=>{if(date.endsWith('-01'))console.log(JSON.stringify({date,revision,elapsedMs:performance.now()-started,memory:process.memoryUsage()}));}}).world;const review=pendingSemesterReview(w);if(!review)break;w=prepareWorldOperation(w,failureRequest(w,[{type:'read-semester-review',reviewId:review.id}],'routine')).world;if(review.data.periodId.endsWith('autumn'))await persist('review-'+review.data.periodId);}
  assert.equal(readAnnualResults(w).length,year);assert.deepEqual(w.numeric.evolution.world.classroom.studentIds,originalIds);
  report.years.push({year,date:w.position.date,rating:readAnnualResults(w).at(-1).evidence.rating.grade,...await persist(`year-${year}`)});await writeFile(`${root}/report.json`,JSON.stringify(report,null,2));
 }
 if(year===3&&!institutionState(w).duties.some(d=>d.id==='duty:career-continuity')){
  w=prepareWorldOperation(w,failureRequest(w,[{type:'advance-time',planId:runtimeOf(w).plan.id,steps:1}],'routine')).world;
  w=openProcedure(w,'teacher-conduct','career-carry').world;
  w=executeProcedure(w,{action:'duty-offer',id:'duty:career-continuity',personId:w.identity.playerId,kind:'project',description:'跨屆資料交接與既有承諾',until:'2030-12-31',endCondition:'正式交付或校方撤銷',mandatory:false}).world;
  w=executeProcedure(w,{action:'duty-response',id:'duty:career-continuity',response:'accept'},w.identity.playerId).world;
  const catalogue=homeroomCatalogue();catalogue.catalogueId='homeroom:career-placement';catalogue.definitions=catalogue.definitions.filter(d=>d.id===PLACEMENT_STORY.definitionId);catalogue.bindings=catalogue.bindings.filter(b=>b.definitionId===PLACEMENT_STORY.definitionId);w=prepareWorldOperation(w,failureRequest(w,[catalogue])).world;
 }
 if(year===3&&!report.checkpoints['before-cohort']){w=runAnnual(w,{continueAfterSuccess:true,stopBeforeTransition:true,catalogueId:'homeroom:career-placement',option:'negotiate'}).world;await persist('before-cohort');}
 const prior=w,priorPeople=Object.keys(w.numeric.evolution.world.people);
 w=runAnnual(w,{continueAfterSuccess:true,stopAtOpening:true,...(year===3?{catalogueId:'homeroom:career-placement',option:'negotiate'}:{})}).world;opening=w;validateOpeningSnapshot(w);
 assert.equal(w.position.serviceYear,year+1);assert.equal(w.numeric.evolution.world.player.year,year+1);assert.equal(readAnnualResults(w).length,year);
 assert.ok(priorPeople.every(id=>w.numeric.evolution.world.people[id]));assert.deepEqual(readAnnualResults(w),readAnnualResults(prior));
 const n=w.numeric.evolution.world;assert.ok(n.registry.assignments.some(a=>a.personId===w.identity.playerId&&a.roleId===9&&a.classId===n.registry.homeClassId&&a.until===null));
 if(year<3)assert.deepEqual(n.classroom.studentIds,originalIds);else {assert.equal(n.classroom.studentIds.length,40);assert.ok(n.classroom.studentIds.every(id=>!originalIds.includes(id)));assert.equal(n.registry.cohorts.length,2);assert.ok(runtimeOf(w).history.some(h=>h.type==='choice'&&h.data.optionId==='negotiate'));assert.ok(institutionState(w).duties.some(d=>d.id==='duty:career-continuity'&&d.status==='active'));assert.ok(institutionState(w).cases.some(c=>c.id==='case:career-carry'));}
 report.openings=report.openings.filter(o=>o.year!==year+1);report.openings.push({year:year+1,date:w.position.date,cohorts:n.registry.cohorts.length,graduated:n.registry.enrollments.filter(e=>e.status==='graduated').length,delayed:n.registry.enrollments.filter(e=>e.status==='delayed').length,...await persist(`opening-${year+1}`)});await writeFile(`${root}/report.json`,JSON.stringify(report,null,2));
}
console.log('PASS three successful years and fourth-year legal opening');
