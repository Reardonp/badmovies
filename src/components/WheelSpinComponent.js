import React, { useState, useEffect } from "react";
import { Wheel } from "paramall-wheel-of-fortune";
import { MovieInfo } from "./MovieInfo";
import { renderHtml } from "./renderHtml";

const WheelSpin = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(null);
  const [prizeText, setPrizeText] = useState("");
  const [movies, setMovies] = useState([]);
  const [movieJson, setMovieJson] = useState("");

  useEffect(() => {
    const startTime = performance.now();
    fetch("http://localhost:8888/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const options = data.movies.map((movie) => ({ option: movie }));
        setMovies(options);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      })
      .finally(() => {
        const endTime = performance.now();
        console.log(`Time taken to fetch movies: ${endTime - startTime} milliseconds`);
      });
  }, []);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * movies.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    // renderHtml(prizeNumber, movies, setMovieJson);
  };

  const onStopSpinning = () => {
    //console.log(movies[prizeNumber].option);
    setPrizeText(movies[prizeNumber].option);
    setMustSpin(false);
    //console.log("prizeText " + prizeText);
    renderHtml(prizeNumber, movies, setMovieJson);
  };

  return (
    <>
      <button onClick={handleSpinClick}>SPIN</button>
      <MovieInfo movieJson={movieJson} />
      {movies.length > 0 && (
        <>
          <div>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={movies}
              backgroundColors={["#3e3e3e", "#df3428"]}
              textColors={["#ffffff"]}
              innerRadius={5}
              onStopSpinning={onStopSpinning}
            />
          </div>
        </>
      )}
    </>
  );
};

export default WheelSpin;
