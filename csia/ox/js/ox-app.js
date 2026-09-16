// Interactive Mobile-First OX Quiz App Engine (csia/ox)

document.addEventListener('DOMContentLoaded', () => {
  const quizData = window.OX_QUIZ_DATA || [];
  
  // State
  let filteredQuizzes = [...quizData];
  let currentIndex = 0;
  let currentMode = 'card'; // 'card' or 'list'
  let userAnswers = JSON.parse(localStorage.getItem('csia_ox_answers') || '{}');
  let bookmarks = JSON.parse(localStorage.getItem('csia_ox_bookmarks') || '[]');
  let revealedBlanks = JSON.parse(localStorage.getItem('csia_ox_revealed_blanks') || '{}');
  
  // DOM Elements
  const subjectFilter = document.getElementById('subjectFilter');
  const chapterFilter = document.getElementById('chapterFilter');
  const typeFilter = document.getElementById('typeFilter');
  const cardModeBtn = document.getElementById('cardModeBtn');
  const listModeBtn = document.getElementById('listModeBtn');
  const resetOxBtn = document.getElementById('resetOxBtn');
  
  const cardView = document.getElementById('cardView');
  const listView = document.getElementById('listView');
  
  const progressText = document.getElementById('progressText');
  const progressFill = document.getElementById('progressFill');
  const accuracyText = document.getElementById('accuracyText');
  
  // Modal Elements
  const imgModal = document.getElementById('imgModal');
  const modalImage = document.getElementById('modalImage');
  const modalClose = document.getElementById('modalClose');

  // Initialize Filters
  initFilters();
  applyFilters();
  
  function initFilters() {
    // Populate Subjects
    const subjects = setFromField('part');
    subjectFilter.innerHTML = '<option value="ALL">전체 과목 보기</option>' +
      subjects.map(s => `<option value="${s}">${s}</option>`).join('');
      
    // Populate Chapters
    populateChapters('ALL');
    
    subjectFilter.addEventListener('change', (e) => {
      populateChapters(e.target.value);
      applyFilters();
    });
    
    chapterFilter.addEventListener('change', applyFilters);
    typeFilter.addEventListener('change', applyFilters);
    
    cardModeBtn.addEventListener('click', () => switchMode('card'));
    listModeBtn.addEventListener('click', () => switchMode('list'));
    resetOxBtn.addEventListener('click', resetQuiz);
    
    modalClose.addEventListener('click', () => imgModal.classList.add('hidden'));
    imgModal.addEventListener('click', (e) => {
      if (e.target === imgModal) imgModal.classList.add('hidden');
    });
  }

  function resetQuiz() {
    if (!confirm('OX 퀴즈 풀이 기록과 북마크를 모두 초기화할까요?')) return;
    userAnswers = {};
    bookmarks = [];
    revealedBlanks = {};
    localStorage.removeItem('csia_ox_answers');
    localStorage.removeItem('csia_ox_bookmarks');
    localStorage.removeItem('csia_ox_revealed_blanks');
    applyFilters();
  }

  function setFromField(field) {
    return Array.from(new Set(quizData.map(q => q[field]))).filter(Boolean);
  }

  function populateChapters(subjectVal) {
    let chapters = [];
    if (subjectVal === 'ALL') {
      chapters = setFromField('chapter');
    } else {
      chapters = Array.from(new Set(quizData.filter(q => q.part === subjectVal).map(q => q.chapter))).filter(Boolean);
    }
    chapterFilter.innerHTML = '<option value="ALL">전체 장 보기</option>' +
      chapters.map(c => `<option value="${c}">${c}</option>`).join('');
  }

  function applyFilters() {
    const sVal = subjectFilter.value;
    const cVal = chapterFilter.value;
    const tVal = typeFilter.value;
    
    filteredQuizzes = quizData.filter(q => {
      if (sVal !== 'ALL' && q.part !== sVal) return false;
      if (cVal !== 'ALL' && q.chapter !== cVal) return false;
      if (tVal === 'OX' && q.type !== 'OX') return false;
      if (tVal === 'BLANK' && q.type !== 'BLANK') return false;
      if (tVal === 'BOOKMARK' && !bookmarks.includes(q.id)) return false;
      if (tVal === 'WRONG' && userAnswers[q.id] !== false) return false;
      return true;
    });
    
    currentIndex = 0;
    render();
  }

  function switchMode(mode) {
    currentMode = mode;
    if (mode === 'card') {
      cardModeBtn.classList.add('active');
      listModeBtn.classList.remove('active');
      cardView.style.display = 'flex';
      listView.style.display = 'none';
    } else {
      listModeBtn.classList.add('active');
      cardModeBtn.classList.remove('active');
      listView.style.display = 'flex';
      cardView.style.display = 'none';
    }
    render();
  }

  function blankAnswers(q) {
    const answers = q.answer.split(/\s*,\s*/).map(answer => answer.trim()).filter(Boolean);
    const blankCount = (q.question.match(/\(\s*\)/g) || []).length;
    return answers.length === 1 && blankCount > 1
      ? answers[0].split(/\.\s+/).map(answer => answer.trim()).filter(Boolean)
      : answers;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[character]));
  }

  function renderBlankQuestion(q, revealed = []) {
    const answers = blankAnswers(q);
    let blankIndex = 0;
    return q.question.replace(/\(\s*\)/g, () => {
      const index = blankIndex++;
      const answer = answers[index] || answers[answers.length - 1] || '정답';
      const isRevealed = revealed.includes(index);
      const visibleAnswer = isRevealed ? escapeHtml(answer) : '&nbsp;';
      const label = isRevealed ? `정답: ${escapeHtml(answer)}` : '빈칸 정답 보기';
      return `<button class="blank-slot ${isRevealed ? 'revealed' : ''}" type="button" data-blank-index="${index}" aria-label="${label}">${visibleAnswer}</button>`;
    });
  }

  function revealBlank(q, index) {
    const current = Array.isArray(revealedBlanks[q.id]) ? revealedBlanks[q.id] : [];
    if (!current.includes(index)) {
      revealedBlanks[q.id] = [...current, index];
      userAnswers[q.id] = true;
      localStorage.setItem('csia_ox_revealed_blanks', JSON.stringify(revealedBlanks));
      saveUserAnswers();
    }
  }

  function updateStats() {
    const total = filteredQuizzes.length;
    if (total === 0) {
      progressText.textContent = '0 / 0';
      progressFill.style.width = '0%';
      accuracyText.textContent = '정답률 0%';
      return;
    }
    
    const answeredCount = filteredQuizzes.filter(q => userAnswers.hasOwnProperty(q.id)).length;
    const correctCount = filteredQuizzes.filter(q => userAnswers[q.id] === true).length;
    
    progressText.textContent = `${currentIndex + 1} / ${total}`;
    const pct = Math.round(((currentIndex + 1) / total) * 100);
    progressFill.style.width = `${pct}%`;
    
    const acc = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
    accuracyText.textContent = `정답률 ${acc}% (${correctCount}/${answeredCount})`;
  }

  function render() {
    updateStats();
    if (currentMode === 'card') {
      renderCardView();
    } else {
      renderListView();
    }
  }

  // --- CARD VIEW RENDERER ---
  function renderCardView() {
    if (filteredQuizzes.length === 0) {
      cardView.innerHTML = `
        <div class="quiz-card" style="text-align: center; padding: 40px 20px;">
          <div style="font-size: 36px; margin-bottom: 12px;">🔍</div>
          <div style="font-size: 16px; font-weight: 700; color: #f3f4f6; margin-bottom: 8px;">조건에 맞는 퀴즈가 없습니다.</div>
          <div style="font-size: 13px; color: #9ca3af;">상단의 과목 및 유형 필터를 변경해보세요.</div>
        </div>
      `;
      return;
    }
    
    const q = filteredQuizzes[currentIndex];
    const isBookmarked = bookmarks.includes(q.id);
    const userAnswer = userAnswers[q.id]; // true, false, or undefined
    const shouldShowAnswerDrawer = q.type === 'BLANK' ? false : userAnswer !== undefined;
    
    cardView.innerHTML = `
      <div class="quiz-card">
        <div class="quiz-meta">
          <span class="chapter-badge">${q.chapter}</span>
          <span class="qnum-badge">Q.${q.id} (p.${q.page} #${q.qNum})</span>
          <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" id="bmBtn">
            ${isBookmarked ? '★' : '☆'}
          </button>
        </div>
        
        <div class="question-text">${q.type === 'BLANK' ? renderBlankQuestion(q, revealedBlanks[q.id] || []) : q.question}</div>
        
        ${q.type === 'OX' ? `
          <div class="ox-buttons-group">
            <button class="ox-btn ox-btn-o ${userAnswer !== undefined && q.oxAnswer === 'O' ? 'selected-o' : ''}" id="btnO">
              <span>⭕</span> O
            </button>
            <button class="ox-btn ox-btn-x ${userAnswer !== undefined && q.oxAnswer === 'X' ? 'selected-x' : ''}" id="btnX">
              <span>❌</span> X
            </button>
          </div>
        ` : `
          <button class="reveal-ans-btn" id="revealBtn">
            💡 정답 및 해설 확인하기
          </button>
        `}
        
        <div class="answer-drawer ${shouldShowAnswerDrawer ? '' : 'hidden'}" id="answerDrawer">
          <div class="ans-header">
            <span class="ans-title">정답 및 해설</span>
            ${q.oxAnswer ? `<span class="ans-ox-tag ${q.oxAnswer}">${q.oxAnswer}</span>` : ''}
          </div>
          <div class="ans-body">${q.answer}</div>
          <button class="img-preview-btn" id="imgBtn">
            📷 원본 교재 스캔 이미지 보기 (p.${q.page})
          </button>
        </div>
      </div>
      
      <div class="card-nav-bar">
        <button class="nav-btn" id="prevBtn" ${currentIndex === 0 ? 'disabled' : ''}>
          ◀ 이전
        </button>
        <button class="nav-btn nav-btn-primary" id="nextBtn" ${currentIndex === filteredQuizzes.length - 1 ? 'disabled' : ''}>
          다음 ▶
        </button>
      </div>
    `;
    
    // Bind Card Events
    document.getElementById('bmBtn').addEventListener('click', () => toggleBookmark(q.id));
    
    if (q.type === 'OX') {
      document.getElementById('btnO').addEventListener('click', () => handleOXClick(q, 'O'));
      document.getElementById('btnX').addEventListener('click', () => handleOXClick(q, 'X'));
    } else {
      cardView.querySelectorAll('.blank-slot').forEach((blank) => blank.addEventListener('click', () => {
        revealBlank(q, Number(blank.dataset.blankIndex));
        render();
      }));
      document.getElementById('revealBtn').addEventListener('click', () => {
        const drawer = document.getElementById('answerDrawer');
        drawer.classList.toggle('hidden');
        userAnswers[q.id] = true;
        saveUserAnswers();
        updateStats();
      });
    }
    
    const imgBtn = document.getElementById('imgBtn');
    if (imgBtn) {
      imgBtn.addEventListener('click', () => openImageModal(q.image));
    }
    
    document.getElementById('prevBtn').addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        render();
      }
    });
    
    document.getElementById('nextBtn').addEventListener('click', () => {
      if (currentIndex < filteredQuizzes.length - 1) {
        currentIndex++;
        render();
      }
    });
  }

  function handleOXClick(q, choice) {
    const isCorrect = (q.oxAnswer === choice);
    userAnswers[q.id] = isCorrect;
    saveUserAnswers();
    render();
  }

  function toggleBookmark(qid) {
    if (bookmarks.includes(qid)) {
      bookmarks = bookmarks.filter(id => id !== qid);
    } else {
      bookmarks.push(qid);
    }
    localStorage.setItem('csia_ox_bookmarks', JSON.stringify(bookmarks));
    render();
  }

  function saveUserAnswers() {
    localStorage.setItem('csia_ox_answers', JSON.stringify(userAnswers));
  }

  function openImageModal(imgName) {
    modalImage.src = `../assets/images/ox/${imgName}`;
    imgModal.classList.remove('hidden');
  }

  // --- LIST VIEW RENDERER ---
  function renderListView() {
    if (filteredQuizzes.length === 0) {
      listView.innerHTML = `
        <div class="quiz-card" style="text-align: center; padding: 40px 20px;">
          <div style="font-size: 16px; font-weight: 700; color: #f3f4f6;">조건에 맞는 퀴즈가 없습니다.</div>
        </div>
      `;
      return;
    }
    
    listView.innerHTML = filteredQuizzes.map((q, idx) => {
      const isAnsRevealed = q.type !== 'BLANK' && userAnswers.hasOwnProperty(q.id);
      return `
        <div class="list-item-card" id="listItem_${q.id}">
          <div class="quiz-meta">
            <span class="chapter-badge">${q.chapter}</span>
            <span class="qnum-badge">Q.${q.id} (p.${q.page})</span>
          </div>
          <div class="question-text" style="font-size: 15px; margin-bottom: 12px;">${q.type === 'BLANK' ? renderBlankQuestion(q, revealedBlanks[q.id] || []) : q.question}</div>
          
          <button class="reveal-ans-btn list-reveal-btn" data-id="${q.id}" style="padding: 10px; font-size: 13px;">
            ${isAnsRevealed ? '▲ 정답 닫기' : '💡 정답 및 해설 보기'}
          </button>
          
          <div class="answer-drawer ${isAnsRevealed ? '' : 'hidden'}" id="drawer_${q.id}" style="margin-top: 10px; padding: 12px;">
            <div class="ans-header">
              <span class="ans-title">정답</span>
              ${q.oxAnswer ? `<span class="ans-ox-tag ${q.oxAnswer}">${q.oxAnswer}</span>` : ''}
            </div>
            <div class="ans-body" style="font-size: 14px;">${q.answer}</div>
          </div>
        </div>
      `;
    }).join('');
    
    // Bind list click events
    document.querySelectorAll('.list-reveal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const qid = parseInt(btn.getAttribute('data-id'));
        const drawer = document.getElementById(`drawer_${qid}`);
        const isHidden = drawer.classList.contains('hidden');
        if (isHidden) {
          drawer.classList.remove('hidden');
          btn.textContent = '▲ 정답 닫기';
          userAnswers[qid] = true;
        } else {
          drawer.classList.add('hidden');
          btn.textContent = '💡 정답 및 해설 보기';
        }
        saveUserAnswers();
        updateStats();
      });
    });

    listView.querySelectorAll('.blank-slot').forEach((blank) => blank.addEventListener('click', () => {
      const qid = Number(blank.closest('.list-item-card').id.replace('listItem_', ''));
      const q = filteredQuizzes.find(item => item.id === qid);
      revealBlank(q, Number(blank.dataset.blankIndex));
      renderListView();
    }));
  }
});
