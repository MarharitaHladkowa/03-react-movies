// types/movie.ts

// Базовый интерфейс для фильма (оставлен согласно заданию)
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  backdrop_path: string | null;
}
// Остальные интерфейсы удалены.
