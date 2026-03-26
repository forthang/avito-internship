# Авито — Личный кабинет продавца с AI-ассистентом

[![CI/CD](https://github.com/forthang/avito-internship/actions/workflows/deploy.yml/badge.svg)](https://github.com/forthang/avito-internship/actions/workflows/deploy.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![MUI](https://img.shields.io/badge/MUI-6.4-007FFF?logo=mui&logoColor=white)](https://mui.com/)
[![Webpack](https://img.shields.io/badge/Webpack-5-8DD6F9?logo=webpack&logoColor=black)](https://webpack.js.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://docs.docker.com/compose/)
[![License](https://img.shields.io/github/license/forthang/avito-internship)](LICENSE)

> Тестовое задание для стажёра Frontend (весна 2026). Веб-приложение для управления объявлениями с интегрированным AI-ассистентом, который помогает улучшать описания и оценивать рыночную стоимость товаров.

**[Live Demo](https://forthang.github.io/avito-internship/)**

![Скриншот приложения](https://i.ibb.co/JjJbJP5w/image.png)

---

## Стек технологий

| Что | Выбор | Почему |
|-----|-------|--------|
| Сборка | Webpack 5 | По требованию задания |
| UI | MUI (Material UI) v6 | Обширная компонентная база, тёмная тема из коробки |
| Стейт | Zustand | Минимальный бойлерплейт, TS-first |
| Серверный стейт | TanStack Query v5 | Кэш, AbortSignal, автоматический refetch |
| HTTP | Axios | Интерцепторы, типизация |
| Роутинг | react-router-dom v6 | По требованию задания |
| Формы | react-hook-form + MUI | Лёгкая интеграция, dirty tracking |
| AI | Groq API (Llama 3.3) | Бесплатный OpenAI-совместимый API |
| Тесты | Jest + RTL | Стандарт для Webpack-проектов |
| Линтер | ESLint 9 + Prettier | По требованию задания |

---

## Быстрый старт

### Без Docker

```bash
# Сервер (предоставлен)
cd Frontend-trainee-assignment-spring-2026/server
npm install
npx tsx server.ts

# Клиент (в другом терминале)
cd Frontend-trainee-assignment-spring-2026/client
npm install
cp .env.example .env   # настроить REACT_APP_XAI_API_KEY
npm start
```

Клиент: http://localhost:3000 | Сервер: http://localhost:8080

### С Docker

```bash
# Production
docker compose --profile prod up --build

# Development (hot reload)
docker compose --profile dev up --build
```

---

## Настройка AI

По умолчанию используется **Groq API** (бесплатный, OpenAI-совместимый).

1. Получите бесплатный API-ключ на https://console.groq.com
2. Добавьте в `.env`:
```
REACT_APP_AI_PROVIDER=groq
REACT_APP_AI_API_KEY=ваш_ключ
```

Используется модель `llama-3.3-70b-versatile`.

Для деплоя на GitHub Pages ключ добавляется как секрет `REACT_APP_AI_API_KEY` в Settings → Secrets → Actions.

---

## Архитектура

```
src/
├── app/                # App.tsx, routes, theme
├── features/
│   ├── ads/            # Объявления: страницы, компоненты, формы, API, хуки
│   │   ├── api/        # Типы, API-вызовы, TanStack Query хуки
│   │   ├── components/ # AdCard, FilterSidebar, SearchBar, SortSelect, ...
│   │   ├── forms/      # AdEditForm, AutoParamsFields, ...
│   │   ├── hooks/      # useRevisionFields, useDraftStorage
│   │   └── pages/      # AdsListPage, AdDetailPage, AdEditPage
│   └── ai/             # AI-ассистент
│       ├── api/        # ai.api.ts, ai.types.ts
│       ├── components/ # AiPanel, AiChat, AiSuggestion, DiffView, ...
│       ├── hooks/      # useAiDescription, useAiPrice, useAiChat
│       └── prompts/    # description.ts, price.ts, chat.ts
├── shared/
│   ├── lib/            # axios, constants, formatPrice, formatDate, queryClient
│   └── ui/             # ErrorBoundary, PageLayout, ThemeToggle
└── stores/             # Zustand: filters.store.ts, theme.store.ts
```

### Ключевые решения

- **Feature-based структура** — код организован по фичам, а не по типам файлов
- **Zustand для фильтров** — синхронизация поиска, категорий, сортировки и пагинации с серверными запросами
- **Автосохранение черновиков** — debounce 1с в localStorage, диалог восстановления при входе на страницу
- **AI-интеграция** — генерация/улучшение описаний, оценка цен, свободный чат в контексте объявления
- **Визуальный diff** — подсветка добавлений/удалений при улучшении описания через AI
- **Тёмная тема** — переключение с persist в localStorage

---

## Функции

| Функция | Статус |
|---------|--------|
| Список объявлений с пагинацией | Done |
| Поиск по названию | Done |
| Фильтрация по категории | Done |
| Фильтр "Требует доработок" | Done |
| Сортировка (название, дата, цена) | Done |
| Переключение сетка/список | Done |
| Детальная страница объявления | Done |
| Форма редактирования | Done |
| Динамические поля по категории | Done |
| AI-генерация описания | Done |
| AI-оценка цены | Done |
| AI-чат | Done |
| Diff-view для AI-подсказок | Done |
| Автосохранение черновика | Done |
| Тёмная/светлая тема | Done |
| Docker Compose (dev + prod) | Done |
| CI/CD GitHub Actions + Pages | Done |
| Unit-тесты (Jest + RTL) | Done |

---

## Известные ограничения

### GitHub Pages (Live Demo)

GitHub Pages — только клиентская часть (статика). Для работы с данными необходимо **запустить сервер локально**:

```bash
cd Frontend-trainee-assignment-spring-2026/server
npm install
npx tsx server.ts
```

После этого приложение на GH Pages будет обращаться к `http://localhost:8080`.

**Важно:** GET-запросы работают (сервер отдаёт `Access-Control-Allow-Origin: *`), но PUT-запросы (редактирование) **не работают** через CORS, т.к. сервер не обрабатывает OPTIONS preflight. Это ограничение предоставленного сервера, который мы не модифицируем. Workaround: используйте локальный запуск через `npm start` или Docker, где proxy решает проблему CORS.

AI-функции (генерация описания, оценка цены, чат) работают на GH Pages без сервера — обращаются напрямую к Groq API.

### Сервер

1. **GET /items не возвращает id** — на странице списка используется index элемента для навигации к детальной странице
2. **CORS для PUT** — сервер не обрабатывает OPTIONS preflight. В dev-режиме решается через webpack-dev-server proxy; в Docker — через nginx proxy
3. **Порт сервера** — `Number(process.env.port) ?? 8080` вычисляется как NaN при отсутствии переменной (NaN вместо undefined), Fastify использует дефолт

---

## Скрипты

```bash
npm start         # Dev server на :3000
npm run build     # Production build
npm run lint      # ESLint проверка
npm run lint:fix  # ESLint автоисправление
npm test          # Jest тесты
npm run format    # Prettier форматирование
```

---

## CI/CD

GitHub Actions pipeline (`.github/workflows/deploy.yml`):

1. **Lint** — `npm ci` → `npm run lint`
2. **Build & Deploy** — сборка и деплой на GitHub Pages (только для push в main)
