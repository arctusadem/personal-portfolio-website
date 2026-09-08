import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SkillCategoryGrid } from "@/components/sections/content-cards";
import { ContactCTA } from "@/components/sections/contact-cta";
import { Container, PageIntro } from "@/components/ui/primitives";
import { siteContent } from "@/lib/profile";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Java, Spring Boot & AWS Stack",
  description:
    "Bruno Salgado's backend stack: Java, Spring Boot, PostgreSQL, Kafka, AWS EKS, Kubernetes, CI/CD, payment integrations and technical leadership.",
  path: "/skills",
});
export default function SkillsPage() {
  return (
    <Container className="space-y-12 py-12 sm:space-y-16 sm:py-16">
      <PageIntro
        eyebrow="Skills & stack"
        title="Depth in the backend. Context around it."
        description="Java and Spring Boot are the centre of my work. Cloud delivery, data integrity and payment integrations are the context in which I've used them."
      />
      <SkillCategoryGrid categories={siteContent.skills} />
      <div className="flex flex-wrap items-center justify-between gap-5 border-y border-[var(--border)] py-6">
        <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
          The career history shows where this experience comes from. The studies
          show how I reason about boundaries, failure and recovery.
        </p>
        <Link href="/projects" className="text-link min-h-11 text-sm">
          Explore the studies <ArrowRight aria-hidden className="size-4" />
        </Link>
      </div>
      <ContactCTA />
    </Container>
  );
}
