import { Star } from "lucide-react";

export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4"
          fill={i < Math.round(rating) ? "var(--gold)" : "transparent"}
          stroke="var(--gold)"
        />
      ))}
    </div>
  );
}
