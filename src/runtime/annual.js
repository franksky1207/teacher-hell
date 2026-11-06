import { compileCohortCompletion,beforeCohortCompletion } from './cohort.js';
import { failureResult } from './homeroom.js';
/** Annual observations are projections of the world journal, never writable scores.
 * Semester reports remain a separate reading barrier. Each challenge uses its actual legal opening. */
import { captureAssessment,validateSnapshot } from '../assessment/evidence.js';
import { rateAnnual } from '../assessment/annual.js';
import { development,mean } from '../assessment/grading.js';
import { canonicalData } from '../changes/settlement.js';
import { assertShape,ABILITY_NAMES,STATE_NAMES } from '../player/panel.js';
import { planMode,careerRange,positionFor,nextPosition,calendarDay,gradeAt,slotOccupancy,cursorFor,yearData } from '../calendar/calendar.js';
import { academicState,readAcademicQualification } from './academics.js';
import { pendingSemesterReview,REVIEW_KEY } from './reviews.js';

export const ANNUAL_KEY='teacher-hell/annual-observations';
const r=w=>w.extensions['teacher-hell/world'];
const need=(ok,message)=>{if(!ok)throw new RangeError(`ANNUAL: ${message}`);};
const same=(a,b)=>canonicalData(a)===canonicalData(b);
const names=[...ABILITY_NAMES,...STATE_NAMES];
function relations(w){const n=w.numeric.evolution.world,p=w.identity.playerId;return Object.entries(n.relationships).filter(([,e])=>e.fromId===p&&n.people[e.toId]||e.toId===p&&n.people[e.fromId]).map(([id,e])=>({id,fromId:e.fromId,toId:e.toId,values:structuredClone(e.values)}));}
function snapshot(w,label){return captureAssessment(w.numeric.evolution.world,{id:`annual:${w.identity.attemptId}:${w.position.serviceYear===1?'':w.position.serviceYear+':'}${label}`,provenance:'formal',attemptId:w.identity.attemptId});}
export function initializeAnnualObservations(w){
 const state=r(w);need(!w.extensions[ANNUAL_KEY]&&w.extensions[REVIEW_KEY]&&state.revision===1&&state.history.length===1,'initialize at untouched reviewed summer opening');
 need(!w.numeric.receipts.length&&w.numeric.evolution.clock.lastNaturalDate===null,'annual opening precedes all natural updates and effects');
 need(w.position.date===careerRange(state.plan.startYear,planMode(state.plan)).start&&w.position.slotId==='early','first summer opening required');
 w.extensions[ANNUAL_KEY]={version:1,at:structuredClone(w.position),start:snapshot(w,'start'),relations:relations(w)};return w;
}
export function annualResult(w){return r(w).history.find(h=>h.type==='annual-success'&&h.data.year===w.position.serviceYear)??null;}
export function annualBaseline(w,year=w.position.serviceYear){
 const openings=r(w).history.filter(h=>h.type==='academic-opening');
 return openings.find(h=>h.data.annual.start.year===year)?.data.annual??openings[0]?.data.previousAnnual??w.extensions[ANNUAL_KEY];
}
/** Captured by the autumn entry transaction, after background deadlines. */
export function openAnnualObservations(w){
 const previous=w.extensions[ANNUAL_KEY];need(previous&&w.position.serviceYear===previous.start.year+1,'consecutive annual opening required');
 need(r(w).history.some(h=>h.type==='annual-success'&&h.data.year===previous.start.year),'previous year must succeed');
 const annual={version:1,at:structuredClone(w.position),start:snapshot(w,'start'),relations:relations(w)};
 w.extensions[ANNUAL_KEY]=annual;return {previousAnnual:structuredClone(previous),annual:structuredClone(annual)};
}
/** Exact slots, including vacations and protected activities, not elapsed days. */
export function annualCoverage(w,untilOrder=r(w).history.length){
 const baseline=w.extensions[ANNUAL_KEY];need(baseline,'annual opening is missing');
 const openingCursor=cursorFor(baseline.at.date,baseline.at.slotId,r(w).plan.startYear,r(w).plan.calendarVersion),history=r(w).history.slice(0,untilOrder).filter(h=>h.cursor>=openingCursor),completed=new Set(history.filter(h=>h.type==='slot-complete').map(h=>`${h.at.date}/${h.at.slotId}`)),draws=new Set(history.filter(h=>h.type==='event-selection').map(h=>h.at.date));
 const missing=[],dates=new Set();let position=baseline.at,slots=0;
 while(position.date<w.position.date||position.date===w.position.date){
  slots++;dates.add(position.date);const key=`${position.date}/${position.slotId}`;if(!completed.has(key))missing.push(key);
  if(position.date===w.position.date&&position.slotId===w.position.slotId)break;
  position=nextPosition(position,r(w).plan.startYear,planMode(r(w).plan),r(w).plan.calendarVersion);need(slots<6000,'annual coverage exceeded');
 }
 return {slots,completed:slots-missing.length,days:dates.size,missing,undrawnDates:[...dates].filter(d=>!draws.has(d))};
}

