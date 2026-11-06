import { aftercareOwnsSlot } from './aftercare-calendar.js';
/** Saved semester reports. History is the authority; viewing never samples or settles. */
import { ABILITY_NAMES, assertShape } from '../player/panel.js';
import { deriveWorldPanel } from '../social/reputation.js';
import { applyDelta } from '../numeric/math.js';
import { canonicalData } from '../changes/settlement.js';
import { planMode,careerRange, calendarDay, gradeAt, cursorFor, positionFor } from '../calendar/calendar.js';

export const REVIEW_KEY='teacher-hell/semester-reviews';
const runtime=w=>w.extensions['teacher-hell/world'];
const need=(ok,message)=>{if(!ok)throw new RangeError(message);};
const equal=(a,b)=>canonicalData(a)===canonicalData(b);
const abilities=w=>{const p=deriveWorldPanel(w.numeric.evolution.world);return Object.fromEntries(ABILITY_NAMES.map(n=>[n,p[n]]));};
const reports=w=>runtime(w).history.filter(h=>h.type==='semester-review');
const reads=w=>runtime(w).history.filter(h=>h.type==='semester-review-read');

/** Opt-in initialization only at the untouched, real first summer opening. Existing
 * engineering date baselines must not be presented as completed semester play. */
export function initializeSemesterReviews(world){
 const r=runtime(world),range=careerRange(r.plan.startYear,planMode(r.plan));
 need(!world.extensions[REVIEW_KEY]&&['fixed-calendar-v1','fixed-calendar-v2'].includes(r.plan.validation),'Formal initial calendar required');
 need(world.position.date===range.start&&world.position.slotId==='early'&&r.revision===1&&r.history.length===1&&r.history[0].type==='school'&&r.history[0].data.change.type==='school-initialize','Initialize reviews before the first world action');
 world.extensions[REVIEW_KEY]={version:1,at:{date:world.position.date,slotId:world.position.slotId},cursor:r.plan.cursor,abilities:abilities(world)};
 return world;
}
export function pendingSemesterReview(world){
 if(!world.extensions[REVIEW_KEY])return null;
 const read=new Set(reads(world).map(h=>h.data.reviewId));
 return reports(world).find(h=>!read.has(h.id))??null;
}

/** Presentation-only importance rubric v1. New developments count once per event:
 * a choice 3, a result 2, each new causal fact 1 (cap 3), participants cap 2,
 * and bounded magnitude of actual effects cap 2. Threshold 5; no sign/age bonus.
 * Previous-term developments never add points to a later term. */
export function representativeEvents(world,fromOrder,untilOrder){
 const r=runtime(world),groups=new Map();
 for(const h of r.history){
  if(h.order<=fromOrder||h.order>untilOrder||!h.eventId)continue;
  // Only actual developments; merely mentioning/admitting an event is insufficient.
  if(!['choice','result','fact','effect','stage'].includes(h.type))continue;
  const group=groups.get(h.eventId)??[];group.push(h);groups.set(h.eventId,group);
 }
 const candidates=[];
 for(const [eventId,entries] of groups){
  const event=world.events.find(e=>e.id===eventId);
  const facts=r.facts.filter(f=>f.eventId===eventId&&entries.some(h=>h.factIds.includes(f.id)));
  const known=facts.filter(f=>f.witnessIds.includes(world.identity.playerId)||r.disclosures.some(d=>d.factId===f.id&&d.actorId===world.identity.playerId&&d.order<=untilOrder));
  if(!known.length)continue;
  const choice=entries.some(h=>h.type==='choice'),result=entries.some(h=>h.type==='result');
  const affected=new Set(known.flatMap(f=>f.subjectIds));
  const magnitude=entries.filter(h=>h.type==='effect').flatMap(h=>h.data.observed??[]).reduce((sum,c)=>sum+Math.abs(c.after-c.before||0),0);
  const score=(choice?3:0)+(result?2:0)+Math.min(3,known.length)+Math.min(2,Math.max(0,affected.size-1))+Math.min(2,magnitude/10);
  if(score<5)continue;
  candidates.push({eventId,score,historyIds:entries.map(h=>h.id),factIds:known.map(f=>f.id),summary:known.at(-1).description,participantIds:event.participantIds.filter(id=>affected.has(id))});
 }
 candidates.sort((a,b)=>b.score-a.score||a.eventId.localeCompare(b.eventId));
 const cutoff=candidates.length>10?candidates[9].score:5;
 return candidates.filter(c=>c.score>=cutoff);
}

