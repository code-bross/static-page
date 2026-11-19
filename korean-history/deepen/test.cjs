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
for (const name of ['test/config.js','data.js','choices.js','concepts.js','explanations.js','../basic/common.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(root, name), 'utf8'), context, {filename:name});
}
const {exams, concepts, topics, config, grade, validAttempt, attemptKey, readAttempt, save, conceptLinks, questionImage, questionChoices} = context.window.HistoryApp;
assert.equal(config.choices, 5);
assert.equal(config.choiceContent, true);
assert.equal(config.seconds, 4800);
assert.deepEqual(Array.from(config.grades), ['1급','2급','3급']);
assert.deepEqual(Array.from(exams, exam => exam.round), Array.from({length:21}, (_, index) => index+60));
const refs = new Set();
const imageFiles = new Set();
const optionImages = new Set();
let textOptions = 0;
const sourceParts = [];
const explanations = context.window.HISTORY_EXPLANATIONS;
const choices = context.window.HISTORY_CHOICES;
assert.equal(Object.keys(choices).length, 1050);
const validCrop = (crop, label) => {
  assert(Array.isArray(crop) && crop.length === 4 && crop.every(Number.isFinite), label);
  const [left, top, right, bottom] = crop;
  assert(left >= 0 && left < right && right <= 1 && top >= 0 && top < bottom && bottom <= 1, label);
};
const area = crop => (crop[2]-crop[0])*(crop[3]-crop[1]);
const overlap = (a,b) => Math.max(0,Math.min(a[2],b[2])-Math.max(a[0],b[0]))*Math.max(0,Math.min(a[3],b[3])-Math.max(a[1],b[1]));
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
    const content = questionChoices(exam, question);
    assert.equal(content.options.length, 5);
    assert.equal(new Set(content.options.map(option => JSON.stringify(option.crop))).size, 5, `${ref}: individually separated source choices`);
    content.stem.forEach(fragment => validCrop(fragment.crop, `${ref}: complete stem fragment`));
    const stem = questionImage(exam, question, {stem:true});
    assert.equal((stem.match(/class="question-image /g) || []).length, content.stem.length);
    for (const [index, option] of content.options.entries()) {
      validCrop(option.crop, `${ref}-${index+1}: option bounds`);
      assert((option.text && option.text.trim()) || option.image, `${ref}: no number-only choice`);
      if (option.text) {
        assert(!/[\uE000-\uF8FF\uFFFD]/u.test(option.text), `${ref}: no damaged text glyphs`);
        textOptions++;
      }
      if (option.image) {
        assert(/^choices\/[\w/-]+\.(?:jpg|jpeg|png)$/.test(option.image), `${ref}: local extracted image`);
        const file = path.join(root, 'assets', option.image);
        assert(fs.existsSync(file), `${ref}: extracted image exists`);
        optionImages.add(option.image);
      }
    }
    content.options.forEach((option, index) => {
      for (const other of content.options.slice(index+1)) {
        assert(overlap(option.crop, other.crop) < Math.min(area(option.crop),area(other.crop))*.15, `${ref}: each card preserves only its own choice`);
      }
    });
    sourceParts.push({ref, round:exam.round, page:question.page, stem:content.stem, options:content.options});
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
assert(textOptions > 0 && optionImages.size > 0, 'Use HTML text and individually extracted illustrated choices');
assert(choices['80-1'].options.every(option => option.text && !option.image), 'Ordinary statement choices render as native HTML text');
assert(choices['80-3'].options.every(option => option.image), 'Each cultural-heritage photo is a separate selectable image');
for (const current of sourceParts) {
  for (const other of sourceParts.filter(item => item.round === current.round && item.page === current.page)) {
    for (const fragment of current.stem) for (const option of other.options) {
      assert(overlap(fragment.crop, option.crop) < area(option.crop)*.08, `${current.ref}: do not repeat ${other.ref}'s choices inside the stem`);
    }
  }
}
assert.equal(explanations['61-39'].answer, 3);
assert.equal(explanations['70-47'].answer, 4);
assert(explanations['70-47'].correction, 'Retain the source-answer correction');
const html = fs.readFileSync(path.join(root, 'test/index.html'), 'utf8');
for (const match of html.matchAll(/(?:src|href)="([^"#?]+)(?:[#?][^"]*)?"/g)) {
  if (/^(?:https?:|data:)/.test(match[1])) continue;
  assert(fs.existsSync(path.resolve(root, 'test', match[1])), `Missing HTML resource ${match[1]}`);
}
const nodes = new Map();
const scope = {
  window:context.window, URL, location:{href:'http://localhost/test/index.html'},
  history:{replaceState:() => {}},
  document:{querySelector:selector => {
    if (!nodes.has(selector)) nodes.set(selector, {setAttribute:() => {}});
    return nodes.get(selector);
  }}
};
const app = fs.readFileSync(path.join(root, '../basic/test/app.js'), 'utf8');
vm.runInNewContext(app.slice(0, app.indexOf("  $('#exam-list').addEventListener")) +
  `globalThis.renderChoiceFixture = (round, number, answer) => {
    exam = exams.find(item => item.round === round);
    mode = 'practice';
    attempt = freshAttempt();
    attempt.current = number - 1;
    attempt.answers[attempt.current] = answer;
    renderQuestion();
    return $('#question-content').innerHTML;
  };})();`, scope);
for (const exam of exams) for (const question of exam.questions) {
  const content = choices[`${exam.round}-${question.number}`];
  const html = scope.renderChoiceFixture(exam.round, question.number, 0);
  assert.equal((html.match(/name="answer"/g) || []).length, 5);
  assert.equal((html.match(/class="option-content"/g) || []).length, 5);
  assert(!html.includes('class="answer-explanation"'), 'Do not reveal an unselected answer');
  for (const option of content.options) {
    if (option.text) assert(html.includes(`<span class="option-text">${context.window.HistoryApp.escape(option.text)}</span>`));
    if (option.image) assert(html.includes(`src="../assets/${option.image}"`));
  }
  const correct = scope.renderChoiceFixture(exam.round, question.number, question.answer);
  assert(correct.includes('내 선택 · 정답') && correct.includes('class="answer-explanation"'));
  const wrong = scope.renderChoiceFixture(exam.round, question.number, question.answer % 5 + 1);
  assert(wrong.includes('내 선택 · 오답'));
}
const sample = choices['80-1'].options[0];
const originalText = sample.text;
sample.text = '<img src=x onerror="alert(1)">';
const escaped = scope.renderChoiceFixture(80, 1, 0);
assert(!escaped.includes('<img src=x'));
assert(escaped.includes('&lt;img src=x onerror=&quot;alert(1)&quot;&gt;'));
sample.text = originalText;
for (const name of ['build-data.cjs', 'build-concepts.cjs', 'build-choices.cjs']) {
  execFileSync(process.execPath, [path.join(root, name), '--check'], {stdio:'inherit'});
}
console.log(`PASS: 21 advanced exams, 5,250 full-content choices (${textOptions} HTML text choices, ${optionImages.size} extracted images), separated stems, escaped accessible cards, MD explanations, 100-point grading, independent records and 32 linked study lessons.`);
