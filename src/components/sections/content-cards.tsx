import type { Route } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Linkedin,
  Mail,
  MapPin,
  Network,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import type { Article, ExperienceItem, Project, SkillCategory, SocialPost } from "@/types/content";
import { cn } from "@/lib/utils";
import { LinkedInPostEmbed } from "@/components/sections/linkedin-post-embed";
import { ButtonLink, Surface, Tag } from "@/components/ui/primitives";
import { ProjectMockup } from "@/components/sections/project-mockups";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Surface className="overflow-hidden p-6 md:p-8">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] xl:items-center">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Tag>{project.category}</Tag>
            <span className="text-sm text-[var(--muted)]">{project.status}</span>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-pretty font-serif text-3xl tracking-tight text-[var(--foreground)]">
                {project.title}
              </h3>
              <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">{project.strapline}</p>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">{project.excerpt}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {project.heroMetrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-[var(--border)] bg-[var(--background)]/70 p-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">{metric.label}</p>
                <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">{metric.value}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <Tag className="tracking-[0.12em]" key={item}>
                {item}
              </Tag>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={`/projects/${project.slug}`}>Open case study</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Discuss this kind of work
            </ButtonLink>
          </div>
        </div>
        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--background)]/75 p-4 sm:p-5">
          <ProjectMockup slug={project.slug} compact />
        </div>
      </div>
    </Surface>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Surface className="h-full p-6">
      <div className="flex h-full flex-col gap-5">
        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
          <Tag>{article.category}</Tag>
          <span>Working note</span>
        </div>
        <div className="space-y-3">
          <h3 className="text-pretty font-serif text-2xl text-[var(--foreground)]">{article.title}</h3>
          <p className="leading-7 text-[var(--muted)]">{article.summary}</p>
        </div>
        <ul className="space-y-2 text-sm text-[var(--muted)]">
          {article.keyPoints.map((point) => (
            <li className="flex items-start gap-3" key={point}>
              <span className="mt-2 size-1.5 rounded-full bg-[var(--accent)]" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-2">
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] transition hover:text-[var(--accent)]"
            href={`/writing/${article.slug}` as Route}
          >
            Open note <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </Surface>
  );
}

export function SocialPostCard({ post }: { post: SocialPost }) {
  return (
    <Surface className="overflow-hidden p-4 md:p-5">
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
              <Linkedin className="size-4.5" />
            </span>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-[var(--foreground)]">{post.title}</p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">Embedded from LinkedIn</p>
            </div>
          </div>
          <Tag className="tracking-[0.18em]">0x06</Tag>
        </div>

        <LinkedInPostEmbed post={post} />

      </div>
    </Surface>
  );
}

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <div className="space-y-5">
      {items.map((item) => (
        <Surface className="relative overflow-hidden p-6 md:p-8" key={`${item.title}-${item.period}`}>
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[var(--accent)] via-[var(--accent-soft)] to-transparent" />
          <div className="grid gap-6 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">{item.period}</p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <h3 className="text-pretty font-serif text-3xl tracking-tight text-[var(--foreground)]">{item.title}</h3>
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">{item.subtitle}</p>
                <p className="max-w-3xl leading-7 text-[var(--muted)]">{item.summary}</p>
              </div>
              <ul className="grid gap-3 text-sm leading-7 text-[var(--muted)]">
                {item.outcomes.map((outcome) => (
                  <li className="flex gap-3" key={outcome}>
                    <span className="mt-2 size-1.5 rounded-full bg-[var(--accent)]" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Surface>
      ))}
    </div>
  );
}

export function SkillCategoryGrid({ categories }: { categories: SkillCategory[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <Surface className="p-6" key={category.name}>
          <div className="space-y-5">
            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-[var(--foreground)]">{category.name}</h3>
              <p className="leading-7 text-[var(--muted)]">{category.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <Tag className="tracking-[0.12em]" key={item}>
                  {item}
                </Tag>
              ))}
            </div>
          </div>
        </Surface>
      ))}
    </div>
  );
}

export function ContactSurfaces({
  email,
  linkedinUrl,
  locations,
}: {
  email: string;
  linkedinUrl: string;
  locations: string[];
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <Surface className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[var(--foreground)]">
            <Mail className="size-5 text-[var(--accent)]" />
            <p className="text-lg font-semibold">Direct contact</p>
          </div>
          <div className="space-y-2 text-sm leading-7 text-[var(--muted)]">
            <p>Email works best for thoughtful outreach, technical conversations, and hiring discussions.</p>
            <a className="inline-flex items-center gap-2 font-medium text-[var(--foreground)] hover:text-[var(--accent)]" href={`mailto:${email}`}>
              {email} <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </Surface>
      <Surface className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[var(--foreground)]">
            <UserRound className="size-5 text-[var(--accent)]" />
            <p className="text-lg font-semibold">Professional presence</p>
          </div>
          <div className="space-y-3 text-sm leading-7 text-[var(--muted)]">
            <a className="inline-flex items-center gap-2 font-medium text-[var(--foreground)] hover:text-[var(--accent)]" href={linkedinUrl} target="_blank" rel="noreferrer">
              LinkedIn profile <ArrowRight className="size-4" />
            </a>
            <div className="flex flex-wrap gap-2">
              {locations.map((location) => (
                <span key={location} className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                  <MapPin className="size-3.5" /> {location}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Surface>
    </div>
  );
}

export function SummaryStrip({
  items,
  className,
}: {
  items: Array<{ title: string; body: string; icon: "network" | "shield" | "calendar" }>;
  className?: string;
}) {
  const icons = {
    network: Network,
    shield: ShieldCheck,
    calendar: CalendarDays,
  };

  return (
    <div className={cn("grid gap-4 md:grid-cols-3", className)}>
      {items.map((item) => {
        const Icon = icons[item.icon];

        return (
          <Surface className="p-6" key={item.title}>
            <div className="space-y-4">
              <Icon className="size-5 text-[var(--accent)]" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-[var(--foreground)]">{item.title}</h3>
                <p className="text-sm leading-7 text-[var(--muted)]">{item.body}</p>
              </div>
            </div>
          </Surface>
        );
      })}
    </div>
  );
}

