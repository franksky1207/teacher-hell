# 18-B T02｜Hydrogen 審稿結果接收與初步裁決

日期：2026-11-16
Hydrogen 原始分支：`review/18b-t02-hydrogen-audit`（**原樣保留，不合併**）
原始檔：`docs/reviews/18b-t02-hydrogen-review.md`、`work/18b-t02-hydrogen-review-findings.json`

## 實際接收

Hydrogen 宣稱獨立覆核208/208則，結論：通過23、需微調68、需修正109、暫緩8，185則附問題紀錄；清單包含185個不同definition.id，統計一致。這是**外部審稿者的判斷**，並非本分支已全部確認或已全部修正。

報告大量提到未接升學資格、敘事主詞、年度制度、數值模板與語意換皮，應按原稿及現行程式逐項裁決，必要時按相同根因成批精準修正。不得無理由全部重寫或將報告直接轉為發布資格。

## 已核對確實成立且已修復：4則角色台詞/claims不一致

- `content:18b-t02-03-26`
- `content:18b-t02-05-28`
- `content:18b-t02-06-20`
- `content:18b-t02-07-07`

四則均將四個選項中participant `outcome.claims[].statement` 同步為該事件實際P2台詞，避免玩家看到和世界知情紀錄存入不同版本的話。**未改選項作用、候選資格或正式上架狀態**。

## 報告含需更正或二次核對的工程敘述

1. Hydrogen 大綱稱引擎升學以 `entrance.stage`、`star-application`、`application-first-result` 等階段運作；正式 `src/runtime/entrance.js` 與 `src/academics/admissions.js` 已查，該敘述**不是現行API的可依賴欄位**。目前使用 `entrance.students`、`completed` 里程碑、個人 `route`、`stars`、`applications`、`offers`。對「尚未接門檻」之批次結論必須重新對照每則 `eligibility.entrance`、實際在籍名冊與行事曆，不能按錯誤的階段名稱硬補。
2. Hydrogen 將 `outcome.world.contacts` 一律解釋成雙方「實體同處一室」；正式 `src/runtime/story-consequences.js` 會為 contacts 建立 `type:contact` 的實際互動事實，並且為遠距 transmissions 也建立 `type:contact` 的通訊來源事實。必須逐案確認「直接互動」與「遠距訊息」的語意，不得僅憑 `home:bedroom` 就批次清除所有 contacts，否則可能破壞日後校友聯絡因果。
3. T02-07-07 劇情原稿已更新為 aftercare 畢業生收到**尚未查證的**考場交通傳聞，Hydrogen部分說明可能引用修改前版本。需比較報告與分支最新故事，以當前原稿為準；同日contact門檻仍須實際可達性的端對端證據。
4. T02-07-22與07-27仍是畢業後分科分發正式結果故事，在首發三年生涯沒有已建八月結果節點；**保留隔離**，不能偷換申請入學故事。

## 狀態及後續

- 經不同模型獨立審查的外部報告已接收；Hydrogen聲稱完整覆蓋208件。
- 外部報告185件意見**尚未完成逐條事實裁決**，不可冒稱「109件都是真程式錯」或「已全部修正」。
- 首輪原稿同步已修正4件具體台詞/claim矛盾，其他意見需再與現行原稿、日曆、世界狀態核對。
- 原208則仍為 `engineering-test`；不發布、不合併、不部署。
