import { type AxiosResponse } from "axios";
// ИЗМЕНЕНИЕ: Импортируем MovieDetails для новой функции
import type { Movie, MovieDetails } from "../types/movie";
import api from "../components/Api/Api";

// Интерфейс для ответа TMDB, чтобы типизировать поле 'results'
interface TmdbResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Интерфейс для ответа TMDB с деталями (MovieDetails расширяет стандартный ответ)
interface TmdbMovieDetails extends MovieDetails {
  // TMDB возвращает объект, который соответствует MovieDetails
}

/**
 * Функция для поиска фильмов по ключевому слову.
 * @param searchQuery Строка для поиска.
 * @param page Номер страницы результатов.
 * @returns Промис, который разрешается массивом объектов Movie (Promise<Movie[]>).
 */
export async function fetchMovies(
  searchQuery: string,
  page: number = 1
): Promise<Movie[]> {
  if (!searchQuery) {
    return [];
  } // Типизируем ответ с помощью AxiosResponse<TmdbResponse>

  const response: AxiosResponse<TmdbResponse> = await api.get("/search/movie", {
    params: {
      query: searchQuery,
      page: page,
      language: "en-US",
    },
  }); // Возвращаем только типизированный массив фильмов

  return response.data.results;
}

/**
 * Функция для получения подробной информации о фильме по его ID.
 * @param movieId ID фильма.
 * @returns Промис, который разрешается полным объектом MovieDetails.
 */
export async function fetchMovieDetails(
  movieId: number
): Promise<MovieDetails> {
  // Запрос к эндпоинту /movie/{movie_id}
  const response: AxiosResponse<TmdbMovieDetails> = await api.get(
    `/movie/${movieId}`,
    {
      params: {
        language: "en-US",
      },
    }
  );

  // Возвращаем объект MovieDetails
  return response.data;
}
