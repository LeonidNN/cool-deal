"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PropsWithChildren } from "react";

export default function Section({
  id,
  title,
  subtitle,
  children,
}: PropsWithChildren<{ id?: string; title?: string; subtitle?: string }>) {
  const reduce = useReducedMotion();

  return (
    <section id={id} className="section py-16 sm:py-24">
      {(title || subtitle) && (
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 16 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 sm:mb-14"
        >
          {title && <h2 className="text-3xl sm:text-4xl font-bold text-[color:var(--text)]">{title}</h2>}
          {subtitle && <p className="mt-3 text-[color:var(--muted)] max-w-3xl">{subtitle}</p>}
        </motion.div>
      )}
      {children}
    </section>
  );
}
