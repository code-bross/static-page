/**
 * Timer Manager for CBT Exam System
 */

class ExamTimer {
  constructor({ totalMinutes = 120, onTick, onExpire }) {
    this.totalSeconds = totalMinutes * 60;
    this.remainingSeconds = this.totalSeconds;
    this.elapsedSeconds = 0;
    this.timerId = null;
    this.isRunning = false;
    this.mode = 'exam'; // 'exam' or 'practice'
    this.onTick = onTick || (() => {});
    this.onExpire = onExpire || (() => {});
  }

  setMode(mode) {
    this.mode = mode;
    this.onTick(this.getFormattedTime(), this.isWarning());
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    this.timerId = setInterval(() => {
      if (this.mode === 'exam') {
        this.remainingSeconds--;
        this.elapsedSeconds++;

        if (this.remainingSeconds <= 0) {
          this.remainingSeconds = 0;
          this.stop();
          this.onTick(this.getFormattedTime(), true);
          this.onExpire();
          return;
        }
      } else {
        // Practice mode stopwatch
        this.elapsedSeconds++;
      }

      this.onTick(this.getFormattedTime(), this.isWarning());
    }, 1000);
  }

  pause() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.isRunning = false;
  }

  reset(totalMinutes = 120) {
    this.pause();
    this.totalSeconds = totalMinutes * 60;
    this.remainingSeconds = this.totalSeconds;
    this.elapsedSeconds = 0;
    this.onTick(this.getFormattedTime(), false);
  }

  isWarning() {
    return this.mode === 'exam' && this.remainingSeconds <= 600; // <= 10 mins
  }

  getFormattedTime() {
    const secToUse = this.mode === 'exam' ? this.remainingSeconds : this.elapsedSeconds;
    const hours = Math.floor(secToUse / 3600);
    const mins = Math.floor((secToUse % 3600) / 60);
    const secs = secToUse % 60;

    const pad = (n) => String(n).padStart(2, '0');
    if (hours > 0) {
      return `${pad(hours)}:${pad(mins)}:${pad(secs)}`;
    }
    return `${pad(mins)}:${pad(secs)}`;
  }
}

window.ExamTimer = ExamTimer;
