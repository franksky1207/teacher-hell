import { validateMemorial } from './memorial.js';
import { canonicalData } from '../changes/settlement.js';
/** Platform adapter. Each slot has its own DB, so large transactions cannot lock other slots.
 * A permanent generation record survives deletion to prevent stale-token ABA writes. */
import { restoreSave, saveToken, sameToken } from './format.js';
import { ensure, WorldError } from '../runtime/model.js';
// Physical storage v2 wraps the complete logical v2 save. Compression and
// verification run outside IDB transactions. Export/import remain portable JSON.
const PAGE_BYTES=262144;
async function pageDigest(pages){
  const bytes=await new Blob(pages).arrayBuffer();
  return Array.from(new Uint8Array(await globalThis.crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');
}
export async function packStoredText(text){
  // Older engines retain the original format; never write a codec they cannot read.
  if(typeof globalThis.CompressionStream!=='function'||typeof globalThis.DecompressionStream!=='function'||!globalThis.crypto?.subtle){
    const pages=[];for(let i=0;i<text.length;i+=PAGE_BYTES)pages.push(text.slice(i,i+PAGE_BYTES));
    return {pages,metadata:{chunkCount:pages.length}};
  }
  let offset=0,rawBytes=0;
  const encoder=new TextEncoder(),source=new ReadableStream({pull(controller){
    if(offset===text.length){controller.close();return;}
    let end=Math.min(offset+PAGE_BYTES,text.length);
    // A split surrogate pair must not become two replacement characters.
    if(end<text.length&&text.charCodeAt(end-1)>=0xd800&&text.charCodeAt(end-1)<=0xdbff)end--;
    const bytes=encoder.encode(text.slice(offset,end));offset=end;rawBytes+=bytes.length;controller.enqueue(bytes);
  }}),pages=[];
  let pending=new Uint8Array(PAGE_BYTES),used=0;
  const reader=source.pipeThrough(new globalThis.CompressionStream('gzip')).getReader();
  try{for(;;){const {done,value:bytes}=await reader.read();if(done)break;
    for(let i=0;i<bytes.length;){const count=Math.min(PAGE_BYTES-used,bytes.length-i);pending.set(bytes.subarray(i,i+count),used);used+=count;i+=count;
      if(used===PAGE_BYTES){pages.push(pending);pending=new Uint8Array(PAGE_BYTES);used=0;}
    }
  }}finally{await reader.cancel().catch(()=>{});reader.releaseLock();}
  if(used)pages.push(pending.slice(0,used));
  return {pages,metadata:{format:2,codec:'gzip',rawBytes,sha256:await pageDigest(pages),chunkCount:pages.length}};
}
export async function unpackStoredText(head,pages){
  ensure(Number.isSafeInteger(head.chunkCount)&&head.chunkCount>0&&head.chunkCount===pages.length,'CORRUPT','Missing save pages');
  if(head.format===undefined){ensure(pages.every(p=>typeof p==='string'),'CORRUPT','Invalid legacy pages');return pages.join('');}
  ensure(head.format===2&&head.codec==='gzip','VERSION','Unsupported physical save format/codec');
  ensure(Number.isSafeInteger(head.rawBytes)&&head.rawBytes>0&&typeof head.sha256==='string'&&/^[0-9a-f]{64}$/.test(head.sha256)&&pages.every(p=>p instanceof Uint8Array&&p.length>0&&p.length<=PAGE_BYTES),'CORRUPT','Invalid compressed metadata/pages');
  ensure(typeof globalThis.DecompressionStream==='function'&&globalThis.crypto?.subtle,'CODEC','This browser cannot decompress this save; use a supported browser');
  ensure(await pageDigest(pages)===head.sha256,'CORRUPT','Compressed save checksum differs');
  let index=0,total=0;const decoder=new TextDecoder('utf-8',{fatal:true}),parts=[];
  const source=new ReadableStream({pull(controller){if(index===pages.length)controller.close();else controller.enqueue(pages[index++]);}});
  const reader=source.pipeThrough(new globalThis.DecompressionStream('gzip')).getReader();
  try{
    for(;;){const {done,value:bytes}=await reader.read();if(done)break;
      total+=bytes.length;ensure(total<=head.rawBytes,'CORRUPT','Save expands beyond declared size');parts.push(decoder.decode(bytes,{stream:true}));
    }
    parts.push(decoder.decode());
  }catch(error){throw new WorldError('CORRUPT','Damaged compressed save: '+error.message);}
  finally{await reader.cancel().catch(()=>{});reader.releaseLock();}
  ensure(total===head.rawBytes,'CORRUPT','Expanded save size differs');return parts.join('');
}
export function createIndexedDBStorage({factory,namespace,testId, faults={}}) {
  ensure(factory&&typeof factory.open==='function','STORAGE','IndexedDB unavailable');
  ensure(['player','development','test'].includes(namespace),'NAMESPACE','Explicit storage namespace required');
  ensure(namespace!=='test'||(typeof testId==='string'&&/^[a-zA-Z0-9_-]{1,80}$/.test(testId)),'NAMESPACE','Unique test namespace required');
  const prefix=`teacher-hell:${namespace}${namespace==='test'?':'+testId:''}:v1`;
  const connections=new Map();let closed=false;
  function open(slot){
    ensure([1,2,3].includes(slot),'SLOT','Only slots 1, 2, 3 exist');ensure(!closed,'STORAGE','Storage closed');
    if(!connections.has(slot))connections.set(slot,new Promise((resolve,reject)=>{
      let rejected=false;const request=factory.open(`${prefix}:slot${slot}`,1);
      request.onupgradeneeded=()=>{request.result.createObjectStore('state');request.result.createObjectStore('pages');};
      request.onerror=()=>{connections.delete(slot);reject(request.error);};
      request.onblocked=()=>{rejected=true;connections.delete(slot);reject(new WorldError('BLOCKED','Close older tabs before opening storage'));};
      request.onsuccess=()=>{const db=request.result;if(closed||rejected){db.close();reject(new WorldError('STORAGE','Storage closed'));return;}db.onversionchange=()=>{db.close();connections.delete(slot);};resolve(db);};
    }));
    return connections.get(slot);
  }
  let memorialConnection;
  function openMemorial(){
    ensure(!closed,'STORAGE','Storage closed');
    if(!memorialConnection)memorialConnection=new Promise((resolve,reject)=>{
      const req=factory.open(`${prefix}:memorials`,1);
      req.onupgradeneeded=()=>req.result.createObjectStore('memorials',{keyPath:'id'});
      req.onerror=()=>{memorialConnection=null;reject(req.error);};
      req.onblocked=()=>{memorialConnection=null;reject(new WorldError('BLOCKED','Memorial storage blocked'));};
      req.onsuccess=()=>{const db=req.result;if(closed){db.close();reject(new WorldError('STORAGE','Storage closed'));return;}db.onversionchange=()=>{db.close();memorialConnection=null;};resolve(db);};
    });return memorialConnection;
  }
  async function listMemorials(){
    const db=await openMemorial(),rows=await new Promise((resolve,reject)=>{const tx=db.transaction('memorials','readonly'),req=tx.objectStore('memorials').getAll();tx.oncomplete=()=>resolve(req.result);tx.onabort=()=>reject(tx.error);tx.onerror=()=>{};});
    return rows.map(row=>{try{return {status:'valid',record:validateMemorial(row)};}catch{return {status:'corrupt',id:typeof row?.id==='string'?row.id:null};}});
  }
  async function writeMemorial(input){
    const m=validateMemorial(input),db=await openMemorial();
    return new Promise((resolve,reject)=>{const tx=db.transaction('memorials','readwrite'),store=tx.objectStore('memorials');let failure,result;
      tx.oncomplete=()=>resolve(result);tx.onabort=()=>reject(failure??tx.error??new WorldError('ABORT','Memorial write aborted'));tx.onerror=()=>{};
      const req=store.get(m.id);req.onsuccess=()=>{try{
        if(req.result){
          let old;try{old=validateMemorial(req.result);}catch{ensure(req.result.kind==='teacher-hell-memorial'&&req.result.version===1&&req.result.id===m.id,'MEMORIAL','Unsupported memorial cannot be overwritten');}
          if(old){ensure(canonicalData(old)===canonicalData(m),'CONFLICT','Career memorial differs');result={status:'retained',duplicate:true,id:m.id};}
          else {store.put(m);result={status:'retained',duplicate:false,repaired:true,id:m.id};}
        }
        else {store.add(m);result={status:'retained',duplicate:false,id:m.id};}
        faults.beforeMemorialCommit?.({transaction:tx});
      }catch(error){failure=error;tx.abort();}};
    });
  }
  async function read(slot){
    const db=await open(slot);
    const record=await new Promise((resolve,reject)=>{
      const tx=db.transaction(['state','pages'],'readonly'),head=tx.objectStore('state').get('save'),pages=tx.objectStore('pages').getAll();
      tx.oncomplete=()=>resolve({head:head.result,pages:pages.result});tx.onabort=()=>reject(tx.error??new WorldError('ABORT','Read aborted'));tx.onerror=()=>{};
    });
    if(!record.head){ensure(record.pages.length===0,'CORRUPT','Orphan save pages');return {payload:null,token:null};}
    const text=await unpackStoredText(record.head,record.pages);
    const payload=restoreSave(text),token=saveToken({generation:record.head.token?.generation,payload});
    ensure(sameToken(token,record.head.token),'CORRUPT','Save metadata disagrees with world');return {payload,token};
  }

  // Metadata-only inspection lets a confirmed backup replace an unreadable payload.
  // This does not return or install an unvalidated world.
  async function inspect(slot){
    const db=await open(slot),head=await new Promise((resolve,reject)=>{
      const tx=db.transaction('state','readonly'),r=tx.objectStore('state').get('save');
      tx.oncomplete=()=>resolve(r.result);tx.onabort=()=>reject(tx.error??new WorldError('ABORT','Inspection aborted'));tx.onerror=()=>{};
    });
    if(!head)return {token:null};
    const token=head.token;
    ensure(token&&Number.isSafeInteger(token.generation)&&token.generation>0&&Number.isSafeInteger(token.revision)&&token.revision>=0&&typeof token.careerId==='string'&&typeof token.attemptId==='string','CORRUPT','Unreadable slot metadata; refusing blind overwrite');
    return {token:structuredClone(token)};
  }
  async function write(slot,payload,expectedToken){
    // Expensive validation happens before opening the write transaction, with no async gap inside it.
    const checked=payload===null?null:restoreSave(payload);
    const packed=checked?await packStoredText(JSON.stringify(checked)):null;
    const db=await open(slot);
    return new Promise((resolve,reject)=>{
      const tx=db.transaction(['state','pages'],'readwrite'),store=tx.objectStore('state'),pages=tx.objectStore('pages');let failure,result;
      const abort=error=>{failure=error;tx.abort();};
      tx.oncomplete=()=>resolve(result);tx.onabort=()=>reject(failure??tx.error??new WorldError('ABORT','Write aborted'));tx.onerror=()=>{};
      const r=store.get('save');r.onsuccess=()=>{
        try{
          ensure(sameToken(r.result?.token??null,expectedToken),'STALE','Slot changed in another tab; reload before writing');
          const counter=store.get('generation');counter.onsuccess=()=>{
            try{
              const generation=(counter.result??0)+1;ensure(Number.isSafeInteger(generation),'VERSION','Generation exhausted');
              pages.clear();
              if(checked){const token=saveToken({generation,payload:checked});packed.pages.forEach((chunk,index)=>pages.put(chunk,index));store.put({token,...packed.metadata},'save');result={payload:checked,token};}
              else {store.delete('save');result={payload:null,token:null};}
              store.put(generation,'generation');
              // Test-only synchronous fault point, after requests are queued but before commit.
              faults.beforeCommit?.({slot,transaction:tx});
            }catch(error){abort(error);}
          };
        }catch(error){abort(error);}
      };
    });
  }
  return Object.freeze({read,write,inspect,listMemorials,writeMemorial,async close(){closed=true;for(const connection of connections.values())try{(await connection).close();}catch{}connections.clear();if(memorialConnection)try{(await memorialConnection).close();}catch{} }});
}
