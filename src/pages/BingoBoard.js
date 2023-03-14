import React, { useState, useEffect } from 'react';
import BingoBoard from '../components/BingoBoardComponent';
import movies from '../movies.json';
import tropes from '../movietropes.json';


function Board() { 
  const [moviesData, setMoviesData] = useState([]);
  const [boardSize, setBoardSize] = useState(5);
  const [disableIncreaseButton, setDisableIncreaseButton] = useState(false);
  const minBoardSize = 3;
  const [shouldShuffle, setShouldShuffle] = useState(false);

  useEffect(() => {
    setMoviesData(movies);
  }, []);

  useEffect(() => {
    // Calculate the maximum board size that can be used based on the number of movies
    const maxBoardSize = Math.floor(Math.sqrt(tropes.length));

    // Disable the "Increase board size" button if the maximum board size is less than the current board size
    setDisableIncreaseButton(maxBoardSize < boardSize);
  }, [boardSize, moviesData]);
  

  const handleIncreaseBoardSize = () => {
    if (disableIncreaseButton) {
      return;
    }

    setBoardSize(boardSize + 2);
  };
  function handleDecreaseBoardSize() {
    if (boardSize - 2 >= minBoardSize) {
      setBoardSize(boardSize - 2);
    }
  }

  return (
    <div>
      <h1>Bad Movie Bingo</h1>
      <button onClick={() => setShouldShuffle(!shouldShuffle)}>Shuffle board</button>
      <button onClick={handleDecreaseBoardSize} disabled={boardSize - 2 < minBoardSize}>
        Decrease board size
      </button>
      <button onClick={handleIncreaseBoardSize} disabled={disableIncreaseButton}>
        Increase board size
      </button>

      <div className='bingo-container'>
      <BingoBoard boardSize={boardSize}/>
      </div>
      {disableIncreaseButton && (
        <p>You cannot increase the board because there are not enough movies in the list to fill the board.</p>
      )}
    </div>
  );
}

export default Board;
