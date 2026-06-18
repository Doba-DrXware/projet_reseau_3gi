package cm.proxymedoc.controller;

import cm.proxymedoc.entity.Order;
import cm.proxymedoc.entity.OrderItem;
import cm.proxymedoc.repository.MedicationRepository;
import cm.proxymedoc.repository.OrderRepository;
import cm.proxymedoc.repository.PharmacyRepository;
import cm.proxymedoc.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final PharmacyRepository pharmacyRepository;
    private final MedicationRepository medicationRepository;

    // ── GET /api/orders/patient/{id} → commandes du patient
    @GetMapping("/patient/{patientId}")
    @PreAuthorize("hasAnyRole('PATIENT', 'ADMIN')")
    public List<Order> getByPatient(@PathVariable Long patientId) {
        return orderRepository.findByPatientIdOrderByCreatedAtDesc(patientId);
    }

    // ── GET /api/orders/pharmacy/{id} → réservations de la pharmacie
    @GetMapping("/pharmacy/{pharmacyId}")
    @PreAuthorize("hasAnyRole('PHARMACIEN', 'ADMIN')")
    public List<Order> getByPharmacy(@PathVariable Long pharmacyId) {
        return orderRepository.findByPharmacyIdOrderByCreatedAtDesc(pharmacyId);
    }

    // ── POST /api/orders → passer une commande (patient)
    @PostMapping
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest req) {
        var patient = userRepository.findById(req.patientId).orElse(null);
        var pharmacy = pharmacyRepository.findById(req.pharmacyId).orElse(null);

        if (patient == null || pharmacy == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Patient ou pharmacie introuvable."));
        }

        var order = Order.builder()
                .patient(patient)
                .pharmacy(pharmacy)
                .processingFee(200)
                .build();

        double total = 0;
        for (var itemReq : req.items) {
            var med = medicationRepository.findById(itemReq.medicationId).orElse(null);
            if (med == null) continue;

            var item = OrderItem.builder()
                    .order(order)
                    .medication(med)
                    .quantity(itemReq.quantity)
                    .unitPrice(med.getPrice())
                    .build();
            order.getItems().add(item);
            total += med.getPrice() * itemReq.quantity;
        }

        order.setTotal(total + order.getProcessingFee());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(orderRepository.save(order));
    }

    // ── PUT /api/orders/{id}/status → changer le statut (pharmacien)
    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('PHARMACIEN', 'ADMIN')")
    public ResponseEntity<?> updateStatus(@PathVariable Long id,
                                          @RequestBody Map<String, String> body) {
        return orderRepository.findById(id).map(order -> {
            try {
                order.setStatus(Order.Status.valueOf(body.get("status")));
                return ResponseEntity.ok(orderRepository.save(order));
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Statut invalide."));
            }
        }).orElse(ResponseEntity.notFound().build());
    }

    // ── DTOs internes ──────────────────────────────────────
    record OrderRequest(Long patientId, Long pharmacyId, List<ItemRequest> items) {}
    record ItemRequest(Long medicationId, int quantity) {}
}
