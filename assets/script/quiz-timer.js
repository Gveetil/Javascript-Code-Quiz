/** The total time allocated for the quiz in seconds -- 2 minutes */
const totalTimeAllocated = 120;
/** The penalty for a wrong answer in the quiz / seconds lost -- 10 seconds */
const wrongAnswerPenalty = 10;
/** Name of custom event type published by the quiz timer when the time is updated */
const timeUpdatedEventType = "timeupdated";

/** This class provides utility methods to work with the quiz timer */
class QuizTimer {
    // Initialize class variables
    constructor() {
        this.secondsElapsed = 0;
        this.timeoutInterval = null;
    }

    /**
     * Applies a time penalty by subtracting time from the timer clock
     */
    applyTimePenalty() {
        this.secondsElapsed = this.secondsElapsed + wrongAnswerPenalty - 1;
        if (this.secondsElapsed > totalTimeAllocated)
            this.secondsElapsed = totalTimeAllocated;
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
        window.addEventListener(timeUpdatedEventType, handler);
    }

    /**
     * Increments the time on the timer object provided and fires a custom event to notify listeners of the change
     */
    updateTime() {
        this.secondsElapsed++;
        var timeRemaining = 0;
        if (totalTimeAllocated > this.secondsElapsed) {
            timeRemaining = totalTimeAllocated - this.secondsElapsed;
        }
        var formattedTime = this.getFormattedTime(timeRemaining);
        var updateTimeEvent = new CustomEvent(timeUpdatedEventType, { detail: { time: timeRemaining, displayTime: formattedTime } });
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
