/** Calendar boundary used by runtime/model and transactions; never imports runtime authority. */
import { createId } from '../contracts/foundation.js';
import { assertShape,STATE_NAMES } from '../player/panel.js';
import { createRandom,restoreRandom } from '../numeric/random.js';
import { CALENDAR_VERSION,careerRange,calendarDay,gradeAt,positionFor,positionAt,cursorFor,nextPosition,teachingTerm,latestPreparedSemester,yearData,slotOccupancy } from '../calendar/calendar.js';
import { generateTimetable,validateTimetable } from '../calendar/timetable.js';
import { requireCalendar as need } from '../calendar/civil.js';
export const isFormal=plan=>plan.validation==='fixed-calendar-v1';
export function validateFormalPlan(plan){
 assertShape(plan,['id','validation','calendarVersion','startYear','subject','tables','cursor','vacation']);
 need(plan.validation==='fixed-calendar-v1'&&plan.calendarVersion===CALENDAR_VERSION&&plan.id===`calendar:${CALENDAR_VERSION}:${plan.startYear}`,'CALENDAR_VERSION','Unknown or forged fixed calendar');
 careerRange(plan.startYear);need(Array.isArray(plan.tables)&&plan.tables.length>0,'TIMETABLE','Missing persisted timetable');const ids=new Set();
 for(const [index,table] of plan.tables.entries()){validateTimetable(table);
  const expectedId=`${plan.startYear+Math.ceil(index/2)}:${index%2?'spring':'autumn'}`;need(table.semesterId===expectedId&&index<60,'TIMETABLE','Semester history must begin at first summer and remain consecutive');need(table.subject===plan.subject&&!ids.has(table.semesterId),'TIMETABLE','Duplicate semester or changed subject');ids.add(table.semesterId);const y=Number(table.semesterId.split(':')[0]);need(table.semesterId===`${y}:autumn`&&table.academicYear===y||table.semesterId===`${y}:spring`&&table.academicYear===y-1,'TIMETABLE','Timetable academic year mismatch');need(y>=plan.startYear&&y<=plan.startYear+30,'TIMETABLE','Timetable outside career');}
 need(plan.vacation===null||typeof plan.vacation==='object'&&!Array.isArray(plan.vacation),'VACATION','Expected a persisted vacation task or null');
 if(plan.vacation){const task=plan.vacation;assertShape(task.before,STATE_NAMES);need(STATE_NAMES.every(k=>Number.isFinite(task.before[k])&&task.before[k]>=0&&task.before[k]<=100),'VACATION','Invalid baseline panel');assertShape(task,['id','direction','startDate','endDate','before']);need(typeof task.id==='string'&&task.id.length>0&&['rest','private-life'].includes(task.direction)&&task.startDate<=task.endDate,'VACATION','Invalid fast-forward task');for(const date of [task.startDate,task.endDate])need(calendarDay(date,gradeAt(date,plan.startYear)).kind==='long-vacation','VACATION','Fast-forward cannot contain camps or festival');need(calendarDay(task.startDate,gradeAt(task.startDate,plan.startYear)).segment.continuousEnd>=task.endDate,'VACATION','Fast-forward crosses protected boundary');}
 const position=positionAt(plan.cursor,plan.startYear);if(plan.vacation)need(position.date>=plan.vacation.startDate&&position.date<=plan.vacation.endDate,'VACATION','Task cursor outside saved vacation');const latest=latestPreparedSemester(position.date),count=(latest.academicYear-plan.startYear)*2+(latest.id.endsWith(':spring')?2:1);
 need(ids.has(latest.id),'TIMETABLE','Past/current semester timetable is missing during vacation');
 if(plan.tables.length!==count){const next=nextPosition(position,plan.startYear),meta=yearData(Number(next.date.slice(0,4)));need(plan.tables.length===count+1&&next.slotId==='early'&&[meta.winterCamp,meta.summerCamp].includes(next.date)&&teachingTerm(next.date)?.id===plan.tables.at(-1).semesterId,'TIMETABLE','A future semester can be prepared only at its next camp boundary');}
 return plan;
}
export function planPosition(plan,cursor=plan.cursor){return isFormal(plan)?positionAt(cursor,plan.startYear):plan.positions[cursor];}
export function formalSlot(world){const plan=world.extensions['teacher-hell/world'].plan,grade=gradeAt(world.position.date,plan.startYear),day=calendarDay(world.position.date,grade),table=plan.tables.find(t=>t.semesterId===day.courseSemesterId);return {day,slot:slotOccupancy(world.position.date,grade,world.position.slotId,table??null)};}
export function createCalendarBaseline(foundation,{startYear,subject,classes,homeClassId,seed}){
 const f=structuredClone(foundation),existing=f.extensions['teacher-hell/world'];
 need(!f.events.length&&!f.numeric.receipts.length&&f.numeric.evolution.clock.lastNaturalDate===null&&(!existing||existing.version===1&&existing.revision===0&&!existing.history.length&&!existing.commits.length),'MIGRATION','Only an untouched initial baseline can adopt a formal calendar; existing unverified history remains unverified');
 need(f.numeric.evolution.world.player.year===1&&homeClassId===f.numeric.evolution.world.classroom.id,'TIMETABLE','Initial formal homeroom must match existing N3 classroom');
 delete f.extensions['teacher-hell/world'];const range=careerRange(startYear),p=positionFor(range.start,'early',startYear),rng=createRandom(seed);
 const generated=generateTimetable({subject,semesterId:`${startYear}:autumn`,academicYear:startYear,classes,homeClassId,random:rng.snapshot()});
 f.position=p;Object.assign(f.numeric.evolution.clock,{date:p.date,lastNaturalDate:null,schoolYearId:p.schoolYearId,openingId:p.openingId});f.random.schedule=generated.random;
 const plan={id:`calendar:${CALENDAR_VERSION}:${startYear}`,validation:'fixed-calendar-v1',calendarVersion:CALENDAR_VERSION,startYear,subject,tables:[generated.table],vacation:null,cursor:cursorFor(p.date,p.slotId,startYear)};
 validateFormalPlan(plan);return {foundation:f,plan};
}
export function prepareSemester(world,op){
 assertShape(op,['type','semesterId','classes','homeClassId']);const plan=world.extensions['teacher-hell/world'].plan;need(isFormal(plan),'CALENDAR','Formal calendar required');
 const next=nextPosition(world.position,plan.startYear),target=teachingTerm(next.date),y=yearData(Number(next.date.slice(0,4)));
 need(next.slotId==='early'&&(next.date===y.summerCamp||next.date===y.winterCamp)&&target?.id===op.semesterId,'TIMETABLE','Prepare semester only at the next camp opening boundary');
 need(!plan.tables.some(t=>t.semesterId===op.semesterId),'DUPLICATE','Semester timetable already fixed');
 const registry=world.numeric.evolution.world.registry;
 if(registry){need(op.homeClassId===registry.homeClassId&&op.classes.every(c=>registry.classes[c.id]?.cohortStart===c.cohortStart&&[0,1,2].includes(registry.academicYear-c.cohortStart)),'TIMETABLE','Timetable catalogue must match authoritative school affiliations');}
 const generated=generateTimetable({subject:plan.subject,semesterId:target.id,academicYear:target.academicYear,classes:op.classes,homeClassId:op.homeClassId,previous:plan.tables.at(-1),random:world.random.schedule});
 plan.tables.push(generated.table);world.random.schedule=generated.random;
}
export function guardCalendarOperation(world,command,op){
 const plan=world.extensions['teacher-hell/world'].plan;if(!isFormal(plan))return;
 const {slot}=formalSlot(world),context=command.calendarContext??{kind:'formal-event'};
 assertShape(context,context.kind==='activity'?['kind','activityId']:['kind']);
 need(['formal-event','activity','procedure','routine'].includes(context.kind),'CALENDAR_CONTEXT','Unknown calendar result channel');
 need(op.type==='advance-time'||op.type==='prepare-semester'||!world.extensions['teacher-hell/world'].history.some(h=>h.type==='slot-complete'&&h.cursor===plan.cursor),'TIME_BARRIER','Completed slot is closed to further work; advance before starting another action');
 if(['advance-time','finish-slot','prepare-semester','plan-vacation'].includes(op.type))return;
 const domain=['story','draw-events','admit-event','event-lifecycle','event-exposure','school','open-event','fact','link-fact','claim','learn','belief','reveal','result','confirm-choice','stage','enrollment-reference','role'].includes(op.type);
 if(!domain)return;
 if(['story','draw-events','admit-event','event-lifecycle','event-exposure'].includes(op.type))need(context.kind==='formal-event','CALENDAR_CONTEXT','Event selection requires the formal channel');
 if(op.type==='school')need(context.kind==='procedure','CALENDAR_CONTEXT','School affiliations require the procedure channel');
 need(context.kind!=='routine','CALENDAR_CONTEXT','Routine operations cannot disguise formal event work');
 if(slot.protected&&op.type!=='draw-events')need(context.kind==='activity'||context.kind==='procedure','ACTIVITY_PROTECTED','Formal new events and old continuations stop in protected activity slots');
 if(context.kind==='activity'){
  need(slot.activityIds.includes(context.activityId),'ACTIVITY_PROTECTED','Activity result does not belong to this occupied slot');
  const event=op.event??world.events.find(e=>e.id===op.eventId);if(event)need(event.definitionId===`activity:${context.activityId}`,'ACTIVITY_PROTECTED','Cannot relabel an existing formal event as an activity');
 }
 if(context.kind==='procedure')need(!['result','confirm-choice','stage'].includes(op.type),'ACTIVITY_PROTECTED','Background deadlines can progress; formal event consequences cannot run under a procedure label');
 if(context.kind==='procedure'){
  const r=world.extensions['teacher-hell/world'],factId=op.factId??r.claims.find(c=>c.id===op.claimId&&c.versionId===op.versionId)?.factId,eventId=op.eventId??r.facts.find(f=>f.id===factId)?.eventId;
  const event=op.event??world.events.find(e=>e.id===eventId);if(event)need(event.definitionId.startsWith('procedure:'),'CALENDAR_CONTEXT','Procedure facts need a separate identified cause');
 }
}
export function finishCalendarSlot(world,op){
 assertShape(op,['type','completedActivityIds']);const r=world.extensions['teacher-hell/world'];need(isFormal(r.plan),'CALENDAR','Formal slot completion requires calendar');
 const {slot}=formalSlot(world);need(Array.isArray(op.completedActivityIds)&&new Set(op.completedActivityIds).size===op.completedActivityIds.length&&JSON.stringify([...op.completedActivityIds].sort())===JSON.stringify([...slot.activityIds].sort()),'TIME_BARRIER','Must acknowledge exactly the occupied activities');
 need(!r.history.some(h=>h.type==='event-selection'&&h.data.selected.some(s=>s.date===world.position.date&&s.slotId===world.position.slotId&&!world.events.some(e=>e.id===s.eventId))),'TIME_BARRIER','Admit the locked event before leaving its slot');
 need(!world.events.some(e=>e.choice&&e.choice.confirmedOptionId===null),'TIME_BARRIER','Unresolved player decision blocks time');
 need(!r.history.some(h=>h.type==='slot-complete'&&h.cursor===r.plan.cursor),'DUPLICATE','Slot already completed');
}
export function advanceFormalSlot(world,op){
 const r=world.extensions['teacher-hell/world'];need(op.steps===1,'TIME_BARRIER','Formal time advances exactly one legal slot; vacation drivers must stop at each required operation');
 need(r.history.some(h=>h.type==='slot-complete'&&h.cursor===r.plan.cursor),'TIME_BARRIER','Complete current slot before advancing');
 need(!world.events.some(e=>e.choice&&e.choice.confirmedOptionId===null),'TIME_BARRIER','Unresolved player decision blocks time');
 const next=nextPosition(world.position,r.plan.startYear),term=teachingTerm(next.date);need(!term||r.plan.tables.some(t=>t.semesterId===term.id),'TIMETABLE','Prepare the new semester before crossing camp opening');
 world.position=next;r.plan.cursor=cursorFor(next.date,next.slotId,r.plan.startYear);
}
export function validateOpeningSnapshot(world){
 const plan=world.extensions['teacher-hell/world'].plan;if(!isFormal(plan))return;
 const range=careerRange(plan.startYear),date=world.position.date,y=yearData(Number(date.slice(0,4)));
 need((date===range.start||date===y.autumnStart&&world.position.serviceYear>1)&&world.position.slotId==='early','SNAPSHOT','Formal retry snapshots belong only to initial summer opening or a subsequent actual autumn opening');
 const r=world.extensions['teacher-hell/world'];
 if(date===range.start){const initialized=r.revision===1&&r.history.length===1&&r.history[0].type==='school'&&r.history[0].data.change.type==='school-initialize'&&r.commits.length===1&&!r.commits[0].draws.length&&!world.events.length;need(r.revision===0||initialized,'SNAPSHOT','Initial opening snapshot precedes the first world action');return;}
 const entries=r.history.filter(h=>h.cursor===plan.cursor),entry=entries[0],last=r.commits.at(-1);
 need(entries.length===1&&entry.type==='time'&&last?.id===entry.operationId&&JSON.parse(last.request).operations?.at(-1)?.type==='advance-time','SNAPSHOT','Capture an autumn opening immediately on entry, before any work in its first slot');
}
/** Consume only a caller-selected event's calendar admission; no candidates, weights or draws here. */
export function calendarAdmission(world,command){
 const plan=world.extensions['teacher-hell/world'].plan;if(!isFormal(plan)||(command.calendarContext?.kind??'formal-event')!=='formal-event')return null;
 const {day,slot}=formalSlot(world);need(!slot.protected,'ACTIVITY_PROTECTED','Protected activity cannot admit a formal event');
 const groupId=day.segment?.id??`day:${day.date}`,prior=world.extensions['teacher-hell/world'].history.flatMap(h=>h.data.calendarAdmission?[h.data.calendarAdmission]:[]).filter(a=>a.groupId===groupId);
 const quota=day.quota;
 if(day.segment)need(prior.length<day.segment.quota,'EVENT_QUOTA','Vacation/festival quota already used');
 else if(quota.kind==='saturday'){
  const max=world.position.slotId==='morning'?quota.morningMax:world.position.slotId==='afternoon'?quota.afternoonMax:quota.privateMax;
  need(prior.filter(a=>a.slotId===world.position.slotId).length<max,'EVENT_QUOTA','Grade 3 Saturday slot quota exhausted');
 }else{
  need(prior.length<quota.max,'EVENT_QUOTA','Daily new-event quota exhausted');
  if(world.position.slotId.startsWith('study'))need(prior.filter(a=>a.slotId.startsWith('study')).length<quota.nightStudyMax,'EVENT_QUOTA','Three night-study periods share one new-event place');
 }
 return {groupId,date:world.position.date,slotId:world.position.slotId};
}

