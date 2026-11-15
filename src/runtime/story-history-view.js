import { assertShape,identifier,derivePanel,PANEL_SOURCES } from '../player/panel.js';
import { directedKey } from '../world/relationships.js';
import { resolveWorldEvaluations } from '../world/evaluations.js';
import { numericValue,applyDelta } from '../numeric/math.js';
import { fieldDefinition } from '../numeric/dictionary.js';
import { targetRecord } from '../changes/targets.js';
import { canonicalData } from '../changes/settlement.js';
const key='teacher-hell/world';
const need=(ok,message)=>{if(!ok)throw new RangeError('STORY_HISTORY: '+message);};
const detach=value=>value===undefined?null:structuredClone(value);
/** A bounded query interface, never a partially historical World. No revision cache:
 * two operations in the same draft may have different history prefixes. Numeric
 * queries require explicit recorded inputs on replay; absence is not final-state 0.
 */
export function storyHistoryView(world,{beforeOrder=world.extensions[key].history.length+1,inputs=null}={}){
 const r=world.extensions[key];
 need(Number.isSafeInteger(beforeOrder)&&beforeOrder>=1&&beforeOrder<=r.history.length+1,'invalid boundary');
 const history=r.history.filter(h=>h.order<beforeOrder);
 const visible=row=>row.order<beforeOrder;
 const facts=r.facts.filter(visible),claims=r.claims.filter(visible);
 const knowledge=r.knowledge.filter(visible).map(k=>{
  const acquired=history.find(h=>h.order===k.order);need(acquired?.type==='knowledge','missing acquisition');
  const value={...k,belief:acquired.data.belief,confidence:acquired.data.confidence};
  for(const h of history)if(h.type==='belief'&&h.data.actorId===k.actorId&&h.data.claimId===k.claimId&&h.data.versionId===k.versionId)Object.assign(value,h.data.after);
  return value;
 });
 const numeric=(target,code)=>{
  if(inputs===null){need(beforeOrder===r.history.length+1,'historical numeric query needs a witness');return targetRecord(world.numeric.evolution.world,target)[code];}
  const rows=inputs.filter(x=>canonicalData(x.target)===canonicalData(target)&&x.code===code);
  need(rows.length>0&&rows.every(x=>Number.isFinite(x.value)&&x.value===rows[0].value),'missing or conflicting numeric witness');return rows[0].value;
 };
 return Object.freeze({beforeOrder,attemptId:world.identity.attemptId,
  fact:id=>detach(facts.find(f=>f.id===id)),
  claim:(id,versionId)=>detach(claims.find(c=>c.id===id&&c.versionId===versionId)),
  knowledge:(actorId,claimId,versionId)=>detach(knowledge.find(k=>k.actorId===actorId&&k.claimId===claimId&&k.versionId===versionId)),
  disclosure:(actorId,factId)=>detach(r.disclosures.find(d=>visible(d)&&d.actorId===actorId&&d.factId===factId)),
  story:eventId=>detach(history.findLast(h=>h.type==='story'&&h.eventId===eventId)?.data.state),
  numeric,
  // Relationships use the same explicit directional target/witness contract.
  relationship:(id,code)=>numeric({kind:'relationship',id},code),
  entries:()=>detach(history)
 });
}

