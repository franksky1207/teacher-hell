import { assertShape, identifier } from '../player/panel.js';

const key='teacher-hell/world';
const need=(ok,message)=>{if(!ok)throw new RangeError('ISSUE: '+message);};
export const issueId=(factId,localKey)=>{identifier(factId);identifier(localKey);return `issue:${JSON.stringify([factId,localKey])}`;};
export const issueOperationId=(factId,index)=>{identifier(factId);need(Number.isSafeInteger(index)&&index>=0,'invalid operation index');return `issue-operation:${JSON.stringify([factId,index])}`;};
const list=value=>{need(Array.isArray(value)&&value.length>0,'nonempty list required');value.forEach(identifier);need(new Set(value).size===value.length,'duplicate list entry');};

/** Fold only authoritative facts. No persisted state, cache, random draws or text inference.
 * The caller's normal world validator owns fact/history/actor authenticity.
 */
export function projectIssues(world,{beforeOrder=world.extensions[key].history.length+1}={}){
 const r=world.extensions[key];
 need(Number.isSafeInteger(beforeOrder)&&beforeOrder>=1&&beforeOrder<=r.history.length+1,'invalid history boundary');
 const facts=r.facts.filter(f=>f.order<beforeOrder).sort((a,b)=>a.order-b.order),seen=new Map(),issues=new Map();
 for(const fact of facts){
  const c=fact.data?.causality;
  if(c!==undefined){
   assertShape(c,['version','operations']);need(c.version===1,'unsupported causality version');
   need(Array.isArray(c.operations)&&c.operations.length>0,'operations required');
   const localKeys=new Set();
   c.operations.forEach((op,index)=>{
    const operationId=issueOperationId(fact.id,index);
    need(op&&['open','progress','close','invalidate'].includes(op.type),'unknown operation');
    const evidence=ids=>{
     list(ids);
     for(const id of ids)need(id===fact.id||(seen.has(id)&&fact.causeIds.includes(id)),'evidence must be current fact or an earlier explicit cause');
    };
    let issue;
    if(op.type==='open'){
     assertShape(op,['type','localKey','kind','actors','details','evidenceFactIds']);
     identifier(op.localKey);identifier(op.kind);identifier(op.details);list(op.actors);evidence(op.evidenceFactIds);
     need(op.actors.every(id=>fact.subjectIds.includes(id)),'actors must be fact subjects');
     need(!localKeys.has(op.localKey),'duplicate localKey');localKeys.add(op.localKey);
     const id=issueId(fact.id,op.localKey);need(!issues.has(id),'duplicate issue');
     issue={id,kind:op.kind,actors:[...op.actors],details:op.details,createdBy:{factId:fact.id,operationId,order:fact.order},state:'open',operations:[],evidenceFactIds:[]};
     issues.set(id,issue);
    }else{
     assertShape(op,op.type==='progress'?['type','issueId','expectedPreviousOperation','assessment','details','evidenceFactIds']:['type','issueId','expectedPreviousOperation','reason','evidenceFactIds']);
     identifier(op.issueId);identifier(op.expectedPreviousOperation);evidence(op.evidenceFactIds);
     issue=issues.get(op.issueId);need(issue,'unknown issue');
     need(issue.state==='open','terminal issue cannot transition');
     need(issue.latestOperation.id===op.expectedPreviousOperation,'stale previous operation');
     for(const id of [issue.createdBy.factId,issue.latestOperation.factId])need(id===fact.id||fact.causeIds.includes(id),'root and previous fact must be explicit causes');
     if(op.type==='progress'){
      need(['improved','worsened','changed','uncertain'].includes(op.assessment),'invalid assessment');identifier(op.details);
     }else{
      identifier(op.reason);
      need(op.type!=='close'||op.reason!=='withdrawn','withdrawal is invalidation, not resolution');
      issue.state=op.type==='close'?'closed':'invalidated';
     }
    }
    const record={id:operationId,factId:fact.id,order:fact.order,index,...structuredClone(op)};
    issue.operations.push(record);issue.latestOperation=record;
    issue.evidenceFactIds=[...new Set([...issue.evidenceFactIds,...op.evidenceFactIds])];
   });
  }
  seen.set(fact.id,fact);
 }
 return [...issues.values()].map(issue=>({...issue,evidenceFacts:issue.evidenceFactIds.map(id=>structuredClone(seen.get(id)))}));
}

/** Detached read results; unknown IDs return null. Authority remains in facts. */
export function readIssue(world,id,options){return projectIssues(world,options).find(issue=>issue.id===id)??null;}
