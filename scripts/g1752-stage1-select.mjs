#!/usr/bin/env node
/**
 * G1752 Stage 1 Selection & Sync CLI:
 * 1) Run 6-choose-3 + 1 emotional shuffle:
 *    node scripts/g1752-stage1-select.mjs --story <Gxxxx.md> --candidates <candidates.json> [--seed <uint32>] [--reselect]
 * 2) Type A safe options wording sync (preserves selectedIds, emotional position, A~D mapping):
 *    node scripts/g1752-stage1-select.mjs --story <Gxxxx.md> --sync-options [--confirm-action-polish]
 */
import { readFile } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { applyStage1SelectionToFiles, syncStage1OptionsWording } from './g1752-stage1.js';

const args = process.argv.slice(2);
const param = k => {
  const i = args.indexOf(k);
  return i >= 0 ? args[i + 1] : null;
};

const storyArg = param('--story');
const candidatesArg = param('--candidates');
const syncMode = args.includes('--sync-options');

if (args.includes('--help') || !storyArg || (!syncMode && !candidatesArg) || (syncMode && candidatesArg)) {
  console.log(
    '用法：\n' +
    '  抽選：node scripts/g1752-stage1-select.mjs --story <Gxxxx.md> --candidates <candidates.json> [--seed <uint32>] [--reselect]\n' +
    '  同步潤飾：node scripts/g1752-stage1-select.mjs --story <Gxxxx.md> --sync-options [--confirm-action-polish]'
  );
  process.exitCode = args.includes('--help') ? 0 : 2;
} else {
  (async () => {
    const mdPath = resolve(storyArg);
    const storyId = basename(mdPath, '.md');
    const evidencePath = join(dirname(mdPath), '驗收紀錄', 'evidence', `${storyId}.json`);

    if (syncMode) {
      const res = await syncStage1OptionsWording({
        mdPath,
        evidencePath,
        allowActionWordingPolish: args.includes('--confirm-action-polish'),
      });
      console.log(JSON.stringify(res, null, 2));
      return;
    }

    const payload = JSON.parse(await readFile(resolve(candidatesArg), 'utf8'));
    const seedArg = param('--seed');
    const seed = seedArg !== null ? Number(seedArg) : undefined;
    const reselect = args.includes('--reselect');

    const res = await applyStage1SelectionToFiles({
      mdPath,
      evidencePath,
      ordinaryCandidates: payload.ordinaryCandidates,
      emotionalCandidate: payload.emotionalCandidate,
      seed,
      reselect,
    });
    console.log(JSON.stringify(res, null, 2));
  })().catch(err => {
    console.error('執行失敗：' + err.message);
    process.exitCode = 1;
  });
}
