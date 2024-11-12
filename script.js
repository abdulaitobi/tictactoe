let counter = 0;
var winningValues = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8] //  winning sequences
];

// function for player turns
function turnCounter(val) {
    return val === 0 ? 1 : 0;
}

//  console gameboard
const gameBoard = {
    array: Array(9).fill(null)
};

const playerOne = {
    marker: "X",
    positions: []
};

const playerTwo = {
    marker: "O",
    positions: []
};

//  function to check if a player has won
function checkWin(player) {
    return winningValues.some(combination => 
        combination.every(index => player.positions.includes(index))
    );
}

//  function to disable cells after game is finished
function disableCells() {
    const elements = document.querySelectorAll('.cell');
    elements.forEach(element => {
        element.removeEventListener('click',handleClick);
    });
}

function handleClick(event) {
    document.getElementById('refreshBtn').addEventListener('click', function(){
        location.reload();
    });
    let cell = parseInt(event.target.id, 10); // Convert cell ID to number
    if (gameBoard.array[cell] !== null) {
        alert('Cell taken');
        return;
    }

    if (counter === 0) {
        event.target.innerHTML += '<i class="fa-solid fa-x fa-7x"></i>';
        gameBoard.array[cell] = playerOne.marker;
        playerOne.positions.push(cell);
        event.target.removeEventListener('click', handleClick); // Disable click listener for this cell
        if (checkWin(playerOne)) {
            document.getElementById('winner').innerHTML = "Player One Wins!";
            disableCells(); // Disable all further moves after player one wins
            return;
        }
    } else {
        event.target.innerHTML += '<i class="fa-solid fa-o fa-7x"></i>';
        gameBoard.array[cell] = playerTwo.marker;
        playerTwo.positions.push(cell);
        event.target.removeEventListener('click', handleClick); // Disable click listener for this cell
        if (checkWin(playerTwo)) {
            document.getElementById('winner').innerHTML = "Player Two Wins!";
            disableCells(); // Disable all further moves after player two wins
            return;
        }
    }

    // Check for a draw
    if (gameBoard.array.every(cell => cell !== null)) {
        document.getElementById('winner').innerHTML = "It's a draw!";
        disableCells(); // Disable further moves in case of a draw
        return;
    }

    counter = turnCounter(counter);
}

function game() {
    const elements = document.querySelectorAll('.cell');
    elements.forEach((element) => {
        element.addEventListener('click', handleClick);
    });
}

game();