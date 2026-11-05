/** EXPLICIT CONTRACT DOUBLE: 30 N7 annual evidence collections and a tiny journal.
 * Not a valid runtime world/save, never passed off as natural 30-year gameplay.
 * Uses simulation/fixtures N7 schema. Production restore MUST reject this object. */
import { fixture } from '../../simulation/fixtures.js';
export function completionContract({years=30,quality=80,before=40,after=80}={}){
 const f=fixture(years,quality,before,after),history=[],cohorts=[],enrollments=[],profiles={},facts=[];
 for(let c=0;c<Math.ceil(years/3);c++){
  const cohort=f.records.get(`cohort:${c}`);cohorts.push({id:cohort.id,classId:`class:${cohort.id}`,startYear:2026+c*3});
  for(const id of cohort.studentIds){profiles[id]={displayName:id};enrollments.push({id:`enrollment:${id}`,personId:id,classId:`class:${cohort.id}`,from:`${2026+c*3}-07-20`,until:null,reason:'initial'});}
 }
 for(let y=1;y<=years;y++){
  const summary=structuredClone(f.records.get(`year:${y}`)),all=[...f.records.values()].filter(r=>r.year===y||r.id===summary.cohortId).map(r=>structuredClone(r)),sources=[];
  for(const r of all)r.provenance='formal';
  summary.provenance='formal';summary.evidenceRefs=summary.evidenceRefs.filter(id=>!['quality','continuity','contribution'].some(k=>id.endsWith(':'+k)));
  const records=all.filter(r=>!['quality','continuity','contribution'].includes(r.kind)&&r.id!==summary.id);records.push(summary);
  for(const row of records.filter(r=>['handling','student','relationship'].includes(r.kind)))sources.push({id:row.id,factId:row.factId,criterion:row.kind==='handling'?'competent-committee-finding':row.kind==='student'?'recorded-academic-marks-credits-attendance':'observed-directed-relationship',direction:{fromId:'teacher',toId:row.subjectId},historyIds:[],eventIds:[],factIds:[]});
  const operationId=`activity-op:${y}`,at={date:`${2026+y-1}-09-01`,slotId:'p1'};
  history.push({id:`activity:${y}`,type:'campus',order:history.length+1,operationId,at,data:{slot:{activityIds:['sports']},operations:[]}});
  history.push({id:`effect:${y}`,type:'effect',order:history.length+1,operationId,at,data:{observed:[{target:{kind:'classroom'},code:'6-3',before,after}]}});
  const end=records.find(r=>r.id===summary.endRef);
  history.push({id:`annual:${y}`,type:'annual-success',order:history.length+1,at,attemptId:`attempt:${y}`,data:{version:1,year:y,attemptId:`attempt:${y}`,status:'success',at:{...at,serviceYear:y},end,evidence:{summaryRef:summary.id,records,sources},coverage:{slots:100,completed:100}}});
 }
 return {contractOnly:true,identity:{careerId:'contract-career',playerId:'teacher',schoolId:'school',attemptId:`attempt:${years}`},position:{serviceYear:years,date:'2056-06-30',slotId:'private'},numeric:{evolution:{world:{registry:{cohorts,enrollments,profiles}}}},extensions:{'teacher-hell/world':{plan:{startYear:2026},history,facts,claims:[],knowledge:[],disclosures:[],commits:[]}}};
}
