"use client";
import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto max-w-2xl px-6 py-20">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="page-heading mt-4">Let&apos;s try that again.</h1>
      <p className="mt-5 leading-7 text-[var(--muted)]">
        This page couldn&apos;t load. You can retry or return to the homepage.
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-5">
        <button
          className="rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)]"
          onClick={reset}
        >
          Try again
        </button>
        <Link className="text-link min-h-11 text-sm" href="/">
          Go home
        </Link>
      </div>
    </section>
  );
}
