import { cn } from "@/lib/utils";

interface ShineBorderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  borderWidth?: number;
  duration?: number;
  color?: string | string[];
  borderRadius?: number;
}

export function ShineBorder({
  borderWidth = 1,
  duration = 10,
  color = ["#FF6B35", "#C0392B"],
  borderRadius = 16,
  className,
  children,
  ...props
}: ShineBorderProps) {
  const colors = Array.isArray(color) ? color : [color];
  const gradient = `linear-gradient(120deg, ${colors.join(", ")}, ${colors[0]})`;

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ borderRadius }}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 animate-shine"
        style={{
          backgroundImage: gradient,
          backgroundSize: "250% 250%",
          padding: borderWidth,
          borderRadius,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          ["--duration" as string]: `${duration}s`,
        }}
      />
      <div className="relative" style={{ borderRadius: Math.max(4, borderRadius - borderWidth) }}>
        {children}
      </div>
    </div>
  );
}
