#!/usr/bin/env node
/** Phase 18-A read-only content audit.
 * Default pilots the three existing 17-D stories, not a fabricated 2560 set.
 * External JSON accepts a record array or {records:[...]} without executing it.
 */
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {auditContent} from './content-audit.js';
import {PHASE17D_READY_STORIES,phase17dSampleCatalogue} from '../src/runtime/story-content.js';
const args=process.argv.slice(2);
const option=name=>{const i=args.indexOf(name);return i===-1?null:args[i+1]??null;};
if(args.includes('--help')){
 console.log('node scripts/audit-content.mjs [--input records.json] [--baseline previous-records.json] [--output report.json] [--strict]');
 console.log('records.json = {records:[{story,definition,editorial?,editorialReview?}]}');
 process.exit(0);
}
const catalogue=phase17dSampleCatalogue();
let records;
if(option('--input')){
 const parsed=JSON.parse(await readFile(resolve(option('--input')),'utf8'));
 records=Array.isArray(parsed)?parsed:parsed.records;
 if(!Array.isArray(records))throw new TypeError('input must be an array or {records:array}');
}else{
 records=PHASE17D_READY_STORIES.map(story=>({
  story,
  definition:catalogue.definitions.find(d=>d.id===story.definitionId)
 }));
}
// Baseline supplies prior batches as comparison context only, not new production counts.
let referenceRecords=[];
if(option('--baseline')){
 const parsed=JSON.parse(await readFile(resolve(option('--baseline')),'utf8'));
 referenceRecords=Array.isArray(parsed)?parsed:parsed.records;
 if(!Array.isArray(referenceRecords))throw new TypeError('baseline must be an array or {records:array}');
}
const report=auditContent(records,{catalogueDefinitions:catalogue.definitions,referenceRecords});
const summary={
 scope:report.scope,
 topics:report.topics,
 authored:report.authored,
 referenceRecordsCompared:report.referenceRecordsCompared,
 structurallyValid:report.structurallyValid,
 semanticReviewed:report.semanticReviewed,
 resolverReady:report.resolverReady,
 catalogueReady:report.catalogueReady,
 publishedInNewCareers:report.publishedInNewCareers,
 minimumPerTopic:report.minimumPerTopic,
 maximumPerTopic:report.maximumPerTopic,
 possibleDuplicatePairs:report.duplicates.length,
 invalid:report.items.filter(x=>!x.structuralPass).map(x=>({id:x.id,errors:x.errors})),
 itemsNeedingSemanticReview:report.items.filter(x=>x.semanticReview.reviewRequired).length
};
console.log(JSON.stringify(summary,null,2));
if(option('--output')){
 const file=resolve(option('--output'));
 await mkdir((await import('node:path')).dirname(file),{recursive:true});
 await writeFile(file,JSON.stringify(report,null,2)+'\n','utf8');
 console.log('Full report: '+file);
}
if(args.includes('--strict')&&(summary.invalid.length||report.duplicates.length||summary.itemsNeedingSemanticReview)){
 console.error('CONTENT_AUDIT: strict review gate not passed (a semantic reviewer must approve content).');
 process.exitCode=1;
}
