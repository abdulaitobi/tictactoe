let counter = 0;
var winningValues = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
// function for player turns
function turnCounter(val) {
    return val === 0 ? 1 : 0;
}

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

function game(){
    for(let i = 0; i < winningValues.length; i++){
        if(winningValues[i].every(element => playerOne.positions.includes(element))) {
            console.log("You win");
            return;
        }
        else if(winningValues[i].every(element => playerTwo.positions.includes(element))){
            console.log("You lose");
            return;
        }
        else if(gameBoard.array.every(element => element !== null && element !== undefined)){
            console.log("Its a draw");
            return;
        }
    }
    let cell = parseInt(prompt("Enter the cell number (0-8): Player" + counter+1));
    if(gameBoard.array[cell] !== null){
        console.log('cell taken');
        game();
    }
    else{
        if(counter === 0){
            gameBoard.array[cell] = playerOne.marker;
            playerOne.positions.push(cell);
        } 
        else{
            gameBoard.array[cell] = playerTwo.marker;
            playerTwo.positions.push(cell);
        }
        counter = turnCounter(counter);
    }
    console.log("Game Board:", gameBoard.array);
    game();
}

game();