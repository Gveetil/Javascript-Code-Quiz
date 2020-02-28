
/** This class provides utility methods to work with the quiz timer */
class QuizTimer {
    /** The total time allocated for the quiz in seconds -- 2 minutes */
    static totalTimeAllocated = 120;
    /** The penalty for a wrong answer in the quiz / seconds lost -- 15 seconds */
    static wrongAnswerPenalty = 15;
    /** The custom event type published by this class when the time is updated */
    static timeUpdatedEventType = "timeupdated";
    secondsElapsed = 0;
    timeoutInterval = null;

    /**
     * Applies a time penalty by subtracting time from the timer clock
     */
    applyTimePenalty() {
        this.secondsElapsed = this.secondsElapsed + QuizTimer.wrongAnswerPenalty - 1;
        if (this.secondsElapsed > QuizTimer.totalTimeAllocated)
            this.secondsElapsed = QuizTimer.totalTimeAllocated;
        this.updateTime(this);
    }

    /**
     * Starts the quiz timer
     */
    start() {
        this.timeoutInterval = setInterval(this.updateTime, 1000, this);
    }

    /**
     * Stops the quiz timer
     */
    stop() {
        clearTimeout(this.timeoutInterval);
        this.timeoutInterval = null;
    }

    /**
     * Increments the time on the timer object provided and fires a custom event to notify listeners of the change
     * @param {QuizTimer} quizTimer the timer object to be updated
     */
    updateTime(quizTimer) {
        quizTimer.secondsElapsed++;
        var timeRemaining = 0;
        if (QuizTimer.totalTimeAllocated > quizTimer.secondsElapsed) {
            timeRemaining = QuizTimer.totalTimeAllocated - quizTimer.secondsElapsed;
        }
        var updateTimeEvent = new CustomEvent(QuizTimer.timeUpdatedEventType, { detail: { time: timeRemaining } });
        window.dispatchEvent(updateTimeEvent);
        // If the timer has completed, stop execution
        if (timeRemaining == 0)
            quizTimer.stop();
    }
}

// An instance of this class is made available on the window object so it can be accessed directly from the page
window.quizTimer = new QuizTimer();