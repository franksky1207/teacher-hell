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

export function storyPreviewSlots(markdown){
 const slotPart=markdown.split('- **常駐數值角色槽位**')[1]?.split('- **無數值情境角色**')[0]??'';
 const slots=new Map();
 for(const [,role,type] of slotPart.matchAll(/^[ \t]*\|[ \t]*`?([a-z][a-z0-9_]*)`?[ \t]*\|([^|]+)\|/gm)){
  if(role==='teacher')continue;
  const identity=type.split(/[，,；;：:]/,1)[0];
  if(/家長|照顧者/.test(identity))slots.set(role,'guardian');
  else if(/學生/.test(identity))slots.set(role,'student');
  else if(/教職|教師|老師|校長|護理|輔導|學務|教務|支援/.test(identity))slots.set(role,'staff');
 }
 return slots;
}

function legacySpeaker(label,roles){
 if(!label||label==='旁白')return null;
 const key=label.match(nameToken)?.[1]??label;
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

/** Use the public reader's opening/results and preserve its private mechanics as-is. */
export function compileStoryPreview(detail,slots=storyPreviewSlots(detail.sourceMarkdown??'')){
 const source=detail.sourceMarkdown??'';
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
  const inferred=legacySpeaker(label,roles);
  const speaker=marked||inferred==='teacher'||stage.cast.some(actor=>actor.role===inferred)?inferred:null;
  const cue=marked?cues.opening[id]:{};
  const page=advanceStoryPerformance(stage,authoredPage(cue,text,speaker,roles),roles);
  return {...page,label,annotated:marked};
 });
 const results=detail.results.map(result=>{
  const cue=cues.results?.[result.id];
  if(!Object.hasOwn(cues.results??{},result.id))return {text:result.text,label:result.title,annotated:false,scene:null,speaker:null,cast:[],presentation:'narration'};
  // Each result starts from the same visible opening, independent of prior previews.
  const page=advanceStoryPerformance(structuredClone(stage),authoredPage(cue,result.text,null,roles),roles);
  return {...page,label:result.title,annotated:true};
 });
 return {pages,results,slots,hasAnnotations:blocks.length>0};
}
