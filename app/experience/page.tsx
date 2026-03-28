import { Flag } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ExperienceTimeline, SummaryStrip } from "@/components/sections/content-cards";
import { Container, PageIntro, SectionHeading, Surface } from "@/components/ui/primitives";
import { siteContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Experience",
  description:
    "Career history for Bruno Salgado across Itau Unibanco, PROFIT Business Bank, Cloud Payments, and current Tech Lead work.",
  path: "/experience",
  keywords: ["Backend engineer experience", "Payments engineer", "Tech lead experience"],
});

const operatingModel = [
  {
    title: "Architecture tied to execution",
    body: "The recurring pattern is not abstract design. It is using architecture to make delivery safer, clearer, and easier to evolve under real deadlines.",
    icon: "network" as const,
  },
  {
    title: "Business-aware backend delivery",
    body: "Financial correctness, migration safety, and operational clarity are treated as core delivery concerns, especially in banking and payments contexts.",
    icon: "shield" as const,
  },
  {
    title: "Senior communication",
    body: "The work spans implementation, architecture reviews, stakeholder translation, and helping teams make progress with less ambiguity.",
    icon: "calendar" as const,
  },
];

export default function ExperiencePage() {
  return (
    <div className="py-16 sm:py-20">
      <Container className="space-y-16">
        <Reveal>
          <PageIntro
            eyebrow="Experience"
            title="Career history across banking, fintech, and current Tech Lead work in Cloud Payments."
            description="Backend experience shaped by regulated banking, financial reporting, provider-heavy fintech platforms, and the technical leadership required to keep delivery moving in complex environments."
            aside={
              <Surface className="p-6">
                <div className="space-y-4 text-sm leading-7 text-[var(--muted)]">
                  <div className="flex items-center gap-3 text-[var(--foreground)]">
                    <Flag className="size-5 text-[var(--accent)]" />
                    <p className="font-semibold">Career outline</p>
                  </div>
                  <p>
                    Itau Unibanco to PROFIT Business Bank to Cloud Payments, with the current role focused on technical execution and architecture validation as a Software Engineering Tech Lead.
                  </p>
                </div>
              </Surface>
            }
          />
        </Reveal>

        <section className="grid gap-5 lg:grid-cols-2">
          {siteContent.experience.intro.map((paragraph, index) => (
            <Reveal key={paragraph} delay={0.05 * index}>
              <Surface className="h-full p-6">
                <p className="text-sm leading-8 text-[var(--muted)]">{paragraph}</p>
              </Surface>
            </Reveal>
          ))}
        </section>

        <section className="space-y-8">
          <Reveal>
            <SectionHeading
              eyebrow="Career Arc"
              title="From regulated banking foundations to fintech platform delivery and Tech Lead responsibility."
              description="The progression explains why Bruno is comfortable with both implementation depth and the broader delivery decisions that shape backend systems over time."
            />
          </Reveal>
          <Reveal delay={0.06}>
            <ExperienceTimeline items={siteContent.experience.roles} />
          </Reveal>
        </section>

        <section className="space-y-8">
          <Reveal>
            <SectionHeading
              eyebrow="How Bruno Operates"
              title="The value is not only in building services. It is in improving how teams deliver them."
              description="That includes design quality, rollout safety, platform clarity, and the ability to connect architecture choices back to the delivery realities around them."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <SummaryStrip items={operatingModel} />
          </Reveal>
        </section>
      </Container>
    </div>
  );
}
