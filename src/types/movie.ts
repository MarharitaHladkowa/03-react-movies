export interface Genre {
  id: number;
  name: string;
}

// Базовый интерфейс для фильма (используется в App.tsx для списка)
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  // backdrop_path здесь отсутствует
}

// Расширенный тип, который приходит при запросе деталей фильма
export interface MovieDetails extends Movie {
  // Дополнительные поля, которых нет в базовом списке (Movie)
  runtime: number | null;
  genres: Genre[];
  tagline: string | null;
  backdrop_path: string | null; // <--- Перемещен сюда
}

// Интерфейс для ответа TMDB при поиске
export interface TmdbResponse {
  page: number;
  // Используем базовый тип Movie для результатов поиска
  results: Movie[];
  total_pages: number;
  total_results: number;
}
