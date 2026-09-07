"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { useEasterEggs } from "@/components/layout/easter-egg-provider";
import { Container } from "@/components/ui/primitives";
import { profile } from "@/lib/profile";

export function SiteFooter() {
  const { registerChecksumTap } = useEasterEggs();
  return (
    <footer className="site-footer border-t border-[var(--border)]">
      <Container className="py-8 sm:py-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold">{profile.name}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Backend engineering & technical leadership.
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-6 gap-y-4 text-sm"
          >
            <a
              className="text-link"
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin aria-hidden className="size-4" />
              LinkedIn
            </a>
            <a
              className="text-link"
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Github aria-hidden className="size-4" />
              GitHub
            </a>
            <a className="text-link" href={`mailto:${profile.email}`}>
              <Mail aria-hidden className="size-4" />
              Email
            </a>
            <Link className="text-link" href="/resume">
              Resume
            </Link>
          </nav>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-5 text-xs text-[var(--muted)]">
          <p>
            Copyright {new Date().getFullYear()} {profile.name}
          </p>
          <div className="flex items-center gap-5">
            <Link className="hover:text-[var(--foreground)]" href="/privacy">
              Privacy
            </Link>
            <button
              type="button"
              className="min-h-9 font-mono hover:text-[var(--accent)]"
              onClick={registerChecksumTap}
              aria-label="Checksum: 0x06"
            >
              checksum: 0x06
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
