import { Phone, Mail, MessageCircle, MapPin, Navigation, Instagram, Facebook, Youtube } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { CLUB } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Get in touch</span>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase md:text-5xl">Come train with us</h2>
          <p className="mt-4 text-muted-foreground">{CLUB.address}</p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <a href={`tel:${CLUB.phone}`} className="flex items-center gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/60">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/15 text-primary"><Phone className="h-5 w-5" /></span>
                <div><p className="text-xs uppercase tracking-wide text-muted-foreground">Call</p><p className="font-semibold">{CLUB.phone}</p></div>
              </a>
              <a href={`mailto:${CLUB.email}`} className="flex items-center gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/60">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/15 text-primary"><Mail className="h-5 w-5" /></span>
                <div><p className="text-xs uppercase tracking-wide text-muted-foreground">Email</p><p className="font-semibold">{CLUB.email}</p></div>
              </a>
              <a href={`https://wa.me/${CLUB.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/60">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/15 text-primary"><MessageCircle className="h-5 w-5" /></span>
                <div><p className="text-xs uppercase tracking-wide text-muted-foreground">WhatsApp</p><p className="font-semibold">Message us</p></div>
              </a>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-5">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/15 text-primary"><MapPin className="h-5 w-5" /></span>
                <div><p className="text-xs uppercase tracking-wide text-muted-foreground">Visit</p><p className="font-semibold">Lower Manhattan</p></div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-5">
              <p className="text-sm font-medium text-muted-foreground">Follow us</p>
              <div className="ml-auto flex gap-2">
                <a href={CLUB.social.instagram} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
                <a href={CLUB.social.facebook} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground" aria-label="Facebook"><Facebook className="h-4 w-4" /></a>
                <a href={CLUB.social.youtube} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground" aria-label="YouTube"><Youtube className="h-4 w-4" /></a>
              </div>
            </div>

            <Button asChild variant="hero" size="lg" className="w-full">
              <a href={CLUB.mapsDirections} target="_blank" rel="noreferrer">
                <Navigation className="h-4 w-4" /> Get Directions
              </a>
            </Button>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full min-h-[360px] overflow-hidden rounded-2xl border border-border">
              <iframe
                title="AK Boxing Club location"
                src={CLUB.mapsEmbed}
                className="h-full min-h-[360px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
