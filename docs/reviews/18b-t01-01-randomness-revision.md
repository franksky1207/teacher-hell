# 18-B T01-01 第一小單元：10則事件實際多結果修正

來源PR #68：`31fa22190b6ad9afba3be1cf5a1679666068b823`。保留全部200則、每階段四選項及全部已簽核八件示範。僅改T01-01下列10件的指定基本選項，原作者JSON為唯一權威，JS依既有同步腳本格式生成。

- `01-02`／`plan`：已新增兩種結果 `unexpected-progress` 與 `unexpected-resistance`。
- `01-03`／`plan`：已新增兩種結果 `unexpected-progress` 與 `unexpected-resistance`。
- `01-04`／`plan`：已新增兩種結果 `unexpected-progress` 與 `unexpected-resistance`。
- `01-05`／`plan`：已新增兩種結果 `unexpected-progress` 與 `unexpected-resistance`。
- `01-06`／`plan`：已新增兩種結果 `unexpected-progress` 與 `unexpected-resistance`。
- `01-07`／`inquire`：已新增兩種結果 `unexpected-progress` 與 `unexpected-resistance`。
- `01-08`／`plan`：已新增兩種結果 `unexpected-progress` 與 `unexpected-resistance`。
- `01-09`／`plan`：已新增兩種結果 `unexpected-progress` 與 `unexpected-resistance`。
- `01-10`／`inquire`：已新增兩種結果 `unexpected-progress` 與 `unexpected-resistance`。
- `01-11`／`inquire`：已新增兩種結果 `unexpected-progress` 與 `unexpected-resistance`。

兩個結果在同一教師行動下有不同的當場學生反應；依合法的學生焦慮碼 `2-2` 加權，並有可觀察的短期狀態差異。未聲稱家長、科任或同儕未發生的回覆；未加長期能力、假歷史碼、擅自開啟後續問題。**本輪仍是工程草稿，不代表全部200則已修妥，後續須再補角色與校務回應，以及更多非情緒型後果。**

測試待由具備Node環境執行：`node scripts/sync-t01-drafts.mjs --check`、`node scripts/audit-t01.mjs`、`node --test --test-isolation=none test/phase18b-t01-draft.test.js`。本次只檢查JSON結構及變體差異，沒有冒稱實際執行Node測試。

## 同質化防範補訂

複查後，01-02、01-05、01-06、01-07、01-11 的正向分支依當場實際的小突破記短期愉悅 `participant:person:2-4:+1`，受挫分支才記短期焦慮 `participant:person:2-2:+1`；其餘5件按個別情境保留焦慮方向差異。本輪僅以符合事實的短期狀態作最小差異，不宣稱已建立家長／科任完整回應或跨日世界變化；該類更深入後果列為下一輪必要設計。
