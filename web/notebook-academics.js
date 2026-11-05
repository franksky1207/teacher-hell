/** Phase 14-D: display-only projection of official homeroom transcripts and qualification. */
import {readSchoolRoster} from '../src/runtime/views.js';
import {academicState,readGrades,readAcademicQualification} from '../src/runtime/academics.js';
import {semester} from '../src/calendar/calendar.js';
import {addDays} from '../src/calendar/civil.js';
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const finite=value=>typeof value==='number'&&Number.isFinite(value)?String(value):'—';
const semesterLabel=id=>{const match=/^(\d{4}):(autumn|spring)$/.exec(id);return match?`${match[1]}學年${match[2]==='autumn'?'上':'下'}學期`:id;};
const statusLabel={graduation:'符合畢業條件','completion-certificate':'符合修業證明條件',incomplete:'尚未符合畢業條件'};
const reasonLabel={'study-period':'修業期間尚未完成','required-study-load':'修課學分不足','unattended-compulsory':'尚有未修必修課程','total-credits':'取得學分不足','required-credits':'必修學分不足','elective-credits':'選修學分不足',conduct:'獎懲條件未符合','chinese-study-load':'國文修課時數不足','foreign-language-study-load':'外語修課時數不足','practical-study-load':'實作課程時數不足'};
export function projectNotebookAcademics(world,studentId=null,termId=null){
 const roster=readSchoolRoster(world),academic=academicState(world);
 const students=(roster?.students??[]).map(({id,name})=>({id,name}));
 const selected=studentId===null?null:students.find(s=>s.id===studentId);
 if(studentId!==null&&!selected)throw new RangeError('Unknown homeroom student');
 const terms=Object.values(academic.terms).filter(t=>t.rows.some(r=>r.id===studentId)||studentId===null)
  .map(t=>({id:t.termId,label:semesterLabel(t.termId),closed:!!t.closed,assessments:t.assessments.length}))
  .sort((a,b)=>a.id.localeCompare(b.id));
 const chosen=selected?(termId===null?terms.at(-1)?.id??null:termId):null;
 if(selected&&termId!==null&&!terms.some(t=>t.id===termId))throw new RangeError('Unknown student term');
 const term=terms.find(t=>t.id===chosen)??null;
 const transcript=selected&&term?readGrades(world,selected.id,term.id):null;
 const examCalendar=term?semester(term.id):null;
 const finalExamDay=examCalendar?.exams[2].at(-1)??null;
 const finalReleased=!finalExamDay||world.position.date>=addDays(finalExamDay,1);
 const visibleRound=round=>{
  if(round===0)return true;
  const examDays=round===2&&academic.terms[term.id].grade===2&&examCalendar.grade2SecondExam
   ?examCalendar.grade2SecondExam:examCalendar.exams[round-1];
  return world.position.date>=addDays(examDays.at(-1),1);
 };
 // The official graduation query is a projection, never a student status write.
 const qualification=selected?readAcademicQualification(world,selected.id,academic):null;
 return {students,selectedId:selected?.id??null,terms,selectedTerm:term?.id??null,
  pendingPublication:!!term&&!!term.closed&&!finalReleased,
  transcript:transcript?{
   closed:!!term.closed&&finalReleased,
   assessments:transcript.assessments.map(a=>({round:a.round,marks:visibleRound(a.round)&&a.marks?{...a.marks}:null})),
   courses:(finalReleased?transcript.semester?.courses??[]:[]).map(c=>({subject:c.subject,mark:c.mark,credits:c.credits,earned:c.earned,required:c.required})),
   planned:transcript.courses.map(c=>({subject:c.subject,credits:c.credits,required:c.required}))
  }:null,
  // Final-day credits and derived qualification may reveal a hidden third exam result.
  qualification:qualification&&finalReleased?{
   earned:qualification.earned,requiredEarned:qualification.requiredEarned,electiveEarned:qualification.electiveEarned,
   complete:qualification.complete,eligible:qualification.eligible,status:qualification.status,
   reasons:qualification.reasons??[],repeatEligible:qualification.repeatEligible,extensionEligible:qualification.extensionEligible
  }:null};
}
export function renderNotebookAcademics(data){
 if(!data||!Array.isArray(data.students)||!Array.isArray(data.terms))throw new TypeError('Invalid academic notebook data');
 const roster=data.students.map(s=>`<button type="button" data-action="notebook-academic-student:${esc(s.id)}" class="notebook-academic-student${data.selectedId===s.id?' notebook-academic-active':''}" aria-pressed="${data.selectedId===s.id}">${esc(s.name)}</button>`).join('');
 const termButtons=data.selectedId?data.terms.map(t=>`<button type="button" data-action="notebook-academic-term:${esc(t.id)}" class="notebook-academic-term${data.selectedTerm===t.id?' notebook-academic-active':''}" aria-pressed="${data.selectedTerm===t.id}">${esc(t.label)}${t.closed?'':'（未結算）'}</button>`).join(''):'';
 let content='<p>請選擇學生查閱學業紀錄。</p>';
 if(data.selectedId){
  const student=data.students.find(s=>s.id===data.selectedId);
  const q=data.qualification;
  const credit=q?`<section class="notebook-academic-credits" aria-label="學分與資格"><h4>累積學分及修業狀態</h4><p>已取得學分：${finite(q.earned)}・必修：${finite(q.requiredEarned)}・選修：${finite(q.electiveEarned)}</p><p>${q.complete?esc(statusLabel[q.status]??'學業資格未標示'):'尚在學或修業程序未完成，非最終畢業判定'}</p>${q.complete&&!q.eligible&&q.reasons.length?`<p>待完成條件：${q.reasons.map(r=>esc(reasonLabel[r]??'其他正式審查條件')).join('、')}</p>`:''}</section>`:'';
  const t=data.transcript;
  const rounds=[1,2,3].map(n=>t?.assessments.find(a=>a.round===n)?.marks??null);
  const regular=t?.assessments.find(a=>a.round===0)?.marks??null;
  const courses=t?.closed?t.courses:t?.planned??[];
  const rows=courses.map(c=>`<tr><th scope="row">${esc(c.subject)}</th><td>${finite(regular?.[c.subject])}</td>${rounds.map(r=>`<td>${finite(r?.[c.subject])}</td>`).join('')}<td>${t?.closed?finite(c.mark):'—'}</td><td>${t?.closed?finite(c.earned):'—'}／${finite(c.credits)}</td></tr>`).join('');
  content=`<h3>${esc(student?.name??'學生')}</h3>${data.pendingPublication?'<p class="notebook-hint">期末考成績與學期結算已完成，隔天開放查閱。</p>':''}${credit}<div class="notebook-academic-terms" aria-label="選擇學期">${termButtons}</div>${t?`<p class="notebook-hint">${t.closed?'正式學期成績與已取得學分':'本學期尚未結算，未提供最終成績或學分判定。'}</p><div class="notebook-academic-table-wrap"><table class="notebook-academic-table"><thead><tr><th>科目</th><th>平時</th><th>一段</th><th>二段</th><th>三段</th><th>學期</th><th>學分</th></tr></thead><tbody>${rows||'<tr><td colspan="7">尚無已建立課程</td></tr>'}</tbody></table></div>`:'<p>目前尚無正式學期成績紀錄。</p>'}`;
 }
 return `<section class="notebook-academics" aria-label="學業成績與學分"><p class="notebook-hint">資料來源為學校正式學業紀錄；查閱不產生段考、學分或畢業結算。</p><div class="notebook-academic-layout"><div class="notebook-academic-list" aria-label="導師班學生名單">${roster||'<p>尚無可查閱學生。</p>'}</div><div class="notebook-academic-details">${content}</div></div></section>`;
}
