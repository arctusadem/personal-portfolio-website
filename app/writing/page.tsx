import { Linkedin, PenSquare } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ArticleCard, SocialPostCard } from "@/components/sections/content-cards";
import { ButtonLink, Container, PageIntro, SectionHeading, Surface, Tag } from "@/components/ui/primitives";
import { articles, siteContent, socialPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const easterEggArticle = articles[0];

export const metadata = buildMetadata({
  title: "Posts",
  description:
    "Featured LinkedIn posts and one hidden-features post from Bruno Salgado.",
  path: "/writing",
  keywords: ["Bruno Salgado LinkedIn posts", "Featured posts", "Easter eggs"],
});

export default function WritingPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container className="space-y-16">
        <Reveal>
          <PageIntro
            eyebrow="Posts"
            title="Featured LinkedIn posts and one small hidden-features guide."
            description="Selected short-form posts from Bruno's LinkedIn live here alongside a single post explaining the easter eggs hidden throughout the portfolio."
            aside={
              <Surface className="p-6">
                <div className="space-y-4 text-sm leading-7 text-[var(--muted)]">
                  <div className="flex items-center gap-3 text-[var(--foreground)]">
                    <PenSquare className="size-5 text-[var(--accent)]" />
                    <p className="font-semibold">LinkedIn first</p>
                  </div>
                  <p>
                    Bruno's shorter professional updates continue on LinkedIn, with selected posts surfaced here when they are curated into the site content.
                  </p>
                  <ButtonLink external href={siteContent.profile.linkedinUrl} variant="secondary" withIcon={false}>
                    <Linkedin className="size-4" /> View more on LinkedIn
                  </ButtonLink>
                </div>
              </Surface>
            }
          />
        </Reveal>

        <section className="space-y-8">
          <Reveal>
            <SectionHeading
              eyebrow="Featured LinkedIn Posts"
              title="Selected posts from Bruno's LinkedIn."
              description="Curated manually so the site can use a stable local content file rather than depending on LinkedIn's page structure."
            />
          </Reveal>
          {socialPosts.length > 0 ? (
            <div className="grid gap-4 xl:grid-cols-2">
              {socialPosts.map((post, index) => (
                <Reveal key={post.slug} delay={0.05 * index}>
                  <SocialPostCard post={post} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal delay={0.04}>
              <Surface className="p-8 md:p-10">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                  <div className="space-y-3">
                    <Tag>LinkedIn</Tag>
                    <p className="max-w-3xl text-pretty font-serif text-3xl text-[var(--foreground)] sm:text-4xl">
                      Featured posts will sit here as curated embeds from Bruno's LinkedIn.
                    </p>
                    <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
                      For now, the full short-form activity stream continues on LinkedIn.
                    </p>
                  </div>
                  <ButtonLink external href={siteContent.profile.linkedinUrl} variant="secondary" withIcon={false}>
                    <Linkedin className="size-4" /> View more on LinkedIn
                  </ButtonLink>
                </div>
              </Surface>
            </Reveal>
          )}
        </section>

        {easterEggArticle ? (
          <section className="space-y-8">
            <Reveal>
              <SectionHeading
                eyebrow="Hidden Features"
                title="One extra post for people who notice the details."
                description={easterEggArticle.summary}
              />
            </Reveal>
            <Reveal delay={0.05}>
              <ArticleCard article={easterEggArticle} />
            </Reveal>
          </section>
        ) : null}
      </Container>
    </div>
  );
}
