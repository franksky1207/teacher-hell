import {validateStoryMusic} from './story-music.js';
import {advanceStoryPerformance,createStoryPerformance} from './story-performance.js';

const pageLine=/^[ \t]*-[ \t]*\*\*(P\d{2,})｜([^\r\n]+?)\*\*：[ \t]?(.*)$/gm;
const nameToken=/^\{\{\s*([a-z][a-z0-9_]*)\.name\s*\}\}$/;
const formats=new Set(['dialogue','narration','phone','chat','notice','email','news']);
const object=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
const reject=message=>{throw new RangeError('AVG 演出：'+message);};

export function storyOpeningPages(opening){
 const matches=[...opening.matchAll(pageLine)];
 if(!matches.length)return [{id:null,label:null,text:opening.trim()}];
 return matches.map((match,i)=>({
  id:match[1],label:match[2].trim(),
  text:(match[3]+opening.slice(match.index+match[0].length,matches[i+1]?.index??opening.length)).trim()
 }));
}

const slotHeading=/^[ \t]*[-*+][ \t]+\*\*常駐數值角色槽位\*\*[：:]?[ \t]*\r?$/m;
const sectionThree=/^ {0,3}##[ \t]+3[ \t]*[｜|][^\r\n]*\r?\n([\s\S]*?)(?=^ {0,3}##[ \t]+|(?![\s\S]))/m;
const slotKey=/^[a-z][a-z0-9_]*$/;

