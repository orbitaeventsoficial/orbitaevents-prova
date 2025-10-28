// app/fonts.ts
import { Inter, Space_Grotesk } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const space = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space",
  weight: ["400","500","600","700"],
});
