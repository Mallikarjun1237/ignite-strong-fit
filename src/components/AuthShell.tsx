import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Dumbbell } from "lucide-react";
import type { ReactNode } from "react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 py-28">
      <div className="absolute inset-0 -z-10 opacity-50">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl border border-border bg-card p-8"
      >
        <Link to="/" className="mx-auto flex w-fit items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
            <Dumbbell className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-bold uppercase tracking-wide">
            AK <span className="text-primary">Boxing</span>
          </span>
        </Link>
        <h1 className="mt-6 text-center font-display text-3xl font-bold uppercase">{title}</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">{subtitle}</p>
        <div className="mt-7">{children}</div>
        <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
      </motion.div>
    </section>
  );
}
