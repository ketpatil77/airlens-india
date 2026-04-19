import { Menu, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { LiveAQIBadge } from "@/components/ui/LiveAQIBadge";
import { useCursorContext } from "@/hooks/useCursorContext";
import { useCommandPaletteStore } from "@/hooks/useCommandPaletteStore";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", link: "#hero" },
  { name: "Heatmap", link: "#heatmap" },
  { name: "Cities", link: "#cities" },
  { name: "Health", link: "#health" },
  { name: "Trends", link: "#trends" },
  { name: "Action", link: "#action" },
];

const sectionIds = ["hero", "heatmap", "cities", "health", "trends", "action", "footer"];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#dashboard");
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { setVariant } = useCursorContext();
  const { ref: logoRef, springX: logoX, springY: logoY } = useMagneticHover();

  useEffect(() => {
    let ticking = false;

    const onScroll = (): void => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60);

        let nearest: string | null = null;
        let nearestDistance = Number.POSITIVE_INFINITY;
        for (const sectionId of sectionIds) {
          const section = document.getElementById(sectionId);
          if (!section) continue;
          const distance = Math.abs(section.getBoundingClientRect().top);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearest = sectionId;
          }
        }

        if (nearest) {
          setActive(`#${nearest === "footer" ? "trends" : nearest === "hero" ? "hero" : nearest}`);
        }

        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const items = useMemo(() => navItems, []);

  const handleNavigate = (href: string): void => {
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(href);
    }
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        className={cn(
          "absolute left-1/2 top-4 z-50 flex w-[min(1120px,calc(100%-1rem))] items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300",
          scrolled
            ? "border-hazard/35 bg-[rgba(10,14,21,0.92)] shadow-[0_10px_30px_rgba(8,10,15,0.55)]"
            : "border-transparent bg-transparent",
        )}
        style={{ x: "-50%" }}
        initial={{ y: -36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.button
          ref={logoRef as React.RefObject<HTMLButtonElement>}
          className="flex items-center gap-2"
          style={{ x: logoX, y: logoY }}
          onClick={() => handleNavigate("#hero")}
          onMouseEnter={() => setVariant("cta")}
          onMouseLeave={() => setVariant("default")}
          aria-label="Go to Dashboard"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-hazard/40 bg-hazard/20">
            <span className="animate-brandPulse text-xs text-hazard">●</span>
          </div>
          <span className="font-display text-sm font-bold text-ivory">AirLens</span>
          <span className="font-mono text-[10px] tracking-widest text-hazard">INDIA</span>
        </motion.button>

        <div className="hidden items-center gap-5 md:flex">
          {items.map((item) => (
            <button
              key={item.link}
              className={cn(
                "group relative py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors duration-300 hover:text-ivory",
                active === item.link && "text-ivory",
              )}
              onClick={() => handleNavigate(item.link)}
              onMouseEnter={() => {
                setHovered(item.link);
                setVariant("hover");
              }}
              onMouseLeave={() => {
                setHovered(null);
                setVariant("default");
              }}
            >
              {item.name}
              <motion.span
                className="absolute bottom-0 left-0 h-[1px] bg-hazard"
                initial={{ width: "0%" }}
                animate={{ width: active === item.link || hovered === item.link ? "100%" : "0%" }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              />
            </button>
          ))}
        </div>

        {/* U6: Search ⌘K trigger button */}
        <button
          onClick={() => useCommandPaletteStore.getState().open()}
          className="hidden items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-mono text-[10px] text-muted transition-all duration-200 hover:border-hazard/40 hover:text-ivory md:flex"
          style={{ borderColor: "rgba(255,107,53,0.15)" }}
          title="Search cities (Ctrl+K)"
        >
          <Search size={11} />
          <span>Search</span>
          <kbd className="rounded bg-surface2 px-1 py-0.5 font-mono text-[8px] text-muted/60">⌘K</kbd>
        </button>

        <div className="hidden md:block">
          <LiveAQIBadge />
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-hazard/30 text-ivory md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          onMouseEnter={() => setVariant("hover")}
          onMouseLeave={() => setVariant("default")}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-void md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <div
              className="flex h-full flex-col items-center justify-center gap-8"
              onClick={(event) => event.stopPropagation()}
            >
              {items.map((item, index) => (
                <motion.button
                  key={item.link}
                  onClick={() => handleNavigate(item.link)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ delay: index * 0.06 }}
                  className="font-display text-3xl text-ivory"
                >
                  {item.name}
                </motion.button>
              ))}
              <LiveAQIBadge className="mt-4" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
