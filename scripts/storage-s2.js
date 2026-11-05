/** Reproducible T4 full-payload physical codec measurements, fresh process per method. */
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {cpus} from 'node:os';
import {gzipSync} from 'node:zlib';
import {packStoredText,unpackStoredText} from '../src/storage/indexeddb.js';
import {restoreSave} from '../src/storage/format.js';
const [root,method]=process.argv.slice(2),manifest=JSON.parse(await readFile(`${root}/manifest.json`,'utf8'));
const sha=x=>createHash('sha256').update(x).digest('hex');
if(method){
 const metrics={method,stages:{},memory:[]};
 const measure=async(name,fn)=>{const at=performance.now(),out=await fn();metrics.stages[name]=performance.now()-at;metrics.memory.push({stage:name,...process.memoryUsage()});return out;};
 let bytes=await readFile(`${root}/completed.json`);assert.equal(sha(bytes),manifest.files['completed.json'].sha256);
 let text=bytes.toString();bytes=null;global.gc();
 let input=await measure('parse',()=>JSON.parse(text));text=null;global.gc();
 text=await measure('serialize',()=>JSON.stringify(input));input=null;global.gc();
 let packed=await measure('compress',async()=>method==='gzip'?packStoredText(text):{metadata:{chunkCount:1},pages:[text]});
 metrics.rawBytes=Buffer.byteLength(text);metrics.pageBytes=packed.pages.reduce((n,p)=>n+(typeof p==='string'?Buffer.byteLength(p):p.byteLength),0);metrics.metadataBytes=Buffer.byteLength(JSON.stringify(packed.metadata));
 text=null;global.gc();
 text=await measure('decompress',()=>unpackStoredText(packed.metadata,packed.pages));packed=null;
 assert.equal(sha(text),manifest.files['completed.json'].sha256); // Every byte, including all histories and hidden state.
 let restored=await measure('parseValidateRestore',()=>restoreSave(text));text=null;global.gc();
 assert.equal(sha(JSON.stringify(restored)),manifest.files['completed.json'].sha256);restored=null;
 metrics.maxRssBytes=process.resourceUsage().maxRSS*1024;console.log(JSON.stringify(metrics));
}else{
 const report={kind:'S2-real-T4-codec',difficulty:manifest.difficulty,source:manifest.files['completed.json'],node:process.version,cpu:cpus()[0].model,trials:[]};
 for(const method of ['json','gzip'])for(let trial=0;trial<2;trial++){
  const child=spawnSync(process.execPath,['--expose-gc','--max-old-space-size=6144',import.meta.filename,root,method],{encoding:'utf8',maxBuffer:1024*1024});assert.equal(child.status,0,child.stderr);report.trials.push({...JSON.parse(child.stdout),trial});
 }
 await writeFile(`${root}/s2-codec.json`,JSON.stringify(report,null,2));
 const encoded=gzipSync(JSON.stringify(report)).toString('base64');for(let i=0;i<encoded.length;i+=3000)console.log(`::notice title=S2 codec ${i/3000}::${encoded.slice(i,i+3000)}`);
}
