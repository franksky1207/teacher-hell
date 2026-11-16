/** Phase 17-C: read-only coverage diagnostics for the initial 40 students.
 * This is NOT an event issuer, NPC update, success threshold or player stat.
 * Only confirmed, disclosed substantive 'event-exposure' history is counted.
 */
import {eventIndex,buildEventCandidates} from './event-candidates.js';
const need=(ok,message)=>{if(!ok)throw new RangeError('EXPOSURE_AUDIT: '+message);};
function initialStudents(world){
 const registry=world.numeric.evolution.world.registry;
 const initial=registry.cohorts?.find(c=>c.classId===registry.homeClassId)?.initialStudentIds;
 need(Array.isArray(initial)&&initial.length===40&&new Set(initial).size===40,'initial 40-person cohort missing');
 return initial;
}
export function originalCohortExposure(world){
 const initial=initialStudents(world),index=eventIndex(world),active=new Set(index.school.studentIds);
 const students=initial.map(id=>({
  id,active:active.has(id),substantiveCount:index.exposures.get(id)??0
 }));
 return {
  initialCount:students.length,
  observedCount:students.filter(s=>s.substantiveCount>0).length,
  unseenCount:students.filter(s=>s.substantiveCount===0).length,
  activeCount:students.filter(s=>s.active).length,
  students
 };
}
/** A content-coverage probe, not a second picker; no RNG or save writes.
 * In particular, an unseen student with no eligible stories is reported as
 * unavailable, rather than artificially assigned a fabricated interaction.
 */
export function studentCandidateCoverage(world,definitions,{engineering=false}={}){
 const index=eventIndex(world),{candidates,rejected}=buildEventCandidates(world,definitions,{engineering});
 const totals=new Map(index.school.studentIds.map(id=>[id,0]));
 for(const c of candidates)if(totals.has(c.participantIds[0]))totals.set(c.participantIds[0],totals.get(c.participantIds[0])+1);
 const original=originalCohortExposure(world);
 return {
  ...original,
  eligibleOriginalCount:original.students.filter(s=>(totals.get(s.id)??0)>0).length,
  unseenEligibleCount:original.students.filter(s=>s.substantiveCount===0&&(totals.get(s.id)??0)>0).length,
  unseenWithoutCandidateCount:original.students.filter(s=>s.substantiveCount===0&&(totals.get(s.id)??0)===0).length,
  candidateCount:candidates.length,
  rejectedCount:rejected.length,
  students:original.students.map(s=>({...s,eligibleCandidateCount:totals.get(s.id)??0}))
 };
}
