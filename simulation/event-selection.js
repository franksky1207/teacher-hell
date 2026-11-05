/** Reproducible engineering scale evidence, never a 30-year gameplay claim. */
import { performance } from 'node:perf_hooks';
import { writeFile } from 'node:fs/promises';
import { eventWorld,definition,binding } from '../test/support/event-fixtures.js';
import { EVENT_TOPICS } from '../src/runtime/topics.js';
import { buildEventCandidates } from '../src/runtime/event-candidates.js';
import { selectWorldEvents } from '../src/runtime/event-selection.js';
import { prepareWorldOperation } from '../src/runtime/transactions.js';
import { runtimeOf } from '../src/runtime/model.js';
import { createRandom } from '../src/numeric/random.js';
import { request } from '../test/support/runtime.js';
const bytes=v=>new TextEncoder().encode(JSON.stringify(v)).length;
const world=eventWorld();world.random.events=createRandom(0).snapshot();
const definitions=Array.from({length:1920},(_,i)=>definition(`engineering-scale:${i}`,{topicId:EVENT_TOPICS[Math.floor(i/20)].id}));
const heapBefore=process.memoryUsage().heapUsed,start=performance.now(),pool=buildEventCandidates(world,definitions,{engineering:true}),queryMs=performance.now()-start;
const register={type:'register-event-catalogue',catalogueId:'engineering-scale-v1',definitions,bindings:definitions.map(binding),engineering:true};
const registered=prepareWorldOperation(world,request(world,'scale-register',[register])).world;
const command=request(registered,'scale-draw',[{type:'draw-events',catalogueId:register.catalogueId}]),drawStart=performance.now(),result=prepareWorldOperation(registered,command),drawMs=performance.now()-drawStart;
const record=runtimeOf(result.world).history.find(h=>h.type==='event-selection').data;
const sampleWorld=eventWorld(),valences=['negative','neutral','positive'],sampleDefinitions=valences.map((v,i)=>definition(`engineering-stat:${v}`,{topicId:EVENT_TOPICS[i].id,eligibility:{...definition().eligibility,people:['player']}}));
const sampleOp={type:'draw-events',definitions:sampleDefinitions,bindings:sampleDefinitions.map((d,i)=>({...binding(d),valence:valences[i]})),engineering:true},counts={negative:0,neutral:0,positive:0};
for(let seed=0;seed<3000;seed++){sampleWorld.random.events=createRandom(seed).snapshot();const data=selectWorldEvents(sampleWorld,sampleOp,{id:'engineering-stat'},{draws:[]});if(data.selected.length)counts[valences[sampleDefinitions.findIndex(d=>d.id===data.selected[0].definitionId)]]++;}
const report={kind:'engineering-only-event-scale',seed:0,topics:96,subtopics:1920,activeStudents:40,candidates:pool.candidates.length,queryMs,drawMs,heapDeltaBytes:process.memoryUsage().heapUsed-heapBefore,
 baseWorldBytes:bytes(world),registeredWorldBytes:bytes(registered),dailyRequestBytes:bytes(command),dailyReceiptBytes:bytes(result.receipt),dailyHistoryBytes:bytes(record),dailyWorldGrowthBytes:bytes(result.world)-bytes(registered),requested:record.requested,selected:record.selected.length,
 statisticalSample:{seeds:3000,firstSelectedCounts:counts,expectedProportions:{negative:1.6/3.3,neutral:1/3.3,positive:.7/3.3},testToleranceAbsolute:.04},
 limits:['Synthetic metadata and actual current school identities; no official stories','Desktop Node timing and heap delta, not peak memory, Safari or iPhone','One 76800-candidate day, not 30-year gameplay or balanced difficulty','World/save still use complete snapshot validation; no deletion of historical facts']};
await writeFile(new URL('./results/event-selection-20261102.json',import.meta.url),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
