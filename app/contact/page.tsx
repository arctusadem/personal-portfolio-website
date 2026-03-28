import { Clock3, MailOpen, MessageSquareText } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { ContactSurfaces } from "@/components/sections/content-cards";
import { ButtonLink, Container, PageIntro, SectionHeading, Surface, Tag } from "@/components/ui/primitives";
import { siteContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact Bruno Salgado about Senior Backend Engineer and Tech Lead opportunities in fintech, payments, backend platform, and distributed systems teams.",
  path: "/contact",
  keywords: ["Contact Bruno Salgado", "Backend engineer contact", "Tech lead contact"],
});

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container className="space-y-16">
        <Reveal>
          <PageIntro
            eyebrow="Contact"
            title={siteContent.contact.heading}
            description={siteContent.contact.summary}
            aside={
              <Surface className="p-6">
                <div className="space-y-4 text-sm leading-7 text-[var(--muted)]">
                  <div className="flex items-center gap-3 text-[var(--foreground)]">
                    <Clock3 className="size-5 text-[var(--accent)]" />
                    <p className="font-semibold">Best way to reach out</p>
                  </div>
                  <p>{siteContent.contact.responseNote}</p>
                </div>
              </Surface>
            }
          />
        </Reveal>

        <Reveal>
          <Surface className="overflow-hidden p-8 md:p-10">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="space-y-4">
                <Tag>Recruiter-ready CTA</Tag>
                <h2 className="max-w-3xl text-pretty font-serif text-3xl tracking-tight text-[var(--foreground)] sm:text-4xl">
                  Recruiters, hiring managers, founders, and technical peers can all reach Bruno directly without a complicated handoff.
                </h2>
                <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
                  The strongest fit is usually clear quickly: Senior Backend Engineer and Tech Lead roles across fintech, payments, backend platform, and distributed systems teams hiring in Canada.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <ButtonLink external href={`mailto:${siteContent.profile.email}`}>
                  Email Bruno
                </ButtonLink>
                <ButtonLink external href={siteContent.profile.linkedinUrl} variant="secondary">
                  View LinkedIn
                </ButtonLink>
              </div>
            </div>
          </Surface>
        </Reveal>

        <section className="space-y-8">
          <Reveal>
            <ContactSurfaces
              email={siteContent.profile.email}
              linkedinUrl={siteContent.profile.linkedinUrl}
              githubUrl={siteContent.profile.githubUrl}
              locations={siteContent.contact.locations}
            />
          </Reveal>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-start">
          <Reveal className="space-y-8">
            <SectionHeading
              eyebrow="Reach Out"
              title="A short, direct message is enough to start the conversation."
              description="Useful context usually includes team stage, technical challenges, whether the role is more hands-on or more leadership-oriented, and what success would look like in the first few months."
            />
            <div className="space-y-4">
              {[
                {
                  icon: MessageSquareText,
                  title: "Best topics",
                  body: "Senior backend roles, Tech Lead opportunities, fintech platforms, payment systems, AWS modernization, SaaS infrastructure, and backend-heavy product teams.",
                },
                {
                  icon: MailOpen,
                  title: "Useful context",
                  body: "Team stage, architecture challenges, domain focus, and whether the role leans more toward delivery leadership, deeper implementation, or a blend of both.",
                },
              ].map((item) => (
                <Surface className="p-6" key={item.title}>
                  <div className="space-y-3">
                    <item.icon className="size-5 text-[var(--accent)]" />
                    <h2 className="text-lg font-semibold text-[var(--foreground)]">{item.title}</h2>
                    <p className="text-sm leading-7 text-[var(--muted)]">{item.body}</p>
                  </div>
                </Surface>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </section>
      </Container>
    </div>
  );
}

