"use client";

import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

import { useEasterEggs } from "@/components/layout/easter-egg-provider";
import { Container, Tag } from "@/components/ui/primitives";
import { siteContent } from "@/lib/content";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { registerChecksumTap } = useEasterEggs();

  return (
    <footer className="border-t border-[var(--border)] bg-[color-mix(in_oklab,var(--surface)_72%,transparent)]">
      <Container className="grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="space-y-4">
          <Tag>Backend / Fintech / Leadership</Tag>
          <div className="space-y-2">
            <p className="max-w-2xl text-pretty font-serif text-2xl text-[var(--foreground)] sm:text-3xl">
              Backend engineering for payments, platforms, and systems that need to stay understandable under pressure.
            </p>
            <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
              Built for recruiters, founders, hiring managers, and technical leaders assessing Bruno Salgado for Senior Backend Engineer and Tech Lead opportunities in Canada.
            </p>
          </div>
        </div>

        <div className="space-y-4 lg:text-right">
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a className="footer-link" href={siteContent.profile.linkedinUrl} target="_blank" rel="noreferrer">
              <Linkedin className="size-4" /> LinkedIn
            </a>
            <a className="footer-link" href={siteContent.profile.githubUrl} target="_blank" rel="noreferrer">
              <Github className="size-4" /> GitHub
            </a>
            <a className="footer-link" href={`mailto:${siteContent.profile.email}`}>
              <Mail className="size-4" /> Email
            </a>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-[var(--muted)] lg:justify-end">
            <Link className="hover:text-[var(--foreground)]" href="/resume">
              Resume <ArrowUpRight className="ml-1 inline size-4" />
            </Link>
            <Link className="hover:text-[var(--foreground)]" href="/projects">
              Projects <ArrowUpRight className="ml-1 inline size-4" />
            </Link>
          </div>
          <div className="space-y-2 text-sm text-[var(--muted)]">
            <p>Copyright {year} Bruno Salgado. Crafted with Next.js, TypeScript, Tailwind, and a backend-first point of view.</p>
            <button
              type="button"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] transition hover:text-[var(--foreground)]"
              onClick={registerChecksumTap}
            >
              build: ca-0x06 | checksum: trusted-path | idempotency: true | target: canada
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
