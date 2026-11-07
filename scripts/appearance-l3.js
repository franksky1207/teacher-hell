/** 15-B-L3 experimental appearance catalog. NO real sprites / save schema changes.
 * Pure, deterministic; identity, appearance.variant and explicit gender are authoritative.
 * Synthetic compatibility edges MUST be replaced by approved assets before production.
 */
export const APPEARANCE_CATALOG_VERSION='l3-hypothetical-v1';
const GENDERS=['male','female'];
const COLORS=['black','dark-brown','natural-brown'];
const ACC=['none','glasses','hair-clip'];
const EYES=['soft','sharp','round'];
const PROTOTYPES=Object.freeze(GENDERS.flatMap((gender)=>Array.from({length:8},(_,i)=>({
 id:(gender==='male'?'M':'F')+String(i+1).padStart(2,'0'),gender,
 // Each prototype has five unique planned hair asset keys. No hair PNGs exist yet.
 hairIds:Array.from({length:5},(_,h)=>(gender==='male'?'m':'f')+'-'+String(i+1).padStart(2,'0')+'-h'+(h+1))
}))));
const text=v=>typeof v==='string'&&v.length>0;
const uint16=v=>Number.isSafeInteger(v)&&v>=0&&v<=65535;
export function hashAppearance(value){
 let h=2166136261;
 for(const c of String(value)){h=Math.imul(h^c.charCodeAt(0),16777619)>>>0;}
 return h>>>0;
}
const key=o=>[o.prototype,o.hair,o.color,o.eyes,o.accessory].join('/');
const fingerprint=o=>[o.prototype,o.hair,o.eyes].join('/');
export function buildAppearanceCatalog(){
 const candidates=[];
 for(const proto of PROTOTYPES){
  for(let hairIndex=0;hairIndex<proto.hairIds.length;hairIndex++)
   for(const color of COLORS)for(const eyes of EYES)for(const accessory of ACC){
    // Hypothetical accessory constraint: the fifth hairstyle covers a hair-clip
    // anchoring position. This is NOT real art compatibility proof.
    if(hairIndex===4&&accessory==='hair-clip')continue;
    candidates.push(Object.freeze({gender:proto.gender,prototype:proto.id,
     hair:proto.hairIds[hairIndex],color,eyes,accessory}));
   }
 }
 return Object.freeze(candidates);
}
export const CATALOG=buildAppearanceCatalog();
export function appearanceCounts(catalog=CATALOG){
 const theoretical=PROTOTYPES.length*5*COLORS.length*EYES.length*ACC.length;
 return {theoretical,syntheticallyLegal:catalog.length,excluded:theoretical-catalog.length,
  actualApprovedPrototypeCount:1,actualInterchangeableHairCount:0,
  actualValidatedCompositeCount:0};
}
function validateStudent(s){
 if(!s||!text(s.personId)||!uint16(s.variant)||!GENDERS.includes(s.gender))
  throw new TypeError('Student must have durable personId, 0..65535 variant, and authoritative gender');
}
function orderedStudents(students){
 if(!Array.isArray(students))throw new TypeError('Expected ordered stable roster');
 const seen=new Set();
 for(const s of students){validateStudent(s);if(seen.has(s.personId))throw new RangeError('Duplicate personId');seen.add(s.personId);}
 return students;
}
function scoreSimilarity(a,b){
 if(!a||!b)return 0;
 let n=0;
 if(a.prototype===b.prototype)n+=8;
 if(a.hair===b.hair)n+=6;
 if(a.eyes===b.eyes)n+=1;
 if(a.color===b.color)n+=1;
 if(a.accessory===b.accessory)n+=1;
 return n;
}
/** Assign in unchanging original enrollment receipt order, including transfers appended.
 * A missing participant is kept in that history; never recompute from active roster.
 * At this stage this is a pure simulation, not wired to runtime or persisted.
 */
export function assignAppearances({careerId,orderedRoster,catalog=CATALOG}){
 if(!text(careerId))throw new TypeError('careerId required');
 const students=orderedStudents(orderedRoster);
 const used=new Set(),assigned=new Map(),taken=[];
 for(const student of students){
  const available=catalog.filter(o=>o.gender===student.gender&&!used.has(key(o)));
  if(!available.length)throw new RangeError('Insufficient gender-compatible appearances');
  const start=hashAppearance(JSON.stringify([APPEARANCE_CATALOG_VERSION,careerId,student.personId,student.variant]))%available.length;
  // Search bounded 64 candidate samples, preferring separate base faces & hairstyles.
  // Fixed stable input order preserves earlier allocations when a transfer arrives.
  const sample=Math.min(64,available.length);let best=null,bestRank=Infinity;
  const stride=available.length>1?available.length-1:1; // coprime with available.length
  for(let k=0;k<sample;k++){
   const index=(start+k*stride)%available.length,o=available[index];
   const near=taken.reduce((acc,v)=>Math.max(acc,scoreSimilarity(o,v)),0);
   const sameFace=taken.filter(v=>v.prototype===o.prototype).length;
   const rank=near*100+sameFace*50+k;
   if(rank<bestRank){best=o;bestRank=rank;}
  }
  used.add(key(best));taken.push(best);
  assigned.set(student.personId,best);
 }
 return assigned;
}
export function appearanceMetrics(assignment){
 const arr=[...assignment.values()];
 const keys=arr.map(key),faces=arr.map(x=>x.prototype);
 const nearPairs=arr.reduce((n,a,i)=>n+arr.slice(i+1).filter(b=>scoreSimilarity(a,b)>=10).length,0);
 const exactFingerprints=arr.map(fingerprint);
 return {population:arr.length,exactDuplicateCount:keys.length-new Set(keys).size,
  similarPairCount:nearPairs,sharedFacePairs:faces.reduce((n,a,i)=>n+faces.slice(i+1).filter(b=>a===b).length,0),
  exactFaceHairEyesDuplicates:exactFingerprints.length-new Set(exactFingerprints).size};
}
export function safeAppearance(assetExists,choice){
 // Only approved actual full-body student-001 base is known. It is not
 // automatically assigned to unrelated NPCs; unknown combos use CSS silhouette.
 if(choice?.prototype==='approved-student-001'&&assetExists?.('student-001-base.png'))
  return {kind:'image',id:'student-001-base.png'};
 return {kind:'placeholder',id:'student-silhouette'};
}
