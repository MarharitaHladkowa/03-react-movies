import axios from "axios"; // КРИТИЧНЕ ЗМІНЕННЯ: Явно використовуємо axios
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

// TmdbResponse - повна структура відповіді (потрібна для типізації запиту)
export interface TmdbResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
// ----------------------------------------------------------------------

// Оголошуємо BASE_URL та змінну для Bearer Token
const BASE_URL = "https://api.themoviedb.org/3";
const VITE_TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function fetchMovies(
  searchQuery: string,
  page: number = 1
): Promise<Movie[]> {
  // КРИТИЧНЕ ЗМІНЕННЯ: Повертаємо Movie[]
  if (!searchQuery) {
    return [];
  } // КРИТИЧНЕ ЗМІНЕННЯ: Використовуємо axios.get з повним URL

  const response = await axios.get<TmdbResponse>(`${BASE_URL}/search/movie`, {
    params: {
      query: searchQuery,
      page: page,
      language: "en-US",
    },
    headers: {
      // Заголовок Authorization повинен бути доданий до кожного запиту
      Authorization: `Bearer ${VITE_TMDB_API_KEY}`,
    },
  });

  return response.data.results; // КРИТИЧНЕ ЗМІНЕННЯ: Повертаємо лише масив results
}

export async function fetchMovieDetails(
  movieId: number
): Promise<MovieDetails> {
  // КРИТИЧНЕ ЗМІНЕННЯ: Використовуємо axios.get з повним URL
  const response = await axios.get<MovieDetails>(
    `${BASE_URL}/movie/${movieId}`,
    {
      params: {
        language: "en-US",
      },
      headers: {
        // Заголовок Authorization також додаємо і сюди
        Authorization: `Bearer ${VITE_TMDB_API_KEY}`,
      },
    }
  );

  return response.data;
}
