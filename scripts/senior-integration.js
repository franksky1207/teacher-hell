/** Continuous H5 acceptance: formal opening + checked transactions only. */
import assert from 'node:assert/strict';
import {mkdir,writeFile,readFile,rename,copyFile} from 'node:fs/promises';
import {gzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {createCandidate} from '../src/player/creation.js';
import {createCareerOpening} from '../src/runtime/opening.js';
import {prepareWorldSequence,prepareWorldOperation} from '../src/runtime/transactions.js';
import {planProgression} from '../src/runtime/progression.js';
import {runtimeOf} from '../src/runtime/model.js';
import {academicState,readAdmissions} from '../src/runtime/academics.js';
import {careerResult} from '../src/runtime/career.js';
import {createSave,encodeSave,restoreSave,SAVE_KIND} from '../src/storage/format.js';
const batchSize=Number(process.argv.find(a=>a.startsWith('--batch='))?.slice(8)??1024);assert.ok(Number.isInteger(batchSize)&&batchSize>0&&batchSize<=4096);
const root='work/h5',hash=s=>createHash('sha256').update(s).digest('hex');await mkdir(root,{recursive:true});
const metrics={kind:'H5-continuous-formal-three-year',sourceCommit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),driverSha256:hash(await readFile('scripts/senior-integration.js')),node:process.version,batchSize,steps:0,batches:[],status:'running'};
const report=()=>writeFile(`${root}/integration.json`,JSON.stringify(metrics,null,2));
const persist=async(name,payload)=>{const start=performance.now(),text=encodeSave(payload),z=gzipSync(text);await writeFile(`${root}/${name}.json.gz.partial`,z);await rename(`${root}/${name}.json.gz.partial`,`${root}/${name}.json.gz`);metrics[name]={jsonBytes:Buffer.byteLength(text),gzipBytes:z.length,sha256:hash(text),encodeGzipWriteMs:performance.now()-start};await report();};
let opening,w;const began=performance.now(),resume=process.argv.find(a=>a.startsWith('--resume='))?.slice(9);
if(resume){const {gunzipSync}=await import('node:zlib');const p=restoreSave(gunzipSync(await readFile(resume)).toString());opening=p.opening;w=p.world;metrics.resumedFrom=resume;try{const prior=JSON.parse(await readFile(`${root}/integration.json`));metrics.previousRun=prior;metrics.steps=runtimeOf(w).revision-1;metrics.stages=structuredClone(prior.stages??{});metrics.weeklyOperations=structuredClone(prior.weeklyOperations??[]);}catch{}}
else{opening=createCareerOpening({candidate:createCandidate({seed:74,playerId:'teacher',schoolId:'school'}),seed:75,taipeiDate:'2026-11-06',difficulty:'normal',subject:'國文',careerKey:'h5-continuous-20261106'});w=opening;await persist('opening',createSave(w,opening));}
let pendingWeekly=null;metrics.weeklyOperations??=[];
try{
 while(!careerResult(w)){
  const start=performance.now(),from=w.position.date,year=w.position.serviceYear;let count=0,openingChanged=false,lastDate=from,stopBoundary=false,stage=null;metrics.stages??={};
  const result=prepareWorldSequence(w,c=>{
   if(pendingWeekly){metrics.weeklyOperations.push({...pendingWeekly,to:c.position.date,revision:c.revision,ms:performance.now()-pendingWeekly.started,interrupted:c.reserved.length>0||c.stories.some(s=>!s.waiting||s.canResume)});pendingWeekly=null;}
   if(c.completed)return null;
   if(c.failed)throw Error('Formal career failed at '+c.position.date);
   if(c.position.date!==lastDate){lastDate=c.position.date;if(c.position.date.endsWith('-01'))console.log(JSON.stringify({date:c.position.date,revision:c.revision,elapsedMs:performance.now()-began,rss:process.memoryUsage().rss}));}
   if(c.position.serviceYear!==year){openingChanged=true;return null;}
   if(count>=batchSize)return null;
   const target=['2028-07-24','2028-12-01','2029-05-09','2029-05-31','2029-06-01','2029-06-02','2029-06-23'].find(d=>c.position.date===d&&!metrics.stages[d]);if(target){stage=target;return null;}
   const q=(operations,kind='routine')=>({id:`operation:${JSON.stringify([c.identity.attemptId,'h5-driver',String(c.revision)])}`,attemptId:c.identity.attemptId,expectedRevision:c.revision,actorId:c.identity.playerId,preconditions:[],calendarContext:{kind},operations});
   if(c.pendingReview&&year===3&&c.position.date==='2029-06-29'&&!metrics.stages['awaiting-final-review']){stage='awaiting-final-review';return null;}
   if(c.pendingReview){count++;return q([{type:'read-semester-review',reviewId:c.pendingReview}]);}
   const story=c.stories.find(s=>!s.waiting||s.canResume);
   if(story){let action,optionId=null;if(story.canResume)action='resume';else if(story.canNext)action='next';else if(story.confirmation)action='confirm';else if(story.choices.length){action='select';optionId=['review','check','refer','help','listen','support','accept'].find(id=>story.choices.some(o=>o.id===id))??story.choices[0].id;}else if(story.canFinish)action='finish';else throw Error('Unrecognized story state');count++;return q([{type:'story',eventId:story.eventId,action,optionId}],'formal-event');}
   const next=planProgression(c);
   assert.equal(next.status,'action',JSON.stringify(next));
   if(next.settlement&&year===3){stopBoundary=true;return null;}
   if(next.weekly)pendingWeekly={started:performance.now(),from:c.position.date,revision:c.revision};
   count++;return next.request;
  },{limit:10000});
  w=result.world;metrics.steps=runtimeOf(w).revision-1;
  if(openingChanged)opening=w;
  metrics.batches.push({from,to:w.position.date,revision:runtimeOf(w).revision,requests:result.receipts.length,ms:performance.now()-start,rss:process.memoryUsage().rss});
  metrics.last={date:w.position.date,revision:runtimeOf(w).revision};await report();
  console.log(JSON.stringify(metrics.batches.at(-1)));
  if(stage){
   metrics.stages[stage]={date:w.position.date,revision:runtimeOf(w).revision};await persist('stage-'+stage,{kind:SAVE_KIND,version:1,world:w,opening});
   // Identical artifact bytes already passed the official encode/validation above.
   // Publishing that same checkpoint needs no second three-year replay.
   const at=performance.now();await copyFile(`${root}/stage-${stage}.json.gz`,`${root}/checkpoint.json.gz.partial`);await rename(`${root}/checkpoint.json.gz.partial`,`${root}/checkpoint.json.gz`);metrics.checkpoint={...metrics['stage-'+stage],copyOf:'stage-'+stage,copyWriteMs:performance.now()-at};await report();
  }else await persist(stopBoundary?'before-completion':'checkpoint',{kind:SAVE_KIND,version:1,world:w,opening});
  if(stopBoundary){
   const before=academicState(w),r=runtimeOf(w),request={id:`operation:${JSON.stringify([w.identity.attemptId,'h5-terminal'])}`,attemptId:w.identity.attemptId,expectedRevision:r.revision,actorId:w.identity.playerId,preconditions:[],calendarContext:{kind:'routine'},operations:[{type:'settle-school-year'}]},t=performance.now();
   const completed=prepareWorldOperation(w,request);w=completed.world;metrics.t4Ms=performance.now()-t;
   assert.deepEqual(academicState(w),before);assert.equal(prepareWorldOperation(w,request).duplicate,true);
   assert.throws(()=>prepareWorldOperation(w,{...request,id:`operation:${JSON.stringify([w.identity.attemptId,'h5-terminal-again'])}`,expectedRevision:runtimeOf(w).revision}),{code:'CAREER_COMPLETE'});
   assert.equal(w.position.date,'2029-06-29');assert.equal(runtimeOf(w).history.filter(h=>h.type==='career-completion').length,1);assert.equal(w.numeric.evolution.world.classroom.studentIds.length,0);
   const s=academicState(w);assert.equal(Object.keys(s.terms).length,6);assert.ok(s.terms['2029:spring'].review);assert.ok(runtimeOf(w).facts.some(f=>f.data.graduationSummary));assert.equal(runtimeOf(w).history.filter(h=>h.type==='aftercare-week-summary').length,4);
   assert.ok(Object.values(readAdmissions(w).students).every(p=>p.subject?.officialScore==null&&p.subject?.distribution==null));
   await persist('completed',{kind:SAVE_KIND,version:1,world:w,opening});metrics.completion=careerResult(w).data.rating;metrics.status='passed';break;
  }
  assert.ok(stage||result.receipts.length>0,'driver must make progress');
 }
 metrics.elapsedMs=performance.now()-began;await report();
}catch(error){metrics.status='failed';metrics.error={message:error.message,stack:error.stack};metrics.elapsedMs=performance.now()-began;await report();throw error;}
