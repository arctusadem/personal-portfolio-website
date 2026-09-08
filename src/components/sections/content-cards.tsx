import Link from "next/link";
import { ArrowRight, ArrowUpRight, Code2, Linkedin } from "lucide-react";
import type {
  Article,
  ExperienceItem,
  Project,
  SkillCategory,
  SocialPost,
} from "@/types/content";
import { LinkedInPostEmbed } from "@/components/sections/linkedin-post-embed";
import { ButtonLink, Surface } from "@/components/ui/primitives";

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <article className="group grid overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] transition-colors hover:border-[var(--border-strong)] md:grid-cols-[1.4fr_1fr]">
      <div className="p-6 sm:p-8">
        <div className="mb-5 flex flex-wrap items-center gap-3 text-xs text-[var(--muted)]">
          <span className="font-mono text-[var(--accent)]">0{index + 1}</span>
          <span>{project.category}</span>
          <span aria-hidden>/</span>
          <span>Independent study</span>
        </div>
        <h3 className="font-serif text-2xl leading-tight sm:text-3xl">
          <Link
            className="transition-colors hover:text-[var(--accent)]"
            href={`/projects/${project.slug}`}
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
          {project.excerpt}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ButtonLink href={`/projects/${project.slug}`} variant="secondary">
            View case study
          </ButtonLink>
          <Link
            href={`/projects/${project.slug}#model`}
            className="text-link text-sm"
          >
            Try the model <ArrowUpRight aria-hidden className="size-4" />
          </Link>
        </div>
      </div>
      <div className="diagram-grid flex flex-col justify-center border-t border-[var(--border)] p-6 sm:p-8 md:border-l md:border-t-0">
        <span className="eyebrow mb-4">The design question</span>
        <p className="max-w-sm font-serif text-2xl leading-snug">
          {project.question}
        </p>
        <p className="mt-6 flex items-center gap-2 text-xs text-[var(--muted)]">
          <Code2 aria-hidden className="size-4 text-[var(--accent)]" />{" "}
          Architecture · API sketch · Tested model
        </p>
      </div>
    </article>
  );
}
export function ArticleCard({ article }: { article: Article }) {
  return (
    <Surface className="p-6 sm:p-8">
      <p className="eyebrow">{article.category}</p>
      <h3 className="mt-4 font-serif text-2xl">{article.title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
        {article.summary}
      </p>
      <Link
        href={`/writing/${article.slug}`}
        className="text-link mt-5 min-h-11 text-sm"
      >
        Explore the hidden details <ArrowRight aria-hidden className="size-4" />
      </Link>
    </Surface>
  );
}
export function SocialPostCard({ post }: { post: SocialPost }) {
  return (
    <article className="min-w-0">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold">
        <Linkedin aria-hidden className="size-4 text-[var(--accent)]" />{" "}
        {post.title}
      </h3>
      <LinkedInPostEmbed post={post} />
    </article>
  );
}
export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="divide-y divide-[var(--border)]">
      {items.map((item, index) => (
        <li
          key={item.period}
          className="grid gap-5 py-8 first:pt-0 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-10"
        >
          <div className="space-y-2">
            <p className="text-sm font-medium">{item.period}</p>
            <p className="text-xs leading-6 text-[var(--muted)]">
              {item.location}
            </p>
            {index === 0 && (
              <span className="inline-flex rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-medium text-[var(--accent)]">
                Current role
              </span>
            )}
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-[var(--accent)]">
              {item.company}
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl">{item.title}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)]">
              {item.summary}
            </p>
            <ul className="mt-4 max-w-3xl space-y-3 text-sm leading-7 text-[var(--foreground)]">
              {item.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-3 size-1 shrink-0 rounded-full bg-[var(--accent)]"
                  />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-6 text-[var(--muted)]">
              {item.stack.join(" · ")}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
export function SkillCategoryGrid({
  categories,
}: {
  categories: SkillCategory[];
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Surface className="p-6 sm:p-7" key={category.name}>
          <h2 className="font-serif text-2xl">{category.name}</h2>
          <p className="mb-5 mt-3 text-sm leading-7 text-[var(--muted)]">
            {category.description}
          </p>
          <ul className="flex flex-wrap gap-2">
            {category.items.map((item) => (
              <li
                className="rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-xs leading-5"
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </Surface>
      ))}
    </div>
  );
}
