export type Account = "funding" | "available" | "held" | "payee";
export type Entry = {
  transaction: string;
  account: Account;
  amountMinor: number;
};
export type LedgerState = {
  status: "ready" | "held" | "settled" | "released" | "reversed";
  amountMinor: number;
  entries: Entry[];
};
export type LedgerCommand = "hold" | "settle" | "release" | "reverse";
export type LedgerResult = {
  state: LedgerState;
  outcome: "applied" | "duplicate" | "rejected";
  message: string;
};
export const initialLedger = (): LedgerState => ({
  status: "ready",
  amountMinor: 0,
  entries: [
    { transaction: "funding-001", account: "funding", amountMinor: -100000 },
    { transaction: "funding-001", account: "available", amountMinor: 100000 },
  ],
});
export const balance = (state: LedgerState, account: Account) =>
  state.entries
    .filter((entry) => entry.account === account)
    .reduce((sum, entry) => sum + entry.amountMinor, 0);

// Signed postings for one CAD transfer. The funding counter-account is included.
export function moveMoney(
  state: LedgerState,
  command: LedgerCommand,
  amountMinor = 25000,
): LedgerResult {
  const transaction = "transfer-001:" + command;
  if (state.entries.some((entry) => entry.transaction === transaction)) {
    if (command === "hold" && amountMinor !== state.amountMinor)
      return {
        state,
        outcome: "rejected",
        message: "409: the hold ID was reused with a different amount.",
      };
    return {
      state,
      outcome: "duplicate",
      message: "This command was already applied. No additional postings.",
    };
  }
  const valid =
    (command === "hold" && state.status === "ready") ||
    ((command === "settle" || command === "release") &&
      state.status === "held") ||
    (command === "reverse" && state.status === "settled");
  if (!valid)
    return {
      state,
      outcome: "rejected",
      message: "409: transition not allowed from " + state.status + ".",
    };
  const amount = command === "hold" ? amountMinor : state.amountMinor;
  if (
    !Number.isSafeInteger(amount) ||
    amount <= 0 ||
    (command === "hold" && amount > balance(state, "available"))
  ) {
    return {
      state,
      outcome: "rejected",
      message:
        "Amount is invalid or exceeds available funds. Journal unchanged.",
    };
  }
  const from: Account =
    command === "hold" ? "available" : command === "reverse" ? "payee" : "held";
  const to: Account =
    command === "hold" ? "held" : command === "settle" ? "payee" : "available";
  const status = {
    hold: "held",
    settle: "settled",
    release: "released",
    reverse: "reversed",
  } as const;
  return {
    state: {
      status: status[command],
      amountMinor: amount,
      entries: [
        ...state.entries,
        { transaction, account: from, amountMinor: -amount },
        { transaction, account: to, amountMinor: amount },
      ],
    },
    outcome: "applied",
    message:
      command === "reverse"
        ? "Compensating entries appended. Original settlement remains in the journal."
        : "Balanced entries appended for " + command + ".",
  };
}
