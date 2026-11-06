import { HOMEROOM_KEY,crisisContext } from './homeroom.js';
import { crisisCandidateParameters } from '../assessment/crisis.js';
import { institutionState,procedureEligible } from './procedures.js';
import { academicEligible,academicState } from './academics.js';
import { npcGroups } from './autonomy.js';
import { validateStoryReference } from './story-content.js';
/** Internal engine contracts. Content/eligibility/weights/lifecycle remain separate. */
import { TOPIC_IDS } from './topics.js';
import { canonicalData } from '../changes/settlement.js';
import { targetRecord } from '../changes/targets.js';
import { requireValue } from '../numeric/record.js';
import { weightedMean } from '../numeric/math.js';
import { readSchoolCandidates, enrollmentEligibility } from '../world/registry.js';
import { calendarDay, gradeAt } from '../calendar/calendar.js';
import { dayNumber } from '../calendar/civil.js';
import { isFormal } from './schedule.js';
import { assertShape, identifier } from '../player/panel.js';

const STATE_CHANNELS=['體力','精神','抗壓','聲望','熱忱','情緒'];
const need=(ok,message)=>{if(!ok)throw new RangeError(`EVENT_CANDIDATE: ${message}`);};
const runtime=w=>w.extensions['teacher-hell/world'];
export const EVENT_K=Object.freeze({negative:1.6,neutral:1,positive:0.7});
const days=(a,b)=>(Date.parse(a+'T00:00:00Z')-Date.parse(b+'T00:00:00Z'))/86400000;
const tuple=(...v)=>JSON.stringify(v);
export function validateEventDefinitions(definitions){
 canonicalData(definitions);need(Array.isArray(definitions),'Definition array required');const ids=new Set(),coreByTopic=new Map();
 for(const d of definitions){
  assertShape(d,['id','topicId','type','content','coreCodes','additionalCodes','weights','directions','eligibility','repetition']);
  identifier(d.id);need(!ids.has(d.id),'Duplicate subtopic / direct-cumulative version');ids.add(d.id);
  need(TOPIC_IDS.includes(d.topicId)&&['direct','cumulative'].includes(d.type),'Unknown topic/type');
  assertShape(d.content,['status','version','resourceId']);identifier(d.content.version);identifier(d.content.resourceId);
  need(['unwritten','engineering-test','ready'].includes(d.content.status),'Unknown content status');
  for(const k of ['coreCodes','additionalCodes'])need(Array.isArray(d[k])&&d[k].length===3&&d[k].every(c=>/^(?:[1-9]|1[0-2])-[1-4]$/.test(c)),'Three valid numeric codes required');
  need(new Set([...d.coreCodes,...d.additionalCodes]).size===6,'Six distinct numeric fields required');
  const core=tuple(d.coreCodes);need(!coreByTopic.has(d.topicId)||coreByTopic.get(d.topicId)===core,'Topic core must be shared');coreByTopic.set(d.topicId,core);
  need(d.weights.length===6&&d.weights.every(x=>Number.isFinite(x)&&x>=0)&&Math.abs(d.weights.reduce((a,b)=>a+b,0)-1)<1e-12,'Six weights must sum to one');
  need(d.directions.length===6&&d.directions.every(x=>[1,-1].includes(x)),'Explicit six directions');
  const e=d.eligibility;assertShape(e,['people','dayKinds','slotIds','from','until','facts','history','numeric','enrollment',...['companions','roleIds','affiliation','knowledge','groups','academic','procedure','homeroom'].filter(k=>Object.hasOwn(e,k))]);
  need(e.people.length>0&&e.people.every(x=>['player','student','caregiver','staff','reunion','contact'].includes(x)),'Participant scopes');
  for(const k of ['dayKinds','slotIds','facts','history','numeric'])need(Array.isArray(e[k]),`Eligibility ${k} array`);
  if(e.homeroom)need(['ordinary','social','crisis','support','placement'].includes(e.homeroom),'Homeroom qualification');
  if(e.procedure){need(Array.isArray(e.procedure),'Procedure qualifications');for(const p of e.procedure){assertShape(p,['kind','status']);identifier(p.kind);identifier(p.status);}}
  if(e.academic){need(Array.isArray(e.academic),'Academic qualifications');for(const a of e.academic){need(['makeup','credit-deficit','change','admission'].includes(a.kind)&&typeof a.termId==='string','academic condition');}}
  if(e.roleIds)need(Array.isArray(e.roleIds)&&e.roleIds.every(id=>Number.isInteger(id)&&id>=1&&id<=35),'Role eligibility IDs');
  if(e.affiliation){assertShape(e.affiliation,['classId','status']);identifier(e.affiliation.classId);need(['active','former'].includes(e.affiliation.status),'Affiliation status');}
  if(e.groups){need(Array.isArray(e.groups),'Group eligibility');for(const g of e.groups){assertShape(g,['groupId']);identifier(g.groupId);}}
  if(e.knowledge){need(Array.isArray(e.knowledge),'Knowledge eligibility');for(const k of e.knowledge){assertShape(k,['actorId','claimId','versionId','belief']);[k.actorId,k.claimId,k.versionId].forEach(identifier);need(['believed','rejected','uncertain','any'].includes(k.belief),'Knowledge belief');}}
  if(e.companions){need(Array.isArray(e.companions),'Companion array');for(const c of e.companions){assertShape(c,['personId','contactFactId']);identifier(c.personId);identifier(c.contactFactId);}}
  need(d.type==='cumulative'?e.history.length>0:e.history.length===0,'Cumulative needs history; direct cannot duplicate cumulative');
  for(const h of e.history){assertShape(h,['code','minimum','status']);need(/^H(?:0[1-9]|10)-[1-6]$/.test(h.code)&&Number.isInteger(h.minimum)&&h.minimum>0&&['any','active','ended'].includes(h.status),'History threshold/status');}
  for(const n of e.numeric){assertShape(n,['source','code','min','max']);need(Number.isFinite(n.min)&&Number.isFinite(n.max)&&n.min>=0&&n.max<=100&&n.min<=n.max,'Numeric eligibility bounds');identifier(n.source);identifier(n.code);}
  for(const f of e.facts){assertShape(f,['id','participant']);identifier(f.id);need(typeof f.participant==='boolean','Fact participant flag');}
  need(e.from===null||/^\d{4}-\d{2}-\d{2}$/.test(e.from),'Date lower bound');need(e.until===null||/^\d{4}-\d{2}-\d{2}$/.test(e.until),'Date upper bound');
  if(e.from!==null)dayNumber(e.from);if(e.until!==null)dayNumber(e.until);need(e.from===null||e.until===null||e.from<=e.until,'Reversed eligibility interval');
  if(e.enrollment!==null){assertShape(e.enrollment,['action','classId']);identifier(e.enrollment.action);identifier(e.enrollment.classId);}
  const p=d.repetition;assertShape(p,['cooldownDays','exclusionGroups','sameFact','reason']);
  need(Number.isSafeInteger(p.cooldownDays)&&p.cooldownDays>=0&&typeof p.sameFact==='boolean'&&Array.isArray(p.exclusionGroups),'Explicit repetition policy');p.exclusionGroups.forEach(identifier);identifier(p.reason);
 }
 return definitions;
}
/** One current-world index per query. No cache survives a revision or import. */
export function eventIndex(world){
 const r=runtime(world),selections=r.history.filter(h=>h.type==='event-selection').flatMap(h=>h.data.selected),states=new Map();
 for(const h of r.history)if(h.type==='event-lifecycle')states.set(h.eventId,h.data.status);
 const records=selections.map(s=>({...s,status:states.get(s.eventId)??'reserved'}));
 const exposures=new Map(),seenExposure=new Set();for(const h of r.history)if(h.type==='event-exposure')for(const id of h.data.participantIds){const k=tuple(h.eventId,id);if(!seenExposure.has(k)){seenExposure.add(k);exposures.set(id,(exposures.get(id)??0)+1);}}
 const history=new Map();for(const f of r.facts)for(const code of f.categoryCodes)for(const person of f.subjectIds){const k=tuple(person,code),list=history.get(k)??[];if(!list.some(x=>x.eventId===f.eventId))list.push({eventId:f.eventId,status:states.get(f.eventId)??'active'});history.set(k,list);}
 const byTopicPerson=new Map(),byDefinition=new Map(),byExclusion=new Map();
 const add=(map,key,s)=>{const list=map.get(key)??[];list.push(s);map.set(key,list);};
 for(const s of records){add(byTopicPerson,tuple(s.topicId,[...s.participantIds].sort()),s);add(byDefinition,s.definitionId,s);for(const g of s.exclusionGroups)add(byExclusion,g,s);}
 return {institution:institutionState(world),academics:academicState(world),records,byTopicPerson,byDefinition,byExclusion,exposures,history,facts:new Map(r.facts.map(f=>[f.id,f])),school:readSchoolCandidates(world.numeric.evolution.world)};
}
/** Qualification does not assign a class or decide an annual terminal. */
function homeroomRejection(w,mode,person,index){
 if(!w.extensions[HOMEROOM_KEY])return 'homeroom-disabled';
 const r=runtime(w),n=w.numeric.evolution.world,registry=n.registry;
 if(mode==='placement'){
  if(registry.cohortStart===registry.startYear||registry.cohortStart!==registry.academicYear||!r.history.some(h=>h.type==='year-transition'&&h.data.academicYear===registry.cohortStart&&h.data.classId!==h.data.previousClassId)||index.records.some(s=>s.definitionId==='homeroom:new-cohort-placement'&&s.date>=String(registry.cohortStart)+'-01-01'))return 'no-new-placement';
  return registry.assignments.some(a=>a.personId===person&&a.roleId===1&&a.until===null)?null:'principal-required';
 }
 if(r.history.some(h=>h.type==='annual-success'&&h.data.year===w.position.serviceYear))return 'annual-intermission';
 if(mode==='crisis'&&!crisisCandidateParameters(n,[{id:'homeroom-crisis',eligible:true,channels:['composite',...Object.keys(crisisContext(w).risk.single)]}])[0].opened)return 'no-crisis';
 if(mode==='social'){
  const origins=new Set(['appointment:office:1:0']);for(const a of registry.assignments)if(origins.has(a.endsId))origins.add(a.id);
  if(!registry.assignments.some(a=>origins.has(a.id)&&a.until===null&&a.personId===person))return 'principal-required';
 }
 return null;
}
function participantPool(world,scope,index){
 const n=world.numeric.evolution.world,r=n.registry;
 if(scope==='player')return [world.identity.playerId];
 if(scope==='student')return index.school.studentIds;
 if(scope==='reunion')return index.school.reunionIds;
 if(scope==='caregiver')return [...new Set(n.careLinks.filter(l=>index.school.studentIds.includes(l.studentId)).map(l=>l.caregiverId))];
 if(scope==='staff')return [...new Set(r.assignments.filter(a=>a.until===null).map(a=>a.personId))].filter(id=>id!==world.identity.playerId);
 return [...new Set(runtime(world).knowledge.filter(k=>k.actorId===world.identity.playerId).map(k=>k.source.actorId).concat(runtime(world).disclosures.filter(k=>k.actorId===world.identity.playerId).flatMap(k=>index.facts.get(k.factId).subjectIds)))].filter(id=>id!==world.identity.playerId);
}
function sourceTarget(world,person,source){
 if(source==='participant')return {kind:person===world.identity.playerId?'player-person':'person',id:person};
 if(source.startsWith('player-'))return {kind:source,id:world.identity.playerId};
 if(source==='classroom')return {kind:source,id:world.numeric.evolution.world.classroom.id};
 if(source==='school')return {kind:source,id:world.identity.schoolId};
 // Other holders must be explicit stable references, never implicit creation.
 const [kind,...parts]=source.split('|');return {kind,id:parts.join('|')};
}
export function numericSources(world,person,sources,codes){return codes.map((code,i)=>requireValue(targetRecord(world.numeric.evolution.world,sourceTarget(world,person,sources[i])),code));}
export function candidateConflict(c,prior,date){
 if(c.key===prior.key&&prior.date===date)return 'same-day-instance';
 const samePeople=tuple([...c.participantIds].sort())===tuple([...prior.participantIds].sort());
 if(c.topicId===prior.topicId&&samePeople&&prior.status!=='ended')return 'active-topic-participants';
 if(c.topicId===prior.topicId&&samePeople&&days(date,prior.date)<=Math.max(c.cooldownDays,prior.cooldownDays))return 'topic-cooldown';
 if(c.sameFact&&c.definitionId===prior.definitionId&&c.factIds.length&&tuple(c.factIds)===tuple(prior.factIds))return 'same-objective-cause';
 if(c.exclusionGroups.some(g=>prior.exclusionGroups.includes(g))&&(prior.status!=='ended'||prior.date===date))return 'explicit-exclusion';
 return null;
}
/** Pure eligibility; neither numeric accumulation nor RNG is changed. */
export function buildEventCandidates(world,definitions,{engineering=false}={}){
 validateEventDefinitions(definitions);const r=runtime(world);need(isFormal(r.plan),'Formal calendar required');
 const day=calendarDay(world.position.date,gradeAt(world.position.date,r.plan.startYear),r.plan.calendarVersion),index=eventIndex(world),candidates=[],rejected=[];
 for(const d of definitions){
  need(!(index.byDefinition.get(d.id)??[]).some(s=>s.topicId!==d.topicId||s.type!==d.type),'Stable subtopic identity cannot change topic or type');
  if(d.content.status==='ready'||d.content.resourceId.startsWith('engineering:'))validateStoryReference(d);
  if(d.content.status!=='ready'&&!(engineering&&d.content.status==='engineering-test'))continue;
  const e=d.eligibility,p=d.repetition,content=Object.freeze(structuredClone(d.content)),groups=Object.freeze([...p.exclusionGroups]),people=[...new Set(e.people.flatMap(scope=>participantPool(world,scope,index)))].sort();
  const current=day.slots.findIndex(s=>s.id===world.position.slotId),slots=Object.freeze(day.slots.slice(current).filter(s=>!s.protected&&(!e.slotIds.length||e.slotIds.includes(s.id))).map(s=>s.id));
  for(const person of people){
   let reason=null;const facts=e.facts.map(f=>index.facts.get(f.id));
   if(e.homeroom)reason=homeroomRejection(world,e.homeroom,person,index);
   if(e.dayKinds.length&&!e.dayKinds.includes(day.kind)||e.from!==null&&day.date<e.from||e.until!==null&&day.date>e.until)reason='calendar-condition';
   if(facts.some((f,i)=>!f||e.facts[i].participant&&!f.subjectIds.includes(person)))reason='objective-condition';
   if((e.companions??[]).some(c=>{const f=index.facts.get(c.contactFactId);return !f||f.data?.type!=='contact'||f.occurredAt.date!==day.date||!f.subjectIds.includes(person)||!f.subjectIds.includes(c.personId)||!world.numeric.evolution.world.people[c.personId]&&c.personId!==world.identity.playerId;}))reason='companion-contact-required';
   if(e.people.includes('reunion')&&index.school.reunionIds.includes(person)&&!facts.some(f=>f?.data?.type==='contact'&&f.subjectIds.includes(person)&&f.subjectIds.includes(world.identity.playerId)&&f.occurredAt.date===day.date))reason='reunion-contact-required';
   if(e.roleIds&&!e.roleIds.every(id=>(world.numeric.evolution.world.people[person]?.roleIds??[8,9]).includes(id)))reason='role-condition';
   if(e.affiliation&&!world.numeric.evolution.world.registry.enrollments.some(a=>a.personId===person&&a.classId===e.affiliation.classId&&(e.affiliation.status==='active'?a.until===null:a.until!==null)))reason='affiliation-condition';
   if(e.knowledge&&!e.knowledge.every(k=>r.knowledge.some(x=>x.actorId===(k.actorId==='participant'?person:k.actorId)&&x.claimId===k.claimId&&x.versionId===k.versionId&&(k.belief==='any'||x.belief===k.belief))))reason='knowledge-condition';
   if(e.groups&&!e.groups.every(g=>npcGroups(world).some(x=>x.id===g.groupId&&!x.ended&&x.memberIds.includes(person))))reason='group-condition';
   if(e.academic&&!e.academic.every(a=>academicEligible(world,person,a,index.academics)))reason='academic-condition';
   if(e.procedure&&!e.procedure.every(p=>procedureEligible(world,person,p,index.institution)))reason='procedure-condition';
   if(e.enrollment&&!enrollmentEligibility(world.numeric.evolution.world,{personId:person,...e.enrollment}).eligible)reason='enrollment';
   if(e.history.some(h=>(index.history.get(tuple(person,h.code))??[]).filter(x=>h.status==='any'||x.status===h.status).length<h.minimum))reason='history-threshold';
   try{if(e.numeric.some(n=>{const [v]=numericSources(world,person,[n.source],[n.code]);return v<n.min||v>n.max;}))reason='numeric-condition';}catch{reason='numeric-source-missing';}
   if(!slots.length||day.quota?.kind==='protected-day')reason='no-legal-time';
   const participantIds=[person,...new Set((e.companions??[]).map(c=>c.personId).filter(id=>id!==person))],factIds=[...new Set([...e.facts.map(f=>f.id),...(e.companions??[]).map(c=>c.contactFactId)])].sort();
   const c={key:tuple(d.id,participantIds,factIds),definitionId:d.id,topicId:d.topicId,type:d.type,participantIds,factIds,date:day.date,slotIds:slots,content,cooldownDays:p.cooldownDays,exclusionGroups:groups,sameFact:p.sameFact,reason:p.reason};
   const relevant=new Set([...(index.byTopicPerson.get(tuple(c.topicId,[...c.participantIds].sort()))??[]),...(c.sameFact&&c.factIds.length?index.byDefinition.get(c.definitionId)??[]:[]),...c.exclusionGroups.flatMap(g=>index.byExclusion.get(g)??[])]);
   for(const prior of relevant){const conflict=candidateConflict(c,prior,day.date);if(conflict){reason=conflict;break;}}
   if(reason)rejected.push({key:c.key,reason});else candidates.push(c);
  }
 }
 return {day,candidates,rejected};
}
/** Sources and valence belong to weight bindings, not content or eligibility. */
export function weighEventCandidate(world,c,definition,binding,index){
 assertShape(binding,['definitionId','sources','valence']);need(binding.definitionId===c.definitionId&&Object.hasOwn(EVENT_K,binding.valence)&&binding.sources.length===6,'Weight binding');
 const values=numericSources(world,c.participantIds[0],binding.sources,[...definition.coreCodes,...definition.additionalCodes]);
 const rawWeight=weightedMean(values.map((v,i)=>definition.directions[i]===1?v:100-v),definition.weights),k=EVENT_K[binding.valence];
 // Bounded engineering exposure adjustment, independent of valence. No quota/guarantee.
 const counts=index.school.studentIds.map(id=>index.exposures.get(id)??0),max=Math.max(0,...counts),count=index.exposures.get(c.participantIds[0])??0;
 const exposureFactor=index.school.studentIds.includes(c.participantIds[0])?1+Math.min(1,(max-count)/10):1;
 const riskFactor=definition.eligibility.homeroom==='crisis'?crisisCandidateParameters(world.numeric.evolution.world,[{id:'homeroom-crisis',eligible:true,channels:['composite',...STATE_CHANNELS]}])[0].multiplier*(1+Math.min(4,crisisContext(world).memory/10)):definition.eligibility.homeroom==='support'?1+Math.min(4,Object.values(world.numeric.evolution.world.relationships).filter(x=>x.toId===world.identity.playerId&&x.values['5-1']>60).length/5):1;
 return {...c,rawWeight,k,exposureFactor,...(definition.eligibility.homeroom?{riskFactor}:{}),effectiveWeight:rawWeight*k*exposureFactor*riskFactor};
}
