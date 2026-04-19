import { AnimatePresence, motion } from "framer-motion";
import {
  Children,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export interface AnimatedListProps extends React.ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  delay?: number;
}

export function AnimatedList({ children, className, delay = 700, ...props }: AnimatedListProps) {
  const items = useMemo(() => Children.toArray(children), [children]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => Math.min(prev + 1, items.length - 1));
    }, delay);

    return () => {
      window.clearInterval(timer);
    };
  }, [delay, items.length]);

  const visible = items.slice(0, index + 1);

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <AnimatePresence initial={false}>
        {visible.map((item, itemIndex) => (
          <motion.div
            key={(item as ReactElement).key ?? `item-${itemIndex}`}
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {item}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
