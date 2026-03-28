import { Boxes } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/sections/content-cards";
import { ButtonLink, Container, PageIntro, SectionHeading, Surface, Tag } from "@/components/ui/primitives";
import { projects } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "Explore Bruno Salgado's portfolio reference implementations in payment orchestration, money movement, and architecture leadership.",
  path: "/projects",
  keywords: ["Backend portfolio projects", "Payment orchestration case study", "Ledger case study"],
});

export default function ProjectsPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container className="space-y-16">
        <Reveal>
          <PageIntro
            eyebrow="Projects"
            title="Three portfolio reference implementations built to support serious backend and Tech Lead conversations."
            description="These are clearly labeled portfolio projects, not employer production case studies. The value is in the system design, trade-offs, operator surfaces, and the kinds of questions they help Bruno answer in a hiring loop."
            aside={
              <Surface className="p-6">
                <div className="space-y-4 text-sm leading-7 text-[var(--muted)]">
                  <div className="flex items-center gap-3 text-[var(--foreground)]">
                    <Boxes className="size-5 text-[var(--accent)]" />
                    <p className="font-semibold">Extraction-friendly structure</p>
                  </div>
                  <p>
                    Each case study is designed so the concept could later be split into standalone repositories for backend services, admin surfaces, and shared packages if needed.
                  </p>
                </div>
              </Surface>
            }
          />
        </Reveal>

        <section className="space-y-8">
          <Reveal>
            <SectionHeading
              eyebrow="Case Studies"
              title="Payments, money movement, and architecture decision-making represented as reference builds."
              description="Together, the projects cover fintech domain depth, distributed-systems thinking, and the technical-lead judgment involved in shaping systems that operators can actually live with."
            />
          </Reveal>
          <div className="space-y-5">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={0.06 * index}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal>
          <Surface className="p-8 md:p-10">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="space-y-3">
                <Tag>Interview utility</Tag>
                <h2 className="max-w-3xl text-pretty font-serif text-3xl text-[var(--foreground)] sm:text-4xl">
                  Each project is written to support technical interviews, recruiter screening, and deeper architecture conversations without pretending to be employer work.
                </h2>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <ButtonLink href="/writing">Open posts</ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  Talk about similar work
                </ButtonLink>
              </div>
            </div>
          </Surface>
        </Reveal>
      </Container>
    </div>
  );
}