export function storySlotRows(section){
 const heading=slotHeading.exec(section);
 if(!heading)return [];
 const lines=section.slice(heading.index+heading[0].length).trimStart().split(/\r?\n/);
 const table=[];
 for(const line of lines){
  const row=line.trim();
  if(!row.startsWith('|')||!row.endsWith('|'))break;
  table.push(row.slice(1,-1).split('|').map(cell=>cell.trim().replace(/^`([^`]+)`$/,'$1')));
 }
 return table.filter(row=>row[0]!=='槽位鍵'&&!row.every(cell=>/^:?-+:?$/.test(cell)));
}

export function storySlotIdentity(description){
 return description.split(/[，,；;：:、]/,1)[0].trim();
}

export function storySlotKind(identity){
 const role=identity.match(/(?<guardian>(?:本班學生(?:的)?(?:合法)?(?:家長|實際照顧者))|家長|照顧者)|(?<student>本班學生|導師班學生|學生)|(?<staff>教職|教師|老師|校長|行政|護理|輔導|學務|教務|支援)/)?.groups;
 if(role?.guardian)return 'guardian';
 if(role?.student)return 'student';
 if(role?.staff||/校內/.test(identity))return 'staff';
 return null;
}

export function storyPreviewSlots(markdown){
 const section=sectionThree.exec(markdown)?.[1]??'';
 const slots=new Map(),seen=new Set();
 for(const [role,description,...constraints] of storySlotRows(section)){
  if(!slotKey.test(role)||role==='teacher'||constraints.length!==2)reject('非法角色槽位 '+role);
  if(seen.has(role))reject('重複角色槽位 '+role);
  seen.add(role);
  const kind=storySlotKind(storySlotIdentity(description));
  if(kind)slots.set(role,kind);
 }
 return slots;
}

function legacySpeaker(label,roles,marked){
 if(!label||label==='旁白')return null;
 const token=label.match(nameToken)?.[1];
 const key=token??label;
 if(marked&&(token||slotKey.test(label))&&!roles.has(key))reject('未知說話者 '+key);
 return roles.has(key)?key:null;
}

function authoredPage(cue,text,speaker,roles){
 if(!object(cue)||Object.keys(cue).some(key=>!['scene','speaker','presentation','enter','exit','expression','pose'].includes(key)))reject('未知頁面欄位');
 const {scene,presentation,...performance}=cue;
 const explicitSpeaker=Object.hasOwn(performance,'speaker');
 const namedSpeaker=explicitSpeaker?performance.speaker:speaker;
 delete performance.speaker;
 if(explicitSpeaker&&speaker&&speaker!==namedSpeaker)reject('演出說話者與正文不一致');
 if(namedSpeaker!==null&&!roles.has(namedSpeaker))reject('未知說話者 '+namedSpeaker);
 if(presentation!==undefined&&!formats.has(presentation))reject('未知呈現形式 '+presentation);
 if(['dialogue','phone','chat'].includes(presentation)&&namedSpeaker===null)reject('對話、電話或通訊頁需要說話者');
 const page={text,speaker:namedSpeaker,presentation:presentation??(namedSpeaker?'dialogue':'narration'),performance};
 if(Object.hasOwn(cue,'scene'))page.scene=scene;
 return page;
}

/** The reader export retains the exact Markdown even when its index lacks music. */
export function storyMusicFromMarkdown(source){
 let section=null,music;
 for(const line of source.split(/\r?\n/)){
  const heading=/^ {0,3}##[ \t]+([1-5])[ \t]*[｜|]/.exec(line);
  if(heading)section=heading[1];
  const row=/^[ \t]*\|[ \t]*`?music`?[ \t]*(?:｜[^|]*)?\|(.*)$/.exec(line);
  if(!row)continue;
  if(section!=='1')reject('music 只能設定於第 1 區的故事基本資料');
  if(music!==undefined)reject('每篇只能指定一個 music');
  const value=/^([^|]*)\|[ \t]*$/.exec(row[1]);
  if(!value)reject('music 須填單一音樂代碼');
  music=validateStoryMusic({music:value[1].trim()});
 }
 return music;
}

/** Use the public reader's opening/results and preserve its private mechanics as-is. */
export function compileStoryPreview(detail,slots=storyPreviewSlots(detail.sourceMarkdown??'')){
 const source=detail.sourceMarkdown??'';
 const authoredMusic=storyMusicFromMarkdown(source),exportedMusic=validateStoryMusic(detail);
 if(authoredMusic!==undefined&&exportedMusic!==undefined&&authoredMusic!==exportedMusic)reject('匯出與原稿的事件音樂不一致');
 const music=exportedMusic??authoredMusic;
 if(detail.results.some(result=>Object.hasOwn(result,'music')))reject('music 只能設定於整篇故事');
 const blocks=[...source.matchAll(/^[ \t]*```avg[ \t]*\r?\n([\s\S]*?)^[ \t]*```[ \t]*\r?$/gm)];
 const fences=[...source.matchAll(/^[ \t]*```avg[ \t]*\r?$/gm)];
 if(fences.length>1)reject('每篇只能有一個 avg 區塊');
 if(fences.length!==blocks.length)reject('avg 區塊未結束');
 let cues={};
 if(blocks.length){
  try{cues=JSON.parse(blocks[0][1]);}
  catch{reject('avg 區塊的 JSON 格式錯誤');}
  if(!object(cues)||Object.keys(cues).some(key=>!['opening','results'].includes(key)))reject('未知頁面群組');
 }
 const opening=storyOpeningPages(detail.opening);
 const roles=new Set(['teacher',...slots.keys()]);
 for(const [key,ids] of [['opening',opening.map(p=>p.id)],['results',detail.results.map(p=>p.id)]]){
  if(Object.hasOwn(cues,key)&&(!object(cues[key])||Object.keys(cues[key]).some(id=>!ids.includes(id))))reject('未知頁碼 '+key);
 }
 const stage=createStoryPerformance();
 let staged=false;
 const pages=opening.map(({id,label,text})=>{
  if(Object.hasOwn(cues.opening??{},id))staged=true;
  if(!staged)return {text,label,annotated:false,scene:null,speaker:null,cast:[],presentation:'narration'};
  const marked=Object.hasOwn(cues.opening??{},id);
  const inferred=legacySpeaker(label,roles,marked);
  const speaker=marked||inferred==='teacher'||stage.cast.some(actor=>actor.role===inferred)?inferred:null;
  const cue=marked?cues.opening[id]:{};
  const page=advanceStoryPerformance(stage,authoredPage(cue,text,speaker,roles),roles);
  return {...page,label,annotated:marked};
 });
 // An R result may contain one legacy cue or an ordered `pages` sequence.
 // Every R starts from the same opening snapshot; pages within that R share only
 // its own state. Original result.text / numeric mechanics remain untouched.
 const resultPages=detail.results.map(result=>{
  const marked=Object.hasOwn(cues.results??{},result.id);
  const cue=cues.results?.[result.id];
  if(!marked)return [{text:result.text,label:result.title,annotated:false,scene:null,speaker:null,cast:[],presentation:'narration'}];
  const sequence=Object.hasOwn(cue??{},'pages');
  if(sequence&&(!object(cue)||Object.keys(cue).length!==1||!Array.isArray(cue.pages)||!cue.pages.length))reject('無效的多頁結果 '+result.id);
  const state=structuredClone(stage);
  return (sequence?cue.pages:[cue]).map((part,index)=>{
   if(!object(part))reject('結果頁面必須是物件 '+result.id);
   const {text,...acting}=part;
   if(sequence&&(typeof text!=='string'||!text.trim()))reject('結果演出頁缺少文字 '+result.id);
   if(!sequence&&Object.hasOwn(part,'text'))reject('單頁結果不可覆寫原文 '+result.id);
   const page=advanceStoryPerformance(state,authoredPage(acting,sequence?text:result.text,null,roles),roles);
   return {...page,label:result.title,annotated:true,resultId:result.id,resultPage:index};
  });
 });
 const results=resultPages.map(group=>group[0]); // Backward-compatible first-page projection.
 return {pages,results,resultPages,slots,music,hasAnnotations:blocks.length>0};
}
