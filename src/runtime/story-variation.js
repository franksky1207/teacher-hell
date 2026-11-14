/** Phase 17-B: seeded, auditable presentation and outcome selection.
 * Domain separation keeps story draws stable across reloads and unrelated streams.
 * It is not a replacement for the existing world PRNG or N1–N8 formulas.
 */
import {createRandom} from '../numeric/random.js';
import {targetRecord} from '../changes/targets.js';
const need=(ok,message)=>{if(!ok)throw new RangeError('STORY_VARIATION: '+message);};
function seed(parts){
 const key=JSON.stringify(parts);let h=2166136261;
 for(let i=0;i<key.length;i++){h^=key.charCodeAt(i);h=Math.imul(h,16777619);}
 return h>>>0;
}
/** Stable for one attempt/event/stage. Never use Math.random or UI state. */
export function choicePermutation(attemptId,eventId,stageId,ids){
 const order=[...ids],rng=createRandom(seed(['order-v1',attemptId,eventId,stageId]));
 for(let i=order.length-1;i>0;i--){const j=rng.integer(0,i);[order[i],order[j]]=[order[j],order[i]];}
 return order;
}
export function outcomeDraw(world,event,stageId,option,variants){
 need(Array.isArray(variants)&&variants.length>0,'no outcome candidates');
 // Candidate difficulty multipliers (0.93 / 1 / 1.07) remain unapproved;
 // retain neutral dispersion until representative tests and phase 21 calibration.
 const tau=1;
 const actors={teacher:world.identity.playerId,participant:event.participantIds[0],companion:event.participantIds[1]};
 const weights=variants.map(v=>{
  let score=Math.log(v.weight);
  for(const m of v.modifiers??[]){
   const actorId=actors[m.role];need(actorId,'missing actor');
   const target={kind:m.role==='teacher'?'player-'+m.holder:'person',id:actorId};
   const value=targetRecord(world.numeric.evolution.world,target)[m.code];
   need(Number.isFinite(value),'missing numeric modifier');
   score+=((value-50)/50)*m.influence;
  }
  return score/tau;
 });
 const top=Math.max(...weights),scaled=weights.map(x=>Math.exp(x-top));
 const rng=createRandom(seed(['outcome-v1',world.identity.attemptId,event.id,stageId,option.id]));
 const index=rng.weightedIndex(scaled);
 return {index,variantId:variants[index].id,weights:scaled};
}
