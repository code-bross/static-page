/**
 * OMR Card Manager for CBT Exam System
 */

class OMRCard {
  constructor({ containerEl, totalQuestions = 100, onSelectQuestion }) {
    this.containerEl = containerEl;
    this.totalQuestions = totalQuestions;
    this.onSelectQuestion = onSelectQuestion;
    this.currentFilter = 'all'; // 'all', 'unanswered', 'answered', 'bookmark'
    this.userAnswers = {}; // { [qId]: optionIndex }
    this.bookmarks = new Set();
    this.activeQuestionId = 1;
  }

  setAnswers(answers) {
    this.userAnswers = { ...answers };
    this.render();
  }

  setBookmarks(bookmarks) {
    this.bookmarks = new Set(bookmarks);
    this.render();
  }

  setActiveQuestion(qId) {
    this.activeQuestionId = qId;
    this.updateActiveState();
  }

  setFilter(filter) {
    this.currentFilter = filter;
    this.render();
  }

  render() {
    if (!this.containerEl) return;
    this.containerEl.innerHTML = '';

    const grid = document.createElement('div');
    grid.className = 'omr-grid';

    for (let i = 1; i <= this.totalQuestions; i++) {
      const isAnswered = this.userAnswers[i] !== undefined && this.userAnswers[i] !== null;
      const isBookmarked = this.bookmarks.has(i);

      // Apply filtering
      if (this.currentFilter === 'unanswered' && isAnswered) continue;
      if (this.currentFilter === 'answered' && !isAnswered) continue;
      if (this.currentFilter === 'bookmark' && !isBookmarked) continue;

      const item = document.createElement('div');
      item.className = 'omr-item';
      item.dataset.id = i;

      if (i === this.activeQuestionId) item.classList.add('active-q');
      if (isAnswered) item.classList.add('answered');
      if (isBookmarked) item.classList.add('bookmark');

      const numSpan = document.createElement('span');
      numSpan.className = 'omr-item-num';
      numSpan.textContent = i;

      const ansSpan = document.createElement('span');
      ansSpan.className = 'omr-item-ans';
      ansSpan.textContent = isAnswered ? `[${this.userAnswers[i]}]` : '-';

      item.appendChild(numSpan);
      item.appendChild(ansSpan);

      item.addEventListener('click', () => {
        if (this.onSelectQuestion) {
          this.onSelectQuestion(i);
        }
      });

      grid.appendChild(item);
    }

    this.containerEl.appendChild(grid);
  }

  updateActiveState() {
    const items = this.containerEl.querySelectorAll('.omr-item');
    items.forEach((item) => {
      const qId = parseInt(item.dataset.id, 10);
      if (qId === this.activeQuestionId) {
        item.classList.add('active-q');
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        item.classList.remove('active-q');
      }
    });
  }

  getAnsweredCount() {
    return Object.keys(this.userAnswers).filter(
      (k) => this.userAnswers[k] !== undefined && this.userAnswers[k] !== null
    ).length;
  }
}

window.OMRCard = OMRCard;