export function planVacation(world,op,before){
 assertShape(op,['type','id','weeks','direction']);const plan=world.extensions['teacher-hell/world'].plan;need(isFormal(plan)&&!plan.vacation,'VACATION','One formal vacation task at a time');
 const {day}=formalSlot(world);need(day.kind==='long-vacation'&&world.position.slotId==='vacation-day','VACATION','Weekly fast-forward is unavailable during camps, festival or ordinary weekends');
 need(typeof op.id==='string'&&op.id.length>0&&Number.isInteger(op.weeks)&&op.weeks>=1&&op.weeks<=52&&['rest','private-life'].includes(op.direction),'VACATION','Explicit direction and bounded weeks required');
 const requestedEnd=new Date((Date.parse(world.position.date+'T00:00:00Z')/86400000+op.weeks*7-1)*86400000).toISOString().slice(0,10);
 plan.vacation={id:op.id,direction:op.direction,startDate:world.position.date,endDate:[requestedEnd,day.segment.continuousEnd].sort()[0],before};
}
export function nextVacationOperation(world){
 const plan=world.extensions['teacher-hell/world'].plan,task=plan.vacation;if(!isFormal(plan)||!task)return {status:'idle'};
 const story=world.extensions['teacher-hell/world'].history.filter(h=>h.type==='story');
 const attention=world.events.map(e=>({event:e,state:story.findLast(h=>h.eventId===e.id)?.data.state})).find(x=>x.state&&x.state.mode!=='ended'&&(x.state.mode!=='waiting'||x.state.dueDate<=world.position.date&&!formalSlot(world).slot.protected));
 if(attention)return {status:attention.state.mode==='waiting'?'follow-up-required':'decision-required',eventId:attention.event.id,direction:task.direction,endDate:task.endDate};
 if(world.events.some(e=>e.choice&&e.choice.confirmedOptionId===null))return {status:'decision-required',direction:task.direction,endDate:task.endDate};
 const r=world.extensions['teacher-hell/world'];return {status:'advance',direction:task.direction,endDate:task.endDate,request:{id:createId('operation',[world.identity.attemptId,task.id,String(plan.cursor),'vacation-step']),attemptId:world.identity.attemptId,expectedRevision:r.revision,actorId:world.identity.playerId,preconditions:[],operations:[...(r.history.some(h=>h.type==='slot-complete'&&h.cursor===plan.cursor)?[]:[{type:'finish-slot',completedActivityIds:[]}]),{type:'advance-time',planId:plan.id,steps:1}],calendarContext:{kind:'routine'}}};
}

/** Milestones are permissions for the later annual controller, never a pass/fail verdict. */
export function calendarMilestones(world){
 const plan=world.extensions['teacher-hell/world'].plan;need(isFormal(plan),'CALENDAR','Formal calendar required');
 const {day}=formalSlot(world),complete=world.extensions['teacher-hell/world'].history.some(h=>h.type==='slot-complete'&&h.cursor===plan.cursor),lastSlot=day.slots.at(-1).id===world.position.slotId;
 const ready=complete&&lastSlot&&!world.events.some(e=>e.choice&&e.choice.confirmedOptionId===null),y=Number(world.position.date.slice(0,4)),meta=yearData(y);
 return {semesterReviewReady:ready&&day.finalReview,annualSettlementReady:ready&&day.annualBoundary,postAnnualSummer:y>plan.startYear&&world.position.date>meta.springFinal&&world.position.date<meta.autumnStart,backgroundProceduresContinue:true};
}
