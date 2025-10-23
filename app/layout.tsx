import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orbita Events",
  icons: {
    icon: "/img/brand/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
