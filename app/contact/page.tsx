import { Clock3, MailOpen, MessageSquareText } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { ContactSurfaces } from "@/components/sections/content-cards";
import { Container, PageIntro, SectionHeading, Surface } from "@/components/ui/primitives";
import { siteContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact Bruno Salgado about Senior Backend Engineer and Tech Lead opportunities in fintech, platform engineering, and distributed systems.",
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
                    <p className="font-semibold">How outreach works</p>
                  </div>
                  <p>{siteContent.contact.responseNote}</p>
                </div>
              </Surface>
            }
          />
        </Reveal>

        <section className="space-y-8">
          <Reveal>
            <ContactSurfaces
              email={siteContent.profile.email}
              linkedinUrl={siteContent.profile.linkedinUrl}
              locations={siteContent.contact.locations}
            />
          </Reveal>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:items-start">
          <Reveal className="space-y-8">
            <SectionHeading
              eyebrow="Reach Out"
              title="A short, direct message is enough to start the conversation."
              description="The best fit is usually clear quickly: Senior Backend Engineer or Tech Lead roles in fintech, platform teams, or distributed systems environments where Java, AWS, payments, and architecture all matter."
            />
            <div className="space-y-4">
              {[
                {
                  icon: MessageSquareText,
                  title: "Best topics",
                  body: "Senior backend roles, Tech Lead opportunities, fintech platforms, payment systems, AWS modernization, and backend-heavy product teams.",
                },
                {
                  icon: MailOpen,
                  title: "Useful context",
                  body: "Team stage, key technical challenges, domain focus, and whether the role leans more hands-on, more leadership-oriented, or both.",
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
