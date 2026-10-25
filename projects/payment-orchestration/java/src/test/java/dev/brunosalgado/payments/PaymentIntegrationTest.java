package dev.brunosalgado.payments;

import static org.assertj.core.api.Assertions.*;
import java.util.*;
import java.util.concurrent.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.web.server.ResponseStatusException;
import org.testcontainers.containers.PostgreSQLContainer;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PaymentIntegrationTest {
    // Optional isolated native PostgreSQL supports machines without Docker. Both paths use
    // real PostgreSQL, never H2. The database must be disposable: tables are truncated.
    static final PostgreSQLContainer<?> postgres = System.getenv("TEST_DATABASE_URL") == null
        ? new PostgreSQLContainer<>("postgres:17-alpine") : null;
    @DynamicPropertySource
    static void database(DynamicPropertyRegistry r) {
        if (postgres != null) {
            postgres.start();
            r.add("spring.datasource.url", postgres::getJdbcUrl);
            r.add("spring.datasource.username", postgres::getUsername);
            r.add("spring.datasource.password", postgres::getPassword);
        } else {
            r.add("spring.datasource.url", () -> System.getenv("TEST_DATABASE_URL"));
            r.add("spring.datasource.username", () -> System.getenv().getOrDefault("TEST_DATABASE_USER", "demo"));
            r.add("spring.datasource.password", () -> System.getenv().getOrDefault("TEST_DATABASE_PASSWORD", "local_demo_only"));
        }
    }
    @Autowired PaymentService service;
    @Autowired JdbcTemplate db;
    @Autowired TestRestTemplate http;
    final PaymentService.Command command = new PaymentService.Command(7500, "CAD", "tok_demo");
    @BeforeEach void reset() {
        db.execute("TRUNCATE inbox, stub_receipt, outbox, attempt, payment CASCADE");
    }
    int count(String table) { return db.queryForObject("SELECT count(*) FROM " + table, Integer.class); }

    @Test void sameRequestReplaysOriginalIdentity() {
        var first = service.create("merchant", "key", command);
        assertThat(service.create("merchant", "key", command)).isEqualTo(first);
        assertThat(count("payment")).isEqualTo(1);
        assertThat(count("attempt")).isEqualTo(1);
        assertThat(count("outbox")).isEqualTo(1);
    }
    @Test void mismatchedPayloadConflictsAndMerchantScopeIsIndependent() {
        service.create("a", "key", command);
        assertThatThrownBy(() -> service.create("a", "key", new PaymentService.Command(7600, "CAD", "tok_demo")))
            .isInstanceOfSatisfying(ResponseStatusException.class, e -> assertThat(e.getStatusCode().value()).isEqualTo(409));
        service.create("b", "key", command);
        assertThat(count("payment")).isEqualTo(2);
    }
    @Test void concurrentSameKeyCreatesOneIntentAttemptAndOutbox() throws Exception {
        var results = parallel(12, () -> service.create("merchant", "key", command).id());
        assertThat(new HashSet<>(results)).hasSize(1);
        assertThat(count("payment")).isEqualTo(1);
        assertThat(count("attempt")).isEqualTo(1);
        assertThat(count("outbox")).isEqualTo(1);
    }
    @Test void concurrentDifferentPayloadsHaveOneWinner() throws Exception {
        var results = parallel(12, () -> {
            long amount = Thread.currentThread().threadId();
            try { service.create("merchant", "key", new PaymentService.Command(amount, "CAD", "tok_demo")); return 202; }
            catch (ResponseStatusException e) { return e.getStatusCode().value(); }
        });
        assertThat(results.stream().filter(x -> x == 202).count()).isEqualTo(1);
        assertThat(results.stream().filter(x -> x == 409).count()).isEqualTo(11);
        assertThat(count("attempt")).isEqualTo(1);
    }
    @Test void lostResponseThenConcurrentConfirmationsRemainMonotonic() throws Exception {
        var payment = service.create("merchant", "key", command);
        assertThat(service.dispatch().processed()).isTrue();
        assertThat(service.get("merchant", payment.id()).status()).isEqualTo("awaiting_confirmation");
        assertThat(service.create("merchant", "key", command).id()).isEqualTo(payment.id());
        parallel(12, () -> service.confirm("merchant", payment.id(), "event-1"));
        assertThat(service.get("merchant", payment.id()).status()).isEqualTo("succeeded");
        assertThat(count("inbox")).isEqualTo(1);
        assertThat(count("stub_receipt")).isEqualTo(1);
        assertThat(service.dispatch().processed()).isFalse();
    }
    @Test void crashAfterProviderAcceptanceReplaysStableAttemptKey() {
        var payment = service.create("merchant", "key", command);
        UUID attempt = db.queryForObject("SELECT id FROM attempt", UUID.class);
        // Simulates acceptance followed by process loss before marking the outbox delivered.
        service.acceptAtStub(attempt);
        service.confirm("merchant", payment.id(), "early-confirmation");
        assertThat(service.dispatch().processed()).isTrue();
        assertThat(count("stub_receipt")).isEqualTo(1);
        assertThat(service.get("merchant", payment.id()).status()).isEqualTo("succeeded");
        assertThat(db.queryForObject("SELECT status FROM attempt", String.class)).isEqualTo("succeeded");
    }
    @Test void concurrentWorkersClaimEachOutboxOnce() throws Exception {
        service.create("merchant", "key", command);
        var results = parallel(12, () -> service.dispatch().processed());
        assertThat(results.stream().filter(Boolean::booleanValue).count()).isEqualTo(1);
        assertThat(count("stub_receipt")).isEqualTo(1);
    }
    @Test void eventCannotConfirmAnotherPaymentAndUnacceptedAttemptCannotConfirm() {
        var one = service.create("merchant", "one", command);
        var two = service.create("merchant", "two", command);
        assertThatThrownBy(() -> service.confirm("merchant", one.id(), "early"))
            .isInstanceOf(ResponseStatusException.class);
        service.dispatch(); service.dispatch();
        service.confirm("merchant", one.id(), "same-event");
        assertThatThrownBy(() -> service.confirm("merchant", two.id(), "same-event"))
            .isInstanceOf(ResponseStatusException.class);
        assertThat(service.get("merchant", two.id()).status()).isEqualTo("awaiting_confirmation");
    }
    @Test void httpContractValidatesInputIdentityAndLocation() {
        var headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-Demo-Merchant", "merchant"); headers.set("Idempotency-Key", "http-key");
        var result = http.postForEntity("/v1/payments", new HttpEntity<>(command, headers), PaymentService.Payment.class);
        assertThat(result.getStatusCode().value()).isEqualTo(202);
        assertThat(result.getHeaders().getLocation().toString()).isEqualTo("/v1/payments/" + result.getBody().id());
        var get = http.exchange(result.getHeaders().getLocation(), HttpMethod.GET, new HttpEntity<>(headers), PaymentService.Payment.class);
        assertThat(get.getBody()).isEqualTo(result.getBody());
        assertThat(http.postForEntity("/v1/payments", new HttpEntity<>(new PaymentService.Command(0, "CAD", "tok_demo"), headers), String.class).getStatusCode().value()).isEqualTo(400);
        assertThat(http.postForEntity("/v1/payments", new HttpEntity<>(new PaymentService.Command(7600, "CAD", "tok_demo"), headers), String.class).getStatusCode().value()).isEqualTo(409);
        headers.set("X-Demo-Merchant", "someone-else");
        assertThat(http.exchange(result.getHeaders().getLocation(), HttpMethod.GET, new HttpEntity<>(headers), String.class).getStatusCode().value()).isEqualTo(404);
    }
    private static <T> List<T> parallel(int size, Callable<T> action) throws Exception {
        var barrier = new CyclicBarrier(size);
        try (var pool = Executors.newFixedThreadPool(size)) {
            var futures = new ArrayList<Future<T>>();
            for (int i = 0; i < size; i++) futures.add(pool.submit(() -> { barrier.await(10, TimeUnit.SECONDS); return action.call(); }));
            var results = new ArrayList<T>();
            for (var future : futures) results.add(future.get(30, TimeUnit.SECONDS));
            return results;
        }
    }
}
