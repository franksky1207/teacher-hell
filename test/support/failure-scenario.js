/** Production-core orchestration: no date baselines, injected states or failure flags. */
import { foundationScenario } from './scenarios.js';
import { createRandom } from '../../src/numeric/random.js';
import { startFailureSchoolCareer,prepareWorldOperation } from '../../src/runtime/transactions.js';
import { runtimeOf } from '../../src/runtime/model.js';
import { createId } from '../../src/contracts/foundation.js';
import { homeroomCatalogue } from '../../src/runtime/story-content.js';
import { failureResult,crisisContext } from '../../src/runtime/homeroom.js';
import { readStory } from '../../src/runtime/story.js';
import { schoolActions } from '../../src/runtime/campus.js';
import { formalSlot } from '../../src/runtime/schedule.js';
export function failureOpening(seed=1){const f=foundationScenario(74);f.events=[];f.enrollments=[];f.random.events=createRandom(seed).snapshot();return startFailureSchoolCareer(f,{startYear:2026,subject:'國文',seed:75});}
export function failureRequest(w,operations,kind='formal-event'){return {id:createId('operation',[w.identity.attemptId,'failure-driver',String(runtimeOf(w).revision)]),attemptId:w.identity.attemptId,expectedRevision:runtimeOf(w).revision,actorId:w.identity.playerId,preconditions:[],calendarContext:{kind},operations};}
export const failureApply=(w,operations,kind)=>prepareWorldOperation(w,failureRequest(w,operations,kind)).world;
export function catalogueFor(mode,id='homeroom:'+mode){const c=homeroomCatalogue();c.catalogueId=id;c.definitions=c.definitions.filter(d=>mode==='all'||(mode==='social'?d.id.includes('replacement'):mode==='pressure'?d.id.includes('ordinary-pressure'):mode==='burnout'?d.id.includes('exhaustion'):mode==='support'?d.id.includes('crisis-support'):d.id.includes('exhaustion')||d.id.includes('crisis-support')));c.bindings=c.bindings.filter(b=>c.definitions.some(d=>d.id===b.definitionId));return c;}
export function runFailure(initial,{route='social',maxDays=35,option=null,onWorld=()=>{},stopBeforeFailure=false}={}){
 let w=initial;const firstDate=w.position.date,registrations=new Set(runtimeOf(w).history.filter(h=>h.type==='event-catalogue').map(h=>h.data.catalogueId));
 if(!registrations.has('homeroom:'+route)){w=failureApply(w,[catalogueFor(route==='social'?'social':'pressure','homeroom:'+route)]);registrations.add('homeroom:'+route);}
 if(!runtimeOf(w).history.some(h=>h.type==='academic'&&h.data.input.action==='open'))w=failureApply(w,[{type:'academic',action:'open',termId:'2026:autumn'}],'routine');
 const end=Date.parse(firstDate+'T00:00:00Z')+maxDays*86400000;let commands=0;
 for(;commands<2000&&!failureResult(w);commands++){
  onWorld(w);if(Date.parse(w.position.date+'T00:00:00Z')>end)break;
  const r=runtimeOf(w),selected=r.history.filter(h=>h.type==='event-selection').flatMap(h=>h.data.selected),states=selected.map(s=>({s,state:r.history.findLast(h=>h.type==='event-lifecycle'&&h.eventId===s.eventId)?.data.status??'reserved'}));
  const active=states.find(x=>x.state==='active'||x.state==='waiting'&&readStory(w,x.s.eventId).canResume);
  if(active){const v=readStory(w,active.s.eventId);let action,optionId=null;
   if(v.canResume)action='resume';else if(v.canNext)action='next';else if(v.confirmation){if(stopBeforeFailure&&r.history.some(h=>h.type==='homeroom-result'&&['notice','resignation-pending'].includes(h.data.kind)))break;action='confirm';}else if(v.choices.length){action='select';optionId=option??(active.s.definitionId.includes('pressure')?'coordinate':active.s.definitionId.includes('replacement')?'appeal':active.s.definitionId.includes('support')?'accept':'help');if(!v.choices.some(o=>o.id===optionId))optionId=v.choices[0].id;}else if(v.canFinish)action='finish';else throw Error('Unrecognized playable story state');
   w=failureApply(w,[{type:'story',eventId:active.s.eventId,action,optionId}]);continue;
  }
  const reserved=states.find(x=>x.state==='reserved'&&x.s.date===w.position.date&&x.s.slotId===w.position.slotId);if(reserved){w=failureApply(w,[{type:'admit-event',eventId:reserved.s.eventId}]);continue;}
  if(r.history.some(h=>h.type==='slot-complete'&&h.cursor===r.plan.cursor)){w=failureApply(w,[{type:'advance-time',planId:r.plan.id,steps:1}],'routine');continue;}
  if(!r.history.some(h=>h.type==='event-selection'&&h.at.date===w.position.date)){
   let catalogueId='homeroom:'+route;
   if(route!=='social'&&crisisContext(w).ordinary>=3&&(route==='support'||crisisContext(w).risk.band!=='一般'||Object.values(crisisContext(w).risk.single).some(x=>x.hit))){catalogueId='homeroom:late-crisis';if(!registrations.has(catalogueId)){w=failureApply(w,[catalogueFor(route==='physical'?'burnout':route==='support'?'support':'crisis',catalogueId)]);registrations.add(catalogueId);}}
   w=failureApply(w,[{type:'draw-events',catalogueId}]);continue;
  }
  if(r.history.some(h=>h.type==='slot-complete'&&h.cursor===r.plan.cursor))w=failureApply(w,[{type:'advance-time',planId:r.plan.id,steps:1}],'routine');
  else {const actions=schoolActions(w),activity=['automatic','class-talk','prepare','supervise','rest','routine'].find(a=>actions.includes(a));w=failureApply(w,[{type:'school-action',activity}],'routine');}
 }
 return {world:w,commands,failed:!!failureResult(w),days:1+(Date.parse(w.position.date)-Date.parse(firstDate))/86400000};
}
