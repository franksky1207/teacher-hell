/** Optional local Chromium/CDP smoke. No downloads, persistent profiles or player data. */
import { spawn } from 'node:child_process';
import { mkdtemp, cp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { once } from 'node:events';
import { root } from './project.js';
import { createPreviewServer } from './preview.js';

const temporary = await mkdtemp(join(tmpdir(),'teacher-hell-browser-'));
let browser, server, socket;
try {
  await cp(resolve(root,'dist'),join(temporary,'site','teacher-hell'),{recursive:true});
  server=await createPreviewServer(join(temporary,'site'));server.listen(0,'127.0.0.1');await once(server,'listening');
  const url=`http://127.0.0.1:${server.address().port}/teacher-hell/`;
  browser=spawn(process.env.CHROMIUM_BIN || 'chromium',[
    '--headless','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-first-run',
    '--no-default-browser-check','--disable-background-networking','--disable-extensions','--disable-sync',
    `--user-data-dir=${join(temporary,'profile')}`,'--remote-debugging-port=0','about:blank',
  ],{stdio:['ignore','ignore','pipe']});
  const debuggerUrl=await new Promise((resolve,reject)=>{
    const timer=setTimeout(()=>reject(new Error('Chromium debugger startup timed out')),15000);
    browser.once('error',error=>{clearTimeout(timer);reject(error);});
    browser.once('exit',code=>{clearTimeout(timer);reject(new Error(`Chromium exited before debugger: ${code}`));});
    browser.stderr.on('data',chunk=>{
      const match=String(chunk).match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if(match){clearTimeout(timer);resolve(match[1]);}
    });
  });
  socket=new WebSocket(debuggerUrl);await once(socket,'open');
  let sequence=0;const pending=new Map();
  socket.addEventListener('message',event=>{
    const message=JSON.parse(event.data),entry=pending.get(message.id);
    if(entry){pending.delete(message.id);clearTimeout(entry.timer);message.error?entry.reject(new Error(JSON.stringify(message.error))):entry.resolve(message.result);}
  });
  const call=(method,params={},sessionId)=>new Promise((resolve,reject)=>{
    const id=++sequence,timer=setTimeout(()=>{pending.delete(id);reject(new Error(`CDP timeout: ${method}`));},10000);
    pending.set(id,{resolve,reject,timer});socket.send(JSON.stringify({id,method,params,...(sessionId?{sessionId}:{})}));
  });
  const {targetId}=await call('Target.createTarget',{url:'about:blank'});
  const {sessionId}=await call('Target.attachToTarget',{targetId,flatten:true});
  const evaluate=async expression=>{
    const out=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true},sessionId);
    if(out.exceptionDetails)throw new Error(JSON.stringify(out.exceptionDetails));
    return out.result.value;
  };
  await call('Page.enable',{},sessionId);
  await call('Page.addScriptToEvaluateOnNewDocument',{source:'window.confirm = () => true; window.alert = x => { window.lastAlert=x; };'},sessionId);
  const wait=async selector=>{for(let i=0;i<400;i++){if(await evaluate(`!!document.querySelector(${JSON.stringify(selector)})`))return;await new Promise(r=>setTimeout(r,100));}throw Error('Missing '+selector+' '+await evaluate('document.body.innerText')+' ALERT '+await evaluate('window.lastAlert'));};
  const click=async action=>{await wait(`[data-action="${action}"]`);await evaluate(`document.querySelector(${JSON.stringify(`[data-action="${action}"]`)}).click()`);};
  const includes=async text=>{if(!await evaluate(`document.body.innerText.includes(${JSON.stringify(text)})`))throw Error('Missing text '+text);};
  await call('Page.navigate',{url},sessionId);await wait('[data-action="slots"]');
  await click('slots');await wait('[data-action="new:1"]');
  await click('new:1');await click('difficulty:hard');await click('teacher');await wait('[data-action="reroll"]');
  const before=await evaluate('document.querySelector(".bars").innerText');await click('reroll');await wait('[data-action="reroll"]');
  const after=await evaluate('document.querySelector(".bars").innerText');if(before===after)throw Error('Reroll did not change abilities');
  await click('subjects');await click('subject:英文');await click('review');await wait('[data-action="create"]');await click('create');await wait('[data-action="timetable"]');await includes('任教第 1 年');
  await click('opening-next');await click('opening-next');await click('timetable');await wait('.table');
  if(await evaluate('document.querySelectorAll(".table button").length')!==40)throw Error('Expected 40 cells');
  await click('week:1');await wait('.table');await click('close');
  await call('Page.reload',{},sessionId);await wait('[data-action="continue"]');await click('continue');await wait('[data-action="timetable"]');await includes('任教第 1 年');
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true},sessionId);await click('timetable');await wait('.table');
  const layout=await evaluate(`(()=>{const t=document.querySelector('.table'),r=t.getBoundingClientRect();return {width:r.width,scroll:t.scrollWidth,client:t.clientWidth,count:t.querySelectorAll('button').length};})()`);
  if(layout.scroll>layout.client||layout.count!==40)throw Error('Mobile table overflow '+JSON.stringify(layout));
  await click('close');await click('menu');await click('slots');await wait('[data-action="new:2"]');
  for(const [number,mode,year] of [[2,'easy','20'],[3,'normal','10']]){
    await click(`new:${number}`);await click(`difficulty:${mode}`);await click('teacher');await wait('[data-action="subjects"]');await click('subjects');await click('review');await wait('[data-action="create"]');await click('create');await wait('[data-action="timetable"]');await includes(`任教第 ${year} 年`);await click('menu');await click('slots');await wait('[data-action="new:1"]');
  }
  await includes('任教第 1 年');await includes('任教第 20 年');await includes('任教第 10 年');
  await click('delete:3');for(let i=0;i<200&&!await evaluate('document.body.innerText.includes("空存檔")');i++)await new Promise(r=>setTimeout(r,100));await includes('空存檔');await click('load:1');await wait('[data-action="timetable"]');await includes('任教第 1 年');
  console.log('PASS Chromium: desktop create, reroll, subject, save/reload, timetable 40 cells and week switch; mobile five-column layout without horizontal overflow.');
  await call('Browser.close');
} finally {
  socket?.close();
  if(browser?.pid && browser.exitCode===null && browser.signalCode===null){const timeout=setTimeout(()=>browser.kill('SIGKILL'),3000);try{await once(browser,'exit');}finally{clearTimeout(timeout);}}
  if(server)await new Promise(resolve=>server.close(resolve));
  await rm(temporary,{recursive:true,force:true,maxRetries:5,retryDelay:100});
}
