/** Small independent keepsake transport. Checksum detects corruption, not hostile editing. */
import { canonicalData } from '../changes/settlement.js';
import { ensure } from '../runtime/model.js';
import { careerResult,validateCareerSummary } from '../runtime/career.js';
const MAX_BYTES=65536;
function excerpt(text,limit){const chars=[...text];return chars.length<=limit?text:chars.slice(0,limit-1).join('')+'…';}
const keys=(o,names)=>ensure(o&&Object.keys(o).sort().join(',')===names.sort().join(','),'MEMORIAL','Unexpected memorial schema');
function digest(value){let hash=14695981039346656037n;for(const c of canonicalData(value)){hash^=BigInt(c.codePointAt(0));hash=BigInt.asUintN(64,hash*1099511628211n);}return hash.toString(16).padStart(16,'0');}
export function validateMemorial(input){
 const m=typeof input==='string'?JSON.parse(input):input;canonicalData(m);keys(m,['kind','version','id','data','checksum']);
 ensure(m.kind==='teacher-hell-memorial'&&m.version===1,'MEMORIAL','Unsupported memorial version');
 const d=m.data;keys(d,['careerId','completionRef','completedAt','years','score','grade','parts','cohorts','people','events','abilities','states','ending']);
 ensure(m.id===`memorial:${d.careerId}`&&typeof d.careerId==='string'&&d.careerId.length>0&&typeof d.completionRef==='string'&&d.years===30,'MEMORIAL','Invalid memorial identity');
 ensure(Number.isFinite(d.score)&&d.score>=0&&d.score<=100&&['SS','S','A','B','C','D','E','F'].includes(d.grade),'MEMORIAL','Invalid score');
 ensure(Array.isArray(d.cohorts)&&d.cohorts.length===10&&Array.isArray(d.people)&&d.people.length<=10&&Array.isArray(d.events)&&d.events.length<=10&&typeof d.ending==='string','MEMORIAL','Invalid compact summary');
 validateCareerSummary(d);
 ensure(m.checksum===digest(d)&&new TextEncoder().encode(canonicalData(m)).byteLength<=MAX_BYTES,'MEMORIAL','Damaged or oversized memorial');
 return structuredClone(m);
}
/** Requires a world already validated at the save/session boundary. */
export function memorialFromWorld(w){
 const h=careerResult(w);if(!h||h.data.mode==='three-year')return null;const d=h.data;
 const data={careerId:d.careerId,completionRef:h.id,completedAt:{...d.at},years:30,score:d.rating.score,grade:d.rating.grade,parts:d.rating.parts,cohorts:d.cohorts,people:d.people.map(p=>({...p,name:excerpt(p.name,80)})),events:d.events.map(e=>({...e,description:excerpt(e.description,240),subjectIds:e.subjectIds.slice(0,8)})),abilities:d.abilities,states:d.states,ending:excerpt(d.ending.text,1200)};
 return validateMemorial({kind:'teacher-hell-memorial',version:1,id:`memorial:${d.careerId}`,data,checksum:digest(data)});
}
export async function retainMemorial(storage,w){const m=memorialFromWorld(w);if(!m)return {status:'not-completed'};ensure(typeof storage.writeMemorial==='function','MEMORIAL','Memorial storage unavailable');return storage.writeMemorial(m);}
