import { motion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function FollowingPointer({
  children,
  title,
  className,
  disabled = false,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 22 });
  const y = useSpring(0, { stiffness: 220, damping: 22 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || disabled) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      x.set(event.clientX - rect.left);
      y.set(event.clientY - rect.top);
      setActive(true);
    };

    const onLeave = () => setActive(false);

    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);

    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
    };
  }, [disabled, x, y]);

  return (
    <div ref={containerRef} className={className}>
      {children}
      {!disabled ? (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-30"
          style={{ x, y, translateX: 18, translateY: 18, willChange: "transform, opacity" }}
          animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.96 }}
          transition={{ duration: 0.12 }}
        >
          <div className="rounded-2xl border border-hazard/15 bg-surface2/95 px-4 py-3 shadow-[0_12px_32px_rgba(8,10,15,0.45)] backdrop-blur">
            {title}
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}