// Version 2 is a read set, not a second numeric world. Panel sources are the
// necessary snapshot for N2; no registry, unrelated NPCs, journals or RNGs.
export function compactPanelSources(numericWorld){
 const current=numericWorld.player.current;
 const sources=structuredClone(current);
 for(const holder of ['person','life','work','outlook']){
  const codes=[...new Set(Object.values(PANEL_SOURCES).flat().filter(([name])=>name===holder).map(([,code])=>code))];
  const record=holder==='outlook'?sources.outlook.values:sources[holder];
  const selected=Object.fromEntries(codes.map(code=>[code,record[code]]));
  if(holder==='outlook')sources.outlook.values=selected;else sources[holder]=selected;
 }
 const evaluations=current.evaluations.some(e=>Object.hasOwn(e,'reference'))?resolveWorldEvaluations(numericWorld,current.evaluations):current.evaluations;
 const codes=[...new Set(PANEL_SOURCES.聲望.map(([,code])=>code))];
 sources.evaluations=evaluations.map(e=>({...structuredClone(e),values:Object.fromEntries(codes.map(code=>[code,e.values[code]]))}));
 derivePanel(sources);
 return sources;
}
export function captureStoryNumeric(world,op,{operationId,beforeOrder,contentDigest}){
 const numericWorld=world.numeric.evolution.world,reads=new Map(),fields=new Map();
 const read=(target,code)=>{
  const value=targetRecord(numericWorld,target)[code];numericValue(value);
  reads.set(canonicalData([target,code]),{target:structuredClone(target),code,value});return value;
 };
 const has=(target,code)=>{const present=Object.hasOwn(targetRecord(numericWorld,target),code);if(present)fields.set(canonicalData([target,code]),{target:structuredClone(target),code});return present;};
 return {read,has,
  finish:()=>({version:2,attemptId:world.identity.attemptId,cursor:world.extensions[key].plan.cursor,eventId:op.eventId,operationId,beforeOrder,contentDigest,trust:'captured-input-v1',reads:[...reads.values()],fields:[...fields.values()],panel:op.action==='confirm'?compactPanelSources(numericWorld):null})};
}
export function replayStoryNumeric(witness){
 const reads=new Map(),used=new Set(),fields=new Set(),usedFields=new Set();
 for(const row of witness.reads){
  assertShape(row,['target','code','value']);assertShape(row.target,['kind','id']);identifier(row.target.id);
  need(['person','player-person','player-life','player-work','player-outlook','relationship'].includes(row.target.kind),'unsupported read target');
  fieldDefinition(row.code);numericValue(row.value);
  const id=canonicalData([row.target,row.code]);need(!reads.has(id),'duplicate numeric read');reads.set(id,row);
 }
 for(const row of witness.fields){
  assertShape(row,['target','code']);assertShape(row.target,['kind','id']);identifier(row.target.id);fieldDefinition(row.code);
  need(['person','player-person','player-life','player-work','player-outlook'].includes(row.target.kind),'unsupported field target');
  const id=canonicalData([row.target,row.code]);need(!fields.has(id),'duplicate field input');fields.add(id);
 }
 const read=(target,code)=>{const id=canonicalData([target,code]);need(reads.has(id),'missing numeric read');used.add(id);return reads.get(id).value;};
 return {read,has:(target,code)=>{const id=canonicalData([target,code]);need(fields.has(id),'missing field input');usedFields.add(id);return true;},assertConsumed:()=>{need(used.size===reads.size,'unused numeric read');need(usedFields.size===fields.size,'unused field input');}};
}
export function compactStoryPanelDelta(witness,observed,playerId){
 const before=derivePanel(witness.panel),after=structuredClone(witness.panel);
 for(const row of observed)if(row.target.id===playerId&&row.target.kind.startsWith('player-')){
  const holder=row.target.kind.slice(7),record=holder==='outlook'?after.outlook.values:after[holder];
  if(record&&Object.hasOwn(record,row.code)){need(record[row.code]===row.before,'panel input differs from effect observation');record[row.code]=row.after;}
 }
 const panel=derivePanel(after);return Object.fromEntries(Object.keys(before).map(name=>[name,panel[name]-before[name]]));
}

/** Source checks are deliberately distinct from replay consistency. A bounded,
 * mutation-free same-day suffix can anchor values to the authoritative endpoint
 * and reversible receipt observations. Natural evolution, clipping, unknown
 * writers and another attempt prevent that proof. Such inputs remain captured
 * boundary data, NOT independently reconstructed historical truth.
 */
