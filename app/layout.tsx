import type { Metadata } from "next";
import {
  Instrument_Serif,
  Playfair_Display,
  Work_Sans,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

/** Bold prestige face — used for the hero organization lockup name. */
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800"],
  style: ["normal"],
  variable: "--font-playfair",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-work-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://iedf-site.vercel.app"),
  title: {
    default: "Ikeduru Economic Development Forum (IEDF)",
    template: "%s | IEDF",
  },
  description:
    "IEDF is a diaspora-home founded, apolitical economic development forum working toward a self-sustaining Ikeduru, Imo State, Nigeria.",
  icons: {
    icon: "/favicon.ico",
    apple: "/images/apple-touch-icon.png",
  },
  openGraph: {
    images: ["/images/og-iedf.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-iedf.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${instrumentSerif.variable} ${playfairDisplay.variable} ${workSans.variable} ${plexMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
