import { numericValue, weightedMean, clamp, probability } from '../numeric/math.js';

export const ANNUAL_LIMITS=Object.freeze({handling:35,students:25,relationships:15,states:15,growth:10});
export const CAREER_LIMITS=Object.freeze({handling:30,cohorts:25,relationships:15,growth:15,quality:10,contribution:5});
export function gradeForScore(score) {
  numericValue(score);
  return score>=95?'SS':score>=90?'S':score>=80?'A':score>=70?'B':score>=60?'C':score>=50?'D':score>=40?'E':'F';
}
/** Level plus actual change: no headroom division and no automatic low-start bonus. */
export function development(before,after) {
  numericValue(before);numericValue(after);
  return weightedMean([after,clamp(50+(after-before)/2)],[7,3]);
}
export function mean(values) {return weightedMean(values,values.map(()=>1));}
const rubric=Object.freeze({handling:[5,3,2],student:[5,4,1],relationship:[4,4,2],quality:[5,2,3],continuity:[3,5,2],contribution:[6,2,2]});
export const OUTCOME_KINDS=Object.freeze(Object.keys(rubric));
/** Normalize responsibility/importance; adding identical-volume work cannot sum points. */
export function outcomeScore(rows) {
  const weights=rows.map(row=>{
    probability(row.importance);probability(row.responsibility);
    const weight=row.importance*row.responsibility;
    if(weight===0) throw new RangeError('Positive representable responsibility weight required');
    return weight;
  });
  const significant=[],ordinary=[];
  rows.forEach((row,i)=>{(row.significant?significant:ordinary).push({row,weight:weights[i]});});
  const pools=[significant,ordinary].filter(pool=>pool.length);
  return weightedMean(pools.map(pool=>weightedMean(pool.map(({row})=>weightedMean([row.quality,row.completion,row.accountability],rubric[row.kind])),pool.map(x=>x.weight))),pools.map(pool=>pool===significant?3:1));
}
export function scoredResult(provenance,limits,metrics,details) {
  const parts=Object.fromEntries(Object.entries(limits).map(([key,limit])=>{
    numericValue(metrics[key]);return [key,metrics[key]*limit/100];
  }));
  // Reuse N1 compensated weighted arithmetic instead of separately rounding sub-scores.
  const score=weightedMean(Object.keys(limits).map(k=>metrics[k]),Object.values(limits));
  return {status:provenance==='synthetic'?'synthetic':'rated',provenance,score,grade:gradeForScore(score),parts,metrics,details};
}
