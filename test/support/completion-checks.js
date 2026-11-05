/** Real Chromium IndexedDB tests. Only the small memorial fixture is contractual;
 * production slots always contain fully validated untouched first-year worlds. */
import {createIndexedDBStorage} from '../../src/storage/indexeddb.js';
import {createStoredSession} from '../../src/storage/session.js';
import {validateMemorial} from '../../src/storage/memorial.js';
import {annualOpening} from './annual-scenario.js';
import {createId} from '../../src/contracts/foundation.js';
const need=(ok,m)=>{if(!ok)throw Error(m);};
export async function completionStorage(testId,initialize=true){
 const started=performance.now(),name=testId+'-completion';let fail=false;
 const db=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:name,faults:{beforeMemorialCommit(){if(fail)throw Error('test memorial quota');}}});
 try{
  const m=validateMemorial(await (await fetch('./test/support/completion-memorial.json')).json());
  if(initialize){
   for(const slot of [1,2,3]){let w;annualOpening({events:false,onOpening:x=>w=x});w.identity.careerId=createId('career',['completion-browser',String(slot)]);const s=await createStoredSession(db,slot);await s.initialize(w);}
   const before=await Promise.all([1,2,3].map(async slot=>JSON.stringify(await db.read(slot))));
   fail=true;let rejected=false;try{await db.writeMemorial(m);}catch{rejected=true;}need(rejected,'Memorial fault failed to abort');fail=false;
   need((await db.listMemorials()).length===0,'Aborted memorial leaked');
   const writes=await Promise.all([db.writeMemorial(m),db.writeMemorial(m)]);need(writes.filter(r=>!r.duplicate).length===1,'Concurrent memorial did not deduplicate');
   const after=await Promise.all([1,2,3].map(async slot=>JSON.stringify(await db.read(slot))));need(before.every((text,i)=>text===after[i]),'Memorial changed a player slot');
   let rejectedSlot=false;try{await db.read(4);}catch{rejectedSlot=true;}need(rejectedSlot,'Fourth player slot exists');
   const s=await createStoredSession(db,1),old=s.snapshot(),exported=await s.export();await s.delete({expectedToken:old.token,confirmed:true});
   let fresh;annualOpening({seed:81,events:false,onOpening:x=>fresh=x});fresh.identity.careerId=createId('career',['completion-browser','new']);await s.initialize(fresh);
   need((await db.listMemorials()).length===1,'New career deleted memorial');need(s.snapshot().payload.world.position.serviceYear===1&&s.snapshot().payload.world.identity.careerId!==old.payload.world.identity.careerId,'New career inherited old identity');
   const slot2=await createStoredSession(db,2),token=slot2.snapshot().token;await slot2.import(exported,{expectedToken:token,confirmed:true});need((await db.listMemorials()).length===1,'Save import duplicated memorial');
   // Corrupt record lives in its independent DB; valid records and saves survive.
   const direct=await new Promise((resolve,reject)=>{const q=globalThis.indexedDB.open(`teacher-hell:test:${name}:v1:memorials`,1);q.onsuccess=()=>resolve(q.result);q.onerror=()=>reject(q.error);});
   await new Promise((resolve,reject)=>{const tx=direct.transaction('memorials','readwrite');tx.objectStore('memorials').put({id:'broken',version:99});tx.oncomplete=resolve;tx.onabort=()=>reject(tx.error);});await new Promise((resolve,reject)=>{const tx=direct.transaction('memorials','readwrite');tx.objectStore('memorials').put({...m,checksum:'damaged'});tx.oncomplete=resolve;tx.onabort=()=>reject(tx.error);});direct.close();
   need((await db.writeMemorial(m)).repaired===true,'Validated completed source did not repair its damaged v1 memorial');
   need((await db.listMemorials()).some(x=>x.status==='corrupt'),'Corruption hidden or thrown across entire list');
  }
  const rows=await db.listMemorials();need(rows.filter(r=>r.status==='valid').length===1&&rows.filter(r=>r.status==='corrupt').length===1,'Memorial navigation persistence lost');
  const s=await createStoredSession(db,1);need(s.snapshot().payload.world.position.serviceYear===1,'Fresh career lost');
  return {scope:'real IndexedDB, explicit memorial contract fixture, validated year-one slots; NOT natural 30-year completion',valid:1,corrupt:1,slots:3,memorialBytes:new TextEncoder().encode(JSON.stringify(m)).byteLength,elapsedMs:performance.now()-started,heapUsed:performance.memory?.usedJSHeapSize??null};
 }finally{await db.close();}
}
