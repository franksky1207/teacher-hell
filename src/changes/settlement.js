import { assertShape, identifier, STATE_NAMES } from '../player/panel.js';
import { finite, applyDelta } from '../numeric/math.js';
import { createRandom, restoreRandom } from '../numeric/random.js';
import { validateEvolution, restoreEvolution, advanceDay, gameDate } from '../evolution/time.js';
import { deriveWorldPanel } from '../social/reputation.js';
import { validateChange } from './targets.js';
import { shockDelta, validateShock, recoveryChanges, validateRecovery } from './model.js';

const clone=value=>structuredClone(value);
// Canonical JSON data only: rejects getters, symbols, undefined and non-finite numbers.
export function canonicalData(value) {
  if (value===null || typeof value==='boolean' || typeof value==='string') return JSON.stringify(value);
  if (typeof value==='number') {finite(value);return JSON.stringify(value);}
  if (Array.isArray(value)) {
    if (Object.getPrototypeOf(value)!==Array.prototype || Reflect.ownKeys(value).length!==value.length+1) throw new TypeError('Dense data arrays required');
    for(let i=0;i<value.length;i++) {
      const d=Object.getOwnPropertyDescriptor(value,String(i));
      if(!d||!d.enumerable||!Object.hasOwn(d,'value')) throw new TypeError('Array data properties required');
    }
    return `[${Array.from(value,v=>canonicalData(v)).join(',')}]`;
  }
  assertShape(value,Object.keys(value ?? {}));
  return `{${Object.keys(value).sort().map(key=>`${JSON.stringify(key)}:${canonicalData(value[key])}`).join(',')}}`;
}
function requestShape(request) {
  canonicalData(request);
  assertShape(request,['attemptId','id','sequence','date','operation']);
  identifier(request.attemptId);identifier(request.id);gameDate(request.date);
  if (!Number.isSafeInteger(request.sequence)||request.sequence<1) throw new RangeError('Positive confirmation sequence required');
}
function validateOperation(world,operation) {
  if (operation.type==='direct') {
    assertShape(operation,['type','changes']);
    if(!Array.isArray(operation.changes)) throw new TypeError('Changes required');
    for(const change of operation.changes) {validateChange(world,change);finite(change.delta);}
  } else if(operation.type==='shock') {
    assertShape(operation,['type','effects']);
    if(!Array.isArray(operation.effects)) throw new TypeError('Shock effects required');
    for(const effect of operation.effects) {
      assertShape(effect,['target','code','severity','direction','scale']);validateShock(effect);
      validateChange(world,{target:effect.target,code:effect.code,delta:0});
    }
  } else if(operation.type==='recovery') {
    assertShape(operation,['type','context']);validateRecovery(operation.context);
  } else throw new RangeError('Unknown numerical operation');
}
export function validateSettlement(state) {
  assertShape(state,['version','attemptId','evolution','random','receipts']);
  if(state.version!==1) throw new RangeError('Unknown settlement version');
  identifier(state.attemptId);validateEvolution(state.evolution);restoreRandom(state.random);
  if (!Array.isArray(state.receipts)) throw new TypeError('Ordered receipts required');
  const ids=new Set(),windows=new Map();let priorDate=null;
  for (let i=0;i<state.receipts.length;i++) {
    const r=state.receipts[i];
    assertShape(r,['id','sequence','date','request','changes','recovery']);identifier(r.id);gameDate(r.date);
    if(r.sequence!==i+1||ids.has(r.id)||r.date>state.evolution.clock.date||(priorDate!==null&&r.date<priorDate)) throw new RangeError('Invalid receipt order');
    ids.add(r.id);priorDate=r.date;
    const request=JSON.parse(r.request);requestShape(request);
    if(canonicalData(request)!==r.request||request.attemptId!==state.attemptId||request.id!==r.id||request.sequence!==r.sequence||request.date!==r.date) throw new RangeError('Receipt identity mismatch');
    validateOperation(state.evolution.world,request.operation);
    if ((request.operation.type==='recovery') !== (r.recovery!==null)) throw new RangeError('Recovery receipt type mismatch');
    if (request.operation.type==='direct' && canonicalData(request.operation.changes)!==canonicalData(r.changes)) throw new RangeError('Direct receipt changed');
    if (request.operation.type==='recovery') {
      if(!windows.has(r.date)) windows.set(r.date,[]);
      const c=request.operation.context;windows.get(r.date).push([c.startHour,c.startHour+c.hours]);
    }
    if(!Array.isArray(r.changes)) throw new TypeError('Receipt changes required');
    for(const change of r.changes) {validateChange(state.evolution.world,change);finite(change.delta);}
    if (r.recovery!==null) {
      assertShape(r.recovery,['favorableAttempt','opportunity','improved','worsened']);
      if(typeof r.recovery.favorableAttempt!=='boolean'||typeof r.recovery.opportunity!=='boolean') throw new TypeError('Invalid recovery audit');
      for(const list of [r.recovery.improved,r.recovery.worsened]) if(!Array.isArray(list)||new Set(list).size!==list.length||list.some(name=>!STATE_NAMES.includes(name))) throw new RangeError('Invalid recovery state audit');
    }
  }
  for(const day of windows.values()) {
    day.sort((a,b)=>a[0]-b[0]);
    for(let i=1;i<day.length;i++) if(day[i][0]<day[i-1][1]) throw new RangeError('Overlapping recovery receipts');
  }
  return state;
}
/** Use a restored opening world and a new attemptId for a retry; never reuse old receipts. */
export function startSettlement(evolution,{seed,attemptId}) {
  return validateSettlement({version:1,attemptId,evolution:restoreEvolution(evolution),random:createRandom(seed).snapshot(),receipts:[]});
}
export function restoreSettlement(saved) {
  const state=typeof saved==='string'?JSON.parse(saved):saved;
  validateSettlement(state);return clone(state);
}
function resolveOperation(world,operation,rng) {
  if(operation.type==='direct') {
    assertShape(operation,['type','changes']);
    if(!Array.isArray(operation.changes)) throw new TypeError('Changes required');
    operation.changes.forEach(change=>{validateChange(world,change);finite(change.delta);});
    return {changes:clone(operation.changes),recovery:null};
  }
  if(operation.type==='shock') {
    assertShape(operation,['type','effects']);
    if(!Array.isArray(operation.effects)) throw new TypeError('Shock effects required');
    return {changes:operation.effects.map(effect=>{
      assertShape(effect,['target','code','severity','direction','scale']);
      const change={target:effect.target,code:effect.code,delta:shockDelta(effect,rng)};
      validateChange(world,change);return change;
    }),recovery:null};
  }
  if(operation.type==='recovery') {
    assertShape(operation,['type','context']);
    const result=recoveryChanges(world.player.current,operation.context,rng);
    return {changes:result.changes,recovery:{favorableAttempt:result.favorableAttempt,opportunity:result.opportunity,improved:[],worsened:[]}};
  }
  throw new RangeError('Unknown numerical operation');
}
function checkRecoveryWindow(saved,request) {
  const context=validateRecovery(request.operation.context);
  for(const receipt of saved.receipts) if(receipt.date===request.date) {
    const old=JSON.parse(receipt.request).operation;
    if(old.type==='recovery' && context.startHour<old.context.startHour+old.context.hours && old.context.startHour<context.startHour+context.hours) throw new RangeError('Recovery time already settled');
  }
}
/** Shared numerical transaction path. Only caller-owned validated state enters here. */
function prepareConfirmed(saved,request,lookup,checkWindow) {
  requestShape(request);
  if(request.attemptId!==saved.attemptId) throw new RangeError('Wrong school-year attempt');
  const encoded=canonicalData(request),prior=lookup(request.id);
  if(prior) {
    if(prior.request!==encoded) throw new RangeError('Confirmed result cannot be changed');
    return null;
  }
  if(request.sequence!==saved.receipts.length+1||request.date!==saved.evolution.clock.date||saved.evolution.clock.lastNaturalDate!==request.date) throw new RangeError('Result confirmation must match next sequence and current date');
  if(request.operation.type==='recovery') checkWindow(request);
  const evolution=clone(saved.evolution),rng=restoreRandom(saved.random),world=evolution.world;
  const before=request.operation.type==='recovery'?deriveWorldPanel(world):null;
  // Detach effect targets too: later caller edits must never change locked receipts.
  const {changes,recovery}=resolveOperation(world,clone(request.operation),rng);
  for(const change of changes) {
    const record=validateChange(world,change);finite(change.delta);
    record[change.code]=applyDelta(record[change.code],change.delta);
  }
  if(recovery) {
    const after=deriveWorldPanel(world);
    recovery.improved=STATE_NAMES.filter(name=>after[name]>before[name]);
    recovery.worsened=STATE_NAMES.filter(name=>after[name]<before[name]);
  }
  validateEvolution(evolution);
  const receipt={id:request.id,sequence:request.sequence,date:request.date,request:encoded,changes,recovery};
  return {evolution,random:rng.snapshot(),receipt};
}
/** Pure import-safe path: audit the supplied ledger; publish only a complete envelope. */
export function settleResult(saved,request) {
  validateSettlement(saved);
  const prepared=prepareConfirmed(saved,request,id=>saved.receipts.find(r=>r.id===id),r=>checkRecoveryWindow(saved,r));
  if(!prepared)return clone(saved);
  return {version:1,attemptId:saved.attemptId,evolution:prepared.evolution,random:prepared.random,receipts:[...clone(saved.receipts),prepared.receipt]};
}

