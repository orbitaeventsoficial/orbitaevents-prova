'use client';

import { useMemo, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import dynamic from 'next/dynamic';
import { useReCaptcha } from 'next-recaptcha-v3';
import type { ReCaptchaProviderProps } from 'next-recaptcha-v3';
import { motion } from 'framer-motion';

// Provider perezoso sin SSR
const ReCaptchaProvider = dynamic<ReCaptchaProviderProps>(
  () => import('next-recaptcha-v3').then(m => m.ReCaptchaProvider),
  { ssr: false }
);

type FormValues = {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
  budget?: string;
  recaptchaToken?: string;
};

const schema = Yup.object({
  nombre: Yup.string().min(2, 'Nombre demasiado corto').required('Requerido'),
  email: Yup.string().email('Email inválido').required('Requerido'),
  telefono: Yup.string().max(30, 'Demasiado largo').optional(),
  mensaje: Yup.string().min(10, 'Cuéntame un poco más').required('Requerido'),
  budget: Yup.string().optional(),
});

function ContactFormInner() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
  const recaptchaAvailable = Boolean(siteKey);

  const { executeRecaptcha } = useReCaptcha();

  const initialValues = useMemo<FormValues>(
    () => ({ nombre: '', email: '', telefono: '', mensaje: '', budget: '', recaptchaToken: '' }),
    []
  );

  async function onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>) {
    setServerError(null);
    try {
      let token: string | undefined;
      if (recaptchaAvailable && executeRecaptcha) {
        token = await executeRecaptcha('contact_form');
      }

      const payload = { ...values, recaptchaToken: token };

      // TODO: envía a tu API real
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(payload) });

      await new Promise(r => setTimeout(r, 600)); // fake
      setSent(true);
    } catch (err: any) {
      setServerError(err?.message || 'Error inesperado');
    } finally {
      helpers.setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-h2">¡Recibido!</h1>
        <p className="mt-4 text-white/70">
          Te respondemos en menos de 24 horas. Si lo necesitas urgente, escríbenos por WhatsApp.
        </p>
        <a
          href="https://wa.me/34699121023"
          target="_blank"
          rel="noopener noreferrer"
          className="oe-btn-gold mt-8 inline-flex"
        >
          WhatsApp
        </a>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-h2 text-center">Pide presupuesto</h1>
      <p className="mt-3 text-center text-white/70">
        Producción técnica, DJ, tematizaciones. Respuesta en 24h.
      </p>

      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form className="mt-10 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm text-white/80">Nombre*</label>
                <Field
                  name="nombre"
                  className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-3"
                  placeholder="Tu nombre"
                />
                <ErrorMessage name="nombre" component="div" className="mt-2 text-sm text-red-400" />
              </div>
              <div>
                <label className="block text-sm text-white/80">Email*</label>
                <Field
                  name="email"
                  type="email"
                  className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-3"
                  placeholder="tucorreo@dominio.com"
                />
                <ErrorMessage name="email" component="div" className="mt-2 text-sm text-red-400" />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm text-white/80">Teléfono</label>
                <Field
                  name="telefono"
                  className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-3"
                  placeholder="+34 600 000 000"
                />
                <ErrorMessage name="telefono" component="div" className="mt-2 text-sm text-red-400" />
              </div>
              <div>
                <label className="block text-sm text-white/80">Presupuesto aprox.</label>
                <Field
                  name="budget"
                  as="select"
                  className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-3"
                >
                  <option value="">Selecciona</option>
                  <option value="500-1000">500–1000€</option>
                  <option value="1000-2000">1000–2000€</option>
                  <option value="2000-5000">2000–5000€</option>
                  <option value="5000+">5000€+</option>
                </Field>
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/80">Cuéntanos tu evento*</label>
              <Field
                name="mensaje"
                as="textarea"
                rows={5}
                className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-3"
                placeholder="Fecha, lugar, asistentes, qué necesitas…"
              />
              <ErrorMessage name="mensaje" component="div" className="mt-2 text-sm text-red-400" />
            </div>

            {!recaptchaAvailable && (
              <p className="text-xs text-white/50">
                reCAPTCHA no configurado. Define <code>NEXT_PUBLIC_RECAPTCHA_SITE_KEY</code> para activarlo.
              </p>
            )}

            {serverError && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {serverError}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileTap={{ scale: 0.98 }}
              className="oe-btn-gold w-full sm:w-auto"
            >
              {isSubmitting ? 'Enviando…' : 'Pedir presupuesto'}
            </motion.button>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default function ContactClient() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
  const recaptchaAvailable = Boolean(siteKey);

  // Si no hay clave, no montamos el Provider y evitamos avisos en SSR/CSR
  if (!recaptchaAvailable) {
    return <ContactFormInner />;
  }

  return (
    <ReCaptchaProvider reCaptchaKey={siteKey}>
      <ContactFormInner />
    </ReCaptchaProvider>
  );
}
