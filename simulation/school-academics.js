/** Synthetic 60-semester academic load using production domain formulas, not 30-year gameplay. */
import { performance } from 'node:perf_hooks';
import { mkdir,writeFile } from 'node:fs/promises';
import { createRandom } from '../src/numeric/random.js';
import { emptyAcademics,openTerm,assess,closeTerm,ranking } from '../src/academics/learning.js';
import { completeAcademic } from '../test/support/academic-scenario.js';
import { createSave,encodeSave,restoreSave } from '../src/storage/format.js';
const before=performance.now(),rng=createRandom(202609),state=emptyAcademics(),journal=[];
for(let i=0;i<60;i++){
 const cohort=Math.floor(i/6),grade=Math.floor(i%6/2)+1,year=2026+Math.floor(i/2),termId=`synthetic:${i}`,classCount=8+i%5,home=`cohort:${cohort}:home`,roster=Array.from({length:40},(_,n)=>({id:`enroll:${cohort}:${n}`,personId:`student:${cohort}:${n}`,classId:home})),classes=Array.from({length:classCount},(_,n)=>({id:n===0?home:`other:${i}:${n}`,size:38+n%5}));
 const input={termId,year,grade,roster,classes,offered:null},randomBefore=rng.snapshot();openTerm(state,input,rng);const stages=[];for(const round of [0,1,2,3])stages.push(assess(state,{termId,round,activeIds:roster.map(r=>r.personId)},rng));closeTerm(state,{termId});journal.push({input,randomBefore,stages});
}
const generationMs=performance.now()-before,text=JSON.stringify(state),parseAt=performance.now(),parsed=JSON.parse(text),parseMs=performance.now()-parseAt,rankAt=performance.now(),last=ranking(parsed.terms['synthetic:59']),rankMs=performance.now()-rankAt;
const runtimeAt=performance.now(),world=completeAcademic(74),payload=encodeSave(createSave(world)),restoreAt=performance.now();restoreSave(payload);const restoreMs=performance.now()-restoreAt;
const report={provenance:'synthetic 60-semester domain load; NOT a complete 30-year game or mobile acceptance',semesters:60,cohorts:10,fullStudentIdentities:Object.keys(state.students).length,classesRange:[8,12],lastRankingPopulation:last.length,academicProjectionBytes:Buffer.byteLength(text),assessmentJournalBytes:Buffer.byteLength(JSON.stringify(journal)),generationMs,parseMs,rankMs,productionOneSemester:{bytes:Buffer.byteLength(payload),restoreMs,createAndRestoreMs:performance.now()-runtimeAt},memory:process.memoryUsage()};await mkdir('simulation/results',{recursive:true});await writeFile('simulation/results/school-academics-20261104.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
