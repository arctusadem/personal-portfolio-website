import { Linkedin } from "lucide-react";
import {
  ArticleCard,
  SocialPostCard,
} from "@/components/sections/content-cards";
import { ButtonLink, Container, PageIntro } from "@/components/ui/primitives";
import { articles, socialPosts } from "@/lib/content";
import { profile } from "@/lib/profile";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Posts & Field Notes",
  description:
    "Selected LinkedIn posts from Bruno Salgado, plus a guide to the portfolio's hidden engineering details.",
  path: "/writing",
});
export default function WritingPage() {
  return (
    <Container className="space-y-12 py-12 sm:space-y-16 sm:py-16">
      <PageIntro
        eyebrow="Posts & field notes"
        title="Beyond the pull request."
        description="I share thoughts on backend engineering, payments and technical work on LinkedIn."
      />
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
        <section aria-labelledby="featured-heading">
          <h2 id="featured-heading" className="mb-6 font-serif text-2xl">
            Featured LinkedIn posts
          </h2>
          <div className="space-y-8">
            {socialPosts.map((post) => (
              <SocialPostCard post={post} key={post.slug} />
            ))}
          </div>
          <ButtonLink
            external
            href={profile.linkedinUrl + "recent-activity/all/"}
            variant="secondary"
            className="mt-6"
          >
            <Linkedin aria-hidden className="size-4" />
            View more on LinkedIn
          </ButtonLink>
        </section>
        <aside className="space-y-5">
          <h2 className="font-serif text-2xl">Off the critical path</h2>
          {articles.map((article) => (
            <ArticleCard article={article} key={article.slug} />
          ))}
        </aside>
      </div>
    </Container>
  );
}
