export type PaymentState = {
  status: "ready" | "awaiting_confirmation" | "authorized";
  key: string | null;
  amountMinor: number;
  providerAttempts: number;
  eventIds: string[];
};
export type PaymentResult = {
  state: PaymentState;
  outcome: "applied" | "duplicate" | "rejected";
  message: string;
};
export const initialPayment = (): PaymentState => ({
  status: "ready",
  key: null,
  amountMinor: 0,
  providerAttempts: 0,
  eventIds: [],
});

// A single merchant, CAD payment and provider. No network calls or durable storage.
export function requestPayment(
  state: PaymentState,
  key: string,
  amountMinor: number,
): PaymentResult {
  if (!key.trim() || !Number.isSafeInteger(amountMinor) || amountMinor <= 0) {
    return {
      state,
      outcome: "rejected",
      message: "Invalid key or amount. No provider attempt.",
    };
  }
  if (state.key) {
    if (state.key !== key || state.amountMinor !== amountMinor) {
      return {
        state,
        outcome: "rejected",
        message:
          "409: this model owns one payment; the existing intent cannot be replaced.",
      };
    }
    return {
      state,
      outcome: "duplicate",
      message: "Existing payment returned. The provider is not called again.",
    };
  }
  return {
    state: {
      ...state,
      key,
      amountMinor,
      status: "awaiting_confirmation",
      providerAttempts: 1,
    },
    outcome: "applied",
    message:
      "The provider timed out. Outcome is unknown, not failed. Await confirmation; do not route a second charge.",
  };
}
export function confirmPayment(
  state: PaymentState,
  eventId: string,
): PaymentResult {
  if (!state.key || !eventId.trim())
    return {
      state,
      outcome: "rejected",
      message:
        "No matching payment or event ID. Investigate instead of creating a payment.",
    };
  if (state.eventIds.includes(eventId))
    return {
      state,
      outcome: "duplicate",
      message: "Duplicate webhook acknowledged. No state change.",
    };
  return {
    state: {
      ...state,
      status: "authorized",
      eventIds: [...state.eventIds, eventId],
    },
    outcome: state.status === "authorized" ? "duplicate" : "applied",
    message:
      state.status === "authorized"
        ? "Confirmation recorded. Authorization was already applied."
        : "Verified provider confirmation received. Payment is now authorized.",
  };
}
