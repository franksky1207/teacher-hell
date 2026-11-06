import {readAssessmentWeights} from '../src/runtime/academics.js';
/** Phase 14-D: display-only projection of official homeroom transcripts and qualification. */
import {notebookRoster} from './notebook-roster.js';
import {academicState,readGrades,readAcademicQualification,readAdmissions} from '../src/runtime/academics.js';
import {semester,assessmentCalendar,examSchedule} from '../src/calendar/calendar.js';
import {addDays} from '../src/calendar/civil.js';
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const finite=value=>typeof value==='number'&&Number.isFinite(value)?String(value):'—';
const semesterLabel=id=>{const match=/^(\d{4}):(autumn|spring)$/.exec(id);return match?`${Number(match[1])-(match[2]==='spring'?1:0)}學年度${match[2]==='autumn'?'上':'下'}學期`:id;};
const statusLabel={graduation:'符合畢業條件','completion-certificate':'符合修業證明條件',incomplete:'尚未符合畢業條件'};
const reasonLabel={'study-period':'修業期間尚未完成','required-study-load':'修課學分不足','unattended-compulsory':'尚有未修必修課程','total-credits':'取得學分不足','required-credits':'必修學分不足','elective-credits':'選修學分不足',conduct:'獎懲條件未符合','chinese-study-load':'國文修課時數不足','foreign-language-study-load':'外語修課時數不足','practical-study-load':'實作課程時數不足'};
/** Exact publication boundary: computed on exam day, shown from next calendar day. */
export function isExamScorePublished(termId,grade,round,viewDate,version){
 if(![1,2,3].includes(round))throw new RangeError('Invalid exam round');
 const period=examSchedule(termId,grade,version).find(e=>e.round===round)?.dates;if(!period)throw new RangeError('Invalid exam round for term policy');
 return viewDate>=addDays(period.at(-1),1);
}
export function isSemesterResultPublished(termId,viewDate,grade=1,version){
 return viewDate>=addDays(assessmentCalendar(termId,grade,version).ordinaryAssessmentDates.at(-1),1);
}
export function projectNotebookAcademics(world,studentId=null,termId=null){
 const roster=notebookRoster(world),academic=academicState(world);
 const students=(roster?.students??[]).map(({id,name})=>({id,name}));
 const selected=studentId===null?null:students.find(s=>s.id===studentId);
 if(studentId!==null&&!selected)throw new RangeError('Unknown homeroom student');
 const terms=Object.values(academic.terms).filter(t=>t.rows.some(r=>r.id===studentId)||studentId===null)
  .map(t=>({id:t.termId,label:semesterLabel(t.termId),closed:!!t.closed,assessments:t.assessments.length}))
  .sort((a,b)=>semester(a.id).start.localeCompare(semester(b.id).start));
 const chosen=selected?(termId===null?terms.at(-1)?.id??null:termId):null;
 if(selected&&termId!==null&&!terms.some(t=>t.id===termId))throw new RangeError('Unknown student term');
 const term=terms.find(t=>t.id===chosen)??null;
 const transcript=selected&&term?readGrades(world,selected.id,term.id):null;
 const calendarVersion=world.extensions['teacher-hell/world'].plan.calendarVersion;
 const released=t=>!t.closed||(t.assessmentPolicy?!!t.publishedAt:isSemesterResultPublished(t.termId,world.position.date,t.grade,calendarVersion));
 const actual=term&&academic.terms[term.id],finalReleased=!actual||released(actual);
 const pendingAny=Object.values(academic.terms).some(t=>t.rows.some(r=>r.id===studentId)&&!released(t));
 const visibleRound=round=>round===0?finalReleased:isExamScorePublished(term.id,academic.terms[term.id].grade,round,world.position.date,calendarVersion);
 // The official graduation query is a projection, never a student status write.
 const qualification=selected?readAcademicQualification(world,selected.id,academic):null;
 return {students,entrance:selected?readAdmissions(world,selected.id,academic):null,selectedId:selected?.id??null,terms,selectedTerm:term?.id??null,
  pendingPublication:!!term&&!!term.closed&&!finalReleased,
  transcript:transcript?{
   closed:!!term.closed&&finalReleased,
   weights:readAssessmentWeights(actual.assessmentPolicy),
   examColumns:examSchedule(term.id,actual.grade,calendarVersion).map(e=>({round:e.round,label:e.kind==='graduation-exam'?'畢業考':({1:'一段',2:'二段',3:'三段'})[e.round]})),
   studyComplete:actual.assessmentPolicy?!!actual.studyCompletedAt:null,
   assessments:transcript.assessments.map(a=>({round:a.round,marks:visibleRound(a.round)&&a.marks?{...a.marks}:null})),
   courses:(finalReleased?transcript.semester?.courses??[]:[]).map(c=>({subject:c.subject,mark:c.mark,credits:c.credits,earned:c.completed===false?null:c.earned,required:c.required,creditPending:c.completed===false})),
   planned:transcript.courses.map(c=>({subject:c.subject,credits:c.credits,required:c.required}))
  }:null,
  // Final-day credits and derived qualification may reveal a hidden third exam result.
  pendingRemedies:selected&&finalReleased&&!pendingAny?Object.values(academic.terms).flatMap(t=>t.review?.outcomes??[]).find(o=>o.personId===selected.id)?.pendingRemedies??[]:[],
  qualification:qualification&&finalReleased&&!pendingAny?{
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
  const p=data.entrance;
  const routeLabels={special:'特殊選才',stars:'繁星推薦',stars8:'繁星第八類',application:'申請入學',technical:'四技申請','technical-application':'四技申請準備','subject-preparing':'分科準備',work:'就業',exploring:'探索中',planning:'規劃中','vocational-or-other':'技職或其他',other:'其他出路',allocated:'待確認',reconsidering:'重新規劃','retake-planning':'重考規劃'};
  const entranceStatus={registered:'已報名',screened:'通過一階',reviewed:'二階已完成',regular:'正取',waitlist:'備取',rejected:'未錄取',allocated:'分發待確認',confirmed:'已確認',declined:'放棄或不列入志願',withdrawn:'已依法放棄'};
  const entrance=p?`<section aria-label="升學已知狀態"><h4>升學進度</h4><p>${esc(routeLabels[p.route]??p.route)}${p.confirmed?'・已有確認錄取；高中畢業資格另行判定':''}</p><p>學測表現指標（0–100）：${p.gsat?.published?finite(p.gsat.score):'尚無已公布成績'}・英聽：${esc(p.listening?.published?p.listening.level:'尚無已公布成績')}</p><p>模考紀錄：${p.mocks.map(m=>`${esc(m.date)} ${m.family==='gsat'?'學測':'分科'} ${finite(m.score)}`).join('、')||'無'}（不計入學期成績）</p>${p.applications.length?'<p>申請：'+p.applications.map(a=>esc(a.programmeLabel)+'・'+esc(entranceStatus[a.status]??a.status)).join('；')+'</p>':''}${p.offers.length?'<p>已公布結果：'+p.offers.map(o=>esc(o.programmeLabel)+'・'+esc(entranceStatus[o.publishedStatus])+'（'+esc(entranceStatus[o.status])+'）').join('；')+'</p>':''}${p.pending.length?'<p>待辦：'+p.pending.map(x=>esc(({'july-subject-exam':'七月分科測驗，尚未應試','august-distribution':'八月分發，結果未知','employment-counselling':'就業輔導','next-year-exam-planning':'明年度考試規劃，尚無結果','alternative-route-counselling':'其他出路輔導','subject-registration':'分科報名'})[x]??x)).join('、')+'</p>':''}</section>`:'';
  const t=data.transcript;
  const examColumns=t?.examColumns??[1,2,3].map(round=>({round,label:({1:'一段',2:'二段',3:'三段'})[round]}));
  const rounds=examColumns.map(e=>t?.assessments.find(a=>a.round===e.round)?.marks??null);
  const regular=t?.assessments.find(a=>a.round===0)?.marks??null;
  const courses=t?.closed?t.courses:t?.planned??[];
  const rows=courses.map(c=>`<tr><th scope="row">${esc(c.subject)}</th><td>${finite(regular?.[c.subject])}</td>${rounds.map(r=>`<td>${finite(r?.[c.subject])}</td>`).join('')}<td>${t?.closed?finite(c.mark):'—'}</td><td>${t?.closed?(c.creditPending?'待修習完成':finite(c.earned)):'—'}／${finite(c.credits)}</td></tr>`).join('');
  content=`<h3>${esc(student?.name??'學生')}</h3>${data.pendingPublication?'<p class="notebook-hint">本期成績已計算，尚未完成正式公布。</p>':''}${credit}${data.pendingRemedies?.length?'<p>學業後續：'+data.pendingRemedies.map(r=>esc(r.subject)+'・'+esc(({retake:'重修',makeup:'補考',supplement:'補修'})[r.kind]??r.kind)+' '+finite(r.studiedPeriods)+'／'+finite(r.requiredPeriods)+' 節').join('、')+'</p>':''}${entrance}<div class="notebook-academic-terms" aria-label="選擇學期">${termButtons}</div>${t?`<p>正式權重：${(t.weights??[40,20,20,20]).map(n=>n+'％').join('／')}（平時／正式考試依序）</p><p class="notebook-hint">${t.closed?(t.studyComplete===false?'學期成績已確認；學分仍待實際修習完成及資格審查。':'正式學期成績與已取得學分'):'本學期尚未結算，未提供最終成績或學分判定。'}</p><div class="notebook-academic-table-wrap"><table class="notebook-academic-table"><thead><tr><th>科目</th><th>平時</th>${examColumns.map(e=>`<th>${esc(e.label)}</th>`).join('')}<th>學期</th><th>學分</th></tr></thead><tbody>${rows||'<tr><td colspan="7">尚無已建立課程</td></tr>'}</tbody></table></div>`:'<p>目前尚無正式學期成績紀錄。</p>'}`;
 }
 return `<section class="notebook-academics" aria-label="學業成績與學分"><p class="notebook-hint">資料來源為學校正式學業紀錄；查閱不產生段考、學分或畢業結算。</p><div class="notebook-academic-layout"><div class="notebook-academic-list" aria-label="導師班學生名單">${roster||'<p>尚無可查閱學生。</p>'}</div><div class="notebook-academic-details">${content}</div></div></section>`;
}
