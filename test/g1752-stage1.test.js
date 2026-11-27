import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
  applyStage1SelectionToFiles,
  confirmStage1Passed,
  replayChoiceSelection,
  selectAndShuffleChoices,
  syncStage1OptionsWording,
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

function makeCompleteStage1Markdown(baseMdWithOptions) {
  return baseMdWithOptions
    .replace(
      '【待填：階段一確認】規劃前提：普通上課日課間，僅涉及班級可調整的校內置物範圍，尚未移動同學私人物品',
      '普通上課日課間，僅涉及班級可調整的校內置物範圍，尚未移動同學私人物品',
    )
    .replace(
      '| 【待填：階段一確立合法槽位】 | 【待填】 | 規劃配置：現任本班值日生，看得到公開星記及置物規劃，無權替其他人表示同意；發起同學僅能說明自己如何讀取星數 | 【待填】 |',
      '| student_a | 現任本班值日生 | 知道自己畫過一顆星，無權替其他人表示同意 | 持2-3、4-4、6-2、10-2 |',
    )
    .replace('【待填：階段一依需要填寫；不能持碼與結算】', '發起同學（情境人物，不持碼結算）')
    .replace(/\| 2-3 \| 【待填：階段一確立合法持碼槽位】 \| 規劃因果：/g, '| 2-3 | student_a | ')
    .replace(/\| 4-4 \| 【待填：階段一確立合法持碼槽位】 \| 規劃因果：/g, '| 4-4 | student_a | ')
    .replace(/\| 6-2 \| 【待填：階段一確立合法持碼槽位】 \| 規劃因果：/g, '| 6-2 | student_a | ')
    .replace(/\| 10-2 \| 【待填：階段一確立合法持碼槽位】 \| 規劃因果：/g, '| 10-2 | student_a | ')
    .replace(
      '- **P01｜旁白／合法說話者**：【待填：階段一開場】',
      '- **P01｜旁白**：下課鐘剛響，值日生小聲坦承自己早上只是跟著畫了一顆星，發起人卻已經把抹布和紙箱搬到走廊。\n- **P02｜student_a**：老師，我真的以為畫星星只是表示看過公告。',
    );
}

const G0001_ASSIGNMENT = { storyId: 'G0001', seedId: 'S0002', codes: ['2-3', '4-4', '6-2', '10-2'], folder: 'G0001-G0024' };

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
    assert.deepEqual([...ordinaryMapped].sort(), [...res.selectedIds].sort());
    emotionalPositions.add(Object.entries(res.finalChoiceMap).find(([, v]) => v === 'emotional')[0]);
  }
  assert.equal(emotionalPositions.size, 4);
});

test('selection evidence is reproducible and forging selectedIds, emotional position, or A-D map fails validation', async t => {
  await mkdir('work', { recursive: true });
  const tmp = await mkdtemp('work/g1752-forge-test-');
  t.after(() => rm(tmp, { recursive: true, force: true }));

  const batchDir = join(tmp, 'G0001-G0024');
  const evDir = join(batchDir, '驗收紀錄', 'evidence');
  await mkdir(evDir, { recursive: true });
  const mdPath = join(batchDir, 'G0001.md');
  const evPath = join(evDir, 'G0001.json');

  await cp('content/events-v1/G/G0001-G0024/G0001.md', mdPath);
  await cp('content/events-v1/G/G0001-G0024/驗收紀錄/evidence/G0001.json', evPath);

  const { ordinaryCandidates, emotionalCandidate } = sampleCandidates();
  await applyStage1SelectionToFiles({ mdPath, evidencePath: evPath, ordinaryCandidates, emotionalCandidate, seed: 42 });

  const mdText = await readFile(mdPath, 'utf8');
  const ev = JSON.parse(await readFile(evPath, 'utf8'));

  // Valid replay
  const replayed = replayChoiceSelection(ev.stages.stage1.ordinaryChoiceSelection);
  assert.deepEqual(replayed.selectedIds, ev.stages.stage1.ordinaryChoiceSelection.selectedIds);

  // Forged selectedIds (guaranteed different from actual selectedIds)
  const forgedSelected = structuredClone(ev);
  const actualIds = forgedSelected.stages.stage1.ordinaryChoiceSelection.selectedIds;
  forgedSelected.stages.stage1.ordinaryChoiceSelection.selectedIds = actualIds.includes(6) ? [1, 2, 3] : [4, 5, 6];
  assert.equal(
    validateG1752Stage1Story({ mdText, evidence: forgedSelected, filePath: mdPath, expectedAssignment: G0001_ASSIGNMENT }).state,
    'invalid',
  );

  // Forged A~D map
  const forgedMap = structuredClone(ev);
  const { A, B } = forgedMap.stages.stage1.ordinaryChoiceSelection.finalChoiceMap;
  forgedMap.stages.stage1.ordinaryChoiceSelection.finalChoiceMap.A = B;
  forgedMap.stages.stage1.ordinaryChoiceSelection.finalChoiceMap.B = A;
  assert.equal(
    validateG1752Stage1Story({ mdText, evidence: forgedMap, filePath: mdPath, expectedAssignment: G0001_ASSIGNMENT }).state,
    'invalid',
  );

  // Forged emotional flag in Markdown
  const forgedEmotionalMd = mdText.replace(/\| A \| ([^|]+) \| (true|false) \|/, (_, txt, flag) => `| A | ${txt} | ${flag === 'true' ? 'false' : 'true'} |`);
  const emoCheck = validateG1752Stage1Story({ mdText: forgedEmotionalMd, evidence: ev, filePath: mdPath, expectedAssignment: G0001_ASSIGNMENT });
  assert.equal(emoCheck.state, 'invalid');
});

