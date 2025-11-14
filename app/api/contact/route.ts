// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

// Validación de datos
const contactSchema = z.object({
  name: z.string().min(2).max(50),
  contact: z.string().min(3),
  event: z.string().min(1),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { name, contact, event, message } = parsed.data;

    // Transporter SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email al administrador
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_TO || "info@orbitaevents.com",
      subject: `🎉 Nuevo Lead: ${name} (${event})`,
      html: `
        <h2>Nuevo contacto desde la web</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email/Tel:</strong> ${contact}</p>
        <p><strong>Evento:</strong> ${event}</p>
        <p><strong>Mensaje:</strong> ${message || "(sin mensaje)"}</p>
      `,
    });

    // Email de confirmación al cliente (si es email válido)
    if (contact.includes("@")) {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: contact,
        subject: "✅ Mensaje recibido - Òrbita Events",
        html: `
          <h2>¡Hola ${name}!</h2>
          <p>Hemos recibido tu mensaje sobre <strong>${event}</strong>.</p>
          <p>Te responderemos en menos de 2 horas con tu presupuesto personalizado.</p>
          <p>Si prefieres, puedes escribirnos directo a <a href="https://wa.me/34699121023">WhatsApp</a>.</p>
          <p><strong>Equipo Òrbita Events</strong></p>
        `,
      });
    }

    return NextResponse.json({ ok: true, message: "Mensaje enviado con éxito" });
  } catch (error) {
    console.error("Error en /api/contact:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
