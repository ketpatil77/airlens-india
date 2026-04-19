import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

interface Beam {
  id: number;
  left: string;
  duration: number;
  delay: number;
  color: string;
}

export function BackgroundBeamsWithCollision({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const beams = useMemo<Beam[]>(
    () => [
      { id: 1, left: "8%", duration: 7, delay: 0, color: "#FF6B35" },
      { id: 2, left: "22%", duration: 5, delay: 1.2, color: "#C0392B" },
      { id: 3, left: "37%", duration: 8, delay: 2.1, color: "#FF6B35" },
      { id: 4, left: "54%", duration: 6, delay: 0.8, color: "#C0392B" },
      { id: 5, left: "68%", duration: 9, delay: 1.6, color: "#FF6B35" },
      { id: 6, left: "83%", duration: 5.5, delay: 2.8, color: "#C0392B" },
    ],
    [],
  );

  const [explosions, setExplosions] = useState<Array<{ id: number; left: string }>>([]);

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-surface",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        {beams.map((beam) => (
          <motion.span
            key={beam.id}
            className="absolute top-[-24%] h-24 w-px"
            style={{
              left: beam.left,
              background: `linear-gradient(to bottom, transparent, ${beam.color}, transparent)`,
            }}
            initial={{ y: "-40%", opacity: 0 }}
            animate={{ y: "145%", opacity: [0, 1, 1, 0] }}
            transition={{
              duration: beam.duration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              delay: beam.delay,
            }}
            onUpdate={(latest) => {
              const y = Number(latest.y);
              if (Number.isFinite(y) && y > 520 && y < 528) {
                const id = Date.now() + beam.id;
                setExplosions((prev) => [...prev.slice(-8), { id, left: beam.left }]);
                window.setTimeout(() => {
                  setExplosions((prev) => prev.filter((item) => item.id !== id));
                }, 700);
              }
            }}
          />
        ))}

        <AnimatePresence>
          {explosions.map((explosion) => (
            <motion.span
              key={explosion.id}
              className="absolute bottom-10 h-3 w-10"
              style={{ left: explosion.left, translateX: "-50%" }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.95, 0], scale: [0.6, 1.1, 0.4] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-hazard to-transparent blur-sm" />
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10">{children}</div>
    </section>
  );
}
