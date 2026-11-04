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
 return {classId:r.homeClassId,className:r.classes[r.homeClassId].name,grade:r.academicYear-r.cohortStart+1,
  students:numeric.classroom.studentIds.map(id=>({id,name:r.profiles[id].displayName,
   caregivers:numeric.careLinks.filter(l=>l.studentId===id).map(l=>({id:l.caregiverId,name:r.profiles[l.caregiverId].displayName}))}))};
}

/** Saved, player-visible reports only. No importance scores, current states or replay. */
export function readSemesterReviewHistory(saved){return readSemesterReviews(restoreWorldState(saved));}
export function readAnnualHistory(saved){return readAnnualResults(restoreWorldState(saved)).map(report=>({id:report.id,year:report.year,status:report.status,at:report.at,
 score:report.evidence.rating.score,grade:report.evidence.rating.grade,parts:report.evidence.rating.parts,comparison:report.comparison,reviewIds:report.reviewIds,summary:report.summary,
 evidence:report.evidence.sources.map(({id,factId,nature,criterion,historyIds,eventIds,factIds})=>({id,factId,nature,criterion,historyIds,eventIds,factIds}))}));}
