import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { ContactCTA } from "@/components/sections/contact-cta";
import { Container, PageIntro } from "@/components/ui/primitives";
import { siteContent, profile } from "@/lib/profile";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Bruno Salgado's path from Brazilian banking to fintech technical leadership, building Java and Spring Boot systems and modernizing platforms on AWS.",
  path: "/about",
});
export default function AboutPage() {
  return (
    <Container className="space-y-12 py-12 sm:space-y-16 sm:py-16">
      <PageIntro
        eyebrow="About"
        title="An engineer first. A lead by responsibility."
        description="I'm Bruno Salgado, a backend engineer and Tech Lead working at the intersection of software, financial systems and the teams that build them."
      />
      <section className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
        <div className="space-y-5">
          {siteContent.about.intro.map((paragraph) => (
            <p
              className="text-base leading-8 text-[var(--muted)]"
              key={paragraph}
            >
              {paragraph}
            </p>
          ))}
        </div>
        <aside className="self-start rounded-2xl border border-[var(--border)] p-6">
          <p className="flex items-center gap-2 text-sm">
            <MapPin aria-hidden className="size-4 text-[var(--accent)]" />{" "}
            {profile.location}
          </p>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            My core stack is Java, Spring Boot and AWS. My background spans
            regulated banking, provider integrations, cloud modernization and
            hands-on technical leadership.
          </p>
          <Link href="/experience" className="text-link mt-5 min-h-11 text-sm">
            Follow the career history{" "}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </aside>
      </section>
      <section className="section-block">
        <p className="eyebrow">Engineering judgment</p>
        <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
          The questions I bring to a design review.
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {siteContent.about.philosophy.map((point, index) => (
            <div key={point.title}>
              <p className="mb-3 font-mono text-xs text-[var(--accent)]">
                0{index + 1}
              </p>
              <h3 className="text-lg font-semibold">{point.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="grid gap-7 border-t border-[var(--border)] pt-12 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow">Technical leadership</p>
          <h2 className="mt-3 max-w-sm font-serif text-3xl">
            Make the next decision easier for the team.
          </h2>
        </div>
        <div className="space-y-4">
          {siteContent.about.leadership.map((paragraph) => (
            <p
              key={paragraph}
              className="text-sm leading-7 text-[var(--muted)]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>
      <ContactCTA />
    </Container>
  );
}
