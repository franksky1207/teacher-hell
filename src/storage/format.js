import { HOMEROOM_KEY } from '../runtime/homeroom.js';
import { isFormal, validateOpeningSnapshot } from '../runtime/schedule.js';
/** Versioned, complete save payload. No migration guesses and no replay on restore. */
import { validateWorldState, runtimeOf, ensure, same } from '../runtime/model.js';
import { canonicalData } from '../changes/settlement.js';
import { ANNUAL_KEY } from '../runtime/annual.js';
export const SAVE_KIND='teacher-hell-save';
function checkedSave(input,detach) {
  const value=typeof input==='string'?JSON.parse(input):input;
  ensure(value&&value.kind===SAVE_KIND&&value.version===1,'VERSION','Unsupported save format/version');
  ensure(Object.keys(value).sort().join(',')==='kind,opening,version,world','SCHEMA','Unexpected save fields');
  const world=value.world,opening=value.opening;
  validateWorldState(world);
  if(opening!==null)validateWorldState(opening);
  for(const saved of [world,opening].filter(Boolean))ensure(saved.versions.rules==='n1-n8-v1','VERSION','Unsupported rules version');
  if(world.extensions[HOMEROOM_KEY])ensure(opening,'SNAPSHOT','Formal continuity saves require their legal opening');
  if(opening){
    if(world.extensions[HOMEROOM_KEY]||opening.extensions[HOMEROOM_KEY])ensure(!!world.extensions[HOMEROOM_KEY]&&!!opening.extensions[HOMEROOM_KEY]&&same(world.extensions[HOMEROOM_KEY],opening.extensions[HOMEROOM_KEY]),'SNAPSHOT','Homeroom opening differs');
    if(world.extensions[ANNUAL_KEY]||opening.extensions[ANNUAL_KEY])ensure(!!world.extensions[ANNUAL_KEY]&&!!opening.extensions[ANNUAL_KEY]&&same(world.extensions[ANNUAL_KEY],opening.extensions[ANNUAL_KEY]),'SNAPSHOT','Annual observation opening differs from the saved opening');
    validateOpeningSnapshot(opening);
    const wp=runtimeOf(world).plan,op=runtimeOf(opening).plan;
    ensure(isFormal(wp)===isFormal(op)&&(!isFormal(wp)||(wp.validation===op.validation&&wp.id===op.id&&same(wp.career??null,op.career??null)&&wp.calendarVersion===op.calendarVersion&&wp.startYear===op.startYear&&wp.subject===op.subject)),'SNAPSHOT','Snapshot calendar differs from current world');
    ensure(['careerId','playerId','schoolId'].every(k=>opening.identity[k]===world.identity[k]),'SNAPSHOT','Opening belongs to another career/person/school');
    ensure(opening.position.openingId===world.position.openingId&&opening.position.schoolYearId===world.position.schoolYearId,'SNAPSHOT','Opening belongs to another year');
    ensure(runtimeOf(opening).revision<=runtimeOf(world).revision,'SNAPSHOT','Opening is newer than world');
    for(const field of ['commits','history'])ensure(runtimeOf(opening)[field].every((entry,index)=>same(entry,runtimeOf(world)[field][index])),'SNAPSHOT','Opening history is not a prefix of this world');
  }
  return {kind:SAVE_KIND,version:1,world:detach?structuredClone(world):world,opening:opening===null?null:detach?structuredClone(opening):opening};
}
export const restoreSave=input=>checkedSave(input,true);
export const createSave=(world,opening=null)=>restoreSave({kind:SAVE_KIND,version:1,world,opening});
export function saveToken(record) {
  if(record===undefined)return null;
  ensure(Number.isSafeInteger(record.generation)&&record.generation>0,'VERSION','Invalid storage generation');
  const w=record.payload.world;
  return {generation:record.generation,careerId:w.identity.careerId,attemptId:w.identity.attemptId,revision:runtimeOf(w).revision};
}
export function sameToken(a,b){return same(a,b);}
// Encoding is read-only: all original checks still run, without allocating a
// disposable complete world/opening pair merely to turn it into JSON.
export const encodeSave=payload=>JSON.stringify(checkedSave(payload,false));
export const sameRequest=(a,b)=>canonicalData(a)===canonicalData(b);
