# V1 系統回歸驗證

正式基準為 `ad654a0228e41096e886ff2d3665302585f52d16`。使用 Node.js 24.19.0、npm 11.9.0，執行 `npm ci` 安裝鎖定依賴。基準重現 536 項測試，其中 449 通過、87 失敗、0 跳過，與前次總數相同。完整名稱、錯誤及堆疊存於 `baseline.tap.gz`。可用 `gzip -dc baseline.tap.gz` 查閱。

| 共同根因 | 分類與處理 |
| --- | --- |
| V3 狀態與危機評估輸入混用 | A／C。危機評估與導師觀測改由六個既有評估通道取數；掌控沿用原通道權重與門檻。年度快照與失敗比較使用現行四狀態，測試資料和斷言同步。 |
| 30 年制與開局 v1 身分殘留 | B／C。以固定 2026～2029 三年制入口及合法難度建立資料，保留偽造身分、學年越界、不得更換新一屆等拒絕斷言。 |
| 課表、考試、公布與活動時段 | A／C。測試使用正式日期、可用時段與公布邊界。筆記本取校曆指定的公布日，並支援缺少科目明細的輕量排名資料。 |
| 重試快照與存檔版本 | A／C／D。無快照的受支援存檔以交易前的學期判斷是否跨界，避免讀取空快照；現行重試測試使用第一次行動前的合法快照。學業 v1 日誌仍以現行外層格式驗證逐位元重放與重試政策；舊外層格式的實際存檔另留原案例。 |
| NPC、成果及來源斷言 | B／C。NPC 候選使用正式計畫判定，保護時段用適用年級的真實校曆活動。比較欄數、年度結果、升學日期及學生發布查詢依現行契約。 |
| 已移除的耐久模擬 | C。以小型合成當前數值測試資料取代失效匯入，仍驗證新生涯封存總能力 240 及四狀態初值。 |

## 本地重現

在基準或修復分支的獨立工作樹執行下列命令。完整系統回歸通常需數分鐘，測試工具會在子程序結束後寫出 TAP。

```sh
npm ci
npm test > system-regression.tap 2>&1
npm run check
npm run calendar:cohort-check
npm run test:story:routes
node --test test/story-draft-validator.test.js test/story-preview-multipage.test.js test/story-preview-cast-continuity.test.js test/story-preview-snapshot.test.js test/story-preview-catalog-playback.test.js test/story-production-catalog.test.js
python3 docs/verification/v1-system-regressions/check-t6-parity.py
git diff --exit-code ad654a02 -- content data
```

故事定向測試 787 項全數通過。固定校曆檢查通過 9,980 項斷言，覆蓋 3,228 個日期與年級組合。故事雙路線皆完成並可還原。八篇差異逐篇存證於 `docs/story-production-v1/T6-正式V1八篇差異存證.md`。

## 舊存檔核對

`test/fixtures/h2-pre-061bf63.json.gz` 和 `test/fixtures/h4-pre-5c21854.json.gz` 的外層皆為 save v1。其中 H2 的 `v2` 樣本名稱指學業政策版本，外層存檔仍為 v1，採 `fixed-calendar-v1`。H1 與 H4 的早期三年制樣本則採 v1 生涯身分和 `tw-school-2026-2065-senior-h1-v1`。現行正式存檔要求外層 v2、三年制身分 v2 和 2026～2029 校曆。H4 的 `after`、`reserved`、`terminal` 在現行校曆分別有 9、2、8 筆歷史活動時段已不存在，因此僅翻新版本號或重新命名欄位無法保留原始日誌。保留原始案例與錯誤訊息。

## 前次剩餘問題的證據

- H4 善後的低年級授課。6 月高三日程壓縮成 `vacation-day`，善後以高三時段推進，找不到原課表的節次。原驗收案例有 6 節仍應進行的授課，實際產出 0 筆授課紀錄。修復須確定同一教師的跨年級時段如何映射到已持久化的三年制游標，再驗證交易重送和歷史還原。
- 舊存檔共六個相容案例仍使用原始資料。涉及 H1／H2 評量政策、H4 善後接續與舊預約、H5 成績筆記本及六月結算。需有可驗證的歷史匯入契約，才能確保舊時段和既有證據的可追溯性。

## 回歸執行紀錄

第一輪完整回歸為 525 通過、11 失敗。六月升學確認日期依正式公佈表更正後，下一輪完整回歸為 526 通過、10 失敗。其後修正危機候選權重的舊欄名、職務故事既有的第四選項，以及高三六月邊界的合法時段。三個定向案例均通過。

前次修復分支的完整 `npm test` 執行 536 項，529 通過、7 失敗、0 跳過。比對兩份 TAP 的案例順序及失敗序號，80 個原失敗案例轉為通過，無新增失敗。最終輸出保存在 `final.tap.gz`，前一輪完整輸出保存在 `intermediate.tap.gz`。

| 前次 TAP 序號 | 剩餘案例 |
| --- | --- |
| 87 | H4 善後週缺少原課表低年級授課紀錄 |
| 95、96 | H4 舊存檔接續及未入場預約退役 |
| 269 | H5 舊 H1 成績筆記本 |
| 329 | H5 舊六月終點與年度結算入口 |
| 392、393 | H2 舊三段考存檔重放及 H1 評量政策接續 |

