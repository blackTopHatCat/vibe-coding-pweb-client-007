import React from 'react';
import '../../styles/Game.css';

const GameHistory = ({ history, currentMove, jumpTo }) => {
  return (
    <div className="game-history">
      <h3>Game History</h3>
      <div className="history-buttons">
        {history.map((_, move) => (
          <button
            key={move}
            className={`history-btn ${move === currentMove ? 'active' : ''}`}
            onClick={() => jumpTo(move)}
          >
            {move === 0 ? 'Go to game start' : `Go to move #${move}`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameHistory;
