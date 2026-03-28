"use client";

import { Printer } from "lucide-react";

export function ResumePrintButton() {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--surface-strong)]"
      onClick={() => window.print()}
    >
      Print / Save PDF <Printer className="size-4" />
    </button>
  );
}
