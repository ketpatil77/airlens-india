import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
  speed?: number;
  children: React.ReactNode;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  speed = 40,
  children,
  style,
  ...props
}: MarqueeProps) {
  const directionClass = vertical ? "animate-marquee-vertical" : "animate-marquee";
  const durationValue = 1440 / speed;
  const duration = `${Math.max(8, Number(durationValue.toFixed(2)))}s`;

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden [--gap:1rem]",
        vertical ? "flex-col gap-[var(--gap)]" : "flex-row gap-[var(--gap)]",
        className,
      )}
      style={{ ...style, ["--duration" as string]: duration }}
      {...props}
    >
      {Array.from({ length: repeat }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "flex shrink-0 justify-around gap-[var(--gap)] will-change-transform",
            directionClass,
            vertical ? "flex-col" : "flex-row",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
