import { yearData } from '../calendar/calendar.js';
import { sourceReader } from '../assessment/evidence.js';
import { loadYear } from '../assessment/annual.js';
import { relationshipMetric } from './annual.js';
import { academicState,readAcademicQualification } from './academics.js';
/** Read-only N7 bridge. The validated world journal remains the sole authority.
 * No saved parallel world, fabricated annual successes, or implicit host clock. */
import { rateCareer } from '../assessment/career.js';
import { mean,development,outcomeScore,gradeForScore,CAREER_LIMITS } from '../assessment/grading.js';
import { canonicalData } from '../changes/settlement.js';
import { ABILITY_NAMES,STATE_NAMES,assertShape } from '../player/panel.js';

const runtime=w=>w.extensions['teacher-hell/world'];
const need=(ok,message)=>{if(!ok)throw new RangeError(`CAREER: ${message}`);};
const equal=(a,b)=>canonicalData(a)===canonicalData(b);
export const careerResult=w=>runtime(w).history.find(h=>h.type==='career-completion')??null;

/** Only reports already checked by validateAnnualObservations enter this adapter.
 * Shared records are referenced; just cohort headers and remapped rows are small projections. */
export function careerEvidence(w){
 const r=runtime(w),reports=r.history.filter(h=>h.type==='annual-success').sort((a,b)=>a.data.year-b.data.year),records=new Map(),yearRefs=[],cohortRefs=[],sources=[];
 const n=w.numeric.evolution.world,registry=n.registry;
 const affiliationYear=date=>{const y=Number(date.slice(0,4));return Math.max(1,Math.min(30,y-r.plan.startYear+(date>=yearData(y).summerCamp?1:0)));};
 const put=row=>{need(!records.has(row.id),'duplicate canonical evidence ID');records.set(row.id,row);return row.id;};
 const cohorts=new Map();
 for(const h of reports){
  const d=h.data;need(d.status==='success'&&d.attemptId===h.attemptId&&d.year===d.end.year,'annual ownership differs');
  const canonical=registry.cohorts.find(c=>c.classId===d.end.classroom.id);need(canonical,'annual class lacks canonical cohort');
  const index=Math.floor((d.year-1)/3),id=`career:${w.identity.careerId}:cohort:${index+1}`;
  let cohort=cohorts.get(index);
  if(!cohort){cohort={id,kind:'cohort',provenance:'formal',playerId:w.identity.playerId,schoolId:w.identity.schoolId,years:[index*3+1,index*3+2,index*3+3],studentIds:[],importance:1,enrollmentRefs:[]};cohorts.set(index,cohort);cohortRefs.push(id);put(cohort);}
  need(canonical.startYear===r.plan.startYear+index*3,'cohort date mismatch');
  need(new Set(d.evidence.records.map(row=>row.id)).size===d.evidence.records.length,'duplicate annual evidence ID');
  const old=d.evidence.records.find(row=>row.kind==='cohort');
  for(const studentId of old.studentIds)if(!cohort.studentIds.includes(studentId))cohort.studentIds.push(studentId);
  for(const row of d.evidence.records){
   if(row.kind==='cohort')continue;
   if(row.kind==='enrollment')continue; // Canonical dated registry chain below replaces annual transient projection.
   put(Object.hasOwn(row,'cohortId')?{...row,cohortId:id}:row);
  }
  yearRefs.push(d.evidence.summaryRef);
  for(const source of d.evidence.sources)sources.push({...source,annualId:h.id,year:d.year});
 }
 // Every membership has a dated causal affiliation. Natural persons are never regenerated.
 for(const [index,c] of cohorts){
  const classId=reports.find(h=>Math.floor((h.data.year-1)/3)===index).data.end.classroom.id;
  for(const entry of registry.enrollments.filter(e=>e.classId===classId&&c.studentIds.includes(e.personId))){
   const fromYear=Math.max(index*3+1,affiliationYear(entry.from)),untilYear=Math.min(index*3+3,entry.until?affiliationYear(entry.until):index*3+3);
   // Registry affiliation is independently validated by the school history, including its causal basis.
   const prior=registry.enrollments.filter(e=>e.personId===entry.personId&&e.id!==entry.id&&e.from<entry.from).at(-1);
   const basisFactId=`career:enrollment-basis:${entry.id}`,id=`career:enrollment:${entry.id}`,change=entry.reason==='initial'?null:r.history.findLast(h=>h.type==='school'&&h.data.change.personId===entry.personId&&h.at.date===entry.from)?.data.change;
   const reason=entry.reason==='initial'?'initial':['repeat','return'].includes(change?.action)?change.action:'transfer';
   put({id:basisFactId,kind:'fact',provenance:'formal',playerId:w.identity.playerId,schoolId:w.identity.schoolId,year:fromYear,attemptId:reports.find(h=>h.data.year===Math.min(fromYear,reports.length))?.attemptId??w.identity.attemptId,confirmed:true,subjectIds:[entry.personId]});
   put({id,kind:'enrollment',provenance:'formal',playerId:w.identity.playerId,schoolId:w.identity.schoolId,personId:entry.personId,cohortId:c.id,fromYear,untilYear:Math.max(fromYear,untilYear),basisFactId,previousEnrollmentId:prior?`career:enrollment:${prior.id}`:null,reason});c.enrollmentRefs.push(id);
   sources.push({id,basis:'validated-school-registry',enrollmentId:entry.id,year:fromYear,status:entry.status??null,originalReason:entry.reason});
  }
 }
 // One currently effective committee finding per case. An overturned finding
 // stays in the original annual history/ending sources, but is not scored again.
 const committeeSources=sources.filter(s=>s.criterion==='competent-committee-finding'),committeeIds=new Set(committeeSources.flatMap(s=>s.historyIds)),committeeHistory=new Map(),latestCases=new Map();
 for(const h of r.history){if(committeeIds.has(h.id))committeeHistory.set(h.id,h);if(h.type==='institution'&&h.data.result?.rule)latestCases.set(h.data.result.id,h.data.result);}
 for(const source of committeeSources){
  const original=committeeHistory.get(source.historyIds[0])?.data.result;if(!original)continue;
  const latest=latestCases.get(original.id);if(latest&&(!equal(latest.decisionAt,original.decisionAt)||latest.finding!==original.finding)){
   const owner=reports.find(h=>h.id===source.annualId),summary=records.get(owner.data.evidence.summaryRef);
   records.set(summary.id,{...summary,evidenceRefs:summary.evidenceRefs.filter(id=>id!==source.id)});source.scoring='superseded-committee-finding';
  }
 }
 // New outcome kinds are narrow observations, using the existing N7 rubric.
 // Each underlying achievement has exactly one scoring owner. Final states are
 // already owned by N7 quality, so historical quality excludes year 30.
 function observe(h,kind,key,value,source,significant=false,subjectId=w.identity.playerId){
  const summary=records.get(h.data.evidence.summaryRef),header={provenance:'formal',playerId:w.identity.playerId,schoolId:w.identity.schoolId,year:h.data.year,attemptId:h.attemptId},factId=`career:${h.id}:${key}:fact`,id=`career:${h.id}:${key}`;
  put({id:factId,kind:'fact',...header,confirmed:true,subjectIds:[...new Set([w.identity.playerId,subjectId])]});
  put({id,kind,...header,factId,cohortId:summary.cohortId,subjectId,importance:1,responsibility:1,quality:value,completion:value,accountability:value,significant});
  // Never mutate the archived annual summary or its rating.
  records.set(summary.id,{...summary,evidenceRefs:[...summary.evidenceRefs,id]});sources.push({id,factId,annualId:h.id,...source});
 }
 // Sustained assigned teaching is a single career-scale responsibility outcome,
 // not thirty major incidents. Reuse its measured N7 quality, never volume or tenure.
 // Committee findings stay independent; annual significance/grades are untouched.
 if(reports.length===30){
  const deliverySources=[...new Map(sources.filter(s=>s.criterion==='assigned-lessons-with-confirmed-domain-results').map(s=>[s.id,s])).values()],delivery=deliverySources.map(s=>records.get(s.id));
  const reader=sourceReader({provenance:'formal',resolve:id=>records.get(id)});yearRefs.forEach(ref=>loadYear(reader,ref));
  if(delivery.length===30&&new Set(delivery.map(row=>row.year)).size===30&&delivery.every(row=>row.kind==='handling')&&!reader.missing.length){
   observe(reports[29],'handling','sustained-teaching',outcomeScore(delivery),{criterion:'thirty-year-confirmed-teaching-responsibility',outcomeRefs:delivery.map(row=>row.id)} ,true);
   const routineIds=new Set(delivery.map(row=>row.id));
   for(const ref of yearRefs){const summary=records.get(ref);records.set(ref,{...summary,evidenceRefs:summary.evidenceRefs.filter(id=>!routineIds.has(id))});}
  }
 }
 for(const h of reports){
  if(h.data.year<30)observe(h,'quality','historical-quality',mean(Object.values(h.data.end.states)),{criterion:'historical-six-state-endpoint',snapshotRef:h.data.end.id});
  observe(h,'continuity','legal-coverage',100*h.data.coverage.completed/h.data.coverage.slots,{criterion:'validated-legal-slot-coverage',coverageRef:h.id});
 }
 // Legal summers belong to the continuous career even though next year's
 // annual challenge opens in autumn. Compare already-saved relation witnesses;
 // score only interactions known to the player, never unobserved backstage drift.
 const knownFactIds=new Set();for(const f of r.facts)if(f.witnessIds.includes(w.identity.playerId))knownFactIds.add(f.id);
 const disclosed=new Map(r.disclosures.filter(d=>d.actorId===w.identity.playerId).map(d=>[d.factId,d.order]));
 for(const opening of r.history.filter(h=>h.type==='academic-opening')){
  const year=opening.data.annual.start.year,owner=reports.find(h=>h.data.year===year),previous=reports.find(h=>h.data.year===year-1);if(!owner||!previous)continue;
  const before=new Map(previous.data.endRelations.map(e=>[e.id,e])),after=new Map(opening.data.annual.relations.map(e=>[e.id,e])),groups=new Map();
  for(const h of r.history)if(h.order>previous.order&&h.order<opening.order&&h.type==='effect')for(const c of h.data.observed??[])if(c.target.kind==='relationship'&&after.has(c.target.id)){
   const rows=groups.get(c.target.id)??[];rows.push({h,c});groups.set(c.target.id,rows);
  }
  for(const [id,changes] of groups){
   const known=changes.filter(({h})=>h.factIds.some(id=>knownFactIds.has(id)||(disclosed.get(id)??Infinity)<=owner.order));if(!known.length)continue;
   const edge=after.get(id);let old=before.get(id)?.values;
   if(!old){old={...edge.values};for(const {c} of [...changes].reverse())old[c.code]=c.before;}
   const subject=edge.fromId===w.identity.playerId?edge.toId:edge.fromId;
   observe(owner,'relationship',`summer:${id}`,relationshipMetric(old,edge.values),{criterion:'observed-directed-relationship',nature:'recorded-directed-perception',direction:{fromId:edge.fromId,toId:edge.toId},historyIds:[...new Set(known.map(({h})=>h.id))],openingRef:opening.id,previousAnnualRef:previous.id},false,subject);
  }
 }
 // Protected activity cohesion outcomes are distinct from academic marks,
 // classroom order/cooperation, and committee handling. Delta is an actual N6 clamp.
 const activityOps=new Set(r.history.filter(h=>h.type==='campus'&&h.data.slot.activityIds.length).map(h=>h.operationId)),effectsByOperation=new Map();
 for(const h of r.history)if(h.type==='effect'&&activityOps.has(h.operationId)){const rows=effectsByOperation.get(h.operationId)??[];rows.push(...(h.data.observed??[]).filter(c=>c.target.kind==='classroom'&&c.code==='6-3'));effectsByOperation.set(h.operationId,rows);}
 for(const h of r.history)if(h.type==='campus'&&h.data.slot.activityIds.length){
  const owner=reports.find(report=>report.order>h.order);
  if(!owner||h.order>owner.order)continue;
  const changes=(effectsByOperation.get(h.operationId)??[]).filter(c=>c.target.kind==='classroom'&&c.code==='6-3');
  if(changes.length)observe(owner,'contribution',`activity:${h.id}`,mean(changes.map(c=>development(c.before,c.after))),{criterion:'protected-activity-cohesion-result',historyIds:[h.id],eventIds:h.data.operations.filter(o=>o.type==='open-event').map(o=>o.event.id)});
 }
 return {version:1,yearRefs,cohortRefs,records,sources,source:{provenance:'formal',resolve:id=>records.get(id)}};
}

