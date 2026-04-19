import { motion } from "framer-motion";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { IconByName } from "@/components/ui/lucide-icon";
import { ShineBorder } from "@/components/ui/shine-border";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { TextAnimate } from "@/components/ui/text-animate";
import { useInView } from "@/hooks/useInView";
import { useCommandPaletteStore } from "@/hooks/useCommandPaletteStore";
import { toast } from "sonner";

const actionCards = [
  {
    icon: "MapPin",
    title: "Check Your City",
    description: "Enter your city and see real-time AQI, health advice, and pollution breakdown.",
    cta: "CHECK NOW →",
    ctaType: "primary" as const,
  },
  {
    icon: "Share2",
    title: "Share Awareness",
    description: "Share AirLens with family and friends. Awareness is the first step to change.",
    cta: "SHARE →",
    ctaType: "ghost" as const,
  },
  {
    icon: "AlertTriangle",
    title: "Report Pollution",
    description: "Spot illegal waste burning or industrial violation? Report it to CPCB.",
    cta: "REPORT →",
    ctaType: "ghost" as const,
  },
];

export function CallToAction() {
  const { ref, inView } = useInView(0.3);
  const { open } = useCommandPaletteStore();

  const handleCheckCity = () => {
    open();
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = "AirLens India - See What You Breathe";
    const text = "Check real-time air quality data for India's major cities on AirLens";

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        toast.success("Shared successfully!");
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          // Fallback to clipboard
          await navigator.clipboard.writeText(url);
          toast.success("Link copied to clipboard!");
        }
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!", {
          description: "Share AirLens with your network",
        });
      } catch {
        toast.error("Failed to copy link");
      }
    }
  };

  const handleReport = () => {
    window.open("https://cpcb.nic.in/citizen-corner/", "_blank", "noopener,noreferrer");
  };

  return (
    <section id="action">
      <BackgroundBeamsWithCollision className="bg-surface px-4 py-28 md:px-16">
        <div ref={ref} className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-hazard">-- TAKE ACTION</p>

          <div className="mt-3">
            <TextAnimate
              animation="slideUp"
              by="word"
              className="font-display text-[clamp(40px,6vw,72px)] font-black leading-[0.9] text-ivory"
            >
              {"The Air Won't Clean"}
            </TextAnimate>
            <TextAnimate
              animation="slideUp"
              by="word"
              delay={0.3}
              className="font-display text-[clamp(40px,6vw,72px)] font-black italic leading-[0.9] text-hazard"
            >
              {"Itself."}
            </TextAnimate>
          </div>

          <p className="mt-6 max-w-[480px] font-body text-[15px] leading-[1.75] text-muted">
            Share this data. Demand accountability. Know your AQI before you step outside. Every informed citizen is
            one step toward cleaner air for 1.4 billion people.
          </p>

          <div className="mt-10 grid w-full grid-cols-1 gap-5 md:grid-cols-3">
            {actionCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <ShineBorder color={["#FF6B35", "#C0392B"]} borderRadius={16} borderWidth={1} className="w-full">
                  <div className="flex h-full flex-col gap-4 rounded-2xl bg-surface2 p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-hazard/20 bg-hazard/10">
                      <IconByName name={card.icon} size={18} className="text-hazard" />
                    </div>
                    <div>
                      <h3 className="font-display text-[16px] font-bold text-ivory">{card.title}</h3>
                      <p className="mt-2 font-body text-[13px] leading-[1.7] text-muted">{card.description}</p>
                    </div>
                    {card.ctaType === "primary" ? (
                      <ShimmerButton
                        shimmerColor="rgba(255,255,255,0.12)"
                        background="#FF6B35"
                        borderRadius="8px"
                        className="mt-auto w-full justify-center px-5 py-3 font-mono text-[11px] tracking-[0.08em] text-void"
                        onClick={card.title === "Check Your City" ? handleCheckCity : undefined}
                      >
                        {card.cta}
                      </ShimmerButton>
                    ) : (
                      <button 
                        className="mt-auto rounded-lg border border-hazard/30 px-5 py-3 font-mono text-[11px] tracking-[0.08em] text-hazard transition-all duration-200 hover:border-hazard/60 hover:bg-hazard/5"
                        onClick={card.title === "Share Awareness" ? handleShare : handleReport}
                      >
                        {card.cta}
                      </button>
                    )}
                  </div>
                </ShineBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </section>
  );
}
