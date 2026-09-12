// Run: node csia/tomato/test.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
let tick;
let expired = 0;
const context = vm.createContext({
  window: {},
  setInterval(callback) { tick = callback; return 1; },
  clearInterval() {}
});
for (const file of ['js/1-data.js', 'js/2-data.js', 'js/3-data.js', 'js/4-data.js', 'tomato/data.js', 'js/timer.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
}
for (let round = 1; round <= 4; round++) {
  assert.equal(context.window[`EXAM_DATA_ROUND${round}`].length, 100);
}
let count = 0;
assert.deepEqual(Object.keys(context.window.TOMATO_EXAMS), [
  'tomato-2025-11-1', 'tomato-2025-11-2', 'tomato-2025-11-3'
]);
for (const [id, exam] of Object.entries(context.window.TOMATO_EXAMS)) {
  assert.ok(fs.existsSync(path.join(root, exam.answerPdf)));
  assert.equal(exam.available, true);
  assert.ok(fs.existsSync(path.join(root, exam.questionPdf)));
  assert.equal(exam.questions.length, 100);
  assert.equal(exam.sections.map(s => s.end).join(','), '15,35,65,100');
  exam.questions.forEach((question, index) => {
    assert.equal(question.id, index + 1);
    assert.equal(question.options.length, 4);
    assert.ok(question.options.every(option => option.trim()));
    assert.ok(question.correctAnswer >= 1 && question.correctAnswer <= 4);
    assert.ok(question.questionImages.length && question.explanationImages.length);
    assert.equal(question.category, exam.sections.find(s => question.id <= s.end).name);
    for (const image of [...question.questionImages, ...question.explanationImages, question.pageImage]) {
      assert.ok(fs.existsSync(path.join(root, image)), image);
    }
    count++;
  });
}
assert.equal(count, 300);
assert.match(context.window.TOMATO_EXAMS['tomato-2025-11-1'].questions[33].answerNote, /서로 다릅니다/);
const timer = new context.window.ExamTimer({ onExpire() { expired++; } });
timer.remainingSeconds = 1;
timer.start();
tick();
assert.equal(expired, 1);
assert.equal(timer.isRunning, false);
assert.equal(timer.remainingSeconds, 0);
timer.reset();
timer.setMode('practice');
timer.start();
tick();
assert.equal(timer.remainingSeconds, 7200);
assert.equal(timer.elapsedSeconds, 1);
timer.pause();
assert.equal(timer.isRunning, false);
console.log('PASS: 400 existing + 300 TomatoPass questions, local assets, section mapping, timer expiry/practice.');
