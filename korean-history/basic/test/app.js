(() => {
  'use strict';
  const {escape, warn, save, exams, attemptKey, readAttempt, grade, conceptLinks, questionImage} = window.HistoryApp;
  const $ = selector => document.querySelector(selector);
  const symbols = ['①', '②', '③', '④'];
  let exam;
  let attempt;
  let reviewFilter = 'all';
  let pendingAction = '';
  let mode = 'exam';

  function freshAttempt() {
    return {answers:Array(50).fill(0),marked:[],current:0,submitted:false,remaining:4200,deadline:mode === 'practice' ? null : Date.now() + 4200000};
  }
  function persist() {
    save(attemptKey(exam.round, mode), attempt);
  }
  const lobbyURL = () => location.pathname + (mode === 'practice' ? '?mode=practice' : '');
  function renderMode() {
    const practice = mode === 'practice';
    for (const button of document.querySelectorAll('[data-mode]')) button.setAttribute('aria-pressed', String(button.dataset.mode === mode));
    $('#mode-description').textContent = `${practice ? '연습 모드는 답을 고르면 바로 정답과 해설을 보여 주며, 답을 바꿀 수도 있습니다. 시간 제한은 없습니다.' : '시험 모드는 제출 후 정답과 해설이 공개됩니다.'} 모드별 답안은 따로 저장되며, 시험 시간은 다른 화면에서도 흐릅니다.`;
    $('#time-limit-value').textContent = practice ? '무제한' : '70분';
    $('#mode-summary').textContent = practice ? '답을 고르면 바로 정답·오답 해설을 확인합니다. 연습 기록은 시험 답안과 따로 저장되며, 언제든 이어서 풀 수 있어요.' : '답안과 남은 시간을 이 브라우저에 저장합니다. 시험을 마치면 오답에서 관련 개념으로 바로 이동할 수 있어요.';
    $('#back-lobby').href = lobbyURL();
    $('#test-nav').href = lobbyURL();
    $('#exam').setAttribute('aria-label', practice ? '기출 연습 풀이' : '모의고사 풀이');
    for (const selector of ['#study-nav', '#study-intro']) $(selector).href = `../study/index.html${practice ? '?mode=practice' : ''}`;
  }
  function remainingTime() {
    return attempt.deadline === null ? attempt.remaining : Math.max(0, Math.ceil((attempt.deadline - Date.now()) / 1000));
  }
  function updateTimer() {
    if (!exam || !attempt || $('#exam').hidden) return;
    if (attempt.submitted || mode === 'practice') {
      const label = attempt.submitted ? '채점 완료' : '시간 제한 없음';
      $('#timer').textContent = label;
      $('#timer').classList.remove('urgent');
      $('#timer').removeAttribute('role');
      $('#timer').setAttribute('aria-label', label);
      return;
    }
    attempt.remaining = remainingTime();
    const minutes = Math.floor(attempt.remaining / 60);
    const seconds = attempt.remaining % 60;
    $('#timer').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    $('#timer').classList.toggle('urgent', attempt.remaining <= 300);
    $('#timer').setAttribute('role', 'timer');
    $('#timer').setAttribute('aria-label', `남은 시간 ${minutes}분 ${seconds}초${attempt.deadline === null ? ', 일시정지 중' : ''}`);
    if (attempt.remaining === 0) submit(true);
  }
  function renderLobby() {
    renderMode();
    $('#lobby').hidden = false;
    $('#exam').hidden = true;
    $('#exam-list').innerHTML = [...exams].reverse().map((item, index) => {
      const saved = readAttempt(item.round, mode);
      const answered = saved?.answers.filter(Boolean).length || 0;
      const status = saved ? saved.submitted ? `${grade(item, saved.answers).score}점 · 풀이 완료` : `${answered} / 50문항 진행 중` : '아직 풀지 않은 회차';
      return `<article class="exam-card">
        <div class="card-top"><span class="pill">기본</span><span class="round-index">${String(index + 1).padStart(2, '0')}</span></div>
        <h3>제${item.round}회</h3><p>50문항 · ${mode === 'practice' ? '시간 제한 없음' : '70분'} · 100점</p><p>${status}</p>
        <button type="button" class="button ${saved ? 'secondary' : ''}" data-round="${item.round}">${saved ? saved.submitted ? '결과·오답 보기' : '이어서 풀기' : mode === 'practice' ? '연습 시작' : '모의고사 시작'} →</button>
        <div class="source-row"><a href="${escape(item.paper)}" target="_blank" rel="noopener">원본 문제지 ↗</a><a href="${escape(item.key)}" target="_blank" rel="noopener">정답표 ↗</a></div>
      </article>`;
    }).join('');
  }
  function questionNumbers() {
    return exam.questions.filter(question => {
      if (!attempt.submitted || reviewFilter === 'all') return true;
      if (reviewFilter === 'marked') return attempt.marked.includes(question.number);
      return attempt.answers[question.number - 1] !== question.answer;
    }).map(question => question.number);
  }
  function syncURL(push = false) {
    const url = new URL(location.href);
    url.search = '';
    url.searchParams.set('round', exam.round);
    url.searchParams.set('q', attempt.current + 1);
    if (mode === 'practice') url.searchParams.set('mode', 'practice');
    if (push) history.pushState(null, '', url);
    else history.replaceState(null, '', url);
  }
  function renderSidebar() {
    const answered = attempt.answers.filter(Boolean).length;
    const visible = questionNumbers();
    $('#answered-label').textContent = `${answered} / 50 응답`;
    $('#marked-label').textContent = `다시 볼 문제 ${attempt.marked.length}`;
    $('#answer-progress').value = answered;
    $('#number-grid').innerHTML = exam.questions.map(question => {
      const number = question.number;
      const selected = attempt.answers[number - 1];
      const marked = attempt.marked.includes(number);
      const revealed = attempt.submitted || (mode === 'practice' && selected > 0);
      const incorrect = revealed && selected !== question.answer;
      return `<button type="button" data-number="${number}" class="${selected ? 'answered ' : ''}${marked ? 'marked ' : ''}${incorrect ? 'incorrect' : ''}" aria-current="${attempt.current === number - 1}" aria-label="${number}번, ${selected ? `${selected}번 선택` : '미응답'}${marked ? ', 다시 보기' : ''}${revealed ? incorrect ? ', 오답' : ', 정답' : ''}" ${visible.includes(number) ? '' : 'disabled'}>${number}</button>`;
    }).join('');
    $('#submit-exam').hidden = attempt.submitted;
    $('#submit-exam').textContent = mode === 'practice' ? '연습 마치고 결과 보기' : '답안 제출하고 채점';
    $('#key-link').hidden = !attempt.submitted;
    $('#pause').hidden = attempt.submitted || mode === 'practice';
    $('#pause').textContent = attempt.deadline === null ? '계속 풀기' : '일시정지';
    $('#pause').setAttribute('aria-pressed', String(!attempt.submitted && attempt.deadline === null));
    $('#save-status').textContent = attempt.submitted ? '채점 결과가 이 브라우저에 모드별로 저장됩니다.' : mode === 'practice' ? '연습 답안 자동 저장 · 시험 답안과 별도 보관' : attempt.deadline === null ? '일시정지 중 · 시간과 답안 저장됨' : '이 브라우저에 자동 저장 · 페이지를 떠나도 시간은 흐릅니다.';
    $('#answer-legend').innerHTML = mode === 'practice' ? '초록: 정답 · 빨강: 오답 · 주황 점: 다시 보기<br>연습 종료 후에는 미응답도 빨강으로 표시' : '초록: 응답 완료 · 주황 점: 다시 보기<br>채점 후 빨강: 오답 또는 미응답';
  }
  function renderExplanation(question) {
    const explanation = window.HISTORY_EXPLANATIONS[`${exam.round}-${question.number}`];
    const paragraphs = explanation.paragraphs.map(text => text === '오답 설명'
      ? '<h4>다른 보기는 왜 아닐까요?</h4>'
      : `<p>${escape(text)}</p>`).join('');
    return `<section class="answer-explanation" aria-label="문항 해설"><span class="eyebrow">WHY / 정답 이해하기</span><h3>정답 해설</h3>${paragraphs}
      ${explanation.correction ? `<p class="explanation-correction">${escape(explanation.correction)}</p><details class="original-explanation"><summary>수정 전 원문 보기</summary>${explanation.originalParagraphs.map(text => `<p>${escape(text)}</p>`).join('')}</details>` : ''}
      <p class="explanation-source">출처: 해커스한국사 · <a href="${escape(explanation.pdf)}#page=${explanation.page}" target="_blank" rel="noopener">제${exam.round}회 해설 PDF ${explanation.pages.join('·')}쪽 ↗</a></p></section>`;
  }
  function renderQuestion(focus = false) {
    const numbers = questionNumbers();
    const currentNumber = attempt.current + 1;
    if (numbers.length && !numbers.includes(currentNumber)) attempt.current = numbers[0] - 1;
    const question = exam.questions[attempt.current];
    const paused = mode === 'exam' && !attempt.submitted && attempt.deadline === null;
    $('#review-tools').hidden = !attempt.submitted;
    $('#review-filter').value = reviewFilter;
    if (!numbers.length) {
      $('#question-content').innerHTML = '<div class="empty" tabindex="-1" id="question-title"><h2>복습할 문항이 없습니다.</h2><p>다른 필터를 선택하거나 개념 학습으로 이어가세요.</p><a href="../study/index.html">개념 학습 →</a></div>';
    } else if (paused) {
      $('#question-content').innerHTML = '<div class="empty" tabindex="-1" id="question-title"><h2>잠시 쉬어가도 괜찮아요.</h2><p>타이머가 멈췄습니다. 위의 ‘계속 풀기’를 누르면 문제가 다시 나타납니다.</p></div>';
    } else {
      const selected = attempt.answers[attempt.current];
      const revealed = attempt.submitted || (mode === 'practice' && selected > 0);
      const correct = selected === question.answer;
      const marked = attempt.marked.includes(question.number);
      $('#question-content').innerHTML = `
        <div class="question-heading"><h2 id="question-title" tabindex="-1">${question.number}번 문제 <span class="pill">${question.points}점</span></h2><button type="button" id="mark-question" class="button quiet" aria-pressed="${marked}">${marked ? '다시 보기 해제' : '다시 볼 문제'}</button></div>
        ${questionImage(exam, question)}
        <div class="image-links"><a href="../assets/${question.image}" target="_blank" rel="noopener">이미지 크게 보기 ↗</a><a href="${escape(exam.paper)}#page=${question.page}" target="_blank" rel="noopener">원본 PDF ${question.page}쪽 ↗</a></div>
        <details class="source-page-view"><summary>문제지 한 쪽 전체 보기 · 잘림 없이 확인</summary><img src="../assets/${escape(question.image)}" width="${question.width}" height="${question.height}" loading="lazy" alt="제${exam.round}회 기본 문제지 ${question.page}쪽 전체"></details>
        <details class="ocr"><summary>문제 텍스트 펼치기 · 자동 추출</summary><p class="muted small">이미지에서 자동으로 읽은 보조 텍스트로, 글자와 읽는 순서가 부정확할 수 있습니다. 지도·사진과 정확한 지문은 위 원본을 확인하세요.</p><pre>${escape(question.text)}</pre></details>
        <fieldset class="options"><legend>${revealed ? '선택한 답과 정답' : '정답을 선택하세요'}</legend><div class="option-grid">${symbols.map((symbol, index) => {
          const value = index + 1;
          const status = revealed ? value === question.answer ? 'right' : value === selected ? 'wrong' : '' : '';
          return `<label class="option ${status}"><input type="radio" name="answer" value="${value}" ${selected === value ? 'checked' : ''} ${attempt.submitted ? 'disabled' : ''} aria-label="${value}번 보기${revealed && value === question.answer ? ', 정답' : ''}"><span>${symbol}</span></label>`;
        }).join('')}</div></fieldset>
        ${revealed ? `<section class="feedback ${correct ? '' : 'incorrect'}" role="status"><h3>${correct ? '정답입니다.' : selected ? '다시 짚어볼 문제예요.' : '선택하지 않은 문제예요.'}</h3><p>정답 <strong>${symbols[question.answer - 1]}</strong> · 내 답 ${selected ? symbols[selected - 1] : '미응답'} · 획득 점수 ${correct ? question.points : 0} / ${question.points}점</p></section>${renderExplanation(question)}<section class="related-concepts"><h3>관련 개념도 함께 복습하세요</h3><div class="actions">${conceptLinks(`${exam.round}-${question.number}`, mode)}</div></section>` : ''}`;
    }
    const position = numbers.indexOf(attempt.current + 1);
    $('#previous').disabled = paused || position <= 0;
    $('#next').disabled = paused || position < 0 || position >= numbers.length - 1;
    renderSidebar();
    syncURL();
    persist();
    if (focus) {
      $('#question-title').focus({preventScroll:true});
      $('#question-title').scrollIntoView({block:'start'});
    }
  }
  function renderResult(expired = false) {
    const result = grade(exam, attempt.answers);
    const level = result.score >= 80 ? '4급' : result.score >= 70 ? '5급' : result.score >= 60 ? '6급' : '조금 더 복습해 보세요';
    $('#result').hidden = !attempt.submitted;
    if (!attempt.submitted) return;
    $('#result').innerHTML = `<div class="score-number">${result.score}<small> / 100</small></div><div><span class="eyebrow" style="color:#bed3c0">YOUR RESULT / 제${exam.round}회 · ${mode === 'practice' ? '연습' : '시험'} 모드</span><h2>${level}${result.score >= 60 ? ' 수준의 연습 결과예요.' : ''}</h2><p>정답 ${result.correct} · 오답 ${result.wrong} · 미응답 ${result.unanswered}${expired ? ' · 제한 시간이 끝나 자동 제출되었습니다.' : ''}</p><p>연습 기준: 80점 이상 4급 · 70점 이상 5급 · 60점 이상 6급. 실제 합격·자격을 보장하지 않습니다.</p><a class="button secondary" href="../study/index.html?review=${exam.round}${mode === 'practice' ? '&amp;mode=practice' : ''}">이번 회차의 부족한 개념 복습 →</a></div>`;
  }
  function openExam(round, number, push = false) {
    exam = exams.find(item => item.round === round);
    if (!exam) {
      warn('해당 회차는 수록되어 있지 않습니다. 아래에서 회차를 선택하세요.');
      renderLobby();
      return;
    }
    attempt = readAttempt(round, mode) || freshAttempt();
    if (number !== undefined) attempt.current = number - 1;
    reviewFilter = 'all';
    if (push) syncURL(true);
    renderMode();
    $('#lobby').hidden = true;
    $('#exam').hidden = false;
    $('#exam-title').textContent = `제${exam.round}회 기출 ${mode === 'practice' ? '연습' : '모의고사'}`;
    $('#exam-eyebrow').textContent = `BASIC / ${mode === 'practice' ? '연습 모드 · 시간 제한 없음' : '시험 모드 · 70분'} · 50문항 · 100점 만점`;
    $('#paper-link').href = exam.paper;
    $('#key-link').href = exam.key;
    renderResult();
    renderQuestion();
    updateTimer();
  }
  function submit(expired = false) {
    if (attempt.submitted) return;
    attempt.remaining = remainingTime();
    attempt.deadline = null;
    attempt.submitted = true;
    if ($('#confirm-dialog').open) $('#confirm-dialog').close('cancel');
    pendingAction = '';
    persist();
    renderResult(expired);
    renderQuestion();
    updateTimer();
    $('#result').focus();
    $('#result').scrollIntoView({block:'start'});
  }
  function confirmAction(action) {
    pendingAction = action;
    const restart = action === 'restart';
    const unanswered = attempt.answers.filter(answer => answer === 0).length;
    $('#dialog-title').textContent = restart ? '처음부터 다시 풀까요?' : mode === 'practice' ? '연습을 마칠까요?' : '답안을 제출할까요?';
    $('#dialog-message').textContent = restart ? `이 회차의 ${mode === 'practice' ? '연습' : '시험'} 답안과 채점 결과만 지우고 ${mode === 'practice' ? '시간 제한 없이' : '70분으로'} 다시 시작합니다. 다른 모드와 회차의 기록은 유지됩니다.` : `${unanswered ? `아직 ${unanswered}문항에 답하지 않았습니다. 미응답은 0점으로 처리됩니다. ` : '50문항 모두 답했습니다. '}완료 후에는 답안을 바꿀 수 없으며 전체 결과와 해설을 확인할 수 있습니다.${mode === 'exam' ? ' 확인하는 동안에도 시간은 흐릅니다.' : ''}`;
    $('#dialog-confirm').textContent = restart ? '새로 시작' : mode === 'practice' ? '연습 마치고 채점' : '제출하고 채점';
    $('#confirm-dialog').showModal();
  }
  function route() {
    const params = new URLSearchParams(location.search);
    mode = params.get('mode') === 'practice' ? 'practice' : 'exam';
    if (params.has('mode') && !['practice','exam'].includes(params.get('mode'))) warn('풀이 모드가 올바르지 않아 시험 모드로 엽니다.');
    if (!params.has('round')) return renderLobby();
    const round = Number(params.get('round'));
    const number = params.has('q') ? Number(params.get('q')) : undefined;
    if (number !== undefined && (!Number.isInteger(number) || number < 1 || number > 50)) {
      warn('문항 번호가 올바르지 않아 저장된 위치부터 엽니다.');
      return openExam(round);
    }
    openExam(round, number);
  }
  $('#exam-list').addEventListener('click', event => {
    const button = event.target.closest('[data-round]');
    if (button) openExam(Number(button.dataset.round), undefined, true);
  });
  $('#question-content').addEventListener('change', event => {
    if (event.target.name !== 'answer' || attempt.submitted || (mode === 'exam' && attempt.deadline === null)) return;
    updateTimer();
    if (attempt.submitted) return;
    attempt.answers[attempt.current] = Number(event.target.value);
    persist();
    if (mode === 'practice') {
      const value = event.target.value;
      renderQuestion();
      $(`input[name="answer"][value="${value}"]`).focus({preventScroll:true});
    } else renderSidebar();
  });
  $('#question-content').addEventListener('click', event => {
    if (!event.target.closest('#mark-question')) return;
    const number = attempt.current + 1;
    attempt.marked = attempt.marked.includes(number) ? attempt.marked.filter(item => item !== number) : [...attempt.marked, number];
    renderQuestion();
    $('#mark-question')?.focus({preventScroll:true});
  });
  $('#number-grid').addEventListener('click', event => {
    const button = event.target.closest('[data-number]');
    if (!button) return;
    attempt.current = Number(button.dataset.number) - 1;
    renderQuestion(true);
  });
  for (const [selector, direction] of [['#previous', -1], ['#next', 1]]) {
    $(selector).addEventListener('click', () => {
      const numbers = questionNumbers();
      const position = numbers.indexOf(attempt.current + 1) + direction;
      if (position < 0 || position >= numbers.length) return;
      attempt.current = numbers[position] - 1;
      renderQuestion(true);
    });
  }
  $('#pause').addEventListener('click', () => {
    if (mode !== 'exam') return;
    updateTimer();
    if (attempt.submitted) return;
    if (attempt.deadline === null) attempt.deadline = Date.now() + attempt.remaining * 1000;
    else {
      attempt.remaining = remainingTime();
      attempt.deadline = null;
    }
    renderQuestion();
    updateTimer();
  });
  $('#review-filter').addEventListener('change', event => {
    reviewFilter = event.target.value;
    renderQuestion();
  });
  $('#submit-exam').addEventListener('click', () => confirmAction('submit'));
  $('#restart').addEventListener('click', () => confirmAction('restart'));
  $('#confirm-dialog').addEventListener('close', () => {
    if ($('#confirm-dialog').returnValue !== 'confirm') return;
    if (pendingAction === 'submit') submit();
    else if (pendingAction === 'restart') {
      attempt = freshAttempt();
      reviewFilter = 'all';
      renderResult();
      renderQuestion(true);
      updateTimer();
    }
    pendingAction = '';
  });
  $('#back-lobby').addEventListener('click', event => {
    event.preventDefault();
    history.pushState(null, '', lobbyURL());
    renderLobby();
    window.scrollTo(0, 0);
  });
  $('#mode-switch').addEventListener('click', event => {
    const button = event.target.closest('[data-mode]');
    if (!button || button.dataset.mode === mode) return;
    const active = !$('#exam').hidden;
    if (active) persist();
    mode = button.dataset.mode;
    if (active) openExam(exam.round, attempt.current + 1, true);
    else {
      history.pushState(null, '', lobbyURL());
      renderLobby();
    }
  });
  window.addEventListener('popstate', route);
  setInterval(updateTimer, 1000);
  route();
})();
