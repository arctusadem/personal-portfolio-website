import test from "node:test";
import assert from "node:assert/strict";
import {
  initialPayment,
  requestPayment,
  confirmPayment,
} from "../projects/payment-orchestration/model.ts";
import {
  initialLedger,
  moveMoney,
  balance,
} from "../projects/money-movement/model.ts";
import {
  initialDecision,
  reviseDecision,
} from "../projects/decision-hub/model.ts";

test("a provider timeout leaves payment unknown, not failed", () => {
  const original = initialPayment();
  const result = requestPayment(original, "key", 7500);
  assert.equal(result.state.status, "awaiting_confirmation");
  assert.equal(result.state.providerAttempts, 1);
  assert.equal(original.key, null);
});
test("request retries do not call the provider again", () => {
  let state = requestPayment(initialPayment(), "key", 7500).state;
  for (let i = 0; i < 20; i++) state = requestPayment(state, "key", 7500).state;
  assert.equal(state.providerAttempts, 1);
});
test("reused payment key with a changed amount is rejected", () => {
  const state = requestPayment(initialPayment(), "key", 7500).state;
  const result = requestPayment(state, "key", 9900);
  assert.equal(result.outcome, "rejected");
  assert.strictEqual(result.state, state);
});
test("a second intent cannot replace the single-payment model", () => {
  const state = requestPayment(initialPayment(), "key", 7500).state;
  assert.equal(requestPayment(state, "different", 7500).outcome, "rejected");
});
test("verified confirmation is idempotent and does not replay the attempt", () => {
  const pending = requestPayment(initialPayment(), "key", 7500).state;
  const confirmed = confirmPayment(pending, "evt").state;
  assert.equal(confirmed.status, "authorized");
  assert.equal(confirmPayment(confirmed, "evt").outcome, "duplicate");
  assert.equal(confirmed.eventIds.length, 1);
  assert.equal(
    requestPayment(confirmed, "key", 7500).state.status,
    "authorized",
  );
  assert.equal(confirmed.providerAttempts, 1);
});
test("unmatched and empty confirmations do not create payments", () => {
  assert.equal(confirmPayment(initialPayment(), "evt").outcome, "rejected");
  assert.equal(
    confirmPayment(requestPayment(initialPayment(), "key", 7500).state, "")
      .outcome,
    "rejected",
  );
});
for (const amount of [0, -1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
  test("invalid payment amount rejected: " + amount, () =>
    assert.equal(
      requestPayment(initialPayment(), "key", amount).outcome,
      "rejected",
    ),
  );
}
test("empty idempotency key is rejected", () =>
  assert.equal(requestPayment(initialPayment(), " ", 1).outcome, "rejected"));

function assertBalanced(state) {
  const transactions = new Map();
  for (const entry of state.entries) {
    assert.ok(Number.isSafeInteger(entry.amountMinor));
    transactions.set(
      entry.transaction,
      (transactions.get(entry.transaction) ?? 0) + entry.amountMinor,
    );
  }
  for (const amount of transactions.values()) assert.equal(amount, 0);
  for (const account of ["available", "held", "payee"])
    assert.ok(balance(state, account) >= 0);
}
test("hold, settle and reverse conserve money and preserve history", () => {
  let state = initialLedger();
  assertBalanced(state);
  state = moveMoney(state, "hold").state;
  assert.equal(balance(state, "available"), 75000);
  assert.equal(balance(state, "held"), 25000);
  state = moveMoney(state, "settle").state;
  const settlement = state.entries.slice();
  assert.equal(balance(state, "payee"), 25000);
  state = moveMoney(state, "reverse").state;
  assert.equal(balance(state, "available"), 100000);
  assert.equal(balance(state, "payee"), 0);
  assert.deepEqual(state.entries.slice(0, settlement.length), settlement);
  assertBalanced(state);
});
test("release returns held funds without settlement", () => {
  const state = moveMoney(
    moveMoney(initialLedger(), "hold").state,
    "release",
  ).state;
  assert.equal(balance(state, "held"), 0);
  assert.equal(balance(state, "available"), 100000);
  assert.equal(moveMoney(state, "settle").outcome, "rejected");
  assertBalanced(state);
});
test("repeated financial commands never append twice", () => {
  let state = initialLedger();
  for (const command of ["hold", "settle", "reverse"]) {
    state = moveMoney(state, command).state;
    assert.strictEqual(moveMoney(state, command).state, state);
  }
  assertBalanced(state);
});
test("settlement without a hold and early reversal are rejected", () => {
  assert.equal(moveMoney(initialLedger(), "settle").outcome, "rejected");
  assert.equal(moveMoney(initialLedger(), "reverse").outcome, "rejected");
});
test("hold key cannot be reused with a different amount", () => {
  const state = moveMoney(initialLedger(), "hold").state;
  assert.equal(moveMoney(state, "hold", 1).outcome, "rejected");
});
for (const amount of [0, -1, 0.5, NaN, Infinity, 100001]) {
  test("invalid or overdrawn hold rejected: " + amount, () => {
    const state = initialLedger();
    assert.strictEqual(moveMoney(state, "hold", amount).state, state);
  });
}
test("all command sequences up to depth five preserve journal invariants", () => {
  function walk(state, depth) {
    assertBalanced(state);
    if (depth === 0) return;
    for (const action of ["hold", "settle", "release", "reverse"])
      walk(moveMoney(state, action).state, depth - 1);
  }
  walk(initialLedger(), 5);
});
test("stale decision revisions are rejected without mutation", () => {
  const state = reviseDecision(initialDecision(), "submit", 1, "owner").state;
  const result = reviseDecision(state, "accept", 1, "reviewer");
  assert.equal(result.outcome, "rejected");
  assert.strictEqual(result.state, state);
});
test("owner cannot self-approve a decision", () => {
  const state = reviseDecision(initialDecision(), "submit", 1, "owner").state;
  assert.equal(reviseDecision(state, "accept", 2, "owner").outcome, "rejected");
});
test("decision history survives acceptance and supersession", () => {
  let state = reviseDecision(initialDecision(), "submit", 1, "owner").state;
  state = reviseDecision(state, "accept", 2, "reviewer").state;
  state = reviseDecision(state, "supersede", 3, "owner").state;
  assert.equal(state.status, "superseded");
  assert.equal(state.revision, 4);
  assert.equal(state.history.length, 4);
  assert.equal(reviseDecision(state, "submit", 4, "owner").outcome, "rejected");
});
test("reviewer cannot submit an owner's draft", () =>
  assert.equal(
    reviseDecision(initialDecision(), "submit", 1, "reviewer").outcome,
    "rejected",
  ));
