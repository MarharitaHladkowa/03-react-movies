import { useState } from "react";
import css from "./SearchBar.module.css";
import { FiSearch } from "react-icons/fi";
import { toast } from "react-hot-toast";

// Интерфейс для пропсов SearchBar: функция, которая принимает строку запроса
interface SearchBarProps {
  onSearchSubmit: (query: string) => void;
}

/**
 * SearchBar – компонент формы поиска.
 * Управляет вводом, предотвращает отправку пустых строк и вызывает колбэк с запросом.
 */
export default function SearchBar({ onSearchSubmit }: SearchBarProps) {
  const [query, setQuery] = useState("");

  // Обработчик отправки формы
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Обрезаем пробелы с краев и проверяем, что запрос не пуст
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      // Показываем ошибку, если запрос пуст
      toast.error("Please enter a search query.");
      return;
    }

    // Вызываем функцию обратного вызова с обрезанным запросом
    onSearchSubmit(trimmedQuery);

    // Очищаем поле ввода после успешного поиска
    setQuery("");
  };

  // Обработчик изменения поля ввода
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <header className={css.header}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search for movies..."
          className={css.input}
          value={query}
          onChange={handleChange}
        />
        <button type="submit" className={css.button}>
          {/* Иконка поиска из react-icons */}
          <FiSearch size={20} />
        </button>
      </form>
    </header>
  );
}
