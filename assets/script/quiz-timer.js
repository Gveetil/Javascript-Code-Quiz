
/** This class provides utility methods to work with the quiz timer */
class QuizTimer {
    /** The total time allocated for the quiz in seconds -- 2 minutes */
    totalTimeAllocated = 120;
    /** The penalty for a wrong answer in the quiz / seconds lost -- 10 seconds */
    wrongAnswerPenalty = 10;
    /** The custom event type published by this class when the time is updated */
    timeUpdatedEventType = "timeupdated";
    secondsElapsed = 0;
    timeoutInterval = null;

    /**
     * Applies a time penalty by subtracting time from the timer clock
     */
    applyTimePenalty() {
        this.secondsElapsed = this.secondsElapsed + this.wrongAnswerPenalty - 1;
        if (this.secondsElapsed > this.totalTimeAllocated)
            this.secondsElapsed = this.totalTimeAllocated;
        this.updateTime(this);
    }

    /**
     * Starts the quiz timer
     */
    start() {
        this.timeoutInterval = setInterval(this.updateTime.bind(this), 1000);
    }

    /**
     * Stops the quiz timer
     */
    stop() {
        clearTimeout(this.timeoutInterval);
        this.timeoutInterval = null;
    }

    /**
     * Appends an event handler for the time updated event. 
     * @param {function} handler function to be invoked when the event is dispatched. 
     */
    addEventListener(handler) {
        window.addEventListener(this.timeUpdatedEventType, handler);
    }

    /**
     * Increments the time on the timer object provided and fires a custom event to notify listeners of the change
     */
    updateTime() {
        this.secondsElapsed++;
        var timeRemaining = 0;
        if (this.totalTimeAllocated > this.secondsElapsed) {
            timeRemaining = this.totalTimeAllocated - this.secondsElapsed;
        }
        var formattedTime = this.getFormattedTime(timeRemaining);
        var updateTimeEvent = new CustomEvent(this.timeUpdatedEventType, { detail: { time: timeRemaining, displayTime: formattedTime } });
        window.dispatchEvent(updateTimeEvent);
        // If the timer has completed, stop execution
        if (timeRemaining == 0)
            this.stop();
    }

    /**
     * Formats the given time in M:SS format 
     * @param {number} totalSeconds the total seconds as an integer
     * @returns {string} the formatted time
     */
    getFormattedTime(totalSeconds) {
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = "00" + (totalSeconds % 60);
        return minutes + ":" + seconds.substr(seconds.length - 2);
    }
}
