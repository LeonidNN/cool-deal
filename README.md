# Cool Deal — сайт стартапа охлаждающей одежды

Репозиторий: https://github.com/LeonidNN/cool-deal  

Проект — это небольшое Node.js‑приложение, которое поднимает HTTP‑сервер (Express) и отдаёт
одностраничный лендинг для B2B‑клиентов (горячие цеха, металлургия и т.п.). На лендинге есть
описание продукта и два калькулятора потерь от перегрева.

## Структура проекта

Корень репозитория:

- `server.js` — точка входа Node.js‑приложения.
- `package.json` — зависимости и npm‑скрипты.
- `package-lock.json` — фиксированные версии зависимостей.
- `node_modules/` — установленные зависимости (создаются после `npm install`).
- `public/` — статика, которую отдаёт сервер:
  - `index.html` — основной лендинг Cool Deal для горячих цехов.
  - `styles.css` — стили лендинга.
  - `main.js` — фронтенд‑логика калькуляторов и вспомогательных функций.
- `.github/workflows/deploy.yml` (если есть) — GitHub Actions workflow для автодеплоя на VPS.

### Что делает `server.js`

- Подключает Express.
- Раздаёт содержимое папки `public` как статику:
  ```js
  app.use(express.static(path.join(__dirname, "public")));
  ```
- На запрос к корню (`/`) отдаёт `public/index.html`.
- Поднимает сервер на порту:
  - `process.env.PORT`, если он задан (например, на хостинге),
  - иначе `3000` по умолчанию.

Таким образом, бекенд минимальный — это просто обёртка над статическим фронтендом.

### Что внутри `public/`

- `index.html` — одностраничный лендинг:
  - Хедер с навигацией по якорям.
  - Hero‑блок с мини‑калькулятором потерь.
  - Блоки «Проблема», «Решение», «Экономика», «Пилот», «Кейсы», «FAQ», «Контакты».
  - Все контакты ведут напрямую на email и Telegram основателя (без форм и CRM).

- `styles.css` — оформление в тёмной цветовой гамме, адаптивная вёрстка (desktop + mobile).

- `main.js`:
  - Функция `computeLoss(workers, salaryMonth, injuries)` реализует расчёт потерь:
    - берёт фонд оплаты труда для работников горячих зон (кол-во × зарплата × 12),
    - умножает его на 5% (скрытые потери продуктивности),
    - добавляет по 10 000 ₽ за каждую травму,
    - возвращает суммарные предполагаемые годовые потери.
  - `setupMiniCalc()` — инициализирует мини‑калькулятор в первом экране.
  - `setupFullCalc()` — инициализирует основной калькулятор в блоке «Экономика».
  - `setupYearInFooter()` — подставляет текущий год в футер.

## Запуск локально

Требования:

- Node.js версии 18+ (рекомендуется LTS).
- npm (обычно ставится вместе с Node.js).

Шаги:

```bash
# 1. Клонировать репозиторий
git clone https://github.com/LeonidNN/cool-deal.git
cd cool-deal

# 2. Установить зависимости
npm install

# 3. Запустить сервер
npm start
```

По умолчанию сервер поднимется на порту `3000`.  
Открыть в браузере:

```text
http://localhost:3000
```

Если порт 3000 занят, можно запустить так:

```bash
PORT=4000 npm start
```

и открыть `http://localhost:4000`.

## Автодеплой на VPS через GitHub Actions

В проекте может использоваться workflow `.github/workflows/deploy.yml` вида:

```yaml
name: Deploy to VPS

on:
  push:
    branches: [ "main" ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Install sshpass
        run: sudo apt-get update && sudo apt-get install -y sshpass

      - name: Deploy via SSH
        env:
          SSH_HOST: ${{ secrets.SSH_HOST }}
          SSH_USER: ${{ secrets.SSH_USER }}
          SSH_PASSWORD: ${{ secrets.SSH_PASSWORD }}
        run: |
          sshpass -p "$SSH_PASSWORD" ssh -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST << 'EOF'
          set -e
          cd /var/www/cool-deal
          git fetch --all
          git reset --hard origin/main
          npm ci || npm install
          pm2 reload cool-deal || pm2 start server.js --name cool-deal
          pm2 save
          EOF
```

Как это работает:

1. При пуше в ветку `main` GitHub Action запускается автоматически.
2. В workflow используется `sshpass`, чтобы зайти по SSH на удалённый сервер (`SSH_HOST`, `SSH_USER`, `SSH_PASSWORD` берутся из **secrets** репозитория).
3. На сервере:
   - Переход в папку проекта `/var/www/cool-deal`.
   - Обновление кода из ветки `main`.
   - Установка/обновление зависимостей через `npm ci` (или `npm install`).
   - Перезапуск Node‑приложения через `pm2` (или запуск, если оно ещё не запущено).
   - Сохранение конфигурации `pm2`.

В итоге после каждого `git push` в `main` код на VPS обновляется, а домен, который смотрит на этот сервер, начинает отдавать свежую версию лендинга.

## Кратко: как ориентироваться в проекте

- **Хочешь поменять тексты/секцию на сайте** → редактируй `public/index.html`.
- **Хочешь поправить стили** → `public/styles.css`.
- **Хочешь изменить логику калькулятора** → `public/main.js` (функция `computeLoss`).
- **Хочешь изменить порт/поведение сервера** → `server.js`.
- **Хочешь обновить зависимости** → `package.json` + `npm install`.
- **Хочешь поменять деплой** → `.github/workflows/deploy.yml` и настройки secrets в GitHub.

Этого README достаточно, чтобы новому человеку быстро понять, как устроен проект и как его запускать/деплоить.
