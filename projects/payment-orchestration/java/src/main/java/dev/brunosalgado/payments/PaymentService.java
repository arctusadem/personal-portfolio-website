package dev.brunosalgado.payments;

import java.util.Objects;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PaymentService {
    public record Command(long amountMinor, String currency, String providerToken) {}
    public record Payment(UUID id, String status, long amountMinor, String currency) {}
    public record Dispatch(boolean processed) {}
    private final JdbcTemplate db;
    private final TransactionTemplate tx;

    public PaymentService(JdbcTemplate db, TransactionTemplate tx) {
        this.db = db;
        this.tx = tx;
    }

    public Payment create(String merchant, String key, Command command) {
        identifier(merchant, 80);
        identifier(key, 128);
        if (command.amountMinor < 1 || command.amountMinor > 1_000_000_000L
                || !"CAD".equals(command.currency) || !"tok_demo".equals(command.providerToken)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Use CAD, 1..1000000000 minor units and tok_demo");
        }
        return tx.execute(ignored -> {
            UUID id = UUID.randomUUID();
            int inserted = db.update("""
                INSERT INTO payment(id, merchant, request_key, amount_minor, currency, provider_token, status)
                VALUES (?, ?, ?, ?, ?, ?, 'pending') ON CONFLICT (merchant, request_key) DO NOTHING
                """, id, merchant, key, command.amountMinor, command.currency, command.providerToken);
            // PostgreSQL waits for a competing insert to commit. This subsequent READ COMMITTED
            // statement sees that committed row; a payload mismatch never creates an attempt.
            var row = db.queryForMap("SELECT * FROM payment WHERE merchant = ? AND request_key = ?", merchant, key);
            if (((Number) row.get("amount_minor")).longValue() != command.amountMinor
                    || !Objects.equals(row.get("currency"), command.currency)
                    || !Objects.equals(row.get("provider_token"), command.providerToken)) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Key already identifies another request");
            }
            if (inserted == 1) {
                UUID attempt = UUID.randomUUID();
                db.update("INSERT INTO attempt VALUES (?, ?, 'pending')", attempt, id);
                db.update("INSERT INTO outbox(attempt_id) VALUES (?)", attempt);
            }
            return new Payment((UUID) row.get("id"), (String) row.get("status"), command.amountMinor, command.currency);
        });
    }

    public Payment get(String merchant, UUID id) {
        identifier(merchant, 80);
        return db.query("SELECT * FROM payment WHERE id = ? AND merchant = ?",
            (rs, n) -> new Payment(rs.getObject("id", UUID.class), rs.getString("status"),
                rs.getLong("amount_minor"), rs.getString("currency")), id, merchant)
            .stream().findFirst().orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Dispatch dispatch() {
        UUID attempt = tx.execute(ignored -> {
            var pending = db.queryForList("""
                SELECT attempt_id FROM outbox WHERE NOT delivered
                AND (lease_until IS NULL OR lease_until < now())
                ORDER BY attempt_id FOR UPDATE SKIP LOCKED LIMIT 1
                """, UUID.class);
            if (pending.isEmpty()) return null;
            UUID id = pending.getFirst();
            db.update("UPDATE outbox SET lease_until = now() + interval '5 seconds' WHERE attempt_id = ?", id);
            return id;
        });
        if (attempt == null) return new Dispatch(false);
        // Outside the claim transaction: deterministic fake provider accepts, persists one
        // receipt per attempt key, then loses the response. No network or payment credentials.
        acceptAtStub(attempt);
        tx.executeWithoutResult(ignored -> {
            db.update("UPDATE payment SET status = 'awaiting_confirmation' WHERE id = (SELECT payment_id FROM attempt WHERE id = ?) AND status = 'pending'", attempt);
            db.update("UPDATE attempt SET status = 'awaiting_confirmation' WHERE id = ? AND status = 'pending'", attempt);
            db.update("UPDATE outbox SET delivered = true, lease_until = NULL WHERE attempt_id = ?", attempt);
        });
        return new Dispatch(true);
    }

    void acceptAtStub(UUID attempt) {
        db.update("INSERT INTO stub_receipt(attempt_id) VALUES (?) ON CONFLICT DO NOTHING", attempt);
    }

    public Payment confirm(String merchant, UUID id, String event) {
        identifier(event, 128);
        return tx.execute(ignored -> {
            get(merchant, id);
            db.queryForObject("SELECT id FROM payment WHERE id = ? FOR UPDATE", UUID.class, id);
            Integer receipts = db.queryForObject("SELECT count(*) FROM stub_receipt r JOIN attempt a ON a.id = r.attempt_id WHERE a.payment_id = ?", Integer.class, id);
            if (receipts == null || receipts != 1) throw new ResponseStatusException(HttpStatus.CONFLICT, "Stub has not accepted this attempt");
            db.update("INSERT INTO inbox VALUES (?, ?) ON CONFLICT DO NOTHING", event, id);
            UUID owner = db.queryForObject("SELECT payment_id FROM inbox WHERE event_id = ?", UUID.class, event);
            if (!id.equals(owner)) throw new ResponseStatusException(HttpStatus.CONFLICT, "Event belongs to another payment");
            db.update("UPDATE payment SET status = 'succeeded' WHERE id = ?", id);
            db.update("UPDATE attempt SET status = 'succeeded' WHERE payment_id = ?", id);
            return get(merchant, id);
        });
    }

    private static void identifier(String value, int max) {
        if (value == null || value.length() > max || !value.matches("[A-Za-z0-9_-]+"))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid demo identifier");
    }
}
