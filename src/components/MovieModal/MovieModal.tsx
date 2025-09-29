import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import css from "./MovieModal.module.css";
// ИМПОРТ: Используем MovieDetails
import type { MovieDetails } from "../../types/movie";
import { IMAGE_BASE_URL } from "../Api/Api";

// Определяем корневой элемент, куда будет рендериться модалка
const modalRoot = document.querySelector("#modal-root");

// Константа для размера фонового изображения
const BACKDROP_SIZE = "original";
// Константа для плейсхолдера
const PLACEHOLDER_BACKDROP_URL =
  "https://placehold.co/800x600/333333/ffffff?text=No+Backdrop";

// Используем MovieDetails
interface MovieModalProps {
  movie: MovieDetails;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
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
    document.body.style.overflow = "hidden"; // Добавление слушателя для ESC

    window.addEventListener("keydown", handleKeyDown); // Функция очистки (выполняется при размонтировании)

    return () => {
      // Восстановление скролла
      document.body.style.overflow = "unset"; // Удаление слушателя
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]); // -------------------------------------------------------- // 2. Логика закрытия по клику на Backdrop // --------------------------------------------------------

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Если клик произошел ровно на backdrop (а не на modal-content внутри)
    if (event.currentTarget === event.target) {
      onClose();
    }
  }; // Формирование URL изображения

  const imageUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}`
    : PLACEHOLDER_BACKDROP_URL; // createPortal требует, чтобы цель существовала

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      {" "}
      <div className={css.modal}>
        {/* Кнопка закрытия */}{" "}
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
                    &times;        {" "}
        </button>
        {/* Фоновое изображение */}{" "}
        <img
          src={imageUrl}
          alt={movie.title}
          className={css.image}
          loading="lazy"
        />
        <div className={css.content}>
          <h2 className={css.title}>{movie.title}</h2>{" "}
          {movie.tagline && <p className={css.tagline}>{movie.tagline}</p>}
          <p className={css.overview}>{movie.overview}</p>{" "}
          <div className={css.detailsGrid}>
            {" "}
            <p>
              <strong>Рейтинг:</strong> {movie.vote_average.toFixed(1)}/10{" "}
            </p>{" "}
            <p>
              <strong>Дата выхода:</strong> {movie.release_date}{" "}
            </p>{" "}
            {movie.runtime !== null && (
              <p>
                <strong>Время:</strong> {movie.runtime} мин.
              </p>
            )}{" "}
            {movie.genres && movie.genres.length > 0 && (
              <p className={css.genres}>
                <strong>Жанры:</strong>{" "}
                {movie.genres.map((g) => g.name).join(", ")}
              </p>
            )}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>,
    modalRoot
  );
}
