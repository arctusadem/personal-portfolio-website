import { ExternalLink, Mail } from "lucide-react";
import { ResumePrintButton } from "@/components/sections/resume-print-button";
import { Container } from "@/components/ui/primitives";
import { siteContent, profile } from "@/lib/profile";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Résumé",
  description:
    "Bruno Salgado's printable career summary: Tech Lead, Java, Spring Boot, AWS, fintech, payment integrations and distributed backend systems.",
  path: "/resume",
});
export default function ResumePage() {
  return (
    <Container className="py-10 sm:py-14">
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-5">
        <div>
          <p className="eyebrow">Résumé</p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Career summary, ready to print or save as PDF.
          </p>
        </div>
        <ResumePrintButton />
      </div>
      <article className="resume-sheet mx-auto max-w-5xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10">
        <header className="border-b border-[var(--border)] pb-7">
          <h1 className="font-serif text-4xl">{profile.name}</h1>
          <p className="mt-3 text-lg font-medium">{profile.role}</p>
          <p className="mt-2 text-sm text-[var(--muted)]">{profile.location}</p>
          <div className="mt-5 flex flex-col items-start gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
            <a className="text-link break-all" href={`mailto:${profile.email}`}>
              <Mail aria-hidden className="size-4 text-[var(--accent)]" />
              {profile.email}
            </a>
            <a
              className="text-link"
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <ExternalLink aria-hidden className="size-3.5" />
            </a>
            <a
              className="text-link"
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub / arctusadem{" "}
              <ExternalLink aria-hidden className="size-3.5" />
            </a>
            <a className="text-link" href={profile.siteUrl}>
              brunosalgado.dev
            </a>
          </div>
        </header>
        <section className="py-7">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider">
            Profile
          </h2>
          <p className="text-sm leading-7 text-[var(--muted)]">
            Backend engineer and Tech Lead with 8+ years across Brazilian
            banking and fintech. Hands-on Java and Spring Boot development,
            payment-provider integrations, on-premises to AWS modernization, and
            technical leadership from architecture review through production
            troubleshooting.
          </p>
        </section>
        <section className="border-t border-[var(--border)] py-7">
          <h2 className="mb-6 text-sm font-bold uppercase tracking-wider">
            Experience
          </h2>
          <div className="space-y-7">
            {siteContent.experience.roles.map((role) => (
              <section key={role.period} className="resume-role">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h3 className="text-base font-semibold">{role.title}</h3>
                  <p className="text-xs text-[var(--muted)]">{role.period}</p>
                </div>
                <p className="mt-1 text-sm text-[var(--accent)]">
                  {role.company} · {role.location}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  {role.summary}
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-6 text-[var(--muted)]">
                  {role.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>
        <section className="border-t border-[var(--border)] pt-7">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider">
            Technical skills
          </h2>
          <dl className="space-y-3">
            {siteContent.skills.slice(0, 5).map((category) => (
              <div key={category.name} className="text-sm leading-6">
                <dt className="font-semibold">{category.name}</dt>
                <dd className="text-[var(--muted)]">
                  {category.items.join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </article>
    </Container>
  );
}
