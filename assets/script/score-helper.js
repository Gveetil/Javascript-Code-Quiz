/** This class represents a user's score*/
class UserScore {
    constructor(initials, score) {
        this.initials = initials;
        this.score = score;
    }
}

/** This class provides utility methods to work with user scores and save / retrieve them from local storage */
class ScoreHelper {
    /** Key used to access the user scores from the local storage */
    javascript_quiz_score = "javascript_quiz_score";

    /** Fetches the user scores from the local storage 
     * @returns {Array.<UserScore>} an array of user score objects */
    getScores() {
        var jsScoreList = JSON.parse(window.localStorage.getItem(this.javascript_quiz_score));
        if (jsScoreList == null) {
            jsScoreList = [];
        }
        return jsScoreList;
    }

    /** Saves the given user scores into local storage 
     * @param {Array.<UserScore>} scoreList an array of user score objects */
    saveScores(scoreList) {
        window.localStorage.setItem(this.javascript_quiz_score, JSON.stringify(scoreList));
    }

    /** Adds a new user score to the local storage
     * @param {UserScore} newScore the user score object to be added 
     */
    addScore(newScore) {
        // Load the current scores
        var scoreList = this.getScores();
        var insertPosition = scoreList.length;
        // Order scores and find index where score needs to be inserted
        for (var index in scoreList) {
            if (scoreList[index].score < newScore.score) {
                insertPosition = index;
                break;
            }
        }
        // Add the new score and save it 
        scoreList.splice(insertPosition, 0, newScore);
        this.saveScores(scoreList);
    }

    /** Clears the user scores local storage */
    clearScores() {
        window.localStorage.setItem(this.javascript_quiz_score, null);
    }
}
