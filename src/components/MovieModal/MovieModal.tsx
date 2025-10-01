import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-hot-toast"; // Добавляем toast для сообщений об ошибках
import { fetchMovieDetails } from "../../services/movieService"; // Добавляем функцию загрузки деталей
import Loader from "../Loader/Loader"; // Добавляем компонент загрузки
import ErrorMessage from "../ErrorMessage/ErrorMessage"; // Добавляем компонент ошибки
import css from "./MovieModal.module.css";

import type { Genre, MovieDetails } from "../../types/movie";
import { IMAGE_BASE_URL } from "../Api/Api";

// Определяем корневой элемент, куда будет рендериться модалка
const modalRoot = document.querySelector("#modal-root");

// Константа для размера фонового изображения
const BACKDROP_SIZE = "original";
// Константа для плейсхолдера
const PLACEHOLDER_BACKDROP_URL =
  "https://placehold.co/800x600/333333/ffffff?text=No+Backdrop";

// ИСПРАВЛЕНИЕ: Компонент теперь принимает только ID фильма
interface MovieModalProps {
  movieId: number;
  onClose: () => void;
}

export default function MovieModal({ movieId, onClose }: MovieModalProps) {
  // Додаємо стани movie, isLoading, error всередину компонента.
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // --------------------------------------------------------
  // 1. Логика закрытия по ESC и очистка
  // --------------------------------------------------------

  // Мемоизированная функция для обработки нажатия ESC
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    // Блокировка скролла
    document.body.style.overflow = "hidden";
    // Добавление слушателя для ESC
    window.addEventListener("keydown", handleKeyDown);

    // Функция очистки (выполняется при размонтировании)
    return () => {
      // Восстановление скролла
      document.body.style.overflow = "unset";
      // Удаление слушателя
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // --------------------------------------------------------
  // 2. Логика загрузки деталей фильма
  // --------------------------------------------------------

  useEffect(() => {
    if (!movieId) {
      return;
    }

    async function loadMovieDetails() {
      setIsLoading(true);
      setError(null);
      setMovie(null);

      try {
        const details = await fetchMovieDetails(movieId);
        setMovie(details);
      } catch (err) {
        const errorMessage = "Не вдалося завантажити деталі фільму.";
        setError(errorMessage);
        toast.error(errorMessage);
        console.error("Помилка завантаження деталей:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadMovieDetails();
  }, [movieId]); // Запускаем эффект при изменении movieId

  // --------------------------------------------------------
  // 3. Логика закрытия по клику на Backdrop
  // --------------------------------------------------------
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Если клик произошел ровно на backdrop (а не на modal-content внутри)
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  // --------------------------------------------------------
  // 4. Условный рендеринг и Portal
  // --------------------------------------------------------

  // Если нет movie, показываем лоадер или ошибку
  if (!movie) {
    // Если есть ошибка, показываем ее, иначе показываем лоадер
    return createPortal(
      <div
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
        onClick={handleBackdropClick}
      >
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
      </div>,
      modalRoot!
    );
  }

  // Если movie загружен, продолжаем рендеринг
  const imageUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}`
    : PLACEHOLDER_BACKDROP_URL;

  if (!modalRoot) {
    return null;
  }

  // Рендеринг модального окна с данными (movie уже не null)
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        {/* Кнопка закрытия */}
        <button
          className={css.closeButton}
          aria-label="Закрыть модальное окно"
          onClick={onClose}
        >
          X
        </button>
        {/* Фоновое изображение */}
        <img
          src={imageUrl}
          alt={movie.title}
          className={css.image}
          loading="lazy"
        />
        <div className={css.content}>
          <h2 className={css.title}>{movie.title}</h2>
          {movie.tagline && <p className={css.tagline}>{movie.tagline}</p>}
          <p className={css.overview}>{movie.overview}</p>
          <div className={css.detailsGrid}>
            <p>
              <strong>Rating:</strong> {movie.vote_average.toFixed(1)}/10
            </p>
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            {movie.runtime !== null && (
              <p>
                <strong>Runtime:</strong> {movie.runtime} min.
              </p>
            )}
            {movie.genres && movie.genres.length > 0 && (
              <p className={css.genres}>
                <strong>Genres:</strong>{" "}
                {movie.genres.map((g: Genre) => g.name).join(", ")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>,
    modalRoot!
  );
}
