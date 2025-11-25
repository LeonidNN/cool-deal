function formatCurrency(value) {
  if (!isFinite(value)) return "0 ₽";

  try {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0
    }).format(value);
  } catch (e) {
    return Math.round(value).toLocaleString("ru-RU") + " ₽";
  }
}

function computeLoss(workers, salaryMonth, injuries) {
  const fotYear = workers * salaryMonth * 12;
  const lossProd = fotYear * 0.05; // 5% скрытых потерь продуктивности
  const lossInjuries = injuries * 10000; // оценка прямых затрат на одну травму
  return lossProd + lossInjuries;
}

function setupMiniCalc() {
  const form = document.getElementById("miniCalc");
  const resultEl = document.getElementById("miniResult");
  if (!form || !resultEl) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const workers = Number(form.elements["workers"].value.replace(",", "."));
    const salary = Number(form.elements["salary"].value.replace(",", "."));
    const injuries = Number(form.elements["injuries"].value.replace(",", "."));

    if (!workers || !salary || workers < 0 || salary < 0 || injuries < 0) {
      resultEl.textContent = "Проверьте введённые значения.";
      return;
    }

    const lossTotal = computeLoss(workers, salary, injuries);
    resultEl.innerHTML =
      "Оценочные годовые потери для горячих зон вашего цеха могут составлять " +
      "<strong>" + formatCurrency(lossTotal) + "</strong>.";
  });
}

function setupFullCalc() {
  const form = document.getElementById("fullCalc");
  const resultEl = document.getElementById("fullResult");
  if (!form || !resultEl) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const workers = Number(form.elements["workers"].value.replace(",", "."));
    const salary = Number(form.elements["salary"].value.replace(",", "."));
    const injuries = Number(form.elements["injuries"].value.replace(",", "."));

    const placeholder = resultEl.querySelector(".calc-placeholder");
    if (placeholder) {
      placeholder.remove();
    }

    if (!workers || !salary || workers < 0 || salary < 0 || injuries < 0) {
      resultEl.innerHTML =
        "<h3>Результат расчёта</h3>" +
        '<p class="calc-placeholder">Проверьте корректность введённых данных.</p>';
      return;
    }

    const lossTotal = computeLoss(workers, salary, injuries);
    const fotYear = workers * salary * 12;

    const html =
      "<h3>Результат расчёта</h3>" +
      '<div class="calc-number">' + formatCurrency(lossTotal) + "</div>" +
      '<p class="calc-subtext">Оценочные годовые потери для горячих зон вашего цеха.</p>' +
      '<p class="calc-subtext">Для понимания масштаба: это сопоставимо с ~5% годового фонда оплаты труда ' +
      "для этих сотрудников, а также ориентировочной стоимостью травм и связанных простоев.</p>";

    resultEl.innerHTML = html;
  });
}

function setupYearInFooter() {
  const el = document.getElementById("year");
  if (!el) return;
  el.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", function () {
  setupMiniCalc();
  setupFullCalc();
  setupYearInFooter();
});
