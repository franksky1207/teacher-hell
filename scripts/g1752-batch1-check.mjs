#!/usr/bin/env node
/**
 * Batch 1 Integration Check:
 * Verifies all 73 batch directories, 1,752 Gxxxx.md drafts, and 1,752 evidence/Gxxxx.json files.
 */
import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const G_ROOT = join(ROOT, 'content/events-v1/G');
const SEEDS_PATH = join(ROOT, 'data/g1752-fixed-seed-assignments.json');

function sha256(text) {
  return createHash('sha256').update(text, 'utf8').digest('hex');
}

function extractPlanningField(block, label) {
  const m = block.match(new RegExp(`^- \\*\\*${label}\\*\\*：(.+)$`, 'm'));
  return m ? m[1].trim() : null;
}

async function main() {
  const errors = [];
  const seedData = JSON.parse(await readFile(SEEDS_PATH, 'utf8'));
  const assignments = seedData.assignments;
  const assignmentMap = new Map(assignments.map(a => [a.storyId, a]));

  const entries = await readdir(G_ROOT, { withFileTypes: true });
  const batchDirs = entries
    .filter(e => e.isDirectory() && /^G\d{4}-G\d{4}$/.test(e.name))
    .map(e => e.name)
    .sort();

  if (batchDirs.length !== 73) {
    errors.push(`Expected 73 batch dirs, found ${batchDirs.length}`);
  }

  const seenStoryIds = new Set();
  let mdCount = 0;
  let jsonCount = 0;

  for (let bIdx = 0; bIdx < batchDirs.length; bIdx++) {
    const dir = batchDirs[bIdx];
    const startNum = bIdx * 24 + 1;
    const expectedDir = `G${String(startNum).padStart(4, '0')}-G${String(startNum + 23).padStart(4, '0')}`;
    if (dir !== expectedDir) {
      errors.push(`Unexpected batch dir ${dir}, expected ${expectedDir}`);
    }

    const batchPath = join(G_ROOT, dir);
    const evidenceDir = join(batchPath, '驗收紀錄', 'evidence');
    const batchFiles = (await readdir(batchPath)).filter(f => /^G\d{4}\.md$/.test(f)).sort();
    let evidenceFiles = [];
    try {
      evidenceFiles = (await readdir(evidenceDir)).filter(f => /^G\d{4}\.json$/.test(f)).sort();
    } catch {
      errors.push(`Missing evidence dir in ${dir}`);
      continue;
    }

    if (batchFiles.length !== 24) errors.push(`${dir}: expected 24 .md files, found ${batchFiles.length}`);
    if (evidenceFiles.length !== 24) errors.push(`${dir}: expected 24 .json files, found ${evidenceFiles.length}`);

    const planningMd = await readFile(join(batchPath, '故事主題與摘要規劃.md'), 'utf8');
    const headings = [...planningMd.matchAll(/^### (G\d{4})｜([^\r\n]+)/gm)];
    const planMap = new Map();
    for (let i = 0; i < headings.length; i++) {
      const id = headings[i][1];
      const block = planningMd.slice(headings[i].index, headings[i + 1]?.index ?? planningMd.length);
      planMap.set(id, block);
    }

    for (let offset = 0; offset < 24; offset++) {
      const storyId = `G${String(startNum + offset).padStart(4, '0')}`;
      const mdName = `${storyId}.md`;
      const jsonName = `${storyId}.json`;

      if (!batchFiles.includes(mdName)) {
        errors.push(`${dir}: missing ${mdName}`);
        continue;
      }
      if (!evidenceFiles.includes(jsonName)) {
        errors.push(`${dir}: missing ${jsonName}`);
        continue;
      }
      if (seenStoryIds.has(storyId)) {
        errors.push(`Duplicate storyId ${storyId}`);
        continue;
      }
      seenStoryIds.add(storyId);

      const assignment = assignmentMap.get(storyId);
      if (!assignment || assignment.folder !== dir) {
        errors.push(`${storyId}: assignment folder mismatch`);
        continue;
      }

      const [mdText, jsonText] = await Promise.all([
        readFile(join(batchPath, mdName), 'utf8'),
        readFile(join(evidenceDir, jsonName), 'utf8'),
      ]);
      mdCount++;
      jsonCount++;

      const planBlock = planMap.get(storyId);
      if (!planBlock) {
        errors.push(`${storyId}: missing in planning MD`);
        continue;
      }

      const title = extractPlanningField(planBlock, '預定故事標題');
      const cause = extractPlanningField(planBlock, '事件起因');
      const conflict = extractPlanningField(planBlock, '核心衝突');
      const dilemma = extractPlanningField(planBlock, '導師困境');
      const uniqueness = extractPlanningField(planBlock, '故事獨特性');
      const tagsRaw = extractPlanningField(planBlock, '規劃題材標籤');

      if (!mdText.startsWith(`# ${title}\n`)) errors.push(`${storyId}: title mismatch`);
      if (!mdText.includes(`| \`story_id\`｜正式故事ID | ${storyId} |`)) errors.push(`${storyId}: story_id row mismatch`);
      if (!mdText.includes(`| \`seed_id\`｜種子ID | ${assignment.seedId} |`)) errors.push(`${storyId}: seed_id row mismatch`);
      if (!mdText.includes(`| \`tags\`｜T/G共用11類多標籤 | ${tagsRaw} |`)) errors.push(`${storyId}: tags row mismatch`);
      if (!mdText.includes(`| 事件起因 | ${cause} |`)) errors.push(`${storyId}: cause mismatch`);
      if (!mdText.includes(`| 核心衝突 | ${conflict} |`)) errors.push(`${storyId}: conflict mismatch`);
      if (!mdText.includes(`| 導師困境 | ${dilemma} |`)) errors.push(`${storyId}: dilemma mismatch`);
      if (!mdText.includes(`| 故事獨特性 | ${uniqueness} |`)) errors.push(`${storyId}: uniqueness mismatch`);
      if (!mdText.includes(`- **本篇四碼**：${assignment.codes.join('／')}`)) errors.push(`${storyId}: codes line mismatch`);

      // Verify unfinished markers and absence of copied SOP 03 example emotional flags
      if (!mdText.includes('【待填：階段三AVG】') || !mdText.includes('【待填：階段一開場】')) {
        errors.push(`${storyId}: missing unfinished stage placeholders`);
      }
      for (const opt of ['A', 'B', 'C', 'D']) {
        if (!mdText.includes(`| ${opt} | 【待填：階段一六選三＋情緒洗牌】 | 【待填】 | 【待填】 | 【待填】 |`)) {
          errors.push(`${storyId}: option ${opt} is not in clean unstarted state`);
        }
      }

      let ev;
      try {
        ev = JSON.parse(jsonText);
      } catch {
        errors.push(`${storyId}: invalid JSON`);
        continue;
      }

      if (ev.storyId !== storyId || ev.seedId !== assignment.seedId || ev.batch !== dir) {
        errors.push(`${storyId}: evidence identity mismatch`);
      }
      if (JSON.stringify(ev.codes) !== JSON.stringify(assignment.codes)) {
        errors.push(`${storyId}: evidence codes mismatch`);
      }
      if (ev.status !== 'prebuild-unstarted') {
        errors.push(`${storyId}: evidence status must be prebuild-unstarted`);
      }
      if (ev.sourceVersion?.draftSha256 !== sha256(mdText)) {
        errors.push(`${storyId}: draftSha256 mismatch`);
      }
      const s1 = ev.stages?.stage1;
      const s2 = ev.stages?.stage2;
      const s3 = ev.stages?.stage3;
      if (
        s1?.status !== 'not_started' || s1?.ordinaryChoiceSelection !== null || s1?.consequenceDirections !== null ||
        s2?.status !== 'not_started' || s2?.resultCausality !== null || s2?.state58Combination !== null ||
        s3?.status !== 'not_started' || s3?.avgValidated !== false || s3?.semanticApproved !== false || s3?.reviewer !== null || s3?.approvedAt !== null
      ) {
        errors.push(`${storyId}: evidence contains non-unstarted or fabricated stage fields`);
      }
    }
  }

  const summary = {
    ok: errors.length === 0,
    batchDirs: batchDirs.length,
    mdCount,
    jsonCount,
    uniqueStoryIds: seenStoryIds.size,
    errorCount: errors.length,
    sampleErrors: errors.slice(0, 10),
  };
  console.log(JSON.stringify(summary, null, 2));
  if (errors.length > 0) process.exitCode = 1;
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
