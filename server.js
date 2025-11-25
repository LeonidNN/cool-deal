const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Раздаём статику из папки public
app.use(express.static(path.join(__dirname, "public")));

// Главная страница — B2B-лендинг для горячих цехов
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Пример health-check, если нужен для хостинга
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Cool Deal B2B site listening on port ${PORT}`);
});
