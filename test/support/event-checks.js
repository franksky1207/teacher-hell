/** Real IndexedDB engineering checks; namespace isolated from player data. */
import { eventWorld,draw } from './event-fixtures.js';
import { request } from './runtime.js';
import { runtimeOf } from '../../src/runtime/model.js';
import { createIndexedDBStorage } from '../../src/storage/indexeddb.js';
import { createStoredSession } from '../../src/storage/session.js';
import { createId } from '../../src/contracts/foundation.js';
import { createRandom } from '../../src/numeric/random.js';
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const check=(ok,m)=>{if(!ok)throw Error(m);};
export async function eventSetup(testId,initialize){
 const options={factory:globalThis.indexedDB,namespace:'test',testId:testId+'-events'},db=createIndexedDBStorage(options),session=await createStoredSession(db,1);
 if(initialize){const w=eventWorld();w.random.events=createRandom(0).snapshot();await session.initialize(w);}
 return {options,db,session};
}
export async function eventCompete(t,tag){
 const w=t.session.snapshot().payload.world;
 try{await t.session.execute(request(w,tag,[draw()]));return {ok:true};}catch(e){return {ok:false,code:e.code};}
}
export async function eventStorageChecks(t){
 await t.session.recover();const state=t.session.snapshot(),w=state.payload.world,selection=runtimeOf(w).history.find(h=>h.type==='event-selection').data;
 check(selection.selected.length>0,'Fixture must select an event');
 const original=w.random.events,q=JSON.parse(runtimeOf(w).commits.at(-1).request);check((await t.session.execute(q)).duplicate,'Draw replay failed');check(same(t.session.snapshot(),state),'Replay rewrote event RNG');
 const s=selection.selected[0],admit=request(w,'event-browser-admit',[{type:'admit-event',eventId:s.eventId}]);
 const faulty=createIndexedDBStorage({...t.options,faults:{beforeCommit(){throw new DOMException('event write quota','QuotaExceededError');}}}),failed=await createStoredSession(faulty,1),disk=await t.db.read(1);
 let rejected=false;try{await failed.execute(admit);}catch{rejected=true;}check(rejected&&same(await t.db.read(1),disk),'Admission failure left half event');check(same(failed.snapshot().payload.world.random.events,original),'Failure advanced RNG');await faulty.close();
 await t.session.execute(admit);check(t.session.snapshot().payload.world.events[0].id===s.eventId,'Locked identity changed on admit');
 const text=await t.session.export(),two=await createStoredSession(t.db,2);await two.import(text,{expectedToken:null});check(same(two.snapshot().payload,t.session.snapshot().payload),'Export/import lost event history');
 const three=await createStoredSession(t.db,3);await three.initialize(eventWorld());await three.retry({attemptId:createId('attempt',['event-browser-retry']),seeds:{settlement:1,streams:{events:2,schedule:3}}});
 check(!runtimeOf(three.snapshot().payload.world).history.some(h=>h.type==='event-selection'),'Retry introduced ghost event');
 check(same((await t.db.read(2)).payload,t.session.snapshot().payload),'Other slots modified events');
 const signature=JSON.stringify(await t.db.read(1));await t.db.close();const reopened=createIndexedDBStorage(t.options),saved=await reopened.read(1);check(JSON.stringify(saved)===signature,'DB reopen changed selection');await reopened.close();
 return {signature,report:{checks:9,selected:selection.selected.length,revision:runtimeOf(w).revision,bytes:new TextEncoder().encode(text).length}};
}
export async function eventSignature(testId){const t=await eventSetup(testId,false);const s=JSON.stringify(await t.db.read(1));await t.db.close();return s;}

export async function eventDrawFailure(t){
 const before=await t.db.read(1),w=t.session.snapshot().payload.world;
 const faulty=createIndexedDBStorage({...t.options,faults:{beforeCommit(){throw new DOMException('event draw quota','QuotaExceededError');}}}),s=await createStoredSession(faulty,1);
 let failed=false;try{await s.execute(request(w,'failed-draw',[draw()]));}catch{failed=true;}
 check(failed&&same(await t.db.read(1),before)&&same(s.snapshot().payload.world,w),'Failed draw consumed random or left a reservation');await faulty.close();return 'draw rollback preserves all RNG, selection and disk';
}
