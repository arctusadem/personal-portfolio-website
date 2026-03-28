import { Building2, MapPin, Network } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ButtonLink, Container, PageIntro, SectionHeading, Surface, Tag } from "@/components/ui/primitives";
import { siteContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Learn more about Bruno Salgado's background across banking, fintech, backend architecture, and technical leadership.",
  path: "/about",
  keywords: ["About Bruno Salgado", "Backend leadership", "Payments engineering background"],
});

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container className="space-y-16">
        <Reveal>
          <PageIntro
            eyebrow="About Bruno"
            title="A backend engineer and Tech Lead shaped by regulated banking, fintech delivery, and cloud modernization work."
            description="Bruno is strongest in environments where backend depth, architectural judgment, and execution discipline all matter at the same time: payments platforms, modernization programs, regulated systems, and backend teams carrying real operational risk."
            aside={
              <Surface className="p-6">
                <div className="space-y-4 text-sm leading-7 text-[var(--muted)]">
                  <div className="flex items-center gap-3 text-[var(--foreground)]">
                    <Building2 className="size-5 text-[var(--accent)]" />
                    <p className="font-semibold">Best fit environments</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Fintech",
                      "Payments",
                      "Platform engineering",
                      "Bank modernization",
                      "Distributed systems",
                    ].map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </div>
              </Surface>
            }
          />
        </Reveal>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)]">
          <Reveal className="space-y-5">
            {siteContent.about.intro.map((paragraph) => (
              <p className="text-base leading-8 text-[var(--muted)] sm:text-lg" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.08}>
            <Surface className="p-6 md:p-8">
              <div className="space-y-5">
                <div className="flex items-center gap-3 text-[var(--foreground)]">
                  <MapPin className="size-5 text-[var(--accent)]" />
                  <p className="text-lg font-semibold">Canadian market positioning</p>
                </div>
                <p className="text-sm leading-7 text-[var(--muted)]">
                  Bruno is targeting senior backend and Tech Lead roles in Canada, especially in fintech, platform engineering, and distributed systems teams where Java, Spring Boot, AWS modernization, and payments depth matter.
                </p>
                <p className="text-sm leading-7 text-[var(--muted)]">
                  The background combines real company history, regulated systems work, cloud modernization, and portfolio projects that stay clearly separated from employer production work.
                </p>
              </div>
            </Surface>
          </Reveal>
        </section>

        <section className="space-y-8">
          <Reveal>
            <SectionHeading
              eyebrow="Career Philosophy"
              title="Three principles shape most of Bruno's engineering decisions."
              description="They show up in architecture reviews, service design, modernization work, and the way operational reality is folded back into engineering choices."
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {siteContent.about.philosophy.map((item, index) => (
              <Reveal key={item.title} delay={0.06 * index}>
                <Surface className="h-full p-6">
                  <div className="space-y-4">
                    <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-sm font-semibold text-[var(--accent)]">
                      0{index + 1}
                    </span>
                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold text-[var(--foreground)]">{item.title}</h2>
                      <p className="text-sm leading-7 text-[var(--muted)]">{item.body}</p>
                    </div>
                  </div>
                </Surface>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <Reveal>
            <SectionHeading
              eyebrow="Technical Strengths"
              title="Backend depth, AWS platform familiarity, and financial-systems thinking in one profile."
              description="The value is the combination: strong implementation skill, cloud-aware delivery, and enough architectural range to work comfortably in systems where mistakes are expensive."
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {siteContent.about.strengths.map((item, index) => (
              <Reveal key={item.title} delay={0.05 * index}>
                <Surface className="h-full p-6">
                  <div className="space-y-3">
                    <div className="inline-flex size-10 items-center justify-center rounded-2xl bg-[var(--surface-strong)] text-[var(--accent)]">
                      <Network className="size-4.5" />
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--foreground)]">{item.title}</h3>
                    <p className="text-sm leading-7 text-[var(--muted)]">{item.body}</p>
                  </div>
                </Surface>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <Reveal>
            <SectionHeading
              eyebrow="Leadership"
              title="Leadership here means helping teams make better technical decisions and deliver them cleanly."
              description="The emphasis is on clarity, risk reduction, and execution quality rather than status language or process for its own sake."
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {siteContent.about.leadership.map((paragraph, index) => (
              <Reveal key={paragraph} delay={0.05 * index}>
                <Surface className="h-full p-6">
                  <p className="text-sm leading-7 text-[var(--muted)]">{paragraph}</p>
                </Surface>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal>
          <Surface className="p-8 md:p-10">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="space-y-3">
                <Tag>Next step</Tag>
                <h2 className="max-w-3xl text-pretty font-serif text-3xl text-[var(--foreground)] sm:text-4xl">
                  Want to see how that background translates into portfolio systems, technical trade-offs, and interview-ready case studies?
                </h2>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <ButtonLink href="/projects">View case studies</ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  Start a conversation
                </ButtonLink>
              </div>
            </div>
          </Surface>
        </Reveal>
      </Container>
    </div>
  );
}

