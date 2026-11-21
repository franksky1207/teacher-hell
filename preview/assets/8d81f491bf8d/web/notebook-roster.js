/** Current class, or the T3 class archive after completion; never a new roster. */
import {seatNumbers,schoolGender} from '../src/runtime/seats.js';
import {readSchoolRoster} from '../src/runtime/views.js';
export function notebookRoster(world){
 const roster=readSchoolRoster(world);if(!roster||roster.students.length)return roster;
 const archive=world.extensions['teacher-hell/world'].history.findLast(h=>h.type==='cohort-completion'&&h.data.classId===roster.classId);
 if(!archive)return roster;
 const n=world.numeric.evolution.world,name=id=>n.registry.profiles[id].displayName,seats=seatNumbers(n.registry,roster.classId);
 return {...roster,archived:true,students:[...archive.data.outcomes].sort((a,b)=>(seats.get(a.personId)??Infinity)-(seats.get(b.personId)??Infinity)).map(o=>({id:o.personId,name:name(o.personId),seatNo:seats.get(o.personId),gender:schoolGender(n.registry.profiles[o.personId]),caregivers:n.careLinks.filter(l=>l.studentId===o.personId).map(l=>({id:l.caregiverId,name:name(l.caregiverId),role:n.registry.profiles[l.caregiverId].familyRole??null,primaryContact:n.registry.profiles[l.caregiverId].primaryContact===true}))}))};
}
