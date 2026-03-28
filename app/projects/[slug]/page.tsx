import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import { ProjectMockup } from "@/components/sections/project-mockups";
import { ButtonLink, Container, SectionHeading, StructuredData, Surface, Tag } from "@/components/ui/primitives";
import { getProjectBySlug, projects, siteContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return buildMetadata({
      title: "Project",
      description: "Project not found.",
      path: `/projects/${slug}`,
    });
  }

  return buildMetadata({
    title: project.title,
    description: project.excerpt,
    path: `/projects/${project.slug}`,
    keywords: [project.title, project.category, ...project.stack],
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.excerpt,
    creator: {
      "@type": "Person",
      name: siteContent.profile.name,
      url: siteContent.profile.siteUrl,
    },
    about: project.category,
    dateCreated: project.year,
    keywords: project.stack,
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="py-16 sm:py-20">
        <Container className="space-y-16">
          <section className="grid gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(21rem,0.92fr)] xl:items-start">
            <Reveal className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Tag>{project.category}</Tag>
                <Tag>{project.status}</Tag>
              </div>
              <div className="space-y-4">
                <h1 className="max-w-5xl text-pretty font-serif text-4xl tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
                  {project.title}
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">{project.strapline}</p>
                <p className="max-w-3xl text-sm leading-8 text-[var(--muted)]">{project.excerpt}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/contact">Discuss this kind of work</ButtonLink>
                <ButtonLink href="/projects" variant="secondary">
                  Back to projects
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <Surface className="p-6 md:p-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Project context</p>
                    <p className="text-sm leading-7 text-[var(--muted)]">{project.context}</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {project.heroMetrics.map((metric) => (
                      <div key={metric.label} className="rounded-2xl border border-[var(--border)] bg-[var(--background)]/70 p-4">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">{metric.label}</p>
                        <p className="mt-2 text-base font-semibold text-[var(--foreground)]">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Role and positioning</p>
                    <p className="text-sm leading-7 text-[var(--muted)]">{project.role}</p>
                    <p className="text-sm leading-7 text-[var(--muted)]">{project.audience}</p>
                  </div>
                  <div className="rounded-2xl border border-dashed border-[var(--accent)]/35 bg-[var(--accent-soft)]/35 p-4 text-sm leading-7 text-[var(--muted)]">
                    These projects are portfolio reference implementations created to demonstrate system design, backend depth, and technical judgment. Any dashboards, amounts, or operational figures shown in the UI are illustrative demo data, not employer production metrics.
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <Tag className="tracking-[0.12em]" key={item}>
                        {item}
                      </Tag>
                    ))}
                  </div>
                </div>
              </Surface>
            </Reveal>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <Reveal>
              <Surface className="h-full p-6 md:p-8">
                <div className="space-y-4">
                  <Tag>Problem</Tag>
                  {project.problem.map((paragraph) => (
                    <p className="text-sm leading-8 text-[var(--muted)]" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Surface>
            </Reveal>
            <Reveal delay={0.06}>
              <Surface className="h-full p-6 md:p-8">
                <div className="space-y-4">
                  <Tag>Approach</Tag>
                  {project.approach.map((paragraph) => (
                    <p className="text-sm leading-8 text-[var(--muted)]" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Surface>
            </Reveal>
          </section>

          <section className="space-y-8">
            <Reveal>
              <SectionHeading
                eyebrow="Architecture"
                title="Structured to separate core domain responsibility from provider or workflow-specific complexity."
                description={project.architecture.summary}
              />
            </Reveal>
            <Reveal delay={0.05}>
              <Surface className="overflow-hidden p-6 md:p-8">
                <ProjectMockup slug={project.slug} />
              </Surface>
            </Reveal>
            <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
              <Reveal>
                <Surface className="h-full p-6 md:p-8">
                  <div className="space-y-5">
                    <Tag>Architecture layers</Tag>
                    <div className="space-y-4">
                      {project.architecture.layers.map((layer, index) => (
                        <div className="grid gap-3 rounded-3xl border border-[var(--border)] bg-[var(--background)]/70 p-5 md:grid-cols-[auto_minmax(0,1fr)]" key={layer.name}>
                          <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-sm font-semibold text-[var(--accent)]">
                            {index + 1}
                          </span>
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-[var(--foreground)]">{layer.name}</h3>
                            <p className="text-sm leading-7 text-[var(--muted)]">{layer.details}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Surface>
              </Reveal>
              <Reveal delay={0.06}>
                <Surface className="h-full p-6 md:p-8">
                  <div className="space-y-5">
                    <Tag>Key decisions</Tag>
                    {project.architecture.decisions.map((decision) => (
                      <div className="space-y-2 rounded-3xl border border-[var(--border)] bg-[var(--background)]/70 p-5" key={decision.title}>
                        <h3 className="text-lg font-semibold text-[var(--foreground)]">{decision.title}</h3>
                        <p className="text-sm leading-7 text-[var(--muted)]">{decision.body}</p>
                      </div>
                    ))}
                  </div>
                </Surface>
              </Reveal>
            </div>
          </section>

          <section className="space-y-8">
            <Reveal>
              <SectionHeading
                eyebrow="Product Surface"
                title="Features and operational views that make the reference implementation feel credible beyond the API layer."
                description="The point is to show backend depth alongside the operator-facing surfaces real teams need in order to diagnose and run a system well."
              />
            </Reveal>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {project.features.map((feature, index) => (
                <Reveal key={feature.title} delay={0.05 * index}>
                  <Surface className="h-full p-6">
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-[var(--foreground)]">{feature.title}</h3>
                      <p className="text-sm leading-7 text-[var(--muted)]">{feature.body}</p>
                    </div>
                  </Surface>
                </Reveal>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {project.screens.map((screen, index) => (
                <Reveal key={screen.title} delay={0.05 * index}>
                  <Surface className="h-full p-6">
                    <div className="space-y-3">
                      <Tag>Illustrative UI slice</Tag>
                      <h3 className="text-lg font-semibold text-[var(--foreground)]">{screen.title}</h3>
                      <p className="text-sm leading-7 text-[var(--muted)]">{screen.caption}</p>
                    </div>
                  </Surface>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <Reveal>
              <Surface className="h-full p-6 md:p-8">
                <div className="space-y-5">
                  <Tag>Trade-offs</Tag>
                  <ul className="space-y-3 text-sm leading-8 text-[var(--muted)]">
                    {project.tradeoffs.map((item) => (
                      <li className="flex gap-3" key={item}>
                        <span className="mt-2 size-1.5 rounded-full bg-[var(--accent)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Surface>
            </Reveal>
            <Reveal delay={0.06}>
              <Surface className="h-full p-6 md:p-8">
                <div className="space-y-5">
                  <Tag>Why it matters</Tag>
                  <ul className="space-y-3 text-sm leading-8 text-[var(--muted)]">
                    {project.outcomes.map((item) => (
                      <li className="flex gap-3" key={item}>
                        <span className="mt-2 size-1.5 rounded-full bg-[var(--accent)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Surface>
            </Reveal>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <Reveal>
              <Surface className="h-full p-6 md:p-8">
                <div className="space-y-5">
                  <Tag>What I'd improve next</Tag>
                  <ul className="space-y-3 text-sm leading-8 text-[var(--muted)]">
                    {project.next.map((item) => (
                      <li className="flex gap-3" key={item}>
                        <span className="mt-2 size-1.5 rounded-full bg-[var(--accent)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Surface>
            </Reveal>
            <Reveal delay={0.06}>
              <Surface className="h-full p-6 md:p-8">
                <div className="space-y-5">
                  <Tag>Repository boundaries</Tag>
                  <ul className="space-y-3 text-sm leading-8 text-[var(--muted)]">
                    {project.repoStructure.map((item) => (
                      <li className="flex gap-3 font-mono text-xs sm:text-sm" key={item}>
                        <span className="mt-2 size-1.5 rounded-full bg-[var(--accent)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Surface>
            </Reveal>
          </section>
        </Container>
      </div>
    </>
  );
}
