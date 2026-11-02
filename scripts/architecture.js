/** AST-based boundaries. Add a real layer only when its implementation exists. */
import { parse } from 'acorn';
import { posix } from 'node:path';

const allowed = {
  numeric: ['numeric'],
  player: ['player','numeric'],
  world: ['world','player','numeric'],
  social: ['social','world','player','numeric'],
  evolution: ['evolution','world','player','numeric'],
  changes: ['changes','evolution','social','world','player','numeric'],
  assessment: ['assessment','social','world','player','numeric'],
  contracts: ['contracts','changes','evolution','social','world','player','numeric','assessment'],
  web: ['web','contracts'],
};
function layer(path) {
  const [root, area] = path.split('/');
  return root === 'src' ? area : root;
}
function walk(node, visit, parent = null) {
  if (!node || typeof node !== 'object') return;
  if (node.type) visit(node, parent);
  for (const [key, value] of Object.entries(node)) {
    if (key === 'loc') continue;
    if (Array.isArray(value)) value.forEach(child => walk(child, visit, node));
    else if (value && typeof value === 'object') walk(value, visit, node);
  }
}
export function analyzeArchitecture(sources) {
  const graph = new Map(), errors = [];
  for (const [path, source] of sources) {
    const area = layer(path), dependencies = [];
    if (!allowed[area]) { errors.push(`${path}: unregistered runtime layer`); continue; }
    if (/batch|^n[1-8]\./i.test(posix.basename(path))) errors.push(`${path}: batch-named runtime module`);
    let tree;
    try { tree = parse(source, { ecmaVersion: 'latest', sourceType: 'module', locations: true }); }
    catch (error) { errors.push(`${path}: ${error.message}`); continue; }
    const report = (node, message) => errors.push(`${path}:${node.loc.start.line}: ${message}`);
    walk(tree, (node, parent) => {
      let specifier;
      if (['ImportDeclaration','ExportNamedDeclaration','ExportAllDeclaration'].includes(node.type)) specifier = node.source?.value;
      if (node.type === 'ImportExpression') {
        if (node.source.type !== 'Literal' || typeof node.source.value !== 'string') report(node, 'dynamic import must have an inspectable literal path');
        else specifier = node.source.value;
      }
      if (specifier !== undefined) {
        if (!specifier.startsWith('.')) report(node, 'runtime imports must be local (dependencies require an explicit boundary decision)');
        else {
          const target = posix.normalize(posix.join(posix.dirname(path), specifier));
          dependencies.push(target);
          if (!sources.has(target)) report(node, `missing runtime dependency ${target}`);
          if (!allowed[area].includes(layer(target))) report(node, `forbidden ${area} → ${layer(target)} dependency`);
        }
      }
      if (area !== 'web' && node.type === 'Identifier' && ['window','document','localStorage','indexedDB','navigator','fetch','process','require'].includes(node.name)) {
        const property = (parent?.type === 'MemberExpression' && parent.property === node && !parent.computed) ||
          (parent?.type === 'Property' && parent.key === node && !parent.computed && !parent.shorthand);
        if (!property) report(node, `platform API ${node.name} outside adapter layer`);
      }
      if (area !== 'web' && node.type === 'MemberExpression') {
        const property = node.computed ? node.property.value : node.property.name;
        if (node.object.name === 'globalThis' && ['window','document','localStorage','indexedDB','navigator','fetch','process'].includes(property)) report(node, `platform API globalThis.${property} outside adapter layer`);
        if ((node.object.name === 'Math' && property === 'random') || (node.object.name === 'Date' && property === 'now')) report(node, 'implicit random/clock source');
      }
      if (area !== 'web' && ['CallExpression','NewExpression'].includes(node.type) && node.callee.name === 'Date' && !node.arguments.length) report(node, 'implicit host clock');
    });
    graph.set(path, dependencies);
  }
  const done = new Set(), active = new Set();
  function visit(path, chain) {
    if (active.has(path)) { errors.push(`dependency cycle: ${[...chain,path].join(' → ')}`); return; }
    if (done.has(path) || !graph.has(path)) return;
    active.add(path);
    for (const target of graph.get(path)) visit(target, [...chain,path]);
    active.delete(path); done.add(path);
  }
  for (const path of graph.keys()) visit(path, []);
  return { graph, errors };
}
