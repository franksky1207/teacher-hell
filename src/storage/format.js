/** Versioned, complete save payload. No migration guesses and no replay on restore. */
import { restoreWorldState, runtimeOf, ensure, same } from '../runtime/model.js';
import { canonicalData } from '../changes/settlement.js';
export const SAVE_KIND='teacher-hell-save';
export function restoreSave(input) {
  const value=typeof input==='string'?JSON.parse(input):structuredClone(input);
  ensure(value&&value.kind===SAVE_KIND&&value.version===1,'VERSION','Unsupported save format/version');
  ensure(Object.keys(value).sort().join(',')==='kind,opening,version,world','SCHEMA','Unexpected save fields');
  const world=restoreWorldState(value.world),opening=value.opening===null?null:restoreWorldState(value.opening);
  for(const saved of [world,opening].filter(Boolean))ensure(saved.versions.rules==='n1-n8-v1','VERSION','Unsupported rules version');
  if(opening){
    ensure(['careerId','playerId','schoolId'].every(k=>opening.identity[k]===world.identity[k]),'SNAPSHOT','Opening belongs to another career/person/school');
    ensure(opening.position.openingId===world.position.openingId&&opening.position.schoolYearId===world.position.schoolYearId,'SNAPSHOT','Opening belongs to another year');
    ensure(runtimeOf(opening).revision<=runtimeOf(world).revision,'SNAPSHOT','Opening is newer than world');
    for(const field of ['commits','history'])ensure(runtimeOf(opening)[field].every((entry,index)=>same(entry,runtimeOf(world)[field][index])),'SNAPSHOT','Opening history is not a prefix of this world');
  }
  return {kind:SAVE_KIND,version:1,world,opening};
}
export const createSave=(world,opening=null)=>restoreSave({kind:SAVE_KIND,version:1,world,opening});
export function saveToken(record) {
  if(record===undefined)return null;
  ensure(Number.isSafeInteger(record.generation)&&record.generation>0,'VERSION','Invalid storage generation');
  const w=record.payload.world;
  return {generation:record.generation,careerId:w.identity.careerId,attemptId:w.identity.attemptId,revision:runtimeOf(w).revision};
}
export function sameToken(a,b){return same(a,b);}
export const encodeSave=payload=>JSON.stringify(restoreSave(payload));
export const sameRequest=(a,b)=>canonicalData(a)===canonicalData(b);
