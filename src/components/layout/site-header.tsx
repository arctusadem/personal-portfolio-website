"use client";

import type { Route } from "next";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useEasterEggs } from "@/components/layout/easter-egg-provider";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { siteContent } from "@/lib/profile";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const menuButton = useRef<HTMLButtonElement>(null);
  const { registerLogoTap } = useEasterEggs();

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPath(null);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", dismiss);
    return () => window.removeEventListener("keydown", dismiss);
  }, [open]);

  const links = [
    ...siteContent.navigation,
    { label: "Contact", href: "/contact" },
  ];
  return (
    <header className="site-header sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--header)] backdrop-blur-lg">
      <Container className="flex h-[76px] items-center justify-between gap-4">
        <Link
          href="/"
          onClick={() => {
            registerLogoTap();
            setOpenPath(null);
          }}
          aria-label="Bruno Salgado, home"
          className="flex shrink-0 items-center gap-3 rounded-md"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[var(--border-strong)] font-semibold leading-none tracking-normal">
            BS
          </span>
          <span className="text-sm font-semibold tracking-tight">
            {siteContent.profile.name}
          </span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {siteContent.navigation.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href as Route}
                aria-current={active ? "page" : undefined}
                className={cn("nav-link", active && "nav-link-active")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <div className="hidden sm:block">
            <ButtonLink href="/contact" variant="primary" withIcon={false}>
              Get in touch
            </ButtonLink>
          </div>
          <button
            ref={menuButton}
            type="button"
            className="icon-button lg:hidden"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            {open ? (
              <X aria-hidden className="size-5" />
            ) : (
              <Menu aria-hidden className="size-5" />
            )}
          </button>
        </div>
      </Container>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!open}
        className="border-t border-[var(--border)] bg-[var(--background)] lg:hidden"
      >
        <Container className="grid grid-cols-2 gap-2 py-5">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href as Route}
              aria-current={pathname === item.href ? "page" : undefined}
              className="nav-link py-3"
              onClick={() => setOpenPath(null)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/resume"
            className="nav-link py-3"
            onClick={() => setOpenPath(null)}
          >
            Resume
          </Link>
        </Container>
      </nav>
    </header>
  );
}
