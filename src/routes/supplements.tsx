import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ShoppingCart, Tag } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Stars } from "@/components/Stars";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products, productCategories } from "@/lib/data";
import { useCart, priceAfterDiscount } from "@/lib/cart";

export const Route = createFileRoute("/supplements")({
  head: () => ({
    meta: [
      { title: "Supplements Shop — AK Boxing Club" },
      { name: "description", content: "Shop premium protein, creatine, pre-workout, vitamins and BCAA supplements at AK Boxing Club. Fighter-tested fuel for performance and recovery." },
      { property: "og:title", content: "Supplements Shop — AK Boxing Club" },
      { property: "og:description", content: "Fighter-tested protein, creatine, pre-workout, vitamins and BCAA." },
    ],
  }),
  component: SupplementsPage,
});

const sorts = ["Featured", "Price: Low to High", "Price: High to Low", "Top Rated"] as const;

function SupplementsPage() {
  const { add } = useCart();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof productCategories)[number]>("All");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Featured");

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.name.toLowerCase().includes(query.toLowerCase()),
    );
    if (sort === "Price: Low to High") list = [...list].sort((a, b) => priceAfterDiscount(a) - priceAfterDiscount(b));
    if (sort === "Price: High to Low") list = [...list].sort((a, b) => priceAfterDiscount(b) - priceAfterDiscount(a));
    if (sort === "Top Rated") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, category, sort]);

  return (
    <>
      <PageHeader eyebrow="Shop" title="Supplements" subtitle="Fighter-tested fuel for performance, recovery and everyday strength." />

      <section className="section-padding">
        <div className="container-x">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search supplements..."
                className="pl-9"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as (typeof sorts)[number])}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            >
              {sorts.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {productCategories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  category === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <Stagger key={`${category}-${sort}-${query}`} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => {
              const finalPrice = priceAfterDiscount(p);
              return (
                <StaggerItem key={p.id}>
                  <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/60">
                    <div className="relative aspect-square overflow-hidden bg-secondary">
                      <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      {p.discount > 0 && (
                        <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
                          <Tag className="h-3 w-3" /> -{p.discount}%
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">{p.category}</span>
                      <h3 className="mt-1 font-semibold leading-tight">{p.name}</h3>
                      <div className="mt-2 flex items-center gap-2">
                        <Stars rating={p.rating} />
                        <span className="text-xs text-muted-foreground">({p.reviews})</span>
                      </div>
                      <div className="mt-3 flex items-end gap-2">
                        <span className="font-display text-2xl font-bold">${finalPrice.toFixed(2)}</span>
                        {p.discount > 0 && (
                          <span className="mb-1 text-sm text-muted-foreground line-through">${p.price.toFixed(2)}</span>
                        )}
                      </div>
                      <Button variant="hero" size="sm" className="mt-4 w-full" onClick={() => add(p)}>
                        <ShoppingCart className="h-4 w-4" /> Add to Cart
                      </Button>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>

          {filtered.length === 0 && (
            <p className="mt-16 text-center text-muted-foreground">No supplements match your search.</p>
          )}
        </div>
      </section>
    </>
  );
}
