package cm.proxymedoc.repository;

import cm.proxymedoc.entity.Pharmacy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PharmacyRepository extends JpaRepository<Pharmacy, Long> {
    List<Pharmacy> findByActiveTrue();
    List<Pharmacy> findByOnDutyTrueAndActiveTrue();
    List<Pharmacy> findByCityIgnoreCaseAndActiveTrue(String city);
}
