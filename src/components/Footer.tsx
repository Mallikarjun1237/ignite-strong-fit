import { Link } from "@tanstack/react-router";
import { Dumbbell, Instagram, Facebook, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { CLUB } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
              <Dumbbell className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold uppercase tracking-wide">
              AK <span className="text-primary">Boxing</span>
            </span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            New York City's home for premium boxing. Black-owned, LGBTQ+ friendly, and built for fighters of every level.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={CLUB.social.instagram} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-md bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
            <a href={CLUB.social.facebook} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-md bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground" aria-label="Facebook"><Facebook className="h-4 w-4" /></a>
            <a href={CLUB.social.youtube} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-md bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground" aria-label="YouTube"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" hash="programs" className="hover:text-foreground">Programs</Link></li>
            <li><Link to="/" hash="memberships" className="hover:text-foreground">Memberships</Link></li>
            <li><Link to="/trainers" className="hover:text-foreground">Trainers</Link></li>
            <li><Link to="/supplements" className="hover:text-foreground">Supplements</Link></li>
            <li><Link to="/diet-plans" className="hover:text-foreground">Diet Plans</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Account</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/booking" className="hover:text-foreground">Book a Class</Link></li>
            <li><Link to="/login" className="hover:text-foreground">Login</Link></li>
            <li><Link to="/register" className="hover:text-foreground">Register</Link></li>
            <li><Link to="/admin" className="hover:text-foreground">Admin Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Visit Us</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{CLUB.address}</span></li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a href={`tel:${CLUB.phone}`} className="hover:text-foreground">{CLUB.phone}</a></li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a href={`mailto:${CLUB.email}`} className="hover:text-foreground">{CLUB.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5">
        <p className="container-x text-xs text-muted-foreground">
          © {new Date().getFullYear()} {CLUB.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
