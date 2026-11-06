import {createHash} from 'node:crypto';
import {eventWorld} from '../test/support/event-fixtures.js';
import {academicAt,academicApply} from '../test/support/senior-academic.js';
import {calendarDay,SENIOR_CALENDAR_VERSION,THREE_YEAR,yearData} from '../src/calendar/calendar.js';
import {aftercareCatalogue} from '../src/runtime/story-content.js';
import {createCandidate} from '../src/player/creation.js';
import {createCareerOpening} from '../src/runtime/opening.js';
import {createSave,restoreSave} from '../src/storage/format.js';
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
    const id=++sequence,timer=setTimeout(()=>{pending.delete(id);reject(new Error(`CDP timeout: ${method}`));},900000);
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
  const wait=async selector=>{for(let i=0;i<9000;i++){if(await evaluate(`!!document.querySelector(${JSON.stringify(selector)})`))return;await new Promise(r=>setTimeout(r,100));}throw Error('Missing '+selector+' '+await evaluate('document.body.innerText')+' ALERT '+await evaluate('window.lastAlert'));};
  const click=async action=>{for(let i=0;i<9000&&await evaluate(`!!document.querySelector('.operation-status')`);i++)await new Promise(r=>setTimeout(r,100));const selector=await evaluate(`'[data-action="'+CSS.escape(${JSON.stringify(action)})+'"]'`);await wait(selector);await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);for(let i=0;i<9000;i++){if(!await evaluate(`!!document.querySelector('.operation-status')`))return;await new Promise(r=>setTimeout(r,100));}throw Error('Operation did not finish: '+action);};
  const includes=async text=>{if(!await evaluate(`document.body.innerText.includes(${JSON.stringify(text)})`))throw Error('Missing text '+text);};

  // Date-isolated legacy saves verify UI compatibility only. The separate
  // senior-integration driver is the genuine continuous three-year evidence.
  const fixtures=JSON.parse(gunzipSync(await readFile(resolve(root,'test/fixtures/h4-pre-5c21854.json.gz'))));
  const extra=process.argv.find(a=>a.startsWith('--save='))?.slice(7);
  const opening=createCareerOpening({candidate:createCandidate({seed:74,playerId:'teacher',schoolId:'school'}),seed:75,taipeiDate:'2026-11-06',difficulty:'normal',subject:'國文',careerKey:'h5-browser'});
  const review=academicApply(academicAt(opening,yearData(2027).winterFinal,'private'),[{type:'finish-slot',completedActivityIds:[]}]);
  const contactDate='2029-06-02';let contact=academicAt(eventWorld(74,contactDate,calendarDay(contactDate,3,SENIOR_CALENDAR_VERSION).slots[0].id,{version:1,mode:THREE_YEAR,difficulty:'hard'}),contactDate);contact=academicApply(contact,[{type:'academic',action:'open'}]);contact=academicApply(contact,[aftercareCatalogue()]);
  function mockFixture(date){let w=eventWorld(74,null,null,{version:1,mode:THREE_YEAR,difficulty:'hard'});for(const d of ['2027-02-22','2027-07-26','2028-02-21','2028-07-24',...(date.startsWith('2029')?['2029-02-19']:[])])w=academicAt(w,d);return createSave(academicApply(academicAt(w,date,'morning'),[{type:'academic',action:'open'}]));}
  const ceremony=academicApply(academicAt(restoreSave(fixtures.before).world,'2029-06-01','morning'),[{type:'school-action',activity:'automatic'}]);
  const scenarios=extra?[[extra,JSON.parse(gunzipSync(await readFile(extra)))]]:[['opening',createSave(opening,opening)],['review',createSave(review,opening)],['mock-gsat',mockFixture('2028-12-01')],['mock-subject',mockFixture('2029-03-01')],['ceremony',createSave(ceremony)],['before',fixtures.before],['after',fixtures.after],['terminal',fixtures.terminal],['reserved',fixtures.reserved],['contact',createSave(contact)]];
  let checks=0,completedHeap=null,storedSizes=null;const timings={};
  await call('Page.navigate',{url},sessionId);await wait('[data-action="slots"]');
  const install=async payload=>{
    // Import uses the real save boundary, never arbitrary IndexedDB records.
    const path=join(temporary,'site','teacher-hell','h5-fixture.json');await writeFile(path,JSON.stringify(payload));
    await evaluate(`(async()=>{const {createIndexedDBStorage}=await import('./src/storage/indexeddb.js'),{createStoredSession}=await import('./src/storage/session.js');const db=createIndexedDBStorage({factory:indexedDB,namespace:'development'}),s=await createStoredSession(db,1),snap=s.snapshot();await s.import(await(await fetch('./h5-fixture.json')).text(),{expectedToken:snap.token,confirmed:true});await db.close();})()`);
    await call('Page.reload',{},sessionId);await wait('[data-action="slots"]');await click('slots');const loadAt=performance.now();await click('load:1');await wait('.game');timings.loadMs=performance.now()-loadAt;
  };
  for(const [name,payload] of scenarios){
    console.log('BEGIN H5 Chromium '+name);await install(payload);console.log('LOADED H5 Chromium '+name);
    const completed=payload.world.extensions['teacher-hell/world'].history.some(h=>h.type==='career-completion');
    for(const [width,height] of [[390,844],[360,640],[1280,800]]){
      await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600},sessionId);
      const layout=await evaluate(`(()=>{const g=document.querySelector('.game'),r=g.getBoundingClientRect();return {documentScroll:document.documentElement.scrollHeight>innerHeight+1,withinX:r.right<=innerWidth+1,withinY:r.bottom<=innerHeight+1};})()`);
      assert.deepEqual(layout,{documentScroll:false,withinX:true,withinY:true});checks++;
    }
    await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true},sessionId);
    if(name==='review'){
      const pending=await evaluate(`document.querySelector('[data-action^="review-ack:"]').dataset.action`);
      await click('close');assert.equal(await evaluate(`document.querySelector('[data-action^="review-ack:"]').dataset.action`),pending);checks++;
      await click('menu');await click('review-open');assert.equal(await evaluate(`document.querySelectorAll('.overlay').length`),1);assert.equal(await evaluate(`document.querySelector('[data-action^="review-ack:"]').dataset.action`),pending);checks++;
      await click(pending);await wait('[data-action="progress"]');assert.equal(await evaluate(`document.querySelector('[data-action^="review-ack:"]')===null`),true);await includes(payload.world.position.date);assert.equal(await evaluate('window.lastAlert??null'),null);checks++;
      console.log('PASS H5 Chromium review');continue;
    }
    if(name==='mock-gsat'||name==='mock-subject'){
      const family=name==='mock-gsat'?'學測':'分科';await includes(family+'模考・上午（不計入學期成績）');checks++;
      await click('timetable');assert.equal(await evaluate(`document.querySelectorAll('.table button').length`),40);await includes(family+'模考');await click('close');checks++;
      console.log('PASS H5 Chromium '+name);continue;
    }
    if(name==='ceremony'){
      const revision=await evaluate(`document.querySelector('.game').dataset.revision`),first=await evaluate(`document.querySelector('.story').textContent`);
      await includes('1／4');await click('ceremony-page:1');await includes('2／4');assert.notEqual(await evaluate(`document.querySelector('.story').textContent`),first);checks++;
      assert.equal(await evaluate(`document.querySelector('.game').dataset.revision`),revision);await click('menu');await click('slots');await click('load:1');await wait('.game');await includes('1／4');checks++;
      assert.equal(await evaluate(`document.querySelector('.game').dataset.revision`),revision);assert.equal(await evaluate('window.lastAlert??null'),null);checks++;
      console.log('PASS H5 Chromium ceremony');continue;
    }
    if(extra&&['2028-07-24','2028-12-01'].includes(payload.world.position.date)){
      await includes('學測模考・上午（不計入學期成績）');checks++;
      await click('timetable');assert.equal(await evaluate(`document.querySelectorAll('.table button').length`),40);await includes('學測模考');await click('close');checks++;
    }
    if(extra&&!completed&&payload.world.position.date==='2029-06-29'){
      // The source is an actual continuous save before the original report gate.
      const pending=await evaluate(`document.querySelector('[data-action^="review-ack:"]')?.dataset.action??null`);
      if(pending){await click('close');assert.ok(await evaluate(`!!document.querySelector('[data-action^="review-ack:"]')`));checks++;await click(pending);await wait('[data-action="progress"]');checks++;}
      await includes('完成三年任期結算');const t4At=performance.now();await click('progress');await includes('三年任期完成');timings.t4UiMs=performance.now()-t4At;checks++;
      assert.equal(await evaluate(`document.querySelector('[data-action="progress"]')===null`),true);checks++;
      await call('Page.reload',{},sessionId);await wait('[data-action="slots"]');await click('slots');await click('load:1');await wait('.game');await includes('三年任期完成');checks++;
      await click('completion-details');await includes('三年生涯完成紀錄');await includes('畢典與六月紀錄');await click('close');checks++;
    }
    if(completed){
      storedSizes=await evaluate(`(async()=>{const db=await new Promise((resolve,reject)=>{const q=indexedDB.open('teacher-hell:development:v1:slot1',1);q.onsuccess=()=>resolve(q.result);q.onerror=()=>reject(q.error);});try{return await new Promise((resolve,reject)=>{const tx=db.transaction(['state','pages'],'readonly'),head=tx.objectStore('state').get('save'),pages=tx.objectStore('pages').getAll();tx.oncomplete=()=>resolve({format:head.result.format,codec:head.result.codec,rawBytes:head.result.rawBytes,chunkCount:head.result.chunkCount,payloadPageBytes:pages.result.reduce((n,p)=>n+p.byteLength,0)});tx.onabort=()=>reject(tx.error);});}finally{db.close();}})()`);
      assert.equal(storedSizes.codec,'gzip');assert.ok(storedSizes.payloadPageBytes<storedSizes.rawBytes);checks++;
      assert.equal(await evaluate(`document.querySelector('[data-action="progress"]')===null`),true);checks++;
      console.log('BEGIN completed notebook');await click('completion-details');await includes('三年生涯完成紀錄');await includes('畢典與六月紀錄');checks++;
      const savedCeremony=payload.world.extensions['teacher-hell/world'].facts.findLast(f=>f.data.graduationSummary).data.graduationSummary;assert.equal(await evaluate(`document.querySelector('.notebook-career').textContent.includes(${JSON.stringify(savedCeremony.description)})`),true);await includes('2029-06-01');checks++;
      await click('notebook-tab:people');await wait('.notebook-person');assert.ok(await evaluate(`document.querySelectorAll('.notebook-person').length>=38`));checks++;
      await click('notebook-tab:academics');await wait('.notebook-academic-student');
      assert.ok(await evaluate(`document.querySelectorAll('.notebook-academic-student').length>=38`));checks++;
      await evaluate(`document.querySelector('.notebook-academic-student').click()`);await wait('.notebook-academic-details h3');await includes('40％／30％／30％');await includes('畢業考');
      assert.equal(await evaluate(`document.querySelectorAll('.notebook-academic-terms button').length`),6);checks++;
      assert.equal(await evaluate(`Array.from(document.querySelectorAll('.notebook-academic-table th')).some(x=>x.textContent==='三段')`),false);checks++;
      await click('notebook-academic-term:2026:autumn');await includes('40％／20％／20％／20％');assert.equal(await evaluate(`Array.from(document.querySelectorAll('.notebook-academic-table th')).some(x=>x.textContent==='三段')`),true);checks++;
      await click('notebook-academic-term:2029:spring');await includes('40％／30％／30％');await includes('畢業考');assert.equal(await evaluate(`Array.from(document.querySelectorAll('.notebook-academic-table th')).some(x=>x.textContent==='三段')`),false);checks++;
      await click('close');
      completedHeap=await call('Runtime.getHeapUsage',{},sessionId);
      const shot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false},sessionId);await writeFile(resolve(root,'work/h5/completed-mobile.png'),Buffer.from(shot.data,'base64'));
      await click('menu');await click('slots');await evaluate(`window.h5Loop={ticks:0,maxGapMs:0,last:performance.now()};window.h5LoopTimer=setInterval(()=>{const now=performance.now();h5Loop.maxGapMs=Math.max(h5Loop.maxGapMs,now-h5Loop.last);h5Loop.last=now;h5Loop.ticks++;},20)`);const exportAt=performance.now();console.log('BEGIN completed export');await click('export:1');
      let exported;for(let i=0;i<900;i++){exported=(await readdir(temporary)).find(n=>n.endsWith('.json'));if(exported)break;await new Promise(r=>setTimeout(r,100));}
      assert.ok(exported);timings.exportUiMs=performance.now()-exportAt;timings.exportMainLoop=await evaluate('clearInterval(h5LoopTimer);h5Loop');assert.ok(timings.exportMainLoop.ticks>1);checks++;const exportedPath=join(temporary,exported),backup=await readFile(exportedPath),expected=gunzipSync(await readFile(extra));
      const sha=b=>createHash('sha256').update(b).digest('hex');assert.equal(sha(backup),sha(expected));checks++;
      const opened=new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Completed import file chooser timeout')),10000),listener=e=>{const m=JSON.parse(e.data);if(m.method==='Page.fileChooserOpened'){clearTimeout(timer);socket.removeEventListener('message',listener);resolve(m.params.backendNodeId);}};socket.addEventListener('message',listener);});
      console.log('BEGIN completed import');await click('import:2');const importAt=performance.now();await call('DOM.setFileInputFiles',{files:[exportedPath],backendNodeId:await opened},sessionId);
      for(let i=0;i<9000&&await evaluate(`!!document.querySelector('.operation-status')`);i++)await new Promise(r=>setTimeout(r,100));
      await wait('[data-action="load:2"]');timings.importUiMs=performance.now()-importAt;await click('load:2');await wait('.game');await includes('三年任期完成');assert.equal(await evaluate(`document.querySelector('[data-action="progress"]')===null`),true);checks++;
      await click('menu');await click('slots');await click('new:2');await click('difficulty:hard');await click('teacher');await click('subjects');await click('review');
      await evaluate('window.confirmPrompts=[];window.confirmAnswers=[false]');await click('create');assert.equal(await evaluate('window.confirmPrompts.length'),1);await wait('[data-action="create"]');checks++;
      await evaluate('window.confirmPrompts=[];window.confirmAnswers=[true,false]');await click('create');assert.equal(await evaluate('window.confirmPrompts.length'),2);await wait('[data-action="create"]');checks++;
      await evaluate('window.confirmPrompts=[];window.confirmAnswers=[true,true]');await click('create');await wait('.game');await includes('2026-07-20');await includes('任教第 1 年');assert.equal(await evaluate('window.confirmPrompts.length'),2);checks++;
      assert.equal(await evaluate('window.lastAlert??null'),null);checks++;
    }else if(!extra||payload.world.position.date!=='2029-06-29'){
      await wait('[data-action="progress"]');
      if(name==='opening'){
        for(let step=0;step<4;step++){
          const rev=await evaluate(`document.querySelector('.game').dataset.revision`);await click('progress');
          for(let i=0;i<9000;i++){if(await evaluate(`document.querySelector('.game').dataset.revision!==${JSON.stringify(rev)}`))break;await new Promise(r=>setTimeout(r,100));}
          assert.notEqual(await evaluate(`document.querySelector('.game').dataset.revision`),rev);assert.equal(await evaluate('window.lastAlert??null'),null);checks++;
        }
        // Another tab can replace an identical world without changing revision.
        // The stale rendered token must still reject its next request.
        const changed=await evaluate(`(async()=>{const {createIndexedDBStorage}=await import('./src/storage/indexeddb.js'),{createStoredSession}=await import('./src/storage/session.js'),db=createIndexedDBStorage({factory:indexedDB,namespace:'development'}),s=await createStoredSession(db,1),before=s.snapshot();await s.import(before.payload,{expectedToken:before.token,confirmed:true});const token=s.snapshot().token;await db.close();return token;})()`);
        const rev=await evaluate(`document.querySelector('.game').dataset.revision`);await click('progress');assert.match(await evaluate('window.lastAlert'),/Displayed slot changed/);checks++;
        assert.equal(await evaluate(`document.querySelector('.game').dataset.revision`),rev);
        const actual=await evaluate(`(async()=>{const {createIndexedDBStorage}=await import('./src/storage/indexeddb.js'),db=createIndexedDBStorage({factory:indexedDB,namespace:'development'}),token=(await db.inspect(1)).token;await db.close();return token;})()`);assert.deepEqual(actual,changed);checks++;
        await evaluate('window.lastAlert=null');await click('progress');assert.notEqual(await evaluate(`document.querySelector('.game').dataset.revision`),rev);assert.equal(await evaluate('window.lastAlert??null'),null);checks++;
      }
      if(name==='contact'){
        await click('progress');await wait('[data-action="progress"]');await includes('處理待辦事件');checks++;
        await click('progress');await wait('[data-story-action]');checks++;
        let selections=0;
        for(let move=0;move<20;move++){
          if(!await evaluate(`!!document.querySelector('.story-view')`))break;
          const action=await evaluate(`(()=>{const actions=['next','confirm','select','finish','resume'];for(const a of actions){const b=document.querySelector('[data-story-action="'+a+'"]:not([disabled])');if(b){b.click();return a;}}return null;})()`);
          assert.ok(action);if(action==='select')selections++;
          for(let i=0;i<9000&&await evaluate(`!!document.querySelector('.operation-status')`);i++)await new Promise(r=>setTimeout(r,100));
          assert.equal(await evaluate('window.lastAlert??null'),null);
        }
        assert.ok(selections>0);await wait('[data-action="progress"]');checks++;
        await click('progress');await includes('2029-06-09');checks++;
        const counts=await evaluate(`(async()=>{const {createIndexedDBStorage}=await import('./src/storage/indexeddb.js');const db=createIndexedDBStorage({factory:indexedDB,namespace:'development'}),h=(await db.read(1)).payload.world.extensions['teacher-hell/world'].history;await db.close();return {weeks:h.filter(x=>x.type==='aftercare-week-summary').length,contacts:h.filter(x=>x.type==='event-selection').flatMap(x=>x.data.selected).filter(s=>s.definitionId==='aftercare:contact').length};})()`);assert.deepEqual(counts,{weeks:1,contacts:1});checks++;
        await click('notebook');await click('notebook-tab:career');await includes('2029-06-02～2029-06-08');checks++;
        await click('close');await call('Page.reload',{},sessionId);await wait('[data-action="slots"]');await click('slots');await click('load:1');await wait('.game');await includes('2029-06-09');checks++;
      }
      if(name==='reserved'){
        await click('progress');assert.equal(await evaluate('window.lastAlert??null'),null);checks++;
        const journal=await evaluate(`(async()=>{const {createIndexedDBStorage}=await import('./src/storage/indexeddb.js'),db=createIndexedDBStorage({factory:indexedDB,namespace:'development'}),w=(await db.read(1)).payload.world,r=w.extensions['teacher-hell/world'],a=r.history.find(h=>h.type==='aftercare-adoption');await db.close();return {prefix:JSON.stringify(r.history.slice(0,${payload.world.extensions['teacher-hell/world'].history.length})),retired:a.data.retiredReservationIds.length,admitted:a.data.retiredReservationIds.some(id=>w.events.some(e=>e.id===id))};})()`);
        assert.equal(journal.prefix,JSON.stringify(payload.world.extensions['teacher-hell/world'].history));assert.ok(journal.retired>0);assert.equal(journal.admitted,false);checks++;
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
        await evaluate(`document.querySelector('[data-action="progress"]').click()`);await wait('.operation-status');assert.equal(await evaluate(`Array.from(document.querySelectorAll('#app button')).every(b=>b.disabled)`),true);checks++;
        for(let i=0;i<9000;i++){if(await evaluate(`document.querySelector('.game').dataset.revision!==${JSON.stringify(revision)}`))break;await new Promise(r=>setTimeout(r,100));}
        assert.notEqual(await evaluate(`document.querySelector('.game').dataset.revision`),revision);
        assert.ok(await evaluate('h5Ticks')>=2);await evaluate('clearInterval(h5Timer)');checks++;
        assert.equal(await evaluate('window.lastAlert??null'),null);checks++;
      }
    }
    console.log('PASS H5 Chromium '+name);
  }
  console.log(JSON.stringify({browser:'Chromium headless/CDP',viewports:['390x844','360x640','1280x800'],checks,scenarios:scenarios.length,physicalSafari:false,completedHeap,storedSizes,timings,browserVersion:await call('Browser.getVersion'),heap:await call('Runtime.getHeapUsage',{},sessionId)}));
  await call('Browser.close');
} finally {
  socket?.close();
  if(browser?.pid && browser.exitCode===null && browser.signalCode===null){const timeout=setTimeout(()=>browser.kill('SIGKILL'),3000);try{await once(browser,'exit');}finally{clearTimeout(timeout);}}
  if(server)await new Promise(resolve=>server.close(resolve));
  await rm(temporary,{recursive:true,force:true,maxRetries:5,retryDelay:100});
}
