import { useState } from "react";
import "./App.css";
import {
  fetchMovies,
  fetchMovieDetails,
  type MovieDetails,
} from "../../services/movieService";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";

export default function App() {
  // 1. Состояния для управления данными и UI
  const [movies, setMovies] = useState<Movie[]>([]); // Для хранения результатов
  const [isLoading, setIsLoading] = useState<boolean>(false); // Для индикации загрузки поиска
  const [error, setError] = useState<string | null>(null); // Для хранения ошибок // Используем MovieDetails для выбранного фильма
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null); // Для модального окна // Состояние для индикации загрузки деталей фильма в модалке
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false); // 2. Функции для управления модальным окном

  // Корректный контракт: принимает объект Movie, использует его ID
  const handleMovieSelect = async (movie: Movie) => {
    // Сбрасываем старый фильм и ошибку модалки
    setSelectedMovie(null);
    setError(null);
    setIsModalLoading(true); // Используем правильное имя переменной состояния

    try {
      // Асинхронно загружаем полные детали фильма
      const details = await fetchMovieDetails(movie.id);
      setSelectedMovie(details); // Устанавливаем полные детали для открытия модалки
    } catch (err) {
      const errorMessage = "Failed to load movie details.";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(err);
    } finally {
      setIsModalLoading(false); // Завершаем загрузку
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null); // Очищаем состояние для закрытия модалки
  }; // 3. Функция для обработки запроса от SearchBar
  const handleSearchSubmit = async (query: string) => {
    // Очищаем предыдущую коллекцию фильмов (требование)
    setSelectedMovie(null); // Закрываем модалку при новом поиске, если она открыта
    setMovies([]);
    setError(null);
    setIsLoading(true);

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
            <SearchBar onSubmit={handleSearchSubmit} />      {" "}
      <div style={{ padding: "20px" }}>
                {/* 1. Если идет загрузка, показываем Loader */}        {" "}
        {isLoading && <Loader />}        {" "}
        {/* 2. Если есть ошибка, показываем ErrorMessage */}        {" "}
        {error && <ErrorMessage />}        {" "}
        {/* 3. Если есть фильмы, показываем сетку */}        {" "}
        {movies.length > 0 && !isLoading && !error && (
          <>
                                    <p>Найдено {movies.length} фильмов. </p>    
                   {" "}
            {/* Рендерим MovieGrid и передаем данные и обработчик клика */}
                       {" "}
            <MovieGrid movies={movies} onSelect={handleMovieSelect} />          {" "}
          </>
        )}
                {/* 4. Начальное сообщение или после пустого поиска */}        {" "}
        {!isLoading && !error && movies.length === 0 && (
          <p>Введите ключевое слово для поиска фильмов. </p>
        )}
             {" "}
      </div>
            {/* 5. Модальное окно (рендерится, если выбран фильм) */}     {" "}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
            {/* 6. Индикатор загрузки для модального окна */}     {" "}
      {isModalLoading && <Loader />}     {" "}
      {/* Контейнер для сповіщень React Hot Toast */}
            <Toaster position="top-right" />   {" "}
    </div>
  );
}
