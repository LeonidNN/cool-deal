"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled ? "bg-white/90 backdrop-blur border-b border-[color:var(--border)]" : "bg-transparent"
      }`}
    >
      <div className="section h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg text-[color:var(--text)]">
          CoolDeal
        </Link>

        <nav className="hidden sm:flex items-center gap-6 text-[color:var(--muted)]">
          <Link href="#how">Как это работает</Link>
          <Link href="#benefits">Преимущества</Link>
          <Link href="#use">Применение</Link>
          <Link href="#contact">Контакты</Link>
        </nav>

        <a
          href="#contact"
          className="inline-flex items-center rounded-xl bg-[color:var(--primary)] hover:bg-[color:var(--primary-600)] text-white px-4 py-2 text-sm font-medium transition-transform duration-200 will-change-transform hover:-translate-y-0.5"
        >
          Оставить заявку на тест
        </a>
      </div>
    </header>
  );
}
