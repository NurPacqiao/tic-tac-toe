const player1 = 'X';
const player2 = 'O';

function play(){
    const gameboard = Array(9).fill(null);

    function gamePlay(){
        const elements = [player1, player2];
        return elements[Math.floor(Math.random() * elements.length)];
    }

    function togglePlayers(player){
        return player === player1 ? player2 : player1;
    }

    function checkWinner(board, player){
        const winningStates = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for(let state of winningStates){
            let [a, b, c] = state;
            if(board[a] === player && board[b] === player && board[c] === player) return true;
        }
        return false;
    }

    function printBoard(board) {
        for (let i = 0; i < 3; i++) {
            let row = "";
            for (let j = 0; j < 3; j++) {
                let cell = board[i * 3 + j]; // calculate correct index
                row += (cell ? cell : "_") + " "; // print _ for empty cells
            }
            console.log(row.trim());
        }
    }

    return function playRound(){
        let currentPlayer = gamePlay();
        let notUsed = [0, 1, 2, 3, 4, 5, 6, 7, 8];

        for(let i = 0; i < 9; i++){
            let index = Math.floor(Math.random() * notUsed.length);
            let cell = notUsed[index];
            gameboard[cell] = currentPlayer;
            notUsed.splice(index, 1);
        
            if(checkWinner(gameboard, currentPlayer)){
                console.log(`${currentPlayer} wins!`);

                console.log("Final board:");
                printBoard(gameboard);
                return;
            }

            currentPlayer = togglePlayers(currentPlayer);
        }

        console.log("It's a tie!");
        printBoard(gameboard);
    }  
}

const start = play();

start();