test('editing opening, roles, conditions, or summary does NOT invalidate selection evidence', async t => {
  await mkdir('work', { recursive: true });
  const tmp = await mkdtemp('work/g1752-edit-test-');
  t.after(() => rm(tmp, { recursive: true, force: true }));

  const batchDir = join(tmp, 'G0001-G0024');
  const evDir = join(batchDir, '驗收紀錄', 'evidence');
  await mkdir(evDir, { recursive: true });
  const mdPath = join(batchDir, 'G0001.md');
  const evPath = join(evDir, 'G0001.json');

  await cp('content/events-v1/G/G0001-G0024/G0001.md', mdPath);
  await cp('content/events-v1/G/G0001-G0024/驗收紀錄/evidence/G0001.json', evPath);

  const { ordinaryCandidates, emotionalCandidate } = sampleCandidates();
  const selRes = await applyStage1SelectionToFiles({ mdPath, evidencePath: evPath, ordinaryCandidates, emotionalCandidate, seed: 77 });

  // Edit opening, roles, conditions, and summary without touching evidence JSON
  let mdText = await readFile(mdPath, 'utf8');
  mdText = makeCompleteStage1Markdown(mdText);
  mdText = mdText.replace('睡眼惺忪的值日生跟著畫了一顆', '剛值完早自習的值日生也跟著畫了一顆');
  await writeFile(mdPath, mdText, 'utf8');

  const ev = JSON.parse(await readFile(evPath, 'utf8'));
  // Repeated validation does NOT re-draw selection and stays valid
  const check1 = validateG1752Stage1Story({ mdText, evidence: ev, filePath: mdPath, expectedAssignment: G0001_ASSIGNMENT });
  const check2 = validateG1752Stage1Story({ mdText, evidence: ev, filePath: mdPath, expectedAssignment: G0001_ASSIGNMENT });
  assert.equal(check1.state, 'stage1-in-progress'); // consequenceDirections still missing
  assert.equal(check2.state, 'stage1-in-progress');
  assert.deepEqual(ev.stages.stage1.ordinaryChoiceSelection.selectedIds, selRes.selectedIds);
});

