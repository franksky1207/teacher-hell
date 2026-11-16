# 18-B C批｜T01＋T02 整合與精準驗收交接

日期：2026-11-16。整合分支 `feat/18b-c-t01-t02-integration` 以 B批 `feat/18b-t02-b-isolated-assets` 為基底；從 T01 PR #68 的作者HEAD `764757c` 將53份新增來源／資源／證據／測試檔案以原Git blob SHA納入，**未覆蓋T02現行作者內容**。T02作者基準承襲PR #69 HEAD `6648eb3`，全域隔離追蹤承襲A批PR #70。

## 已實際接線

- T01：完整保留200則作者JSON、八份衍生JS、同步腳本、作者結案及外部審查證據。T01 `t01DraftCatalogue()` 僅有200個 `engineering-test` 記錄，仍需明確工程opt-in。
- T02：完整保留208則作者JSON／八份衍生JS、同步腳本與 `record-v1` 的來源修正。其 `t02DraftCatalogue()` 僅列191個工程候選；9個blocked＋8個held共17個ID明確排除；原始208件仍能透過 `resolveStory()` 解析，供歷史／審查使用。
- `src/runtime/story-content.js` 合併兩份草稿資源及兩套工程目錄；`resolveStory()` 的資源清單同時包含408件。沒有把T01審查中的舊版P1／P2強制轉為個別blocked。
- `work/18b-global-event-isolation.json` 仍是跨主題追蹤的權威來源，T02 `t02-isolation.js` 是明確產生的排除清單；沒有自動解封，也沒有修改玩家存檔資料庫。
- `test/18b-c-t01-t02-integration.test.js` 精準檢查408則故事解析、17件排除、兩工程目錄及正式候選池保持關閉。

## 版本與未完成放行項目

1. T01有8件獨立簽核示範，其他192件雖有Flash與Hydrogen舊版審稿紀錄，但**尚不能憑該舊版報告主張最新作者SHA逐件通過正式語意簽核**。
2. T02已經Hydrogen 208件審查及168筆問題處理；其他9 blocked＋8 held繼續隔離。修改後208則正式個別語意簽核及台灣高中敏感程序檢查的充分性仍待正式放行裁決。
3. 所有408則均是 `engineering-test`，並非 `ready`。本批只完成兩分支資源接線，沒有宣稱正式出版191＋200件，也沒有自動接入新生涯。
4. 原T01的專項測試門檻曾於舊版出現失敗；本版將按最新JS精準測試，不以過時FAIL／成功結果充當新提交結論。
5. **GitHub API來源／生成資源已核對，不等於最新SHA的Node實跑**；待以下測試及制度、語意放行門檻完成後才能考慮正式發布。

## 只跑必要測試

```sh
node scripts/sync-t01-drafts.mjs --check
node scripts/sync-t02-drafts.mjs --check
node --test --test-isolation=none test/18b-c-t01-t02-integration.test.js test/18b-t02-isolated-assets.test.js test/18b-t02-last24.test.js test/phase18b-t01-draft.test.js
```

上述是要執行的精準測試，不是已通過的紀錄；若T01大測試耗資源，可先執行C批專項及T01既有抽樣，且只複驗實際失敗組別。**禁止三年／30年全程模擬、全專案測試、重跑全部208/200語意審稿及大量隨機seed。**

## 發布與PR決議

C批以獨立Draft PR對B批開立，保留A #70、T01 #68、T02 #69與B #71原始證據。尚未將408件併入 `main`，未部署，正式發行0。未來要合併需先完成精準CI、逐版本簽核、制度確認與整合差異核對，再經使用者明確同意。不得因測試綠燈自動把所有 `engineering-test` 提升成 `ready`。
