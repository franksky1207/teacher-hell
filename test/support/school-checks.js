/** Real IndexedDB checks for official school APIs, isolated from player careers. */
import { foundationScenario } from './scenarios.js';
import { request,event,fact,open } from './runtime.js';
import { startSchoolCareer } from '../../src/runtime/transactions.js';
import { createIndexedDBStorage } from '../../src/storage/indexeddb.js';
import { createStoredSession } from '../../src/storage/session.js';
import { createId } from '../../src/contracts/foundation.js';
import { runtimeOf } from '../../src/runtime/model.js';
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const check=(ok,label)=>{if(!ok)throw Error(label);};
export async function schoolStorage(testId){
 const name=testId+'-school',db=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:name});
 const f=foundationScenario(74);f.events=[];f.enrollments=[];
 const w=startSchoolCareer(f,{startYear:2026,subject:'國文',seed:75});
 const a=await createStoredSession(db,1);await a.initialize(w);const before=await db.read(1);
 const e=event(w,'school-browser');e.definitionId='procedure:school';e.participantIds=[w.identity.playerId,...w.numeric.evolution.world.classroom.studentIds];
 const cause=fact(e,'school-browser',{subjectIds:e.participantIds,witnessIds:[]});
 const q={...request(w,'school-browser-move',[open(e),cause,...e.participantIds.slice(1,3).map(personId=>({type:'school',basisFactId:cause.id,change:{type:'school-leave',personId,status:'transferred-out',reason:'documented transfer'}}))]),calendarContext:{kind:'procedure'}};
 const faulty=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:name,faults:{beforeCommit(){throw new DOMException('injected school quota','QuotaExceededError');}}});
 const failed=await createStoredSession(faulty,1);let rejected=false;try{await failed.execute(q);}catch{rejected=true;}
 check(rejected&&equal(await db.read(1),before),'School quota failure changed a person or slot');await faulty.close();
 await a.execute(q);const after=await db.read(1);check(after.payload.world.numeric.evolution.world.classroom.studentIds.length===38,'School transfer roster');
 check((await a.execute(q)).duplicate,'School resend generated a person twice');check(equal(after,await db.read(1)),'Duplicate changed stored school');
 const text=await a.export(),b=await createStoredSession(db,2);await b.import(text,{expectedToken:null});check(equal(b.snapshot().payload,a.snapshot().payload),'School export/import lost identity/history');
 const c=await createStoredSession(db,3);await c.initialize(w);await c.retry({attemptId:createId('attempt',['school-browser-retry']),seeds:{settlement:81,streams:{events:82,schedule:83}}});
 check(equal(c.snapshot().payload.world.numeric.evolution.world.registry,w.numeric.evolution.world.registry),'Retry regenerated school people');
 let fourth=false;try{await db.read(4);}catch{fourth=true;}check(fourth,'Fourth career slot accepted');
 await db.close();const reopened=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:name}),restored=await createStoredSession(reopened,1);
 check(equal(restored.snapshot(),after),'Reopening school IndexedDB changed identifiers or history');
 const result={students:after.payload.world.numeric.evolution.world.classroom.studentIds.length,scheduledTransfers:after.payload.world.numeric.evolution.world.registry.transfers.length,revision:runtimeOf(after.payload.world).revision,bytes:new TextEncoder().encode(text).length};
 await reopened.close();return {report:result,signature:JSON.stringify(after)};
}

export async function restoredSchoolSignature(testId){
 const db=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:testId+'-school'});
 const value=await db.read(1);await db.close();return JSON.stringify(value);
}
