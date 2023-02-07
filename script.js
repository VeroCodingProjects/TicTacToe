let completedCells = 0;
const ticTacToeBoard = [];
let resetButton = reset;

// adding a eventListener to each cell in the board
for (let i = 1; i <= 9; ++i) {
    let currentPlayer = document.getElementById(i);
    currentPlayer.addEventListener("click", function() {
        updateStatus(currentPlayer);
    });
}

// when the button is clicked, the game starts again from the beggining
resetButton.onclick = ()=> {
    location.reload(); 
}

// this is the main function of the game, updating the status of the game
// gets the current player, updates the board and marks the cell that was completed
function updateStatus(currentPlayer) {
    if (completedCells % 2 == 0 && currentPlayer.id !== "completed") {
        updateBoard(currentPlayer, 'X');
        currentPlayer.innerText = "X";
        ++completedCells;
    } else if (currentPlayer.id !== "completed" && completedCells % 2 == 1) {
        updateBoard(currentPlayer, '0');
        currentPlayer.innerText = "0";
        ++completedCells;
    }
    changeId(currentPlayer);
    winnerUpdate();
}

// gets the index of the current cell and changes its id
function changeId(currentCell) {
    currentCell.id = "completed";
}

// complete the string according to the id with the symbol of the current player
function updateBoard(currentPlayer, player) {
    ticTacToeBoard[currentPlayer.id] = player;
}

// check every valid configuration to win the game
function checkStatus(player) {
    //  checking lines
    if ((ticTacToeBoard[1] === player && ticTacToeBoard[2] === player && ticTacToeBoard[3] === player) ||
        (ticTacToeBoard[4] === player && ticTacToeBoard[5] === player && ticTacToeBoard[6] === player) ||
        (ticTacToeBoard[7] === player && ticTacToeBoard[8] === player && ticTacToeBoard[9] === player)) {
        return true;
    }
    // checking columns
    if  ((ticTacToeBoard[1] === player && ticTacToeBoard[4] === player && ticTacToeBoard[7] === player) ||
        (ticTacToeBoard[2] === player && ticTacToeBoard[5] === player && ticTacToeBoard[8] === player) ||
        (ticTacToeBoard[3] === player && ticTacToeBoard[6] === player && ticTacToeBoard[9] === player)) {
        return true; 
    }
    // checking diagonals
    if ((ticTacToeBoard[1] === player && ticTacToeBoard[5] === player && ticTacToeBoard[9] === player) ||
        (ticTacToeBoard[3] === player && ticTacToeBoard[5] === player && ticTacToeBoard[7] === player)) {
        return true;
    }
    return false;
}

// if the game is won, the winning player will be congratulated
// if there is no winner, a suggestive message will be displayed
function winnerUpdate() {
    if (checkStatus('X') == true) {
        endGame('X'); 
    } else if (checkStatus('0') == true) {
        endGame('0');
    } else if (completedCells == 9) {
        endGame('No player');
    }
}

// We reset the game after one winner is picked
function endGame(player) {
    board.style.display = "none";
    winner.innerText += player + " won the game!";
}