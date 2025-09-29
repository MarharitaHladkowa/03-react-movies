import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";
// ИСправлено: Должен быть абсолютный импорт из Api.tsx, где экспортируется IMAGE_BASE_URL
import { IMAGE_BASE_URL } from "../../components/Api/Api";

// Интерфейс для пропсов компонента MovieGrid
interface MovieGridProps {
  movies: Movie[];
  onSelect: (movieId: number) => void;
}

// Константа для размера постера, рекомендованная TMDB
const POSTER_SIZE = "w500";
const PLACEHOLDER_URL =
  "https://placehold.co/500x750/cccccc/333333?text=No+Poster";

/**
 * MovieGrid – компонент для отображения коллекции фильмов в виде сетки.
 * Рендерится только при наличии фильмов.
 */
export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  // Компонент не рендерится, если массив пуст
  if (movies.length === 0) {
    return null;
  }

  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id}>
          {/* Обработчик клика передает ID фильма */}
          <div className={css.card} onClick={() => onSelect(movie.id)}>
            <img
              className={css.image}
              // Формируем полный URL изображения
              src={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                  : PLACEHOLDER_URL
              }
              alt={movie.title}
              loading="lazy"
              // Обработка ошибки загрузки изображения
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Предотвращаем бесконечный цикл
                target.src = PLACEHOLDER_URL;
                target.style.objectFit = "contain";
                target.style.backgroundColor = "#222";
              }}
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
