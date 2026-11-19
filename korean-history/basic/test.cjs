// Run: node korean-history/basic/test.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const cp = require('node:child_process');
const root = __dirname;
const storage = new Map();
const context = vm.createContext({window:{},document:{querySelector:() => null,addEventListener:() => {}},
  localStorage:{getItem:key => storage.get(key) ?? null,setItem:(key, value) => storage.set(key, value)}});
for (const name of ['data.js', 'concepts.js', 'explanations.js', 'common.js', 'study/visuals.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, name), 'utf8'), context);
}
const {exams, concepts, topics, grade, validAttempt, questionImage, attemptKey, readAttempt, save, conceptLinks} = context.window.HistoryApp;
const explanations = context.window.HISTORY_EXPLANATIONS;
const visuals = context.window.HistoryStudyVisuals;
assert.equal(exams.length, 10);
assert.equal(concepts.length, 65);
assert.equal(exams.reduce((count, exam) => count + exam.questions.length, 0), 500);
assert.equal(Object.keys(topics).length, 500);
assert.equal(Object.keys(explanations).length, 500);
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
    const lastInColumn = !exam.questions.some(other => other.page === question.page &&
      (other.crop[0] < .49) === (left < .49) && other.crop[1] > top);
    if (lastInColumn && question.height === 1702) {
      assert.ok(bottom >= .94, `${ref} retains the complete final option and its bottom margin`);
    }
    if (left < .49) assert.ok(right >= .5, `${ref} complete left-column points label`);
    const image = questionImage(exam, question, {alt:'<source "image">'});
    assert.ok(image.includes('height:auto;') && image.includes('aspect-ratio:'));
    assert.ok(image.includes('alt="&lt;source &quot;image&quot;&gt;"'));
    const explanation = explanations[ref];
    assert.equal(explanation.answer, question.answer, `${ref} explanation follows official answer`);
    assert.ok(explanation.paragraphs.length >= 1 && explanation.paragraphs.every(text => text.length > 3));
    assert.ok(explanation.pages.includes(explanation.page));
    assert.ok(Number.isInteger(explanation.page) && explanation.page > 0);
    assert.ok(fs.existsSync(path.resolve(root, 'test', explanation.pdf)), `${ref} explanation PDF`);
    assert.ok(explanation.source.startsWith('https://history.hackers.com/'));
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
for (const ref of ['67-10','71-11','71-14']) {
  assert.ok(explanations[ref].correction);
  assert.ok(explanations[ref].originalParagraphs.length);
  assert.notEqual(explanations[ref].sourceAnswer, explanations[ref].answer);
}
assert.ok(explanations['67-10'].paragraphs.some(text => text.startsWith('② 호족')));
assert.ok(explanations['71-11'].paragraphs.some(text => text.startsWith('③ 고려 광종')));
assert.ok(explanations['71-14'].paragraphs[0].startsWith('② 영주 부석사'));
cp.execFileSync(process.execPath, [path.join(root, 'build-explanations.cjs'), '--check'], {stdio:'pipe'});
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
  const visual = visuals.render(concept);
  assert.ok(!visual.includes('mode=practice'), `${concept.id} source links default to exam mode`);
  const practiceVisual = visuals.render(concept, 'practice');
  const practiceLinks = [...practiceVisual.matchAll(/href="(\.\.\/test\/index.html[^"]+)"/g)];
  assert.ok(practiceLinks.length && practiceLinks.every(match => match[1].includes('&amp;mode=practice')), `${concept.id} visual source links preserve practice mode`);
  const refs = [...visual.matchAll(/data-study-visual="([\d-]+)"/g)].map(match => match[1]);
  assert.ok(refs.length, `${concept.id} visible source image`);
  assert.equal(new Set(refs).size, refs.length, `${concept.id} distinct visual sources`);
  for (const ref of refs) {
    assert.ok(concept.refs.includes(ref), `${concept.id} relevant visual source ${ref}`);
    const [round, number] = ref.split('-').map(Number);
    const source = exams.find(exam => exam.round === round).questions[number - 1];
    assert.ok(visual.includes(`../assets/${source.image}`), `${concept.id} visual image reference`);
  }
  assert.ok(visuals.memory(concept).includes(context.window.HistoryApp.escape(concept.remember)), `${concept.id} complete accessible memory text`);
}
assert.equal(visuals.emphasize('<script>청동기 & "도구"</script>', ['청동기']),
  '&lt;script&gt;<mark>청동기</mark> &amp; &quot;도구&quot;&lt;/script&gt;');