/** Reassemble an atomically stored checkpoint and its append-only receipt rows. */
export function restoreSettlementCheckpoint(checkpoint,receipts) {
  assertShape(checkpoint,['version','attemptId','evolution','random','receiptCount']);
  if(!Number.isSafeInteger(checkpoint.receiptCount)||checkpoint.receiptCount<0||!Array.isArray(receipts)||receipts.length!==checkpoint.receiptCount) throw new RangeError('Checkpoint/receipt count mismatch');
  const {version,attemptId,evolution,random}=checkpoint;
  return restoreSettlement({version,attemptId,evolution,random,receipts});
}

/** Exclusive in-memory owner. Audit JSON once, then index immutable historical receipts.
 * Never accepts a trusted flag or exposes internal state. snapshot() is the save boundary.
 * No receipt is dropped; snapshots retain the original version-1 JSON contract.
 */
export function createSettlementSession(saved) {
  let state=restoreSettlement(saved);
  const ids=new Map(state.receipts.map(r=>[r.id,r])),windows=new Map();
  function indexWindow(receipt) {
    const op=JSON.parse(receipt.request).operation;
    if(op.type==='recovery') {
      if(!windows.has(receipt.date))windows.set(receipt.date,[]);
      windows.get(receipt.date).push([op.context.startHour,op.context.startHour+op.context.hours]);
    }
  }
  state.receipts.forEach(indexWindow);
  return Object.freeze({
    cursor:()=>({attemptId:state.attemptId,date:state.evolution.clock.date,year:state.evolution.world.player.year,nextSequence:state.receipts.length+1}),
    snapshot:()=>clone(state),
    checkpoint:()=>clone({version:state.version,attemptId:state.attemptId,evolution:state.evolution,random:state.random,receiptCount:state.receipts.length}),
    world:()=>clone(state.evolution.world),
    advanceDay(input) {
      const evolution=advanceDay(state.evolution,input);
      state={...state,evolution};
      return clone(evolution.clock);
    },
    settle(request) {
      const prepared=prepareConfirmed(state,request,id=>ids.get(id),r=>{
        const c=validateRecovery(r.operation.context);
        if((windows.get(r.date)??[]).some(([start,end])=>c.startHour<end&&start<c.startHour+c.hours)) throw new RangeError('Recovery time already settled');
      });
      if(!prepared)return clone(ids.get(request.id));
      // All potentially rejecting numeric/structural checks completed before publication.
      state={...state,evolution:prepared.evolution,random:prepared.random};
      state.receipts.push(prepared.receipt);ids.set(prepared.receipt.id,prepared.receipt);indexWindow(prepared.receipt);
      return clone(prepared.receipt);
    },
  });
}
export function settleResults(saved,requests) {
  if(!Array.isArray(requests)) throw new TypeError('Ordered requests required');
  let next=restoreSettlement(saved);
  for(const request of requests) next=settleResult(next,request);
  return next;
}
export function advanceSettlementDay(saved,input) {
  const next=restoreSettlement(saved);next.evolution=advanceDay(next.evolution,input);
  return validateSettlement(next);
}
/** Fast holiday is exactly the same daily fold: natural once, then explicit ordered results. */
export function advanceSchedule(saved,days) {
  if(!Array.isArray(days)) throw new TypeError('Explicit daily schedule required');
  let next=restoreSettlement(saved);
  for(const day of days) {
    assertShape(day,['natural','results']);
    next=advanceSettlementDay(next,day.natural);
    next=settleResults(next,day.results);
  }
  return next;
}
