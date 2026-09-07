import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  GitBranch,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/sections/content-cards";
import { ContactCTA } from "@/components/sections/contact-cta";
import {
  ButtonLink,
  Container,
  StructuredData,
} from "@/components/ui/primitives";
import { projects } from "@/lib/content";
import { siteContent, profile } from "@/lib/profile";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tech Lead & Senior Backend Engineer",
  description:
    "Bruno Salgado: 8+ years building Java, Spring Boot and AWS backends for banking, fintech and payments. Technical leadership and distributed systems.",
  path: "/",
});

function EngineeringFocus() {
  return (
    <figure className="diagram-grid relative overflow-hidden rounded-3xl border border-[var(--border)] p-6 sm:p-8">
      <figcaption className="mb-7 flex items-center justify-between gap-4">
        <span className="eyebrow">Engineering focus</span>
        <GitBranch aria-hidden className="size-4 text-[var(--accent)]" />
      </figcaption>
      <p className="mb-7 max-w-xs font-serif text-2xl leading-tight">
        A payment crosses more than an API.
      </p>
      <ol className="space-y-0">
        {[
          ["01", "API contract", "Validate intent. Establish idempotency."],
          ["02", "Domain & state", "Own the transition. Persist the evidence."],
          [
            "03",
            "Provider boundary",
            "Handle uncertainty. Reconcile the result.",
          ],
        ].map(([n, title, body], i) => (
          <li key={n}>
            <div className="diagram-node flex gap-4">
              <span className="pt-1 font-mono text-xs text-[var(--accent)]">
                {n}
              </span>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                  {body}
                </p>
              </div>
            </div>
            {i < 2 && (
              <div className="ml-7 h-5 border-l border-[var(--border-strong)]" />
            )}
          </li>
        ))}
      </ol>
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--muted)]">
        {["Traceable", "Recoverable", "Explicit"].map((x) => (
          <span key={x} className="inline-flex items-center gap-1.5">
            <Check aria-hidden className="size-3 text-[var(--accent)]" />
            {x}
          </span>
        ))}
      </div>
    </figure>
  );
}

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.role,
          url: absoluteUrl("/"),
          sameAs: [profile.linkedinUrl, profile.githubUrl],
          knowsAbout: [
            "Java",
            "Spring Boot",
            "AWS",
            "Payments",
            "Distributed systems",
            "Technical leadership",
          ],
        }}
      />
      <section className="pb-12 pt-10 sm:pb-16 sm:pt-16 lg:pt-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <Reveal className="min-w-0 space-y-6">
              <p className="eyebrow">{siteContent.hero.eyebrow}</p>
              <h1 className="hero-title">{siteContent.hero.headline}</h1>
              <div
                className="flex flex-wrap gap-5"
                aria-label="Core technologies"
              >
                {["Java", "Spring Boot", "AWS"].map((x) => (
                  <span className="hero-stack" key={x}>
                    {x}
                  </span>
                ))}
              </div>
              <p className="max-w-lg text-lg leading-7 text-[var(--foreground)]">
                Payments, fintech and distributed systems.
              </p>
              <p className="max-w-lg text-sm leading-7 text-[var(--muted)]">
                {siteContent.hero.supportingText}
              </p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/experience">
                  Explore my experience
                </ButtonLink>
                <ButtonLink href="/resume" variant="secondary">
                  View resume
                </ButtonLink>
              </div>
              <p className="max-w-md text-xs leading-6 text-[var(--muted)]">
                {siteContent.hero.availability}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <EngineeringFocus />
            </Reveal>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-[var(--border)] pt-6">
            <p className="text-xs text-[var(--muted)]">
              Experience across banking & fintech
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold sm:text-base">
              <span>Itau Unibanco</span>
              <span>PROFIT Business Bank</span>
              <span>Cloud Payments</span>
            </div>
            <a href="#selected-work" className="text-link text-xs">
              Selected work
              <ArrowDown aria-hidden className="size-3.5" />
            </a>
          </div>
        </Container>
      </section>

      <section
        id="selected-work"
        className="section border-t border-[var(--border)]"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.5fr] lg:gap-20">
            <div className="space-y-5">
              <p className="eyebrow">Professional experience</p>
              <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                Close to the code.
                <br />
                Accountable for the system.
              </h2>
              <p className="text-sm leading-7 text-[var(--muted)]">
                My work connects implementation detail with the architecture and
                operational decisions around it.
              </p>
              <Link className="text-link text-sm" href="/experience">
                Full career history
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {siteContent.recruiterSignals.map((item, i) => (
                <div
                  key={item.title}
                  className="grid grid-cols-[2rem_1fr] gap-4 py-6 first:pt-0 last:pb-0"
                >
                  <span className="pt-1 font-mono text-xs text-[var(--accent)]">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl space-y-4">
              <p className="eyebrow">Engineering studies</p>
              <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
                A closer look at the decisions.
              </h2>
              <p className="text-sm leading-7 text-[var(--muted)]">
                Independent architecture studies with interactive models and API
                contracts. Each explores a specific design problem, its failure
                cases and its trade-offs.
              </p>
            </div>
            <Link className="text-link text-sm" href="/projects">
              All case studies
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
          <div className="space-y-5">
            {projects.map((project, index) => (
              <ProjectCard project={project} index={index} key={project.slug} />
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            <div className="space-y-5">
              <p className="eyebrow">How I work</p>
              <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                Good technical direction makes the next decision easier.
              </h2>
              <p className="text-sm leading-7 text-[var(--muted)]">
                I care about clear ownership, written trade-offs and delivery
                plans grounded in the actual system. I mentor through
                implementation and keep architecture connected to what the team
                can operate.
              </p>
              <Link href="/about" className="text-link text-sm">
                More about me
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
            <div className="space-y-0 divide-y divide-[var(--border)]">
              {siteContent.about.philosophy.map((item) => (
                <div className="py-5 first:pt-0" key={item.title}>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-[var(--border)] pt-6 text-sm">
            <p className="text-[var(--muted)]">
              Occasional thoughts on engineering and the work around it.
            </p>
            <Link href="/writing" className="text-link">
              Posts & field notes
              <ArrowUpRight aria-hidden className="size-4" />
            </Link>
          </div>
        </Container>
      </section>
      <section className="pb-16">
        <Container>
          <ContactCTA />
        </Container>
      </section>
    </>
  );
}
