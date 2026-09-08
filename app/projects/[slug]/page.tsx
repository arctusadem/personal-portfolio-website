import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Download, Github } from "lucide-react";
import { StudyDiagram } from "@/components/sections/study-diagram";
import { StudyModel } from "@/components/sections/study-model";
import { ContactCTA } from "@/components/sections/contact-cta";
import {
  ButtonLink,
  Container,
  StructuredData,
} from "@/components/ui/primitives";
import { getProjectBySlug, projects } from "@/lib/content";
import { profile } from "@/lib/profile";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

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
  if (!project) notFound();
  return buildMetadata({
    title: project.title,
    description: project.excerpt,
    path: `/projects/${slug}`,
    keywords: project.stack,
  });
}
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const nextProject =
    projects[
      (projects.findIndex((p) => p.slug === slug) + 1) % projects.length
    ];
  const sourceUrl = `${profile.githubUrl}/personal-portfolio-website/tree/dev/projects/${project.directory}`;
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.excerpt,
          url: absoluteUrl(`/projects/${slug}`),
          creator: {
            "@type": "Person",
            name: profile.name,
            url: profile.siteUrl,
          },
          genre: "Independent architecture study",
        }}
      />
      <Container className="py-10 sm:py-14">
        <Link className="text-link mb-8 min-h-11 text-sm" href="/projects">
          <ArrowLeft aria-hidden className="size-4" /> All studies
        </Link>
        <header className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">{project.category} / Independent study</p>
            <h1 className="page-heading mt-4">{project.title}</h1>
            <p className="mt-5 font-serif text-2xl text-[var(--accent)]">
              {project.strapline}
            </p>
            <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
              {project.excerpt}
            </p>
          </div>
          <div className="self-end rounded-2xl border border-[var(--border)] p-6">
            <p className="eyebrow">Scope</p>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              Architecture proposal, OpenAPI sketch and tested browser model. No
              production backend or employer data.
            </p>
            <p className="mt-4 text-xs leading-6">
              <span className="text-[var(--muted)]">Proposed backend: </span>
              {project.stack.join(" · ")}
            </p>
            <p className="mt-2 text-xs text-[var(--muted)]">
              Executable model: TypeScript
            </p>
          </div>
        </header>
        <nav
          aria-label="Case study sections"
          className="my-10 flex flex-wrap gap-x-6 gap-y-1 border-y border-[var(--border)] py-3 text-sm"
        >
          {[
            ["#architecture", "Architecture"],
            ["#model", "Try the model"],
            ["#interfaces", "API contract"],
            ["#decisions", "Trade-offs"],
            ["#operations", "Operations"],
          ].map(([href, label]) => (
            <a className="text-link min-h-11" href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>
        <section className="grid gap-8 pb-12 md:grid-cols-2 md:gap-12">
          <div>
            <h2 className="font-serif text-2xl">The problem</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              {project.problem}
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl">The approach</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              {project.approach}
            </p>
          </div>
        </section>
        <section id="architecture" className="section-block space-y-7">
          <div>
            <p className="eyebrow">Architecture</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              {project.principle}
            </h2>
          </div>
          <StudyDiagram project={project} />
        </section>
        <section id="model" className="section-block space-y-6">
          <div className="max-w-3xl">
            <p className="eyebrow">Exercise the failure path</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              {project.demo.title}
            </h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              {project.demo.description}
            </p>
          </div>
          <StudyModel kind={project.directory} />
          <p className="max-w-3xl text-xs leading-6 text-[var(--muted)]">
            <strong className="font-semibold text-[var(--foreground)]">
              Model limits:{" "}
            </strong>
            {project.demo.limitation}
          </p>
        </section>
        <section id="interfaces" className="section-block space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow">API design</p>
              <h2 className="mt-3 font-serif text-3xl">
                An explicit command boundary.
              </h2>
            </div>
            <a
              className="text-link min-h-11 text-sm"
              download
              href={`/designs/${project.directory}.openapi.json`}
            >
              <Download aria-hidden className="size-4" /> Download OpenAPI
              sketch
            </a>
          </div>
          <p className="text-sm text-[var(--muted)]">
            Illustrative request and response. This contract specifies one
            command, not the entire proposed API.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="code-panel min-w-0 rounded-2xl p-5 sm:p-6">
              <p className="mb-4 break-words font-mono text-xs text-[var(--accent)]">
                {project.endpoint}
              </p>
              <pre className="text-xs leading-7">
                <code>
                  {project.directory !== "decision-hub"
                    ? "Idempotency-Key: command_demo\n\n"
                    : ""}
                  {project.request}
                </code>
              </pre>
            </div>
            <div className="code-panel min-w-0 rounded-2xl p-5 sm:p-6">
              <p className="mb-4 font-mono text-xs text-[var(--accent)]">
                Response
              </p>
              <pre className="text-xs leading-7">
                <code>{project.response}</code>
              </pre>
            </div>
          </div>
        </section>
        <section id="decisions" className="section-block">
          <p className="eyebrow">Technical decisions</p>
          <h2 className="mb-8 mt-3 font-serif text-3xl sm:text-4xl">
            What I would choose. What it costs.
          </h2>
          <div className="divide-y divide-[var(--border)]">
            {project.decisions.map((decision, index) => (
              <article
                key={decision.title}
                className="grid gap-4 py-6 first:pt-0 md:grid-cols-[1fr_2fr] md:gap-10"
              >
                <h3 className="flex gap-3 text-base font-semibold">
                  <span className="font-mono text-xs leading-7 text-[var(--accent)]">
                    0{index + 1}
                  </span>
                  {decision.title}
                </h3>
                <div>
                  <p className="text-sm leading-7">{decision.choice}</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                    <strong className="font-medium">Trade-off: </strong>
                    {decision.cost}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="operations" className="section-block">
          <p className="eyebrow">Operating the system</p>
          <h2 className="mb-7 mt-3 font-serif text-3xl">
            What needs attention in production.
          </h2>
          <div className="grid gap-7 md:grid-cols-3">
            {project.operations.map((item) => (
              <div key={item.title}>
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="section-block grid gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">Outcome & limits</p>
            <h2 className="mt-3 font-serif text-2xl">
              What this study establishes.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              {project.outcome}
            </p>
            <ButtonLink
              className="mt-5"
              external
              href={sourceUrl}
              variant="secondary"
            >
              <Github aria-hidden className="size-4" /> View study source
            </ButtonLink>
          </div>
          <div>
            <p className="eyebrow">Next steps</p>
            <h2 className="mt-3 font-serif text-2xl">
              Before calling it production-ready.
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
              {project.next.map((item) => (
                <li className="flex gap-3" key={item}>
                  <span
                    aria-hidden
                    className="mt-3 size-1 shrink-0 rounded-full bg-[var(--accent)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <aside className="mb-12 border-t border-[var(--border)] pt-6">
          <h2 className="eyebrow">Further reading</h2>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {project.sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="text-link min-h-11 text-sm"
              >
                {source.label}
                <ArrowUpRight aria-hidden className="size-3.5" />
              </a>
            ))}
          </div>
        </aside>
        <ContactCTA />
        <Link
          href={`/projects/${nextProject.slug}`}
          className="text-link mt-8 min-h-11 text-sm"
        >
          Next study: {nextProject.title}
          <ArrowUpRight aria-hidden className="size-4" />
        </Link>
      </Container>
    </>
  );
}
