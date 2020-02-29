// Note: This javascript file references classes and functions from score-helper.js 

// View Scores Page Elements referenced by this code
var scoreTableEl = document.querySelector("#score-table");
var backButtonEl = document.querySelector("#go-back");
var clearScoresButtonEl = document.querySelector("#clear-scores");
var UserScoreHelper = new ScoreHelper();

/** 
 * This function fetches user scores from the local storage 
 * and renders them as rows in the score table
 */
function renderScoreTable() {
    var currScoreList = UserScoreHelper.getScores();
    // Clear the table 
    scoreTableEl.innerHTML = "";
    if (currScoreList.length > 0) {
        // Update table with user scores
        for (var index = 0; index < currScoreList.length; index++) {
            var row = createScoreTableRow();
            addColumnToRow(row, (index + 1), true);
            addColumnToRow(row, currScoreList[index].initials);
            addColumnToRow(row, currScoreList[index].score);
        }
    } else {
        // No user scores found - display message to user
        var row = createScoreTableRow();
        var column = addColumnToRow(row, "No Scores Found");
        column.setAttribute("colspan", "3");
        column.setAttribute("class", "text-center");
    }
}

/** 
 * This function creates a new row in score table and returns the same
 * @returns {HTMLTableRowElement} the new row as an element
 */
function createScoreTableRow() {
    var newRow = document.createElement("tr");
    scoreTableEl.appendChild(newRow);
    return newRow;
}

/**
 * This function creates a new column in given row and returns the same 
 * @param {HTMLTableRowElement} row the row element
 * @param {string} columnText column display value 
 * @param {boolean} [isHeader = false] true to create the column as a row header
 * @returns {HTMLTableColElement} the new column element 
 */
function addColumnToRow(row, columnText, isHeader = false) {
    var newColumn;
    if (isHeader) {
        newColumn = document.createElement("th");
    }
    else
        newColumn = document.createElement("td");
    newColumn.textContent = columnText;
    row.appendChild(newColumn);
    return newColumn;
}

function clearScoresButton_Click() {
    UserScoreHelper.clearScores();
    renderScoreTable();
}

function backButton_Click() {
    window.location.href = "index.html";
}

// Attach event handlers
clearScoresButtonEl.addEventListener("click", clearScoresButton_Click);
backButtonEl.addEventListener("click", backButton_Click);

// Render the score table when page is loaded
renderScoreTable();

