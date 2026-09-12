// Run: node csia/tomato/test.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');
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
  assert.equal(exam.available, true);
  assert.equal(exam.questions.length, 100);
  assert.equal(exam.sections.map(s => s.end).join(','), '15,35,65,100');
  exam.questions.forEach((question, index) => {
    assert.equal(question.id, index + 1);
    assert.equal(question.textReady, true, `${id} Q${question.id}: text edition`);
    assert.ok(question.question.trim());
    assert.ok(question.explanation.trim());
    assert.doesNotMatch(question.question, /원문 문항과 보기를 읽고|[★☆]/);
    assert.doesNotMatch(question.explanation, /사용자 제공 정답·해설 원문/);
    assert.ok(question.box === null || typeof question.box === 'string');
    assert.equal(question.options.length, 4);
    assert.ok(question.options.every(option => typeof option === 'string' && option.trim()));
    for (const text of [question.question, ...question.options]) {
      assert.doesNotMatch(text, /원문 [①②③④]번 보기 선택|[\uFFFD\uE000-\uF8FF]|\n/);
    }
    for (const table of [...(question.tables || []), ...(question.explanationTables || [])]) {
      assert.ok(table.headers.length > 0 && table.rows.length > 0);
      assert.ok(table.headers.every(cell => typeof cell === 'string'));
      for (const row of table.rows) {
        assert.equal(row.length, table.headers.length);
        assert.ok(row.every(cell => typeof cell === 'string'));
      }
    }
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
const round2 = context.window.TOMATO_EXAMS['tomato-2025-11-2'].questions;
assert.match(round2[0].question, /루카스 비판/);
assert.equal(round2[0].options[1], '고전학파에 속한다');
assert.equal(round2[23].tables[0].rows[3].join('|'), '|69,700|70');
assert.equal(round2[23].correctAnswer, 3);
const round3 = context.window.TOMATO_EXAMS['tomato-2025-11-3'].questions;
assert.match(round3[90].explanationTables[0].rows[0][1], /정관에서 더 낮은 주식 보유비율/);
execFileSync(process.execPath, [path.join(__dirname, 'render.cjs'), '--check']);
const reader = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
assert.equal((reader.match(/<article class="question"/g) || []).length, 300);
assert.equal((reader.match(/<li><span>/g) || []).length, 1200);
assert.equal((reader.match(/<details class="solution"/g) || []).length, 300);
assert.doesNotMatch(reader, /<img\b|<script\b/);
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
console.log('PASS: 400 existing + 300 text-first TomatoPass questions, 1,200 choices, explanations, tables, local images, sections and timer.');
