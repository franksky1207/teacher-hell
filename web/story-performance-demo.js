/** A fixed development rehearsal, outside the published index and event engine. */
export const AVG_DEMO_ID='avg-demo';

const pages=[
 ['student_a','老師，我把借用清單填錯了。大家都在等那個盒子。',{
  scene:'school:classroom',enter:['student_a'],expression:{student_a:'embarrassed'}
 }],
 ['student_b','原來清單在這裡！我還以為盒子不見了。',{
  enter:['student_b'],expression:{student_b:'surprised'}
 }],
 ['student_a','我剛才找了一圈，越想越急，差點把另一組的東西拿走。',{
  expression:{student_a:'angry'}
 }],
 ['student_b','沒事，我先去跟那組說一聲。我們等下在走廊碰面。',{
  expression:{student_b:'happy'}
 }],
 ['teacher','你先陪我到走廊，讓老師一起核對盒子上的標籤。',{
  scene:'school:corridor',exit:['student_b'],expression:{student_a:'sad'}
 }],
 ['staff_a','我剛從辦公室拿了備用的標籤。你們要找的是這個盒子嗎？',{
  enter:['staff_a'],pose:{staff_a:'gesture'}
 }],
 ['student_a','對，就是這個！原來我只抄錯了最後一格。',{
  expression:{student_a:'happy'},pose:{staff_a:'side'}
 }],
 ['staff_a','好，那我們把交接寫清楚，再通知下一組。',{
  pose:{staff_a:'arms-open'}
 }]
];

const outcomes=[
 ['核對完成','老師，盒子確認好了，我現在就把清單改正。','student_a',{expression:{student_a:'happy'}}],
 ['等待回覆','我留在走廊等回覆，確認好再通知下一組。','staff_a',{pose:{staff_a:'weight-shift'}}],
 ['回教室重填','我回來了。這次我和你一起把兩欄核對完。','student_b',{
  scene:'school:classroom',exit:['staff_a'],enter:['student_b'],expression:{student_b:'calm'}
 }],
 ['還有一張舊標籤','等一下，底下還貼了一張舊標籤！','student_a',{expression:{student_a:'surprised'}}],
 ['先安頓同學','先把盒子放好。我陪你回教室，再一起說明。','teacher',{scene:'school:classroom',exit:['staff_a']}],
 ['借用規則說清楚','這一欄一定要留名字，這樣下一組才知道找誰。','staff_a',{pose:{staff_a:'hand-on-hip'}}],
 ['道歉與說明','大家等了這麼久……我想自己去跟他們說明。','student_a',{expression:{student_a:'embarrassed'}}],
 ['交接告一段落','好，清單已經補齊。我先把盒子送回去。','staff_a',{exit:['student_a'],pose:{staff_a:'neutral'}}]
];

export const AVG_DEMO_DETAIL={
 storyId:AVG_DEMO_ID,title:'完整演出示範',quotaDate:'2026-07-20',
 opening:pages.map(([speaker,text],i)=>'- **P0'+(i+1)+'｜'+speaker+'**：'+text).join('\n'),
 options:['一起核對清單','請教職員聯絡下一組','回教室找另一位同學','先讓學生說明經過'].map((text,i)=>({id:'ABCD'[i],text:'ABCD'[i]+'｜'+text})),
 results:outcomes.map(([title,text],i)=>({id:'R'+(i+1),title,text})),
 sourceMarkdown:[
  '## 3｜四碼種子及角色槽位',
  '- **常駐數值角色槽位**：',
  '| 槽位鍵 | 人物資格／類別 | 必要限制 | 結算 |',
  '| --- | --- | --- | --- |',
  '| student_a | 本班學生 | 試演人物 | 無 |',
  '| student_b | 本班學生 | 試演人物 | 無 |',
  '| staff_a | 校內教職員 | 試演人物 | 無 |',
  '## 4｜玩家可見開場與四個行動',
  '```avg',
  JSON.stringify({
   opening:Object.fromEntries(pages.map(([, ,cue],i)=>['P0'+(i+1),cue])),
   results:Object.fromEntries(outcomes.map(([, ,speaker,cue],i)=>['R'+(i+1),{speaker,...cue}]))
  }),
  '```'
 ].join('\n')
};
