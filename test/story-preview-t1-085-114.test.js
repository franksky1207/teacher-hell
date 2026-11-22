import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { validateStoryDraft, seedCodesFromMarkdown, topicIdsFromMarkdown } from '../scripts/story-draft-validator.js';
import { readTopicWindows } from '../scripts/story-windows.js';
import { compileStoryPreview } from '../src/runtime/story-preview-content.js';
import { storyVisibleLength, storyAvgVisibleLength } from '../scripts/story-visible-length.js';
import { reviewEvidence, validateCausalEvidence } from '../scripts/story-review-evidence.js';

const root = process.cwd();
const baseDir = path.join(root, 'content/events-v1/T/T1-高一上/T1-4-日本學校參訪前後');
const storyDir = path.join(baseDir, '活動前');
const evidencePath = path.join(baseDir, '驗收紀錄/活動前-085-114-逐格因果核對.json');

const seedText = fs.readFileSync(path.join(root, 'docs/事件四數值三層平衡種子2400組.md'), 'utf8');
const topicText = fs.readFileSync(path.join(root, 'docs/T1-T6-特定故事20主題與觸發日期.md'), 'utf8');
const seeds = seedCodesFromMarkdown(seedText);
const topics = topicIdsFromMarkdown(topicText);
const windows = readTopicWindows(topicText);

const evidenceAll = JSON.parse(fs.readFileSync(evidencePath, 'utf8'));
const storyIds = Array.from({ length: 30 }, (_, i) => `T1-${String(85 + i).padStart(3, '0')}`);

const forbiddenWorldRegex = /(出國|赴日|出發前|飛去|日本教室|沒有參訪資格|沒有資格|少數人接待|幾位外賓)/;
const dualNpcIds = ['T1-087', 'T1-094', 'T1-099', 'T1-103', 'T1-104', 'T1-105', 'T1-106', 'T1-108'];

