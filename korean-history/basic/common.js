(() => {
  'use strict';
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function warn(message) {
    const notice = document.querySelector('#storage-notice');
    if (notice) {
      notice.textContent = message;
      notice.hidden = false;
    }
  }
  function load(key, fallback, validate) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return fallback;
      const value = JSON.parse(raw);
      if (validate(value)) return value;
      warn('저장된 학습 기록의 형식이 올바르지 않습니다. 이 화면에서는 새 기록으로 시작합니다.');
      return fallback;
    } catch (error) {
      if (!(error instanceof SyntaxError || error instanceof DOMException)) throw error;
      warn('학습 기록을 읽을 수 없습니다. 현재 화면은 사용할 수 있지만 이전 기록을 불러오지 못했습니다.');
      return fallback;
    }
  }
  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      if (!(error instanceof DOMException)) throw error;
      warn('브라우저에 기록을 저장하지 못했습니다. 페이지를 닫으면 현재 진행 내용이 사라질 수 있습니다.');
    }
  }
  const exams = window.HISTORY_EXAMS;
  const concepts = window.HISTORY_CONCEPTS;
  const topics = window.HISTORY_TOPICS;
  const conceptById = new Map(concepts.map(concept => [concept.id, concept]));
  const attemptKey = round => `kh-basic-attempt-${round}-v1`;
  const validAttempt = value => value && Array.isArray(value.answers) && value.answers.length === 50 &&
    value.answers.every(answer => Number.isInteger(answer) && answer >= 0 && answer <= 4) &&
    Array.isArray(value.marked) && value.marked.every(number => Number.isInteger(number) && number >= 1 && number <= 50) &&
    Number.isInteger(value.current) && value.current >= 0 && value.current < 50 &&
    typeof value.submitted === 'boolean' && Number.isFinite(value.remaining) && value.remaining >= 0 && value.remaining <= 4200 &&
    (value.deadline === null || (Number.isFinite(value.deadline) && value.deadline > 0));
  const readAttempt = round => load(attemptKey(round), null, validAttempt);
  const grade = (exam, answers) => exam.questions.reduce((result, question, index) => {
    if (answers[index] === question.answer) {
      result.score += question.points;
      result.correct++;
    } else if (answers[index] === 0) {
      result.unanswered++;
    } else {
      result.wrong++;
    }
    return result;
  }, {score:0,correct:0,wrong:0,unanswered:0});
  const conceptLinks = questionId => (topics[questionId] || []).map(id => {
    const concept = conceptById.get(id);
    return `<a class="button secondary" href="../study/index.html#${id}">${escape(concept.title)} →</a>`;
  }).join('');
  window.HistoryApp = {escape, warn, load, save, exams, concepts, topics, conceptById, attemptKey, validAttempt, readAttempt, grade, conceptLinks};
})();
