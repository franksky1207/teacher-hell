import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const read=path=>readFile(new URL('../'+path,import.meta.url),'utf8');
test('13-G: story main and header are valid HTML openings',async()=>{
 const src=await read('web/game.js');
 assert.ok(src.includes('<main class="game'+"\${"+'activeStory'));
 assert.ok(src.includes('<div class="top">'+"\${"+'w.position.date}'));
 assert.ok(!src.includes('<div class="top"'+"\${"+'w.position.date}'));
});
test('13-G: real transaction route and style entry are connected',async()=>{
 const [game,html]=await Promise.all([read('web/game.js'),read('web/index.html')]);
 assert.match(game,/await current\.execute\(request\)/);
 assert.match(game,/!document\.querySelector\('\.overlay'\)/);
 assert.match(html,/story-view\.css/);
});
test('13-G: scoped portrait and desktop layout, accessible focus and scroll',async()=>{
 const [game,story]=await Promise.all([read('web/game.css'),read('web/story-view.css')]);
 assert.match(game,/\.game--story\{height:100dvh/);
 assert.match(game,/\.game--story \.story-reader\{[^}]*overflow-y:auto/);
 assert.match(game,/\.game--story \.story-choice-panel\{[^}]*overflow-y:auto/);
 assert.match(game,/\.game--story \.story-choice-grid\{grid-template-columns:repeat\(4/);
 assert.match(game,/\.game--story \.story-choice-grid\{grid-template-columns:repeat\(2/);
 assert.match(story,/focus-visible/);
});
test('13-G: scroll guard prevents story turning from messages',async()=>{
 const src=await read('web/game.js');
 assert.match(src,/const safeSurface=surface&&/);
 assert.match(src,/\.story-chat,\.story-document,\.story-phone/);
 assert.match(src,/if\(storyBusy\)return/);
});
