import axios from "axios";

// 1. Прямое считывание переменных окружения
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Это V3 Key
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Базовый URL для получения постеров фильмов
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

// 2. Проверка наличия ключа (для отладки)
if (!TMDB_API_KEY) {
  console.error(
    "КРИТИЧЕСКАЯ ОШИБКА: Ключ API TMDB (VITE_TMDB_API_KEY) отсутствует. Проверьте ваш файл .env."
  );
}

// 3. Создаем настроенный экземпляр Axios
const api = axios.create({
  baseURL: API_BASE_URL, // КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ 401: // Возвращаемся к использованию ключа V3 как параметра запроса, // чтобы устранить ошибку 401 Unauthorized и сделать приложение рабочим.
  params: {
    api_key: TMDB_API_KEY,
  },
  headers: {
    // Удален заголовок Authorization, чтобы избежать ошибки 401,
    // вызванной использованием V3 ключа в качестве Bearer токена.
    "Content-Type": "application/json;charset=utf-8",
  },
});

export default api;
