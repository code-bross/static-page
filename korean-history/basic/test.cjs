// Run: node korean-history/basic/test.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const cp = require('node:child_process');
const root = __dirname;
const context = vm.createContext({window:{},document:{querySelector:() => null}});
for (const name of ['data.js', 'concepts.js', 'common.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, name), 'utf8'), context);
}
const {exams, concepts, topics, grade, validAttempt} = context.window.HistoryApp;
assert.equal(exams.length, 8);
assert.equal(concepts.length, 65);
assert.equal(exams.reduce((count, exam) => count + exam.questions.length, 0), 400);
assert.equal(Object.keys(topics).length, 400);
const conceptIds = new Set(concepts.map(concept => concept.id));
assert.equal(conceptIds.size, concepts.length);
const questionIds = new Set();
for (const exam of exams) {
  assert.equal(exam.questions.length, 50);
  assert.equal(exam.questions.reduce((total, question) => total + question.points, 0), 100);
  for (const source of [exam.paper, exam.key]) {
    assert.ok(fs.existsSync(path.resolve(root, 'test', source)), `Source exists: ${source}`);
  }
  const raw = cp.execFileSync('pdftotext', ['-layout',path.resolve(root,'test',exam.key),'-'], {encoding:'utf8'});
  const official = new Map([...raw.matchAll(/(\d+)\s+([①②③④])\s+([123])(?=\s|$)/g)].map(match => [Number(match[1]),{answer:'①②③④'.indexOf(match[2]) + 1,points:Number(match[3])}]));
  assert.equal(official.size, 50);
  exam.questions.forEach((question, index) => {
    const ref = `${exam.round}-${question.number}`;
    questionIds.add(ref);
    assert.equal(question.number, index + 1);
    assert.equal(question.answer, official.get(question.number).answer, `${ref} official answer`);
    assert.equal(question.points, official.get(question.number).points, `${ref} official weight`);
    assert.ok(question.text.length > 30, `${ref} supporting OCR text`);
    assert.ok(fs.existsSync(path.join(root, 'assets', question.image)), `${ref} image`);
    const [left, top, right, bottom] = question.crop;
    assert.ok(left >= 0 && left < right && right <= 1);
    assert.ok(top >= 0 && top < bottom && bottom <= 1);
    assert.ok((bottom - top) * question.height > 100, `${ref} crop is substantial`);
    assert.ok(topics[ref]?.length, `${ref} concept mapping`);
    for (const id of topics[ref]) {
      assert.ok(conceptIds.has(id), `${ref} valid concept`);
      assert.ok(concepts.find(concept => concept.id === id).refs.includes(ref), `${ref} backlink`);
    }
  });
  assert.equal(grade(exam, exam.questions.map(question => question.answer)).score, 100);
  assert.equal(grade(exam, Array(50).fill(0)).score, 0);
  assert.equal(grade(exam, Array(50).fill(0)).unanswered, 50);
  const partial = exam.questions.map((question, index) => index % 2 ? 0 : question.answer);
  assert.equal(grade(exam, partial).correct, 25);
  assert.equal(grade(exam, partial).score, exam.questions.filter((question, index) => index % 2 === 0).reduce((total, question) => total + question.points, 0));
}
for (const concept of concepts) {
  assert.ok(/^[a-z][a-z0-9-]*$/.test(concept.id));
  for (const field of ['title','era','summary','remember']) assert.ok(concept[field]?.length > 1);
  assert.ok(concept.summary.length >= 50);
  assert.ok(concept.points.length >= 3);
  assert.ok(concept.keywords.length >= 3);
  assert.ok(concept.quiz.prompt && concept.quiz.answer);
  assert.ok(concept.refs.length);
  assert.equal(new Set(concept.refs).size, concept.refs.length);
  concept.refs.forEach(ref => {
    assert.ok(questionIds.has(ref), `${concept.id} source exists: ${ref}`);
    assert.ok(topics[ref].includes(concept.id), `${concept.id} inverse mapping: ${ref}`);
  });
  assert.ok(!/[\uE000-\uF8FF\uFFFD]/u.test(JSON.stringify(concept)), `${concept.id} no damaged glyphs`);
}
const attempt = {answers:Array(50).fill(0),marked:[],current:0,submitted:false,remaining:4200,deadline:null};
assert.ok(validAttempt(attempt));
for (const change of [{answers:[1]}, {current:50}, {marked:[51]}, {remaining:-1}, {deadline:'invalid'}, {submitted:0}]) {
  assert.ok(!validAttempt({...attempt,...change}), `Reject invalid attempt ${JSON.stringify(change)}`);
}
for (const name of ['test/app.js','study/app.js']) new vm.Script(fs.readFileSync(path.join(root,name),'utf8'));
for (const name of ['index.html','test/index.html','study/index.html']) {
  const html = fs.readFileSync(path.join(root,name),'utf8');
  assert.ok(html.includes('lang="ko"') && html.includes('name="viewport"'));
  for (const match of html.matchAll(/(?:src|href)="([^"#?]+)(?:[#?][^"]*)?"/g)) {
    if (/^(?:https?:|data:)/.test(match[1])) continue;
    assert.ok(fs.existsSync(path.resolve(root,path.dirname(name),match[1])), `${name} local reference: ${match[1]}`);
  }
}
console.log(`PASS: ${exams.length} exams, 400 official answers/weights, ${concepts.length} linked lessons, source assets, scoring, state validation and local navigation.`);
