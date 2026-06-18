package cm.proxymedoc.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "pharmacies")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Pharmacy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String city;

    private String address;

    private String phone;

    // "Ouvert 24h/24", "Ouvert jusqu'à 20h", etc.
    private String status;

    private String hours;

    // Distance calculée dynamiquement côté frontend
    private boolean onDuty;

    @Column(nullable = false)
    private boolean active = true;
}
