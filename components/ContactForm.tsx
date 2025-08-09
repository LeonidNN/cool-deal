"use client";

import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Введите имя"),
  email: z.string().email("Неверный e-mail"),
  phone: z.string().min(7, "Введите телефон"),
  message: z.string().max(1000).optional(),
});

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      message: String(form.get("message") || ""),
    };

    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    try {
      setState("loading");
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Network");
      setState("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setState("error");
      setError("Не удалось отправить. Попробуйте позже.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 sm:p-8 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-[color:var(--muted)] mb-1">Имя</label>
          <input name="name" required className="w-full rounded-xl border border-[color:var(--border)] px-3 py-2 outline-none focus:ring-4 ring-[rgba(30,136,229,.12)]" />
        </div>
        <div>
          <label className="block text-sm text-[color:var(--muted)] mb-1">E-mail</label>
          <input type="email" name="email" required className="w-full rounded-xl border border-[color:var(--border)] px-3 py-2 outline-none focus:ring-4 ring-[rgba(30,136,229,.12)]" />
        </div>
        <div>
          <label className="block text-sm text-[color:var(--muted)] mb-1">Телефон</label>
          <input name="phone" required className="w-full rounded-xl border border-[color:var(--border)] px-3 py-2 outline-none focus:ring-4 ring-[rgba(30,136,229,.12)]" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm text-[color:var(--muted)] mb-1">Сообщение (необязательно)</label>
          <textarea name="message" rows={4} className="w-full rounded-xl border border-[color:var(--border)] px-3 py-2 outline-none focus:ring-4 ring-[rgba(30,136,229,.12)]" />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={state === "loading" || state === "success"}
        className="inline-flex items-center rounded-xl bg-[color:var(--primary)] hover:bg-[color:var(--primary-600)] disabled:opacity-60 text-white px-5 py-2.5 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
      >
        {state === "idle" && "Отправить заявку"}
        {state === "loading" && "Отправка..."}
        {state === "success" && "Заявка отправлена ✔"}
        {state === "error" && "Ошибка. Повторить"}
      </button>

      <p className="text-xs text-[color:var(--muted)]">
        Тестирование бесплатно. Отправляя форму, вы соглашаетесь с обработкой персональных данных.
      </p>
    </form>
  );
}
