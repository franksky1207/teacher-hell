import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
  applyStage1SelectionToFiles,
  replayChoiceSelection,
  selectAndShuffleChoices,
  sha256,
  validateG1752Stage1Story,
} from '../scripts/g1752-stage1.js';
import { isUnfinishedGStory } from '../scripts/story-catalog.js';

const execFileAsync = promisify(execFile);

function sampleCandidates() {
  return {
    ordinaryCandidates: [
      { id: 1, text: '先凍結移動並單獨確認', action: '老師先暫緩挪動置物區，請值日生與發起人分開說明', tradeoff: '清楚釐清同意範圍，但全班置物調整延後一天' },
      { id: 2, text: '以現有星數先試辦一週', action: '老師依現有星數暫時試行一週並公告異議窗口', tradeoff: '保留多數人進度，但畫星誤會的同學感到被代表' },
      { id: 3, text: '請發起人補做匿名複查', action: '老師要求發起同學改用匿名小紙條重新收集同意', tradeoff: '程序較公平，但發起人覺得先前紀錄被否定' },
      { id: 4, text: '維持原狀不再調整', action: '老師宣布本次提議不具足夠共識，維持原置物區', tradeoff: '省去後續爭議，但原本積極改善的學生失去動力' },
      { id: 5, text: '先只移動無爭議的三排', action: '老師只允許明確口頭確認的三排先行試換', tradeoff: '兼顧安全與彈性，但班級動線暫時不一致' },
      { id: 6, text: '交由班會公開表決', action: '老師將置物區調整案排入隔日班會正式表決', tradeoff: '結論具代表性，但當天課間仍須維持秩序' },
    ],
    emotionalCandidate: {
      text: '當場嘆氣要大家別再畫星星',
      action: '老師煩躁地把黑板角落的星星一次擦掉，要大家以後有事直接講',
      tradeoff: '暫時止住爭執，但值日生與發起人都覺得被當眾否定',
    },
  };
}

test('6-choose-3 yields 3 distinct ordinary IDs, 1 emotional, and variable A-D positions', () => {
  const { ordinaryCandidates, emotionalCandidate } = sampleCandidates();
  const emotionalPositions = new Set();

  for (let seed = 1; seed <= 40; seed++) {
    const res = selectAndShuffleChoices({ ordinaryCandidates, emotionalCandidate, seed });
    assert.equal(res.selectedIds.length, 3);
    assert.equal(new Set(res.selectedIds).size, 3);
    for (const id of res.selectedIds) {
      assert.ok(Number.isInteger(id) && id >= 1 && id <= 6);
    }

    const mappedValues = Object.values(res.finalChoiceMap);
    assert.equal(mappedValues.filter(v => v === 'emotional').length, 1);
    const ordinaryMapped = mappedValues.filter(v => v !== 'emotional');
    assert.equal(ordinaryMapped.length, 3);
    assert.equal(new Set(ordinaryMapped).size, 3);
    assert.deepEqual([...ordinaryMapped].sort(), [...res.selectedIds].sort());

    const emoLetter = Object.entries(res.finalChoiceMap).find(([, v]) => v === 'emotional')[0];
    emotionalPositions.add(emoLetter);
  }

  assert.equal(emotionalPositions.size, 4, 'Emotional option should land on all 4 letters A-D across seeds');
});

test('selection evidence is reproducible via replayChoiceSelection', () => {
  const { ordinaryCandidates, emotionalCandidate } = sampleCandidates();
  const res = selectAndShuffleChoices({ ordinaryCandidates, emotionalCandidate, seed: 20261126 });
  const replayed = replayChoiceSelection(res);
  assert.deepEqual(replayed.selectedIds, res.selectedIds);
  assert.deepEqual(replayed.finalChoiceMap, res.finalChoiceMap);

  assert.throws(() => replayChoiceSelection({
    ...res,
    selectedIds: [1, 2, 3], // tampered
  }), /重現抽選失敗/);
});

test('invalid candidate counts, duplicate IDs, and missing evidence are rejected', () => {
  const { ordinaryCandidates, emotionalCandidate } = sampleCandidates();

  assert.throws(() => selectAndShuffleChoices({
    ordinaryCandidates: ordinaryCandidates.slice(0, 5),
    emotionalCandidate,
    seed: 1,
  }), /恰好有 6 個/);

  const dup = [...ordinaryCandidates];
  dup[5] = { ...dup[5], id: 1 };
  assert.throws(() => selectAndShuffleChoices({
    ordinaryCandidates: dup,
    emotionalCandidate,
    seed: 1,
  }), /重複/);

  assert.throws(() => replayChoiceSelection(null), /缺少 ordinaryChoiceSelection/);
});

