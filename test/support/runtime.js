/** Supplied synthetic moments only: not a calendar or formal event content. */
import { foundationScenario } from './scenarios.js';
import { createId } from '../../src/contracts/foundation.js';
import { startWorld } from '../../src/runtime/transactions.js';
import { runtimeOf } from '../../src/runtime/model.js';
export const id=(kind,...parts)=>createId(kind,['runtime-test',...parts.map(String)]);
export function runtimeScenario(seed=11) {
  const f=foundationScenario(seed);f.events=[];
  const positions=[f.position,{...f.position,slotId:'supplied-next-slot'},...Array.from({length:8},(_,i)=>({...f.position,date:`2026-08-${String(i+4).padStart(2,'0')}`}))];
  return startWorld(f,{id:'synthetic-order',validation:'unverified',positions});
}
export function request(world,tag,operations,preconditions=[]) {
  return {id:id('operation',tag),attemptId:world.identity.attemptId,expectedRevision:runtimeOf(world).revision,actorId:world.identity.playerId,preconditions,operations};
}
export function event(world,tag='one',choice=null) {
  return {schemaVersion:1,id:id('event',tag),definitionId:'synthetic:conflict',contentVersion:'synthetic',type:'direct',participantIds:[world.identity.playerId,...world.numeric.evolution.world.classroom.studentIds.slice(0,2)],stageId:id('stage',tag,1),facts:[],knowledge:[],results:[],choice};
}
export function fact(e,tag='one',overrides={}) {
  return {type:'fact',id:id('fact',tag),eventId:e.id,stageId:e.stageId,subjectIds:e.participantIds,witnessIds:e.participantIds.slice(1),description:'Objective synthetic occurrence',data:{},categoryCodes:['H01-1'],causeIds:[],...overrides};
}
export const open=e=>({type:'open-event',event:e});
export const observation=actor=>({kind:'observation',actorId:actor,basisFactId:id('fact','one')});
export function result(e,subjectId,tag='one',delta=3,facet=tag) {
  return {type:'result',id:id('result',tag),eventId:e.id,stageId:e.stageId,factId:id('fact','one'),subjectId,facet,effects:[{id:id('effect',tag),operation:{type:'direct',changes:[{target:{kind:'person',id:subjectId},code:'1-1',delta}]}}]};
}
