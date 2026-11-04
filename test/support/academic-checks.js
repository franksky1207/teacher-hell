/** Real three-slot IndexedDB tests through the existing stored-session API. */
import { eventWorld } from './event-fixtures.js';
import { request } from './runtime.js';
import { createIndexedDBStorage } from '../../src/storage/indexeddb.js';
import { createStoredSession } from '../../src/storage/session.js';
const check=(x,m)=>{if(!x)throw Error(m);},equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
export async function academicStorage(testId){
 const test=testId+'-academics',db=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:test}),a=await createStoredSession(db,1),initial=eventWorld(74);await a.initialize(initial);
 const opening={...request(initial,'open-real-academics',[{type:'academic',action:'open',termId:'2026:autumn'}]),calendarContext:{kind:'procedure'}};await a.execute(opening);
 const w=a.snapshot().payload.world,before=await db.read(1),q={...request(w,'real-campus',[{type:'school-action',activity:'routine'}]),calendarContext:{kind:'routine'}};
 const faulty=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:test,faults:{beforeCommit(){throw new DOMException('injected school storage abort','QuotaExceededError');}}}),f=await createStoredSession(faulty,1);let rejected=false;try{await f.execute(q);}catch{rejected=true;}check(rejected&&equal(await db.read(1),before),'School result or RNG survived aborted write');await faulty.close();
 await a.execute(q);const after=await db.read(1);check((await a.execute(q)).duplicate&&equal(await db.read(1),after),'School resend changed result');
 const b=await createStoredSession(db,2);await b.import(await a.export(),{expectedToken:null});check(equal(b.snapshot().payload,a.snapshot().payload),'School import mismatch');
 const c=await createStoredSession(db,3);await c.initialize(initial);check(!equal(c.snapshot().payload.world,a.snapshot().payload.world),'Third slot contaminated');
 await db.close();return {signature:JSON.stringify(after),report:{date:after.payload.world.position.date,slot:after.payload.world.position.slotId,bytes:new TextEncoder().encode(JSON.stringify(after)).length,rollback:true,resend:true,threeSlots:true}};
}
export async function academicSignature(testId){const db=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:testId+'-academics'}),record=await db.read(1);await db.close();return JSON.stringify(record);}
