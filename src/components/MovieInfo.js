import React from "react";

export function MovieInfo({ movieJson }) {
  function renderMovieInfo() {
    if (movieJson) {
      return (
        <>
          <div>
            <h1>{movieJson.movie.title[0]}</h1>
            <h3>{movieJson.movie.mpaa[0]}</h3>
            <h3>{movieJson.movie.genre[0]}</h3>
            <p>{movieJson.movie.plot[0]}</p>

            <img
              src={movieJson.movie.thumb[0]._}
              alt="BigCo Inc. logo"
              style={{ maxHeight: "700px" }} />
          </div>
        </>
      );
    } else {
      return <p>No data available</p>;
    }
  }

  return <>{renderMovieInfo()}</>;
}
