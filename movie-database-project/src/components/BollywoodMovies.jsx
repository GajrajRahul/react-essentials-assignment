import { useState, useMemo } from "react";
import "./BollywoodMovies.css";
import { bollywoodMovies } from "../utils/data";

const BollywoodMovies = () => {
  // const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [movies, setMovies] = useState(bollywoodMovies);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [isFavoriteSelected, setIsFavoriteSelected] = useState(false);

  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const getRatingCategory = (rating) => {
    if (rating >= 9.0) return "blockbuster";
    if (rating >= 8.5) return "superhit";
    if (rating >= 7.5) return "hit";
    return "average";
  };

  const handleFavoriteMovieChange = (movieId) => {
    setMovies((prev) => {
      return prev.map((movie) => {
        if (movie.id === movieId) {
          return { ...movie, isFavorite: !movie.isFavorite };
        }
        return movie;
      });
    });

    setFavoriteMovies((prev) => {
      return prev
        .map((movie) => {
          if (movie.id === movieId) {
            return { ...movie, isFavorite: !movie.isFavorite };
          }
          return movie;
        })
        .filter((movie) => movie.isFavorite);
    });
  };

  const sortedAndFilteredMovies = useMemo(() => {
    const currentMovies = isFavoriteSelected ? favoriteMovies : movies;
    const filteredMovies = currentMovies.filter((movie) => {
      const searchedText = searchText.toLowerCase();

      const matchesSearch =
        movie.title.toLowerCase().includes(searchedText) ||
        movie.genre.toLowerCase().includes(searchedText) ||
        movie.director.toLowerCase().includes(searchedText) ||
        movie.cast.some((actor) =>
          actor.toLowerCase().includes(searchedText),
        ) ||
        movie.year.toString().includes(searchText);

      const matchesGenre =
        selectedGenre === "All" || movie.genre === selectedGenre;

      return matchesSearch && matchesGenre;
    });

    return filteredMovies.sort((a, b) => {
      switch (sortBy) {
        case "year":
          return b.year - a.year;
        case "genre":
          return a.genre.localeCompare(b.genre);
        case "rating":
          return b.rating - a.rating;
        default:
          return a.title.localeCompare(b.title);
      }
    });
  }, [
    movies,
    searchText,
    selectedGenre,
    sortBy,
    isFavoriteSelected,
    favoriteMovies,
  ]);

  const genre = ["All", ...new Set(movies.map((movie) => movie.genre))];

  return (
    <div className="bollywood-movies">
      <h1>Bollywood Hits</h1>
      {/* {loading ? (
        <div className="loading-spinner">
          <p>Loading Bollywood Movies...</p>
        </div>
      ) : ( */}
        <div className="main-content">
          <div className="search-section">
            <input
              type="text"
              placeholder="Search Bollywood movies..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="search-input"
            />
            {searchText && (
              <p className="search-results">
                Founded {sortedAndFilteredMovies.length} movie
                {sortedAndFilteredMovies.length !== 1 ? "s" : ""} for{" "}
                {searchText}
              </p>
            )}
          </div>
          <div className="filter-section">
            <h4>Filter by Genre:</h4>
            <div className="genre-buttons">
              {genre.map((genre) => (
                <button
                  key={genre}
                  className={`genre-button ${selectedGenre === genre ? "active" : ""}`}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
          <div className="sort-favorite-section">
            <div className="sort-section">
              <label htmlFor="sort-select">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="title">Title (A-Z)</option>
                <option value="rating">Rating (High - Low)</option>
                <option value="year">Year (Newest First)</option>
                <option value="genre">Genre (A-Z)</option>
              </select>
            </div>
            <button
              className={`favorite-button ${isFavoriteSelected ? "active" : ""}`}
              onClick={() => {
                const moviesList = movies.filter((movie) =>
                  !isFavoriteSelected ? movie.isFavorite : movie,
                );
                setFavoriteMovies(moviesList);
                setIsFavoriteSelected((prev) => !prev);
              }}
            >
              Favorite
            </button>
          </div>
          {searchText ||
            (selectedGenre !== "All" && (
              <button
                className="clear-filters"
                onClick={() => {
                  setSearchText("");
                  setSelectedGenre("All");
                }}
              >
                Clear All Filters
              </button>
            ))}
          <div className="movies-grid">
            {sortedAndFilteredMovies.length > 0 ? (
              sortedAndFilteredMovies.map((movie) => (
                <div
                  className={`movie-card ${getRatingCategory(movie.rating)}`}
                  key={movie.id}
                >
                  <div className="movie-poster">
                    <span className="movie-favorite">
                      {movie.isFavorite ? (
                        <img
                          src="/custom-icons/favorited.svg"
                          alt="favorited movie"
                          onClick={() => {
                            alert(`${movie.title} removed from favorite`)
                            handleFavoriteMovieChange(movie.id)
                          }}
                        />
                      ) : (
                        <img
                          src="/custom-icons/favorite.svg"
                          alt="favorite movie"
                          onClick={() => {
                            alert(`${movie.title} added to favorite`);
                            handleFavoriteMovieChange(movie.id)
                          }}
                        />
                      )}
                    </span>
                    <img
                      src={movie.image}
                      alt={`${movie.title} poster`}
                      className="movie-image"
                    />
                  </div>
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="movie-year">
                    {movie.year} ({movie.genre})
                  </p>
                  {/* <p className="movie-genre">{movie.genre}</p> */}
                  <p className="movie-director">Dir: {movie.director}</p>
                  <p className="movie-cast">Cast: [{movie.cast.join(", ")}]</p>
                  <div
                    className={`movie-rating rating-${getRatingCategory(movie.rating)}`}
                  >
                    {movie.rating}/10
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <h3>No Bollywood Movies Found</h3>
                <p>
                  {searchText || selectedGenre !== "All"
                    ? "Try adjusting your search or filter criteria"
                    : "Start searching to find amazing Bollywood movies!"}
                </p>
              </div>
            )}
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default BollywoodMovies;
