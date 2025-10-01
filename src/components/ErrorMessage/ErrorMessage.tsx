import css from "./ErrorMessage.module.css";

// Определяем интерфейс пропсов: компонент ожидает message
interface ErrorMessageProps {
  message: string | null; // Разрешаем null, если мы передаем состояние
}

// Изменяем компонент, чтобы он принимал пропс message
export default function ErrorMessage({ message }: ErrorMessageProps) {
  // Используем переданное сообщение или стандартный текст по умолчанию
  const displayMessage =
    message || "An unexpected error occurred. Please try again later.";

  return <p className={css.text}>{displayMessage}</p>;
}
