import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import type { Product } from "@/lib/data";

export interface CartLine extends Product {
  qty: number;
}

interface CartCtx {
  lines: CartLine[];
  count: number;
  total: number;
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);

export function priceAfterDiscount(p: Product) {
  return p.discount > 0 ? p.price * (1 - p.discount / 100) : p.price;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const value = useMemo<CartCtx>(() => {
    const add = (p: Product) => {
      setLines((prev) => {
        const existing = prev.find((l) => l.id === p.id);
        if (existing) return prev.map((l) => (l.id === p.id ? { ...l, qty: l.qty + 1 } : l));
        return [...prev, { ...p, qty: 1 }];
      });
      toast.success(`${p.name} added to cart`);
    };
    const remove = (id: string) => setLines((prev) => prev.filter((l) => l.id !== id));
    const setQty = (id: string, qty: number) =>
      setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty: Math.max(1, qty) } : l)));
    const clear = () => setLines([]);
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const total = lines.reduce((s, l) => s + priceAfterDiscount(l) * l.qty, 0);
    return { lines, count, total, add, remove, setQty, clear };
  }, [lines]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
