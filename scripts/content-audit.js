/** Phase 18-A: read-only content production audit.
 * Content is NOT published, admitted, randomized, or applied to saves here.
 * Use the authoritative story/event contracts; semantic similarity remains
 * a REVIEW CANDIDATE, never an automatic deletion or proof of quality.
 */
import {validateStory,validateStoryReference,resolveStory} from '../src/runtime/story-content.js';
import {validateEventDefinitions} from '../src/runtime/event-candidates.js';
import {V2_EVENT_TOPICS} from '../src/runtime/topics.js';

const REQUIRED_EDITORIAL=['cause','teacherResponsibility','knowledgeSource','distinctiveConsequence'];
const validTopics=new Map(V2_EVENT_TOPICS.map(t=>[t.id,t.name]));
const trim=v=>typeof v==='string'?v.trim():'';
const normalize=v=>trim(v).normalize('NFKC').toLowerCase().replace(/[\s\p{P}\p{S}]+/gu,'');
function bigrams(value){
 const chars=[...normalize(value)];
 if(chars.length<2)return new Set(chars);
 return new Set(chars.slice(1).map((c,i)=>chars[i]+c));
}
function dice(a,b){
 const aa=bigrams(a),bb=bigrams(b);
 if(!aa.size||!bb.size)return 0;
 let overlap=0;for(const v of aa)if(bb.has(v))overlap++;
 return 2*overlap/(aa.size+bb.size);
}
const optionsOf=s=>s.choices.flatMap(c=>[c,...(c.replacement?[c.replacement]:[])]);
const outcomesOf=o=>o.variants?.length?o.variants.map(v=>v.outcome):[o.outcome];
const variantSignature=o=>JSON.stringify([
 o.fact,o.claims,o.changes,o.historyCodes,o.next,
 o.academic??null,o.entrance??null,o.institution??null,o.duty??null
]);
const label=(record,i)=>record?.story?.resourceId??'item-'+(i+1);
function editorial(record){
 const supplied=record?.editorial??{},missing=REQUIRED_EDITORIAL.filter(k=>!trim(supplied[k]));
 // Legacy 17-D samples predate the editorial manifest; a premise is not
 // enough to claim that an independent AI meaning review has happened.
 const review=record?.editorialReview??null;
 const approved=review?.verdict==='approved'&&trim(review.rationale).length>=20&&trim(review.reviewer).length>0;
 return {fieldsComplete:missing.length===0,missing,reviewed:approved,
  reviewRequired:!approved,reviewNotes:approved?review.rationale:null};
}
/** Only cross-story editorial causes are compared; never mistake multiple
 * legitimate outcomes of ONE option for duplicate content entries. */
/** Inverted bigram index: compare only pairs sharing cause fragments.
 * Avoid rebuilding thousands of bigram sets for every pair in a 2560+ corpus.
 * This is candidate discovery, NOT a semantic equivalence decision.
 */
function collisionCandidates(rows,{threshold=.86,minNewIndex=0}={}){
 if(!(threshold>0&&threshold<=1))throw new RangeError('similarity threshold must be in (0,1]');
 const results=[],seen=new Map(),descriptions=[];
 for(let i=0;i<rows.length;i++){
  const record=rows[i],cause=trim(record?.editorial?.cause)||trim(record?.story?.premise?.description);
  const normalized=normalize(cause),tokens=bigrams(normalized);
  const candidateScores=new Map();
  for(const token of tokens)for(const j of seen.get(token)??[])
   candidateScores.set(j,(candidateScores.get(j)??0)+1);
  for(const [j,overlap] of candidateScores){
   const older=descriptions[j];
   if(!older?.normalized)continue;
   const score=2*overlap/(tokens.size+older.tokens.size);
   if(score<threshold||i<minNewIndex)continue;
   const other=rows[j],oldCause=older.normalized;
   const responsibilityA=record?.editorial?.teacherResponsibility;
   const responsibilityB=other?.editorial?.teacherResponsibility;
   const responsibilityScore=responsibilityA&&responsibilityB?dice(responsibilityA,responsibilityB):null;
   results.push({
    ids:[label(other,j),label(record,i)],topics:[other.story.topicId,record.story.topicId],
    causeSimilarity:Number(score.toFixed(3)),
    responsibilitySimilarity:responsibilityScore===null?null:Number(responsibilityScore.toFixed(3)),
    reason:normalized===oldCause?'identical-objective-cause':'very-similar-objective-cause',
    action:'semantic-review-not-auto-delete'
   });
  }
  descriptions.push({normalized,tokens});
  for(const token of tokens){
   const posting=seen.get(token)??[];posting.push(i);seen.set(token,posting);
  }
 }
 return results;
}
function checkEntry(record,i,available,seen){
 const errors=[],warnings=[],id=label(record,i),story=record?.story,definition=record?.definition;
 if(!story||typeof story!=='object')return {id,topicId:null,structuralPass:false,registeredResource:false,alreadyInCatalogue:false,semanticReview:editorial(record),errors:['missing story'],warnings:[]};
 const fail=(stage,e)=>errors.push(stage+': '+(e?.message??String(e)));
 try{validateStory(story);}catch(e){fail('story',e);}
 if(!validTopics.has(story.topicId))errors.push('topic: must be one of the new 128 T-coded themes');
 for(const field of ['resourceId','definitionId']){
  if(seen[field].has(story[field]))errors.push(field+': duplicate immutable identity '+story[field]);
  seen[field].add(story[field]);
 }
 if(!definition)errors.push('definition: missing official candidate definition');
 else{
  try{validateEventDefinitions([definition]);}catch(e){fail('definition',e);}
  if(definition.id!==story.definitionId||definition.topicId!==story.topicId||
     definition.content?.resourceId!==story.resourceId||
     definition.content?.version!==story.version||
     definition.content?.status!==story.status)errors.push('reference: story and event definition identities do not agree');
 }
 for(const stage of Array.isArray(story.stages)?story.stages:[])for(const option of Array.isArray(stage.choices)?optionsOf(stage):[]){
  if(!option.variants?.length)continue;
  const signatures=option.variants.map(v=>variantSignature(v.outcome));
  if(new Set(signatures).size<2)warnings.push('outcome: '+stage.id+'/'+option.id+' has multiple weighted variants with identical actual consequences');
 }
 let registeredResource=false,alreadyInCatalogue=false;
 if(!errors.length&&definition){
  try{
   const resolved=resolveStory({resourceId:story.resourceId,version:story.version});
   registeredResource=resolved===story||JSON.stringify(resolved)===JSON.stringify(story);
   if(registeredResource)validateStoryReference(definition);
  }catch(e){warnings.push('resource: valid draft is not yet wired to the current immutable resolver');}
  if(registeredResource){
   const matches=available.filter(d=>d.id===definition.id&&d.content?.resourceId===story.resourceId&&d.content?.version===story.version);
   alreadyInCatalogue=matches.length===1;
  }
 }
 const semanticReview=editorial(record);
 if(!semanticReview.fieldsComplete)warnings.push('editorial: missing '+semanticReview.missing.join(', '));
 if(!semanticReview.reviewed)warnings.push('editorial: independent contextual quality review remains outstanding');
 return {id,topicId:story.topicId,structuralPass:errors.length===0,
  registeredResource,alreadyInCatalogue,semanticReview,errors,warnings};
}
/** records: [{story,definition,editorial?,editorialReview?}]
 * catalogueDefinitions may include a known catalogue, but "available" means
 * registration CAN be requested; it never means every career already has it.
 */
