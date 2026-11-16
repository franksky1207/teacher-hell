/** Live GitHub Pages browser startup smoke, without game data or persistent profiles. */
import { spawn } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { once } from 'node:events';
import { setTimeout as sleep } from 'node:timers/promises';

const base=process.env.PREVIEW_URL||'https://franksky1207.github.io/teacher-hell/preview/';
const chrome=process.env.CHROMIUM_BIN||'google-chrome';
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
 await sleep(11000);
 const p=await call('Runtime.evaluate',{expression:`JSON.stringify({url:location.href,title:document.title,ready:!!document.querySelector('[data-action="slots"]'),app:document.querySelector('#app')?.innerText?.slice(0,500),scripts:[...document.scripts].map(s=>s.src)})`,returnByValue:true},sessionId);
 const page=JSON.parse(p.result.value);
 console.log('LIVE PREVIEW RESULT:',JSON.stringify({page,diagnostic},null,2));
 if(!page.ready)process.exitCode=1;
} catch(error){console.error(error);console.error('DIAGNOSTICS:',JSON.stringify(diagnostic,null,2));process.exitCode=1;}
finally{
 for(const p of pending.values()){clearTimeout(p.timer);p.reject(new Error('Closing browser'));}
 pending.clear();
 try{socket?.close();}catch{}
 if(browser?.pid&&browser.exitCode===null)browser.kill('SIGKILL');
 await rm(temp,{recursive:true,force:true,maxRetries:3,retryDelay:100});
}
