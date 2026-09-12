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