test('Type A non-substantive wording polish syncs safely while Type B action/pool change is rejected', async t => {
  await mkdir('work', { recursive: true });
  const tmp = await mkdtemp('work/g1752-sync-test-');
  t.after(() => rm(tmp, { recursive: true, force: true }));

  const batchDir = join(tmp, 'G0001-G0024');
  const evDir = join(batchDir, '驗收紀錄', 'evidence');
  await mkdir(evDir, { recursive: true });
  const mdPath = join(batchDir, 'G0001.md');
  const evPath = join(evDir, 'G0001.json');

  await cp('content/events-v1/G/G0001-G0024/G0001.md', mdPath);
  await cp('content/events-v1/G/G0001-G0024/驗收紀錄/evidence/G0001.json', evPath);

  const { ordinaryCandidates, emotionalCandidate } = sampleCandidates();
  const orig = await applyStage1SelectionToFiles({ mdPath, evidencePath: evPath, ordinaryCandidates, emotionalCandidate, seed: 101 });

  // Type A: polish player-facing short text on option A
  let mdText = await readFile(mdPath, 'utf8');
  mdText = mdText.replace(/\| A \| ([^|]+) \|/, '| A | 先潤飾過的可見短句（不改行動） |');
  await writeFile(mdPath, mdText, 'utf8');

  // Before sync, optionsDigest mismatch is flagged
  const beforeSyncEv = JSON.parse(await readFile(evPath, 'utf8'));
  assert.equal(
    validateG1752Stage1Story({ mdText, evidence: beforeSyncEv, filePath: mdPath, expectedAssignment: G0001_ASSIGNMENT }).state,
    'invalid',
  );

  // Safe Type A sync preserves selectedIds and finalChoiceMap
  const synced = await syncStage1OptionsWording({ mdPath, evidencePath: evPath });
  assert.deepEqual(synced.selectedIds, orig.selectedIds);
  assert.deepEqual(synced.finalChoiceMap, orig.finalChoiceMap);

  const afterSyncEv = JSON.parse(await readFile(evPath, 'utf8'));
  assert.equal(
    validateG1752Stage1Story({ mdText, evidence: afterSyncEv, filePath: mdPath, expectedAssignment: G0001_ASSIGNMENT }).state,
    'stage1-in-progress',
  );

  // Type B: changing objective action without reselect fails sync & validation
  const actionChangedMd = mdText.replace(
    /\| B \| ([^|]+) \| (true|false) \| ([^|]+) \|/,
    '| B | $1 | $2 | 完全改掉教師客觀行動的新做法 |',
  );
  await writeFile(mdPath, actionChangedMd, 'utf8');
  await assert.rejects(
    () => syncStage1OptionsWording({ mdPath, evidencePath: evPath }),
    /教師已完成的客觀行動/,
  );
  assert.equal(
    validateG1752Stage1Story({ mdText: actionChangedMd, evidence: afterSyncEv, filePath: mdPath, expectedAssignment: G0001_ASSIGNMENT }).state,
    'invalid',
  );
});

