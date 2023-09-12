import { useState } from "react";
import "./App.css";

function App() {
	const [board, setBoard] = useState<Array<string>>(Array(9).fill("")); // Init the board
	const [currentPlayer, setCurrentPlayer] = useState<string>("X"); // Init the current player
	const [winner, setWinner] = useState<string>(""); // Init the winner

	const handleSquareClick = (index: number) => {
		if (board[index] === "" && !winner) {
			const newBoard = [...board]; // Copy the board
			newBoard[index] = currentPlayer; // Update the board
			setBoard(newBoard); // Update the board state
			calculateWinner(newBoard, currentPlayer); // Calculate if there's a possible winner
			setCurrentPlayer(currentPlayer === "X" ? "O" : "X"); // Update the current player
		}
	};

	// Calculate if there's a possible winner
	const calculateWinner = (board: Array<string>, player: string) => {
		// All the possible combinations for a win
		const winPatterns: Array<Array<number>> = [
			// Rows
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			// Columns
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			// Diagonals
			[0, 4, 8],
			[2, 4, 6],
		];

		// Check if there's a winner
		for (const pattern of winPatterns) {
			const [a, b, c] = pattern; // Get the values of the pattern
			if (board[a] === player && board[b] === player && board[c] === player) {
				// ^If there's matching values (3 in this case)
				setWinner(player); // Winner found
				break;
			}
		}
	};

	// If you want to reset the game or restart if someone wins.
	const handleReset = () => {
		setBoard(Array(9).fill("")); // Reset the board
		setCurrentPlayer("X"); // Reset the current player
		setWinner(""); // Reset the winner
	};

	return (
		<>
			<div className='flex flex-col gap-5 justify-center items-center h-screen'>
				<h1 className='text-lg font-bold'>Tic Tac Toe </h1>
				<h2 className='text-md font-medium mb-5'>by Mark Roland Alueta</h2>
				<h3>
					Current Player: <b>{currentPlayer}</b>
				</h3>
				<div className='grid grid-cols-3 gap-4'>
					{/* This is where the board will be. Makes a square for each index in the board. */}
					{/* Note: I used map instead of for loop. */}
					{board.map((square, index) => (
						<div
							key={square + index}
							onClick={() => handleSquareClick(index)}
							className='group bg-none border-2 border-gray-300 hover:border-blue-400 w-[100px] h-[100px] p-4 text-6xl font-bold text-center cursor-pointer rounded'
						>
							{square || (!winner && <span className='text-white group-hover:text-neutral-200'>{currentPlayer}</span>)}
						</div>
					))}
				</div>

				{/* Displays the Winner if there is */}
				{winner && (
					<div className='mt-4'>
						<p className='text-2xl font-md'>
							Winner: <b>{winner}</b>
						</p>
					</div>
				)}

				{/* Reset or Restart Button */}
				<button
					className='bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-2'
					onClick={handleReset}
				>
					Reset or Restart Game
				</button>
			</div>
		</>
	);
}

export default App;
