#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'reviews/stage5-story-audit';
const BASELINE_COMMIT = '0d80d456e2905b35db096e9179069d783a66a249';
const MANIFEST = JSON.parse(fs.readFileSync(path.join(BASE, 'story-manifest.json'), 'utf8'));
const TERMS = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'];
const TERM_TARGETS = { T1: 174, T2: 42, T3: 90, T4: 54, T5: 138, T6: 150 };

const manifestMap = new Map(MANIFEST.stories.map(s => [s.storyId, s]));

// Load all batch files
const batchDir = path.join(BASE, 'batches');
const batchFiles = fs.existsSync(batchDir)
  ? fs.readdirSync(batchDir).filter(f => f.endsWith('.json')).sort()
  : [];

const coverageMap = new Map();
const findingsMap = new Map();
const observationsList = [];

// Pre-populate with default "尚未檢查" for all 648 stories
for (const s of MANIFEST.stories) {
  coverageMap.set(s.storyId, {
    storyId: s.storyId,
    term: s.term,
    relPath: s.relPath,
    blobSha: s.blobSha,
    pStatus: '尚未檢查',
    choicesStatus: { A: '尚未檢查', B: '尚未檢查', C: '尚未檢查', D: '尚未檢查' },
    resultsStatus: { R1: '尚未檢查', R2: '尚未檢查', R3: '尚未檢查', R4: '尚未檢查', R5: '尚未檢查', R6: '尚未檢查', R7: '尚未檢查', R8: '尚未檢查' },
    avgStatus: '尚未檢查',
    overallStatus: '尚未檢查',
    round2Status: (s.term === 'T1' || s.term === 'T2') ? '尚未檢查' : '不適用',
    aCount: 0,
    bCount: 0,
    cCount: 0,
    findingIds: [],
    finalStatus: '尚未檢查',
    unverifiedItems: ['尚未開始審查'],
  });
}

// Merge batch files (Round 1 first, then Round 2 if any)
const batches = batchFiles.map(f => ({ file: f, data: JSON.parse(fs.readFileSync(path.join(batchDir, f), 'utf8')) }));
batches.sort((a, b) => (a.data.round || 1) - (b.data.round || 1));

for (const { file, data } of batches) {
  for (const cov of (data.coverage || [])) {
    const m = manifestMap.get(cov.storyId);
    if (!m) {
      console.error(`Unknown storyId ${cov.storyId} in ${file}`);
      process.exit(1);
    }
    const prev = coverageMap.get(cov.storyId);
    const merged = {
      ...prev,
      ...cov,
      blobSha: m.blobSha,
      relPath: m.relPath,
    };
    if (data.round === 2) {
      // Merge findingIds from round 1 and round 2
      const combinedIds = Array.from(new Set([...(prev.findingIds || []), ...(cov.findingIds || [])]));
      merged.findingIds = combinedIds;
    }
    coverageMap.set(cov.storyId, merged);
  }
  for (const fnd of (data.findings || [])) {
    const requiredKeys = [
      'findingId', 'term', 'storyId', 'severity', 'category', 'file',
      'location', 'excerpt', 'description', 'rationale', 'sopReference',
      'suggestedFix', 'preserveContent', 'syncAvg', 'step2FixStatus', 'step2VerifyStatus'
    ];
    for (const k of requiredKeys) {
      if (fnd[k] === undefined || fnd[k] === null || fnd[k] === '') {
        console.error(`Finding ${fnd.findingId || '?'} in ${file} missing required field: ${k}`);
        process.exit(1);
      }
    }
    findingsMap.set(fnd.findingId, fnd);
  }
  for (const obs of (data.observations || [])) {
    observationsList.push(obs);
  }
}

// Recompute exact A/B/C counts per story from findingsMap and observationsList
const obsByStory = new Map();
for (const o of observationsList) {
  if (!obsByStory.has(o.storyId)) obsByStory.set(o.storyId, []);
  obsByStory.get(o.storyId).push(o);
}

const findingsByStory = new Map();
for (const f of findingsMap.values()) {
  if (!findingsByStory.has(f.storyId)) findingsByStory.set(f.storyId, []);
  findingsByStory.get(f.storyId).push(f);
}

for (const [sid, cov] of coverageMap.entries()) {
  const sf = findingsByStory.get(sid) || [];
  const so = obsByStory.get(sid) || [];
  cov.findingIds = sf.map(f => f.findingId).sort();
  cov.aCount = sf.filter(f => f.severity === 'A').length;
  cov.bCount = sf.filter(f => f.severity === 'B').length;
  cov.cCount = so.length;

  // Normalize finalStatus consistency
  if (cov.overallStatus === 'completed') {
    if ((cov.term === 'T1' || cov.term === 'T2') && cov.round2Status !== 'completed') {
      cov.finalStatus = '部分完成';
      if (!cov.unverifiedItems || cov.unverifiedItems.length === 0) {
        cov.unverifiedItems = ['T1/T2 第二輪複核尚未完成'];
      }
    } else {
      cov.unverifiedItems = [];
      cov.finalStatus = (cov.aCount > 0 || cov.bCount > 0) ? '完整審查完成，但有待修正問題' : '完整審查通過';
    }
  }
}