test('complete Stage 1 content without semantic review returns stage1-ready-for-review, not stage1-passed, and post-approval edits invalidate old approval', async t => {
  await mkdir('work', { recursive: true });
  const tmp = await mkdtemp('work/g1752-review-state-test-');
  t.after(() => rm(tmp, { recursive: true, force: true }));

  const batchDir = join(tmp, 'G0001-G0024');
  const evDir = join(batchDir, '驗收紀錄', 'evidence');
  await mkdir(evDir, { recursive: true });
  const mdPath = join(batchDir, 'G0001.md');
  const evPath = join(evDir, 'G0001.json');

  await cp('content/events-v1/G/G0001-G0024/G0001.md', mdPath);
  await cp('content/events-v1/G/G0001-G0024/驗收紀錄/evidence/G0001.json', evPath);

  const { ordinaryCandidates, emotionalCandidate } = sampleCandidates();
  await applyStage1SelectionToFiles({ mdPath, evidencePath: evPath, ordinaryCandidates, emotionalCandidate, seed: 55 });

  const completeMd = makeCompleteStage1Markdown(await readFile(mdPath, 'utf8'));
  await writeFile(mdPath, completeMd, 'utf8');

  const ev = JSON.parse(await readFile(evPath, 'utf8'));
  ev.stages.stage1.consequenceDirections = {
    A: '客觀後果A／人物反應A／代價A',
    B: '客觀後果B／人物反應B／代價B',
    C: '客觀後果C／人物反應C／代價C',
    D: '客觀後果D／人物反應D／代價D',
  };
  await writeFile(evPath, JSON.stringify(ev, null, 2) + '\n', 'utf8');

  // Content is complete, but semantic review is not yet recorded -> must NOT return stage1-passed
  const readyCheck = validateG1752Stage1Story({ mdText: completeMd, evidence: ev, filePath: mdPath, expectedAssignment: G0001_ASSIGNMENT });
  assert.equal(readyCheck.state, 'stage1-ready-for-review');
  assert.equal(readyCheck.errors.length, 0);

  // Mechanical completeness alone must never self-authorize semantic approval.
  await assert.rejects(
    () => confirmStage1Passed({ mdPath, evidencePath: evPath, expectedAssignment: G0001_ASSIGNMENT, reviewer: 'qa-reviewer' }),
    /必須完成語意品質審查/,
  );
  await assert.rejects(
    () => confirmStage1Passed({ mdPath, evidencePath: evPath, expectedAssignment: G0001_ASSIGNMENT, semanticReviewConfirmed: true }),
    /非空白審查者/,
  );
  await assert.rejects(
    () => confirmStage1Passed({ mdPath, evidencePath: evPath, expectedAssignment: G0001_ASSIGNMENT, reviewer: '  ', semanticReviewConfirmed: true }),
    /非空白審查者/,
  );
  const stillPending = JSON.parse(await readFile(evPath, 'utf8'));
  assert.notEqual(stillPending.stages.stage1.status, 'passed');

  // An actual semantic review is explicitly attested by the reviewer before marking passed.
  const passedRes = await confirmStage1Passed({ mdPath, evidencePath: evPath, expectedAssignment: G0001_ASSIGNMENT, reviewer: 'qa-reviewer', semanticReviewConfirmed: true });
  assert.equal(passedRes.state, 'stage1-passed');

  const passedEv = JSON.parse(await readFile(evPath, 'utf8'));
  assert.equal(passedEv.stages.stage1.reviewer, 'qa-reviewer');
  const passedCheck = validateG1752Stage1Story({ mdText: completeMd, evidence: passedEv, filePath: mdPath, expectedAssignment: G0001_ASSIGNMENT });
  assert.equal(passedCheck.state, 'stage1-passed');

  // Subsequent edit to approved draft -> old approval must NOT impersonate stage1-passed
  const editedAfterPass = completeMd.replace('下課鐘剛響，值日生小聲坦承', '下課鐘剛響，值日生急忙跑來坦承');
  assert.notEqual(editedAfterPass, completeMd);
  const postEditCheck = validateG1752Stage1Story({ mdText: editedAfterPass, evidence: passedEv, filePath: mdPath, expectedAssignment: G0001_ASSIGNMENT });
  assert.equal(postEditCheck.state, 'stage1-ready-for-review');
  assert.equal(postEditCheck.staleApproval, true);
});

test('prebuild unstarted draft is never treated as stage1-passed, G-0001 is rejected, 24-story batch verifies, and unfinished G is excluded from export', async () => {
  const mdText = await readFile('content/events-v1/G/G0001-G0024/G0001.md', 'utf8');
  const ev = JSON.parse(await readFile('content/events-v1/G/G0001-G0024/驗收紀錄/evidence/G0001.json', 'utf8'));

  const preCheck = validateG1752Stage1Story({
    mdText,
    evidence: ev,
    filePath: 'content/events-v1/G/G0001-G0024/G0001.md',
    expectedAssignment: G0001_ASSIGNMENT,
  });
  assert.equal(preCheck.state, 'prebuild-unstarted');

  const oldCheck = validateG1752Stage1Story({
    mdText,
    evidence: ev,
    filePath: 'content/events-v1/G/G0001-G0024/G-0001.md',
    expectedAssignment: G0001_ASSIGNMENT,
  });
  assert.equal(oldCheck.state, 'invalid');

  const { stdout } = await execFileAsync('node', ['scripts/g1752-verify-stage1.mjs', '--batch', 'content/events-v1/G/G0001-G0024']);
  const batchRes = JSON.parse(stdout);
  assert.equal(batchRes.ok, true);
  assert.equal(batchRes.counts.total, 24);
  assert.equal(batchRes.counts['prebuild-unstarted'], 24);

  assert.equal(await isUnfinishedGStory({
    storyId: 'G0001',
    type: 'G',
    path: 'content/events-v1/G/G0001-G0024/G0001.md',
    markdown: mdText,
  }), true);
});
