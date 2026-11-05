/** Sole authority is the existing world journal. Detached views are never save state. */
import { assertShape,identifier } from '../player/panel.js';
import { canonicalData } from '../changes/settlement.js';
import { createId } from '../contracts/foundation.js';
import { addDays,dayNumber } from '../calendar/civil.js';
import { rulesForProcedure,deadline,need,DUTY_KINDS,POLICY_LAYERS,minuteOfMoment,deadlineMinute } from './institution-rules.js';
const runtime=w=>w.extensions['teacher-hell/world'];
const same=(a,b)=>canonicalData(a)===canonicalData(b);
const clone=x=>structuredClone(x);
const empty=()=>({version:1,cases:[],duties:[],policies:[],evidence:[],bodies:[]});
const lists=(a)=>{need(Array.isArray(a)&&new Set(a).size===a.length,'unique list required');a.forEach(identifier);};
function actor(w,id){need(id===w.identity.playerId||Object.hasOwn(w.numeric.evolution.world.people,id),'unknown natural person');}
function fact(w,id,order){const f=runtime(w).facts.find(f=>f.id===id&&f.order<order);need(f,'existing preceding objective source required');return f;}
function office(w,id,roles,date,order){
 const r=w.numeric.evolution.world.registry;need(r,'formal school registry required');
 return r.assignments.some(a=>a.personId===id&&roles.includes(a.roleId)&&a.from<=date&&!runtime(w).history.some(h=>h.type==='school'&&h.data.change.type==='school-assignment'&&h.data.change.id===a.id&&h.order>=order)&&(a.until===null||a.until>date||a.until===date&&!runtime(w).history.some(h=>h.order<order&&h.type==='school'&&h.data.change.endsId===a.id)));
}
function principal(w,id,date,order){
 const registry=w.numeric.evolution.world.registry,origins=new Set(['appointment:office:1:0']);
 for(const h of runtime(w).history)if(h.order<order&&h.type==='school'&&h.data.change.type==='school-assignment'&&origins.has(h.data.change.endsId))origins.add(h.data.change.id);
 need(office(w,id,[1],date,order)&&registry.assignments.some(a=>a.personId===id&&origins.has(a.id)&&a.from<=date&&(a.until===null||a.until>date||a.until===date&&!runtime(w).history.some(h=>h.order<order&&h.type==='school'&&h.data.change.endsId===a.id))),'principal authority required; board membership is not a principal appointment');
}
function source(w,op,at,order){const f=fact(w,op.basisFactId,order);need(f.data.type==='institution-action'&&same(f.data.operation,op.change),'source must authorize the exact institutional action');need(f.witnessIds.includes(op.actorId),'responsible actor must possess the source');need(f.occurredAt.date<=at.date,'future source');return f;}
function caseFor(s,id){const c=s.cases.find(c=>c.id===id);need(c,'unknown case');return c;}
function active(c){need(!c.closedAt,'case already closed');}
function authorization(w,c,actorId,at,order){need(c.handlerId===actorId&&office(w,actorId,c.handlerRoles,at.date,order),'case handler lacks current office authority; explicit handover required');}
function stamp(c,action,op,at,extra={}){c.history.push({action,actorId:op.actorId,basisFactId:op.basisFactId,at:clone(at),...clone(extra)});}
export function institutionState(w){const s=empty();for(const h of runtime(w).history)if(h.type==='institution')applyInstitution(s,w,h.data.operation,h.at,h.order);return s;}
export function applyInstitution(s,w,op,at,order){
 assertShape(op,['type','actorId','basisFactId','change']);need(op.type==='institution','institution operation');actor(w,op.actorId);const x=op.change;identifier(x.action);const f=source(w,op,at,order);
 if(x.action==='open'){
  assertShape(x,['action','id','kind','subjectIds','respondentId','handlerId','originFactId','flags']);identifier(x.id);lists(x.subjectIds);need(x.subjectIds.length>0,'case participants required');x.subjectIds.forEach(id=>actor(w,id));actor(w,x.handlerId);if(x.respondentId!==null){actor(w,x.respondentId);need(x.subjectIds.includes(x.respondentId),'respondent must be included in case parties and hearing rights');}
  need(!s.cases.some(c=>c.id===x.id)&&!s.cases.some(c=>c.originFactId===x.originFactId&&c.kind===x.kind),'case or semantic source already registered');const origin=fact(w,x.originFactId,order);need(origin.subjectIds.some(id=>x.subjectIds.includes(id)),'source does not concern case');
  assertShape(x.flags,['childProtection','suicideBehavior','emergency','outsideJurisdiction']);need(Object.values(x.flags).every(v=>typeof v==='boolean'),'explicit classification flags');
  need(origin.data.type==='procedure-signal'&&origin.data.kind===x.kind&&same(origin.data.flags,x.flags)&&same(origin.data.subjectIds,x.subjectIds)&&origin.data.respondentId===x.respondentId,'classification requires precise objective signal; suspicion is not a finding');
  if(x.kind==='bullying'&&x.respondentId!==null&&office(w,x.respondentId,[1,2,3,4,5,6,7,8,9,10],at.date,order))need(false,'high-school staff bullying belongs to teacher-conduct, not student bullying');
  if(x.kind==='gender')need(x.subjectIds.some(id=>w.numeric.evolution.world.people[id]?.kind==='student'),'gender education route requires a student party');
  const rule=rulesForProcedure(x.kind,at.date),roles=['counselling','self-harm'].includes(x.kind)?[4]:x.kind==='employment'?[7]:[3];
  need(office(w,x.handlerId,roles,at.date,order)&&x.handlerId!==x.respondentId,'competent unconflicted handler required');
  const obligations=[];const add=(id,target,due,unit,automatic=true)=>obligations.push({id,target,due,unit,responsibleId:x.handlerId,automatic,dueMinute:unit==='24-hours'?minuteOfMoment(at)+1440:unit==='72-hours'?minuteOfMoment(at)+4320:unit==='2-hours'?minuteOfMoment(at)+120:unit==='immediate'?minuteOfMoment(at):null,completedAt:null,overdueAt:null});
  if(['bullying','gender','teacher-conduct','safety','self-harm'].includes(x.kind))add('protect','student-safety',at.date,'immediate');
  if(['bullying','gender'].includes(x.kind))add('report','education-authority',addDays(at.date,1),'24-hours');
  if(x.flags.childProtection)add('child-report','local-social-authority',addDays(at.date,1),'24-hours');
  if(x.flags.suicideBehavior)add('suicide-report','health-suicide-system',at.date,'immediate');
  if(['bullying','gender','teacher-conduct','safety','self-harm'].includes(x.kind))add('school-safety-report','school-safety-network',addDays(at.date,['bullying','gender','teacher-conduct'].includes(x.kind)||x.flags.suicideBehavior?1:3),['bullying','gender','teacher-conduct'].includes(x.kind)||x.flags.suicideBehavior?'24-hours':'72-hours');
  if(x.flags.emergency)add('urgent-education-report','education-authority',at.date,'2-hours');
  if(x.flags.emergency)add('emergency-response','emergency-services',at.date,'immediate');
  if(x.flags.outsideJurisdiction)add('transfer','competent-school',deadline(at.date,{unit:'working-days',value:3}),'working-days');
  if(['gender','employment'].includes(x.kind))add('investigation',rule.body,deadline(at.date,rule.investigate),rule.investigate.unit,false);
  if(rule.accept)add('accept-notice','complainant',deadline(at.date,rule.accept),rule.accept.unit,false);
  if(x.kind==='gender')add('refer','gender-committee',deadline(at.date,{unit:'days',value:3,rollHoliday:true}),'days');
  if(x.kind==='counselling')add('refer','counselling-office',at.date,'school-support');
  const c={...clone(x),rule,openedAt:clone(at),handlerRoles:roles,status:'received',finding:null,obligations,evidenceIds:[],history:[],closedAt:null,decisionAt:null,notifiedAt:null,appealDue:null,appealUsed:false,extensionCount:0};delete c.action;
  for(const o of obligations){if(o.id==='accept-notice')o.dueMinute=deadlineMinute(at.date,rule.accept);if(o.id==='investigation')o.dueMinute=deadlineMinute(at.date,rule.investigate);}
  stamp(c,'open',op,at,{originFactId:origin.id});s.cases.push(c);return clone(c);
 }
 if(x.action==='constitute'){
  assertShape(x,['action','id','caseId','body','memberFactIds','until']);identifier(x.id);principal(w,op.actorId,at.date,order);const c=caseFor(s,x.caseId);need([c.rule.body,c.rule.investigator,c.rule.admission].includes(x.body)&&!s.bodies.some(b=>b.id===x.id),'case-specific competent body');lists(x.memberFactIds);dayNumber(x.until);need(x.until>=at.date,'body mandate expired');
  const members=x.memberFactIds.map(id=>{const q=fact(w,id,order);need(q.data.type==='committee-qualification'&&q.data.body===x.body,'documented committee qualification');actor(w,q.data.personId);need(q.data.personId!==c.respondentId&&!c.subjectIds.includes(q.data.personId),'conflicted committee member');need(q.witnessIds.some(id=>office(w,id,[25],q.occurredAt.date,q.order)),'qualifications require an education-authority source');return clone(q.data);});
  need(new Set(members.map(m=>m.personId)).size===members.length,'duplicate committee member');need(members.every(m=>['female','male','other'].includes(m.gender)&&typeof m.external==='boolean'&&typeof m.expert==='boolean'),'documented member qualifications');
  if(x.body==='teacher-admission')need(members.length===3&&['parent','teacher','expert'].every(role=>members.some(m=>m.representation===role))&&members.some(m=>m.external&&m.expert),'teacher admission needs three voting representatives; the principal has no vote');
  else if(x.body==='bullying-review')need(members.length===3&&members.every(m=>s.bodies.some(b=>b.caseId===c.id&&b.body==='bullying-committee'&&b.members.some(p=>p.personId===m.personId))),'bullying review members must come from the prevention committee');
  else if(x.body==='bullying-committee')need(members.length>=6&&members.length<=11&&['principal','parent','expert','student'].every(role=>members.some(m=>m.representation===role))&&members.filter(m=>['teacher','student-affairs','counsellor'].includes(m.representation)).length>=2,'high-school bullying prevention committee composition');
  else if(x.body==='bullying-panel')need([3,5].includes(members.length)&&members.filter(m=>m.external&&m.expert).length>members.length/2,'student bullying panel needs a majority of external pool professionals');
  else if(x.body==='gender-committee')need(members.length>=5&&members.length<=21&&members.some(m=>m.representation==='principal')&&members.filter(m=>m.gender==='female').length>=members.length/2,'school gender committee composition');
  else if(x.body==='gender-panel')need([3,5].includes(members.length)&&members.filter(m=>m.gender==='female').length>=members.length/2&&members.filter(m=>m.expert).length>=members.length/3&&(!office(w,c.respondentId,[1,2,3,4,5,6,7,8,9,10],at.date,order)||members.every(m=>m.external)),'gender investigation safeguards differ from committee membership');
  else if(x.body==='teacher-panel')need(!members.some(m=>s.bodies.some(b=>b.caseId===c.id&&b.body==='campus-meeting'&&b.members.some(p=>p.personId===m.personId)))&&[3,5].includes(members.length)&&members.every(m=>m.external&&m.expert)&&members.some(m=>m.profession==='law'),'teacher investigation must be external with a legal expert');
  else if(x.body==='campus-meeting')need(members.length===5&&['principal','parent','administrator','teacher','expert'].every(role=>members.some(m=>m.representation===role))&&members.filter(m=>m.gender==='female').length>=2&&members.filter(m=>m.gender==='male').length>=2,'campus meeting composition');
  else if(x.body==='teacher-appeal-panel')need(members.length>=3&&members.filter(m=>m.representation==='nonadministrative-teacher'&&office(w,m.personId,[8],at.date,order)&&!office(w,m.personId,[1,2,3,4,5,6,7],at.date,order)).length>=members.length*2/3,'teacher appeal independence');
  else need(members.length>=3,'independent review members');
  for(const m of members){if(m.representation==='principal')principal(w,m.personId,at.date,order);if(m.representation==='teacher')need(office(w,m.personId,[8,9],at.date,order),'actual teacher representative required');if(m.representation==='administrator')need(office(w,m.personId,[2,3,4,5,6,7],at.date,order),'actual administrator required');if(m.representation==='parent')need(w.numeric.evolution.world.careLinks.some(l=>l.caregiverId===m.personId),'actual parent representative required');if(m.representation==='student')need(w.numeric.evolution.world.people[m.personId]?.kind==='student','actual student representative required');}
  const body={...clone(x),members,fromOrder:order,from:clone(at),basisFactId:f.id};s.bodies.push(body);return clone(body);
 }
 if(x.action==='policy'){
  assertShape(x,['action','id','layer','replacesId','text','until','legalBasisId',...(Object.hasOwn(x,'clauses')?['clauses']:[])]);if(x.clauses){assertShape(x.clauses,['extraDutyMandatory','support','benefits','review']);need(typeof x.clauses.extraDutyMandatory==='boolean'&&['available','limited'].includes(x.clauses.support)&&['normal','reduced'].includes(x.clauses.benefits)&&['collegial','supervised'].includes(x.clauses.review),'supported school policy clauses');}identifier(x.id);identifier(x.text);need(POLICY_LAYERS.includes(x.layer)&&x.layer!=='law','laws are immutable offline resources, not principal instructions');principal(w,op.actorId,at.date,order);
  need(!s.policies.some(p=>p.id===x.id),'duplicate policy');if(x.until!==null){dayNumber(x.until);need(x.until>=at.date,'reversed policy');}if(x.legalBasisId!==null)fact(w,x.legalBasisId,order);
  if(x.replacesId!==null){const p=s.policies.find(p=>p.id===x.replacesId);need(p&&p.layer===x.layer&&p.endedAt===null,'policy layer cannot silently replace another layer');p.endedAt=clone(at);}
  const p={...clone(x),from:clone(at),endedAt:null,issuerId:op.actorId,basisFactId:f.id};s.policies.push(p);return clone(p);
 }
 if(x.action==='duty-offer'){
  assertShape(x,['action','id','personId','kind','description','until','endCondition','mandatory',...(Object.hasOwn(x,'policyId')?['policyId']:[])]);if(x.mandatory)need(s.policies.some(p=>p.id===x.policyId&&p.layer==='school-rule'&&!p.endedAt&&(p.until===null||p.until>=at.date)&&p.clauses?.extraDutyMandatory===true),'mandatory extra duty requires an effective formal school rule, not a supervisor instruction');identifier(x.id);identifier(x.description);identifier(x.endCondition);actor(w,x.personId);need(DUTY_KINDS.includes(x.kind)&&typeof x.mandatory==='boolean','additional duty only');principal(w,op.actorId,at.date,order);
  need(!s.duties.some(d=>d.id===x.id),'duplicate duty');if(x.until!==null){dayNumber(x.until);need(x.until>at.date,'duty requires a future end');}
  const d={...clone(x),issuerId:op.actorId,holderId:x.personId,from:clone(at),status:'offered',history:[{action:x.action,actorId:op.actorId,at:clone(at),basisFactId:f.id}],endedAt:null};s.duties.push(d);return clone(d);
 }
 if(x.action==='duty-response'||x.action==='duty-change'){
  const d=s.duties.find(d=>d.id===x.id);need(d&&!d.endedAt,'active duty offer required');
  if(x.action==='duty-response'){
   assertShape(x,['action','id','response']);need(['accept','refuse','negotiate','protest','delay','seek-help'].includes(x.response),'duty response');need(op.actorId===d.holderId,'holder responds');
   need(d.status!=='active','already accepted');d.status=x.response==='accept'?'active':x.response==='refuse'&&!d.mandatory?'declined':'pending-resolution';d.response=x.response;
   if(d.status==='declined')d.endedAt=clone(at);
  }else{
   assertShape(x,['action','id','mode','holderId','until']);principal(w,op.actorId,at.date,order);need(['handover','renew','end','cancel','replace'].includes(x.mode),'duty lifecycle');actor(w,x.holderId);
   if(['end','cancel'].includes(x.mode)){d.status=x.mode==='end'?'ended':'cancelled';d.endedAt=clone(at);}else {need(d.status==='active'||x.mode==='replace','cannot hand over an unaccepted duty');need(x.holderId!==w.identity.playerId||d.holderId===w.identity.playerId,'player must respond to a new duty offer before taking a transferred duty');d.holderId=x.holderId;d.until=x.until;if(x.until!==null){dayNumber(x.until);need(x.until>at.date,'renewed duty end');}d.status='active';}
  }
  d.history.push({...clone(x),actorId:op.actorId,at:clone(at),basisFactId:f.id});return clone(d);
 }
 if(x.action==='tick'){
  assertShape(x,['action']);const changes=[];
  for(const d of s.duties)if(!d.endedAt&&d.until!==null&&d.until<=at.date){d.endedAt=clone(at);d.status='expired';d.history.push({action:'expire',at:clone(at),basisFactId:f.id});changes.push({dutyId:d.id,status:d.status});}
  for(const c of s.cases){if(c.closedAt)continue;
   for(const o of c.obligations){if(o.completedAt||o.suspendedAt)continue;
    if((o.dueMinute!==null&&o.dueMinute!==undefined?minuteOfMoment(at)>o.dueMinute:o.due<at.date)&&!o.overdueAt){o.overdueAt=clone(at);stamp(c,'overdue',op,at,{obligationId:o.id});changes.push({caseId:c.id,overdue:o.id});}
    // Reports/safety are real NPC work, never substitute for an unresolved player decision.
    if(o.automatic&&o.responsibleId!==w.identity.playerId&&office(w,o.responsibleId,c.handlerRoles,at.date,order)){
     o.completedAt=clone(at);stamp(c,o.id,{...op,actorId:o.responsibleId},at,{responsibleId:o.responsibleId,target:o.target});changes.push({caseId:c.id,measure:o.id,target:o.target,responsibleId:o.responsibleId});
    }else if(o.due<at.date&&!o.overdueAt){o.overdueAt=clone(at);stamp(c,'overdue',op,at,{obligationId:o.id});changes.push({caseId:c.id,overdue:o.id});}
   }
  }return changes;
 }
 const c=caseFor(s,x.caseId);active(c);
 if(x.action==='handover'){
  assertShape(x,['action','caseId','handlerId']);principal(w,op.actorId,at.date,order);need(office(w,x.handlerId,c.handlerRoles,at.date,order)&&x.handlerId!==c.respondentId,'new handler lacks authority');const previousId=c.handlerId;c.handlerId=x.handlerId;for(const o of c.obligations)if(!o.completedAt)o.responsibleId=x.handlerId;stamp(c,x.action,op,at,{previousId,handlerId:x.handlerId});return clone(c);
 }
 authorization(w,c,op.actorId,at,order);
 if(x.action==='evidence'){
  assertShape(x,['action','caseId','id','factId','sourceId','occurredAt','custodianId','accessIds','integrity','contradicts']);identifier(x.id);actor(w,x.sourceId);actor(w,x.custodianId);lists(x.accessIds);x.accessIds.forEach(id=>actor(w,id));lists(x.contradicts);
  const origin=fact(w,x.factId,order);need(!s.evidence.some(e=>e.id===x.id),'duplicate evidence');need(origin.subjectIds.some(id=>c.subjectIds.includes(id)),'unrelated evidence');need(origin.witnessIds.includes(x.sourceId),'evidence source must possess original');need(same(origin.occurredAt,x.occurredAt),'cannot forge evidence occurrence time');need(['complete','partial','damaged','lost'].includes(x.integrity),'evidence integrity');need(x.accessIds.includes(x.custodianId),'custodian must have access');
  for(const id of x.contradicts)need(c.evidenceIds.includes(id),'contradiction must reference existing same-case evidence');
  const e={...clone(x),acquiredAt:clone(at),history:[{action:'acquire',custodianId:x.custodianId,at:clone(at),basisFactId:f.id}]};s.evidence.push(e);c.evidenceIds.push(e.id);stamp(c,x.action,op,at,{evidenceId:e.id});return clone(e);
 }
 if(x.action==='evidence-change'){
  assertShape(x,['action','caseId','id','custodianId','accessIds','integrity']);const e=s.evidence.find(e=>e.id===x.id&&e.caseId===c.id);need(e,'case evidence required');actor(w,x.custodianId);lists(x.accessIds);x.accessIds.forEach(id=>actor(w,id));need(x.accessIds.includes(x.custodianId)&&['complete','partial','damaged','lost'].includes(x.integrity),'custody/integrity');need(!['lost','damaged'].includes(e.integrity)||x.integrity!=='complete','lost evidence requires a new sourced recovery record');e.history.push({...clone(x),previousCustodianId:e.custodianId,at:clone(at),basisFactId:f.id});Object.assign(e,{custodianId:x.custodianId,accessIds:clone(x.accessIds),integrity:x.integrity});stamp(c,x.action,op,at,{evidenceId:e.id});return clone(e);
 }
 if(x.action==='step'){
  assertShape(x,['action','caseId','step','resolutionFactId']);need(c.rule.steps.includes(x.step),'step not applicable to this procedure');
  if(x.step==='accept'){
   need(c.status==='received','already received/accepted');if(c.rule.admission){const resolution=fact(w,x.resolutionFactId,order),body=s.bodies.find(b=>b.id===resolution.data.bodyId&&b.caseId===c.id&&b.body===c.rule.admission&&b.until>=at.date);need(body&&resolution.data.type==='admission-resolution'&&resolution.data.caseId===c.id&&resolution.data.accepted===true,'competent documented admission decision required');lists(resolution.data.signerIds);need(resolution.data.signerIds.length>body.members.length/2&&resolution.data.signerIds.every(id=>body.members.some(m=>m.personId===id)&&resolution.witnessIds.includes(id)),'admission majority must come from the lawful voting group');}c.status='accepted';const o=c.obligations.find(o=>o.id==='accept-notice');if(o)o.completedAt=clone(at);

   if(['bullying','teacher-conduct'].includes(c.kind))c.obligations.push({id:'panel',target:c.rule.body,due:deadline(at.date,{unit:'working-days',value:c.kind==='bullying'?5:7}),unit:'working-days',responsibleId:c.handlerId,automatic:false,completedAt:null,overdueAt:null});
  }else if(x.step==='investigate'){need(['accepted','panel','refer'].includes(c.status),'must accept/refer before investigation');need(!c.flags.outsideJurisdiction,'local school cannot investigate outside its jurisdiction');need(s.bodies.some(b=>b.caseId===c.id&&b.body===c.rule.investigator&&b.until>=at.date&&b.fromOrder>(c.remandOrder??0)),'constitute competent investigation body before investigation');c.status='investigating';if(c.rule.investigate&&!c.obligations.some(o=>o.id==='investigation'))c.obligations.push({id:'investigation',target:c.rule.body,due:deadline(at.date,c.rule.investigate),unit:c.rule.investigate.unit,dueMinute:deadlineMinute(at.date,c.rule.investigate),responsibleId:c.handlerId,automatic:false,completedAt:null,overdueAt:null});}
  else if(x.step==='panel'||x.step==='refer'){need(['received','accepted'].includes(c.status),'invalid referral/panel');c.status=x.step;const o=c.obligations.find(o=>o.id===x.step);if(o)o.completedAt=clone(at);}
  else if(x.step==='decide'){
   need(c.status==='investigating'&&!c.obligations.some(o=>o.suspendedAt),'investigation must precede decision; suspended statutory review cannot decide');const resolution=fact(w,x.resolutionFactId,order);
   need(resolution.data.type==='committee-resolution'&&resolution.data.caseId===c.id&&resolution.data.body===c.rule.body,'competent body resolution required, supervisor instruction is not a decision');
   need(['insufficient-evidence','unsubstantiated','procedural-remand','substantiated'].includes(resolution.data.finding),'reasoned finding');lists(resolution.data.evidenceIds);need(resolution.data.evidenceIds.length>0&&resolution.data.evidenceIds.every(id=>c.evidenceIds.includes(id)),'decision requires actual case evidence');
   const body=s.bodies.find(b=>b.id===resolution.data.bodyId&&b.caseId===c.id&&b.until>=at.date);need(body&&body.body===c.rule.body,'documented unexpired decision body required; investigators cannot replace the decision committee');lists(resolution.data.signerIds);need(resolution.data.signerIds.length>body.members.length/2&&resolution.data.signerIds.every(id=>body.members.some(m=>m.personId===id)&&resolution.witnessIds.includes(id)),'majority competent body signatures required');
   const hearing=fact(w,resolution.data.hearingFactId,order);need(hearing.data.type==='hearing-opportunity'&&hearing.data.caseId===c.id&&c.subjectIds.every(id=>hearing.subjectIds.includes(id)),'both parties must have a documented hearing opportunity');
   c.finding=resolution.data.finding;c.decisionAt=clone(at);c.status='decided';if(c.kind==='gender')c.obligations.push({id:'decision-notice',target:'parties',due:deadline(at.date,{unit:'months',value:2,rollHoliday:true}),dueMinute:deadlineMinute(at.date,{unit:'months',value:2,rollHoliday:true}),unit:'months',responsibleId:c.handlerId,automatic:false,completedAt:null,overdueAt:null});const o=c.obligations.find(o=>o.id==='investigation');if(o)o.completedAt=clone(at);
  }else if(x.step==='notify'){need(c.status==='decided','decision before notice');c.notifiedAt=clone(at);c.appealDue=deadline(at.date,c.rule.appeal);c.appealDueMinute=deadlineMinute(at.date,c.rule.appeal);c.status='notified';const notice=c.obligations.find(o=>o.id==='decision-notice');if(notice)notice.completedAt=clone(at);}
  else if(x.step==='appeal'){need(c.status==='notified'&&!c.appealUsed&&at.date<=c.appealDue&&minuteOfMoment(at)<=c.appealDueMinute,'one timely appeal required');c.appealUsed=true;c.status='appeal';}
  else if(x.step==='close'){
   need(['safety','self-harm','counselling'].includes(c.kind)?['received','refer','notified'].includes(c.status):c.status==='notified','cannot close pending investigation/appeal');need(c.obligations.every(o=>o.completedAt),'necessary measures still outstanding');need(c.appealDue===null||at.date>c.appealDue,'preserve appeal opportunity');c.closedAt=clone(at);c.status='closed';
  }else if(x.step==='follow-up')need(c.status==='notified'||c.status==='refer'||c.status==='received','follow-up state');
  else need(false,'measure must use its own operation');
  stamp(c,x.step,op,at,{resolutionFactId:x.resolutionFactId});return clone(c);
 }
 if(x.action==='extend'){
  assertShape(x,['action','caseId','reason']);identifier(x.reason);need(c.status==='investigating'&&['bullying','gender','teacher-conduct','employment'].includes(c.kind)&&c.extensionCount<(c.kind==='employment'?1:2),'route-specific investigation extension limit');const o=c.obligations.find(o=>o.id==='investigation');need(o&&!o.completedAt&&at.date<=o.due&&minuteOfMoment(at)<=(o.dueMinute??Infinity),'extension before expiry');const period={unit:'months',value:c.kind==='employment'?2:1,rollHoliday:true};o.dueMinute=deadlineMinute(o.due,period);o.due=deadline(o.due,period);c.extensionCount++;stamp(c,x.action,op,at,{reason:x.reason,due:o.due});return clone(c);
 }
 if(x.action==='appeal-clock'){
  assertShape(x,['action','caseId','mode','reasonFactId']);need(c.kind==='employment','only teacher appeal clock has this statutory pause/restart');const reason=fact(w,x.reasonFactId,order);need(reason.data.type==='appeal-clock-basis'&&reason.data.caseId===c.id&&reason.witnessIds.some(id=>office(w,id,[25],at.date,order)),'independent authority clock basis required');const o=c.obligations.find(o=>o.id==='investigation');need(o&&!o.completedAt,'pending appeal decision clock');
  if(x.mode==='suspend'){need(reason.data.reason==='related-litigation'&&!o.suspendedAt,'statutory related-litigation suspension');o.suspendedAt=clone(at);}
  else {need(['resume','supplement'].includes(x.mode)&&(x.mode==='resume'?o.suspendedAt&&reason.data.reason==='related-litigation-ended':reason.data.reason==='final-supplement'),'legal restart or final supplementary grounds');o.suspendedAt=null;o.due=deadline(at.date,c.rule.investigate);o.dueMinute=deadlineMinute(at.date,c.rule.investigate);o.overdueAt=null;}
  stamp(c,x.action,op,at,{mode:x.mode,reasonFactId:x.reasonFactId});return clone(c);
 }
 if(x.action==='remand'){
  assertShape(x,['action','caseId','resolutionFactId']);need(c.status==='appeal','appeal pending');const resolution=fact(w,x.resolutionFactId,order);need(resolution.data.type==='appeal-resolution'&&resolution.data.caseId===c.id&&resolution.data.body==='competent-authority'&&resolution.data.outcome==='remand'&&['new-evidence','material-procedural-defect'].includes(resolution.data.reason)&&resolution.witnessIds.some(id=>id!==c.handlerId&&office(w,id,[25],at.date,order)),'independent authority reasoned remand required');c.status='accepted';c.finding=null;c.remandOrder=order;const o=c.obligations.find(o=>o.id==='investigation');if(o){o.completedAt=null;o.overdueAt=null;const period=c.kind==='gender'?{unit:'days',value:40,rollHoliday:true}:c.rule.investigate;o.due=deadline(at.date,period);o.dueMinute=deadlineMinute(at.date,period);}stamp(c,x.action,op,at);return clone(c);
 }
 need(false,'unknown institutional action');
}
export function compileInstitution(w,op){const result=applyInstitution(institutionState(w),w,op,{date:w.position.date,slotId:w.position.slotId},runtime(w).history.length+1);return {version:1,operation:clone(op),result};}
export function validateInstitutionHistory(w){
 const s=empty(),r=runtime(w);
 for(const h of r.history)if(h.type==='institution'){
  assertShape(h.data,['version','operation','result']);need(h.data.version===1,'unknown institution version');const commit=r.commits.find(c=>c.id===h.operationId&&c.attemptId===h.attemptId);need(commit,'missing transaction');const req=JSON.parse(commit.request);
  const tickId=createId('fact',[h.attemptId,'institution-tick',String(h.cursor),String(h.order-3)]);
  const internal=h.data.operation.change.action==='tick'&&h.data.operation.actorId===w.identity.playerId&&h.data.operation.basisFactId===tickId&&r.facts.some(f=>f.id===tickId&&f.order===h.order-1&&w.events.some(e=>e.id===f.eventId&&e.definitionId==='procedure:institution-clock'));
  need(req.operations.some(o=>same(o,h.data.operation))||internal||r.history.some(x=>x.operationId===h.operationId&&x.type==='story'&&x.data.operations.some(o=>same(o,h.data.operation))),'unowned institution action');
  need(same(applyInstitution(s,w,h.data.operation,h.at,h.order),h.data.result),'institution replay differs');
 }
}
export function procedureEligible(w,person,condition,state=institutionState(w)){
 if(condition.kind.startsWith('duty:'))return state.duties.some(d=>d.holderId===person&&d.kind===condition.kind.slice(5)&&(condition.status==='any'||d.status===condition.status));
 if(condition.kind.startsWith('policy:'))return state.policies.some(p=>p.layer===condition.kind.slice(7)&&!p.endedAt&&(p.until===null||p.until>=w.position.date)&&(condition.status==='any'||p.id===condition.status));
 return state.cases.some(c=>c.kind===condition.kind&&(condition.status==='any'||c.status===condition.status)&&c.subjectIds.includes(person));}
