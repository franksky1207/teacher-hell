/**
 * G1752 Stage 1 tooling:
 * - Reproducible 6-choose-3 ordinary choice selection + emotional option shuffle (Mulberry32 v1)
 * - Stage 1 draft & evidence verification (distinguishing prebuild-unstarted, stage1-in-progress, stage1-passed, invalid)
 */
import { createHash, randomInt } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { createRandom } from '../src/numeric/random.js';

export const VALID_TAGS = new Set(Array.from({ length: 11 }, (_, i) => 'G' + String(i + 1).padStart(2, '0')));
export const CHOICE_LETTERS = ['A', 'B', 'C', 'D'];

export function sha256(text) {
  return createHash('sha256').update(text, 'utf8').digest('hex');
}

function nonEmptyText(val) {
  return typeof val === 'string' && val.trim().length > 0 && !/【待填/.test(val);
}

export function validateCandidatesInput(ordinaryCandidates, emotionalCandidate) {
  if (!Array.isArray(ordinaryCandidates) || ordinaryCandidates.length !== 6) {
    throw new Error('ordinaryCandidates 必須恰好有 6 個普通候選');
  }
  const seenIds = new Set();
  for (const c of ordinaryCandidates) {
    if (!c || !Number.isInteger(c.id) || c.id < 1 || c.id > 6) {
      throw new Error(`普通候選 ID 必須為 1～6 整數，收到：${c?.id}`);
    }
    if (seenIds.has(c.id)) {
      throw new Error(`普通候選 ID 重複：${c.id}`);
    }
    seenIds.add(c.id);
    if (!nonEmptyText(c.text) || !nonEmptyText(c.action) || !nonEmptyText(c.tradeoff)) {
      throw new Error(`普通候選 ${c.id} 的 text / action / tradeoff 不可空白或含佔位符`);
    }
  }
  if (!emotionalCandidate || !nonEmptyText(emotionalCandidate.text) || !nonEmptyText(emotionalCandidate.action) || !nonEmptyText(emotionalCandidate.tradeoff)) {
    throw new Error('emotionalCandidate 的 text / action / tradeoff 不可空白或含佔位符');
  }
}

