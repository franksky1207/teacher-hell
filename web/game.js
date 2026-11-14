import {nextProgression} from '../src/runtime/progression.js';
import {makeTeacherProfile,teacherDisplayName} from '../src/runtime/teacher-profile.js';
import { readAftercare } from '../src/runtime/aftercare.js';
import { runtimeCalendarDay,aftercareWindow,continuesAftercareTeaching } from '../src/runtime/aftercare-calendar.js';
import {projectNotebookReviews,renderNotebookReviews} from './notebook-reviews.js';
import {pendingSemesterReview} from '../src/runtime/reviews.js';
import {failureResult} from '../src/runtime/homeroom.js';
import {projectYearResult,renderYearResult} from './year-result.js';
import {createId} from '../src/contracts/foundation.js';
import {renderNotebookView} from './notebook-view.js';
import {displayPanelValue,periodLabel,comparableWeeks,classLabel,aftercareCellIsEmpty,scheduledPhase} from './presentation.js';
import {renderStoryView} from './story-view.js';
import {selectScene,sceneImageUrls} from './scene-context.js';
import {renderScenePreview} from './scene-preview.js';
import {mountSceneBackground} from './scene-background.js';
import {renderSpecialStoryBody} from './story-formats.js';
import {makeUi2PreviewState,renderUi2Preview,mountUi2Preview,ui2PreviewAction} from './ui2-preview.js';
import {mountStoryPortraits} from './story-portraits.js';
import {renderArtPreview,mountArtPreview} from './art-preview.js';
import {currentStory,makeStoryRequest} from './story-controller.js';
import {createCandidate,rerollCandidate} from '../src/player/creation.js';
import {ABILITY_NAMES,STATE_NAMES} from '../src/player/panel.js';
import {deriveWorldPanel} from '../src/social/reputation.js';
import {createCareerOpening} from '../src/runtime/opening.js';
import {teacherTenure,formalSlot} from '../src/runtime/schedule.js';
import {careerResult} from '../src/runtime/career.js';
import {createIndexedDBStorage} from '../src/storage/indexeddb.js';
import {readNameMemory} from '../src/storage/name-memory.js';
import {preferUnusedOpeningNames} from '../src/runtime/opening-name-memory.js';
import {calendarDay,gradeAt,newThreeYearStart,slotOccupancy} from '../src/calendar/calendar.js';
import {addDays,weekMonday,weekday} from '../src/calendar/civil.js';
import {SUBJECT_LOAD} from '../src/calendar/timetable.js';

