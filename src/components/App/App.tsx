import { useState } from "react";
import { fetchMovies } from "../../services/movieService"; // fetchMovieDetails теперь не нужен
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie"; // MovieDetails теперь не нужен в App
import appCss from "./App.module.css";

export default function App() {
  // 1. Состояния для управления данными и UI
  const [movies, setMovies] = useState<Movie[]>([]); // Для хранения результатов
  const [isLoading, setIsLoading] = useState<boolean>(false); // Для индикации загрузки поиска
  const [error, setError] = useState<string | null>(null); // Для хранения ошибок
  // ИСПРАВЛЕНО: Храним только ID выбранного фильма
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  // УДАЛЕНО: const [isModalLoading, setIsModalLoading] = useState<boolean>(false);

  // 2. Функции для управления модальным окном
  // КОРРЕКТНЫЙ КОНТРАКТ: принимает объект Movie, устанавливает его ID
  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovieId(movie.id); // Устанавливаем только ID
  };

  // ИСПРАВЛЕНО: Очищаем ID, а не несуществующий selectedMovie
  const handleCloseModal = () => {
    setSelectedMovieId(null); // Очищаем состояние для закрытия модалки
  };

  // 3. Функция для обработки запроса от SearchBar
  const handleSearchSubmit = async (formData: FormData) => {
    // ИСПРАВЛЕНО: Закрываем модалку при новом поиске, если она открыта
    setSelectedMovieId(null);
    setMovies([]);
    setError(null);
    setIsLoading(true);

    const query = formData.get("query") as string;

    try {
      // Вызов API (используем await, так как fetchMovies асинхронна)
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
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Хедер с формой поиска */}
      <SearchBar action={handleSearchSubmit} />
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
            {/* Рендерим MovieGrid и передаем данные и обработчик клика */}
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
      {/* 5. Модальное окно (рендерится, если выбран фильм) */}
      {selectedMovieId !== null && (
        <MovieModal movieId={selectedMovieId} onClose={handleCloseModal} />
      )}
      {/* УДАЛЕНО: {isModalLoading && <Loader />} */}

      {/* Контейнер для сповіщень React Hot Toast */}
      <Toaster position="top-right" />
    </div>
  );
}
