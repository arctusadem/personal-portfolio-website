import { ExperienceTimeline } from "@/components/sections/content-cards";
import { ContactCTA } from "@/components/sections/contact-cta";
import { ButtonLink, Container, PageIntro } from "@/components/ui/primitives";
import { siteContent } from "@/lib/profile";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Experience",
  description:
    "Bruno Salgado's career at Itau Unibanco, PROFIT Business Bank and Cloud Payments: Java, Spring Boot, AWS modernization, payment integrations and technical leadership.",
  path: "/experience",
});
export default function ExperiencePage() {
  return (
    <Container className="space-y-12 py-12 sm:space-y-16 sm:py-16">
      <PageIntro
        eyebrow="Experience"
        title="Banking foundations. Fintech delivery. Technical leadership."
        description="8+ years across regulated banking and fintech, progressing from software development to hands-on leadership in payment systems."
        aside={
          <ButtonLink href="/resume" variant="secondary">
            Open résumé
          </ButtonLink>
        }
      />
      <section aria-label="Career history">
        <ExperienceTimeline items={siteContent.experience.roles} />
      </section>
      <ContactCTA />
    </Container>
  );
}
