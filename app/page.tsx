import { CheckCircle2, Globe2, Linkedin, Mail, Sparkles } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ArticleCard, ExperienceTimeline, ProjectCard, SummaryStrip } from "@/components/sections/content-cards";
import { ButtonLink, Container, SectionHeading, StatGrid, StructuredData, Surface, Tag } from "@/components/ui/primitives";
import { featuredArticles, featuredProjects, siteContent } from "@/lib/content";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tech Lead / Senior Backend Engineer",
  description:
    "Tech Lead and Senior Backend Engineer focused on Java, Spring Boot, AWS, payments, and distributed systems, with nearly 8 years across banking and fintech.",
  path: "/",
  keywords: [
    "Bruno Salgado",
    "Software Engineering Tech Lead",
    "Senior Backend Engineer",
    "Java Spring Boot AWS",
    "Payments engineer",
    "Canadian fintech roles",
  ],
});

const summaryItems = [
  {
    title: "Java and Spring Boot delivery",
    body: "Backend services, provider integrations, domain-heavy APIs, and the design discipline needed to keep complex systems understandable over time.",
    icon: "network" as const,
  },
  {
    title: "AWS modernization and platform thinking",
    body: "Comfortable where cloud migration, CI/CD, observability, and reliability all need to move together without derailing product delivery.",
    icon: "shield" as const,
  },
  {
    title: "Payments and distributed systems fit",
    body: "Especially strong for fintech, backend platform, and distributed-systems teams that need both implementation depth and technical leadership.",
    icon: "calendar" as const,
  },
];

const recruiterScan = [
  ["Core stack", "Java, Spring Boot, AWS"],
  ["Primary niche", "Payments, fintech, distributed systems"],
  ["Current scope", "Tech Lead in cloud payments"],
  ["Market fit", "Canada fintech and backend platform roles"],
] as const;

