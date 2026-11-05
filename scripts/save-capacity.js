/** S1 RESEARCH ONLY. No production encoder/IndexedDB changes; never imported by src or web.
 * Usage: node --expose-gc scripts/save-capacity.js fixtures|study [manifest] [report]
 *        node --expose-gc scripts/save-capacity.js worker <file> <method> <expected-sha256>
 */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile,writeFile,mkdir } from 'node:fs/promises';
import { resolve,dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { performance } from 'node:perf_hooks';
import { isDeepStrictEqual,promisify } from 'node:util';
import { cpus,release } from 'node:os';
import { gzip,gunzip,brotliCompress,brotliDecompress,constants } from 'node:zlib';
import { encodeSave,restoreSave,createSave } from '../src/storage/format.js';

const RUNTIME='teacher-hell/world',ROOT=['extensions',RUNTIME];
// Proven append-only operations in transactions.js / settlement.js. Knowledge (belief),
// events/results/choices, evolution, plan, RNG and all other live state are deliberately excluded.
export const PREFIX_PATHS=Object.freeze([
 ...['history','commits','facts','claims','disclosures','stages','effects','numericArchives'].map(k=>Object.freeze([...ROOT,k])),
 Object.freeze(['numeric','receipts']),
]);
const get=(obj,path)=>path.reduce((v,k)=>v?.[k],obj);
function set(obj,path,value){let p=obj;for(const key of path.slice(0,-1))p=p[key];p[path.at(-1)]=value;}
export const jsonBytes=v=>Buffer.byteLength(JSON.stringify(v),'utf8');
export const sha256=v=>createHash('sha256').update(v).digest('hex');
const sameBytes=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const pathKey=p=>p.join('.');
const exact=(value,keys)=>assert.deepEqual(Object.keys(value).sort(),[...keys].sort(),'Unexpected research envelope fields');
const allowed=new Set(PREFIX_PATHS.map(p=>JSON.stringify(p)));
export function packPrefix(save){
 const normalized=encodeSave(save); // Full original validators; no "trusted" bypass.
 const source={normalizedSha256:sha256(normalized),normalizedBytes:Buffer.byteLength(normalized)};
 const payload={kind:save.kind,version:save.version,world:structuredClone(save.world),opening:save.opening===null?null:structuredClone(save.opening)},shared=[];
 if(payload.opening)for(const path of PREFIX_PATHS){
  if(path[0]==='numeric'&&payload.world.numeric.attemptId!==payload.opening.numeric.attemptId)continue;
  const a=get(payload.world,path),b=get(payload.opening,path);if(!Array.isArray(a)||!Array.isArray(b))continue;
  let n=0;while(n<Math.min(a.length,b.length)&&sameBytes(a[n],b[n]))n++;
  if(!n)continue;
  const rows=a.slice(0,n);shared.push({path:[...path],count:n,sha256:sha256(JSON.stringify(rows)),rows});
  set(payload.world,path,a.slice(n));set(payload.opening,path,b.slice(n));
 }
 return {kind:'teacher-hell-s1-prefix-research',version:1,source,shared,payload};
}
export function unpackPrefix(input){
 const p=typeof input==='string'?JSON.parse(input):input;
 exact(p,['kind','version','source','shared','payload']);assert.equal(p.kind,'teacher-hell-s1-prefix-research');assert.equal(p.version,1);
 exact(p.source,['normalizedSha256','normalizedBytes']);assert.match(p.source.normalizedSha256,/^[0-9a-f]{64}$/);assert.ok(Number.isSafeInteger(p.source.normalizedBytes)&&p.source.normalizedBytes>0);
 assert.ok(Array.isArray(p.shared)&&p.shared.length<=PREFIX_PATHS.length);exact(p.payload,['kind','version','world','opening']);
 // Clone the two roots separately, even when a caller supplied aliased input objects.
 const restored={kind:p.payload.kind,version:p.payload.version,world:structuredClone(p.payload.world),opening:p.payload.opening===null?null:structuredClone(p.payload.opening)},seen=new Set();
 for(const block of p.shared){
  exact(block,['path','count','sha256','rows']);const key=JSON.stringify(block.path);
  assert.ok(allowed.has(key)&&!seen.has(key),'Unknown/duplicate shared path');seen.add(key);
  assert.ok(restored.opening&&Array.isArray(block.rows)&&Number.isSafeInteger(block.count)&&block.count>0&&block.count===block.rows.length);
  assert.equal(sha256(JSON.stringify(block.rows)),block.sha256,'Shared block hash differs');
  if(block.path[0]==='numeric')assert.equal(restored.world.numeric.attemptId,restored.opening.numeric.attemptId,'Cannot share receipts between attempts');
  for(const side of ['world','opening']){
   const tail=get(restored[side],block.path);assert.ok(Array.isArray(tail),'Shared path must address an array');
   set(restored[side],block.path,[...structuredClone(block.rows),...tail]);
  }
 }
 const encoded=JSON.stringify(restored);assert.equal(Buffer.byteLength(encoded),p.source.normalizedBytes);assert.equal(sha256(encoded),p.source.normalizedSha256,'Reconstructed full save hash differs');
 return restoreSave(restored); // Full world/opening/lineage/rules/calendar/N6 validation, plus detached roots.
}
const zip=promisify(gzip),unzip=promisify(gunzip),br=promisify(brotliCompress),unbr=promisify(brotliDecompress);
export async function compressBytes(bytes,codec){
 if(codec==='gzip')return zip(bytes,{level:6});
 if(codec==='brotli')return br(bytes,{params:{[constants.BROTLI_PARAM_QUALITY]:4,[constants.BROTLI_PARAM_LGWIN]:22}});
 if(codec.endsWith('-web'))return Buffer.from(await new Response(new Blob([bytes]).stream().pipeThrough(new CompressionStream(codec.slice(0,-4)))).arrayBuffer());
 throw Error('Unknown research codec');
}
export async function decompressBytes(bytes,codec,maxOutputLength){
 assert.ok(Number.isSafeInteger(maxOutputLength)&&maxOutputLength>0,'Explicit output bound required');
 let result;
 if(codec==='gzip')result=await unzip(bytes,{maxOutputLength});
 else if(codec==='brotli')result=await unbr(bytes,{maxOutputLength});
 else if(codec.endsWith('-web')){
  const reader=new Blob([bytes]).stream().pipeThrough(new DecompressionStream(codec.slice(0,-4))).getReader(),chunks=[];let count=0;
  try{for(;;){const {value,done}=await reader.read();if(done)break;count+=value.byteLength;assert.ok(count<=maxOutputLength,'Decoded byte limit exceeded');chunks.push(Buffer.from(value));}}
  finally{await reader.cancel().catch(()=>{});}
  result=Buffer.concat(chunks,count);
 }else throw Error('Unknown research codec');
 assert.ok(result.byteLength<=maxOutputLength,'Decoded byte limit exceeded');return result;
}
function summarizeRows(rows){return {count:rows.length,jsonBytes:jsonBytes(rows),rowValueBytes:rows.reduce((n,r)=>n+jsonBytes(r),0)};}
function compareCollection(a,b,identity){
 if(a===undefined||b===undefined)return {available:false};
 const entries=v=>Array.isArray(v)?v.map((row,index)=>[identity?.(row,index)??row?.id??String(index),row]):Object.entries(v);
 if(!a||!b||typeof a!=='object'||typeof b!=='object')return {available:true,wholeEqual:isDeepStrictEqual(a,b),worldBytes:jsonBytes(a),openingBytes:jsonBytes(b)};
 const world=new Map(entries(a)),opening=new Map(entries(b)),counts={equal:0,changed:0,worldOnly:0,openingOnly:0},bytes={equalOpening:0,changedWorld:0,changedOpening:0,worldOnly:0,openingOnly:0};
 assert.equal(world.size,entries(a).length,'Comparison identity must be unique');assert.equal(opening.size,entries(b).length,'Comparison identity must be unique');
 for(const [key,value] of world){if(!opening.has(key)){counts.worldOnly++;bytes.worldOnly+=jsonBytes(value);}else if(isDeepStrictEqual(value,opening.get(key))){counts.equal++;bytes.equalOpening+=jsonBytes(value);}else{counts.changed++;bytes.changedWorld+=jsonBytes(value);bytes.changedOpening+=jsonBytes(opening.get(key));}}
 for(const [key,value] of opening)if(!world.has(key)){counts.openingOnly++;bytes.openingOnly+=jsonBytes(value);}
 let prefix=0;if(Array.isArray(a)&&Array.isArray(b))while(prefix<Math.min(a.length,b.length)&&sameBytes(a[prefix],b[prefix]))prefix++;
 return {available:true,worldCount:world.size,openingCount:opening.size,wholeEqual:isDeepStrictEqual(a,b),counts,valueBytes:bytes,byteIdenticalPrefixRows:prefix,byteIdenticalPrefixBytes:prefix?jsonBytes(a.slice(0,prefix)):0};
}
function partition(value,path=[],rows=[]){
 const suffix=path.slice(1),split=path.length===0||path.length===1&&['world','opening'].includes(path[0])||
  ['extensions','numeric','numeric.evolution','numeric.evolution.world','numeric.evolution.world.registry',`extensions.${RUNTIME}`,`extensions.${RUNTIME}.plan`].includes(pathKey(suffix));
 if(value!==null&&typeof value==='object'&&!Array.isArray(value)&&split){
  const entries=Object.entries(value);rows.push({path:pathKey(path)+'@json-syntax',bytes:jsonBytes(value)-entries.reduce((n,[,v])=>n+jsonBytes(v),0),syntax:true});
  for(const [key,v] of entries)partition(v,[...path,key],rows);
 }else rows.push({path:pathKey(path),bytes:jsonBytes(value),count:Array.isArray(value)?value.length:undefined});
 return rows;
}
function historyTypes(runtime){
 const groups=new Map();for(const h of runtime.history){const x=groups.get(h.type)??{type:h.type,count:0,valueBytes:0,dataBytes:0};x.count++;x.valueBytes+=jsonBytes(h);x.dataBytes+=jsonBytes(h.data);groups.set(h.type,x);}
 return [...groups.values()].sort((a,b)=>b.valueBytes-a.valueBytes);
}
function repetition(save){
 const keys=new Map(),strings=new Map();let keyColonBytes=0,stringValueBytes=0;
 const walk=value=>{
  if(typeof value==='string'){const bytes=jsonBytes(value);stringValueBytes+=bytes;if(value.length>=80){const digest=sha256(value),x=strings.get(digest)??{sha256:digest,count:0,valueBytes:bytes};x.count++;strings.set(digest,x);}return;}
  if(!value||typeof value!=='object')return;
  if(Array.isArray(value)){for(const v of value)walk(v);return;}
  for(const [key,v] of Object.entries(value)){const bytes=jsonBytes(key)+1;keyColonBytes+=bytes;const x=keys.get(key)??{key,count:0,bytes:0};x.count++;x.bytes+=bytes;keys.set(key,x);walk(v);}
 };walk(save);
 return {keyColonBytes,stringValueBytes,keyColonFraction:keyColonBytes/jsonBytes(save),topKeys:[...keys.values()].sort((a,b)=>b.bytes-a.bytes).slice(0,12),
  duplicateLongStrings:[...strings.values()].filter(x=>x.count>1).map(x=>({...x,repeatedValueBytes:(x.count-1)*x.valueBytes})).sort((a,b)=>b.repeatedValueBytes-a.repeatedValueBytes).slice(0,8),
  note:'Diagnostic repeated string/key bytes, not independently removable fields; request JSON escaping and IDs overlap these diagnostics.'};
}
function ledgerAudit(world){
 const r=world.extensions[RUNTIME],receipts=world.numeric.receipts;let requestJsonValueBytes=0,requestTextBytes=0,operationValueBytes=0,directChangesRepeatedValueBytes=0,eventFactReferenceBytes=0;
 const requestTypes=new Map();
 for(const c of r.commits){requestJsonValueBytes+=jsonBytes(c.request);requestTextBytes+=Buffer.byteLength(c.request);const q=JSON.parse(c.request);for(const op of q.operations??[]){const x=requestTypes.get(op.type)??{type:op.type,count:0,valueBytes:0};x.count++;x.valueBytes+=jsonBytes(op);operationValueBytes+=jsonBytes(op);requestTypes.set(op.type,x);}}
 let numericRequestJsonValueBytes=0,numericRequestTextBytes=0;
 for(const receipt of receipts){numericRequestJsonValueBytes+=jsonBytes(receipt.request);numericRequestTextBytes+=Buffer.byteLength(receipt.request);const q=JSON.parse(receipt.request);if(q.operation.type==='direct'&&isDeepStrictEqual(q.operation.changes,receipt.changes))directChangesRepeatedValueBytes+=jsonBytes(receipt.changes);}
 const facts=new Map(r.facts.map(f=>[f.id,f]));let verifiedEventFactReferences=0;
 for(const event of world.events)for(const ref of event.facts){const f=facts.get(ref.id);if(f&&isDeepStrictEqual(ref,{id:f.id,subjectIds:f.subjectIds,occurredAt:f.occurredAt})){verifiedEventFactReferences++;eventFactReferenceBytes+=jsonBytes(ref);}}
 return {runtimeRequests:{jsonValueBytes:requestJsonValueBytes,textBytes:requestTextBytes,escapeAndQuoteBytes:requestJsonValueBytes-requestTextBytes,operationValueBytes,types:[...requestTypes.values()].sort((a,b)=>b.valueBytes-a.valueBytes)},
 numericRequests:{jsonValueBytes:numericRequestJsonValueBytes,textBytes:numericRequestTextBytes,escapeAndQuoteBytes:numericRequestJsonValueBytes-numericRequestTextBytes,directChangesRepeatedValueBytes},
 verifiedEventFactReferences,eventFactReferenceBytes,historyTypes:historyTypes(r),note:'Subvalues overlap their containing arrays. Repeated evidence/IDs are measured, not removed; links and ownership remain mandatory.'};
}
function equalSubtrees(world,opening){
 let bytes=0,count=0;const largest=[];
 const visit=(a,b,path)=>{
  if(sameBytes(a,b)){const n=jsonBytes(b);bytes+=n;count++;largest.push({path:pathKey(path),bytes:n});return;}
  if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b))return;
  for(const key of Object.keys(b))if(Object.hasOwn(a,key))visit(a[key],b[key],[...path,key]);
 };
 visit(world,opening,[]);return {maximalEqualValueBytes:bytes,count,openingValueFraction:bytes/jsonBytes(opening),largest:largest.sort((a,b)=>b.bytes-a.bytes).slice(0,10),note:'Byte-identical maximal subtrees at the same paths, counted once; excludes unequal parent keys/brackets. Diagnostic only: live equal state is not declared immutable or eligible for prefix sharing.'};
}
export function attributeSave(save){
 const total=jsonBytes(save),parts=partition(save);assert.equal(parts.reduce((n,x)=>n+x.bytes,0),total);
 const comparisons={};
 if(save.opening){
  for(const field of ['history','commits','facts','claims','knowledge','disclosures','stages','effects','numericArchives']){
   const identity=field==='claims'?x=>JSON.stringify([x.id,x.versionId]):field==='knowledge'?x=>JSON.stringify([x.actorId,x.claimId,x.versionId]):field==='numericArchives'?x=>x.attemptId:field==='commits'?x=>JSON.stringify([x.attemptId,x.id]):undefined;
   comparisons['runtime.'+field]=compareCollection(save.world.extensions[RUNTIME][field],save.opening.extensions[RUNTIME][field],identity);
  }
  for(const [label,path,id] of [
   ['events',['events']],['receipts',['numeric','receipts'],x=>JSON.stringify([save.world.numeric.attemptId,x.id])],
   ...['people','families','contacts','relationships','reputations'].map(k=>[k,['numeric','evolution','world',k]]),
   ...['enrollments','assignments','profiles','classes','cohorts','responsibilities'].map(k=>['registry.'+k,['numeric','evolution','world','registry',k]]),
   ['tables',[...ROOT,'plan','tables'],x=>x.semesterId],['random',['random']],['evolutionClock',['numeric','evolution','clock']],['player',['numeric','evolution','world','player']],
  ]){
   let comparison=compareCollection(get(save.world,path),get(save.opening,path),id);
   if(label==='receipts'&&save.world.numeric.attemptId!==save.opening.numeric.attemptId)comparison={sameAttempt:false,sharingEligible:false,world:summarizeRows(save.world.numeric.receipts),opening:summarizeRows(save.opening.numeric.receipts),note:'Separate attempt namespaces; no cross-attempt matching.'};
   comparisons[label]=comparison;
  }
 }
 return {normalizedJsonBytes:total,worldBytes:jsonBytes(save.world),openingBytes:jsonBytes(save.opening),partition:parts.map(x=>({...x,percentOfSave:100*x.bytes/total})).sort((a,b)=>b.bytes-a.bytes),
  equalSubtrees:save.opening?equalSubtrees(save.world,save.opening):null,topFive:parts.filter(x=>!x.syntax).sort((a,b)=>b.bytes-a.bytes).slice(0,5).map(x=>({...x,percentOfSave:100*x.bytes/total})),comparisons,
  repetition:repetition(save),ledgers:{world:ledgerAudit(save.world),opening:save.opening?ledgerAudit(save.opening):null},note:'Partition is disjoint and sums exactly. Other diagnostics are nested/overlapping and must not be added to the partition.'};
}
function memory(){const m=process.memoryUsage();return {rss:m.rss,heapUsed:m.heapUsed,external:m.external,arrayBuffers:m.arrayBuffers,maxRssBytes:process.resourceUsage().maxRSS*1024};}
export async function measureFile(file,method,expectedSha){
 global.gc?.();const baselineMemory=memory(),stages={},observed=[];
 const stage=async(name,fn)=>{const at=performance.now(),value=await fn();stages[name]=performance.now()-at;observed.push({after:name,...memory()});return value;};
 let bytes=await stage('readMs',()=>readFile(file));assert.equal(sha256(bytes),expectedSha,'Source checkpoint SHA-256 mismatch');
 const rawBytes=bytes.length;let save=await stage('parseInputMs',()=>JSON.parse(bytes.toString('utf8')));
 // Read-only full validation independent of parsing; restoreSave detaches and is measured separately.
 await stage('validateAndEncodeInputMs',()=>encodeSave(save));
 let detached=await stage('structuredCloneMs',()=>structuredClone(save));detached=null;global.gc?.();
 const prefix=method==='prefix'||method.startsWith('prefix-'),codec=method==='json'||method==='prefix'?null:method.replace(/^prefix-/,'');
 let prototype=prefix?await stage('packPrefixMs',()=>packPrefix(save)):save;
 let text=await stage('serializeMs',()=>JSON.stringify(prototype)),encoded=await stage('utf8EncodeMs',()=>Buffer.from(text)),serializedBytes=encoded.length;
 const encodedDigest=await stage('encodedDigestMs',()=>sha256(encoded));
 let compressed=codec?await stage('compressMs',()=>compressBytes(encoded,codec)):encoded;
 const storedBytes=compressed.length;
 let decoded=codec?await stage('decompressMs',()=>decompressBytes(compressed,codec,serializedBytes)):Buffer.from(compressed);
 await stage('integrityMs',()=>assert.equal(sha256(decoded),encodedDigest,'Codec roundtrip differs'));
 const decodedText=await stage('utf8DecodeMs',()=>decoded.toString('utf8'));
 let parsed=await stage('parseDecodedMs',()=>JSON.parse(decodedText));
 let validated=await stage('fullRestoreMs',()=>prefix?unpackPrefix(parsed):restoreSave(parsed));
 await stage('equalityMs',()=>assert.deepEqual(validated,save));
 const normalizedSha256=sha256(JSON.stringify({kind:save.kind,version:save.version,world:save.world,opening:save.opening}));assert.equal(sha256(JSON.stringify(validated)),normalizedSha256);
 const result={method,rawBytes,serializedBytes,storedBytes,storedFraction:storedBytes/rawBytes,savedFraction:1-storedBytes/rawBytes,sourceSha256:expectedSha,normalizedSha256,fullDataEqual:true,productionRestorePassed:true,
  stages,baselineMemory,observedMemory:observed,peakRssBytes:process.resourceUsage().maxRSS*1024,maxObservedHeapUsed:Math.max(baselineMemory.heapUsed,...observed.map(x=>x.heapUsed)),
  prefix:prefix?prototype.shared.map(b=>({path:pathKey(b.path),count:b.count,poolValueBytes:jsonBytes(b.rows)})):[],
  caveat:'Fresh Linux Node process high-water RSS, including input validation/clone/control copies. Heap is stage-boundary samples, not a peak. Neither measures Safari or IndexedDB. pack/fullRestore include their own unchanged formal validation.'};
 // Avoid retaining the many reference copies between trials (each trial also uses a fresh process).
 bytes=save=prototype=text=encoded=compressed=decoded=parsed=validated=null;return result;
}
async function fixtures(directory='work/s1'){
 const {experiencedOpening}=await import('../test/support/calendar.js');const {runFailure}=await import('../test/support/failure-scenario.js');
 const {failureResult}=await import('../src/runtime/homeroom.js');const {forkWorldAttempt,prepareWorldOperation}=await import('../src/runtime/transactions.js');
 const {runtimeScenario,request,event,fact,open,result,id}=await import('../test/support/runtime.js');const {failureOpening}=await import('../test/support/failure-scenario.js');
 await mkdir(directory,{recursive:true});const cases=[];
 const write=async(tag,payload,provenance)=>{const file=resolve(directory,tag+'.json'),bytes=encodeSave(payload);await writeFile(file,bytes);cases.push({tag,file,sha256:sha256(bytes),bytes:Buffer.byteLength(bytes),provenance});};
 const opening=experiencedOpening('easy'),failed=runFailure(opening,{route:'social',maxDays:6}).world,terminal=failureResult(failed);assert.ok(terminal);
 await write('t2-opening',createSave(opening,opening),'New S1 measurement: actual current T2 easy-mode untouched opening; not a three-year checkpoint.');
 await write('t2-failure',createSave(failed,opening),'New S1 measurement: bounded actual T2 social-failure branch, <=6 civil days, actual production commands; not a three-year checkpoint.');
 const opts={attemptId:id('attempt','s1-real-retry'),seeds:{settlement:33,streams:Object.fromEntries(Object.keys(opening.random).map(k=>[k,3]))},failureId:terminal.id,failedAttemptId:failed.identity.attemptId,schoolYearId:failed.position.schoolYearId,expectedRevision:failed.extensions[RUNTIME].revision};
 const retried=forkWorldAttempt(opening,opts,failed);await write('t2-retry',createSave(retried,opening),'New S1 measurement: authorized actual retry from the short failure branch; original opening retained, failed attempt IDs retired.');
 const legacy=failureOpening();await write('legacy-30-opening',createSave(legacy,legacy),'New S1 measurement: actual untouched retained 30-year core opening; no completed years.');
 // A small explicitly unverified-calendar contract fixture with a non-empty shared receipt/history
 // prefix and a changed belief/event with the same IDs. It is not natural gameplay evidence.
 let w=runtimeScenario(),e=event(w,'s1-prefix');w=prepareWorldOperation(w,request(w,'s1-event',[open(e),fact(e)])).world;
 const person=e.participantIds[1],claimId=id('claim','s1');
 w=prepareWorldOperation(w,request(w,'s1-learn',[{type:'claim',id:claimId,versionId:'v1',factId:id('fact','one'),statement:'合成契約背景敘述',sourceId:person},{type:'learn',actorId:person,claimId,versionId:'v1',source:{kind:'observation',actorId:person,basisFactId:id('fact','one')},belief:'believed',confidence:.8},result(e,person,'s1-result',1)])).world;
 for(let i=0;i<8;i++)w=prepareWorldOperation(w,request(w,'s1-before-'+i,[{type:'sample',stream:'events',id:'prefix-'+i,weights:[1,2,3]}])).world;
 const snap=structuredClone(w);
 w=prepareWorldOperation(w,request(w,'s1-change',[{type:'belief',actorId:person,claimId,versionId:'v1',belief:'rejected',confidence:.4},{type:'stage',eventId:e.id,fromStageId:e.stageId,stageId:id('stage','s1-next'),choice:null}])).world;
 for(let i=0;i<8;i++)w=prepareWorldOperation(w,request(w,'s1-after-'+i,[{type:'sample',stream:'events',id:'suffix-'+i,weights:[3,2,1]}])).world;
 await write('engineering-prefix',createSave(w,snap),'Synthetic contract fixture accepted by restoreSave, explicitly unverified calendar; controlled shared prefixes and mutable same-ID event/knowledge, not annual gameplay.');
 const manifest={kind:'teacher-hell-s1-samples',version:1,generatedAt:new Date().toISOString(),cases};await writeFile(resolve(directory,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');return manifest;
}
function summarizeTrials(trials){
 const median=values=>{const x=[...values].sort((a,b)=>a-b);return x.length%2?x[(x.length-1)/2]:(x[x.length/2-1]+x[x.length/2])/2;};
 const times=Object.keys(trials[0].stages);return {method:trials[0].method,trials:trials.length,rawBytes:trials[0].rawBytes,serializedBytes:trials[0].serializedBytes,storedBytes:trials[0].storedBytes,storedFraction:trials[0].storedFraction,savedFraction:trials[0].savedFraction,
  medianMs:Object.fromEntries(times.map(k=>[k,median(trials.map(t=>t.stages[k]))])),maxProcessRssBytes:Math.max(...trials.map(t=>t.peakRssBytes)),maxSampledHeapUsed:Math.max(...trials.map(t=>t.maxObservedHeapUsed)),
  medianEncodePathMs:median(trials.map(t=>['packPrefixMs','serializeMs','utf8EncodeMs','encodedDigestMs','compressMs'].reduce((n,k)=>n+(t.stages[k]??0),0))),medianDecodePathMs:median(trials.map(t=>['decompressMs','integrityMs','utf8DecodeMs','parseDecodedMs','fullRestoreMs'].reduce((n,k)=>n+(t.stages[k]??0),0))),
  allEqualAndValidated:trials.every(t=>t.fullDataEqual&&t.productionRestorePassed),observations:trials.map(t=>({peakRssBytes:t.peakRssBytes,baselineMemory:t.baselineMemory,stages:t.stages})),prefix:trials[0].prefix};
}
async function study(manifestFile='work/s1/manifest.json',output='simulation/results/storage-s1-20261105.json'){
 const manifest=JSON.parse(await readFile(manifestFile,'utf8'));assert.equal(manifest.kind,'teacher-hell-s1-samples');
 const legacy=JSON.parse(await readFile('simulation/results/career-core-20261104.json','utf8')),methods=['json','prefix','gzip','brotli','prefix-gzip','prefix-brotli'],cases=[];
 for(const source of manifest.cases){
  const bytes=await readFile(source.file);assert.equal(sha256(bytes),source.sha256);const attribution=attributeSave(JSON.parse(bytes.toString('utf8'))),measurements=[];
  for(const method of [...methods,...(source.tag==='t2-failure'?['gzip-web','brotli-web']:[])]){
   const trials=[];for(let repeat=0;repeat<2;repeat++){
    const child=spawnSync(process.execPath,['--expose-gc','--max-old-space-size=2048',fileURLToPath(import.meta.url),'worker',source.file,method,source.sha256],{encoding:'utf8',maxBuffer:2*1024*1024,timeout:120000});
    assert.equal(child.status,0,child.stderr||String(child.error));trials.push(JSON.parse(child.stdout));
   }
   measurements.push(summarizeTrials(trials));
  }
  cases.push({...source,attribution,measurements});console.log('Measured '+source.tag);
 }
 const previous=legacy.serialLoads.map(row=>({tag:row.tag,provenance:'Original 11-D report only; source checkpoint unavailable in S1',sourceSha256:legacy.career.checkpoints[row.tag].sha256,saveBytes:row.saveBytes,worldBytes:row.worldBytes,openingBytes:row.openingBytes,openingFraction:row.openingBytes/row.saveBytes,worldPeopleBytes:row.peopleBytes,worldFamiliesBytes:row.familyBytes,worldRegistryBytes:row.registryBytes,worldRelationshipsBytes:row.relationshipBytes,historyEntries:row.historyEntries,events:row.events,restoreMsHistorical:row.restoreMs,
  unmeasured:'Runtime arrays, receipts, prefix equality, compression and memory cannot be recovered from this summary.'}));
 const report={kind:'teacher-hell-s1-research-report',version:1,measurementScriptSha256:sha256(await readFile(fileURLToPath(import.meta.url))),baseHead:spawnSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).stdout.trim(),createdAt:new Date().toISOString(),
  environment:{node:process.version,v8:process.versions.v8,zlib:process.versions.zlib,brotli:process.versions.brotli,platform:process.platform,arch:process.arch,osRelease:release(),cpu:cpus()[0]?.model,workerHeapMiB:2048,exposedGc:true,trials:2,measurement:'Fresh child per method/trial, same machine/input/hash/heap. maxRSS is whole-process high water; sampled heap is not a peak; no browser performance claim.'},
  original11D:previous,cases,limits:['Original year-1/year-2/year-3/opening-4 source files unavailable; all new cases are small, explicitly identified samples. No extrapolated 229.5MB compression/dedup ratios.','Attribution of the original three years and proving the 115MB target remain blocked on hash-verified sources.','No production storage code, save version, gameplay schema, CAS or IndexedDB behavior changed.','Codec timings exclude disk/IndexedDB transactions. Control input validation, clone and equality verification are reported separately from restore path.']};
 await mkdir(dirname(output),{recursive:true});await writeFile(output,JSON.stringify(report,null,2)+'\n');return report;
}
async function main(args){
 const [cmd,...rest]=args;
 if(cmd==='attribute'){const [directory]=rest,manifest=JSON.parse(await readFile(`${directory}/manifest.json`,'utf8')),bytes=await readFile(`${directory}/completed.json`);assert.equal(sha256(bytes),manifest.files['completed.json'].sha256);const report={difficulty:manifest.difficulty,source:manifest.files['completed.json'],attribution:attributeSave(JSON.parse(bytes.toString()))};await writeFile(`${directory}/s2-analysis.json`,JSON.stringify(report,null,2));console.log('::notice title=S2 analysis::'+JSON.stringify(report));}
 else if(cmd==='worker'){assert.equal(rest.length,3);console.log(JSON.stringify(await measureFile(...rest)));}
 else if(cmd==='fixtures'){assert.ok(rest.length<=1);const m=await fixtures(...rest);console.log(JSON.stringify(m,null,2));}
 else if(cmd==='study'){assert.ok(rest.length<=2);await study(...rest);}
 else throw Error('Research only: fixtures [ignored-output-dir] | study [manifest] [report] | worker file method expected-sha256');
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))main(process.argv.slice(2)).catch(e=>{console.error(e.stack);process.exitCode=1;});
