import api from "../components/Api/Api";
// ИСПРАВЛЕНИЕ: Импортируем типы Movie и MovieDetails из types/movie.ts
import {
  type Movie, // Базовый тип для списка
  type MovieDetails, // Полный тип для модального окна
  type TmdbResponse, // Тип ответа API
} from "../types/movie";

// ----------------------------------------------------------------------
// 2. ФУНКЦИИ API С ЯВНЫМИ ДЖЕНЕРИКАМИ AXIOS
// ----------------------------------------------------------------------

/**
 * Функция для поиска фильмов по ключевому слову.
 * @param searchQuery Строка для поиска.
 * @param page Номер страницы результатов.
 * @returns Промис, который разрешается массивом объектов Movie.
 */
export async function fetchMovies(
  searchQuery: string,
  page: number = 1
): Promise<Movie[]> {
  if (!searchQuery) {
    return [];
  } // Использование явного дженерика api.get<TmdbResponse> для строгого типизирования ответа

  const response = await api.get<TmdbResponse>("/search/movie", {
    params: {
      query: searchQuery,
      page: page,
      language: "en-US",
    },
  }); // Возвращаем только массив результатов, типизированный как Movie[]

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
  // Использование явного дженерика api.get<MovieDetails> для строгого типизирования
  const response = await api.get<MovieDetails>(`/movie/${movieId}`, {
    params: {
      language: "en-US",
    },
  });

  return response.data;
}
