(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const {escape, render:renderDiagram} = window.HistoryDeepenVisuals;
  const lessons = [...window.DEEPEN_EARLY_LESSONS, ...window.DEEPEN_MODERN_LESSONS];
  const sources = window.DEEPEN_SOURCES;
  const photos = window.HISTORY_WIKI_IMAGES;
  const lessonById = new Map(lessons.map(lesson => [lesson.id, lesson]));
  const videoById = new Map(sources.videos.map(video => [video.id, video]));
  const courseById = new Map(sources.courses.map(course => [course.id, course]));
  const videoNotes = new Map(window.DEEPEN_VIDEO_NOTES.map(note => [note.id, note]));
  const examStudy = window.DEEPEN_EXAM_STUDY;
  const params = new URLSearchParams(location.search);
  const reviewRound = /^(?:6\d|7\d|80)$/.test(params.get('review') || '') ? Number(params.get('review')) : null;
  const examMode = params.get('mode') === 'exam' || (reviewRound && params.get('mode') !== 'practice') ? 'exam' : 'practice';
  const eras = ['전체', ...new Set(lessons.map(lesson => lesson.era))];
  const storageKey = 'kh-deepen-study-v1';
  const emptyState = () => ({complete:[], bookmarked:[], last:lessons[0].id, answers:{}});
  const validIds = ids => Array.isArray(ids) && new Set(ids).size === ids.length && ids.every(id => lessonById.has(id));
  const validState = value => value && validIds(value.complete) && validIds(value.bookmarked) &&
    lessonById.has(value.last) && value.answers && typeof value.answers === 'object' && !Array.isArray(value.answers) &&
    Object.entries(value.answers).every(([id, answers]) => lessonById.has(id) && Array.isArray(answers) &&
      answers.length === lessonById.get(id).quiz.length && answers.every((answer, index) =>
        answer === null || (Number.isInteger(answer) && answer >= 0 && answer < lessonById.get(id).quiz[index].options.length)));
  function warn(message) {
    $('#storage-notice').textContent = message;
    $('#storage-notice').hidden = false;
  }
  function load() {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw === null) return emptyState();
      const value = JSON.parse(raw);
      if (validState(value)) return value;
      warn('저장된 심화 학습 기록의 형식이 맞지 않아 새 화면으로 시작했어요. 학습하면 새 기록으로 저장돼요.');
      return emptyState();
    } catch (error) {
      if (!(error instanceof SyntaxError || error instanceof DOMException)) throw error;
      warn('심화 학습 기록을 읽지 못했어요. 학습은 가능하지만 이전 기록을 불러오지 못했어요.');
      return emptyState();
    }
  }
  function persist() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
      if (!(error instanceof DOMException)) throw error;
      warn('기록을 저장하지 못했어요. 이 화면의 학습은 가능하지만 페이지를 닫으면 진행 내용이 사라질 수 있어요.');
    }
  }
  function readExamReview(round, mode) {
    const allRefs = Array.from({length:50}, (_, index) => `${round}-${index + 1}`);
    const fallback = reason => ({round, mode, submitted:false, refs:allRefs, wrong:[], unanswered:[], reason});
    try {
      const raw = localStorage.getItem(`kh-deepen-attempt-${round}${mode === 'practice' ? '-practice' : ''}-v1`);
      if (raw === null) return fallback('제출한 결과가 없어서 이 회차에 나온 관련 단원을 안내해요.');
      const value = JSON.parse(raw);
      const valid = value && Array.isArray(value.answers) && value.answers.length === 50 &&
        value.answers.every(answer => Number.isInteger(answer) && answer >= 0 && answer <= 5) &&
        Array.isArray(value.marked) && new Set(value.marked).size === value.marked.length &&
        value.marked.every(number => Number.isInteger(number) && number >= 1 && number <= 50) &&
        Number.isInteger(value.current) && value.current >= 0 && value.current < 50 &&
        typeof value.submitted === 'boolean' && Number.isFinite(value.remaining) && value.remaining >= 0 && value.remaining <= 4800 &&
        (value.deadline === null || (Number.isFinite(value.deadline) && value.deadline > 0));
      if (!valid) return fallback('저장 결과의 형식을 확인할 수 없어 오답을 판단하지 않았어요. 이 회차의 관련 단원을 안내해요.');
      if (!value.submitted) return fallback('아직 제출하지 않은 풀이예요. 답안을 채점하지 않고 이 회차의 관련 단원만 안내해요.');
      const wrong = allRefs.filter((ref, index) => value.answers[index] > 0 && value.answers[index] !== window.DEEPEN_EXAM_ANSWERS[ref]);
      const unanswered = allRefs.filter((ref, index) => value.answers[index] === 0);
      return {round, mode, submitted:true, refs:[...wrong, ...unanswered], wrong, unanswered};
    } catch (error) {
      if (!(error instanceof SyntaxError || error instanceof DOMException)) throw error;
      return fallback('저장 결과를 읽지 못했어요. 기록을 바꾸지 않고 이 회차의 관련 단원을 안내해요.');
    }
  }
  const review = reviewRound ? readExamReview(reviewRound, examMode) : null;
  function questionLink(ref) {
    const [round, number] = ref.split('-');
    const status = review?.submitted && review.wrong.includes(ref) ? ' · 오답' :
      review?.submitted && review.unanswered.includes(ref) ? ' · 미응답' : '';
    return `<a href="../test/index.html?round=${round}&amp;q=${number}&amp;mode=${examMode}">${round}회 ${number}번${status} ↗</a>`;
  }
  function renderExamReview() {
    const panel = $('#exam-review');
    if (!review) return;
    panel.hidden = false;
    const refs = review.submitted && !review.refs.length ?
      Array.from({length:50}, (_, index) => `${review.round}-${index + 1}`) : review.refs;
    const related = lessons.map(lesson => ({lesson, count:refs.filter(ref => window.HISTORY_TOPICS[ref].includes(lesson.id)).length})).filter(item => item.count);
    panel.innerHTML = `<span class="eyebrow">${review.round}회 · ${examMode === 'practice' ? '연습' : '시험'} 복습</span><h2>${review.submitted ? '제출한 결과에서 배움으로' : '이 회차와 연결된 배움'}</h2><p>${review.submitted ? review.refs.length ? `오답 ${review.wrong.length}문항 · 미응답 ${review.unanswered.length}문항에 연결된 단원이에요. 한 문항이 여러 단원에 연결될 수 있어요.` : '모든 문항을 맞혔어요! 이 회차의 관련 단원으로 배운 내용을 다져 봐요.' : review.reason}</p><div class="source-chips">${related.map(({lesson, count}) => `<a href="#${lesson.id}" data-lesson="${lesson.id}">${escape(lesson.title)} · ${count}문항</a>`).join('')}</div>${review.submitted && review.refs.length ? `<details><summary>복습할 문항 ${review.refs.length}개 보기</summary><div class="exam-question-links">${review.refs.map(questionLink).join('')}</div></details>` : ''}<a class="button secondary" href="../test/index.html?round=${review.round}&amp;mode=${examMode}">이 회차로 돌아가기 →</a>`;
  }
  function renderExamStudy(lesson) {
    const study = examStudy[lesson.id];
    const rounds = [...new Set(study.refs.map(ref => Number(ref.split('-')[0])))];
    return `<section class="exam-study" aria-labelledby="exam-study-title"><h3 id="exam-study-title" class="section-heading"><span>04</span>기출에서 더 배워요</h3><p class="small muted">60~80회 해설의 역사적 사실을 바탕으로 새로 정리한 보충 노트예요. 공식 해설의 전재가 아니며, 정답 번호는 문제를 열어 확인해요.</p><div class="exam-learning-cards">${study.points.map(point => `<article class="exam-learning-card"><h4>${escape(point.title)}</h4><p>${escape(point.text)}</p><details><summary>근거 문항 ${point.refs.length}개 · 직접 풀어 보기</summary><div class="exam-question-links">${point.refs.map(questionLink).join('')}</div></details></article>`).join('')}</div><details class="exam-related"><summary>관련 기출 ${study.refs.length}문항 · 회차별로 골라 풀기</summary><p class="small muted">${examMode === 'exam' ? '시험 모드로 연결해요. 답안을 제출하기 전에는 정답을 표시하지 않아요.' : '시간 제한 없는 연습 모드로 연결해요. 시험 모드 기록과 따로 저장해요.'}</p>${rounds.map(round => {
      const refs = study.refs.filter(ref => ref.startsWith(`${round}-`));
      return `<details class="exam-round"><summary>${round}회 · ${refs.length}문항</summary><div class="exam-question-links">${refs.map(questionLink).join('')}</div></details>`;
    }).join('')}</details></section>`;
  }
  const announce = message => { $('#announcement').textContent = message; };
  function focusLesson() {
    const link = $(`#concept-list [data-lesson="${selected}"]`);
    if (link?.getClientRects().length) link.scrollIntoView({block:'nearest', inline:'nearest'});
    $('#lesson').focus({preventScroll:true});
    $('#lesson').scrollIntoView({block:'start'});
  }
  const normalize = value => value.normalize('NFC').trim().toLocaleLowerCase();
  const searchable = lesson => normalize([
    lesson.title, lesson.era, lesson.lead, lesson.story, lesson.memory,
    ...lesson.steps.flatMap(step => [step.title, step.text]),
    ...lesson.glossary.flatMap(word => [word.term, word.meaning]),
    ...lesson.compare.rows.flatMap(row => [row.label, row.left, row.right]),
    ...examStudy[lesson.id].points.flatMap(point => [point.title, point.text])
  ].join(' '));
  const searchIndex = new Map(lessons.map(lesson => [lesson.id, searchable(lesson)]));
  let state = load();
  let era = '전체';
  let selected = lessonById.has(location.hash.slice(1)) ? location.hash.slice(1) :
    (review && lessons.find(lesson => review.refs.some(ref => window.HISTORY_TOPICS[ref].includes(lesson.id)))?.id) || state.last;
  let filtered = lessons;

  function renderProgress() {
    const complete = state.complete.length;
    const correct = lessons.reduce((count, lesson) => count + lesson.quiz.filter((quiz, index) => state.answers[lesson.id]?.[index] === quiz.answer).length, 0);
    $('#progress-label').innerHTML = `${complete} <span class="small">/ ${lessons.length}개 단원</span>`;
    $('#study-progress').max = lessons.length;
    $('#study-progress').value = complete;
    $('#progress-text').textContent = complete === lessons.length ? '모든 단원을 한 바퀴 공부했어요. 내 말로 다시 설명해 봐요.' : `${Math.round(complete / lessons.length * 100)}% 완료 · 이해한 단원에 직접 완료 표시를 해요.`;
    $('#quiz-progress').textContent = `확인 문제 정답 ${correct} / ${lessons.reduce((count, lesson) => count + lesson.quiz.length, 0)}`;
  }
  function renderEras() {
    $('#era-filters').innerHTML = eras.map(name => `<button type="button" data-era="${escape(name)}" aria-pressed="${name === era}">${escape(name)}</button>`).join('');
  }
  function clearFilters() {
    era = '전체';
    $('#search').value = '';
    $('#study-filter').value = 'all';
    renderEras();
  }
  function renderList() {
    $('#list-summary').textContent = `${filtered.length} / ${lessons.length}`;
    let group = '';
    $('#concept-list').innerHTML = filtered.map(lesson => {
      const heading = group === lesson.era ? '' : `<p class="concept-group">${escape(lesson.era)}</p>`;
      group = lesson.era;
      return `${heading}<a class="concept-link" href="#${lesson.id}" data-lesson="${lesson.id}" aria-current="${selected === lesson.id}"><span class="sequence">${String(lessons.indexOf(lesson) + 1).padStart(2, '0')}</span><span>${escape(lesson.title)}</span>${state.bookmarked.includes(lesson.id) ? '<span class="saved-dot" aria-label="북마크">★</span>' : ''}${state.complete.includes(lesson.id) ? '<span class="complete-dot" aria-label="학습 완료">✓</span>' : ''}</a>`;
    }).join('') || '<p class="small muted">조건에 맞는 단원이 없어요.</p>';
  }
  function applyFilters(focus = false, force = false) {
    const query = normalize($('#search').value);
    const status = $('#study-filter').value;
    filtered = lessons.filter(lesson => (era === '전체' || lesson.era === era) &&
      (status !== 'complete' || state.complete.includes(lesson.id)) &&
      (status !== 'incomplete' || !state.complete.includes(lesson.id)) &&
      (status !== 'bookmarked' || state.bookmarked.includes(lesson.id)) &&
      (!query || searchIndex.get(lesson.id).includes(query)));
    if (!filtered.some(lesson => lesson.id === selected)) {
      selected = filtered.find(lesson => lesson.id === state.last)?.id || filtered[0]?.id || '';
      if (selected) history.replaceState(null, '', `#${selected}`);
    }
    renderList();
    if (force || $('#lesson').dataset.lessonId !== selected) renderLesson(focus);
    else {
      updateLessonActions();
      renderNavigation();
      if (focus) focusLesson();
    }
  }
  function photoCredit(photo) {
    return `사진: ${escape(photo.author)} · <a href="${escape(photo.licenseUrl)}" target="_blank" rel="noopener noreferrer">${escape(photo.license)}</a><br><a href="${escape(photo.article)}" target="_blank" rel="noopener noreferrer">위키백과 설명</a> · <a href="${escape(photo.file)}" target="_blank" rel="noopener noreferrer">위키미디어 원본·이용 조건</a>`;
  }
  function renderPhoto(key) {
    const photo = photos[key];
    if (!photo) throw new Error(`Missing licensed photograph: ${key}`);
    return `<figure class="photo-figure"><div><button type="button" class="photo-button" data-zoom="${escape(key)}" aria-label="${escape(photo.title)} 크게 보기"><img src="${escape(photo.src)}" width="${photo.width}" height="${photo.height}" loading="lazy" decoding="async" alt="${escape(photo.alt)}" data-photo="${escape(key)}"><span aria-hidden="true">사진 크게 보기 ↗</span></button><p class="photo-error" role="status" hidden>사진을 불러오지 못했어요. 인터넷 연결이나 사진 원본 링크를 확인해 주세요. 위의 학습용 개념 그림은 계속 볼 수 있어요.</p></div><figcaption><span class="eyebrow">사진에서 찾는 단서</span><h3>${escape(photo.title)}</h3><p>${escape(photo.caption)}</p><div class="photo-credit">${photoCredit(photo)}</div></figcaption></figure>`;
  }
  function renderVideo(video, prefix) {
    const course = courseById.get(video.course);
    const note = videoNotes.get(video.id);
    const title = note?.actualTitle || video.title;
    const evidence = note?.evidence === 'transcript' ? '공개 자막 일부 확인' : note?.evidence === 'description' ? '공개 설명 확인' : note?.actualTitle ? '실제 영상 제목 확인' : '강의 목록의 주제 연결 · 영상 내용 미확인';
    return `<div class="video-card" data-video-card="${video.id}"><p class="course-label">${escape(course.name)} · ${escape(course.teacher)}</p><h4>${escape(title)}</h4><p class="catalog-title">목록 표기: ${escape(video.title)} · ${escape(video.topic)}</p><span class="evidence-label">${evidence}</span>${note?.scope ? `<p class="video-scope">${escape(note.scope)}</p>` : ''}${note?.takeaways?.length ? `<ul class="video-notes">${note.takeaways.map(text => `<li>${escape(text)}</li>`).join('')}</ul>` : ''}<div class="actions"><a class="button secondary" href="${escape(video.url)}" target="_blank" rel="noopener noreferrer">YouTube에서 보기 ↗</a><button type="button" class="button quiet" data-play="${video.id}" aria-expanded="false" aria-controls="player-${prefix}-${video.id}">여기서 영상 열기</button></div><div class="video-player" id="player-${prefix}-${video.id}" hidden></div></div>`;
  }
  function renderQuizzes(lesson) {
    return lesson.quiz.map((quiz, index) => `<fieldset class="check-question" data-quiz-block="${index}" aria-describedby="quiz-feedback-${index}"><legend>${index + 1}. ${escape(quiz.question)}</legend><div class="quiz-options">${quiz.options.map((option, answer) => `<label class="quiz-option" data-option="${answer}"><input type="radio" name="quiz-${lesson.id}-${index}" data-quiz="${index}" value="${answer}" ${state.answers[lesson.id]?.[index] === answer ? 'checked' : ''}><span>${escape(option)}</span><span class="choice-result" aria-hidden="true"></span></label>`).join('')}</div><p id="quiz-feedback-${index}" class="quiz-feedback" role="status" aria-live="polite" aria-atomic="true" hidden></p></fieldset>`).join('');
  }
  function updateQuizFeedback(index) {
    const lesson = lessonById.get(selected);
    const quiz = lesson.quiz[index];
    const answer = state.answers[selected]?.[index];
    const answered = Number.isInteger(answer);
    const block = $(`[data-quiz-block="${index}"]`);
    block.querySelectorAll('.quiz-option').forEach(label => {
      const option = Number(label.dataset.option);
      label.classList.toggle('correct', answered && option === quiz.answer);
      label.classList.toggle('incorrect', answered && option === answer && answer !== quiz.answer);
      label.querySelector('.choice-result').textContent = !answered ? '' : option === quiz.answer ? '정답' : option === answer ? '선택' : '';
    });
    const feedback = block.querySelector('.quiz-feedback');
    feedback.hidden = !answered;
    feedback.classList.toggle('incorrect', answered && answer !== quiz.answer);
    feedback.textContent = answered ? `${answer === quiz.answer ? '맞았어요!' : `다시 생각해 봐요. 정답은 ${quiz.answer + 1}번이에요.`} ${quiz.explanation}` : '';
  }
  function updateLessonActions() {
    if (!selected) return;
    const complete = state.complete.includes(selected);
    const bookmarked = state.bookmarked.includes(selected);
    const completeButton = $('#complete-lesson');
    const bookmarkButton = $('#bookmark-lesson');
    completeButton.textContent = complete ? '✓ 학습 완료 · 취소' : '이 단원, 이해했어요';
    completeButton.setAttribute('aria-pressed', complete);
    completeButton.classList.toggle('secondary', complete);
    bookmarkButton.textContent = bookmarked ? '★ 북마크 해제' : '다시 볼 단원 저장';
    bookmarkButton.setAttribute('aria-pressed', bookmarked);
  }
  function renderNavigation() {
    if (!selected) return;
    const position = filtered.findIndex(lesson => lesson.id === selected);
    $('#lesson-navigation').innerHTML = `${position > 0 ? `<a href="#${filtered[position - 1].id}" data-lesson="${filtered[position - 1].id}">← ${escape(filtered[position - 1].title)}</a>` : '<span></span>'}${position < filtered.length - 1 ? `<a href="#${filtered[position + 1].id}" data-lesson="${filtered[position + 1].id}">${escape(filtered[position + 1].title)} →</a>` : '<span></span>'}`;
  }
  function renderLesson(focus = false) {
    const article = $('#lesson');
    article.dataset.lessonId = selected;
    const lesson = lessonById.get(selected);
    if (!lesson) {
      article.innerHTML = '<div class="empty"><h2>조건에 맞는 단원이 없어요.</h2><p>검색어를 바꾸거나 다른 시대·학습 상태를 선택해 보세요.</p><button type="button" class="button secondary" data-clear-filters>전체 단원 보기</button></div>';
      if (focus) focusLesson();
      return;
    }
    article.innerHTML = `<div class="lesson-kicker"><span class="eyebrow">LESSON ${String(lessons.indexOf(lesson) + 1).padStart(2, '0')} / ${escape(lesson.era)}</span><span class="pill">그림 → 이해 → 확인</span></div>
      <h2>${escape(lesson.title)}</h2><p class="summary">${escape(lesson.lead)}</p>
      ${renderDiagram(lesson.diagram)}
      <h3 class="section-heading"><span>01</span>먼저, 이야기를 연결해요</h3><p class="lesson-story">${escape(lesson.story)}</p>
      ${renderPhoto(lesson.photo)}
      <ol class="lesson-points">${lesson.steps.map(step => `<li><div><h4>${escape(step.title)}</h4><p>${escape(step.text)}</p></div></li>`).join('')}</ol>
      <aside class="glossary"><h3>낯선 말, 쉬운 뜻</h3><dl>${lesson.glossary.map(word => `<div><dt>${escape(word.term)}</dt><dd>${escape(word.meaning)}</dd></div>`).join('')}</dl></aside>
      <section class="comparison"><h3 class="section-heading"><span>02</span>${escape(lesson.compare.title)}</h3><table><caption class="sr-only">${escape(lesson.compare.title)}</caption><thead><tr><th scope="col">비교 단서</th><th scope="col">${escape(lesson.compare.leftTitle)}</th><th scope="col">${escape(lesson.compare.rightTitle)}</th></tr></thead><tbody>${lesson.compare.rows.map(row => `<tr><th scope="row">${escape(row.label)}</th><td>${escape(row.left)}</td><td>${escape(row.right)}</td></tr>`).join('')}</tbody></table></section>
      <div class="remember"><strong>한 줄 기억 고리 · 뜻을 이해한 다음 떠올려요</strong><p>${escape(lesson.memory)}</p></div>
      <section class="quiz-section"><h3 class="section-heading"><span>03</span>기억에서 꺼내 볼까요?</h3><p class="small muted">답을 누르면 바로 해설이 나와요. 다시 선택해도 괜찮아요.</p><div id="quizzes">${renderQuizzes(lesson)}</div><div class="lesson-quiz-actions"><button type="button" class="button quiet" data-clear-answers>이 단원 답안만 지우기</button></div></section>
      ${renderExamStudy(lesson)}
      <section class="sources"><h3>원문과 관련 강의로 한 번 더</h3><p>이 설명의 바탕이 된 PDF 쪽수예요. 압축 표기의 오류는 출처 안내에서 바로잡았어요.</p><div class="source-chips">${lesson.pages.map(page => `<a href="${escape(sources.pdf)}#page=${page}" target="_blank" rel="noopener">요약 PDF ${page}쪽 ↗</a>`).join('')}</div><details class="related-videos"><summary>이 시대와 연결한 강의 ${lesson.videoIds.length}개</summary><p class="small muted">단원 전체를 모두 다루는 영상은 아닐 수 있어요. 실제 제목과 확인 범위를 살펴보고 골라 봐요.</p>${lesson.videoIds.map(id => renderVideo(videoById.get(id), lesson.id)).join('')}</details></section>
      <div class="lesson-actions"><button id="complete-lesson" type="button" class="button" data-toggle="complete"></button><button id="bookmark-lesson" type="button" class="button secondary" data-toggle="bookmarked"></button></div><nav id="lesson-navigation" class="lesson-navigation" aria-label="이전·다음 단원"></nav>`;
    lesson.quiz.forEach((quiz, index) => updateQuizFeedback(index));
    updateLessonActions();
    renderNavigation();
    if (focus) focusLesson();
  }
  function selectLesson(id, focus = true) {
    if (!lessonById.has(id)) throw new Error(`Unknown lesson: ${id}`);
    if (!filtered.some(lesson => lesson.id === id)) clearFilters();
    selected = id;
    state.last = id;
    persist();
    applyFilters(focus, true);
  }
  function openVideo(button) {
    const video = videoById.get(button.dataset.play);
    const slot = document.getElementById(button.getAttribute('aria-controls'));
    const wasOpen = !slot.hidden;
    document.querySelectorAll('.video-player').forEach(player => { player.replaceChildren(); player.hidden = true; });
    document.querySelectorAll('[data-play]').forEach(control => { control.setAttribute('aria-expanded', 'false'); control.textContent = '여기서 영상 열기'; });
    if (wasOpen) return;
    slot.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${video.videoId}?rel=0" title="${escape(videoNotes.get(video.id)?.actualTitle || video.title)}" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe><p>영상 재생에는 인터넷이 필요해요. 재생되지 않으면 위의 ‘YouTube에서 보기’를 눌러 주세요.</p>`;
    slot.hidden = false;
    button.setAttribute('aria-expanded', 'true');
    button.textContent = '영상 닫기';
  }

  $('#search').addEventListener('input', () => applyFilters());
  $('#study-filter').addEventListener('change', () => applyFilters());
  $('#era-filters').addEventListener('click', event => {
    const button = event.target.closest('[data-era]');
    if (!button) return;
    era = button.dataset.era;
    renderEras();
    applyFilters();
    $(`[data-era="${era}"]`).focus({preventScroll:true});
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (button?.hasAttribute('data-play')) openVideo(button);
    if (button?.hasAttribute('data-clear-filters')) { clearFilters(); applyFilters(true); }
    const link = event.target.closest('[data-lesson]');
    if (link && link.dataset.lesson === selected) {
      event.preventDefault();
      focusLesson();
    }
  });
  $('#lesson').addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.toggle) {
      const field = button.dataset.toggle;
      if (!['complete', 'bookmarked'].includes(field)) throw new Error('Invalid learning action');
      state[field] = state[field].includes(selected) ? state[field].filter(id => id !== selected) : [...state[field], selected];
      state.last = selected;
      persist();
      renderProgress();
      applyFilters(false);
      if (!document.contains(button)) focusLesson();
    }
    if (button.hasAttribute('data-clear-answers')) {
      delete state.answers[selected];
      persist();
      const lesson = lessonById.get(selected);
      $('#quizzes').innerHTML = renderQuizzes(lesson);
      lesson.quiz.forEach((quiz, index) => updateQuizFeedback(index));
      renderProgress();
      announce('이 단원의 확인 문제 답안만 지웠어요.');
    }
    if (button.dataset.zoom) {
      const photo = photos[button.dataset.zoom];
      $('#image-title').textContent = photo.title;
      $('#zoom-image').src = photo.src;
      $('#zoom-image').alt = photo.alt;
      $('#zoom-caption').textContent = photo.caption;
      $('#zoom-credits').innerHTML = photoCredit(photo);
      $('#image-dialog').showModal();
    }
  });
  $('#lesson').addEventListener('change', event => {
    const input = event.target.closest('input[data-quiz]');
    if (!input) return;
    const index = Number(input.dataset.quiz);
    const answer = Number(input.value);
    const lesson = lessonById.get(selected);
    if (!lesson.quiz[index] || !Number.isInteger(answer) || answer < 0 || answer >= lesson.quiz[index].options.length) throw new Error('Invalid quiz answer');
    state.answers[selected] ||= lesson.quiz.map(() => null);
    state.answers[selected][index] = answer;
    state.last = selected;
    persist();
    updateQuizFeedback(index);
    renderProgress();
  });
  $('#lesson').addEventListener('error', event => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement) || !image.dataset.photo) return;
    const figure = image.closest('.photo-figure');
    figure.querySelector('.photo-button').hidden = true;
    figure.querySelector('.photo-error').hidden = false;
  }, true);
  $('#image-dialog').addEventListener('close', () => $('#zoom-image').removeAttribute('src'));
  $('#zoom-image').addEventListener('error', () => {
    $('#zoom-caption').textContent = '확대 사진을 불러오지 못했어요. 아래 위키미디어 원본 링크에서 확인해 주세요.';
  });
  $('#continue-study').addEventListener('click', () => {
    clearFilters();
    selected = state.last;
    history.replaceState(null, '', `#${selected}`);
    applyFilters(true, true);
  });
  $('#reset-progress').addEventListener('click', () => { $('#reset-error').hidden = true; $('#reset-dialog').showModal(); });
  $('#confirm-reset').addEventListener('click', () => {
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      if (!(error instanceof DOMException)) throw error;
      $('#reset-error').textContent = '브라우저가 기록 삭제를 막았어요. 초기화하지 않았으니 저장 설정을 확인해 주세요.';
      $('#reset-error').hidden = false;
      return;
    }
    state = emptyState();
    selected = state.last;
    clearFilters();
    history.replaceState(null, '', `#${selected}`);
    renderProgress();
    applyFilters(false, true);
    $('#storage-notice').hidden = true;
    $('#reset-dialog').close();
    announce('심화 학습 기록만 초기화했어요.');
  });
  window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1);
    if (lessonById.has(id)) selectLesson(id);
    else if (!['', 'lesson', 'video-library'].includes(id)) {
      warn('요청한 단원을 찾지 못했어요. 현재 목차에서 단원을 골라 주세요.');
    }
  });
  $('#note-link').href = sources.pdf;
  $('#advanced-test-link').href = `../test/index.html?mode=${examMode}`;
  $('#catalog-sources').innerHTML = sources.courses.map(course => `<a href="${escape(course.source)}">${escape(course.name)} · 원본 MD ↗</a>`).join('');
  $('#video-catalog').innerHTML = sources.courses.map(course => `<section aria-labelledby="course-${course.id}"><h3 id="course-${course.id}" class="video-course-heading">${escape(course.name)}<small>${escape(course.teacher)} · ${course.count}개 강의${course.id === 'genius' ? ' · 번호는 원본 목록의 순서' : ''}</small></h3><ol class="video-course-list">${sources.videos.filter(video => video.course === course.id).map(video => `<li>${renderVideo(video, 'library')}</li>`).join('')}</ol></section>`).join('');
  renderEras();
  renderExamReview();
  renderProgress();
  applyFilters();
})();
