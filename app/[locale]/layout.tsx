import type { Metadata } from "next";
import { Zilla_Slab, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "../globals.css";

// Per Visual Design System Section 3: only the display serif and mono data
// face load as webfonts. Body text (Work Sans) leans on a fast system-font
// stack first — the two font loads below are deliberately narrow (single
// weight each) to protect the low-bandwidth performance budget.
const zillaSlab = Zilla_Slab({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-zilla-slab",
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
  // Falls back to the current Vercel deployment URL until a custom domain
  // is confirmed (Brief, Open Question 3) — set NEXT_PUBLIC_SITE_URL once
  // one is secured.
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
      <body className={`${zillaSlab.variable} ${workSans.variable} ${plexMono.variable}`}>
        <NextIntlClientProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Header locale={locale} />
          <main id="main-content">{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
