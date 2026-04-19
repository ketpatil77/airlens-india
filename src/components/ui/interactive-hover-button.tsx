import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCursorContext } from "@/hooks/useCursorContext";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import { cn } from "@/lib/utils";

export function InteractiveHoverButton({
  children,
  className,
  onMouseEnter,
  onMouseLeave,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setVariant } = useCursorContext();
  const { ref, springX, springY } = useMagneticHover();

  return (
    <motion.div ref={ref as React.RefObject<HTMLDivElement>} style={{ x: springX, y: springY }} className="inline-flex">
      <button
        className={cn(
          "group inline-flex items-center gap-2 rounded-full border border-hazard/40 bg-transparent px-6 py-3 font-mono text-sm font-medium tracking-wide text-ivory transition-all duration-300 hover:border-hazard hover:bg-hazard/10",
          className,
        )}
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
        <span className="transition-transform duration-300 group-hover:-translate-x-1">
          {children}
        </span>
        <ArrowRight className="size-4 opacity-70 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
      </button>
    </motion.div>
  );
}
