// Generate/check: node korean-history/deepen/build-data.cjs [--check]
// Re-extract native PDFKit/Vision source images/OCR: node korean-history/deepen/build-data.cjs --extract
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {execFileSync} = require('node:child_process');

const root = __dirname;
const assets = path.join(root, 'assets');
const sourceDir = path.join(root, 'pdf/test');
const files = fs.readdirSync(sourceDir);
const rounds = Array.from({length: 21}, (_, i) => i + 60);
const choices = '①②③④⑤';
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const oneSource = (round, extension) => {
  const found = files.filter(file => new RegExp(`(?<!\\d)${round}(?!\\d)`, 'u').test(file.normalize('NFC')) && file.endsWith(extension));
  assert.equal(found.length, 1, `${round}: exactly one ${extension} source`);
  return found[0];
};
const url = file => `../pdf/test/${encodeURIComponent(file.normalize('NFC'))}`;
const sourceFiles = rounds.flatMap(round => [oneSource(round, '.pdf'), oneSource(round, '.md')]);
const sourceHashes = Object.fromEntries(sourceFiles.map(file => [file.normalize('NFC'), hash(path.join(sourceDir, file))]));
const extractionSources = {
  extractor: hash(path.join(root, 'extract-papers.swift')),
  papers: Object.fromEntries(sourceFiles.filter(file => file.endsWith('.pdf')).map(file => [file.normalize('NFC'), sourceHashes[file.normalize('NFC')]])),
  assets: {}
};
if (process.argv.includes('--extract')) {
  execFileSync('swift', [path.join(root, 'extract-papers.swift')], {stdio: 'inherit'});
}
const manifestFile = path.join(assets, 'sources.json');
for (const round of rounds) {
  for (const filename of [`${round}-ocr.json`, ...Array.from({length: 12}, (_, i) => `${round}-${i + 1}.jpg`)]) {
    extractionSources.assets[filename] = hash(path.join(assets, filename));
  }
}
if (process.argv.includes('--extract') || process.argv.includes('--record-extraction')) {
  fs.writeFileSync(manifestFile, `${JSON.stringify(extractionSources, null, 2)}\n`);
}
assert.deepEqual(JSON.parse(fs.readFileSync(manifestFile, 'utf8')), extractionSources, 'Source papers/extractor changed: run build-data.cjs --extract');

// Only visually verified OCR errors belong here. Never infer a score from the remaining total.
const overrides = {
  // 65-10.jpg, upper left: printed “39. ㄱ~ㅁ…”; Vision joins the period with ㄱ.
  '65-39': {heading: '39⑦~B에 대한 탐구 활동으로 적절하지 않은 것은?'}
};
const normalizeLines = page => page.lines.map((line, index) => {
  assert.ok(line.column === 0 || line.column === 1, `${page.image}: column-specific OCR required`);
  return {...line, index, x: (line.column + line.x) / 2, width: line.width / 2};
});
function jpegSize(file) {
  const bytes = fs.readFileSync(file);
  assert.equal(bytes.readUInt16BE(0), 0xffd8, `${file}: JPEG signature`);
  for (let offset = 2; offset < bytes.length;) {
    assert.equal(bytes[offset], 0xff, `${file}: JPEG segment`);
    const marker = bytes[offset + 1], length = bytes.readUInt16BE(offset + 2);
    if ([0xc0, 0xc1, 0xc2].includes(marker)) return [bytes.readUInt16BE(offset + 7), bytes.readUInt16BE(offset + 5)];
    offset += length + 2;
  }
  throw Error(`Missing JPEG dimensions: ${file}`);
}

