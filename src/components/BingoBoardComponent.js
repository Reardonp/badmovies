import React from 'react';
import '../styles/BingoBoard.css';
import tropes from '../movietropes.json';

function BingoBoard({ boardSize }) {
  const freeSpaceIndex = Math.floor(boardSize / 2);

  // Shuffle the movies array using the Fisher-Yates shuffle algorithm
  const shuffledMovies = [...tropes].sort(() => Math.random() - 0.5);

  // Create the bingo board array and populate it with the shuffled movies
  const bingoBoard = new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(null));
  let index = 0;
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (i === freeSpaceIndex && j === freeSpaceIndex) {
        bingoBoard[i][j] = 'Free Space';
      } else {
        bingoBoard[i][j] = shuffledMovies[index];
        index++;
      }
    }
  }
  

  return (
    <div>
      <h2>Bingo Board</h2>
      <div className="bingo-grid" style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}>
        {bingoBoard.map((row, i) =>
          row.map((movie, j) => (
            <div
              key={`${i}-${j}`}
              className={`bingo-cell ${i === freeSpaceIndex && j === freeSpaceIndex ? 'free-space' : ''}`}
            >
              {movie}
            </div>
          ))
        )}
      </div>
    </div>
  );
}


export default BingoBoard;
