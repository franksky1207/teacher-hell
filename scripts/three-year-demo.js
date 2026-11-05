/** C: continuous real three-year production source. Never alters a date, score,
 * difficulty or success row. Uses the existing 11-D driver, with T1/T2 entry. */
import assert from 'node:assert/strict';
import { mkdir,writeFile,readFile,rename } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { annualOpening,runAnnual } from '../test/support/annual-scenario.js';
import { prepareWorldOperation } from '../src/runtime/transactions.js';
import { runtimeOf } from '../src/runtime/model.js';
import { careerResult } from '../src/runtime/career.js';
import { teacherTenure } from '../src/runtime/schedule.js';
import { request } from '../test/support/runtime.js';
import { encodeSave,restoreSave,SAVE_KIND } from '../src/storage/format.js';
import { sourceFact } from '../test/support/procedure-scenario.js';
import { memorialFromWorld } from '../src/storage/memorial.js';
const difficulty=process.argv.find(a=>a.startsWith('--difficulty='))?.split('=')[1]??'normal';
assert.ok(['easy','normal','hard'].includes(difficulty));
const root=`work/three-year-${difficulty}`,sha=bytes=>createHash('sha256').update(bytes).digest('hex');await mkdir(root,{recursive:true});
const manifest={kind:'T4-continuous-production-source',difficulty,seed:{foundation:74,events:1,schedule:75,background:(75^0x54325032)>>>0},sourceCommit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),driver:'scripts/three-year-demo.js',driverSha256:sha(await readFile('scripts/three-year-demo.js')),command:`node --max-old-space-size=6144 --expose-gc scripts/three-year-demo.js --difficulty=${difficulty}`,node:process.version,arguments:process.argv.slice(2),runId:process.env.GITHUB_RUN_ID??null,files:{},years:[],status:'running'};
const saveManifest=()=>writeFile(`${root}/manifest.json`,JSON.stringify(manifest,null,2)+'\n');
async function persist(name,bytes){await writeFile(`${root}/${name}.partial`,bytes);await rename(`${root}/${name}.partial`,`${root}/${name}`);manifest.files[name]={bytes:Buffer.byteLength(bytes),sha256:sha(bytes)};await saveManifest();}
let opening,w,lastLogged=null;const started=performance.now();
try{
 const resume=process.argv.find(a=>a.startsWith('--resume='))?.slice(9);
 if(resume){const saved=restoreSave(await readFile(resume,'utf8'));w=saved.world;opening=saved.opening;assert.equal(runtimeOf(w).plan.career.difficulty,difficulty);manifest.resumedFrom={path:resume,sha256:sha(await readFile(resume))};}
 else{
  w=annualOpening({difficulty,onOpening:x=>opening=x});
  if(process.argv.includes('--transfers')){
   const student=w.numeric.evolution.world.classroom.studentIds[1],classId=w.numeric.evolution.world.classroom.id;
   const cause=sourceFact(w,{type:'documented-cohort-transfer'},[w.identity.playerId,student]);w=cause.world;
   w=prepareWorldOperation(w,{...request(w,'T4-legal-transfer',[
    {type:'school',basisFactId:cause.fact.id,change:{type:'school-leave',personId:student,status:'transferred-out',reason:cause.fact.id}},
    {type:'school',basisFactId:cause.fact.id,change:{type:'school-enroll',personId:null,classId,action:'transfer-in',source:cause.fact.id}}
   ]),calendarContext:{kind:'procedure'}}).world;
   manifest.transfer={departedStudentId:student,causeFactId:cause.fact.id};
  }
 }
 manifest.calendarVersion=runtimeOf(w).plan.calendarVersion;manifest.career=runtimeOf(w).plan.career;
 const onDate=(date,revision)=>{manifest.lastObserved={date,revision};if(date.endsWith('-01')&&lastLogged!==date){lastLogged=date;console.log(JSON.stringify({date,revision,elapsedMs:performance.now()-started,rss:process.memoryUsage().rss}));}};
 while(w.position.serviceYear<=3&&!careerResult(w)){
  const year=w.position.serviceYear;
  assert.equal(teacherTenure(w),({easy:20,normal:10,hard:1})[difficulty]+year-1);
  w=runAnnual(w,{stopBeforeSettlement:true,onDate}).world;
  if(year===3)await persist('before-completion.json',encodeSave({kind:SAVE_KIND,version:1,world:w,opening}));
  const q={...request(w,`T4-complete-${year}`,[{type:'settle-school-year'}]),calendarContext:{kind:'routine'}};
  const result=prepareWorldOperation(w,q);w=result.world;
  const annual=runtimeOf(w).history.find(h=>h.type==='annual-success'&&h.data.year===year);assert.ok(annual);
  manifest.years.push({year,date:w.position.date,tenure:teacherTenure(w),annualId:annual.id,annualGrade:annual.data.evidence.rating.grade,revision:runtimeOf(w).revision});await saveManifest();
  if(year===3){
   const completion=careerResult(w),archive=runtimeOf(w).history.find(h=>h.type==='cohort-completion');
   assert.equal(completion.data.years,3);assert.equal(completion.operationId,annual.operationId);assert.equal(archive.operationId,annual.operationId);assert.ok(annual.order<archive.order&&archive.order<completion.order);
   assert.equal(w.numeric.evolution.world.classroom.studentIds.length,0);assert.equal(w.numeric.evolution.world.registry.cohorts.length,1);assert.equal(memorialFromWorld(w),null);
   const payload=encodeSave({kind:SAVE_KIND,version:1,world:w,opening});await persist('completed.json',payload);
   // Write the original raw subdocument bytes as well as the complete v1 envelope.
   await persist('world.json',JSON.stringify(w));await persist('opening.json',JSON.stringify(opening));
   const restored=restoreSave(payload);assert.deepEqual(careerResult(restored.world),completion);
   assert.equal(prepareWorldOperation(w,q).duplicate,true);
   assert.throws(()=>prepareWorldOperation(w,{...request(w,'T4-after-completion',[{type:'advance-time',planId:runtimeOf(w).plan.id,steps:1}]),calendarContext:{kind:'routine'}}),{code:'CAREER_COMPLETE'});
   manifest.completion={id:completion.id,grade:completion.data.rating.grade,score:completion.data.rating.score,parts:completion.data.rating.parts,graduated:archive.data.outcomes.filter(o=>o.qualification.eligible).length,delayed:archive.data.outcomes.filter(o=>!o.qualification.eligible).length};break;
  }
  assert.equal(careerResult(w),null);
  w=runAnnual(w,{continueAfterSuccess:true,stopAtOpening:true,onDate}).world;opening=w;
  assert.equal(w.position.serviceYear,year+1);
  await persist('latest-opening.json',encodeSave({kind:SAVE_KIND,version:1,world:w,opening}));
 }
 manifest.status='passed';manifest.elapsedMs=performance.now()-started;await saveManifest();console.log(JSON.stringify(manifest));
}catch(error){manifest.status='failed';manifest.error={message:error.message,stack:error.stack};manifest.elapsedMs=performance.now()-started;await saveManifest();throw error;}
