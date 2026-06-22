import { Reveal } from "@/components/motion/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data";

export function Faq() {
  return (
    <section className="section-padding bg-card/40">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">FAQ</span>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase md:text-5xl">Got questions?</h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to know before stepping into the ring. Still curious? Reach out — we'd love to chat.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left font-display text-lg uppercase hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
