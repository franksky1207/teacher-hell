#!/usr/bin/env node
/** Read-only 17-D Markdown V1 draft checker. Does not alter world, save, or content. */
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {validateStoryDraft,seedCodesFromMarkdown,topicIdsFromMarkdown} from './story-draft-validator.js';
import {readTopicWindows} from './story-production-ledger.js';
const args=process.argv.slice(2);
const param=k=>{const i=args.indexOf(k);return i>=0?args[i+1]:null};
const usage='node scripts/check-story-draft.mjs --input <story.md> [--stage summary|choices|full] [--json <report.json>]';
if(args.includes('--help'))console.log(usage);
else if(!param('--input')){console.error(usage);process.exitCode=2}
else{
 try{
  const root=join(dirname(fileURLToPath(import.meta.url)),'..');
  const [story,seedText,topicText]=await Promise.all([
   readFile(resolve(param('--input')),'utf8'),
   readFile(join(root,'docs','事件四數值三層平衡種子2400組.md'),'utf8'),
   readFile(join(root,'docs','T1-T6-特定故事20主題與觸發日期.md'),'utf8')
  ]);
  const report=validateStoryDraft(story,{
   stage:param('--stage')||'full',
   seeds:seedCodesFromMarkdown(seedText),
   topics:topicIdsFromMarkdown(topicText),windows:readTopicWindows(topicText)
  });
  console.log('17D草稿V1｜'+(report.mechanicalPass?'機械檢查通過':'機械檢查失敗')+'｜'+report.stage+'｜錯誤'+report.errors.length+'項');
  for(const item of report.errors)console.log('✗ '+item.code+'：'+item.detail);
  for(const item of report.warnings)console.log('△ '+item);
  if(param('--json')){const out=resolve(param('--json'));await mkdir(dirname(out),{recursive:true});await writeFile(out,JSON.stringify(report,null,2)+'\n','utf8');}
  if(!report.mechanicalPass)process.exitCode=1;
 }catch(error){console.error('檢查器錯誤：'+error.message);process.exitCode=2}
}
