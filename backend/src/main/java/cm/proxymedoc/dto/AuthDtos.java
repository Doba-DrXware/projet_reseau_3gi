package cm.proxymedoc.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

// ── Requête de login ───────────────────────────────────────
class LoginRequest {
    @NotBlank(message = "L'identifiant est obligatoire")
    public String identifier;

    @NotBlank(message = "Le mot de passe est obligatoire")
    public String password;
}

// ── Requête d'inscription ──────────────────────────────────
class RegisterRequest {
    @NotBlank(message = "L'identifiant est obligatoire")
    public String identifier;

    @NotBlank(message = "Le prénom est obligatoire")
    public String firstName;

    @NotBlank(message = "Le nom est obligatoire")
    public String lastName;

    @NotBlank(message = "Le mot de passe est obligatoire")
    @Size(min = 8, message = "Minimum 8 caractères")
    public String password;
}

// ── Réponse d'authentification ─────────────────────────────
class AuthResponse {
    public String token;
    public String role;
    public String firstName;
    public String lastName;
    public Long userId;

    public AuthResponse(String token, String role, String firstName, String lastName, Long userId) {
        this.token = token;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userId = userId;
    }
}
