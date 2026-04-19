import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: "low" | "medium" | "high";
  children: React.ReactNode;
}

/**
 * U12 — Glassmorphism Card System
 * Features:
 * - GPU-accelerated backdrop blur (conditional for performance)
 * - Layer promotion (translateZ(0))
 * - IntersectionObserver to disable blur off-screen
 */
export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ intensity = "medium", className, children, ...props }, ref) => {
    const [node, setNode] = useState<HTMLDivElement | null>(null);
    const [isInView, setIsInView] = useState(false);

    // Combine external and internal refs
    const setRefs = (node: HTMLDivElement | null) => {
      setNode(node);
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);
        },
        { threshold: 0.1, rootMargin: "100px" } // Activate slightly before entering viewport
      );

      if (node) {
        observer.observe(node);
      }

      return () => observer.disconnect();
    }, [node]);

    const intensityMap = {
      low: {
        bg: "rgba(255, 255, 255, 0.05)",
        blur: "blur(6px)",
        border: "rgba(255, 255, 255, 0.08)",
      },
      medium: {
        bg: "rgba(255, 255, 255, 0.08)",
        blur: "blur(12px)",
        border: "rgba(255, 255, 255, 0.12)",
      },
      high: {
        bg: "rgba(255, 255, 255, 0.12)",
        blur: "blur(18px)",
        border: "rgba(255, 255, 255, 0.18)",
      },
    };

    const currentStyle = intensityMap[intensity];

    return (
      <div
        ref={setRefs}
        className={cn(
          "relative overflow-hidden rounded-2xl border transition-colors duration-300",
          "shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]",
          "transform-gpu", // Force hardware acceleration
          className
        )}
        style={{
          backgroundColor: currentStyle.bg,
          borderColor: currentStyle.border,
          // U12 Performance: only apply filter when in view
          backdropFilter: isInView ? currentStyle.blur : "none",
          WebkitBackdropFilter: isInView ? currentStyle.blur : "none",
          transform: "translateZ(0)", // GPU layer promotion
        }}
        {...props}
      >
        {/* Subtle glass reflection overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";
