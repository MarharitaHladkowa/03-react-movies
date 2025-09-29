export interface Genre {
  id: number;
  name: string;
}

// Базовый тип для списка фильмов, который приходит с поиска
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

// Расширенный тип, который приходит при запросе деталей фильма
// (используется для модального окна)
export interface MovieDetails extends Movie {
  runtime: number | null;
  genres: Genre[];
  tagline: string | null;
  backdrop_path: string | null; // <--- ДОБАВЛЕНО ДЛЯ ИСПРАВЛЕНИЯ ОШИБКИ TS2339
}
