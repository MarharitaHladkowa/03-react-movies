import { useId } from "react";
import css from "./SearchBar.module.css";
import { FiSearch } from "react-icons/fi";
import { toast } from "react-hot-toast";
import React from "react"; // Для типизации события формы

// КРИТИЧЕСКОЕ ИЗМЕНЕНИЕ 1: Проп должен называться onSubmit и принимать строку (string)
interface SearchBarProps {
  onSubmit: (query: string) => void;
}

// КРИТИЧЕСКОЕ ИЗМЕНЕНИЕ 1: Деструктурируем prop как onSubmit
export default function SearchBar({ onSubmit }: SearchBarProps) {
  const searchInputId = useId(); // Переименовываем и меняем сигнатуру для работы с onSubmit

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // 1. Предотвращаем стандартное поведение формы
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const queryValue = formData.get("query") as string;
    const trimmedQuery = queryValue.trim();

    if (!trimmedQuery) {
      toast.error("Please enter a search query.");
      return;
    } // КРИТИЧЕСКОЕ ИЗМЕНЕНИЕ 2: Вызываем prop как onSubmit(trimmedQuery)

    onSubmit(trimmedQuery);

    // Очищаем форму
    form.reset();
  };
  return (
    <header className={css.header}>
            {/* ИЗМЕНЕНИЕ: Используем onSubmit={handleSubmit} */}     {" "}
      <form className={css.searchForm} onSubmit={handleSubmit}>
               {" "}
        <label htmlFor={searchInputId} className={css.visuallyHidden}>
                    Search for movies        {" "}
        </label>
               {" "}
        <input
          type="text"
          name="query"
          id={searchInputId}
          autoComplete="off"
          autoFocus
          placeholder="Search for movies..."
          className={css.input}
          defaultValue=""
        />
               {" "}
        <button type="submit" className={css.button}>
                    <FiSearch size={20} />       {" "}
        </button>
             {" "}
      </form>
         {" "}
    </header>
  );
}
