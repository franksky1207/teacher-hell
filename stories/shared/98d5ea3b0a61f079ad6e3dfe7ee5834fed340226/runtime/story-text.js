import {SCHOOL_SUBJECTS} from '../world/school-subjects.js';

export {SCHOOL_SUBJECTS};

/** Read placeholders as plain text. The caller retains responsibility for escaping at the UI boundary. */
const storyTokens=/\{{2,}[^\r\n]*?(?:\}{2,}(?!\})|$)|\}{2,}/gm;

function parseToken(token){
 return token.match(/^\{\{[ \t]*([a-z][a-z0-9_]*)\.([a-z_]+)[ \t]*\}\}$/)?.slice(1);
}

export function storyPlaceholderIssues(text,slots){
 const issues=[];
 for(const [token] of text.matchAll(storyTokens)){
  const parsed=parseToken(token);
  if(!parsed){issues.push('占位符格式錯誤：'+token);continue}
  const [slot,field]=parsed;
  if(slot==='teacher'){
   if(field!=='subject'&&field!=='name')issues.push('未知教師欄位：'+token);
  }else if(!slots.has(slot)){
   issues.push('未知人物槽位：'+token);
  }else if(field!=='name'){
   issues.push('未知人物欄位：'+token);
  }
 }
 return issues;
}

/** Unknown keys, malformed tokens and unavailable values remain visible as authored. */
export function renderStoryText(text,subject){
 if(!SCHOOL_SUBJECTS.includes(subject)||typeof text!=='string')return text;
 return text.replace(storyTokens,token=>{
  const key=parseToken(token);
  return key?.[0]==='teacher'&&key[1]==='subject'?subject:token;
 });
}

export function storySubject(world){
 return world?.extensions?.['teacher-hell/world']?.plan?.subject;
}