const app=document.querySelector('#app');
// Resolve original shared art from the published preview root, not versioned JS.
const gateDesktop=new URL('./web/assets/backgrounds/desktop/school-gate-day.webp',document.baseURI).href;
const gateMobile=new URL('./web/assets/backgrounds/mobile/school-gate-day.webp',document.baseURI).href;
app.style.setProperty('--fallback-gate-desktop',`url("${gateDesktop}")`);
app.style.setProperty('--fallback-gate-mobile',`url("${gateMobile}")`);
const storage=createIndexedDBStorage({factory:indexedDB,namespace:'development'});
let current=null,slot=0,draft=null,proposal=null,viewedWeek=null,screen='home',openingPage=0,storyBusy=false;
let ceremonyPage=0;
let ui2PreviewState=makeUi2PreviewState();
let ui4PreviewCase='phone',ui4PreviewPage=0;
let scenePreviewCase='opening',scenePreviewCast='two';
function showScenePreview(){screen='scene-preview';const preview=renderScenePreview(scenePreviewCase,scenePreviewCast);set(preview.html);mountSceneBackground(app.querySelector('.scene-preview'),preview.entry,{preview:true,simulateMissing:preview.simulateMissing,caption:app.querySelector('.scene-preview__load')});void mountStoryPortraits(app);}
function showUi2Preview(){screen='ui2-preview';set(renderUi2Preview(ui2PreviewState));mountUi2Preview(app);}
let yearResultPage=0;
let notebookTab='people',notebookPersonId=null,notebookPersonCategory='student',notebookPersonSearch='',notebookEventSearch='',notebookEventView='time',notebookEventTerm=null;
let notebookEventYear='all',notebookEventKind='all',notebookEventPage=1;
let notebookAcademicStudent=null,notebookAcademicTerm=null,notebookReviewId=null;
const activityNames={clubs:'社團活動',parents:'親師活動',sports:'運動會',fair:'校慶園遊會','graduation-trip-1':'畢業旅行','graduation-trip-2':'畢業旅行','graduation-trip-3':'畢業旅行',graduation:'畢業典禮','university-fair':'大學博覽會','japan-visit':'日本交流','field-trip':'校外教學','teachers-day':'教師節活動',halloween:'萬聖節活動',christmas:'聖誕節活動'};
const activityName=a=>activityNames[a.kind]??({'mock-gsat':'學測模考階段摘要','mock-subject':'分科模考階段摘要'})[a.kind]??a.kind;
const labels={easy:'簡單',normal:'普通',hard:'困難'},tenures={easy:20,normal:10,hard:1};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const button=(text,action,extra='')=>`<button type="button" data-action="${action}" ${extra}>${text}</button>`;
const taipeiDate=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const seed=()=>crypto.getRandomValues(new Uint32Array(1))[0];
const value=displayPanelValue;
function panelBars(p,names){return `<div class="bars">${names.map(n=>`<div class="bar"><span>${n}</span><progress max="100" value="${p[n]}"></progress><span>${value(p[n])}</span></div>`).join('')}</div>`;}
function set(html){app.innerHTML=html;}
function dialog(title,body){app.insertAdjacentHTML('beforeend',`<div class="overlay" data-action="outside"><section class="dialog" role="dialog" aria-modal="true" aria-label="${esc(title)}"><header><h2>${esc(title)}</h2>${button('×','close','aria-label="關閉"')}</header>${body}</section></div>`);}
function showHome(){screen='home';forgetCurrentView();const desktopArt=gateDesktop,mobileArt=gateMobile;set(`<main class="home home--avg" style="--home-desktop-art:url('${desktopArt}');--home-mobile-art:url('${mobileArt}')"><div class="home__shade" aria-hidden="true"></div><div class="home__layout"><header class="home__title"><p class="home__eyebrow">一段教書生涯，一所充滿意外的學校。</p><h1>教師荒謬地獄</h1><p class="home__subtitle">三年導師生涯 · 一場荒謬的日常</p></header><nav class="home__menu" aria-label="主選單">${button('繼續遊戲','continue')}${button('選擇存檔','slots')}${button('遊戲說明','help')}${button('設定','settings')}</nav></div><aside class="home__dev-tools" aria-label="開發工具">${button('開發測試中心','dev-center')}</aside></main>`);}
function showDeveloperCenter(){screen='dev-center';forgetCurrentView();set(`<main class="screen dev-center" aria-label="開發測試中心"><header class="dev-center__header"><p class="dev-center__eyebrow">DEVELOPER PREVIEW</p><h1>開發測試中心</h1><p>僅供畫面驗收；不會產生事件、推進時間或寫入存檔。</p></header><section class="dev-center__grid" aria-label="可用的驗收工具"><article class="dev-center__card"><span class="dev-center__symbol" aria-hidden="true">◈</span><h2>美術素材</h2><p>學生立繪、成人剪影與校園背景。</p>${button('開啟美術素材預覽','art-preview')}</article><article class="dev-center__card"><span class="dev-center__symbol" aria-hidden="true">▣</span><h2>劇情 UI</h2><p>對話、人物站位、六表情與選項確認。</p>${button('開啟劇情 UI 驗收','ui2-preview')}</article><article class="dev-center__card"><span class="dev-center__symbol" aria-hidden="true">▤</span><h2>特殊畫面 UI</h2><p>通訊、公告、回顧與結局。</p>${button('開啟 UI-4 驗收','ui4-preview')}</article><article class="dev-center__card"><span class="dev-center__symbol" aria-hidden="true">▧</span><h2>場景演出 UI</h2><p>背景時段、人物站位、家長電話與中性降級。</p>${button('開啟 15-D 場景驗收','scene-preview')}</article></section><footer class="dev-center__footer">${button('返回首頁','home')}<p>未來音樂等驗收項目將集中加入此處。</p></footer></main>`);}
const UI4_CASES=[['phone','電話'],['chat','即時訊息'],['notice','公告'],['email','電子郵件'],['news','新聞'],['semester','學期回顧'],['annual','學年結算'],['failure','職務中斷'],['career','三年結局'],['warning','不可逆操作']];
function ui4FixtureBody(type){
 const msg='關於明天的班級活動，校方已收到你的需求。確認後會再公告相關安排。';
 if(['phone','chat','notice','email','news'].includes(type)){
  const history=[{speaker:'學生家長',text:'老師您好，想確認明天活動是否照常進行。',own:false},{speaker:'導師',text:'您好，目前已向學務處確認，確定後會再通知。',own:true},{speaker:'學生家長',text:'了解，謝謝老師。',own:false}];
  return renderSpecialStoryBody(type,msg,'學生家長',history);
 }
 if(type==='semester'){
  const abilities=Object.fromEntries(ABILITY_NAMES.map((name,i)=>[name,{start:55+i*3,end:56+i*3,delta:1}]));
  return renderNotebookReviews({semesters:[{id:'preview',periodId:'2026:autumn',date:'2027-01-20',status:'read',abilities,events:[{summary:'完成班級活動協調與家長溝通'}],summary:'本學期有一些忙碌時刻，班級生活仍持續推進。'}],years:[],pendingId:null},'preview',false);
 }
 if(type==='annual'||type==='failure'){
  const failed=type==='failure',comparison=Object.fromEntries([...ABILITY_NAMES,...STATE_NAMES].map((name,i)=>[name,{start:55+i,end:56+i,delta:1}]));
  return renderYearResult({kind:failed?'failure':'success',year:1,date:'2027-06-30',summary:failed?'導師職務因已知事件而中斷。':'第一學年正式結算已完成。',grade:failed?null:'B',score:failed?null:78,comparison,events:['完成班級活動協調與家長溝通'],causes:failed?['示意：持續累積的校務爭議']:[],pending:failed?2:null,retryEligible:false},ui4PreviewPage);
 }
 if(type==='career')return '<section class="notebook-career ui4-career-demo"><h3>三年生涯完成紀錄</h3><p>正式評等：B・總分：78</p><div class="notebook-ending">三年時光走到終點。這是一段僅供視覺驗收的示意文字。</div><h4>結屆班級</h4><p>高三導師班：符合畢業 35 人／修業證明 3 人／尚未完成修業 2 人</p><p>完成槽保留原位置，只能唯讀查閱。</p></section>';
 return '<section class="ui4-warning-demo" role="note"><h3>⚠ 不可逆操作</h3><p>刪除或覆蓋存檔前，請確認已匯出備份。正式操作仍使用原本雙重確認與安全版本檢查。</p><p><strong>這裡僅展示警示樣式，沒有刪除、覆蓋或確認功能。</strong></p></section>';
}
function showUi4Preview(){
 screen='ui4-preview';const title=UI4_CASES.find(([key])=>key===ui4PreviewCase)?.[1]??'電話';
 set(`<main class="screen ui4-preview"><section class="ui4-preview__shell"><header><h1>UI-4 特殊畫面驗收</h1><p>僅使用安全展示資料；不寫入任何遊戲存檔。</p></header><nav class="ui4-preview__tabs" aria-label="切換特殊畫面">${UI4_CASES.map(([key,label])=>button(label,`ui4-case:${key}`,ui4PreviewCase===key?'class="selected" aria-pressed="true"':'aria-pressed="false"')).join('')}</nav><section class="ui4-preview__stage" data-ui4-case="${ui4PreviewCase}" aria-label="${esc(title)}畫面"><h2>${esc(title)}</h2>${ui4FixtureBody(ui4PreviewCase)}</section><footer>${button('返回測試中心','dev-center')}</footer></section></main>`);
}
async function showSlots(){
 screen='slots';forgetCurrentView();set('<main class="screen"><p>正在讀取存檔…</p></main>');
 const rows=[];
 for(let i=1;i<=3;i++){
  try{
   const w=(await workerRead({slot:i,summary:true})).summary;
   if(!w){
    rows.push(`<article class="panel slot ui4-slot-card ui4-slot-card--empty"><header class="ui4-slot-card__top"><span class="ui4-slot-card__number">SLOT ${i}</span><span class="ui4-slot-card__status">尚未使用</span></header><div class="ui4-slot-card__identity"><h2>空存檔</h2><p>從這裡開始三年導師生涯。</p></div><div class="ui4-slot-card__actions">${button('建立新生涯',`new:${i}`,'class="ui4-slot-card__primary"')}<details class="ui4-slot-card__more"><summary>其他管理操作</summary><div class="ui4-slot-card__more-actions">${button('匯入存檔',`import:${i}`)}</div></details></div></article>`);
    continue;
   }
   const finished=w.completed,grade=w.grade,validGrade=[1,2,3].includes(grade)?'高'+'一二三'[grade-1]:'年級未確認';
   const totalYears=w.maxYears===30?'30年':'三年';
   const status=finished?`${totalYears}完成・唯讀`:'生涯進行中';
   rows.push(`<article class="panel slot ui4-slot-card"><header class="ui4-slot-card__top"><span class="ui4-slot-card__number">SLOT ${i}</span><span class="ui4-slot-card__status ${finished?'ui4-slot-card__status--done':''}">${status}</span></header><div class="ui4-slot-card__identity"><h2>${esc(w.teacherName)}</h2><p>${esc(w.subject)}教師 <span aria-hidden="true">・</span> 任教第 ${w.tenure} 年</p></div><div class="ui4-slot-card__meta"><div><span>遊戲日期</span><strong>${esc(w.date)}</strong></div><div><span>班級年級</span><strong>${validGrade}</strong></div><div><span>生涯進度</span><strong>第 ${w.serviceYear} 年／${totalYears}</strong></div></div><div class="ui4-slot-card__actions">${button(finished?'唯讀查閱':'繼續遊戲',`load:${i}`,'class="ui4-slot-card__primary"')}<details class="ui4-slot-card__more"><summary>存檔管理</summary><div class="ui4-slot-card__more-actions">${button('匯出備份',`export:${i}`)}${button('覆蓋建立新生涯',`new:${i}`)}${button('匯入覆蓋',`import:${i}`)}${button('刪除存檔',`delete:${i}`,'class="ui4-slot-card__danger"')}</div></details></div></article>`);
  }catch(e){rows.push(`<article class="panel slot ui4-slot-card"><header class="ui4-slot-card__top"><span class="ui4-slot-card__number">SLOT ${i}</span></header><p class="error">無法讀取：${esc(e.message)}</p></article>`);}
 }
 set(`<main class="screen ui4-slots-screen"><header class="ui4-slots-screen__header"><p class="ui4-setup__eyebrow">LOCAL SAVE DATA</p><h1>選擇存檔</h1><p>三個存檔保存在此瀏覽器。重要進度建議定期匯出備份。</p></header><div class="slots">${rows.join('')}</div><footer class="ui4-slots-screen__footer">${button('返回首頁','home')}</footer></main>`);
}
function draftStart(i){slot=i;draft={difficulty:'normal',subject:'國文',candidate:createCandidate({seed:seed(),playerId:'teacher',schoolId:'school'}),seed:seed(),careerKey:crypto.randomUUID(),taipeiDate:taipeiDate(),surname:'',givenName:'',nameMemoryWarning:false};proposal=null;showDifficulty();}
function showDifficulty(){
 screen='difficulty';
 const descriptions={easy:['資深導師','從任教第 20 年起步，帶著長期教學經驗面對新的一屆。'],normal:['中堅導師','從任教第 10 年起步，既有經歷與新的難題並存。'],hard:['新進導師','從任教第 1 年起步，以新手身分迎接校園日常。']};
 set(`<main class="screen ui4-setup ui4-setup--difficulty"><section class="panel stack"><header class="ui4-setup__header"><p class="ui4-setup__eyebrow">STEP 1 / 4 ・ 存檔 ${slot}</p><h2>選擇導師起點</h2><p>三種難度都遊玩三年，差別在教師起始年資。</p></header><div class="choices ui4-difficulty-cards">${Object.keys(labels).map(k=>button(`<span class="ui4-difficulty-card__level">${labels[k]}</span><strong>${descriptions[k][0]}</strong><span class="ui4-difficulty-card__tenure">任教第 ${tenures[k]} 年</span><small>${descriptions[k][1]}</small><span class="ui4-card__selection">${draft.difficulty===k?'✓ 已選擇':'點選以選擇'}</span>`,`difficulty:${k}`,`class="ui4-difficulty-card ${draft.difficulty===k?'selected':''}" aria-pressed="${draft.difficulty===k}"`)).join('')}</div><fieldset class="teacher-name-fields ui4-teacher-name"><legend>教師姓名（2～4 個中文字）</legend><label>姓氏 <input name="teacher-surname" aria-label="教師姓氏" maxlength="2" value="${esc(draft.surname)}" placeholder="姓氏"></label><label>名字 <input name="teacher-given-name" aria-label="教師名字" maxlength="3" value="${esc(draft.givenName)}" placeholder="名字"></label><p class="muted">支援複姓；正式建檔後姓名會隨存檔保存。</p></fieldset><div class="row ui4-setup__actions">${button('返回存檔','slots')}${button('下一步：教師前史與能力','teacher','class="ui4-setup__next"')}</div></section></main>`);
}
async function makeProposal(){
 await new Promise(r=>setTimeout(r,20));
 // Rebuild and rename an *uncommitted* proposal only. This database is distinct
 // from the three save slots and survives save deletion/replacement.
 const opening=createCareerOpening({candidate:draft.candidate,seed:draft.seed,taipeiDate:draft.taipeiDate,difficulty:draft.difficulty,subject:draft.subject,careerKey:draft.careerKey,teacherName:makeTeacherProfile(draft.surname,draft.givenName)});
 let recent=[];
 try{recent=await readNameMemory({factory:indexedDB,namespace:'development'});draft.nameMemoryWarning=false;}
 catch(error){draft.nameMemoryWarning=true;console.warn('姓名記憶庫無法讀取；本次僅保證生涯內不重名',error);}
 preferUnusedOpeningNames(opening,recent);
 return opening;
}
async function showTeacher(){screen='teacher';set('<main class="screen"><section class="panel"><p>正在建立教師與校園資料，請稍候…</p></section></main>');proposal=await makeProposal();const n=proposal.numeric.evolution.world,p=deriveWorldPanel(n),episodes=n.background?.episodes??[];set(`<main class="screen"><section class="panel stack"><h2>${esc(teacherDisplayName(proposal))}・教師與前史</h2><p>${labels[draft.difficulty]}・任教第 ${tenures[draft.difficulty]} 年。${episodes.length?'以下為同校既有經歷的摘要。':'這是首次任教，尚無資深前史。'}</p>${episodes.length?`<ul>${episodes.slice(0,3).map(x=>`<li>${esc(x.summary)}</li>`).join('')}</ul>`:''}<h3>六項長期能力</h3>${panelBars(p,ABILITY_NAMES)}<p class="muted">重抽使用正式候選機制；資深教師的能力包含合法前史。</p><div class="row">${button('返回','difficulty')}${button('重抽能力','reroll')}${button('選擇任教科目','subjects')}</div></section></main>`);}
function showSubjects(){
 screen='subjects';
 set(`<main class="screen ui4-setup ui4-setup--subjects"><section class="panel stack"><header class="ui4-setup__header"><p class="ui4-setup__eyebrow">STEP 3 / 4 ・ 存檔 ${slot}</p><h2>選擇任教科目</h2><p>九科擇一，每週固定 18 節，且必須任教自己的導師班。</p></header><div class="choices ui4-subject-cards">${Object.entries(SUBJECT_LOAD).map(([subject,load])=>button(`<strong>${subject}</strong><span class="ui4-subject-card__detail">${load[0]} 個班級 <span aria-hidden="true">／</span> 每班 ${load[1]} 節</span><span class="ui4-card__selection">${draft.subject===subject?'✓ 已選擇':'點選以選擇'}</span>`,`subject:${subject}`,`class="ui4-subject-card ${draft.subject===subject?'selected':''}" aria-pressed="${draft.subject===subject}"`)).join('')}</div><p class="ui4-setup__footnote">選擇後按「確認資料」進入總確認，正式課表會依原本的規則建立。</p><div class="row ui4-setup__actions">${button('返回教師能力','teacher')}${button('確認資料','review','class="ui4-setup__next"')}</div></section></main>`);
}
async function showReview(){screen='review';set('<main class="screen"><p>正在確認正式開局資料…</p></main>');proposal=await makeProposal();const n=proposal.numeric.evolution.world,p=deriveWorldPanel(n),start=newThreeYearStart(draft.taipeiDate);set(`<main class="screen"><section class="panel stack"><h2>最終確認</h2><p>教師姓名：${esc(teacherDisplayName(proposal))}</p><p>存檔 ${slot}・${labels[draft.difficulty]}・任教第 ${tenures[draft.difficulty]} 年<br>任教 ${draft.subject}・${SUBJECT_LOAD[draft.subject][0]} 班，每週 18 節，含導師班<br>起始學年 ${start.startYear}・${start.start} 暑輔開始</p><p>${n.background?.episodes.map(e=>esc(e.summary)).join(' ')||'首次任教，沒有資深前史。'}</p>${panelBars(p,ABILITY_NAMES)}<p class="notice">確認後才會寫入存檔。若此槽已有資料，將再次確認覆蓋。${draft.nameMemoryWarning?'（姓名歷史暫時無法讀取，跨生涯避重名可能無法生效。）':''}</p><div class="row">${button('返回修改','subjects')}${button('建立正式生涯','create')}</div></section></main>`);}
function lockControls(){const controls=[...app.querySelectorAll('button')].map(button=>({button,disabled:button.disabled}));for(const {button} of controls)button.disabled=true;return ()=>{for(const {button,disabled} of controls)if(button.isConnected)button.disabled=disabled;};}
async function storageAction(message,run){const note=document.createElement('p');note.className='operation-status';note.setAttribute('role','status');note.textContent=message;app.append(note);const previous=storyBusy,unlock=lockControls();storyBusy=true;try{return await run();}finally{note.remove();unlock();storyBusy=previous;}}
async function create(){return storageAction('正在檢查並安全寫入存檔…',async()=>{
 try{
  const {summary,token}=await workerRead({slot,summary:true});
  if(summary&&!confirm('此存檔已有生涯。覆蓋後原資料將消失，建議先匯出。確定繼續？'))return;
  if(summary&&!confirm('再次確認：要以新生涯覆蓋這個存檔嗎？'))return;
  set('<main class="screen"><p role="status">正在安全寫入存檔，請稍候…</p></main>');
  const operation=summary?(summary.completed?{restart:proposal}:{replaceOpening:proposal}):{initialize:proposal};
  const {record,nameMemoryWarning}=await workerRead({slot,...operation,expectedToken:token,confirmed:true});current={snapshot:()=>record};openingPage=1;ceremonyPage=0;showGame();if(nameMemoryWarning)alert('生涯已成功儲存，但姓名歷史暫時無法更新；下次重玩可能再次出現相同名字。');
 }catch(error){await showReview();throw error;}
});}
async function load(i){slot=i;set('<main class="screen"><p role="status">正在讀取並驗證存檔…</p></main>');try{const {record}=await workerRead({slot:i});if(!record.payload)throw Error('存檔是空的');current={snapshot:()=>record};openingPage=0;ceremonyPage=0;showGame();}catch(error){showHome();throw error;}}
// Widgets share one detached read-only snapshot; every transaction replaces current.
let displayedSession=null,displayedWorld=null,displayedToken=null;
function gameData(){if(displayedSession!==current){displayedSession=current;const snap=current.snapshot();displayedWorld=snap.payload.world;displayedToken=snap.token;notebookCache.clear();notebookOwner=null;}return displayedWorld;}
function showGame(){screen='game';const w=gameData(),failed=!!failureResult(w),activeStory=currentStory(w),plan=w.extensions['teacher-hell/world'].plan,n=w.numeric.evolution.world,day=runtimeCalendarDay(w),panel=deriveWorldPanel(n),done=!!careerResult(w),grade=gradeAt(w.position.date,plan.startYear),period=periodLabel(w.position.date,day),aftercarePhase=!!aftercareWindow(w)&&w.position.date>=aftercareWindow(w).startDate,slotText=({early:'早自習',lunch:'午餐',noon:'午休',private:'私人時間',morning:'上午',afternoon:'下午',evening:'晚間',dinner:'晚餐','vacation-day':'假期','festival-day':'春節'})[w.position.slotId]??(w.position.slotId.startsWith('p')?`第 ${w.position.slotId.slice(1)} 節`:w.position.slotId);let place='';const occ=formalSlot(w);if(occ.slot.lesson&&(!aftercarePhase||continuesAftercareTeaching(w,occ.slot.lesson))){const table=plan.tables.find(t=>t.semesterId===occ.day.courseSemesterId);place=`・${classLabel(table,n.registry,occ.slot.lesson.classId)}`;}
const visualScene=selectScene({opening:openingPage>0,completed:done,failed,aftercare:aftercarePhase,
 sceneTag:activeStory?.page?.scene??null,presentation:activeStory?.page?.presentation??null,
 slotId:w.position.slotId,hasLesson:!!occ.slot.lesson,dayKind:day.kind,
 activityKinds:(day.slots.find(s=>s.id===w.position.slotId)?.activityIds??[]).map(id=>day.activities.find(a=>a.id===id)?.kind).filter(Boolean),
 grade,termId:day.term?.id??day.courseSemesterId});
app.dataset.sceneName=visualScene?.filename??'neutral';
set(`<main class="game game--story ${activeStory&&!done&&!failed&&!openingPage?'game--active-dialogue':''}" data-revision="${w.extensions['teacher-hell/world'].revision}"><div class="top">${w.position.date} 星期${'一二三四五六日'[weekday(w.position.date)-1]}・任教第 ${teacherTenure(w)} 年・導師 ${esc(teacherDisplayName(w))}・高${'一二三'[grade-1]}<br>遊玩第 ${w.position.serviceYear} 學年・${aftercarePhase?'六月教師善後':period}・${aftercarePhase?'週進度':slotText}${place}</div><nav class="game-nav">${button('課表','timetable')}${button('筆記本','notebook')}${button('選單','menu')}</nav><section class="states" aria-label="教師當前狀態">${STATE_NAMES.map(k=>`<div class="state-meter"><span class="state-meter__head"><span class="state-meter__name">${esc(k)}</span><span class="state-meter__value">${value(panel[k])}</span></span><progress max="100" value="${Math.max(0,Math.min(100,Number(panel[k])||0))}" aria-label="${esc(k)}"></progress></div>`).join('')}${button('<span aria-hidden="true">▤</span> 教師能力與狀態 <span aria-hidden="true">›</span>','panel','class="state-detail-button" aria-label="查看教師六項長期能力與六項當前狀態"')}</section>${activeStory&&!done&&!failed&&!openingPage?renderStoryView(activeStory):`<div class="story ${!done&&!failed?'story--idle':''}">${done?completionCard(w):failed?failureCard(w):openingPage===1?'【開場 1／2】暑輔的第一天，你站在校門前。新的三年，從這裡開始。':openingPage===2?'【開場 2／2】走進校園，準備迎接你的導師班。接下來依校曆與班級近況展開。':aftercareWindow(w)&&w.position.date>=aftercareWindow(w).startDate?'學生已離校，導師繼續處理六月善後。':aftercareWindow(w)&&w.position.date===aftercareWindow(w).ceremonyDate?'畢業典禮依正式校曆進行。':'依正式校曆處理課程、校務及事件。'}${!done&&!failed&&!openingPage?(scheduledPhase(day,w.position.slotId)?'<p>'+esc(scheduledPhase(day,w.position.slotId))+'</p>':'')+h4Controls(w)+progressionControls(w):''}${openingPage?`<p>${button(openingPage===1?'下一頁':'結束開場','opening-next')}</p>`:''}</div>`}</main>`);mountSceneBackground(app,visualScene);if(activeStory&&!done&&!failed&&!openingPage)void mountStoryPortraits(app);showPendingReview();void remindKnownDeadlines().catch(error=>console.error('待辦提醒查閱失敗',error));}
function h4Controls(w){
 const bounds=aftercareWindow(w);if(!bounds)return '';
 const fact=w.extensions['teacher-hell/world'].facts.findLast(f=>f.data.graduationSummary);
 if(w.position.date===bounds.ceremonyDate){
  const summary=fact?.data.graduationSummary,pages=[summary?.description??'畢業典禮依正式校曆進行；資格與錄取仍以當時正式紀錄為準。',...(summary?.representatives??[]).map(p=>(w.numeric.evolution.world.registry.profiles[p.personId]?.displayName??p.personId)+'：'+p.interaction)];
  ceremonyPage=Math.min(ceremonyPage,pages.length-1);
  return `<p>${esc(pages[ceremonyPage])}</p>${pages.length>1?`<nav aria-label="畢典敘事分頁">${button('上一頁','ceremony-page:-1',ceremonyPage===0?'disabled':'')} ${ceremonyPage+1}／${pages.length} ${button('下一頁','ceremony-page:1',ceremonyPage===pages.length-1?'disabled':'')}</nav>`:''}`;
 }
 if(w.position.date<bounds.startDate)return '';
 const state=readAftercare(w),last=state.weeks.at(-1);
 return `<p>${esc(state.adoption?.notice??'從目前日期接續六月教師善後，保留先前歷史。')}</p>${last?`<p>${last.startDate}～${last.endDate}：${esc(last.summary)}</p>`:''}${state.next.status==='boundary'?'<p>已到六月教師結算邊界。</p>':''}`;
}
function failureCard(w){const result=failureResult(w);return `<h3>本學年導師職務中斷</h3><p>${esc(result?.data?.summary??'本學年已依正式事件紀錄結束。')}</p><p>${button('閱讀失敗結果與重試安排','year-result')}</p>`;}
function completionCard(w){const d=careerResult(w).data,years=d.years===3?'三年':`${d.years}年`;return `<h3>${years}任期完成</h3><p>${esc(d.rating.grade)}・${value(d.rating.score)}</p><p>完成於 ${esc(w.position.date)}。此槽為唯讀。</p><p>${button('結局與任期成果','completion-details')}</p>`;}
function progressionControls(w){const next=nextProgression(w);if(next.status==='review-required')return `<p>${button('閱讀學期報告','review-open')}</p>`;return next.status==='action'?`<p>${button(next.label,'progress')}</p>`:`<p role="status">${esc(next.label??({ 'review-required':'請先閱讀學期報告','attention-required':'請先處理事件','failed':'本次任期已結束',boundary:'已到結算邊界' }[next.status]??''))}</p>`;}
// UI-only reminders. No new game transaction, no browser notification permission, no deadline judgment changes.
const remindedTaskIds=new Set();
let taskReminderRevision=null;
async function remindKnownDeadlines(){
 if(!current||screen!=='game'||storyBusy||document.querySelector('.overlay'))return;
 const world=gameData();
 if(careerResult(world))return;
 const history=world.extensions['teacher-hell/world'].history,latest=history.at(-1);
 // Ordinary timetable progression is checked once per game day; a newly committed
 // story/institution action may create a same-day responsibility.
 const trigger=latest&&['story','institution'].includes(latest.type)?latest.id:null;
 const checkpoint=JSON.stringify([world.identity.attemptId,world.position.date,trigger]);
 if(taskReminderRevision===checkpoint)return;
 const key=JSON.stringify(displayedToken);
 const {items}=await notebookData('tasks');
 if(!current||screen!=='game'||JSON.stringify(displayedToken)!==key||document.querySelector('.overlay'))return;
 taskReminderRevision=checkpoint;
 const today=world.position.date;
 const tomorrow=addDays(today,1);
 const eligible=items.filter(t=>t.due&&t.due<=tomorrow&&!remindedTaskIds.has(JSON.stringify([world.identity.attemptId,t.id,t.due])));
 if(!eligible.length)return;
 for(const t of eligible)remindedTaskIds.add(JSON.stringify([world.identity.attemptId,t.id,t.due]));
 const rows=eligible.slice(0,5).map(t=>`<li>${esc(t.label)}（${esc(t.due)}${t.overdue?'，期限已過':t.due===today?'，今日到期':'，明日到期'}）</li>`).join('');
 dialog('校務待辦提醒',`<p>以下事項仍須依正式校務或事件流程處理，提醒不等於失敗，也不改變存檔。</p><ul>${rows}</ul>${eligible.length>5?'<p>其他項目請至筆記本待辦事項查閱。</p>':''}`);
}
function forgetCurrentView(){current=null;displayedSession=null;displayedWorld=null;displayedToken=null;notebookCache.clear();notebookOwner=null;}
function workerRead(data){return new Promise((resolve,reject)=>{const worker=new Worker(new URL('./progress-worker.js',import.meta.url),{type:'module'});worker.onmessage=({data})=>{worker.terminate();data.ok?resolve(data):reject(Object.assign(Error(data.message),{code:data.code}));};worker.onerror=e=>{worker.terminate();reject(Error(e.message));};worker.postMessage(data);});}
let notebookOwner=null,notebookCache=new Map();
async function notebookData(kind,studentId=null,termId=null){
 const owner=JSON.stringify(displayedToken);if(notebookOwner!==owner){notebookOwner=owner;notebookCache=new Map();}
 const key=JSON.stringify([kind,studentId,termId]);if(notebookCache.has(key))return notebookCache.get(key);
 const note=document.createElement('p');note.className='operation-status';note.setAttribute('role','status');note.textContent='正在查閱保存紀錄…';document.querySelector('.game')?.append(note);storyBusy=true;const unlock=lockControls();
 const reading=workerRead({slot,view:kind,studentId,termId,token:displayedToken}).then(r=>r.projection);notebookCache.set(key,reading);
 try{return await reading;}catch(error){notebookCache.delete(key);throw error;}finally{note.remove();unlock();storyBusy=false;}
}
function showYearResult(){
 const result=projectYearResult(gameData());
 if(!result)throw new RangeError('尚無正式保存的學年結果');
 yearResultPage=0;
 dialog('學年結算與重試',renderYearResult(result,yearResultPage));
}
async function retryFailedYear(){
 const w=gameData(),result=projectYearResult(w);
 if(!result?.retryEligible||!failureResult(w))throw new RangeError('只有已保存的當學年失敗可重新挑戰');
 if(!confirm('確定重新開始當前學期？上學期從暑輔第一天開始，下學期從上學期期末結算完成後接續。先前學期與學年的成果保留，本次失敗嘗試的變化將撤銷。建議先匯出備份。'))return;
 const options={
  attemptId:createId('attempt',[w.identity.careerId,'retry',crypto.randomUUID()]),
  seeds:{settlement:seed(),streams:Object.fromEntries(current.snapshot().retryStreams.map(key=>[key,seed()]))},
  failureId:result.failureId,failedAttemptId:w.identity.attemptId,schoolYearId:w.position.schoolYearId,
  expectedRevision:w.extensions['teacher-hell/world'].revision
 };
 const token=displayedToken;
 try{
  const {record}=await workerRead({slot,retry:options,expectedToken:token});
  document.querySelector('.overlay')?.remove();
  current={snapshot:()=>record};openingPage=0;ceremonyPage=0;
  showGame();
 }catch(error){
  // A write may have succeeded before the response was lost. Reload the real
  // slot instead of pretending the failed attempt still exists.
  try{const {record}=await workerRead({slot});current=record.payload?{snapshot:()=>record}:null;}catch{}
  document.querySelector('.overlay')?.remove();
  if(current)showGame();else showHome();
  throw error;
 }
}
async function executeProgress(request){
 const previous=gameData().extensions['teacher-hell/world'].history.findLast(h=>h.type==='annual-success'||h.type==='annual-failure')?.id??null;
 storyBusy=true;const unlock=lockControls(),note=document.createElement('p');note.setAttribute('role','status');note.textContent='正在處理並保存，請稍候…';note.className='operation-status';document.querySelector('.game')?.append(note);
 document.querySelectorAll('[data-action="progress"]').forEach(b=>b.disabled=true);
 try{
  const {record}=await workerRead({slot,request,expectedToken:displayedToken});current={snapshot:()=>record};showGame();
  const latest=gameData().extensions['teacher-hell/world'].history.findLast(h=>h.type==='annual-success'||h.type==='annual-failure')?.id??null;
  if(latest&&latest!==previous&&!document.querySelector('.overlay'))showYearResult();
 }catch(error){try{const {record}=await workerRead({slot});current=record.payload?{snapshot:()=>record}:null;}catch{}if(current)showGame();else showHome();throw error;}
 finally{unlock();storyBusy=false;if(screen==='game')void remindKnownDeadlines().catch(error=>console.error('待辦提醒查閱失敗',error));}
}
function showPendingReview(){
 if(!current||document.querySelector('.overlay')||failureResult(gameData())||careerResult(gameData()))return;
 const d=projectNotebookReviews(gameData());if(!d.pendingId)return;
 dialog('學期總結｜必須閱讀後才能繼續',renderNotebookReviews(d,d.pendingId,true));
}
async function acknowledgeReview(id){
 const w=gameData(),pending=pendingSemesterReview(w);
 if(!pending||pending.id!==id)throw new RangeError('No matching pending semester review');
 const runtime=w.extensions['teacher-hell/world'];
 await executeProgress({id:createId('operation',[w.identity.attemptId,'read-semester-review',id]),attemptId:w.identity.attemptId,expectedRevision:runtime.revision,actorId:w.identity.playerId,preconditions:[],operations:[{type:'read-semester-review',reviewId:id}]});
 close();showGame();
}
function showTimetable(){const w=gameData(),plan=w.extensions['teacher-hell/world'].plan,n=w.numeric.evolution.world,base=viewedWeek??weekMonday(w.position.date),grade=gradeAt(w.position.date,plan.startYear);let cells='<div></div>'+['一','二','三','四','五'].map(x=>`<div class="head">週${x}</div>`).join('');for(let period=1;period<=8;period++){cells+=`<div class="period">${period}</div>`;for(let d=0;d<5;d++){const date=addDays(base,d),day=calendarDay(date,grade,plan.calendarVersion),table=plan.tables.find(t=>t.semesterId===day.courseSemesterId),s=day.slots.find(x=>x.id===`p${period}`);let label='',detail=`${date} 第 ${period} 節：空堂`;if(aftercareCellIsEmpty(w,date,s,table&&s?slotOccupancy(date,grade,s.id,table,plan.calendarVersion):null)){label='';detail=`${date}：原班已離校，使用週善後流程`;}else if(!s){label=day.holiday[0]?.name??((day.activities[0]?activityName(day.activities[0]):'休假'));detail=`${date}：${label}`;}else if(s.kind==='activity'){label='活動';detail=`${date} 第 ${period} 節：${day.activities.filter(a=>s.activityIds.includes(a.id)).map(activityName).join('、')}`;}else if(s.kind==='exam'){label=scheduledPhase(day,s.id)??'考試';detail=`${date} 第 ${period} 節：${label}`;}else if(s.kind==='assembly'||s.kind==='class-meeting'){label=s.kind==='assembly'?'週會':'班會';detail=`${date} 第 ${period} 節：${label}`;}else if(!table){label='未排定';detail=`${date} 第 ${period} 節：此學期課表尚未建立`;}else if(table){const o=slotOccupancy(date,grade,`p${period}`,table,plan.calendarVersion),c=o.lesson&&n.registry.classes[o.lesson.classId];if(c){label=classLabel(table,n.registry,c.id);detail=`${date} 第 ${period} 節：${label}・${table.subject}`;}}cells+=button(esc(label),'cell',`data-detail="${esc(detail)}" aria-label="${esc(label||'空堂')}"`);}}
const first=calendarDay(base,grade,plan.calendarVersion),weeks=comparableWeeks(w.position.date,grade,plan.calendarVersion),actual=base===weeks.actual;dialog('完整週課表',`<section class="ui3-timetable"><p>${base} 起・${first.week?`第 ${first.week} 週（${first.week%2?'單':'雙'}週）`:periodLabel(base,first)}・${actual?'實際當週':'比較週，非實際當週'}</p><div class="row">${button('單週','week:odd',weeks.odd?'':'disabled')}${button('雙週','week:even',weeks.even?'':'disabled')}${button('回到實際當週','week:actual')}</div><p class="muted">${weeks.odd&&weeks.even?'切換只供查閱，不會改變遊戲時間。':'目前沒有可比較的同學期單雙週；顯示實際當週。'} 點格子查看資訊。</p><div class="table">${cells}</div></section>`);}
function close(){if(current&&!failureResult(gameData())&&!careerResult(gameData())&&pendingSemesterReview(gameData())&&document.querySelector('.overlay .notebook-reviews'))return;document.querySelector('.overlay')?.remove();}
async function act(action,el){if(action==='outside'){if(el.classList.contains('overlay'))close();return;}if(action==='close'){close();return;}if(action==='home'){showHome();return;}if(action==='slots'){await showSlots();return;}if(action==='continue'){for(let i=1;i<=3;i++){const s=await workerRead({slot:i,summary:true});if(s.summary){await load(i);return;}}await showSlots();return;}if(action==='help'){dialog('遊戲說明',`<div class="help-guide ui4-info-panel"><p>一段三年的私校導師生涯，由你的選擇推進。</p><h3>開始生涯</h3><p>在「選擇存檔」建立教師，依序選難度、姓名、重抽六項長期能力、選任教科目，再確認建檔。三種難度的遊玩長度都是三年。</p><h3>每日流程與事件</h3><p>主畫面以「進度」接續課程及校務。遇到事件時先閱讀劇情，再選擇處理方式；確認後才會正式執行，結果可能影響後續人物關係與事件。</p><h3>查閱校務</h3><p>課表可查看單雙週及任課安排；筆記本可查已知人物、關係、學業、歷史和待辦。查閱資料不會推進遊戲時間。</p><h3>存檔與結算</h3><p>三個存檔保存在本機瀏覽器，建議定期匯出備份。六月先閱讀學年報告，再執行結算；三年結束後原槽仍可唯讀查閱，覆蓋之前請先匯出。</p></div>`);return;}if(action==='dev-center'){showDeveloperCenter();return;}if(action==='ui4-preview'){ui4PreviewCase='phone';ui4PreviewPage=0;showUi4Preview();return;}if(action==='scene-preview'){scenePreviewCase='opening';scenePreviewCast='two';showScenePreview();return;}if(action==='ui2-preview'){ui2PreviewState=makeUi2PreviewState();showUi2Preview();return;}if(action==='art-preview'){dialog('美術素材預覽',renderArtPreview());mountArtPreview(document.querySelector('.overlay .art-preview'));return;}if(action==='settings'){dialog('設定','<section class="ui4-info-panel"><h3>顯示與操作</h3><p>遊戲可在手機直式與電腦橫式操作；遊玩資料儲存在本機瀏覽器。</p><h3>配樂</h3><p>正式配樂開關及音量將在 15-E 完成後提供；目前沒有可調整的音樂設定。</p><h3>版本資訊</h3><p>《教師荒謬地獄》開發預覽版。建議定期匯出存檔備份。</p></section>');return;}
const [cmd,...argParts]=action.split(':');const arg=argParts.join(':');if(screen==='ui4-preview'&&cmd==='notebook-review'){showUi4Preview();return;}if(cmd==='ui4-case'){if(!UI4_CASES.some(([key])=>key===arg))return;ui4PreviewCase=arg;ui4PreviewPage=0;showUi4Preview();return;}if(cmd==='year-result-page'&&screen==='ui4-preview'){ui4PreviewPage=Math.max(0,Math.min(3,Number(arg)||0));showUi4Preview();return;}if(cmd==='new'){draftStart(Number(arg));return;}if(cmd==='load'){await load(Number(arg));return;}if(cmd==='difficulty'){if(arg){draft.difficulty=arg;proposal=null;showDifficulty();}else showDifficulty();return;}if(cmd==='teacher'){try{makeTeacherProfile(draft.surname,draft.givenName);}catch(e){alert(e.message);return;}await showTeacher();return;}if(cmd==='reroll'){draft.candidate=rerollCandidate(draft.candidate);proposal=null;await showTeacher();return;}if(cmd==='subjects'){showSubjects();return;}if(cmd==='subject'){draft.subject=arg;proposal=null;showSubjects();return;}if(cmd==='review'){await showReview();return;}if(cmd==='create'){await create();return;}if(cmd==='opening-next'){openingPage=openingPage===1?2:0;showGame();return;}if(cmd==='ceremony-page'){ceremonyPage=Math.max(0,ceremonyPage+Number(arg));showGame();return;}if(cmd==='progress'){const next=nextProgression(gameData());if(next.status==='action')await executeProgress(next.request);else showGame();return;}if(cmd==='completion-details'){await act('notebook');await act('notebook-tab:career');return;}if(cmd==='panel'){const p=deriveWorldPanel(gameData().numeric.evolution.world);dialog('教師狀態',`<h3>長期能力</h3>${panelBars(p,ABILITY_NAMES)}<h3>當前狀態</h3>${panelBars(p,STATE_NAMES)}`);return;}if(cmd==='timetable'){viewedWeek=null;showTimetable();return;}if(cmd==='week'){const w=gameData(),p=w.extensions['teacher-hell/world'].plan,weeks=comparableWeeks(w.position.date,gradeAt(w.position.date,p.startYear),p.calendarVersion);if(weeks[arg])viewedWeek=weeks[arg];close();showTimetable();return;}if(cmd==='cell'){alert(el.dataset.detail);return;}if(cmd==='review-open'){document.querySelectorAll('.overlay').forEach(node=>node.remove());showPendingReview();return;}if(cmd==='review-ack'){await acknowledgeReview(arg);return;}
if(cmd==='year-result'){document.querySelector('.overlay')?.remove();showYearResult();return;}
if(cmd==='year-result-page'){
 if(!document.querySelector('.overlay .year-result'))return;
 const page=Number(arg);if(!Number.isInteger(page)||page<0||page>3)return;
 const result=projectYearResult(gameData());if(!result)return;
 yearResultPage=page;document.querySelector('.overlay .year-result').outerHTML=renderYearResult(result,page);return;
}
if(cmd==='year-retry'){if(!document.querySelector('.overlay .year-result'))return;await retryFailedYear();return;}
if(cmd==='notebook-task-story'){
 if(notebookTab!=='tasks'||!document.querySelector('.overlay .notebook-tasks'))return;
 const world=gameData(),task=(await notebookData('tasks')).items.find(item=>item.id==='story:'+arg);
 // The saved current world is the authority, never the HTML button alone.
 if(!task||task.navigation!=='story'||task.availability!=='ready'||currentStory(world)?.eventId!==arg)
  throw new RangeError('這件事件目前無法直接接續，請重新查閱待辦事項');
 close();document.querySelector('.story-view')?.setAttribute('tabindex','-1');
 document.querySelector('.story-view')?.focus();
 return;
}
if(cmd==='notebook'){notebookTab='people';notebookPersonId=null;notebookPersonCategory='student';notebookPersonSearch='';notebookEventSearch='';notebookEventView='time';notebookEventTerm=null;notebookEventYear='all';notebookEventKind='all';notebookEventPage=1;notebookAcademicStudent=null;notebookAcademicTerm=null;notebookReviewId=null;const w=gameData(),plan=w.extensions['teacher-hell/world'].plan;const people=await notebookData('people');dialog('筆記本',renderNotebookView({date:w.position.date,grade:gradeAt(w.position.date,plan.startYear),readonly:!!careerResult(w),tab:'people',people,personCategory:'student'}));return;}
if(['notebook-tab','notebook-person','notebook-person-category','notebook-event-year','notebook-event-kind','notebook-event-page','notebook-event-view','notebook-event-term','notebook-academic-student','notebook-academic-term','notebook-review'].includes(cmd)){
 if(!current||!document.querySelector('.overlay .notebook'))return;
 const w=gameData(),plan=w.extensions['teacher-hell/world'].plan;
 if(cmd==='notebook-tab'){
  notebookTab=arg;notebookPersonId=null;notebookPersonCategory='student';notebookPersonSearch='';notebookEventSearch='';notebookEventView='time';notebookEventTerm=null;notebookEventYear='all';notebookEventKind='all';notebookEventPage=1;notebookAcademicStudent=null;notebookAcademicTerm=null;notebookReviewId=null;
 }
 if(cmd==='notebook-person-category'){
   if(notebookTab!=='people'||!['student','caregiver','other'].includes(arg))return;
   notebookPersonCategory=arg;notebookPersonId=null;
  }
  if(cmd==='notebook-person'){
  if(notebookTab!=='people')return;
  const available=await notebookData('people');
  const target=available.people.find(p=>p.id===arg);
  if(!target)throw new RangeError('Unknown notebook person');
  // A relation link may point outside the current category or search results.
  notebookPersonCategory=target.kind;
  notebookPersonSearch='';
  notebookPersonId=arg;
 }
 if(cmd==='notebook-event-year'||cmd==='notebook-event-kind'||cmd==='notebook-event-page'||cmd==='notebook-event-view'||cmd==='notebook-event-term'){
  if(notebookTab!=='events')return;
  if(cmd==='notebook-event-year'){notebookEventYear=arg;notebookEventPage=1;}
  if(cmd==='notebook-event-kind'){notebookEventKind=arg;notebookEventPage=1;}
  if(cmd==='notebook-event-page'){notebookEventPage=Number(arg);}
   if(cmd==='notebook-event-view'){notebookEventView=arg;notebookEventPage=1;}
   if(cmd==='notebook-event-term'){notebookEventTerm=arg;notebookEventPage=1;}
 }
 if(cmd==='notebook-academic-student'||cmd==='notebook-academic-term'){
  if(notebookTab!=='academics')return;
  if(cmd==='notebook-academic-student'){
   const available=await notebookData('academics');
   if(!available.students.some(s=>s.id===arg))throw new RangeError('Unknown academic student');
   notebookAcademicStudent=arg;notebookAcademicTerm=null;
  }else{
   const available=await notebookData('academics',notebookAcademicStudent);
   if(!available.terms.some(t=>t.id===arg))throw new RangeError('Unknown academic term');
   notebookAcademicTerm=arg;
  }
 }
 if(cmd==='notebook-review'){
  if(notebookTab!=='semesters')return;
  if(!(await notebookData('reviews')).semesters.some(s=>s.id===arg))throw new RangeError('Unknown semester review');
  notebookReviewId=arg;
 }
 const reviews=notebookTab==='semesters'?await notebookData('reviews'):null;
 const career=notebookTab==='career'?await notebookData('career'):null;
 const academics=notebookTab==='academics'?await notebookData('academics',notebookAcademicStudent,notebookAcademicTerm):null;
 const people=notebookTab==='people'?await notebookData('people'):null;
 const events=notebookTab==='events'?await notebookData('events'):null;
  const tasks=notebookTab==='tasks'?await notebookData('tasks'):null;
 const html=renderNotebookView({date:w.position.date,grade:gradeAt(w.position.date,plan.startYear),readonly:!!careerResult(w),tab:notebookTab,people,selectedPersonId:notebookPersonId,personCategory:notebookPersonCategory,personSearch:notebookPersonSearch,events,eventSearch:notebookEventSearch,eventView:notebookEventView,eventTerm:notebookEventTerm,tasks,eventYear:notebookEventYear,eventKind:notebookEventKind,eventPage:notebookEventPage,academics,reviews,selectedReview:notebookReviewId,career});
 document.querySelector('.overlay .notebook').outerHTML=html;return;}if(cmd==='menu'){const hasYearResult=gameData().extensions['teacher-hell/world'].history.some(h=>h.type==='annual-success'||h.type==='annual-failure');dialog('選單',`<p>存檔管理、學年回顧及返回首頁</p>${hasYearResult?button('學年結果','year-result'):''} ${button('選擇存檔','slots')} ${button('返回首頁','home')}`);return;}if(cmd==='delete'){await storageAction('正在檢查存檔…',async()=>{const {summary,token}=await workerRead({slot:Number(arg),summary:true});if(!summary)return;if(confirm('確定刪除此存檔？建議先匯出備份。')&&confirm('再次確認：刪除後無法復原。')){await workerRead({slot:Number(arg),delete:true,expectedToken:token,confirmed:true});await showSlots();}});return;}
if(cmd==='export'){await storageAction('正在驗證並匯出完整存檔…',async()=>{const {blob}=await workerRead({slot:Number(arg),export:true}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`teacher-hell-slot-${arg}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});return;}
if(cmd==='import'){const input=document.createElement('input');input.type='file';input.accept='.json,application/json';input.onchange=async()=>{try{if(!input.files.length)return;await storageAction('正在驗證匯入存檔…',async()=>{const incoming=input.files[0],{review}=await workerRead({slot:Number(arg),reviewImport:incoming});if(!confirm(`匯入生涯 ${review.incoming.identity.careerId}？${review.replacing?'此槽已有存檔，將被覆蓋。':''}`))return;if(review.replacing&&!confirm('再次確認覆蓋原存檔？'))return;await workerRead({slot:Number(arg),import:incoming,expectedToken:review.token,confirmed:true});await showSlots();});}catch(e){alert(`匯入失敗：${e.message}`);}};input.click();}}

app.addEventListener('change',event=>{
 if(screen!=='scene-preview')return;
 if(event.target.matches('[data-scene-case]')){scenePreviewCase=event.target.value;showScenePreview();}
 else if(event.target.matches('[data-scene-cast]')){scenePreviewCast=event.target.value;showScenePreview();}
});
app.addEventListener('input',event=>{
 const field=event.target.closest('input[name="teacher-surname"],input[name="teacher-given-name"]');
 if(!field||!draft||screen!=='difficulty')return;
 if(field.name==='teacher-surname')draft.surname=field.value;
 if(field.name==='teacher-given-name')draft.givenName=field.value;
});
app.addEventListener('change',async event=>{
 const field=event.target.closest('[data-notebook-search]');if(!field||!current||!document.querySelector('.overlay .notebook'))return;
 const kind=field.dataset.notebookSearch;
 if(kind==='people')notebookPersonSearch=field.value;
 else if(kind==='events'){notebookEventSearch=field.value;notebookEventPage=1;}
 else return;
 try{
  const w=gameData(),plan=w.extensions['teacher-hell/world'].plan,people=kind==='people'?await notebookData('people'):null,events=kind==='events'?await notebookData('events'):null;
  document.querySelector('.overlay .notebook').outerHTML=renderNotebookView({date:w.position.date,grade:gradeAt(w.position.date,plan.startYear),readonly:!!careerResult(w),tab:notebookTab,people,selectedPersonId:notebookPersonId,personCategory:notebookPersonCategory,personSearch:notebookPersonSearch,events,eventYear:notebookEventYear,eventKind:notebookEventKind,eventPage:notebookEventPage,eventSearch:notebookEventSearch,eventView:notebookEventView,eventTerm:notebookEventTerm});
 }catch(error){alert('查詢失敗：'+error.message);}
});
app.addEventListener('change',event=>{
 if(screen!=='ui2-preview')return;
 if(event.target.matches('[data-ui2-case]')){ui2PreviewState.caseId=event.target.value;ui2PreviewState.page=0;ui2PreviewState.selected=null;ui2PreviewState.confirmed=false;showUi2Preview();}
 if(event.target.matches('[data-ui2-left-expression]')){ui2PreviewState.leftExpression=Number(event.target.value);showUi2Preview();}
 if(event.target.matches('[data-ui2-right-expression]')){ui2PreviewState.rightExpression=Number(event.target.value);showUi2Preview();}
});
app.addEventListener('click',async event=>{
 if(screen==='ui2-preview'){
  const control=event.target.closest('[data-story-action]');
  const surface=event.target.closest('[data-story-advance]');
  if(control||surface&&!event.target.closest('button,a,input,select,textarea')){
   const action=control?.dataset.storyAction??surface.dataset.storyAdvance;
   ui2PreviewAction(ui2PreviewState,action,control?.dataset.optionId??null);
   showUi2Preview();return;
  }
 }
 if(screen==='game'&&current&&!document.querySelector('.overlay')){
  const control=event.target.closest('[data-story-action]');
  // Long chat/document/phone contents must be selectable and scrollable
  // without accidentally turning the page.
  const surface=event.target.closest('[data-story-advance]');
  const safeSurface=surface&&!event.target.closest('.story-chat,.story-document,.story-phone,button,a,input,select,textarea,[role="button"]');
  if(control||safeSurface){
   if(storyBusy)return;
   const action=control?.dataset.storyAction??safeSurface.dataset.storyAdvance;
   const optionId=action==='select'?control?.dataset.optionId:null;
   try{storyBusy=true;
    const w=gameData(),view=currentStory(w);
    if(!view)throw Error('沒有可操作的正式劇情');
    const request=makeStoryRequest(w,view.eventId,action,optionId);
    await executeProgress(request);
   }catch(error){console.error(error);alert(`劇情操作失敗：${error.message}`);}
   finally{storyBusy=false;}
   return;
  }
 }
 if(storyBusy)return;
 const el=event.target.closest('[data-action]');if(!el)return;const action=el.dataset.action;if(action==='outside'&&event.target!==el)return;try{el.disabled=true;await act(action,el);}catch(error){console.error(error);alert(`操作失敗：${error.message}`);if(screen==='slots')await showSlots();}finally{el.disabled=false;}});
showHome();
