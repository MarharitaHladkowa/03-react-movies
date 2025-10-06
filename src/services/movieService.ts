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

// TmdbResponse - полная структура ответа
export interface TmdbResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
// ----------------------------------------------------------------------

// Переменная окружения для Bearer Token
const VITE_TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function fetchMovies(
  searchQuery: string,
  page: number = 1
): Promise<TmdbResponse> {
  // <--- ИЗМЕНЕНИЕ: Тип возврата - TmdbResponse
  if (!searchQuery) {
    // Возвращаем пустой объект TmdbResponse
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }

  const response = await api.get<TmdbResponse>("/search/movie", {
    params: {
      query: searchQuery,
      page: page,
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${VITE_TMDB_API_KEY}`,
    },
  });

  return response.data; // <--- ИЗМЕНЕНИЕ: Возвращаем полный объект data
}

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
