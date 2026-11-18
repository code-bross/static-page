(() => {
  'use strict';
  const {escape, warn, load, save, exams, concepts, topics, conceptById, readAttempt} = window.HistoryApp;
  const visuals = window.HistoryStudyVisuals;
  const $ = selector => document.querySelector(selector);
  const key = 'kh-basic-study-v1';
  const emptyProgress = () => ({complete:[],bookmarked:[],last:concepts[0].id});
  const validIds = ids => Array.isArray(ids) && ids.every(id => conceptById.has(id));
  let progress = load(key, emptyProgress(), value => value && validIds(value.complete) && validIds(value.bookmarked) && conceptById.has(value.last));
  let era = '전체';
  let selected = conceptById.has(location.hash.slice(1)) ? location.hash.slice(1) : progress.last;
  let filtered = concepts;
  const eras = ['전체', '선사·고조선', '삼국·남북국', '고려', '조선', '근대', '일제 강점기', '현대', '통합·문화'];
  const params = new URLSearchParams(location.search);
  const reviewRound = Number(params.get('review'));
  const reviewExam = exams.find(exam => exam.round === reviewRound);
  let wrongTopics = new Set();
  let wrongRefs = new Set();

  function updateWrongTopics() {
    wrongTopics = new Set();
    wrongRefs = new Set();
    for (const exam of exams) {
      if (reviewExam && exam.round !== reviewRound) continue;
      const attempt = readAttempt(exam.round);
      if (!attempt?.submitted) continue;
      for (const question of exam.questions) {
        if (attempt.answers[question.number - 1] === question.answer) continue;
        const ref = `${exam.round}-${question.number}`;
        wrongRefs.add(ref);
        for (const id of topics[ref] || []) wrongTopics.add(id);
      }
    }
  }
  function persist() {
    save(key, progress);
  }
  function renderProgress() {
    const count = new Set(progress.complete).size;
    $('#study-progress-label').innerHTML = `${count} <span class="small">/ ${concepts.length}개 개념</span>`;
    $('#study-progress').max = concepts.length;
    $('#study-progress').value = count;
    $('#study-progress-text').textContent = count === concepts.length ? '모든 개념을 한 바퀴 공부했어요. 기출로 다시 확인해 보세요.' : `${Math.round(count / concepts.length * 100)}% 완료 · 이해한 만큼, 나의 역사가 됩니다.`;
  }
  function renderFilters() {
    $('#era-filters').innerHTML = eras.map(name => `<button type="button" data-era="${escape(name)}" aria-pressed="${era === name}">${escape(name)}</button>`).join('');
  }
  function resetFilters() {
    era = '전체';
    $('#search').value = '';
    $('#study-filter').value = 'all';
    filtered = concepts;
    renderFilters();
  }
  function applyFilters() {
    const query = $('#search').value.trim().toLocaleLowerCase();
    const filter = $('#study-filter').value;
    filtered = concepts.filter(concept => {
      if (era !== '전체' && concept.era !== era) return false;
      if (filter === 'complete' && !progress.complete.includes(concept.id)) return false;
      if (filter === 'incomplete' && progress.complete.includes(concept.id)) return false;
      if (filter === 'bookmarked' && !progress.bookmarked.includes(concept.id)) return false;
      if (filter === 'wrong' && !wrongTopics.has(concept.id)) return false;
      return !query || [concept.title,concept.summary,concept.era,...concept.keywords,...concept.points,concept.remember].join(' ').toLocaleLowerCase().includes(query);
    });
    if (!filtered.some(concept => concept.id === selected)) selected = filtered[0]?.id || '';
    renderList();
    renderLesson();
  }
  function renderList() {
    $('#list-summary').textContent = `${filtered.length}개 개념${$('#study-filter').value === 'wrong' ? ` · ${reviewExam ? `제${reviewRound}회` : '제출한 전체 회차'} 오답 기준` : ''}`;
    let group = '';
    $('#concept-list').innerHTML = filtered.map(concept => {
      const label = group !== concept.era ? `<p class="concept-group">${escape(concept.era)}</p>` : '';
      group = concept.era;
      return `${label}<a class="concept-link" href="#${concept.id}" aria-current="${selected === concept.id}"><span class="sequence">${String(concepts.indexOf(concept) + 1).padStart(2, '0')}</span><span>${escape(concept.title)}</span>${progress.complete.includes(concept.id) ? '<span class="complete-dot" aria-label="학습 완료">✓</span>' : ''}</a>`;
    }).join('');
  }
  function renderLesson(focus = false) {
    const concept = conceptById.get(selected);
    if (!concept) {
      $('#lesson').innerHTML = `<div class="empty"><h2>조건에 맞는 개념이 없어요.</h2><p>${$('#study-filter').value === 'wrong' ? '채점한 모의고사의 오답·미응답이 있어야 연결 개념이 표시됩니다.' : '검색어를 바꾸거나 다른 시대·학습 상태를 선택해 보세요.'}</p><button type="button" id="clear-filters" class="button secondary">전체 개념 보기</button></div>`;
      return;
    }
    progress.last = concept.id;
    persist();
    const position = filtered.indexOf(concept);
    const complete = progress.complete.includes(concept.id);
    const bookmarked = progress.bookmarked.includes(concept.id);
    const refs = $('#study-filter').value === 'wrong' ? concept.refs.filter(ref => wrongRefs.has(ref)) : concept.refs;
    $('#lesson').innerHTML = `<span class="eyebrow">CONCEPT ${String(concepts.indexOf(concept) + 1).padStart(2,'0')} / ${escape(concept.era)}</span>
      <span class="pill">${concept.refs.length}개 기출 문항과 연결</span>
      <h2>${escape(concept.title)}</h2><p class="summary">${escape(concept.summary)}</p>
      <div class="keywords">${concept.keywords.map(word => `<span>${escape(word)}</span>`).join('')}</div>
      ${visuals.render(concept)}
      <h3>이렇게 이해하세요</h3><ol class="lesson-points">${concept.points.map(point => `<li><span>${visuals.emphasize(point, concept.keywords)}</span></li>`).join('')}</ol>
      <div class="remember"><strong>한 줄로 연결하기</strong>${visuals.memory(concept)}</div>
      <section class="retrieval"><h3>기억에서 꺼내보기</h3><p>${escape(concept.quiz.prompt)}</p><details><summary>생각한 뒤 정답 확인하기</summary><p>${escape(concept.quiz.answer)}</p></details></section>
      <section class="sources"><h3>기출에서 확인하기</h3><p>같은 개념이 쓰인 문제로 이동합니다. 기존 답안이 있으면 이어서 열립니다.${$('#study-filter').value === 'wrong' ? ' 현재는 오답·미응답만 표시합니다.' : ''}</p><div class="source-chips">${refs.map(ref => {
        const [round, number] = ref.split('-');
        return `<a href="../test/index.html?round=${round}&q=${number}">${round}회 ${number}번 ↗</a>`;
      }).join('')}</div></section>
      <div class="lesson-actions"><button type="button" class="button ${complete ? 'secondary' : ''}" id="complete-concept" aria-pressed="${complete}">${complete ? '✓ 학습 완료 · 취소' : '이 개념, 이해했어요'}</button><button type="button" class="button secondary" id="bookmark-concept" aria-pressed="${bookmarked}">${bookmarked ? '북마크 해제' : '다시 볼 개념 저장'}</button></div>
      <nav class="lesson-navigation" aria-label="개념 이동">${position > 0 ? `<a href="#${filtered[position - 1].id}">← ${escape(filtered[position - 1].title)}</a>` : '<span></span>'}${position < filtered.length - 1 ? `<a href="#${filtered[position + 1].id}">${escape(filtered[position + 1].title)} →</a>` : '<span></span>'}</nav>`;
    const url = new URL(location.href);
    url.hash = selected;
    url.searchParams.set('filter', $('#study-filter').value);
    history.replaceState(null, '', url);
    if (focus) {
      $('#lesson').focus({preventScroll:true});
      $('#lesson').scrollIntoView({block:'start'});
    }
  }
  function showConcept(id, focus = true) {
    if (!conceptById.has(id)) {
      warn('해당 개념을 찾을 수 없습니다. 목차에서 선택해 주세요.');
      return;
    }
    if (!filtered.some(concept => concept.id === id)) {
      resetFilters();
    }
    selected = id;
    renderList();
    renderLesson(focus);
  }
  $('#search').addEventListener('input', applyFilters);
  $('#study-filter').addEventListener('change', () => {
    const url = new URL(location.href);
    url.searchParams.set('filter', $('#study-filter').value);
    history.replaceState(null, '', url);
    updateWrongTopics();
    applyFilters();
  });
  $('#era-filters').addEventListener('click', event => {
    const button = event.target.closest('[data-era]');
    if (!button) return;
    era = button.dataset.era;
    renderFilters();
    applyFilters();
  });
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || !conceptById.has(link.hash.slice(1))) return;
    event.preventDefault();
    const id = link.hash.slice(1);
    history.pushState(null, '', link.hash);
    showConcept(id);
  });
  $('#lesson').addEventListener('click', event => {
    if (event.target.closest('#clear-filters')) {
      resetFilters();
      applyFilters();
      return;
    }
    const field = event.target.closest('#complete-concept') ? 'complete' : event.target.closest('#bookmark-concept') ? 'bookmarked' : '';
    if (!field) return;
    const buttonId = field === 'complete' ? '#complete-concept' : '#bookmark-concept';
    progress[field] = progress[field].includes(selected) ? progress[field].filter(id => id !== selected) : [...progress[field], selected];
    persist();
    renderProgress();
    applyFilters();
    $(buttonId)?.focus({preventScroll:true});
  });
  $('#continue-study').addEventListener('click', () => {
    const start = concepts.findIndex(concept => concept.id === progress.last);
    const ordered = [...concepts.slice(start), ...concepts.slice(0, start)];
    showConcept(ordered.find(concept => !progress.complete.includes(concept.id))?.id || progress.last);
  });
  $('#reset-progress').addEventListener('click', () => $('#reset-dialog').showModal());
  $('#reset-dialog').addEventListener('close', () => {
    if ($('#reset-dialog').returnValue !== 'reset') return;
    progress = emptyProgress();
    selected = concepts[0].id;
    resetFilters();
    persist();
    renderProgress();
    applyFilters();
  });
  window.addEventListener('hashchange', () => showConcept(location.hash.slice(1)));
  window.addEventListener('storage', event => {
    if (event.key?.startsWith('kh-basic-attempt-')) {
      updateWrongTopics();
      if ($('#study-filter').value === 'wrong') applyFilters();
    }
  });
  updateWrongTopics();
  if (reviewExam) {
    $('#study-filter').value = 'wrong';
    $('#review-notice').hidden = false;
    $('#review-notice').innerHTML = `제${reviewRound}회 복습 연결로 방문했습니다. ‘오답 연결 개념’에서 이 회차의 오답·미응답 관련 개념 ${wrongTopics.size}개를 볼 수 있습니다. <a href="index.html">전체 회차 기준으로 전환</a>`;
  }
  if ([...$('#study-filter').options].some(option => option.value === params.get('filter'))) {
    $('#study-filter').value = params.get('filter');
  }
  renderProgress();
  renderFilters();
  applyFilters();
})();
