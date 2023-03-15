import React, { useState, useEffect } from "react";
import { Wheel } from "paramall-wheel-of-fortune";
import MovieInfo from "./MovieInfo";
import { renderHtml } from "./renderHtml";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/style.css";

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
        if (options.length % 2 === 0) {
          options.push({ option: "respin idiot" });
          setMovies(options);
        } else {
          options.push({ option: "respin idiot" });
          console.table(options);
          setMovies(options);
        }
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      })
      .finally(() => {
        const endTime = performance.now();
        console.log(
          `Time taken to fetch movies: ${endTime - startTime} milliseconds`
        );
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

  const pointer = {
    //src: 'path/to/image.png',
    // style: {
    //   border: '1px solid green',
    // },
  };

  return (
    <>
      <Container>
        <Row>
          <Col sm={8}>
            <h1>Spin The Wheel</h1>
            <Button onClick={handleSpinClick}>SPIN</Button>
          </Col>
        </Row>
        <Row>
          <MovieInfo movieJson={movieJson} />
        </Row>

        {movies.length > 0 && (
          <>
            <Container>
              <Row>
                <Col sm={12}>
                  <div className="wheel" id="wheeldiv">
                    <Wheel
                      classname="rotate-36deg"
                      mustStartSpinning={mustSpin}
                      prizeNumber={prizeNumber}
                      data={movies}
                      backgroundColors={["#3e3e3e", "#df3428"]}
                      textColors={["#ffffff"]}
                      innerRadius={20}
                      radiusLineWidth={0}
                      spinDuration={0.5}
                      pointerProps={pointer}
                      textDistance={70}
                      onStopSpinning={onStopSpinning}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </>
        )}
      </Container>
    </>
  );
};

export default WheelSpin;
