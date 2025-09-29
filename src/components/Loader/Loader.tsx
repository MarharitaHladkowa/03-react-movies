import css from "./Loader.module.css";

// Компонент Loader
export default function Loader() {
  return <p className={css.text}>Loading movies, please wait...</p>;
}
