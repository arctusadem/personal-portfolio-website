"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { profile } from "@/lib/profile";

export function CopyEmail() {
  const [feedback, setFeedback] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setFeedback("Email address copied.");
    } catch {
      setFeedback(
        "Copy unavailable. Select the address above or use the email link.",
      );
    }
  }
  return (
    <div>
      <button
        type="button"
        onClick={copy}
        className="text-link min-h-11 text-sm"
      >
        {feedback === "Email address copied." ? (
          <Check aria-hidden className="size-4" />
        ) : (
          <Copy aria-hidden className="size-4" />
        )}{" "}
        Copy email address
      </button>
      <p role="status" className="text-xs leading-6 text-[var(--muted)]">
        {feedback}
      </p>
    </div>
  );
}
export function ContactForm() {
  const [feedback, setFeedback] = useState("");
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email || !message) {
      setFeedback("Please add your name, email and a short message.");
      return;
    }
    const subject = encodeURIComponent("Portfolio enquiry from " + name);
    const body = encodeURIComponent(message + "\n\n" + name + "\n" + email);
    window.location.href =
      "mailto:" + profile.email + "?subject=" + subject + "&body=" + body;
    setFeedback(
      "Email draft requested. Send it from your email app; nothing has been sent by this website.",
    );
  }
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
      <h2 className="font-serif text-2xl">Prefer to start with a draft?</h2>
      <p id="draft-help" className="mt-3 text-sm leading-7 text-[var(--muted)]">
        This opens your email app with a prepared message. Nothing is submitted
        to a website server.
      </p>
      <form
        className="mt-6 space-y-5"
        onSubmit={handleSubmit}
        aria-describedby="draft-help"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Name
            <input
              className="field-input mt-2"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
            />
          </label>
          <label className="block text-sm font-medium">
            Email
            <input
              className="field-input mt-2"
              type="email"
              name="email"
              autoComplete="email"
              required
              maxLength={254}
            />
          </label>
        </div>
        <label className="block text-sm font-medium">
          Message
          <textarea
            className="field-input mt-2 min-h-36 resize-y"
            name="message"
            required
            maxLength={2000}
            placeholder="A little about the team, role or technical problem."
          />
        </label>
        <button
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] transition hover:bg-[var(--foreground-strong)]"
          type="submit"
        >
          Open email draft <ArrowUpRight aria-hidden className="size-4" />
        </button>
        <noscript>
          <p className="text-sm">
            Please use the direct email link. The draft helper needs JavaScript.
          </p>
        </noscript>
        <p
          className="min-h-6 text-xs leading-6 text-[var(--muted)]"
          role="status"
        >
          {feedback}
        </p>
      </form>
    </div>
  );
}
