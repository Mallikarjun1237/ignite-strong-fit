import { Footprints, Zap, Swords, Flame, Heart, Users, Clock, ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { programs } from "@/lib/data";

const icons: Record<string, LucideIcon> = { Footprints, Zap, Swords, Flame, Heart, Users };

export function Programs() {
  return (
    <section id="programs" className="section-padding bg-card/40">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">What we offer</span>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase md:text-5xl">Programs for every fighter</h2>
          <p className="mt-4 text-muted-foreground">From your very first jab to fight-night sparring, there's a class with your name on it.</p>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => {
            const Icon = icons[p.icon] ?? Flame;
            return (
              <StaggerItem key={p.id}>
                <div className="group h-full rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-full border border-border px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{p.level}</span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold uppercase">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                  <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" /> {p.duration}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mt-12 text-center">
          <Button asChild variant="hero" size="lg">
            <Link to="/booking">Reserve your spot <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
