import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
};

export interface ParticlesProps extends React.HTMLAttributes<HTMLDivElement> {
  quantity?: number;
  color?: string;
  size?: number;
  className?: string;
  ease?: number;
  staticity?: number;
}

const random = (min: number, max: number): number => Math.random() * (max - min) + min;

export function Particles({
  quantity = 120,
  color = "#FF8C42",
  size = 1.2,
  className,
  ease,
  staticity,
  ...props
}: ParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const dpr = window.devicePixelRatio || 1;
    const drift = Math.max(1, (ease ?? 80) / 40);
    const stillness = Math.max(0.2, 1 - (staticity ?? 50) / 120);

    const setupCanvas = (): void => {
      const rect = container.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      particlesRef.current = Array.from({ length: quantity }, () => ({
        x: random(0, rect.width),
        y: random(0, rect.height),
        vx: random(-0.18, 0.18) * stillness,
        vy: random(-0.1, 0.2) * stillness,
        size: random(Math.max(size - 0.6, 0.4), size + 1.4),
        alpha: random(0.18, 0.62),
      }));
    };

    setupCanvas();

    const tick = (): void => {
      const rect = container.getBoundingClientRect();
      context.clearRect(0, 0, rect.width, rect.height);

      for (const particle of particlesRef.current) {
        particle.x += particle.vx * drift;
        particle.y += particle.vy * drift;

        if (particle.x < -10) particle.x = rect.width + 10;
        if (particle.x > rect.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = rect.height + 10;
        if (particle.y > rect.height + 10) particle.y = -10;

        context.beginPath();
        context.fillStyle = `${color}${Math.round(particle.alpha * 255)
          .toString(16)
          .padStart(2, "0")}`;
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      }

      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);

    const onResize = (): void => {
      setupCanvas();
    };

    window.addEventListener("resize", onResize);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("resize", onResize);
    };
  }, [color, ease, quantity, size, staticity]);

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
