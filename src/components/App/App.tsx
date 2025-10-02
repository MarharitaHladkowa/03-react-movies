import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal"; // Восстановлено
import type { Movie } from "../../types/movie";
import appCss from "./App.module.css";

export default function App() {
  // 1. Состояния для управления данными
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // ВОССТАНОВЛЕНО: Храним ID для модального окна
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  // 2. Функции для управления модальным окном (ВОССТАНОВЛЕНЫ)
  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovieId(movie.id);
  };

  const handleCloseModal = () => {
    setSelectedMovieId(null);
  };

  // 3. Функция для обработки запроса от SearchBar
  // Использует исправленный контракт: (query: string)
  const handleSearchSubmit = async (query: string) => {
    setSelectedMovieId(null);
    setMovies([]);
    setError(null);
    setIsLoading(true);

    try {
      const results = await fetchMovies(query);

      if (results.length === 0) {
        toast.error(`No movies found for your request: "${query}"`);
      }

      setMovies(results); // Сохраняем полученные фильмы
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
      {/* SearchBar: Использует исправленный onSubmit */}
      <SearchBar onSubmit={handleSearchSubmit} />
      <div>
        {/* 1. Если идет загрузка, показываем Loader */}
        {isLoading && <Loader />}
        {/* 2. Если есть ошибка, показываем ErrorMessage */}
        {error && <ErrorMessage message={error} />}
        {/* 3. Если есть фильмы, показываем сетку */}
        {movies.length > 0 && !isLoading && !error && (
          <>
            <div className={appCss.resultsMessage}>
              <p>Found {movies.length} movies.</p>
            </div>
            {/* MovieGrid: onSelect передает ID */}
            <MovieGrid movies={movies} onSelect={handleMovieSelect} />
          </>
        )}
        {/* 4. Начальное сообщение или после пустого поиска */}
        {!isLoading && !error && movies.length === 0 && (
          <div className={appCss.resultsMessage}>
            <p>Enter a keyword to search for movies. </p>
          </div>
        )}
      </div>

      {/* MovieModal: ВОССТАНОВЛЕНА ПЕРЕДАЧА ID */}
      {selectedMovieId !== null && (
        <MovieModal movieId={selectedMovieId} onClose={handleCloseModal} />
      )}

      <Toaster position="top-right" />
    </div>
  );
}