/** Rubric v1 maps measured domain observations into the existing N7 rubric.
 * No polarity is inferred from text or generic numeric effects. Routine delivery
 * is real responsibility evidence even when no formal event was eligible.
 * Relationships describe recorded subjective states, never objective misconduct. */
export function annualEvidence(w,{end=snapshot(w,'end'),endRelations=relations(w),untilOrder=r(w).history.length}={}){
 const baseline=w.extensions[ANNUAL_KEY];need(baseline,'annual opening is missing');
 const openingCursor=cursorFor(baseline.at.date,baseline.at.slotId,r(w).plan.startYear,r(w).plan.calendarVersion),history=r(w).history.slice(0,untilOrder).filter(h=>h.cursor>=openingCursor),n=w.numeric.evolution.world,year=w.position.serviceYear,attemptId=w.identity.attemptId;
 const header={provenance:'formal',playerId:w.identity.playerId,schoolId:w.identity.schoolId,year,attemptId};
 const prefix=`annual:${attemptId}:${year}`,cohortId=`${prefix}:cohort`,records=[],sources=[];
 const start={...structuredClone(baseline.start),id:`${prefix}:start`,attemptId},finish={...structuredClone(end),id:`${prefix}:end`};
 records.push(start,finish);
 const students=[...new Set(n.registry.enrollments.filter(e=>e.classId===start.classroom.id&&e.from<=w.position.date&&(e.until===null||e.until>=baseline.at.date)).map(e=>e.personId))];
 records.push({id:cohortId,kind:'cohort',...header,years:Array.from({length:3},(_,i)=>Math.floor((year-1)/3)*3+1+i),studentIds:students,importance:1});
 // Cohort headers have a different N7 schema from annual records.
 delete records.at(-1).year;delete records.at(-1).attemptId;
 const cohort=records.at(-1),transient=n.registry.enrollments.filter(e=>e.classId===start.classroom.id&&e.from<=w.position.date&&(e.until===null||e.until>=baseline.at.date)&&!start.students.concat(finish.students).some(s=>s.id===e.personId));
 if(transient.length){cohort.enrollmentRefs=[];for(const entry of transient){
  const id=`${prefix}:enrollment:${entry.id}`,basisFactId=`${id}:basis`,prior=n.registry.enrollments.filter(e=>e.personId===entry.personId&&e.from<=entry.from&&e.id!==entry.id).at(-1),change=history.findLast(h=>h.type==='school'&&h.data.change.personId===entry.personId&&h.at.date===entry.from)?.data.change;
  records.push({id:basisFactId,kind:'fact',...header,confirmed:true,subjectIds:[entry.personId,header.playerId]},
   {id,kind:'enrollment',provenance:header.provenance,playerId:header.playerId,schoolId:header.schoolId,personId:entry.personId,cohortId,fromYear:year,untilYear:year,basisFactId,previousEnrollmentId:prior?.id??null,reason:entry.reason==='initial'?'initial':['repeat','return'].includes(change?.action)?change.action:'transfer'});
  cohort.enrollmentRefs.push(id);
 }}
 const evidenceRefs=[];
 function observe(kind,key,subjectId,quality,completion,accountability,source,significant=false){
  const factId=`${prefix}:observation:${kind}:${key}`,id=`${prefix}:outcome:${kind}:${key}`;
  records.push({id:factId,kind:'fact',...header,confirmed:true,subjectIds:[...new Set([header.playerId,subjectId])]});
  records.push({id,kind,...header,factId,cohortId,subjectId,importance:1,responsibility:1,quality,completion,accountability,significant});
  evidenceRefs.push(id);sources.push({id,factId,nature:kind==='relationship'?'recorded-directed-perception':'objective-domain-observation',...source});
 }
 const campus=history.filter(h=>h.type==='campus'),lessons=campus.filter(h=>h.data.slot.teachingAutomatic);
 if(lessons.length){
  const complete=lessons.filter(h=>h.data.operations.some(o=>o.type==='result'&&w.events.some(e=>e.id===o.eventId&&e.results.some(x=>x.id===o.id))));
  // This measures delivery of actual assigned lessons, not educational excellence.
  let position=baseline.at,required=0;
  const occupied=new Set(history.filter(h=>h.eventId&&w.events.some(e=>e.id===h.eventId&&!/^(procedure:|activity:)/.test(e.definitionId))).map(h=>`${h.at.date}/${h.at.slotId}`));
  for(;;){const day=calendarDay(position.date,gradeAt(position.date,r(w).plan.startYear),r(w).plan.calendarVersion),table=r(w).plan.tables.find(t=>t.semesterId===day.courseSemesterId);
   if(table&&slotOccupancy(position.date,day.grade,position.slotId,table,r(w).plan.calendarVersion).teachingAutomatic&&!occupied.has(`${position.date}/${position.slotId}`))required++;
   if(position.date===w.position.date&&position.slotId===w.position.slotId)break;position=nextPosition(position,r(w).plan.startYear,planMode(r(w).plan),r(w).plan.calendarVersion);
  }
  const delivery=100*complete.length/Math.max(required,complete.length);
  observe('handling','lesson-delivery',header.playerId,delivery,delivery,delivery,{criterion:'assigned-lessons-with-confirmed-domain-results',historyIds:lessons.map(h=>h.id),eventIds:[],factIds:lessons.flatMap(h=>h.data.operations.filter(o=>o.type==='fact').map(o=>o.id))});
 }
 // A lawful committee's finding is distinct from allegations and NPC displeasure.
 const decisions=[...new Map(history.filter(h=>h.type==='institution'&&h.data.operation.change.action==='step'&&h.data.operation.change.step==='decide').map(h=>[h.data.result.id,h])).values()];
 const counted=new Set(),latestCases=new Map(history.filter(h=>h.type==='institution'&&h.data.result?.rule).map(h=>[h.data.result.id,h.data.result]));
 for(const h of decisions){const c=h.data.result,last=latestCases.get(c.id);if(c.respondentId!==header.playerId||!same(last.decisionAt,c.decisionAt)||last.finding!==c.finding)continue;
  const factId=h.data.operation.change.resolutionFactId,f=r(w).facts.find(f=>f.id===factId);if(!f||counted.has(f.id))continue;counted.add(f.id);
  if(!last.notifiedAt&&!f.witnessIds.includes(header.playerId)&&!r(w).disclosures.some(d=>d.factId===f.id&&d.actorId===header.playerId&&d.order<=untilOrder))continue;
  const q={'unsubstantiated':100,'substantiated':0,'insufficient-evidence':50}[c.finding];if(q===undefined)continue;
  observe('handling',f.id,header.playerId,q,100,100,{criterion:'competent-committee-finding',historyIds:[h.id],eventIds:[f.eventId],factIds:[f.id],finding:c.finding},true);
 }
 const atWorld={...w,extensions:{...w.extensions,'teacher-hell/world':{...r(w),history:r(w).history.slice(0,untilOrder)}}},a=academicState(atWorld);
 for(const id of students){
  const closed=Object.values(a.terms).filter(t=>t.closed&&t.year===r(w).plan.startYear+year-1),rows=closed.flatMap(t=>t.results?.filter(row=>row.id===id)??[]),courses=rows.flatMap(row=>row.courses??[]);
  if(!rows.length||!courses.length)continue;
  const learner=a.students[id],attendance=mean([...new Set(courses.map(c=>c.subject))].map(s=>learner.subjects[s].attendance));
  observe('student',id,id,mean(rows.map(row=>row.average)),100*courses.reduce((s,c)=>s+c.earned,0)/courses.reduce((s,c)=>s+c.credits,0),attendance,{criterion:'recorded-academic-marks-credits-attendance',historyIds:history.filter(h=>h.type==='academic'&&(!h.data.input.personId||h.data.input.personId===id)).map(h=>h.id),eventIds:[],factIds:[]});
 }
 const before=new Map(baseline.relations.map(e=>[e.id,e]));
 for(const edge of endRelations){let old=before.get(edge.id);
  // A new contact can be reconstructed exactly from N6's observed clamps. N4
  // never changes directed relationships. This is a recorded perception, not a
  // claim that another person's opinion establishes objective wrongdoing.
  if(!old){const values=structuredClone(edge.values);for(const change of history.filter(h=>h.type==='effect').flatMap(h=>h.data.observed??[]).filter(c=>c.target.kind==='relationship'&&c.target.id===edge.id).reverse()){need(values[change.code]===change.after,'relationship effect chain differs');values[change.code]=change.before;}old={values};}
  const interactions=history.filter(h=>h.type==='effect'&&h.data.changes.some(c=>c.target.kind==='relationship'&&c.target.id===edge.id)&&h.factIds.some(id=>r(w).facts.some(f=>f.id===id&&f.witnessIds.includes(w.identity.playerId))||r(w).disclosures.some(d=>d.factId===id&&d.actorId===w.identity.playerId&&d.order<=untilOrder)));
  if(!interactions.length)continue;
  const quality=relationshipMetric(old.values,edge.values);
  observe('relationship',edge.id,edge.fromId===header.playerId?edge.toId:edge.fromId,quality,100,100,{criterion:'observed-directed-relationship',direction:{fromId:edge.fromId,toId:edge.toId},historyIds:interactions.map(h=>h.id),eventIds:[...new Set(interactions.map(h=>h.eventId))],factIds:[...new Set(interactions.flatMap(h=>h.factIds))]});
 }
 const basisId=`${prefix}:completion-basis`,completionRef=`${prefix}:completion`,summaryRef=`${prefix}:summary`;
 // Before the legal boundary there is no confirmed completion fact to resolve.
 // N7 therefore keeps its genuine insufficient result; no provisional success.
 let qualified=false;try{eligibility(atWorld);qualified=true;}catch(error){if(!(error instanceof RangeError)||!error.message.startsWith('ANNUAL:'))throw error;}
 if(qualified)records.push({id:basisId,kind:'fact',...header,confirmed:true,subjectIds:[header.playerId]},{id:completionRef,kind:'completion',...header,outcome:'success',basisIds:[basisId]});
 records.push({id:summaryRef,kind:'year-summary',...header,cohortId,startRef:start.id,endRef:finish.id,completionRef,evidenceRefs});
 const byId=new Map(records.map(row=>[row.id,row]));
 return {version:1,records,sources,summaryRef,rating:rateAnnual(summaryRef,{provenance:'formal',resolve:id=>byId.get(id)})};
}

