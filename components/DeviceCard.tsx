"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

type Props = {
  title: string;
  bullets: string[];
  href: string;
};

export default function DeviceCard({ title, bullets, href }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? {} : { opacity: 0, y: 16 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      whileHover={reduce ? {} : { scale: 1.02 }}
      className="card p-6 sm:p-7 flex flex-col justify-between"
    >
      <div>
        <h3 className="text-xl font-semibold text-[color:var(--text)]">{title}</h3>
        <ul className="mt-3 space-y-2 text-[color:var(--muted)]">
          {bullets.map((b, i) => (
            <li key={i} className="leading-relaxed">• {b}</li>
          ))}
        </ul>
      </div>

      <Link
        href={href}
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-[color:var(--primary)] hover:bg-[color:var(--primary-600)] text-white px-4 py-2 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
      >
        Подробнее
      </Link>
    </motion.div>
  );
}
