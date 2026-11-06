import { validateStoryReference } from './story-content.js';
/** Detached draft helpers; only transactions.js may publish their effects. */
import { validateEventDefinitions, buildEventCandidates, eventIndex, weighEventCandidate, candidateConflict } from './event-candidates.js';
import { canonicalData } from '../changes/settlement.js';
import { restoreRandom } from '../numeric/random.js';
import { calendarDay,gradeAt } from '../calendar/calendar.js';
import { createId, validateId } from '../contracts/foundation.js';
import { assertShape,identifier } from '../player/panel.js';
const need=(ok,m)=>{if(!ok)throw new RangeError(`EVENT_SELECTION: ${m}`);};
const runtime=w=>w.extensions['teacher-hell/world'];
const tuple=(...x)=>JSON.stringify(x);
export function registerEventCatalogue(world,op){
 assertShape(op,['type','catalogueId','definitions','bindings','engineering']);identifier(op.catalogueId);validateEventDefinitions(op.definitions);
 for(const d of op.definitions)if(d.content.status==='ready'||d.content.resourceId.startsWith('engineering:'))validateStoryReference(d);
 need(typeof op.engineering==='boolean'&&Array.isArray(op.bindings)&&op.bindings.length===op.definitions.length,'Catalogue weight bindings');
 const ids=new Set(op.definitions.map(d=>d.id));need(new Set(op.bindings.map(b=>b.definitionId)).size===ids.size,'One binding per definition');
 for(const b of op.bindings){assertShape(b,['definitionId','sources','valence']);need(ids.has(b.definitionId)&&Array.isArray(b.sources)&&b.sources.length===6&&b.sources.every(s=>typeof s==='string'&&s.length)&&['negative','neutral','positive'].includes(b.valence),'Invalid catalogue binding');}
 need(!runtime(world).history.some(h=>h.type==='event-catalogue'&&h.data.catalogueId===op.catalogueId),'Immutable catalogue ID already registered');
 for(const h of runtime(world).history)if(h.type==='event-catalogue')for(const d of op.definitions)for(const old of h.data.definitions){
  if(old.id===d.id)need(old.topicId===d.topicId&&old.type===d.type,'Subtopic identity cannot change topic/type');
  if(old.topicId===d.topicId)need(canonicalData(old.coreCodes)===canonicalData(d.coreCodes),'Topic core codes are shared across catalogue versions');
 }
 return {catalogueId:op.catalogueId,definitions:structuredClone(op.definitions),bindings:structuredClone(op.bindings),engineering:op.engineering};
}
export function selectWorldEvents(world,operation,command,receipt){
 let op=operation,catalogueId=null;
 if(Object.hasOwn(operation,'catalogueId')){assertShape(operation,['type','catalogueId']);const catalogue=runtime(world).history.find(h=>h.type==='event-catalogue'&&h.data.catalogueId===operation.catalogueId);need(catalogue,'Catalogue must be registered before drawing');catalogueId=operation.catalogueId;op={type:'draw-events',definitions:catalogue.data.definitions,bindings:catalogue.data.bindings,engineering:catalogue.data.engineering};}
 else need(operation.engineering===true,'Formal draws must reference a registered catalogue');
 assertShape(op,['type','definitions','bindings','engineering']);need(typeof op.engineering==='boolean','Explicit engineering flag');
 // Lock the existing day budget/count before constructing or weighting candidates.
 const day=calendarDay(world.position.date,gradeAt(world.position.date,runtime(world).plan.startYear),runtime(world).plan.calendarVersion),r=runtime(world),index=eventIndex(world);
 need(!r.history.some(h=>h.type==='event-selection'&&h.at.date===day.date),'Day already decided; never reroll');
 need(Array.isArray(op.bindings)&&op.bindings.length===op.definitions.length&&new Set(op.bindings.map(b=>b.definitionId)).size===op.bindings.length,'One weight binding per definition');
 const defs=new Map(op.definitions.map(d=>[d.id,d])),bindings=new Map(op.bindings.map(b=>[b.definitionId,b]));
 need(op.bindings.every(b=>defs.has(b.definitionId)),'Unknown weight binding');
 for(const b of op.bindings){assertShape(b,['definitionId','sources','valence']);need(Array.isArray(b.sources)&&b.sources.length===6&&b.sources.every(s=>typeof s==='string'&&s.length)&&['negative','neutral','positive'].includes(b.valence),'Invalid weight binding');}
 const groupId=day.segment?.id??`day:${day.date}`,priorSelections=index.records.filter(s=>s.groupId===groupId),admissions=r.history.flatMap(h=>h.data.calendarAdmission?[h.data.calendarAdmission]:[]).filter(a=>a.groupId===groupId),reserved=priorSelections.filter(s=>!world.events.some(e=>e.id===s.eventId));
 const occupied=[...admissions,...reserved],slotsUsed=new Set(occupied.filter(s=>s.date===day.date).map(s=>s.slotId));
 const rng=restoreRandom(world.random.events),before=rng.snapshot(),draw=(id,weights)=>{const i=rng.weightedIndex(weights);receipt.draws.push({id,stream:'events',index:i,weights:[...weights]});return i;};
 let max=day.segment?Math.max(0,day.segment.quota-occupied.length):day.quota?.kind==='saturday'?2:day.quota?.max??0;
 if(!day.segment)max=Math.max(0,max-occupied.length);
 const usable=c=>c.slotIds.find(s=>!slotsUsed.has(s)&&(!(day.quota?.kind==='saturday')||['morning','afternoon'].includes(s))&&(!s.startsWith('study')||!Array.from(slotsUsed).some(x=>x.startsWith('study'))));
 const requested=max>0?(day.segment?max:draw(`event-count:${day.date}`,Array(max+1).fill(1))):0,selected=[],excluded=[];
 const built=buildEventCandidates(world,op.definitions,{engineering:op.engineering});
 let pool=[];
 for(const c of built.candidates){try{const weighted=weighEventCandidate(world,c,defs.get(c.definitionId),bindings.get(c.definitionId),index);if(weighted.effectiveWeight>0)pool.push(weighted);else built.rejected.push({key:c.key,reason:'zero-weight'});}catch(error){if(!(error instanceof RangeError))throw error;built.rejected.push({key:c.key,reason:'numeric-weight-source-missing'});}}
 pool=pool.filter(c=>usable(c));const poolSize=pool.length;
 while(selected.length<requested&&pool.length){
  const weights=pool.map(c=>c.effectiveWeight),pick=rng.weightedIndex(weights),c=pool[pick],slotId=usable(c);
  receipt.draws.push({id:`event-pick:${day.date}:${selected.length}`,stream:'events',index:pick,poolSize:pool.length,totalWeight:weights.reduce((a,b)=>a+b,0),selectedKey:c.key,selectedWeight:c.effectiveWeight});
  if(!slotId){pool.splice(pick,1);continue;}
  const eventId=createId('event',[world.identity.attemptId,groupId,day.date,c.key]),stageId=createId('stage',[eventId,'initial']);
  const s={...c,slotId,groupId,eventId,stageId,status:'reserved'};receipt.draws.at(-1).candidate=canonicalData(s);selected.push(s);slotsUsed.add(slotId);
  pool=pool.filter(other=>{const reason=candidateConflict(other,s,day.date);if(reason){excluded.push({key:other.key,reason});return false;}return !!usable(other);});
 }
 world.random.events=rng.snapshot();
 const summarize=rows=>{const counts=new Map();for(const row of rows)counts.set(row.reason,(counts.get(row.reason)??0)+1);return [...counts].map(([reason,count])=>({reason,count}));};
 return {version:1,catalogueId,poolSize,groupId,requested,selected,rejected:summarize(built.rejected),excluded:summarize(excluded),randomBefore:before,randomAfter:rng.snapshot(),operationId:command.id};
}
function selectionRecord(world,eventId){
 const history=runtime(world).history,selected=history.find(h=>h.type==='event-selection'&&h.data.selected.some(s=>s.eventId===eventId))?.data.selected.find(s=>s.eventId===eventId);
 return selected?{...selected,status:history.findLast(h=>h.type==='event-lifecycle'&&h.eventId===eventId)?.data.status??'reserved'}:null;
}
export function selectedEvent(world,eventId){const selected=selectionRecord(world,eventId);need(selected,'Unknown selected event');return selected;}