test('confirmed selection cannot be silently overwritten and edited options invalidate old evidence', async t => {
  await mkdir('work', { recursive: true });
  const tmp = await mkdtemp('work/g1752-stage1-test-');
  t.after(() => rm(tmp, { recursive: true, force: true }));

  const batchDir = join(tmp, 'G0001-G0024');
  const evDir = join(batchDir, '驗收紀錄', 'evidence');
  await mkdir(evDir, { recursive: true });
  const mdPath = join(batchDir, 'G0001.md');
  const evPath = join(evDir, 'G0001.json');

  await cp('content/events-v1/G/G0001-G0024/G0001.md', mdPath);
  await cp('content/events-v1/G/G0001-G0024/驗收紀錄/evidence/G0001.json', evPath);

  const assignment = { storyId: 'G0001', seedId: 'S0002', codes: ['2-3', '4-4', '6-2', '10-2'], folder: 'G0001-G0024' };

  // Prebuild unstarted state is NOT treated as stage1-passed
  const preMd = await readFile(mdPath, 'utf8');
  const preEv = JSON.parse(await readFile(evPath, 'utf8'));
  const preCheck = validateG1752Stage1Story({ mdText: preMd, evidence: preEv, filePath: mdPath, expectedAssignment: assignment });
  assert.equal(preCheck.state, 'prebuild-unstarted');
  assert.equal(preCheck.errors.length, 0);

  // Apply selection
  const { ordinaryCandidates, emotionalCandidate } = sampleCandidates();
  await applyStage1SelectionToFiles({ mdPath, evidencePath: evPath, ordinaryCandidates, emotionalCandidate, seed: 42 });

  // Re-running without --reselect refuses to overwrite
  await assert.rejects(
    () => applyStage1SelectionToFiles({ mdPath, evidencePath: evPath, ordinaryCandidates, emotionalCandidate, seed: 99 }),
    /禁止無聲覆蓋/,
  );

  // After selection, state is stage1-in-progress (opening & consequenceDirections not yet filled)
  const afterMd = await readFile(mdPath, 'utf8');
  const afterEv = JSON.parse(await readFile(evPath, 'utf8'));
  const inProgCheck = validateG1752Stage1Story({ mdText: afterMd, evidence: afterEv, filePath: mdPath, expectedAssignment: assignment });
  assert.equal(inProgCheck.state, 'stage1-in-progress');
  assert.equal(inProgCheck.errors.length, 0);

  // Tampering with option text in MD without re-running selection invalidates old evidence
  const tamperedMd = afterMd.replace(/\| A \| ([^|]+) \|/, '| A | 擅自改寫的選項短句 |');
  const tamperedCheck = validateG1752Stage1Story({ mdText: tamperedMd, evidence: afterEv, filePath: mdPath, expectedAssignment: assignment });
  assert.equal(tamperedCheck.state, 'invalid');
  assert.ok(tamperedCheck.errors.some(e => e.location.includes('sourceVersion') || e.location.includes('optionsDigest')));
});

test('formal G0001 format is accepted while old G-0001 filename is rejected', async () => {
  const mdText = await readFile('content/events-v1/G/G0001-G0024/G0001.md', 'utf8');
  const ev = JSON.parse(await readFile('content/events-v1/G/G0001-G0024/驗收紀錄/evidence/G0001.json', 'utf8'));
  const assignment = { storyId: 'G0001', seedId: 'S0002', codes: ['2-3', '4-4', '6-2', '10-2'], folder: 'G0001-G0024' };

  const okRes = validateG1752Stage1Story({
    mdText,
    evidence: ev,
    filePath: 'content/events-v1/G/G0001-G0024/G0001.md',
    expectedAssignment: assignment,
  });
  assert.equal(okRes.state, 'prebuild-unstarted');

  const oldRes = validateG1752Stage1Story({
    mdText,
    evidence: ev,
    filePath: 'content/events-v1/G/G0001-G0024/G-0001.md',
    expectedAssignment: assignment,
  });
  assert.equal(oldRes.state, 'invalid');
  assert.ok(oldRes.errors.some(e => e.location === 'filename'));
});

test('full 24-story batch verifies in a single CLI invocation', async () => {
  const { stdout } = await execFileAsync('node', ['scripts/g1752-verify-stage1.mjs', '--batch', 'content/events-v1/G/G0001-G0024']);
  const parsed = JSON.parse(stdout);
  assert.equal(parsed.ok, true);
  assert.equal(parsed.batch, 'G0001-G0024');
  assert.equal(parsed.counts.total, 24);
  assert.equal(parsed.counts['prebuild-unstarted'], 24);
  assert.equal(parsed.counts.invalid, 0);
});

test('unfinished G drafts are excluded by isUnfinishedGStory guard', async () => {
  const mdText = await readFile('content/events-v1/G/G0001-G0024/G0001.md', 'utf8');
  const excluded = await isUnfinishedGStory({
    storyId: 'G0001',
    type: 'G',
    path: 'content/events-v1/G/G0001-G0024/G0001.md',
    markdown: mdText,
  });
  assert.equal(excluded, true);

  const tStoryAllowed = await isUnfinishedGStory({
    storyId: 'T1-001',
    type: 'T',
    path: 'content/events-v1/T/T1-高一上/T1-1-開學/活動前/T1-001.md',
    markdown: '# 正式T故事',
  });
  assert.equal(tStoryAllowed, false);
});
