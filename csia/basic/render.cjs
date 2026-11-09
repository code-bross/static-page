// Run after editing course.js, updates.js, style.css or app.js: node csia/basic/render.cjs
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = __dirname;
const escape = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[char]);
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

function replaceRegion(html, name, value) {
  const start = `<!-- basic:${name}:start -->`;
  const end = `<!-- basic:${name}:end -->`;
  const first = html.indexOf(start);
  const last = html.indexOf(end);
  if (first < 0 || last <= first || html.lastIndexOf(start) !== first || html.lastIndexOf(end) !== last) {
    throw new Error(`Missing or duplicate HTML region: ${name}`);
  }
  return html.slice(0, first + start.length) + '\n' + value + '\n  ' + html.slice(last);
}

function renderPage(html) {
  const context = vm.createContext({ window: {} });
  const scripts = ['course.js', 'updates.js', 'app.js'].map(read);
  scripts.slice(0, 2).forEach(script => vm.runInContext(script, context));
  const course = context.window.BASIC_COURSE;
  const updates = context.window.BASIC_UPDATES;
  const pdfs = fs.readdirSync(root).filter(file => file.endsWith('.pdf'));
  if (pdfs.length !== 1) throw new Error('Expected exactly one reference PDF');
  const pdf = escape(`./${pdfs[0]}`);
  let group = '';
  const navigation = course.map(day => {
    const heading = group === day.group ? '' : `<p class="group-label">${escape(day.group)}</p>`;
    group = day.group;
    return `${heading}<a class="day-button" href="#day-${day.day}"><span class="day-number">${String(day.day).padStart(2, '0')}</span><span class="day-title">${escape(day.title)}</span></a>`;
  }).join('\n');
  const days = course.map(day => {
    const lessons = day.lessons.map((lesson, index) => `<article class="lesson">
      <div class="lesson-title"><span>${String(index + 1).padStart(2, '0')}</span><h3>${escape(lesson.title)}</h3></div>
      <p>${escape(lesson.body)}</p>
      <div class="example"><strong>쉽게 생각해 보기 · 숫자는 가상 예시</strong>${escape(lesson.example)}</div>
      <div class="remember"><strong>시험 언어로 한 문장</strong>${escape(lesson.remember)}</div>
    </article>`).join('\n');
    const questions = day.questions.map((question, index) => `<article class="question static-question" data-question-id="${escape(question.id)}">
      <p class="day-label">QUESTION ${String(index + 1).padStart(2, '0')} · ${escape(question.topic)}</p>
      <h3>${escape(question.prompt)}</h3>
      <ol>${question.options.map(option => `<li>${escape(option)}</li>`).join('')}</ol>
      <details><summary>정답과 해설 보기</summary><p><strong>정답: ${question.answer + 1}번 · ${escape(question.options[question.answer])}</strong></p><p>${escape(question.explanation)}</p></details>
    </article>`).join('\n');
    const related = day.updateIds.map(id => {
      const update = updates.find(item => item.id === id);
      if (!update) throw new Error(`Unknown update ${id} on day ${day.day}`);
      return `<a href="#static-update-${escape(id)}">${escape(update.title)} · ${escape(update.status)}</a>`;
    }).join('<br>');
    return `<section class="static-day" id="day-${day.day}">
      <span class="day-label">DAY ${String(day.day).padStart(2, '0')} / 30 · ${escape(day.group)}</span>
      <h2>${escape(day.title)}</h2><p>${escape(day.goal)}</p>
      <div class="keyword-row">${day.keywords.map(word => `<span class="tag">${escape(word)}</span>`).join('')}</div>
      ${lessons}
      ${related ? `<div class="notice"><strong>현재 제도와 함께 읽기</strong>${related}</div>` : ''}
      <p class="source-line">${escape(day.source)}${day.pdfPages.map(page => ` <a href="${pdf}#page=${page}" target="_blank" rel="noopener">참고 PDF ${page}쪽 ↗</a>`).join('')}<br>인쇄쪽과 PDF 쪽은 다를 수 있습니다. 원본 PDF는 약 733 MiB입니다.</p>
      <h3>배운 내용을 직접 풀어 보기 · ${day.questions.length}문항</h3>
      <p>먼저 답을 생각한 뒤 각 문제의 정답과 해설을 펼쳐 보세요.</p>
      ${questions}
      <nav class="nav-row" aria-label="${day.day}일차 앞뒤 이동">${day.day > 1 ? `<a href="#day-${day.day - 1}">← 이전 일차</a>` : '<span></span>'}${day.day < 30 ? `<a href="#day-${day.day + 1}">다음 일차 →</a>` : '<a href="#static-sources">제도 변경 · 출처 →</a>'}</nav>
    </section>`;
  }).join('\n');
  const sourceCards = updates.map(update => `<article class="update-card" id="static-update-${escape(update.id)}">
    <span class="tag">${escape(update.status)} · ${escape(update.date)}</span><h3>${escape(update.title)}</h3>
    <div class="comparison"><div><strong>2022 자료를 읽을 때</strong>${escape(update.before)}</div><div class="current"><strong>공식 자료에서 확인한 내용</strong>${escape(update.after)}</div></div>
    <p>${escape(update.caution)}</p><p>${escape(update.explanation)}</p>
    <div class="citation">${update.sources.map(source => `<a href="${escape(source.url)}" target="_blank" rel="noopener">${escape(source.title)} ↗</a>${source.date ? ` · 발표/시행 ${escape(source.date)}` : ''}`).join('<br>')}<br>웹 확인일: ${escape(update.checked)}</div>
  </article>`).join('\n');
  const body = `<div id="static-course" class="static-only">
    ${days}
    <section id="static-sources" class="static-day">
      <span class="day-label">SOURCES & UPDATES · 2026-11-09 확인</span><h2>제도 변경 · 출처와 확인 범위</h2>
      <div class="notice warning"><strong>2022판의 모든 정보를 최신으로 검증한 것은 아닙니다.</strong><p>스캔 PDF의 목차와 주요 개념·변경 관련 쪽을 로컬 OCR 및 이미지로 참고했으며 모든 768쪽을 전수 검증하지 않았습니다. 최신 ISA 한도와 시장별 세율은 확정하지 못해 별도로 표시했고, 미확인 수치는 암기 정답에 사용하지 않습니다.</p></div>
      <p>교재의 14개 장을 30일 입문 과정으로 연결했습니다. 설명·예시·문제는 새로 작성했으며 30일차는 원문 모의고사가 아닌 창작 종합 퀴즈입니다. 계산 숫자는 가상 예시이며 실시간 주가·환율·기준금리가 아닙니다.</p>
      ${sourceCards}
      <p><a href="${pdf}" target="_blank" rel="noopener">참고 원본 PDF 열기 (약 733 MiB) ↗</a></p>
    </section>
  </div>`;
  html = replaceRegion(html, 'styles', `<style>\n${read('style.css')}\n</style>`);
  html = replaceRegion(html, 'navigation', `<nav id="static-day-list" class="static-only" aria-label="일차 선택">\n${navigation}\n</nav>`);
  html = replaceRegion(html, 'content', body);
  html = replaceRegion(html, 'scripts', scripts.map(script => `<script>\n${script.replace(/<\/script/gi, '<\\/script')}\n</script>`).join('\n'));
  return html;
}

if (require.main === module) {
  const file = path.join(root, 'index.html');
  fs.writeFileSync(file, renderPage(read('index.html')));
  console.log('Generated standalone index.html with static lessons, questions and sources.');
}
module.exports = { renderPage };
