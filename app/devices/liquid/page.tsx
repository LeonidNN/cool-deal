import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import { DEVICES } from "@/content/devices";
import Link from "next/link";

export default function LiquidPage() {
  const d = DEVICES.find(v => v.slug === "liquid")!;
  return (
    <main className="bg-gradient-to-b from-[color:var(--bg-top)] to-[color:var(--bg-bottom)]">
      <Section title={d.title} subtitle="Герметичная система жидкостного охлаждения с жилетом. Работает от 12В DC или 220В AC. Диапазон 15–50°C, есть режим нагрева. Объём воды 130 мл.">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card p-6 sm:p-8">
            <h3 className="text-lg font-semibold mb-3">Ключевые характеристики</h3>
            <ul className="space-y-2 text-[color:var(--muted)]">
              {d.bullets.concat(d.spec).map((s, i) => <li key={i}>• {s}</li>)}
            </ul>
            <div className="mt-6 flex items-center gap-4">
              <a href="#contact" className="inline-flex items-center rounded-xl bg-[color:var(--primary)] hover:bg-[color:var(--primary-600)] text-white px-5 py-2.5 text-sm font-medium">Оставить заявку на тест</a>
              <Link href="/" className="text-[color:var(--primary)] underline underline-offset-4">На главную</Link>
            </div>
          </div>
          <div className="card p-6 sm:p-8">
            <h3 className="text-lg font-semibold">Применение</h3>
            <ul className="mt-3 space-y-2 text-[color:var(--muted)]">
              <li>• Горячие цеха (литейка, стекло, прокат)</li>
              <li>• Операторы спецтехники</li>
              <li>• Дата-центры (горячий коридор)</li>
              <li>• Пре/пост-охлаждение в автоспорте</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="contact" title="Протестируйте бесплатно">
        <ContactForm />
      </Section>
    </main>
  );
}
