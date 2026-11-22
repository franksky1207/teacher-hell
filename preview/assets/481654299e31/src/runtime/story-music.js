export const MUSIC_TRACKS=Object.freeze([
 {key:'school',label:'一般校園',title:'Good Morning',author:"You're Perfect Studio",source:'https://opengameart.org/content/good-morning',license:'CC0'},
 {key:'conflict',label:'衝突',title:'Tension',author:'tapatilorenzo',source:'https://opengameart.org/content/midi-2-tension-songs',license:'CC0'},
 {key:'serious',label:'重大事情',title:'Unsolved Investigation',author:'isaiah658',source:'https://opengameart.org/content/unsolved-investigation',license:'CC0'},
 {key:'home',label:'在家',title:'Forget Me Not',author:'Kistol',source:'https://opengameart.org/content/forget-me-not',license:'CC0'},
 {key:'playful',label:'遊玩',title:'Happy Adventure',author:'TinyWorlds',source:'https://opengameart.org/content/happy-adventure-loop',license:'CC0'},
 {key:'touching',label:'溫馨感動',title:'First Light Particles',author:'Yoiyami',source:'https://opengameart.org/node/182244',license:'CC0'},
 {key:'absurd',label:'荒謬幽默',title:'Wacky Wobblings',author:'Fupi',source:'https://opengameart.org/content/wacky-wobblings',license:'CC0'}
]);
export const MUSIC_KEYS=new Set(MUSIC_TRACKS.map(t=>t.key));

/** Optional for immutable legacy stories; a present field must be a real track. */
export function validateStoryMusic(story){
 if(!Object.hasOwn(story,'music'))return undefined;
 if(!MUSIC_KEYS.has(story.music))throw new RangeError('未知事件音樂代碼 '+String(story.music));
 return story.music;
}
