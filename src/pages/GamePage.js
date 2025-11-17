import React, { useState } from 'react';
import Board from '../components/Game/Board';
import GameHistory from '../components/Game/GameHistory';
import { useAuth } from '../context/AuthContext';
import '../styles/Game.css';

const GamePage = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
          winner: squares[a],
          winningLine: lines[i]
        };
      }
    }
    return { winner: null, winningLine: null };
  };

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const handleSquareClick = (i) => {
    if (currentSquares[i] || calculateWinner(currentSquares).winner) {
      return;
    }

    const nextSquares = currentSquares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    handlePlay(nextSquares);
  };

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  };

  const { winner, winningLine } = calculateWinner(currentSquares);
  const isDraw = !winner && currentSquares.every(square => square !== null);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game-page">
      <div className="game-header">
        <h1>Tic-Tac-Toe</h1>
        <p>Welcome, {user?.username}! Ready to play?</p>
      </div>

      <div className="game-container">
        <div className="game-board">
          <div className="game-status">{status}</div>
          <Board 
            squares={currentSquares}
            onClick={handleSquareClick}
            winningLine={winningLine}
          />
          <button onClick={resetGame} className="reset-btn">
            New Game
          </button>
        </div>

        <div className="game-sidebar">
          <GameHistory 
            history={history}
            currentMove={currentMove}
            jumpTo={jumpTo}
          />
          
          <div className="game-stats">
            <h3>Game Rules</h3>
            <ul>
              <li>Players take turns placing X and O</li>
              <li>First to get 3 in a row wins</li>
              <li>Click history to revisit moves</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