export function admissionEvent(world,op){
 assertShape(op,['type','eventId']);const s=selectedEvent(world,op.eventId);
 need(s.status==='reserved'&&!world.events.some(e=>e.id===s.eventId),'Already admitted');
 need(s.date===world.position.date&&s.slotId===world.position.slotId,'Admission belongs to its locked date/slot');
 return {schemaVersion:1,id:s.eventId,definitionId:s.definitionId,contentVersion:s.content.version,type:s.type,participantIds:s.participantIds,stageId:s.stageId,facts:[],knowledge:[],results:[],choice:null};
}
export function lifecycleChange(world,op){
 assertShape(op,['type','eventId','status','basisFactId']);const s=selectedEvent(world,op.eventId),e=world.events.find(e=>e.id===op.eventId);
 need(e&&s.status!=='ended'&&['active','waiting','ended'].includes(op.status),'Invalid lifecycle transition');
 need(!(s.status===op.status),'Lifecycle already in state');
 need(runtime(world).facts.some(f=>f.id===op.basisFactId&&e.facts.some(ref=>ref.id===f.id)),'Lifecycle needs a linked objective fact');
 need(e.choice===null||e.choice.confirmedOptionId!==null,'Cannot end/pause unresolved decision');
 return {status:op.status,previous:s.status,basisFactId:op.basisFactId};
}
/** Restore rejects altered selection identities, duplicate date decisions and orphan lifecycle. */
export function validateEventSelectionHistory(world){
 const r=runtime(world),dates=new Set(),ids=new Set(),statuses=new Map(),catalogues=new Set(),quotas=new Map(),usedSlots=new Map();
 for(const h of r.history){
  if(h.type==='event-catalogue'){
   need(!catalogues.has(h.data.catalogueId),'Duplicate registered catalogue');catalogues.add(h.data.catalogueId);
   const op={type:'register-event-catalogue',...h.data};validateEventDefinitions(op.definitions);
   const commit=r.commits.find(c=>c.id===h.operationId&&c.attemptId===h.attemptId),request=JSON.parse(commit.request);
   need(request.operations.some(o=>o.type==='register-event-catalogue'&&canonicalData(o)===canonicalData(op)),'Catalogue differs from registered command');
  }else if(h.type==='event-selection'){
   const d=h.data;assertShape(d,['version','catalogueId','poolSize','groupId','requested','selected','rejected','excluded','randomBefore','randomAfter','operationId']);
   const day=calendarDay(h.at.date,gradeAt(h.at.date,r.plan.startYear),r.plan.calendarVersion),groupId=day.segment?.id??`day:${day.date}`,limit=day.quota?.kind==='protected-day'?0:day.segment?.quota??(day.quota?.kind==='saturday'?2:day.quota?.max??0);
   need(d.groupId===groupId&&d.requested<=limit,'Calendar count/group differs');
   need((quotas.get(groupId)??0)+d.selected.length<=limit,'Saved segment/day quota exceeded');quotas.set(groupId,(quotas.get(groupId)??0)+d.selected.length);
   need(Number.isInteger(d.poolSize)&&d.poolSize>=d.selected.length,'Invalid candidate pool size');
   if(d.catalogueId!==null)need(r.history.some(c=>c.type==='event-catalogue'&&c.order<h.order&&c.data.catalogueId===d.catalogueId),'Selection catalogue missing');
   need(d.version===1&&!dates.has(h.at.date)&&d.operationId===h.operationId,'Duplicate/invalid date decision');dates.add(h.at.date);
   const replay=restoreRandom(d.randomBefore);restoreRandom(d.randomAfter);
   const commit=r.commits.find(c=>c.id===h.operationId&&c.attemptId===h.attemptId),count=commit.draws.find(v=>v.id===`event-count:${h.at.date}`);
   if(count)need(replay.weightedIndex(count.weights)===count.index&&d.requested===count.index,'Count draw differs from locked decision');
   for(const [i,s] of d.selected.entries()){
    const pick=commit.draws.find(v=>v.id===`event-pick:${h.at.date}:${i}`);
    need(pick?.candidate===canonicalData(s)||pick?.candidate===undefined&&s.content.status!=='ready'&&!s.content.resourceId.startsWith('engineering:'),'Candidate differs from transaction evidence');
    need(pick?.selectedKey===s.key&&pick.selectedWeight===s.effectiveWeight&&(i!==0||pick.poolSize===d.poolSize),'Selection differs from draw receipt');replay.next();
   }
   need(canonicalData(replay.snapshot())===canonicalData(d.randomAfter),'Selection random state chain differs');
   need(Number.isInteger(d.requested)&&d.requested>=0&&d.requested<=5&&Array.isArray(d.selected)&&d.selected.length<=d.requested,'Invalid count');
   for(const s of d.selected){
    const source=d.catalogueId!==null?r.history.find(c=>c.type==='event-catalogue'&&c.data.catalogueId===d.catalogueId).data:JSON.parse(commit.request).operations.find(o=>o.type==='draw-events');
    const definition=source.definitions.find(x=>x.id===s.definitionId);
    need(definition&&definition.topicId===s.topicId&&definition.type===s.type&&canonicalData(definition.content)===canonicalData(s.content),'Reservation content differs from registered definition');
    if(definition.content.status==='ready'||definition.content.resourceId.startsWith('engineering:'))validateStoryReference(definition);
    validateId(s.eventId,'event');validateId(s.stageId,'stage');
    const at=day.slots.findIndex(x=>x.id===s.slotId),start=day.slots.findIndex(x=>x.id===h.at.slotId),slots=usedSlots.get(day.date)??new Set();
    need(at>=start&&at>=0&&!day.slots[at].protected&&!slots.has(s.slotId),'Reservation at illegal/duplicate slot');
    need(day.quota?.kind!=='saturday'||['morning','afternoon'].includes(s.slotId),'Saturday private slot adds no quota');
    need(!s.slotId.startsWith('study')||![...slots].some(x=>x.startsWith('study')),'Night study shares one place');slots.add(s.slotId);usedSlots.set(day.date,slots);
    need(!ids.has(s.eventId)&&s.date===h.at.date&&s.groupId===d.groupId&&s.status==='reserved','Invalid reservation');
    need(s.eventId===createId('event',[h.attemptId,s.groupId,s.date,s.key])&&s.stageId===createId('stage',[s.eventId,'initial']),'Selection identity differs');
    need(s.key===tuple(s.definitionId,s.participantIds,s.factIds)&&s.participantIds.length>=1&&s.slotIds.includes(s.slotId),'Invalid candidate key/slot');
    need(s.rawWeight>=0&&s.rawWeight<=100&&[1.6,1,0.7].includes(s.k)&&s.exposureFactor>=1&&s.exposureFactor<=2&&(definition.eligibility.homeroom?Number.isFinite(s.riskFactor)&&s.riskFactor>=1&&s.riskFactor<=25:s.riskFactor===undefined)&&s.effectiveWeight===s.rawWeight*s.k*s.exposureFactor*(s.riskFactor??1),'Invalid recorded weight');
    need(s.participantIds.every(id=>id===world.identity.playerId||Object.hasOwn(world.numeric.evolution.world.people,id)),'Missing participant');
    ids.add(s.eventId);statuses.set(s.eventId,'reserved');
   }
  }else if(h.type==='event-exposure'){
   const f=r.facts.find(f=>f.id===h.data.basisFactId);
   need(ids.has(h.eventId)&&['active','waiting'].includes(statuses.get(h.eventId))&&f&&f.order<h.order&&h.data.participantIds.every(id=>f.subjectIds.includes(id))&&r.disclosures.some(d=>d.actorId===world.identity.playerId&&d.factId===f.id&&d.order<h.order),'Invalid substantive exposure');
  }else if(h.type==='event-lifecycle'){
   need(ids.has(h.eventId)&&statuses.get(h.eventId)===h.data.previous&&h.data.previous!=='ended'&&['active','waiting','ended'].includes(h.data.status),'Broken lifecycle');
   need(world.events.some(e=>e.id===h.eventId),'Orphan lifecycle');
   if(h.data.previous==='reserved'){
    need(h.data.status==='active'&&h.data.basisFactId===null,'Admission must activate a reservation');
    const s=r.history.filter(x=>x.type==='event-selection').flatMap(x=>x.data.selected).find(s=>s.eventId===h.eventId);
    need(h.at.date===s.date&&h.at.slotId===s.slotId,'Admission moved from locked time');
   }else need(r.facts.some(f=>f.id===h.data.basisFactId&&f.order<h.order&&world.events.find(e=>e.id===h.eventId).facts.some(ref=>ref.id===f.id)),'Lifecycle lacks objective basis');
   statuses.set(h.eventId,h.data.status);
  }
 }
 for(const s of r.history.filter(h=>h.type==='event-selection').flatMap(h=>h.data.selected)){
  const e=world.events.find(e=>e.id===s.eventId);
  if(e)need(e.definitionId===s.definitionId&&e.type===s.type&&e.contentVersion===s.content.version&&s.participantIds.every(id=>e.participantIds.includes(id))&&statuses.get(s.eventId)!=='reserved','Event differs from selection');
 }
 return world;
}

