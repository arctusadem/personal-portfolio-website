import { Flag } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ExperienceTimeline, SummaryStrip } from "@/components/sections/content-cards";
import { Container, PageIntro, SectionHeading, Surface } from "@/components/ui/primitives";
import { siteContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Experience",
  description:
    "Career history for Bruno Salgado across Itau Unibanco, PROFIT Business Bank, Cloud Payments, and current Tech Lead work in Java, Spring Boot, AWS, and payments environments.",
  path: "/experience",
  keywords: ["Backend engineer experience", "Payments engineer", "Tech lead experience"],
});

const operatingModel = [
  {
    title: "Architecture tied to execution",
    body: "The recurring pattern is using architecture to make delivery safer, clearer, and easier to evolve under real deadlines rather than treating design as a separate exercise.",
    icon: "network" as const,
  },
  {
    title: "Reliability and modernization",
    body: "Financial correctness, migration safety, provider reliability, and operational visibility stay central whether the work is in banking, payments, or cloud modernization.",
    icon: "shield" as const,
  },
  {
    title: "Technical leadership under pressure",
    body: "The role today spans implementation depth, design review, stakeholder translation, and helping teams move with less ambiguity when the systems are complex.",
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
            title="Career history across banking, fintech, and current Tech Lead work in cloud payments."
            description="Backend experience shaped by regulated banking, financial reporting, external-provider integrations, AWS modernization, and the technical leadership needed to keep delivery moving in complex environments."
            aside={
              <Surface className="p-6">
                <div className="space-y-4 text-sm leading-7 text-[var(--muted)]">
                  <div className="flex items-center gap-3 text-[var(--foreground)]">
                    <Flag className="size-5 text-[var(--accent)]" />
                    <p className="font-semibold">Career outline</p>
                  </div>
                  <p>
                    Itaú Unibanco to PROFIT Business Bank to Cloud Payments, with the current role centered on technical execution, architecture validation, and backend delivery clarity in payments.
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
              description="The progression explains why Bruno is comfortable with implementation detail, architecture review, modernization work, and the broader delivery decisions that shape backend systems over time."
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
              title="The value is not only in building services. It is in improving how teams deliver and run them."
              description="That includes clearer ownership boundaries, safer rollouts, more credible architecture decisions, and backend systems that remain explainable when production complexity shows up."
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

