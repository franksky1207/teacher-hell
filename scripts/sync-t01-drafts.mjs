#!/usr/bin/env node
/** Mechanical serialization of individually authored JSON. No prose generation or story engine. */
import fs from 'node:fs';
const root=new URL('../',import.meta.url);
let changed=false;
function write(path,text){const file=new URL(path,root);if(process.argv.includes('--check')){if(!fs.existsSync(file)||fs.readFileSync(file,'utf8')!==text){console.error('STALE '+path);changed=true;}}else fs.writeFileSync(file,text);}
for(let i=1;i<=8;i++){
 const topic=`0${i}`,data=JSON.parse(fs.readFileSync(new URL(`work/18b-t01-${topic}-authoring.json`,root)));
 const records=data.records.map(({story,definition})=>({story,definition}));
 write(`src/runtime/content/t01-${topic}.js`,'// Version 1 isolated authoring assets. Not a production catalogue.\n// Authored text source and review provenance: work/18b-t01-'+topic+'-authoring.json.\nexport default '+JSON.stringify(records,null,2)+';\n');
}
write('src/runtime/content/t01.js',Array.from({length:8},(_,i)=>`import t${i+1} from './t01-0${i+1}.js';`).join('\n')+'\nexport const T01_BATCH_RECORDS=['+Array.from({length:8},(_,i)=>`...t${i+1}`).join(',')+'];\n');
if(changed)process.exitCode=1;
