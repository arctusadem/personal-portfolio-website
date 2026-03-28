import { ExternalLink, FileText, Mail } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ResumePrintButton } from "@/components/sections/resume-print-button";
import { ButtonLink, Container, PageIntro, Surface, Tag } from "@/components/ui/primitives";
import { featuredProjects, siteContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Resume",
  description:
    "A printable resume view for Bruno Salgado, summarizing backend engineering, fintech, AWS modernization, and technical leadership experience.",
  path: "/resume",
  keywords: ["Bruno Salgado resume", "Senior backend engineer resume", "Tech lead resume"],
});

export default function ResumePage() {
  return (
    <div className="py-16 sm:py-20">
      <Container className="space-y-12">
        <Reveal>
          <PageIntro
            eyebrow="Resume"
            title="A concise, printable view of Bruno Salgado's backend profile."
            description="A compact resume view covering backend engineering, payments, AWS modernization, and technical leadership across banking and fintech environments."
            aside={
              <div className="flex flex-wrap gap-3 no-print lg:justify-end">
                <ResumePrintButton />
                <ButtonLink external href={siteContent.profile.linkedinUrl} variant="secondary">
                  LinkedIn
                </ButtonLink>
              </div>
            }
          />
        </Reveal>

        <Reveal>
          <Surface className="p-8 md:p-10 print:shadow-none">
            <div className="space-y-10">
              <section className="grid gap-8 border-b border-[var(--border)] pb-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <div className="space-y-3">
                  <h2 className="font-serif text-4xl text-[var(--foreground)]">{siteContent.profile.name}</h2>
                  <p className="text-lg text-[var(--muted)]">{siteContent.profile.role}</p>
                  <p className="max-w-3xl text-sm leading-7 text-[var(--muted)]">
                    Software Engineering Tech Lead and Senior Backend Engineer with nearly 8 years of experience across Brazilian banking and US fintech. Strong fit for roles involving Java, Spring Boot, AWS modernization, payments infrastructure, distributed systems, and technical delivery leadership.
                  </p>
                </div>
                <div className="flex flex-col items-start gap-3 text-sm text-[var(--muted)] lg:items-end lg:text-right">
                  <p className="inline-flex items-center gap-2 lg:justify-end">
                    <Mail className="size-4 text-[var(--accent)]" /> {siteContent.profile.email}
                  </p>
                  <a className="inline-flex items-center gap-2 lg:justify-end hover:text-[var(--foreground)]" href={siteContent.profile.linkedinUrl} target="_blank" rel="noreferrer">
                    LinkedIn <ExternalLink className="size-4" />
                  </a>
                  <a className="inline-flex items-center gap-2 lg:justify-end hover:text-[var(--foreground)]" href={siteContent.profile.githubUrl} target="_blank" rel="noreferrer">
                    GitHub <ExternalLink className="size-4" />
                  </a>
                </div>
              </section>

              <section className="space-y-4 border-b border-[var(--border)] pb-8">
                <Tag>Summary</Tag>
                <p className="text-sm leading-8 text-[var(--muted)]">
                  Senior backend engineer and Tech Lead with strong depth in Java, Spring Boot, AWS, microservices, payments, and regulated financial systems. Experienced in provider integrations, cloud modernization, CI/CD, system design, and helping teams make practical architecture decisions that hold up in production.
                </p>
              </section>

              <section className="space-y-5 border-b border-[var(--border)] pb-8">
                <Tag>Selected Experience</Tag>
                <div className="space-y-5">
                  {siteContent.experience.roles.map((role) => (
                    <div className="grid gap-3 md:grid-cols-[11rem_minmax(0,1fr)]" key={`${role.title}-${role.period}`}>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{role.period}</p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-[var(--foreground)]">{role.title}</h3>
                        <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">{role.subtitle}</p>
                        <p className="text-sm leading-7 text-[var(--muted)]">{role.summary}</p>
                        <ul className="space-y-2 text-sm leading-7 text-[var(--muted)]">
                          {role.outcomes.map((outcome) => (
                            <li className="flex gap-3" key={outcome}>
                              <span className="mt-2 size-1.5 rounded-full bg-[var(--accent)]" />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-5 border-b border-[var(--border)] pb-8">
                <Tag>Core Skills</Tag>
                <div className="grid gap-4 md:grid-cols-2">
                  {siteContent.skills.map((category) => (
                    <div className="rounded-3xl border border-[var(--border)] bg-[var(--background)]/70 p-5" key={category.name}>
                      <h3 className="text-lg font-semibold text-[var(--foreground)]">{category.name}</h3>
                      <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{category.items.join(" | ")}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-5">
                <Tag>Portfolio Projects</Tag>
                <div className="grid gap-4 md:grid-cols-3">
                  {featuredProjects.map((project) => (
                    <div className="rounded-3xl border border-[var(--border)] bg-[var(--background)]/70 p-5" key={project.slug}>
                      <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 text-[var(--accent)]">
                          <FileText className="size-4.5" />
                          <span className="text-xs font-semibold uppercase tracking-[0.18em]">Reference implementation</span>
                        </div>
                        <h3 className="text-lg font-semibold text-[var(--foreground)]">{project.title}</h3>
                        <p className="text-sm leading-7 text-[var(--muted)]">{project.excerpt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </Surface>
        </Reveal>
      </Container>
    </div>
  );
}

