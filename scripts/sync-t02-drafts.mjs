#!/usr/bin/env node
/** T02 author JSON -> immutable isolated JS. No prose rewriting or formal promotion. */
import fs from 'node:fs';
const root=new URL('../',import.meta.url),check=process.argv.includes('--check');
let stale=false;
const read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const write=(p,text)=>{
 const u=new URL(p,root);
 if(check){if(!fs.existsSync(u)||fs.readFileSync(u,'utf8')!==text){console.error('STALE '+p);stale=true;}}
 else fs.writeFileSync(u,text);
};
const all=[];
for(let i=1;i<=8;i++){
 const sub=String(i).padStart(2,'0'),source='work/18b-t02-'+sub+'-authoring.json';
 const data=read(source),records=data.records.map(({story,definition,binding})=>({story,definition,binding}));
 if(records.length!==26||records.some(r=>r.story.status!=='engineering-test'||r.definition.content.status!=='engineering-test'))throw new Error('Invalid T02 isolated source: '+sub);
 all.push(...records);
 write('src/runtime/content/t02-'+sub+'.js','// Generated isolated T02 authoring records. Never a production catalogue.\\n// Source of truth: '+source+'. Run scripts/sync-t02-drafts.mjs.\\nexport default '+JSON.stringify(records,null,2)+';\\n'.replaceAll('\\\\n','\\n'));
}
if(all.length!==208||new Set(all.map(r=>r.definition.id)).size!==208)throw Error('T02 must contain 208 unique records');
const registry=read('work/18b-global-event-isolation.json');
const entries=registry.t02.entries;
if(entries.length!==17||entries.filter(x=>x.status==='blocked').length!==9||entries.filter(x=>x.status==='held').length!==8)throw Error('Global isolation source mismatch');
const ids=entries.map(e=>e.id).sort();
if(new Set(ids).size!==17||ids.some(id=>!all.some(r=>r.definition.id===id)))throw Error('Unknown isolated T02 ID');
write('src/runtime/content/t02-isolation.js','// Generated from work/18b-global-event-isolation.json; not an auto-unlock switch.\\nexport const T02_ISOLATED_IDS = Object.freeze('+JSON.stringify(ids,null,2)+');\\n'.replaceAll('\\\\n','\\n'));
write('src/runtime/content/t02.js',Array.from({length:8},(_,i)=>'import t'+(i+1)+" from './t02-0"+(i+1)+".js';").join('\\n').replaceAll('\\\\n','\\n')+'\\nexport const T02_BATCH_RECORDS=['.replaceAll('\\\\n','\\n')+Array.from({length:8},(_,i)=>'...t'+(i+1)).join(',')+'];\\n'.replaceAll('\\\\n','\\n'));
if(stale)process.exitCode=1;
else console.log('T02 sync '+(check?'check ':'')+'OK; 208 source events, 17 isolated, 191 engineering-catalogue candidates');
