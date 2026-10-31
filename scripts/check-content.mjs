#!/usr/bin/env node
// Offline regression checks for curated homepage content. No network or publication.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { test } from 'node:test';
import ts from 'typescript';

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const publicationsSource = read('src/components/Publications.tsx');
const ast = ts.createSourceFile('Publications.tsx', publicationsSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const literal = (node) => {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(literal);
  if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.map((property) => [property.name.text, literal(property.initializer)]));
  throw new Error(`Unsupported content expression: ${node.getText(ast)}`);
};
const declarations = {};
const visit = (node) => {
  if (ts.isVariableDeclaration(node) && ['selectedPublications', 'preprints', 'fullPublications', 'TOPIC_OF'].includes(node.name.getText(ast))) {
    declarations[node.name.getText(ast)] = literal(node.initializer);
  }
  ts.forEachChild(node, visit);
};
visit(ast);
const { selectedPublications, preprints, fullPublications, TOPIC_OF } = declarations;
const statsJs = ts.transpileModule(read('src/components/publicationStats.ts'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const { publicationCategory, summarizePublications } = await import(`data:text/javascript;base64,${Buffer.from(statsJs).toString('base64')}`);
const bib = read('public/publications.bib');
const paper = (id) => fullPublications.find((entry) => entry.id === id);

test('publication tracks do not inflate main-conference counts', () => {
  const cases = {
    'ICLR 2026': 'Main conferences',
    'ICLR 2025 Blog Track': 'Blog tracks',
    'NeurIPS 2025 Multi-Turn Interactions in Large Language Models Workshop': 'Workshops',
    'FinNLP 2026 (EMNLP Workshop), Poster': 'Workshops',
    'ALVR 2026 Workshop': 'Workshops',
    'EMNLP 2026 Main, Poster': 'Main conferences',
    'ACL 2026 Findings': 'Findings',
    'EMNLP Findings 2024': 'Findings',
    'Technical Report, 2026 (arXiv)': 'Technical reports',
    'ACM Transactions on Intelligent Systems and Technology, 2025': 'Journals',
    'arXiv preprint': 'Preprints',
    'New unclassified venue': 'Other',
  };
  for (const [venue, category] of Object.entries(cases)) assert.equal(publicationCategory(venue), category, venue);
});

test('stats count the full list once, excluding the earlier Macaron Preview', () => {
  const stats = summarizePublications(fullPublications);
  assert.equal(stats.reduce((total, group) => total + group.count, 0), fullPublications.length - 1);
  assert.equal(stats.find((group) => group.category === 'Technical reports').count, 1);
  const main = new Map(stats.find((group) => group.category === 'Main conferences').venues);
  assert.equal(main.get('ICLR'), 2);
  assert.equal(main.get('NeurIPS'), 5);
  assert.equal(stats.some((group) => group.category === 'Other'), false);
});

test('list IDs are unique, preprints are synchronized, and all grouped entries have a topic', () => {
  for (const list of [selectedPublications, preprints, fullPublications]) {
    assert.equal(new Set(list.map((entry) => entry.id)).size, list.length);
  }
  for (const entry of preprints) assert.deepEqual(entry, paper(entry.id));
  for (const entry of [...preprints, ...fullPublications]) assert.ok(TOPIC_OF[entry.id], `${entry.id}: ${entry.title}`);
});

test('selected papers remain accepted first/co-first authored work', () => {
  for (const entry of selectedPublications) {
    const before = entry.authors.split('Xiang Liu')[0];
    assert.ok(before === '' || (entry.authors.includes('Xiang Liu*') && before.split(', ').filter(Boolean).every((author) => author.endsWith('*'))), entry.title);
    assert.ok(!['Preprints', 'Technical reports', 'Other'].includes(publicationCategory(entry.venue)), entry.title);
  }
});

test('CAFES, Probing Values, and the full Macaron report match verified sources', () => {
  const cafes = fullPublications.find((entry) => entry.title.startsWith('CAFES:'));
  assert.equal(cafes.venue, 'ALVR 2026 Workshop');
  assert.ok(cafes.authors.includes('Huiyu Zhou'));
  assert.equal(cafes.links.paper, 'https://aclanthology.org/2026.alvr-main.10/');
  assert.equal(preprints.some((entry) => entry.id === cafes.id), false);
  assert.equal(paper(50).venue, 'ACL 2026 Findings');
  assert.equal(paper(50).links.paper, 'https://aclanthology.org/2026.findings-acl.1715/');
  assert.equal(paper(49).links.paper, 'https://arxiv.org/abs/2608.09819');
  assert.equal(paper(45).isPreview, true);
  for (const identifier of ['2026.alvr-main.10', '2026.findings-acl.1715', '2608.09819']) assert.ok(bib.includes(identifier));
  assert.ok(bib.includes('Huiyu'));
});

test('NestedKV, CondenseVLM, and EVOQUANT preserve their main/workshop distinctions', () => {
  for (const id of [46, 47]) assert.equal(paper(id).venue, 'EMNLP 2026 Main, Poster');
  assert.equal(paper(48).venue, 'FinNLP 2026 (EMNLP Workshop), Poster');
});

test('one AGI vision remains, experience uses years, and dated news is newest-first', () => {
  const copy = ['Header', 'About', 'Research'].map((name) => read(`src/components/${name}.tsx`)).join('\n');
  assert.equal((copy.match(/accelerating the arrival of AGI/g) ?? []).length, 1);
  const experience = read('src/components/Experience.tsx');
  for (const match of experience.matchAll(/period: "([^"]+)"/g)) assert.match(match[1], /^\d{4}(?:–(?:\d{4}|Present))?$/);
  assert.ok(experience.includes('Algorithm Research Intern.'));
  const news = read('src/components/News.tsx');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const dates = [...news.matchAll(/date: "([A-Za-z]{3}) (\d{4})"/g)].map(([, month, year]) => Number(year) * 12 + months.indexOf(month));
  assert.deepEqual(dates, [...dates].sort((a, b) => b - a));
});

console.log('Verified publication summary:', JSON.stringify(summarizePublications(fullPublications)));
