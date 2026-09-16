// Run: node csia/test.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const context = vm.createContext({ window: {} });
for (let round = 1; round <= 4; round++) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, `js/${round}-data.js`), 'utf8'), context);
  const questions = context.window[`EXAM_DATA_ROUND${round}`];
  assert.equal(questions.length, 100, `Round ${round}: question count`);
  const pages = new Set();
  questions.forEach((question, index) => {
    const label = `Round ${round} Q${index + 1}`;
    assert.equal(question.id, index + 1, `${label}: ID`);
    assert.ok(question.question.trim(), `${label}: prompt`);
    assert.ok(question.box === null || typeof question.box === 'string', `${label}: box`);
    assert.equal(question.options.length, 4, `${label}: four options`);
    assert.ok(question.options.every(option => typeof option === 'string' && option.trim()), `${label}: option text`);
    assert.ok(Number.isInteger(question.correctAnswer) && question.correctAnswer >= 1 && question.correctAnswer <= 4, `${label}: answer`);
    assert.ok(question.explanation.trim(), `${label}: explanation`);
    assert.ok(Number.isInteger(question.difficulty) && question.difficulty >= 1 && question.difficulty <= 3, `${label}: difficulty`);
    assert.ok(question.category.startsWith(`${index < 35 ? 1 : index < 65 ? 2 : 3}과목`), `${label}: category`);
    assert.ok(fs.existsSync(path.join(__dirname, 'assets/images', String(round), question.pageImage)), `${label}: source page`);
    pages.add(question.pageImage);
    assert.ok(!/[\uE000-\uF8FF\uFFFD]/u.test(JSON.stringify(question)), `${label}: damaged glyph`);
    assert.ok(!question.questionImages, `${label}: retain searchable text`);
    assert.equal(question.optionConcepts?.length, 4, `${label}: concepts for all four choices`);
    question.optionConcepts.forEach((concept, option) => {
      assert.ok(typeof concept.title === 'string' && concept.title.trim(), `${label} option ${option + 1}: concept title`);
      assert.ok(typeof concept.explanation === 'string' && concept.explanation.trim().length >= 20, `${label} option ${option + 1}: substantive explanation`);
      assert.notEqual(concept.explanation.trim(), question.options[option].trim(), `${label} option ${option + 1}: explain, not just repeat`);
    });
  });
  assert.equal(pages.size, 27, `Round ${round}: every source page is referenced`);
}
new vm.Script(fs.readFileSync(path.join(__dirname, 'js/app.js'), 'utf8'));
const round3 = context.window.EXAM_DATA_ROUND3;
assert.equal(round3[10].correctAnswer, 1, 'User-confirmed round 3 Q11');
assert.equal(round3[61].correctAnswer, 3, 'User-confirmed round 3 Q62');
assert.equal(round3[10].answerSource, 'user');
assert.equal(round3[61].answerSource, 'user');
assert.equal(round3[5].correctAnswer, 1, 'Round 3 Q6 was not the user override');
console.log('PASS: 400 questions, 1,600 choice concepts, 108 source pages, categories and user-confirmed answers.');

for (const file of ['notes.js', 'pages.js']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'special', file), 'utf8'), context);
}
const lectures = context.window.SPECIAL_NOTES;
const sources = context.window.SPECIAL_PAGES;
assert.equal(lectures.length, 7);
assert.equal(sources.length, 7);
assert.equal(new Set(lectures.map(lecture => lecture.id)).size, 7);
assert.equal(sources.reduce((total, source) => total + source.totalPages, 0), 138);
assert.equal(sources.reduce((total, source) => total + source.pages.length, 0), 133);
lectures.forEach((lecture, index) => {
  const source = sources[index];
  assert.equal(lecture.id, source.id);
  assert.ok(lecture.sections.length >= 5);
  for (const field of ['title', 'session', 'intro', 'formula', 'example', 'question', 'answer']) {
    assert.ok(lecture[field].trim(), `${lecture.id}: ${field}`);
  }
  for (const section of lecture.sections) {
    assert.ok(section.title.trim() && section.body.trim() && section.pages.startsWith('PDF '));
    for (const match of section.pages.matchAll(/\d+/g)) {
      assert.ok(Number(match[0]) >= 1 && Number(match[0]) <= source.totalPages);
    }
  }
  assert.ok(fs.existsSync(path.join(__dirname, 'special', source.pdf)));
  const numbers = source.pages.map(page => page.number).concat(source.omittedPages);
  assert.equal(numbers.length, source.totalPages);
  assert.equal(new Set(numbers).size, source.totalPages);
  for (const page of source.pages) {
    assert.ok(page.number >= 1 && page.number <= source.totalPages);
    assert.ok(page.width > 1000 && page.height > 1000);
    assert.ok(fs.existsSync(path.join(__dirname, 'special', page.image)));
    assert.ok(!/토마토패스|tomatopass/.test(page.text), 'No watermark text in extracted pages');
  }
});
new vm.Script(fs.readFileSync(path.join(__dirname, 'special/app.js'), 'utf8'));
assert.ok(fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8').includes('href="special/index.html"'));
console.log('PASS: seven special lectures, 133 learning pages, source coverage and landing navigation.');
