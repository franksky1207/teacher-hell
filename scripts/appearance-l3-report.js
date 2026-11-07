/** 15-B-L3: one deterministic, synthetic capacity report. Does not run the game. */
import {mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {CATALOG,appearanceCounts,assignAppearances,appearanceMetrics} from './appearance-l3.js';
const out=resolve('artwork/prototypes/l3-appearance-simulation');
const makeRoster=()=>Array.from({length:40},(_,i)=>({
 personId:'synthetic-student-'+String(i+1).padStart(3,'0'),
 variant:(1109*i+421)%65536,
 gender:i<20?'male':'female'
}));
const base=makeRoster();
const summaries=[];
const mapFor=id=>assignAppearances({careerId:id,orderedRoster:base});
for(let slot=1;slot<=3;slot++){
 const careerId='simulation:save-slot-'+slot;
 const before=mapFor(careerId),after=mapFor(careerId);
 const newest={personId:'synthetic-transfer-'+slot,variant:1800+slot,gender:slot%2?'female':'male'};
 const appended=assignAppearances({careerId,orderedRoster:[...base,newest]});
 const reloadStable=[...before].every(([id,part])=>JSON.stringify(after.get(id))===JSON.stringify(part));
 const transferStable=[...before].every(([id,part])=>JSON.stringify(appended.get(id))===JSON.stringify(part));
 const metrics=appearanceMetrics(before);
 summaries.push({slot,careerId,metrics,reloadStable,transferStable,
  differentFromFirst:slot===1?null:[...before].filter(([id,part])=>JSON.stringify(part)!==JSON.stringify(mapFor('simulation:save-slot-1').get(id))).length});
}
const counts=appearanceCounts();
const result={
 status:'PASS',
 kind:'hypothetical compatibility and student-id simulation; no real artwork verification',
 counts,
 constraints:{archetypes:16,stylesPerArchetype:5,naturalHairColors:3,eyeVariants:3,accessoryStates:3,
  forbidden:'fifth style plus hair-clip (one synthetic incompatibility per archetype, hair color and eye variant)'},
 slots:summaries,
 artwork:{approvedCompleteStudentPrototypes:1,
  actuallyAvailableCompositeStyles:0,missingModelPieces:[
   '15 further distinct base prototypes (quantity still provisional)',
   '80 archetype-specific hair-style layers or validated reusable equivalents',
   '48 archetype-by-eye base variations or validated reusable equivalents',
   'compatible accessory alpha layers, clothing/body alignment and real facial expressions'
  ]},
 notes:[
 'No production renderer, save file schema, class registry or timeline is modified.',
 'Same stable person identity and careerId produce the same output from an immutable enrollment-receipt order.',
 'A new enrollment is appended; deriving appearances solely from the active roster would break this property.',
 'Inter-class transfer/permanent departures require an authoritative historical roster and identity-wide reservation; no blanket cross-class stability claim.',
 'Near-similar pair metric is an algorithmic proxy, not a real visual perceptual test.',
 'No existing students are automatically mapped to the single approved student-001 art.'
 ]
};
if(counts.syntheticallyLegal<2000||
 summaries.some(s=>s.metrics.exactDuplicateCount!==0||!s.reloadStable||!s.transferStable))
 throw new Error('L3 simulated acceptance mismatch');
await mkdir(out,{recursive:true});
await writeFile(resolve(out,'analysis.json'),JSON.stringify(result,null,2)+'\n');
const rows=summaries.map(s=>`| ${s.slot} | ${s.metrics.population} | ${s.metrics.exactDuplicateCount} | ${s.metrics.similarPairCount} | ${s.metrics.sharedFacePairs} | ${s.reloadStable?'PASS':'FAIL'} | ${s.transferStable?'PASS':'FAIL'} | ${s.differentFromFirst??'基準'} |`).join('\n');
const md=`# 15-B-L3｜40 位學生 × 三存檔外觀分配模擬

**本批只進行純程式假設相容目錄與穩定性測試，沒有製作任何新人物圖片。**

## 容量數字必須分開

| 指標 | 數量 |
|---|---:|
| 16 原型 × 5 種髮型 × 3 髮色 × 3 眉眼 × 3 配件，未篩選理論 | **${counts.theoretical.toLocaleString('en-US')}** |
| 以假設的髮型／髮夾限制排除組合 | ${counts.excluded.toLocaleString('en-US')} |
| **在此假設規則下合法的組合** | **${counts.syntheticallyLegal.toLocaleString('en-US')}** |
| 已完成可供自由組合的真實髮型 | **0** |
| 已通過真實相容驗證的組合 | **0** |
| 既有完整 PNG 核准人物原型 | **1**（student-001） |

**2,016 是合成的相容規則之下的數量，不代表已備齊 2,016 種圖片，也不能視為經過實際視覺相容性檢查。**

## 三個模擬存檔，各自 40 人

| 槽位 | 人數 | 完全重複 | 近似配對（演算法指標） | 共用基礎臉型配對 | 重讀穩定 | 加轉學生舊生穩定 | 與槽 1 不同人數 |
|---|---:|---:|---:|---:|---|---|---:|
${rows}

- 同一套素材定義共用，**三槽不複製 PNG**；以 careerId、personId、appearance.variant、gender 和不可重排的原始學籍順序產生對應。
- 三年推進、重新讀取、切換裝置：輸入不變則輸出不變；在原始名冊**末端增加**轉學生，不影響原有學生。
- 性別依 registry.profiles[id].gender，不得把 `appearance.variant` 奇偶當成性別（現有系統可能有相異情形）。
- **風險**：真實跨班轉入若重新以新班級排程外觀，或存檔沒有完整保留原始學籍分配紀錄，可能導致外貌改變。正式接線前須保證身份全域保留或持久化最小對應；這批沒有修改存檔結構。
- 演算法近似配對不是圖像辨識，實際畫風相容與同班辨識度仍須在有真正部件後目視確認。

## 後續素材需求（待製圖確認）

初版模型假設有 16 名可區分的基礎原型、每人相容的 5 組髮型、3 種眉眼與配件變體。
這代表若無法真正跨原型共用，可能需要最多 **80 組髮型對位版本、48 組眉眼對位版本**，而不是只畫 5 張通用髮型。實際數量應透過高槓桿共享資產減少，**不可現在宣稱 16 名原型已足夠**。

## L3 結論

- 此試算證明可以建構 **2,000 種以上的假設合法組合**、對 40 人／三槽配置達成不完全重複與可重現分配。
- **不等於視覺品質、真實 PNG 相容、真正跨班不變臉及正式遊戲存檔整合通過**。
- `student-001` 現有完整 PNG 切換保持不變；L1/L2 已產出的局部臉部方案仍待 A/B 真正互動目視比較。
- 合併與部署依本階段原定三批全部完成後進行，需在部署後再以手機／桌機實際觀看 A/B。

`;
await writeFile(resolve(out,'REPORT.md'),md);
process.stdout.write(JSON.stringify({counts,slots:summaries.map(s=>({slot:s.slot,...s.metrics,reloadStable:s.reloadStable,transferStable:s.transferStable,differentFromFirst:s.differentFromFirst}))},null,2)+'\n');
