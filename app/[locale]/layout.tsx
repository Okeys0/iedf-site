import type { Metadata } from "next";
import { Instrument_Serif, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuroraBackground } from "@/components/motion/AuroraBackground";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import "../globals.css";

// Emerald Luxe typography: Instrument Serif (normal + italic) carries the
// editorial display voice; Work Sans is the workhorse body; Plex Mono
// handles data/eyebrow labels. Weights kept narrow for performance.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
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
    images: ["/images/logo-full.jpg"],
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${instrumentSerif.variable} ${workSans.variable} ${plexMono.variable} antialiased`}>
        <NextIntlClientProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <AuroraBackground />
          <ScrollProgress />
          <Header />
          <main id="main-content" className="relative">
            {children}
          </main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
