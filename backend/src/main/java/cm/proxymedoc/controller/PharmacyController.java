package cm.proxymedoc.controller;

import cm.proxymedoc.entity.Pharmacy;
import cm.proxymedoc.repository.PharmacyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pharmacies")
@RequiredArgsConstructor
public class PharmacyController {

    private final PharmacyRepository pharmacyRepository;

    // ── GET /api/pharmacies → toutes les pharmacies actives (public)
    @GetMapping
    public List<Pharmacy> getAll() {
        return pharmacyRepository.findByActiveTrue();
    }

    // ── GET /api/pharmacies/duty → pharmacies de garde (public)
    @GetMapping("/duty")
    public List<Pharmacy> getOnDuty() {
        return pharmacyRepository.findByOnDutyTrueAndActiveTrue();
    }

    // ── GET /api/pharmacies/{id} → détail d'une pharmacie (public)
    @GetMapping("/{id}")
    public ResponseEntity<Pharmacy> getById(@PathVariable Long id) {
        return pharmacyRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ── POST /api/pharmacies → créer une pharmacie (admin seulement)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Pharmacy> create(@RequestBody Pharmacy pharmacy) {
        Pharmacy saved = pharmacyRepository.save(pharmacy);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // ── PUT /api/pharmacies/{id} → modifier une pharmacie (admin seulement)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Pharmacy> update(@PathVariable Long id,
                                           @RequestBody Pharmacy updated) {
        return pharmacyRepository.findById(id).map(p -> {
            p.setName(updated.getName());
            p.setCity(updated.getCity());
            p.setAddress(updated.getAddress());
            p.setPhone(updated.getPhone());
            p.setStatus(updated.getStatus());
            p.setHours(updated.getHours());
            p.setOnDuty(updated.isOnDuty());
            p.setActive(updated.isActive());
            return ResponseEntity.ok(pharmacyRepository.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    // ── DELETE /api/pharmacies/{id} → désactiver (admin seulement)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    // public ResponseEntity<Void> delete(@PathVariable Long id) {
    //     return pharmacyRepository.findById(id).map(p -> {
    //         p.setActive(false);
    //         pharmacyRepository.save(p);
    //         return ResponseEntity.noContent().<Void>build();
    //     }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).<Void>build());
    // }
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return pharmacyRepository.findById(id).<ResponseEntity<Void>>map(p -> {
            p.setActive(false);
            pharmacyRepository.save(p);
            return ResponseEntity.noContent().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
