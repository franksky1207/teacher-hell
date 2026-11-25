#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const T_DIR = path.join(ROOT, 'content/events-v1/T');

const VALID_EXPRESSIONS = new Set(['calm', 'happy', 'angry', 'sad', 'surprised', 'embarrassed']);
const VALID_ADULT_POSES = new Set(['neutral', 'side', 'hand-on-hip', 'arms-open', 'gesture', 'weight-shift']);
const VALID_PRESENTATIONS = new Set(['dialogue', 'narration', 'phone', 'chat', 'email', 'thought', undefined, null]);
const VALID_MUSIC = new Set(['school', 'conflict', 'serious', 'home', 'playful', 'touching', 'absurd']);

function walkStories(dir) {
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(walkStories(full));
    else if (/^T[1-6]-\d{3}\.md$/.test(entry.name)) out.push(full);
  }
  return out;
}

function parseStory(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const relPath = path.relative(ROOT, filePath).replace(/\\/g, '/');
  const lines = raw.split(/\r?\n/);
  const titleMatch = raw.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : '';

  const getField = (key) => {
    const re = new RegExp(`\\|\\s*\`?${key}\`?[^|]*\\|\\s*([^|\\n]+?)\\s*\\|`);
    const m = raw.match(re);
    return m ? m[1].trim() : '';
  };

  const storyId = getField('story_id') || path.basename(filePath, '.md');
  const term = storyId.slice(0, 2);
  const music = getField('music');
  const requiredWindow = getField('required_window');
  const requiredConditions = getField('required_conditions');

  // Extract roles from Section 3 table
  const roles = {};
  const sec3Match = raw.match(/## 3｜[\s\S]*?(?=\n## 4｜)/);
  if (sec3Match) {
    for (const line of sec3Match[0].split('\n')) {
      const m = line.match(/^\|\s*`?([a-z]+(?:_[a-z]+)+)`?\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|/);
      if (m) {
        roles[m[1]] = { type: m[2].trim(), desc: m[3].trim() };
      }
    }
  }

  // Extract avg JSON
  let avg = null;
  let avgError = null;
  const avgMatch = raw.match(/```avg\s*\n([\s\S]*?)\n```/);
  if (avgMatch) {
    try {
      avg = JSON.parse(avgMatch[1]);
    } catch (e) {
      avgError = e.message;
    }
  } else {
    avgError = 'Missing ```avg block';
  }

  // Extract Opening P pages from Section 4
  const pPages = [];
  const openMatch = raw.match(/### 開場[\s\S]*?(?=\n### 四個最終教師選項)/);
  if (openMatch) {
    for (const line of openMatch[0].split('\n')) {
      const m = line.match(/^\s*-\s*\*\*(P\d+)｜([^*]+)\*\*[：:]\s*(.+)$/);
      if (m) {
        pPages.push({ id: m[1], speakerLabel: m[2].trim(), text: m[3].trim() });
      }
    }
  }

  // Extract Choices A-D
  const choices = [];
  const choiceMatch = raw.match(/### 四個最終教師選項[\s\S]*?(?=\n## 5｜)/);
  if (choiceMatch) {
    for (const line of choiceMatch[0].split('\n')) {
      const m = line.match(/^\|\s*([ABCD])\s*\|\s*([^|]+?)\s*\|\s*(true|false)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|/);
      if (m) {
        choices.push({
          id: m[1],
          text: m[2].trim(),
          emotional: m[3] === 'true',
          fact: m[4].trim(),
          tradeoff: m[5].trim(),
        });
      }
    }
  }

  // Extract R1-R8
  const results = {};
  const sec5Match = raw.match(/## 5｜[\s\S]*$/);
  if (sec5Match) {
    const rBlocks = sec5Match[0].split(/\n(?=### R[1-8]｜)/);
    for (const blk of rBlocks) {
      const hm = blk.match(/^### (R[1-8])｜(.+)/);
      if (!hm) continue;
      const rId = hm[1];
      const rTitle = hm[2].trim();
      const visM = blk.match(/-\s*\*\*玩家可見結果\*\*[：:]\s*(.+)/);
      const outM = blk.match(/-\s*\*\*客觀後果\*\*[：:]\s*(.+)/);
      const npcM = blk.match(/-\s*\*\*合法底層增減\*\*[：:]\s*(.+)/);
      const stM = blk.match(/-\s*\*\*玩家四狀態\*\*[^：:]*[：:]\s*(.+)/);
      results[rId] = {
        id: rId,
        title: rTitle,
        text: visM ? visM[1].trim() : '',
        outcome: outM ? outM[1].trim() : '',
        npcDelta: npcM ? npcM[1].trim() : '',
        teacherStates: stM ? stM[1].trim() : '',
      };
    }
  }

  // Extract 4x8 matrix
  const matrix = {};
  const matMatch = raw.match(/### 四選項對八共用結果的權重[\s\S]*/);
  if (matMatch) {
    for (const line of matMatch[0].split('\n')) {
      const m = line.match(/^\|\s*([ABCD])\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|/);
      if (m) {
        matrix[m[1]] = [2,3,4,5,6,7,8,9].map(i => Number(m[i]));
      }
    }
  }

  // Mechanical checks (to assist, not replace semantic review)
  const mechFlags = [];
  if (avgError) mechFlags.push(`AVG_PARSE_ERROR: ${avgError}`);
  if (!VALID_MUSIC.has(music)) mechFlags.push(`INVALID_MUSIC: ${music}`);
  if (choices.length !== 4) mechFlags.push(`CHOICES_COUNT_${choices.length}`);
  if (Object.keys(results).length !== 8) mechFlags.push(`RESULTS_COUNT_${Object.keys(results).length}`);

  if (avg && avg.opening) {
    const avgPKeys = Object.keys(avg.opening);
    if (avgPKeys.length !== pPages.length) {
      mechFlags.push(`P_COUNT_MISMATCH: md=${pPages.length} avg=${avgPKeys.length}`);
    }
    // Check cast & directives in opening
    let cast = new Set();
    for (const pId of avgPKeys) {
      const pg = avg.opening[pId];
      if (Array.isArray(pg.enter)) pg.enter.forEach(r => cast.add(r));
      if (Array.isArray(pg.exit)) pg.exit.forEach(r => cast.delete(r));
      if (cast.size > 2) mechFlags.push(`OPENING_${pId}_CAST_GT_2`);
      if (pg.pose) {
        for (const [role, pose] of Object.entries(pg.pose)) {
          if (role.startsWith('student_')) mechFlags.push(`OPENING_${pId}_POSE_ON_STUDENT:${role}=${pose}`);
          if (!VALID_ADULT_POSES.has(pose)) mechFlags.push(`OPENING_${pId}_INVALID_POSE:${role}=${pose}`);
        }
      }
      if (pg.expression) {
        for (const [role, exp] of Object.entries(pg.expression)) {
          if (!VALID_EXPRESSIONS.has(exp)) mechFlags.push(`OPENING_${pId}_INVALID_EXP:${role}=${exp}`);
        }
      }
    }
    // Check opening speaker vs cast
    for (const p of pPages) {
      const spM = p.speakerLabel.match(/\{\{([a-z_]+)\.name\}\}/);
      if (spM) {
        const role = spM[1];
        if (role !== 'teacher' && !cast.has(role)) {
          // check if entered in that page
          const pg = avg.opening[p.id];
          // track step by step
        }
      }
    }
  }

  if (avg && avg.results) {
    for (let i = 1; i <= 8; i++) {
      const rId = `R${i}`;
      const avgR = avg.results[rId];
      const mdR = results[rId];
      if (!avgR || !Array.isArray(avgR.pages) || avgR.pages.length === 0) {
        mechFlags.push(`${rId}_AVG_MISSING_PAGES`);
        continue;
      }
      const avgJoined = avgR.pages.map(p => (p.text || '').trim()).join('');
      const mdNorm = (mdR?.text || '').replace(/\s+/g, '');
      const avgNorm = avgJoined.replace(/\s+/g, '');
      if (mdNorm !== avgNorm) {
        mechFlags.push(`${rId}_TEXT_MISMATCH_MD_VS_AVG`);
      }
      for (let pi = 0; pi < avgR.pages.length; pi++) {
        const pg = avgR.pages[pi];
        if (pg.pose) {
          for (const [role, pose] of Object.entries(pg.pose)) {
            if (role.startsWith('student_')) mechFlags.push(`${rId}_P${pi+1}_POSE_ON_STUDENT:${role}=${pose}`);
            if (!VALID_ADULT_POSES.has(pose)) mechFlags.push(`${rId}_P${pi+1}_INVALID_POSE:${role}=${pose}`);
          }
        }
        if (pg.expression) {
          for (const [role, exp] of Object.entries(pg.expression)) {
            if (!VALID_EXPRESSIONS.has(exp)) mechFlags.push(`${rId}_P${pi+1}_INVALID_EXP:${role}=${exp}`);
          }
        }
      }
    }
  }

  const blobSha = crypto.createHash('sha1').update(`blob ${Buffer.byteLength(raw)}\0${raw}`).digest('hex');

  return {
    storyId,
    term,
    relPath,
    blobSha,
    title,
    music,
    requiredWindow,
    requiredConditions,
    roles,
    pPages,
    choices,
    results,
    matrix,
    avg,
    mechFlags,
  };
}

const args = process.argv.slice(2);
const cmd = args[0] || 'manifest';

if (cmd === 'manifest') {
  const files = walkStories(T_DIR).sort((a, b) => path.basename(a).localeCompare(path.basename(b)));
  const stories = files.map(parseStory);
  const summary = {
    total: stories.length,
    byTerm: {},
    withMechFlags: stories.filter(s => s.mechFlags.length > 0).length,
    stories: stories.map(s => ({
      storyId: s.storyId,
      term: s.term,
      relPath: s.relPath,
      blobSha: s.blobSha,
      title: s.title,
      music: s.music,
      requiredWindow: s.requiredWindow,
      mechFlags: s.mechFlags,
    })),
  };
  for (const s of stories) summary.byTerm[s.term] = (summary.byTerm[s.term] || 0) + 1;
  fs.writeFileSync('reviews/stage5-story-audit/story-manifest.json', JSON.stringify(summary, null, 2));
  console.log(`Manifest written: ${summary.total} stories, ${summary.withMechFlags} with mechanical flags.`);
  console.log('By term:', summary.byTerm);
} else if (cmd === 'dump') {
  // Usage: node extract_story.mjs dump T1-001 T1-005
  const startId = args[1];
  const endId = args[2] || startId;
  const files = walkStories(T_DIR).sort((a, b) => path.basename(a).localeCompare(path.basename(b)));
  for (const f of files) {
    const id = path.basename(f, '.md');
    if (id >= startId && id <= endId) {
      const s = parseStory(f);
      console.log(`================================================================`);
      console.log(`ID: ${s.storyId} | Title: ${s.title} | Path: ${s.relPath}`);
      console.log(`Music: ${s.music} | Window: ${s.requiredWindow} | Cond: ${s.requiredConditions}`);
      console.log(`Roles: ${Object.entries(s.roles).map(([k,v]) => `${k}(${v.type}: ${v.desc})`).join('; ')}`);
      if (s.mechFlags.length) console.log(`MECH_FLAGS: ${s.mechFlags.join(' | ')}`);
      console.log(`--- OPENING P ---`);
      for (const p of s.pPages) {
        const avgP = s.avg?.opening?.[p.id] || {};
        console.log(`${p.id} [${p.speakerLabel}] (avg: ${JSON.stringify(avgP)}): ${p.text}`);
      }
      console.log(`--- CHOICES A-D ---`);
      for (const c of s.choices) {
        console.log(`${c.id} (emo=${c.emotional}): ${c.text} | 事實: ${c.fact} | 取捨: ${c.tradeoff}`);
      }
      console.log(`--- RESULTS R1-R8 ---`);
      for (let i = 1; i <= 8; i++) {
        const rId = `R${i}`;
        const r = s.results[rId];
        const avgR = s.avg?.results?.[rId];
        console.log(`[${rId}] ${r?.title} | 後果: ${r?.outcome} | NPC: ${r?.npcDelta} | V3: ${r?.teacherStates}`);
        console.log(`  MD: ${r?.text}`);
        if (avgR?.pages) {
          avgR.pages.forEach((pg, idx) => {
            const meta = { ...pg };
            delete meta.text;
            console.log(`  AVG_P${idx+1} ${JSON.stringify(meta)}: ${pg.text}`);
          });
        }
      }
      console.log(`--- MATRIX 4x8 ---`);
      for (const [k, v] of Object.entries(s.matrix)) {
        console.log(`  ${k}: ${v.join(', ')}`);
      }
    }
  }
}
