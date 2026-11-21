# 故事全文閱讀器｜第2批：手機與桌面閱讀介面

> 歷史介面紀錄。現行版本見[閱讀器說明](../story-reader/README.md)。

本批建立獨立的 `story-reader/` 靜態閱讀器，**不發布 `/stories/`、不合併 main、不接入遊戲／preview，也不修改原始故事或正式帳本**。

## 使用介面

- **桌面**：左側故事清單、右側全文，閱讀寬度限制避免行長過大。
- **手機**：單欄閱讀，按「故事目錄」展開搜尋與清單，點選後自動回到正文。
- 學期（T1～T6／G）、主題、故事池篩選；標題、故事ID、草稿ID及四欄摘要關鍵字搜尋。搜尋只掃描輕量索引，**不是全部2,400篇全文檢索**。
- 顯示四欄摘要、必要條件、完整開場、四個教師選項、八個共用結果及客觀後果；**全篇預設展開**。
- 「因果、數值與原始稿」預設收合，必要時展開以閱讀原始 Markdown 和四選項×八結果矩陣。**不抽選、不模擬遊戲、不回寫故事。**
- 上／下一篇依**目前篩選後清單**導覽；字級15～25px、暖紙／明亮／夜間模式與上次故事ID存瀏覽器本機。沒有會員或後端。
- 故事資料一律以 `textContent` 呈現，角色槽位 `{{student_a.name}}` 等原樣顯示，絕不推定實際人名。

## 資料接線（留待第3批正式發布）

靜態入口：`story-reader/index.html`，模組：`reader.js`、`reader-core.js`，樣式：`reader.css`。

頁面**預期**同層存在 `data/index.json` 與 `data/stories/<storyId>.json`；這些是第1批出口 `node scripts/export-story-reader.mjs` 的結果，預設在忽略的 `work/story-reader-data/`。目前**尚未**接上部署或自動複製；因此直接開 GitHub 的 `index.html` 或尚未完成的 `/stories/` 不會讀到故事。

下一批從量產分支取得已鎖故事，匯出完整資料，將 `story-reader/` 網頁與資料一同發布到 `/stories/`，不影響 `/preview/`，也不須合併 `main`。

## 本批定向驗收

```bash
node --check story-reader/reader.js
node --check story-reader/reader-core.js
node --test test/story-reader-ui.test.js
```

這些是資料篩選、路徑及語法的輕量驗收；實際手機／桌面瀏覽器及 Pages 網址需要第3批發布後再驗證，不能用上述測試冒稱實機完成。
