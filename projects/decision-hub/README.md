# Architecture Decision Hub

Architecture study and executable browser model, not an employer system or a deployable backend.

## Included

- `model.ts`: deterministic, framework-independent transitions.
- `../../public/designs/decision-hub.openapi.json`: scoped command contract (OpenAPI 3.0.3), not a complete service specification.
- `../../tests/models.test.mjs`: invariants and failure cases.
- `../../src/content/projects.json`: case-study narrative and architecture boundaries.

## Run

From the portfolio root, run `npm test`. The UI at `/projects/architecture-decision-intelligence-hub#model` uses the same model.

## Limits

A deterministic workflow model with simulated roles. No identity provider, persistence, collaborative editing or server-side authorization is implemented here.

## Extraction

The model has no runtime dependencies or imports from the site. Copy this folder and its API sketch into a new repository, move the matching tests, and choose durable storage and an authenticated API before using it beyond a demonstration. The backend stack shown in the study describes a proposal, not code implemented in this folder.

## Next

- Implement server-derived roles and atomic version checks in PostgreSQL.
- Add Markdown rendering tests and access-control tests for linked records.
- Pilot the record format with a small team before adding search or notification infrastructure.
