import test from 'node:test';
import assert from 'node:assert/strict';
import {projectNotebookAcademics,renderNotebookAcademics,isExamScorePublished,isSemesterResultPublished} from '../web/notebook-academics.js';
import {createCareerOpening} from '../src/runtime/opening.js';
import {academicWorld,completeAcademic,academicBaseline} from './support/academic-scenario.js';
import {readSchoolRoster} from '../src/runtime/views.js';
import {readGrades} from '../src/runtime/academics.js';
test('14-D: current class roster only, opening term has no fabricated marks or earned credits',()=>{
 const world=academicWorld(),before=JSON.stringify(world);
 const overview=projectNotebookAcademics(world);
 const roster=readSchoolRoster(world);
 assert.equal(overview.students.length,roster.students.length);
 const student=overview.students[0];
 const data=projectNotebookAcademics(world,student.id);
 assert.ok(data.terms.length>0);
 assert.equal(data.transcript.closed,false);
 assert.equal(data.transcript.courses.length,0);
 assert.equal(data.qualification.earned,0);
 const html=renderNotebookAcademics(data);
 assert.match(html,/尚未結算/);
 assert.doesNotMatch(html,/符合畢業條件/);
 assert.equal(JSON.stringify(world),before);
});
test('14-D: closed academic semester remains computed but release is deferred in notebook',()=>{
 const world=completeAcademic(),base=projectNotebookAcademics(world);
 const person=base.students[0],data=projectNotebookAcademics(world,person.id,'2026:autumn');
 const result=readGrades(world,person.id,'2026:autumn');
 assert.ok(result.semester.courses.length>0);
 assert.equal(data.pendingPublication,true);
 assert.equal(data.transcript.closed,false);
 assert.equal(data.transcript.assessments.length,4);
 assert.deepEqual(data.transcript.courses,[]);
 assert.equal(data.qualification,null);
 assert.match(renderNotebookAcademics(data),/隔天開放查閱/);
});
test('14-D: invalid student or term rejected, no other class roster listed',()=>{
 const world=academicWorld(),roster=projectNotebookAcademics(world);
 assert.throws(()=>projectNotebookAcademics(world,'other:student'),RangeError);
 assert.throws(()=>projectNotebookAcademics(world,roster.students[0].id,'2040:autumn'),RangeError);
});
test('14-D: render only public projection and escape names and subject text',()=>{
 const data={students:[{id:'x:1',name:'<script>'}],selectedId:'x:1',terms:[{id:'2026:autumn',label:'2026上學期',closed:true}],selectedTerm:'2026:autumn',qualification:{earned:8,requiredEarned:6,electiveEarned:2,complete:false,eligible:false,status:'incomplete',reasons:[]},transcript:{closed:true,assessments:[],courses:[{subject:'<img>',mark:60,earned:2,credits:2,required:true}]}};
 const html=renderNotebookAcademics(data);
 assert.match(html,/&lt;script&gt;|&lt;img&gt;/);
 assert.doesNotMatch(html,/<script|<img|data-story-action/);
 assert.match(html,/尚在學或修業程序未完成/);
 assert.match(html,/data-action="notebook-academic-student:x:1"/);
});

test('14-D: score publication begins the next calendar day for all three exam rounds',()=>{
 for(const [last,next,round] of [
  ['2026-10-06','2026-10-07',1],
  ['2026-12-01','2026-12-02',2],
  ['2027-01-22','2027-01-23',3]
 ]){
  assert.equal(isExamScorePublished('2026:autumn',1,round,last),false);
  assert.equal(isExamScorePublished('2026:autumn',1,round,next),true);
 }
 assert.equal(isExamScorePublished('2027:spring',2,2,'2027-05-04'),false);
 assert.equal(isExamScorePublished('2027:spring',2,2,'2027-05-05'),true);
 assert.throws(()=>isExamScorePublished('2026:autumn',1,0,'2026-10-06'),RangeError);
});
test('14-D: term close on final day keeps third exam, term mark and credits undisclosed',()=>{
 const complete=completeAcademic(),student=projectNotebookAcademics(complete).students[0];
 const onFinal=projectNotebookAcademics(complete,student.id,'2026:autumn');
 assert.equal(complete.position.date,'2027-01-22');
 assert.equal(onFinal.pendingPublication,true);
 assert.equal(onFinal.transcript.closed,false);
 assert.equal(onFinal.transcript.assessments.find(a=>a.round===3)?.marks,null);
 assert.ok(onFinal.transcript.assessments.find(a=>a.round===1)?.marks);
 assert.deepEqual(onFinal.transcript.courses,[]);
 assert.equal(onFinal.qualification,null);
 assert.match(renderNotebookAcademics(onFinal),/隔天開放查閱/);
 assert.equal(isSemesterResultPublished('2026:autumn','2027-01-22'),false);
 assert.equal(isSemesterResultPublished('2026:autumn','2027-01-23'),true);
});
