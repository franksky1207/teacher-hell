/** Desktop measurements only. No claim about unmeasured phones or storage engines. */
import {performance} from 'node:perf_hooks';
import {writeFileSync} from 'node:fs';
import {createCandidate,confirmCandidate} from '../src/player/creation.js';
import {createWorld,ensureNPCs} from '../src/world/world.js';
import {deriveWorldPanel} from '../src/social/reputation.js';
import {worldCrisis} from '../src/assessment/crisis.js';
import {rateAnnual} from '../src/assessment/annual.js';
import {rateCareer} from '../src/assessment/career.js';
import {startEvolution} from '../src/evolution/time.js';
import {startSettlement,createSettlementSession,canonicalData} from '../src/changes/settlement.js';
import {fixture} from './fixtures.js';
const average=(count,fn)=>{const t=performance.now();for(let i=0;i<count;i++)fn(i);return (performance.now()-t)/count;};
const player=confirmCandidate(createCandidate({seed:70,playerId:'teacher',schoolId:'school'}));
const world=createWorld({seed:71,player}),f=fixture();
const natural={date:'2026-08-28',schoolYearId:'Y1',openingId:'O1',serviceYear:1};
const initial=startSettlement(startEvolution(world,{seed:72,date:natural.date,schoolYearId:'Y1',openingId:'O1'}),{seed:73,attemptId:'attempt'});
const session=createSettlementSession(initial);session.advanceDay(natural);
const operation={type:'direct',changes:[{target:{kind:'player-person',id:'teacher'},code:'2-3',delta:1}]};
const request=id=>{const c=session.cursor();return {attemptId:c.attemptId,id,sequence:c.nextSequence,date:c.date,operation};};
const metrics={environment:{node:process.version,platform:process.platform,arch:process.arch},initializationMs:average(20,i=>createWorld({seed:i,player})),reputationMs:average(50,()=>deriveWorldPanel(world)),crisisMs:average(50,()=>worldCrisis(world)),annualSyntheticMs:average(100,()=>rateAnnual('year:1',f.source)),careerSyntheticMs:average(100,()=>rateCareer({yearRefs:f.yearRefs,cohortRefs:f.cohortRefs},f.source)),indexedTransactionMs:average(50,i=>session.settle(request(`benchmark:${i}`)))};
const base=session.snapshot(),template=base.receipts[0];
for(let i=base.receipts.length;i<10000;i++){const id=`saved:${i}`,sequence=i+1,req={...JSON.parse(template.request),id,sequence};base.receipts.push({...structuredClone(template),id,sequence,request:canonicalData(req)});}
const source=JSON.stringify(base);metrics.receipt10000Bytes=Buffer.byteLength(source);metrics.stringifyMs=average(10,()=>JSON.stringify(base));metrics.parseAndAuditMs=average(3,()=>createSettlementSession(JSON.parse(source)));
const large=ensureNPCs(world,Array.from({length:1000},(_,i)=>({id:`large:${i}`,roleIds:[35]})));
const largeSession=createSettlementSession(startSettlement(startEvolution(large,{seed:72,date:natural.date,schoolYearId:'Y1',openingId:'O1'}),{seed:73,attemptId:'attempt'}));
let t=performance.now();largeSession.advanceDay(natural);metrics.natural1000ExtraNPCMs=performance.now()-t;
const c=largeSession.cursor(),changes=Array.from({length:1000},(_,i)=>({target:{kind:'person',id:`large:${i}`},code:'2-1',delta:i%2?5:-5}));
t=performance.now();largeSession.settle({attemptId:c.attemptId,id:'large-transaction',sequence:1,date:c.date,operation:{type:'direct',changes}});metrics.transaction1000TargetsMs=performance.now()-t;
metrics.largeWorldPeople=Object.keys(large.people).length;metrics.largeWorldBytes=Buffer.byteLength(JSON.stringify(largeSession.snapshot()));
if(typeof global.gc==='function'){global.gc();metrics.heapUsedBytes=process.memoryUsage().heapUsed;}
writeFileSync('/tmp/teacher-hell-n8-benchmark.json',JSON.stringify(metrics,null,2)+'\n');process.stdout.write(JSON.stringify(metrics)+'\n');