// Write per-term files and compute stats
const termStats = {};
const allFindings = Array.from(findingsMap.values()).sort((a, b) => a.findingId.localeCompare(b.findingId));
const allCoverage = Array.from(coverageMap.values()).sort((a, b) => a.storyId.localeCompare(b.storyId));

for (const t of TERMS) {
  const tCov = allCoverage.filter(c => c.term === t);
  const tFnd = allFindings.filter(f => f.term === t);
  const tObs = observationsList.filter(o => o.storyId.startsWith(t));
  const r1Done = tCov.filter(c => c.overallStatus === 'completed').length;
  const r2Done = (t === 'T1' || t === 'T2') ? tCov.filter(c => c.round2Status === 'completed').length : null;
  const fullDone = tCov.filter(c => c.finalStatus === '完整審查通過' || c.finalStatus === '完整審查完成，但有待修正問題').length;
  const passed = tCov.filter(c => c.finalStatus === '完整審查通過').length;
  const needsFix = tCov.filter(c => c.finalStatus === '完整審查完成，但有待修正問題').length;
  const aTotal = tFnd.filter(f => f.severity === 'A').length;
  const bTotal = tFnd.filter(f => f.severity === 'B').length;
  const cTotal = tObs.length;

  termStats[t] = {
    total: TERM_TARGETS[t],
    actualFiles: tCov.length,
    r1Done,
    r2Done,
    fullDone,
    passed,
    needsFix,
    aTotal,
    bTotal,
    cTotal,
  };

  fs.writeFileSync(path.join(BASE, t, 'coverage.json'), JSON.stringify(tCov, null, 2));
  fs.writeFileSync(path.join(BASE, t, 'findings.json'), JSON.stringify(tFnd, null, 2));

  // Per-term report.md
  const catCounts = {};
  for (const f of tFnd) catCounts[f.category] = (catCounts[f.category] || 0) + 1;
  const catRows = Object.entries(catCounts).sort((a, b) => b[1] - a[1])
    .map(([k, v]) => `| ${k} | ${v} |`).join('\n') || '| （尚無） | 0 |';

  const r2Line = (t === 'T1' || t === 'T2')
    ? `- 第二輪複核完成：${r2Done} / ${TERM_TARGETS[t]}\n`
    : '';

  const reportMd = `# ${t} 故事品質與 AVG 一致性審查報告

- 基準 Commit SHA：\`${BASELINE_COMMIT}\`
- 故事總數：${tCov.length}（預期 ${TERM_TARGETS[t]}）
- 第一輪完成：${r1Done} / ${TERM_TARGETS[t]}
${r2Line}- 正式完成（含必要複核）：${fullDone} / ${TERM_TARGETS[t]}
- 完整審查通過：${passed}
- 有待修正問題：${needsFix}
- 問題統計：A 級 ${aTotal} 項、B 級 ${bTotal} 項、C 級觀察 ${cTotal} 項

## 問題類型分布

| 問題類型 | 數量 |
|---|---:|
${catRows}

## A 級與 B 級問題摘要

${tFnd.length === 0 ? '（尚無已記錄問題）' : tFnd.map(f => `- **${f.findingId}** [${f.severity}] ${f.storyId} (${f.location})｜${f.category}：${f.description}`).join('\n')}
`;
  fs.writeFileSync(path.join(BASE, t, 'report.md'), reportMd);
}

// Write all-findings.json
fs.writeFileSync(path.join(BASE, 'all-findings.json'), JSON.stringify(allFindings, null, 2));

// Write all-story-coverage.csv
const csvHeader = 'term,story_id,rel_path,blob_sha,p_status,choices_status,results_status,avg_status,overall_status,round2_status,a_count,b_count,c_count,finding_ids,final_status,unverified_items';
const csvEsc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
const csvRows = allCoverage.map(c => [
  c.term,
  c.storyId,
  c.relPath,
  c.blobSha,
  c.pStatus,
  Object.values(c.choicesStatus).every(v => v === 'completed') ? 'completed' : 'incomplete',
  Object.values(c.resultsStatus).every(v => v === 'completed') ? 'completed' : 'incomplete',
  c.avgStatus,
  c.overallStatus,
  c.round2Status,
  c.aCount,
  c.bCount,
  c.cCount,
  (c.findingIds || []).join(';'),
  c.finalStatus,
  (c.unverifiedItems || []).join(';'),
].map(csvEsc).join(','));
fs.writeFileSync(path.join(BASE, 'all-story-coverage.csv'), [csvHeader, ...csvRows].join('\n') + '\n');

