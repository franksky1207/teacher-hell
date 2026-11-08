/** A bounded pre-play source, never an event ledger, N6 receipt or roster of old pupils. */
import { createRandom } from '../numeric/random.js';
import { createExperiencedPlayer,experiencedProfile,sameCreationData } from '../player/creation.js';
import { assertShape } from '../player/panel.js';
import { SCHOOL_SUBJECTS } from './registry.js';
import { directedKey,contactKey,relationshipBasis } from './relationships.js';
const need=(ok,message)=>{if(!ok)throw new RangeError(message);};
export const DUTY_RESPONSIBILITIES=Object.freeze({
 'subject-convenor':['coordinate-subject-meetings','share-teaching-materials'],
 'curriculum-committee':['review-curriculum-proposals','attend-committee-meetings'],
 'student-support-group':['coordinate-student-support','refer-to-authorized-offices'],
});
for(const list of Object.values(DUTY_RESPONSIBILITIES))Object.freeze(list);
export function backgroundStaff(world,seed){
 const rng=createRandom((seed^0x54425032)>>>0),r=world.registry;
 need(r,'Background requires the current school registry');
 const teachers=r.assignments.filter(a=>a.personId!==world.player.current.playerId&&a.roleId===8&&a.id.startsWith('appointment:')&&a.from===r.assignments[0].from).map(a=>a.personId).sort();
 const offices=r.assignments.filter(a=>[2,3,4].includes(a.roleId)&&a.id.startsWith('appointment:')&&a.from===r.assignments[0].from).map(a=>a.personId).sort();
 need(teachers.length>=2&&offices.length,'Existing school staff required');
 const first=teachers.splice(rng.integer(0,teachers.length-1),1)[0],second=teachers[rng.integer(0,teachers.length-1)];
 return [first,second,offices[rng.integer(0,offices.length-1)]];
}
function metadata(w,profile,subject=w.background?.subject){
 const player=w.player.current.playerId,schoolId=w.school.id;
 return {version:1,scope:'pre-play-same-school',subject,episodes:profile.episodes.map((e,i)=>({...e,schoolId,participantIds:i<3?[player,w.player.origin.staffIds[i]]:[player],playerKnown:true})),
  responsibility:profile.duty===null?null:{id:'background-duty:initial',personId:player,appointedBy:w.registry.assignments.find(a=>a.id==='appointment:office:1:0')?.personId,title:profile.duty,scope:schoolId,subject:profile.duty==='subject-convenor'?subject:null,sourceId:profile.episodes.at(-1).id,from:w.registry.assignments[0].from,until:null,authority:'coordination-only',responsibilities:[...DUTY_RESPONSIBILITIES[profile.duty]]}};
}
function evaluationRefs(profile,player){return profile.opinions.map(o=>({sourceId:o.id,kind:'person',targetId:player,scope:`pre-play opinion:${o.basisId}`,weight:1,reference:{type:'person-evaluation',key:directedKey(o.id,player)}}));}
export function initializePrehistory(world,{seed,count,subject}){
 need(!world.background&&world.player.version===1,'Background can initialize only once');
 const staffIds=backgroundStaff(world,seed);world.player=structuredClone(createExperiencedPlayer(world.player,{seed,count,staffIds}));
 const profile=experiencedProfile(world.player.origin),player=world.player.current.playerId;
 need(SCHOOL_SUBJECTS.includes(subject),'Background teaching subject required');
 const {responsibility,...background}=metadata(world,profile,subject);world.background=background;world.registry.responsibilities=responsibility?[responsibility]:[];
 world.social??={version:1,groups:{},groupEvaluations:{},attestations:{}};
 for(const o of profile.opinions){
  const contact=contactKey(player,o.id);need(!Object.hasOwn(world.contacts,contact),'Background cannot overwrite existing contact');
  world.contacts[contact]={a:player,b:o.id,reference:o.basisId};
  for(const [fromId,toId,values] of [[o.id,player,o.incoming],[player,o.id,o.outgoing]])world.relationships[directedKey(fromId,toId)]={fromId,toId,basis:relationshipBasis(world,fromId,toId),values:{...values}};
  const key=directedKey(o.id,player),scope=`pre-play opinion:${o.basisId}`;
  world.reputations[key]={fromId:o.id,toId:player,scope,values:{...o.reputation}};
  world.social.attestations[key]={fromId:o.id,toId:player,scope,basisId:o.basisId};
 }
 world.player.current.evaluations=evaluationRefs(profile,player);
 return world;
}
export function validatePrehistory(world){
 if(!Object.hasOwn(world,'background')){need(world.player.version!==2&&!world.registry?.responsibilities,'Veteran player is missing background provenance');return;}
 need(world.player.version===2&&world.school.mode==='private'&&SCHOOL_SUBJECTS.includes(world.background.subject),'Background belongs to an experienced private-school teacher');
 const origin=world.player.origin,profile=experiencedProfile(origin),expected=metadata(world,profile),player=world.player.current.playerId;
 const {responsibility,...background}=expected;
 assertShape(world.background,['version','scope','subject','episodes']);
 need(sameCreationData(world.background,background)&&sameCreationData(world.registry.responsibilities,responsibility?[responsibility]:[]),'Background or responsibility differs from seeded provenance');
 need(sameCreationData(origin.staffIds,backgroundStaff(world,origin.seed)),'Background staff do not match initial school appointments');
 for(const o of profile.opinions){
  need(world.people[o.id]?.kind==='other','Background acquaintance must be an existing adult staff member');
  const contact=world.contacts[contactKey(player,o.id)],key=directedKey(o.id,player);
  need(contact?.reference===o.basisId&&world.relationships[key]&&world.relationships[directedKey(player,o.id)],'Missing background contact or directional edge');
  need(world.social?.attestations[key]?.basisId===o.basisId,'Missing background opinion provenance');
 }
 need(world.registry.assignments.some(a=>a.personId===player&&a.roleId===9&&a.classId===world.registry.initialClassId&&a.from===world.registry.assignments[0].from),'Veteran must originate in the real initial homeroom');
}
/** Runtime calls only while no natural update/effect has occurred; later values may evolve. */
export function validatePrehistoryOpening(world){
 if(!world.background)return;
 const p=experiencedProfile(world.player.origin),player=world.player.current.playerId;
 const expected={...p.sources,evaluations:evaluationRefs(p,player)};
 need(sameCreationData(world.player.current,expected),'Untouched veteran sources changed');
 for(const o of p.opinions){const key=directedKey(o.id,player);need(sameCreationData(world.relationships[key].values,o.incoming)&&sameCreationData(world.relationships[directedKey(player,o.id)].values,o.outgoing)&&sameCreationData(world.reputations[key].values,o.reputation),'Untouched background opinions changed');}
}
