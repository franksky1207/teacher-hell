# 18-B T02｜Hydrogen 獨立審稿交叉核對與修正簿

日期：2026-11-16。審稿原件**唯讀保留**於 `review/18b-t02-hydrogen-audit`：`docs/reviews/18b-t02-hydrogen-review.md` 及 `work/18b-t02-hydrogen-review-findings.json`。

## 收件及證據層級

Hydrogen 自述審查 208/208：23 通過、68 微調、109 需修正、8 暫緩；JSON 有 185 筆非通過問題。**這是 Hydrogen 判斷，不是本工作分支已確認185個現存缺陷。** 本分支歷經前期修訂，應逐ID比對當前原稿和正式引擎。

先前原版驗證 [#43775137471](https://github.com/franksky1207/teacher-hell/actions/runs/43775137471)：208/208 `validateStory`、`validateEventDefinitions` 結構通過。後續更正需保持 `engineering-test`，不能擅自上架。

## 已確認並於本輪修正（9件）

| ID | 當前來源確證問題 | 最小修正 |
|---|---|---|
| T02-01-18 | 第「一週」敘事卻沒有學期首週門檻 | 改為「轉組後的一個早自習」 |
| T02-03-09 | 「暑期」公告但 dayKinds 同時含 winter-camp | 改為不限定季節的重修開班公告 |
| T02-03-17 | 「寒輔」但可在 summer-camp 觸發 | 改為不限定季節的輔導課後 |
| T02-04-21 | people=caregiver，四個結果及transmissions卻以「學生」為主詞 | 四個結果及transmissions改為家長 |
| T02-04-08 | people=student，起因和部分結果卻直接敘述「家長」在行政處理 | 改成學生轉述家長疑惑；結果依學生當面查證，全部claims同步 |
| T02-02-07 | people=student，但P1寫「兩名學生站在走廊」 | 只有一名學生向導師轉述共同署名爭議 |
| T02-02-20 | people=student，但P1和一個選項結果假設兩人同場 | 改為單方反映，另一方後續查證；與02-07區隔具體海報流程 |
| T02-06-20 | 早自習提未來面試焦慮，選項結果仍有已進考場情節 | 修正兩個選項描述與結果為「日後核對／面試當日必要時」 |
| T02-07-11 | 晚間傳訊卻使用school:corridor、dialogue，P2仍稱「考前一天」 | 改遠距home:living-room/chat，無實體contact，P2/claims同文，焦點回到一般備考期 |

## 報告中已核對為過時或不成立的指控（不照單全改）

- Hydrogen 列為「在學生臥室、客廳留下實體contacts」的 T02-01-25、02-12、06-08、06-12、06-14、06-21、06-27、06-28、07-12、07-20、07-26：**本輪前現行八份JSON各選項的 `world.contacts` 就已是 `[]`**。遠距 `transmissions` 仍可在原引擎記錄溝通，不能把它誤當同處一室。T02-02-08 原有 `presentation:'phone'` 與「家長遠距」的正確 transmission 描述，不照報告再次「修復」。
- Hydrogen 的跨篇例子宣稱 T02-05-24 是「填冷門系求穩」，但現行故事其實是「群組散布學生放棄繁星的假消息」，不成立該同構類比；類似分組需逐對讀原文再判定。
- Hydrogen 描述 `entrance.stage` 機制及「高三下第N週的固定招生狀態」與目前程式不符。權威是 `src/calendar/admissions.js` 明列的日程節點、`src/academics/admissions.js` 的 `entrance.students` / `completed` 與 `src/runtime/entrance.js`。不得依報告虛構的stage值補條件。
- Hydrogen 建議直接給學分故事加 `eligibility.academic:[{kind:'credit-deficit'}]`，但原驗證器要求 **condition.termId 必須是字串**；且原academicEligible依該termId判定，不能把報告的缺省termId例子當可直接使用的合法修正。學分門檻仍屬需另外設計的真實問題，**尚未修**。
- `definition.directions` 是事件挑選機率的六項數值傾向，見 `src/runtime/event-candidates.js` `weightedMean(values.map(...))`，不是選項選下去的數值變更。固定方向可能造成抽取偏誤，值得另做逐篇校準；但不能僅以「某事件責任感為正」宣稱直接對學生責任感加分。

## 未完成的實質優先事項

1. 以**實際** `entrance.completed`／學生路徑與狀態為 T02-05/06/07 的特定前提事件補資格，避免高三上學期提前觸發「已錄取／已落榜／已完成二階」等內容；對泛稱意願與諮詢的故事不可亂補過晚門檻。
2. 學分、補考、重修時序：設計合法可驗的 `academic` 條件（含 termId 問題）、處理長假的真正開班事件，不能推定所有人欠學分。
3. 逐篇校準 numeric 的六碼、權重及方向；未校準前不可正式上架。
4. 修正 Hydrogen 真正證實的語意換皮，只針對成對比對後仍相似者，不依報告的錯誤例子全批改寫。
5. T02-07-22/27 八月分科正式分發，與其他超出首發三年生涯的故事**維持held**，不得憑空造正式招生節點。

## 狀態

已檢查並修正九個ID，仍 `engineering-test`，未合併、未部署。尚未完成195件其他故事逐案重新判定；**不能把Hydrogen統計直接改寫成「只剩176件問題」**，因為Hydrogen列問題的基準與實際原稿不一致。後續報告需按「確認仍存在／已修／原稿早已正確／需要設計」各自列數。
