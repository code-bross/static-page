// Run: node csia/basic/test.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const context = vm.createContext({ window: {} });
for (const file of ['course.js', 'updates.js']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, file), 'utf8'), context);
}
const course = context.window.BASIC_COURSE;
const updates = context.window.BASIC_UPDATES;
assert.equal(course.length, 30);
assert.equal(course.reduce((total, day) => total + day.questions.length, 0), 132);
const ids = new Set();
const prompts = new Set();
const updateIds = new Set(updates.map(update => update.id));
assert.equal(updateIds.size, updates.length);
const positions = new Set();
course.forEach((day, index) => {
  assert.equal(day.day, index + 1);
  for (const field of ['group', 'title', 'goal', 'source']) assert.ok(day[field]?.trim(), `Day ${day.day}: ${field}`);
  assert.ok(day.lessons.length >= 3, `Day ${day.day}: substantive lessons`);
  assert.ok(day.keywords.length >= 2);
  assert.ok(Array.isArray(day.pdfPages));
  day.pdfPages.forEach(page => assert.ok(Number.isInteger(page) && page >= 1 && page <= 768));
  day.updateIds.forEach(id => assert.ok(updateIds.has(id), `Day ${day.day}: ${id} exists`));
  day.lessons.forEach(lesson => {
    for (const field of ['title', 'body', 'example', 'remember']) assert.ok(lesson[field]?.trim(), `Day ${day.day}: lesson ${field}`);
    assert.ok(lesson.body.length >= 40);
  });
  assert.equal(day.questions.length, day.day === 30 ? 16 : 4);
  day.questions.forEach(question => {
    assert.ok(question.id && !ids.has(question.id), `Unique question ${question.id}`);
    ids.add(question.id);
    assert.ok(question.prompt?.trim() && !prompts.has(question.prompt), `Distinct prompt: ${question.id}`);
    prompts.add(question.prompt);
    assert.equal(question.options.length, 4);
    assert.equal(new Set(question.options).size, 4);
    question.options.forEach(option => assert.ok(typeof option === 'string' && option.trim()));
    assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 4);
    positions.add(question.answer);
    assert.ok(question.explanation?.trim().length >= 30, `Explanation: ${question.id}`);
    assert.ok(question.topic?.trim());
  });
  assert.ok(!/[\uE000-\uF8FF\uFFFD]/u.test(JSON.stringify(day)), `Day ${day.day}: no damaged OCR glyphs`);
});
assert.equal(positions.size, 4, 'Vary answer positions');
updates.forEach(update => {
  for (const field of ['id', 'title', 'status', 'date', 'checked', 'before', 'after', 'explanation', 'caution']) {
    assert.ok(update[field]?.trim(), `Update ${update.id}: ${field}`);
  }
  assert.equal(update.checked, '2026-11-09');
  assert.ok(update.sources.length >= 1);
  update.sources.forEach(source => {
    assert.ok(source.title.trim());
    assert.equal(new URL(source.url).protocol, 'https:');
  });
});
for (const id of ['isa', 'transaction-tax']) {
  assert.ok(updates.find(update => update.id === id).status.includes('보류'), `${id}: don't claim unverified rules`);
}
assert.ok(updates.find(update => update.id === 'nextrade').after.includes('15:40'));
assert.ok(updates.find(update => update.id === 'deposit').after.includes('1억원'));
for (const [day, id] of [[9, 'settlement'], [15, 'deposit'], [20, 'consumer-protection'], [26, 'exam'], [27, 'company-duty'], [28, 'transaction-tax']]) {
  assert.ok(course[day - 1].updateIds.includes(id), `Day ${day}: related current-rule card is connected`);
}
new vm.Script(fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8'));
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
assert.equal(html, require('./render.cjs').renderPage(html), 'Generated standalone HTML matches source files');
assert.ok(!/<script\b[^>]*\bsrc=|<link\b[^>]*rel="stylesheet"/i.test(html), 'No external scripts or stylesheets');
assert.equal((html.match(/class="static-day" id="day-\d+"/g) || []).length, 30);
assert.equal((html.match(/data-question-id="/g) || []).length, 132);
const staticBody = html.slice(html.indexOf('<!-- basic:content:start -->'), html.indexOf('<!-- basic:content:end -->'));
const escape = value => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
course.forEach(day => {
  assert.ok(html.includes(`href="#day-${day.day}"`));
  day.lessons.forEach(lesson => assert.ok(staticBody.includes(escape(lesson.body)), `Day ${day.day}: actual static lesson text`));
  day.questions.forEach(question => assert.ok(staticBody.includes(`data-question-id="${question.id}"`)));
});
assert.ok(html.includes('lang="ko"'));
assert.ok(!/https?:\/\/.*(?:\.js|\.css)/.test(html), 'No remote runtime dependencies');
assert.ok(fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8').includes('href="basic/index.html"'));
console.log(`PASS: standalone static HTML, ${course.length} days, ${ids.size} questions, ${updates.length} source cards, app syntax and navigation.`);
