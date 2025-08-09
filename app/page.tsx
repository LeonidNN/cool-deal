import Section from "@/components/Section";
import DeviceCard from "@/components/DeviceCard";
import ContactForm from "@/components/ContactForm";
import { DEVICES } from "@/content/devices";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-[color:var(--bg-top)] to-[color:var(--bg-bottom)] text-[color:var(--text)]">
      {/* HERO */}
      <section className="section pt-16 sm:pt-24 pb-10 sm:pb-16 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold">
          Прохлада там, где она нужна больше всего
        </h1>
        <p className="mt-4 text-lg text-[color:var(--muted)] max-w-3xl mx-auto">
          Три решения под разные задачи — от лёгкого ремня до мощной системы охлаждения.
          Протестируйте бесплатно в ваших условиях.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center rounded-xl bg-[color:var(--primary)] hover:bg-[color:var(--primary-600)] text-white px-5 py-3 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
          >
            Оставить заявку на тест
          </a>
          <Link href="#devices" className="text-[color:var(--primary)] underline underline-offset-4">
            Посмотреть устройства
          </Link>
        </div>
      </section>

      {/* DEVICES */}
      <Section id="devices" title="Линейка устройств" subtitle="Выберите вариант под вашу задачу">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEVICES.map((d) => (
            <DeviceCard
              key={d.slug}
              title={d.title}
              bullets={d.bullets}
              href={`/devices/${d.slug}`}
            />
          ))}
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section
        id="how"
        title="Как это работает"
        subtitle="Надеваете жилет или ремень, подключаете к питанию (12В DC или 220В AC) и получаете комфортную температуру уже через 30 секунд."
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {["Наденьте", "Подключите", "Охлаждайтесь"].map((t, i) => (
            <div key={i} className="card p-6 text-center">
              <div className="text-2xl font-semibold">{t}</div>
              <p className="mt-2 text-[color:var(--muted)]">
                {i === 0 && "Жилет с жидкостной/воздушной системой или ремень с обдувом"}
                {i === 1 && "К питанию 12В (транспорт) или 220В (розетка/катушка)"}
                {i === 2 && "Стабильный комфорт даже в жарких условиях"}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* BENEFITS */}
      <Section
        id="benefits"
        title="Преимущества"
        subtitle="Минимальный вес или максимальная мощность — в зависимости от задачи. Надёжные решения для промышленности и транспорта."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Диапазон температур от 15°C до 50°C, есть режим нагрева",
            "Подключение: 12В DC (транспорт) или 220В AC",
            "Сценарии: спецтехника, цеха, дата-центры, мото, автоспорт",
            "Плавные анимации и чистый минималистичный дизайн",
            "Простая интеграция на рабочем месте (катушки/кронштейны)",
            "Тестирование бесплатно — оцените эффект в ваших условиях",
          ].map((b, i) => (
            <div key={i} className="card p-6">{b}</div>
          ))}
        </div>
      </Section>

      {/* USE CASES */}
      <Section
        id="use"
        title="Где это используют"
        subtitle="Мотоциклисты, операторы спецтехники, горячие цеха, дата-центры (горячие коридоры), автоспорт (пит-лейн), теплицы и сельхозтехника."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Мотоциклисты и доставщики",
            "Операторы экскаваторов/комбайнов",
            "Литейные и стекольные производства",
            "Дата-центры (hot aisle)",
            "Пит-лейн, картинг",
            "Теплицы, агротехника",
          ].map((t, i) => (
            <div key={i} className="card p-6">{t}</div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Протестируйте бесплатно">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ContactForm />
          <div className="card p-6 sm:p-8">
            <h3 className="text-xl font-semibold">Связаться напрямую</h3>
            <p className="mt-3 text-[color:var(--muted)]">
              E-mail:{" "}
              <a className="underline underline-offset-4" href="mailto:nekrylov.ln@phystech.edu">
                nekrylov.ln@phystech.edu
              </a>
            </p>
            <p className="mt-3 text-[color:var(--muted)]">
              Расскажите коротко про условия использования (цех/транспорт/температура/питание 12В/220В) — мы подскажем, какой вариант подойдёт лучше.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