const attempt = {answers:Array(50).fill(0),marked:[],current:0,submitted:false,remaining:4200,deadline:null};
assert.ok(validAttempt(attempt));
for (const change of [{answers:[1]}, {answers:Array(50).fill(5)}, {current:50}, {marked:[51]}, {remaining:-1}, {remaining:4201}, {deadline:'invalid'}, {submitted:0}]) {
  assert.ok(!validAttempt({...attempt,...change}), `Reject invalid attempt ${JSON.stringify(change)}`);
}
for (const exam of exams) {
  const legacyKey = `kh-basic-attempt-${exam.round}-v1`;
  assert.equal(attemptKey(exam.round), legacyKey, 'Existing exam records retain their storage key');
  assert.equal(attemptKey(exam.round, 'exam'), legacyKey);
  assert.notEqual(attemptKey(exam.round, 'practice'), legacyKey);
  assert.equal(readAttempt(exam.round), null);
  assert.equal(readAttempt(exam.round, 'practice'), null);
  const examAttempt = {...attempt,answers:exam.questions.map(question => question.answer),deadline:Date.now() + 4200000};
  save(legacyKey, examAttempt);
  assert.equal(readAttempt(exam.round).answers[0], examAttempt.answers[0]);
  assert.equal(readAttempt(exam.round, 'practice'), null, 'Practice does not reuse exam answers');
  const practiceAttempt = {...attempt,answers:Array(50).fill(0),submitted:true};
  practiceAttempt.answers[0] = examAttempt.answers[0] % 4 + 1;
  save(attemptKey(exam.round, 'practice'), practiceAttempt);
  assert.equal(grade(exam, readAttempt(exam.round).answers).score, 100);
  assert.equal(grade(exam, readAttempt(exam.round, 'practice').answers).score, 0);
  assert.equal(readAttempt(exam.round).submitted, false);
  assert.equal(readAttempt(exam.round, 'practice').submitted, true);
  save(attemptKey(exam.round, 'practice'), attempt);
  assert.equal(readAttempt(exam.round, 'practice').answers[0], 0);
  assert.equal(readAttempt(exam.round).answers[0], examAttempt.answers[0], 'Practice restart preserves exam answers');
  for (const question of exam.questions) {
    const ref = `${exam.round}-${question.number}`;
    assert.ok(!conceptLinks(ref).includes('mode=practice'), `${ref} default study links remain unchanged`);
    const links = [...conceptLinks(ref, 'practice').matchAll(/href="([^"]+)"/g)];
    assert.ok(links.length && links.every(match => match[1].includes('?mode=practice#')), `${ref} related study links preserve practice mode`);
  }
}
for (const name of ['test/app.js','study/app.js','study/visuals.js']) new vm.Script(fs.readFileSync(path.join(root,name),'utf8'));
for (const name of ['index.html','test/index.html','study/index.html']) {
  const html = fs.readFileSync(path.join(root,name),'utf8');
  assert.ok(html.includes('lang="ko"') && html.includes('name="viewport"'));
  for (const match of html.matchAll(/(?:src|href)="([^"#?]+)(?:[#?][^"]*)?"/g)) {
    if (/^(?:https?:|data:)/.test(match[1])) continue;
    assert.ok(fs.existsSync(path.resolve(root,path.dirname(name),match[1])), `${name} local reference: ${match[1]}`);
  }
}
console.log(`PASS: ${exams.length} exams, 500 complete crops and PDF explanations, official answers/weights, ${concepts.length} linked lessons, source assets, scoring, state validation, independent exam/practice records and mode-aware navigation.`);
