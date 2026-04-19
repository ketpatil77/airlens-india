import { motion, type MotionProps, type Variants } from "framer-motion";

interface BlurFadeProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.6,
  offset = 14,
  direction = "up",
  ...props
}: BlurFadeProps) {
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const start = direction === "up" || direction === "left" ? offset : -offset;

  const variants: Variants = {
    hidden: {
      opacity: 0,
      filter: "blur(8px)",
      [axis]: start,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      [axis]: 0,
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
