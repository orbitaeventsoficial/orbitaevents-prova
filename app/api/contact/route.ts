// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Carga de variables env
const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  MAIL_FROM,
  MAIL_TO,
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID,
} = process.env;

// Validación básica del entorno
const hasSMTP =
  SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && MAIL_FROM && MAIL_TO;
const hasTelegram = TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID;

// === Utilidad para limpiar texto ===
function clean(input: string): string {
  return input?.toString().trim().replace(/\s+/g, " ").slice(0, 500) || "";
}

// === Endpoint principal ===
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      name = "",
      email = "",
      phone = "",
      date = "",
      place = "",
      type = "",
      message = "",
      company = "",
    } = body || {};

    // Honeypot anti-spam
    if (company) return NextResponse.json({ ok: true });

    // Validaciones mínimas
    if (!name || !email)
      return NextResponse.json(
        { ok: false, error: "Faltan campos obligatorios." },
        { status: 400 }
      );

    // Limpieza
    const data = {
      name: clean(name),
      email: clean(email),
      phone: clean(phone),
      date: clean(date),
      place: clean(place),
      type: clean(type),
      message: clean(message),
    };

    const text = `
Nuevo lead desde la web:

Nombre: ${data.name}
Email: ${data.email}
Teléfono: ${data.phone}
Fecha: ${data.date}
Lugar: ${data.place}
Tipo: ${data.type}
Mensaje: ${data.message}
`.trim();

    // === Envío por SMTP ===
    if (hasSMTP) {
      try {
        const transport = nodemailer.createTransport({
          host: SMTP_HOST,
          port: Number(SMTP_PORT || 587),
          secure: Number(SMTP_PORT) === 465,
          auth: { user: SMTP_USER, pass: SMTP_PASS },
        });

        await transport.sendMail({
          from: MAIL_FROM,
          to: MAIL_TO,
          subject: `Lead web — ${data.type || "Evento"}`,
          text,
        });
      } catch (err) {
        console.warn("❗ Error enviando correo:", (err as Error).message);
      }
    }

    // === Envío opcional a Telegram ===
    if (hasTelegram) {
      try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
        });
      } catch (err) {
        console.warn("❗ Error enviando Telegram:", (err as Error).message);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("❌ Error API Contacto:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
