import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = process.env.CONTACT_TO || "nekrylov.ln@phystech.edu";

export async function POST(req: Request) {
  try {
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

    await resend.emails.send({
      from: "CoolDeal <no-reply@cool-deal.ru>",
      to: [TO],
      subject: "Заявка на тест",
      html,
      reply_to: email,
    });

    // автоответ пользователю (опционально, можно удалить)
    await resend.emails.send({
      from: "CoolDeal <no-reply@cool-deal.ru>",
      to: [email],
      subject: "Ваша заявка получена",
      html:
        "<p>Спасибо! Мы получили вашу заявку на бесплатное тестирование и свяжемся с вами в ближайшее время.</p>",
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
