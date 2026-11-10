/** Reconstruct only enrollment membership at a journal prefix, including same-day changes.
 * No people, grades, historical events or time positions are regenerated. */
export function seniorRosterAt(w,date){
 const registry=w.numeric.evolution.world.registry,history=w.extensions['teacher-hell/world'].history;
 const known=new Set(registry.enrollments.filter(e=>e.from<date).map(e=>e.id)),used=new Set(),active=new Map();
 for(const e of registry.enrollments)if(e.from<date&&(e.until===null||e.until>=date))active.set(e.personId,e);
 for(const h of history){
  if(h.type!=='school'||h.at.date!==date)continue;const op=h.data.change;
  if(op.type==='school-leave')active.delete(op.personId);
  if(op.type==='school-graduate')for(const id of op.personIds)active.delete(id);
  if(op.type==='school-initialize')for(const e of registry.enrollments.filter(e=>e.from===date&&e.reason==='initial')){active.set(e.personId,e);known.add(e.id);}
  if(['school-enroll','school-transfer-complete'].includes(op.type)){
   const transfer=op.type==='school-transfer-complete'?registry.transfers.find(t=>t.id===op.id):null;
   const personId=transfer?.personId??op.personId,classId=transfer?.classId??op.classId,source=transfer?.source??op.source;
   const e=registry.enrollments.find(e=>e.from===date&&e.classId===classId&&e.reason===source&&(personId===null||e.personId===personId)&&!used.has(e.id));
   if(!e)throw new RangeError('ACADEMICS: enrollment receipt has no durable roster entry');
   known.add(e.id);used.add(e.id);active.delete(e.personId);active.set(e.personId,e);
  }
 }
 const enrollments=registry.enrollments.filter(e=>e.classId===registry.homeClassId&&active.get(e.personId)?.id===e.id);
 return {enrollments,knownEnrollmentIds:[...known],people:enrollments.map(e=>({id:e.personId,cohort:registry.classes[e.classId].cohortStart,entryYears:registry.enrollments.filter(old=>old.personId===e.personId&&known.has(old.id)).map(old=>registry.classes[old.classId].cohortStart)}))};
}
