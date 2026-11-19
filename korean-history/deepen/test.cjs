'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {execFileSync} = require('node:child_process');
const root = __dirname;
const storage = new Map();
const context = {window:{}, DOMException, document:{querySelector:() => null},
  localStorage:{getItem:key => storage.get(key) ?? null, setItem:(key, value) => storage.set(key, value)}};
for (const name of ['test/config.js','data.js','concepts.js','explanations.js','../basic/common.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(root, name), 'utf8'), context, {filename:name});
}
const {exams, concepts, topics, config, grade, validAttempt, attemptKey, readAttempt, save, conceptLinks, questionImage} = context.window.HistoryApp;
assert.equal(config.choices, 5);
assert.equal(config.seconds, 4800);
assert.deepEqual(Array.from(config.grades), ['1급','2급','3급']);
assert.deepEqual(Array.from(exams, exam => exam.round), Array.from({length:21}, (_, index) => index+60));
const refs = new Set();
const imageFiles = new Set();
const explanations = context.window.HISTORY_EXPLANATIONS;
const mdFiles = fs.readdirSync(path.join(root, 'pdf/test')).filter(name => name.endsWith('.md'));
for (const exam of exams) {
  const filename = mdFiles.find(name => name.normalize('NFC').startsWith(`${exam.round}회_`));
  assert(filename, `Markdown source for round ${exam.round}`);
  const md = fs.readFileSync(path.join(root, 'pdf/test', filename), 'utf8');
  const sourceRows = new Map([...md.matchAll(/^\|\s*(\d+)\s*\|\s*([①②③④⑤])\s*\|\s*(.*?)\s*\|\s*$/gm)].map(match =>
    [Number(match[1]), {answer:'①②③④⑤'.indexOf(match[2])+1, text:match[3]}]));
  assert.equal(sourceRows.size, 50, `${exam.round}: complete source answer table`);
  assert.equal(exam.questions.length, 50);
  assert.equal(exam.questions.reduce((total, question) => total+question.points, 0), 100, `${exam.round}: original paper weights total 100`);
  for (const url of [exam.paper, exam.key]) {
    const local = decodeURIComponent(url);
    assert.equal(local, local.normalize('NFC'), 'Use Git-compatible canonical source filenames');
    assert(fs.existsSync(path.resolve(root, 'test', local)), `Missing source: ${url}`);
  }
  for (const [index, question] of exam.questions.entries()) {
    const ref = `${exam.round}-${question.number}`;
    refs.add(ref);
    assert.equal(question.number, index+1, `${ref}: correct order`);
    assert.equal(question.answer, sourceRows.get(question.number).answer, `${ref}: source answer`);
    assert([1,2,3].includes(question.points), `${ref}: source points`);
    assert(Number.isInteger(question.page) && question.page >= 1 && question.page <= 12, ref);
    assert(question.width > 1000 && question.height > 1000, `${ref}: legible original page`);
    assert(question.text.trim().length > 20, `${ref}: supporting OCR text`);
    const [left, top, right, bottom] = question.crop;
    assert(left >= 0 && left < right && right <= 1 && top >= 0 && top < bottom && bottom <= 1, `${ref}: valid source bounds`);
    assert((bottom-top)*question.height > 100, `${ref}: substantial question crop`);
    assert(fs.existsSync(path.join(root, 'assets', question.image)), `${ref}: source image`);
    imageFiles.add(question.image);
    const explanation = explanations[ref];
    assert.equal(explanation.answer, question.answer, `${ref}: explanation answer`);
    assert(explanation.paragraphs.join(' ').includes(sourceRows.get(question.number).text), `${ref}: complete supplied explanation`);
    assert(explanation.source.startsWith('https://history.hackers.com/'));
    assert(fs.existsSync(path.resolve(root, 'test', decodeURIComponent(explanation.pdf))));
    assert(questionImage(exam, question).includes('다섯 개의 보기'));
    assert(topics[ref]?.length, `${ref}: study mapping`);
    for (const id of topics[ref]) {
      const concept = concepts.find(item => item.id === id);
      assert(concept && concept.refs.includes(ref), `${ref}: reciprocal study mapping`);
    }
    assert(conceptLinks(ref, 'practice').includes('?mode=practice#'));
    assert(conceptLinks(ref).includes('?mode=exam#'));
  }
  assert.equal(grade(exam, exam.questions.map(question => question.answer)).score, 100);
  assert.equal(grade(exam, Array(50).fill(0)).unanswered, 50);
  const attempt = {answers:Array(50).fill(0), marked:[], current:0, submitted:false, remaining:4800, deadline:null};
  assert(validAttempt({...attempt, answers:Array(50).fill(5)}), 'Five-choice answers are supported');
  for (const change of [{answers:Array(50).fill(6)}, {remaining:4801}, {current:50}, {marked:[51]}, {deadline:'invalid'}]) {
    assert(!validAttempt({...attempt, ...change}), 'Reject invalid advanced attempts');
  }
  assert.equal(attemptKey(exam.round), `kh-deepen-attempt-${exam.round}-v1`);
  assert.equal(attemptKey(exam.round, 'practice'), `kh-deepen-attempt-${exam.round}-practice-v1`);
  save(`kh-basic-attempt-${exam.round}-v1`, {...attempt, answers:Array(50).fill(1)});
  assert.equal(readAttempt(exam.round), null, 'Never reuse basic records');
  save(attemptKey(exam.round), {...attempt, answers:exam.questions.map(question => question.answer)});
  assert.equal(readAttempt(exam.round, 'practice'), null, 'Practice starts independently');
  save(attemptKey(exam.round, 'practice'), {...attempt, answers:Array(50).fill(5)});
  assert.equal(grade(exam, readAttempt(exam.round).answers).score, 100, 'Practice must not overwrite exam answers');
}
assert.equal(refs.size, 1050);
assert.equal(Object.keys(explanations).length, 1050);
assert.equal(Object.keys(topics).length, 1050);
assert.equal(concepts.length, 32);
assert.equal(explanations['61-39'].answer, 3);
assert.equal(explanations['70-47'].answer, 4);
assert(explanations['70-47'].correction, 'Retain the source-answer correction');
const html = fs.readFileSync(path.join(root, 'test/index.html'), 'utf8');
for (const match of html.matchAll(/(?:src|href)="([^"#?]+)(?:[#?][^"]*)?"/g)) {
  if (/^(?:https?:|data:)/.test(match[1])) continue;
  assert(fs.existsSync(path.resolve(root, 'test', match[1])), `Missing HTML resource ${match[1]}`);
}
for (const name of ['build-data.cjs', 'build-concepts.cjs']) {
  execFileSync(process.execPath, [path.join(root, name), '--check'], {stdio:'inherit'});
}
console.log(`PASS: 21 advanced exams, 1,050 complete five-choice questions, ${imageFiles.size} original page images, MD answers/explanations, 100-point grading, independent 80-minute/practice records and reciprocal links to 32 study lessons.`);