function eligibility(w){
 need(!failureResult(w),'failed year cannot receive success');
 need(w.extensions[ANNUAL_KEY]&&w.position.serviceYear===w.extensions[ANNUAL_KEY].start.year,'current academic year opening required');
 need(!pendingSemesterReview(w),'read the semester review first');
 const day=calendarDay(w.position.date,gradeAt(w.position.date,r(w).plan.startYear),r(w).plan.calendarVersion);
 need(day.annualBoundary&&day.slots.at(-1).id===w.position.slotId,'June final examination boundary required');
 need(r(w).history.some(h=>h.type==='slot-complete'&&h.cursor===r(w).plan.cursor),'complete final slot first');
 const reviews=r(w).history.filter(h=>h.type==='semester-review'&&positionFor(h.at.date,h.at.slotId,r(w).plan.startYear,planMode(r(w).plan),r(w).plan.calendarVersion).serviceYear===w.position.serviceYear);need(reviews.length===2&&reviews.every(h=>r(w).history.some(a=>a.type==='semester-review-read'&&a.data.reviewId===h.id)),'both semester reports must be read');
 const coverage=annualCoverage(w);need(!coverage.missing.length&&!coverage.undrawnDates.length,'incomplete legal slots or daily event draws');
 const academics=academicState(w),y=r(w).plan.startYear+w.position.serviceYear-1;need([`${y}:autumn`,`${y+1}:spring`].every(id=>academics.terms[id]?.closed&&academics.terms[id].assessments.length===4),'both academic semesters must be formally closed');
 return {coverage,reviews};
}
export function compileAnnualSuccess(w){
 need(!annualResult(w),'year is already settled');
 const {coverage,reviews}=eligibility(w);
 const end=snapshot(w,'end'),endRelations=relations(w),evidence=annualEvidence(w,{end,endRelations});need(evidence.rating.status==='rated','formal evidence is insufficient');
 return {version:1,year:w.position.serviceYear,attemptId:w.identity.attemptId,status:'success',at:structuredClone(w.position),untilOrder:r(w).history.length,coverage,reviewIds:reviews.map(h=>h.id),end,endRelations,evidence,
  comparison:Object.fromEntries(names.map(name=>[name,{start:w.extensions[ANNUAL_KEY].start.abilities[name]??w.extensions[ANNUAL_KEY].start.states[name],end:end.abilities[name]??end.states[name],delta:(end.abilities[name]??end.states[name])-(w.extensions[ANNUAL_KEY].start.abilities[name]??w.extensions[ANNUAL_KEY].start.states[name])}])),summary:'本學年依正式校曆及已保存的世界證據完成結算；未結事項及人物歷史保留。'};
}
export function validateAnnualObservations(w){
 const baseline=w.extensions[ANNUAL_KEY],reports=r(w).history.filter(h=>h.type==='annual-success');
 const settlements=r(w).commits.filter(c=>JSON.parse(c.request).operations?.some(op=>op.type==='settle-school-year'));
 if(!baseline){need(!reports.length&&!settlements.length,'annual opening is missing');return;}
 assertShape(baseline,['version','at','start','relations']);need(baseline.version===1&&w.extensions[REVIEW_KEY],'unsupported annual observation version');validateSnapshot(baseline.start,'formal');
 const openingDate=baseline.start.year===1?careerRange(r(w).plan.startYear,planMode(r(w).plan)).start:yearData(r(w).plan.startYear+baseline.start.year-1).autumnStart;
 need(same(baseline.at,positionFor(openingDate,'early',r(w).plan.startYear,planMode(r(w).plan),r(w).plan.calendarVersion)),'annual opening date differs');
 if(baseline.start.year===1)need(same(baseline.start.abilities,w.extensions[REVIEW_KEY].abilities),'annual and semester openings differ');
 const openings=r(w).history.filter(h=>h.type==='academic-opening');
 need(openings.length===w.position.serviceYear-1,'missing or repeated formal opening');
 let prior=null;
 for(const entry of openings){
  const d=entry.data,p=positionFor(entry.at.date,entry.at.slotId,r(w).plan.startYear,planMode(r(w).plan),r(w).plan.calendarVersion),owner=r(w).commits.find(c=>c.id===entry.operationId&&c.attemptId===entry.attemptId),request=JSON.parse(owner.request);
  assertShape(d,['previousAnnual','annual','previousHomeroom','homeroom']);
  need(p.serviceYear===(prior?.data.annual.start.year??1)+1&&p.slotId==='early'&&p.date===yearData(r(w).plan.startYear+p.serviceYear-1).autumnStart,'nonconsecutive autumn opening');
  need(same(d.annual.at,p)&&d.annual.start.year===p.serviceYear&&d.previousAnnual.start.year===p.serviceYear-1&&(!prior||same(d.previousAnnual,prior.data.annual)),'broken annual opening chain');
  need(r(w).history.some(h=>h.type==='annual-success'&&h.data.year===p.serviceYear-1&&h.order<entry.order),'opening precedes annual success');
  need(request.operations.some(op=>['advance-time','school-action'].includes(op.type))&&r(w).history.some(h=>h.type==='time'&&h.operationId===entry.operationId&&h.cursor===entry.cursor&&h.order<entry.order),'opening lacks actual calendar entry');
  validateSnapshot(d.annual.start,'formal');
  if(d.homeroom)need(d.homeroom.openingId===p.openingId&&d.homeroom.schoolYearId===p.schoolYearId&&w.numeric.evolution.world.registry.assignments.some(a=>a.id===d.homeroom.assignmentId&&a.classId===d.homeroom.classId&&a.personId===w.identity.playerId&&a.from<=p.date&&(a.until===null||a.until>=p.date)),'opening lacks legal original duty');
  prior=entry;
 }
 const transitions=r(w).history.filter(h=>h.type==='year-transition');
 const requestedTransitions=r(w).commits.filter(c=>JSON.parse(c.request).operations?.some(op=>op.type==='transition-school-year'));
 need(requestedTransitions.length===transitions.length,'missing annual affiliation transaction');
 for(const [i,h] of transitions.entries()){
  assertShape(h.data,['academicYear','previousClassId','classId','successId']);const target=r(w).plan.startYear+i+1,next=nextPosition(positionFor(h.at.date,h.at.slotId,r(w).plan.startYear,planMode(r(w).plan),r(w).plan.calendarVersion),r(w).plan.startYear,planMode(r(w).plan),r(w).plan.calendarVersion),success=reports.find(s=>s.id===h.data.successId),owner=r(w).commits.find(c=>c.id===h.operationId&&c.attemptId===h.attemptId),request=JSON.parse(owner.request);
  need(h.data.academicYear===target&&next.date===yearData(target).summerCamp&&next.slotId==='early'&&success?.data.year===i+1&&success.order<h.order,'annual affiliations lack a legal prior success or camp boundary');
  need(request.operations.length===1&&request.operations[0].type==='transition-school-year','annual affiliations require an isolated request');
  const rows=r(w).history.filter(s=>s.operationId===h.operationId&&s.type==='school'),yearRow=rows.filter(s=>s.data.change.type==='school-year'),cohorts=rows.filter(s=>s.data.change.type==='school-cohort');
  need(yearRow.length===1&&yearRow[0].data.change.academicYear===target&&cohorts.length===((i+1)%3===0?1:0),'annual school operations differ');
  need((h.data.classId===h.data.previousClassId)===!cohorts.length,'illegal homeroom change during a cohort');
  const completion=r(w).history.find(s=>s.operationId===h.operationId&&s.type==='cohort-completion');
  if(cohorts.length){need(completion&&completion.data.classId===h.data.previousClassId,'cohort completion archive missing');const at={...w,position:positionFor(h.at.date,h.at.slotId,r(w).plan.startYear,planMode(r(w).plan),r(w).plan.calendarVersion),extensions:{...w.extensions,'teacher-hell/world':{...r(w),history:r(w).history.slice(0,completion.order-1)}}},academics=academicState(at),outcomes=completion.data.outcomes;
   need(new Set(outcomes.map(o=>o.personId)).size===outcomes.length,'duplicate cohort qualification');
   for(const o of outcomes){need(same(o.qualification,readAcademicQualification(at,o.personId,academics)),'cohort qualification changed');need(rows.some(s=>s.data.change.type==='school-leave'&&s.data.change.personId===o.personId&&s.data.change.status===(o.qualification.eligible?'graduated':'delayed')&&s.data.basisFactId===completion.factIds[0]),'individual graduation or extension was not executed');}
   const cohort=w.numeric.evolution.world.registry.cohorts.find(c=>c.startYear===target);need(cohort&&cohort.classId===h.data.classId&&cohort.initialStudentIds.length===40,'new cohort must have forty durable identities');
  }else need(!completion,'unexpected graduation archive');
 }
 const latest=openings.at(-1);if(latest)need(same(latest.data.annual,baseline),'annual opening differs from entry transaction');
 need(new Set(reports.map(h=>h.data.year)).size===reports.length&&settlements.length===reports.length,'duplicate or missing annual result');
 for(const h of reports){const baseline=annualBaseline(w,h.data.year);const before={...w,identity:{...w.identity,attemptId:h.attemptId},position:h.data.at,extensions:{...w.extensions,[ANNUAL_KEY]:baseline,'teacher-hell/world':{...r(w),plan:{...r(w).plan,cursor:h.cursor},history:r(w).history.slice(0,h.order-1)}}};
  assertShape(h.data,['version','year','attemptId','status','at','untilOrder','coverage','reviewIds','end','endRelations','evidence','comparison','summary']);assertShape(h.data.comparison,names);need(h.data.version===1,'unsupported annual report version');
  need(h.data.untilOrder===h.order-1&&h.attemptId===h.data.attemptId&&same(h.data.at,positionFor(h.at.date,h.at.slotId,r(w).plan.startYear,planMode(r(w).plan),r(w).plan.calendarVersion)),'annual result ownership differs');
  const qualified=eligibility(before);need(same(qualified.reviews.map(h=>h.id),h.data.reviewIds),'annual semester links differ');
  const owner=r(w).commits.find(c=>c.id===h.operationId&&c.attemptId===h.attemptId);need(JSON.parse(owner.request).operations.length===1&&JSON.parse(owner.request).operations[0].type==='settle-school-year','annual result requires an isolated settlement request');
  // Rebuild every source and every N7 component on restore; saved scores are not authority.
  const evidence=annualEvidence(before,{end:h.data.end,endRelations:h.data.endRelations,untilOrder:h.data.untilOrder});need(same(evidence,h.data.evidence),'annual evidence or N7 rating changed');
  const openingCursor=cursorFor(baseline.at.date,baseline.at.slotId,r(w).plan.startYear,r(w).plan.calendarVersion),edges=new Map(baseline.relations.map(e=>[e.id,structuredClone(e.values)]));
  for(const change of before.extensions['teacher-hell/world'].history.filter(h=>h.type==='effect'&&h.cursor>=openingCursor).flatMap(h=>h.data.observed??[]))if(change.target.kind==='relationship'&&edges.has(change.target.id)){
   const values=edges.get(change.target.id);need(values[change.code]===change.before,'annual relationship observation chain differs');values[change.code]=change.after;
  }
  for(const edge of h.data.endRelations)if(edges.has(edge.id))need(same(edges.get(edge.id),edge.values),'annual relationship endpoint differs from actual effects');
  const historicalEdges=new Map(relations(w).map(e=>[e.id,structuredClone(e.values)]));
  for(const change of r(w).history.slice(h.order).filter(h=>h.type==='effect').flatMap(h=>h.data.observed??[]).reverse())if(change.target.kind==='relationship'&&historicalEdges.has(change.target.id)){const values=historicalEdges.get(change.target.id);need(values[change.code]===change.after,'later relationship effect chain differs');values[change.code]=change.before;}
  for(const edge of h.data.endRelations)need(same(historicalEdges.get(edge.id),edge.values),'annual relationship endpoint changed');
  if(same(w.position,h.data.at)){
   const completion=r(w).history.find(c=>c.type==='cohort-completion'&&c.order>h.order&&c.at.date===h.at.date&&c.at.slotId===h.at.slotId);
   const endpoint=completion?beforeCohortCompletion(w,completion):w;
   need(same(snapshot(endpoint,'end'),h.data.end)&&same(relations(endpoint),h.data.endRelations),'annual endpoint differs from the current world');
  }
  need(same(annualCoverage(before),h.data.coverage)&&!h.data.coverage.missing.length&&!h.data.coverage.undrawnDates.length,'annual coverage changed');
  need(h.data.status==='success'&&h.data.year===before.position.serviceYear&&evidence.rating.status==='rated','invalid annual success');
  need(names.every(name=>{const c=h.data.comparison[name];return c&&c.start===(baseline.start.abilities[name]??baseline.start.states[name])&&c.end===(h.data.end.abilities[name]??h.data.end.states[name])&&c.delta===c.end-c.start;}),'annual twelve-value comparison differs');
 }
}
/** Engineering/retrospective authority, including hidden observation witnesses. */
export function readAnnualResults(w){return r(w).history.filter(h=>h.type==='annual-success').map(h=>({id:h.id,...structuredClone(h.data)}));}

