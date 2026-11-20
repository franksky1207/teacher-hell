# 《教師荒謬地獄》只讀故事閱讀器

正式閱讀網址：https://franksky1207.github.io/teacher-hell/stories/

- 閱讀器只讀取本分支 `data/story-production-ledger.json` 內有效 `locked` 且原稿 SHA256 相符的故事；`proposed`、`reserved`、`revoked` 不上架。
- `scripts/export-story-reader.mjs` 產生索引與單篇完整資料；不更動故事內容、數值、唯一帳本或遊戲主程式。
- `.github/workflows/story-reader-publish.yml` 在符合路徑的量產分支一般推送後，以定向測試和原稿校驗發布到 `gh-pages/stories/`，並保留 Pages 的其他路徑；正式來源不必合併到 `main`。
- **GitHub Actions 使用自身 `GITHUB_TOKEN` 推送的帳本提交，不會遞迴觸發其他 `push` 工作流程。** 批次正式鎖定若由一次性 Actions 完成，需透過一般推送觸發閱讀器發布，或以適當授權的明確發布動作執行；不能把帳本 `locked` 視為網站已部署完成。
- 可由 `stories/release.json` 核對發布來源、帳本 revision 與匯出篇數，再由 `stories/data/index.json` 核對實際故事列表。GitHub Pages 網站部署完成前不宣稱公開頁已更新。
- 「因果、數值」以選項對R的權重表、教師四狀態表及各NPC四碼表供檢查；不顯示原始 Markdown，但原始資料持續保存以供稽核。
- 常規定向測試：`node --test test/story-reader-export.test.js test/story-reader-ui.test.js`。不為小範圍閱讀器修正重跑三年遊戲模擬。
