# Money Movement & Ledger

Architecture study and executable browser model, not an employer system or a deployable backend.

## Included

- `model.ts`: deterministic, framework-independent transitions.
- `../../public/designs/money-movement.openapi.json`: scoped command contract (OpenAPI 3.0.3), not a complete service specification.
- `../../tests/models.test.mjs`: invariants and failure cases.
- `../../src/content/projects.json`: case-study narrative and architecture boundaries.

## Run

From the portfolio root, run `npm test`. The UI at `/projects/distributed-ledger-money-movement-simulator#model` uses the same model.

## Limits

One account pair and one transfer in browser memory. Signed postings illustrate conservation; this is not a full chart of accounts, database transaction or deployable financial ledger.

## Extraction

The model has no runtime dependencies or imports from the site. Copy this folder and its API sketch into a new repository, move the matching tests, and choose durable storage and an authenticated API before using it beyond a demonstration. The backend stack shown in the study describes a proposal, not code implemented in this folder.

## Next

- Implement durable command receipts and concurrent spend tests with PostgreSQL.
- Add partial settlement, hold expiry and explicit reversal constraints.
- Test outbox redelivery, projection rebuilding and single-currency accounting reconciliation.
