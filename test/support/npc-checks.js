/** Real Chromium/IndexedDB acceptance; test namespace only. */
import { createIndexedDBStorage } from '../../src/storage/indexeddb.js';
import { createStoredSession } from '../../src/storage/session.js';
import { createSave } from '../../src/storage/format.js';
import { peerScenario,npcRequest,npcReport } from './npc-scenario.js';
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const check=(v,m)=>{if(!v)throw Error(m);};
export async function npcStorage(testId){
 const options={factory:globalThis.indexedDB,namespace:'test',testId:testId+'-npc'},db=createIndexedDBStorage(options);
 const s=await createStoredSession(db,1),{world}=peerScenario();await s.import(JSON.stringify(createSave(world)),{expectedToken:null});
 const before=await db.read(1),request=npcRequest(world,[{type:'npc-update'}]);
 const failedDb=createIndexedDBStorage({...options,faults:{beforeCommit({transaction}){transaction.abort();}}}),failed=await createStoredSession(failedDb,1);
 let rejected=false;try{await failed.execute(request);}catch{rejected=true;}
 check(rejected&&same(before,await db.read(1))&&same(before,failed.snapshot()),'NPC failure changed disk or memory/PRNG');await failedDb.close();
 await s.execute(request);check((await s.execute(request)).duplicate,'NPC resend executed twice');
 const after=await db.read(1),text=await s.export();
 for(const slot of [2,3]){const other=await createStoredSession(db,slot);await other.import(text,{expectedToken:null});check(same(other.snapshot().payload,s.snapshot().payload),'NPC import differs');}
 const second=await createStoredSession(db,2);await second.execute(npcRequest(second.snapshot().payload.world,[{type:'npc-update'}]));check(same(after,await db.read(1)),'NPC second slot overwrote first');
 const report=npcReport(after.payload.world);check(report.restored&&report.decisions.length>0,'NPC restore lost actions');
 const signature=JSON.stringify(after);await db.close();return {signature,report:{rollback:true,resend:true,threeSlots:true,exportImport:true,restored:true,bytes:new TextEncoder().encode(text).length,decisions:report.decisions.map(d=>d.action)}};
}
export async function npcSignature(testId){const db=createIndexedDBStorage({factory:globalThis.indexedDB,namespace:'test',testId:testId+'-npc'});const signature=JSON.stringify(await db.read(1));await db.close();return signature;}
