import {eventWorld} from '../test/support/event-fixtures.js';
import {academicAt,academicApply} from '../test/support/senior-academic.js';
import {calendarDay,SENIOR_CALENDAR_VERSION,THREE_YEAR} from '../src/calendar/calendar.js';
import {aftercareCatalogue} from '../src/runtime/story-content.js';
import {createCandidate} from '../src/player/creation.js';
import {createCareerOpening} from '../src/runtime/opening.js';
import {createSave} from '../src/storage/format.js';
/** Optional local Chromium/CDP smoke. No downloads, persistent profiles or player data. */
import {readFile} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
import assert from 'node:assert/strict';
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
    const id=++sequence,timer=setTimeout(()=>{pending.delete(id);reject(new Error(`CDP timeout: ${method}`));},180000);
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
  const wait=async selector=>{for(let i=0;i<1800;i++){if(await evaluate(`!!document.querySelector(${JSON.stringify(selector)})`))return;await new Promise(r=>setTimeout(r,100));}throw Error('Missing '+selector+' '+await evaluate('document.body.innerText')+' ALERT '+await evaluate('window.lastAlert'));};
  const click=async action=>{await wait(`[data-action="${action}"]`);await evaluate(`document.querySelector(${JSON.stringify(`[data-action="${action}"]`)}).click()`);for(let i=0;i<1800;i++){if(!await evaluate(`!!document.querySelector('.operation-status')`))return;await new Promise(r=>setTimeout(r,100));}throw Error('Operation did not finish: '+action);};
  const includes=async text=>{if(!await evaluate(`document.body.innerText.includes(${JSON.stringify(text)})`))throw Error('Missing text '+text);};

  // Date-isolated legacy saves verify UI compatibility only. The separate
  // senior-integration driver is the genuine continuous three-year evidence.
  const fixtures=JSON.parse(gunzipSync(await readFile(resolve(root,'test/fixtures/h4-pre-5c21854.json.gz'))));
  const extra=process.argv.find(a=>a.startsWith('--save='))?.slice(7);
  const opening=createCareerOpening({candidate:createCandidate({seed:74,playerId:'teacher',schoolId:'school'}),seed:75,taipeiDate:'2026-11-06',difficulty:'normal',subject:'國文',careerKey:'h5-browser'});
  const contactDate='2029-06-02';let contact=academicAt(eventWorld(74,contactDate,calendarDay(contactDate,3,SENIOR_CALENDAR_VERSION).slots[0].id,{version:1,mode:THREE_YEAR,difficulty:'hard'}),contactDate);contact=academicApply(contact,[{type:'academic',action:'open'}]);contact=academicApply(contact,[aftercareCatalogue()]);
  const scenarios=extra?[[extra,JSON.parse(gunzipSync(await readFile(extra)))]]:[['opening',createSave(opening,opening)],['before',fixtures.before],['after',fixtures.after],['terminal',fixtures.terminal],['contact',createSave(contact)]];
  let checks=0;
  await call('Page.navigate',{url},sessionId);await wait('[data-action="slots"]');
  const install=async payload=>{
    // Import uses the real save boundary, never arbitrary IndexedDB records.
    const path=join(temporary,'site','teacher-hell','h5-fixture.json');await writeFile(path,JSON.stringify(payload));
    await evaluate(`(async()=>{const {createIndexedDBStorage}=await import('./src/storage/indexeddb.js'),{createStoredSession}=await import('./src/storage/session.js');const db=createIndexedDBStorage({factory:indexedDB,namespace:'development'}),s=await createStoredSession(db,1),snap=s.snapshot();await s.import(await(await fetch('./h5-fixture.json')).text(),{expectedToken:snap.token,confirmed:true});await db.close();})()`);
    await call('Page.reload',{},sessionId);await wait('[data-action="slots"]');await click('slots');await click('load:1');await wait('.game');
  };
  for(const [name,payload] of scenarios){
    await install(payload);
    const completed=payload.world.extensions['teacher-hell/world'].history.some(h=>h.type==='career-completion');
    for(const [width,height] of [[390,844],[360,640],[1280,800]]){
      await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600},sessionId);
      const layout=await evaluate(`(()=>{const g=document.querySelector('.game'),r=g.getBoundingClientRect();return {documentScroll:document.documentElement.scrollHeight>innerHeight+1,withinX:r.right<=innerWidth+1,withinY:r.bottom<=innerHeight+1};})()`);
      assert.deepEqual(layout,{documentScroll:false,withinX:true,withinY:true});checks++;
    }
    await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true},sessionId);
    if(completed){
      assert.equal(await evaluate(`document.querySelector('[data-action="progress"]')===null`),true);checks++;
      await click('completion-details');await includes('三年生涯完成紀錄');await includes('畢典與六月紀錄');checks++;
      await click('notebook-tab:people');await wait('.notebook-person');assert.ok(await evaluate(`document.querySelectorAll('.notebook-person').length>=38`));checks++;
      await click('notebook-tab:academics');await wait('.notebook-academic-student');
      assert.ok(await evaluate(`document.querySelectorAll('.notebook-academic-student').length>=38`));checks++;
      await evaluate(`document.querySelector('.notebook-academic-student').click()`);await includes('40％／30％／30％');await includes('畢業考');
      assert.equal(await evaluate(`document.querySelectorAll('.notebook-academic-terms button').length`),6);checks++;
      assert.equal(await evaluate(`Array.from(document.querySelectorAll('.notebook-academic-table th')).some(x=>x.textContent==='三段')`),false);checks++;
      await click('close');
    }else{
      await wait('[data-action="progress"]');
      if(name==='opening'){
        for(let step=0;step<4;step++){
          const rev=await evaluate(`document.querySelector('.game').dataset.revision`);await click('progress');
          for(let i=0;i<1800;i++){if(await evaluate(`document.querySelector('.game').dataset.revision!==${JSON.stringify(rev)}`))break;await new Promise(r=>setTimeout(r,100));}
          assert.notEqual(await evaluate(`document.querySelector('.game').dataset.revision`),rev);assert.equal(await evaluate('window.lastAlert??null'),null);checks++;
        }
      }
      if(name==='contact'){
        await click('progress');await wait('[data-action="progress"]');await includes('處理待辦事件');checks++;
        await click('progress');await wait('[data-story-action]');checks++;
        let selections=0;
        for(let move=0;move<20;move++){
          if(!await evaluate(`!!document.querySelector('.story-view')`))break;
          const action=await evaluate(`(()=>{const actions=['next','confirm','select','finish','resume'];for(const a of actions){const b=document.querySelector('[data-story-action="'+a+'"]:not([disabled])');if(b){b.click();return a;}}return null;})()`);
          assert.ok(action);if(action==='select')selections++;
          for(let i=0;i<1800&&await evaluate(`!!document.querySelector('.operation-status')`);i++)await new Promise(r=>setTimeout(r,100));
          assert.equal(await evaluate('window.lastAlert??null'),null);
        }
        assert.ok(selections>0);await wait('[data-action="progress"]');checks++;
        await click('progress');await includes('2029-06-09');checks++;
        const counts=await evaluate(`(async()=>{const {createIndexedDBStorage}=await import('./src/storage/indexeddb.js');const db=createIndexedDBStorage({factory:indexedDB,namespace:'development'}),h=(await db.read(1)).payload.world.extensions['teacher-hell/world'].history;await db.close();return {weeks:h.filter(x=>x.type==='aftercare-week-summary').length,contacts:h.filter(x=>x.type==='event-selection').flatMap(x=>x.data.selected).filter(s=>s.definitionId==='aftercare:contact').length};})()`);assert.deepEqual(counts,{weeks:1,contacts:1});checks++;
        await click('notebook');await click('notebook-tab:career');await includes('2029-06-02～2029-06-08');checks++;
        await click('close');await call('Page.reload',{},sessionId);await wait('[data-action="slots"]');await click('slots');await click('load:1');await wait('.game');await includes('2029-06-09');checks++;
      }
      if(name==='terminal'){await includes('完成三年任期結算');checks++;}
      if(name==='after'){
        assert.equal(await evaluate(`document.querySelector('.top').innerText.includes('第 1 節')`),false);checks++;
        await click('timetable');await wait('.table');
        const cells=await evaluate(`Array.from(document.querySelectorAll('.table button'),b=>b.textContent)`);
        assert.equal(cells.length,40);assert.ok(!cells.includes('教師善後'));assert.ok(cells.some(s=>s===''));checks++;
        await click('close');
        const revision=await evaluate(`document.querySelector('.game').dataset.revision`);
        await evaluate('window.h5Ticks=0;window.h5Timer=setInterval(()=>h5Ticks++,20)');
        await evaluate(`document.querySelector('[data-action="progress"]').click()`);await wait('.operation-status');
        for(let i=0;i<1800;i++){if(await evaluate(`document.querySelector('.game').dataset.revision!==${JSON.stringify(revision)}`))break;await new Promise(r=>setTimeout(r,100));}
        assert.notEqual(await evaluate(`document.querySelector('.game').dataset.revision`),revision);
        assert.ok(await evaluate('h5Ticks')>=2);await evaluate('clearInterval(h5Timer)');checks++;
        assert.equal(await evaluate('window.lastAlert??null'),null);checks++;
      }
    }
    console.log('PASS H5 Chromium '+name);
  }
  console.log(JSON.stringify({browser:'Chromium headless/CDP',viewports:['390x844','360x640','1280x800'],checks,scenarios:scenarios.length,physicalSafari:false,heap:await call('Runtime.getHeapUsage',{},sessionId)}));
  await call('Browser.close');
} finally {
  socket?.close();
  if(browser?.pid && browser.exitCode===null && browser.signalCode===null){const timeout=setTimeout(()=>browser.kill('SIGKILL'),3000);try{await once(browser,'exit');}finally{clearTimeout(timeout);}}
  if(server)await new Promise(resolve=>server.close(resolve));
  await rm(temporary,{recursive:true,force:true,maxRetries:5,retryDelay:100});
}
