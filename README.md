❌⭕ Tic-Tac-Toe
A modern, responsive, browser-based Tic-Tac-Toe game built with vanilla JavaScript, HTML5, and Bootstrap.

This project focuses on writing clean, modular JavaScript code using Factory Functions and the Module Pattern to minimize global scope pollution and separate concerns effectively.

🌟 Key Features
Clean UI: Minimalist design with a focus on usability.

Local 2-Player Mode: Play against a friend on the same device.

Smart Score Tracking: The game tracks wins for Player X and Player O. Scores persist through multiple rounds but reset on a hard refresh.

Editable Player Names: Click directly on "Player 1" or "Player 2" to type custom names (Inline Editing).

Responsive Design: Fully playable on mobile and desktop devices.

🛠️ Built With
HTML5 - Semantic markup.

CSS3 - Custom styling + Bootstrap 5 for grid and responsive utilities.

JavaScript (ES6+) - Game logic.

🧠 Architecture & Design Patterns
The core goal of this project was to move away from "spaghetti code" and implement strict architectural patterns.

1. The Module Pattern (IIFE)

I used Immediately Invoked Function Expressions (IIFEs) for components where only one instance is needed. This encapsulates variables and keeps the global namespace clean.

Gameboard: Manages the state of the board array (["X", "", "O", ...]) and prevents direct modification from the console.

DisplayController: Handles all DOM manipulation. It renders the array to the grid, updates the scoreboard, and listens for click events.

GameController: The "brain" of the game. It controls the flow (whose turn it is), checks for win conditions, and manages the game loop.

2. Factory Functions

I used Factory Functions for objects where multiple instances are needed.

Player: Generates player objects containing their name, marker ('X' or 'O'), and their private score count.

📂 Project Structure
Plaintext
/tic-tac-toe
│
├── index.html # Main markup
├── style.css # Custom styles + Bootstrap overrides
├── script.js # Game logic (Factories & Modules)
└── README.md # Project documentation
🚀 How to Run
Clone the repository:

git clone https://github.com/your-username/tic-tac-toe.git
Open the project: Navigate to the project folder and open index.html in your preferred browser.

🔮 Future Improvements
AI Opponent: Implement a Minimax algorithm for an unbeatable CPU mode.

Animations: Add smooth transitions for X/O placement and winning lines.

Dark Mode: A toggle for dark/light themes.

👤 Author
NurPacqiao

LinkedIn

GitHub

This project is part of The Odin Project curriculum.
