/** Real-source storage/fault acceptance. Reuses retained before/after checkpoints,
 * never reruns or fabricates a school year. Only the storage adapter is in memory. */
import assert from 'node:assert/strict';
import { readFile,writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createStoredSession } from '../src/storage/session.js';
import { restoreSave,saveToken,sameToken } from '../src/storage/format.js';
import { runtimeOf } from '../src/runtime/model.js';
import { request } from '../test/support/runtime.js';
import { careerResult } from '../src/runtime/career.js';
const root=process.argv[2];assert.ok(root,'Supply a retained artifact directory');
const sha=bytes=>createHash('sha256').update(bytes).digest('hex'),manifest=JSON.parse(await readFile(`${root}/manifest.json`,'utf8'));
assert.equal(manifest.status,'passed');assert.equal(manifest.kind,'T4-continuous-production-source');
const report={kind:'T4-real-checkpoint-storage-validation',sourceCommit:manifest.sourceCommit,difficulty:manifest.difficulty,checks:[],startedAt:new Date().toISOString()};
async function load(name){const bytes=await readFile(`${root}/${name}`);assert.equal(bytes.length,manifest.files[name].bytes);assert.equal(sha(bytes),manifest.files[name].sha256);return restoreSave(bytes.toString());}
let before=await load('before-completion.json');assert.equal(careerResult(before.world),null);
const beforeRevision=runtimeOf(before.world).revision,operation=JSON.parse(runtimeOf((await load('completed.json')).world).commits.at(-1).request);
let stored={payload:before,token:saveToken({payload:before,generation:1})},fault=null,writes=0,memorialWrites=0;before=null;
const db={async read(){return structuredClone(stored);},async write(slot,payload,expected){
 writes++;if(fault==='quota'){fault=null;throw Error('quota');}
 if(fault==='stale'){fault=null;stored.token={...stored.token,generation:stored.token.generation+1};}
 if(!sameToken(stored.token,expected)){const e=Error('CAS conflict');e.code='STALE';throw e;}
 stored={payload:structuredClone(payload),token:saveToken({payload,generation:stored.token.generation+1})};return structuredClone(stored);
},async writeMemorial(){memorialWrites++;throw Error('Three-year completion must not use memorial storage');}};
let a=await createStoredSession(db,1);
fault='quota';await assert.rejects(a.execute(operation),/quota/);assert.equal(runtimeOf(stored.payload.world).revision,beforeRevision);assert.equal(careerResult(stored.payload.world),null);report.checks.push('prepared terminal discarded on failed write');global.gc?.();
fault='stale';await assert.rejects(a.execute(operation),{code:'STALE'});assert.equal(careerResult(stored.payload.world),null);report.checks.push('CAS conflict publishes no partial terminal');global.gc?.();
let b=await createStoredSession(db,1);await b.execute(operation);assert.equal(runtimeOf(stored.payload.world).history.filter(h=>h.type==='career-completion').length,1);report.checks.push('successful atomic CAS contains one annual/cohort/terminal');global.gc?.();
assert.equal((await a.execute(operation)).duplicate,true);assert.equal((await b.execute(operation)).duplicate,true);report.checks.push('lost response and stale peer redelivery both deduplicate');a=null;b=null;global.gc?.();
const frozen=await createStoredSession(db,1);
await assert.rejects(frozen.execute({...request(stored.payload.world,'second-terminal',[{type:'settle-school-year'}]),calendarContext:{kind:'routine'}}),{code:'CAREER_COMPLETE'});
assert.equal(memorialWrites,0);report.checks.push('new IDs rejected after freeze; no memorial writes');global.gc?.();
// Tamper one field at a time on the detached validated world, restoring it even
// when the assertion fails. None of these hostile probes are saved or published.
const w=stored.payload.world,r=runtimeOf(w),completion=careerResult(w);
const original=completion.data.rating.score;completion.data.rating.score=original+.125;
try{assert.throws(()=>restoreSave(stored.payload));}finally{completion.data.rating.score=original;}
report.checks.push('recomputed rating rejects changed score');global.gc?.();
const owner=r.commits.at(-1),lastId=owner.historyIds.pop();try{assert.throws(()=>restoreSave(stored.payload));}finally{owner.historyIds.push(lastId);}
report.checks.push('missing owned terminal receipt rejected');
const archive=r.history.find(h=>h.type==='cohort-completion'),eligible=archive.data.outcomes[0].qualification.eligible;archive.data.outcomes[0].qualification.eligible=!eligible;
try{assert.throws(()=>restoreSave(stored.payload));}finally{archive.data.outcomes[0].qualification.eligible=eligible;}
report.checks.push('changed academic qualification rejected');
report.writes=writes;report.memorialWrites=memorialWrites;report.passed=report.checks.length;report.failed=0;report.completedAt=new Date().toISOString();await writeFile(`${root}/storage-checks.json`,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
