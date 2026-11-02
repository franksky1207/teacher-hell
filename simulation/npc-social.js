/** Ten-cohort synthetic engineering load. NOT formal 30-year gameplay or Safari. */
import { performance } from 'node:perf_hooks';
import { mkdir,writeFile,readFile } from 'node:fs/promises';
import { initial,longPlan,year,baseline,change,commit,school,n } from '../test/support/school-scenario.js';
import { event,fact,open } from '../test/support/runtime.js';
import { npcApply,npcReport } from '../test/support/npc-scenario.js';
import { compileNpcUpdate,npcWork } from '../src/runtime/autonomy.js';
import { runtimeOf,restoreWorldState } from '../src/runtime/model.js';
import { createSave,encodeSave } from '../src/storage/format.js';
import { evolutionHolders } from '../src/evolution/step.js';
const cached=process.argv.includes('--baseline');
let w=cached?restoreWorldState(JSON.parse(await readFile('work/npc-scale-baseline.json','utf8'))):longPlan(initial());
if(!cached)for(let cohort=0;cohort<9;cohort++){
 const start=2026+cohort*3;
 for(const y of [start+1,start+2])w=year(w,y);
 w=baseline(w,`${start+3}-06-05`);w=change(w,'npc-load-graduate-'+cohort,[{type:'school-graduate',personIds:[...n(w).classroom.studentIds],reason:'synthetic documented qualification'}]);
 w=year(w,start+3);w=commit(w,'npc-load-cohort-'+cohort,[school({type:'school-cohort'})]);
}
if(!cached){
const [a,b]=n(w).classroom.studentIds,e=event(w,'npc-load-peer');e.definitionId='procedure:npc-load';e.participantIds=[a,b];
const conflict=fact(e,'npc-load-conflict',{subjectIds:[a,b],witnessIds:[a,b],categoryCodes:['H01-1']});
const contact=fact(e,'npc-load-contact',{subjectIds:[a,b],witnessIds:[a,b],causeIds:[conflict.id],data:{type:'contact'}});
w=commit(w,'npc-load-context',[open(e),conflict,contact]);
}
await mkdir('work',{recursive:true});await writeFile('work/npc-scale-baseline.json',JSON.stringify(w));
const beforeBytes=Buffer.byteLength(encodeSave(createSave(w))),heap=process.memoryUsage().heapUsed,start=performance.now(),compiled=compileNpcUpdate(w),compileMs=performance.now()-start;
const transaction=performance.now(),next=npcApply(w,[{type:'npc-update'}]),transactionMs=performance.now()-transaction;
const afterBytes=Buffer.byteLength(encodeSave(createSave(next))),report={provenance:'ten synthetic cohort baselines, nine graduated batches plus forty current pupils; not daily 30-year gameplay or Safari',cohorts:n(w).registry.cohorts.length,currentStudents:n(w).classroom.studentIds.length,totalPeople:Object.keys(n(w).people).length,formerStudents:Object.values(n(w).people).filter(p=>p.roleIds.includes(18)).length,dailyNumericHolders:evolutionHolders(n(w)).length,workItems:npcWork(w).length,processed:compiled.decisions.length,compileMs,transactionMs,beforeBytes,afterBytes,growthBytes:afterBytes-beforeBytes,heapBeforeBytes:heap,heapAfterBytes:process.memoryUsage().heapUsed,rssBytes:process.memoryUsage().rss,heapDeltaBytes:process.memoryUsage().heapUsed-heap,restored:npcReport(next).restored,historyRows:runtimeOf(next).history.length};
await mkdir('simulation/results',{recursive:true});await writeFile('simulation/results/npc-social-20261102.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
