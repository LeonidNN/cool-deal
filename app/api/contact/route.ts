import { NextResponse } from "next/server";
import { Resend } from "resend";

// если нет ключа в локалке — просто не шлём письма (но форму не ломаем)
function getResend() {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

const TO = process.env.CONTACT_TO || "nekrylov.ln@phystech.edu";
export const dynamic = "force-dynamic"; // чтобы Next не пытался пререндерить

export async function POST(req: Request) {
  const { name, email, phone, message } = await req.json();

  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const html = `
    <h2>Новая заявка на тест с cool-deal.ru</h2>
    <p><b>Имя:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Телефон:</b> ${phone}</p>
    <p><b>Сообщение:</b> ${message || "-"}</p>
  `;

  const resend = getResend();

  if (resend) {
    try {
      // письмо себе
      await resend.emails.send({
        from: "CoolDeal <onboarding@resend.dev>",
        to: [TO],
        subject: "Заявка на тест",
        html,
        replyTo: email,
      });

      // автоответ пользователю
      await resend.emails.send({
        from: "CoolDeal <onboarding@resend.dev>",
        to: [email],
        subject: "Ваша заявка получена",
        html:
          "<p>Спасибо! Мы получили вашу заявку на бесплатное тестирование и свяжемся с вами в ближайшее время.</p>",
      });
    } catch {
      // не роняем форму из-за временных проблем с почтой
    }
  }

  return NextResponse.json({ ok: true });
}
