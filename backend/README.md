# PROXYMÉDOC — Backend Spring Boot

## Stack technique
- Java 17 + Spring Boot 3.2
- Spring Security + JWT (jjwt 0.11)
- Spring Data JPA + PostgreSQL
- Lombok
- Maven

---

## 1. Prérequis

- Java 17+
- Maven 3.8+
- PostgreSQL installé et démarré

---

## 2. Créer la base de données

```sql
CREATE DATABASE proxymedoc;
```

---

## 3. Configurer application.properties

Dans `src/main/resources/application.properties`, modifier :

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/proxymedoc
spring.datasource.username=postgres
spring.datasource.password=TON_MOT_DE_PASSE
app.jwt.secret=une_cle_secrete_tres_longue_et_aleatoire_minimum_32_chars
```

---

## 4. Lancer le backend

```bash
mvn clean install
mvn spring-boot:run
```

Le serveur démarre sur **http://localhost:8080**

Au premier démarrage, le `DataSeeder` insère automatiquement les pharmacies,
médicaments et comptes de démo en base.

---

## 5. Endpoints disponibles

### Authentification (public)
| Méthode | URL | Description |
|---------|-----|-------------|
| POST | `/api/auth/login` | Connexion → retourne un JWT |
| POST | `/api/auth/register` | Inscription patient |

**Exemple login :**
```json
POST /api/auth/login
{
  "identifier": "699000001",
  "password": "patient123"
}
```
**Réponse :**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "role": "PATIENT",
  "firstName": "Ibrahim",
  "userId": 2
}
```

### Pharmacies (public)
| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/pharmacies` | Toutes les pharmacies actives |
| GET | `/api/pharmacies/duty` | Pharmacies de garde |
| GET | `/api/pharmacies/{id}` | Détail d'une pharmacie |
| POST | `/api/pharmacies` | Créer (ADMIN) |
| PUT | `/api/pharmacies/{id}` | Modifier (ADMIN) |
| DELETE | `/api/pharmacies/{id}` | Désactiver (ADMIN) |

### Médicaments
| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/medications` | Médicaments en stock |
| GET | `/api/medications/search?q=parac` | Recherche (public) |
| GET | `/api/medications/pharmacy/{id}` | Stock d'une pharmacie (PHARMACIEN) |
| GET | `/api/medications/pharmacy/{id}/alerts` | Alertes stock faible |
| POST | `/api/medications` | Ajouter (PHARMACIEN) |
| PUT | `/api/medications/{id}` | Modifier (PHARMACIEN) |
| DELETE | `/api/medications/{id}` | Supprimer (PHARMACIEN) |

### Commandes
| Méthode | URL | Description |
|---------|-----|-------------|
| POST | `/api/orders` | Passer une commande (PATIENT) |
| GET | `/api/orders/patient/{id}` | Commandes d'un patient |
| GET | `/api/orders/pharmacy/{id}` | Réservations d'une pharmacie |
| PUT | `/api/orders/{id}/status` | Changer le statut (PHARMACIEN) |

### Notifications
| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/notifications/user/{id}` | Notifications d'un utilisateur |
| GET | `/api/notifications/user/{id}/unread` | Nombre de non-lues |
| PUT | `/api/notifications/{id}/read` | Marquer comme lue |

---

## 6. Utiliser le JWT dans les requêtes

Ajouter ce header dans chaque requête protégée :
```
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

---

## 7. Connecter le frontend Next.js

Dans ton projet Next.js, créer `lib/api.ts` :

```typescript
const BASE_URL = "http://localhost:8080/api";

export async function apiFetch(path: string, options?: RequestInit) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Exemple de login
export async function login(identifier: string, password: string) {
  const data = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ identifier, password }),
  });
  localStorage.setItem("token", data.token);
  return data;
}
```

---

## 8. Structure du projet

```
proxymedoc-backend/
├── pom.xml
└── src/main/java/cm/proxymedoc/
    ├── ProxymedocApplication.java
    ├── config/
    │   ├── SecurityConfig.java       # Spring Security + CORS
    │   └── DataSeeder.java           # Données initiales
    ├── controller/
    │   ├── AuthController.java       # /api/auth/*
    │   ├── PharmacyController.java   # /api/pharmacies/*
    │   ├── MedicationController.java # /api/medications/*
    │   ├── OrderController.java      # /api/orders/*
    │   └── NotificationController.java
    ├── entity/
    │   ├── User.java
    │   ├── Pharmacy.java
    │   ├── Medication.java
    │   ├── Order.java
    │   ├── OrderItem.java
    │   └── Notification.java
    ├── repository/         # Interfaces JpaRepository
    ├── security/
    │   ├── JwtUtil.java    # Génération / validation JWT
    │   └── JwtAuthFilter.java
    └── exception/
        └── GlobalExceptionHandler.java
```
