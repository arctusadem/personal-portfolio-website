# Payment Orchestration Platform

Independent architecture study with a TypeScript browser model and a runnable [Java / Spring Boot / PostgreSQL slice](java/README.md). Fictional payments; no employer code or production system.

## Included

- `model.ts`: deterministic, framework-independent transitions.
- `java/`: local Docker service, Flyway schema and PostgreSQL integration tests for idempotency, concurrency and confirmation handling.
- `../../public/designs/payment-orchestration.openapi.json`: scoped command contract (OpenAPI 3.0.3), not a complete service specification.
- `../../tests/models.test.mjs`: invariants and failure cases.
- `../../src/content/projects.json`: case-study narrative and architecture boundaries.

## Run

From the portfolio root, run `npm test`. The UI at `/projects/payment-orchestration-platform#model` uses the same model.

## Limits

The browser model handles a single payment in memory and assumes a verified webhook. It has no persistence or concurrency. The Java slice separately implements durable storage and concurrency with a provider stub; its README lists its exact boundaries and runnable commands.

## Extraction

The TypeScript model has no runtime dependencies or imports from the site. The Java directory is independently buildable with Maven or Docker; it does not depend on Next.js. The wider SQS and provider-integration architecture remains a proposal beyond that local slice.

## Next

- Add authenticated merchant boundaries, real provider contracts and signature verification before any external integration.
- Expand crash-recovery testing beyond the implemented acceptance/acknowledgement boundary.
- Define retention, reconciliation SLAs and per-provider retry policies before a real integration.
