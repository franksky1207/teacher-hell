/** Real opening checkpoints only; each branch executes ready failure content. */
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {performance} from 'node:perf_hooks';
import {createHash} from 'node:crypto';
import {encodeSave,SAVE_KIND,sameToken,saveToken} from '../src/storage/format.js';
import {createStoredSession} from '../src/storage/session.js';
import {runtimeOf,WorldError} from '../src/runtime/model.js';
import {canonicalData} from '../src/changes/settlement.js';
import {failureResult} from '../src/runtime/homeroom.js';
import {readAnnualResults} from '../src/runtime/annual.js';
import {readArchivedClass} from '../src/runtime/views.js';
import {institutionState} from '../src/runtime/procedures.js';
import {runCareerFailure} from '../test/support/career-scenario.js';
import {id} from '../test/support/runtime.js';
const root='work/career',year=Number(process.argv.find(a=>a.startsWith('--year='))?.slice(7)??4),cycles=year===4?3:1;
assert.ok([2,3,4].includes(year));const at=performance.now(),report=JSON.parse(await readFile(`${root}/report.json`,'utf8'));let source=await readFile(`${root}/opening-${year}.json`,'utf8');
assert.equal(createHash('sha256').update(source).digest('hex'),report.checkpoints[`opening-${year}`].sha256);

// Model persisted bytes, not an extra retained full world/opening object pair.
const db={encoded:null,token:null,async read(){return {payload:this.encoded?JSON.parse(this.encoded.toString('utf8')):null,token:structuredClone(this.token)};},async write(slot,payload,expected){if(!sameToken(this.token,expected))throw new WorldError('STALE','acceptance CAS');const generation=(this.token?.generation??0)+1;this.encoded=Buffer.from(JSON.stringify(payload));this.token=saveToken({payload,generation});return this.read();}};
let s=await createStoredSession(db,1);await s.import(source,{expectedToken:null});source=null;global.gc?.();
let {world:w,opening}=s.snapshot().payload;const hash=value=>createHash('sha256').update(canonicalData(value)).digest('hex'),oldYears=hash(readAnnualResults(w)),oldStudents=hash(w.numeric.evolution.world.registry.cohorts),oldAcademic=hash(runtimeOf(w).history.filter(h=>h.type==='academic')),oldInstitution=hash(institutionState(w)),oldNumeric=hash(w.numeric.evolution),oldHistory=hash(runtimeOf(w).history),archivedClass=year===4?w.numeric.evolution.world.registry.cohorts[0].classId:null,oldArchive=archivedClass?hash(readArchivedClass(w,archivedClass)):null;
const startCycle=Number(process.argv.find(a=>a.startsWith('--resume-cycle='))?.slice(15)??1);assert.ok(Number.isInteger(startCycle)&&startCycle>=1&&startCycle<=cycles);
let checks=[];
if(startCycle>1){const progress=JSON.parse(await readFile(`${root}/retry-report-${year}.json`,'utf8'));assert.equal(progress.checks.length,startCycle-1);const text=await readFile(`${root}/retry-${year}-${startCycle-1}.json`,'utf8');assert.equal(createHash('sha256').update(text).digest('hex'),progress.checks.at(-1).checkpointHash);await s.import(text,{expectedToken:s.snapshot().token,confirmed:true});w=s.snapshot().payload.world;checks=progress.checks;}
for(let cycle=startCycle;cycle<=cycles;cycle++){
 global.gc?.();const failureAt=performance.now();console.log('START formal failure',year,cycle);w=runCareerFailure(w);console.log('PASS formal terminal',year,cycle);assert.equal(failureResult(w).data.grade,null);assert.equal(hash(readAnnualResults(w)),oldYears);
 let encoded=encodeSave({kind:SAVE_KIND,version:1,world:w,opening});const saveBytes=Buffer.byteLength(encoded);await writeFile(`${root}/failure-${year}-${cycle}.json`,encoded);
 await s.import(encoded,{expectedToken:s.snapshot().token,confirmed:true});encoded=null;global.gc?.();
 const h=failureResult(w),opts={attemptId:id('attempt',`career-${year}-${cycle}`),seeds:{settlement:51+cycle,streams:Object.fromEntries(Object.keys(w.random).map(k=>[k,k==='events'?1:cycle+21]))},failureId:h.id,failedAttemptId:w.identity.attemptId,schoolYearId:w.position.schoolYearId,expectedRevision:runtimeOf(w).revision};
 if(cycle>1)await assert.rejects(s.retry({...opts,attemptId:cycle===2?opening.identity.attemptId:id('attempt',`career-${year}-1`)}),/never have been used|fresh attempt/);
 const retryAt=performance.now();await s.retry(opts);console.log('PASS stored retry',year,cycle);const retryMs=performance.now()-retryAt;w=s.snapshot().payload.world;
 assert.equal(failureResult(w),null);assert.equal(runtimeOf(w).history.length,runtimeOf(opening).history.length+1);assert.equal(hash(w.events),hash(opening.events));assert.equal(hash(runtimeOf(w).effects),hash(runtimeOf(opening).effects));assert.equal(hash(institutionState(w)),oldInstitution);assert.equal(hash(w.numeric.evolution),oldNumeric);assert.equal(hash(w.numeric.evolution.world.registry.cohorts),oldStudents);assert.equal(hash(readAnnualResults(w)),oldYears);assert.equal(hash(runtimeOf(w).history.filter(h=>h.type==='academic')),oldAcademic);assert.equal(hash(runtimeOf(w).history.slice(0,runtimeOf(opening).history.length)),oldHistory);if(archivedClass)assert.equal(hash(readArchivedClass(w,archivedClass)),oldArchive);
 assert.equal((await s.retry(opts)).duplicate,true);assert.equal(hash(w.numeric.receipts),hash([]));
 let after=await s.export();const retryBytes=Buffer.byteLength(after),checkpointHash=createHash('sha256').update(after).digest('hex');await writeFile(`${root}/retry-${year}-${cycle}.json`,after);
 s=await createStoredSession(db,1);await s.import(after,{expectedToken:s.snapshot().token,confirmed:true});w=s.snapshot().payload.world;after=null;global.gc?.();
 checks.push({year,cycle,checkpointHash,failedAt:h.at,failedAttemptId:h.attemptId,newAttemptId:w.identity.attemptId,saveBytes,retryBytes,openingBytes:Buffer.byteLength(JSON.stringify(opening)),retryMs,elapsedMs:performance.now()-failureAt,successfulYearsPreserved:readAnnualResults(w).length,cohorts:w.numeric.evolution.world.registry.cohorts.length,archivedClassPreserved:!!archivedClass,numericArchives:runtimeOf(w).numericArchives.length,retiredAttemptRejected:cycle>1,lineageBytes:Buffer.byteLength(JSON.stringify(w.extensions['teacher-hell/attempt-lineage']))});console.log(JSON.stringify(checks.at(-1)));await writeFile(`${root}/retry-report-${year}.json`,JSON.stringify({provenance:'actual verified opening and ready formal failure, production CAS/retry/export/import',year,checks,complete:cycle===cycles,elapsedMs:performance.now()-at},null,2));global.gc?.();
}
await writeFile(`${root}/retry-report-${year}.json`,JSON.stringify({provenance:'independent branch from hash-verified actual opening; ready 11-C source, real CAS API retry/export/import, no fake annual/failure data',year,checks,elapsedMs:performance.now()-at},null,2));
console.log('PASS formal later-year retry',year);
