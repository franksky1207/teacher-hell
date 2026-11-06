/** Taiwan stroke-collation ordering. Compare the complete family surname first,
 * so different surnames with equal stroke count cannot interleave siblings.
 * ICU's zh-Hant stroke collation covers every generated name character, unlike
 * a small hardcoded stroke lookup. */
import {surnameOf} from '../world/name-catalog.js';
const stroke=new Intl.Collator('zh-Hant-u-co-stroke',{usage:'sort'});
const cmp=(a,b)=>a<b?-1:a>b?1:0;
const compareSurname=(a,b)=>stroke.compare(surnameOf(a),surnameOf(b));
function compareGiven(a,b){
 const sx=surnameOf(a),sy=surnameOf(b);
 const x=[...a.slice(sx.length)],y=[...b.slice(sy.length)];
 for(let i=0;i<Math.max(x.length,y.length);i++){
  if(!x[i]||!y[i])return cmp(x.length,y.length);
  const c=stroke.compare(x[i],y[i]);if(c)return c;
 }
 return 0;
}
export function schoolGender(profile){
 if(profile?.gender==='male'||profile?.gender==='female')return profile.gender;
 const seed=profile?.appearance?.variant;
 if(!Number.isInteger(seed)||seed<0||seed>65535)throw new TypeError('Missing persistent student seed');
 return seed%2===0?'male':'female';
}
export function compareSeatCandidates(a,b){
 const sex=cmp(a.gender==='male'?0:1,b.gender==='male'?0:1);
 return sex||compareSurname(a.name,b.name)||compareGiven(a.name,b.name)||cmp(a.id,b.id);
}
export function seatNumbers(registry,classId){
 if(!registry?.classes?.[classId])throw new RangeError('Unknown class for seats');
 const cohort=registry.cohorts.find(c=>c.classId===classId);
 const initial=cohort?.initialStudentIds??registry.enrollments.filter(e=>e.classId===classId&&e.reason==='initial').map(e=>e.personId);
 const unique=new Set(initial);
 const entries=initial.map(id=>{
  const p=registry.profiles[id];if(!p)throw new RangeError('Missing student profile');
  return {id,name:p.displayName,gender:schoolGender(p)};
 }).sort(compareSeatCandidates);
 const numbers=new Map(entries.map((e,i)=>[e.id,i+1]));
 const arrivals=registry.enrollments.filter(e=>e.classId===classId&&!unique.has(e.personId))
  .sort((a,b)=>Number(a.id.slice('school-enrollment:'.length))-Number(b.id.slice('school-enrollment:'.length)));
 for(const e of arrivals){if(unique.has(e.personId))continue;unique.add(e.personId);numbers.set(e.personId,numbers.size+1);}
 return numbers;
}
