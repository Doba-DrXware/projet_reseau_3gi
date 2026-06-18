package cm.proxymedoc.controller;

import cm.proxymedoc.entity.User;
import cm.proxymedoc.repository.UserRepository;
import cm.proxymedoc.security.JwtUtil;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // ── POST /api/auth/login ───────────────────────────────
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest req) {
        // Spring Security vérifie l'identifiant + mot de passe
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(req.identifier, req.password)
        );

        User user = userRepository.findByIdentifier(req.identifier)
                .orElseThrow();

        String token = jwtUtil.generateToken(user.getIdentifier(), user.getRole().name());

        return ResponseEntity.ok(Map.of(
            "token",     token,
            "role",      user.getRole().name(),
            "firstName", user.getFirstName(),
            "lastName",  user.getLastName(),
            "userId",    user.getId()
        ));
    }

    // ── POST /api/auth/register ────────────────────────────
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest req) {
        if (userRepository.existsByIdentifier(req.identifier)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Cet identifiant est déjà utilisé."));
        }

        User user = User.builder()
                .identifier(req.identifier)
                .firstName(req.firstName)
                .lastName(req.lastName)
                .password(passwordEncoder.encode(req.password))
                .role(User.Role.PATIENT) // Par défaut : patient
                .build();

        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Compte créé avec succès."));
    }

    // ── DTOs internes ──────────────────────────────────────
    record LoginRequest(
        @NotBlank String identifier,
        @NotBlank String password
    ) {}

    record RegisterRequest(
        @NotBlank String identifier,
        @NotBlank String firstName,
        @NotBlank String lastName,
        @NotBlank @Size(min = 8) String password
    ) {}
}
