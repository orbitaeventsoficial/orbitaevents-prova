import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  icons: { icon: "/favicon.svg", apple: "/favicon.svg", shortcut: "/favicon.svg" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
