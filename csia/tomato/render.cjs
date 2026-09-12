// Generate the script-free reader: node csia/tomato/render.cjs
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'data.js'), 'utf8'), context);
const exams = Object.entries(context.window.TOMATO_EXAMS);
const escape = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
}[char]));
const tables = values => (values || []).map(table => `<div class="table-scroll" tabindex="0" role="region" aria-label="${escape(table.caption || '자료 표')}"><table>
${table.caption ? `<caption>${escape(table.caption)}</caption>` : ''}
<thead><tr>${table.headers.map(cell => `<th scope="col">${escape(cell)}</th>`).join('')}</tr></thead>
<tbody>${table.rows.map(row => `<tr>${row.map(cell => `<td${/^[+-]?\d[\d,.%]*$/.test(cell) ? ' class="numeric"' : ''}>${escape(cell)}</td>`).join('')}</tr>`).join('')}</tbody>
</table></div>`).join('');
const sources = (paths, label) => paths.map((source, i) =>
  `<a href="${escape(source.replace(/^tomato\//, ''))}" target="_blank" rel="noopener">${label} ${i + 1}</a>`).join(' · ');

const html = `<!DOCTYPE html>
<!-- Generated from data.js by render.cjs. All 300 questions are HTML, not images. -->
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>홀인원 적중모의고사 300문항 텍스트 | CSIA</title>
<meta name="description" content="홀인원 적중모의고사 1~3회 300문항, 1,200개 보기와 전체 해설을 이미지 없이 읽는 텍스트 문제집">
<link rel="stylesheet" href="../css/variables.css">
<style>
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg-body); color: var(--text-primary); font: 16px/1.8 var(--font-sans); }
a { color: var(--primary); text-underline-offset: 3px; }
a:focus-visible, summary:focus-visible, .table-scroll:focus-visible { outline: 2px solid var(--primary); outline-offset: 4px; }
.skip { position: absolute; left: 1rem; top: -5rem; background: white; padding: 1rem; z-index: 2; }
.skip:focus { top: 0; }
.reader { max-width: 960px; margin: auto; padding: 24px clamp(16px, 4vw, 32px) 64px; }
.back, .meta { font-size: .85rem; color: var(--text-secondary); }
h1 { font-size: clamp(1.8rem, 5vw, 2.6rem); line-height: 1.3; margin: 20px 0 12px; }
.intro { color: var(--text-secondary); }
.round-nav { position: sticky; top: 0; z-index: 1; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; padding: 14px 0; background: var(--bg-body); border-bottom: 1px solid var(--border-color); }
.round-nav a { padding: 6px 8px; text-align: center; border: 1px solid var(--border-color); border-radius: 999px; background: var(--bg-card); font-weight: 700; text-decoration: none; }
section { padding-top: 24px; scroll-margin-top: 110px; }
section:target > h2 { color: var(--primary); }
.subjects { display: flex; flex-wrap: wrap; gap: 8px 18px; font-size: .85rem; margin-bottom: 24px; }
.question { padding: clamp(18px, 4vw, 28px); margin: 20px 0; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); scroll-margin-top: 120px; }
.question:target { border-color: var(--primary); }
.meta { display: flex; flex-wrap: wrap; gap: 6px 16px; }
h3 { font-size: 1.1rem; line-height: 1.75; overflow-wrap: anywhere; margin: 14px 0; }
.conditions { padding: 16px; border-left: 3px solid var(--primary); background: var(--bg-input); margin: 16px 0; border-radius: 6px; }
.prose, td { white-space: pre-line; overflow-wrap: anywhere; }
.options { list-style: none; counter-reset: choice; padding: 0; display: grid; gap: 10px; }
.options li { counter-increment: choice; display: flex; align-items: baseline; gap: 12px; padding: 12px 14px; border: 1px solid var(--border-color); border-radius: 8px; overflow-wrap: anywhere; }
.options li::before { content: counter(choice); color: var(--primary); font-weight: 700; flex: 0 0 20px; text-align: center; }
.options span { min-width: 0; }
details { margin-top: 16px; border-top: 1px solid var(--border-color); padding-top: 12px; }
summary { cursor: pointer; color: var(--primary); font-weight: 700; }
.answer { color: #047857; font-weight: 700; }
.note { border-left: 3px solid var(--warning); padding: 12px 16px; background: var(--warning-bg); white-space: pre-line; }
.source { font-size: .8rem; }
.source summary { color: var(--text-secondary); }
.table-scroll { overflow-x: auto; margin: 16px 0; }
table { width: 100%; border-collapse: collapse; font-size: .9rem; }
caption { text-align: left; font-weight: 700; padding-bottom: 8px; }
th, td { border: 1px solid var(--border-color); padding: 8px 10px; text-align: left; vertical-align: top; }
th { background: var(--bg-input); }
.numeric { white-space: nowrap; font-variant-numeric: tabular-nums; }
@media print {
  body { background: white; }
  .reader { max-width: none; padding: 0; }
  .round-nav, .back, .skip, .subjects, .source { display: none; }
  .question { box-shadow: none; }
  h2, h3, summary { break-after: avoid; }
  tr, .options li { break-inside: avoid; }
  .table-scroll { overflow: visible; }
}
</style>
</head>
<body>
<a class="skip" href="#questions">문제로 바로 가기</a>
<div class="reader">
<header>
<a class="back" href="../index.html">← CSIA · CBT 문제 풀기</a>
<h1>홀인원 적중모의고사<br>300문항 텍스트 문제집</h1>
<p class="intro">1~3회 문제 300개 · 보기 1,200개 · 전체 해설<br>문제·보기·표·수식은 이미지가 아닌 선택·복사 가능한 텍스트입니다. 회차별로 이동하거나 브라우저 검색으로 문항을 찾으세요.</p>
<p class="meta">2025년 11월 대비 원문 기준입니다. 법규·세제는 현재와 다를 수 있으며, 원문 정답표와 해설의 불일치는 별도 메모로 표시합니다.</p>
</header>
<nav class="round-nav" aria-label="회차 바로 가기">${exams.map(([id], i) => `<a href="#${id}">제${i + 1}회 · 100문항</a>`).join('')}</nav>
<main id="questions">
${exams.map(([id, exam]) => `<section id="${id}" aria-labelledby="${id}-title">
<h2 id="${id}-title">${escape(exam.title)}</h2>
<nav class="subjects" aria-label="${escape(exam.title)} 과목 바로 가기">${exam.sections.map((s, i) => `<a href="#${id}-q${i ? exam.sections[i - 1].end + 1 : 1}">${escape(s.name)}</a>`).join('')}</nav>
${exam.questions.map(q => {
  assert.equal(q.textReady, true);
  return `<article class="question" id="${id}-q${q.id}" aria-labelledby="${id}-q${q.id}-title">
<div class="meta"><a href="#${id}-q${q.id}">문제 ${q.id} / 100</a><span>${escape(q.category)}</span>${q.difficulty ? `<span>난이도 ${'★'.repeat(q.difficulty)}</span>` : ''}</div>
<h3 id="${id}-q${q.id}-title">${q.id}. ${escape(q.question)}</h3>
${q.box ? `<div class="conditions prose">${escape(q.box)}</div>` : ''}
${tables(q.tables)}
<ol class="options">${q.options.map(option => `<li><span>${escape(option)}</span></li>`).join('')}</ol>
<details class="solution" open><summary>정답·해설</summary>
<p class="answer">정답 ${q.correctAnswer}번</p>
<div class="prose">${escape(q.explanation)}</div>${tables(q.explanationTables)}
${q.answerNote ? `<aside class="note"><strong>원문·정답 확인 메모</strong><br>${escape(q.answerNote)}</aside>` : ''}
</details>
<details class="source"><summary>원문 파일 별도로 확인</summary>
<p>${sources(q.questionImages, '문제 원문')}</p><p>${sources(q.explanationImages, '해설 원문')}</p>
</details>
</article>`;
}).join('\n')}
</section>`).join('\n')}
</main>
<a href="#questions">문제집 처음으로 ↑</a>
</div>
</body>
</html>
`;
const target = path.join(__dirname, 'index.html');
if (process.argv.includes('--check')) {
  assert.equal(fs.readFileSync(target, 'utf8'), html, 'Run node csia/tomato/render.cjs to update the text reader');
} else {
  fs.writeFileSync(target, html);
}
