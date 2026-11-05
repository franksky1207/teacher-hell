import { permitsStoryFollowup } from './story-content.js';
import { directedKey } from '../world/relationships.js';
/** Slot actions compile to existing objective facts/results and N6; no event draws. */
import { createId } from '../contracts/foundation.js';
import { restoreRandom } from '../numeric/random.js';
import { canonicalData } from '../changes/settlement.js';
import { assertShape } from '../player/panel.js';
import { formalSlot,isFormal } from './schedule.js';
import { academicState } from './academics.js';
const r=w=>w.extensions['teacher-hell/world'];
const need=(ok,message)=>{if(!ok)throw new RangeError(`CAMPUS: ${message}`);};
export function schoolEnabled(w){return r(w).history.some(h=>h.type==='academic');}
export function pendingSchoolEvent(w){const state=r(w),stories=new Map(state.history.filter(h=>h.type==='story').map(h=>[h.eventId,h.data.state])),admitted=new Set(w.events.map(e=>e.id));return state.history.some(h=>h.type==='event-selection'&&h.data.selected.some(s=>s.date===w.position.date&&s.slotId===w.position.slotId&&!admitted.has(s.eventId)))||w.events.some(e=>{const story=stories.get(e.id);return e.choice&&e.choice.confirmedOptionId===null||story&&story.mode!=='ended'&&(story.mode!=='waiting'||story.dueDate<=w.position.date&&permitsStoryFollowup(w,e));});}
export function readSchoolTodos(w){return w.events.filter(e=>e.type==='cumulative').map(e=>{const state=r(w).history.findLast(h=>h.type==='story'&&h.eventId===e.id)?.data.state,life=r(w).history.findLast(h=>h.type==='event-lifecycle'&&h.eventId===e.id)?.data.status;return {eventId:e.id,state:state?.mode==='ended'||life==='ended'?'completed':state?.mode==='waiting'&&state.dueDate>w.position.date?'deferred':'pending',eligible:!!state&&state.mode==='waiting'&&state.dueDate<=w.position.date&&!formalSlot(w).slot.protected,dueDate:state?.dueDate??null};});}
export function schoolEventOccupied(w){return r(w).history.some(h=>h.cursor===r(w).plan.cursor&&h.eventId&&w.events.some(e=>e.id===h.eventId&&!/^(procedure:|activity:)/.test(e.definitionId)));}
export function schoolActions(w){
 need(isFormal(r(w).plan),'formal calendar required');const {day,slot}=formalSlot(w),id=w.position.slotId;
 if(!slot.protected&&(pendingSchoolEvent(w)||schoolEventOccupied(w)))return [];
 if(slot.protected||slot.teachingAutomatic||['exam','assembly','class-meeting'].includes(slot.kind)||['lunch','noon','dinner'].includes(id))return ['automatic'];
 if(pendingSchoolEvent(w))return [];
 if(id==='early')return ['routine','classwork','class-talk'];
 if(slot.period)return ['prepare','interact','rest','todo'];
 if(id.startsWith('study')||day.kind==='grade3-saturday'&&id!=='private')return ['supervise','todo'];
 if(id==='vacation-day'||id==='festival-day')return ['rest','private-life'];
 return ['rest','private-life','todo'];
}
export function compileCampus(w,activity){
 const {day,slot}=formalSlot(w),state=r(w);need(!state.history.some(h=>h.type==='campus'&&h.cursor===state.plan.cursor),'slot already has a school outcome');
 need(schoolActions(w).includes(activity)&&activity!=='todo','choose a legal free action; real todos use their story continuation');
 // Teaching/activity still occurs when a formal event occupies this slot; no free benefit.
 if(pendingSchoolEvent(w))need(activity==='automatic','formal event has priority');
 const n=w.numeric.evolution.world,teacher=n.player.current.person,cohesion=n.classroom.values['6-3'];
 const inputs={communication:teacher['3-1'],fatigue:teacher['2-3'],cohesion};
 const favorable=Math.max(.2,Math.min(.85,.5+inputs.communication/500+inputs.cohesion/600-inputs.fatigue/800));
 const randomBefore=structuredClone(w.random.campus??w.random.events),rng=restoreRandom(randomBefore),sign=rng.next()<favorable?1:rng.next()<.5?0:-1;
 const make=(kind,...parts)=>createId(kind,[w.identity.attemptId,'campus',String(state.plan.cursor),...parts]);
 const eventId=make('event'),stageId=make('stage'),factId=make('fact'),subjects=[w.identity.playerId],operations=[];
 const protectedActivity=slot.activityIds.length>0,students=n.classroom.studentIds,participant=(protectedActivity&&!day.activities.every(a=>a.kind==='parents')||activity==='class-talk')?students[state.plan.cursor%students.length]:null;
 if(participant)subjects.push(participant);
 const event={schemaVersion:1,id:eventId,definitionId:'procedure:campus',contentVersion:'school-v1',type:'direct',participantIds:subjects,stageId,facts:[],knowledge:[],results:[],choice:null};
 operations.push({type:'open-event',event},{type:'fact',id:factId,eventId,stageId,subjectIds:subjects,witnessIds:subjects,description:protectedActivity?'校園活動依當日進展留下正常成果。':slot.teachingAutomatic?'依固定課表完成授課。':'依當前合法時段完成日常活動。',data:{type:'campus-outcome',activity,activityIds:slot.activityIds,lesson:slot.lesson},categoryCodes:[],causeIds:[]});
 let operation;
 if(['rest','private-life'].includes(activity)){
  const long=['vacation-day','festival-day'].includes(w.position.slotId),index=day.slots.findIndex(s=>s.id===w.position.slotId),startHour=long?0:w.position.slotId==='private'||w.position.slotId==='evening'?19:w.position.slotId==='morning'?8:w.position.slotId==='afternoon'?13:6+index*.6;
  const hours=long?8:['private','evening','morning','afternoon'].includes(w.position.slotId)?3:.5;
  operation={type:'recovery',context:{kind:activity==='rest'?'rest':'hobby',periodId:`${w.position.date}:${w.position.slotId}`,startHour,hours,availableHours:hours,resources:activity==='rest'?1:.9,permitted:true}};
 }else{
  const work=slot.teachingAutomatic||activity==='prepare'||activity==='classwork'||activity==='supervise'||protectedActivity;
  const changes=[{target:{kind:'player-person',id:w.identity.playerId},code:'2-3',delta:work?(protectedActivity?(day.activities.some(a=>a.kind.includes('trip'))?.6:day.activities.some(a=>a.kind==='sports')?.8:.2):activity==='prepare'?.2:.3):-.05},{target:{kind:'player-person',id:w.identity.playerId},code:'2-4',delta:sign*.15}];
  if(work)changes.push({target:{kind:'player-work',id:w.identity.playerId},code:'11-1',delta:activity==='prepare'?-sign*.1:.05});
  if(participant){changes.push({target:{kind:'person',id:participant},code:'2-4',delta:sign*.15});const edge=directedKey(w.identity.playerId,participant);if(n.relationships[edge])changes.push({target:{kind:'relationship',id:edge},code:'5-1',delta:sign*.1});}
  if(protectedActivity){changes.push({target:{kind:'player-person',id:w.identity.playerId},code:'3-1',delta:sign*.025},{target:{kind:'classroom',id:w.numeric.evolution.world.classroom.id},code:'6-3',delta:sign*.15});}
  operation={type:'direct',changes};
 }
 operations.push({type:'result',id:make('result'),eventId,stageId,factId,subjectId:w.identity.playerId,facet:'campus-slot',effects:[{id:make('effect'),operation}]});
 // A rotating learner in the taught homeroom receives a tiny, persistent subject update.
 if(slot.lesson?.classId===n.classroom.id&&students.length){
  const personId=students[state.plan.cursor%students.length],academics=academicState(w),s=academics.students[personId];let subject=slot.lesson.subject??state.plan.subject;if(subject==='數學'){const current=Object.values(academics.terms).at(-1)?.rows.find(row=>row.id===personId);subject=current?.courses.find(c=>['數學','數學A','數學B'].includes(c.subject))?.subject??subject;}
  if(s?.subjects[subject]){const f=make('fact','learning'),change={personId,subject,delta:sign*.1};operations.push({type:'fact',id:f,eventId,stageId,subjectIds:[personId],witnessIds:[w.identity.playerId,personId],description:'當次授課的概括學習成果。',data:{type:'academic-influence',change},categoryCodes:[],causeIds:[factId]},{type:'academic',action:'influence',...change,basisFactId:f});}
 }
 return {version:1,inputs,activity,day:day.date,slot:structuredClone(slot),randomBefore,randomAfter:rng.snapshot(),operations};
}
export function validateCampusHistory(w){
 const state=r(w),seen=new Set(),commits=new Map(state.commits.map(c=>[JSON.stringify([c.attemptId,c.id]),c])),facts=new Map(state.facts.map(f=>[f.id,f])),effects=new Set(state.effects.map(e=>e.id)),receipts=new Map(),results=new Map();
 // Ephemeral indexes preserve the original first-match receipt and any-match
 // result semantics. Full histories remain stored and independently checked.
 for(const receipt of [...w.numeric.receipts,...state.numericArchives.flatMap(a=>a.receipts)])if(!receipts.has(receipt.id))receipts.set(receipt.id,receipt);
 for(const e of w.events)for(const result of e.results){const rows=results.get(result.id)??[];rows.push(result);results.set(result.id,rows);}
 let random=null,previousAttempt=null;
 for(const h of state.history)if(h.type==='campus'){
  const d=h.data;assertShape(d,['version','inputs','activity','day','slot','randomBefore','randomAfter','operations']);need(d.version===1&&d.day===h.at.date&&!seen.has(h.cursor),'campus version/date/duplicate');seen.add(h.cursor);
  if(random&&previousAttempt===h.attemptId)need(canonicalData(random)===canonicalData(d.randomBefore),'campus random chain');const rng=restoreRandom(d.randomBefore);rng.next();
  if(canonicalData(rng.snapshot())!==canonicalData(d.randomAfter))rng.next();need(canonicalData(rng.snapshot())===canonicalData(d.randomAfter),'campus random witness');random=d.randomAfter;previousAttempt=h.attemptId;
  const commit=commits.get(JSON.stringify([h.attemptId,h.operationId]));need(JSON.parse(commit.request).operations.some(op=>['campus','school-action','finish-slot'].includes(op.type)),'campus transaction ownership');
  for(const op of d.operations){
   if(op.type==='fact'){const f=facts.get(op.id);need(f&&f.description===op.description&&canonicalData(f.data)===canonicalData(op.data),'missing campus fact');}
   if(op.type==='result'){
    need((results.get(op.id)??[]).some(x=>x.effectIds.every(id=>effects.has(id))),'missing campus result');
    for(const effect of op.effects){const numeric=receipts.get(effect.id);need(numeric&&canonicalData(JSON.parse(numeric.request).operation)===canonicalData(effect.operation),'campus N6 receipt differs');}
   }
  }
 }
 if(random&&state.history.findLast(h=>h.type==='campus')?.attemptId===w.identity.attemptId)need(canonicalData(random)===canonicalData(w.random.campus),'campus RNG head');
}