export function mayReadProcedureFact(w,actorId,factId,order=Infinity){
 const f=runtime(w).facts.find(f=>f.id===factId);if(!f?.data.confidential)return true;
 const atWorld={...w,extensions:{...w.extensions,'teacher-hell/world':{...runtime(w),history:runtime(w).history.filter(h=>h.order<order)}}};
 const evidence=institutionState(atWorld).evidence.filter(e=>e.factId===factId);
 return (f.data.accessIds??[]).includes(actorId)||evidence.some(e=>e.accessIds.includes(actorId)&&e.integrity!=='lost');
}
/** Engineering/read API returns an objective projection. Never use this as a player feed. */
export function readProcedures(w){return clone(institutionState(w));}
export function tickOperation(w){
 const s=institutionState(w),r=runtime(w),date=w.position.date;
 if(!s.cases.some(c=>!c.closedAt&&c.obligations.some(o=>!o.completedAt&&!o.suspendedAt&&(o.automatic||o.due<date&&!o.overdueAt)))&&!s.duties.some(d=>!d.endedAt&&d.until!==null&&d.until<=date))return null;
 const change={action:'tick'},actorId=w.identity.playerId,parts=[w.identity.attemptId,'institution-tick',String(r.plan.cursor),String(r.history.length)];const eventId=createId('event',parts),stageId=createId('stage',parts),basisFactId=createId('fact',parts);
 return {event:{schemaVersion:1,id:eventId,definitionId:'procedure:institution-clock',contentVersion:'1',type:'direct',participantIds:[actorId],stageId,facts:[],knowledge:[],results:[],choice:null},fact:{type:'fact',id:basisFactId,eventId,stageId,subjectIds:[actorId],witnessIds:[actorId],description:'既有校曆推進必要校務措施與期限。',data:{type:'institution-action',operation:change},categoryCodes:[],causeIds:[]},operation:{type:'institution',actorId,basisFactId,change}};
}
