import {seatNumbers,schoolGender} from './seats.js';
import { readCareerCompletion } from './career.js';
import { readFailure } from './homeroom.js';
import { readSemesterReviews } from './reviews.js';
import { readAnnualResults } from './annual.js';
/** Read-only audience projections. Never return NPC records, RNG, hidden event lists,
 * permission facts, undisclosed truth, or internal outcome/engine status. */
import { deriveWorldPanel } from '../social/reputation.js';
import { restoreWorldState, runtimeOf, knownActor } from './model.js';

export function readActorView(saved,actorId) {
  const world=restoreWorldState(saved),r=runtimeOf(world);knownActor(world,actorId);
  return {
    actorId,revision:r.revision,position:world.position,calendarValidation:r.plan.validation,
    panel:actorId===world.identity.playerId?deriveWorldPanel(world.numeric.evolution.world):null,
    claims:r.knowledge.filter(k=>k.actorId===actorId).map(k=>{
      const c=r.claims.find(c=>c.id===k.claimId&&c.versionId===k.versionId);
      return {claimId:c.id,versionId:c.versionId,statement:c.statement,sourceId:k.source.actorId,acquiredAt:k.acquiredAt,belief:k.belief,confidence:k.confidence};
    }),
    facts:r.disclosures.filter(d=>d.actorId===actorId).map(d=>{
      const f=r.facts.find(f=>f.id===d.factId);return {id:f.id,description:f.description,subjectIds:f.subjectIds,occurredAt:f.occurredAt,learnedAt:d.at};
    }),
    choices:r.history.filter(h=>h.type==='choice'&&h.data.actorId===actorId).map(h=>({eventId:h.eventId,stageId:h.stageId,at:h.at,...h.data})),
  };
}
export function readPlayerView(world) { return readActorView(world,world.identity.playerId); }

/** Explicit retrospective notebook layer: not a current-knowledge feed. No raw NPC values. */
export function readHistoricalReview(saved) {
  const world=restoreWorldState(saved),r=runtimeOf(world),counted=new Set(),counts={};
  for(const fact of r.facts)for(const code of fact.categoryCodes){
    const key=JSON.stringify([fact.eventId,code]);if(!counted.has(key)){counted.add(key);counts[code]=(counts[code]??0)+1;}
  }
  return {mode:'retrospective-objective',facts:r.facts.map(f=>({id:f.id,eventId:f.eventId,description:f.description,subjectIds:f.subjectIds,at:f.occurredAt,causeIds:f.causeIds,categoryCodes:f.categoryCodes})),
    claims:r.claims.map(c=>({id:c.id,versionId:c.versionId,statement:c.statement,sourceId:c.sourceId,at:c.at})),counts};
}

/** Official current homeroom data only; no backstage traits or school-wide directory. */
export function readSchoolRoster(saved){
 const w=restoreWorldState(saved),numeric=w.numeric.evolution.world,r=numeric.registry;
 if(!r)return null;
 const seats=seatNumbers(r,r.homeClassId);
 return {classId:r.homeClassId,className:r.classes[r.homeClassId].name,grade:r.academicYear-r.cohortStart+1,
  students:[...numeric.classroom.studentIds].sort((a,b)=>(seats.get(a)??Infinity)-(seats.get(b)??Infinity)).map(id=>({id,name:r.profiles[id].displayName,seatNo:seats.get(id),gender:schoolGender(r.profiles[id]),
   caregivers:numeric.careLinks.filter(l=>l.studentId===id).map(l=>({id:l.caregiverId,name:r.profiles[l.caregiverId].displayName}))}))};
}

/** Saved, player-visible reports only. No importance scores, current states or replay. */
export function readSemesterReviewHistory(saved){return readSemesterReviews(restoreWorldState(saved));}
export function readAnnualHistory(saved){return readAnnualResults(restoreWorldState(saved)).map(report=>({id:report.id,year:report.year,status:report.status,at:report.at,
 score:report.evidence.rating.score,grade:report.evidence.rating.grade,parts:report.evidence.rating.parts,comparison:report.comparison,reviewIds:report.reviewIds,summary:report.summary,
 evidence:report.evidence.sources.map(({id,factId,nature,criterion,historyIds,eventIds,factIds})=>({id,factId,nature,criterion,historyIds,eventIds,factIds}))}));}

/** Current known terminal only; no crisis memory, RNG or hidden NPC fields. */
export function readAnnualFailure(saved){return readFailure(restoreWorldState(saved));}

/** A specifically requested former class, frozen at its completion order. This is
 * no alumni directory: later claims, disclosures and private lives stay outside. */
export function readArchivedClass(saved,classId){
 const w=restoreWorldState(saved),r=runtimeOf(w),entry=r.history.find(h=>h.type==='cohort-completion'&&h.data.classId===classId);
 if(!entry)return null;
 const registry=w.numeric.evolution.world.registry,people=new Set(registry.enrollments.filter(e=>e.classId===classId&&e.from<=entry.at.date).map(e=>e.personId));
 for(const l of w.numeric.evolution.world.careLinks)if(people.has(l.studentId))people.add(l.caregiverId);
 const facts=r.facts.filter(f=>f.order<=entry.order&&f.subjectIds.some(id=>people.has(id))&&(f.witnessIds.includes(w.identity.playerId)||r.disclosures.some(d=>d.actorId===w.identity.playerId&&d.factId===f.id&&d.order<=entry.order)));
 const claims=r.knowledge.filter(k=>k.actorId===w.identity.playerId&&k.order<=entry.order&&r.facts.some(f=>f.id===k.factId&&f.subjectIds.some(id=>people.has(id)))).map(k=>{
  const c=r.claims.find(c=>c.id===k.claimId&&c.versionId===k.versionId),acquired=r.history[k.order-1];let belief=acquired.data.belief;
  for(const h of r.history)if(h.order<=entry.order&&h.type==='belief'&&h.data.actorId===k.actorId&&h.data.claimId===c.id&&h.data.versionId===c.versionId)belief=h.data.after.belief;
  return {claimId:c.id,versionId:c.versionId,statement:c.statement,sourceId:k.source.actorId,belief};
 });
 return {mode:'archived-known-class',classId,className:registry.classes[classId].name,at:structuredClone(entry.at),
  members:[...people].map(id=>({id,name:registry.profiles[id].displayName})),facts:facts.map(f=>({id:f.id,description:f.description,subjectIds:f.subjectIds,at:f.occurredAt})),claims,
  annualIds:r.history.filter(h=>h.type==='annual-success'&&h.data.end.classroom.id===classId&&h.order<entry.order).map(h=>h.id)};
}

/** Locked player-known ending; viewing performs no settlement. */
export function readCareerHistory(saved){return readCareerCompletion(restoreWorldState(saved));}
