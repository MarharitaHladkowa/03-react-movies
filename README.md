🎥 Movie Explorer: Поиск и Детализация Фильмов
🚀 Обзор Приложения
Movie Explorer — это современное одностраничное веб-приложение (SPA), разработанное на React и TypeScript, предназначенное для поиска фильмов и просмотра их полной детализации. Приложение использует открытый API The Movie Database (TMDB) для получения актуальных данных о фильмах, рейтингах и постерах.

Ключевой Функционал
Поиск Фильмов: Быстрый поиск фильмов по ключевым словам.

Детали Модального Окна: Отображение подробной информации о выбранном фильме в модальном окне.

Полная Адаптивность: Удобное использование на мобильных, планшетных и десктопных устройствах.

Безопасность и Типизация: Использование TypeScript для обеспечения строгой типизации данных и минимизации ошибок.

   💻 Технологии и Стек
Frontend: React (Функциональные компоненты и Хуки)

Язык: TypeScript (Строгая типизация для всего проекта)

Стилизация: CSS Modules

API: The Movie Database (TMDB)

   ✨ Реализованные Особенности
В процессе разработки были внедрены следующие ключевые архитектурные и функциональные решения:

1. Архитектура и Управление Данными
Асинхронные Запросы: Использование асинхронных функций для взаимодействия с API TMDB (поиск и получение деталей).

Обработка Состояний: Централизованное управление состоянием загрузки (isLoading), ошибок (error) и отображаемых данных (movies, selectedMovie).

Оповещения Пользователя: Использование библиотеки react-hot-toast для отображения уведомлений об ошибках и результатах поиска.

Экология: Реализована ленивая загрузка (loading="lazy") для постеров фильмов, что улучшает производительность.

2. Модальное Окно (Modal Component)
Модальное окно было разработано в соответствии с лучшими практиками доступности и UX:

createPortal: Использование React Portals для рендеринга модального окна вне основного DOM-дерева, что предотвращает проблемы с наложением z-index.

Блокировка Скролла: Автоматическая блокировка прокрутки тела страницы (document.body.style.overflow = "hidden") при открытии модального окна.

Механизмы Закрытия:

Клик по кнопке закрытия (X).

Нажатие клавиши ESC.

Клик по области бэкдропа за пределами самого окна.

Полная Очистка: При закрытии модального окна (unmount) автоматически удаляются все слушатели событий (для ESC) и восстанавливается прокрутка страницы.

3. Типизация
Строгая типизация API-ответов: Созданы и использованы интерфейсы Movie, MovieDetails и Genre, что обеспечивает предсказуемость данных и предотвращает ошибки в рантайме (например, мы исправили отсутствие свойства backdrop_path в типе MovieDetails).

🔧 Запуск Проекта
Клонируйте репозиторий: git clone https://ru.wikipedia.org/wiki/%D0%A0%D0%B5%D0%BF%D0%BE%D0%B7%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D0%B9

Перейдите в папку проекта: cd movie-explorer

Установите зависимости: npm install

Добавьте ваш ключ TMDB API в файл .env.

Запустите проект: npm run dev
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
