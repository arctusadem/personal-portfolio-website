import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Metric } from "@/types/content";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
  withIcon?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className,
  withIcon = true,
}: ButtonLinkProps) {
  const baseClassName =
    "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

  const variantClassName = {
    primary:
      "bg-[var(--foreground)] text-[var(--background)] shadow-[0_12px_30px_-18px_var(--shadow-color)] hover:-translate-y-0.5 hover:bg-[var(--foreground-strong)]",
    secondary:
      "border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent)] hover:bg-[var(--surface-strong)]",
    ghost:
      "text-[var(--foreground)] hover:bg-[var(--surface)]",
  };

  const icon = external ? <ArrowUpRight className="size-4" /> : <ArrowRight className="size-4" />;

  if (external) {
    return (
      <a
        className={cn(baseClassName, variantClassName[variant], className)}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {children}
        {withIcon ? icon : null}
      </a>
    );
  }

  return (
    <Link className={cn(baseClassName, variantClassName[variant], className)} href={href as Route}>
      {children}
      {withIcon ? icon : null}
    </Link>
  );
}

type TagProps = {
  children: ReactNode;
  className?: string;
};

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

type SurfaceProps = {
  children: ReactNode;
  className?: string;
};

export function Surface({ children, className }: SurfaceProps) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/95 shadow-[0_25px_60px_-40px_var(--shadow-color)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={cn("flex max-w-3xl flex-col gap-4", alignment)}>
      <Tag>{eyebrow}</Tag>
      <div className="space-y-3">
        <h2 className="max-w-3xl text-pretty font-serif text-3xl tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  aside?: ReactNode;
};

export function PageIntro({ eyebrow, title, description, aside }: PageIntroProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
      <div className="space-y-4">
        <Tag>{eyebrow}</Tag>
        <div className="space-y-4">
          <h1 className="max-w-4xl text-pretty font-serif text-4xl tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg">
            {description}
          </p>
        </div>
      </div>
      {aside ? <div className="lg:justify-self-end">{aside}</div> : null}
    </div>
  );
}

type StatGridProps = {
  items: Metric[];
  className?: string;
};

export function StatGrid({ items, className }: StatGridProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 xl:grid-cols-4", className)}>
      {items.map((item) => (
        <Surface className="p-5" key={item.label}>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              {item.label}
            </p>
            <p className="text-xl font-semibold text-[var(--foreground)]">{item.value}</p>
          </div>
        </Surface>
      ))}
    </div>
  );
}

type StructuredDataProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}