/** Fixed prose fragments compose only already-established observations. Not an event engine. */
export function composeCareerEnding({rating,start,end,events=[],opinions=[],relationships=[],unresolved=[]}){
 const fragments=[{layer:'objective',text:'三十個學年的正式紀錄在這裡合攏；未結的事情沒有因此消失。',refs:[]}];
 const growing=ABILITY_NAMES.filter(n=>end.abilities[n]>start.abilities[n]);
 if(growing.length)fragments.push({layer:'objective',text:`與生涯起點相比，${growing.join('、')}有所成長。`,refs:[start.id,end.id]});
 if(end.states.精神<35||end.states.體力<30)fragments.push({layer:'objective',text:'最後留下的體力與精神紀錄，也記下了這段工作的消耗。',refs:[end.id]});
 if(growing.length&&end.states.聲望<40)fragments.push({layer:'objective',text:'能力的累積，沒有換來同樣高的聲望。',refs:[start.id,end.id]});
 for(const e of events.slice(0,10))fragments.push({layer:'known-fact',text:e.description,refs:[e.id]});
 for(const o of opinions.slice(0,10))fragments.push({layer:'subjective-known',text:o.statement,personId:o.sourceId,refs:[o.id,o.versionId]});
 for(const rel of relationships.slice(0,10))fragments.push({layer:'recorded-perception',text:`${rel.name}與教師之間留下${rel.quality>=70?'偏向支持':rel.quality<40?'緊張':'複雜'}的關係紀錄；這不是對事實的裁決。`,personId:rel.personId,refs:[rel.ref]});
 if(unresolved.length)fragments.push({layer:'known-unresolved',text:`仍有${unresolved.length}件已知事項未結，總評不替它們寫下結果。`,refs:unresolved.map(x=>x.id)});
 return {version:1,fragments,text:fragments.map(f=>f.text).join('\n'),grade:rating.grade};
}

