import { EyebrowLabel } from "@/components/motion/EyebrowLabel";
import { SectionHeadline } from "@/components/motion/SectionHeadline";
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";
import { AnimatedList } from "@/components/ui/animated-list";
import { FocusCards } from "@/components/ui/focus-cards";
import { IconByName } from "@/components/ui/lucide-icon";
import { NumberTicker } from "@/components/ui/number-ticker";
import { healthImpacts, healthStats } from "@/data/health-data";
import { useAQIAlerts } from "@/hooks/useAQIAlerts";
import { useInView } from "@/hooks/useInView";

const lungsImage = "/images/optimized/health-lungs.webp";

// U2: aqiAlerts is now generated live from useAQIAlerts hook inside the component

function HealthStatCounter({
  value,
  suffix,
  label,
  sublabel,
  color,
}: {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  color: string;
}) {
  const { ref, inView } = useInView(0.3); // Relaxed margin

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 bg-surface p-8 text-center">
      <div className="flex items-end justify-center gap-1 w-full">
        <NumberTicker
          value={inView ? value : 0}
          startOnView={false} // Override internal hook
          startValue={0}
          decimalPlaces={suffix.trim() === "M" && value < 10 ? 1 : 0}
          className="font-mono text-[clamp(36px,4vw,56px)] font-black leading-none"
          style={{ color }}
        />
        <span className="pb-1 font-mono text-[clamp(20px,2vw,32px)] font-black" style={{ color }}>
          {suffix}
        </span>
      </div>
      <span className="font-display text-[13px] font-bold uppercase tracking-wide text-ivory">
        {label}
      </span>
      <span className="max-w-[160px] font-body text-[11px] leading-tight text-muted">
        {sublabel}
      </span>
    </div>
  );
}

function AlertItem({
  alert,
}: {
  alert: { icon: string; city: string; message: string; time: string };
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-hazard/10 bg-surface2 p-3 text-sm">
      <span className="flex-shrink-0 text-[16px]">{alert.icon}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-[13px] font-bold text-ivory">{alert.city}</span>
          <span className="font-mono text-[9px] text-muted">{alert.time}</span>
        </div>
        <p className="mt-0.5 font-body text-[12px] text-muted/80">{alert.message}</p>
      </div>
    </div>
  );
}

export function HealthImpact() {
  const { ref: progressRef, inView: progressInView } = useInView(0.5);
  const { ref: alertsRef, inView: alertsInView } = useInView(0.3);
  // U2: Live alert engine — real cities sorted by AQI severity
  const aqiAlerts = useAQIAlerts(200, 8);

  return (
    <section id="health" className="relative overflow-hidden bg-surface px-4 py-24 md:px-16">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(192,57,43,0.06), transparent)",
        }}
      />

      <div className="relative mx-auto w-[min(1520px,100%-2rem)]">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <EyebrowLabel className="mb-3 inline-block">Health Impact</EyebrowLabel>
            <SectionHeadline size="3xl">The Cost of Breathing</SectionHeadline>
          </div>

          <p className="max-w-[320px] border-l-2 border-critical/40 pl-4 font-body text-[14px] leading-[1.7] text-muted">
            Air pollution is the 5th leading cause of death in India. These are not statistics. These are people.
          </p>
        </div>

        <div className="mb-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hazard/10 bg-hazard/10 md:grid-cols-4">
          {healthStats.map((stat) => (
            <HealthStatCounter key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <FocusCards
            cards={healthImpacts}
            renderCard={(impact) => {
              const severityColor =
                impact.severity === "critical"
                  ? "#C0392B"
                  : impact.severity === "high"
                    ? "#FF6B35"
                    : "#F39C12";

              return (
                <div className="flex h-full flex-col gap-4 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-hazard/20 bg-hazard/10">
                      <IconByName name={impact.icon} size={20} className="text-hazard" />
                    </div>
                    <span
                      className="rounded-full border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em]"
                      style={{
                        color: severityColor,
                        borderColor: `${severityColor}40`,
                        backgroundColor: `${severityColor}10`,
                      }}
                    >
                      {impact.severity}
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-[32px] font-black leading-none text-ivory">
                      {impact.stat}
                    </span>
                    <p className="mt-1 font-body text-[11px] leading-tight text-muted">
                      {impact.statLabel}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-display text-[16px] font-bold text-ivory">{impact.title}</h3>
                    <p className="mt-2 font-body text-[12px] leading-[1.7] text-muted/80">
                      {impact.description}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-1">
                    {impact.atRisk.map((group) => (
                      <span
                        key={group}
                        className="rounded border border-hazard/8 bg-surface px-2 py-0.5 font-mono text-[9px] text-muted/60"
                      >
                        {group}
                      </span>
                    ))}
                  </div>

                  <p className="border-t border-hazard/10 pt-3 font-mono text-[10px] text-hazard/60">
                    {impact.aqiTrigger}
                  </p>
                </div>
              );
            }}
          />

          <div className="space-y-5">
            <div ref={progressRef} className="rounded-2xl border border-hazard/12 bg-surface2 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-hazard">LUNG FUNCTION ALERT</p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-hazard/10 bg-void/60">
                <img
                  src={lungsImage}
                  alt="Lung damage visualization"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="h-[220px] w-full object-cover opacity-90"
                />
              </div>
              <div className="mt-4 flex items-center justify-center">
                {progressInView ? (
                  <AnimatedCircularProgressBar
                    max={100}
                    value={40}
                    min={0}
                    gaugePrimaryColor="#FF6B35"
                    gaugeSecondaryColor="rgba(255,107,53,0.15)"
                    className="size-32"
                  />
                ) : (
                  <div className="size-32" />
                )}
              </div>
              <p className="mt-3 text-center font-mono text-[10px] text-muted">
                Lung function below normal
              </p>
            </div>

            <div ref={alertsRef} className="rounded-2xl border border-hazard/12 bg-surface2 p-5">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-hazard">
                LIVE AQI ALERT FEED
              </p>
              {alertsInView ? (
                <AnimatedList delay={600}>
                  {aqiAlerts.map((alert) => (
                    <AlertItem key={`${alert.city}-${alert.time}`} alert={alert} />
                  ))}
                </AnimatedList>
              ) : (
                <div className="space-y-3" aria-hidden="true">
                  {aqiAlerts.map((alert) => (
                    <div
                      key={`${alert.city}-${alert.time}`}
                      className="h-[74px] rounded-xl border border-hazard/10 bg-surface2"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
