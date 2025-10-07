import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";
import appCss from "./App.module.css";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // КРИТИЧЕСКИЙ ФИКС: Храним объект Movie, а не ID
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // 2. Функции для управления модальным окном
  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  // 3. Функция для обработки запроса от SearchBar
  const handleSearchSubmit = async (query: string) => {
    // ИСПРАВЛЕНИЕ: Очищаем НОВОЕ состояние selectedMovie
    setSelectedMovie(null);

    setMovies([]);
    setError(null);
    setIsLoading(true);
    try {
      const results = await fetchMovies(query);

      if (results.length === 0) {
        toast.error(`No movies found for your request: "${query}"`);
      }

      setMovies(results);
    } catch (err) {
      const errorMessage = "An unexpected error occurred during search.";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={appCss.appRoot}>
      <SearchBar onSubmit={handleSearchSubmit} />
      <div>
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {movies.length > 0 && !isLoading && !error && (
          <>
            <div className={appCss.resultsMessage}>
              <p>Found {movies.length} movies.</p>
            </div>
            {/* MovieGrid: Передает полный объект Movie */}
            <MovieGrid movies={movies} onSelect={handleMovieSelect} />
          </>
        )}
        {!isLoading && !error && movies.length === 0 && (
          <div className={appCss.resultsMessage}>
            <p>Enter a keyword to search for movies. </p>
          </div>
        )}
      </div>

      {/* MovieModal: Передает объект Movie, а не ID */}
      {selectedMovie !== null && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}

      <Toaster position="top-right" />
    </div>
  );
}
