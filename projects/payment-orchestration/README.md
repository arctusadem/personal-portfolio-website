# Payment Orchestration Platform

Architecture study and executable browser model, not an employer system or a deployable backend.

## Included

- `model.ts`: deterministic, framework-independent transitions.
- `../../public/designs/payment-orchestration.openapi.json`: scoped command contract (OpenAPI 3.0.3), not a complete service specification.
- `../../tests/models.test.mjs`: invariants and failure cases.
- `../../src/content/projects.json`: case-study narrative and architecture boundaries.

## Run

From the portfolio root, run `npm test`. The UI at `/projects/payment-orchestration-platform#model` uses the same model.

## Limits

Single payment, in-memory TypeScript model. The webhook is assumed verified. No provider calls, persistence, concurrency or signature verification.

## Extraction

The model has no runtime dependencies or imports from the site. Copy this folder and its API sketch into a new repository, move the matching tests, and choose durable storage and an authenticated API before using it beyond a demonstration. The backend stack shown in the study describes a proposal, not code implemented in this folder.

## Next

- Implement PostgreSQL constraints and concurrency tests against a provider stub.
- Test crash recovery around the outbox relay and webhook inbox.
- Define retention, reconciliation SLAs and per-provider retry policies before a real integration.
