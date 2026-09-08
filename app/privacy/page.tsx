import { Container } from "@/components/ui/primitives";
import { profile } from "@/lib/profile";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy",
  description:
    "How this portfolio handles email drafts, theme preferences, analytics and embedded LinkedIn posts.",
  path: "/privacy",
});
export default function PrivacyPage() {
  return (
    <Container className="py-12 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <p className="eyebrow">Privacy</p>
        <h1 className="page-heading mt-4">A small site. Clear boundaries.</h1>
        <div className="mt-10 space-y-8 text-sm leading-7 text-[var(--muted)]">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
              Email and contact
            </h2>
            <p>
              The contact form prepares a message in your email app. Its fields
              are not submitted to this website or included in analytics. If you
              send an email, your email provider delivers it to Bruno for a
              reply. Please do not include confidential company or customer
              information.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
              Theme preference
            </h2>
            <p>
              Your light or dark preference is stored in your browser&apos;s
              local storage. The interactive project models stay in memory and
              reset when the page is reloaded. They use fictional data.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
              Website analytics
            </h2>
            <p>
              The production site uses Vercel Web Analytics for aggregate
              traffic information. This integration removes query strings and
              URL fragments before sending page-view events and skips them when
              the browser sends Do Not Track. It does not track contact-field
              values.{" "}
              <a
                className="underline underline-offset-4"
                href="https://vercel.com/docs/analytics/privacy-policy"
                target="_blank"
                rel="noreferrer"
              >
                Vercel describes its data collection and retention here.
              </a>
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
              Embedded content and hosting
            </h2>
            <p>
              The Posts page includes content served directly by LinkedIn.
              Loading an embedded post connects your browser to LinkedIn, whose
              own privacy practices apply. You can also use the direct post
              link. Vercel hosts this website and may process request
              information for delivery, security and operation.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
              Questions
            </h2>
            <p>
              Contact{" "}
              <a
                className="break-all underline underline-offset-4"
                href={`mailto:${profile.email}`}
              >
                {profile.email}
              </a>{" "}
              with questions about this site.
            </p>
          </section>
        </div>
      </article>
    </Container>
  );
}
