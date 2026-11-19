(() => {
  'use strict';
  const symbols = ['①', '②', '③', '④', '⑤'];
  const escape = value => String(value).replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));

  let dataPromise = null;
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`문항 데이터를 불러오지 못했어요: ${src}`));
      document.head.appendChild(script);
    });
  }
  function ensureExamData(basePrefix = '../') {
    if (window.HISTORY_EXAMS && window.HISTORY_CHOICES && window.HISTORY_EXPLANATIONS) {
      return Promise.resolve();
    }
    if (!dataPromise) {
      dataPromise = Promise.all([
        window.HISTORY_EXAMS ? Promise.resolve() : loadScript(`${basePrefix}data.js`),
        window.HISTORY_CHOICES ? Promise.resolve() : loadScript(`${basePrefix}choices.js`),
        window.HISTORY_EXPLANATIONS ? Promise.resolve() : loadScript(`${basePrefix}explanations.js`)
      ]).catch(error => {
        dataPromise = null;
        throw error;
      });
    }
    return dataPromise;
  }

  function parseRef(ref) {
    const match = String(ref || '').match(/^(6\d|7\d|80)-([1-9]|[1-4]\d|50)$/);
    return match ? {round: Number(match[1]), number: Number(match[2]), ref: `${match[1]}-${match[2]}`} : null;
  }

  function renderStemFragments(exam, question, content, assetPrefix) {
    const fragments = content?.stem?.length ? content.stem : [{crop: question.crop}];
    return fragments.map((fragment, index) => {
      const [left, top, right, bottom] = fragment.crop;
      const width = right - left;
      const height = bottom - top;
      const ratio = width * question.width / (height * question.height);
      const style = `width:${100 / width}%;height:auto;left:${-100 * left / width}%;top:${-100 * top / height}%`;
      const alt = `제${exam.round}회 심화 ${question.number}번 지문·자료 ${index + 1}/${fragments.length}`;
      return `<div class="question-image" style="aspect-ratio:${ratio}"><img src="${assetPrefix}${escape(question.image)}" width="${question.width}" height="${question.height}" style="${style}" alt="${escape(alt)}" decoding="async"></div>`;
    }).join('');
  }

  function renderFeedbackDetails(exam, question, selected) {
    const ref = `${exam.round}-${question.number}`;
    const correct = selected === question.answer;
    const explanation = window.HISTORY_EXPLANATIONS?.[ref];
    const choiceData = window.HISTORY_CHOICES?.[ref];
    const correctOption = choiceData?.options?.[question.answer - 1];
    const correctText = correctOption?.text ? correctOption.text.replace(/\s+/g, ' ').trim() : '';

    const supplements = {
      ...(window.DEEPEN_SUPPLEMENTS_EARLY || {}),
      ...(window.DEEPEN_SUPPLEMENTS_MODERN || {})
    };
    const conceptTitles = new Map((window.HISTORY_CONCEPTS || []).map(item => [item.id, item.title]));
    const topicIds = window.HISTORY_TOPICS?.[ref] || [];
    const primaryId = topicIds[0];
    const primarySupplement = primaryId ? supplements[primaryId] : null;
    const primaryTitle = primaryId ? conceptTitles.get(primaryId) : '';
    const studyCards = (primaryId && window.DEEPEN_EXAM_STUDY?.[primaryId]?.points || [])
      .filter(point => point.refs.includes(ref));

    const paragraphs = (explanation?.paragraphs || []).map(text => text === '오답 설명'
      ? '<h4>다른 보기는 왜 아닐까요?</h4>'
      : `<p>${escape(text)}</p>`).join('');

    const insightParts = [];
    if (correctText) {
      insightParts.push(`<div class="insight-answer"><span class="insight-badge">정답 선지 바로 확인</span><p><strong>${symbols[question.answer - 1]}</strong> ${escape(correctText)}</p></div>`);
    }
    if (studyCards.length) {
      insightParts.push(...studyCards.map(card => `<div class="insight-card"><span class="insight-badge">이 문항 기출 포인트</span><h4>${escape(card.title)}</h4><p>${escape(card.text)}</p></div>`));
    }
    if (primarySupplement) {
      insightParts.push(`<div class="insight-summary"><div class="insight-summary-head"><span class="insight-badge">연결 단원 핵심 요약</span><strong>${escape(primaryTitle)}</strong></div><p class="insight-trap" style="margin-top:4px"><strong>함정 주의:</strong> ${escape(primarySupplement.trap)}</p></div>`);
    }

    return `
      <section class="feedback ${correct ? '' : 'incorrect'}" role="status" aria-live="polite">
        <div class="solo-feedback-head">
          <div>
            <h3>${correct ? '정답입니다!' : '다시 짚어볼 문제예요.'}</h3>
            <p>정답 <strong>${symbols[question.answer - 1]}</strong> · 내 선택 <strong>${symbols[selected - 1]}</strong> · 배점 ${question.points}점</p>
          </div>
          <button type="button" class="button quiet" data-solo-reset>다시 풀어 보기 ↺</button>
        </div>
      </section>
      ${explanation ? `<section class="answer-explanation" aria-label="문항 해설">
        <span class="eyebrow">WHY / 정답 이해하기</span>
        <h3>정답 해설</h3>
        ${paragraphs}
        ${explanation.correction ? `<p class="explanation-correction">${escape(explanation.correction)}</p>${explanation.originalParagraphs ? `<details class="original-explanation"><summary>수정 전 원문 보기</summary>${explanation.originalParagraphs.map(text => `<p>${escape(text)}</p>`).join('')}</details>` : ''}` : ''}
        <p class="explanation-source">출처: 해커스한국사 참고 · <a href="${escape(explanation.pdf)}" target="_blank" rel="noopener">제${exam.round}회 정답·해설 MD ↗</a> · <a href="${escape(explanation.source)}" target="_blank" rel="noopener noreferrer">해커스 원문 ↗</a></p>
      </section>` : ''}
      ${insightParts.length ? `<section class="deepen-insight" aria-label="심화 보충 정리"><h3>한눈에 이해하는 심화 보충 정리</h3>${insightParts.join('')}</section>` : ''}
    `;
  }

  function renderStandaloneQuestion(target, state) {
    const {round, number, selected = 0, siblingRefs = [], groupLabel = '', assetPrefix = '../assets/'} = state;
    const exam = (window.HISTORY_EXAMS || []).find(item => item.round === round);
    const question = exam?.questions?.[number - 1];
    if (!exam || !question) {
      target.innerHTML = '<div class="empty"><h2>요청한 문항을 찾을 수 없어요.</h2><p>회차(60~80회)와 문항 번호(1~50번)를 다시 확인해 주세요.</p></div>';
      return;
    }
    const ref = `${round}-${number}`;
    const content = window.HISTORY_CHOICES?.[ref];
    const revealed = selected >= 1 && selected <= 5;
    const pictures = Boolean(content?.options.every(option => option.image && !option.text) && content.options.some(option =>
      (option.crop[2] - option.crop[0]) * question.width / ((option.crop[3] - option.crop[1]) * question.height) < 3.5));

    const siblingNav = siblingRefs.length > 1 ? `
      <nav class="solo-siblings" aria-label="함께 묶인 문항 이동">
        <span class="small muted">${escape(groupLabel || '함께 묶인 문항')}:</span>
        <div class="solo-sibling-pills">
          ${siblingRefs.map(item => {
            const parsed = parseRef(item);
            if (!parsed) return '';
            const current = parsed.ref === ref;
            return `<button type="button" class="solo-pill" data-solo-switch="${parsed.ref}" aria-current="${current}">${parsed.round}회 ${parsed.number}번</button>`;
          }).join('')}
        </div>
      </nav>` : '';

    target.innerHTML = `
      ${siblingNav}
      <div class="solo-question-meta">
        <span class="pill">제${exam.round}회 심화 · ${question.number}번</span>
        <span class="pill">${question.points}점</span>
        <span class="small muted">보기를 누르면 바로 정답과 해설이 표시돼요</span>
      </div>
      ${content?.stem.length > 1 ? '<p class="small muted" style="margin:0 0 10px">공통 자료와 이번 문제의 지문을 나누어 표시했어요.</p>' : ''}
      ${renderStemFragments(exam, question, content, assetPrefix)}
      <fieldset class="options ${content ? 'content-options' : ''} ${pictures ? 'picture-options' : ''}">
        <legend>${revealed ? '선택한 답과 정답 (다른 보기를 눌러 비교해 볼 수 있어요)' : '보기를 눌러 정답을 바로 확인해 보세요'}</legend>
        <div class="option-grid">
          ${symbols.map((symbol, index) => {
            const value = index + 1;
            const status = revealed ? (value === question.answer ? 'right' : value === selected ? 'wrong' : '') : '';
            const option = content?.options?.[index];
            const description = option ? `: ${option.text || option.alt || '원본 이미지 보기'}` : '';
            const image = option?.image ? `<img src="${assetPrefix}${escape(option.image)}" width="${Math.round((option.crop[2] - option.crop[0]) * question.width)}" height="${Math.round((option.crop[3] - option.crop[1]) * question.height)}" alt="${escape(option.alt || `${value}번 보기의 원본 이미지`)}" loading="lazy" decoding="async">` : '';
            return `${option ? '<div class="option-card">' : ''}<label class="option ${status} ${option?.image ? 'image-option' : ''}"><input type="radio" name="solo-answer-${ref}" data-solo-answer="${value}" value="${value}" ${selected === value ? 'checked' : ''} aria-label="${value}번 보기${escape(description)}${revealed && value === question.answer ? ', 정답' : ''}"><span class="option-number">${symbol}</span>${option ? `<span class="option-content">${option.text ? `<span class="option-text">${escape(option.text)}</span>` : ''}${image}</span>${revealed && (value === question.answer || value === selected) ? `<span class="option-state">${value === question.answer ? (selected === value ? '내 선택 · 정답' : '정답') : '내 선택 · 오답'}</span>` : ''}` : ''}</label>${option?.image ? `<a class="option-enlarge" href="${assetPrefix}${escape(option.image)}" target="_blank" rel="noopener" aria-label="${value}번 보기 이미지 확대">보기 이미지 확대 ↗</a>` : ''}${option ? '</div>' : ''}`;
          }).join('')}
        </div>
      </fieldset>
      ${revealed ? renderFeedbackDetails(exam, question, selected) : ''}
      <div class="image-links solo-source-links">
        <a href="${assetPrefix}${escape(question.image)}" target="_blank" rel="noopener">원본 문제지 이미지 크게 보기 ↗</a>
        <a href="${escape(exam.paper)}#page=${question.page}" target="_blank" rel="noopener">원본 PDF ${question.page}쪽 ↗</a>
        <a href="../test/index.html?round=${exam.round}&amp;q=${question.number}&amp;mode=practice" target="_blank" rel="noopener">제${exam.round}회 전체 문항에서 보기 ↗</a>
      </div>
    `;
  }

  function soloUrl(round, number, siblingRefs = []) {
    const params = new URLSearchParams({round: String(round), q: String(number)});
    if (siblingRefs.length > 1 && siblingRefs.length <= 12) {
      params.set('refs', siblingRefs.join(','));
    }
    return `../test/solo.html?${params.toString()}`;
  }

  // 1) Study Page Modal Controller
  const dialog = document.querySelector('#question-dialog');
  if (dialog) {
    const body = dialog.querySelector('#solo-question-body');
    const titleEl = dialog.querySelector('#solo-dialog-title');
    const extLink = dialog.querySelector('#solo-external-link');
    let currentState = null;

    function updateModalHeader(parsed, siblingRefs) {
      titleEl.textContent = `제${parsed.round}회 심화 ${parsed.number}번 단독 연습`;
      if (extLink) extLink.href = soloUrl(parsed.round, parsed.number, siblingRefs);
    }

    async function openSoloModal(ref, siblingRefs = [], groupLabel = '') {
      const parsed = parseRef(ref);
      if (!parsed) return;
      currentState = {...parsed, selected: 0, siblingRefs, groupLabel};
      updateModalHeader(parsed, siblingRefs);
      if (!dialog.open) dialog.showModal();
      dialog.scrollTop = 0;

      if (!window.HISTORY_EXAMS || !window.HISTORY_CHOICES || !window.HISTORY_EXPLANATIONS) {
        body.innerHTML = '<p class="solo-loading" role="status">문항 자료와 보기를 불러오는 중이에요…</p>';
      }
      try {
        await ensureExamData('../');
        if (currentState?.ref !== parsed.ref) return;
        renderStandaloneQuestion(body, currentState);
      } catch (error) {
        body.innerHTML = `<div class="empty"><h2>문제를 불러오지 못했어요.</h2><p>${escape(error.message)}</p><a class="button secondary" href="${escape(soloUrl(parsed.round, parsed.number, siblingRefs))}" target="_blank" rel="noopener">새 창에서 직접 열기 ↗</a></div>`;
      }
    }

    document.addEventListener('click', event => {
      const link = event.target.closest('a[data-solo-ref]');
      if (!link) return;
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const group = link.closest('.exam-question-links');
      const siblingRefs = group
        ? [...group.querySelectorAll('a[data-solo-ref]')].map(a => a.dataset.soloRef).filter(Boolean)
        : [link.dataset.soloRef];
      const summaryText = link.closest('details')?.querySelector('summary')?.textContent?.split('·')[0]?.trim() || '함께 묶인 문항';
      openSoloModal(link.dataset.soloRef, siblingRefs.slice(0, 12), summaryText);
    });

    dialog.addEventListener('change', event => {
      const input = event.target.closest('input[data-solo-answer]');
      if (!input || !currentState) return;
      currentState.selected = Number(input.dataset.soloAnswer);
      renderStandaloneQuestion(body, currentState);
      dialog.querySelector(`input[data-solo-answer="${currentState.selected}"]`)?.focus({preventScroll: true});
    });

    dialog.addEventListener('click', event => {
      if (event.target === dialog || event.target.closest('[data-close-solo]')) {
        dialog.close();
        return;
      }
      if (event.target.closest('[data-solo-reset]') && currentState) {
        currentState.selected = 0;
        renderStandaloneQuestion(body, currentState);
        return;
      }
      const switchBtn = event.target.closest('[data-solo-switch]');
      if (switchBtn && currentState) {
        openSoloModal(switchBtn.dataset.soloSwitch, currentState.siblingRefs, currentState.groupLabel);
      }
    });
  }

  // 2) Standalone Popup Page Controller (test/solo.html)
  const pageRoot = document.querySelector('#solo-page-root');
  if (pageRoot) {
    const params = new URLSearchParams(location.search);
    const initialRef = `${params.get('round') || ''}-${params.get('q') || ''}`;
    const rawSiblings = (params.get('refs') || '').split(',').map(s => s.trim()).filter( item => parseRef(item));
    const parsed = parseRef(initialRef);
    let pageState = parsed ? {...parsed, selected: 0, siblingRefs: rawSiblings} : null;

    const syncPageTitle = () => {
      if (!pageState) return;
      document.title = `제${pageState.round}회 ${pageState.number}번 단독 연습 · 한국사 한 걸음`;
      const heading = document.querySelector('#solo-page-heading');
      if (heading) heading.textContent = `제${pageState.round}회 심화 ${pageState.number}번`;
      const url = new URL(location.href);
      url.searchParams.set('round', pageState.round);
      url.searchParams.set('q', pageState.number);
      history.replaceState(null, '', url);
    };

    if (!pageState) {
      pageRoot.innerHTML = '<div class="empty"><h2>문항 번호가 올바르지 않아요.</h2><p>심화 학습 페이지에서 근거 문항을 다시 선택해 주세요.</p><a class="button secondary" href="../study/index.html">심화 학습으로 이동 →</a></div>';
    } else {
      syncPageTitle();
      ensureExamData('../').then(() => renderStandaloneQuestion(pageRoot, pageState)).catch(err => {
        pageRoot.innerHTML = `<div class="empty"><h2>문제를 불러오지 못했어요.</h2><p>${escape(err.message)}</p></div>`;
      });
    }

    pageRoot.addEventListener('change', event => {
      const input = event.target.closest('input[data-solo-answer]');
      if (!input || !pageState) return;
      pageState.selected = Number(input.dataset.soloAnswer);
      renderStandaloneQuestion(pageRoot, pageState);
      pageRoot.querySelector(`input[data-solo-answer="${pageState.selected}"]`)?.focus({preventScroll: true});
    });

    pageRoot.addEventListener('click', event => {
      if (event.target.closest('[data-solo-reset]') && pageState) {
        pageState.selected = 0;
        renderStandaloneQuestion(pageRoot, pageState);
        return;
      }
      const switchBtn = event.target.closest('[data-solo-switch]');
      if (switchBtn && pageState) {
        const next = parseRef(switchBtn.dataset.soloSwitch);
        if (!next) return;
        pageState = {...pageState, ...next, selected: 0};
        syncPageTitle();
        renderStandaloneQuestion(pageRoot, pageState);
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
    });

    document.querySelector('#close-solo-window')?.addEventListener('click', () => {
      window.close();
      setTimeout(() => { location.href = '../study/index.html'; }, 150);
    });
  }

  window.HistorySoloQuestion = {parseRef, renderStandaloneQuestion, soloUrl};
})();
