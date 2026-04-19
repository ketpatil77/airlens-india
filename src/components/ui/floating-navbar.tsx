import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { LiveAQIBadge } from "@/components/layout/live-aqi-badge";

interface NavLink {
  id: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { id: "dashboard", label: "DASHBOARD" },
  { id: "heatmap", label: "HEATMAP" },
  { id: "cities", label: "CITIES" },
  { id: "health", label: "HEALTH" },
  { id: "trends", label: "TRENDS" },
];

const SCROLL_SECTION_IDS = ["hero", "dashboard", "heatmap", "cities", "footer"];

export function FloatingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("dashboard");

  useEffect(() => {
    const onScroll = (): void => {
      setScrolled(window.scrollY > 60);

      let closest = "dashboard";
      let minDistance = Number.POSITIVE_INFINITY;

      for (const id of SCROLL_SECTION_IDS) {
        const element = document.getElementById(id);
        if (!element) continue;
        const top = Math.abs(element.getBoundingClientRect().top);
        if (top < minDistance) {
          minDistance = top;
          closest =
            id === "hero"
              ? "dashboard"
              : id === "footer"
                ? "trends"
                : id;
        }
      }

      setActive(closest);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const links = useMemo(() => NAV_LINKS, []);

  const navigate = (id: string): void => {
    const targetId = id === "trends" ? "footer" : id;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed left-1/2 top-4 z-50 w-[min(1120px,calc(100%-1.5rem))] -translate-x-1/2 rounded-2xl border px-4 py-3 transition-all duration-400",
          scrolled
            ? "border-hazard/30 bg-surface/80 shadow-hazard backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between gap-3">
          <button
            className="inline-flex items-baseline gap-1"
            onClick={() => navigate("hero")}
            aria-label="Go to top"
          >
            <span className="font-display text-xl font-bold tracking-tight text-ivory">
              AirLens
            </span>
            <span className="font-mono text-sm font-semibold tracking-widest text-hazard">
              INDIA
            </span>
          </button>

          <nav className="hidden items-center gap-5 md:flex">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                className={cn(
                  "relative pb-1 font-mono text-xs tracking-[0.18em] text-muted transition-colors duration-300 hover:text-ivory",
                  active === link.id && "text-ivory",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px bg-hazard transition-all duration-300",
                    active === link.id ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <LiveAQIBadge />
          </div>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-hazard/30 text-ivory md:hidden"
            onClick={() => setMenuOpen((state) => !state)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-lg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-full flex-col items-center justify-center gap-8 px-8">
              {links.map((link, index) => (
                <motion.button
                  key={link.id}
                  onClick={() => navigate(link.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: 0.08 * index }}
                  className="font-display text-3xl tracking-wide text-ivory"
                >
                  {link.label}
                </motion.button>
              ))}
              <LiveAQIBadge className="mt-6" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
