import { Github, Linkedin, Mail } from "lucide-react";
import { ButtonLink, Surface } from "@/components/ui/primitives";
import { profile, siteContent } from "@/lib/profile";

export function ContactCTA() {
  return (
    <Surface className="contact-cta p-7 sm:p-10 lg:p-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="max-w-2xl space-y-4">
          <p className="eyebrow">Start a conversation</p>
          <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
            Building a backend team?
          </h2>
          <p className="text-base leading-7 text-[var(--muted)]">
            {siteContent.contact.summary}
          </p>
        </div>
        <div className="flex flex-col items-start gap-4">
          <ButtonLink href={`mailto:${profile.email}`} withIcon={false}>
            <Mail aria-hidden className="size-4" />
            Email Bruno
          </ButtonLink>
          <div className="flex flex-wrap gap-5 text-sm">
            <a
              className="text-link"
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin aria-hidden className="size-4" />
              LinkedIn
            </a>
            <a
              className="text-link"
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Github aria-hidden className="size-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </Surface>
  );
}
