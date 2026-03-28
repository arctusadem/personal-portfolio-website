"use client";

import { ArrowUpRight, Linkedin } from "lucide-react";

import type { SocialPost } from "@/types/content";

export function LinkedInPostEmbed({ post }: { post: SocialPost }) {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-white shadow-[inset_0_1px_0_rgba(0,0,0,0.03)]">
        <iframe
          src={post.embedUrl}
          title={post.title}
          width="504"
          height={String(post.height)}
          className="block w-full bg-white"
          style={{ minHeight: `${post.height}px` }}
          frameBorder="0"
          allowFullScreen
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--background)]/70 px-4 py-3 text-sm text-[var(--muted)]">
        <p>If LinkedIn blocks the live embed in your browser, use the direct post link below.</p>
        <a
          className="inline-flex items-center gap-2 font-semibold text-[var(--foreground)] transition hover:text-[var(--accent)]"
          href={post.sourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin className="size-4" /> Open on LinkedIn <ArrowUpRight className="size-4" />
        </a>
      </div>
    </div>
  );
}

