import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import { ButtonLink, Container, StructuredData, Surface, Tag } from "@/components/ui/primitives";
import { articles, getArticleBySlug, siteContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

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

  if (!article) {
    return buildMetadata({
      title: "Note",
      description: "Note not found.",
      path: `/writing/${slug}`,
    });
  }

  return buildMetadata({
    title: article.title,
    description: article.summary,
    path: `/writing/${article.slug}`,
    keywords: [article.title, article.category, ...article.keyPoints],
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: article.title,
    description: article.summary,
    creator: {
      "@type": "Person",
      name: siteContent.profile.name,
    },
    about: article.category,
    keywords: article.keyPoints,
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="py-16 sm:py-20">
        <Container className="space-y-12">
          <Reveal className="space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
              <Tag>{article.category}</Tag>
              <span>Working note</span>
            </div>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-pretty font-serif text-4xl tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
                {article.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">{article.summary}</p>
            </div>
          </Reveal>

          <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
            <div className="space-y-8">
              {article.sections.map((section, index) => (
                <Reveal key={section.heading} delay={0.04 * index}>
                  <Surface className="p-6 md:p-8">
                    <div className="space-y-4">
                      <h2 className="font-serif text-3xl text-[var(--foreground)]">{section.heading}</h2>
                      {section.paragraphs.map((paragraph) => (
                        <p className="text-sm leading-8 text-[var(--muted)] sm:text-base" key={paragraph}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </Surface>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.06}>
              <Surface className="sticky top-28 p-6">
                <div className="space-y-5">
                  <Tag>Key takeaways</Tag>
                  <ul className="space-y-3 text-sm leading-7 text-[var(--muted)]">
                    {article.takeaways.map((item) => (
                      <li className="flex gap-3" key={item}>
                        <span className="mt-2 size-1.5 rounded-full bg-[var(--accent)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)]/70 p-4 text-sm leading-7 text-[var(--muted)]">
                    If this overlaps with a role, a system problem, or an architecture conversation you are hiring for, Bruno would be glad to talk.
                  </div>
                  <div className="border-t border-[var(--border)] pt-5">
                    <ButtonLink href="/contact" variant="secondary">
                      Continue the conversation
                    </ButtonLink>
                  </div>
                </div>
              </Surface>
            </Reveal>
          </section>
        </Container>
      </div>
    </>
  );
}
