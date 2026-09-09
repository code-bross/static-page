/**
 * Main Application Logic for CSIA CBT Exam Web Platform
 * Multi-Round Support (1회차 & 2회차)
 */

document.addEventListener('DOMContentLoaded', () => {
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

  // Landing Page Buttons & Status Boxes
  const btnStartRounds = document.querySelectorAll('.btn-start-round');
  const round1StatusBox = document.getElementById('round1StatusBox');
  const round2StatusBox = document.getElementById('round2StatusBox');

  // Question Card Elements
  const qCategoryBadge = document.getElementById('qCategoryBadge');
  const qDifficultyBadge = document.getElementById('qDifficultyBadge');
  const qNumberEl = document.getElementById('qNumber');
  const qTitleEl = document.getElementById('qTitle');
  const qBoxEl = document.getElementById('qBox');
  const qOptionsContainer = document.getElementById('qOptionsContainer');
  const qExplanationCard = document.getElementById('qExplanationCard');
  const qExplanationText = document.getElementById('qExplanationText');

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
  let currentRoundId = '1'; // '1' or '2'
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
    onSelectQuestion: (qId) => {
      currentQuestionId = qId;
      renderCurrentQuestion();
    }
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

  // Render Landing Page Status Cards
  function updateLandingStatuses() {
    [1, 2].forEach((r) => {
      const answersKey = `cbt_answers_r${r}`;
      const submittedKey = `cbt_submitted_r${r}`;
      const scoreKey = `cbt_score_r${r}`;
      const passKey = `cbt_pass_r${r}`;

      const savedAns = JSON.parse(localStorage.getItem(answersKey) || '{}');
      const ansCount = Object.keys(savedAns).length;
      const isSub = localStorage.getItem(submittedKey) === 'true';
      const score = localStorage.getItem(scoreKey);
      const isPass = localStorage.getItem(passKey) === 'true';

      const targetBox = r === 1 ? round1StatusBox : round2StatusBox;
      if (!targetBox) return;

      if (isSub && score !== null) {
        targetBox.className = `round-status-box ${isPass ? 'status-completed-pass' : 'status-completed-fail'}`;
        targetBox.innerHTML = `<span>최종 결과: <strong>${score}점</strong> (${isPass ? '🎉 합격' : '불합격'})</span>`;
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

  // Round Launch Handler
  btnStartRounds.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const rId = e.currentTarget.dataset.round;
      startExamRound(rId);
    });
  });

  function startExamRound(roundId) {
    currentRoundId = String(roundId);

    // Pick Exam Dataset
    if (currentRoundId === '1') {
      examQuestions = window.EXAM_DATA_ROUND1 || window.EXAM_DATA || [];
    } else {
      examQuestions = window.EXAM_DATA_ROUND2 || [];
    }
    totalQuestions = examQuestions.length || 100;

    // Load LocalStorage per Round
    userAnswers = JSON.parse(localStorage.getItem(`cbt_answers_r${currentRoundId}`) || '{}');
    bookmarks = new Set(JSON.parse(localStorage.getItem(`cbt_bookmarks_r${currentRoundId}`) || '[]'));
    isSubmitted = localStorage.getItem(`cbt_submitted_r${currentRoundId}`) === 'true';

    // Update Header Text
    if (examRoundTitle) examRoundTitle.textContent = `증권투자권유자문인력 제${currentRoundId}회 모의고사`;
    if (examRoundSubtitle) examRoundSubtitle.textContent = `제${currentRoundId}회 실제유형 모의고사 (100문항 / 120분)`;

    // Re-init OMR Card
    omrCard = new window.OMRCard({
      containerEl: omrContainer,
      totalQuestions: totalQuestions,
      onSelectQuestion: (qId) => {
        currentQuestionId = qId;
        renderCurrentQuestion();
      }
    });

    omrCard.setAnswers(userAnswers);
    omrCard.setBookmarks(Array.from(bookmarks));

    // Reset view state
    currentQuestionId = 1;

    // Switch Views
    roundSelectionView.classList.add('view-hidden');
    cbtExamView.classList.remove('view-hidden');

    // Timer setup
    if (!isSubmitted) {
      timer.start();
    } else {
      timer.pause();
    }

    renderCurrentQuestion();
  }

  // Go Back to Selection View
  btnGoHome.addEventListener('click', () => {
    timer.pause();
    cbtExamView.classList.add('view-hidden');
    roundSelectionView.classList.remove('view-hidden');
    updateLandingStatuses();
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
    renderCurrentQuestion();
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

    // Update Number & Title
    qNumberEl.textContent = `문제 ${String(q.id).padStart(2, '0')} / ${totalQuestions}`;
    qTitleEl.textContent = `${q.id}. ${q.question}`;

    // Update Condition Box
    if (q.box) {
      qBoxEl.style.display = 'block';
      qBoxEl.textContent = q.box;
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

      qOptionsContainer.appendChild(optItem);
    });

    // Explanation Visibility
    if ((currentExamMode === 'practice' && selectedAns !== undefined) || isSubmitted) {
      qExplanationCard.style.display = 'block';
      qExplanationText.textContent = `[정답: ${q.correctAnswer}번] ${q.explanation || '해설이 제공됩니다.'}`;
    } else {
      qExplanationCard.style.display = 'none';
    }

    // Navigation Buttons State
    btnPrev.disabled = currentQuestionId === 1;
    btnNext.disabled = currentQuestionId === totalQuestions;

    // Sync OMR Card
    omrCard.setActiveQuestion(currentQuestionId);
    updateProgress();
  }

  // Select Option Handler
  function selectOption(qId, optNum) {
    if (userAnswers[qId] === optNum) {
      delete userAnswers[qId];
    } else {
      userAnswers[qId] = optNum;
    }

    // Save State per round
    localStorage.setItem(`cbt_answers_r${currentRoundId}`, JSON.stringify(userAnswers));
    omrCard.setAnswers(userAnswers);
    renderCurrentQuestion();
  }

  // Navigation Listeners
  btnPrev.addEventListener('click', () => {
    if (currentQuestionId > 1) {
      currentQuestionId--;
      renderCurrentQuestion();
    }
  });

  btnNext.addEventListener('click', () => {
    if (currentQuestionId < totalQuestions) {
      currentQuestionId++;
      renderCurrentQuestion();
    }
  });

  // Bookmark Toggle
  btnBookmark.addEventListener('click', () => {
    if (bookmarks.has(currentQuestionId)) {
      bookmarks.delete(currentQuestionId);
    } else {
      bookmarks.add(currentQuestionId);
    }
    localStorage.setItem(`cbt_bookmarks_r${currentRoundId}`, JSON.stringify(Array.from(bookmarks)));
    omrCard.setBookmarks(Array.from(bookmarks));
    renderCurrentQuestion();
  });

  // Original Page Image Viewer
  btnViewImage.addEventListener('click', () => {
    const q = examQuestions.find((item) => item.id === currentQuestionId);
    if (!q) return;

    modalPageImage.src = `assets/images/${currentRoundId}/${q.pageImage}`;
    modalPageTitle.textContent = `원본 시험지 페이지 (${q.pageImage}) - 문제 ${q.id}번`;
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
    if (confirm(`제${currentRoundId}회 모의고사의 모든 답안과 진행 상황을 초기화하시겠습니까?`)) {
      userAnswers = {};
      bookmarks.clear();
      isSubmitted = false;
      localStorage.removeItem(`cbt_answers_r${currentRoundId}`);
      localStorage.removeItem(`cbt_bookmarks_r${currentRoundId}`);
      localStorage.removeItem(`cbt_submitted_r${currentRoundId}`);
      localStorage.removeItem(`cbt_score_r${currentRoundId}`);
      localStorage.removeItem(`cbt_pass_r${currentRoundId}`);

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

    let msg = `제${currentRoundId}회 모의고사 총 ${totalQuestions}문항 중 ${answeredCount}문항에 답안을 작성하셨습니다.`;
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

    localStorage.setItem(`cbt_submitted_r${currentRoundId}`, 'true');

    // Calculate Scores
    let totalCorrect = 0;
    let sec1Correct = 0, sec1Total = 35; // Q1~35
    let sec2Correct = 0, sec2Total = 35; // Q36~70
    let sec3Correct = 0, sec3Total = 30; // Q71~100

    examQuestions.forEach((q) => {
      const userAns = userAnswers[q.id];
      const isCorrect = userAns === q.correctAnswer;

      if (isCorrect) {
        totalCorrect++;
        if (q.id <= 35) sec1Correct++;
        else if (q.id <= 70) sec2Correct++;
        else sec3Correct++;
      }
    });

    const score = Math.round((totalCorrect / totalQuestions) * 100);
    const sec1Rate = Math.round((sec1Correct / sec1Total) * 100);
    const sec2Rate = Math.round((sec2Correct / sec2Total) * 100);
    const sec3Rate = Math.round((sec3Correct / sec3Total) * 100);

    // Pass / Fail Judgment: Total >= 60 AND no section < 40%
    const hasFailSection = sec1Rate < 40 || sec2Rate < 40 || sec3Rate < 40;
    const isPassed = score >= 60 && !hasFailSection;

    // Save score status per round
    localStorage.setItem(`cbt_score_r${currentRoundId}`, score);
    localStorage.setItem(`cbt_pass_r${currentRoundId}`, isPassed ? 'true' : 'false');

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
    resultSectionBody.innerHTML = `
      <tr>
        <td>1과목: 증권분석 및 증권시장 (35문항)</td>
        <td>${sec1Correct} / ${sec1Total}개</td>
        <td>${sec1Rate}%</td>
        <td class="${sec1Rate >= 40 ? 'section-pass' : 'section-fail'}">${sec1Rate >= 40 ? '통과' : '과락'}</td>
      </tr>
      <tr>
        <td>2과목: 금융투자상품 및 직무윤리 등 (35문항)</td>
        <td>${sec2Correct} / ${sec2Total}개</td>
        <td>${sec2Rate}%</td>
        <td class="${sec2Rate >= 40 ? 'section-pass' : 'section-fail'}">${sec2Rate >= 40 ? '통과' : '과락'}</td>
      </tr>
      <tr>
        <td>3과목: 투자법규 및 분쟁예방 등 (30문항)</td>
        <td>${sec3Correct} / ${sec3Total}개</td>
        <td>${sec3Rate}%</td>
        <td class="${sec3Rate >= 40 ? 'section-pass' : 'section-fail'}">${sec3Rate >= 40 ? '통과' : '과락'}</td>
      </tr>
    `;

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
      currentQuestionId = wrongQ.id;
      renderCurrentQuestion();
    }
  });

  btnRestart.addEventListener('click', () => {
    resultModal.classList.remove('open');
    btnReset.click();
  });

  // Keyboard Shortcuts (Arrow Left/Right, 1-4 option select)
  document.addEventListener('keydown', (e) => {
    if (cbtExamView.classList.contains('view-hidden')) return;
    if (imageModal.classList.contains('open') || resultModal.classList.contains('open')) return;

    if (e.key === 'ArrowLeft') {
      if (currentQuestionId > 1) {
        currentQuestionId--;
        renderCurrentQuestion();
      }
    } else if (e.key === 'ArrowRight') {
      if (currentQuestionId < totalQuestions) {
        currentQuestionId++;
        renderCurrentQuestion();
      }
    } else if (['1', '2', '3', '4'].includes(e.key)) {
      if (!isSubmitted) {
        selectOption(currentQuestionId, parseInt(e.key, 10));
      }
    }
  });
});
