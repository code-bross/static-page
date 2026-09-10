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
    const round3StatusBox = document.getElementById('round3StatusBox');
    const round4StatusBox = document.getElementById('round4StatusBox');
    [1, 2, 3, 4].forEach((r) => {
      const answersKey = `cbt_answers_r${r}`;
      const submittedKey = `cbt_submitted_r${r}`;
      const scoreKey = `cbt_score_r${r}`;
      const passKey = `cbt_pass_r${r}`;

      const savedAns = getSafeLocalStorageJSON(answersKey, {});
      const ansCount = Object.keys(savedAns).length;
      const isSub = localStorage.getItem(submittedKey) === 'true';
      const score = localStorage.getItem(scoreKey);
      const isPass = localStorage.getItem(passKey) === 'true';

      let targetBox = null;
      if (r === 1) targetBox = round1StatusBox;
      else if (r === 2) targetBox = round2StatusBox;
      else if (r === 3) targetBox = round3StatusBox;
      else if (r === 4) targetBox = round4StatusBox;

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

  // Round Launch Handler (direct fallback)
  btnStartRounds.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const rId = e.currentTarget.dataset.round || '1';
      startExamRound(rId);
    });
  });

  function startExamRound(roundId) {
    currentRoundId = String(roundId);

    // Pick Exam Dataset
    if (currentRoundId === '1') {
      examQuestions = window.EXAM_DATA_ROUND1 || window.EXAM_DATA || [];
    } else if (currentRoundId === '2') {
      examQuestions = window.EXAM_DATA_ROUND2 || [];
    } else if (currentRoundId === '3') {
      examQuestions = window.EXAM_DATA_ROUND3 || [];
    } else if (currentRoundId === '4') {
      examQuestions = window.EXAM_DATA_ROUND4 || [];
    }
    totalQuestions = examQuestions.length || 100;

    // Load LocalStorage per Round safely
    userAnswers = getSafeLocalStorageJSON(`cbt_answers_r${currentRoundId}`, {});
    const savedBookmarks = getSafeLocalStorageJSON(`cbt_bookmarks_r${currentRoundId}`, []);
    bookmarks = new Set(Array.isArray(savedBookmarks) ? savedBookmarks : []);
    isSubmitted = localStorage.getItem(`cbt_submitted_r${currentRoundId}`) === 'true';

    // Update Header Text
    if (examRoundTitle) examRoundTitle.textContent = `증권투자권유자문인력 제${currentRoundId}회 모의고사`;
    if (examRoundSubtitle) examRoundSubtitle.textContent = `제${currentRoundId}회 실제유형 모의고사 (${totalQuestions}문항 / 120분)`;

    // Re-init OMR Card
    if (omrContainer) {
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
    }

    // Reset view state
    currentQuestionId = 1;

    // Switch Views
    if (roundSelectionView) roundSelectionView.classList.add('view-hidden');
    if (cbtExamView) cbtExamView.classList.remove('view-hidden');
    window.scrollTo(0, 0);

    // Timer setup
    if (timer) {
      if (!isSubmitted) {
        timer.start();
      } else {
        timer.pause();
      }
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
      let questions = [];
      if (rId === '1') questions = window.EXAM_DATA_ROUND1 || window.EXAM_DATA || [];
      else if (rId === '2') questions = window.EXAM_DATA_ROUND2 || [];
      else if (rId === '3') questions = window.EXAM_DATA_ROUND3 || [];
      else if (rId === '4') questions = window.EXAM_DATA_ROUND4 || [];
      const savedAns = JSON.parse(localStorage.getItem(`cbt_answers_r${rId}`) || '{}');
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
    btnWrongModalPrint.addEventListener('click', () => {
      window.print();
    });
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

    if (!window.html2pdf) {
      window.print();
      return;
    }

    const origText = btnWrongModalDownload.innerHTML;
    btnWrongModalDownload.textContent = '⏳ PDF 생성 중...';

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `증투_제${currentWrongModalRoundId}회_오답분석노트.pdf`,
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
      wrongModalTitle.textContent = `제${roundId}회 모의고사 오답 분석 노트`;
    }
    if (wrongModalSubtitle) {
      wrongModalSubtitle.textContent = `시험 성적: ${score}점 / 100점 (${score >= 60 ? '🎉 합격권' : '복습 요망'}) · 전체 ${questions.length}문항 중 정답 ${correctCount}개`;
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
                난이도 ${stars}
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

          ${q.box ? `
            <div style="background: var(--bg-surface); border-left: 4px solid #3b82f6; border-top: 1px solid var(--border-color); border-right: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); padding: 0.85rem 1rem; font-size: 0.9rem; color: var(--text-primary); line-height: 1.6; margin-bottom: 1rem; border-radius: 0 8px 8px 0; white-space: pre-wrap; word-break: break-word;">
              ${escapeHtml(q.box)}
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

          <div style="background: #eff6ff; border-left: 4px solid #2563eb; border-radius: 0 8px 8px 0; padding: 12px 14px; margin-top: 6px;">
            <div style="font-weight: 800; color: #1d4ed8; font-size: 0.85rem; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
              <span>💡</span> [정답: ${correctChoice}번] 상세 해설
            </div>
            <div style="font-size: 0.88rem; color: #1e3a8a; line-height: 1.55; white-space: pre-wrap; word-break: break-word;">
              ${escapeHtml(q.explanation || '상세 해설이 제공됩니다.')}
            </div>
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
