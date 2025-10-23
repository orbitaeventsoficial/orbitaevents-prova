import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://orbita.events"),
  title: {
    default: "Òrbita Events — Técnica, música y emoción",
    template: "%s · Òrbita Events",
  },
  description: "Productora técnica con foco en discomóvil, tematizaciones y bodas.",
  icons: [{ rel: "icon", url: "/img/brand/favicon.svg" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
