import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./App.css";
import searchIcon from "./search.svg";

// http://www.omdbapi.com/?i=tt3896198&apikey=8f9a4692
//8f9a4692

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=8f9a4692";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  useEffect(() => {
    searchMovies("Superman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };
  
  return (
    <div className="app">
      <h1>MovieBox</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(j) => {
            if (j.key === 13) {
              searchMovies(searchTerm);
            }
          }}
        />
        <img src={searchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
