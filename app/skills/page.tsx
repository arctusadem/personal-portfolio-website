import { CheckCircle2, Layers3 } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SkillCategoryGrid, SummaryStrip } from "@/components/sections/content-cards";
import { Container, PageIntro, SectionHeading, Surface } from "@/components/ui/primitives";
import { siteContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Skills",
  description:
    "A categorized view of Bruno Salgado's backend, AWS, payments, architecture, and technical leadership strengths.",
  path: "/skills",
  keywords: ["Java skills", "Spring Boot AWS engineer", "Payments backend skills"],
});

const recruiterLens = [
  {
    title: "Backend-first depth",
    body: "Strongest in Java and Spring Boot service design, API modeling, persistence boundaries, failure handling, and delivery discipline.",
    icon: "network" as const,
  },
  {
    title: "AWS and modernization fluency",
    body: "Comfortable across AWS, CloudFormation, CodePipeline, Kubernetes, Docker, and the operational work that comes with platform modernization.",
    icon: "shield" as const,
  },
  {
    title: "Leadership capability",
    body: "Able to contribute as a hands-on senior engineer while also helping teams make better architecture and execution decisions.",
    icon: "calendar" as const,
  },
];

export default function SkillsPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container className="space-y-16">
        <Reveal>
          <PageIntro
            eyebrow="Skills and Stack"
            title="A senior backend stack shaped by financial systems, AWS delivery, and technical ownership."
            description="This skill profile is grouped around the outcomes Bruno is hired for: reliable backend delivery, fintech and payment-system context, cloud-aware execution, and leadership that stays close to the code."
            aside={
              <Surface className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[var(--foreground)]">
                    <Layers3 className="size-5 text-[var(--accent)]" />
                    <p className="font-semibold">Quick technical scan</p>
                  </div>
                  <div className="space-y-3 text-sm text-[var(--muted)]">
                    {[
                      "Java / Spring Boot / REST APIs",
                      "AWS / CloudFormation / CodePipeline",
                      "Kubernetes / Docker / OpenShift",
                      "Payments / banking / provider integrations",
                      "Architecture review / Tech Lead execution",
                    ].map((item) => (
                      <div className="flex items-center gap-3" key={item}>
                        <CheckCircle2 className="size-4 text-[var(--accent)]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Surface>
            }
          />
        </Reveal>

        <section className="space-y-8">
          <Reveal>
            <SectionHeading
              eyebrow="Capability Map"
              title="Organized around the work, not just the tools."
              description="For senior roles, the important question is not whether the tools are familiar. It is whether they have been used to make complicated systems safer, cleaner, and easier to evolve."
            />
          </Reveal>
          <Reveal delay={0.06}>
            <SkillCategoryGrid categories={siteContent.skills} />
          </Reveal>
        </section>

        <section className="space-y-8">
          <Reveal>
            <SectionHeading
              eyebrow="Recruiter Lens"
              title="What this stack signals in a hiring process."
              description="The strongest signal is the blend of domain depth, implementation strength, AWS modernization experience, and the ability to help teams move through complex backend work."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <SummaryStrip items={recruiterLens} />
          </Reveal>
        </section>

        <Reveal>
          <Surface className="p-8 md:p-10">
            <div className="space-y-3">
              <h2 className="max-w-4xl text-pretty font-serif text-3xl text-[var(--foreground)] sm:text-4xl">
                Especially strong for Canadian roles that sit around fintech, payment platforms, AWS modernization, backend architecture, and reliability-sensitive distributed services.
              </h2>
            </div>
          </Surface>
        </Reveal>
      </Container>
    </div>
  );
}
