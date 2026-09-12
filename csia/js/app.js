/**
 * Main Application Logic for CSIA CBT Exam Web Platform
 * Shared CBT engine for the original and user-provided TomatoPass exams.
 */

document.addEventListener('DOMContentLoaded', () => {
  const originalSections = [
    { name: '1과목: 증권분석 및 증권시장', end: 35 },
    { name: '2과목: 금융상품 및 직무윤리', end: 65 },
    { name: '3과목: 법규 및 세제', end: 100 }
  ];
  const exams = Object.fromEntries([1, 2, 3, 4].map((round) => [String(round), {
    title: `기존 실제유형 제${round}회 모의고사`,
    subtitle: '증권투자권유자문인력 실제유형 모의고사',
    revision: 'source-20260912',
    available: true,
    sections: originalSections,
    questions: window[`EXAM_DATA_ROUND${round}`] || (round === 1 ? window.EXAM_DATA : []) || []
  }]));
  Object.assign(exams, window.TOMATO_EXAMS || {});
  const tomatoCards = document.getElementById('tomatoRoundCards');
  if (tomatoCards) {
    tomatoCards.innerHTML = Object.entries(window.TOMATO_EXAMS || {}).map(([id, exam]) => `
      <article class="round-card">
        <div class="round-card-badge">홀인원 적중모의고사 · 2025년 11월</div>
        <h3 class="round-card-title">${escapeHtml(exam.title)}</h3>
        <p class="round-card-desc">${exam.available ? '텍스트 100문항 · 120분 · 연습/시험 모드' : escapeHtml(exam.reason)}</p>
        <ul class="round-subject-list">${exam.sections.map((s, i) => `<li>${escapeHtml(s.name)} (${s.end - (exam.sections[i - 1]?.end || 0)}문항)</li>`).join('')}</ul>
        ${exam.available ? `<div id="round${id}StatusBox" class="round-status-box"></div>
          <button class="btn btn-primary btn-start-round" data-round="${id}">🚀 응시 / 이어풀기</button>` :
          '<button class="btn btn-outline" disabled>문항지 미제공 · 응시 불가</button>'}
      </article>`).join('') || '<p>홀인원 적중모의고사 데이터를 불러오지 못했습니다. 페이지를 새로고침하세요.</p>';
  }
  // Views
  const roundSelectionView = document.getElementById('roundSelectionView');
  const cbtExamView = document.getElementById('cbtExamView');
  const btnGoHome = document.getElementById('btnGoHome');

  // DOM Header Elements
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeToggleLandingBtn = document.querySelector('.themeToggleLandingBtn');
  const examRoundTitle = document.getElementById('examRoundTitle');
  const examRoundSubtitle = document.getElementById('examRoundSubtitle');
  const modeExamBtn = document.getElementById('modeExamBtn');
  const modePracticeBtn = document.getElementById('modePracticeBtn');
  const timerTextEl = document.getElementById('timerText');
  const timerCardEl = document.querySelector('.timer-card');
  const progressBarFill = document.getElementById('progressBarFill');
  const answeredCountEl = document.getElementById('answeredCount');

  // Question Card Elements
  const qCategoryBadge = document.getElementById('qCategoryBadge');
  const qDifficultyBadge = document.getElementById('qDifficultyBadge');
  const qNumberEl = document.getElementById('qNumber');
  const qTitleEl = document.getElementById('qTitle');
  const qBoxEl = document.getElementById('qBox');
  const qOptionsContainer = document.getElementById('qOptionsContainer');
  const qExplanationCard = document.getElementById('qExplanationCard');
  const qExplanationText = document.getElementById('qExplanationText');
  const qSourceImages = document.createElement('div');
  qTitleEl.after(qSourceImages);
  const qExplanationImages = document.createElement('div');
  qExplanationText.after(qExplanationImages);

  // Navigation Buttons
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const btnBookmark = document.getElementById('btnBookmark');
  const btnViewImage = document.getElementById('btnViewImage');
  const btnSubmit = document.getElementById('btnSubmit');
  const btnReset = document.getElementById('btnReset');

  // Modals
  const imageModal = document.getElementById('imageModal');
  const modalPageImage = document.getElementById('modalPageImage');
  const modalPageTitle = document.getElementById('modalPageTitle');
  const closeImageModal = document.getElementById('closeImageModal');

  const resultModal = document.getElementById('resultModal');
  const closeResultModal = document.getElementById('closeResultModal');
  const resultStatusBadge = document.getElementById('resultStatusBadge');
  const resultScoreDisplay = document.getElementById('resultScoreDisplay');
  const resultSectionBody = document.getElementById('resultSectionBody');
  const btnReviewWrong = document.getElementById('btnReviewWrong');
  const btnRestart = document.getElementById('btnRestart');

  // OMR Elements
  const omrContainer = document.getElementById('omrContainer');
  const omrTabs = document.querySelectorAll('.omr-tab');

  // App State
  let currentRoundId = '1';
  let examQuestions = [];
  let totalQuestions = 100;
  let currentExamMode = 'exam'; // 'exam' or 'practice'
  let currentQuestionId = 1;
  let userAnswers = {};
  let bookmarks = new Set();
  let isSubmitted = false;

  // Global Timer instance
  const timer = new window.ExamTimer({
    totalMinutes: 120,
    onTick: (formattedTime, isWarning) => {
      if (timerTextEl) timerTextEl.textContent = formattedTime;
      if (timerCardEl) {
        if (isWarning) timerCardEl.classList.add('warning');
        else timerCardEl.classList.remove('warning');
      }
      if (timer.isRunning) saveSession();
    },
    onExpire: () => {
      alert('⏰ 제한시간(120분)이 종료되어 답안이 자동 제출됩니다.');
      submitExam();
    }
  });

  // OMR Card instance
  let omrCard = new window.OMRCard({
    containerEl: omrContainer,
    totalQuestions: totalQuestions,
    onSelectQuestion: (qId) => goToQuestion(qId)
  });

  // Dark/Light Theme Toggle
  const savedTheme = localStorage.getItem('cbt_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  if (themeToggleLandingBtn) {
    themeToggleLandingBtn.addEventListener('click', toggleTheme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('cbt_theme', newTheme);
    updateThemeIcons(newTheme);
  }

  function updateThemeIcons(theme) {
    const icon = theme === 'dark' ? '☀️' : '🌙';
    if (themeToggleBtn) themeToggleBtn.textContent = icon;
    if (themeToggleLandingBtn) themeToggleLandingBtn.textContent = icon;
  }

  // Keep choices from the old, mismatched question data separate without deleting them.
  function examStorageKey(field, roundId = currentRoundId) {
    const revision = exams[String(roundId)].revision;
    return `cbt_${field}_r${roundId}${revision ? `_${revision}` : ''}`;
  }

  // Safe LocalStorage JSON parser
  function getSafeLocalStorageJSON(key, defaultValue = {}) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn(`Failed to parse localStorage key "${key}":`, e);
      return defaultValue;
    }
  }

  // Render Landing Page Status Cards
  function updateLandingStatuses() {
    Object.keys(exams).forEach((r) => {
      const answersKey = examStorageKey('answers', r);
      const submittedKey = examStorageKey('submitted', r);
      const scoreKey = examStorageKey('score', r);
      const passKey = examStorageKey('pass', r);

      const savedAns = getSafeLocalStorageJSON(answersKey, {});
      const ansCount = Object.keys(savedAns).length;
      const isSub = localStorage.getItem(submittedKey) === 'true';
      const score = localStorage.getItem(scoreKey);
      const isPass = localStorage.getItem(passKey) === 'true';

      const targetBox = document.getElementById(`round${r}StatusBox`);

      if (!targetBox) return;

      if (isSub && score !== null) {
        targetBox.className = `round-status-box ${isPass ? 'status-completed-pass' : 'status-completed-fail'}`;
        targetBox.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; width: 100%;">
            <span>최종 결과: <strong>${score}점</strong> (${isPass ? '🎉 합격' : '불합격'})</span>
            <button class="btn btn-outline btn-sm btn-dl-pdf-landing" data-round="${r}" style="padding: 2px 8px; font-size: 0.78rem; font-weight: 700;">📄 오답 PDF</button>
          </div>
        `;
      } else if (ansCount > 0) {
        targetBox.className = 'round-status-box status-in-progress';
        targetBox.innerHTML = `<span>진행 중 (${ansCount} / 100문항 작성)</span>`;
      } else {
        targetBox.className = 'round-status-box';
        targetBox.innerHTML = '<span>진행 상태: 미응시</span>';
      }
    });
  }

  updateLandingStatuses();

  // Unified Event Delegation for Landing Page Buttons (Start Round & PDF Download)
  document.addEventListener('click', (e) => {
    const startBtn = e.target.closest('.btn-start-round');
    if (startBtn) {
      e.preventDefault();
      const rId = startBtn.dataset.round || '1';
      startExamRound(rId);
      return;
    }
  });

  function startExamRound(roundId) {
    const exam = exams[String(roundId)];
    if (!exam?.available || !exam.questions?.length) {
      alert('문항지를 제공하지 않았거나 문제 데이터를 불러올 수 없습니다.');
      return;
    }
    if (!cbtExamView.classList.contains('view-hidden')) saveSession();
    timer.pause();
    currentRoundId = String(roundId);
    examQuestions = exam.questions;
    totalQuestions = examQuestions.length;

    // Load LocalStorage per Round safely
    userAnswers = getSafeLocalStorageJSON(examStorageKey('answers'), {});
    const savedBookmarks = getSafeLocalStorageJSON(examStorageKey('bookmarks'), []);
    bookmarks = new Set(Array.isArray(savedBookmarks) ? savedBookmarks : []);
    isSubmitted = localStorage.getItem(examStorageKey('submitted')) === 'true';

    // Update Header Text
    if (examRoundTitle) examRoundTitle.textContent = exam.title;
    if (examRoundSubtitle) examRoundSubtitle.textContent = `${exam.subtitle} (${totalQuestions}문항 / 120분)`;
    document.title = `${exam.title} · CBT`;
    omrTabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.filter === 'all'));

    // Re-init OMR Card
    if (omrContainer) {
      omrCard = new window.OMRCard({
        containerEl: omrContainer,
        totalQuestions: totalQuestions,
        onSelectQuestion: (qId) => goToQuestion(qId)
      });
      omrCard.setAnswers(userAnswers);
      omrCard.setBookmarks(Array.from(bookmarks));
    }

    // Reset view state
    const session = getSafeLocalStorageJSON(examStorageKey('session'), {});
    currentQuestionId = Math.max(1, Math.min(totalQuestions, Number(session.question) || 1));
    timer.reset(120);
    timer.remainingSeconds = Math.max(0, Math.min(7200, Number.isFinite(session.remaining) ? session.remaining : 7200));
    timer.elapsedSeconds = Math.max(0, Number(session.elapsed) || 0);
    setMode(session.mode === 'practice' ? 'practice' : 'exam');

    // Switch Views
    if (roundSelectionView) roundSelectionView.classList.add('view-hidden');
    if (cbtExamView) cbtExamView.classList.remove('view-hidden');
    window.scrollTo(0, 0);

    // Timer setup
    if (timer) {
      if (!isSubmitted) {
        if (timer.remainingSeconds === 0 && currentExamMode === 'exam') submitExam();
        else timer.start();
      } else {
        timer.pause();
      }
    }

    renderCurrentQuestion();
  }

  // Go Back to Selection View
  btnGoHome.addEventListener('click', () => {
    saveSession();
    timer.pause();
    cbtExamView.classList.add('view-hidden');
    roundSelectionView.classList.remove('view-hidden');
    updateLandingStatuses();
    document.title = '증권투자권유자문인력 실제유형 모의고사 CBT';
  });

  function saveSession() {
    if (!examQuestions.length) return;
    localStorage.setItem(examStorageKey('session'), JSON.stringify({
      question: currentQuestionId, mode: currentExamMode,
      remaining: timer.remainingSeconds, elapsed: timer.elapsedSeconds
    }));
  }
  window.addEventListener('pagehide', () => {
    if (!cbtExamView.classList.contains('view-hidden')) saveSession();
  });

  // Mode Switcher
  modeExamBtn.addEventListener('click', () => setMode('exam'));
  modePracticeBtn.addEventListener('click', () => setMode('practice'));

  function setMode(mode) {
    currentExamMode = mode;
    if (mode === 'exam') {
      modeExamBtn.classList.add('active');
      modePracticeBtn.classList.remove('active');
    } else {
      modePracticeBtn.classList.add('active');
      modeExamBtn.classList.remove('active');
    }
    timer.setMode(mode);
    saveSession();
    renderCurrentQuestion();
  }

  function sourceImages(paths, label) {
    return (paths || []).map((path, index) =>
      `<a class="source-image-link" href="${escapeHtml(path)}" target="_blank" rel="noopener" title="원문 이미지 크게 보기">
        <img class="source-exam-image" src="${escapeHtml(path)}" loading="lazy" alt="${escapeHtml(label)}${index ? ` (계속 ${index + 1})` : ''}">
      </a>`
    ).join('');
  }

  function sourceReference(paths, label) {
    if (!paths?.length) return '';
    return `<details class="source-reference"><summary>${escapeHtml(label)} 확인</summary>${sourceImages(paths, label)}</details>`;
  }

  function questionTables(tables) {
    return (tables || []).map(table => `
      <div class="question-table-wrap" role="region" aria-label="${escapeHtml(table.caption || '자료 표')}" tabindex="0">
        <table class="question-table">
          ${table.caption ? `<caption>${escapeHtml(table.caption)}</caption>` : ''}
          <thead><tr>${table.headers.map(header => `<th scope="col">${escapeHtml(header)}</th>`).join('')}</tr></thead>
          <tbody>${table.rows.map(row => `<tr>${row.map((cell, index) => {
            const tag = index === 0 ? 'th' : 'td';
            const numeric = /^[+-]?\d[\d,.%]*$/.test(cell);
            return `<${tag}${index === 0 ? ' scope="row"' : ''} class="${numeric ? 'numeric-cell' : ''}">${escapeHtml(cell)}</${tag}>`;
          }).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>`.trim()).join('');
  }

  function questionConditions(q) {
    return (q.box ? `<div class="condition-text">${escapeHtml(q.box)}</div>` : '') + questionTables(q.tables);
  }

  function explanationSources(q) {
    return q.textReady
      ? sourceReference(q.explanationImages, `${q.id}번 정답·해설 원문`)
      : sourceImages(q.explanationImages, `${q.id}번 정답·해설 원문`);
  }

  function detailedExplanation(q) {
    return `
      <details class="explanation-section answer-reason" open>
        <summary>정답 해설 <span class="explanation-answer">정답 ${q.correctAnswer}번</span></summary>
        <div class="explanation-section-body">${escapeHtml(q.explanation || '해설이 제공됩니다.')}${questionTables(q.explanationTables)}</div>
      </details>
      ${q.optionConcepts ? `
        <details class="explanation-section option-concepts" open>
          <summary>보기별 개념 정리 <span class="explanation-count">${q.optionConcepts.length}개 보기</span></summary>
          <div class="explanation-section-body">
            <p class="concept-reading-note">‘정답 보기’는 채점 기준입니다. ‘옳지 않은 것’을 묻는 문제에서는 다른 보기가 옳은 설명일 수 있습니다.</p>
            <ol class="option-concept-list">
              ${q.optionConcepts.map((concept, index) => `
                <li class="option-concept">
                  <div class="option-concept-heading">
                    <span class="concept-number">${index + 1}</span>
                    <h4>${escapeHtml(concept.title)}</h4>
                    ${index + 1 === q.correctAnswer ? '<span class="concept-answer-tag">정답 보기</span>' : ''}
                  </div>
                  <p>${escapeHtml(concept.explanation)}</p>
                </li>`).join('')}
            </ol>
          </div>
        </details>` : ''}
      ${q.answerNote ? `
        <details class="explanation-section source-caution" open>
          <summary>원문·정답 확인 메모</summary>
          <div class="explanation-section-body">${escapeHtml(q.answerNote)}</div>
        </details>` : ''}`;
  }

  // OMR Tabs Handler
  omrTabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      omrTabs.forEach((t) => t.classList.remove('active'));
      e.target.classList.add('active');
      const filter = e.target.dataset.filter;
      omrCard.setFilter(filter);
    });
  });

  // Render Question
  function renderCurrentQuestion() {
    const q = examQuestions.find((item) => item.id === currentQuestionId);
    if (!q) return;

    // Update Category Badge
    let catClass = 'badge-cat-1';
    if (q.category.includes('2과목')) catClass = 'badge-cat-2';
    if (q.category.includes('3과목')) catClass = 'badge-cat-3';

    qCategoryBadge.className = `badge ${catClass}`;
    qCategoryBadge.textContent = q.category;

    // Update Difficulty Badge
    const stars = '★'.repeat(q.difficulty || 1);
    qDifficultyBadge.textContent = `난이도 ${stars}`;
    qDifficultyBadge.hidden = !q.difficulty;

    // Update Number & Title
    qNumberEl.textContent = `문제 ${String(q.id).padStart(2, '0')} / ${totalQuestions}`;
    const imageQuestion = q.questionImages && !q.textReady;
    qTitleEl.textContent = imageQuestion ? `${q.id}. 원문 문항·보기 (이미지를 누르면 확대)` : `${q.id}. ${q.question}`;
    if (q.textReady) {
      qOptionsContainer.after(qSourceImages);
      qSourceImages.innerHTML = sourceReference(q.questionImages, `${q.id}번 문제·보기 원문`);
    } else {
      qTitleEl.after(qSourceImages);
      qSourceImages.innerHTML = (imageQuestion ? `<p class="source-exam-note">${escapeHtml(exams[currentRoundId].subtitle)} · 원문 기준</p>` : '') +
        sourceImages(q.questionImages, q.sourceText || `${exams[currentRoundId].title} ${q.id}번 문항과 네 개 보기`);
    }

    // Update Condition Box
    if (q.box || q.tables?.length) {
      qBoxEl.style.display = 'block';
      qBoxEl.innerHTML = questionConditions(q);
    } else {
      qBoxEl.style.display = 'none';
    }

    // Update Bookmark Button
    const isBookmarked = bookmarks.has(currentQuestionId);
    if (isBookmarked) {
      btnBookmark.classList.add('active');
      btnBookmark.textContent = '★ 찜해둠';
    } else {
      btnBookmark.classList.remove('active');
      btnBookmark.textContent = '☆ 찜하기';
    }

    // Render Options
    qOptionsContainer.innerHTML = '';
    const selectedAns = userAnswers[currentQuestionId];

    q.options.forEach((optText, idx) => {
      const optNum = idx + 1;
      const optItem = document.createElement('div');
      optItem.className = 'option-item';
      optItem.setAttribute('role', 'button');
      optItem.tabIndex = isSubmitted ? -1 : 0;
      optItem.setAttribute('aria-pressed', String(selectedAns === optNum));

      if (selectedAns === optNum) {
        optItem.classList.add('selected');
      }

      // Practice mode or post-submission highlight
      if ((currentExamMode === 'practice' && selectedAns !== undefined) || isSubmitted) {
        if (optNum === q.correctAnswer) {
          optItem.classList.add('correct-highlight');
        } else if (selectedAns === optNum && selectedAns !== q.correctAnswer) {
          optItem.classList.add('wrong-highlight');
        }
      }

      const idxDiv = document.createElement('div');
      idxDiv.className = 'option-idx';
      idxDiv.textContent = optNum;

      const textDiv = document.createElement('div');
      textDiv.className = 'option-text';
      textDiv.textContent = optText;

      optItem.appendChild(idxDiv);
      optItem.appendChild(textDiv);

      optItem.addEventListener('click', () => {
        if (isSubmitted) return; // Locked if submitted
        selectOption(currentQuestionId, optNum);
      });
      optItem.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          optItem.click();
        }
      });

      qOptionsContainer.appendChild(optItem);
    });

    // Explanation Visibility
    if ((currentExamMode === 'practice' && selectedAns !== undefined) || isSubmitted) {
      qExplanationCard.style.display = 'block';
      qExplanationText.innerHTML = detailedExplanation(q);
      qExplanationImages.innerHTML = explanationSources(q);
    } else {
      qExplanationCard.style.display = 'none';
      qExplanationImages.innerHTML = '';
    }

    // Navigation Buttons State
    btnPrev.disabled = currentQuestionId === 1;
    btnNext.disabled = currentQuestionId === totalQuestions;

    // Sync OMR Card
    omrCard.setActiveQuestion(currentQuestionId);
    updateProgress();
    saveSession();
  }

  // Select Option Handler
  function selectOption(qId, optNum) {
    if (userAnswers[qId] === optNum) {
      delete userAnswers[qId];
    } else {
      userAnswers[qId] = optNum;
    }

    // Save State per round
    localStorage.setItem(examStorageKey('answers'), JSON.stringify(userAnswers));
    omrCard.setAnswers(userAnswers);
    renderCurrentQuestion();
  }

  // Navigation Listeners
  function goToQuestion(qId) {
    currentQuestionId = qId;
    renderCurrentQuestion();
    document.querySelector('.question-card').scrollIntoView({ block: 'start' });
  }

  btnPrev.addEventListener('click', () => {
    if (currentQuestionId > 1) {
      goToQuestion(currentQuestionId - 1);
    }
  });

  btnNext.addEventListener('click', () => {
    if (currentQuestionId < totalQuestions) {
      goToQuestion(currentQuestionId + 1);
    }
  });

  // Bookmark Toggle
  btnBookmark.addEventListener('click', () => {
    if (bookmarks.has(currentQuestionId)) {
      bookmarks.delete(currentQuestionId);
    } else {
      bookmarks.add(currentQuestionId);
    }
    localStorage.setItem(examStorageKey('bookmarks'), JSON.stringify(Array.from(bookmarks)));
    omrCard.setBookmarks(Array.from(bookmarks));
    renderCurrentQuestion();
  });

  // Original Page Image Viewer
  btnViewImage.addEventListener('click', () => {
    const q = examQuestions.find((item) => item.id === currentQuestionId);
    if (!q) return;

    modalPageImage.src = q.pageImage.includes('/') ? q.pageImage : `assets/images/${currentRoundId}/${q.pageImage}`;
    modalPageTitle.textContent = `${exams[currentRoundId].title} 원본 시험지 - 문제 ${q.id}번`;
    imageModal.classList.add('open');
  });

  closeImageModal.addEventListener('click', () => imageModal.classList.remove('open'));
  imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) imageModal.classList.remove('open');
  });

  // Update Progress Bar
  function updateProgress() {
    const answeredCount = omrCard.getAnsweredCount();
    const percent = Math.round((answeredCount / totalQuestions) * 100);

    if (answeredCountEl) answeredCountEl.textContent = answeredCount;
    if (progressBarFill) progressBarFill.style.width = `${percent}%`;
  }

  // Reset Exam Progress
  btnReset.addEventListener('click', () => {
    if (confirm(`${exams[currentRoundId].title}의 모든 답안과 진행 상황을 초기화하시겠습니까?`)) {
      userAnswers = {};
      bookmarks.clear();
      isSubmitted = false;
      localStorage.removeItem(examStorageKey('answers'));
      localStorage.removeItem(examStorageKey('bookmarks'));
      localStorage.removeItem(examStorageKey('submitted'));
      localStorage.removeItem(examStorageKey('score'));
      localStorage.removeItem(examStorageKey('pass'));
      localStorage.removeItem(examStorageKey('session'));

      omrCard.setAnswers(userAnswers);
      omrCard.setBookmarks([]);
      timer.reset(120);
      timer.start();
      currentQuestionId = 1;
      renderCurrentQuestion();
    }
  });

  // Submit Exam Handler
  btnSubmit.addEventListener('click', () => {
    const answeredCount = omrCard.getAnsweredCount();
    const unansweredCount = totalQuestions - answeredCount;

    let msg = `${exams[currentRoundId].title} 총 ${totalQuestions}문항 중 ${answeredCount}문항에 답안을 작성하셨습니다.`;
    if (unansweredCount > 0) {
      msg += `\n⚠️ 미작성된 문제: ${unansweredCount}개`;
    }
    msg += `\n\n최종 제출하여 채점하시겠습니까?`;

    if (confirm(msg)) {
      submitExam();
    }
  });

  function submitExam() {
    isSubmitted = true;
    timer.pause();
    resultModal.querySelector('.modal-title').textContent = `${exams[currentRoundId].title} 최종 성적표`;

    localStorage.setItem(examStorageKey('submitted'), 'true');

    // Calculate Scores
    const totalCorrect = examQuestions.filter((q) => userAnswers[q.id] === q.correctAnswer).length;
    const sections = exams[currentRoundId].sections.map((section, index, all) => {
      const questions = examQuestions.filter((q) => q.id > (all[index - 1]?.end || 0) && q.id <= section.end);
      const correct = questions.filter((q) => userAnswers[q.id] === q.correctAnswer).length;
      return { name: section.name, total: questions.length, correct, rate: correct / questions.length * 100 };
    });
    const score = Math.round((totalCorrect / totalQuestions) * 100);

    // Pass / Fail Judgment: Total >= 60 AND no section < 40%
    const hasFailSection = sections.some((section) => section.rate < 40);
    const isPassed = score >= 60 && !hasFailSection;

    // Save score status per round
    localStorage.setItem(examStorageKey('score'), score);
    localStorage.setItem(examStorageKey('pass'), isPassed ? 'true' : 'false');

    // Display Status Badge
    if (isPassed) {
      resultStatusBadge.className = 'result-status-badge status-pass';
      resultStatusBadge.textContent = '🎉 합격 (PASS)';
    } else {
      resultStatusBadge.className = 'result-status-badge status-fail';
      let failReason = '불합격 (FAIL)';
      if (score >= 60 && hasFailSection) failReason += ' - 과락 발생 (단일 과목 40% 미만)';
      resultStatusBadge.textContent = failReason;
    }

    resultScoreDisplay.innerHTML = `${score}<span> / 100점</span>`;

    // Render Section Breakdown
    resultSectionBody.innerHTML = sections.map((section) => `
      <tr>
        <td>${escapeHtml(section.name)} (${section.total}문항)</td>
        <td>${section.correct} / ${section.total}개</td>
        <td>${Math.round(section.rate)}%</td>
        <td class="${section.rate >= 40 ? 'section-pass' : 'section-fail'}">${section.rate >= 40 ? '통과' : '과락'}</td>
      </tr>`).join('');

    resultModal.classList.add('open');
    renderCurrentQuestion();
  }

  closeResultModal.addEventListener('click', () => resultModal.classList.remove('open'));
  resultModal.addEventListener('click', (e) => {
    if (e.target === resultModal) resultModal.classList.remove('open');
  });

  btnReviewWrong.addEventListener('click', () => {
    resultModal.classList.remove('open');
    const wrongQ = examQuestions.find((q) => userAnswers[q.id] !== q.correctAnswer);
    if (wrongQ) {
      goToQuestion(wrongQ.id);
    }
  });

  btnRestart.addEventListener('click', () => {
    resultModal.classList.remove('open');
    btnReset.click();
  });

  // Wrong Answer Note Modal Elements
  const wrongAnswerModal = document.getElementById('wrongAnswerModal');
  const wrongModalTitle = document.getElementById('wrongModalTitle');
  const wrongModalSubtitle = document.getElementById('wrongModalSubtitle');
  const wrongFilterTabs = document.getElementById('wrongFilterTabs');
  const wrongStatsText = document.getElementById('wrongStatsText');
  const wrongQuestionsListContainer = document.getElementById('wrongQuestionsListContainer');
  const btnWrongModalPrint = document.getElementById('btnWrongModalPrint');
  const btnWrongModalDownload = document.getElementById('btnWrongModalDownload');
  const closeWrongModal = document.getElementById('closeWrongModal');

  let activeWrongFilter = 'ALL';
  let currentWrongModalRoundId = '1';
  let currentWrongModalQuestions = [];
  let currentWrongModalAnswers = {};

  // PDF / Wrong Answer Note Listener for Result Modal Button
  const btnExportWrongPdf = document.getElementById('btnExportWrongPdf');
  if (btnExportWrongPdf) {
    btnExportWrongPdf.addEventListener('click', () => {
      openWrongAnswerModal(currentRoundId, examQuestions, userAnswers);
    });
  }

  // Handle PDF Export / Wrong Note from landing page status cards
  if (roundSelectionView) {
    roundSelectionView.addEventListener('click', (e) => {
      const pdfBtn = e.target.closest('.btn-dl-pdf-landing');
      if (!pdfBtn) return;
      e.stopPropagation();
      const rId = pdfBtn.dataset.round;
      const questions = exams[rId]?.questions || [];
      const savedAns = getSafeLocalStorageJSON(examStorageKey('answers', rId), {});
      openWrongAnswerModal(rId, questions, savedAns);
    });
  }

  // Close Wrong Answer Modal
  if (closeWrongModal) {
    closeWrongModal.addEventListener('click', () => {
      if (wrongAnswerModal) wrongAnswerModal.classList.remove('open');
    });
  }

  if (wrongAnswerModal) {
    wrongAnswerModal.addEventListener('click', (e) => {
      if (e.target === wrongAnswerModal) {
        wrongAnswerModal.classList.remove('open');
      }
    });
  }

  // Print Button Handler (Native High-Res Vector PDF Print)
  if (btnWrongModalPrint) {
    btnWrongModalPrint.addEventListener('click', printWrongAnswers);
  }

  let collapsedPrintSections = [];
  window.addEventListener('beforeprint', () => {
    collapsedPrintSections = Array.from(wrongQuestionsListContainer.querySelectorAll('.explanation-section:not([open])'));
    collapsedPrintSections.forEach(section => { section.open = true; });
  });
  window.addEventListener('afterprint', () => {
    collapsedPrintSections.forEach(section => { section.open = false; });
    collapsedPrintSections = [];
  });

  async function printWrongAnswers() {
    try {
      const images = Array.from(wrongQuestionsListContainer.querySelectorAll('img'))
        .filter(image => !image.closest('.source-reference'));
      await Promise.all(images.map(image => image.decode()));
      window.print();
    } catch {
      alert('원문 이미지를 불러오지 못했습니다. 연결을 확인한 뒤 다시 인쇄하세요.');
    }
  }

  // Download PDF Handler (html2pdf with fallback to native print)
  if (btnWrongModalDownload) {
    btnWrongModalDownload.addEventListener('click', () => {
      downloadWrongModalAsPdf();
    });
  }

  function downloadWrongModalAsPdf() {
    const container = document.getElementById('wrongQuestionsListContainer');
    if (!container) return;

    // Long concept explanations and images can exceed the single-canvas size limit.
    // Native print supports multi-page output and Save as PDF without rasterizing it all.
    if (!window.html2pdf || currentWrongModalQuestions.some((q) => q.questionImages || q.optionConcepts)) {
      printWrongAnswers();
      return;
    }

    const origText = btnWrongModalDownload.innerHTML;
    btnWrongModalDownload.textContent = '⏳ PDF 생성 중...';

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `${exams[currentWrongModalRoundId].title}_오답분석노트.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1.5, useCORS: true, scrollY: 0, scrollX: 0, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    window.html2pdf().set(opt).from(container).save().then(() => {
      btnWrongModalDownload.innerHTML = origText;
    }).catch((err) => {
      console.warn('html2pdf error, fallback to print:', err);
      btnWrongModalDownload.innerHTML = origText;
      window.print();
    });
  }

  function openWrongAnswerModal(roundId, questions, answers) {
    if (!questions || questions.length === 0) {
      alert('모의고사 문제 데이터를 불러올 수 없습니다.');
      return;
    }

    currentWrongModalRoundId = String(roundId);
    currentWrongModalQuestions = questions;
    currentWrongModalAnswers = answers || {};
    if (btnWrongModalDownload) {
      btnWrongModalDownload.textContent = questions.some((q) => q.questionImages || q.optionConcepts) ? '📥 PDF 저장 (인쇄창)' : '📥 PDF 다운로드';
    }

    const answeredWrongList = [];
    const unansweredList = [];

    questions.forEach((q) => {
      const rawAns = answers[q.id] !== undefined ? answers[q.id] : answers[String(q.id)];
      const hasAns = rawAns !== undefined && rawAns !== null && rawAns !== '';
      if (!hasAns) {
        unansweredList.push(q);
      } else if (Number(rawAns) !== Number(q.correctAnswer)) {
        answeredWrongList.push(q);
      }
    });

    const totalReviewCount = answeredWrongList.length + unansweredList.length;
    if (totalReviewCount === 0) {
      alert('🎉 100점 만점으로 모든 문제를 맞히셨습니다! (오답 및 미응답 문항 없음)');
      return;
    }

    activeWrongFilter = 'ALL';
    renderWrongModalContent();
    if (wrongAnswerModal) wrongAnswerModal.classList.add('open');
  }

  function renderWrongModalContent() {
    const questions = currentWrongModalQuestions;
    const answers = currentWrongModalAnswers;
    const roundId = currentWrongModalRoundId;

    const answeredWrongList = [];
    const unansweredList = [];

    questions.forEach((q) => {
      const rawAns = answers[q.id] !== undefined ? answers[q.id] : answers[String(q.id)];
      const hasAns = rawAns !== undefined && rawAns !== null && rawAns !== '';
      if (!hasAns) {
        unansweredList.push(q);
      } else if (Number(rawAns) !== Number(q.correctAnswer)) {
        answeredWrongList.push(q);
      }
    });

    const totalReviewList = [...answeredWrongList, ...unansweredList].sort((a, b) => a.id - b.id);
    const correctCount = questions.length - totalReviewList.length;
    const score = Math.round((correctCount / questions.length) * 100);

    if (wrongModalTitle) {
      wrongModalTitle.textContent = `${exams[roundId].title} 오답 분석 노트`;
    }
    if (wrongModalSubtitle) {
      wrongModalSubtitle.textContent = `${exams[roundId].subtitle} · 시험 성적: ${score}점 / 100점 · 전체 ${questions.length}문항 중 정답 ${correctCount}개 · 합격 여부는 과목별 과락을 포함한 채점 결과를 확인하세요.`;
    }

    if (wrongStatsText) {
      wrongStatsText.innerHTML = `
        <span>오답: <strong style="color: #dc2626;">${answeredWrongList.length}개</strong></span> &nbsp;|&nbsp;
        <span>미응답: <strong style="color: #d97706;">${unansweredList.length}개</strong></span> &nbsp;|&nbsp;
        <span>복습 대상: <strong>${totalReviewList.length}문항</strong></span>
      `;
    }

    // Render Filter Tabs
    if (wrongFilterTabs) {
      wrongFilterTabs.innerHTML = `
        <button class="wrong-filter-btn ${activeWrongFilter === 'ALL' ? 'active' : ''}" data-filter="ALL">전체 보기 (${totalReviewList.length})</button>
        <button class="wrong-filter-btn ${activeWrongFilter === 'WRONG' ? 'active' : ''}" data-filter="WRONG">오답만 (${answeredWrongList.length})</button>
        <button class="wrong-filter-btn ${activeWrongFilter === 'UNANSWERED' ? 'active' : ''}" data-filter="UNANSWERED">미응답만 (${unansweredList.length})</button>
      `;

      wrongFilterTabs.querySelectorAll('.wrong-filter-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          activeWrongFilter = btn.dataset.filter;
          renderWrongModalContent();
        });
      });
    }

    // Filter displayed questions
    let displayList = totalReviewList;
    if (activeWrongFilter === 'WRONG') displayList = answeredWrongList;
    else if (activeWrongFilter === 'UNANSWERED') displayList = unansweredList;

    if (!wrongQuestionsListContainer) return;

    if (displayList.length === 0) {
      wrongQuestionsListContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-secondary);">
          <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">🎉</div>
          <p style="font-weight: 700; font-size: 1.05rem;">해당 항목에 문제(오답/미응답)가 없습니다.</p>
        </div>
      `;
      return;
    }

    wrongQuestionsListContainer.innerHTML = displayList.map((q) => {
      const rawAns = answers[q.id] !== undefined ? answers[q.id] : answers[String(q.id)];
      const hasAns = rawAns !== undefined && rawAns !== null && rawAns !== '';
      const userChoice = hasAns ? Number(rawAns) : undefined;
      const correctChoice = Number(q.correctAnswer);
      const isUnanswered = userChoice === undefined || isNaN(userChoice);
      const stars = '★'.repeat(q.difficulty || 1);

      return `
        <div class="wrong-q-card" style="border: 1px solid var(--border-color); border-radius: 10px; padding: 1.25rem; background: var(--bg-card); margin-bottom: 1.25rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05); page-break-inside: avoid;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.85rem; padding-bottom: 0.65rem; border-bottom: 1px solid var(--border-color); flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="background: #2563eb; color: #ffffff; font-size: 0.72rem; font-weight: 800; padding: 3px 10px; border-radius: 12px;">
                ${escapeHtml(q.category || '과목')}
              </span>
              <span style="background: var(--bg-surface); color: var(--text-secondary); font-size: 0.72rem; font-weight: 700; padding: 3px 8px; border-radius: 12px; border: 1px solid var(--border-color);">
                ${q.difficulty ? `난이도 ${stars}` : '원문 문항'}
              </span>
              <span style="font-size: 0.95rem; font-weight: 800; color: var(--text-primary); margin-left: 4px;">
                문제 ${q.id}번 / ${questions.length}
              </span>
            </div>
            <div>
              <span style="font-size: 0.8rem; font-weight: 800; padding: 3px 10px; border-radius: 6px; ${isUnanswered ? 'background: #fef3c7; color: #b45309; border: 1px solid #fde68a;' : 'background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5;'}">
                ${isUnanswered ? '⚠️ 미응답 (정답: ' + correctChoice + '번)' : '❌ 오답 (선택: ' + userChoice + '번 / 정답: ' + correctChoice + '번)'}
              </span>
            </div>
          </div>

          <div style="font-size: 1.02rem; font-weight: 700; color: var(--text-primary); line-height: 1.55; margin-bottom: 0.85rem; white-space: pre-wrap; word-break: break-word;">
            ${q.id}. ${escapeHtml(q.question)}
          </div>
          ${q.textReady ? '' : sourceImages(q.questionImages, `${q.id}번 문항과 보기`)}

          ${q.box || q.tables?.length ? `
            <div style="background: var(--bg-surface); border-left: 4px solid #3b82f6; border-top: 1px solid var(--border-color); border-right: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); padding: 0.85rem 1rem; font-size: 0.9rem; color: var(--text-primary); line-height: 1.6; margin-bottom: 1rem; border-radius: 0 8px 8px 0; white-space: pre-wrap; word-break: break-word;">
              ${questionConditions(q)}
            </div>
          ` : ''}

          <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 1rem;">
            ${q.options.map((optText, optIdx) => {
              const optNum = optIdx + 1;
              const isCorrectOpt = optNum === correctChoice;
              const isUserOpt = optNum === userChoice;

              let cardBg = 'var(--bg-card)';
              let cardBorder = 'var(--border-color)';
              let idxBg = 'var(--bg-surface)';
              let idxColor = 'var(--text-secondary)';
              let idxBorder = 'var(--border-color)';
              let textColor = 'var(--text-primary)';
              let statusBadge = '';

              if (isCorrectOpt) {
                cardBg = '#ecfdf5';
                cardBorder = '#10b981';
                idxBg = '#10b981';
                idxColor = '#ffffff';
                idxBorder = '#10b981';
                textColor = '#047857';
                statusBadge = '<span style="font-size: 0.75rem; font-weight: 800; color: #059669; background: #d1fae5; padding: 2px 8px; border-radius: 4px;">⭕ 정답</span>';
              } else if (isUserOpt) {
                cardBg = '#fef2f2';
                cardBorder = '#ef4444';
                idxBg = '#ef4444';
                idxColor = '#ffffff';
                idxBorder = '#ef4444';
                textColor = '#b91c1c';
                statusBadge = '<span style="font-size: 0.75rem; font-weight: 800; color: #dc2626; background: #fee2e2; padding: 2px 8px; border-radius: 4px;">❌ 내 선택</span>';
              }

              return `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border: 1.5px solid ${cardBorder}; border-radius: 8px; background: ${cardBg}; color: ${textColor};">
                  <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
                    <div style="width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid ${idxBorder}; background: ${idxBg}; color: ${idxColor}; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; flex-shrink: 0;">
                      ${optNum}
                    </div>
                    <span style="font-weight: 500; line-height: 1.45; font-size: 0.92rem;">${escapeHtml(optText)}</span>
                  </div>
                  ${statusBadge}
                </div>
              `;
            }).join('')}
          </div>

          ${q.textReady ? sourceReference(q.questionImages, `${q.id}번 문제·보기 원문`) : ''}
          <div class="explanation-body">
            ${detailedExplanation(q)}
            ${explanationSources(q)}
          </div>

        </div>
      `;
    }).join('');
  }

  function escapeHtml(text) {
    if (!text) return '';
    return String(text).replace(/[&<>"']/g, function(m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
  }

  // Keyboard Shortcuts (Arrow Left/Right, 1-4 option select)
  document.addEventListener('keydown', (e) => {
    if (cbtExamView.classList.contains('view-hidden')) return;
    if (imageModal.classList.contains('open') || resultModal.classList.contains('open') || wrongAnswerModal?.classList.contains('open')) return;
    if (e.target.closest('.question-table-wrap')) return;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (currentQuestionId > 1) {
        goToQuestion(currentQuestionId - 1);
      }
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (currentQuestionId < totalQuestions) {
        goToQuestion(currentQuestionId + 1);
      }
    } else if (['1', '2', '3', '4'].includes(e.key)) {
      if (!isSubmitted) {
        selectOption(currentQuestionId, parseInt(e.key, 10));
      }
    }
  });
});
