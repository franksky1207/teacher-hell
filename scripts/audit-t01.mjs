#!/usr/bin/env node
/** Bounded 18-B T01 batch evidence. No simulation, draws, publication, or manufactured approval. */
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {auditContent} from './content-audit.js';
import * as content from '../src/runtime/story-content.js';
const sha=o=>createHash('sha256').update(JSON.stringify(o)).digest('hex');
const records=Array.from({length:8},(_,i)=>JSON.parse(fs.readFileSync(`work/18b-t01-0${i+1}-authoring.json`)).records).flat();
const reports=['docs/reviews/18b-t01-01-02-05-06-rereview.json','docs/reviews/18b-t01-03-04-07-08-rereview.json'].map(path=>({path,data:JSON.parse(fs.readFileSync(path))}));
const assessments=new Map(reports.flatMap(({path,data})=>data.records.map(r=>[r.eventId??r.id,{...r,path}])));
const provenance=records.map(({story,definition})=>{const r=assessments.get(story.definitionId);return {id:story.definitionId,storySha256:sha(story),definitionSha256:sha(definition),assessment:r?.verdict??'missing',reviewPath:r?.path??null,hashMatches:!!r&&sha(story)===r.storySha256&&sha(definition)===r.definitionSha256,sopReviewed:false};});
const baseline=[...new Map(Object.values(content).flat().filter(x=>x?.status==='ready').map(story=>[story.resourceId,{story,editorial:{cause:story.premise?.description??story.stages[0].pages[0].text}}])).values()];
fs.writeFileSync('work/18b-t01-all.json',JSON.stringify({records},null,2)+'\n');
fs.writeFileSync('work/18b-t01-baseline.json',JSON.stringify({records:baseline},null,2)+'\n');
const report=auditContent(records,{catalogueDefinitions:content.t01DraftCatalogue().definitions,referenceRecords:baseline});
const evidence={scope:'200 individually authored isolated T01 stories; same-model editorial assessments do not satisfy SOP reviewed',mainBaseline:'1bb5770c38f608311220bc5191ee3981fe2af642',baselineIds:baseline.map(r=>r.story.resourceId),baselineLimit:'All ten main resolver ready resources, including 17-D three samples. Unmerged PR #60 original twenty are not an accepted main baseline and were not fetched or certified.',provenance,editorialAssessmentAcceptable:provenance.filter(p=>p.hashMatches&&p.assessment==='acceptable').length,sopReviewed:0,formalQualified:0,publishedInNewCareers:0,engineeringCatalogueReady:report.catalogueReady,formalCatalogueReady:0,formalResolverReady:0,audit:report};
fs.writeFileSync('docs/reviews/18b-t01-final-audit.json',JSON.stringify(evidence,null,2)+'\n');
console.log(JSON.stringify({authored:report.authored,structurallyValid:report.structurallyValid,baseline:baseline.length,hashMatchedAssessments:evidence.editorialAssessmentAcceptable,sopReviewed:0,engineeringResolverReady:report.resolverReady,engineeringCatalogueReady:report.catalogueReady,formalQualified:0,publishedInNewCareers:0,possibleDuplicatePairs:report.duplicates},null,2));
// After Chat editorial changes, old per-story review hashes are intentionally stale.
// Preserve provenance and the release block, but do not mistake missing re-review for invalid structure.
// A separate, version-matched semantic gate still determines reviewed/ready eligibility.
if(report.structurallyValid!==records.length)process.exitCode=1;
if(provenance.some(p=>!p.hashMatches||p.assessment!=='acceptable'))console.warn('EDITORIAL RE-REVIEW REQUIRED: old semantic assessments do not match current draft hashes; none are approved.');
if(process.argv.includes('--release-gate')){console.error('RELEASE BLOCKED: same-model editorial assessments are not SOP reviewed; no default-career publication.');process.exitCode=1;}
