package cm.proxymedoc.repository;

import cm.proxymedoc.entity.Medication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MedicationRepository extends JpaRepository<Medication, Long> {
    List<Medication> findByPharmacyId(Long pharmacyId);
    List<Medication> findByInStockTrue();

    // Recherche par nom ou catégorie (insensible à la casse)
    @Query("SELECT m FROM Medication m WHERE " +
           "LOWER(m.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(m.category) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Medication> searchByNameOrCategory(String query);

    // Médicaments en stock faible pour une pharmacie donnée
    @Query("SELECT m FROM Medication m WHERE m.pharmacy.id = :pharmacyId AND m.quantity <= m.threshold")
    List<Medication> findLowStockByPharmacy(Long pharmacyId);
}
