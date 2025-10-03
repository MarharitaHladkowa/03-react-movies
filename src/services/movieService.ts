import api from "../components/Api/Api";
// Импортируем только базовый тип Movie
import { type Movie } from "../types/movie";

// ----------------------------------------------------------------------
// ВОССТАНОВЛЕННЫЕ ТИПЫ
// ----------------------------------------------------------------------
export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  runtime: number | null;
  genres: Genre[];
  tagline: string | null;
  backdrop_path: string | null;
}

export interface TmdbResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
// ----------------------------------------------------------------------

// Предполагаем, что переменная окружения (Bearer Token) доступна
const VITE_TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function fetchMovies(
  searchQuery: string,
  page: number = 1
): Promise<Movie[]> {
  if (!searchQuery) {
    return [];
  }

  const response = await api.get<TmdbResponse>("/search/movie", {
    params: {
      query: searchQuery,
      page: page,
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${VITE_TMDB_API_KEY}`, // <-- Используем правильное имя
    },
  });

  return response.data.results;
}

// ВОССТАНОВЛЕННАЯ ФУНКЦИЯ
export async function fetchMovieDetails(
  movieId: number
): Promise<MovieDetails> {
  const response = await api.get<MovieDetails>(`/movie/${movieId}`, {
    params: {
      language: "en-US",
    },
  });

  return response.data;
}
