import { validateOpeningSnapshot } from './schedule.js';
/** Objective homeroom interruption and annual failure; the existing journal is authority.
 * Crisis memory is an event-qualification observation, never a second teacher stat. */
import { canonicalData } from '../changes/settlement.js';
import { assertShape,ABILITY_NAMES,STATE_NAMES } from '../player/panel.js';
import { worldCrisis,crisisFromStates } from '../assessment/crisis.js';
import { deriveWorldPanel } from '../social/reputation.js';
import { createId } from '../contracts/foundation.js';
import { dayNumber } from '../calendar/civil.js';
export const HOMEROOM_KEY='teacher-hell/homeroom-continuity';
const r=w=>w.extensions['teacher-hell/world'],same=(a,b)=>canonicalData(a)===canonicalData(b);
const need=(v,m)=>{if(!v){const e=new RangeError(`HOMEROOM: ${m}`);e.code='RETRY_UNAUTHORIZED';throw e;}};
export const DUTY_RESULTS=Object.freeze(['pressure','relief','thought','resignation-pending','temporary','notice','resigned','replaced','unable','restored']);
const ending=new Set(['resigned','replaced','unable']);
export function initializeHomeroom(w){
 validateOpeningSnapshot(w);need(w.extensions['teacher-hell/annual-observations'],'annual lifecycle required');
 const s=r(w),n=w.numeric.evolution.world;need(!w.extensions[HOMEROOM_KEY]&&s.revision===1&&s.history.length===1&&w.position.serviceYear===1,'enable only at untouched annual opening');
 const assignment=n.registry.assignments.find(a=>a.personId===w.identity.playerId&&a.roleId===9&&a.classId===n.registry.homeClassId&&a.until===null);need(assignment,'original homeroom assignment required');
 w.extensions[HOMEROOM_KEY]={version:1,playerId:w.identity.playerId,classId:assignment.classId,assignmentId:assignment.id,schoolYearId:w.position.schoolYearId,openingId:w.position.openingId};return w;
}
export const failureResult=w=>r(w).history.find(h=>h.type==='annual-failure')??null;
export function crisisObservation(w){
 const date=w.position.date,last=r(w).history.findLast(h=>h.type==='crisis-observation'),risk=worldCrisis(w.numeric.evolution.world);
 const elapsed=last?Math.max(0,dayNumber(date)-dayNumber(last.at.date)):0;
 // Two-week half life; recovery reduces current risk immediately, retained exposure gradually.
 const memory=(last?.data.memory??0)*2**(-elapsed/14)+(risk.compositeDepth+Object.values(risk.single).reduce((a,x)=>Math.max(a,x.depth),0))*Math.max(1,elapsed);
 const panel=deriveWorldPanel(w.numeric.evolution.world);return {version:1,states:Object.fromEntries(STATE_NAMES.map(k=>[k,panel[k]])),risk,memory};
}
export function crisisContext(w){const observation=crisisObservation(w);return {...observation,ordinary:r(w).history.filter(h=>h.type==='homeroom-result'&&h.data.kind==='pressure').length};}
export function homeroomOperation(w,eventId,basisFactId,kind){
 need(DUTY_RESULTS.includes(kind),'unknown consequence');const b=w.extensions[HOMEROOM_KEY];need(b,'continuity lifecycle not initialized');
 const assignment=w.numeric.evolution.world.registry.assignments.find(a=>a.personId===b.playerId&&a.roleId===9&&a.classId===b.classId&&a.until===null);
 const effective=ending.has(kind),description=({resigned:'教師在事件累積後確定離職，已停止擔任原班導師。',replaced:'校方已實際撤換原班導師；教師仍任課，並對撤換提出異議；合法性仍有爭議，不能據此認定處分合法。',unable:'教師已確定無法繼續履行本學年原班導師職務。',temporary:'短期請假由代理協助，原班導師職務並未終止。',notice:'校方提出撤換安排，尚未實際執行。',thought:'教師出現離職念頭，尚未形成離職結果。','resignation-pending':'已提出辭職，但尚未生效。',pressure:'又一項普通工作衝突留下疲憊與壓力。',relief:'教師獲得具體支持，暫時繼續帶班。',restored:'執行前的異議使原撤換安排撤回，原導師職務保留。'})[kind];
 need(!effective||assignment,'effective interruption requires a current original assignment');
 const causeHistoryIds=r(w).history.filter(h=>h.type==='homeroom-result'&&h.data.schoolYearId===w.position.schoolYearId&&['pressure','thought','notice','resignation-pending'].includes(h.data.kind)).map(h=>h.id);
 const data={version:1,kind,causeHistoryIds,playerId:b.playerId,classId:b.classId,schoolYearId:w.position.schoolYearId,attemptId:w.identity.attemptId,effectiveAt:effective?{date:w.position.date,slotId:w.position.slotId}:null,legality:kind==='replaced'?'disputed':'not-a-disciplinary-finding',assignmentId:assignment?.id??b.assignmentId,description};
 return {type:'homeroom-result',eventId,basisFactId,data};
}
export function compileFailure(w){
 const b=w.extensions[HOMEROOM_KEY];if(!b||failureResult(w)||r(w).history.some(h=>h.type==='annual-success'&&h.data.year===w.position.serviceYear))return null;
 const sources=r(w).history.filter(h=>h.type==='homeroom-result'&&ending.has(h.data.kind)&&h.attemptId===w.identity.attemptId&&h.data.schoolYearId===w.position.schoolYearId);
 if(!sources.length)return null;
 const n=w.numeric.evolution.world;need(!n.registry.assignments.some(a=>a.personId===b.playerId&&a.classId===b.classId&&a.roleId===9&&a.until===null),'original duty is still active');
 const panel=deriveWorldPanel(n),base=w.extensions['teacher-hell/annual-observations'].start;
 return {version:1,year:w.position.serviceYear,schoolYearId:w.position.schoolYearId,openingId:w.position.openingId,attemptId:w.identity.attemptId,playerId:b.playerId,classId:b.classId,status:'failure',at:{date:w.position.date,slotId:w.position.slotId},sourceHistoryIds:[...new Set(sources.flatMap(h=>[h.id,...h.data.causeHistoryIds]))],factIds:[...new Set(sources.flatMap(h=>[h.factIds[0],...h.data.causeHistoryIds.map(id=>r(w).history.find(x=>x.id===id).factIds[0])]))],kinds:[...new Set(sources.map(h=>h.data.kind))],grade:null,score:null,comparison:Object.fromEntries([...ABILITY_NAMES,...STATE_NAMES].map(k=>[k,{start:base.abilities[k]??base.states[k],end:panel[k],delta:panel[k]-(base.abilities[k]??base.states[k])}])),summary:sources.map(h=>h.data.description).join('\n')};
}
export function authorizeRetry(w,options){
 const h=failureResult(w);need(h&&!r(w).history.some(h=>h.type==='annual-success'&&h.data.year===w.position.serviceYear),'current year has no verified failure');
 need(options.failureId===h.id&&options.failedAttemptId===w.identity.attemptId&&options.schoolYearId===w.position.schoolYearId&&options.expectedRevision===r(w).revision,'failure/year/attempt/revision mismatch');
 return {failureId:h.id,failedAttemptId:w.identity.attemptId,schoolYearId:w.position.schoolYearId,expectedRevision:r(w).revision};
}
export function validateHomeroom(w){
 const b=w.extensions[HOMEROOM_KEY],history=r(w).history,results=history.filter(h=>h.type==='homeroom-result'),failures=history.filter(h=>h.type==='annual-failure');
 if(!b){need(!results.length&&!failures.length&&!history.some(h=>h.type==='crisis-observation'),'missing continuity lifecycle');return;}
 assertShape(b,['version','playerId','classId','assignmentId','schoolYearId','openingId']);need(b.version===1&&b.playerId===w.identity.playerId&&b.classId===w.numeric.evolution.world.registry.homeClassId&&b.schoolYearId===w.position.schoolYearId&&b.openingId===w.position.openingId,'continuity baseline mismatch');
 const opening=w.numeric.evolution.world.registry.assignments.find(a=>a.id===b.assignmentId);need(opening&&opening.personId===b.playerId&&opening.classId===b.classId&&opening.roleId===9,'original duty missing');
 for(const h of results){const owner=history.find(s=>s.type==='story'&&s.operationId===h.operationId&&s.eventId===h.eventId&&s.data.operations.some(o=>o.type==='homeroom-result'&&same(o.data,h.data)&&o.basisFactId===h.factIds[0]));need(owner,'objective duty result lacks compiled story source');
  const at={...w,position:{...w.position,...h.at},extensions:{...w.extensions,'teacher-hell/world':{...r(w),history:history.slice(0,h.order-1)}}};need(same(h.data,homeroomOperation({...at,numeric:{...w.numeric,evolution:{...w.numeric.evolution,world:{...w.numeric.evolution.world,registry:{...w.numeric.evolution.world.registry,assignments:w.numeric.evolution.world.registry.assignments.map(a=>a.id===h.data.assignmentId?{...a,until:null}:a)}}}}},h.eventId,h.factIds[0],h.data.kind).data),'duty result changed');
  if(ending.has(h.data.kind)){const changed=history.find(s=>s.type==='school'&&s.operationId===h.operationId&&s.data.change.id===createId('operation',[h.factIds[0],'duty-ended']));need(changed&&changed.data.change.endsId===h.data.assignmentId&&changed.data.change.classId===null,'interruption was never executed');}
 }
 let previous=null;for(const h of history.filter(h=>h.type==='crisis-observation')){assertShape(h.data,['version','states','risk','memory']);need(h.data.version===1&&same(crisisFromStates(h.data.states),h.data.risk),'crisis observation changed');const elapsed=previous?Math.max(0,dayNumber(h.at.date)-dayNumber(previous.at.date)):0,expected=(previous?.data.memory??0)*2**(-elapsed/14)+(h.data.risk.compositeDepth+Object.values(h.data.risk.single).reduce((a,x)=>Math.max(a,x.depth),0))*Math.max(1,elapsed);need((!previous||elapsed>0)&&h.data.memory===expected,'crisis memory changed or sampled twice');previous=h;}
 need(failures.length<=1&&(!failures.length||!history.some(h=>h.type==='annual-success'&&h.data.year===w.position.serviceYear)),'success/failure or duplicate terminal');
 const effective=results.filter(h=>ending.has(h.data.kind));need((opening.until===null)===!effective.length,'assignment changed without an objective interruption source');need(!!failures.length===!!effective.length,'missing or forged failure terminal');
 if(failures.length){const h=failures[0],before={...w,extensions:{...w.extensions,'teacher-hell/world':{...r(w),history:history.slice(0,h.order-1)}}};need(same(compileFailure(before),h.data),'failure evidence/comparison changed');need(history.slice(h.order).length===0,'actions after terminal');need(h.operationId===effective[0].operationId,'failure was not settled with interruption');}
}
export function readFailure(w){const h=failureResult(w);if(!h)return null;return {id:h.id,year:h.data.year,status:'failure',at:structuredClone(h.data.at),grade:null,score:null,summary:h.data.summary,comparison:structuredClone(h.data.comparison)};}
