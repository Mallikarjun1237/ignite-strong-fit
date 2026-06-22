import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLUB } from "@/lib/data";
import heroImg from "@/assets/hero-boxing.jpg";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Boxer training at AK Boxing Club" className="h-full w-full object-cover object-center" width={1920} height={1280} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      <div className="container-x relative z-10 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground backdrop-blur">
            <Star className="h-3.5 w-3.5 text-gold" fill="var(--gold)" /> {CLUB.rating} · {CLUB.reviews} reviews · NYC
          </span>
          <h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl">
            Train like a <span className="text-gradient-red">fighter</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Premium boxing in the heart of Lower Manhattan. Small classes, championship coaching, and a community built for everyone.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild variant="hero" size="xl">
              <Link to="/booking">
                Book Your First Class <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outlineHero" size="xl">
              <Link to="/" hash="memberships">View Memberships</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="h-10 w-6 rounded-full border-2 border-muted-foreground/40 p-1.5">
          <div className="h-2 w-full rounded-full bg-muted-foreground/60" />
        </div>
      </motion.div>
    </section>
  );
}
