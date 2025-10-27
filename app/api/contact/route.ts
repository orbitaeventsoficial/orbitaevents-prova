// app/api/contact/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";          // Resend/Nodemailer necesitan Node
export const dynamic = "force-dynamic";   // evita cachés en rutas de API

type Payload = {
  name?: string;
  email?: string;
  date?: string;
  place?: string;
  message?: string;
  hp?: string; // honeypot
  ts?: number; // timestamp cliente
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQ = 3;

// Nota: este bucket es volátil (serverless). Para prod real, usa Redis/Upstash.
const bucket = new Map<string, { count: number; ts: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const rec = bucket.get(ip);
  if (!rec || now - rec.ts > WINDOW_MS) {
    bucket.set(ip, { count: 1, ts: now });
    return false;
  }
  if (rec.count >= MAX_REQ) return true;
  rec.count += 1;
  return false;
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function clip(s: unknown, max = 2000) {
  return String(s ?? "").slice(0, max).trim();
}

function escapeHtml(s: string) {
  return s.replace(
    /[&<>"']/g,
    ch =>
      (
        {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;",
        } as Record<string, string>
      )[ch]
  );
}

function getClientIP(req: NextRequest) {
  return (
    // Next 14 en Node: req.ip puede venir vacío; usa XFF como respaldo
    (req as any).ip ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "0.0.0.0"
  );
}

function badOrigin(req: NextRequest) {
  const origin = req.headers.get("origin") || "";
  const host = req.headers.get("host") || "";
  const envBase = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "";

  // Permite http y https del host actual (dev) y el dominio público si existe
  const allowed = new Set<string>([
    host ? `http://${host}` : "",
    host ? `https://${host}` : "",
    envBase,
  ]);

  // Si no hay origin (p. ej. curl), no bloquear
  if (!origin) return false;

  return !Array.from(allowed).some(o => o && origin.startsWith(o));
}

export async function POST(req: NextRequest) {
  try {
    // Origen
    if (badOrigin(req)) {
      return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
    }

    // Rate limit básico
    const ip = getClientIP(req);
    if (rateLimit(ip)) {
      return NextResponse.json({ error: "Demasiadas solicitudes" }, { status: 429 });
    }

    // Tamaño razonable
    const lenHeader = req.headers.get("content-length");
    const len = Number(lenHeader ?? 0);
    if (Number.isFinite(len) && len > 32 * 1024) {
      return NextResponse.json({ error: "Payload demasiado grande" }, { status: 413 });
    }

    const body = (await req.json()) as Payload;

    // Honeypot y velocidad mínima
    if (clip(body.hp)) return NextResponse.json({ ok: true });
    const tookMs = Date.now() - Number(body.ts || 0);
    if (!body.ts || tookMs < 900) return NextResponse.json({ ok: true }); // ignora bots rápidos

    // Sanitización
    const name = clip(body.name, 120);
    const email = clip(body.email, 160).toLowerCase();
    const date = clip(body.date, 40);
    const place = clip(body.place, 160);
    const message = clip(body.message, 4000);

    // Validación dura
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nombre, email y mensaje son obligatorios." },
        { status: 400 }
      );
    }
    if (!isEmail(email)) {
      return NextResponse.json({ error: "Email inválido." }, { status: 400 });
    }
    if (message.length < 10) {
      return NextResponse.json({ error: "Mensaje demasiado corto." }, { status: 400 });
    }

    // Email
    const subject = `Contacto web — ${name} (${date || "sin fecha"})`;
    const lines = [
      `Nombre: ${name}`,
      `Email: ${email}`,
      date && `Fecha: ${date}`,
      place && `Lugar: ${place}`,
      "",
      message,
    ].filter(Boolean) as string[];

    const text = lines.join("\n");
    const html = `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:15px;line-height:1.5;color:#0a0a0b">
        <h2 style="margin:0 0 8px 0;font-size:18px">Nuevo contacto web</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${date ? `<p><strong>Fecha:</strong> ${escapeHtml(date)}</p>` : ""}
        ${place ? `<p><strong>Lugar:</strong> ${escapeHtml(place)}</p>` : ""}
        <hr style="border:none;border-top:1px solid #eee;margin:12px 0" />
        <pre style="white-space:pre-wrap;font:inherit">${escapeHtml(message)}</pre>
      </div>
    `;

    const toEmail = process.env.CONTACT_TO || "info@orbitaevents.cat";

    // Resend primero
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      // typing flexible para evitar que TS proteste por 'reply_to'
      const payload: Record<string, unknown> = {
        from: "Orbita Web <no-reply@orbitaevents.cat>", // dom verificado
        to: [toEmail],
        subject,
        text,
        html,
        // Resend acepta 'reply_to'. Si usas el SDK oficial, ajusta a su tipo.
        reply_to: email,
      };

      const resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const t = await resp.text().catch(() => "");
        console.error("[Resend error]", t);
        return NextResponse.json({ error: "Error al enviar (Resend)" }, { status: 502 });
      }

      return NextResponse.json({ ok: true });
    }

    // SMTP fallback
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      const nodemailer = await import("nodemailer");
      const transport = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transport.sendMail({
        from: `"Orbita Web" <${smtpUser}>`,
        to: toEmail,
        replyTo: email,
        subject,
        text,
        html,
      });

      return NextResponse.json({ ok: true });
    }

    // Sin proveedor: log y OK silencioso
    console.warn("[contact] sin proveedor configurado", { name, email, date, place, ip });
    return NextResponse.json({ ok: true, note: "Solo log (sin email provider)" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error inesperado";
    console.error("[contact] ERROR", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
