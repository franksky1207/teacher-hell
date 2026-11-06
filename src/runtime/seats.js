/** Deterministic Taiwan-style class seat assignment.
 * Seats are derived from immutable opening cohort identities and the chronological
 * school-enrollment ledger; browsing never renumbers surviving pupils.
 * Character counts are the closed set used by the current generated-name catalogue.
 * Reference standard: MOE standard Han character stroke forms (not Kangxi numerology).
 */
const counts=Object.freeze({
 '陳':16,'林':8,'黃':12,'張':11,'李':7,'王':4,'吳':7,'劉':15,'蔡':17,'楊':13,
 '宇':6,'庭':10,'雅':12,'安':6,'承':8,'涵':11,'文':4,'哲':10,
 '怡':8,'宏':7,'欣':8,'瑋':13,'思':9,'恩':10,'家':10,'軒':10
});
// For equal surname stroke counts compare radical, outside-radical strokes,
// then standard character code point (a stable tie-breaker, never a name interleave).
const radicals=Object.freeze({'陳':[3,13],'林':[4,4],'黃':[12,0],'張':[3,8],
 '李':[4,3],'王':[4,0],'吳':[3,4],'劉':[2,13],'蔡':[6,11],'楊':[4,9]});
const cmp=(a,b)=>a<b?-1:a>b?1:0;
function compareCharacter(a,b){
 if(a===b)return 0;
 return cmp(counts[a]??999,counts[b]??999)||cmp(a.codePointAt(0),b.codePointAt(0));
}
function surnameKey(name){
 const surname=[...name][0]??'',parts=radicals[surname]??[999,999];
 return [counts[surname]??999,...parts,surname.codePointAt(0)??0];
}
function compareSurname(a,b){
 const x=surnameKey(a),y=surnameKey(b);
 for(let i=0;i<x.length;i++){const c=cmp(x[i],y[i]);if(c)return c;}
 return 0;
}
function compareGiven(a,b){
 const x=[...a].slice(1),y=[...b].slice(1),n=Math.max(x.length,y.length);
 for(let i=0;i<n;i++){
  if(!x[i]||!y[i])return cmp(x.length,y.length);
  const c=compareCharacter(x[i],y[i]);if(c)return c;
 }
 return 0;
}
/** Fixed binary sex marker for this game's generated pupils.
 * New profiles retain this value; legacy profiles derive the identical value
 * from their already-persisted random appearance seed, without migration.
 */
export function schoolGender(profile){
 if(profile?.gender==='male'||profile?.gender==='female')return profile.gender;
 const seed=profile?.appearance?.variant;
 if(!Number.isInteger(seed)||seed<0||seed>65535)throw new TypeError('Missing persistent student seed');
 return seed%2===0?'male':'female';
}
export function compareSeatCandidates(a,b){
 const gender=cmp(a.gender==='male'?0:1,b.gender==='male'?0:1);
 return gender||compareSurname(a.name,b.name)||compareGiven(a.name,b.name)||cmp(a.id,b.id);
}
/** The source of seat numbers is the immutable entry list, not a live sorting
 * of currently enrolled students. Re-entry keeps its first seat; newly joining
 * students receive a permanent next number even when former seats are vacant. */
export function seatNumbers(registry,classId){
 if(!registry?.classes?.[classId])throw new RangeError('Unknown class for seats');
 const cohort=registry.cohorts.find(c=>c.classId===classId);
 const initial=cohort?.initialStudentIds??registry.enrollments.filter(e=>e.classId===classId&&e.reason==='initial').map(e=>e.personId);
 const unique=new Set(initial);
 const entries=initial.map(id=>{
  const profile=registry.profiles[id];if(!profile)throw new RangeError('Missing student profile');
  return {id,name:profile.displayName,gender:schoolGender(profile)};
 }).sort(compareSeatCandidates);
 const numbers=new Map(entries.map((entry,i)=>[entry.id,i+1]));
 // Enrollment ID is the persisted causal order for arrivals and school switches.
 const arrivals=registry.enrollments.filter(e=>e.classId===classId&&!unique.has(e.personId))
  .sort((a,b)=>Number(a.id.slice('school-enrollment:'.length))-Number(b.id.slice('school-enrollment:'.length)));
 for(const e of arrivals){
  if(unique.has(e.personId))continue;
  unique.add(e.personId);numbers.set(e.personId,numbers.size+1);
 }
 return numbers;
}
