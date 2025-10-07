import { useId } from "react";
import css from "./SearchBar.module.css";
import { FiSearch } from "react-icons/fi";
import { toast } from "react-hot-toast";
// React больше не нужен для типизации события

// КРИТИЧЕСКОЕ ИЗМЕНЕНИЕ: Проп должен называться onSubmit и принимать FormData
interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const searchInputId = useId(); // action-обработчик, который получает только formData

  const handleFormAction = (formData: FormData) => {
    const queryValue = formData.get("query") as string;
    const trimmedQuery = queryValue.trim();

    if (!trimmedQuery) {
      toast.error("Please enter a search query.");
      return;
    } // Вызываем prop, передавая FormData

    onSubmit(trimmedQuery);
  };
  return (
    <header className={css.header}>
            {/* ИСПОЛЬЗУЕМ action, как требовалось */}     {" "}
      <form className={css.searchForm} action={handleFormAction}>
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