export default function HomePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteContent.profile.name,
      jobTitle: siteContent.profile.role,
      url: siteContent.profile.siteUrl,
      sameAs: [siteContent.profile.linkedinUrl, siteContent.profile.githubUrl],
      email: siteContent.profile.email,
      knowsAbout: [
        "Java",
        "Spring Boot",
        "AWS",
        "CloudFormation",
        "CodePipeline",
        "Payments",
        "Banking systems",
        "Distributed systems",
        "Technical leadership",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${siteContent.profile.name} Portfolio`,
      url: siteContent.profile.siteUrl,
      description: siteContent.hero.supportingText,
    },
  ];

  return (
    <>
      <StructuredData data={structuredData} />

      <section className="pt-14 sm:pt-18 lg:pt-22">
        <Container className="space-y-8">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] xl:items-end">
            <Reveal className="space-y-8">
              <div className="space-y-6">
                <Tag>{siteContent.hero.eyebrow}</Tag>
                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                    {siteContent.hero.subheadline}
                  </p>
                  <h1 className="max-w-5xl text-pretty font-serif text-5xl tracking-tight text-[var(--foreground)] sm:text-6xl lg:text-7xl">
                    {siteContent.hero.headline}
                  </h1>
                  <p className="max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg">
                    {siteContent.hero.supportingText}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href="/projects">View case studies</ButtonLink>
                  <ButtonLink href="/resume" variant="secondary">
                    Open resume
                  </ButtonLink>
                  <ButtonLink external href={siteContent.profile.linkedinUrl} variant="ghost">
                    LinkedIn
                  </ButtonLink>
                  <ButtonLink external href={siteContent.profile.githubUrl} variant="ghost">
                    GitHub
                  </ButtonLink>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="hero-chip">
                  <CheckCircle2 className="size-4 text-[var(--accent)]" /> Java and Spring Boot backend services
                </span>
                <span className="hero-chip">
                  <CheckCircle2 className="size-4 text-[var(--accent)]" /> AWS modernization, CloudFormation, CI/CD
                </span>
                <span className="hero-chip">
                  <CheckCircle2 className="size-4 text-[var(--accent)]" /> Payments, provider integrations, distributed systems
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <Surface className="overflow-hidden p-6 md:p-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[var(--muted)]">
                      <Sparkles className="size-4.5 text-[var(--accent)]" />
                      <p className="text-xs font-semibold uppercase tracking-[0.22em]">Recruiter quick scan</p>
                    </div>
                    <p className="text-2xl font-serif text-[var(--foreground)]">
                      Senior backend depth with real banking, payments, and AWS delivery history.
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {recruiterScan.map(([label, value]) => (
                      <div key={label} className="rounded-2xl border border-[var(--border)] bg-[var(--background)]/70 p-4">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">{label}</p>
                        <p className="mt-2 text-sm font-semibold leading-6 text-[var(--foreground)]">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-3xl border border-[var(--border)] bg-[var(--background)]/70 p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">signal.log</p>
                    <div className="mt-3 space-y-2 font-mono text-xs leading-6 text-[var(--muted)] sm:text-[13px]">
                      <p>stack.primary = ["Java", "Spring Boot", "AWS"]</p>
                      <p>domains = ["banking", "payments", "fintech"]</p>
                      <p>platform.focus = ["CloudFormation", "CodePipeline", "Kubernetes"]</p>
                      <p>systems.mode = "distributed"</p>
                      <p>trace.level = 0x06</p>
                    </div>
                  </div>
                  <div className="rounded-3xl border border-dashed border-[var(--accent)]/35 bg-[var(--accent-soft)]/35 p-5">
                    <div className="flex flex-wrap items-start gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-[var(--foreground)]">Open to the right backend and platform conversations</p>
                        <p className="text-sm leading-7 text-[var(--muted)]">{siteContent.hero.availability}</p>
                      </div>
                      <div className="ml-auto flex gap-2">
                        <a className="inline-flex size-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent)]" href={siteContent.profile.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                          <Linkedin className="size-4.5" />
                        </a>
                        <a className="inline-flex size-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent)]" href={`mailto:${siteContent.profile.email}`} aria-label="Email">
                          <Mail className="size-4.5" />
                        </a>
                        <a className="inline-flex size-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent)]" href={absoluteUrl("/")} aria-label="Website URL">
                          <Globe2 className="size-4.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Surface>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <StatGrid items={siteContent.metrics} />
          </Reveal>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="space-y-10">
          <Reveal>
            <SummaryStrip items={summaryItems} />
          </Reveal>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow="Where Bruno Adds Value"
              title="A backend profile shaped by regulated systems, payments complexity, and architecture-minded delivery."
              description="The clearest signal is the combination of Java and Spring Boot depth, AWS modernization work, provider-heavy integration experience, and hands-on technical leadership."
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {siteContent.recruiterSignals.map((signal, index) => (
              <Reveal key={signal.title} delay={0.05 * index}>
                <Surface className="h-full p-6">
                  <div className="space-y-4">
                    <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-[var(--foreground)]">{signal.title}</h3>
                      <p className="text-sm leading-7 text-[var(--muted)]">{signal.body}</p>
                    </div>
                  </div>
                </Surface>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow="Portfolio Case Studies"
              title="Reference implementations built to support technical review, not just portfolio browsing."
              description="Each project exposes architecture boundaries, interface design, operational concerns, and trade-offs so recruiters and engineering leaders can assess the depth behind the headline."
            />
          </Reveal>
          <div className="space-y-5">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={0.08 * index}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow="Career History"
              title="Experience across Brazilian banking, US fintech, and current Tech Lead work in cloud payments."
              description="The career arc explains the blend of strengths on the rest of the site: regulated-system discipline, provider integrations, AWS modernization, and backend leadership under real delivery pressure."
            />
          </Reveal>
          <Reveal delay={0.06}>
            <ExperienceTimeline items={siteContent.experience.roles} />
          </Reveal>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow="Posts"
              title="Featured posts and one small hidden-features guide."
              description="Short-form activity lives on LinkedIn, and the site keeps one small easter-egg post for people who like poking around."
            />
          </Reveal>
          <div className="grid gap-4 xl:grid-cols-3">
            {featuredArticles.map((article, index) => (
              <Reveal key={article.slug} delay={0.06 * index}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container>
          <Reveal>
            <Surface className="overflow-hidden p-8 md:p-10">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <div className="space-y-4">
                  <Tag>Open to conversation</Tag>
                  <h2 className="max-w-3xl text-pretty font-serif text-3xl tracking-tight text-[var(--foreground)] sm:text-4xl">
                    Open to Senior Backend Engineer and Tech Lead opportunities in Canada across fintech, payments, backend platform, and distributed systems teams.
                  </h2>
                  <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
                    If the role involves Java, Spring Boot, AWS modernization, payment infrastructure, partner integrations, or technical leadership in backend-heavy teams, Bruno is likely a strong fit.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <ButtonLink href="/contact">Start a conversation</ButtonLink>
                  <ButtonLink href="/resume" variant="secondary">
                    Open resume
                  </ButtonLink>
                </div>
              </div>
            </Surface>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

