// Run: /opt/homebrew/opt/node@22/bin/node korean-history/basic/build-explanations.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {execFileSync} = require('node:child_process');

const root = __dirname;
const context = {window: {}};
vm.runInNewContext(fs.readFileSync(path.join(root, 'data.js'), 'utf8'), context);
const exams = context.window.HISTORY_EXAMS;
const choices = '①②③④';
const withoutWhitespace = text => text.replace(/\s/gu, '');
const files = fs.readdirSync(path.join(root, 'pdf'));
const explanations = {};
const disagreements = [];
let spanningQuestions = 0;
const corrections = {
  '67-10': {
    note: '원문 해설의 ①·② 보기 번호를 문제지와 공식 정답표에 맞게 바로잡았습니다.',
    apply: paragraphs => paragraphs.map(text => text.replace(/[①②]/gu, choice => choice === '①' ? '②' : '①'))
  },
  '71-11': {
    note: '원문 해설의 ③·④ 보기 번호를 문제지와 공식 정답표에 맞게 바로잡았습니다.',
    apply: paragraphs => paragraphs.map(text => text.replace(/[③④]/gu, choice => choice === '③' ? '④' : '③'))
  },
  '71-14': {
    note: '원문 해설 첫 문장의 정답 번호 ③을 문제지와 공식 정답표에 따라 ②로 바로잡았습니다.',
    apply: paragraphs => paragraphs.map((text, index) => index === 0 ? text.replace(/^③/u, '②') : text)
  }
};

for (const exam of exams) {
  const filename = files.find(file => file.normalize('NFC') === `${exam.round}회_기본_해설.pdf`);
  assert.ok(filename, `${exam.round}: explanation PDF exists`);
  const text = execFileSync('pdftotext', ['-layout', path.join(root, 'pdf', filename), '-'], {encoding: 'utf8'});
  const sources = [...text.matchAll(/https?:\/\/\S+/gu)].map(match => match[0]);
  assert.equal(sources.length, 1, `${exam.round}: one original article URL`);
  const questions = [];
  let current;
  const pages = text.split('\f');
  if (!pages.at(-1).trim()) pages.pop();

  for (const [index, rawPage] of pages.entries()) {
    const page = index + 1;
    const lines = rawPage.split(/\r?\n/u).map(line => line.trim()).filter(Boolean);
    assert.equal(lines.shift(), `한국사능력검정시험 기본 · 제${exam.round}회 해설`, `${exam.round}: page ${page} header`);
    assert.equal(lines.pop(), `해커스한국사 원문 해설 · ${page}`, `${exam.round}: page ${page} footer`);
    for (const line of lines) {
      const heading = /^(\d{1,2})\.\s*([①②③④])$/u.exec(line);
      if (heading) {
        const number = Number(heading[1]);
        assert.equal(number, questions.length + 1, `${exam.round}: consecutive question boundary`);
        current = {number, sourceAnswer: choices.indexOf(heading[2]) + 1, page, pages: [page], lines: []};
        questions.push(current);
      } else if (current) {
        current.lines.push(line);
        if (current.pages.at(-1) !== page) current.pages.push(page);
      } else {
        assert.equal(page, 1, `${exam.round}: front matter only on the first page`);
      }
    }
  }

  assert.equal(questions.length, 50, `${exam.round}: exactly 50 explanation headings`);
  assert.equal(exam.questions.length, 50, `${exam.round}: exactly 50 official questions`);
  const officialText = execFileSync('pdftotext', [
    '-layout', path.resolve(root, 'test', exam.key), '-'
  ], {encoding: 'utf8'});
  const official = new Map([...officialText.matchAll(/(\d+)\s+([①②③④])\s+([123])(?=\s|$)/gu)]
    .map(match => [Number(match[1]), {answer: choices.indexOf(match[2]) + 1, points: Number(match[3])}]));
  assert.equal(official.size, 50, `${exam.round}: 50 original answer PDF entries`);

  for (const question of questions) {
    const ref = `${exam.round}-${question.number}`;
    const officialQuestion = exam.questions.find(item => item.number === question.number);
    assert.ok(officialQuestion, `${ref}: official question exists`);
    assert.equal(officialQuestion.answer, official.get(question.number).answer, `${ref}: original official answer`);
    assert.equal(officialQuestion.points, official.get(question.number).points, `${ref}: original official points`);
    if (question.sourceAnswer !== officialQuestion.answer) {
      disagreements.push(`${ref}: source ${question.sourceAnswer}, official ${officialQuestion.answer}`);
    }

    // Only whitespace and paragraph boundaries change; source wording (including errors) is retained.
    const paragraphs = question.lines.join(' ').replace(/\s+/gu, ' ')
      .replace(/오답\s+설명/gu, '\n오답 설명\n')
      .replace(/(?<=[.!?])\s+(?=[①②③④])/gu, '\n')
      .split('\n').map(paragraph => paragraph.trim()).filter(Boolean);
    assert.ok(paragraphs.length && paragraphs.every(paragraph => paragraph.length), `${ref}: nonempty explanation`);
    assert.equal(withoutWhitespace(paragraphs.join('')), withoutWhitespace(question.lines.join('')), `${ref}: every source character retained`);
    assert.ok(!/한국사능력검정시험|해커스한국사|https?:\/\/|게시글 본문|원문 해설/u.test(paragraphs.join('')), `${ref}: no running title or attribution`);
    assert.ok(!/(?:^|\n)\s*\d{1,2}\.\s*[①②③④](?:\s|$)/u.test(paragraphs.join('\n')), `${ref}: no adjacent question heading`);
    assert.ok(!/[\uE000-\uF8FF\uFFFD]/u.test(paragraphs.join('')), `${ref}: no damaged glyphs`);
    assert.ok(question.pages.every((page, index) => page === question.page + index), `${ref}: consecutive PDF pages`);
    if (question.pages.length > 1) spanningQuestions++;
    explanations[ref] = {
      answer: officialQuestion.answer,
      paragraphs: corrections[ref] ? corrections[ref].apply(paragraphs) : paragraphs,
      pdf: `../pdf/${filename}`,
      page: question.page,
      pages: question.pages,
      source: sources[0],
      ...(corrections[ref] ? {
        sourceAnswer: question.sourceAnswer,
        originalParagraphs: paragraphs,
        correction: corrections[ref].note
      } : {})
    };
  }
}

assert.equal(Object.keys(explanations).length, 500, 'All 500 explanations present');
assert.deepEqual(disagreements, [
  '67-10: source 1, official 2',
  '71-11: source 4, official 3',
  '71-14: source 3, official 2'
], 'Known source heading errors must be explicitly reviewed if they change');
const output = [
  '// Generated from local explanation PDFs by build-explanations.cjs.',
  '// Official answers are authoritative; three source numbering errors have documented, source-preserving corrections.',
  ...disagreements.map(issue => `// Source heading disagreement: ${issue}.`),
  `window.HISTORY_EXPLANATIONS = ${JSON.stringify(explanations, null, 2)};`,
  ''
].join('\n');
const target = path.join(root, 'explanations.js');
if (process.argv.includes('--check')) {
  assert.equal(fs.readFileSync(target, 'utf8'), output, 'Committed output matches local PDF extraction');
} else {
  fs.writeFileSync(target, output);
}
console.log(`PASS: 500 explanations; all official answers/points checked; ${spanningQuestions} cross-page explanations; source characters, boundaries, pages and NFD filenames verified.`);
for (const issue of disagreements) console.warn(`SOURCE NUMBERING CORRECTED: ${issue}; original wording retained separately.`);
