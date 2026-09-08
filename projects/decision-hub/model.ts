export type DecisionState = {
  status: "draft" | "in_review" | "accepted" | "superseded";
  revision: number;
  history: string[];
};
export type DecisionCommand = "submit" | "accept" | "supersede";
export type DecisionResult = {
  state: DecisionState;
  outcome: "applied" | "rejected";
  message: string;
};
export const initialDecision = (): DecisionState => ({
  status: "draft",
  revision: 1,
  history: ["v1: Draft created by owner."],
});

// Roles demonstrate a boundary, not authentication. A real API derives these from identity.
export function reviseDecision(
  state: DecisionState,
  command: DecisionCommand,
  expectedRevision: number,
  actor: "owner" | "reviewer",
): DecisionResult {
  if (expectedRevision !== state.revision)
    return {
      state,
      outcome: "rejected",
      message: "409: stale revision. Reload the decision before reviewing it.",
    };
  const permitted =
    (command === "submit" && actor === "owner" && state.status === "draft") ||
    (command === "accept" &&
      actor === "reviewer" &&
      state.status === "in_review") ||
    (command === "supersede" &&
      actor === "owner" &&
      state.status === "accepted");
  if (!permitted)
    return {
      state,
      outcome: "rejected",
      message: "Transition rejected: check role and current decision state.",
    };
  const revision = state.revision + 1;
  const status = {
    submit: "in_review",
    accept: "accepted",
    supersede: "superseded",
  } as const;
  return {
    state: {
      status: status[command],
      revision,
      history: [
        ...state.history,
        "v" + revision + ": " + command + " by " + actor + ".",
      ],
    },
    outcome: "applied",
    message:
      "Revision " +
      revision +
      " recorded. Previous decisions remain traceable.",
  };
}
