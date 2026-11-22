/** Count only authored, player-visible characters; template/technical tokens count as zero. */
export function storyVisibleLength(text){
  return [...String(text??'').replace(/\{\{[\s\S]*?\}\}/g,'').replace(/\s/g,'')].length;
}
/** Shared thresholds are advisory, never a substitute for story review. */
export function storyLengthBand(length,kind='result'){
  if(kind==='opening')return length<90?'priority':length<110?'review':length<=140?'reference':'pace';
  return length<70?'priority':length<90?'review':length<130?'reference':'pace';
}