export function compileCareerCompletion(w){
 const r=runtime(w);need(!careerResult(w),'already completed');
 const reports=r.history.filter(h=>h.type==='annual-success').sort((a,b)=>a.data.year-b.data.year);
 need(w.position.serviceYear===30&&reports.length===30&&reports.every((h,i)=>h.data.year===i+1&&h.data.status==='success'),'thirty legal successful years required');
 need(!r.history.some(h=>h.type==='annual-failure'&&h.data.year===30),'failed thirtieth year');
 const evidence=careerEvidence(w),rating=rateCareer({yearRefs:evidence.yearRefs,cohortRefs:evidence.cohortRefs},evidence.source);
 need(rating.status==='rated','formal N7 evidence is insufficient');
 const first=reports[0].data.evidence.records.find(x=>x.id===evidence.records.get(evidence.yearRefs[0]).startRef),end=reports[29].data.end;
 const known=new Set(r.disclosures.filter(d=>d.actorId===w.identity.playerId).map(d=>d.factId));
 const visible=f=>known.has(f.id)||f.witnessIds.includes(w.identity.playerId);
 const important=new Map();
 for(const h of r.history)if(h.type==='semester-review')for(const event of h.data.events){const old=important.get(event.eventId);if(!old||event.score>old.score)important.set(event.eventId,event);}
 const representatives=[...new Set([...important.values()].sort((a,b)=>(b.score??0)-(a.score??0)||String(a.eventId).localeCompare(String(b.eventId))).flatMap(e=>e.factIds))];
 const wantedFacts=new Set(representatives),facts=new Map(),knownEvents=new Set();
 for(const f of r.facts){if(wantedFacts.has(f.id))facts.set(f.id,f);if(visible(f))knownEvents.add(f.eventId);}
 const events=representatives.map(id=>facts.get(id)).filter(f=>f&&visible(f)).slice(0,10).map(f=>({id:f.id,eventId:f.eventId,description:f.description,subjectIds:[...f.subjectIds],at:structuredClone(f.occurredAt)}));
 const opinions=[];
 for(let i=r.knowledge.length-1;i>=0&&opinions.length<10;i--){const k=r.knowledge[i];if(k.actorId!==w.identity.playerId)continue;const c=r.claims.find(c=>c.id===k.claimId&&c.versionId===k.versionId);if(c)opinions.unshift({id:c.id,versionId:c.versionId,statement:c.statement,sourceId:c.sourceId});}
 // One stable person may retain contrasting observations over time; never expose raw NPC fields.
 const relationships=evidence.sources.filter(s=>s.criterion==='observed-directed-relationship'&&s.direction.fromId!==w.identity.playerId).map(s=>{const row=evidence.records.get(s.id);return {personId:row.subjectId,name:w.numeric.evolution.world.registry.profiles[row.subjectId]?.displayName??row.subjectId,ref:s.id,quality:row.quality};});
 const selected=[...relationships.filter(x=>x.quality>=70).slice(-5),...relationships.filter(x=>x.quality<40).slice(-5)];
 const states=new Map(r.history.filter(h=>h.type==='story').map(h=>[h.eventId,h]));
 const unresolved=[...states.values()].filter(h=>h.data.state.mode!=='ended'&&knownEvents.has(h.eventId)).map(h=>({id:h.id,eventId:h.eventId}));
 const academic=academicState(w);
 const ending=composeCareerEnding({rating,start:first,end,events,opinions,relationships:selected,unresolved});
 return {version:1,careerId:w.identity.careerId,years:30,at:structuredClone(w.position),annualIds:reports.map(h=>h.id),rating,
  cohorts:evidence.cohortRefs.map(id=>{const c=evidence.records.get(id),years=reports.filter(h=>c.years.includes(h.data.year)),archive=r.history.find(h=>h.type==='cohort-completion'&&h.data.classId===years[0].data.end.classroom.id);return {id,years:c.years,students:c.studentIds.length,classId:years[0].data.end.classroom.id,annualIds:years.map(h=>h.id),qualificationRef:archive?.id??null,qualification:cohortQualification(w,c.studentIds,archive,academic,years.at(-1).id)};}),
  abilities:Object.fromEntries(ABILITY_NAMES.map(n=>[n,{start:first.abilities[n],end:end.abilities[n],delta:end.abilities[n]-first.abilities[n]}])),states:structuredClone(end.states),
  people:selected.map(({quality,...p})=>p),events,opinions,unresolved,ending};
}
export function validateCareerCompletion(w){
 const r=runtime(w),entries=r.history.filter(h=>h.type==='career-completion'),requests=r.commits.filter(c=>JSON.parse(c.request).operations?.some(o=>o.type==='settle-career'||o.type==='settle-school-year'&&r.history.some(h=>h.type==='annual-success'&&h.data.year===30&&h.operationId===c.id)));
 need(entries.length<=1&&entries.length===requests.length,'missing or repeated completion');
 if(!entries.length)return;
 const h=entries[0],owner=requests[0],request=JSON.parse(owner.request);
 need(owner.id===h.operationId&&owner.attemptId===h.attemptId&&request.operations.length===1&&request.actorId===w.identity.playerId,'completion ownership differs');
 const before={...w,extensions:{...w.extensions,'teacher-hell/world':{...r,history:r.history.slice(0,h.order-1)}}};
 need(equal(compileCareerCompletion(before),h.data),'saved N7 completion or ending changed');
 need(!r.history.some(e=>e.order>h.order),'completed career is frozen');
}
export function readCareerCompletion(w){const h=careerResult(w);if(!h)return null;const {details,...rating}=h.data.rating;return {id:h.id,...structuredClone({...h.data,rating})};}

