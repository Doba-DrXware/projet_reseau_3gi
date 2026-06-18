package cm.proxymedoc.controller;

import cm.proxymedoc.entity.Medication;
import cm.proxymedoc.repository.MedicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medications")
@RequiredArgsConstructor
public class MedicationController {

    private final MedicationRepository medicationRepository;

    // ── GET /api/medications → tous les médicaments en stock
    @GetMapping
    public List<Medication> getAll() {
        return medicationRepository.findByInStockTrue();
    }

    // ── GET /api/medications/search?q=paracet → recherche (public)
    @GetMapping("/search")
    public List<Medication> search(@RequestParam String q) {
        return medicationRepository.searchByNameOrCategory(q);
    }

    // ── GET /api/medications/pharmacy/{id} → stock d'une pharmacie
    @GetMapping("/pharmacy/{pharmacyId}")
    @PreAuthorize("hasAnyRole('PHARMACIEN', 'ADMIN')")
    public List<Medication> getByPharmacy(@PathVariable Long pharmacyId) {
        return medicationRepository.findByPharmacyId(pharmacyId);
    }

    // ── GET /api/medications/pharmacy/{id}/alerts → alertes stock faible
    @GetMapping("/pharmacy/{pharmacyId}/alerts")
    @PreAuthorize("hasAnyRole('PHARMACIEN', 'ADMIN')")
    public List<Medication> getLowStock(@PathVariable Long pharmacyId) {
        return medicationRepository.findLowStockByPharmacy(pharmacyId);
    }

    // ── GET /api/medications/{id} → détail
    @GetMapping("/{id}")
    public ResponseEntity<Medication> getById(@PathVariable Long id) {
        return medicationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ── POST /api/medications → ajouter un médicament (pharmacien)
    @PostMapping
    @PreAuthorize("hasAnyRole('PHARMACIEN', 'ADMIN')")
    public ResponseEntity<Medication> create(@RequestBody Medication medication) {
        medication.setInStock(medication.getQuantity() > 0);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(medicationRepository.save(medication));
    }

    // ── PUT /api/medications/{id} → modifier (pharmacien)
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('PHARMACIEN', 'ADMIN')")
    public ResponseEntity<Medication> update(@PathVariable Long id,
                                             @RequestBody Medication updated) {
        return medicationRepository.findById(id).map(m -> {
            m.setName(updated.getName());
            m.setCategory(updated.getCategory());
            m.setForm(updated.getForm());
            m.setDescription(updated.getDescription());
            m.setPrice(updated.getPrice());
            m.setQuantity(updated.getQuantity());
            m.setThreshold(updated.getThreshold());
            m.setPrescription(updated.isPrescription());
            m.setInStock(updated.getQuantity() > 0);
            return ResponseEntity.ok(medicationRepository.save(m));
        }).orElse(ResponseEntity.notFound().build());
    }

    // ── DELETE /api/medications/{id} → supprimer (pharmacien)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('PHARMACIEN', 'ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!medicationRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        medicationRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
