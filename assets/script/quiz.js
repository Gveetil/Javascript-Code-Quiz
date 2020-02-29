// Note: This javascript file references classes and functions from score-helper.js, quiz_questions.js, and quiz-timer.js

// Quiz Page Elements referenced by this code
var quizQuestionEl = document.querySelector("#quiz-question");
var answerChoicesListEl = document.querySelector("#answer-choices-list");
var quizQuestionSectionEl = document.querySelector("#quiz-question-section");
var quizResultSectionEl = document.querySelector("#quiz-result-section");
var submitButtonEl = document.querySelector("#submit-data");
var userInitialsInputEl = document.querySelector("#user-initials");
var answerStatusMessageEl = document.querySelector("#answer-status-message");
var formValidationMessageEl = document.querySelector("#form-validation-message");
var finalScoreDisplayEl = document.querySelector("#final-score");
var viewScoresLinkEl = document.querySelector("#view-scores");
var currentQuestionNumberEl = document.querySelector("#current-question-number");
var totalQuestionsEl = document.querySelector("#total-questions");
var timerDisplayEl = document.querySelector("#timer-display");

// styling to be applied to the quiz answer options list items
const listItemStyle = "list-group-item rounded quiz-bg-color text-white mr-auto my-1 px-3 p-1";
var questionIndex = 0;
var questionResultTimeout = null;
var currentScore = 0;
var isQuizCompleted = false;
var UserScoreHelper = new ScoreHelper();
var quizTimer = new QuizTimer();

/** This function Initializes the quiz and is called when the page is loaded up */
function initializeQuiz() {
    //Sort the questions randomly 
    quizQuestions.sort(function (a, b) { return 0.5 - Math.random() });
    renderQuestion(quizQuestions[questionIndex]);
    totalQuestionsEl.textContent = quizQuestions.length;
    // Start the quiz timer 
    quizTimer.start();
}

/**
 * Renders the data from the question object to the user interface
 * @param {{question: string, choices: string[], answer: number}} question the question object to be rendered 
 */
function renderQuestion(question) {
    quizQuestionEl.textContent = question.question;
    currentQuestionNumberEl.textContent = questionIndex + 1;
    answerChoicesListEl.textContent = "";
    for (var index = 0; index < question.choices.length; index++) {
        var listItemDisplayText = (index + 1) + ". ";
        listItemDisplayText += question.choices[index];
        createListItem(index, listItemDisplayText);
    }
}

/**
 * This function creates a new list item in the answer choices list 
 * @param {number} listIndex the index of the list item
 * @param {string} displayValue the text to be displayed in the list item
 */
function createListItem(listIndex, displayValue) {
    var listItem = document.createElement("li");
    listItem.textContent = displayValue;
    listItem.setAttribute("class", listItemStyle);
    listItem.setAttribute("id", listIndex);
    answerChoicesListEl.appendChild(listItem);
}

/** loads the next question from the quiz questions */
function loadNextQuestion() {
    hideStatusMessage();
    questionIndex++;
    // Display the question if it exists, else end the quiz and show results
    if (questionIndex < quizQuestions.length)
        renderQuestion(quizQuestions[questionIndex]);
    else {
        quizTimer.stop();
        showResultsPane();
    }
}

/** Hides the answer correct / incorrect message */
function hideStatusMessage() {
    clearTimeout(questionResultTimeout);
    questionResultTimeout = null;
    answerStatusMessageEl.style.display = "none";
}

/**
 * Updates the score or applies a penalty based on user's answer selection. 
 * Also displays a success / failure message to the user
 * @param {boolean} selectionStatus the answer selection status - true if the selection is correct
 */
function updateUserAnswer(selectionStatus) {
    if (selectionStatus) {
        answerStatusMessageEl.textContent = "Correct!";
        currentScore++;
    }
    else {
        answerStatusMessageEl.textContent = "Wrong!";
        quizTimer.applyTimePenalty();
    }
    answerStatusMessageEl.style.display = "block";
}

/** Ends the quiz and displays the results / save score form */
function showResultsPane() {
    isQuizCompleted = true;
    currentQuestionNumberEl.parentElement.style.display = "none";
    finalScoreDisplayEl.textContent = currentScore;
    quizQuestionSectionEl.style.display = "none";
    quizResultSectionEl.style.display = "block";
}

function answerChoicesList_Clicked(event) {
    if (questionResultTimeout == null && event.target.matches("li") === true) {
        var selectionStatus = quizQuestions[questionIndex].answer == event.target.id;
        // Show selection status message  
        updateUserAnswer(selectionStatus);
        // Wait before loading the new question so user can read status
        questionResultTimeout = setTimeout(loadNextQuestion, 600);
    }
}

function ViewScoresLink_Clicked(event) {
    var userMessage;
    // Confirm if the user wishes to leave the page and redirect to view scores page
    if (isQuizCompleted)
        userMessage = "Your score will not be saved. \nDo you wish to continue? ";
    else
        userMessage = "This action will exit the Quiz. \nDo you wish to continue? ";
    if (!confirm(userMessage))
        event.preventDefault();
}

function submitButton_Clicked() {
    event.preventDefault();
    var userInitials = userInitialsInputEl.value.trim();
    // Save score and go to view scores page if successful, else display validation message 
    if (userInitials != "") {
        UserScoreHelper.addScore(new UserScore(userInitials, currentScore));
        window.location.href = "view-scores.html";
    } else {
        formValidationMessageEl.textContent = "Please enter your initials!";
        formValidationMessageEl.style.display = "block";
    }
}

function quizTimer_timeUpdated(event) {
    if (!isQuizCompleted) {
        timerDisplayEl.textContent = event.detail.displayTime;
        // End the quiz if the timer reaches 0
        if (event.detail.time == 0) {
            hideStatusMessage();
            showResultsPane();
        }
    }
}

// Attach event handlers
answerChoicesListEl.addEventListener("click", answerChoicesList_Clicked);
viewScoresLinkEl.addEventListener("click", ViewScoresLink_Clicked);
submitButtonEl.addEventListener("click", submitButton_Clicked);
quizTimer.addEventListener(quizTimer_timeUpdated);

// initialize the quiz 
initializeQuiz();