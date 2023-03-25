export function renderHtml(prizeNumber, movies, setMovieJson, setLoadMovieDataDiv) {
  if (prizeNumber !== null && movies.length > prizeNumber) {
    fetch(`http://localhost:8888/nfo?folderName=${movies[prizeNumber].option}`)
      .then(response => response.ok ? response.json() : Promise.reject(new Error(`HTTP error! status: ${response.status}`)))
      .then(data => {
        console.log(data.movie.title);
        setMovieJson(data);
        setLoadMovieDataDiv(true);
      })
      .catch(error => console.error("Error posting prize:", error));
  }
}
