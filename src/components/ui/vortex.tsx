import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VortexProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  opacity?: number;
}

export function Vortex({ className, opacity = 0.12, ...props }: VortexProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
      {...props}
    >
      <motion.div
        className="absolute -left-1/4 top-1/4 h-[55vh] w-[55vh] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,107,53,0.35), rgba(192,57,43,0.06) 58%, transparent 80%)",
          opacity,
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 24, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-1/5 h-[45vh] w-[45vh] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(88,166,255,0.2), rgba(88,166,255,0.02) 62%, transparent 84%)",
          opacity,
        }}
        animate={{
          scale: [1.05, 0.9, 1.05],
          rotate: [0, -18, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
