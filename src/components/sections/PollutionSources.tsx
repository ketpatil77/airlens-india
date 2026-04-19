import { EyebrowLabel } from "@/components/motion/EyebrowLabel";
import { SectionHeadline } from "@/components/motion/SectionHeadline";
import { TextReveal } from "@/components/ui/text-reveal";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { pollutionSources } from "@/data/sources-data";
import { SourceItem } from "@/components/sections/SourceItem";

export function PollutionSources() {
  return (
    <section id="sources" className="relative bg-void px-4 py-24 md:px-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto w-[min(1520px,100%-2rem)]">
        <EyebrowLabel className="mb-3 inline-block">Pollution Sources</EyebrowLabel>
        <SectionHeadline size="3xl">What&apos;s Poisoning Our Air?</SectionHeadline>

        <TextReveal className="mt-4 max-w-[480px] font-body text-[15px] leading-[1.7] text-muted">
          Six major contributors. One shared crisis. Understanding the sources is the first step toward demanding change.
        </TextReveal>

        <div
          className="mt-16"
          style={{
            contentVisibility: "auto",
            containIntrinsicSize: "3200px",
          }}
        >
          <div className="lg:hidden">
            <TracingBeam className="px-0 md:px-6" beamColor="#FF6B35" dotColor="#FF6B35">
              <div className="flex flex-col gap-16">
                {pollutionSources.map((source, index) => (
                  <SourceItem
                    key={source.id}
                    source={source}
                    index={index}
                    total={pollutionSources.length}
                  />
                ))}
              </div>
            </TracingBeam>
          </div>

          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-16">
            {pollutionSources.map((source, index) => (
              <SourceItem
                key={source.id}
                source={source}
                index={index}
                total={pollutionSources.length}
                showConnector={false}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
