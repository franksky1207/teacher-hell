/** Opening-only cross-life name preference.
 * This edits an unattached, uncommitted proposal; never mutate a saved world.
 * Determinism: same proposal + same history always produce the same roster.
 */
import {GIVEN_NAME_CATALOG,surnameOf} from '../world/name-catalog.js';
function stableHash(input){
 let h=2166136261;
 for(let i=0;i<input.length;i++)h=Math.imul(h^input.charCodeAt(i),16777619)>>>0;
 return h;
}
export function preferUnusedOpeningNames(opening,recentNames){
 if(!opening?.numeric?.evolution?.world?.registry?.profiles||!Array.isArray(recentNames))throw new TypeError('Uncommitted opening and name history required');
 const world=opening.numeric.evolution.world,profiles=world.registry.profiles;
 const history=new Map(recentNames.map((name,index)=>[name,index])); // oldest first
 const occupied=new Set(),candidates=[];
 for(const [id,profile] of Object.entries(profiles)){
  const surname=surnameOf(profile.displayName);
  const before=profile.displayName.slice(surname.length);
  const sex=profile.gender??(profile.familyRole==='father'?'male':profile.familyRole==='mother'?'female':'neutral');
  const pool=GIVEN_NAME_CATALOG[sex];
  const proposed=pool.includes(before)&&!history.has(before)&&!occupied.has(before)?before:null;
  if(proposed){occupied.add(proposed);continue;}
  candidates.push({id,profile,surname,sex,pool});
 }
 for(const {id,profile,surname,pool} of candidates){
  const start=stableHash(opening.identity.careerId+':'+id)%pool.length;
  let chosen=null,bestAge=Infinity;
  for(let i=0;i<pool.length;i++){
   const name=pool[(start+i)%pool.length];
   if(occupied.has(name))continue;
   const age=history.get(name);
   if(age===undefined){chosen=name;break;}
   if(age<bestAge){bestAge=age;chosen=name;}
  }
  if(chosen===null)throw new RangeError('No distinct given names available for this opening');
  profile.displayName=surname+chosen;
  occupied.add(chosen);
 }
 return {people:Object.keys(profiles).length,replaced:candidates.length,historyCount:recentNames.length};
}