function cohortQualification(w,studentIds,archive,academic,lastAnnualId){
 if(archive)return {status:'archived',eligible:archive.data.outcomes.filter(o=>o.qualification.eligible).length,notYetEligible:archive.data.outcomes.filter(o=>!o.qualification.eligible).length,sourceRef:archive.id};
 const recorded=new Set(Object.values(academic.terms).flatMap(t=>(t.results??[]).map(r=>r.id)));
 if(!studentIds.every(id=>recorded.has(id)))return {status:'unavailable',eligible:null,notYetEligible:null,sourceRef:lastAnnualId};
 const rows=studentIds.map(id=>readAcademicQualification(w,id,academic));
 return {status:'current-qualification',eligible:rows.filter(q=>q.eligible).length,notYetEligible:rows.filter(q=>!q.eligible).length,sourceRef:lastAnnualId};
}

/** Semantic validation for the compact transport, reusing N7's grading contract. */
export function validateCareerSummary(d){
 need(Number.isFinite(d.score)&&d.score>=0&&d.score<=100&&d.grade===gradeForScore(d.score),'invalid compact N7 score/grade');
 assertShape(d.parts,Object.keys(CAREER_LIMITS));
 need(Object.entries(d.parts).every(([k,v])=>Number.isFinite(v)&&v>=0&&v<=CAREER_LIMITS[k])&&Math.abs(Object.values(d.parts).reduce((a,b)=>a+b,0)-d.score)<1e-10,'compact N7 parts differ');
 assertShape(d.abilities,ABILITY_NAMES);assertShape(d.states,STATE_NAMES);
 for(const row of Object.values(d.abilities)){assertShape(row,['start','end','delta']);need([row.start,row.end].every(v=>Number.isFinite(v)&&v>=0&&v<=100)&&row.delta===row.end-row.start,'invalid compact ability comparison');}
 need(Object.values(d.states).every(v=>Number.isFinite(v)&&v>=0&&v<=100),'invalid compact state');
 need(d.completedAt?.serviceYear===30&&typeof d.completedAt.date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d.completedAt.date)&&typeof d.completedAt.slotId==='string','invalid completion moment');
 need(Array.isArray(d.cohorts)&&d.cohorts.length===10&&new Set(d.cohorts.map(c=>c.id)).size===10,'ten distinct compact cohorts required');
 for(const [i,c] of d.cohorts.entries())need(Array.isArray(c.years)&&c.years.length===3&&c.years.every((y,j)=>y===i*3+j+1)&&Number.isInteger(c.students)&&c.students>0,'invalid compact cohort');
 return d;
}
