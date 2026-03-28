"use client";

import type { Route } from "next";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { useEasterEggs } from "@/components/layout/easter-egg-provider";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { siteContent } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { registerLogoTap } = useEasterEggs();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)]/60 bg-[color-mix(in_oklab,var(--background)_86%,transparent)] backdrop-blur-xl">
      <Container className="flex min-h-20 items-center justify-between gap-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 rounded-full px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          onClick={registerLogoTap}
        >
          <span className="inline-flex size-11 items-center justify-center rounded-full bg-[var(--foreground)] pl-[0.12em] text-[13px] font-semibold leading-none tracking-[0.14em] text-[var(--background)] transition group-hover:scale-[1.02]">
            BS
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-semibold text-[var(--foreground)]">
              {siteContent.profile.name}
            </span>
            <span className="block text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
              {siteContent.profile.role} / 0x06
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {siteContent.navigation.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href as Route}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
                  active
                    ? "bg-[var(--surface-strong)] text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            aria-label="LinkedIn"
            className="hidden size-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--surface-strong)] md:inline-flex"
            href={siteContent.profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className="size-4.5" />
          </a>
          <a
            aria-label="GitHub"
            className="hidden size-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--surface-strong)] md:inline-flex"
            href={siteContent.profile.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Github className="size-4.5" />
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition hover:border-[var(--accent)] hover:bg-[var(--surface-strong)] lg:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <ButtonLink className="hidden xl:inline-flex" href="/contact" variant="secondary">
            Start a conversation
          </ButtonLink>
        </div>
      </Container>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[var(--border)] lg:hidden"
          >
            <Container className="flex flex-col gap-6 py-5">
              <nav className="flex flex-col gap-1">
                {siteContent.navigation.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href as Route}
                      className={cn(
                        "rounded-2xl px-4 py-3 text-sm font-medium transition",
                        active
                          ? "bg-[var(--surface-strong)] text-[var(--foreground)]"
                          : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="flex flex-wrap gap-3">
                <ButtonLink external href={siteContent.profile.linkedinUrl} variant="secondary">
                  LinkedIn
                </ButtonLink>
                <ButtonLink external href={siteContent.profile.githubUrl} variant="secondary">
                  GitHub
                </ButtonLink>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}


