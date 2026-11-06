import {aftercareCellIsEmpty} from '../web/presentation.js';
import {slotOccupancy} from '../src/calendar/calendar.js';
import {fiveTerms} from './support/senior-academic.js';
import {projectNotebookAcademics} from '../web/notebook-academics.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {gunzipSync} from 'node:zlib';
import {createCandidate} from '../src/player/creation.js';
import {createCareerOpening} from '../src/runtime/opening.js';
import {nextProgression,progressionContext,planProgression} from '../src/runtime/progression.js';
import {prepareWorldSequence,prepareWorldOperation} from '../src/runtime/transactions.js';
import {academicState,academicTermStatus,withAcademicProjection} from '../src/runtime/academics.js';
import {restoreSave} from '../src/storage/format.js';
import {projectSeniorSummary,renderSeniorSummary} from '../web/senior-summary.js';
const opening=()=>createCareerOpening({candidate:createCandidate({seed:74,playerId:'teacher',schoolId:'school'}),seed:75,taipeiDate:'2026-11-06',difficulty:'normal',subject:'國文',careerKey:'h5-test'});
test('H5 controller emits checked actions and deterministic revision ids without mutating state',()=>{
 let w=opening();const before=JSON.stringify(w),a=nextProgression(w);assert.equal(a.status,'action');assert.deepEqual(a,nextProgression(w));assert.equal(JSON.stringify(w),before);
 w=prepareWorldOperation(w,a.request).world;assert.notEqual(nextProgression(w).request.id,a.request.id);
 assert.equal(prepareWorldOperation(w,a.request).duplicate,true);
});
test('H5 controller gates review, completion, failure and event attention before any advance',()=>{
 const c=progressionContext(opening());assert.equal(planProgression({...c,pendingReview:'review'}).status,'review-required');
 assert.equal(planProgression({...c,completed:true}).status,'completed');assert.equal(planProgression({...c,failed:true}).status,'failed');
 assert.equal(planProgression({...c,stories:[{waiting:false,eventId:'event'}]}).status,'attention-required');
 const aftercare={...c,schoolEnabled:true,catalogueIds:['aftercare:representatives-v1'],aftercare:{status:'advance',request:{},activeWeek:false}};assert.equal(planProgression(aftercare).label,'推進一週善後');assert.equal(planProgression({...aftercare,aftercare:{...aftercare.aftercare,activeWeek:true}}).label,'繼續本週善後');
});
test('H5 real old June terminal selects the unique annual entry, never another week',()=>{
 const fixtures=JSON.parse(gunzipSync(readFileSync(new URL('./fixtures/h4-pre-5c21854.json.gz',import.meta.url))));
 const w=restoreSave(fixtures.terminal).world,c=progressionContext(w),next=planProgression(c);
 assert.equal(w.position.date,'2029-06-29');assert.equal(next.status,'action');assert.deepEqual(next.request.operations,[{type:'settle-school-year'}]);
 const reserved=restoreSave(fixtures.reserved).world,before=JSON.stringify(reserved),view=progressionContext(reserved);assert.ok(view.reserved.length);view.reserved[0].date='2099-01-01';assert.equal(JSON.stringify(reserved),before);
 const oldAfter=restoreSave(fixtures.after).world,adopted=prepareWorldOperation(oldAfter,nextProgression(oldAfter).request).world,p=adopted.extensions['teacher-hell/world'].plan,table=p.tables.at(-1);
 const early=slotOccupancy(adopted.position.date,3,'early',table,p.calendarVersion);assert.equal(aftercareCellIsEmpty(adopted,adopted.position.date,early,early),false);
 const late=slotOccupancy(adopted.position.date,3,'p8',table,p.calendarVersion);assert.equal(aftercareCellIsEmpty(adopted,adopted.position.date,late,late),true);
 assert.equal(next.request.expectedRevision,c.revision);assert.equal(next.settlement,true);
 assert.equal(planProgression({...c,stories:[{waiting:false,eventId:'necessary'}]}).status,'attention-required');
 assert.equal(planProgression({...c,reserved:[{eventId:'necessary'}]}).request.operations[0].type,'admit-event');
});
test('H5 saved summary does not fabricate ceremony, offers or future results at opening',()=>{
 const w=opening(),before=JSON.stringify(w),d=projectSeniorSummary(w);assert.equal(d.ceremony,null);assert.equal(d.knownOffers,0);assert.equal(d.weeks.length,0);assert.equal(renderSeniorSummary(d),'');assert.equal(JSON.stringify(w),before);
});
test('H5 saved narrative renderer escapes text and preserves unknown future results',()=>{
 const html=renderSeniorSummary({date:'2029-06-29',ceremony:{description:'<script>',representatives:[{interaction:'<img>'}]},weeks:[{startDate:'2029-06-23',endDate:'2029-06-29',summary:'<svg>'}],knownOffers:3,confirmed:2,pending:9});
 assert.match(html,/&lt;script&gt;/);assert.doesNotMatch(html,/<script>|<img>|<svg>/);assert.match(html,/七、八月尚未公布的結果維持未知/);
});

test('H5 narrow academic lifecycle reads and controller contexts cannot mutate their source',()=>{
 let w=opening();w=prepareWorldOperation(w,nextProgression(w).request).world;
 const before=JSON.stringify(w),c=progressionContext(w);c.plan.cursor++;c.position.date='2099-01-01';
 withAcademicProjection(w,()=>{const term=Object.values(academicState(w).terms)[0],status=academicTermStatus(w,term.termId);assert.equal(status.grade,term.grade);assert.equal(status.closed,term.closed);status.rows[0].id='changed';assert.notEqual(academicTermStatus(w,term.termId).rows[0].id,'changed');});
 assert.equal(JSON.stringify(w),before);
});
test('H5 ordered formal controller requests replay identically to individual transactions',()=>{
 const w=opening();let a=w;const receipts=[];for(let i=0;i<4;i++){const result=prepareWorldOperation(a,nextProgression(a).request);a=result.world;receipts.push(result.receipt);}
 let n=0;const batch=prepareWorldSequence(w,c=>n++<4?planProgression(c).request:null);
 assert.deepEqual(batch.world,a);assert.deepEqual(batch.receipts,receipts);
});

test('H5 notebook lists semesters chronologically and defaults to senior autumn, with formal academic-year labels',()=>{
 const w=fiveTerms(),base=projectNotebookAcademics(w),d=projectNotebookAcademics(w,base.students[0].id);
 assert.deepEqual(d.terms.map(t=>t.id),['2026:autumn','2027:spring','2027:autumn','2028:spring','2028:autumn']);assert.equal(d.selectedTerm,'2028:autumn');assert.equal(d.terms[1].label,'2026學年度下學期');assert.equal(d.terms.at(-1).label,'2028學年度上學期');
});