const explanations = {};
const exams = [];
const problems = [];
let containedLines = 0;
let sharedQuestions = 0;
for (const round of rounds) {
  const paper = oneSource(round, '.pdf'), md = oneSource(round, '.md');
  const markdown = fs.readFileSync(path.join(sourceDir, md), 'utf8');
  const source = markdown.match(/https:\/\/history\.hackers\.com\/[^)\s]+/u)?.[0];
  assert.ok(source, `${round}: original source URL`);
  const rows = [...markdown.matchAll(/^\|\s*(\d{1,2})\s*\|\s*([①②③④⑤])\s*\|\s*(.+?)\s*\|$/gmu)];
  assert.equal(rows.length, 50, `${round}: 50 MD answer rows`);
  const pages = JSON.parse(fs.readFileSync(path.join(assets, `${round}-ocr.json`), 'utf8'));
  assert.equal(pages.length, 12, `${round}: 12 source pages`);
  const headings = [];
  for (const page of pages) {
    assert.equal(page.page, pages.indexOf(page) + 1, `${round}: ordered pages`);
    assert.deepEqual(jpegSize(path.join(assets, page.image)), [page.width, page.height], `${page.image}: actual rendered dimensions`);
    const lines = normalizeLines(page);
    for (const line of lines) {
      if (line.y < .06 || line.y > .9 || line.x > line.column * .5 + .09 || line.text.length < 12) continue;
      const verified = Object.entries(overrides).find(([ref, value]) => ref.startsWith(`${round}-`) && value.heading === line.text);
      const match = /^(\d{1,2})[.．]\s*/u.exec(line.text);
      if (verified) {
        headings.push({number: Number(verified[0].split('-')[1]), page, line, lines});
        continue;
      }
      if (!match) continue;
      const number = Number(match[1]);
      if (number < 1 || number > 50) continue;
      headings.push({number, page, line, lines});
    }
  }
  headings.sort((a, b) => a.page.page - b.page.page || a.line.column - b.line.column || a.line.y - b.line.y);
  // Numbered statements inside a source are not question boundaries.
  let expectedNumber = 1;
  for (let i = 0; i < headings.length;) {
    if (headings[i].number === expectedNumber) {
      expectedNumber++;
      i++;
    } else headings.splice(i, 1);
  }
  const numbers = headings.map(item => item.number);
  if (numbers.join(',') !== rows.map(row => row[1]).join(',')) {
    problems.push(`${round}: headings ${numbers.join(',')}`);
    continue;
  }
  const questions = [];
  for (const [i, heading] of headings.entries()) {
    const {number, page, line, lines} = heading;
    const ref = `${round}-${number}`;
    assert.equal(Number(rows[i][1]), number, `${ref}: ordered source answer`);
    const next = headings[i + 1];
    const sameColumn = next && next.page === page && next.line.column === line.column;
    const shared = lines.find(item => /물음에\s*답하시오/u.test(item.text)
      && (() => {
        const range = /(\d{2})\s*[~∼～]\s*(\d{2})/u.exec(item.text);
        return range && number >= Number(range[1]) && number <= Number(range[2]);
      })());
    const crossColumnSource = shared && shared.column !== line.column;
    if (shared) sharedQuestions++;
    const bottom = sameColumn && !crossColumnSource ? next.line.y - .005 : .945;
    // A single rectangle deliberately retains the intervening question when two questions share a source.
    // 66-31 needs both columns: its underlined source is in the left column.
    const top = Math.min(shared ? shared.y : line.y, line.y) - .007;
    const questionLines = lines.filter(item => (crossColumnSource || item.column === line.column) && item.y >= top && item.y < bottom && item.x < (line.column ? .97 : .5)
      && !(item.y > .925 && /^\d{1,2}$/u.test(item.text)));
    const pointLabels = questionLines.filter(item => item.column === line.column && item.y >= line.y - .004 && item.y < line.y + .05 && item.x > line.column * .5 + .35)
      .map(item => item.text.match(/([123])\s*점/u)?.[1]).filter(Boolean);
    const inlinePoints = line.text.match(/([123])\s*점/u)?.[1];
    const detectedPoints = inlinePoints || pointLabels.at(-1);
    const points = overrides[ref]?.points ?? Number(detectedPoints);
    if (![1, 2, 3].includes(points)) {
      problems.push(`${ref}: missing score; heading ${line.text}; labels ${JSON.stringify(questionLines.filter(item => item.y < line.y + .05).map(item => item.text))}`);
      continue;
    }
    // Keep the entire printed column, including artwork whose edges have no OCR text.
    const left = Math.max(0, Math.min(line.column ? .495 : .04, ...questionLines.map(item => item.x - .008)));
    const right = Math.min(1, Math.max(line.column ? .97 : .5, ...questionLines.map(item => item.x + item.width + .008)));
    const crop = [left, top, right, bottom].map(value => Number(value.toFixed(7)));
    assert.ok(crop[0] >= 0 && crop[1] >= 0 && crop[2] <= 1 && crop[3] <= 1 && crop[2] > crop[0] && crop[3] > crop[1], `${ref}: normalized crop`);
    for (const item of questionLines) {
      assert.ok(item.x >= crop[0] - .000001 && item.x + item.width <= crop[2] + .000001 && item.y >= crop[1] - .000001 && item.y + item.height <= crop[3] + .000001, `${ref}: complete OCR line ${item.text}`);
      containedLines++;
    }
    const answer = choices.indexOf(rows[i][2]) + 1;
    const summary = rows[i][3];
    const correction = summary.includes('※') ? summary.slice(summary.indexOf('※') + 1).trim() : undefined;
    explanations[ref] = {answer, paragraphs: [summary], source, pdf: url(md), page: 1, pages: [1], ...(correction ? {correction} : {})};
    questions.push({number, answer, points, page: page.page, image: page.image, width: page.width, height: page.height, crop, text: questionLines.map(item => item.text).join('\n')});
  }
  if (questions.length === 50 && questions.reduce((sum, question) => sum + question.points, 0) !== 100) {
    problems.push(`${round}: score total ${questions.reduce((sum, question) => sum + question.points, 0)}; ${questions.map(question => `${question.number}:${question.points}`).join(' ')}`);
  }
  for (const page of pages) {
    for (const item of normalizeLines(page)) {
      if (item.y > .925) assert.match(item.text, /^\d{1,2}$/u, `${round}-${page.page}: no final option below footer boundary`);
      if (item.y <= .12 || item.y >= .925) continue;
      assert.ok(questions.some(question => question.page === page.page
        && item.x >= question.crop[0] - .000001 && item.x + item.width <= question.crop[2] + .000001
        && item.y >= question.crop[1] - .000001 && item.y + item.height <= question.crop[3] + .000001),
      `${round}-${page.page}: source body text omitted: ${item.text}`);
    }
  }
  // Eight papers have embedded text: independently cross-check every OCR score against it.
  if ([62, 70, 71, 72, 75, 76, 77, 80].includes(round)) {
    const bbox = execFileSync('pdftotext', ['-bbox', path.join(sourceDir, paper), '-'], {encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe']});
    const scores = [];
    for (const pdfPage of bbox.matchAll(/<page width="([\d.]+)"[^>]*>([\s\S]*?)<\/page>/gu)) {
      const labels = [];
      for (const word of pdfPage[2].matchAll(/<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)"[^>]*>(.*?)<\/word>/gu)) {
        const score = /\[([123])점\]/u.exec(word[4]);
        if (score) labels.push({points: Number(score[1]), column: Number(word[3]) > Number(pdfPage[1]) / 2 ? 1 : 0, y: Number(word[2])});
      }
      labels.sort((a, b) => a.column - b.column || a.y - b.y);
      scores.push(...labels.map(label => label.points));
    }
    assert.deepEqual(questions.map(question => question.points), scores, `${round}: independent embedded PDF score labels`);
  }
  exams.push({round, paper: url(paper), key: url(md), questions});
}
assert.equal(problems.length, 0, `Source OCR needs explicit review:\n${problems.join('\n')}`);
assert.equal(exams.length, 21);
assert.equal(exams.flatMap(exam => exam.questions).length, 1050);
assert.equal(sharedQuestions, 14, 'Seven shared sources must be retained for both associated questions');
assert.equal(explanations['61-39'].answer, 3);
assert.equal(explanations['70-47'].answer, 4);
const inputHash = crypto.createHash('sha256').update(JSON.stringify(sourceHashes)).digest('hex');
const header = `// Generated by build-data.cjs from local source papers, column OCR and original MD summaries. Do not edit.\n// Source SHA-256: ${inputHash}\n`;
const outputs = {
  'data.js': `${header}window.HISTORY_EXAMS = ${JSON.stringify(exams)};\n`,
  'explanations.js': `${header}window.HISTORY_EXPLANATIONS = ${JSON.stringify(explanations, null, 2)};\n`
};
for (const [filename, content] of Object.entries(outputs)) {
  const target = path.join(root, filename);
  if (process.argv.includes('--check')) assert.equal(fs.readFileSync(target, 'utf8'), content, `${filename}: stale output`);
  else fs.writeFileSync(target, content);
}
console.log(`PASS: 21 rounds, 1050 ordered five-choice questions/answers, 100 source points per round, 252 JPEG dimensions, ${containedLines} complete OCR lines inside crops, 14 shared-source crops, 400 independent PDF score checks; NFC source URLs and all original MD caveats retained.`);