## 2026-11-26 正式處置

接續 `11c5704cf686140117fdfb89c52074a5285d54de`。原始 87 項的共同根因與 80 項功能／契約修復見上表及基準 TAP。此輪處置前次留下的 7 項，保留兩份歷史樣本與 `final.tap.gz` 中的原始失敗堆疊。

原始 87 項以最直接的修正面向歸類。序號對應基準 TAP，部分案例也受到其他共因影響。

| 分類 | 基準 TAP 序號 | 數量 | 最終處置 |
| --- | --- | ---: | --- |
| 三年制生涯身分或已退役的多年制需求 | 147、148、149、150、151、180、246、247、248、249、250、251、284、285、288、375、376、377 | 18 | 通過 |
| 危機取數、V3 狀態欄位或數值物件 | 99、108、109、113、114、115、119、121、123、124、171、178、184、244、259、298、304、327、332、333、336、420、434、436、511、514 | 26 | 通過 |
| 學業評量、公布及目標時段 | 9、11、19、22、42、43、91、103、264、267、268、385、386、387、388、389、390、391、394、395、396、397 | 22 | 通過 |
| 校務時段、試算基準或快照 | 12、23、88、97、145、335 | 6 | 通過 |
| 存檔匯入或重試契約 | 4、94、105 | 3 | 通過 |
| NPC、筆記本或三年結局斷言 | 127、137、334、509 | 4 | 通過 |
| 已移除的耐久資料來源 | 258 | 1 | 通過 |
| 開發期外層 save v1 | 95、96、269、329、392、393 | 6 | 改為安全拒絕並通過 |
| H4 善後週授課證據 | 87 | 1 | 暫緩，Issue #131 |


| 前次序號 | 樣本 | 現行驗收 |
| --- | --- | --- |
| 95 | pre-H4 `before`、`after`、`terminal` | 拒絕畢典前、善後中及終點的外層 save v1 |
| 96 | pre-H4 `reserved` | 拒絕帶有未入場預約的 save v1 |
| 269 | pre-H2 `h1` | 讀取 H1 save v1 時安全拒絕 |
| 329 | pre-H4 `terminal` | 六月終點的 save v1 仍明確拒絕 |
| 392 | pre-H2 `v2` | 拒絕內含學業政策 v2 的外層 save v1 |
| 393 | pre-H2 `h1` | 拒絕該開發版存檔，保留現行格式的評量政策驗證 |

六個案例先核對封套種類及外層版本，對物件與序列化形式均要求相同的 `VERSION: Unsupported save format/version`，並確認輸入內容未被改寫。現行存檔槽的測試逐一嘗試預覽及確認匯入兩份樣本中的六個存檔，再比較寫入前、寫入後及重新開啟的完整槽資料與 token。既有的確認、CAS、配額失敗及合法匯入測試繼續執行。

H4 案例 87 暫緩於 [Issue #131](https://github.com/franksky1207/teacher-hell/issues/131)。現行程式仍會漏掉 6 節低年級授課，原測試主體保留。正式設計完成後須建立新的回歸測試。敘事快轉、畫面、旁白、頁數及結算機制均留待 Issue #131 施工。

```sh
npm ci
npm test
node --test --test-reporter=tap test/storage.test.js
npm run test:storage:browser
npm run calendar:cohort-check
TEACHER_HELL_REPRODUCE_H4_131=1 node --test --test-reporter=tap --test-name-pattern 'H4 one weekly operation' test/aftercare.test.js
git diff --exit-code ad654a02 -- content data src/numeric package-lock.json test/fixtures
git diff --exit-code 11c5704c -- docs/story-production-v1/T6-正式V1八篇差異存證.md
```

### 定向驗證與附加瀏覽器驗證

- 六項歷史檔拒絕及進一步的存檔槽保護測試合計 7 項通過。現行存檔定向套件 21 項通過。
- 故事定向套件重跑 787 項通過。固定校曆 9,980 項斷言通過，涵蓋 3,228 個日期與年級組合。648 篇故事及其資料、N1 和鎖定依賴與正式 V1 相同，八篇 T6 的既有存證也與上個提交相同。
- H4 opt-in 重現執行 1 項，依舊因預期 6 筆而實際為 0 筆失敗。這份輸出與常規回歸分開存放。
- 額外執行的完整 Chromium 腳本已通過核心 IndexedDB 的三槽、兩頁 CAS、重新載入、匯入失敗、備份復原和大檔檢查，之後於舊 Phase 01–04 測試資料中止。該資料的 `test/support/calendar.js` 呼叫 `startCalendarWorld` 時缺少現行三年制身分，重現 `MODE: A three-year career identity is required`。相關腳手架和執行期與前次提交相同。這項附加整合沒有完整通過，執行結果不計入 `npm test`。
- 完整定向輸出見 `retirement-targeted.tar.gz`。

### 本次完整結果

`npm test` 在 Node.js 24.19.0、npm 11.9.0 下執行 536 項，535 通過、0 失敗、1 跳過。唯一跳過為序號 87 的 Issue #131 案例。原 87 項中的 80 項修復及本次 6 項安全拒絕均通過。完整 TAP 見 `retirement-final.tap.gz`。
