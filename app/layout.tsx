import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Аналитика Plausible (без куки)
import Script from "next/script";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "CoolDeal — Прохлада там, где она нужна больше всего",
  description:
    "Охлаждающая одежда для работы и движения в жару: жидкостное охлаждение, воздушное охлаждение и воздушный обдув. Протестируйте бесплатно.",
  openGraph: {
    title: "CoolDeal — Прохлада там, где она нужна больше всего",
    description:
      "Охлаждающая одежда: жидкостное, воздушное охлаждение и воздушный обдув. Бесплатное тестирование.",
    url: "https://cool-deal.ru",
    siteName: "CoolDeal",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        {/* Plausible */}
        <Script defer data-domain="cool-deal.ru" src="https://plausible.io/js/script.js" />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
