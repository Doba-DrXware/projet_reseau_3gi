package cm.proxymedoc.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "medications")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Medication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String category;

    // "Comprimé • Boîte de 16", "Sirop", etc.
    private String form;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private double price;

    // Quantité en stock dans la pharmacie liée
    private int quantity;

    // Seuil d'alerte de stock faible
    private int threshold = 10;

    private boolean prescription = false;

    @Column(nullable = false)
    private boolean inStock = true;

    // Chaque médicament appartient à une pharmacie
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pharmacy_id", nullable = false)
    private Pharmacy pharmacy;
}
