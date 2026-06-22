import { motion } from "motion/react";
import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-card/40 pt-32 pb-14">
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />
      </div>
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          {eyebrow && <span className="text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</span>}
          <h1 className="mt-3 font-display text-4xl font-bold uppercase md:text-6xl">{title}</h1>
          {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
          {children}
        </motion.div>
      </div>
    </section>
  );
}
