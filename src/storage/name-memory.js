/** Tiny cross-slot recent-given-name ledger. Independent of the three saves.
 * The whole bounded LRU is one IndexedDB record, atomically replaced per write.
 * Never writes game data or attempts to revive deleted slots.
 */
import {surnameOf} from '../world/name-catalog.js';
export const NAME_MEMORY_LIMIT=4096;
const DB_VERSION=1,STORE='history',KEY='recent';
const dbName=namespace=>`teacher-hell:${namespace}:names:v1`;
function database(factory,namespace){
 return new Promise((resolve,reject)=>{
  const request=factory.open(dbName(namespace),DB_VERSION);
  request.onupgradeneeded=()=>request.result.createObjectStore(STORE);
  request.onerror=()=>reject(request.error??Error('Name history unavailable'));
  request.onblocked=()=>reject(Error('Name history blocked by another tab'));
  request.onsuccess=()=>resolve(request.result);
 });
}
function transaction(db,mode,run){
 return new Promise((resolve,reject)=>{
  const tx=db.transaction(STORE,mode),store=tx.objectStore(STORE);
  let output;
  tx.oncomplete=()=>resolve(output);
  tx.onabort=()=>reject(tx.error??Error('Name history transaction failed'));
  const req=store.get(KEY);
  req.onsuccess=()=>{
   try{output=run(store,Array.isArray(req.result)?req.result:[]);}catch(error){tx.abort();reject(error);}
  };
 });
}
export async function readNameMemory({factory,namespace='development'}){
 const db=await database(factory,namespace);
 try{return await transaction(db,'readonly',(_store,rows)=>rows.filter(name=>typeof name==='string'&&name.length>0).slice(-NAME_MEMORY_LIMIT));}
 finally{db.close();}
}
export async function rememberNames({factory,namespace='development',names}){
 if(!Array.isArray(names))throw new TypeError('Name list required');
 const incoming=[...new Set(names.filter(name=>typeof name==='string'&&name.length>0))];
 if(!incoming.length)return 0;
 const db=await database(factory,namespace);
 try{return await transaction(db,'readwrite',(store,rows)=>{
  const added=new Set(incoming),next=rows.filter(name=>!added.has(name)).concat(incoming).slice(-NAME_MEMORY_LIMIT);
  store.put(next,KEY);return next.length;
 });}finally{db.close();}
}
export function generatedGivenNames(world){
 const profiles=world?.numeric?.evolution?.world?.registry?.profiles??{};
 return Object.values(profiles).map(p=>p.displayName.slice(surnameOf(p.displayName).length));
}
