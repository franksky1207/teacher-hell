import {boundIssue} from './issue-candidates.js';
import {assertShape,identifier} from '../player/panel.js';
import {createId} from '../contracts/foundation.js';
import {directedKey,RELATION_CODES} from '../world/relationships.js';
import {issueId} from './issues.js';
const need=(ok,m)=>{if(!ok)throw new RangeError('STORY_CONSEQUENCE: '+m);};
const unique=a=>Array.isArray(a)&&new Set(a).size===a.length;
/** Opt-in author contract. No runtime IDs are authored for newly created records. */
export function validateConsequences(out,c){
 if(!out.world&&!out.relationshipChanges&&!out.issueOperations)return;
 need(c.compilerContract===2&&!c.premise&&out.world,'compiler v2 and explicit world participation required');
 const x=out.world;assertShape(x,['subjects','witnesses','affected','contacts','transmissions',...(Object.hasOwn(x,'documents')?['documents']:[])]);
 for(const d of x.documents??[]){assertShape(d,['role','factId','accessFactId']);Object.values(d).forEach(identifier);}
 for(const a of [x.subjects,x.witnesses,x.affected]){need(unique(a),'unique role list');a.forEach(identifier);}
 need(x.subjects.length>0,'subjects required');
 for(const pair of x.contacts){need(unique(pair)&&pair.length===2,'contact is an explicit pair');pair.forEach(identifier);need(pair.every(r=>x.witnesses.includes(r)),'contact requires present witnesses');}
 for(const t of x.transmissions){assertShape(t,['fromRole','toRole','description',...(Object.hasOwn(t,'claimIndex')?['claimIndex']:[])]);if(Object.hasOwn(t,'claimIndex'))need(Number.isSafeInteger(t.claimIndex)&&t.claimIndex>=0&&t.claimIndex<out.claims.length&&out.claims[t.claimIndex].role===t.fromRole,'claim sender/index');[t.fromRole,t.toRole,t.description].forEach(identifier);need(t.fromRole!==t.toRole,'distinct sender and receiver');}
 for(const q of out.claims)need(x.witnesses.includes(q.role)&&!q.visible,'explicit claims must be witnessed; transmit facts explicitly');
 for(const a of out.relationshipChanges??[]){assertShape(a,['fromRole','toRole','code','delta','basis']);need(a.fromRole!==a.toRole&&RELATION_CODES.includes(a.code)&&Number.isFinite(a.delta),'directional relation change');need(a.basis==='interaction'||a.basis==='information','relationship evidence kind');}
 for(const a of out.issueOperations??[]){
  need(['open','progress','close','invalidate'].includes(a.type),'issue operation');
  assertShape(a,a.type==='open'?['type','localKey','kind','roles','details']:a.type==='progress'?['type','source','assessment','details']:['type','source','reason']);
  if(a.type==='open'){[a.localKey,a.kind,a.details].forEach(identifier);need(unique(a.roles)&&a.roles.length>0&&a.roles.every(r=>x.subjects.includes(r)),'issue actors are subjects');}
  else {if('binding' in a.source){assertShape(a.source,['binding']);identifier(a.source.binding);need(c.bindingContract===1,'binding-aware story required');}else{assertShape(a.source,['eventId','stage','optionId','localKey']);Object.values(a.source).forEach(identifier);}if(a.type==='progress'){need(['improved','worsened','changed','uncertain'].includes(a.assessment),'assessment');identifier(a.details);}else identifier(a.reason);}
 }
}
export function compileConsequences(w,e,c,out,actors,fid,view){
 const x=out.world,operations=[],afterClaims=[],causes=[],data={};
 const actor=role=>{const id=actors[role];need(id,'unbound role '+role);return id;};
 const ids=roles=>[...new Set(roles.map(actor))];
 const subjects=ids(x.subjects),witnesses=ids(x.witnesses),affected=ids(x.affected);need(affected.every(id=>subjects.includes(id)),'affected actors must be objective subjects');
 data.participation={version:1,affectedIds:affected};
 const fact=(id,subjectIds,witnessIds,description,data,causeIds)=>({type:'fact',id,eventId:e.id,stageId:e.stageId,subjectIds,witnessIds,description,data,categoryCodes:[],causeIds});
 for(const [i,pair] of x.contacts.entries()){
  const people=ids(pair);need(people.length===2,'contact aliases must resolve to distinct people');
  operations.push(fact(createId('fact',[fid,'contact',String(i)]),people,people,'本次兩人實際互動。',{type:'contact',storySourceVersion:1},[fid]));
 }
 for(const id of witnesses)operations.push({type:'reveal',actorId:id,factId:fid,source:{kind:'observation',actorId:id,basisFactId:fid}});
 const informed=new Set(witnesses);
 for(const d of x.documents??[]){const person=actor(d.role),access=view.fact(d.accessFactId),source=view.fact(d.factId);need(access&&source&&access.data.type==='access'&&access.subjectIds.includes(person)&&access.data.factIds?.includes(source.id),'missing explicit document grant');causes.push(source.id,access.id);need(!view.disclosure(person,source.id),'already disclosed document');operations.push({type:'reveal',actorId:person,factId:source.id,source:{kind:'document',actorId:person,basisFactId:access.id}});}
 for(const [i,t] of x.transmissions.entries()){
  const from=actor(t.fromRole),to=actor(t.toRole);const isClaim=Object.hasOwn(t,'claimIndex');need(from!==to&&informed.has(from)&&(isClaim||!informed.has(to)),'sender must possess this fact and receiver must be new');
  const id=createId('fact',[fid,'transmission',String(i)]);
  const target=isClaim?afterClaims:operations;
  target.push(fact(id,[from,to],[from,to],t.description,{type:'contact',storySourceVersion:1,transmission:{factId:fid,fromId:from,toId:to,...(isClaim?{claimId:createId('claim',[fid,String(t.claimIndex)]),versionId:c.version}:{})}},[fid]),isClaim?{type:'learn',actorId:to,claimId:createId('claim',[fid,String(t.claimIndex)]),versionId:c.version,source:{kind:'communication',actorId:from,basisFactId:id},belief:'uncertain',confidence:.5}:{type:'reveal',actorId:to,factId:fid,source:{kind:'communication',actorId:from,basisFactId:id}});if(!isClaim)informed.add(to);
 }
 const changes=(out.relationshipChanges??[]).map(a=>{
  const from=actor(a.fromRole),to=actor(a.toRole);need(from!==to,'self relation');
  const interaction=x.contacts.some(p=>ids(p).includes(from)&&ids(p).includes(to));
  const information=x.transmissions.some(t=>actor(t.toRole)===from&&actor(t.fromRole)===to);
  need(a.basis==='interaction'?interaction:information,'missing actual relationship evidence');
  // Holder existence is checked by direct settlement after contact operations.
  return {target:{kind:'relationship',id:directedKey(from,to)},code:a.code,delta:a.delta};
 });
 const issueOperations=(out.issueOperations??[]).map(a=>{
  if(a.type==='open')return {type:a.type,localKey:a.localKey,kind:a.kind,actors:ids(a.roles),details:a.details,evidenceFactIds:[fid]};
  let issue;
  if(a.source.binding){
   const selected=view.entries().filter(h=>h.type==='event-selection').flatMap(h=>h.data.selected).find(s=>s.eventId===e.id),binding=selected?.issueBindings?.find(b=>b.name===a.source.binding);
   need(binding,'missing selected issue binding');issue=boundIssue(view,binding,e.id);need(issue.state==='open','terminal bound issue');
  }else{
  const source=view.entries().findLast(h=>h.type==='story'&&h.eventId===(a.source.eventId==='self'?e.id:a.source.eventId)&&h.data.action.action==='confirm'&&h.data.state.stage===a.source.stage&&h.data.operations.some(o=>o.type==='confirm-choice'&&o.optionId===a.source.optionId));
  need(source,'missing confirmed issue source');const root=source.data.operations.find(o=>o.type==='fact'&&o.data.type==='story-action');need(root,'missing root action');
  issue=view.issue(issueId(root.id,a.source.localKey));need(issue&&issue.state==='open','missing or terminal issue');
  }
  causes.push(issue.createdBy.factId,issue.latestOperation.factId);
  return {type:a.type,issueId:issue.id,expectedPreviousOperation:issue.latestOperation.id,...(a.type==='progress'?{assessment:a.assessment,details:a.details}:{reason:a.reason}),evidenceFactIds:[fid]};
 });
 if(issueOperations.length)data.causality={version:1,operations:issueOperations};
 return {subjects,witnesses,data,causes,operations,afterClaims,changes};
}
