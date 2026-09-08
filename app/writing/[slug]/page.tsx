import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Container, StructuredData } from "@/components/ui/primitives";
import { articles, getArticleBySlug } from "@/lib/content";
import { profile } from "@/lib/profile";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  return buildMetadata({
    title: article.title,
    description: article.summary,
    path: `/writing/${slug}`,
  });
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  return (
    <Container className="py-10 sm:py-14">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.summary,
          url: absoluteUrl(`/writing/${slug}`),
          author: {
            "@type": "Person",
            name: profile.name,
            url: profile.siteUrl,
          },
        }}
      />
      <article className="mx-auto max-w-3xl">
        <Link className="text-link mb-8 min-h-11 text-sm" href="/writing">
          <ArrowLeft aria-hidden className="size-4" /> Posts & field notes
        </Link>
        <header className="mb-10">
          <p className="eyebrow">{article.category}</p>
          <h1 className="page-heading mt-4">{article.title}</h1>
          <p className="mt-5 leading-8 text-[var(--muted)]">
            {article.summary}
          </p>
        </header>
        <p className="mb-10 rounded-2xl border border-[var(--border)] bg-[var(--accent-soft)] p-5 text-sm leading-7">
          Keyboard shortcuts work outside form fields. Press{" "}
          <kbd className="rounded border border-[var(--border-strong)] px-1.5 font-mono text-xs">
            Esc
          </kbd>{" "}
          to dismiss any effect. Reduced-motion preferences are respected.
        </p>
        <div className="space-y-9">
          {article.sections.map((section) => (
            <section
              key={section.heading}
              className="border-t border-[var(--border)] pt-7"
            >
              <h2 className="font-serif text-2xl">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  className="mt-4 text-sm leading-8 text-[var(--muted)]"
                  key={paragraph}
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </Container>
  );
}
