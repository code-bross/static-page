(() => {
  'use strict';
  const container = document.querySelector('#question-content');
  if (!container) return;

  const symbols = ['①', '②', '③', '④', '⑤'];
  const escape = value => String(value).replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));

  const supplements = {
    ...(window.DEEPEN_SUPPLEMENTS_EARLY || {}),
    ...(window.DEEPEN_SUPPLEMENTS_MODERN || {})
  };
  const conceptTitles = new Map((window.HISTORY_CONCEPTS || []).map(item => [item.id, item.title]));
  const examsByRound = new Map((window.HISTORY_EXAMS || []).map(exam => [exam.round, exam]));

  function enhanceFeedback() {
    const relatedSection = container.querySelector('.related-concepts');
    if (!relatedSection || container.querySelector('.deepen-insight')) return;

    const roundMatch = (document.querySelector('#exam-title')?.textContent || '').match(/제(\d+)회/);
    const numMatch = (container.querySelector('#question-title')?.textContent || '').match(/^(\d+)번/);
    if (!roundMatch || !numMatch) return;

    const round = Number(roundMatch[1]);
    const number = Number(numMatch[1]);
    const ref = `${round}-${number}`;
    const exam = examsByRound.get(round);
    const question = exam?.questions?.[number - 1];
    if (!question) return;

    const choiceData = window.HISTORY_CHOICES?.[ref];
    const correctOption = choiceData?.options?.[question.answer - 1];
    const correctText = correctOption?.text ? correctOption.text.replace(/\s+/g, ' ').trim() : '';

    const topicIds = window.HISTORY_TOPICS?.[ref] || [];
    const primaryId = topicIds[0];
    const primarySupplement = primaryId ? supplements[primaryId] : null;
    const primaryTitle = primaryId ? conceptTitles.get(primaryId) : '';

    const studyCards = (primaryId && window.DEEPEN_EXAM_STUDY?.[primaryId]?.points || [])
      .filter(point => point.refs.includes(ref));

    const parts = [];
    if (correctText) {
      parts.push(`<div class="insight-answer"><span class="insight-badge">정답 선지 바로 보기</span><p><strong>${symbols[question.answer - 1]}</strong> ${escape(correctText)}</p></div>`);
    }
    if (studyCards.length) {
      parts.push(...studyCards.map(card => `<div class="insight-card"><span class="insight-badge">이 문항 기출 포인트</span><h4>${escape(card.title)}</h4><p>${escape(card.text)}</p></div>`));
    }
    if (primarySupplement) {
      parts.push(`<div class="insight-summary"><div class="insight-summary-head"><span class="insight-badge">연결 단원 3줄 요약</span><strong>${escape(primaryTitle)}</strong></div><dl>${primarySupplement.summary.map(([label, desc]) => `<div><dt>${escape(label)}</dt><dd>${escape(desc)}</dd></div>`).join('')}</dl><p class="insight-trap"><strong>함정 주의:</strong> ${escape(primarySupplement.trap)}</p></div>`);
    }
    if (!parts.length) return;

    const box = document.createElement('section');
    box.className = 'deepen-insight';
    box.setAttribute('aria-label', '심화 보충 해설과 단원 요약');
    box.innerHTML = `<h3>한눈에 이해하는 심화 보충 정리</h3>${parts.join('')}`;
    relatedSection.before(box);
  }

  const observer = new MutationObserver(() => enhanceFeedback());
  observer.observe(container, {childList: true});
  enhanceFeedback();
})();
