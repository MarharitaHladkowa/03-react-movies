import axios from "axios";

// 1. Прямое считывание переменных окружения, которые начинаются с VITE_
// Теперь мы ожидаем API Key V3 под именем VITE_TMDB_API_KEY
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Базовый URL для получения постеров фильмов
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

// 2. Проверка наличия ключа (для отладки)
if (!TMDB_API_KEY) {
  console.error(
    "CRITICAL ERROR: TMDB API Key (VITE_TMDB_API_KEY) is missing or not loaded by Vite. Check your .env file."
  );
}

// 3. Создаем настроенный экземпляр Axios
const api = axios.create({
  baseURL: API_BASE_URL,
});

// 4. Добавляем интерсептор для автоматической вставки ключа V3
api.interceptors.request.use(
  (config) => {
    // Вставляем ключ V3 как query-параметр 'api_key', как того требует TMDB V3
    config.params = {
      ...config.params,
      api_key: TMDB_API_KEY,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Экспорт по умолчанию
export default api;
