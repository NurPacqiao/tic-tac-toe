
const Player = (name, marker) => {
    let score = 0; // 1. Store the score here
    
    const getScore = () => score; // 2. Allow the game to read the score
    const addWin = () => score++; // 3. Allow the game to increase the score
    
    return { name, marker, getScore, addWin };
};

// 1. Gameboard Module: Handles the logic of the board array
const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const setField = (index, marker) => {
        if (index > 8 || board[index] !== "") return false;
        board[index] = marker;
        return true;
    };

    const getField = (index) => board[index];

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return { setField, getField, reset };
})();

// 2. DisplayController Module: Handles ONLY the DOM/HTML stuff
const DisplayController = (() => {
    const cells = document.querySelectorAll(".cell");
    const messageElement = document.querySelector(".navbar-brand");
    const restartBtn = document.getElementById("reset-btn");
    const startBtn = document.getElementById("start-btn");
    const p1ScoreDisplay = document.getElementById("score1"); // Select the score text
    const p2ScoreDisplay = document.getElementById("score2"); // Select the score text

    // UPDATED: Select the new "Invisible Inputs" directly
    const p1Input = document.getElementById("p1-name");
    const p2Input = document.getElementById("p2-name");

    const updateGameboard = () => {
        for (let i = 0; i < 9; i++) {
            const field = Gameboard.getField(i);
            cells[i].innerText = field;
            
            // Reset to base classes
            cells[i].className = "cell bg-white border rounded shadow-sm d-flex align-items-center justify-content-center fs-1 fw-bold";
            
            // Apply colors based on X or O
            if (field === "X") cells[i].classList.add("text-danger");
            if (field === "O") cells[i].classList.add("text-primary");
        }
    };

    const setMessage = (message) => {
        messageElement.innerText = message;
    };

    // UPDATED: Just grab the value straight from the header-inputs
    const getPlayerNames = () => {
        return {
            player1: p1Input.value || "Player 1",
            player2: p2Input.value || "Player 2"
        };
    };

    const updateButtonText = (text) => {
        startBtn.innerText = text;
    };

    const updateScore = (score1, score2) => {
        p1ScoreDisplay.innerText = score1;
        p2ScoreDisplay.innerText = score2;
    };

    return { 
        cells, 
        messageElement, 
        restartBtn, 
        startBtn, 
        updateGameboard, 
        setMessage, 
        getPlayerNames,
        updateButtonText,
        updateScore
    };
})();

// 3. GameController Module: The Brain (Flow of the game)
const GameController = (() => {
    let player1;
    let player2;
    let currentPlayer;
    let isGameOver = false;

    // Defines the winning combinations
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    const start = () => {
        const names = DisplayController.getPlayerNames();
if (!player1) {
            player1 = Player(names.player1, "X");
            player2 = Player(names.player2, "O");
        }
        currentPlayer = player1;
        isGameOver = false;

        Gameboard.reset();
        DisplayController.updateGameboard();
        DisplayController.setMessage(`${currentPlayer.name}'s turn (${currentPlayer.marker})`);
        DisplayController.updateButtonText("Restart Game");
    };

    const playRound = (index) => {
        if (isGameOver) return;
        
        // Try to place marker; if successful, proceed
        if (Gameboard.setField(index, currentPlayer.marker)) {
            DisplayController.updateGameboard();
            
            if (checkWinner(index)) {
                DisplayController.setMessage(`${currentPlayer.name} wins!`);
                isGameOver = true;

                currentPlayer.addWin(); // 1. Add point to internal memory
                DisplayController.updateScore(player1.getScore(), player2.getScore()); // 2. Update screen

                DisplayController.updateButtonText("Play Again");
                return;
            }
            
            if (checkTie()) {
                DisplayController.setMessage("It's a tie!");
                isGameOver = true;
                DisplayController.updateButtonText("Play Again");
                return;
            }

            // Switch Player
            currentPlayer = (currentPlayer === player1) ? player2 : player1;
            DisplayController.setMessage(`${currentPlayer.name}'s turn (${currentPlayer.marker})`);
        }
    };

    const checkWinner = () => {
        return winningCombinations.some((combination) => {
            return combination.every((index) => {
                return Gameboard.getField(index) === currentPlayer.marker;
            });
        });
    };

    const checkTie = () => {
        // If no empty strings represent empty cells, it's a tie
        for (let i = 0; i < 9; i++) {
            if (Gameboard.getField(i) === "") return false;
        }
        return true;
    };

    // Initialize Event Listeners
    DisplayController.cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if(!player1) start(); // Auto-start if they click board first
            playRound(index);
        });
    });

    DisplayController.startBtn.addEventListener("click", start);
    DisplayController.restartBtn.addEventListener("click", () => {
        // Full Reset (Wipes Score)
        player1 = null; 
        player2 = null;
        DisplayController.updateScore(0, 0); 
        start();
    });

    return { start };
})();