/** Batch 07 reads continuing identities; these are never new-event candidates/counts. */
export function readEventContinuations(world){
 const plan=runtime(world).plan,day=calendarDay(world.position.date,gradeAt(world.position.date,plan.startYear),plan.calendarVersion);
 if(day.slots.find(s=>s.id===world.position.slotId)?.protected)return [];
 return eventIndex(world).records.filter(s=>['active','waiting'].includes(s.status)).map(s=>{
  const e=world.events.find(e=>e.id===s.eventId);return {eventId:e.id,definitionId:e.definitionId,stageId:e.stageId,status:s.status,participantIds:[...e.participantIds]};
 });
}
export function eventExposure(world,op){
 assertShape(op,['type','eventId','participantIds','basisFactId']);const s=selectedEvent(world,op.eventId),r=runtime(world),e=world.events.find(e=>e.id===s.eventId),f=r.facts.find(f=>f.id===op.basisFactId);
 need(e&&['active','waiting'].includes(s.status)&&f&&e.facts.some(ref=>ref.id===f.id),'Exposure needs an active event and linked objective fact');
 need(Array.isArray(op.participantIds)&&op.participantIds.length>0&&new Set(op.participantIds).size===op.participantIds.length&&op.participantIds.every(id=>e.participantIds.includes(id)&&f.subjectIds.includes(id)),'Exposure participants must be substantive fact subjects');
 need(r.disclosures.some(d=>d.actorId===world.identity.playerId&&d.factId===f.id),'Exposure requires a fact actually disclosed to player');
 need(!r.history.some(h=>h.type==='event-exposure'&&h.eventId===e.id&&h.data.participantIds.some(id=>op.participantIds.includes(id))),'Event/person exposure already recorded');
 return {participantIds:[...op.participantIds],basisFactId:op.basisFactId};
}
export function guardSelectedProgress(world,op){
 if(!['stage','result','confirm-choice','event-exposure'].includes(op.type)||!runtime(world).history.some(h=>h.type==='event-selection'))return;
 const s=selectionRecord(world,op.eventId);if(s)need(['active','waiting'].includes(s.status),'Selected event is reserved or ended');
}
