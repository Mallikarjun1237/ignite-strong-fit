import { motion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { gallery } from "@/lib/data";

export function Gallery() {
  return (
    <section className="section-padding">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Inside the club</span>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase md:text-5xl">The gallery</h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {gallery.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className={`group relative overflow-hidden rounded-xl border border-border ${i % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              <img
                src={src}
                alt={`AK Boxing Club ${i + 1}`}
                loading="lazy"
                className="aspect-square h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
