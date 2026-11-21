/** 15-E background music. Playback is a nonblocking, save-independent UI effect.
 * Browser user gesture controls playback (especially iOS Safari).
 */
import {MUSIC_TRACKS,MUSIC_KEYS} from '../src/runtime/story-music.js';
export {MUSIC_TRACKS,MUSIC_KEYS};
export const MUSIC_STORE_KEY='teacher-hell:music:v1';
export function parseMusicSettings(text){
 try {const data=JSON.parse(text);return {
  enabled:typeof data.enabled==='boolean'?data.enabled:true,
  volume:Number.isFinite(data.volume)?Math.max(0,Math.min(1,data.volume)):0.65
 };} catch {return {enabled:true,volume:0.65};}
}
export class MusicPlayer {
 constructor({doc=document,store=globalThis.localStorage,AudioClass=globalThis.Audio,assetBase=new URL('./web/assets/music/',document.baseURI).href}={}){
  this.doc=doc;this.store=store;this.AudioClass=AudioClass;this.assetBase=assetBase;
  let saved=null;try{saved=store?.getItem(MUSIC_STORE_KEY)}catch{}
  this.settings=parseMusicSettings(saved);this.unlocked=false;this.mood='school';
  this.active=null;this.incoming=null;this.token=0;this.frame=0;this.expanded=false;
  this.mount();
 }
 save(){try{this.store?.setItem(MUSIC_STORE_KEY,JSON.stringify(this.settings));}catch{}}
 mount(){
  const el=this.doc.createElement('aside');el.className='music-dock';el.setAttribute('aria-label','音樂快速控制');
  el.innerHTML=`<button type="button" class="music-dock__toggle" data-music-toggle aria-label="關閉背景音樂" title="背景音樂開關">♪</button><button type="button" class="music-dock__expand" data-music-expand aria-expanded="false" aria-label="展開背景音量" title="調整音量">⌄</button><div class="music-dock__panel" data-music-panel hidden><label>音量 <input type="range" data-music-volume min="0" max="100" value="65"><output data-music-volume-label>45%</output></label></div>`;
  this.doc.body.append(el);this.dock=el;
  this.doc.addEventListener('click',e=>{
   if(e.target.closest('[data-music-toggle]')){e.stopPropagation();this.unlock();this.setEnabled(!this.settings.enabled);}
   else if(e.target.closest('[data-music-expand]')){e.stopPropagation();this.expanded=!this.expanded;this.sync();}
  },true);
  this.doc.addEventListener('input',e=>{
   if(e.target.matches('[data-music-volume]')){e.stopPropagation();this.unlock();this.setVolume(Number(e.target.value)/100);}
  },true);
  this.doc.addEventListener('change',e=>{
   if(e.target.matches('[data-music-enabled]')){e.stopPropagation();this.unlock();this.setEnabled(e.target.checked);}
  },true);
  // A user gesture is mandatory before any audio is created/started.
  this.doc.addEventListener('pointerdown',()=>this.unlock(),{once:true,capture:true});
  this.doc.addEventListener('keydown',()=>this.unlock(),{once:true,capture:true});
  this.sync();
 }
 sync(){
  const enabled=this.settings.enabled;
  for(const b of this.doc.querySelectorAll('[data-music-toggle]')){b.textContent=enabled?'♫':'♪̸';b.setAttribute('aria-label',enabled?'關閉背景音樂':'開啟背景音樂');b.title=enabled?'關閉背景音樂':'開啟背景音樂';b.setAttribute('aria-pressed',String(enabled));}
  for(const b of this.doc.querySelectorAll('[data-music-enabled]'))b.checked=enabled;
  for(const b of this.doc.querySelectorAll('[data-music-volume]'))b.value=String(Math.round(this.settings.volume*100));
  for(const b of this.doc.querySelectorAll('[data-music-volume-label]'))b.textContent=Math.round(this.settings.volume*100)+'%';
  const panel=this.dock.querySelector('[data-music-panel]');panel.hidden=!this.expanded;
  this.dock.querySelector('[data-music-expand]').setAttribute('aria-expanded',String(this.expanded));
 }
 unlock(){if(this.unlocked)return;this.unlocked=true;this.apply();}
 setEnabled(enabled){this.settings.enabled=!!enabled;this.save();this.apply();this.sync();}
 setVolume(volume){this.settings.volume=Math.max(0,Math.min(1,Number(volume)||0));this.save();this.applyVolume();this.sync();}
 select(key){const next=MUSIC_KEYS.has(key)?key:'school';if(this.mood===next)return;this.mood=next;this.apply();}
 stopChannel(channel){if(!channel)return;channel.audio.pause();channel.audio.src='';}
 newChannel(key){
  const track=MUSIC_TRACKS.find(t=>t.key===key);
  const audio=new this.AudioClass(this.assetBase+key+'.ogg');
  audio.loop=true;audio.preload='auto';audio.volume=0;
  audio.addEventListener('error',()=>{console.warn('背景音樂無法載入：'+track.title);},{once:true});
  return {key,audio,gain:0};
 }
 applyVolume(){for(const ch of [this.active,this.incoming])if(ch)ch.audio.volume=Math.min(1,Math.max(0,ch.gain*this.settings.volume));}
 // 600 ms crossfade. Same channel never restarts on a normal re-render.
 apply(){
  ++this.token;const token=this.token;
  if(this.frame)cancelAnimationFrame(this.frame);
  if(!this.unlocked||!this.settings.enabled){
   if(this.active)this.active.audio.pause();
   if(this.incoming){this.stopChannel(this.incoming);this.incoming=null;}
   return;
  }
  if(this.active?.key===this.mood&&!this.incoming){
   if(this.active.audio.paused)this.tryPlay(this.active);this.active.gain=1;this.applyVolume();return;
  }
  const next=this.incoming?.key===this.mood?this.incoming:this.newChannel(this.mood);
  if(this.incoming&&this.incoming!==next)this.stopChannel(this.incoming);
  this.incoming=next;this.tryPlay(next);
  const prior=this.active,from=prior?.gain??0,start=performance.now();
  const tick=now=>{
   if(token!==this.token)return;
   const p=Math.min(1,(now-start)/650);
   if(prior&&prior!==next)prior.gain=from*(1-p);
   next.gain=p;this.applyVolume();
   if(p<1)this.frame=requestAnimationFrame(tick);
   else{if(prior&&prior!==next)this.stopChannel(prior);this.active=next;this.incoming=null;this.frame=0;this.applyVolume();}
  };this.frame=requestAnimationFrame(tick);
 }
 tryPlay(ch){try{const promise=ch.audio.play();promise?.catch(()=>{/* Safari permits silent fallback until a later gesture. */});}catch{}}
}
