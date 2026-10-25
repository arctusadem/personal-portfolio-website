CREATE TABLE payment (
  id uuid PRIMARY KEY,
  merchant varchar(80) NOT NULL,
  request_key varchar(128) NOT NULL,
  amount_minor bigint NOT NULL CHECK (amount_minor BETWEEN 1 AND 1000000000),
  currency varchar(3) NOT NULL CHECK (currency = 'CAD'),
  provider_token varchar(16) NOT NULL CHECK (provider_token = 'tok_demo'),
  status varchar(32) NOT NULL CHECK (status IN ('pending', 'awaiting_confirmation', 'succeeded')),
  UNIQUE (merchant, request_key)
);
CREATE TABLE attempt (
  id uuid PRIMARY KEY,
  payment_id uuid NOT NULL UNIQUE REFERENCES payment(id),
  status varchar(32) NOT NULL
);
CREATE TABLE outbox (
  attempt_id uuid PRIMARY KEY REFERENCES attempt(id),
  delivered boolean NOT NULL DEFAULT false,
  lease_until timestamptz
);
-- The deterministic provider stub persists its own idempotency receipt.
-- This table represents the provider boundary, not an actual financial ledger.
CREATE TABLE stub_receipt (
  attempt_id uuid PRIMARY KEY REFERENCES attempt(id),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE inbox (
  event_id varchar(128) PRIMARY KEY,
  payment_id uuid NOT NULL REFERENCES payment(id)
);