export function auditStoryNumericWitness(world,h){
 const r=world.extensions[key],w=h.data.numericWitness;
 assertShape(w,['version','attemptId','cursor','eventId','operationId','beforeOrder','contentDigest','trust','reads','fields','panel']);
 need(w.version===2&&w.trust==='captured-input-v1','unsupported numeric witness version/trust');
 need(w.attemptId===h.attemptId&&w.cursor===h.cursor&&w.eventId===h.eventId&&w.operationId===h.operationId&&w.beforeOrder===h.data.beforeOrder&&w.contentDigest===h.data.state.contentDigest,'numeric witness belongs to another historical context');
 need(Array.isArray(w.reads)&&Array.isArray(w.fields),'numeric reads/fields required');replayStoryNumeric(w);
 need((h.data.action.action==='confirm')===(w.panel!==null),'panel input only on confirmation');
 if(w.panel){need(w.panel.playerId===world.identity.playerId&&w.panel.schoolId===world.identity.schoolId,'panel input identity differs');derivePanel(w.panel);}
 const rows=[...w.reads];
 if(w.panel)for(const holder of ['person','life','work','outlook'])for(const [code,value] of Object.entries(holder==='outlook'?w.panel.outlook.values:w.panel[holder]))rows.push({target:{kind:'player-'+holder,id:w.panel.playerId},code,value});
 if(w.panel){
  for(const holder of ['person','life','work','outlook']){
   const codes=[...new Set(Object.values(PANEL_SOURCES).flat().filter(([name])=>name===holder).map(([,code])=>code))];
   assertShape(holder==='outlook'?w.panel.outlook.values:w.panel[holder],codes);
  }
  const codes=[...new Set(PANEL_SOURCES.聲望.map(([,code])=>code))];
  for(const evaluation of w.panel.evaluations){
   assertShape(evaluation.values,codes);
   if(evaluation.kind!=='bootstrap')for(const [code,value] of Object.entries(evaluation.values))rows.push({target:{kind:evaluation.kind==='group'?'group-evaluation':code.startsWith('8-')?'reputation':'relationship',id:directedKey(evaluation.sourceId,evaluation.targetId)},code,value});
  }
 }
 const values=new Map();for(const row of rows){const id=canonicalData([row.target,row.code]);need(!values.has(id)||values.get(id)===row.value,'conflicting numeric inputs');values.set(id,row.value);}
 const safeTypes=new Set(['story','fact','claim','knowledge','belief','disclosure','choice','event-exposure','result','effect','event-lifecycle','stage','slot-complete','event-selection','event-catalogue']);
 const suffix=r.history.filter(x=>x.order>=w.beforeOrder);
 const naturalSettled=h.data.action.action==='confirm'||r.history.some(x=>x.order<w.beforeOrder&&x.attemptId===h.attemptId&&x.at.date===h.at.date&&(['effect','time','slot-complete'].includes(x.type)||x.type==='story'&&x.data.action.action==='confirm'));
 const anchored=naturalSettled&&world.identity.attemptId===h.attemptId&&world.numeric.attemptId===h.attemptId&&world.numeric.evolution.clock.lastNaturalDate===h.at.date&&world.numeric.evolution.clock.date===h.at.date&&suffix.every(x=>x.attemptId===h.attemptId&&x.at.date===h.at.date&&safeTypes.has(x.type));
 const effects=suffix.filter(x=>x.type==='effect');
 // Receipts are a separate existing ledger. Never trust a witness's self-declared source.
 const checkedEffect=x=>{
  const receipt=(world.numeric.attemptId===x.attemptId?world.numeric.receipts:r.numericArchives.find(a=>a.attemptId===x.attemptId)?.receipts??[]).find(q=>q.id===x.data.numericReceiptId);
  need(receipt&&canonicalData(receipt.changes)===canonicalData(x.data.changes),'numeric receipt differs from source effect');
  const request=JSON.parse(receipt.request),commit=r.commits.find(c=>c.id===x.operationId&&c.attemptId===x.attemptId);
  need(commit?.numericReceiptIds.includes(receipt.id)&&commit.historyIds.includes(x.id)&&request.id===receipt.id&&request.attemptId===x.attemptId&&request.date===x.at.date&&request.sequence===receipt.sequence,'unowned numeric source receipt');
  for(const observation of x.data.observed){const changes=receipt.changes.filter(c=>canonicalData(c.target)===canonicalData(observation.target)&&c.code===observation.code);need(changes.length>0&&observation.after===changes.reduce((value,change)=>applyDelta(value,change.delta),observation.before),'invalid source observation');}
  return receipt;
 };
 const receipts=new Map(effects.map(x=>[x.id,checkedEffect(x)]));
 let endpointChecks=0,observationChecks=0,capturedOnly=0;
 for(const row of rows){
  numericValue(row.value);
  for(const x of effects.filter(x=>x.operationId===h.operationId&&x.order<h.order)){
   const observation=x.data.observed.find(o=>canonicalData(o.target)===canonicalData(row.target)&&o.code===row.code);
   if(observation){need(row.value===observation.before,'numeric read differs from source observation');observationChecks++;}
  }
  let provable=anchored,value;
  // A contact may create an edge. Its birth values are not historical proof.
  if(row.target.kind==='relationship'&&suffix.some(x=>x.type==='fact'&&r.facts.find(f=>f.id===x.data.factId)?.data.type==='contact'))provable=false;
  if(provable){try{value=targetRecord(world.numeric.evolution.world,row.target)[row.code];numericValue(value);}catch{provable=false;}}
  if(provable)for(const x of [...effects].reverse()){
   const changes=receipts.get(x.id).changes.filter(c=>canonicalData(c.target)===canonicalData(row.target)&&c.code===row.code);
   if(!changes.length)continue;
   const observation=x.data.observed.find(o=>canonicalData(o.target)===canonicalData(row.target)&&o.code===row.code);
   need(observation&&value===observation.after,'source chain differs from numeric endpoint');
   let intermediate=observation.before;
   for(const change of changes){const next=applyDelta(intermediate,change.delta);if(change.delta!==0&&(next===0||next===100))provable=false;intermediate=next;}
   if(!provable)break;
   value=observation.before;
  }
  if(provable){need(row.value===value,'numeric read differs from historical source endpoint');endpointChecks++;}else capturedOnly++;
 }
 // Selection metadata/weights are necessary structural inputs. Only a suffix
 // without structural writers permits comparing them to the endpoint selection.
 if(w.panel&&anchored){
  const current=compactPanelSources(world.numeric.evolution.world);
  const metadata=panel=>panel.evaluations.map(({values,...entry})=>entry);
  need(canonicalData(metadata(w.panel))===canonicalData(metadata(current)),'panel evaluation source metadata differs');
  for(const evaluation of w.panel.evaluations.filter(e=>e.kind==='bootstrap'))need(canonicalData(evaluation.values)===canonicalData(current.evaluations.find(e=>e.sourceId===evaluation.sourceId).values),'bootstrap panel input differs from source endpoint');
 }
 return {endpointChecks,observationChecks,capturedOnly};
}
