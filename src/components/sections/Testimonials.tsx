import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Stars } from "@/components/Stars";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    const id = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [emblaApi, onSelect]);

  return (
    <section className="section-padding bg-card/40">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Testimonials</span>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase md:text-5xl">Fighters in their words</h2>
        </Reveal>

        <Reveal className="mt-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((t) => (
                <div key={t.id} className="min-w-0 shrink-0 grow-0 basis-full px-2 md:basis-1/2">
                  <div className="h-full rounded-2xl border border-border bg-card p-8">
                    <Quote className="h-8 w-8 text-primary/40" />
                    <p className="mt-4 text-lg text-foreground">"{t.quote}"</p>
                    <div className="mt-6 flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{t.name}</p>
                        <p className="text-sm text-muted-foreground">{t.role}</p>
                      </div>
                      <Stars rating={t.rating} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button onClick={() => emblaApi?.scrollPrev()} className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:bg-primary hover:text-primary-foreground" aria-label="Previous">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <span key={i} className={`h-2 rounded-full transition-all ${i === selected ? "w-6 bg-primary" : "w-2 bg-border"}`} />
              ))}
            </div>
            <button onClick={() => emblaApi?.scrollNext()} className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:bg-primary hover:text-primary-foreground" aria-label="Next">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
