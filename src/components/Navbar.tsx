import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Menu, X, Dumbbell, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart, priceAfterDiscount } from "@/lib/cart";
import { CLUB } from "@/lib/data";

interface NavItem {
  label: string;
  to: string;
  hash?: string;
}

const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/", hash: "about" },
  { label: "Programs", to: "/", hash: "programs" },
  { label: "Memberships", to: "/", hash: "memberships" },
  { label: "Trainers", to: "/trainers" },
  { label: "Supplements", to: "/supplements" },
  { label: "Diet Plans", to: "/diet-plans" },
  { label: "Booking", to: "/booking" },
  { label: "Contact", to: "/", hash: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-border bg-background/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
            <Dumbbell className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-bold uppercase tracking-wide">
            AK <span className="text-primary">Boxing</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                hash={item.hash}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeOptions={{ exact: !item.hash && item.to === "/" }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 xl:gap-3">
          <CartButton />
          <Button asChild variant="ghost" size="sm" className="hidden xl:inline-flex">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild variant="hero" size="sm" className="hidden xl:inline-flex">
            <Link to="/booking">Book a Class</Link>
          </Button>
          <button
            className="grid h-10 w-10 place-items-center rounded-md text-foreground xl:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="overflow-hidden border-t border-border bg-background xl:hidden"
        >
          <ul className="container-x flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  hash={item.hash}
                  className="block rounded-md px-3 py-2.5 font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 grid grid-cols-2 gap-3 px-1">
              <Button asChild variant="outline" size="sm">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild variant="hero" size="sm">
                <Link to="/booking">Book</Link>
              </Button>
            </li>
            <li className="px-3 pt-2 text-xs text-muted-foreground">{CLUB.phone}</li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}

function CartButton() {
  const { lines, count, total, remove, setQty, clear } = useCart();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative grid h-10 w-10 place-items-center rounded-md text-foreground transition-colors hover:bg-secondary" aria-label="Open cart">
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
              {count}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display uppercase">Your Cart</SheetTitle>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center text-muted-foreground">
            <ShoppingBag className="h-10 w-10 opacity-40" />
            <p>Your cart is empty.</p>
            <Button asChild variant="outlineHero" size="sm">
              <Link to="/supplements">Shop supplements</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto py-2">
              {lines.map((l) => (
                <div key={l.id} className="flex gap-3 rounded-lg border border-border p-3">
                  <img src={l.image} alt={l.name} className="h-16 w-16 rounded-md object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-tight">{l.name}</p>
                    <p className="text-sm text-primary">${priceAfterDiscount(l).toFixed(2)}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <button onClick={() => setQty(l.id, l.qty - 1)} className="grid h-6 w-6 place-items-center rounded border border-border">−</button>
                      <span className="w-6 text-center text-sm">{l.qty}</span>
                      <button onClick={() => setQty(l.id, l.qty + 1)} className="grid h-6 w-6 place-items-center rounded border border-border">+</button>
                    </div>
                  </div>
                  <button onClick={() => remove(l.id)} className="self-start text-muted-foreground hover:text-primary" aria-label="Remove">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-display text-2xl font-bold">${total.toFixed(2)}</span>
              </div>
              <Button variant="hero" size="lg" className="w-full" onClick={() => clear()}>
                Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