export function auditContent(records,{catalogueDefinitions=[],similarityThreshold=.86,referenceRecords=[]}={}){
 if(!Array.isArray(records))throw new TypeError('records must be an array');
 if(!Array.isArray(referenceRecords))throw new TypeError('referenceRecords must be an array');
 const seen={resourceId:new Set(),definitionId:new Set()},items=records.map((x,i)=>checkEntry(x,i,catalogueDefinitions,seen));
 // Cross-batch comparison: references are read-only context, never counted as new output.
 // New records are appended after reference rows; report only pairs where the later
 // record is new. New records are also compared against each other.
 const duplicates=collisionCandidates([...referenceRecords,...records],{
  threshold:similarityThreshold,minNewIndex:referenceRecords.length
 });
 const flagged=new Set(duplicates.flatMap(x=>x.ids));
 for(const item of items)if(flagged.has(item.id))item.warnings.push('similarity: inspect possible repeated causal premise');
 const byTopic=Object.fromEntries(V2_EVENT_TOPICS.map(t=>[t.id,{
  name:t.name,minimum:20,authored:0,structurallyValid:0,reviewed:0,
  resolverReady:0,catalogueReady:0,remainingToMinimum:20,remainingDraftToMinimum:20,remainingValidatedToMinimum:20,remainingReviewedToMinimum:20
 }]));
 for(const item of items){
  const entry=byTopic[item.topicId];if(!entry)continue;
  entry.authored++;
  if(item.structuralPass)entry.structurallyValid++;
  if(item.structuralPass&&item.semanticReview.reviewed)entry.reviewed++;
  if(item.registeredResource)entry.resolverReady++;
  if(item.alreadyInCatalogue)entry.catalogueReady++;
 }
 for(const entry of Object.values(byTopic)){
  entry.remainingDraftToMinimum=Math.max(0,entry.minimum-entry.authored);
  entry.remainingValidatedToMinimum=Math.max(0,entry.minimum-entry.structurallyValid);
  entry.remainingReviewedToMinimum=Math.max(0,entry.minimum-entry.reviewed);
  // Formal completed count may include only individually reviewed, valid stories.
  entry.remainingToMinimum=entry.remainingReviewedToMinimum;
 }
 return {version:1,scope:'offline-content-review-only',minimumPerTopic:20,maximumPerTopic:null,
  referenceRecordsCompared:referenceRecords.length,
  topics:128,authored:records.length,structurallyValid:items.filter(x=>x.structuralPass).length,
  semanticReviewed:items.filter(x=>x.structuralPass&&x.semanticReview.reviewed).length,
  resolverReady:items.filter(x=>x.registeredResource).length,
  catalogueReady:items.filter(x=>x.alreadyInCatalogue).length,
  // These figures MUST NOT be mistaken for already live in game campaigns.
  publishedInNewCareers:'not-assessed',
  duplicates,items,byTopic,
  note:'Multiple genuinely different outcomes under the same event and option are allowed and encouraged. Semantic review and real campaign publication require separate evidence.'};
}
