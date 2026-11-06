import { validateAftercareHistory } from './aftercare.js';
import { validateCohortCompletions } from './cohort.js';
import { validatePrehistoryOpening } from '../world/prehistory.js';
import { validateCareerCompletion } from './career.js';
import { validateHomeroom } from './homeroom.js';
import { validateSemesterReviews } from './reviews.js';
import { validateAnnualObservations } from './annual.js';
import { validateInstitutionHistory,mayReadProcedureFact } from './procedures.js';
import { validateAcademicHistory } from './academics.js';
import { validateCampusHistory } from './campus.js';
import { validateNpcHistory } from './autonomy.js';
import { validateStoryHistory } from './story.js';
import { validateEventSelectionHistory } from './event-selection.js';
import { isFormal, validateFormalPlan, planPosition } from './schedule.js';
/** Authoritative world extension of Foundation v1; no disk or calendar generation. */
import { createId, validateFoundationEnvelope, validateId, validateMoment } from '../contracts/foundation.js';
import { canonicalData, validateSettlement } from '../changes/settlement.js';
import { assertShape, identifier } from '../player/panel.js';
import { nextGameDate } from '../evolution/time.js';
import { probability } from '../numeric/math.js';

export const WORLD_KEY = 'teacher-hell/world';
export const ATTEMPT_LINEAGE_KEY = 'teacher-hell/attempt-lineage';
export const HISTORY_CODES = Object.freeze(Array.from({length:10},(_,i)=>Array.from({length:6},(_,j)=>`H${String(i+1).padStart(2,'0')}-${j+1}`)).flat());
export class WorldError extends Error {
  constructor(code, message) { super(`${code}: ${message}`); this.name='WorldError'; this.code=code; }
}
export function ensure(condition, code, message) { if (!condition) throw new WorldError(code,message); }
export const same = (a,b) => canonicalData(a) === canonicalData(b);
export const runtimeOf = world => world.extensions[WORLD_KEY];
/** Identity tombstones only. Discarded facts, decisions and numeric receipts never
 * become part of the successful world merely to prevent an attempt ID being reused. */
