import { Check, Crown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { memberships } from "@/lib/data";

export function Memberships() {
  return (
    <section id="memberships" className="section-padding">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Memberships</span>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase md:text-5xl">Pick your weight class</h2>
          <p className="mt-4 text-muted-foreground">No contracts, no lock-in. Switch or freeze anytime.</p>
        </Reveal>

        <Stagger className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {memberships.map((plan) => (
            <StaggerItem key={plan.id} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-8 transition-all hover:-translate-y-1 ${
                  plan.highlight ? "border-primary bg-card glow-red" : "border-border bg-card"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
                    Most popular
                  </span>
                )}
                <div className="flex items-center gap-2">
                  {plan.name === "Gold" && <Crown className="h-5 w-5 text-gold" />}
                  <h3 className="font-display text-2xl font-bold uppercase">{plan.name}</h3>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>
                <div className="mt-6 flex items-end gap-1">
                  <span className="font-display text-5xl font-bold">${plan.price}</span>
                  <span className="mb-2 text-muted-foreground">/{plan.period}</span>
                </div>
                <ul className="mt-7 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant={plan.highlight ? "hero" : "outlineHero"} size="lg" className="mt-8 w-full">
                  <Link to="/booking">Choose {plan.name}</Link>
                </Button>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
