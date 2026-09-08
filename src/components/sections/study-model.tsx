"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { RotateCcw } from "lucide-react";
import {
  initialPayment,
  requestPayment,
  confirmPayment,
} from "../../../projects/payment-orchestration/model";
import {
  initialLedger,
  moveMoney,
  balance,
} from "../../../projects/money-movement/model";
import {
  initialDecision,
  reviseDecision,
} from "../../../projects/decision-hub/model";

const money = (value: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(
    value / 100,
  );

function Action({
  children,
  onClick,
  disabled = false,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="min-h-11 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold transition hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
    >
      {children}
    </button>
  );
}
function Frame({
  children,
  message,
  onReset,
}: {
  children: ReactNode;
  message: string;
  onReset: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[var(--border-strong)] bg-[var(--surface)]">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] px-5 py-3 sm:px-7">
        <span className="eyebrow">Interactive model</span>
        <button
          className="text-link min-h-11 text-sm"
          type="button"
          onClick={onReset}
        >
          <RotateCcw aria-hidden className="size-3.5" /> Reset
        </button>
      </div>
      <div className="space-y-6 p-5 sm:p-7">{children}</div>
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="min-h-24 border-t border-[var(--border)] bg-[var(--accent-soft)] px-5 py-5 text-sm leading-6 sm:px-7"
      >
        {message}
      </p>
    </div>
  );
}
function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <dt className="text-xs text-[var(--muted)]">{label}</dt>
      <dd className="mt-2 break-words font-mono text-lg font-semibold">
        {value}
      </dd>
    </div>
  );
}
function PaymentModel() {
  const [state, setState] = useState(initialPayment);
  const [message, setMessage] = useState(
    "Ready. Submit the payment to simulate a provider timeout.",
  );
  const apply = (result: ReturnType<typeof requestPayment>) => {
    setState(result.state);
    setMessage(result.message);
  };
  return (
    <Frame
      message={message}
      onReset={() => {
        setState(initialPayment());
        setMessage("Reset. No payment submitted.");
      }}
    >
      <dl className="grid grid-cols-2 gap-5 sm:grid-cols-3">
        <Stat label="Payment state" value={state.status.replaceAll("_", " ")} />
        <Stat label="Provider attempts" value={state.providerAttempts} />
        <Stat
          label="Confirmed amount"
          value={
            state.status === "authorized"
              ? money(state.amountMinor)
              : "Not confirmed"
          }
        />
      </dl>
      <div className="flex flex-wrap gap-2">
        <Action
          onClick={() => apply(requestPayment(state, "checkout-001", 7500))}
        >
          {state.key ? "Retry same request" : "Submit payment"}
        </Action>
        <Action onClick={() => apply(confirmPayment(state, "evt-001"))}>
          Deliver confirmation
        </Action>
        <Action
          disabled={!state.key}
          onClick={() => apply(requestPayment(state, "checkout-001", 9900))}
        >
          Reuse key, change amount
        </Action>
      </div>
      <p className="font-mono text-xs leading-6 text-[var(--muted)]">
        key: checkout-001 / event: evt-001 / currency: CAD
      </p>
    </Frame>
  );
}
function LedgerModel() {
  const [state, setState] = useState(initialLedger);
  const [message, setMessage] = useState(
    "Fictional opening balance: CAD 1,000.00. Place a hold to start.",
  );
  const apply = (result: ReturnType<typeof moveMoney>) => {
    setState(result.state);
    setMessage(result.message);
  };
  return (
    <Frame
      message={message}
      onReset={() => {
        setState(initialLedger());
        setMessage("Reset to the fictional opening balance.");
      }}
    >
      <dl className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        {(["available", "held", "payee"] as const).map((account) => (
          <Stat
            key={account}
            label={
              account === "payee"
                ? "Payee"
                : account === "held"
                  ? "Held"
                  : "Available"
            }
            value={money(balance(state, account))}
          />
        ))}
        <Stat label="Transfer state" value={state.status} />
      </dl>
      <div className="flex flex-wrap gap-2">
        {(["hold", "settle", "release", "reverse"] as const).map((command) => (
          <Action
            key={command}
            onClick={() => apply(moveMoney(state, command))}
          >
            {command === "hold"
              ? "Hold CAD 250"
              : command[0].toUpperCase() + command.slice(1)}
          </Action>
        ))}
      </div>
      <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full text-left text-xs">
          <caption className="border-b border-[var(--border)] p-3 text-left font-semibold">
            Append-only journal · illustrative CAD amounts
          </caption>
          <thead className="bg-[var(--background)] text-[var(--muted)]">
            <tr>
              {["Transaction", "Account", "Posting"].map((x) => (
                <th scope="col" className="px-3 py-2 font-medium" key={x}>
                  {x}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-mono">
            {state.entries.map((entry, index) => (
              <tr className="border-t border-[var(--border)]" key={index}>
                <td className="whitespace-nowrap px-3 py-2">
                  {entry.transaction}
                </td>
                <td className="px-3 py-2">{entry.account}</td>
                <td className="whitespace-nowrap px-3 py-2">
                  {money(entry.amountMinor)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-[var(--muted)]">
        Sum of all signed postings:{" "}
        {money(
          state.entries.reduce((sum, entry) => sum + entry.amountMinor, 0),
        )}
        . The funding counter-account is included.
      </p>
    </Frame>
  );
}
function DecisionModel() {
  const [state, setState] = useState(initialDecision);
  const [message, setMessage] = useState(
    "ADR-006: use an outbox for domain events. Draft owned by the author.",
  );
  const apply = (result: ReturnType<typeof reviseDecision>) => {
    setState(result.state);
    setMessage(result.message);
  };
  return (
    <Frame
      message={message}
      onReset={() => {
        setState(initialDecision());
        setMessage("Reset. Draft at revision 1.");
      }}
    >
      <dl className="grid grid-cols-2 gap-5">
        <Stat
          label="Decision state"
          value={state.status.replaceAll("_", " ")}
        />
        <Stat label="Revision" value={state.revision} />
      </dl>
      <div className="flex flex-wrap gap-2">
        <Action
          onClick={() =>
            apply(reviseDecision(state, "submit", state.revision, "owner"))
          }
        >
          Submit for review
        </Action>
        <Action
          onClick={() => apply(reviseDecision(state, "accept", 1, "reviewer"))}
        >
          Approve stale v1
        </Action>
        <Action
          onClick={() =>
            apply(reviseDecision(state, "accept", state.revision, "reviewer"))
          }
        >
          Approve current revision
        </Action>
        <Action
          onClick={() =>
            apply(reviseDecision(state, "supersede", state.revision, "owner"))
          }
        >
          Supersede
        </Action>
      </div>
      <ol
        aria-label="Decision history"
        className="space-y-2 border-l-2 border-[var(--accent)] pl-4 font-mono text-xs leading-6 text-[var(--muted)]"
      >
        {state.history.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </Frame>
  );
}
export function StudyModel({
  kind,
}: {
  kind: "payment-orchestration" | "money-movement" | "decision-hub";
}) {
  if (kind === "payment-orchestration") return <PaymentModel />;
  if (kind === "money-movement") return <LedgerModel />;
  return <DecisionModel />;
}
