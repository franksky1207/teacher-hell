/** Optional local Chromium/CDP smoke. No downloads, persistent profiles or player data. */
import { spawn } from 'node:child_process';
import { mkdtemp, cp, rm, readdir, writeFile } from 'node:fs/promises';
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
  const url=process.env.PREVIEW_URL || `http://127.0.0.1:${server.address().port}/teacher-hell/`;
  browser=spawn(process.env.CHROMIUM_BIN || 'chromium',[
    '--headless','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-first-run',
    '--no-default-browser-check','--disable-background-networking','--disable-extensions','--disable-sync',
    `--user-data-dir=${join(temporary,'profile')}`,'--remote-debugging-port=0','about:blank',
  ],{stdio:['ignore','ignore','pipe']});
  const debuggerUrl=await new Promise((resolve,reject)=>{
    const timer=setTimeout(()=>reject(new Error('Chromium debugger startup timed out')),30000);
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
    const out=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true,userGesture:true},sessionId);
    if(out.exceptionDetails)throw new Error(JSON.stringify(out.exceptionDetails));
    return out.result.value;
  };
  await call('Page.enable',{},sessionId);
  await call('Browser.setDownloadBehavior',{behavior:'allow',downloadPath:temporary});
  await call('Page.setInterceptFileChooserDialog',{enabled:true},sessionId);
  await call('Page.addScriptToEvaluateOnNewDocument',{source:`window.confirm = x => { (window.confirmPrompts ??= []).push(x); return window.confirmAnswers?.length ? window.confirmAnswers.shift() : true; }; window.alert = x => { window.lastAlert=x; }; const NativeDate=Date; window.Date=class extends NativeDate { constructor(...args){super(...(args.length?args:['2026-11-05T12:00:00Z']));} static now(){return NativeDate.parse('2026-11-05T12:00:00Z');} };`},sessionId);
  const wait=async selector=>{for(let i=0;i<400;i++){if(await evaluate(`!!document.querySelector(${JSON.stringify(selector)})`))return;await new Promise(r=>setTimeout(r,100));}throw Error('Missing '+selector+' '+await evaluate('document.body.innerText')+' ALERT '+await evaluate('window.lastAlert'));};
  const click=async action=>{for(let i=0;i<1800&&await evaluate(`!!document.querySelector('.operation-status')`);i++)await new Promise(r=>setTimeout(r,100));await wait(`[data-action="${action}"]`);await evaluate(`document.querySelector(${JSON.stringify(`[data-action="${action}"]`)}).click()`);for(let i=0;i<1800;i++){if(!await evaluate(`!!document.querySelector('.operation-status')`))return;await new Promise(r=>setTimeout(r,100));}throw Error('Operation did not finish: '+action);};
  const includes=async text=>{if(!await evaluate(`document.body.innerText.includes(${JSON.stringify(text)})`))throw Error('Missing text '+text);};
  await call('Page.navigate',{url},sessionId);await wait('[data-action="slots"]');
  await click('slots');await wait('[data-action="new:1"]');
  await click('new:1');await click('difficulty:hard');await click('teacher');await wait('[data-action="reroll"]');
  const before=await evaluate('document.querySelector(".bars").innerText');await click('reroll');await wait('[data-action="reroll"]');
  const after=await evaluate('document.querySelector(".bars").innerText');if(before===after)throw Error('Reroll did not change abilities');
  await click('subjects');await click('subject:英文');await click('review');await wait('[data-action="create"]');await click('create');await wait('[data-action="timetable"]');await includes('任教第 1 年');await includes('暑輔第 1 週');
  if(!await evaluate(`Array.from(document.querySelectorAll('.states button')).every(b=>/ [0-9]+$/.test(b.textContent))`))throw Error('States must display integers');
  await click('opening-next');await click('opening-next');
  // Phase 14-A: check actual modal navigation without mutating the saved world.
  const notebookBefore=await evaluate(`(async()=>{
    const {createIndexedDBStorage}=await import('./src/storage/indexeddb.js');
    const storage=createIndexedDBStorage({factory:indexedDB,namespace:'development'});
    const entry=await storage.read(1);await storage.close();
    return JSON.stringify(entry.payload.world);
  })()`);
  await click('notebook');await wait('.notebook');
  const notebookStart=await evaluate(`({
    tabs:document.querySelectorAll('.notebook [role="tab"]').length,
    active:document.querySelector('.notebook [aria-selected="true"]')?.dataset.action,
    date:document.querySelector('.notebook-content')?.innerText.includes('紀錄日期')
  })`);
  if(notebookStart.tabs!==6||notebookStart.active!=='notebook-tab:overview'||!notebookStart.date)
    throw Error('Notebook overview or six categories missing '+JSON.stringify(notebookStart));
  await click('notebook-tab:people');
  const rosterCheck=await evaluate(`({
    active:document.querySelector('.notebook [aria-selected="true"]')?.dataset.action,
    count:document.querySelectorAll('.notebook-person').length
  })`);
  if(rosterCheck.active!=='notebook-tab:people'||rosterCheck.count<38)
    throw Error('Notebook official class roster missing '+JSON.stringify(rosterCheck));
  await evaluate("document.querySelector('.notebook-person').click()");await wait('.notebook-person--active');
  if(!await evaluate("!!document.querySelector('.notebook-person--active') && !!document.querySelector('.notebook-person-details h3')"))
    throw Error('Notebook selection did not render a person');
  await click('notebook-tab:events');
  const historyCheck=await evaluate(`({
    selected:document.querySelector('.notebook [aria-selected="true"]')?.dataset.action,
    count:document.querySelectorAll('.notebook-history-item').length,
    empty:document.querySelector('.notebook-history-items')?.innerText.includes('目前沒有符合條件的已知紀錄')
  })`);
  if(historyCheck.selected!=='notebook-tab:events'||(!historyCheck.count&&!historyCheck.empty))
    throw Error('Notebook event history must show known entries or an accurate empty state '+JSON.stringify(historyCheck));
  await click('notebook-event-kind:fact');
  if(!await evaluate("!!document.querySelector('.notebook-history-kinds [aria-pressed=\"true\"][data-action=\"notebook-event-kind:fact\"]')"))
    throw Error('Notebook history kind filter failed');
  await click('notebook-tab:academics');
  if(!await evaluate("document.querySelector('.notebook [aria-selected=\"true\"]')?.dataset.action==='notebook-tab:academics'&&document.querySelectorAll('.notebook-academic-student').length>=38"))
    throw Error('Notebook academic roster missing');
  await evaluate("document.querySelector('.notebook-academic-student').click()");
  await wait('.notebook-academic-details h3');
  const academicCheck=await evaluate(`(()=>{
    const text=document.querySelector('.notebook-academic-details')?.innerText??'';
    const buttons=document.querySelectorAll('.notebook-academic-student[aria-pressed="true"]');
    const hasGrades=document.querySelectorAll('.notebook-academic-table tbody tr').length>0;
    return {selected:buttons.length===1,empty:text.includes('目前尚無正式學期成績紀錄'),
      open:text.includes('尚未結算'),courses:hasGrades,detail:!!document.querySelector('.notebook-academic-details h3')};
  })()`);
  if(!academicCheck.selected||!academicCheck.detail||(!academicCheck.empty&&!academicCheck.open))
    throw Error('Notebook academic opening must not fabricate grades '+JSON.stringify(academicCheck));
  await click('notebook-tab:semesters');
  if(!await evaluate("!!document.querySelector('.notebook-reviews') && document.querySelector('.notebook-reviews').innerText.includes('尚無已完成的學期總結')"))
    throw Error('Notebook semester empty archive invalid');
  await click('notebook-tab:career');
  if(!await evaluate("!!document.querySelector('.notebook-career') && document.querySelector('.notebook-career').innerText.includes('生涯進行中')"))
    throw Error('Notebook career status invalid');
  await click('close');
  if(await evaluate("!!document.querySelector('.overlay')"))throw Error('Notebook overlay did not close');
  const notebookAfter=await evaluate(`(async()=>{
    const {createIndexedDBStorage}=await import('./src/storage/indexeddb.js');
    const storage=createIndexedDBStorage({factory:indexedDB,namespace:'development'});
    const entry=await storage.read(1);await storage.close();
    return JSON.stringify(entry.payload.world);
  })()`);
  if(notebookBefore!==notebookAfter)throw Error('Notebook browsing unexpectedly changed save world');
  console.log('PASS Phase 14-A notebook browser open, six tabs, category navigation, close, read-only save');
  await click('timetable');await wait('.table');
  if(await evaluate('document.querySelectorAll(".table button").length')!==40)throw Error('Expected 40 cells');
  const expected=await evaluate(`(async()=>{const {createIndexedDBStorage}=await import('./src/storage/indexeddb.js');const s=createIndexedDBStorage({factory:indexedDB,namespace:'development'});const w=(await s.read(1)).payload.world;const p=w.extensions['teacher-hell/world'].plan,t=p.tables[0],reg=w.numeric.evolution.world.registry;await s.close();return t.classes.map(c=>'高'+'一二三'[t.academicYear-c.cohortStart]+reg.classes[c.id].name);})()`);
  const displayed=await evaluate(`Array.from(document.querySelectorAll('.table button'),x=>x.textContent)`);
  if(!expected.every(name=>displayed.includes(name)))throw Error('Actual class names missing from timetable '+JSON.stringify({expected,displayed}));
  await includes('實際當週');
  if(!await evaluate(`document.querySelector('[data-action="week:odd"]').disabled && document.querySelector('[data-action="week:even"]').disabled`))throw Error('Camp must not invent semester parity');
  await click('close');
  await call('Page.reload',{},sessionId);await wait('[data-action="continue"]');await click('continue');await wait('[data-action="timetable"]');await includes('任教第 1 年');
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true},sessionId);await click('timetable');await wait('.table');
  const layout=await evaluate(`(()=>{const t=document.querySelector('.table'),r=t.getBoundingClientRect();return {width:r.width,scroll:t.scrollWidth,client:t.clientWidth,count:t.querySelectorAll('button').length};})()`);
  if(layout.scroll>layout.client||layout.count!==40)throw Error('Mobile table overflow '+JSON.stringify(layout));
  await click('close');await click('menu');await click('slots');await wait('[data-action="new:2"]');
  await click('export:1');let exported;
  for(let i=0;i<200;i++){exported=(await readdir(temporary)).find(n=>n.endsWith('.json'));if(exported)break;await new Promise(r=>setTimeout(r,100));}
  if(!exported)throw Error('UI export did not download JSON');
  const choose=async (action,path)=>{const chosen=new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('File chooser timeout: '+action)),10000);const onMessage=e=>{const m=JSON.parse(e.data);if(m.method==='Page.fileChooserOpened'){clearTimeout(timer);socket.removeEventListener('message',onMessage);resolve(m.params.backendNodeId);}};socket.addEventListener('message',onMessage);});await click(action);const backendNodeId=await chosen;await call('DOM.setFileInputFiles',{files:[path],backendNodeId},sessionId);for(let i=0;i<1800&&await evaluate(`!!document.querySelector('.operation-status')`);i++)await new Promise(r=>setTimeout(r,100));};
  const digest=async i=>evaluate(`(async()=>{const {createIndexedDBStorage}=await import('./src/storage/indexeddb.js');const s=createIndexedDBStorage({factory:indexedDB,namespace:'development'});const x=await s.read(${i});await s.close();const bytes=new TextEncoder().encode(JSON.stringify(x.payload));return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),x=>x.toString(16).padStart(2,'0')).join('');})()`);
  const sourceDigest=await digest(1);await choose('import:2',join(temporary,exported));
  for(let i=0;i<300;i++){if(await evaluate(`!!document.querySelector('[data-action="load:2"]')`))break;await new Promise(r=>setTimeout(r,100));}
  if(await digest(2)!==sourceDigest)throw Error('Imported world differs from exported world');
  await call('Page.reload',{},sessionId);await wait('[data-action="slots"]');await click('slots');await wait('[data-action="load:2"]');if(await digest(2)!==sourceDigest)throw Error('Reload changed imported save');
  await evaluate('window.confirmAnswers=[false]');await choose('import:2',join(temporary,exported));await new Promise(r=>setTimeout(r,300));if(await digest(2)!==sourceDigest)throw Error('Cancelled import changed target');
  await evaluate('window.confirmAnswers=[true,false];window.confirmPrompts=[]');await choose('import:2',join(temporary,exported));await new Promise(r=>setTimeout(r,300));if(await digest(2)!==sourceDigest)throw Error('Cancelled overwrite changed target');if(await evaluate('window.confirmPrompts.length')!==2)throw Error('Overwrite requires two confirmations');
  const bad=join(temporary,'invalid.txt');await writeFile(bad,'{broken');await choose('import:2',bad);await new Promise(r=>setTimeout(r,300));if(await digest(2)!==sourceDigest)throw Error('Invalid import changed target');if(!await evaluate(`window.lastAlert?.includes('匯入失敗')`))throw Error('Invalid file error not shown');
  const isolation=await evaluate(`(async()=>{const {createIndexedDBStorage}=await import('./src/storage/indexeddb.js');const s=createIndexedDBStorage({factory:indexedDB,namespace:'player'});const x=await s.read(1);await s.close();return x.payload===null;})()`);if(!isolation)throw Error('Player namespace not isolated');
  await click('delete:2');for(let i=0;i<200&&!await evaluate(`!document.querySelector('[data-action="load:2"]')`);i++)await new Promise(r=>setTimeout(r,100));

  for(const [number,mode,year] of [[2,'easy','20'],[3,'normal','10']]){
    await click(`new:${number}`);await click(`difficulty:${mode}`);await click('teacher');await wait('[data-action="subjects"]');await click('subjects');await click('review');await wait('[data-action="create"]');await click('create');await wait('[data-action="timetable"]');await includes(`任教第 ${year} 年`);await click('menu');await click('slots');await wait('[data-action="new:1"]');
  }
  await includes('任教第 1 年');await includes('任教第 20 年');await includes('任教第 10 年');
  await click('new:2');await click('difficulty:hard');await click('teacher');await wait('[data-action="subjects"]');await click('subjects');await click('review');await wait('[data-action="create"]');await click('create');await wait('[data-action="timetable"]');await includes('任教第 1 年');
  await click('menu');await click('slots');await wait('[data-action="delete:3"]');await includes('任教第 10 年');
  await click('delete:3');for(let i=0;i<200&&!await evaluate('document.body.innerText.includes("空存檔")');i++)await new Promise(r=>setTimeout(r,100));await includes('空存檔');await click('load:1');await wait('[data-action="timetable"]');await includes('任教第 1 年');
  // Phase 13-G: disposable DOM only; never persist a test event in a player slot.
  for(const [width,height,expected] of [[390,844,2],[1280,800,4]]){
    await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<650},sessionId);
    const layout=await evaluate(`(async()=>{
      const {renderStoryView}=await import('./web/story-view.js');
      const game=document.querySelector('.game');
      const original=game?.querySelector('.story');
      if(!game||!original)throw Error('Missing game shell');
      original.remove();game.classList.add('game--story');
      const page={text:'長篇對話。'.repeat(130),speaker:null,presentation:'narration',cast:[]};
      const choices=Array.from({length:8},(_,i)=>({id:'option-'+i,text:('第'+(i+1)+'個選項。').repeat(35)}));
      const sceneView={label:'校園談話角落',speaker:'旁白',cast:[
        {name:'學生',kind:'student',position:'left',expression:'sad',tone:1,speaking:false},
        {name:'教職員',kind:'adult',position:'right',expression:'calm',tone:0,speaking:true}
      ]};
      let stage;
      try{
        game.insertAdjacentHTML('beforeend',renderStoryView({page,pageIndex:2,pageCount:3,canPrevious:true,canNext:false,
          choices,confirmation:null,canFinish:false,waiting:false,canResume:false,ended:false,sceneView}));
        stage=game.querySelector('.story-view');
        const panel=stage.querySelector('.story-choice-panel'),grid=stage.querySelector('.story-choice-grid');
        const reader=stage.querySelector('.story-reader'),rect=stage.getBoundingClientRect();
        const states=game.querySelector('.states').getBoundingClientRect();
        return {columns:getComputedStyle(grid).gridTemplateColumns.trim().split(' ').filter(Boolean).length,
          count:grid.querySelectorAll('button').length,cast:stage.querySelectorAll('.story-actor').length,
          withinX:rect.left>=-1&&rect.right<=innerWidth+1,
          withinY:rect.top>=states.bottom-2&&rect.bottom<=innerHeight+2,
          mainScroll:game.scrollHeight<=game.clientHeight+2,
          choicesScrollable:panel.scrollHeight>panel.clientHeight,
          readerScrollable:reader.scrollHeight>reader.clientHeight};
      }finally{stage?.remove();game.classList.remove('game--story');game.append(original)}
    })()`);
    if(layout.columns!==expected||layout.count!==8||layout.cast!==2||!layout.withinX||
      !layout.withinY||!layout.mainScroll||!layout.choicesScrollable||!layout.readerScrollable)
      throw Error('Phase 13 responsive layout failure '+JSON.stringify({width,height,layout}));
    console.log('PASS Phase 13 responsive '+width+'x'+height+' '+JSON.stringify(layout));
  }
  console.log('PASS Chromium: desktop create, reroll, subject, save/reload, timetable 40 cells and week switch; mobile five-column layout without horizontal overflow.');
  await call('Browser.close');
} finally {
  socket?.close();
  if(browser?.pid && browser.exitCode===null && browser.signalCode===null){const timeout=setTimeout(()=>browser.kill('SIGKILL'),3000);try{await once(browser,'exit');}finally{clearTimeout(timeout);}}
  if(server)await new Promise(resolve=>server.close(resolve));
  await rm(temporary,{recursive:true,force:true,maxRetries:5,retryDelay:100});
}
