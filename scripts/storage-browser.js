/** Real Chromium IndexedDB acceptance runner. Temporary profile/site, no player data. */
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
  await cp(resolve(root,'test/support'),join(temporary,'site','teacher-hell/test/support'),{recursive:true});
  if(process.argv.includes('--annual'))await cp(resolve(root,'work/annual/world.json'),join(temporary,'site','teacher-hell/test/support/annual-completed.json'));
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
  const call=(method,params={},sessionId,timeoutMs=120000)=>new Promise((resolve,reject)=>{
    const id=++sequence,timer=setTimeout(()=>{pending.delete(id);reject(new Error(`CDP timeout: ${method}`));},timeoutMs);
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
  const evalIn=async (expression,sid=sessionId,timeoutMs=120000)=>{
    const out=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true},sid,timeoutMs);
    if(out.exceptionDetails)throw Error(JSON.stringify(out.exceptionDetails));return out.result.value;
  };
  const testId=temporary.split('/').at(-1);
  const setup=initialize=>`(async()=>{globalThis.checks=await import('./test/support/storage-checks.js');globalThis.st=await checks.setup(${JSON.stringify(testId)},${initialize});return true;})()`;
  if(!process.argv.includes('--story-only')){
  await evalIn(setup(true));
  console.log('PASS',await evalIn('checks.basics(st)'));
  const second=await call('Target.createTarget',{url});
  const peer=await call('Target.attachToTarget',{targetId:second.targetId,flatten:true});
  // Navigation is asynchronous. Probe only the same-origin document before imports.
  for(let i=0;i<100;i++){if(await evalIn(`location.href===${JSON.stringify(url)} && document.readyState==='complete'`,peer.sessionId))break;await new Promise(r=>setTimeout(r,100));}
  await evalIn(setup(false),peer.sessionId);
  const race=await Promise.all([evalIn("checks.compete(st,'tab-a')"),evalIn("checks.compete(st,'tab-b')",peer.sessionId)]);
  if(race.filter(r=>r.ok).length!==1||race.find(r=>!r.ok).code!=='STALE')throw Error('Cross-page CAS failed: '+JSON.stringify(race));
  const winningTag=race[0].ok?'tab-a':'tab-b';console.log('PASS real two-page simultaneous CAS:',JSON.stringify(race.map(r=>({ok:r.ok,code:r.code,revision:r.token?.revision}))));
  console.log('PASS',await evalIn(`checks.replay(st,${JSON.stringify(winningTag)})`,peer.sessionId));
  console.log('PASS',await evalIn('checks.faults(st)'));
  await evalIn('st.db.close()');
  await call('Page.navigate',{url:'about:blank'},sessionId);
  await call('Page.navigate',{url},sessionId);await passed();await evalIn(setup(false));
  const revision=await evalIn("st.session.snapshot().payload.world.extensions['teacher-hell/world'].revision");if(revision!==2)throw Error('Actual navigation lost committed world');
  console.log('PASS actual page reload after memory-publication failure: revision',revision);
  console.log('PASS',await evalIn('checks.importsAndRetry(st)'));
  const lineage=await evalIn(`checks.retryLineageStorage(${JSON.stringify(testId)})`);
  console.log('PASS retry identity rollback/import/isolation',JSON.stringify({provenance:lineage.provenance,saveBytes:lineage.saveBytes}));
  await call('Page.navigate',{url:'about:blank'},sessionId);await call('Page.navigate',{url},sessionId);await passed();await evalIn(setup(false));
  const lineageRestored=await evalIn(`checks.retryLineageStorage(${JSON.stringify(testId)},false)`);
  console.log('PASS actual navigation retains retired attempts; third retry, duplicate and stale writer',JSON.stringify({provenance:lineageRestored.provenance,saveBytes:lineageRestored.saveBytes}));
  console.log('PASS',await evalIn('checks.decision(st)'));
  await evalIn('checks.holdSlot(st)');
  const other=await evalIn(`(async()=>{const s=await (await import('./src/storage/session.js')).createStoredSession(st.db,3);return s.import(await s.export(),{expectedToken:s.snapshot().token,confirmed:true});})()`,peer.sessionId);
  if(!other.committed)throw Error('Other slot blocked');await evalIn('checks.releaseSlot(st)');console.log('PASS held slot 1 transaction does not block slot 3 in another page');
  console.log('PASS',await evalIn('checks.namespaceAndCorruption(st)'));
  const metrics=await evalIn('checks.capacity(st)');console.log('PASS capacity',JSON.stringify(metrics));
  await evalIn('st.db.close()');await call('Page.navigate',{url:'about:blank'},sessionId);await call('Page.navigate',{url},sessionId);await passed();await evalIn(setup(false));
  const large=await evalIn(`(async()=>{const p=(await st.db.read(2)).payload;return {facts:p.world.extensions['teacher-hell/world'].facts.length,openingFacts:p.opening.extensions['teacher-hell/world'].facts.length};})()`);
  if(large.facts!==600||large.openingFacts!==600)throw Error('Large reload lost history');console.log('PASS actual page reload restores large world and full opening snapshot',JSON.stringify(large));
  if(!process.argv.includes('--storage-only')){
  const phaseSetup=init=>`(async()=>{globalThis.phase=await import('./test/support/phase1-checks.js');globalThis.pt=await phase.setupPhase(${JSON.stringify(testId)},${init});return true;})()`;
  await evalIn(phaseSetup(true));await evalIn(phaseSetup(false),peer.sessionId);
  console.log('PASS phase 01–04 legal calendar/world/N6/history/PRNG/IndexedDB/restore/replay',JSON.stringify(await evalIn('phase.scenario(pt)')));
  await evalIn('phase.stalePhase(pt)',peer.sessionId);console.log('PASS phase 01–04 real second-page stale world blocked');
  console.log('PASS phase 01–04 atomic legal opening and isolated retry',JSON.stringify(await evalIn('phase.annualPhase(pt)')));
  console.log('PASS phase 01–04 formal time/table/random quota rollback and disk-success publication fault',JSON.stringify(await evalIn('phase.formalFaults(pt)')));
  const phaseSaved=await evalIn('JSON.stringify(pt.s.snapshot())');await evalIn('pt.db.close()');
  await call('Page.navigate',{url:'about:blank'},sessionId);await call('Page.navigate',{url},sessionId);await passed();await evalIn(phaseSetup(false));
  if(await evalIn('JSON.stringify(pt.s.snapshot())')!==phaseSaved)throw Error('Actual phase reload changed calendar/table/history/PRNG');
  console.log('PASS phase 01–04 actual page navigation restores exact formal world and fixed timetable');
  }else console.log('NOT EXECUTED: phase 01–04 calendar scenario (--storage-only explicitly selected)');
  const schoolSaved=await evalIn(`(async()=>{const module=await import('./test/support/school-checks.js');return module.schoolStorage(${JSON.stringify(testId)});})()`);
  console.log('PASS phase 05 school: real IndexedDB rollback/replay/import/reopen/retry/three slots',JSON.stringify(schoolSaved.report));
  await call('Page.navigate',{url:'about:blank'},sessionId);await call('Page.navigate',{url},sessionId);await passed();
  const schoolRestored=await evalIn(`(async()=>{const module=await import('./test/support/school-checks.js');return module.restoredSchoolSignature(${JSON.stringify(testId)});})()`);
  if(schoolRestored!==schoolSaved.signature)throw Error('School page reload changed identity/history/random');
  console.log('PASS phase 05 actual page navigation preserves the complete school world');
  const eventSetup=initialize=>`(async()=>{globalThis.ev=await import('./test/support/event-checks.js');globalThis.et=await ev.eventSetup(${JSON.stringify(testId)},${initialize});return true;})()`;
  await evalIn(eventSetup(true));await evalIn(eventSetup(false),peer.sessionId);
  console.log('PASS phase 06',await evalIn('ev.eventDrawFailure(et)'));
  const eventRace=await Promise.all([evalIn("ev.eventCompete(et,'event-tab-a')"),evalIn("ev.eventCompete(et,'event-tab-b')",peer.sessionId)]);
  if(eventRace.filter(r=>r.ok).length!==1||eventRace.find(r=>!r.ok)?.code!=='STALE')throw Error('Event draw CAS failed: '+JSON.stringify(eventRace));
  console.log('PASS phase 06 actual two-page event draw CAS',JSON.stringify(eventRace));
  const eventSaved=await evalIn('ev.eventStorageChecks(et)');
  console.log('PASS phase 06 atomic event reserve/admit/replay/rollback/import/retry/isolation/reopen',JSON.stringify(eventSaved.report));
  await call('Page.navigate',{url:'about:blank'},sessionId);await call('Page.navigate',{url},sessionId);await passed();
  const eventRestored=await evalIn(`(async()=>{const ev=await import('./test/support/event-checks.js');return ev.eventSignature(${JSON.stringify(testId)});})()`);
  if(eventRestored!==eventSaved.signature)throw Error('Event page reload changed committed selection');
  console.log('PASS phase 06 actual navigation restores exact event identity/history/PRNG');
  }
  await evalIn(`(async()=>{globalThis.story=await import('./test/support/story-checks.js');globalThis.storyTest=await story.storySetup(${JSON.stringify(testId)},true);return true;})()`);
  const pendingStory=await evalIn('(async()=>JSON.stringify(await storyTest.db.read(1)))()');await evalIn('storyTest.db.close()');
  await call('Page.navigate',{url:'about:blank'},sessionId);await call('Page.navigate',{url},sessionId);await passed();
  const restoredStory=await evalIn(`(async()=>{globalThis.story=await import('./test/support/story-checks.js');globalThis.storyTest=await story.storySetup(${JSON.stringify(testId)},false);return JSON.stringify(await storyTest.db.read(1));})()`);
  if(restoredStory!==pendingStory)throw Error('Story reload changed pending confirmation');
  console.log('PASS phase 07 actual navigation restores pending story confirmation');
  const storySaved=await evalIn('story.storyContinue(storyTest)');
  console.log('PASS phase 07 N6 rollback/dedup/three slots/import/cross-day/two completed branches',JSON.stringify(storySaved.report));
  const npcSaved=await evalIn(`(async()=>{const npc=await import('./test/support/npc-checks.js');return npc.npcStorage(${JSON.stringify(testId)});})()`);
  console.log('PASS phase 08 NPC atomic rollback/replay/three slots/export/import',JSON.stringify(npcSaved.report));
  await call('Page.navigate',{url:'about:blank'},sessionId);await call('Page.navigate',{url},sessionId);await passed();
  const npcRestored=await evalIn(`(async()=>{const npc=await import('./test/support/npc-checks.js');return npc.npcSignature(${JSON.stringify(testId)});})()`);
  if(npcRestored!==npcSaved.signature)throw Error('NPC actual navigation changed world/history/PRNG');
  console.log('PASS phase 08 actual navigation restores exact autonomous world');
  const reviewSaved=await evalIn(`(async()=>{const reviews=await import('./test/support/review-checks.js');return reviews.reviewStorage(${JSON.stringify(testId)});})()`);
  console.log('PASS semester report boundary IndexedDB rollback/replay/import/three slots',JSON.stringify(reviewSaved.report));
  await call('Page.navigate',{url:'about:blank'},sessionId);await call('Page.navigate',{url},sessionId);await passed();
  const reviewRestored=await evalIn(`(async()=>{const reviews=await import('./test/support/review-checks.js');return reviews.reviewSignature(${JSON.stringify(testId)});})()`);
  if(reviewRestored!==reviewSaved.signature)throw Error('Review navigation changed report/read state');
  console.log('PASS actual navigation preserves saved semester report and read state');
  const academicSaved=await evalIn(`(async()=>{const school=await import('./test/support/academic-checks.js');return school.academicStorage(${JSON.stringify(testId)});})()`);
  console.log('PASS phase 09 real IndexedDB academic/routine/N6/RNG rollback/replay/three slots/import',JSON.stringify(academicSaved.report));
  await call('Page.navigate',{url:'about:blank'},sessionId);await call('Page.navigate',{url},sessionId);await passed();
  const academicRestored=await evalIn(`(async()=>{const school=await import('./test/support/academic-checks.js');return school.academicSignature(${JSON.stringify(testId)});})()`);
  if(academicRestored!==academicSaved.signature)throw Error('Academic page navigation changed grades/routine/random');
  console.log('PASS phase 09 actual page navigation restores exact academic world');
  const procedureSaved=await evalIn(`(async()=>{const module=await import('./test/support/procedure-checks.js');return module.procedureStorage(${JSON.stringify(testId)});})()`);
  console.log('PASS phase 10 real IndexedDB procedures/protection/deadlines/long duty/rollback/replay/import/three slots',JSON.stringify(procedureSaved.report));
  await call('Page.navigate',{url:'about:blank'},sessionId);await call('Page.navigate',{url},sessionId);await passed();
  const procedureRestored=await evalIn(`(async()=>{const module=await import('./test/support/procedure-checks.js');return module.procedureSignature(${JSON.stringify(testId)});})()`);
  if(procedureRestored!==procedureSaved.signature)throw Error('Procedure actual navigation changed deadlines/evidence/history');
  console.log('PASS phase 10 actual navigation restores exact institutional world');
  if(process.argv.includes('--annual')){
   const run=initialize=>`(async()=>{const annual=await import('./test/support/annual-checks.js');return annual.annualStorage(${JSON.stringify(testId)},${initialize});})()`;
   const saved=await evalIn(run(true),sessionId,600000);console.log('PASS real first-year annual IndexedDB rollback/import/CAS/dedup/three slots',JSON.stringify(saved));
   await call('Page.navigate',{url:'about:blank'},sessionId);await call('Page.navigate',{url},sessionId);await passed();
   const reopened=await evalIn(run(false),sessionId,600000);if(saved.hash!==reopened.hash)throw Error('Annual navigation changed the saved world');console.log('PASS actual navigation restores the real annual result',JSON.stringify(reopened));
  }
  console.log('PASS Chromium storage: all checks complete; engineering acceptance only; NOT Safari/iPhone or full 30-year gameplay.');
  await call('Browser.close');
} finally {
  socket?.close();
  if(browser?.pid && browser.exitCode===null && browser.signalCode===null){
    const timeout=setTimeout(()=>browser.kill('SIGKILL'),3000);
    try{await once(browser,'exit');}finally{clearTimeout(timeout);}
  }
  if(server)await new Promise(resolve=>server.close(resolve));
  await rm(temporary,{recursive:true,force:true,maxRetries:5,retryDelay:100});
}
