import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function MovieInfo({ movieJson }) {
  function renderMovieInfo() {
    if (movieJson) {
      // Function to embed the trailer link
      function embedTrailerLink(trailerLink) {
        // Extract the video ID from the link
        const videoId = trailerLink.split("videoid=")[1];
        // Return the embedded video player with the video ID
        return (
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              title="trailer"
              className="embed-responsive-item"
              src={`https://www.youtube.com/embed/${videoId}`}
              allowFullScreen
            />
          </div>
        );
      }

      return (
        <>
          <div>
            <Container>
              <Row>
                <Col sm={4}>
                  {movieJson.movie.thumb[0]._ ? (
                    <img
                      src={movieJson.movie.thumb[0]._}
                      alt="BigCo Inc. logo"
                      style={{ width: "100%" }}
                    />
                  ) : null}
                </Col>
                <Col sm={8}>
                  
                  <h1>{movieJson.movie.title[0] || "Missing data"}</h1>
                  <Row><Col sm={6}>
                   
                  <p>
                    <b>Year: </b>
                    {movieJson.movie.premiered[0]
                      ? new Date(
                          movieJson.movie.premiered[0]
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                        })
                      : "Missing data"}
                  </p>
                  <p>
                    <b>Runtime: </b>
                    {movieJson.movie.runtime[0] + " minutes" || "Missing data"}
                  </p>
                  <p>
                    <b>Rating: </b>
                    {movieJson.movie.mpaa[0] || "Missing data"}
                  </p>
                  <p>
                    <b>Genre: </b>
                    {movieJson.movie.genre && movieJson.movie.genre.length > 0
                      ? movieJson.movie.genre.join(", ")
                      : "Missing data"}
                  </p>
                  </Col>
                  <Col sm={6}>{movieJson.movie.trailer &&
                    movieJson.movie.trailer.length > 0 &&
                    embedTrailerLink(movieJson.movie.trailer[0])}
                   
                    </Col> </Row>
                  <p>
                    <b>Plot: </b>
                    <br />
                    {movieJson.movie.plot[0] || "Missing data"}
                  </p>
                  <p>
                    <b>Tags: </b>
                    <br />
                    {movieJson.movie.tag && movieJson.movie.tag.length > 0
                      ? movieJson.movie.tag.join(", ")
                      : "Missing data"}
                  </p>
                  
                </Col>
              </Row>
            </Container>
          </div>
        </>
      );
    } else {
      return <p>No data available</p>;
    }
  }

  return <>{renderMovieInfo()}</>;
}
export default MovieInfo;
