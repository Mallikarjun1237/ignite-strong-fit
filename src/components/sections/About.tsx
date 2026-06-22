import { Award, Users, HeartHandshake, Rainbow } from "lucide-react";
import { Reveal, Counter } from "@/components/motion/Reveal";
import { Stars } from "@/components/Stars";
import { CLUB } from "@/lib/data";
import gymImg from "@/assets/gym-interior.jpg";

const highlights = [
  { icon: Users, title: "Small class sizes", text: "Capped classes mean real, personal coaching every round." },
  { icon: Award, title: "Personalized coaching", text: "Championship-level trainers who scale to your level." },
  { icon: HeartHandshake, title: "Black-owned", text: "Proudly independent and community-first since day one." },
  { icon: Rainbow, title: "LGBTQ+ friendly", text: "Everyone trains, everyone belongs. Always." },
];

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <img src={gymImg} alt="AK Boxing Club gym interior" loading="lazy" width={1280} height={960} className="rounded-2xl border border-border object-cover" />
            <div className="absolute -bottom-6 -right-4 rounded-2xl border border-border bg-card/95 p-6 backdrop-blur glow-red sm:-right-6">
              <div className="flex items-end gap-2">
                <span className="font-display text-5xl font-bold leading-none text-foreground">
                  <Counter to={CLUB.rating} decimals={1} />
                </span>
                <Stars rating={5} className="mb-1.5" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                from <Counter to={CLUB.reviews} /> verified reviews
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Who we are</span>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase md:text-5xl">
              More than a gym.<br />A fight family.
            </h2>
            <p className="mt-5 text-muted-foreground">
              {CLUB.name} was built on one belief: world-class boxing should feel personal. We keep classes small, our coaching sharp, and our doors open to everyone who's ready to put in the work.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.08}>
                <div className="flex gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
                    <h.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{h.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{h.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
