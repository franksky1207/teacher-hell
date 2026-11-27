#!/usr/bin/env node
/**
 * Batch 1: Pre-build 1,752 unfinished Gxxxx.md drafts and 1,752 evidence/Gxxxx.json files
 * across the 73 batch directories in content/events-v1/G/.
 * Does NOT alter 故事主題與摘要規劃.md, T648, or official tag ledgers.
 */
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const G_ROOT = join(ROOT, 'content/events-v1/G');
const SEEDS_PATH = join(ROOT, 'data/g1752-fixed-seed-assignments.json');

function sha256(text) {
  return createHash('sha256').update(text, 'utf8').digest('hex');
}

function extractField(block, label) {
  const re = new RegExp(`^- \\*\\*${label}\\*\\*：(.+)$`, 'm');
  const m = block.match(re);
  if (!m) throw new Error(`Missing field "${label}"`);
  return m[1].trim();
}

function parsePlanningBatch(markdown) {
  const headings = [...markdown.matchAll(/^### (G\d{4})｜([^\r\n]+)/gm)];
  const map = new Map();
  for (let i = 0; i < headings.length; i++) {
    const storyId = headings[i][1];
    const headingTitle = headings[i][2].trim();
    const start = headings[i].index;
    const end = headings[i + 1]?.index ?? markdown.length;
    const block = markdown.slice(start, end);

    const declaredId = extractField(block, '正式故事 ID').replace(/`/g, '');
    const seedId = extractField(block, '固定種子 ID').replace(/`/g, '');
    const codesRaw = extractField(block, '原始四碼').replace(/`/g, '');
    const codes = codesRaw.split(/[、,，\s]+/).filter(Boolean);
    const title = extractField(block, '預定故事標題');
    const cause = extractField(block, '事件起因');
    const conflict = extractField(block, '核心衝突');
    const dilemma = extractField(block, '導師困境');
    const uniqueness = extractField(block, '故事獨特性');
    const causalPlanRaw = extractField(block, '四碼因果規劃');
    const roleConfig = extractField(block, '人物配置與必要資格');
    const preconditions = extractField(block, '必要前提與演出限制');
    const tagsRaw = extractField(block, '規劃題材標籤');
    const tags = tagsRaw.split(/[、,，\s／/]+/).filter(Boolean);

    if (declaredId !== storyId) {
      throw new Error(`Story ID mismatch in planning MD: ${storyId} vs ${declaredId}`);
    }
    if (codes.length !== 4) {
      throw new Error(`Expected 4 codes for ${storyId}, got ${codes.length}`);
    }

    const causalParts = causalPlanRaw.split(/[；;]/).map(s => s.trim()).filter(Boolean);
    if (causalParts.length !== 4) {
      throw new Error(`Expected 4 causal parts for ${storyId}, got ${causalParts.length}`);
    }
    const codeCausality = causalParts.map((part, idx) => {
      const m = part.match(/^`?(\d+-\d+)`?[：:]([\s\S]+)$/);
      if (!m || m[1] !== codes[idx]) {
        throw new Error(`Causal code mismatch for ${storyId} at index ${idx}: ${part}`);
      }
      return { code: m[1], detail: m[2].trim() };
    });

    map.set(storyId, {
      storyId,
      headingTitle,
      seedId,
      codes,
      title,
      cause,
      conflict,
      dilemma,
      uniqueness,
      codeCausality,
      roleConfig,
      preconditions,
      tags,
      tagsRaw,
    });
  }
  return map;
}

function renderDraftMarkdown(plan) {
  const codesLine = plan.codes.join('／');
  const codeRows = plan.codeCausality
    .map(c => `| ${c.code} | 【待填：階段一確立合法持碼槽位】 | 規劃因果：${c.detail} |`)
    .join('\n');

  return `# ${plan.title}

## 1｜故事基本資料

| 欄位鍵 | 填寫值 |
| --- | --- |
| \`story_id\`｜正式故事ID | ${plan.storyId} |
| \`seed_id\`｜種子ID | ${plan.seedId} |
| \`event_type\`｜事件類型 | G |
| \`tags\`｜T/G共用11類多標籤 | ${plan.tagsRaw} |
| \`required_window\`｜必要合法日期／活動窗口 | 無 |
| \`quota_date\`｜配額歸屬日 | 無 |
| \`required_conditions\`｜人物／知情／日型條件 | 【待填：階段一確認】規劃前提：${plan.preconditions} |
| \`music\`｜事件配樂 | 【待填：階段三定稿前確認】 |

## 2｜四欄創意摘要

| 固定欄位 | 故事摘要 |
| --- | --- |
| 事件起因 | ${plan.cause} |
| 核心衝突 | ${plan.conflict} |
| 導師困境 | ${plan.dilemma} |
| 故事獨特性 | ${plan.uniqueness} |

## 3｜四碼種子及角色槽位

- **本篇四碼**：${codesLine}
- **常駐數值角色槽位**：

| 槽位鍵 | 人物資格／類別 | 必要在籍、關係、職權與知情限制 | 參與四碼抽選／合法結算 |
| --- | --- | --- | --- |
| 【待填：階段一確立合法槽位】 | 【待填】 | 規劃配置：${plan.roleConfig} | 【待填】 |

- **無數值情境角色**：【待填：階段一依需要填寫；不能持碼與結算】
- **四碼的必要因果用途**：

| 種子碼 | 合法持有者槽位 | 如何參與起因／衝突／人物反應／結果 |
| --- | --- | --- |
${codeRows}

## 4｜玩家可見開場與四個行動

【待填：階段三AVG】

### 開場
- **P01｜旁白／合法說話者**：【待填：階段一開場】

### 四個最終教師選項

| 選項ID | 玩家可見短句 | emotional | 教師已完成的客觀行動 | 優點及代價（不顯示玩家） |
| --- | --- | --- | --- | --- |
| A | 【待填：階段一六選三＋情緒洗牌】 | 【待填】 | 【待填】 | 【待填】 |
| B | 【待填：階段一六選三＋情緒洗牌】 | 【待填】 | 【待填】 | 【待填】 |
| C | 【待填：階段一六選三＋情緒洗牌】 | 【待填】 | 【待填】 | 【待填】 |
| D | 【待填：階段一六選三＋情緒洗牌】 | 【待填】 | 【待填】 | 【待填】 |

## 5｜四個固定結果、結算與因果

### R1｜【待填：階段二結果標題】
- **對應選項**：A
- **玩家可見結果**：【待填：階段二】
- **客觀後果**：【待填：階段二】
- **合法底層增減**：【待填：階段二】
- **玩家四狀態**（精神、熱忱、情緒、掌控）：【待填：階段二】

### R2｜【待填：階段二結果標題】
- **對應選項**：B
- **玩家可見結果**：【待填：階段二】
- **客觀後果**：【待填：階段二】
- **合法底層增減**：【待填：階段二】
- **玩家四狀態**（精神、熱忱、情緒、掌控）：【待填：階段二】

### R3｜【待填：階段二結果標題】
- **對應選項**：C
- **玩家可見結果**：【待填：階段二】
- **客觀後果**：【待填：階段二】
- **合法底層增減**：【待填：階段二】
- **玩家四狀態**（精神、熱忱、情緒、掌控）：【待填：階段二】

### R4｜【待填：階段二結果標題】
- **對應選項**：D
- **玩家可見結果**：【待填：階段二】
- **客觀後果**：【待填：階段二】
- **合法底層增減**：【待填：階段二】
- **玩家四狀態**（精神、熱忱、情緒、掌控）：【待填：階段二】
`;
}

function renderEvidenceJson(assignment, plan, draftSha256) {
  return JSON.stringify({
    schemaVersion: 1,
    storyId: assignment.storyId,
    seedId: assignment.seedId,
    codes: assignment.codes,
    batch: assignment.folder,
    sourcePath: `content/events-v1/G/${assignment.folder}/${assignment.storyId}.md`,
    planningSourcePath: `content/events-v1/G/${assignment.folder}/故事主題與摘要規劃.md`,
    plannedTags: plan.tags,
    status: 'prebuild-unstarted',
    stages: {
      stage1: {
        status: 'not_started',
        sourceVersion: null,
        checkedAt: null,
        ordinaryChoiceSelection: null,
        consequenceDirections: null,
      },
      stage2: {
        status: 'not_started',
        sourceVersion: null,
        checkedAt: null,
        resultCausality: null,
        state58Combination: null,
        nonZeroDeltaReasons: null,
      },
      stage3: {
        status: 'not_started',
        sourceVersion: null,
        checkedAt: null,
        avgValidated: false,
        semanticApproved: false,
        reviewer: null,
        approvedAt: null,
      },
    },
    sourceVersion: {
      draftSha256,
      seedAssignmentVersion: 1,
    },
  }, null, 2) + '\n';
}

async function main() {
  const seedData = JSON.parse(await readFile(SEEDS_PATH, 'utf8'));
  const assignments = seedData.assignments;
  if (!Array.isArray(assignments) || assignments.length !== 1752) {
    throw new Error(`Expected 1752 assignments, got ${assignments?.length}`);
  }

  const byFolder = new Map();
  for (const item of assignments) {
    if (!byFolder.has(item.folder)) byFolder.set(item.folder, []);
    byFolder.get(item.folder).push(item);
  }
  if (byFolder.size !== 73) {
    throw new Error(`Expected 73 folders, got ${byFolder.size}`);
  }

  let mdCount = 0;
  let jsonCount = 0;

  for (const [folder, items] of byFolder.entries()) {
    if (items.length !== 24) {
      throw new Error(`Folder ${folder} has ${items.length} assignments, expected 24`);
    }
    const batchDir = join(G_ROOT, folder);
    const evidenceDir = join(batchDir, '驗收紀錄', 'evidence');
    const planningPath = join(batchDir, '故事主題與摘要規劃.md');
    await access(planningPath);
    await mkdir(evidenceDir, { recursive: true });

    const planningMd = await readFile(planningPath, 'utf8');
    const plans = parsePlanningBatch(planningMd);
    if (plans.size !== 24) {
      throw new Error(`Planning MD in ${folder} has ${plans.size} stories, expected 24`);
    }

    for (const assignment of items) {
      const plan = plans.get(assignment.storyId);
      if (!plan) throw new Error(`Missing ${assignment.storyId} in ${planningPath}`);
      if (plan.seedId !== assignment.seedId) {
        throw new Error(`Seed mismatch for ${assignment.storyId}: ${plan.seedId} vs ${assignment.seedId}`);
      }
      if (plan.codes.join(',') !== assignment.codes.join(',')) {
        throw new Error(`Codes mismatch for ${assignment.storyId}: ${plan.codes.join(',')} vs ${assignment.codes.join(',')}`);
      }

      const mdContent = renderDraftMarkdown(plan);
      const mdPath = join(batchDir, `${assignment.storyId}.md`);
      await writeFile(mdPath, mdContent, 'utf8');
      mdCount++;

      const jsonContent = renderEvidenceJson(assignment, plan, sha256(mdContent));
      const jsonPath = join(evidenceDir, `${assignment.storyId}.json`);
      await writeFile(jsonPath, jsonContent, 'utf8');
      jsonCount++;
    }
  }

  console.log(JSON.stringify({ batches: byFolder.size, mdCount, jsonCount }, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
