import api from "../components/Api/Api";

// ----------------------------------------------------------------------
// 1. АРХИТЕКТУРА ТИПОВ
// MovieDetails и Genre определены и экспортированы здесь (как API-специфичные)
// ----------------------------------------------------------------------

export interface Genre {
  id: number;
  name: string;
}

// Расширенный тип, который приходит при запросе деталей фильма
export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  // Дополнительные поля для модального окна
  runtime: number | null;
  genres: Genre[];
  tagline: string | null;
  backdrop_path: string | null;
}

// Интерфейс для ответа TMDB, чтобы типизировать поле 'results'
interface TmdbResponse {
  page: number;
  results: MovieDetails[]; // Используем MovieDetails, т.к. это полный тип
  total_pages: number;
  total_results: number;
}

// ----------------------------------------------------------------------
// 2. ФУНКЦИИ API С ЯВНЫМИ ДЖЕНЕРИКАМИ AXIOS
// ----------------------------------------------------------------------

/**
 * Функция для поиска фильмов по ключевому слову.
 * @param searchQuery Строка для поиска.
 * @param page Номер страницы результатов.
 * @returns Промис, который разрешается массивом объектов MovieDetails.
 */
export async function fetchMovies(
  searchQuery: string,
  page: number = 1
): Promise<MovieDetails[]> {
  if (!searchQuery) {
    return [];
  }

  // ИСПРАВЛЕНИЕ: Использование явного дженерика api.get<TmdbResponse>
  const response = await api.get<TmdbResponse>("/search/movie", {
    params: {
      query: searchQuery,
      page: page,
      language: "en-US",
    },
  });

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
  // ИСПРАВЛЕНИЕ: Использование явного дженерика api.get<MovieDetails>
  const response = await api.get<MovieDetails>(`/movie/${movieId}`, {
    params: {
      language: "en-US",
    },
  });

  return response.data;
}