// Write review-index.json
const totalCompletedR1 = allCoverage.filter(c => c.overallStatus === 'completed').length;
const totalFormalDone = allCoverage.filter(c => c.finalStatus === '完整審查通過' || c.finalStatus === '完整審查完成，但有待修正問題').length;
const pendingIds = allCoverage.filter(c => c.overallStatus !== 'completed').map(c => c.storyId);
const reviewIndex = {
  baselineCommitSha: BASELINE_COMMIT,
  workBranch: 'work/t1-t6-natural-dialogue-pass-20261125',
  totalStories: allCoverage.length,
  r1CompletedCount: totalCompletedR1,
  formalCompletedCount: totalFormalDone,
  aFindingsCount: allFindings.filter(f => f.severity === 'A').length,
  bFindingsCount: allFindings.filter(f => f.severity === 'B').length,
  cObservationsCount: observationsList.length,
  lastBatches: batchFiles,
  termStats,
};
fs.writeFileSync(path.join(BASE, 'review-index.json'), JSON.stringify(reviewIndex, null, 2));

// Write PROGRESS.md
const progressMd = `# 第五階段・第一步：T1～T6 全故事獨立總檢進度

- **審查基準 Commit SHA**：\`${BASELINE_COMMIT}\`
- **工作分支**：\`work/t1-t6-natural-dialogue-pass-20261125\`
- **總故事數**：${allCoverage.length} / 648
- **第一輪已審查**：${totalCompletedR1} / 648
- **正式完成（T1/T2 含第二輪複核）**：${totalFormalDone} / 648
- **已確認問題數**：A 級 ${reviewIndex.aFindingsCount} 項、B 級 ${reviewIndex.bFindingsCount} 項、C 級觀察 ${reviewIndex.cObservationsCount} 項
- **最後保存批次**：${batchFiles.length ? batchFiles[batchFiles.length - 1] : '無'}
- **下一個應執行工作**：${pendingIds.length ? `繼續審查 ${pendingIds[0]}（尚餘 ${pendingIds.length} 篇第一輪）` : '檢查 T1/T2 第二輪複核及產出最終報告'}

## 各學期進度

| 學期 | 總數 | 第一輪完成 | 第二輪完成 (T1/T2) | 正式完成 | A 級 | B 級 | C 級 |
|---|---:|---:|---:|---:|---:|---:|---:|
${TERMS.map(t => {
  const s = termStats[t];
  return `| ${t} | ${s.total} | ${s.r1Done} | ${s.r2Done === null ? '不適用' : s.r2Done} | ${s.fullDone} | ${s.aTotal} | ${s.bTotal} | ${s.cTotal} |`;
}).join('\n')}
`;
fs.writeFileSync(path.join(BASE, 'PROGRESS.md'), progressMd);

// Write correction-list.md
const aList = allFindings.filter(f => f.severity === 'A');
const bList = allFindings.filter(f => f.severity === 'B');
const corrMd = `# 第五階段・第二步正式施工修正清單

> 本清單由第一步審查自動彙整，僅含 A 級與 B 級問題（不含 C 級觀察）。

- A 級（明確錯誤，必須修正）：${aList.length} 項
- B 級（品質問題，建議修正）：${bList.length} 項

## A 級修正清單

${aList.length === 0 ? '（尚無）' : aList.map(f => `### ${f.findingId}｜${f.storyId}（${f.location}）
- **問題類型**：${f.category}
- **檔案**：\`${f.file}\`
- **問題說明**：${f.description}
- **判定理由**：${f.rationale}
- **建議修正**：${f.suggestedFix}
- **必須保留**：${f.preserveContent}
- **同步修正 AVG**：${f.syncAvg ? '是' : '否'}
- **修正狀態**：${f.step2FixStatus}｜**驗收狀態**：${f.step2VerifyStatus}
`).join('\n')}

## B 級修正清單

${bList.length === 0 ? '（尚無）' : bList.map(f => `### ${f.findingId}｜${f.storyId}（${f.location}）
- **問題類型**：${f.category}
- **檔案**：\`${f.file}\`
- **問題說明**：${f.description}
- **建議修正**：${f.suggestedFix}
- **必須保留**：${f.preserveContent}
- **同步修正 AVG**：${f.syncAvg ? '是' : '否'}
`).join('\n')}
`;
fs.writeFileSync(path.join(BASE, 'correction-list.md'), corrMd);

console.log(`Merged ${batchFiles.length} batches: R1=${totalCompletedR1}/648, Formal=${totalFormalDone}/648, A=${reviewIndex.aFindingsCount}, B=${reviewIndex.bFindingsCount}, C=${reviewIndex.cObservationsCount}`);
