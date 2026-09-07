import { ButtonLink, Container } from "@/components/ui/primitives";
export default function NotFound() {
  return (
    <Container className="py-20 sm:py-28">
      <section className="mx-auto max-w-2xl">
        <p className="eyebrow">404 / Route not found</p>
        <h1 className="page-heading mt-4">This link leads nowhere.</h1>
        <p className="mt-5 leading-7 text-[var(--muted)]">
          The page may have moved, or the address may be incomplete. The rest of
          the portfolio is still here.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <ButtonLink href="/">Go home</ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            Explore the studies
          </ButtonLink>
        </div>
      </section>
    </Container>
  );
}
