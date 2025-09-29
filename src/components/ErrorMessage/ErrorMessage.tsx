import css from "./ErrorMessage.module.css";

// Компонент ErrorMessage
export default function ErrorMessage() {
  return <p className={css.text}>There was an error, please try again...</p>;
}
