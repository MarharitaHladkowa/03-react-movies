import { useId } from "react";
import css from "./SearchBar.module.css";
import { FiSearch } from "react-icons/fi";
import { toast } from "react-hot-toast";

// Интерфейс для пропсов SearchBar: функция, которая принимает строку запроса
interface SearchBarProps {
  action: (formData: FormData) => void;
}
export default function SearchBar({ action }: SearchBarProps) {
  // 1. Используем useId для доступности (Accessibility)
  const searchInputId = useId();

  const handleFormAction = (formData: FormData) => {
    // 3. Извлекаем значение поля с именем "query" из объекта FormData
    const queryValue = formData.get("query") as string;

    // 4. Обрезаем пробелы
    const trimmedQuery = queryValue.trim();

    if (!trimmedQuery) {
      // 5. Показываем ошибку, если запрос пуст
      toast.error("Please enter a search query.");
      return;
    }

    // 6. Вызываем пропс action с объектом FormData
    // Мы передаем данные в App.tsx
    action(formData);
  };
  return (
    <header className={css.header}>
      {/* ПРИМЕНЯЕМ: Атрибут action с нашей функцией */}
      <form className={css.searchForm} action={handleFormAction}>
        {/* Добавляем скрытую метку для доступности (Accessibility) */}
        <label htmlFor={searchInputId} className={css.visuallyHidden}>
          Search for movies
        </label>

        <input
          type="text"
          name="query"
          id={searchInputId} // <-- Связывание через useId
          autoComplete="off"
          autoFocus
          placeholder="Search for movies..."
          className={css.input}
          defaultValue=""
        />
        <button type="submit" className={css.button}>
          {/* Иконка поиска из react-icons */}
          <FiSearch size={20} />
        </button>
      </form>
    </header>
  );
}
// ...
