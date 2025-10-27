import {
  Inter,
  League_Spartan as LeagueSpartan,
  Outfit,
  Space_Grotesk as SpaceGrotesk,
} from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const league = LeagueSpartan({
  subsets: ["latin"],
  variable: "--font-league",
  weight: ["400", "600", "700"],
});

export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const space = SpaceGrotesk({
  subsets: ["latin"],
  variable: "--font-space",
});
