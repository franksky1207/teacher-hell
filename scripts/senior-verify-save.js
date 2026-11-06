/** Verify artifacts from senior-integration; no date, mark or ending injection. */
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {gunzipSync,gzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import {restoreSave,encodeSave,saveToken,sameToken} from '../src/storage/format.js';
import {createStoredSession} from '../src/storage/session.js';
import {runtimeOf,WorldError} from '../src/runtime/model.js';
import {prepareWorldOperation} from '../src/runtime/transactions.js';
import {academicState,readAdmissions} from '../src/runtime/academics.js';
import {admissionCalendar} from '../src/calendar/admissions.js';
import {createId} from '../src/contracts/foundation.js';
import {projectNotebookAcademics} from '../web/notebook-academics.js';
import {projectNotebookCareer,renderNotebookCareer} from '../web/notebook-reviews.js';
import {nextProgression} from '../src/runtime/progression.js';
import {readAftercare} from '../src/runtime/aftercare.js';
const root='work/h5',metrics={checks:0,status:'running',node:process.version},hash=t=>createHash('sha256').update(t).digest('hex');
const timed=async(name,fn)=>{const at=performance.now(),result=await fn();metrics[name+'Ms']=performance.now()-at;return result;};
try {
async function verifyCompleted(){
let payload=await timed('importRestore',async()=>restoreSave(gunzipSync(await readFile(`${root}/completed.json.gz`)).toString()));
const text=await timed('exportEncode',()=>encodeSave(payload));metrics.jsonBytes=Buffer.byteLength(text);metrics.gzipBytes=gzipSync(text).length;metrics.sha256=hash(text);
let round=await timed('roundtripRestore',()=>restoreSave(text));assert.equal(hash(encodeSave(round)),metrics.sha256);metrics.checks++;round=null;globalThis.gc?.();
const w=payload.world,r=runtimeOf(w),academics=await timed('academicReplay',()=>academicState(w)),admissions=await timed('admissionsReplay',()=>readAdmissions(w));
assert.equal(Object.keys(academics.terms).length,6);assert.equal(r.history.filter(h=>h.type==='semester-review').length,6);metrics.checks++;
for(const t of Object.values(academics.terms)){assert.deepEqual(t.assessments.map(a=>a.round).sort(),t.grade===3&&t.termId.endsWith(':spring')?[0,1,2]:[0,1,2,3]);assert.ok(t.closed);}metrics.checks++;
assert.deepEqual(admissions.completed.map(n=>n.id),admissionCalendar(2026,r.plan.calendarVersion).map(n=>n.id));metrics.checks++;
assert.ok(admissions.ranking.every(row=>row.termIds.length===5));const senior=academics.terms['2029:spring'];assert.equal(senior.closedAt,'2029-05-08');assert.equal(senior.publishedAt,'2029-05-09');assert.equal(senior.studyCompletedAt,'2029-05-31');assert.equal(senior.review.date,'2029-05-31');metrics.checks++;
assert.ok(Object.values(admissions.students).every(p=>p.subject?.officialScore==null&&p.subject?.distribution==null));metrics.checks++;
metrics.formalRequests=r.commits.length-1;metrics.revision=r.revision;metrics.historyEntries=r.history.length;
const archived=r.history.find(h=>h.type==='cohort-completion');assert.ok(archived);assert.equal(r.history.filter(h=>h.type==='career-completion').length,1);assert.equal(r.history.filter(h=>h.type==='annual-success').length,3);assert.equal(w.position.date,'2029-06-29');assert.equal(nextProgression(w).status,'completed');metrics.checks++;
const academic=projectNotebookAcademics(w);assert.ok(academic.students.length>=38);const student=projectNotebookAcademics(w,academic.students[0].id);assert.equal(student.terms.length,6);assert.deepEqual(student.transcript.weights,[40,30,30]);metrics.checks++;
const career=projectNotebookCareer(w);assert.equal(career.senior.weeks.length,4);assert.deepEqual(career.senior.weeks.map(q=>[q.startDate,q.endDate]),[['2029-06-02','2029-06-08'],['2029-06-09','2029-06-15'],['2029-06-16','2029-06-22'],['2029-06-23','2029-06-29']]);assert.ok(career.senior.ceremony);assert.deepEqual(career.senior.ceremony.students.map(p=>p.qualification),career.senior.ceremony.students.map(p=>senior.review.outcomes.find(o=>o.personId===p.personId).qualification));assert.match(renderNotebookCareer(career),/畢典與六月紀錄/);metrics.checks++;
metrics.qualifications=Object.fromEntries(['graduation','completion-certificate','incomplete'].map(status=>[status,archived.data.outcomes.filter(o=>o.qualification.status===status).length]));
return {request:JSON.parse(r.commits.at(-1).request),worldHash:hash(JSON.stringify(w))};
}
const source=await verifyCompleted();globalThis.gc?.();
async function verifyActualWeek(){
 for(const file of ['stage-2029-06-23','stage-2029-06-02']){
  let w=restoreSave(gunzipSync(await readFile(`${root}/${file}.json.gz`)).toString()).world,next=nextProgression(w),setupRequests=0;
  // Only normal, already-needed catalogue adoption may precede the measurement.
  while(!next.weekly&&next.request?.operations.every(o=>o.type==='register-event-catalogue')&&setupRequests<2){w=prepareWorldOperation(w,next.request).world;setupRequests++;next=nextProgression(w);}
  if(!next.weekly)continue;
  const before=academicState(w).terms['2029:spring'],history=runtimeOf(w).history,from=w.position.date;
  const out=await timed('standaloneAftercareWeek',()=>prepareWorldOperation(w,next.request));
  assert.deepEqual(academicState(out.world).terms['2029:spring'],before);assert.deepEqual(runtimeOf(out.world).history.slice(0,history.length),history);
  assert.ok(out.world.position.date>=from&&out.world.position.date<='2029-06-29');assert.equal(nextProgression(out.world).status==='completed',false);
  const after=readAftercare(out.world);metrics.actualWeek={source:file,setupRequests,from,to:out.world.position.date,interrupted:after.next.status==='attention-required',summaries:after.weeks.length};metrics.checks++;return;
 }
 throw Error('No saved continuous aftercare stage offers a legal weekly operation');
}
await verifyActualWeek();globalThis.gc?.();
// Strict in-memory disk adapter for CAS/fault contracts. Browser verification
// separately exercises real IndexedDB/Gzip; these are not phone memory figures.
function disk(initial){let record={payload:initial,token:saveToken({payload:initial,generation:1})},generation=1,failure=false;return {fail(){failure=true;},async read(){return structuredClone(record);},async write(slot,p,expected){assert.ok([1,2,3].includes(slot));if(!sameToken(record.token,expected))throw new WorldError('STALE','disk changed');if(failure){failure=false;throw Error('injected disk failure');}record={payload:restoreSave(p),token:saveToken({payload:p,generation:++generation})};return structuredClone(record);}};}
const before=restoreSave(gunzipSync(await readFile(`${root}/before-completion.json.gz`)).toString()),q=source.request;
let db=disk(before),a=await createStoredSession(db,1),b=await createStoredSession(db,1);
assert.equal(q.operations[0].type,'settle-school-year');let initial=a.snapshot();db.fail();await assert.rejects(a.execute(q),/injected disk failure/);assert.deepEqual(a.snapshot(),initial);assert.deepEqual(await db.read(),initial);metrics.checks++;initial=null;globalThis.gc?.();
await timed('storedT4',()=>a.execute(q));let completed=a.snapshot();assert.equal(hash(JSON.stringify(completed.payload.world)),source.worldHash);metrics.checks++;await assert.rejects(b.execute({...q,id:createId('operation',[before.world.identity.attemptId,'h5-stale-terminal'])}),{code:'STALE'});metrics.checks++;assert.equal((await b.execute(q)).duplicate,true);assert.deepEqual(b.snapshot(),completed);metrics.checks++;
const altered={...q,id:createId('operation',[before.world.identity.attemptId,'h5-other-terminal']),expectedRevision:runtimeOf(completed.payload.world).revision};await assert.rejects(a.execute(altered),{code:'CAREER_COMPLETE'});assert.deepEqual(a.snapshot(),completed);metrics.checks++;
assert.deepEqual(academicState(completed.payload.world),academicState(before.world));metrics.checks++;
metrics.finalReceiptCount=runtimeOf(completed.payload.world).history.filter(h=>h.type==='career-completion').length;completed=null;a=null;b=null;db=null;globalThis.gc?.();
// A different old request cannot overwrite the successful final receipt.
const c=await createStoredSession(disk(before),2,{afterPersist(){throw Error('publication fault');}}),out=await c.execute(q);assert.equal(out.committed,true);assert.equal(out.recoveryRequired,true);assert.throws(()=>c.snapshot(),{code:'RECOVERY_REQUIRED'});const recovered=await c.recover();assert.equal(nextProgression(recovered.payload.world).status,'completed');assert.equal(runtimeOf(recovered.payload.world).history.filter(h=>h.type==='career-completion').length,1);assert.equal((await c.execute(q)).duplicate,true);metrics.checks++;
metrics.rss=process.memoryUsage().rss;metrics.status='passed';await writeFile(`${root}/save-verification.json`,JSON.stringify(metrics,null,2));console.log(JSON.stringify(metrics,null,2));

}catch(error){metrics.status='failed';metrics.error={message:error.message,code:error.code,stack:error.stack};await writeFile(`${root}/save-verification.json`,JSON.stringify(metrics,null,2));throw error;}
