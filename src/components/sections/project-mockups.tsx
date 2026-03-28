import { CheckCircle2 } from "lucide-react";

import type { Project } from "@/types/content";
import { Tag } from "@/components/ui/primitives";

const mockBarClassName = "rounded-full bg-[var(--surface-strong)]";

type ProjectMockupProps = {
  slug: Project["slug"];
  compact?: boolean;
};

function MockNote() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Tag>Illustrative demo data</Tag>
      <span className="text-xs text-[var(--muted)]">Reference UI for the case study, not employer production telemetry.</span>
    </div>
  );
}

function PaymentMockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className="space-y-4">
      <MockNote />
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Sample auth p95", "182 ms"],
          ["Sample queue depth", "12"],
          ["Sample mismatches", "2"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">{label}</p>
            <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">{value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-[var(--foreground)]">Illustrative transaction timeline</p>
            <Tag>reconciliation-ready</Tag>
          </div>
          <div className="space-y-3">
            {[
              ["Intent received", "Idempotency key validated"],
              ["Connector selected", "Provider B routed after fallback rule"],
              ["Webhook matched", "Authorization confirmed and persisted"],
              ["Settlement batch", "Awaiting daily reconciliation"],
            ].map(([title, body]) => (
              <div key={title} className="grid grid-cols-[auto_1fr] gap-3">
                <div className="mt-2 size-2 rounded-full bg-[var(--accent)]" />
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">{title}</p>
                  <p className="text-sm text-[var(--muted)]">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-sm font-semibold text-[var(--foreground)]">Illustrative connector health</p>
          <div className="mt-4 space-y-4 text-sm">
            {[
              ["Provider A", "Healthy", "98.6%"],
              ["Provider B", "Degraded", "91.8%"],
              ["Provider C", "Healthy", "99.1%"],
            ].map(([provider, status, success]) => (
              <div key={provider} className="space-y-2 rounded-2xl border border-[var(--border)] bg-[var(--background)]/70 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[var(--foreground)]">{provider}</span>
                  <span className="text-[var(--muted)]">{status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--surface-strong)]">
                    <div className={`${mockBarClassName} h-full bg-[var(--accent)]`} style={{ width: success }} />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">{success}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {!compact ? (
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            "Dead-letter visibility for provider callbacks",
            "Searchable audit trail for support teams",
            "Daily settlement mismatch review queue",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]">
              {item}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function LedgerMockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className="space-y-4">
      <MockNote />
      <div className="grid gap-4 lg:grid-cols-[1fr_0.95fr]">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[var(--foreground)]">Illustrative wallet position</p>
            <Tag>double-entry</Tag>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              ["Sample available", "$ 124,880.43"],
              ["Sample pending", "$ 18,430.12"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-[var(--border)] bg-[var(--background)]/70 p-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">{label}</p>
                <p className="mt-3 text-2xl font-semibold text-[var(--foreground)]">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-3">
            {[
              ["Hold", "Card authorization reserved funds"],
              ["Settlement", "Posting confirmed to clearing account"],
              ["Projection", "Balance view caught up after replay"],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-[var(--border)] p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-4.5 text-[var(--accent)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">{title}</p>
                    <p className="text-sm text-[var(--muted)]">{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-sm font-semibold text-[var(--foreground)]">Illustrative event lineage</p>
          <div className="mt-4 space-y-3">
            {[
              ["movement.created", "sample-transfer-91eea2"],
              ["ledger.posted", "sample-journal-2041"],
              ["projection.updated", "sample-wallet-e4a8"],
              ["settlement.completed", "sample-batch-2026-03-21"],
            ].map(([topic, id]) => (
              <div key={topic} className="rounded-2xl border border-[var(--border)] bg-[var(--background)]/70 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-xs text-[var(--foreground)]">{topic}</p>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">{id}</span>
                </div>
              </div>
            ))}
          </div>
          {!compact ? (
            <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--background)]/70 p-4 text-sm text-[var(--muted)]">
              Projection lag, outbox backlog, and replay tooling are treated as operator-facing product surfaces, not hidden implementation details.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ArchitectureMockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className="space-y-4">
      <MockNote />
      <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[var(--foreground)]">Illustrative decision feed</p>
            <Tag>ADR plus RFC</Tag>
          </div>
          <div className="mt-4 space-y-3">
            {[
              ["ADR-041", "Adopt event sourcing only for settlement stream"],
              ["RFC-018", "Rate limiting policy for partner APIs"],
              ["Risk-007", "Single-team ownership on payment gateway"],
            ].map(([key, title]) => (
              <div key={key} className="rounded-2xl border border-[var(--border)] bg-[var(--background)]/70 p-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">{key}</p>
                <p className="mt-2 text-sm font-medium text-[var(--foreground)]">{title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-sm font-semibold text-[var(--foreground)]">Illustrative system boundaries map</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              ["Payments Core", "Platform team"],
              ["Risk Engine", "Fraud squad"],
              ["Ledger", "Finance systems"],
              ["Observability", "Developer platform"],
            ].map(([system, owner]) => (
              <div key={system} className="rounded-2xl border border-[var(--border)] p-4">
                <p className="text-sm font-medium text-[var(--foreground)]">{system}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">Owned by {owner}</p>
              </div>
            ))}
          </div>
          {!compact ? (
            <div className="mt-5 rounded-2xl border border-dashed border-[var(--accent)]/40 bg-[var(--accent-soft)]/35 p-4 text-sm text-[var(--muted)]">
              The product links architecture decisions, risks, and incident learnings back to the systems they affect so context remains operationally useful.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ProjectMockup({ slug, compact = false }: ProjectMockupProps) {
  if (slug === "payment-orchestration-platform") {
    return <PaymentMockup compact={compact} />;
  }

  if (slug === "distributed-ledger-money-movement-simulator") {
    return <LedgerMockup compact={compact} />;
  }

  return <ArchitectureMockup compact={compact} />;
}
