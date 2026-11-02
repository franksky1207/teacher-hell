import test from 'node:test';
import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { runtimeScenario,request,event,fact,open,id } from './support/runtime.js';
import { prepareWorldOperation } from '../src/runtime/transactions.js';
import { runtimeOf,restoreWorldState } from '../src/runtime/model.js';

test('runtime-stress: 160 synthetic commits, 40 concurrent events, 80 people and JSON continuation',t=>{
  let w=runtimeScenario(29),restored=restoreWorldState(JSON.stringify(w));
  const baselineBytes=Buffer.byteLength(JSON.stringify(w)),heapBefore=process.memoryUsage().heapUsed,start=performance.now();
  const people=Object.keys(w.numeric.evolution.world.people).slice(0,80),durations=[];
  for(let i=0;i<160;i++){
    const e=event(w,Math.floor(i/4)),subjects=[people[i%people.length],people[(i+1)%people.length]],ops=[];
    if(i%4===0)ops.push(open(e));
    const f=fact(e,`long-${i}`,{subjectIds:subjects,witnessIds:[],categoryCodes:['H01-1'],causeIds:i?[id('fact',`long-${i-1}`)]:[]});ops.push(f);
    if(i%4===0)ops.push({type:'result',id:id('result',`long-${i}`),eventId:e.id,stageId:e.stageId,factId:f.id,subjectId:subjects[0],facet:'synthetic-trace',effects:[{id:id('effect',`long-${i}`),operation:{type:'direct',changes:[{target:{kind:'person',id:subjects[0]},code:'1-1',delta:1}]}}]});
    ops.push({type:'sample',stream:'events',id:'one-draw',weights:[1,2,3]});
    if(i>0&&i%20===0)ops.push({type:'advance-time',planId:'synthetic-order',steps:1});
    const q=request(w,`long-${i}`,ops),at=performance.now();w=prepareWorldOperation(w,q).world;durations.push(performance.now()-at);
    restored=prepareWorldOperation(restored,q).world;
    if(i%20===0)restored=restoreWorldState(JSON.stringify(restored));
  }
  assert.deepEqual(w,restored);const r=runtimeOf(w),bytes=Buffer.byteLength(JSON.stringify(w));
  assert.equal(r.revision,160);assert.equal(w.events.length,40);assert.equal(r.facts.length,160);assert.equal(w.numeric.receipts.length,40);assert.equal(r.effects.length,40);
  assert.equal(new Set(r.facts.flatMap(f=>f.subjectIds)).size,80);assert.equal(r.commits.reduce((n,c)=>n+c.draws.length,0),160);
  assert.ok(bytes<baselineBytes+160*5000,'Bounded trace/request growth for this workload');
  t.diagnostic(JSON.stringify({syntheticOnly:true,commits:160,events:40,people:80,facts:160,numericReceipts:40,baselineBytes,finalBytes:bytes,elapsedMs:Math.round(performance.now()-start),meanCommitMs:Math.round(durations.reduce((a,b)=>a+b,0)/160),maxCommitMs:Math.round(Math.max(...durations)),heapBefore,heapAfter:process.memoryUsage().heapUsed,note:'Heap includes test copies/GC; no 30-year gameplay, balance or mobile claim.'}));
});