export function selectAndShuffleChoices({ ordinaryCandidates, emotionalCandidate, seed } = {}) {
  validateCandidatesInput(ordinaryCandidates, emotionalCandidate);
  const actualSeed = seed === undefined ? randomInt(0, 0x100000000) : seed;
  if (!Number.isInteger(actualSeed) || actualSeed < 0 || actualSeed >= 0x100000000) {
    throw new RangeError(`隨機種子必須為 uint32 整數，收到：${actualSeed}`);
  }

  const rng = createRandom(actualSeed);

  // 1. True 6-choose-3 via partial Fisher-Yates on sorted-by-id copy
  const pool = [...ordinaryCandidates].sort((a, b) => a.id - b.id);
  for (let i = 0; i < 3; i++) {
    const j = rng.integer(i, pool.length - 1);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const selectedOrdinary = pool.slice(0, 3);
  const selectedIds = selectedOrdinary.map(c => c.id);

  // 2. Combine with 1 emotional candidate -> 4 items
  const combined = [
    ...selectedOrdinary.map(c => ({ ...c, emotional: false })),
    { id: 'emotional', text: emotionalCandidate.text, action: emotionalCandidate.action, tradeoff: emotionalCandidate.tradeoff, emotional: true },
  ];

  // 3. True Fisher-Yates shuffle of all 4 items
  for (let i = combined.length - 1; i > 0; i--) {
    const j = rng.integer(0, i);
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }

  // 4. Fix to A, B, C, D
  const finalChoiceMap = {};
  const choices = {};
  for (let i = 0; i < 4; i++) {
    const letter = CHOICE_LETTERS[i];
    const item = combined[i];
    finalChoiceMap[letter] = item.id;
    choices[letter] = {
      choiceId: letter,
      candidateId: item.id,
      text: item.text.trim(),
      emotional: item.emotional,
      action: item.action.trim(),
      tradeoff: item.tradeoff.trim(),
    };
  }

  return {
    ordinaryCandidates: ordinaryCandidates.map(c => ({ id: c.id, text: c.text.trim(), action: c.action.trim(), tradeoff: c.tradeoff.trim() })),
    emotionalCandidate: { text: emotionalCandidate.text.trim(), action: emotionalCandidate.action.trim(), tradeoff: emotionalCandidate.tradeoff.trim() },
    rng: { algorithm: 'mulberry32', version: 1, seed: actualSeed },
    selectedIds,
    finalChoiceMap,
    choices,
  };
}

export function replayChoiceSelection(selection) {
  if (!selection || typeof selection !== 'object') {
    throw new Error('缺少 ordinaryChoiceSelection');
  }
  const { ordinaryCandidates, emotionalCandidate, rng, selectedIds, finalChoiceMap } = selection;
  if (!rng || rng.algorithm !== 'mulberry32' || rng.version !== 1 || !Number.isInteger(rng.seed)) {
    throw new Error('抽選證據缺少有效的 mulberry32 v1 隨機種子');
  }
  const replayed = selectAndShuffleChoices({
    ordinaryCandidates,
    emotionalCandidate,
    seed: rng.seed,
  });
  if (JSON.stringify(replayed.selectedIds) !== JSON.stringify(selectedIds)) {
    throw new Error(`重現抽選失敗：selectedIds 不符（預期 ${JSON.stringify(replayed.selectedIds)}，實得 ${JSON.stringify(selectedIds)}）`);
  }
  if (JSON.stringify(replayed.finalChoiceMap) !== JSON.stringify(finalChoiceMap)) {
    throw new Error(`重現洗牌失敗：finalChoiceMap 不符（預期 ${JSON.stringify(replayed.finalChoiceMap)}，實得 ${JSON.stringify(finalChoiceMap)}）`);
  }
  return replayed;
}

export function computeOptionsDigest(choiceRows) {
  const canonical = CHOICE_LETTERS.map(letter => {
    const row = choiceRows.find(r => r.id === letter);
    if (!row) return `${letter}|MISSING`;
    return `${letter}|${row.text}|${row.emotional}|${row.action}|${row.tradeoff}`;
  }).join('\n');
  return sha256(canonical);
}

export function parseOptionsTableFromMarkdown(mdText) {
  const s4 = mdText.split(/^## 4｜[^\r\n]*/m)[1]?.split(/^## 5｜/m, 1)[0] ?? '';
  const optBlock = s4.split(/^### 四個最終教師選項[^\r\n]*/m)[1] ?? '';
  const rows = optBlock
    .split(/\r?\n/)
    .filter(line => /^\s*\|.*\|\s*$/.test(line))
    .map(line => line.trim().slice(1, -1).split('|').map(c => c.trim()))
    .filter(cells => /^[ABCD]$/.test(cells[0]));
  return rows.map(cells => ({
    id: cells[0],
    text: cells[1] ?? '',
    emotional: cells[2] ?? '',
    action: cells[3] ?? '',
    tradeoff: cells[4] ?? '',
  }));
}

export function replaceOptionsTableInMarkdown(mdText, choices) {
  const headerRe = /(### 四個最終教師選項\r?\n\r?\n\| 選項ID \| 玩家可見短句 \| emotional \| 教師已完成的客觀行動 \| 優點及代價（不顯示玩家） \|\r?\n\| --- \| --- \| --- \| --- \| --- \|\r?\n)(?:\| [ABCD] \|[^\r\n]*\r?\n?){4}/;
  if (!headerRe.test(mdText)) {
    throw new Error('Markdown 缺少標準「### 四個最終教師選項」表格格式');
  }
  const newRows = CHOICE_LETTERS.map(letter => {
    const c = choices[letter];
    return `| ${letter} | ${c.text} | ${c.emotional} | ${c.action} | ${c.tradeoff} |`;
  }).join('\n');
  return mdText.replace(headerRe, `$1${newRows}\n`);
}

export async function applyStage1SelectionToFiles({
  mdPath,
  evidencePath,
  ordinaryCandidates,
  emotionalCandidate,
  seed,
  reselect = false,
}) {
  const [mdText, evText] = await Promise.all([
    readFile(mdPath, 'utf8'),
    readFile(evidencePath, 'utf8'),
  ]);
  const evidence = JSON.parse(evText);

  if (evidence.stages?.stage1?.ordinaryChoiceSelection && !reselect) {
    throw new Error(`${evidence.storyId} 已有保存的抽選證據，禁止無聲覆蓋；若屬定向回修請明確指定 --reselect`);
  }

  const result = selectAndShuffleChoices({ ordinaryCandidates, emotionalCandidate, seed });
  const updatedMd = replaceOptionsTableInMarkdown(mdText, result.choices);
  const parsedRows = parseOptionsTableFromMarkdown(updatedMd);
  const optionsDigest = computeOptionsDigest(parsedRows);
  const newSha = sha256(updatedMd);

  evidence.status = evidence.status === 'prebuild-unstarted' ? 'stage1-in-progress' : evidence.status;
  evidence.stages.stage1.status = 'in_progress';
  evidence.stages.stage1.sourceVersion = newSha;
  evidence.stages.stage1.ordinaryChoiceSelection = {
    ordinaryCandidates: result.ordinaryCandidates,
    emotionalCandidate: result.emotionalCandidate,
    rng: result.rng,
    selectedIds: result.selectedIds,
    finalChoiceMap: result.finalChoiceMap,
    optionsDigest,
  };
  evidence.sourceVersion.draftSha256 = newSha;

  await Promise.all([
    writeFile(mdPath, updatedMd, 'utf8'),
    writeFile(evidencePath, JSON.stringify(evidence, null, 2) + '\n', 'utf8'),
  ]);

  return { storyId: evidence.storyId, selectedIds: result.selectedIds, finalChoiceMap: result.finalChoiceMap, seed: result.rng.seed, draftSha256: newSha };
}

function tableRows(text) {
  return text
    .split(/\r?\n/)
    .filter(line => /^\s*\|.*\|\s*$/.test(line))
    .map(line => line.trim().slice(1, -1).split('|').map(cell => cell.trim()));
}

export function validateG1752Stage1Story({ mdText, evidence, filePath, expectedAssignment }) {
  const errors = [];
  const addErr = (location, detail) => errors.push({ storyId: expectedAssignment?.storyId ?? basename(filePath, '.md'), location, detail });

  // 1. Filename & directory consistency
  const fileBase = basename(filePath, '.md');
  const batchDir = basename(dirname(filePath));
  if (!/^G\d{4}$/.test(fileBase)) {
    addErr('filename', `檔名必須為 Gxxxx.md（不可為舊 G-0001），實際為 ${basename(filePath)}`);
  }
  if (expectedAssignment) {
    if (fileBase !== expectedAssignment.storyId) {
      addErr('filename', `檔名 ${fileBase} 與預期 ${expectedAssignment.storyId} 不符`);
    }
    if (batchDir !== expectedAssignment.folder) {
      addErr('directory', `目錄 ${batchDir} 與預期 ${expectedAssignment.folder} 不符`);
    }
  }

  // 2. Reject T-style artifacts (4x8 matrix, R5-R8, V3)
  if (/### 四選項對八共用結果的權重/.test(mdText) || /^### R[5-8]｜/m.test(mdText) || /^\| E \|/m.test(mdText)) {
    addErr('format', 'G1752 不可包含 T 專屬 4×8 權重矩陣、R5～R8 或 V3 選項 E');
  }

  // 3. 5-section structure
  const headings = [...mdText.matchAll(/^## ([1-5])｜[^\r\n]+/gm)];
  if (headings.length !== 5 || headings.some((h, i) => Number(h[1]) !== i + 1)) {
    addErr('sections', '必須恰好包含依序排列的 ## 1｜～## 5｜ 五個正式區塊');
  }
  const s1 = mdText.split(/^## 1｜[^\r\n]*/m)[1]?.split(/^## 2｜/m, 1)[0] ?? '';
  const s2 = mdText.split(/^## 2｜[^\r\n]*/m)[1]?.split(/^## 3｜/m, 1)[0] ?? '';
  const s3 = mdText.split(/^## 3｜[^\r\n]*/m)[1]?.split(/^## 4｜/m, 1)[0] ?? '';
  const s4 = mdText.split(/^## 4｜[^\r\n]*/m)[1]?.split(/^## 5｜/m, 1)[0] ?? '';
  const s5 = mdText.split(/^## 5｜[^\r\n]*/m)[1] ?? '';

  // Parse Section 1 metadata
  const info = {};
  for (const [label, val] of tableRows(s1)) {
    const key = label.replaceAll('`', '').match(/^([a-z_]+)｜/)?.[1];
    if (key) info[key] = val;
  }
  if (expectedAssignment) {
    if (info.story_id !== expectedAssignment.storyId) addErr('section1.story_id', `story_id 應為 ${expectedAssignment.storyId}，實為 ${info.story_id}`);
    if (info.seed_id !== expectedAssignment.seedId) addErr('section1.seed_id', `seed_id 應為 ${expectedAssignment.seedId}，實為 ${info.seed_id}`);
  }
  if (info.event_type !== 'G') addErr('section1.event_type', `event_type 應為 G，實為 ${info.event_type}`);
  const tags = (info.tags ?? '').split(/[、，,;\s／/]+/).filter(Boolean);
  if (!tags.length || new Set(tags).size !== tags.length || tags.some(t => !VALID_TAGS.has(t))) {
    addErr('section1.tags', `tags 必須為不重複的 G01～G11 標籤，實為 ${info.tags}`);
  }
  if (info.required_window !== '無' || info.quota_date !== '無') {
    addErr('section1.window', 'G 故事 required_window 與 quota_date 必須為「無」');
  }

  // Parse Section 3 codes
  const codesMatch = s3.match(/^- \*\*本篇四碼\*\*：(.+)$/m);
  const mdCodes = (codesMatch?.[1] ?? '').split(/[／/、,\s]+/).filter(Boolean);
  if (expectedAssignment && JSON.stringify(mdCodes) !== JSON.stringify(expectedAssignment.codes)) {
    addErr('section3.codes', `四碼應為 ${expectedAssignment.codes.join('／')}，實為 ${mdCodes.join('／')}`);
  }

  // 4. Evidence JSON checks
  if (!evidence || typeof evidence !== 'object') {
    addErr('evidence', '缺少對應驗收紀錄 JSON');
    return { state: 'invalid', errors };
  }
  if (expectedAssignment) {
    if (evidence.storyId !== expectedAssignment.storyId || evidence.seedId !== expectedAssignment.seedId || JSON.stringify(evidence.codes) !== JSON.stringify(expectedAssignment.codes)) {
      addErr('evidence.identity', '驗收 JSON 的 storyId / seedId / codes 與固定種子不符');
    }
  }
  const actualSha = sha256(mdText);
  if (evidence.sourceVersion?.draftSha256 !== actualSha) {
    addErr('evidence.sourceVersion', '原稿內容已變更但驗收 JSON 的 draftSha256 未同步更新（舊證據不可冒充新版本有效）');
  }

  // Formal approval isolation: Stage 1 validator must reject fabricated Stage 3 approval
  const s3Ev = evidence.stages?.stage3;
  if (s3Ev?.semanticApproved === true || s3Ev?.avgValidated === true || s3Ev?.reviewer !== null || s3Ev?.approvedAt !== null) {
    addErr('evidence.stage3', '階段一工作草稿不得預填或冒充階段三核准狀態');
  }

  const isPrebuild = evidence.status === 'prebuild-unstarted' && evidence.stages?.stage1?.status === 'not_started';
  const options = parseOptionsTableFromMarkdown(mdText);
  if (options.length !== 4 || options.map(o => o.id).join('') !== 'ABCD') {
    addErr('section4.options', '第4區必須包含 A、B、C、D 四列選項');
  }

  if (isPrebuild) {
    if (evidence.stages.stage1.ordinaryChoiceSelection !== null || evidence.stages.stage1.consequenceDirections !== null) {
      addErr('evidence.prebuild', 'prebuild-unstarted 狀態不得預填抽選或後果方向');
    }
    for (const opt of options) {
      if (!/【待填/.test(opt.text) || !/【待填/.test(opt.emotional)) {
        addErr('section4.prebuild', `預建未開始草稿的選項 ${opt.id} 不得預填正式選項或情緒標記`);
      }
    }
    return { state: errors.length ? 'invalid' : 'prebuild-unstarted', errors };
  }

  // Not prebuild: validate selection if present
  const selection = evidence.stages?.stage1?.ordinaryChoiceSelection;
  if (selection !== null && selection !== undefined) {
    if (evidence.stages.stage1.sourceVersion !== actualSha) {
      addErr('evidence.stage1.sourceVersion', 'stage1.sourceVersion 與目前原稿 SHA-256 不符，改寫後須重新驗證／抽選');
    }
    try {
      const replayed = replayChoiceSelection(selection);
      const digest = computeOptionsDigest(options);
      if (selection.optionsDigest !== digest) {
        addErr('section4.optionsDigest', '第4區選項表格內容與抽選證據 optionsDigest 不符（改寫選項後舊證據無效）');
      }
      for (const letter of CHOICE_LETTERS) {
        const row = options.find(o => o.id === letter);
        const expectedEmotional = String(replayed.choices[letter].emotional);
        if (row && row.emotional !== expectedEmotional) {
          addErr(`section4.option.${letter}`, `選項 ${letter} 的 emotional 應為 ${expectedEmotional}，實為 ${row.emotional}`);
        }
      }
    } catch (err) {
      addErr('evidence.ordinaryChoiceSelection', err.message);
    }
  }

  // Check completeness for Stage 1 Passed vs Stage 1 In Progress
  const incompleteReasons = [];
  if (!nonEmptyText(info.required_conditions)) incompleteReasons.push('section1.required_conditions 仍含佔位或空白');
  for (const [k, v] of tableRows(s2)) {
    if (['事件起因', '核心衝突', '導師困境', '故事獨特性'].includes(k) && !nonEmptyText(v)) {
      incompleteReasons.push(`section2.${k} 未完成`);
    }
  }
  const roleRows = tableRows(s3);
  if (roleRows.some(r => r.some(cell => /【待填/.test(cell)))) {
    incompleteReasons.push('section3 角色槽位或四碼因果仍含【待填】');
  }
  const openingBlock = s4.match(/### 開場[^\r\n]*\r?\n([\s\S]*?)(?=### 四個最終教師選項)/)?.[1] ?? '';
  if (!nonEmptyText(openingBlock) || !/- \*\*P01｜/.test(openingBlock)) {
    incompleteReasons.push('section4.opening 尚未完成 P01 自然開場');
  }
  if (options.some(o => !nonEmptyText(o.text) || !['true', 'false'].includes(o.emotional) || !nonEmptyText(o.action) || !nonEmptyText(o.tradeoff))) {
    incompleteReasons.push('section4.options 四選項尚未完整填寫');
  } else if (options.filter(o => o.emotional === 'true').length !== 1) {
    addErr('section4.emotionalCount', '四選項必須恰好有一個 emotional 為 true');
  }
  if (!selection) {
    incompleteReasons.push('evidence.stage1.ordinaryChoiceSelection 尚未執行抽選');
  }
  const dirs = evidence.stages?.stage1?.consequenceDirections;
  if (!dirs || typeof dirs !== 'object' || CHOICE_LETTERS.some(l => !nonEmptyText(typeof dirs[l] === 'string' ? dirs[l] : JSON.stringify(dirs[l] ?? '')))) {
    incompleteReasons.push('evidence.stage1.consequenceDirections 四條後果可行方向尚未補齊');
  }

  // Stage 1 boundary: Section 5 must remain Stage 2 placeholder if checking Stage 1
  if (!/【待填：階段二/.test(s5)) {
    addErr('section5.boundary', '階段一草稿的第5區應保留階段二佔位，不可提前撰寫完整結局或數值');
  }

  if (evidence.stages?.stage1?.status === 'passed' && incompleteReasons.length > 0) {
    for (const reason of incompleteReasons) {
      addErr('stage1.incomplete', `標記為 stage1 passed 但仍有未完成項目：${reason}`);
    }
  }

  if (errors.length > 0) {
    return { state: 'invalid', errors };
  }
  return {
    state: incompleteReasons.length === 0 ? 'stage1-passed' : 'stage1-in-progress',
    incompleteReasons,
    errors: [],
  };
}
