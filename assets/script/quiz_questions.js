// This file defines an array of questions to be used for generating the quiz
// Each question object contains a question, an array of answer choices and the index of correct answer in the array
const quizQuestions = [{
    question: "How can you add a comment in JavaScript?",
    choices: [" //This is a comment",
        " <!--This is a comment-->",
        " 'This is a comment"],
    answer: 0
}, {
    question: "What will the following code return: Boolean(10 > 9)",
    choices: ["false",
        "true",
        "NaN"],
    answer: 1
}, {
    question: "Which event occurs when the user clicks on an HTML element?",
    choices: ["onchange",
        "onmouseover",
        "onclick",
        "onmouseclick"],
    answer: 2
}, {
    question: "How can you detect the client's browser name?",
    choices: ["client.navName",
        "browser.name",
        "navigator.appName"],
    answer: 2
}, {
    question: "How do you find the number with the highest value of x and y?",
    choices: [" top(x, y)",
        " Math.ceil(x, y)",
        "  Math.max(x, y)",
        "  ceil(x, y)"],
    answer: 2
}, {
    question: "How does a WHILE loop start?",
    choices: [" while (i <= 10; i++)",
        " while (i <= 10)",
        " while i = 1 to 10"],
    answer: 1
}, {
    question: "Where is the correct place to insert a JavaScript ?",
    choices: ["The < head > section",
        "Both the < head > section and the < body > section are correct",
        "The <body> section"],
    answer: 1
}, {
    question: "What is the correct JavaScript syntax to change the content of the HTML element below?\r\n\r\n" +
        "<p id=\"demo\">This is a demonstration.</p> \r\n",
    choices: [" document.getElementById(\"demo\").innerHTML = \"Hello World!\";",
        " #demo.innerHTML = \"Hello World!\";",
        "  document.getElement(\"p\").innerHTML = \"Hello World!\";",
        " document.getElementByName(\"p\").innerHTML = \"Hello World!\";"],
    answer: 0
}, {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings",
        "booleans",
        "alerts",
        "numbers"],
    answer: 2
}, {
    question: "The condition in an if / else statement is enclosed within ________.",
    choices: ["quotes",
        "parentheses",
        "curly brackets",
        "square brackets"],
    answer: 1
}, {
    question: "Arrays in JavaScript can be used to store ________.",
    choices: ["numbers and strings",
        "other arrays",
        "booleans",
        "all of the above"],
    answer: 3
}, {
    question: "String values must be enclosed within ________ when being assigned to variables.",
    choices: ["commas",
        "curly brackets",
        "quotes",
        "parentheses"],
    answer: 2
}, {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript",
        "terminal / bash",
        "for loops",
        "console.log"],
    answer: 3
}, {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["<javascript>",
        "<js>",
        "<scripting>",
        "<script>"],
    answer: 3
}, {
    question: "How do you write \"Hello World\" in an alert box?",
    choices: ["msg(\"Hello World\");",
        "alert(\"Hello World\");",
        "alertBox(\"Hello World\");",
        "msgBox(\"Hello World\");"],
    answer: 1
}, {
    question: "How do you write an IF statement for executing some code when \"i\" is NOT equal to 5?",
    choices: ["if(i <> 5)",
        "if i =! 5 then",
        "if(i != 5)",
        "if(not i = 5)"],
    answer: 2
}, {
    question: "Given the below code:\r\n" +
        "var a = [\"a\", \"b\", \"c\"]; \r\n" +
        "var b = [\"d\", \"e\", \"f\"]; \r\n" +
        "What is the result of a + b = ??\r\n",
    choices: ["[\"a\", \"b\", \"c\", \"d\", \"e\", \"f\"]",
        "\"abcdef\"",
        "' \"a\", \"b\", \"c\", \"d\", \"e\", \"f\"' ",
        "\"a,b,cd,e,f\""],
    answer: 3
}, {
    question: "What is the output of the below code?\r\n" +
        "var a; \r\n" +
        "if (a) \r\n" +
        "      return true;\r\n" +
        "else \r\n" +
        "      return false;",
    choices: ["True",
        "False",
        "JavaScript error"],
    answer: 1
}, {
    question: "What is the output of the below code?\r\n" +
        "var a; var b = \"\";\r\n" +
        "if (a == b) \r\n" +
        "      return true;\r\n" +
        "else \r\n" +
        "      return false;",
    choices: ["True",
        "False",
        "JavaScript error"],
    answer: 1
}, {
    question: "What is the output of the below code?\r\n" +
        "var a = true; var b = false; \r\n" +
        "if (a || b) \r\n" +
        "      return true;\r\n" +
        "else \r\n" +
        "      return false;",
    choices: ["True",
        "False",
        "JavaScript error"],
    answer: 0
}];