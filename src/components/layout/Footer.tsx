import { Input } from "@/components/ui/input";
import { ScrollBasedVelocity } from "@/components/ui/scroll-based-velocity";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const exploreLinks = [
  { label: "Dashboard", href: "#hero" },
  { label: "Heatmap", href: "#heatmap" },
  { label: "Cities", href: "#cities" },
  { label: "Trends", href: "#trends" },
];
const dataLinks = [
  { label: "City AQI", href: "#cities" },
  { label: "State Heatmap", href: "#heatmap" },
  { label: "Pollutant Mix", href: "#cities" },
  { label: "24h Trends", href: "#trends" },
];
const aboutLinks = [
  { label: "Methodology", href: "#trends" },
  { label: "Data Sources", href: "https://cpcb.nic.in/" },
  { label: "GitHub", href: "https://github.com" },
  { label: "Contact", href: "mailto:info@airlens.in" },
];

function FooterLink({ label, href }: { label: string; href: string }) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto");
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isExternal && href.startsWith("#")) {
      e.preventDefault();
      const id = href.replace("#", "");
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="group relative w-fit font-body text-sm text-muted transition-colors hover:text-ivory"
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-hazard transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

export function Footer() {
  return (
    <footer id="footer" className="mt-8 border-t border-hazard/10 bg-void">
      <div className="w-full border-y border-hazard/10 bg-surface py-3">
        <ScrollBasedVelocity
          text="AIRLENS INDIA · SEE WHAT YOU BREATHE · AQI DATA FOR 1.4 BILLION PEOPLE ·"
          velocity={3}
          className="font-mono text-[10px] tracking-[0.3em] text-muted"
        />
      </div>

      <div className="mx-auto w-[min(1200px,100%-2rem)] px-2 pb-8 pt-16 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)_1.3fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-black text-ivory">AirLens</span>
              <span className="font-mono text-xs tracking-[0.2em] text-hazard">INDIA</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-7 text-muted">
              See What You Breathe. Local first air-quality awareness platform for India.
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.24em] text-hazard">EXPLORE</p>
            <div className="mt-3 flex flex-col gap-2">
              {exploreLinks.map((link) => (
                <FooterLink key={link.label} label={link.label} href={link.href} />
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.24em] text-hazard">DATA</p>
            <div className="mt-3 flex flex-col gap-2">
              {dataLinks.map((link) => (
                <FooterLink key={link.label} label={link.label} href={link.href} />
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.24em] text-hazard">ABOUT</p>
            <div className="mt-3 flex flex-col gap-2">
              {aboutLinks.map((link) => (
                <FooterLink key={link.label} label={link.label} href={link.href} />
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.24em] text-hazard">NEWSLETTER</p>
            <p className="mt-3 text-sm text-muted">Get weekly AQI summaries and city-level alerts.</p>
            <div className="mt-3 flex gap-2">
              <Input
                placeholder="your@email.com"
                className="border-hazard/20 bg-surface2 font-mono text-[12px] text-ivory placeholder:text-muted"
              />
              <ShimmerButton
                background="#FF6B35"
                shimmerColor="rgba(255,255,255,0.1)"
                borderRadius="6px"
                className="whitespace-nowrap px-4 font-mono text-[11px] text-void"
              >
                SUBSCRIBE
              </ShimmerButton>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-hazard/10 pt-8 font-mono text-[11px] text-muted md:flex-row md:items-center">
          <span>© 2026 AirLens India. Open source data platform.</span>
          <span>Data: CPCB · IQAir · OpenAQ</span>
        </div>
      </div>
    </footer>
  );
}
