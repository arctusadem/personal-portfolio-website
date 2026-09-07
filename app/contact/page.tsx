import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { ContactForm, CopyEmail } from "@/components/sections/contact-form";
import { Container, PageIntro } from "@/components/ui/primitives";
import { siteContent, profile } from "@/lib/profile";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact Bruno Salgado about Senior Backend Engineer and Tech Lead opportunities in Canada, especially fintech, payments, SaaS and distributed systems.",
  path: "/contact",
});
export default function ContactPage() {
  return (
    <Container className="space-y-12 py-12 sm:space-y-16 sm:py-16">
      <PageIntro
        eyebrow="Contact"
        title={siteContent.contact.heading}
        description={siteContent.contact.summary}
      />
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <section aria-label="Contact details" className="space-y-7">
          <div className="rounded-2xl bg-[var(--accent-soft)] p-6">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Mail aria-hidden className="size-4 text-[var(--accent)]" /> Email
              me directly
            </p>
            <a
              className="text-link break-all text-base font-semibold sm:text-lg"
              href={`mailto:${profile.email}`}
            >
              {profile.email}
            </a>
            <div className="mt-3">
              <CopyEmail />
            </div>
          </div>
          <p className="max-w-md text-sm leading-7 text-[var(--muted)]">
            {siteContent.contact.responseNote}
          </p>
          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {[
              {
                label: "LinkedIn",
                detail: "Professional background & posts",
                href: profile.linkedinUrl,
                Icon: Linkedin,
              },
              {
                label: "GitHub",
                detail: "Code & engineering studies",
                href: profile.githubUrl,
                Icon: Github,
              },
            ].map(({ label, detail, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-20 items-center gap-4 py-4 transition-colors hover:text-[var(--accent)]"
              >
                <Icon aria-hidden className="size-5 text-[var(--accent)]" />
                <span className="flex-1">
                  <span className="block text-sm font-semibold">{label}</span>
                  <span className="mt-1 block text-xs text-[var(--muted)]">
                    {detail}
                  </span>
                </span>
                <ArrowUpRight aria-hidden className="size-4" />
              </a>
            ))}
          </div>
          <p className="flex items-center gap-2 text-xs text-[var(--muted)]">
            <MapPin aria-hidden className="size-4" /> {profile.location}
          </p>
        </section>
        <ContactForm />
      </div>
    </Container>
  );
}
