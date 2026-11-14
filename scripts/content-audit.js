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
 const supplied=record.editorial??{},missing=REQUIRED_EDITORIAL.filter(k=>!trim(supplied[k]));
 // Legacy 17-D samples predate the editorial manifest; a premise is not
 // enough to claim that an independent AI meaning review has happened.
 const review=record.editorialReview??null;
 const approved=review?.verdict==='approved'&&trim(review.rationale).length>=20&&trim(review.reviewer).length>0;
 return {fieldsComplete:missing.length===0,missing,reviewed:approved,
  reviewRequired:!approved,reviewNotes:approved?review.rationale:null};
}
/** Only cross-story editorial causes are compared; never mistake multiple
 * legitimate outcomes of ONE option for duplicate content entries. */
function collisionCandidates(rows,{threshold=.86}={}){
 const results=[];
 for(let i=0;i<rows.length;i++)for(let j=0;j<i;j++){
  const a=rows[i],b=rows[j];
  if(!a.story||!b.story)continue;
  const ea=a.editorial??{},eb=b.editorial??{};
  const causeA=trim(ea.cause)||trim(a.story.premise?.description);
  const causeB=trim(eb.cause)||trim(b.story.premise?.description);
  if(!causeA||!causeB)continue;
  const causeScore=dice(causeA,causeB);
  const responsibilityScore=ea.teacherResponsibility&&eb.teacherResponsibility?
   dice(ea.teacherResponsibility,eb.teacherResponsibility):null;
  const sameCause=normalize(causeA)===normalize(causeB);
  if(!sameCause&&causeScore<threshold)continue;
  results.push({
   ids:[label(b,j),label(a,i)],topics:[b.story.topicId,a.story.topicId],
   causeSimilarity:Number(causeScore.toFixed(3)),
   responsibilitySimilarity:responsibilityScore===null?null:Number(responsibilityScore.toFixed(3)),
   reason:sameCause?'identical-objective-cause':'very-similar-objective-cause',
   action:'semantic-review-not-auto-delete'
  });
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
 for(const stage of story.stages??[])for(const option of optionsOf(stage)){
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
export function auditContent(records,{catalogueDefinitions=[],similarityThreshold=.86}={}){
 if(!Array.isArray(records))throw new TypeError('records must be an array');
 const seen={resourceId:new Set(),definitionId:new Set()},items=records.map((x,i)=>checkEntry(x,i,catalogueDefinitions,seen));
 const duplicates=collisionCandidates(records,{threshold:similarityThreshold});
 const flagged=new Set(duplicates.flatMap(x=>x.ids));
 for(const item of items)if(flagged.has(item.id))item.warnings.push('similarity: inspect possible repeated causal premise');
 const byTopic=Object.fromEntries(V2_EVENT_TOPICS.map(t=>[t.id,{
  name:t.name,minimum:20,authored:0,structurallyValid:0,reviewed:0,
  resolverReady:0,catalogueReady:0,remainingToMinimum:20
 }]));
 for(const item of items){
  const entry=byTopic[item.topicId];if(!entry)continue;
  entry.authored++;
  if(item.structuralPass)entry.structurallyValid++;
  if(item.structuralPass&&item.semanticReview.reviewed)entry.reviewed++;
  if(item.registeredResource)entry.resolverReady++;
  if(item.alreadyInCatalogue)entry.catalogueReady++;
 }
 for(const entry of Object.values(byTopic))entry.remainingToMinimum=Math.max(0,entry.minimum-entry.authored);
 return {version:1,scope:'offline-content-review-only',minimumPerTopic:20,maximumPerTopic:null,
  topics:128,authored:records.length,structurallyValid:items.filter(x=>x.structuralPass).length,
  semanticReviewed:items.filter(x=>x.structuralPass&&x.semanticReview.reviewed).length,
  resolverReady:items.filter(x=>x.registeredResource).length,
  catalogueReady:items.filter(x=>x.alreadyInCatalogue).length,
  // These figures MUST NOT be mistaken for already live in game campaigns.
  publishedInNewCareers:'not-assessed',
  duplicates,items,byTopic,
  note:'Multiple genuinely different outcomes under the same event and option are allowed and encouraged. Semantic review and real campaign publication require separate evidence.'};
}
