package cm.proxymedoc.config;

import cm.proxymedoc.entity.Medication;
import cm.proxymedoc.entity.Pharmacy;
import cm.proxymedoc.entity.User;
import cm.proxymedoc.repository.MedicationRepository;
import cm.proxymedoc.repository.PharmacyRepository;
import cm.proxymedoc.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PharmacyRepository pharmacyRepository;
    private final MedicationRepository medicationRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // On ne recrée pas si la BDD est déjà peuplée
        if (userRepository.count() > 0) return;

        // ── Pharmacies ──────────────────────────────────────
        var pharmacieCentre = pharmacyRepository.save(Pharmacy.builder()
                .name("Pharmacie du Centre")
                .city("Yaoundé")
                .address("Avenue Kennedy, Yaoundé")
                .phone("699 000 001")
                .status("Ouvert 24h/24")
                .hours("Ouvert 24h/24")
                .onDuty(true)
                .active(true)
                .build());

        var pharmaciePoste = pharmacyRepository.save(Pharmacy.builder()
                .name("Pharmacie de la Poste")
                .city("Douala")
                .address("Rue de la Poste, Douala")
                .phone("699 000 002")
                .status("Ouvert jusqu'à 20h")
                .hours("Lun-Sam 8h-20h")
                .onDuty(false)
                .active(true)
                .build());

        pharmacyRepository.save(Pharmacy.builder()
                .name("Pharmacie des Nations")
                .city("Yaoundé")
                .address("Quartier Bastos, Yaoundé")
                .phone("699 000 004")
                .status("Fermé")
                .hours("Lun-Ven 8h-18h")
                .onDuty(false)
                .active(true)
                .build());

        // ── Médicaments ────────────────────────────────────
        medicationRepository.save(Medication.builder()
                .name("Paracétamol Biogaran 500mg")
                .category("Analgesique / Antipyrétique")
                .form("Comprimé • Boîte de 16")
                .description("Traitement des douleurs, fièvre et maux de tête.")
                .price(1500).quantity(50).threshold(10)
                .inStock(true).pharmacy(pharmacieCentre).build());

        medicationRepository.save(Medication.builder()
                .name("Artemether / Lumefantrine 80/480mg")
                .category("Antipaludéen")
                .form("Comprimé sécable • Boîte de 6")
                .description("Traitement du paludisme non compliqué.")
                .price(2500).quantity(30).threshold(10)
                .inStock(true).pharmacy(pharmaciePoste).build());

        medicationRepository.save(Medication.builder()
                .name("Amoxicilline 500mg")
                .category("Antibiotique")
                .form("Gélule • Boîte de 12")
                .description("Antibiothérapie à large spectre.")
                .price(4500).quantity(0).threshold(10)
                .inStock(false).pharmacy(pharmacieCentre).build());

        // ── Utilisateurs ───────────────────────────────────
        userRepository.save(User.builder()
                .identifier("admin@proxymedoc.cm")
                .firstName("Admin")
                .lastName("PROXYMÉDOC")
                .password(passwordEncoder.encode("admin123"))
                .role(User.Role.ADMIN)
                .build());

        userRepository.save(User.builder()
                .identifier("699000001")
                .firstName("Ibrahim")
                .lastName("Patient")
                .password(passwordEncoder.encode("patient123"))
                .role(User.Role.PATIENT)
                .build());

        userRepository.save(User.builder()
                .identifier("699000002")
                .firstName("Marie")
                .lastName("Pharmacien")
                .password(passwordEncoder.encode("pharma123"))
                .role(User.Role.PHARMACIEN)
                .pharmacy(pharmacieCentre)
                .build());

        System.out.println("✅ DataSeeder : données initiales insérées en base.");
    }
}
