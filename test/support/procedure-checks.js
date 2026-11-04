import { canonicalData } from '../../src/changes/settlement.js';
/** Real IndexedDB acceptance; test namespace only, using formal institution transactions. */
import { procedureWorld,openProcedure,executeProcedure } from './procedure-scenario.js';
import { runtimeOf } from '../../src/runtime/model.js';
import { createSave,encodeSave } from '../../src/storage/format.js';
import { createIndexedDBStorage } from '../../src/storage/indexeddb.js';
import { createStoredSession } from '../../src/storage/session.js';
const check=(x,m)=>{if(!x)throw Error(m);},same=(a,b)=>canonicalData(a)===canonicalData(b);
export async function procedureStorage(testId){
 const test=testId+'-procedures',db=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:test}),a=await createStoredSession(db,1),initial=procedureWorld();await a.initialize(initial);
 const out=openProcedure(initial,'gender','persisted',{childProtection:true,emergency:true}),commits=runtimeOf(out.world).commits.slice(runtimeOf(initial).revision),signal=JSON.parse(commits[0].request),command=JSON.parse(commits[1].request);await a.execute(signal);
 const before=await db.read(1),bad=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:test,faults:{beforeCommit(){throw new DOMException('injected procedure write abort','QuotaExceededError');}}}),faulty=await createStoredSession(bad,1);let rejected=false;try{await faulty.execute(command);}catch{rejected=true;}check(rejected&&same(await db.read(1),before),'Partial procedure, deadline or protection survived aborted write');await bad.close();
 await a.execute(command);check(same(a.snapshot().payload.world,out.world),'Stored operation differs from production preparation');const saved=await db.read(1);check((await a.execute(command)).duplicate&&same(saved,await db.read(1)),'Resend changed institution state');
 let long=a.snapshot().payload.world;long=executeProcedure(long,{action:'duty-offer',id:'persisted:long',personId:long.identity.playerId,kind:'project',description:'跨學期三年專案',until:'2029-07-20',endCondition:'交接或結束',mandatory:false}).world;long=executeProcedure(long,{action:'duty-response',id:'persisted:long',response:'accept'},long.identity.playerId).world;long=openProcedure(long,'counselling','second-persisted').world;
 const b=await createStoredSession(db,2);await b.import(encodeSave(createSave(long)),{expectedToken:null});check(same(b.snapshot().payload.world,long),'parallel/long duty import mismatch');
 const c=await createStoredSession(db,3);await c.initialize(initial);check(runtimeOf(c.snapshot().payload.world).history.every(h=>h.type!=='institution'),'Third career inherited cases');
 const encoded=await a.export(),corrupt=JSON.parse(encoded);corrupt.world.extensions['teacher-hell/world'].history.find(h=>h.type==='institution').data.result.finding='substantiated';let invalid=false;try{await b.import(JSON.stringify(corrupt),{expectedToken:b.snapshot().token,confirmed:true});}catch{invalid=true;}check(invalid&&same(b.snapshot().payload.world,long),'Corrupt import replaced existing procedure state');
 await db.close();return {signature:JSON.stringify(saved),report:{bytes:new TextEncoder().encode(encoded).length,rollback:true,resend:true,parallelCases:true,longDuty:true,threeSlots:true,corruptImportRejected:true}};
}
export async function procedureSignature(testId){const db=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:testId+'-procedures'}),record=await db.read(1);await db.close();return JSON.stringify(record);}
