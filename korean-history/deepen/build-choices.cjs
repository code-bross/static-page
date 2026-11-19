// Generate/check separated source choices: node korean-history/deepen/build-choices.cjs [--check]
// Recreate pixel-label evidence and option JPEGs: add --extract.
// Geometry-only edits: --measure --verify-text. Optional source contact sheets: --diagnose, then swift crop-choices.swift --contact.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const root = __dirname, assets = path.join(root, 'assets'), output = path.join(assets, 'choices');
const check = process.argv.includes('--check');
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const json = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const rounded = crop => crop.map(v => +v.toFixed(7));
const circles = '①②③④⑤';
// Visually reviewed 68-12.jpg: these letter captions sit ABOVE, not below, the pottery.
const captionRows = {'68-49': [.432, .504]};
// Original labels were checked on the annotated source sheets; geometry, not OCR, determines order.
const reviewedOCRSequences = new Set(['60-25', '60-32', '63-18', '64-42', '65-12', '66-16', '66-33', '66-43', '66-48', '66-50', '67-8', '67-17', '67-32', '67-42', '67-43', '69-42', '73-40', '74-19', '74-49', '78-26']);
if (check) assert.ok(fs.existsSync(output), 'Missing checked-in extraction evidence');
else fs.mkdirSync(output, {recursive: true});
const context = {window: {}};
vm.runInNewContext(fs.readFileSync(path.join(root, 'data.js'), 'utf8'), context);
const exams = JSON.parse(JSON.stringify(context.window.HISTORY_EXAMS));
const questionsById = Object.fromEntries(exams.flatMap(e => e.questions.map(q => [`${e.round}-${q.number}`, q])));
if (process.argv.includes('--extract')) execFileSync('swift', [path.join(root, 'crop-choices.swift'), '--detect'], {stdio: 'inherit'});
const detected = json(path.join(output, 'labels.json'));
if (check) assert.ok(fs.existsSync(path.join(output, 'columns.json')), 'Missing column measurements; regenerate choices');
if (!fs.existsSync(path.join(output, 'columns.json')) || process.argv.includes('--extract')) execFileSync('swift', [path.join(root, 'crop-choices.swift'), '--columns'], {stdio: 'inherit'});
const columnDividers = json(path.join(output, 'columns.json'));
const nativeRounds = [62, 70, 71, 72, 75, 76, 77, 80];
const nativeFile = path.join(output, 'native.json');
if (check) assert.ok(fs.existsSync(nativeFile), 'Missing native PDF text evidence; regenerate choices');
if (!fs.existsSync(nativeFile) || process.argv.includes('--extract')) {
  const native = {};
  const unescape = s => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'");
  for (const round of nativeRounds) {
    const paper = fs.readdirSync(path.join(root, 'pdf/test')).find(f => f.endsWith('.pdf') && new RegExp(`(?<!\\d)${round}(?!\\d)`).test(f.normalize('NFC')));
    const xml = execFileSync('pdftotext', ['-bbox', path.join(root, 'pdf/test', paper), '-'], {encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe']});
    native[round] = [...xml.matchAll(/<page width="([\d.]+)" height="([\d.]+)">([\s\S]*?)<\/page>/g)].map(p =>
      [...p[3].matchAll(/<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">(.*?)<\/word>/g)].map(w => ({
        text: unescape(w[5]), x: +w[1] / +p[1], y: +w[2] / +p[2], width: (+w[3] - +w[1]) / +p[1], height: (+w[4] - +w[2]) / +p[2]
      })));
  }
  fs.writeFileSync(nativeFile, JSON.stringify(native));
}
const native = json(nativeFile);
const results = {}, diagnostics = [], images = [], auditQuestions = {}, measureInput = [], verifyInput = [], review = [];
const measurements = fs.existsSync(path.join(output, 'measurements.json')) ? json(path.join(output, 'measurements.json')) : {};
const verified = fs.existsSync(path.join(output, 'verified-text.json')) ? json(path.join(output, 'verified-text.json')) : {};
const comparable = text => text.replace(/^[①②③④⑤]\s*/, '').replace(/\s/g, '');
const paperHashes = {};
const sourceAudit = json(path.join(assets, 'sources.json'));
assert.equal(hash(path.join(root, 'extract-papers.swift')), sourceAudit.extractor, 'Original page extraction is stale');
for (const file of fs.readdirSync(path.join(root, 'pdf/test')).filter(f => f.endsWith('.pdf'))) {
  const digest = hash(path.join(root, 'pdf/test', file));
  assert.equal(digest, sourceAudit.papers[file.normalize('NFC')], `${file}: rerun original page extraction`);
  const round = exams.find(e => new RegExp(`(?<!\\d)${e.round}(?!\\d)`).test(file.normalize('NFC'))).round;
  paperHashes[round] = digest;
}
const ocrExtractorHash = hash(path.join(root, 'crop-choices.swift'));
function inside(crop, bounds, epsilon = .000002) {
  return crop[0] >= bounds[0] - epsilon && crop[1] >= bounds[1] - epsilon && crop[2] <= bounds[2] + epsilon && crop[3] <= bounds[3] + epsilon;
}
function jpegSize(bytes) {
  assert.equal(bytes.readUInt16BE(0), 0xffd8, 'JPEG signature');
  for (let offset = 2; offset < bytes.length;) {
    assert.equal(bytes[offset], 0xff, 'JPEG segment');
    const marker = bytes[offset + 1], length = bytes.readUInt16BE(offset + 2);
    if ([0xc0, 0xc1, 0xc2].includes(marker)) return [bytes.readUInt16BE(offset + 7), bytes.readUInt16BE(offset + 5)];
    offset += length + 2;
  }
  throw Error('Missing JPEG dimensions');
}
function rowsOf(labels) {
  const rows = [];
  for (const item of [...labels].sort((a, b) => a.y - b.y || a.x - b.x)) {
    let row = rows.find(r => Math.abs(r[0].y - item.y) < .008);
    if (!row) rows.push(row = []);
    row.push(item);
  }
  return rows.map(r => r.sort((a, b) => a.x - b.x));
}
for (const exam of exams) {
  const pages = json(path.join(assets, `${exam.round}-ocr.json`)).map(p => ({
    ...p, lines: p.lines.map(l => ({...l, x: (l.column + l.x) / 2, width: l.width / 2}))
  }));
  const heads = exam.questions.map(q => {
    const lines = pages[q.page - 1].lines;
    const found = lines.filter(l => l.text.length >= 12 && (new RegExp(`^${q.number}[.．]`).test(l.text) || (exam.round === 65 && q.number === 39 && l.text.startsWith('39⑦')))
      && l.x >= q.crop[0] && l.x < q.crop[2] && l.y >= q.crop[1] && l.y < q.crop[3]);
    assert.equal(found.length, 1, `${exam.round}-${q.number}: unique question heading`);
    return found[0];
  });
  for (const [qi, q] of exam.questions.entries()) {
    const id = `${exam.round}-${q.number}`, page = pages[q.page - 1], head = heads[qi], column = head.column;
    const next = exam.questions[qi + 1], nextHead = heads[qi + 1];
    const footer = page.lines.filter(l => l.y > .925 && /^\d{1,2}$/.test(l.text) && l.x > .46 && l.x < .56).map(l => l.y - .008);
    // Older, taller papers put the page-number triangle above the OCR footer baseline.
    const bottom = Math.min(next && next.page === q.page && nextHead.column === column ? nextHead.y - .005 : .945, q.height === 1800 ? .918 : .945, ...footer);
    const left = Math.max(q.crop[0], column ? .505 : .045), right = Math.min(q.crop[2], column ? .955 : .49);
    const body = page.lines.filter(l => l.column === column && l.y > head.y + .023 && l.y < bottom);
    const candidates = detected[q.image].filter(l => l.box[0] / q.width > left && l.box[2] / q.width < right
      && l.box[1] / q.height > head.y + .023 && l.box[3] / q.height < bottom)
      .map(l => ({x: l.box[0] / q.width, y: l.box[1] / q.height, width: (l.box[2] - l.box[0] + 1) / q.width, height: (l.box[3] - l.box[1] + 1) / q.height, label: l.label, score: l.score, scores: l.scores, pixel: true}));
    for (const line of body) {
      const match = /^([①②③④⑤])/.exec(line.text);
      if (!match) continue;
      const label = circles.indexOf(match[1]) + 1;
      const pixel = candidates.filter(c => c.pixel && Math.abs(c.x - line.x) < .02 && Math.abs(c.y - line.y) < .007)
        .sort((a, b) => Math.abs(a.x - line.x) + a.scores[label - 1] * .03 - Math.abs(b.x - line.x) - b.scores[label - 1] * .03)[0];
      if (pixel) { pixel.label = label; pixel.ocr = true; }
      else candidates.push({x: line.x, y: line.y, width: .014, height: line.height, label, score: .08, ocr: true});
    }
    // Native glyph boxes recover multiple short choices combined into a single OCR line.
    for (const word of native[exam.round]?.[q.page - 1] || []) {
      if (!/^[①②③④⑤]/.test(word.text) || word.x < left || word.x >= right || word.y < head.y + .023 || word.y >= bottom) continue;
      const label = circles.indexOf(word.text[0]) + 1;
      const prior = candidates.find(c => Math.abs(c.x - word.x) < .009 && Math.abs(c.y - word.y) < .01);
      if (prior) { prior.label = label; prior.native = true; }
      else candidates.push({...word, width: .014, label, score: 0, native: true});
    }
    const ordered = rowsOf(candidates).flat();
    // Option labels are a numbered, spatially ordered suffix, not arbitrary circled source statements.
    let best;
    function consider(chosen) {
      const rows = rowsOf(chosen);
      if (![1, 2, 3, 5].includes(rows.length)) return;
      if (rows.length === 5) {
        const xs = chosen.map(c => c.x);
        if (Math.max(...xs) - Math.min(...xs) > .007) return;
      } else {
        if (rows.length === 2 && ![2, 3].includes(rows[0].length)) return;
        if (rows.length === 3 && rows.some(r => r.length > 2)) return;
        if (rows.some(row => row.some((c, i) => i && c.x - row[i - 1].x < .045))) return;
        if (rows.some(r => Math.abs(r[0].x - rows[0][0].x) > .009)) return;
        if (rows.some(r => r.some((c, i) => rows[0][i] && Math.abs(rows[0][i].x - c.x) > .009))) return;
      }
      let penalty = chosen.reduce((s, c, i) => s + (c.label === i + 1 ? 0 : (c.native ? 1 : c.ocr ? .3 : .14)) + c.score * .3 - (c.ocr || c.native ? .15 : 0), 0);
      penalty += (bottom - chosen.at(-1).y) * 1.5;
      if (!best || penalty < best.penalty) best = {chosen, penalty};
    }
    function search(start, chosen) {
      if (chosen.length === 5) { consider(chosen); return; }
      for (let i = start; i <= ordered.length - (5 - chosen.length); i++) {
        const c = ordered[i], previous = chosen.at(-1);
        if (previous && Math.abs(c.y - previous.y) < .008 && c.x - previous.x < .045) continue;
        if (previous && c.y - previous.y > .008 && Math.abs(c.x - chosen[0].x) > .009) continue;
        search(i + 1, [...chosen, c]);
      }
    }
    search(0, []);
    if (!best) {
      diagnostics.push({id, reason: 'fewer than five labels', candidates});
      continue;
    }
    const chosen = best.chosen, rows = rowsOf(chosen);
    const rowTops = rows.map((row, i) => captionRows[id]?.[i] ?? Math.min(...row.map(c => c.y)) - .004);
    const optionTop = rowTops[0];
    // Printed dividers shift on recto/verso pages; measured pixels retain long text without paper rules.
    const divider = columnDividers[q.image];
    const fullLeft = column ? Math.max(q.crop[0], (divider[1] + 4) / q.width) : Math.max(q.crop[0], .04);
    const fullRight = column ? q.crop[2] : Math.min(q.crop[2], (divider[0] - 3) / q.width);
    const options = [];
    for (const [ri, row] of rows.entries()) {
      const rowTop = rowTops[ri];
      const rowBottom = rowTops[ri + 1] ?? bottom;
      for (const [ci, label] of row.entries()) {
        const i = chosen.indexOf(label);
        const l = ci ? label.x - .002 : fullLeft;
        const r = row[ci + 1] ? row[ci + 1].x - .002 : fullRight;
        const crop = rounded([l, rowTop, r, rowBottom]);
        // 65-1.jpg: the narrow third artifact extends below the second-row labels.
        // Its otherwise empty third column must not leak into the fifth option.
        if (id === '65-4' && i === 2) crop[3] = +(rowBottom + .008).toFixed(7);
        if (id === '65-4' && i === 4) crop[2] = +(chosen[2].x - .002).toFixed(7);
        const contained = body.filter(t => t.x >= l - .002 && t.x + t.width <= r + .003 && t.y >= rowTop - .001 && t.y < rowBottom - .002).sort((a, b) => a.y - b.y || a.x - b.x);
        const words = (native[exam.round]?.[q.page - 1] || []).filter(t => t.x >= l - .002 && t.x + t.width <= r + .003 && t.y >= rowTop - .003 && t.y + t.height <= rowBottom + .003);
        const wordRows = [];
        for (const word of words.sort((a, b) => a.y - b.y || a.x - b.x)) {
          let wr = wordRows.find(wr => Math.abs(wr[0].y - word.y) < .005);
          if (!wr) wordRows.push(wr = []);
          wr.push(word);
        }
        const nativeText = wordRows.map(wr => wr.sort((a, b) => a.x - b.x).map(w => w.text.replace(/[\u0000-\u001f\u200b-\u200f]/g, '')).join(' ')).join('\n').replace(/^[①②③④⑤]\s*/, '').trim();
        const ocrText = contained.map(t => t.text).join('\n').replace(/^[①②③④⑤]\s*/, '').trim();
        const measureID = `${id}-${i + 1}`;
        measureInput.push({id: measureID, source: q.image, crop, regions: [...contained, ...words].map(t => [t.x, t.y, t.x + t.width, t.y + t.height])});
        const measured = measurements[measureID];
        const validMeasure = measured && JSON.stringify(measured.crop) === JSON.stringify(crop);
        const text = nativeText || ocrText;
        const safeOCR = !nativeText && rows.length === 5 && contained.length >= 1 && contained.length <= 3 && Math.abs(contained[0].y - label.y) < .01
          && /^[가-힣0-9]/u.test(text) && /^[가-힣0-9\s,.·…()『』「」【】~\-ㆍ%]+$/u.test(text) && /다\.$/.test(text);
        const sourceHash = `${paperHashes[exam.round]}:${ocrExtractorHash}`;
        if (safeOCR) verifyInput.push({id: measureID, round: exam.round, page: q.page, crop, text, sourceHash});
        const agreement = verified[measureID] && JSON.stringify(verified[measureID].crop) === JSON.stringify(crop)
          && verified[measureID].sourceHash === sourceHash && verified[measureID].confidence >= .5 && comparable(verified[measureID].text) === comparable(text);
        const plain = validMeasure && measured.outside < 25 && measured.outside / measured.ink < .01
          && !/[①②③④⑤�]/.test(text) && (nativeText.length > 0 || (safeOCR && agreement));
        const file = `${id}-${i + 1}.jpg`;
        const finalCrop = validMeasure ? rounded(measured.tight) : crop;
        if (validMeasure) {
          assert.ok(inside(finalCrop, q.crop), `${measureID}: choice inside original question`);
          assert.ok(measured.ink > 70, `${measureID}: nonempty source content`);
          assert.ok((finalCrop[2] - finalCrop[0]) * q.width > 25 || (finalCrop[3] - finalCrop[1]) * q.height > 35, `${measureID}: more than a number bubble`);
          const center = [label.x + Math.min(label.width, .014) / 2, label.y + label.height / 2];
          assert.ok(center[0] >= finalCrop[0] - .004 && center[0] <= finalCrop[2] + .004 && center[1] >= finalCrop[1] - .004 && center[1] <= finalCrop[3] + .004, `${measureID}: original ordered label retained`);
        }
        options[i] = {text: plain ? text : '', crop: finalCrop, ...(!plain ? {image: `choices/${file}`, alt: `제${exam.round}회 ${q.number}번 ${circles[i]} 원문 선택지`} : {})};
        if (!plain) images.push({source: q.image, file, crop: finalCrop});
      }
    }
    const shared = page.lines.find(l => /물음에\s*답하시오/.test(l.text) && (() => {
      const range = /(\d{2})\s*[~∼～]\s*(\d{2})/.exec(l.text);
      return range && q.number >= +range[1] && q.number <= +range[2];
    })());
    const stem = [];
    if (shared) {
      const firstNumber = +/(\d{2})\s*[~∼～]\s*(\d{2})/.exec(shared.text)[1];
      const firstHead = heads[firstNumber - 1];
      if (q.number !== firstNumber) stem.push({crop: rounded([Math.max(q.crop[0], shared.column ? .495 : .04), shared.y - .007, Math.min(q.crop[2], shared.column ? .97 : .5), firstHead.y - .007])});
    }
    stem.push({crop: rounded([Math.max(q.crop[0], column ? .495 : .04), shared && q.number === +/(\d{2})\s*[~∼～]/.exec(shared.text)[1] ? shared.y - .007 : head.y - .007, Math.min(q.crop[2], column ? .97 : .5), optionTop])});
    for (const fragment of stem) assert.ok(inside(fragment.crop, q.crop), `${id}: explicit context inside original question crop`);
    const promptLines = page.lines.filter(l => l.column === column && l.y >= head.y - .001 && l.y < optionTop - .001);
    for (const line of promptLines) assert.ok(stem.some(s => inside([line.x, line.y, line.x + line.width, line.y + line.height], s.crop, .004)), `${id}: complete prompt/source line: ${line.text}`);
    for (let a = 0; a < 5; a++) for (let b = a + 1; b < 5; b++) {
      const x = options[a].crop, y = options[b].crop;
      assert.ok(Math.min(x[2], y[2]) - Math.max(x[0], y[0]) <= .000001 || Math.min(x[3], y[3]) - Math.max(x[1], y[1]) <= .000001, `${id}: independent, nonoverlapping option regions`);
    }
    results[id] = {stem, options};
    if (rows.length !== 5 || shared || best.penalty > .7 || chosen.some((c, i) => (c.ocr || c.native) && c.label !== i + 1)) review.push({id, source: q.image, crop: q.crop, options: options.map(o => o.crop)});
    auditQuestions[id] = {source: q.image, originalCrop: q.crop, column, rows: rows.map(r => r.length), labels: chosen.map((c, i) => ({number: i + 1, x: c.x, y: c.y, evidence: c.native ? 'native' : c.ocr ? 'ocr' : 'pixel', recognized: c.label})), penalty: +best.penalty.toFixed(4), shared: !!shared};
    if (best.penalty > .7 || chosen.some((c, i) => (c.ocr || c.native) && c.label !== i + 1)) {
      diagnostics.push({id, reason: 'review label sequence', penalty: best.penalty, chosen});
      assert.ok(reviewedOCRSequences.has(id), `${id}: new label ambiguity requires source review`);
    }
  }
}
if (process.argv.includes('--verify-text')) {
  fs.writeFileSync(path.join(output, 'verify-input.json'), JSON.stringify(verifyInput));
  execFileSync('swift', [path.join(root, 'crop-choices.swift'), '--verify-text'], {stdio: 'inherit'});
  execFileSync(process.execPath, [__filename, ...process.argv.slice(2).filter(a => a !== '--verify-text')], {stdio: 'inherit'});
  process.exit(0);
}
if (process.argv.includes('--measure') || process.argv.includes('--extract')) {
  assert.equal(measureInput.length, 5250, 'Resolve missing option labels before measuring');
  fs.writeFileSync(path.join(output, 'measure-input.json'), JSON.stringify(measureInput));
  execFileSync('swift', [path.join(root, 'crop-choices.swift'), '--measure'], {stdio: 'inherit'});
  execFileSync(process.execPath, [__filename, ...process.argv.slice(2).filter(a => !['--measure', '--extract'].includes(a)), ...(process.argv.includes('--extract') ? ['--verify-text'] : [])], {stdio: 'inherit'});
  process.exit(0);
}
if (process.argv.includes('--diagnose')) {
  fs.writeFileSync(path.join(output, 'diagnostics.json'), JSON.stringify(diagnostics, null, 2));
  fs.writeFileSync(path.join(output, 'draft.json'), JSON.stringify(results));
  fs.writeFileSync(path.join(output, 'review.json'), JSON.stringify(review));
  fs.writeFileSync(path.join(output, 'measure-input.json'), JSON.stringify(measureInput));
  fs.writeFileSync(path.join(output, 'verify-input.json'), JSON.stringify(verifyInput));
  console.log(`${Object.keys(results).length} questions; ${diagnostics.length} diagnostic cases; ${images.length} images`);
  process.exit(0);
}
assert.equal(Object.keys(results).length, 1050, 'Every question must have five complete options');
assert.equal(fs.readFileSync(path.join(output, 'measure-input.json'), 'utf8'), JSON.stringify(measureInput), 'Geometry/text regions changed: rerun with --measure');
assert.equal(fs.readFileSync(path.join(output, 'verify-input.json'), 'utf8'), JSON.stringify(verifyInput), 'Clear OCR candidates changed: rerun with --verify-text');
for (const item of measureInput) {
  assert.deepEqual(measurements[item.id]?.crop, item.crop, `${item.id}: measured source content must match geometry`);
  assert.deepEqual(measurements[item.id]?.edgeInk, [0, 0, 0, 0], `${item.id}: source lettering/artwork must not cross any raw crop edge`);
}
for (const item of verifyInput) {
  assert.equal(verified[item.id]?.sourceHash, item.sourceHash, `${item.id}: independently verified original source`);
  assert.deepEqual(verified[item.id]?.crop, item.crop, `${item.id}: verification geometry`);
}
assert.equal(Object.values(results).filter(q => q.stem.length === 2).length, 7, 'Shared second questions exclude previous questions/options');
assert.equal(results['66-31'].stem.length, 2, '66-31 keeps left-column context and current right-column prompt only');
for (const [id, entry] of Object.entries(results)) {
  assert.equal(entry.options.length, 5, `${id}: five options`);
  assert.ok(entry.options.every(Boolean), `${id}: no missing option slot`);
  for (const item of [...entry.stem, ...entry.options]) {
    const [l, t, r, b] = item.crop;
    assert.ok(l >= 0 && t >= 0 && r <= 1 && b <= 1 && r > l && b > t, `${id}: source rectangle`);
  }
  for (const option of entry.options) assert.ok(option.text.length > 0 || option.image, `${id}: no number-only choice`);
}
const manifest = {images, questions: auditQuestions, visuallyReviewed: review.map(r => r.id), captionRows, extendedArtwork: ['65-4-3'], reviewedOCRSequences: [...reviewedOCRSequences]};
const manifestText = JSON.stringify(manifest);
const script = `// Generated by build-choices.cjs; source rectangles use top-left normalized page coordinates.\nwindow.HISTORY_CHOICES = ${JSON.stringify(results)};\n`;
for (const [target, content] of [[path.join(root, 'choices.js'), script], [path.join(output, 'manifest.json'), manifestText]]) {
  if (check) assert.equal(fs.readFileSync(target, 'utf8'), content, `${target}: stale output`);
  else fs.writeFileSync(target, content);
}
if (!check) execFileSync('swift', [path.join(root, 'crop-choices.swift'), '--crop'], {stdio: 'inherit'});
const wantedImages = new Set(images.map(e => e.file));
for (const file of fs.readdirSync(output).filter(f => /^\d{2}-\d{1,2}-[1-5]\.jpg$/.test(f))) {
  if (!wantedImages.has(file)) {
    assert.ok(!check, `${file}: obsolete extracted option; regenerate choices`);
    fs.unlinkSync(path.join(output, file));
  }
}
const hashes = {};
for (const entry of images) {
  const file = path.join(output, entry.file), bytes = fs.readFileSync(file);
  const q = questionsById[entry.file.replace(/-[1-5]\.jpg$/, '')];
  assert.deepEqual(jpegSize(bytes), [Math.ceil(entry.crop[2] * q.width) - Math.floor(entry.crop[0] * q.width), Math.ceil(entry.crop[3] * q.height) - Math.floor(entry.crop[1] * q.height)], `${entry.file}: complete physical crop dimensions`);
  hashes[entry.file] = hash(file);
}
const sources = Object.fromEntries(['data.js', 'extract-papers.swift', 'crop-choices.swift', 'build-choices.cjs', ...fs.readdirSync(path.join(root, 'pdf/test')).filter(f => f.endsWith('.pdf')).map(f => `pdf/test/${f}`), ...exams.flatMap(e => [`assets/${e.round}-ocr.json`, ...Array.from({length: 12}, (_, i) => `assets/${e.round}-${i + 1}.jpg`)]), 'assets/choices/labels.json', 'assets/choices/columns.json', 'assets/choices/native.json', 'assets/choices/measure-input.json', 'assets/choices/measurements.json', 'assets/choices/verify-input.json', 'assets/choices/verified-text.json'].map(f => [f, hash(path.join(root, f))]));
const audit = JSON.stringify({sources, images: hashes, questions: 1050, options: 5250, textOptions: 5250 - images.length, imageOptions: images.length}, null, 2) + '\n';
if (check) assert.equal(fs.readFileSync(path.join(output, 'audit.json'), 'utf8'), audit, 'Source/extractor/option files changed; regenerate choices');
else fs.writeFileSync(path.join(output, 'audit.json'), audit);
console.log(`PASS: 1050 questions, 5250 complete choices (${5250 - images.length} text / ${images.length} images), ${Object.values(results).filter(q => q.stem.length > 1).length} separated shared contexts.`);
