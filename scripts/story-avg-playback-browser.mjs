/** Real UI playback: picker, P, four choices, confirmation, all R1–R8 pages.
 * PREVIEW_URL selects a local candidate; default is the public Pages preview.
 * STORY_IDS optionally narrows the batch. No player saves or persistent profiles. */
import { spawn } from 'node:child_process';
import { mkdtemp, rm, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { once } from 'node:events';
import { setTimeout as sleep } from 'node:timers/promises';

const base=process.env.PREVIEW_URL||'https://franksky1207.github.io/teacher-hell/preview/';
const chrome=process.env.CHROMIUM_BIN||'chromium';
const temp=await mkdtemp(join(tmpdir(),'teacher-hell-live-'));
let browser=null,socket=null,resolveDebugger,rejectDebugger;
const debuggerUrl=new Promise((resolve,reject)=>{resolveDebugger=resolve;rejectDebugger=reject;});
const diagnostic=[],pending=new Map();
let sequence=0;
const add=(kind,details)=>{if(diagnostic.length<30)diagnostic.push({kind,details});};
try {
 browser=spawn(chrome,['--headless','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--disable-extensions','--disable-background-networking','--no-first-run','--no-default-browser-check','--disable-sync',`--user-data-dir=${temp}`,'--remote-debugging-port=0','about:blank'],{stdio:['ignore','ignore','pipe']});
 browser.once('error',rejectDebugger);
 browser.once('exit',code=>rejectDebugger(new Error('Chrome exited '+code)));
 browser.stderr.on('data',chunk=>{
  const line=String(chunk),m=line.match(/DevTools listening on (ws:\/\/[^\s]+)/);
  if(m)resolveDebugger(m[1]);
 });
 const wsUrl=await Promise.race([debuggerUrl,sleep(15000).then(()=>{throw Error('Chrome debugger startup timed out');})]);
 socket=new WebSocket(wsUrl);await once(socket,'open');
 socket.addEventListener('message',event=>{
  let m;try{m=JSON.parse(event.data);}catch{return;}
  if(m.id!=null){
   const p=pending.get(m.id);if(!p)return;
   pending.delete(m.id);clearTimeout(p.timer);
   if(m.error)p.reject(new Error(JSON.stringify(m.error)));
   else p.resolve(m.result);
  }else if(m.method==='Runtime.exceptionThrown')add('exception',m.params.exceptionDetails?.exception?.description||m.params.exceptionDetails?.text);
  else if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error')add('console',m.params.args?.map(x=>x.value||x.description).join(' '));
  else if(m.method==='Log.entryAdded'&&m.params.entry?.level==='error')add('log',m.params.entry?.text);
  else if(m.method==='Network.loadingFailed')add('request-failed',m.params.errorText+' '+(m.params.blockedReason||''));
  else if(m.method==='Network.responseReceived'&&m.params.response?.status>=400)add('http',m.params.response.status+' '+m.params.response.url);
 });
 const call=(method,params={},sessionId)=>new Promise((resolve,reject)=>{
  const id=++sequence,timer=setTimeout(()=>{pending.delete(id);reject(new Error(method+' timed out'));},12000);
  pending.set(id,{resolve,reject,timer});socket.send(JSON.stringify({id,method,params,...(sessionId?{sessionId}:{})}));
 });
 const {targetId}=await call('Target.createTarget',{url:'about:blank'});
 const {sessionId}=await call('Target.attachToTarget',{targetId,flatten:true});
 for(const method of ['Page.enable','Runtime.enable','Log.enable','Network.enable'])await call(method,{},sessionId);
 await call('Page.navigate',{url:base},sessionId);
 const evaluate=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true},sessionId);if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
 const wait=async selector=>{for(let n=0;n<150;n++){if(await evaluate(`!!document.querySelector(${JSON.stringify(selector)})`))return;await sleep(100);}throw Error('Missing '+selector+' '+await evaluate('document.body.innerText'));};
 const click=async selector=>{await wait(selector);await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);};
 await click('[data-action="dev-center"]');await click('[data-action="avg-preview"]');
 await click('[data-action="avg-settings"]');await wait('[data-avg-search]');
 const results=[];
 const versions=await evaluate(`(async()=>{const release=await(await fetch('../stories/release.json')).json();const index=await(await fetch('../stories/data/index.json')).json();if(release.sourceCommit!==index.sourceCommit)throw Error('release/index mismatch');return {sourceCommit:index.sourceCommit,sourceBranch:index.sourceBranch,ids:index.stories.map(s=>s.storyId),scripts:[...document.scripts].map(s=>s.src)}})()`);
 const ids=process.env.STORY_IDS?.split(',')??versions.ids;
 if(process.env.SOURCE_SHA&&versions.sourceCommit!==process.env.SOURCE_SHA)throw Error('Unexpected source '+versions.sourceCommit);
 delete versions.ids;
 const capture=async(id,phase)=>{if(!process.env.SCREENSHOT_DIR||!process.env.SCREENSHOT_IDS?.split(',').includes(id))return;await mkdir(process.env.SCREENSHOT_DIR,{recursive:true});const shot=await call('Page.captureScreenshot',{format:'png'},sessionId);await writeFile(join(process.env.SCREENSHOT_DIR,id+'-'+phase+'.png'),Buffer.from(shot.data,'base64'));};

 for(const id of ids){
 if(results.length)await click('[data-action="avg-settings"]');
 await evaluate(`{const input=document.querySelector('[data-avg-search]');input.value=${JSON.stringify(id)};input.dispatchEvent(new Event('input',{bubbles:true}));}`);
 await click('[data-action="avg-select-story:'+id+'"]');
 for(let n=0;n<100;n++){if(await evaluate(`!document.querySelector('[data-action="avg-start"]')?.disabled`))break;await sleep(100);}
 await wait('[data-action="avg-start"]');
 const enabled=await evaluate(`!document.querySelector('[data-action="avg-start"]')?.disabled`);
 if(!enabled){results.push({id,error:await evaluate('document.querySelector(".overlay").innerText')});await click('[data-action="close"]');continue;}
 await click('[data-action="avg-start"]');await wait('.story-view');await capture(id,'opening');
 let opening=1;while(await evaluate(`!!document.querySelector('[data-story-action="next"]')`)){await click('[data-story-action="next"]');opening++;if(opening>50)throw Error('Too many pages');}
 await capture(id,'choices');await wait('[data-story-action="select"]');const options=await evaluate(`document.querySelectorAll('[data-story-action="select"]').length`);
 await click('[data-story-action="select"]');await click('[data-story-action="confirm"]');await wait('[data-avg-result]');
 let resultPages=0;for(let n=1;n<=8;n++){
 await evaluate(`{const select=document.querySelector('[data-avg-result]');select.value='R${n}';select.dispatchEvent(new Event('change',{bubbles:true}));}`);
 if(n===1)await capture(id,'result');resultPages++;while(await evaluate(`!!document.querySelector('[data-story-action="next"]')`)){await click('[data-story-action="next"]');resultPages++;if(resultPages>200)throw Error('Too many R pages');}
 }
 results.push({id,opening,options,resultPages});
 }
 console.log(JSON.stringify({base,versions,results,diagnostic},null,2));
 for(const r of results)if(!r.error&&(r.options!==4||r.resultPages<8))throw Error('Incomplete playback '+r.id);
 if(results.some(r=>r.error)||diagnostic.some(d=>d.kind==='exception'))process.exitCode=1;

} catch(error){console.error(error);console.error('DIAGNOSTICS:',JSON.stringify(diagnostic,null,2));process.exitCode=1;}
finally{
 for(const p of pending.values()){clearTimeout(p.timer);p.reject(new Error('Closing browser'));}
 pending.clear();
 try{socket?.close();}catch{}
 if(browser?.pid&&browser.exitCode===null)browser.kill('SIGKILL');
 await rm(temp,{recursive:true,force:true,maxRetries:3,retryDelay:100});
}
