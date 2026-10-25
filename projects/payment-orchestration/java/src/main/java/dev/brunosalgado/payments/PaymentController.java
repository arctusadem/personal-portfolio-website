package dev.brunosalgado.payments;

import java.net.URI;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PaymentController {
    private final PaymentService service;
    public PaymentController(PaymentService service) { this.service = service; }

    @PostMapping("/v1/payments")
    ResponseEntity<PaymentService.Payment> create(@RequestHeader("X-Demo-Merchant") String merchant,
            @RequestHeader("Idempotency-Key") String key, @RequestBody PaymentService.Command command) {
        var payment = service.create(merchant, key, command);
        return ResponseEntity.accepted().location(URI.create("/v1/payments/" + payment.id())).body(payment);
    }

    @GetMapping("/v1/payments/{id}")
    PaymentService.Payment get(@RequestHeader("X-Demo-Merchant") String merchant, @PathVariable UUID id) {
        return service.get(merchant, id);
    }

    @PostMapping("/demo/dispatch")
    PaymentService.Dispatch dispatch() { return service.dispatch(); }

    @PostMapping("/demo/confirm/{id}")
    PaymentService.Payment confirm(@RequestHeader("X-Demo-Merchant") String merchant,
            @PathVariable UUID id, @RequestHeader("X-Demo-Event") String event) {
        return service.confirm(merchant, id, event);
    }
}
