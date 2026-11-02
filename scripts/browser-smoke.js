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
    const out=await call('Runtime.evaluate',{expression,returnByValue:true},sessionId);
    if(out.exceptionDetails)throw new Error(JSON.stringify(out.exceptionDetails));
    return out.result.value;
  };
  await call('Page.enable',{},sessionId);
  const passed=async()=>{
    for(let i=0;i<100;i++){
      const state=await evaluate('document.querySelector("#status")?.dataset.status');
      if(state==='passed')return;
      if(state==='failed')throw new Error(await evaluate('document.querySelector("#status").textContent'));
      await new Promise(resolve=>setTimeout(resolve,100));
    }
    throw new Error('Engineering page did not finish');
  };
  await call('Page.navigate',{url},sessionId);await passed();
  await evaluate('document.querySelector("#repeat").click()');await passed();
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true},sessionId);
  await evaluate('document.querySelector("#status").dataset.status="pending"');
  await call('Page.reload',{},sessionId);await passed();
  console.log('PASS Chromium: project subpath, ES modules, contract JSON, reset and narrow viewport reload. NOT Safari or gameplay/storage validation.');
  await call('Browser.close');
} finally {
  socket?.close();
  if(browser?.pid && browser.exitCode===null){browser.kill('SIGKILL');await once(browser,'exit').catch(()=>{});}
  if(server)await new Promise(resolve=>server.close(resolve));
  await rm(temporary,{recursive:true,force:true});
}
