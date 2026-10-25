# Independent payment-orchestration slice

Java 21, Spring Boot and real PostgreSQL. Built independently for this portfolio using fictional payments; no employer source, real provider calls, credentials or money movement. This is a runnable service, separate from the TypeScript browser model in the parent directory.

## Run locally

Docker Desktop / Docker Engine with Compose is sufficient; no Java installation is needed for this path:

```sh
cd projects/payment-orchestration/java
docker compose up --build -d
docker compose logs -f app
```

The app listens at `http://localhost:8080`. Published ports bind to loopback. Local demo database credentials are in Compose and application.yml. Do not expose this unauthenticated teaching service on a network. `X-Demo-Merchant` is a namespace, **not authentication**.

```sh
curl -i http://localhost:8080/v1/payments \
  -H 'Content-Type: application/json' \
  -H 'X-Demo-Merchant: merchant_demo' \
  -H 'Idempotency-Key: checkout_1' \
  -d '{"amountMinor":7500,"currency":"CAD","providerToken":"tok_demo"}'
curl -X POST http://localhost:8080/demo/dispatch
```

Copy the returned payment UUID into `<id>`. The deterministic stub accepts an attempt but loses its response, so dispatch leaves the payment `awaiting_confirmation`. Repeating the create request returns the same payment; changing its amount with the same key returns 409. Only CAD, bounded positive minor units and `tok_demo` are accepted. No real payment data belongs here.

```sh
curl http://localhost:8080/v1/payments/<id> -H 'X-Demo-Merchant: merchant_demo'
curl -X POST http://localhost:8080/demo/confirm/<id> \
  -H 'X-Demo-Merchant: merchant_demo' -H 'X-Demo-Event: event_1'
```

Deliver the same event again: state remains `succeeded`. Confirmation is a manual **assumed-verified** demo input, not a production webhook. Stop with `docker compose down`; `docker compose down -v` also discards this demo's database volume.

## Test

With Java 21, Maven 3.9+ and Docker running:

```sh
mvn -B verify
```

Testcontainers starts isolated PostgreSQL 17 and fails if Docker is unavailable; tests are never silently skipped. A disposable native PostgreSQL instance can also be used via `TEST_DATABASE_URL`, `TEST_DATABASE_USER`, `TEST_DATABASE_PASSWORD`. **Tests truncate all demo tables**, so only point them at a new test database. No H2 substitute is used. CI runs this suite on Docker.

The tests cover repeated and conflicting request keys, independent merchant namespaces, 12 concurrent identical requests, 12 conflicting payloads, concurrent outbox claims, duplicate confirmations, confirmation ordering, event reuse across payments, HTTP validation and a simulated process loss after provider acceptance.

## What is implemented

- A unique `(merchant, request_key)` constraint serializes competing creates. The bounded canonical request fields are stored and compared for replay; changed payloads conflict.
- Intent, stable attempt identity and outbox commit together. The worker claims one row with `FOR UPDATE SKIP LOCKED` and a five-second lease, then leaves the claim transaction before calling the stub.
- The stub durably deduplicates by attempt ID. A crash after acceptance can replay that ID without adding a receipt. An expired lease permits recovery; this is at-least-once delivery, not an exactly-once network guarantee.
- Confirmation locks the payment; inbox event identity and terminal state commit together. A late worker cannot overwrite `succeeded` with `awaiting_confirmation`.
- Flyway migrations create constraints. PostgreSQL persists state across app restarts.

## Architecture boundary and limits

This implements the intent / attempt / outbox / inbox core of the proposed architecture. A manually triggered database worker substitutes for the proposed SQS relay. The provider stub uses a separate receipt table in the same database to model an external idempotency contract. It is not evidence that every provider offers that guarantee.

No real provider adapter, merchant authentication, webhook signature verification, automatic reconciliation, lease renewal, backoff/dead-letter policy, cancellation, decline flow, multi-currency support, sensitive-data handling or production observability is implemented. Crash recovery is tested at the acceptance/acknowledgement boundary, not every possible process instruction. Review those gaps before extending this local exercise. No backend is deployed with the public Next.js site.
