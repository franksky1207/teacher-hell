# 故事閱讀器

[公開預覽](https://franksky1207.github.io/teacher-hell/stories/)由 GitHub Actions 從來源分支的 `content/events-v1/{T,G,P}` 發布。故事使用 Markdown；匯出的索引及單篇資料由 Pages 同源提供。新增或修訂 Markdown 並推送後，待發布完成再重新整理。

本機預覽可執行：

```bash
mkdir -p work/story-site
cp story-reader/{index.html,reader.js,reader-core.js,reader.css} work/story-site/
node scripts/export-story-reader.mjs --output work/story-site/data
python3 -m http.server 8080 --directory work/story-site
```

有完整區塊的故事保留選擇、摘要、開場、四選項、八結果、教師四狀態、NPC 與矩陣。尚未寫完的檔案可讀原 Markdown。正式驗收可獨立使用[故事工具](../docs/story-production-v1/06-種子與量產管理.md)。

[發布流程](../docs/story-reader-publish-v1.md) · [預覽索引](../docs/story-reader-data-v1.md)
