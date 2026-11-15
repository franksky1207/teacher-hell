import {assertShape,identifier} from '../player/panel.js';
import {canonicalData} from '../changes/settlement.js';
import {projectIssues} from './issues.js';
const need=(ok,m)=>{if(!ok)throw new RangeError('ISSUE_CANDIDATE: '+m);};
const runtime=w=>w.extensions['teacher-hell/world'];
const same=(a,b)=>canonicalData(a)===canonicalData(b);
const scopes=['student','caregiver','staff','reunion','contact'];
/** v1 has one named root per story. Bounded predicates never expand candidates. */
export function validateIssueEligibility(q){
 assertShape(q,['version','binding','kind','states','actors','knowledge',...('condition' in q?['condition']:[])]);
 need(q.version===1,'unsupported eligibility version');[q.binding,q.kind].forEach(identifier);
 need(Array.isArray(q.states)&&q.states.length>0&&new Set(q.states).size===q.states.length&&q.states.every(s=>['open','closed','invalidated'].includes(s)),'states');
 need(Array.isArray(q.actors)&&q.actors.length>0&&q.actors.length<=6,'actors');
 const names=q.actors.map(a=>a.role);need(new Set(names).size===names.length&&names.includes('participant')&&!names.includes('teacher'),'unique actor roles including participant');
 for(const a of q.actors){assertShape(a,['role','scope']);identifier(a.role);need(scopes.includes(a.scope),'actor scope');}
 need(Array.isArray(q.knowledge),'knowledge');for(const k of q.knowledge){assertShape(k,['role','source']);need(['teacher',...names].includes(k.role)&&['root','latest'].includes(k.source),'knowledge source');}
 let nodes=0;function check(c,depth=0){need(++nodes<=24&&depth<=3,'condition bound');const keys=Object.keys(c);need(keys.length===1,'one predicate');const k=keys[0],v=c[k];
 if(['all','any'].includes(k)){need(Array.isArray(v)&&v.length>0&&v.length<=8,'condition list');v.forEach(x=>check(x,depth+1));}
 else {need(['latestType','assessment','evidenceFactId','createdFrom','createdUntil'].includes(k),'unknown predicate');identifier(v);if(k==='latestType')need(['open','progress','close','invalidate'].includes(v),'operation type');if(k==='assessment')need(['improved','worsened','changed','uncertain'].includes(v),'assessment');if(k.startsWith('created'))need(/^\d{4}-\d{2}-\d{2}$/.test(v)&&Number.isFinite(Date.parse(v)),'date');}}
 if(q.condition)check(q.condition);return q;
}
function meets(issue,c,fact){if(!c)return true;const [k,v]=Object.entries(c)[0];if(k==='all')return v.every(x=>meets(issue,x,fact));if(k==='any')return v.some(x=>meets(issue,x,fact));return k==='latestType'?issue.latestOperation.type===v:k==='assessment'?issue.latestOperation.assessment===v:k==='evidenceFactId'?issue.evidenceFactIds.includes(v):k==='createdFrom'?fact.occurredAt.date>=v:fact.occurredAt.date<=v;}
export function issueMatches(issue,q,roles,view){
 return !!issue&&issue.kind===q.kind&&q.states.includes(issue.state)&&q.actors.every(a=>issue.actors.includes(roles[a.role]))&&new Set(q.actors.map(a=>roles[a.role])).size===q.actors.length&&meets(issue,q.condition,view.fact(issue.createdBy.factId))&&q.knowledge.every(k=>view.disclosure(roles[k.role],k.source==='root'?issue.createdBy.factId:issue.latestOperation.factId));
}
export function issueView(world,beforeOrder=runtime(world).history.length+1){const r=runtime(world);return {fact:id=>r.facts.find(f=>f.id===id&&f.order<beforeOrder),disclosure:(actorId,factId)=>r.disclosures.find(d=>d.actorId===actorId&&d.factId===factId&&d.order<beforeOrder)};}
function contact(world,id){return runtime(world).facts.findLast(f=>f.data?.type==='contact'&&f.occurredAt.date===world.position.date&&f.subjectIds.includes(id)&&f.subjectIds.includes(world.identity.playerId)&&f.witnessIds.includes(world.identity.playerId));}
/** Pure enumeration: each root/role tuple is unique; group weight is applied once. */
export function issueOptions(world,q,participant,pool,issues=projectIssues(world)){
 const view=issueView(world),options=[],contactRoles=q.actors.filter(a=>a.role!=='participant'||!['student','staff'].includes(a.scope));
 for(const issue of issues){
  if(!issue.actors.includes(participant))continue;
  let rows=[{teacher:world.identity.playerId,participant}];
  for(const a of q.actors){if(a.role==='participant'){if(!pool(a.scope).includes(participant)||(contactRoles.includes(a)&&!contact(world,participant)))rows=[];continue;}rows=rows.flatMap(row=>issue.actors.filter(id=>pool(a.scope).includes(id)&&!Object.values(row).includes(id)&&contact(world,id)).map(id=>({...row,[a.role]:id})));}
  for(const roles of rows)if(issueMatches(issue,q,roles,view))options.push({version:1,name:q.binding,issueId:issue.id,rootFactId:issue.createdBy.factId,latestOperationId:issue.latestOperation.id,latestFactId:issue.latestOperation.factId,evidenceFactIds:[...issue.evidenceFactIds],roleBindings:roles,informationSources:q.knowledge.map(k=>({role:k.role,actorId:roles[k.role],factId:k.source==='root'?issue.createdBy.factId:issue.latestOperation.factId,disclosureOrder:view.disclosure(roles[k.role],k.source==='root'?issue.createdBy.factId:issue.latestOperation.factId).order})),contactFactIds:contactRoles.map(a=>contact(world,roles[a.role]).id)});
 }
 return [...new Map(options.map(o=>[canonicalData(o),o])).values()].sort((a,b)=>canonicalData(a)<canonicalData(b)?-1:canonicalData(a)>canonicalData(b)?1:0);
}
/** Bound sources may advance only through this story's own confirmed facts. */
export function boundIssue(view,binding,eventId,{exact=false}={}){
 const issue=view.issue(binding.issueId);need(issue&&issue.createdBy.factId===binding.rootFactId,'bound root missing');
 const at=issue.operations.findIndex(o=>o.id===binding.latestOperationId);need(at>=0&&issue.operations[at].factId===binding.latestFactId,'bound operation missing');
 need(!exact||issue.latestOperation.id===binding.latestOperationId,'bound operation changed');
 need(issue.operations.slice(at+1).every(o=>view.fact(o.factId)?.eventId===eventId),'bound issue advanced externally');
 need(binding.evidenceFactIds.every(id=>issue.evidenceFactIds.includes(id)),'bound evidence missing');return issue;
}
export function boundRoles(selection){return selection?.issueBindings?.[0]?.roleBindings??{};}
export function validateBoundSelection(world,s,definition,{pool=null,view=null,exact=false}={}){
 const q=definition.eligibility.issue;if(!q)return;
 need(s.bindingContract===1&&s.issueBindings?.length===1,'binding contract');const b=s.issueBindings[0];need(b.version===1&&b.name===q.binding,'binding name');assertShape(b,['version','name','issueId','rootFactId','latestOperationId','latestFactId','evidenceFactIds','roleBindings','informationSources','contactFactIds']);
 view??={...issueView(world),issue:id=>projectIssues(world).find(x=>x.id===id)};
 const issue=boundIssue(view,b,s.eventId,{exact});
 need(Object.keys(b.roleBindings).length===q.actors.length+1,'unexpected bound roles');
 if(exact){need(same(b.evidenceFactIds,issue.evidenceFactIds),'evidence differs');const sources=q.knowledge.map(k=>{const factId=k.source==='root'?issue.createdBy.factId:issue.latestOperation.factId,actorId=b.roleBindings[k.role];return {role:k.role,actorId,factId,disclosureOrder:view.disclosure(actorId,factId)?.order};});need(same(b.informationSources,sources),'information sources differ');}
 need(issueMatches(issue,q,b.roleBindings,view),'bound qualification failed');
 const contactRoles=q.actors.filter(a=>a.role!=='participant'||!['student','staff'].includes(a.scope));
 need(b.contactFactIds.length===contactRoles.length&&b.contactFactIds.every((id,i)=>{const f=view.fact(id);return f?.data?.type==='contact'&&f.occurredAt.date===s.date&&f.subjectIds.includes(b.roleBindings[contactRoles[i].role])&&f.subjectIds.includes(world.identity.playerId)&&f.witnessIds.includes(world.identity.playerId);}),'bound contact evidence differs');
 need(b.roleBindings.participant===s.participantIds[0]&&b.roleBindings.teacher===world.identity.playerId,'bound participant changed');
 if(pool){for(const a of q.actors)need(pool(a.scope).includes(b.roleBindings[a.role]),'actor outside legal pool');for(const a of contactRoles)need(contact(world,b.roleBindings[a.role]),'dynamic actor contact expired');}
 return issue;
}

/** A rejected opt-in reservation stays in selection history and consumes no story. */
export const rejectedIssueReservation=(world,eventId)=>runtime(world).history.some(h=>h.type==='event-admission-rejection'&&h.data.eventId===eventId);

export const boundParticipants=(candidate,binding)=>binding.roleBindings.companion?[candidate.participantIds[0],binding.roleBindings.companion,...candidate.participantIds.slice(1).filter(id=>id!==binding.roleBindings.companion)]:candidate.participantIds;
