import { semesterRetry,validateRetryPair } from '../runtime/retry-checkpoint.js';
import { HOMEROOM_KEY } from '../runtime/homeroom.js';
import { isFormal } from '../runtime/schedule.js';
/** Versioned, complete save payload. No migration guesses and no replay on restore. */
import { validateWorldState, runtimeOf, ensure, same } from '../runtime/model.js';
import { canonicalData } from '../changes/settlement.js';
import { ANNUAL_KEY } from '../runtime/annual.js';
export const SAVE_KIND='teacher-hell-save';
function checkedSave(input,detach) {
  let value=typeof input==='string'?JSON.parse(input):input;
  if(hasLegacyTeacherState(value))value=migrateTeacherState(value);
  ensure(value&&value.kind===SAVE_KIND&&value.version===2,'VERSION','Unsupported save format/version');
  ensure(Object.keys(value).sort().join(',')==='kind,opening,version,world','SCHEMA','Unexpected save fields');
  const world=value.world,opening=value.opening;
  validateWorldState(world);
  if(opening!==null)validateWorldState(opening);
  for(const saved of [world,opening].filter(Boolean))ensure(saved.versions.rules==='n1-n8-v1','VERSION','Unsupported rules version');
  if(world.extensions[HOMEROOM_KEY])ensure(opening,'SNAPSHOT','Formal continuity saves require their legal opening');
  if(opening){
    if(!semesterRetry(world)&&(world.extensions[HOMEROOM_KEY]||opening.extensions[HOMEROOM_KEY]))ensure(!!world.extensions[HOMEROOM_KEY]&&!!opening.extensions[HOMEROOM_KEY]&&same(world.extensions[HOMEROOM_KEY],opening.extensions[HOMEROOM_KEY]),'SNAPSHOT','Homeroom opening differs');
    if(!semesterRetry(world)&&(world.extensions[ANNUAL_KEY]||opening.extensions[ANNUAL_KEY]))ensure(!!world.extensions[ANNUAL_KEY]&&!!opening.extensions[ANNUAL_KEY]&&same(world.extensions[ANNUAL_KEY],opening.extensions[ANNUAL_KEY]),'SNAPSHOT','Annual observation opening differs from the saved opening');
    validateRetryPair(opening,world);
    const wp=runtimeOf(world).plan,op=runtimeOf(opening).plan;
    ensure(isFormal(wp)===isFormal(op)&&(!isFormal(wp)||(wp.validation===op.validation&&wp.id===op.id&&same(wp.career??null,op.career??null)&&wp.calendarVersion===op.calendarVersion&&wp.startYear===op.startYear&&wp.subject===op.subject)),'SNAPSHOT','Snapshot calendar differs from current world');
    ensure(['careerId','playerId','schoolId'].every(k=>opening.identity[k]===world.identity[k]),'SNAPSHOT','Opening belongs to another career/person/school');
    ensure(runtimeOf(opening).revision<=runtimeOf(world).revision,'SNAPSHOT','Opening is newer than world');
    for(const field of ['commits','history'])ensure(runtimeOf(opening)[field].every((entry,index)=>same(entry,runtimeOf(world)[field][index])),'SNAPSHOT','Opening history is not a prefix of this world');
  }
  return {kind:SAVE_KIND,version:2,world:detach?structuredClone(world):world,opening:opening===null?null:detach?structuredClone(opening):opening};
}
export const restoreSave=input=>checkedSave(input,true);
export const createSave=(world,opening=null)=>restoreSave({kind:SAVE_KIND,version:2,world,opening});
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

// Old saves store derived panels in snapshots, histories and recovery audits.
// Rename keys and exact audit labels only; never rewrite prose or numeric codes.
// Exact state-name labels may occur in legacy audit arrays. Ordinary text
// arrays are not state records and must remain untouched.
const STATE_LABEL_ARRAY_KEYS = new Set(['audit','stateNames','stateOrder']);
function hasLegacyTeacherState(value,field=''){
 if(!value||typeof value!=='object')return false;
 if(Array.isArray(value))return value.some(item=>(STATE_LABEL_ARRAY_KEYS.has(field)&&item==='體力')||hasLegacyTeacherState(item));
 return Object.entries(value).some(([key,item])=>key==='體力'||hasLegacyTeacherState(item,key));
}
export function migrateTeacherState(value,field=''){
 if(Array.isArray(value))return value.map(item=>STATE_LABEL_ARRAY_KEYS.has(field)&&item==='體力'?'掌控':migrateTeacherState(item));
 if(!value||typeof value!=='object')return value;
 if(Object.hasOwn(value,'體力')&&Object.hasOwn(value,'掌控'))throw new RangeError('Conflicting legacy teacher state keys');
 return Object.fromEntries(Object.entries(value).map(([key,item])=>[key==='體力'?'掌控':key,migrateTeacherState(item,key)]));
}
