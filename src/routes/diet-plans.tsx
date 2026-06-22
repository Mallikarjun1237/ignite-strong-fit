import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Dumbbell, Activity, Leaf, Clock, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { dietPlans } from "@/lib/data";

export const Route = createFileRoute("/diet-plans")({
  head: () => ({
    meta: [
      { title: "Diet Plans — AK Boxing Club" },
      { name: "description", content: "Performance nutrition for fighters: fat loss, muscle gain, boxing performance and vegetarian athlete diet plans with full macros and meal counts." },
      { property: "og:title", content: "Diet Plans — AK Boxing Club" },
      { property: "og:description", content: "Coach-designed nutrition plans with calories, macros, meals and duration." },
    ],
  }),
  component: DietPlansPage,
});

const goalIcons: Record<string, LucideIcon> = {
  Cut: Flame,
  Bulk: Dumbbell,
  Performance: Activity,
  "Plant-based": Leaf,
};

function Macro({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/50 p-3 text-center">
      <p className="font-display text-xl font-bold" style={{ color }}>{value}</p>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
    </div>
  );
}

function DietPlansPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nutrition"
        title="Fuel The Fight"
        subtitle="Coach-built diet plans engineered to match your goals — every gram accounted for."
      />
      <section className="section-padding">
        <div className="container-x">
          <Stagger className="grid gap-7 md:grid-cols-2">
            {dietPlans.map((d) => {
              const Icon = goalIcons[d.goal] ?? UtensilsCrossed;
              return (
                <StaggerItem key={d.id}>
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/60">
                    <div className="flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary"><Icon className="h-6 w-6" /></span>
                      <span className="rounded-full border border-border px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{d.goal}</span>
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-bold uppercase">{d.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{d.description}</p>

                    <div className="mt-6 flex items-center gap-2">
                      <span className="font-display text-4xl font-bold text-foreground">{d.calories.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground">kcal / day</span>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                      <Macro label="Protein" value={`${d.protein}g`} color="var(--primary)" />
                      <Macro label="Carbs" value={`${d.carbs}g`} color="var(--gold)" />
                      <Macro label="Fats" value={`${d.fats}g`} color="var(--chart-3)" />
                    </div>

                    <div className="mt-5 flex items-center gap-5 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2"><UtensilsCrossed className="h-4 w-4 text-primary" /> {d.meals} meals/day</span>
                      <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {d.duration}</span>
                    </div>

                    <Button asChild variant="outlineHero" size="sm" className="mt-6 w-fit">
                      <Link to="/booking">Get this plan</Link>
                    </Button>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>
    </>
  );
}
