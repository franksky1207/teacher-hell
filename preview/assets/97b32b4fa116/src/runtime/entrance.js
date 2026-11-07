import { canonicalData } from '../changes/settlement.js';
import { seniorRosterAt } from './academic-roster.js';
/** Authoritative bridge from existing calendar, identity and academic journal. */
import { admissionCalendar,ADMISSIONS_POLICY } from '../calendar/admissions.js';
import { calendarDay,semester,planMode,THREE_YEAR,SENIOR_CALENDAR_VERSION } from '../calendar/calendar.js';
import { need } from '../academics/rules.js';
import { assertShape } from '../player/panel.js';
function mockEvidence(r,id,date){return ['morning','afternoon'].every(phase=>r.facts.some(f=>f.order<=r.history.length&&f.occurredAt.date===date&&f.data.mockSummary?.nodeId===id&&f.data.mockSummary.phase===phase)&&r.history.some(h=>h.type==='slot-complete'&&h.at.date===date&&h.at.slotId===phase));}
const runtime=w=>w.extensions['teacher-hell/world'];
export function entranceCalendarEnabled(w){const p=runtime(w).plan,registry=w.numeric.evolution.world.registry;return p.calendarVersion===SENIOR_CALENDAR_VERSION&&planMode(p)===THREE_YEAR&&registry.academicYear-registry.cohortStart===2;}
export function entranceCompatible(w,s){const registry=w.numeric.evolution.world.registry;return entranceCalendarEnabled(w)&&s.version===2&&!s.admissions.some(a=>a.year===registry.cohortStart+2);}
export function entranceInput(w,op,s){
 assertShape(op,['type','action','node',...['nodeId','personId','delta','decision','groups','basisFactId'].filter(k=>Object.hasOwn(op,k))]);
 need(op.action==='entrance'&&entranceCompatible(w,s),'incompatible admissions/calendar/academic policy');
 const r=runtime(w),registry=w.numeric.evolution.world.registry,date=w.position.date,cohort=registry.cohortStart;
 const input={action:'entrance',node:op.node,date,policy:ADMISSIONS_POLICY};
 const roster=seniorRosterAt(w,date),knownEnrollments=new Set(roster.knownEnrollmentIds);
 const people=roster.people.map(p=>p.id).filter(id=>s.students[id]).sort();
 const continuousIds=people.filter(id=>{const entries=registry.enrollments.filter(e=>e.personId===id&&knownEnrollments.has(e.id)).sort((a,b)=>a.from.localeCompare(b.from));return entries[0]?.from<=semester(`${cohort}:autumn`).start&&entries.every(e=>registry.classes[e.classId].cohortStart===cohort)&&entries.every((e,n)=>!e.until||e.until>=date||e.status==='change-class'&&entries[n+1]?.from<=e.until);});
 if(op.node==='init'){
  return {...input,cohort,people,continuousIds,seed:`${w.identity.careerId}:${cohort}:${ADMISSIONS_POLICY}`};
 }
 need(s.entrance,'admissions not initialized');
 if(['guidance','withdraw','decision','eligibility'].includes(op.node)){
  need(people.includes(op.personId),'currently enrolled student required');
  const f=r.facts.find(f=>f.id===op.basisFactId&&f.order<=r.history.length);need(f&&f.subjectIds.includes(op.personId)&&f.data.type===`entrance-${op.node}`,'verified student guidance/decision required');
  need(canonicalData(f.data.change)===canonicalData({personId:op.personId,...(op.node==='guidance'?{delta:op.delta}:op.node==='decision'?{decision:op.decision}:op.node==='eligibility'?{groups:op.groups}:{})}),'entrance source mismatch');
  if(op.node==='eligibility')need(f.data.reviewed===true&&f.data.scope==='school','school eligibility review required');
  if(op.node==='withdraw')need(s.entrance.students[op.personId]?.confirmed&&f.occurredAt.date>=s.entrance.students[op.personId].confirmed.date,'withdrawal fact must concern an existing confirmation');
  const route=s.entrance.students[op.personId]?.confirmed?.route;const deadlines={special:`${cohort+3}-03-03`,stars:`${cohort+3}-03-22`,stars8:`${cohort+3}-06-14`,application:`${cohort+3}-06-18`,technical:`${cohort+3}-06-18`};const deadline=deadlines[route]??date;
  return {...input,personId:op.personId,...(op.node==='guidance'?{delta:op.delta}:op.node==='decision'?{decision:op.decision}:op.node==='eligibility'?{groups:op.groups}:{}),basisFactId:op.basisFactId,sourceOrder:f.order,deadline,windows:admissionCalendar(cohort,r.plan.calendarVersion).filter(n=>['application-register','application-result','application-allocation'].includes(n.kind)).map(n=>({kind:n.kind,date:n.date}))};
 }
 const node=admissionCalendar(cohort,r.plan.calendarVersion).find(n=>n.id===op.nodeId);
 need(node&&node.kind===op.node&&date===node.date,'admissions calendar mismatch');
 const day=calendarDay(date,3,r.plan.calendarVersion),complete=r.history.findLast(h=>h.type==='slot-complete'&&h.at.date===date&&h.at.slotId===day.slots.at(-1).id);
 if(node.kind.startsWith('mock-'))need(mockEvidence(r,node.id,date),'both actual mock stages required');
 need(complete,'admissions phase requires actual completed day (mock morning and afternoon included)');
 const portfolio=node.kind==='application-review'?Object.fromEntries(Object.keys(s.entrance.students).map(id=>[id,{courseTermIds:Object.values(s.terms).filter(t=>t.closed&&t.rows.some(row=>row.id===id)).map(t=>t.termId),activityOrders:r.facts.filter(f=>f.order<=r.history.length&&f.occurredAt.date<=date&&f.subjectIds.includes(id)&&f.data.type==='campus-outcome'&&f.data.activityIds.length).map(f=>f.order),personalHistoryOrders:r.history.filter(h=>h.at.date<=date&&h.type==='event-exposure'&&h.data.participantIds?.includes(id)).map(h=>h.order)}])):null;
 return {...input,nodeId:node.id,sourceOrder:complete.order,...(node.dates?{examDates:[...node.dates]}:{}),...(portfolio?{portfolio}:{}),people,continuousIds};
}
export function nextEntranceOperations(w,s){
 if(!entranceCompatible(w,s))return [];
 const r=runtime(w),date=w.position.date,day=calendarDay(date,3,r.plan.calendarVersion);
 if(w.position.slotId!==day.slots.at(-1).id)return [];
 const operations=[];
 if(!s.entrance)operations.push({type:'academic',action:'entrance',node:'init'});
 const done=new Set(s.entrance?.completed.map(n=>n.id)??[]),cohort=w.numeric.evolution.world.registry.cohortStart;
 for(const node of admissionCalendar(cohort,r.plan.calendarVersion).filter(n=>n.date===date&&!done.has(n.id)&&(!n.kind.startsWith('mock-')||mockEvidence(r,n.id,date))))operations.push({type:'academic',action:'entrance',node:node.kind,nodeId:node.id});
 return operations;
}
export function entranceCondition(s,id,condition){const p=s.entrance?.students[id];if(!p)return false;return condition.kind==='active'?!p.confirmed&&p.intent!=='work':condition.kind==='route'?p.route===condition.value:condition.kind==='gsat-published'?p.gsat?.published===true:condition.kind==='confirmed'?!!p.confirmed:condition.kind==='subject-preparing'?p.route==='subject-preparing':false;}
export function entranceAbsent(w,s,id){const e=s.entrance,p=e?.students[id];if(!p)return false;const node=admissionCalendar(e.cohort,runtime(w).plan.calendarVersion).find(n=>(n.dates??[n.date]).includes(w.position.date)&&['gsat-exam','listening-exam','skills-exam','application-review','stars8-interview'].includes(n.kind));return node?.kind==='skills-exam'?!!p.skills:node?.kind==='listening-exam'?p.intent!=='work':node?.kind==='gsat-exam'?!!p.gsat?.registered:node?.kind==='application-review'?p.applications.some(a=>a.status==='screened'):node?.kind==='stars8-interview'?p.stars?.status==='interview-eligible':false;}

/** Continuations share the same personal-exam exclusion as new candidates. */
export function entranceAbsentFromHistory(w,id){const r=runtime(w),last=r.history.findLast(h=>h.type==='academic'&&h.data.input.action==='entrance'&&h.data.result.participation);if(!last)return false;const cohort=w.numeric.evolution.world.registry.cohortStart,node=admissionCalendar(cohort,r.plan.calendarVersion).find(n=>(n.dates??[n.date]).includes(w.position.date)&&['gsat-exam','listening-exam','skills-exam','application-review','stars8-interview'].includes(n.kind)),key={'gsat-exam':'gsat','listening-exam':'listening','skills-exam':'skills','application-review':'application','stars8-interview':'stars8'}[node?.kind];return key?last.data.result.participation[key].includes(id):false;}
