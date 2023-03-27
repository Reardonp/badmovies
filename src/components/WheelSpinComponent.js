import React, { useState, useEffect } from "react";
import { Wheel } from "paramall-wheel-of-fortune";
import MovieInfo from "./MovieInfo";
//import Button from "react-bootstrap/Button";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../styles/style.css";

const WheelSpin = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(null);
  const [prizeText, setPrizeText] = useState("");
  const [movies, setMovies] = useState([]);
  const [movieJson, setMovieJson] = useState("");
  const [loadMovieDataDiv, setLoadMovieDataDiv] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
          // console.table(options);
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

  useEffect(() => {
    if(prizeNumber){
      if (prizeNumber !== null && movies.length > prizeNumber) {
        fetch(`http://localhost:8888/nfo?folderName=${movies[prizeNumber].option}`)
          .then(response => response.ok ? response.json() : Promise.reject(new Error(`HTTP error! status: ${response.status}`)))
          .then(data => {
            console.log(data.movie.title);
            setMovieJson(data);
          })
          .catch(error => console.error("Error posting prize:", error));
      } 
    }
  },[prizeNumber]);

  const handleSpinClick = () => {
    console.log("spin clicked");
    const newPrizeNumber = Math.floor(Math.random() * movies.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setIsVisible(false);
    // renderHtml(prizeNumber, movies, setMovieJson);
  };

  const onStopSpinning = () => {
    console.log("Stop spinning");
    setPrizeText(movies[prizeNumber].option);
    setMustSpin(false);
    setIsVisible(true)
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
        <div className="">
        {isVisible ===true && <Row>
          {<MovieInfo movieJson={movieJson}/>}
        </Row>}
        </div>
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
