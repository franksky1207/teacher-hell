/** One-off golden witnesses from the unchanged H4 support API, never game endings. */
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {gzipSync,gunzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {restoreRandom} from '../src/numeric/random.js';
import {calendarDay,SENIOR_CALENDAR_VERSION} from '../src/calendar/calendar.js';
import {addDays,weekday} from '../src/calendar/civil.js';
const baseline=process.argv[2];assert.ok(baseline,'Supply detached bb1a598 worktree');
const old=await import(pathToFileURL(resolve(baseline,'src/runtime/academics.js')));
const sample=JSON.parse(gunzipSync(await readFile('work/h5/support-entry.json.gz'))),hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
const state=structuredClone(sample.state),rng=restoreRandom(sample.randomBefore),fixture={version:1,sourceCommit:'bb1a598a6245c28336d10fdb51f470521f316504',provenance:'Unmodified academicSupport entry captured from formal H1–H4 regression at 2029-05-09; numerical parity vector, not continuous play proof',supportSourceSha256:createHash('sha256').update(old.academicSupport.toString()).digest('hex'),initial:sample,probes:[]};
for(let date=sample.input.date,n=0;n<30&&fixture.probes.length<8;n++,date=addDays(date,1)){
 const d=calendarDay(date,3,SENIOR_CALENDAR_VERSION);if(weekday(date)>5||d.holiday.length||d.exam||d.activities.length||d.kind!=='school'||!old.academicSupportDue(state,date,sample.input.activeIds))continue;
 const input={...structuredClone(sample.input),date,studyAllowed:true},before=hash(state),randomBefore=rng.snapshot(),at=performance.now(),result=old.academicSupport(state,input,rng),baselineMs=performance.now()-at;
 fixture.probes.push({input,before,randomBefore,result:structuredClone(result),after:hash(state),randomAfter:rng.snapshot(),baselineMs});
}
assert.equal(fixture.probes.length,8);assert.ok(fixture.probes.some(p=>p.result.plans.length),'real remedial applications required');assert.ok(fixture.probes.some(p=>p.result.study.length));assert.ok(fixture.probes.some(p=>p.result.retakes.length));
const text=JSON.stringify(fixture);await writeFile('test/fixtures/h5-support-pre-index.json.gz',gzipSync(text));console.log(JSON.stringify({bytes:Buffer.byteLength(text),gzipBytes:gzipSync(text).length,sha256:createHash('sha256').update(text).digest('hex'),probes:fixture.probes.map(p=>({date:p.input.date,ms:p.baselineMs,plans:p.result.plans.length,study:p.result.study.length,retakes:p.result.retakes.length}))},null,2));
