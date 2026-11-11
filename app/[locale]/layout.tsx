import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuroraBackground } from "@/components/motion/AuroraBackground";
import { ScrollProgress } from "@/components/motion/ScrollProgress";

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

  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <NextIntlClientProvider>
      <div lang={locale}>
        <a href="#main-content" className="skip-link">
          {t("skipToContent")}
        </a>
        <AuroraBackground />
        <ScrollProgress />
        <Header />
        <main id="main-content" className="relative">
          {children}
        </main>
        <Footer locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}
