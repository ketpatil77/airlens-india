import { useState } from "react";
import { cn } from "@/lib/utils";

interface CardSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function CardSpotlight({ className, children, ...props }: CardSpotlightProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-hazard/20 bg-surface2 p-5 transition-transform duration-300 hover:-translate-y-1",
        className,
      )}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setPosition({ x, y });
      }}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(255,107,53,0.2), transparent 45%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
