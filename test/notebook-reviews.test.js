import test from 'node:test';
import assert from 'node:assert/strict';
import {projectNotebookReviews,projectNotebookCareer,renderNotebookReviews,renderNotebookCareer} from '../web/notebook-reviews.js';
import {renderNotebookView} from '../web/notebook-view.js';
import {startReviewedSchoolCareer,prepareWorldOperation} from '../src/runtime/transactions.js';
import {foundationScenario} from './support/scenarios.js';
import {academicBaseline} from './support/academic-scenario.js';
import {request} from './support/runtime.js';
import {yearData} from '../src/calendar/calendar.js';
import {pendingSemesterReview} from '../src/runtime/reviews.js';
import {createId} from '../src/contracts/foundation.js';
import {restoreWorldState} from '../src/runtime/model.js';
const initial=()=>{const f=foundationScenario(74);f.events=[];f.enrollments=[];return startReviewedSchoolCareer(f,{startYear:2026,subject:'國文',seed:75});};
const finish=w=>prepareWorldOperation(w,{...request(w,'finish14E',[{type:'finish-slot',completedActivityIds:[]}]),calendarContext:{kind:'routine'}}).world;
test('14-E: initial notebook contains no fabricated semester, year or ending',()=>{
 const w=initial(),before=JSON.stringify(w),d=projectNotebookReviews(w),c=projectNotebookCareer(w);
 assert.equal(d.semesters.length,0);assert.equal(d.years.length,0);assert.equal(d.pendingId,null);
 assert.equal(c.completed,false);
 assert.match(renderNotebookReviews(d),/尚無已完成的學期總結/);
 assert.match(renderNotebookCareer(c),/生涯進行中/);
 assert.equal(JSON.stringify(w),before);
});
test('14-E: last semester day creates pending formal report without academic grades',()=>{
 const w=finish(academicBaseline(initial(),yearData(2027).winterFinal,'private'));
 const d=projectNotebookReviews(w),before=JSON.stringify(w);
 assert.equal(d.semesters.length,1);
 assert.equal(d.pendingId,pendingSemesterReview(w).id);
 assert.equal(d.semesters[0].status,'unread');
 const html=renderNotebookReviews(d,d.pendingId,true);
 assert.match(html,/已閱讀學期總結，繼續/);
 assert.doesNotMatch(html,/段考成績|平時成績|取得學分/);
 assert.equal(JSON.stringify(w),before);
 const read={...d,pendingId:null};assert.doesNotMatch(renderNotebookReviews(read,d.pendingId,true),/data-action="review-ack/);
 assert.throws(()=>renderNotebookReviews(d,'forged'),RangeError);
});
test('14-E: finished read-only record is escaped and does not add slots',()=>{
 const html=renderNotebookCareer({completed:true,serviceYear:3,date:'2029-06-23',grade:'A',score:75,ending:'<script>說法</script>',cohorts:[{years:[1,2,3],students:40,graduated:36,status:'archived'}]});
 assert.match(html,/符合畢業資格 36 人/);
 assert.match(html,/&lt;script&gt;說法&lt;\/script&gt;/);
 assert.doesNotMatch(html,/<script>|data-story-action/);
 const original=renderNotebookCareer({completed:true,serviceYear:30,date:'2056-06-29',grade:'A',score:75,ending:'原保存結局',cohorts:[]});assert.match(original,/30年生涯完成紀錄/);assert.doesNotMatch(original,/三年生涯完成紀錄/);
});
test('14-E: all six notebook tabs include both formal summary views',()=>{
 const a=renderNotebookView({date:'2027-01-22',grade:1,tab:'semesters',reviews:{semesters:[],years:[],pendingId:null}});
 const b=renderNotebookView({date:'2027-01-22',grade:1,tab:'career',career:{completed:false,serviceYear:1}});
 assert.match(a,/學期及學年回顧/);assert.match(b,/教師職涯/);
 assert.equal((a.match(/role="tab"/g)||[]).length,6);
});

test('14-E: real pending-review acknowledgment is timeless, persisted and cannot repeat',()=>{
 const world=finish(academicBaseline(initial(),yearData(2027).winterFinal,'private'));
 const pending=pendingSemesterReview(world),beforeDate=structuredClone(world.position),beforeNumeric=structuredClone(world.numeric),beforeRandom=structuredClone(world.random);
 const requestData={id:createId('operation',[world.identity.attemptId,'read-semester-review',pending.id]),attemptId:world.identity.attemptId,expectedRevision:world.extensions['teacher-hell/world'].revision,actorId:world.identity.playerId,preconditions:[],operations:[{type:'read-semester-review',reviewId:pending.id}]};
 const next=prepareWorldOperation(world,requestData).world;
 assert.equal(pendingSemesterReview(next),null);
 assert.equal(projectNotebookReviews(next).semesters[0].status,'read');
 assert.deepEqual(next.position,beforeDate);
 assert.deepEqual(next.numeric,beforeNumeric);
 assert.deepEqual(next.random,beforeRandom);
 assert.deepEqual(restoreWorldState(next),next);
 assert.equal(prepareWorldOperation(next,requestData).duplicate,true);
});
