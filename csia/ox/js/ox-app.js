// Interactive Mobile-First OX & Choice Quiz App Engine (csia/ox)

document.addEventListener('DOMContentLoaded', () => {
  const quizData = window.OX_QUIZ_DATA || [];
  
  // State
  let filteredQuizzes = [...quizData];
  let currentIndex = 0;
  let currentMode = 'card'; // 'card' or 'list'
  let userAnswers = JSON.parse(localStorage.getItem('csia_ox_answers') || '{}');
  let bookmarks = JSON.parse(localStorage.getItem('csia_ox_bookmarks') || '[]');
  let revealedBlanks = JSON.parse(localStorage.getItem('csia_ox_revealed_blanks') || '{}');
  let userChoices = JSON.parse(localStorage.getItem('csia_ox_choices') || '{}');
  
  // DOM Elements
  const subjectFilter = document.getElementById('subjectFilter');
  const chapterFilter = document.getElementById('chapterFilter');
  const typeFilter = document.getElementById('typeFilter');
  const cardModeBtn = document.getElementById('cardModeBtn');
  const listModeBtn = document.getElementById('listModeBtn');
  const resetOxBtn = document.getElementById('resetOxBtn');
  
  const cardView = document.getElementById('cardView');
  const listView = document.getElementById('listView');
  
  const progressSpinner = document.getElementById('progressSpinner');
  const progressTotal = document.getElementById('progressTotal');
  const prevQuestionBtn = document.getElementById('prevQuestionBtn');
  const nextQuestionBtn = document.getElementById('nextQuestionBtn');
  const accuracyText = document.getElementById('accuracyText');
  
  // Modal Elements
  const imgModal = document.getElementById('imgModal');
  const modalImage = document.getElementById('modalImage');
  const modalClose = document.getElementById('modalClose');

  const norm = s => (s || '').replace(/[\s\(\)\.·\+~'"\-]/g, '').toLowerCase();

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
    progressSpinner.addEventListener('change', () => {
      if (!filteredQuizzes.length) return;
      const target = Number(progressSpinner.value);
      if (!Number.isInteger(target)) {
        progressSpinner.value = currentIndex + 1;
        return;
      }
      currentIndex = Math.min(Math.max(target - 1, 0), filteredQuizzes.length - 1);
      render();
    });
    prevQuestionBtn.addEventListener('click', () => moveToQuestion(currentIndex - 1));
    nextQuestionBtn.addEventListener('click', () => moveToQuestion(currentIndex + 1));
    
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
    userChoices = {};
    localStorage.removeItem('csia_ox_answers');
    localStorage.removeItem('csia_ox_bookmarks');
    localStorage.removeItem('csia_ox_revealed_blanks');
    localStorage.removeItem('csia_ox_choices');
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

  function getQuestionSlots(q) {
    if (q._slots) return q._slots;
    const tokenRegex = /\(\s*([^()]*?\s*\/\s*[^()]*?|\s*)\)/g;
    const rawAnswers = (q.answer || '').split(/,\s+|\n/).map(s => s.trim()).filter(Boolean);

    const slots = [];
    let m;
    let choiceSlotCount = 0;
    let blankSlotCount = 0;
    let ansIdx = 0;

    while ((m = tokenRegex.exec(q.question)) !== null) {
      const raw = m[0];
      const inner = m[1].trim();
      if (!inner || !inner.includes('/')) {
        const bIdx = blankSlotCount++;
        const correct = rawAnswers[ansIdx] || '';
        ansIdx++;
        slots.push({
          type: 'blank',
          slotIndex: slots.length,
          blankIndex: bIdx,
          raw,
          correct
        });
      } else {
        const options = inner.split('/').map(s => s.trim()).filter(Boolean);
        const currentAns = rawAnswers[ansIdx] || '';
        let correctOpt = options.find(opt => {
          const no = norm(opt);
          const nc = norm(currentAns);
          return nc.includes(no) || (no.length > 1 && nc === no);
        });
        if (!correctOpt) {
          correctOpt = options.find(opt => norm(q.answer).includes(norm(opt)));
        }
        if (correctOpt) {
          const cIdx = choiceSlotCount++;
          ansIdx++;
          slots.push({
            type: 'choice',
            slotIndex: slots.length,
            choiceIndex: cIdx,
            raw,
            options,
            correct: correctOpt
          });
        } else {
          slots.push({
            type: 'text',
            slotIndex: slots.length,
            raw
          });
        }
      }
    }
    q._slots = slots;
    return slots;
  }

  function applyFilters() {
    const sVal = subjectFilter.value;
    const cVal = chapterFilter.value;
    const tVal = typeFilter.value;
    
    filteredQuizzes = quizData.filter(q => {
      if (sVal !== 'ALL' && q.part !== sVal) return false;
      if (cVal !== 'ALL' && q.chapter !== cVal) return false;
      if (tVal === 'OX' && q.type !== 'OX') return false;
      if (tVal === 'CHOICE') {
        const slots = getQuestionSlots(q);
        if (!slots.some(s => s.type === 'choice')) return false;
      }
      if (tVal === 'BLANK') {
        const slots = getQuestionSlots(q);
        if (q.type === 'OX' || slots.some(s => s.type === 'choice')) return false;
      }
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

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[character]));
  }

  function renderContextTable(q) {
    const isOrderBook16 = q.image === '증투 OX 퀴즈 - 16.jpg' && q.qNum >= 48 && q.qNum <= 51;
    const isOrderBook17 = q.image === '증투 OX 퀴즈 - 17.jpg' && q.qNum >= 52 && q.qNum <= 55;
    if (!isOrderBook16 && !isOrderBook17) return '';

    const rows = isOrderBook16
      ? [['100', '10,040', ''], ['200', '10,020', ''], ['', '10,000', '500'], ['', '9,980', '1,100'], ['', '9,970', '1,200']]
      : [['400', '10,040', ''], ['200', '10,020', ''], ['', '10,000', '500'], ['', '9,980', '1,100'], ['', '9,970', '1,200']];
    return `
      <div class="question-context" aria-label="문항 공통 호가표">
        <div class="context-label">공통 호가표</div>
        <table class="order-book-table">
          <thead><tr><th>매도 주문수량(주)</th><th>가격(원)</th><th>매수 주문수량(주)</th></tr></thead>
          <tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>
    `;
  }

  function renderInteractiveQuestion(q) {
    const slots = getQuestionSlots(q);
    if (slots.length === 0) {
      return escapeHtml(q.question);
    }

    const qChoices = userChoices[q.id] || {};
    const revealed = revealedBlanks[q.id] || [];

    let rendered = '';
    let lastIndex = 0;
    const tokenRegex = /\(\s*([^()]*?\s*\/\s*[^()]*?|\s*)\)/g;
    let slotIdx = 0;

    let m;
    while ((m = tokenRegex.exec(q.question)) !== null) {
      const matchIndex = m.index;
      rendered += escapeHtml(q.question.slice(lastIndex, matchIndex));
      lastIndex = matchIndex + m[0].length;

      const slot = slots[slotIdx++];
      if (!slot || slot.type === 'text') {
        rendered += escapeHtml(m[0]);
      } else if (slot.type === 'blank') {
        const isRevealed = revealed.includes(slot.blankIndex);
        const visibleAnswer = isRevealed ? escapeHtml(slot.correct || '정답') : '&nbsp;';
        const label = isRevealed ? `정답: ${escapeHtml(slot.correct || '')}` : '빈칸 정답 보기';
        rendered += `<button class="blank-slot ${isRevealed ? 'revealed' : ''}" type="button" data-qid="${q.id}" data-blank-index="${slot.blankIndex}" aria-label="${label}">${visibleAnswer}</button>`;
      } else if (slot.type === 'choice') {
        const userChoice = qChoices[slot.choiceIndex];
        const isSelected = !!userChoice;
        const isUserCorrect = isSelected && userChoice === slot.correct;

        rendered += `<span class="choice-group" data-qid="${q.id}" data-choice-index="${slot.choiceIndex}">`;
        slot.options.forEach((opt) => {
          let stateClass = '';
          if (isSelected) {
            if (userChoice === opt) {
              stateClass = (opt === slot.correct) ? 'selected-correct' : 'selected-wrong';
            } else if (opt === slot.correct && !isUserCorrect) {
              stateClass = 'show-correct';
            }
          }
          rendered += `<button type="button" class="choice-btn ${stateClass}" data-qid="${q.id}" data-choice-index="${slot.choiceIndex}" data-opt="${escapeHtml(opt)}">${escapeHtml(opt)}</button>`;
        });
        rendered += `</span>`;
      }
    }
    rendered += escapeHtml(q.question.slice(lastIndex));
    return rendered;
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

  function handleChoiceClick(q, choiceIndex, selectedOpt) {
    userChoices[q.id] = userChoices[q.id] || {};
    userChoices[q.id][choiceIndex] = selectedOpt;
    localStorage.setItem('csia_ox_choices', JSON.stringify(userChoices));

    const slots = getQuestionSlots(q);
    const choiceSlots = slots.filter(s => s.type === 'choice');
    const answeredSlots = choiceSlots.filter(s => userChoices[q.id].hasOwnProperty(s.choiceIndex));

    // If all choice slots have been answered by user:
    if (answeredSlots.length === choiceSlots.length) {
      const allCorrect = choiceSlots.every(s => userChoices[q.id][s.choiceIndex] === s.correct);
      userAnswers[q.id] = allCorrect;
      saveUserAnswers();
    }

    render();
  }

  function resetQuestionChoices(q) {
    if (userChoices[q.id]) {
      delete userChoices[q.id];
      localStorage.setItem('csia_ox_choices', JSON.stringify(userChoices));
    }
    if (userAnswers.hasOwnProperty(q.id)) {
      delete userAnswers[q.id];
      saveUserAnswers();
    }
    render();
  }

  function updateStats() {
    const total = filteredQuizzes.length;
    if (total === 0) {
      progressSpinner.value = 0;
      progressSpinner.max = 0;
      progressSpinner.disabled = true;
      progressTotal.textContent = '/ 0';
      prevQuestionBtn.disabled = true;
      nextQuestionBtn.disabled = true;
      accuracyText.textContent = '정답률 0%';
      return;
    }
    
    const answeredCount = filteredQuizzes.filter(q => userAnswers.hasOwnProperty(q.id)).length;
    const correctCount = filteredQuizzes.filter(q => userAnswers[q.id] === true).length;
    
    progressSpinner.disabled = false;
    progressSpinner.max = total;
    progressSpinner.value = currentIndex + 1;
    progressTotal.textContent = `/ ${total}`;
    prevQuestionBtn.disabled = currentIndex === 0;
    nextQuestionBtn.disabled = currentIndex === total - 1;
    
    const acc = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
    accuracyText.textContent = `정답률 ${acc}% (${correctCount}/${answeredCount})`;
  }

  function moveToQuestion(index) {
    if (index < 0 || index >= filteredQuizzes.length) return;
    currentIndex = index;
    render();
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
    const slots = getQuestionSlots(q);
    const choiceSlots = slots.filter(s => s.type === 'choice');
    const isChoiceQuiz = choiceSlots.length > 0;
    
    // Check choice answered status
    const qChoices = userChoices[q.id] || {};
    const answeredChoicesCount = choiceSlots.filter(s => qChoices.hasOwnProperty(s.choiceIndex)).length;
    const isAllChoicesAnswered = isChoiceQuiz && (answeredChoicesCount === choiceSlots.length);

    let shouldShowAnswerDrawer = false;
    if (q.type === 'OX') {
      shouldShowAnswerDrawer = (userAnswer !== undefined);
    } else if (isChoiceQuiz) {
      shouldShowAnswerDrawer = isAllChoicesAnswered || (userAnswer !== undefined);
    } else {
      shouldShowAnswerDrawer = false;
    }

    // Build Choice Banner if applicable
    let choiceBannerHtml = '';
    if (isChoiceQuiz) {
      if (isAllChoicesAnswered) {
        if (userAnswer === true) {
          choiceBannerHtml = `
            <div class="choice-status-banner correct">
              <span>🎉 <b>정답입니다!</b> 모든 괄호의 알맞은 보기를 선택하셨습니다.</span>
              <button type="button" class="choice-retry-btn" id="choiceRetryBtn">🔄 다시 풀기</button>
            </div>
          `;
        } else {
          choiceBannerHtml = `
            <div class="choice-status-banner wrong">
              <span>❌ <b>오답이 있습니다!</b> 정답과 해설을 아래에서 확인하세요.</span>
              <button type="button" class="choice-retry-btn" id="choiceRetryBtn">🔄 다시 풀기</button>
            </div>
          `;
        }
      } else {
        choiceBannerHtml = `
          <div class="choice-status-banner pending">
            <span>👆 본문 괄호 속 <b>알맞은 보기를 터치</b>하세요 (${answeredChoicesCount}/${choiceSlots.length} 선택)</span>
            ${answeredChoicesCount > 0 ? '<button type="button" class="choice-retry-btn" id="choiceRetryBtn">🔄 초기화</button>' : ''}
          </div>
        `;
      }
    }
    
    cardView.innerHTML = `
      <div class="quiz-card">
        <div class="quiz-meta">
          <span class="chapter-badge">${q.chapter}</span>
          <span class="qnum-badge">Q.${q.id} (p.${q.page} #${q.qNum})</span>
          <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" id="bmBtn" title="즐겨찾기">
            ${isBookmarked ? '★' : '☆'}
          </button>
        </div>

        ${choiceBannerHtml}
        
        ${renderContextTable(q)}
        <div class="question-text">${renderInteractiveQuestion(q)}</div>
        
        ${q.type === 'OX' ? `
          <div class="ox-buttons-group">
            <button class="ox-btn ox-btn-o ${userAnswer !== undefined && q.oxAnswer === 'O' ? 'selected-o' : ''}" id="btnO">
              O
            </button>
            <button class="ox-btn ox-btn-x ${userAnswer !== undefined && q.oxAnswer === 'X' ? 'selected-x' : ''}" id="btnX">
              X
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
          ${q.explanation ? `<div class="ans-explanation">${q.explanation}</div>` : ''}
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
      const revealBtn = document.getElementById('revealBtn');
      if (revealBtn) {
        revealBtn.addEventListener('click', () => {
          const drawer = document.getElementById('answerDrawer');
          drawer.classList.toggle('hidden');
          userAnswers[q.id] = true;
          saveUserAnswers();
          updateStats();
        });
      }
    }

    const choiceRetryBtn = document.getElementById('choiceRetryBtn');
    if (choiceRetryBtn) {
      choiceRetryBtn.addEventListener('click', () => resetQuestionChoices(q));
    }

    cardView.querySelectorAll('.choice-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const choiceIdx = Number(btn.dataset.choiceIndex);
        const opt = btn.dataset.opt;
        handleChoiceClick(q, choiceIdx, opt);
      });
    });

    cardView.querySelectorAll('.blank-slot').forEach(blank => {
      blank.addEventListener('click', (e) => {
        e.stopPropagation();
        revealBlank(q, Number(blank.dataset.blankIndex));
        render();
      });
    });
    
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
    
    listView.innerHTML = filteredQuizzes.map((q) => {
      const slots = getQuestionSlots(q);
      const choiceSlots = slots.filter(s => s.type === 'choice');
      const isChoiceQuiz = choiceSlots.length > 0;
      const qChoices = userChoices[q.id] || {};
      const isAllChoicesAnswered = isChoiceQuiz && choiceSlots.every(s => qChoices.hasOwnProperty(s.choiceIndex));
      const isAnsRevealed = (q.type === 'OX' && userAnswers.hasOwnProperty(q.id)) ||
                            (isChoiceQuiz && isAllChoicesAnswered) ||
                            (userAnswers.hasOwnProperty(q.id));

      return `
        <div class="list-item-card" id="listItem_${q.id}">
          <div class="quiz-meta">
            <span class="chapter-badge">${q.chapter}</span>
            <span class="qnum-badge">Q.${q.id} (p.${q.page})</span>
          </div>
          <div class="question-text" style="font-size: 15px; margin-bottom: 12px;">${renderInteractiveQuestion(q)}</div>
          
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
            <button class="reveal-ans-btn list-reveal-btn" data-id="${q.id}" style="padding: 9px 14px; font-size: 13px; flex: 1;">
              ${isAnsRevealed ? '▲ 정답 닫기' : '💡 정답 및 해설 보기'}
            </button>
            ${isChoiceQuiz && Object.keys(qChoices).length > 0 ? `
              <button type="button" class="choice-retry-btn list-retry-btn" data-id="${q.id}">🔄 초기화</button>
            ` : ''}
          </div>
          
          <div class="answer-drawer ${isAnsRevealed ? '' : 'hidden'}" id="drawer_${q.id}" style="margin-top: 10px; padding: 12px;">
            <div class="ans-header">
              <span class="ans-title">정답</span>
              ${q.oxAnswer ? `<span class="ans-ox-tag ${q.oxAnswer}">${q.oxAnswer}</span>` : ''}
            </div>
            <div class="ans-body" style="font-size: 14px;">${q.answer}</div>
            ${q.explanation ? `<div class="ans-explanation">${q.explanation}</div>` : ''}
          </div>
        </div>
      `;
    }).join('');
    
    // Bind list click events
    document.querySelectorAll('.list-reveal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
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

    listView.querySelectorAll('.list-retry-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = Number(btn.getAttribute('data-id'));
        const q = filteredQuizzes.find(item => item.id === qid);
        if (q) resetQuestionChoices(q);
      });
    });

    listView.querySelectorAll('.choice-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const qid = Number(btn.dataset.qid);
        const choiceIdx = Number(btn.dataset.choiceIndex);
        const opt = btn.dataset.opt;
        const q = filteredQuizzes.find(item => item.id === qid);
        if (q) handleChoiceClick(q, choiceIdx, opt);
      });
    });

    listView.querySelectorAll('.blank-slot').forEach((blank) => {
      blank.addEventListener('click', (e) => {
        e.stopPropagation();
        const qid = Number(blank.dataset.qid);
        const q = filteredQuizzes.find(item => item.id === qid);
        if (q) {
          revealBlank(q, Number(blank.dataset.blankIndex));
          renderListView();
        }
      });
    });
  }
});
