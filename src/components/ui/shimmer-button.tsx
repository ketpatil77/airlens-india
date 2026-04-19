import { motion } from "framer-motion";
import { useCursorContext } from "@/hooks/useCursorContext";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  background?: string;
  shimmerDuration?: string;
  borderRadius?: string;
}

export function ShimmerButton({
  className,
  children,
  shimmerColor = "rgba(255,255,255,0.55)",
  background = "#FF6B35",
  shimmerDuration = "2.8s",
  borderRadius = "9999px",
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ShimmerButtonProps) {
  const { setVariant } = useCursorContext();
  const { ref, springX, springY } = useMagneticHover();

  return (
    <motion.div ref={ref as React.RefObject<HTMLDivElement>} style={{ x: springX, y: springY }} className="inline-flex">
      <button
        className={cn(
          "group relative inline-flex items-center justify-center overflow-hidden border border-hazard/45 px-7 py-3 font-mono text-sm font-semibold tracking-wide text-void transition-transform duration-300 hover:-translate-y-0.5",
          className,
        )}
        style={{ ...style, background, borderRadius }}
        onMouseEnter={(event) => {
          setVariant("cta");
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          setVariant("default");
          onMouseLeave?.(event);
        }}
        {...props}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full skew-x-[-24deg] group-hover:translate-x-[240%]"
          style={{
            background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
            transitionDuration: shimmerDuration,
          }}
        />
        <span className="relative z-10">{children}</span>
      </button>
    </motion.div>
  );
}
