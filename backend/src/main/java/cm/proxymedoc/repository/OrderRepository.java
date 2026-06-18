package cm.proxymedoc.repository;

import cm.proxymedoc.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByPatientIdOrderByCreatedAtDesc(Long patientId);
    List<Order> findByPharmacyIdOrderByCreatedAtDesc(Long pharmacyId);
    List<Order> findByPharmacyIdAndStatus(Long pharmacyId, Order.Status status);
}
