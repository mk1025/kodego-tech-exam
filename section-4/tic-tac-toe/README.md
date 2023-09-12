# Tic-Tac-Toe Game by Mark Roland Alueta

## Description

A Tic-Tac-Toe game made using Vite React with Typescript and TailwindCSS. This is a technical exam submission I made for [KodeGo](https://kodego.ph/).

## Prerequisites

Even though this might be unnecessary to say, if you are new to web development or programming in particular, you should know the following and have them installed:

- [Node.js](https://nodejs.org/en/) REQUIRED

## Installation and Setup

1. Open a terminal.

   - **Windows**: use either _Powershell_, _Command Prompt_ or _[Git Bash](https://git-scm.com)_.
     - or simply `⊞ Win + R` and type `cmd` and it will open the terminal for you.
   - **Linux**: use _Bash_.
     - I don't own a Linux machine so use whatever you have.

2. Clone the repository. Navigate to a directory where you want to clone the repository (e.g. Make any folder and maybe just put it in your desktop). Run the following command to clone the repository:

   ```bash
   git clone https://github.com/mk1025/kodego-tech-exam.git
   ```

3. Navigate to the folder:

   ```bash
   cd kodego-tech-exam/section-4/tic-tac-toe
   ```

4. After cloning the repository, run the following command to install the project dependencies:

   ```bash
   npm install
   ```

5. Run the following command to test the project:

   ```bash
   npm run dev
   ```

6. Visit the project in your browser at [localhost:5173](http://localhost:5173/) or [127.0.0.1:5173](http://127.0.0.1:5173/).

   - **Note**: If the port is different, you don't need to change it. Just visit the link that is provided from the terminal.

## Usage

- When the game starts, the current player is displayed at the top of the screen.

- Click on an empty square to make your move.
  The game will automatically switch to the next player after each move.

- If a player gets three symbols in a row, they will be declared the winner.

- To reset or restart the game, click the "Reset or Restart Game" button.

## Code

The only file where all the important code for how the game works is located at:

```bash
/src/App.tsx
```

I have included some comments for each functions or specific lines of code in the file for you to read.

You don't need to explore other files.

## Compromises and Future Improvements

In the interest of time and simplicity, the following compromises were made:

The game currently does not handle error cases such as invalid moves or game over scenarios.
The game does not include features such as a score tracker or a computer AI opponent.
The styling of the game is kept minimalistic for simplicity.
In future iterations or with more time, the following improvements could be made:

- Implement error handling and validation for moves to prevent invalid moves.
- Add a computer AI opponent with different difficulty levels.
- Enhance the styling and user interface to make it more visually appealing.
- Please note that this README is a high-level overview of the project. For more detailed information, please refer to the code comments and the code itself.

## That is it

Thank you for reading!
