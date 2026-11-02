import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeArchitecture } from '../scripts/architecture.js';
import { checkProject } from '../scripts/project.js';

test('architecture: actual runtime has local, acyclic, layered imports without fixed file counts', async () => {
  const {graph,errors}=await checkProject();
  assert.deepEqual(errors,[]);
  assert.ok(graph.has('src/numeric/math.js'));
  assert.ok(graph.has('src/contracts/foundation.js'));
  assert.ok(graph.has('web/health.js'));
  // Original player.test graph coverage continues here, with UI allowed only in web.
  for (const path of graph.keys()) if (path.startsWith('src/')) await import(new URL(`../${path}`,import.meta.url));
});

test('architecture: AST ignores text/comments while allowing DOM only in presentation', () => {
  const sources=new Map([
    ['src/numeric/math.js', 'export const text="document Math.random"; // window\n'],
    ['src/contracts/data.js', 'import {text} from "../numeric/math.js"; export {text};'],
    ['web/view.js', 'import {text} from "../src/contracts/data.js"; document.title=text;'],
  ]);
  assert.deepEqual(analyzeArchitecture(sources).errors,[]);
});

test('architecture: rejects reversed edges, indirect cycles, missing dependencies and platform calls', () => {
  const cases=[
    new Map([['src/numeric/math.js','import "../contracts/data.js";'],['src/contracts/data.js','export const x=1;']]),
    new Map([['src/numeric/a.js','export * from "./b.js";'],['src/numeric/b.js','import "./a.js";']]),
    new Map([['src/contracts/data.js','import "./missing.js";']]),
    new Map([['src/numeric/math.js','document.title="x";']]),
    new Map([['src/numeric/math.js','globalThis["document"].title="x";']]),
    new Map([['src/numeric/math.js','Math["random"]();']]),
    new Map([['src/numeric/math.js','Date.now();']]),
    new Map([['src/numeric/math.js','new Date();']]),
    new Map([['src/numeric/math.js','import fs from "node:fs";']]),
    new Map([['src/numeric/math.js','import(path);']]),
    new Map([['web/view.js','import "../src/numeric/math.js";'],['src/numeric/math.js','export const x=1;']]),
    new Map([['src/unknown/a.js','export const x=1;']]),
  ];
  for (const sources of cases) assert.ok(analyzeArchitecture(sources).errors.length>0);
  assert.match(analyzeArchitecture(cases[1]).errors.join('\n'), /cycle/);
  assert.match(analyzeArchitecture(cases[3]).errors[0], /math.js:1/);
});
