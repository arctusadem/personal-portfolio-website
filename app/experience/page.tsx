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
        description="9 years of Java experience across banking and fintech. Selected contributions connect the business context with my hands-on work and technical direction."
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
