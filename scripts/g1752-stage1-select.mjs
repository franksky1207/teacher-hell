#!/usr/bin/env node
/**
 * G1752 Stage 1 Selection CLI:
 * Runs true 6-choose-3 + 1 emotional shuffle using Mulberry32 v1 and updates Gxxxx.md & evidence/Gxxxx.json.
 * Usage:
 *   node scripts/g1752-stage1-select.mjs --story content/events-v1/G/G0001-G0024/G0001.md --candidates candidates.json [--seed 12345] [--reselect]
 */
import { readFile } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { applyStage1SelectionToFiles } from './g1752-stage1.js';

const args = process.argv.slice(2);
const param = k => {
  const i = args.indexOf(k);
  return i >= 0 ? args[i + 1] : null;
};

if (args.includes('--help') || !param('--story') || !param('--candidates')) {
  console.log('用法：node scripts/g1752-stage1-select.mjs --story <Gxxxx.md> --candidates <candidates.json> [--seed <uint32>] [--reselect]');
  process.exitCode = args.includes('--help') ? 0 : 2;
} else {
  (async () => {
    const mdPath = resolve(param('--story'));
    const storyId = basename(mdPath, '.md');
    const evidencePath = join(dirname(mdPath), '驗收紀錄', 'evidence', `${storyId}.json`);
    const payload = JSON.parse(await readFile(resolve(param('--candidates')), 'utf8'));
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
    console.error('抽選失敗：' + err.message);
    process.exitCode = 1;
  });
}
