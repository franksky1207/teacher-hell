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
