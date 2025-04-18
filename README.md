# 300точек - Студия дизайна и печати

Проект сайта-каталога для студии дизайна и печати "300точек", разработанный на React с использованием TypeScript.

## Описание проекта

Сайт представляет собой каталог услуг и товаров студии дизайна и печати. Основной функционал включает:

- Отображение категорий услуг
- Просмотр товаров по категориям
- Детальная информация о каждом товаре
- Система цен в зависимости от тиража
- Форма заказа и обратной связи

## Технологический стек

- React
- TypeScript
- React Router для маршрутизации
- Styled Components для стилизации
- Axios для работы с API

## Установка и запуск

1. Клонировать репозиторий:
```
git clone <url-репозитория>
```

2. Установить зависимости:
```
cd 300-tochek
npm install
```

3. Запустить проект в режиме разработки:
```
npm start
```

Сайт будет доступен по адресу [http://localhost:3000](http://localhost:3000)

## Структура проекта

```
src/
  |- api/          # API клиент и функции для работы с данными
  |- assets/       # Статические файлы (изображения, иконки и т.д.)
  |- components/   # Переиспользуемые компоненты
  |- pages/        # Компоненты страниц
  |- styles/       # Глобальные стили и темы
  |- types/        # TypeScript типы и интерфейсы
  |- App.tsx       # Корневой компонент с маршрутизацией
  |- index.tsx     # Точка входа
```

## Основные функции

### Клиентская часть
- Просмотр каталога товаров и услуг
- Фильтрация товаров по категориям
- Просмотр детальной информации о товаре
- Выбор тиража и расчет цены
- Отправка формы заказа

### Будущая административная часть
- Управление категориями и товарами
- Редактирование цен и описаний
- Просмотр и управление заказами
- Статистика продаж

## Планы по развитию

1. Разработка административной панели для управления контентом
2. Интеграция с системами онлайн-оплаты
3. Добавление личного кабинета пользователя
4. Система учета и отслеживания заказов
5. Интеграция с системами аналитики
