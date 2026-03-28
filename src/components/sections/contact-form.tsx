"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, Copy, Mail } from "lucide-react";

import { siteContent } from "@/lib/content";

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [feedback, setFeedback] = useState<string | null>(null);

  const emailHref = useMemo(() => {
    const subject = encodeURIComponent(
      form.company ? `Portfolio inquiry from ${form.company}` : "Portfolio inquiry",
    );

    const body = encodeURIComponent(
      [
        `Name: ${form.name || ""}`,
        `Email: ${form.email || ""}`,
        form.company ? `Company: ${form.company}` : null,
        "",
        form.message,
      ]
        .filter(Boolean)
        .join("\n"),
    );

    return `mailto:${siteContent.profile.email}?subject=${subject}&body=${body}`;
  }, [form.company, form.email, form.message, form.name]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFeedback("Please add your name, email, and a short message.");
      return;
    }

    setFeedback("Opening your email client with a pre-filled message.");
    window.location.href = emailHref;
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(siteContent.profile.email);
      setFeedback("Email address copied to clipboard.");
    } catch {
      setFeedback("Copy failed. You can still use the direct email link below.");
    }
  }

  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_25px_60px_-40px_var(--shadow-color)] md:p-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Direct email draft</p>
        <p className="text-sm leading-7 text-[var(--muted)]">
          A short message about the role, team, or technical challenge is enough. The form opens a pre-filled email draft rather than sending through a third-party service.
        </p>
      </div>
      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-[var(--foreground)]">
            Name
            <input
              className="field-input"
              type="text"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="Your name"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-[var(--foreground)]">
            Email
            <input
              className="field-input"
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              placeholder="you@company.com"
            />
          </label>
        </div>
        <label className="space-y-2 text-sm font-medium text-[var(--foreground)]">
          Company or team
          <input
            className="field-input"
            type="text"
            name="company"
            value={form.company}
            onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
            placeholder="Optional"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-[var(--foreground)]">
          Message
          <textarea
            className="field-input min-h-36 resize-y"
            name="message"
            value={form.message}
            onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
            placeholder="A short note about the role, team, or problem space"
          />
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] transition hover:-translate-y-0.5 hover:bg-[var(--foreground-strong)]" type="submit">
              Open email draft <ArrowRight className="size-4" />
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)] hover:bg-[var(--surface-strong)]"
              type="button"
              onClick={copyEmail}
            >
              Copy email <Copy className="size-4" />
            </button>
          </div>
          <a className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]" href={`mailto:${siteContent.profile.email}`}>
            <Mail className="size-4" /> {siteContent.profile.email}
          </a>
        </div>
      </form>
      <p className="mt-4 min-h-6 text-sm text-[var(--muted)]">{feedback}</p>
    </div>
  );
}

