import React from "react";
// УДАЛЕН ИМПОРТ: import toast from 'react-hot-toast';
import styles from "./SearchBar.module.css";

// 1. Интерфейс пропсов
interface SearchBarProps {
  // onSearchSubmit - функция для передачи значения инпута при сабмите формы
  onSearchSubmit: (query: string) => void;
}

// Объявляем глобальный тип toast временно, чтобы TypeScript не ругался на его использование
declare const toast: {
  error: (message: string) => void;
};

// 2. Компонент SearchBar
export default function SearchBar({ onSearchSubmit }: SearchBarProps) {
  // Обробка форми через Form Actions
  const handleFormSubmit = (formData: FormData) => {
    // Извлекаем значение поля с name="query"
    const query = formData.get("query") as string;

    if (query.trim() === "") {
      // Если поле пустое, показываем уведомление
      // Используем 'toast.error', который должен быть доступен глобально
      if (typeof toast !== "undefined" && toast.error) {
        toast.error("Please enter your search query.");
      } else {
        console.error("Toast library not loaded or not initialized.");
      }
      return; // Останавливаем выполнение
    }

    // Если запрос валидный, передаем его родительскому компоненту
    onSearchSubmit(query.trim());

    // Очищаем поле ввода после сабмита
    const inputElement = document.getElementById(
      "search-input"
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = "";
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Ссылка "Powered by TMDB" удалена */}

        {/* Форма поиска с Form Actions */}
        <form className={styles.form} action={handleFormSubmit}>
          <input
            className={styles.input}
            id="search-input" // Используется для очистки
            type="text"
            name="query" // Имя для FormData
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
