/** Remove technical notation while preserving the words actually read by a player. */
export function storyVisibleText(text){
  return String(text??'')
    .replace(/^[ \t]*`{3,}[^\r\n]*\r?\n[\s\S]*?^[ \t]*`{3,}[ \t]*$/gm,'')
    .replace(/<!--[^]*?-->/g,'')
    .replace(/^[ \t]*(?:[-*+][ \t]+)?(?:\*\*)?P\d{2,}｜[^\r\n：]*?(?:\*\*)?[：:][ \t]*/gm,'')
    .replace(/\{\{[^]*?\}\}/g,'')
    .replace(/!\[[^\]]*\]\([^\r\n)]*\)/g,'')
    .replace(/\[([^\]]+)\]\([^\r\n)]*\)/g,'$1')
    .replace(/`[^`\r\n]*`/g,'')
    .replace(/<\/?[A-Za-z][^>]*>/g,'')
    .replace(/^[ \t]{0,3}(?:#{1,6}[ \t]+|>[ \t]+|[-*+][ \t]+|\d+[.)][ \t]+)/gm,'')
    .replace(/\*\*|__|~~/g,'')
    .replace(/\s/g,'');
}
/** Called only on extracted story prose, never on serialized JSON or metadata. */
export function storyVisibleLength(text){
  return [...storyVisibleText(text)].length;
}
/** AVG performance data: only page.text is story prose; all control metadata is zero. */
export function storyAvgVisibleLength(pages){
  const collect=value=>{
    if(Array.isArray(value))return value.reduce((sum,page)=>sum+collect(page),0);
    if(value&&typeof value==='object'){
      if(typeof value.text==='string')return storyVisibleLength(value.text);
      if(Array.isArray(value.pages))return collect(value.pages);
      if(value.opening||value.results)return collect(Object.values(value.opening??{}))+collect(Object.values(value.results??{}));
      return 0;
    }
    return 0;
  };
  return collect(pages);
}
/** Shared thresholds are advisory, never a substitute for story review. */
export function storyLengthBand(length,kind='result'){
  if(kind==='opening')return length<90?'priority':length<110?'review':length<=140?'reference':'pace';
  return length<70?'priority':length<90?'review':length<130?'reference':'pace';
}
