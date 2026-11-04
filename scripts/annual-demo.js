import { mkdir,writeFile,readFile } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';
import { annualOpening,runAnnual } from '../test/support/annual-scenario.js';
import { readAnnualResults } from '../src/runtime/annual.js';
import { readSemesterReviews,pendingSemesterReview } from '../src/runtime/reviews.js';
import { runtimeOf } from '../src/runtime/model.js';
import { createSave,encodeSave,restoreSave } from '../src/storage/format.js';
import { canonicalData } from '../src/changes/settlement.js';
import { prepareWorldOperation } from '../src/runtime/transactions.js';
import { request } from '../test/support/runtime.js';
import assert from 'node:assert/strict';
const start=performance.now(),resume=process.argv.includes('--resume');let opening,initial,prior=null;
if(resume){const checkpoint=restoreSave(await readFile('work/annual/checkpoint.json','utf8'));opening=checkpoint.opening;initial=checkpoint.world;prior=JSON.parse(await readFile('work/annual/checkpoint-meta.json','utf8'));}
else initial=annualOpening({events:!process.argv.includes('--zero-events'),onOpening:w=>opening=w});
const partial=process.argv.find(a=>a.startsWith('--until='))?.slice(8)??null;
let current=initial,result,commands=prior?.commands??0;const reviewChecks=prior?.reviewChecks??[];
for(;;){
 result=runAnnual(current,{stopDate:partial,stopAtReview:!partial,stopBeforeSettlement:!partial,onDate:(date,revision)=>{if(date.endsWith('-01'))console.log(JSON.stringify({date,revision,elapsedMs:performance.now()-start}));}});commands+=result.receipts.length;current=result.world;
 const review=pendingSemesterReview(current);if(!review||partial)break;
 const q={...request(current,'read-'+review.id,[{type:'read-semester-review',reviewId:review.id}]),calendarContext:{kind:'routine'}};
 assert.throws(()=>prepareWorldOperation(current,{...request(current,'blocked-'+review.id,[{type:'advance-time',planId:runtimeOf(current).plan.id,steps:1}]),calendarContext:{kind:'routine'}}),/REVIEW_PENDING/);
 const serialized=encodeSave(createSave(current,opening));current=restoreSave(serialized).world;
 const before=current;current=prepareWorldOperation(current,q).world;commands++;
 assert.deepEqual(before.numeric,current.numeric);assert.deepEqual(before.random,current.random);assert.deepEqual(before.position,current.position);assert.equal(prepareWorldOperation(current,q).duplicate,true);
 reviewChecks.push({id:review.id,periodId:review.data.periodId,at:review.at,blockedAdvance:true,savedUnread:true,readReplay:true});console.log(JSON.stringify({review:review.data.periodId,at:review.at,barrier:true,elapsedMs:performance.now()-start}));
 await mkdir('work/annual',{recursive:true});await writeFile('work/annual/checkpoint.json',encodeSave(createSave(current,opening)));await writeFile('work/annual/checkpoint-meta.json',JSON.stringify({commands,reviewChecks}));
}
if(!partial){
 await mkdir('work/annual',{recursive:true});await writeFile('work/annual/before-settlement.json',encodeSave(createSave(result.world,opening)));
 const before=result.world,q={...request(before,'annual-success',[{type:'settle-school-year'}]),calendarContext:{kind:'routine'}};
 const settled=prepareWorldOperation(before,q);assert.deepEqual(settled.world.numeric,before.numeric);assert.deepEqual(settled.world.random,before.random);assert.deepEqual(settled.world.position,before.position);
 assert.equal(prepareWorldOperation(settled.world,q).duplicate,true);assert.throws(()=>prepareWorldOperation(settled.world,{...request(settled.world,'duplicate-annual',[{type:'settle-school-year'}]),calendarContext:{kind:'routine'}}),/already settled/);
 result={world:settled.world};commands++;
 assert.equal(readAnnualResults(result.world).length,1);assert.equal(readSemesterReviews(result.world).length,2);assert.ok(readSemesterReviews(result.world).every(r=>r.status==='read'));
}
const payload=encodeSave(createSave(result.world,opening)),at=performance.now(),restored=restoreSave(payload),restoreMs=performance.now()-at;
if(canonicalData(restored.world)!==canonicalData(result.world))throw Error('Annual save changed on restore');
const report={provenance:'all dates/slots executed with production core; engineering catalogue, no skipped baselines',completedYears:readAnnualResults(result.world).length,position:result.world.position,commands,reviewChecks,elapsedMs:performance.now()-start,saveBytes:Buffer.byteLength(payload),restoreMs,memory:process.memoryUsage(),semesters:readSemesterReviews(result.world),annual:readAnnualResults(result.world)};
await mkdir('work/annual',{recursive:true});await writeFile('work/annual/world.json',payload);await writeFile('work/annual/report.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({...report,annual:report.annual.map(a=>({year:a.year,status:a.status,coverage:a.coverage,rating:a.evidence.rating,comparison:a.comparison}))},null,2));
