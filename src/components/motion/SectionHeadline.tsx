import { TextAnimate } from "@/components/ui/text-animate";
import { cn } from "@/lib/utils";

const sizes = {
  xl: "text-[clamp(28px,3vw,36px)]",
  "2xl": "text-[clamp(36px,4vw,48px)]",
  "3xl": "text-[clamp(40px,5vw,60px)]",
} as const;

export function SectionHeadline({
  children,
  size = "2xl",
  delay = 0,
  className,
}: {
  children: string;
  size?: keyof typeof sizes;
  delay?: number;
  className?: string;
}) {
  return (
    <TextAnimate
      as="h2"
      animation="slideUp"
      by="word"
      delay={delay}
      className={cn("font-display font-black leading-tight text-ivory", sizes[size], className)}
    >
      {children}
    </TextAnimate>
  );
}
