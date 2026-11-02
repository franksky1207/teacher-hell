/** Interactive engineering CLI, isolated from browser/player slots. */
import { createInterface } from 'node:readline/promises';
import { readFile,writeFile,mkdir } from 'node:fs/promises';
import { beginDemo,apply,storyAction,advanceDemo,completeRoute } from '../test/support/story-scenario.js';
import { readStory } from '../src/runtime/story.js';
import { restoreWorldState } from '../src/runtime/model.js';
import { readPlayerView } from '../src/runtime/views.js';
if(process.argv.includes('--regression')){
 const reports=['listen','angry'].map(id=>{const {world,report}=completeRoute(id);return {...report,known:readPlayerView(world).claims};});
 await mkdir('simulation/results',{recursive:true});await writeFile('simulation/results/story-routes-20261102.json',JSON.stringify(reports,null,2)+'\n');
 for(const r of reports)console.log(JSON.stringify({route:r.route,choices:r.choices,stages:r.stages,ended:r.final.ended,teacherDelta:r.final.teacherDelta,restored:r.restored}));
}else{
 let {world,eventId}=beginDemo();const rl=createInterface({input:process.stdin,output:process.stdout});
 console.log('第07批工程示範（非正式96主題）。指令：show / next / prev / choose <id> / cancel / confirm / finish / time / resume / save / load / restart / quit');
 function show(){const v=readStory(world,eventId);console.log('\n'+world.position.date+' '+world.position.slotId+`  ${v.pageIndex+1}/${v.pageCount}`);console.log(v.page.text);for(const o of v.choices)console.log(o.id+'：'+o.text);if(v.confirmation)console.log('待確認：'+v.confirmation.text+'（confirm確認，cancel返回）');if(v.result.length)console.log(v.result.join('\n'));if(v.waiting)console.log('等待後續：time推進時段，跨日後resume');if(v.canFinish)console.log('finish結束本階段');if(v.ended)console.log('事件結束，教師淨變化：'+JSON.stringify(v.teacherDelta));}
 show();try{for(;;){const [cmd,arg]=(await rl.question('> ')).trim().split(/\s+/);try{
  if(cmd==='quit')break;
  if(cmd==='save'){await mkdir('work',{recursive:true});await writeFile('work/story-demo.json',JSON.stringify({world,eventId}));console.log('已存至work/story-demo.json');}
  else if(cmd==='load'){const saved=JSON.parse(await readFile('work/story-demo.json','utf8'));world=restoreWorldState(saved.world);eventId=saved.eventId;}
  else if(cmd==='restart')({world,eventId}=beginDemo());
  else if(cmd==='time')world=advanceDemo(world);
  else if(cmd!=='show'){const action={prev:'previous',next:'next',choose:'select',cancel:'cancel',confirm:'confirm',finish:'finish',resume:'resume'}[cmd];if(!action)throw Error('未知指令');world=apply(world,[storyAction(eventId,action,arg??null)]);}
  show();
 }catch(error){console.log(error.message);}}}finally{rl.close();}
}
