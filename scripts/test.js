/** Explicit suites + module selection; no arbitrary paths or silent empty passes. */
import { spawnSync } from 'node:child_process';

const legacy = ['assessment','changes','core','evolution','evolution-stress','integration','player','random','social','world'];
export const suites = Object.freeze({
  unit: ['core','random'],
  contract: ['contracts'],
  integration: ['integration'],
  scenario: ['scenario'],
  tooling: ['architecture','tooling'],
  quick: ['core','random','contracts','scenario','architecture','tooling'],
  regression: [...legacy,'contracts','scenario','architecture','tooling'],
});
export function testSelection(args) {
  const [selection = 'regression', ...rest] = args;
  const files = selection.startsWith('module=') ? selection.slice(7).split(',').flatMap(name => name === 'numeric' ? ['core','random'] : [name]) : suites[selection];
  const known = suites.regression;
  if (!files?.length || files.some(name => !known.includes(name)) || new Set(files).size !== files.length) throw new Error(`Unknown/duplicate suite or module: ${selection}; suites: ${Object.keys(suites).join(', ')}`);
  let pattern, coverage = false;
  for (let i=0;i<rest.length;i++) {
    if (rest[i] === '--coverage' && !coverage) coverage = true;
    else if (rest[i] === '--name' && pattern === undefined && rest[i+1]) { pattern = rest[++i]; new RegExp(pattern); }
    else throw new Error(`Unknown/incomplete test option: ${rest[i]}`);
  }
  return { selection, files:files.map(name => `test/${name}.test.js`), pattern, coverage };
}
export function runTests(args) {
  const { selection, files, pattern, coverage } = testSelection(args);
  const flags = ['--test','--test-isolation=none','--test-reporter=tap', ...(coverage?['--experimental-test-coverage']:[]), ...(pattern?['--test-name-pattern',pattern]:[]), ...files];
  console.log(`Suite: ${selection}; selected files: ${files.join(', ')}`);
  console.log('Not executed: full 30-year simulation; browsers/Safari; other unselected suites. Node reports passed/failed/skipped below.');
  const result = spawnSync(process.execPath, flags, { encoding:'utf8', maxBuffer:32*1024*1024, cwd:new URL('../',import.meta.url) });
  if (result.error) throw result.error;
  process.stdout.write(result.stdout); process.stderr.write(result.stderr);
  if (result.status === 0 && !/^# tests [1-9]\d*$/m.test(result.stdout)) {
    console.error('FAIL: no tests executed; check suite/name selection.'); return 1;
  }
  return result.status ?? 1;
}
