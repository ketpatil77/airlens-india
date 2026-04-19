import { cn } from "@/lib/utils";

interface NeonGradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  neonColors?: {
    firstColor: string;
    secondColor: string;
  };
  borderRadius?: number;
  borderSize?: number;
}

export function NeonGradientCard({
  className,
  children,
  neonColors = { firstColor: "#FF6B35", secondColor: "#C0392B" },
  borderRadius = 20,
  borderSize = 1,
  ...props
}: NeonGradientCardProps) {
  return (
    <div
      className={cn(
        "relative transition-transform duration-300 hover:scale-[1.01]",
        className,
      )}
      style={{
        borderRadius,
        padding: borderSize,
        background: `linear-gradient(135deg, ${neonColors.firstColor}, ${neonColors.secondColor})`,
      }}
      {...props}
    >
      <div
        className="h-full border border-hazard/20 bg-surface p-4"
        style={{ borderRadius: Math.max(borderRadius - borderSize, 4) }}
      >
        {children}
      </div>
    </div>
  );
}