export function worldAttemptIds(world){
  const r=runtimeOf(world);
  return [...new Set([...(world.extensions[ATTEMPT_LINEAGE_KEY]?.attemptIds??[]),world.identity.attemptId,...r.commits.map(c=>c.attemptId),...r.numericArchives.map(a=>a.attemptId),...r.history.filter(h=>h.type==='retry').flatMap(h=>h.data.attemptIds??[])])];
}
function validateAttemptLineage(world){
  const lineage=world.extensions[ATTEMPT_LINEAGE_KEY],lastRetry=runtimeOf(world).history.findLast(h=>h.type==='retry');
  if(!lineage){ensure(!lastRetry?.data.attemptIds&&!runtimeOf(world).commits.some(c=>JSON.parse(c.request).attemptIds),'ATTEMPT','Retry identity lineage is missing');return;}
  assertShape(lineage,['version','attemptIds']);
  ensure(lineage.version===1&&Array.isArray(lineage.attemptIds)&&lineage.attemptIds.length>1,'ATTEMPT','Invalid retry identity lineage');
  unique(lineage.attemptIds,id=>id,'attempt lineage');lineage.attemptIds.forEach(id=>validateId(id,'attempt'));
  ensure(same(lineage.attemptIds,lastRetry?.data.attemptIds)&&lineage.attemptIds.at(-1)===world.identity.attemptId,'ATTEMPT','Retry identity lineage differs from its receipt');
  const receipt=runtimeOf(world).commits.find(c=>c.id===lastRetry.operationId&&c.attemptId===lastRetry.attemptId);
  ensure(same(lineage.attemptIds,JSON.parse(receipt.request).attemptIds),'ATTEMPT','Retry identity lineage differs from its request');
  ensure(worldAttemptIds(world).every(id=>lineage.attemptIds.includes(id)),'ATTEMPT','Retry identity lineage omits an established attempt');
}
export const key = (...parts) => JSON.stringify(parts);
export const momentOf = world => ({date:world.position.date,slotId:world.position.slotId});
export function unique(rows, select, label) {
  const ids=rows.map(select); ensure(new Set(ids).size===ids.length,'DUPLICATE',label);
}
export function actorExists(world,id) {
  identifier(id); return id===world.identity.playerId || Object.hasOwn(world.numeric.evolution.world.people,id);
}
export function knownActor(world,id) { ensure(actorExists(world,id),'REFERENCE',`Unknown actor ${id}`); }
const validationReferences=new WeakMap();
export function findEvent(world,id) {
  const value=validationReferences.get(world)?.events.get(id)??world.events.find(event=>event.id===id);ensure(value,'REFERENCE',`Unknown event ${id}`);return value;
}
export function findFact(world,id) {
  const value=validationReferences.get(world)?.facts.get(id)??runtimeOf(world).facts.find(fact=>fact.id===id);ensure(value,'REFERENCE',`Unknown fact ${id}`);return value;
}
export function findClaim(world,id,version) {
  const value=runtimeOf(world).claims.find(c=>c.id===id&&c.versionId===version);
  ensure(value,'REFERENCE',`Unknown claim/version ${id}/${version}`);return value;
}
export function findKnowledge(world,actor,id,version) {
  return runtimeOf(world).knowledge.find(k=>k.actorId===actor&&k.claimId===id&&k.versionId===version);
}
export function validatePosition(p) {
  assertShape(p,['date','slotId','schoolYearId','openingId','serviceYear','statisticsPeriodId']);
  validateMoment({date:p.date,slotId:p.slotId});
  for(const name of ['schoolYearId','openingId','statisticsPeriodId'])identifier(p[name]);
  ensure(Number.isInteger(p.serviceYear)&&p.serviceYear>=1&&p.serviceYear<=30,'TIME','Invalid service year');
}
export function validatePlan(plan) {
  if(isFormal(plan))return validateFormalPlan(plan);
  assertShape(plan,['id','validation','positions','cursor']);identifier(plan.id);
  ensure(plan.validation==='unverified','CALENDAR','Only explicitly unverified supplied schedules are supported before batch 04');
  ensure(Array.isArray(plan.positions)&&plan.positions.length>0,'TIME','Explicit positions required');
  ensure(Number.isInteger(plan.cursor)&&plan.cursor>=0&&plan.cursor<plan.positions.length,'TIME','Invalid plan cursor');
  const seen=new Set();
  plan.positions.forEach((p,i)=>{
    validatePosition(p);const stamp=key(p.date,p.slotId);
    ensure(!seen.has(stamp),'TIME','Repeated date/slot in supplied plan');seen.add(stamp);
    if(i){
      const previous=plan.positions[i-1];
      ensure(p.date===previous.date||p.date===nextGameDate(previous.date),'TIME','Positions must cover consecutive civil dates');
      const sameYear=p.serviceYear===previous.serviceYear&&p.schoolYearId===previous.schoolYearId&&p.openingId===previous.openingId;
      ensure(sameYear||(p.date!==previous.date&&p.serviceYear===previous.serviceYear+1&&p.schoolYearId!==previous.schoolYearId&&p.openingId!==previous.openingId),'TIME','Inconsistent opening labels');
    }
  });
}
export function stamp(world,at,cursor) {
  validateMoment(at);
  const plan=runtimeOf(world).plan;
  ensure(Number.isInteger(cursor)&&cursor>=0&&cursor<=plan.cursor,'TIME','Invalid recorded cursor');
  ensure(same(at,{date:planPosition(plan,cursor).date,slotId:planPosition(plan,cursor).slotId}),'TIME','Recorded moment differs from supplied order');
}
/** All historical sources must precede acquisition, including within one slot. */
export function validateSource(world,actor,factId,claimId,versionId,source,at,cursor,order) {
  assertShape(source,['kind','actorId','basisFactId']);knownActor(world,actor);knownActor(world,source.actorId);
  ensure(mayReadProcedureFact(world,actor,factId,order),'KNOWLEDGE','Confidential procedure information requires explicit access');
  const fact=findFact(world,factId),basis=findFact(world,source.basisFactId);
  ensure(basis.order<order&&fact.order<order&&basis.cursor<=cursor&&fact.cursor<=cursor,'KNOWLEDGE','Source/fact was not available yet');
  ensure(basis.occurredAt.date<=at.date,'KNOWLEDGE','Source occurs after acquisition');
  if(source.kind==='observation') {
    ensure(source.actorId===actor&&basis.id===fact.id&&fact.witnessIds.includes(actor),'KNOWLEDGE','Actor did not witness this fact');
  } else if(source.kind==='communication') {
    const sender=claimId===null ? runtimeOf(world).disclosures.find(d=>d.actorId===source.actorId&&d.factId===factId) : findKnowledge(world,source.actorId,claimId,versionId);
    ensure(sender&&sender.order<order&&sender.cursor<=cursor,'KNOWLEDGE','Sender does not possess this information');
    ensure(source.actorId!==actor&&basis.data.type==='contact'&&basis.subjectIds.includes(actor)&&basis.subjectIds.includes(source.actorId),'KNOWLEDGE','No established communication contact');
  } else if(source.kind==='document') {
    ensure(source.actorId===actor&&basis.data.type==='access'&&basis.subjectIds.includes(actor),'KNOWLEDGE','No document access');
    const allowed=claimId===null ? basis.data.factIds?.includes(factId) : basis.data.claimRefs?.some(c=>c.id===claimId&&c.versionId===versionId);
    ensure(allowed,'KNOWLEDGE','Document does not grant the requested information');
  } else throw new WorldError('KNOWLEDGE','Unknown information source');
}
/** Carrier knowledge is a checked reference projection, not another knowledge store. */
export function knowledgeReferences(world,event) {
  const ids=new Set(event.facts.map(f=>f.id));
  return runtimeOf(world).knowledge.filter(k=>ids.has(k.factId)&&event.participantIds.includes(k.actorId)).map(k=>({
    actorId:k.actorId,factId:k.factId,claimId:k.claimId,versionId:k.versionId,sourceId:k.source.actorId,
    acquiredAt:k.acquiredAt,believed:k.belief==='believed',
  }));
}
export function validateWorldState(world) {
  validateFoundationEnvelope(world);
  validateInstitutionHistory(world);validateAcademicHistory(world);validateCampusHistory(world);validateAftercareHistory(world);
  const r=runtimeOf(world),school=world.numeric.evolution.world.registry;
  if(school){
    for(const record of [...school.enrollments,...school.assignments])ensure(record.from<=world.position.date&&(record.until===null||record.until<=world.position.date),'TIME','School history extends into the future');
    for(const t of school.transfers)ensure(t.createdAt<=world.position.date&&(t.completedAt===null||t.completedAt<=world.position.date),'TIME','Transfer result extends into the future');
    if(isFormal(r.plan))for(const table of r.plan.tables)ensure(table.classes.every(c=>school.classes[c.id]?.cohortStart===c.cohortStart)&&Object.hasOwn(school.classes,table.homeClassId),'TIMETABLE','Saved timetable references an unknown school class');
  }
  assertShape(r,['version','revision','plan','facts','claims','knowledge','disclosures','history','commits','stages','effects','numericArchives']);
  ensure(r.version===1&&Number.isSafeInteger(r.revision)&&r.revision>=0,'VERSION','Unknown world runtime version/revision');
  validatePlan(r.plan);if(r.plan.validation==='fixed-calendar-v2')ensure(world.numeric.evolution.world.player.year===world.position.serviceYear,'TIME','Three-year numeric play year differs from calendar');if(isFormal(r.plan))ensure(Object.hasOwn(world.random,'schedule'),'RANDOM','Formal timetable random stream is missing');ensure(same(world.position,planPosition(r.plan)),'TIME','Position is not the plan cursor');
  for(const name of ['facts','claims','knowledge','disclosures','history','commits','stages','effects','numericArchives'])ensure(Array.isArray(r[name]),'SCHEMA',`${name} must be an array`);
  // Bind opt-in identity to its existing initialization ledger, so changing all plan
  // tags together cannot silently reinterpret an initialized three-year world as v1.
  const initialization=r.commits[0];
  if(initialization){
    validateId(initialization.id,'operation');const parts=JSON.parse(initialization.id.slice('operation:'.length)),marked=parts[1]==='initialize-three-year-school';
    if(r.plan.validation==='fixed-calendar-v2')ensure(initialization.id===createId('operation',[world.identity.careerId,'initialize-three-year-school',String(r.plan.startYear),r.plan.career.difficulty,...(r.plan.career.version===2?['background-v1',String(r.plan.career.backgroundSeed)]:[])]),'MODE','Three-year identity differs from its initialization ledger');
    else ensure(!marked,'MODE','Three-year initialization cannot become a legacy world');
  }
  const numericWorld=world.numeric.evolution.world,experienced=numericWorld.player.version===2;
  if(r.plan.career?.version===2&&r.revision>0){
    const c=r.plan.career;
    ensure(numericWorld.school.mode==='private','MODE','Formal T2 careers require the same private school');
    ensure(experienced===(c.difficulty!=='hard'),'MODE','Experienced initialization differs from difficulty');
    if(experienced)ensure(numericWorld.background.subject===r.plan.subject&&numericWorld.player.origin.seed===c.backgroundSeed&&numericWorld.player.origin.count===(c.difficulty==='normal'?4:6),'MODE','Background origin differs from career');
  }else ensure(!experienced,'MODE','Experienced sources require their explicit T2 career identity');
  if(world.numeric.evolution.clock.lastNaturalDate===null)validatePrehistoryOpening(numericWorld);
  unique(r.facts,f=>f.id,'fact IDs');unique(r.claims,c=>key(c.id,c.versionId),'claim versions');
  unique(r.knowledge,k=>key(k.actorId,k.claimId,k.versionId),'knowledge keys');unique(r.disclosures,d=>key(d.actorId,d.factId),'disclosures');
  unique(r.history,h=>h.id,'history IDs');unique(r.effects,e=>e.id,'effect IDs');unique(r.stages,s=>s.id,'stage IDs');
  unique(r.numericArchives,a=>a.attemptId,'numeric archives');
  // This synchronous validation owns immutable input references. Keep every row
  // audit, while avoiding repeated linear searches through a three-year journal.
  const firstIds=rows=>{const map=new Map();for(const row of rows)if(!map.has(row.id))map.set(row.id,row);return map;},priorReferences=validationReferences.get(world);
  validationReferences.set(world,{events:firstIds(world.events),facts:firstIds(r.facts)});
  try {
  const history=new Map(r.history.map(h=>[h.id,h]));
  // Temporary first-match indexes only: every source row is still audited below.
  const stages=new Map(r.stages.map(s=>[s.id,s])),effects=new Map(r.effects.map(e=>[e.id,e])),effectReceipts=new Set(r.effects.map(e=>key(e.attemptId,e.numericReceiptId))),results=new Map(),resultHistory=new Map();
  for(const event of world.events)for(const result of event.results)if(!results.has(result.id))results.set(result.id,result);
  for(const h of r.history)if(h.type==='result'&&!resultHistory.has(h.data.resultId))resultHistory.set(h.data.resultId,h);

  r.commits.forEach((commit,i)=>{
    assertShape(commit,['id','attemptId','revision','request','historyIds','numericReceiptIds','draws']);
    validateId(commit.id,'operation');identifier(commit.attemptId);
    ensure(commit.revision===i+1,'LEDGER','Nonconsecutive world revision');
    const request=JSON.parse(commit.request);
    ensure(canonicalData(request)===commit.request&&request.id===commit.id&&request.attemptId===commit.attemptId,'LEDGER','Operation receipt identity mismatch');
    ensure((request.expectedRevision??request.openingRevision)===i,'LEDGER','Receipt base revision mismatch');
    for(const list of [commit.historyIds,commit.numericReceiptIds,commit.draws])ensure(Array.isArray(list),'LEDGER','Invalid receipt lists');
    unique(commit.historyIds,id=>id,'receipt history');unique(commit.numericReceiptIds,id=>id,'receipt effects');unique(commit.draws,d=>d.id,'receipt draws');
    for(const draw of commit.draws){
      identifier(draw.id);identifier(draw.stream);
      if(Object.hasOwn(draw,'poolSize')){
        assertShape(draw,['id','stream','index','poolSize','totalWeight','selectedKey','selectedWeight',...(Object.hasOwn(draw,'candidate')?['candidate']:[])]);identifier(draw.selectedKey);
        ensure(draw.stream==='events'&&Number.isSafeInteger(draw.poolSize)&&draw.poolSize>0&&Number.isInteger(draw.index)&&draw.index>=0&&draw.index<draw.poolSize&&Number.isFinite(draw.totalWeight)&&draw.totalWeight>0&&Number.isFinite(draw.selectedWeight)&&draw.selectedWeight>0&&draw.selectedWeight<=draw.totalWeight,'LEDGER','Invalid compact event draw');
      }else{assertShape(draw,['id','stream','index','weights']);ensure(Array.isArray(draw.weights)&&draw.weights.length>0&&draw.weights.every(n=>Number.isFinite(n)&&n>=0)&&Number.isInteger(draw.index)&&draw.index>=0&&draw.index<draw.weights.length&&draw.weights[draw.index]>0,'LEDGER','Invalid recorded draw');}
    }
    for(const id of commit.historyIds)ensure(history.get(id)?.operationId===commit.id&&history.get(id)?.attemptId===commit.attemptId,'LEDGER','Missing commit history');
  });
  unique(r.commits,c=>key(c.attemptId,c.id),'operation IDs');ensure(r.commits.length===r.revision,'LEDGER','Commit count/revision mismatch');
  const commits=new Map(r.commits.map(c=>[key(c.attemptId,c.id),c]));
  r.history.forEach((h,i)=>{
    assertShape(h,['id','order','operationId','attemptId','type','eventId','stageId','factIds','at','cursor','data']);
    validateId(h.id,'history');ensure(h.order===i+1,'LEDGER','History order mismatch');stamp(world,h.at,h.cursor);
    ensure(commits.get(key(h.attemptId,h.operationId))?.historyIds.includes(h.id),'LEDGER','Unowned history');
    ensure(i===0||h.cursor>=r.history[i-1].cursor,'TIME','History moved backwards');
    if(h.eventId!==null)findEvent(world,h.eventId);
    for(const id of h.factIds)findFact(world,id);
  });
  for(const f of r.facts){
    assertShape(f,['id','eventId','stageId','subjectIds','witnessIds','description','occurredAt','cursor','order','categoryCodes','causeIds','data']);identifier(f.description);
    validateId(f.id,'fact');const event=findEvent(world,f.eventId);validateId(f.stageId,'stage');stamp(world,f.occurredAt,f.cursor);
    ensure(history.get(r.history[f.order-1]?.id)?.data.factId===f.id&&r.history[f.order-1]?.type==='fact','LEDGER','Fact lacks creation history');
    ensure(Array.isArray(f.subjectIds)&&f.subjectIds.length>0&&Array.isArray(f.witnessIds)&&Array.isArray(f.categoryCodes)&&Array.isArray(f.causeIds),'SCHEMA','Invalid fact lists');unique(f.subjectIds,id=>id,'fact subjects');
    ensure(stages.get(f.stageId)?.eventId===f.eventId&&stages.get(f.stageId).order<f.order,'REFERENCE','Fact has no preceding stage');
    unique(f.categoryCodes,c=>c,'history codes');unique(f.witnessIds,c=>c,'witnesses');unique(f.causeIds,c=>c,'causes');
    for(const id of f.subjectIds){knownActor(world,id);ensure(event.participantIds.includes(id),'REFERENCE','Fact subject not involved');}
    for(const id of f.witnessIds){knownActor(world,id);ensure(event.participantIds.includes(id),'REFERENCE','Witness not involved');}
    for(const code of f.categoryCodes)ensure(HISTORY_CODES.includes(code),'HISTORY','Unknown historical classification');
    for(const id of f.causeIds)ensure(findFact(world,id).order<f.order,'CAUSALITY','Cause must predate consequence');
    ensure(event.facts.some(ref=>same(ref,{id:f.id,subjectIds:f.subjectIds,occurredAt:f.occurredAt})),'REFERENCE','Fact reference differs from authority');
  }
  for(const c of r.claims){
    assertShape(c,['id','versionId','factId','statement','sourceId','at','cursor','order']);validateId(c.id,'claim');identifier(c.versionId);identifier(c.statement);knownActor(world,c.sourceId);stamp(world,c.at,c.cursor);
    ensure(findFact(world,c.factId).order<c.order,'CAUSALITY','Claim precedes fact');
    ensure(r.history[c.order-1]?.type==='claim'&&r.history[c.order-1]?.data.claimId===c.id,'LEDGER','Claim lacks history');
    ensure(r.claims.filter(a=>a.id===c.id).every(a=>a.factId===c.factId),'REFERENCE','Claim identity changed its fact');
  }
  for(const k of r.knowledge){
    assertShape(k,['actorId','factId','claimId','versionId','acquiredAt','cursor','order','source','belief','confidence']);
    const claim=findClaim(world,k.claimId,k.versionId);ensure(claim.factId===k.factId&&claim.order<k.order,'KNOWLEDGE','Invalid acquired claim');
    ensure(['believed','rejected','uncertain'].includes(k.belief),'KNOWLEDGE','Invalid belief');probability(k.confidence);stamp(world,k.acquiredAt,k.cursor);
    validateSource(world,k.actorId,k.factId,k.claimId,k.versionId,k.source,k.acquiredAt,k.cursor,k.order);
    const acquired=r.history[k.order-1];
    ensure(acquired?.type==='knowledge'&&acquired.data.actorId===k.actorId&&acquired.data.claimId===k.claimId&&acquired.data.versionId===k.versionId,'LEDGER','Knowledge lacks acquisition history');
    let current={belief:acquired.data.belief,confidence:acquired.data.confidence};
    ensure(['believed','rejected','uncertain'].includes(current.belief),'LEDGER','Invalid acquired belief');probability(current.confidence);
    for(const h of r.history)if(h.type==='belief'&&h.data.actorId===k.actorId&&h.data.claimId===k.claimId&&h.data.versionId===k.versionId){ensure(h.order>k.order&&same(h.data.before,current),'LEDGER','Broken belief revision chain');current=h.data.after;}
    ensure(same(current,{belief:k.belief,confidence:k.confidence}),'LEDGER','Belief differs from revision history');
  }
  unique(r.knowledge.filter(k=>k.belief==='believed'),k=>key(k.actorId,k.claimId),'unique certain claim conclusion');
  for(const d of r.disclosures){
    assertShape(d,['actorId','factId','at','cursor','order','source']);stamp(world,d.at,d.cursor);
    validateSource(world,d.actorId,d.factId,null,null,d.source,d.at,d.cursor,d.order);
    ensure(r.history[d.order-1]?.type==='disclosure'&&r.history[d.order-1]?.data.actorId===d.actorId&&r.history[d.order-1]?.factIds.includes(d.factId),'LEDGER','Disclosure lacks history');
  }
  for(const event of world.events){
    ensure(same(event.knowledge,knowledgeReferences(world,event)),'KNOWLEDGE','Carrier differs from knowledge authority');
    for(const ref of event.facts){const f=findFact(world,ref.id);ensure(same(ref,{id:f.id,subjectIds:f.subjectIds,occurredAt:f.occurredAt}),'REFERENCE','Conflicting fact reference');}
    ensure(stages.get(event.stageId)?.eventId===event.id,'REFERENCE','Missing current stage');
  }
  for(const stage of r.stages){assertShape(stage,['id','eventId','order']);validateId(stage.id,'stage');findEvent(world,stage.eventId);ensure(r.history[stage.order-1]?.stageId===stage.id,'LEDGER','Stage lacks history');}
  const receipts=new Map(world.numeric.receipts.map(receipt=>[key(world.numeric.attemptId,receipt.id),receipt]));
  for(const archive of r.numericArchives){
    assertShape(archive,['attemptId','random','receipts']);ensure(archive.attemptId!==world.numeric.attemptId,'LEDGER','Current attempt also archived');
    validateSettlement({version:1,...archive,evolution:world.numeric.evolution});
    for(const receipt of archive.receipts)receipts.set(key(archive.attemptId,receipt.id),receipt);
  }
  for(const effect of r.effects){
    assertShape(effect,['id','resultId','attemptId','numericReceiptId','order']);validateId(effect.id,'effect');
    const result=results.get(effect.resultId);
    ensure(result?.effectIds.includes(effect.id)&&receipts.has(key(effect.attemptId,effect.numericReceiptId)),'LEDGER','Unlinked numerical effect');
    const h=r.history[effect.order-1],receipt=receipts.get(key(effect.attemptId,effect.numericReceiptId));
    ensure(effect.id===effect.numericReceiptId&&h?.type==='effect'&&h.data.effectId===effect.id&&h.data.resultId===effect.resultId&&h.attemptId===effect.attemptId&&same(h.data.changes,receipt.changes),'LEDGER','Effect differs from numerical history');
    ensure(commits.get(key(h.attemptId,h.operationId))?.numericReceiptIds.includes(effect.numericReceiptId),'LEDGER','Unowned numerical receipt');
  }
  const resultKeys=[];
  for(const event of world.events)for(const result of event.results){
    const h=resultHistory.get(result.id);
    ensure(h&&h.eventId===event.id&&h.stageId===result.stageId&&h.factIds.includes(result.factId)&&stages.get(h.stageId)?.eventId===event.id,'LEDGER','Result lacks stage history');
    ensure(result.settlementId===createId('settlement',[h.attemptId,h.operationId]),'LEDGER','Result points to a different operation');
    resultKeys.push(key(event.id,h.stageId,result.factId,result.subjectId,result.facet));
    for(const id of result.effectIds)ensure(effects.get(id)?.resultId===result.id,'LEDGER','Missing numerical effect receipt');
  }
  unique(resultKeys,k=>k,'semantic result keys');
  for(const commit of r.commits)for(const id of commit.numericReceiptIds)ensure(effectReceipts.has(key(commit.attemptId,id)),'LEDGER','Commit references missing effect');
  validateSemesterReviews(world);
  validateAnnualObservations(world);validateCohortCompletions(world);
  validateCareerCompletion(world);
  validateAttemptLineage(world);
  validateEventSelectionHistory(world);
  validateStoryHistory(world);
  validateNpcHistory(world);
  validateHomeroom(world);
  return world;
  }finally{if(priorReferences)validationReferences.set(world,priorReferences);else validationReferences.delete(world);}
}
export function restoreWorldState(saved) {
  const world=typeof saved==='string'?JSON.parse(saved):saved;
  validateWorldState(world);return structuredClone(world);
}
