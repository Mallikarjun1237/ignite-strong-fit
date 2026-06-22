import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, BadgeCheck, Target } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { trainers } from "@/lib/data";

export const Route = createFileRoute("/trainers")({
  head: () => ({
    meta: [
      { title: "Trainers — AK Boxing Club" },
      { name: "description", content: "Meet the championship-level coaches at AK Boxing Club. Book a 1-on-1 session with a certified boxing trainer in NYC." },
      { property: "og:title", content: "Our Trainers — AK Boxing Club" },
      { property: "og:description", content: "Certified, experienced boxing coaches ready to take your training to the next level." },
    ],
  }),
  component: TrainersPage,
});

function TrainersPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Team"
        title="Meet Your Coaches"
        subtitle="Championship experience, real certifications, and a genuine commitment to your progress."
      />
      <section className="section-padding">
        <div className="container-x">
          <Stagger className="grid gap-7 sm:grid-cols-2 lg:grid-cols-2">
            {trainers.map((t) => (
              <StaggerItem key={t.id}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/60 sm:flex-row">
                  <div className="relative h-64 w-full overflow-hidden sm:h-auto sm:w-2/5">
                    <img src={t.image} alt={t.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-2xl font-bold uppercase">{t.name}</h3>
                    <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"><Award className="h-4 w-4 text-primary" /> {t.experience} experience</p>
                    <p className="mt-1.5 flex items-center gap-2 text-sm text-muted-foreground"><Target className="h-4 w-4 text-primary" /> {t.specialization}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {t.certifications.map((c) => (
                        <span key={c} className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                          <BadgeCheck className="h-3 w-3 text-primary" /> {c}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 flex-1 text-sm text-muted-foreground">{t.bio}</p>
                    <Button asChild variant="hero" size="sm" className="mt-5 w-fit">
                      <Link to="/booking">Book a Session</Link>
                    </Button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
