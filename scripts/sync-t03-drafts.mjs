#!/usr/bin/env node
/** Source-preserving T03 JSON -> isolated JS modules. Not a release or content-review step. */
import fs from 'node:fs';
const root=new URL('../',import.meta.url),check=process.argv.includes('--check'),nl=String.fromCharCode(10);
// Review repairs can verify just their changed payloads without rechecking the batch.
const idsArg=process.argv.indexOf('--ids');
if(idsArg!==-1){
 if(!check)throw Error('--ids is a check-only mode; generation uses the authoring sources');
 const ids=new Set((process.argv[idsArg+1]??'').split(',').filter(Boolean));
 if(!ids.size)throw Error('Explicit nonempty event IDs required');
 for(const id of ids){
  const match=/^content:18b-t03-(0[1-8])-\d+$/.exec(id);
  if(!match)throw Error('Invalid T03 event ID: '+id);
  const sub=match[1];
  const source=JSON.parse(fs.readFileSync(new URL('work/18b-t03-'+sub+'-authoring.json',root),'utf8')).records;
  const built=(await import(new URL('src/runtime/content/t03-'+sub+'.js',root))).default;
  const authored=source.filter(r=>r.definition.id===id),generated=built.filter(r=>r.definition.id===id);
  if(authored.length!==1||generated.length!==1)throw Error('Missing or duplicated event: '+id);
  const {story,definition,binding}=authored[0];
  if(JSON.stringify({story,definition,binding})!==JSON.stringify(generated[0]))throw Error('STALE '+id);
 }
 console.log('T03 scoped sync check OK; '+ids.size+' explicit events');
 process.exit(0);
}
let stale=false;
const write=(path,content)=>{const file=new URL(path,root);if(check){if(!fs.existsSync(file)||fs.readFileSync(file,'utf8')!==content){console.error('STALE '+path);stale=true;}}else fs.writeFileSync(file,content);};
const all=[];
for(let i=1;i<=8;i++){
 const sub=String(i).padStart(2,'0'),path='work/18b-t03-'+sub+'-authoring.json';
 const input=JSON.parse(fs.readFileSync(new URL(path,root),'utf8'));
 const records=input.records.map(({story,definition,binding})=>({story,definition,binding}));
 if(!records.length||records.some(r=>r.story.status!=='engineering-test'||r.definition.content.status!=='engineering-test'))throw Error('Invalid engineering-isolated T03 source: '+sub);
 all.push(...records);
 write('src/runtime/content/t03-'+sub+'.js','// Generated isolated T03 authoring records. Not a production catalogue.'+nl+'// Source: '+path+'. Regenerate via scripts/sync-t03-drafts.mjs.'+nl+'export default '+JSON.stringify(records,null,2)+';'+nl);
}
if(new Set(all.map(r=>r.definition.id)).size!==all.length)throw Error('Duplicate T03 story ID');
write('src/runtime/content/t03.js',"import t1 from './t03-01.js';\nimport t2 from './t03-02.js';\nimport t3 from './t03-03.js';\nimport t4 from './t03-04.js';\nimport t5 from './t03-05.js';\nimport t6 from './t03-06.js';\nimport t7 from './t03-07.js';\nimport t8 from './t03-08.js';\n/** Engineering-isolated v1 T03 draft records; deliberately not registered in gameplay. */\nexport const T03_BATCH_RECORDS=[...t1,...t2,...t3,...t4,...t5,...t6,...t7,...t8];\n"); 
if(stale)process.exitCode=1;
else console.log('T03 sync '+(check?'check ':'')+'OK; '+all.length+' isolated drafts in 8 subtopics; none reviewed or published');
