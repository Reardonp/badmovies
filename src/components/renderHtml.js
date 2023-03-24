export function renderHtml(prizeNumber, movies, setMovieJson, setLoadMovieDataDiv) {
  console.log(prizeNumber)
  if (prizeNumber !== null && movies.length > prizeNumber) {
    fetch(`http://localhost:8888/nfo?folderName=${movies[prizeNumber].option}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.movie.title);
        
        return [setMovieJson(data), setLoadMovieDataDiv(true)];
      })
      .catch((error) => {
        console.error("Error posting prize:", error);
      });
  } else {
    return null;
  }
}