/** Called after finish-slot and all legal consequences, before publication. */
export function semesterReviewData(world){
 const baseline=world.extensions[REVIEW_KEY];if(!baseline)return null;
 const r=runtime(world),day=calendarDay(world.position.date,gradeAt(world.position.date,r.plan.startYear),r.plan.calendarVersion);
 if(!day.finalReview||day.slots.at(-1).id!==world.position.slotId||!r.history.some(h=>h.type==='slot-complete'&&h.cursor===r.plan.cursor))return null;
 const previous=reports(world).at(-1),periodId=world.position.statisticsPeriodId;
 if(reports(world).some(h=>h.data.periodId===periodId))return null;
 need(!pendingSemesterReview(world),'Read the previous semester report first');
 need(!world.events.some(e=>{const story=r.history.findLast(h=>h.type==='story'&&h.eventId===e.id)?.data.state;return e.choice&&e.choice.confirmedOptionId===null||story&&story.mode!=='ended'&&(story.mode!=='waiting'||story.dueDate<=world.position.date); }),'Finish pending story presentation/decisions before the semester report');
 const start=previous?.data.end??baseline.abilities,end=abilities(world),fromOrder=previous?.order??1,untilOrder=r.history.length;
 return {version:1,periodId,from:previous?.at??baseline.at,fromOrder,untilOrder,start,end,delta:Object.fromEntries(ABILITY_NAMES.map(n=>[n,end[n]-start[n]])),events:representativeEvents(world,fromOrder,untilOrder),summary:'本期紀錄已保存；假期與尚未結束的事項依原時間繼續。'};
}
export function readSemesterReviews(world){
 const read=new Set(reads(world).map(h=>h.data.reviewId));
 return reports(world).map(h=>({id:h.id,periodId:h.data.periodId,at:structuredClone(h.at),attemptId:h.attemptId,status:read.has(h.id)?'read':'unread',abilities:Object.fromEntries(ABILITY_NAMES.map(n=>[n,{start:h.data.start[n],end:h.data.end[n],delta:h.data.delta[n]}])),events:h.data.events.map(({score,...entry})=>structuredClone(entry)),summary:h.data.summary}));
}
export function acknowledgeSemesterReview(world,op){
 assertShape(op,['type','reviewId']);need(world.extensions[REVIEW_KEY],'Semester reviews are not initialized');
 const report=reports(world).find(h=>h.id===op.reviewId);need(report,'Unknown saved semester report');
 need(!reads(world).some(h=>h.data.reviewId===op.reviewId),'Semester report already read');
 return {reviewId:op.reviewId};
}
export function validateSemesterReviews(world){
 const initial=world.extensions[REVIEW_KEY],r=runtime(world);if(!initial){need(!r.history.some(h=>['semester-review','semester-review-read'].includes(h.type)),'Report baseline missing');return;}
 assertShape(initial,['version','at','cursor','abilities']);assertShape(initial.abilities,ABILITY_NAMES);
 need(initial.version===1&&['fixed-calendar-v1','fixed-calendar-v2'].includes(r.plan.validation)&&initial.at.date===careerRange(r.plan.startYear,planMode(r.plan)).start&&initial.at.slotId==='early'&&initial.cursor===cursorFor(initial.at.date,initial.at.slotId,r.plan.startYear,r.plan.calendarVersion),'Invalid semester baseline');
 need(Object.values(initial.abilities).every(n=>Number.isFinite(n)&&n>=0&&n<=100),'Invalid initial abilities');
 // Observed effects must refer to the same N6 fields and reproduce actual clamps.
 for(const h of r.history.filter(h=>h.type==='effect')){
  const expected=new Map();
  for(const change of h.data.changes){const k=canonicalData([change.target,change.code]);const row=expected.get(k)??[];row.push(change.delta);expected.set(k,row);}
  need(Array.isArray(h.data.observed)&&h.data.observed.length===expected.size,'Missing observed effect fields');
  const observed=new Set();
  for(const row of h.data.observed){const k=canonicalData([row.target,row.code]),deltas=expected.get(k);need(deltas&&!observed.has(k)&&Number.isFinite(row.before)&&row.before>=0&&row.before<=100&&Number.isFinite(row.after),'Invalid observed effect');observed.add(k);need(row.after===deltas.reduce((n,delta)=>applyDelta(n,delta),row.before),'Observed effect differs from N6 clamp');}
 }
 const seen=new Set();let previous=null;
 for(const h of reports(world)){
  const owner=r.commits.find(c=>c.id===h.operationId&&c.attemptId===h.attemptId);
  need(aftercareOwnsSlot(world,h)||JSON.parse(owner.request).operations.some(op=>['finish-slot','school-action'].includes(op.type)),'Report lacks a slot-completion command');
  const d=h.data;assertShape(d,['version','periodId','from','fromOrder','untilOrder','start','end','delta','events','summary']);
  for(const field of ['start','end','delta'])assertShape(d[field],ABILITY_NAMES);
  const day=calendarDay(h.at.date,gradeAt(h.at.date,r.plan.startYear),r.plan.calendarVersion);
  need(d.periodId===positionFor(h.at.date,h.at.slotId,r.plan.startYear,planMode(r.plan),r.plan.calendarVersion).statisticsPeriodId,'Report statistics period differs from calendar');
  need(d.version===1&&!seen.has(d.periodId)&&day.finalReview&&h.at.slotId===day.slots.at(-1).id,'Repeated or misplaced semester report');seen.add(d.periodId);
  need(r.history[h.order-2]?.type==='slot-complete'&&r.history[h.order-2].cursor===h.cursor&&d.untilOrder===h.order-1,'Report must immediately follow slot completion');
  need(d.fromOrder===(previous?.order??1)&&equal(d.from,previous?.at??initial.at)&&equal(d.start,previous?.data.end??initial.abilities),'Broken semester comparison chain');
  need(ABILITY_NAMES.every(n=>Number.isFinite(d.end[n])&&d.end[n]>=0&&d.end[n]<=100&&d.delta[n]===d.end[n]-d.start[n]),'Invalid saved semester comparison');
  need(equal(d.events,representativeEvents(world,d.fromOrder,d.untilOrder)),'Report event references or importance changed');
  previous=h;
 }
 const acknowledged=new Set();
 for(const h of reads(world)){const owner=r.commits.find(c=>c.id===h.operationId&&c.attemptId===h.attemptId);need(JSON.parse(owner.request).actorId===world.identity.playerId,'Only the player can acknowledge a report');assertShape(h.data,['reviewId']);const report=reports(world).find(p=>p.id===h.data.reviewId);need(report&&report.order<h.order&&!acknowledged.has(report.id),'Invalid repeated report acknowledgment');acknowledged.add(report.id);}
}
