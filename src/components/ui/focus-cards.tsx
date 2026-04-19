import { useState } from "react";
import { cn } from "@/lib/utils";

interface FocusCardsProps<T> {
  cards: T[];
  className?: string;
  renderCard: (card: T, index: number, hovered: boolean) => React.ReactNode;
}

export function FocusCards<T>({ cards, className, renderCard }: FocusCardsProps<T>) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3", className)}>
      {cards.map((card, index) => {
        const hovered = hoveredIndex === index;
        const blurred = hoveredIndex !== null && hoveredIndex !== index;

        return (
          <div
            key={index}
            data-focus-card={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={cn(
              "relative h-full min-h-[340px] overflow-hidden rounded-2xl border border-hazard/10 bg-surface2 transition-all duration-300",
              hovered && "border-hazard/40",
              blurred && "scale-[0.99] blur-sm",
            )}
          >
            {renderCard(card, index, hovered)}
          </div>
        );
      })}
    </div>
  );
}
