import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile, writeFile, mkdir, mkdtemp, rm} from 'node:fs/promises';
import {join} from 'node:path';
import {exportReaderData} from '../scripts/export-story-reader.mjs';
import {validateReaderIndex, validateReaderDetail} from '../story-reader/reader-core.js';

test('Markdown-only snapshots discover additions, refresh edits and isolate unfinished stories',async t=>{
 await mkdir('work',{recursive:true});
 const temp=await mkdtemp('work/story-reader-test-');
 t.after(()=>rm(temp,{recursive:true,force:true}));
 const storyRoot=join(temp,'source'),output=join(temp,'out'),pool=join(storyRoot,'T','學期','主題','故事池');
 await mkdir(pool,{recursive:true});
 const fixture=(await readFile('test/fixtures/17d-draft-sample-s0451.md','utf8'))
  .replace('G-0001','T1-001').replace('| G |','| T |');
 const first=join(pool,'T1-001.md');
 const get=async path=>JSON.parse(await readFile(join(output,path),'utf8'));
 await writeFile(first,fixture);
 await writeFile(join(pool,'README.md'),'# 故事池');
 await exportReaderData({storyRoot,output,sourceBranch:'content/events-production-v1',sourceCommit:'before'});
 const index=await get('index.json');
 const [record]=validateReaderIndex(index);
 assert.equal(index.count,1);
 assert.equal(index.sourceBranch,'content/events-production-v1');
 assert.equal(record.storyId,'T1-001');
 const before=validateReaderDetail(await get(record.detail),record);
 assert.equal(before.sourceMarkdown,fixture);
 assert.equal(before.sourceCommit,'before');
 assert.equal(before.sourceBranch,'content/events-production-v1');
 assert.equal(before.options.length,4);
 assert.equal(before.results.length,8);
 assert.equal(Object.values(before.matrix).flat().length,32);

 await writeFile(first,fixture.replace('那句「老師說的」','更新標題'));
 await writeFile(join(pool,'T1-013.md'),'# 尚在構思的稿件');
 await exportReaderData({storyRoot,output,sourceCommit:'after'});
 const latest=await get('index.json');
 assert.equal(latest.sourceCommit,'after');
 assert.deepEqual(validateReaderIndex(latest).map(x=>x.storyId),['T1-001','T1-013']);
 assert.match((await get(record.detail)).title,/更新標題/);
 assert.equal((await get(record.detail)).sourceCommit,'after');
 const partial=validateReaderDetail(await get('stories/T1-013.json'),latest.stories[1]);
 assert.equal(partial.sourceMarkdown,'# 尚在構思的稿件');
 assert.ok(partial.previewIssue);
 assert.equal(partial.sourceCommit,'after');
 assert.ok((await get(record.detail)).matrix);

 await writeFile(join(storyRoot,'T','T1-013.md'),'# 重複的檔名');
 await exportReaderData({storyRoot,output});
 const duplicate=await get('index.json');
 assert.deepEqual(duplicate.stories.map(x=>x.storyId),['T1-001']);
 assert.match(duplicate.warnings[0],/T1-013/);
});