/** Shared N7 directed-perception observation; no numeric state is changed. */
export function relationshipMetric(before,after){return mean([development(before['5-1'],after['5-1']),development(before['5-3'],after['5-3']),development(100-before['5-4'],100-after['5-4'])]);}

/** T3 preparation only: T4 must consume operations + archive in the SAME owned
 * transaction as its N7 report, ending and freeze. This returns no committable world
 * and is intentionally absent from the public operation dispatcher. */
export function compileThreeYearCohortCompletion(w,operationId){
 need(planMode(r(w).plan)==='three-year'&&w.position.serviceYear===3,'third playable year in three-year mode required');
 need(annualResult(w),'verified annual success required before cohort completion');
 eligibility(w);
 const success=annualResult(w),owner=r(w).commits.find(c=>c.id===success.operationId&&c.attemptId===success.attemptId);
 if(owner)validateAnnualObservations(w);
 else{
  // The annual row may have just been compiled in T4's transaction-owned draft.
  // Recompute it from the complete prefix; never accept a caller's success flag.
  need(success.operationId===operationId&&success===r(w).history.at(-1)&&success.order===r(w).history.length,'uncommitted annual success must belong to this ordered transaction');
  const before={...w,extensions:{...w.extensions,'teacher-hell/world':{...r(w),history:r(w).history.slice(0,-1)}}};
  validateAnnualObservations(before);
  need(same(compileAnnualSuccess(before),success.data),'uncommitted annual success differs from its actual sources');
 }
 need(same(success.data.at,w.position),'complete at the June annual success position');
 const result=compileCohortCompletion(w,operationId,{terminal:true});
 return {...result,successId:success.id,successOrder:success.order};
}