test('T1-085~114: all 30 stories pass draft validator, compileStoryPreview, AVG parity, and world-setting checks', () => {
  for (const id of storyIds) {
    const md = fs.readFileSync(path.join(storyDir, `${id}.md`), 'utf8');
    assert.equal(forbiddenWorldRegex.test(md), false, `${id} contains forbidden old-setting keyword`);

    const val = validateStoryDraft(md, { stateRulesVersion: 3, stage: 'full', seeds, topics, windows });
    assert.deepEqual(val.errors, [], `${id} validateStoryDraft errors: ${JSON.stringify(val.errors)}`);
    assert.deepEqual(val.npcAudit?.warnings || [], [], `${id} npcAudit warnings: ${JSON.stringify(val.npcAudit?.warnings)}`);

    const music = md.match(/\| `music`｜事件配樂 \| (\S+) \|/)?.[1] || 'school';
    const openLines = [...md.matchAll(/^- \*\*(P\d+｜[^*]+\*\*：.+)$/gm)].map(m => `- **${m[1]}`).join('\n');
    const openText = [...md.matchAll(/^- \*\*P\d+｜[^*]+\*\*：(.+)$/gm)].map(m => m[1]).join('');
    const openLen = storyVisibleLength(openText);
    // 140 is a preferred writing target, not a hard maximum. Keep this batch's low-length regression check only.
    assert.ok(openLen >= 110, `${id} opening length ${openLen} < 110; review narrative completeness`);

    const rBlocks = [...md.matchAll(/### (R[1-8])｜([^\n]+)\n\n([\s\S]*?)(?=\n### |\n$)/g)];
    assert.equal(rBlocks.length, 8, `${id} must have 8 results`);

    const avgJson = JSON.parse(md.match(/```avg\n([\s\S]*?)\n```/)[1]);
    // Students have six facial expressions; adults use pose, never expression.
    for (const page of [...Object.values(avgJson.opening), ...Object.values(avgJson.results).flatMap(result => result.pages)]) {
      for (const actor of Object.keys(page.expression || {})) {
        assert.ok(actor.startsWith('student_'), `${id} adult/non-student ${actor} cannot use expression; use pose instead`);
      }
    }

    const results = rBlocks.map(([, rid, title, body]) => {
      const pt = body.match(/- \*\*玩家可見結果\*\*：(.+)/)[1];
      const rLen = storyVisibleLength(pt);
      assert.ok(rLen >= 110, `${id} ${rid} regression: outcome length ${rLen} < 110; review narrative completeness (not a global SOP minimum)`);
      const pages = avgJson.results[rid].pages;
      assert.ok(pages.length >= 2, `${id} ${rid} AVG must have naturally paced pages`);
      assert.equal(pages.map(p => p.text).join(''), pt, `${id} ${rid} AVG text must equal Section 5`);
      assert.equal(storyAvgVisibleLength(pages), rLen, `${id} ${rid} AVG visible length mismatch`);
      return { id: rid, title, text: pt };
    });

    const preview = compileStoryPreview({
      storyId: id,
      music,
      title: id,
      opening: openLines,
      options: ['A', 'B', 'C', 'D'].map(o => ({ id: o, text: o })),
      results,
      sourceMarkdown: md
    });
    assert.equal(preview.pages.length, 3, `${id} compiled opening must have 3 pages`);
    assert.equal(preview.resultPages.length, 8, `${id} compiled results must have 8 entries`);
    assert.ok(preview.resultPages.every((r, i) => r.length === avgJson.results[`R${i+1}`].pages.length), `${id} compiled pages must match each story-specific AVG result`);
  }
});

test('T1-085~114: regression checks for T1-104/105 scenes, T1-085 AVG alignment, and dual-NPC delta coverage', () => {
  for (const id of ['T1-104', 'T1-105']) {
    const md = fs.readFileSync(path.join(storyDir, `${id}.md`), 'utf8');
    const avgJson = JSON.parse(md.match(/```avg\n([\s\S]*?)\n```/)[1]);
    assert.equal(avgJson.opening.P01.scene, 'school:administration', `${id} must use school:administration`);
  }

  for (const id of dualNpcIds) {
    const md = fs.readFileSync(path.join(storyDir, `${id}.md`), 'utf8');
    const val = validateStoryDraft(md, { stateRulesVersion: 3, stage: 'full', seeds, topics, windows });
    assert.deepEqual(val.npcAudit?.warnings || [], [], `${id} dual-NPC must have 0 warnings`);
  }
});

test('T1-085~114: formal evidence JSON covers all 30 stories and 960 causal cells matching live matrices', () => {
  assert.equal(Object.keys(evidenceAll).length, 30);
  let totalCells = 0;
  for (const id of storyIds) {
    const ev = evidenceAll[id];
    assert.ok(ev, `Missing evidence for ${id}`);
    const md = fs.readFileSync(path.join(storyDir, `${id}.md`), 'utf8');
    const matrixLines = [...md.matchAll(/^\| ([A-D]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \| ([0124]) \|$/gm)];
    const matrix = Object.fromEntries(matrixLines.map(m => [m[1], [2, 3, 4, 5, 6, 7, 8, 9].map(i => Number(m[i]))]));

    assert.equal(ev.causal32Evidence.length, 32, `${id} must have 32 causal cells`);
    totalCells += ev.causal32Evidence.length;
    for (const cell of ev.causal32Evidence) {
      const rIdx = Number(cell.result.slice(1)) - 1;
      assert.equal(cell.weight, matrix[cell.choice][rIdx], `${id} ${cell.choice}-${cell.result} weight mismatch`);
    }

    const val = validateStoryDraft(md, { stateRulesVersion: 3, stage: 'full', seeds, topics, windows });
    reviewEvidence(ev, val.details.choiceFlags, val.details.npcAudit, 3);
    validateCausalEvidence(ev, matrix);
  }
  assert.equal(totalCells, 960);
});


test('T1-085~114: every R restores its own opening cast and result-specific expression; staff use poses', () => {
  const allowedExpressions = new Set(['calm', 'happy', 'angry', 'sad', 'surprised', 'embarrassed']);
  const allowedPoses = new Set(['neutral', 'side', 'hand-on-hip', 'arms-open', 'gesture', 'weight-shift']);
  for (const id of storyIds) {
    const md = fs.readFileSync(path.join(storyDir, `${id}.md`), 'utf8');
    const cues = JSON.parse(md.match(/```avg\n([\s\S]*?)\n```/)[1]);
    const results = storyIds && Array.from({length: 8}, (_, i) => {
      const rid = `R${i + 1}`;
      const raw = md.match(new RegExp(`### ${rid}｜[^\\n]+\\n\\n([\\s\\S]*?)(?=\\n### |\\n$)`))?.[1];
      const pt = raw?.match(/- \\*\\*玩家可見結果\\*\\*：(.+)/)?.[1];
      assert.ok(pt, `${id} ${rid} result text missing`);
      return {id: rid, title: rid, text: pt};
    });
    const detail = {
      storyId: id, title: id,
      music: md.match(/\\| `music`｜事件配樂 \\| (\\S+) \\|/)?.[1] || 'school',
      opening: [...md.matchAll(/^- \\*\\*(P\\d+｜[^*]+\\*\\*：.+)$/gm)].map(m => `- **${m[1]}`).join('\\n'),
      options: ['A','B','C','D'].map(c => ({id: c, text: c})),
      results, sourceMarkdown: md,
    };
    const preview = compileStoryPreview(detail);
    for (let i = 0; i < 8; i++) {
      const rid = `R${i + 1}`, authored = cues.results[rid].pages[0];
      const staged = preview.resultPages[i][0];
      const firstSpeaker = authored.speaker;
      if (firstSpeaker?.startsWith('student_')) {
        const expected = authored.expression?.[firstSpeaker];
        assert.ok(allowedExpressions.has(expected), `${id} ${rid} missing/invalid first-page expression`);
        const actor = staged.cast.find(a => a.role === firstSpeaker);
        assert.equal(actor?.expression, expected, `${id} ${rid} first-page actor emotion mismatches playback`);
      }
      if (firstSpeaker?.startsWith('staff_')) {
        const expected = authored.pose?.[firstSpeaker];
        assert.ok(allowedPoses.has(expected), `${id} ${rid} missing/invalid adult pose`);
        const actor = staged.cast.find(a => a.role === firstSpeaker);
        assert.equal(actor?.pose, expected, `${id} ${rid} adult pose mismatches playback`);
      }
      for (const role of Object.keys(authored.expression || {}))
        assert.ok(role.startsWith('student_'), `${id} ${rid} adult must never use expression`);
    }
  }
});
