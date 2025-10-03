import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import css from "./MovieModal.module.css";
// Импортируем только базовый тип Movie
import type { Movie } from "../../types/movie";
import { IMAGE_BASE_URL } from "../Api/Api";

// Определяем корневой элемент
const modalRoot = document.querySelector("#modal-root");

// Константы, используемые для рендеринга изображения
const BACKDROP_SIZE = "original";
const PLACEHOLDER_BACKDROP_URL =
  "https://placehold.co/800x600/333333/ffffff?text=No+Backdrop";

// КРИТИЧЕСКОЕ ИЗМЕНЕНИЕ: Контракт - принимает объект movie: Movie
interface MovieModalProps {
  movie: Movie; // Принимаем готовый объект Movie
  onClose: () => void;
}

// ЛОГИКА ЗАГРУЗКИ ДАННЫХ УДАЛЕНА ИЗ КОМПОНЕНТА
export default function MovieModal({ movie, onClose }: MovieModalProps) {
  // --------------------------------------------------------
  // 1. Логика закрытия по ESC и очистка
  // --------------------------------------------------------
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // --------------------------------------------------------
  // 2. Логика закрытия по клику на Backdrop
  // --------------------------------------------------------
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  if (!modalRoot) {
    return null;
  }

  // Рендеринг модального окна с использованием данных movie: Movie
  const imageUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}`
    : PLACEHOLDER_BACKDROP_URL;

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
          <p className={css.overview}>{movie.overview}</p>
          <div className={css.detailsGrid}>
            <p>
              <strong>Rating:</strong> {movie.vote_average.toFixed(1)}/10
            </p>
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
          </div>
        </div>
      </div>
    </div>,
    modalRoot!
  );
}
