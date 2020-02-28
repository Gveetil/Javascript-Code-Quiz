// Index Page Elements referenced by this code
var startQuizButtonEl = document.querySelector("#start-quiz");

function startQuizButton_Clicked() {
    window.location.href = "quiz.html";
}

// Attach event handlers
startQuizButtonEl.addEventListener("click", startQuizButton_Clicked);
