#!/usr/bin/env node
/**
 * G1752 Stage 1 Integrated Verification Entry:
 * Verifies either a 24-story batch directory (--batch) or a single story (--story).
 * Usage:
 *   node scripts/g1752-verify-stage1.mjs --batch content/events-v1/G/G0001-G0024
 *   node scripts/g1752-verify-stage1.mjs --story content/events-v1/G/G0001-G0024/G0001.md
 */
import { readdir, readFile } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateG1752Stage1Story } from './g1752-stage1.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SEEDS_PATH = join(ROOT, 'data/g1752-fixed-seed-assignments.json');

const args = process.argv.slice(2);
const param = k => {
  const i = args.indexOf(k);
  return i >= 0 ? args[i + 1] : null;
};

async function verifySingleStory(mdPath, assignmentMap) {
  const storyId = basename(mdPath, '.md');
  const batchDir = dirname(mdPath);
  const evidencePath = join(batchDir, '驗收紀錄', 'evidence', `${storyId}.json`);
  const mdText = await readFile(mdPath, 'utf8');
  let evidence = null;
  try {
    evidence = JSON.parse(await readFile(evidencePath, 'utf8'));
  } catch {
    evidence = null;
  }
  return validateG1752Stage1Story({
    mdText,
    evidence,
    filePath: mdPath,
    expectedAssignment: assignmentMap.get(storyId),
  });
}

async function main() {
  const batchArg = param('--batch');
  const storyArg = param('--story');
  if (args.includes('--help') || (!batchArg && !storyArg) || (batchArg && storyArg)) {
    console.log('用法：node scripts/g1752-verify-stage1.mjs --batch <批次目錄> | --story <Gxxxx.md>');
    process.exitCode = args.includes('--help') ? 0 : 2;
    return;
  }

  const seedData = JSON.parse(await readFile(SEEDS_PATH, 'utf8'));
  const assignmentMap = new Map(seedData.assignments.map(a => [a.storyId, a]));

  if (storyArg) {
    const mdPath = resolve(storyArg);
    const res = await verifySingleStory(mdPath, assignmentMap);
    console.log(JSON.stringify({ storyId: basename(mdPath, '.md'), ...res }, null, 2));
    if (res.state === 'invalid') process.exitCode = 1;
    return;
  }

  const batchPath = resolve(batchArg);
  const folderName = basename(batchPath);
  const expected = seedData.assignments.filter(a => a.folder === folderName);
  if (expected.length !== 24) {
    console.error(`批次目錄 ${folderName} 不存在於正式 73 批清單中`);
    process.exitCode = 2;
    return;
  }

  const files = (await readdir(batchPath)).filter(f => /^G\d{4}\.md$/.test(f)).sort();
  const counts = {
    total: expected.length,
    'prebuild-unstarted': 0,
    'stage1-in-progress': 0,
    'stage1-ready-for-review': 0,
    'stage1-passed': 0,
    invalid: 0,
  };
  const allErrors = [];

  for (const item of expected) {
    const mdName = `${item.storyId}.md`;
    if (!files.includes(mdName)) {
      counts.invalid++;
      allErrors.push({ storyId: item.storyId, location: 'file', detail: `缺少 ${mdName}` });
      continue;
    }
    const res = await verifySingleStory(join(batchPath, mdName), assignmentMap);
    counts[res.state]++;
    if (res.errors.length > 0) {
      allErrors.push(...res.errors);
    }
  }

  const extraFiles = files.filter(f => !expected.some(e => `${e.storyId}.md` === f));
  for (const extra of extraFiles) {
    counts.invalid++;
    allErrors.push({ storyId: basename(extra, '.md'), location: 'directory', detail: `不屬於 ${folderName} 的多餘故事檔 ${extra}` });
  }

  if (allErrors.length === 0) {
    console.log(JSON.stringify({ batch: folderName, ok: true, counts }, null, 2));
  } else {
    console.log(JSON.stringify({ batch: folderName, ok: false, counts, errors: allErrors }, null, 2));
    process.exitCode = 1;
  }
}

main().catch(err => {
  console.error('驗證器錯誤：' + err.message);
  process.exitCode = 2;
});
