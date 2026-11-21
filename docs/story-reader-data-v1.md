# 故事預覽資料

`scripts/export-story-reader.mjs` 遞迴掃描 `content/events-v1`，用正式 ID 的 Markdown 檔名辨識故事。各池說明與時段引導依原用途保留。完整故事會轉成閱讀器結構，未完成的故事可預覽原 Markdown。重複檔名會在索引發出提示，其餘故事仍發布。

輸出為 `data/index.json`、`data/stories/<正式 ID>.json`。索引記錄來源分支與 Git commit，閱讀器按需抓取所選單篇；詳細資料使用來源 commit 作快取鍵。所有檔案由 Pages 同源服務，瀏覽器不需 GitHub API 或憑證。公開發布流程見[發布說明](./story-reader-publish-v1.md)。
