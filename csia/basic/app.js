(() => {
  'use strict';

  const course = window.BASIC_COURSE;
  const updates = window.BASIC_UPDATES;
  const content = document.querySelector('#content');
  if (!Array.isArray(course) || course.length !== 30 || !Array.isArray(updates)) {
    const message = document.querySelector('#storage-message');
    message.textContent = '자동 채점 자료를 불러오지 못했습니다. 아래 정적 본문에서 개념·문제·해설은 읽을 수 있습니다. HTML 파일을 다시 열어 주세요.';
    message.hidden = false;
    return;
  }
  const key = 'csia-basic-30-v1';
  const pdf = './증권투자권유자문인력2022-해커스.pdf';
  let state = { version: 1, selected: 1, days: {}, theme: null };
  let view = 'learn';
  let tab = 'lesson';
  let reviewDraft = {};
  let reviewResult = null;

  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const warn = message => {
    const box = document.querySelector('#storage-message');
    box.textContent = message;
    box.hidden = false;
  };
  const validAnswers = (answers, day) => Array.isArray(answers) && answers.length <= day.questions.length &&
    answers.every(answer => answer === null || Number.isInteger(answer) && answer >= 0 && answer < 4);
  function validState(value) {
    return value && value.version === 1 && Number.isInteger(value.selected) && value.selected >= 1 && value.selected <= 30 &&
      [null, 'light', 'dark'].includes(value.theme) && value.days && typeof value.days === 'object' && !Array.isArray(value.days) &&
      Object.entries(value.days).every(([id, record]) => {
        const day = course.find(item => String(item.day) === id);
        return day && record && ['read', 'submitted', 'completed'].every(flag => typeof record[flag] === 'boolean') &&
          validAnswers(record.answers, day) && validAnswers(record.result, day) &&
          Number.isInteger(record.best) && record.best >= 0 && record.best <= day.questions.length &&
          Array.isArray(record.resolved) && record.resolved.every(index => Number.isInteger(index) && index >= 0 && index < day.questions.length) &&
          (!record.submitted || record.answers.length === day.questions.length && record.answers.every(answer => answer !== null)) &&
          (!record.completed || record.read && record.result.length === day.questions.length && record.result.every(answer => answer !== null));
      });
  }
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (validState(parsed)) state = parsed;
      else warn('저장된 학습 기록의 형식이 맞지 않아 불러오지 않았습니다. 새 기록을 저장하면 기존 기록이 대체됩니다.');
    }
  } catch (error) {
    warn(`학습 기록을 불러오지 못했습니다 (${error.name}). 현재 화면에서 학습할 수 있지만 저장은 브라우저 설정에 따라 제한될 수 있습니다.`);
  }
  function save() {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      warn(`학습 기록을 저장하지 못했습니다 (${error.name}). 이 화면의 진도만 유지되며, 창을 닫으면 사라질 수 있습니다.`);
    }
  }
  function record(day) {
    if (!state.days[day]) state.days[day] = { read: false, answers: [], submitted: false, completed: false, best: 0, result: [], resolved: [] };
    return state.days[day];
  }
  function wrongQuestions() {
    return course.flatMap(day => {
      const saved = state.days[day.day];
      if (!saved) return [];
      return day.questions.flatMap((question, index) =>
        saved.result[index] !== undefined && saved.result[index] !== null && saved.result[index] !== question.answer && !saved.resolved.includes(index)
          ? [{ day, question, index }] : []);
    });
  }
  function announce(message) {
    document.querySelector('#announcement').textContent = message;
  }
  function focusContent() {
    const main = document.querySelector('#main');
    main.focus({ preventScroll: true });
    const top = document.querySelector('.topbar');
    const offset = getComputedStyle(top).position === 'sticky' ? top.offsetHeight + 12 : 12;
    window.scrollTo({ top: content.getBoundingClientRect().top + window.scrollY - offset, behavior: 'instant' });
  }
  function renderPlan() {
    const completed = Object.values(state.days).filter(saved => saved.completed).length;
    document.querySelector('#progress').value = completed;
    document.querySelector('#progress-label').textContent = `${completed} / 30일 완료`;
    document.querySelector('#progress-percent').textContent = `${Math.round(completed / 30 * 100)}%`;
    document.querySelector('#wrong-count').textContent = wrongQuestions().length;
    document.querySelector('#question-total').textContent = `창작 연습 ${course.reduce((total, day) => total + day.questions.length, 0)}문항`;
    const query = document.querySelector('#search').value.trim().toLocaleLowerCase();
    let group = '';
    let matches = 0;
    document.querySelector('#day-list').innerHTML = course.map(day => {
      if (query && !`${day.day} ${day.title} ${day.group} ${day.keywords.join(' ')}`.toLocaleLowerCase().includes(query)) return '';
      matches++;
      const heading = group === day.group ? '' : `<p class="group-label">${escape(day.group)}</p>`;
      group = day.group;
      const saved = state.days[day.day];
      const status = saved?.completed ? '완료' : saved?.read ? '풀이 중' : '';
      return `${heading}<button type="button" class="day-button" data-day="${day.day}" aria-current="${state.selected === day.day && view === 'learn'}" aria-label="${day.day}일차 ${escape(day.title)}${status ? `, ${status}` : ''}"><span class="day-number">${String(day.day).padStart(2, '0')}</span><span class="day-title">${escape(day.title)}</span><span class="day-status">${status === '완료' ? '✓' : status}</span></button>`;
    }).join('');
    document.querySelector('#no-days').hidden = matches > 0;
    document.querySelectorAll('.topbar [data-view]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.view === view)));
  }
  function sourceLink(day) {
    const pages = Array.isArray(day.pdfPages) ? day.pdfPages : [];
    return `<p class="source-line">${escape(day.source)}${pages.map(page => `<a href="${pdf}#page=${page}" target="_blank" rel="noopener">참고 PDF ${page}쪽 ↗</a>`).join('')}<br>인쇄쪽과 PDF 쪽은 다를 수 있습니다. PDF는 약 733 MiB로 열리는 데 시간이 걸릴 수 있습니다.</p>`;
  }
  function updateCard(update, compact = false) {
    return `<article class="update-card" id="update-${escape(update.id)}"><span class="tag">${escape(update.status)} · ${escape(update.date)}</span><h3>${escape(update.title)}</h3><div class="comparison"><div><strong>2022 자료를 읽을 때</strong>${escape(update.before)}</div><div class="current"><strong>공식 자료에서 확인한 내용</strong>${escape(update.after)}</div></div><p>${escape(update.caution)}</p>${compact ? '' : `<p>${escape(update.explanation)}</p>`}<div class="citation">${update.sources.map(source => `<a href="${escape(source.url)}" target="_blank" rel="noopener">${escape(source.title)} ↗</a>${source.date ? ` · 발표/시행 ${escape(source.date)}` : ''}`).join('<br>')}<br>웹 확인일: ${escape(update.checked)}</div></article>`;
  }
  function dailyUpdates(day) {
    return updates.filter(update => day.updateIds.includes(update.id)).map(update => updateCard(update, true)).join('');
  }
  function nav(day) {
    return `<div class="nav-row"><button type="button" data-day="${day.day - 1}" ${day.day === 1 ? 'disabled' : ''}>← 이전 일차</button><button type="button" data-day="${day.day + 1}" ${day.day === 30 ? 'disabled' : ''}>다음 일차 →</button></div>`;
  }
  function renderLearn() {
    const day = course[state.selected - 1];
    const saved = record(day.day);
    const heading = `<div class="section-header"><div><span class="day-label">DAY ${String(day.day).padStart(2, '0')} / 30 · ${escape(day.group)}</span><h2>${escape(day.title)}</h2><p>${escape(day.goal)}</p></div><span class="tag">${saved.completed ? '학습 완료 ✓' : '오늘의 목표: 이해 → 풀이'} · ${day.questions.length}문항</span></div><div class="keyword-row">${day.keywords.map(word => `<span class="tag">${escape(word)}</span>`).join('')}</div><div class="tabs" role="group" aria-label="학습 단계"><button type="button" data-tab="lesson" aria-pressed="${tab === 'lesson'}">1. 개념 이해</button><button type="button" data-tab="quiz" aria-pressed="${tab === 'quiz'}">2. 문제 풀기</button></div>`;
    if (tab === 'lesson') {
      content.innerHTML = `${heading}${day.lessons.map((lesson, index) => `<article class="lesson"><div class="lesson-title"><span>${String(index + 1).padStart(2, '0')}</span><h3>${escape(lesson.title)}</h3></div><p>${escape(lesson.body)}</p><div class="example"><strong>쉽게 생각해 보기 · 숫자는 가상 예시</strong>${escape(lesson.example)}</div><div class="remember"><strong>시험 언어로 한 문장</strong>${escape(lesson.remember)}</div></article>`).join('')}${dailyUpdates(day)}${sourceLink(day)}<div class="action-row"><small>개념을 이해했다면, 정답을 보지 않고 직접 풀어 보세요.</small><button type="button" class="primary" id="read-done">${saved.read ? '문제 풀러 가기 →' : '개념 학습 완료 → 문제 풀기'}</button></div>${nav(day)}`;
    } else {
      const score = saved.result.filter((answer, index) => answer === day.questions[index].answer).length;
      content.innerHTML = `${heading}${!saved.read ? '<p class="notice warning">먼저 개념 이해 탭에서 학습을 마치고 ‘개념 학습 완료’를 눌러 주세요. 문제는 미리 볼 수 있지만 채점은 학습 완료 후 가능합니다.</p>' : ''}${saved.submitted ? `<div class="score-card" id="quiz-result" tabindex="-1"><h3>${score} / ${day.questions.length}문항 정답 · ${Math.round(score / day.questions.length * 100)}점</h3><p>${saved.completed ? '이 일차의 학습을 완료했습니다.' : ''} 최고 기록: ${saved.best} / ${day.questions.length}문항</p><p>${score === day.questions.length ? '잘했어요! 다음 일차에서도 개념을 연결해 보세요.' : '틀린 문제는 오답 노트에 모았습니다. 아래 해설에서 헷갈린 개념을 확인하세요.'}</p><div class="action-row"><button type="button" id="retry" class="secondary">정답 가리고 다시 풀기</button><button type="button" data-view="review" class="text-button">오답 복습하기 →</button></div></div>` : '<p class="notice">정답은 제출 후 공개됩니다. 모든 문항에 답해야 채점할 수 있어요. 점수와 관계없이 학습·풀이를 마치면 해당 일차가 완료됩니다.</p>'}<form id="quiz-form">${day.questions.map((question, index) => questionHtml(question, index, saved.answers[index], saved.submitted, day.day)).join('')}${saved.submitted ? '' : `<div class="action-row"><small id="answer-count">${saved.answers.filter(answer => answer !== null).length} / ${day.questions.length}문항 선택</small><button type="submit" id="grade" class="primary" ${canGrade(saved, day) ? '' : 'disabled'}>제출하고 해설 보기</button></div>`}</form>${sourceLink(day)}${nav(day)}`;
    }
  }
  function canGrade(saved, day) {
    return saved.read && saved.answers.length === day.questions.length && saved.answers.every(answer => Number.isInteger(answer));
  }
  function questionHtml(question, index, answer, submitted, day, review = false) {
    const correct = answer === question.answer;
    return `<fieldset class="question"><legend><small>${review ? `DAY ${String(day).padStart(2, '0')} · ` : ''}QUESTION ${String(index + 1).padStart(2, '0')} · ${escape(question.topic)}</small>${escape(question.prompt)}</legend><div class="options">${question.options.map((option, optionIndex) => `<label class="option${submitted && optionIndex === question.answer ? ' correct' : submitted && optionIndex === answer ? ' wrong' : ''}"><input type="radio" name="${escape(question.id)}" value="${optionIndex}" data-index="${index}" ${answer === optionIndex ? 'checked' : ''} ${submitted ? 'disabled' : ''}><span><span class="option-number">${optionIndex + 1}.</span> ${escape(option)}${submitted && optionIndex === question.answer ? ' (정답)' : ''}</span></label>`).join('')}</div>${submitted ? `<div class="feedback ${correct ? '' : 'incorrect'}"><strong>${correct ? '정답이에요.' : `다시 기억해요. 정답은 ${question.answer + 1}번.`}</strong>${escape(question.explanation)}</div>` : ''}</fieldset>`;
  }
  function renderReview() {
    const queue = reviewResult ? reviewResult.queue : wrongQuestions();
    content.innerHTML = `<div class="section-header"><div><span class="day-label">RECALL & REBUILD</span><h2>틀린 이유가 실력이 되는 오답 노트</h2><p>일차별 마지막 제출에서 틀린 문제입니다. 복습 정답은 이 목록에서 제외됩니다.</p></div><span class="tag">남은 오답 ${wrongQuestions().length}개</span></div>${queue.length ? `${reviewResult ? `<div class="score-card" id="review-result" tabindex="-1"><h3>${reviewResult.correct} / ${queue.length}개 복습 정답</h3><p>맞힌 문제는 오답 목록에서 제외했습니다. 일차별 원래 점수는 바꾸지 않습니다.</p><button type="button" id="review-again" class="secondary">남은 오답 다시 풀기</button></div>` : '<p class="notice">개념을 떠올리고 다시 답해 보세요. 한 문제라도 고르면 선택한 문제를 채점할 수 있습니다.</p>'}<form id="review-form">${queue.map(({ day, question, index }, queueIndex) => `<p class="source-line"><button type="button" data-day="${day.day}" class="text-button">${day.day}일차 개념 다시 보기 →</button></p>${questionHtml(question, queueIndex, reviewDraft[question.id], !!reviewResult && reviewDraft[question.id] !== undefined, day.day, true)}`).join('')}${reviewResult ? '' : '<div class="action-row"><small id="review-count">선택한 문제 0개</small><button type="submit" id="review-grade" class="primary" disabled>선택한 오답 채점하기</button></div>'}</form>` : '<div class="empty"><h3>지금은 쌓인 오답이 없어요.</h3><p>일차별 문제를 제출하면 틀린 문제가 여기에 모입니다.</p><button type="button" data-view="learn" class="primary">학습으로 돌아가기</button></div>'}`;
  }
  function renderSources() {
    const ranges = [
      ['증권분석', '경기분석 · 기본적 분석 · 기술적 분석', '20–119', '1–7'],
      ['증권시장', '유가증권 · 코스닥 · 채권 · 기타 증권시장', '122–289', '8–14'],
      ['금융상품 및 직무윤리', '금융상품분석 · 투자전략 · 영업실무 · 직무윤리/분쟁예방', '292–469', '15–22'],
      ['법규 및 세제', '자본시장법 · 협회규정 · 회사법 · 증권세제', '472–671', '23–28'],
      ['마무리', '공식 연습 · 창작 종합 퀴즈', '공식 674–679 / 모의고사 682–759', '29–30']
    ];
    content.innerHTML = `<div class="section-header"><div><span class="day-label">SOURCES & UPDATES</span><h2>옛 교재는 개념으로, 바뀐 제도는 출처로.</h2><p>확인일 2026-11-09 · 공표·시행이 확인된 내용만 구분해 표시합니다.</p></div></div><div class="notice warning"><strong>“2022판의 모든 정보를 최신으로 검증했다”는 뜻은 아닙니다.</strong><p>PDF는 스캔본입니다. 목차와 주요 개념·변경 관련 쪽을 로컬 OCR 및 이미지로 참고했습니다. 모든 768쪽을 전수 검증하지 않았습니다. 아래 항목 외의 상장요건·공시기한·세율·응시일정 등 변동 가능한 수치는 최신이라고 단정하지 않으며, 이 과정에서는 검증되지 않은 수치를 암기 정답으로 사용하지 않습니다.</p></div><p class="sources-intro">기준금리·환율·주가 같은 실시간 수치는 고정된 암기값으로 싣지 않았습니다. 계산문제의 숫자는 이해를 위한 가상 예시입니다. 시행된 제도와 검토·추진 중인 개편안도 혼동하지 않도록 구분했습니다.</p>${updates.map(update => updateCard(update)).join('')}<h2>교재와 30일 과정의 연결</h2><div class="table-scroll"><table class="coverage"><thead><tr><th>교재 구분</th><th>범위</th><th>교재 인쇄쪽</th><th>학습 일차</th></tr></thead><tbody>${ranges.map(row => `<tr>${row.map(cell => `<td>${escape(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div><details><summary>교재 이용 · OCR · 자료의 한계</summary><p>참고 파일: 증권투자권유자문인력2022-해커스.pdf. 교재의 4개 큰 구분은 학습 편의를 위한 분류이며 현재 공식 시험 과목 수와 같다고 가정하지 않습니다. 학습플랜의 14개 장과 주요 개념을 바탕으로 설명·예시·문제는 새로 작성했습니다. 30일차도 원문 모의고사가 아닌 입문용 종합 퀴즈입니다.</p><p>이미지 스캔 PDF라 MarkItDown에서 글자가 추출되지 않아, 외부 서비스에 파일을 보내지 않고 로컬 한국어 OCR을 사용했습니다. OCR은 숫자·한자·기호를 잘못 읽을 수 있어 불명확한 부분은 정답 근거로 삼지 않았습니다. 교재 인쇄쪽과 PDF 쪽 번호는 다를 수 있으며 PDF 링크는 확인한 참고 쪽으로만 연결됩니다.</p><p><a href="${pdf}" target="_blank" rel="noopener">원본 PDF 열기 (약 733 MiB) ↗</a></p></details><details><summary>완료 · 점수 · 오답 기록은 어떻게 동작하나요?</summary><p>개념 학습 완료를 누르고 해당 일차의 모든 문제를 제출하면 학습 완료로 표시합니다. 합격 판정이 아닙니다. 오답 노트는 마지막 일차별 제출의 오답을 모으며, 복습해서 맞힌 문제는 제외합니다. 일차 전체를 다시 제출하면 그 새 결과로 오답 목록을 갱신합니다. 일차별 최고 정답 수는 유지됩니다.</p><p>진도와 답안은 이 브라우저의 localStorage에만 저장합니다. 시크릿 모드·브라우저 설정·저장공간 제한에 따라 저장되지 않을 수 있으며 실패 시 화면에 알립니다. 초기화는 이 과정의 기록만 지웁니다.</p></details>`;
  }
  function render() {
    renderPlan();
    if (view === 'learn') renderLearn();
    else if (view === 'review') renderReview();
    else renderSources();
  }
  function selectDay(day) {
    if (!Number.isInteger(day) || day < 1 || day > 30) return;
    state.selected = day;
    view = 'learn';
    tab = 'lesson';
    save();
    render();
    focusContent();
    announce(`${day}일차 ${course[day - 1].title}`);
  }
  function setView(next) {
    if (!['learn', 'review', 'sources'].includes(next)) return;
    view = next;
    reviewResult = null;
    reviewDraft = {};
    render();
    focusContent();
  }
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || button.disabled) return;
    if (button.dataset.day) selectDay(Number(button.dataset.day));
    else if (button.dataset.view) setView(button.dataset.view);
    else if (button.dataset.tab) {
      tab = button.dataset.tab;
      render();
      focusContent();
    } else if (button.id === 'read-done') {
      record(state.selected).read = true;
      tab = 'quiz';
      save();
      render();
      focusContent();
    } else if (button.id === 'retry') {
      const saved = record(state.selected);
      saved.answers = [];
      saved.submitted = false;
      save();
      render();
      focusContent();
    } else if (button.id === 'review-again') {
      reviewDraft = {};
      reviewResult = null;
      render();
      focusContent();
    } else if (button.id === 'continue') {
      selectDay(course.find(day => !state.days[day.day]?.completed)?.day || 30);
    } else if (button.id === 'theme') {
      const dark = matchMedia('(prefers-color-scheme: dark)').matches;
      state.theme = (state.theme || (dark ? 'dark' : 'light')) === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = state.theme;
      save();
    } else if (button.id === 'reset') {
      if (!confirm('이 30일 과정의 진도·답안·오답을 모두 지울까요? 다른 학습 페이지의 기록은 지우지 않습니다.')) return;
      try {
        localStorage.removeItem(key);
      } catch (error) {
        warn(`저장 기록을 삭제하지 못했습니다 (${error.name}). 브라우저의 사이트 데이터 설정에서 직접 삭제해 주세요.`);
        return;
      }
      state = { version: 1, selected: 1, days: {}, theme: state.theme };
      view = 'learn';
      tab = 'lesson';
      reviewDraft = {};
      reviewResult = null;
      save();
      render();
      announce('이 과정의 학습 기록을 초기화했습니다.');
    }
  });
  document.querySelector('#search').addEventListener('input', renderPlan);
  content.addEventListener('change', event => {
    const input = event.target;
    if (!input.matches('input[type=radio]')) return;
    if (input.closest('#quiz-form')) {
      const saved = record(state.selected);
      if (saved.submitted) return;
      const day = course[state.selected - 1];
      saved.answers = Array.from({ length: day.questions.length }, (_, index) => saved.answers[index] ?? null);
      saved.answers[Number(input.dataset.index)] = Number(input.value);
      save();
      document.querySelector('#answer-count').textContent = `${saved.answers.filter(answer => answer !== null).length} / ${day.questions.length}문항 선택`;
      document.querySelector('#grade').disabled = !canGrade(saved, day);
    } else if (input.closest('#review-form') && !reviewResult) {
      reviewDraft[input.name] = Number(input.value);
      document.querySelector('#review-count').textContent = `선택한 문제 ${Object.keys(reviewDraft).length}개`;
      document.querySelector('#review-grade').disabled = Object.keys(reviewDraft).length === 0;
    }
  });
  content.addEventListener('submit', event => {
    event.preventDefault();
    if (event.target.id === 'quiz-form') {
      const day = course[state.selected - 1];
      const saved = record(day.day);
      if (saved.submitted || !canGrade(saved, day)) {
        announce('개념 학습 완료 후 모든 문항에 답해 주세요.');
        return;
      }
      saved.submitted = true;
      saved.completed = true;
      saved.result = [...saved.answers];
      saved.resolved = [];
      const score = saved.result.filter((answer, index) => answer === day.questions[index].answer).length;
      saved.best = Math.max(saved.best, score);
      save();
      render();
      document.querySelector('#quiz-result').focus({ preventScroll: true });
      focusContent();
      announce(`${day.day}일차 완료. ${day.questions.length}문항 중 ${score}문항 정답.`);
    } else if (event.target.id === 'review-form' && !reviewResult) {
      const queue = wrongQuestions().filter(({ question }) => reviewDraft[question.id] !== undefined);
      if (!queue.length) {
        announce('복습할 문제에 답을 선택해 주세요.');
        return;
      }
      let correct = 0;
      queue.forEach(({ day, question, index }) => {
        if (reviewDraft[question.id] === question.answer) {
          record(day.day).resolved.push(index);
          correct++;
        }
      });
      reviewResult = { queue, correct };
      save();
      render();
      focusContent();
      announce(`${queue.length}개 중 ${correct}개 복습 정답.`);
    }
  });
  if (state.theme) document.documentElement.dataset.theme = state.theme;
  render();
  document.documentElement.dataset.enhanced = 'true';
})();
