import Link from "next/link";

import { ButtonLink, Container, Surface, Tag } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <div className="py-28 sm:py-36">
      <Container>
        <Surface className="mx-auto max-w-3xl p-8 text-center md:p-12">
          <div className="space-y-5">
            <Tag>404</Tag>
            <h1 className="font-serif text-4xl text-[var(--foreground)] sm:text-5xl">This page is not part of Bruno's portfolio.</h1>
            <p className="text-base leading-8 text-[var(--muted)]">
              The link may be outdated, or the content may have moved. The main portfolio pages are still available below.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <ButtonLink href="/">Go home</ButtonLink>
              <ButtonLink href="/projects" variant="secondary">
                View projects
              </ButtonLink>
            </div>
            <p className="text-sm text-[var(--muted)]">
              Or head to <Link className="font-medium text-[var(--foreground)] hover:text-[var(--accent)]" href="/contact">contact</Link> if you were trying to reach Bruno directly.
            </p>
          </div>
        </Surface>
      </Container>
    </div>
  );
}
