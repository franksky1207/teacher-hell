/** Review boundary demonstration only; skipped dates are explicit, never an annual pass. */
import { mkdir,writeFile } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';
import { foundationScenario } from '../test/support/scenarios.js';
import { academicBaseline } from '../test/support/academic-scenario.js';
import { request } from '../test/support/runtime.js';
import { startReviewedSchoolCareer,prepareWorldOperation } from '../src/runtime/transactions.js';
import { readSemesterReviewHistory } from '../src/runtime/views.js';
import { schoolActions } from '../src/runtime/campus.js';
import { runtimeOf } from '../src/runtime/model.js';
import { createSave,encodeSave,restoreSave } from '../src/storage/format.js';
import { semester } from '../src/calendar/calendar.js';
const f=foundationScenario(74);f.events=[];f.enrollments=[];
const opening=startReviewedSchoolCareer(f,{startYear:2026,subject:'國文',seed:75});let w=opening;
const transact=(tag,ops)=>{w=prepareWorldOperation(w,{...request(w,tag,ops),calendarContext:{kind:'routine'}}).world;};
transact('open',[{type:'academic',action:'open',termId:'2026:autumn'}]);
if(process.argv.includes('--routine-day')){
 const date=w.position.date,initialWorldBytes=Buffer.byteLength(JSON.stringify(opening)),transactionTimes=[];
 while(w.position.date===date){const choices=schoolActions(w),activity=['automatic','routine','prepare','supervise','rest'].find(a=>choices.includes(a));if(!activity)throw Error('No legal routine action');const t=performance.now();transact('probe-'+runtimeOf(w).plan.cursor,[{type:'school-action',activity}]);transactionTimes.push({nextSlot:w.position.slotId,ms:performance.now()-t});}
 const payload=encodeSave(createSave(w)),t=performance.now();restoreSave(payload);const restoreMs=performance.now()-t;
 const result={provenance:'one school-day routine mechanics only; no event catalogue/daily draw, no annual success or career run',date,nextPosition:w.position,slots:transactionTimes.length,initialWorldBytes,worldBytes:Buffer.byteLength(JSON.stringify(w)),saveBytes:Buffer.byteLength(payload),history:runtimeOf(w).history.length,events:w.events.length,receipts:w.numeric.receipts.length,transactionTimes,restoreMs,memory:process.memoryUsage()};
 await mkdir('work/reviews',{recursive:true});await writeFile('work/reviews/day-probe.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));process.exit(0);
}

const meta=semester('2026:autumn');
for(const round of [1,2,3,0]){w=academicBaseline(w,meta.exams[round===0?2:round-1].at(-1));transact('assess-'+round,[{type:'academic',action:'assess',termId:meta.id,round}]);}
const before=performance.now();transact('final-action',[{type:'school-action',activity:'rest'}]);const finalActionMs=performance.now()-before;
const saved=encodeSave(createSave(w,opening)),t=performance.now(),restored=restoreSave(saved),restoreMs=performance.now()-t;
if(JSON.stringify(restored.world)!==JSON.stringify(w))throw Error('World restore mismatch');
const report=readSemesterReviewHistory(w)[0];if(!report||report.status!=='unread')throw Error('Missing pending report');
let blocked=false;try{transact('blocked',[{type:'advance-time',planId:runtimeOf(w).plan.id,steps:1}]);}catch(e){blocked=e.code==='REVIEW_PENDING';}if(!blocked)throw Error('Unread report was bypassed');
const prior=JSON.stringify({position:w.position,numeric:w.numeric,random:w.random});
transact('read',[{type:'read-semester-review',reviewId:report.id}]);
if(prior!==JSON.stringify({position:w.position,numeric:w.numeric,random:w.random}))throw Error('Reading mutated time/numeric/random');
const result={provenance:'explicit exam-date boundary fixture; skipped lessons/dates are NOT completed semester gameplay',completedYears:0,completedCareer:false,report:readSemesterReviewHistory(w)[0],unreadBlockedTime:blocked,saveBytes:Buffer.byteLength(saved),worldBytes:Buffer.byteLength(JSON.stringify(w)),restoreMs,finalActionMs,memory:process.memoryUsage()};
await mkdir('work/reviews',{recursive:true});await writeFile('work/reviews/world.json',encodeSave(createSave(w,opening)));await writeFile('work/reviews/report.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
