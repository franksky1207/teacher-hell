# 18-B B批｜T02 工程隔離資源接線紀錄

2026-11-16；從 `feat/18b-t02-authoring` 最新作者稿建立獨立工作分支 `feat/18b-t02-b-isolated-assets`；另外攜入A批全域隔離追蹤檔案。**這是工程接線，不是獨立審稿／正式發布。**

## 產物

- `scripts/sync-t02-drafts.mjs`：依 `work/18b-t02-01～08-authoring.json` 唯一來源，將每篇的 `story/definition/binding` 序列化為 `src/runtime/content/t02-01～08.js`，並同步 `t02.js` 及從全域清單產生的 `t02-isolation.js`。提供 `--check` 唯讀核對。
- `src/runtime/story-content.js`：增加 208 則 T02 故事在 `resolveStory()` 的工程資源解析；新增 `T02_DRAFT_STORIES` 與 `t02DraftCatalogue()`。
- 工程目錄只納入 **191 則**，排除 A 批列出的 **9 blocked＋8 held**；17則仍保留原始JSON及JS，可供日後追蹤而不會被本目錄抽中。
- 所有208則維持 `engineering-test`，工程目錄的 `engineering:true` 不得冒充正式放行；一般正式候選池仍須 `ready`。
- 另附 `test/18b-t02-isolated-assets.test.js` 以精準核對資料一致、版本解析、排除清單、工程目錄與正式候選關閉。

## 尚未完成的門檻

1. 目前是由T02作者分支建立的獨立Draft PR；**T01 PR #68的故事 JS 及資源接線尚未併入此分支**。後續整合T01／T02應處理 `src/runtime/story-content.js` 的不同分支變更，不可直接覆蓋任何一方。
2. 此工程目錄僅供明確 opt-in 測試；尚未將191則直接放進玩家新生涯或正式預覽；完整正式簽核與敏感制度確認需按SOP在C批裁決。
3. 全域追蹤JSON目前透過生成隔離ID清單參與**同步及候選排除**；修改學業／升學／校曆功能時需開發者主動比對dependency，**尚未有自動監控或自動解封**。不得僅改JSON狀態就擅自發布。
4. 測試結果僅在實際執行後如實填報；未實跑的檢查不得宣稱通過。

## 精準驗收指令

```sh
node scripts/sync-t02-drafts.mjs --check
node --test test/18b-t02-isolated-assets.test.js
```

不跑三年／30年模擬、大量seed、整套全專案或瀏覽器矩陣；失敗只做定位後的局部複驗。原PR #69仍Draft，A批PR #70亦獨立保留；B批不合併、不部署。
