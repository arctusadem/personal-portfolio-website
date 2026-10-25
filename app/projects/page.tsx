import { ProjectCard } from "@/components/sections/content-cards";
import { ContactCTA } from "@/components/sections/contact-cta";
import { Container, PageIntro } from "@/components/ui/primitives";
import { projects } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Engineering Studies",
  description:
    "Payment orchestration, financial ledgers and architecture decisions: independent design studies with API contracts, diagrams and executable failure models.",
  path: "/projects",
});
export default function ProjectsPage() {
  return (
    <Container className="space-y-12 py-12 sm:space-y-16 sm:py-16">
      <PageIntro
        eyebrow="Projects"
        title="The decisions behind the system."
        description="Three independent studies in payments, money movement and technical leadership. Payment orchestration includes a runnable Java / Spring Boot / PostgreSQL slice; all three include TypeScript browser models. Built independently, with fictional data."
      />
      <section aria-label="Engineering studies" className="space-y-5">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            headingLevel={2}
          />
        ))}
      </section>
      <ContactCTA />
    </Container>
  );
}
