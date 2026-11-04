import { authorizeRetry } from '../runtime/homeroom.js';
/** Application boundary: serialize prepare → disk CAS → memory publication per session.
 * Disk success is never reported as a rollback when publication fails. */
import { prepareWorldOperation, forkWorldAttempt } from '../runtime/transactions.js';
import { createId } from '../contracts/foundation.js';
import { runtimeOf, ensure } from '../runtime/model.js';
import { ANNUAL_KEY } from '../runtime/annual.js';
import { createSave, restoreSave, encodeSave, sameToken, sameRequest } from './format.js';
export async function createStoredSession(storage,slot,{afterPersist}={}) {
  let current=await storage.read(slot),recoveryRequired=false,tail=Promise.resolve();
  const serial=fn=>{const result=tail.then(fn);tail=result.catch(()=>{});return result;};
  const ready=()=>ensure(!recoveryRequired,'RECOVERY_REQUIRED','Disk committed; recover before continuing');
  async function publish(payload,expectedToken,receipt=null,duplicate=false){
    const saved=await storage.write(slot,payload,expectedToken);
    try{afterPersist?.();current=structuredClone(saved);}
    catch{recoveryRequired=true;return {committed:true,recoveryRequired:true,receipt:structuredClone(receipt),duplicate,token:saved.token};}
    return {committed:true,recoveryRequired:false,receipt:structuredClone(receipt),duplicate,token:structuredClone(saved.token)};
  }
  return Object.freeze({
    snapshot(){ready();return structuredClone(current);},
    recover:()=>serial(async()=>{current=await storage.read(slot);recoveryRequired=false;return structuredClone(current);}),
    initialize:(world)=>serial(async()=>{ready();ensure(current.payload===null,'OVERWRITE','Slot occupied; use reviewed import');return publish(createSave(world,world),null);}),
    execute:(request,{captureOpening=false}={})=>serial(async()=>{
      ready();ensure(current.payload,'EMPTY','Slot is empty');const disk=await storage.read(slot);ensure(disk.payload,'STALE','Slot was deleted');
      if(!sameToken(disk.token,current.token)){
        ensure(disk.token.careerId===current.token.careerId,'STALE','Slot now belongs to another career; do not replay an old career request');
        const prior=runtimeOf(disk.payload.world).commits.find(c=>c.id===request.id&&c.attemptId===request.attemptId);
        ensure(prior,'STALE','Slot changed; recover first');
        const repeated=prepareWorldOperation(disk.payload.world,request);
        current=disk;return {committed:true,recoveryRequired:false,receipt:repeated.receipt,duplicate:true,token:structuredClone(disk.token)};
      }
      const next=prepareWorldOperation(current.payload.world,request);
      if(next.duplicate)return {committed:true,recoveryRequired:false,receipt:next.receipt,duplicate:true,token:structuredClone(current.token)};
      return publish(createSave(next.world,captureOpening?next.world:current.payload.opening),current.token,next.receipt);
    }),
    captureOpening:()=>serial(async()=>{ready();ensure(current.payload,'EMPTY','Slot is empty');return publish(createSave(current.payload.world,current.payload.world),current.token);}),
    retry:options=>serial(async()=>{ready();ensure(current.payload?.opening,'SNAPSHOT','No opening snapshot');
      const disk=await storage.read(slot);ensure(sameToken(disk.token,current.token),'STALE','Retry target changed; recover first');
      const prior=runtimeOf(current.payload.world).commits.find(c=>c.id===createId('operation',[options.attemptId,'initialize-retry'])&&c.attemptId===options.attemptId);
      if(prior){const recorded=JSON.parse(prior.request);if(recorded.authorization)ensure(sameRequest(recorded.authorization,{failureId:options.failureId,failedAttemptId:options.failedAttemptId,schoolYearId:options.schoolYearId,expectedRevision:options.expectedRevision}),'CONFLICT','Retry authorization changed');ensure(sameRequest(recorded.seeds,options.seeds),'CONFLICT','Retry attempt reused with different seeds');return {committed:true,recoveryRequired:false,receipt:structuredClone(prior),duplicate:true,token:structuredClone(current.token)};}
      if(current.payload.world.extensions[ANNUAL_KEY]||current.payload.opening.extensions[ANNUAL_KEY])authorizeRetry(current.payload.world,options);
      ensure(options.attemptId!==current.payload.world.identity.attemptId,'ATTEMPT','Retry requires a fresh attempt');
      const next=forkWorldAttempt(current.payload.opening,options,current.payload.world);return publish(createSave(next,current.payload.opening),current.token,runtimeOf(next).commits.at(-1));}),
    export:()=>serial(async()=>{ready();ensure(current.payload,'EMPTY','Slot is empty');return encodeSave(current.payload);}),
    // UI shows reviewImport() summary first, then passes the exact token after a second confirmation.
    reviewImport:input=>serial(async()=>{ready();const incoming=restoreSave(input),disk=await storage.read(slot);return {incoming:{identity:structuredClone(incoming.world.identity),position:structuredClone(incoming.world.position)},replacing:disk.payload?{identity:structuredClone(disk.payload.world.identity),position:structuredClone(disk.payload.world.position)}:null,token:disk.token};}),
    import:(input,{expectedToken,confirmed=false}={})=>serial(async()=>{ready();const incoming=restoreSave(input),disk=await storage.read(slot);
      ensure(sameToken(disk.token,expectedToken),'STALE','Import target changed');ensure(!disk.payload||confirmed===true,'CONFIRM','Review existing career and confirm overwrite');
      return publish(incoming,expectedToken);}),
    delete:({expectedToken,confirmed=false}={})=>serial(async()=>{ready();ensure(confirmed===true,'CONFIRM','Deletion requires confirmation');return publish(null,expectedToken);}),
  });
}

/** Explicit recovery path when a damaged payload prevents creating a normal session.
 * Validate the backup first, show the retained identity/revision metadata, confirm,
 * and CAS the reviewed generation. Never clear the old slot to try loading it. */
export async function reviewRecoveryImport(storage,slot,input){
  const incoming=restoreSave(input),existing=await storage.inspect(slot);
  return {incoming:{identity:structuredClone(incoming.world.identity),position:structuredClone(incoming.world.position)},replacing:existing.token,token:existing.token};
}
export async function importRecoveryBackup(storage,slot,input,{expectedToken,confirmed=false}={}){
  const incoming=restoreSave(input);ensure(confirmed===true,'CONFIRM','Recovery overwrite requires review and confirmation');
  const existing=await storage.inspect(slot);ensure(sameToken(existing.token,expectedToken),'STALE','Recovery target changed');
  const saved=await storage.write(slot,incoming,expectedToken);return {committed:true,token:saved.token};
}
