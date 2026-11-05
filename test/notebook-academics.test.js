import test from 'node:test';
import assert from 'node:assert/strict';
import {projectNotebookAcademics,renderNotebookAcademics} from '../web/notebook-academics.js';
import {createCareerOpening} from '../src/runtime/opening.js';
import {academicWorld,completeAcademic,academicBaseline} from './support/academic-scenario.js';
import {readSchoolRoster} from '../src/runtime/views.js';
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
test('14-D: closed academic semester reads actual school marks, scores and earned credits only',()=>{
 const world=completeAcademic(),base=projectNotebookAcademics(world);
 const person=base.students[0],data=projectNotebookAcademics(world,person.id,'2026:autumn');
 assert.ok(data.transcript.closed);
 assert.equal(data.transcript.assessments.length,4);
 assert.ok(data.transcript.courses.length>0);
 assert.ok(data.transcript.courses.every(c=>Number.isFinite(c.mark)));
 assert.match(renderNotebookAcademics(data),/學期/);
 assert.match(renderNotebookAcademics(data),/累積學分/);
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

test('14-D: three exam results appear only from the following calendar day',()=>{
 const complete=completeAcademic();
 const student=projectNotebookAcademics(complete).students[0];
 for(const [last,next,round] of [
  ['2026-10-06','2026-10-07',1],
  ['2026-12-01','2026-12-02',2],
  ['2027-01-22','2027-01-23',3],
 ]){
  const finalDay=academicBaseline(complete,last);
  const nextDay=academicBaseline(complete,next);
  const before=projectNotebookAcademics(finalDay,student.id,'2026:autumn').transcript;
  const after=projectNotebookAcademics(nextDay,student.id,'2026:autumn').transcript;
  assert.equal(before.assessments.find(a=>a.round===round)?.marks,null,'round '+round+' must not leak on exam day');
  assert.ok(Object.keys(after.assessments.find(a=>a.round===round)?.marks??{}).length>0,'round '+round+' must appear next day');
 }
});
test('14-D: no final exam inference through term results or earned credits before next day',()=>{
 const complete=completeAcademic(),student=projectNotebookAcademics(complete).students[0];
 const onFinal=projectNotebookAcademics(academicBaseline(complete,'2027-01-22'),student.id,'2026:autumn');
 const onNext=projectNotebookAcademics(academicBaseline(complete,'2027-01-23'),student.id,'2026:autumn');
 assert.equal(onFinal.pendingPublication,true);
 assert.equal(onFinal.transcript.closed,false);
 assert.deepEqual(onFinal.transcript.courses,[]);
 assert.equal(onFinal.qualification,null);
 assert.match(renderNotebookAcademics(onFinal),/隔天開放查閱/);
 assert.equal(onNext.pendingPublication,false);
 assert.equal(onNext.transcript.closed,true);
 assert.ok(onNext.transcript.courses.length>0);
 assert.ok(onNext.qualification?.earned>=0);
});
