# 📊 STRUCTURE DE LA BASE DE DONNÉES - PRO EN POCHE

## 🔧 Système de Persistance

Le site **Pro En Poche** utilise le système de persistance **Spark KV (Key-Value)** pour stocker toutes les données de manière sécurisée et performante.

---

## 📦 COLLECTIONS DE DONNÉES

### 1. 👥 UTILISATEURS (Users)

**Clé KV:** `users`

**Structure:**
```typescript
{
  id: string                    // Identifiant unique (UUID)
  email: string                 // Email de l'utilisateur
  name: string                  // Nom complet
  role: UserRole                // 'client' | 'provider' | 'admin' | 'superadmin'
  avatar?: string               // URL de la photo de profil
  createdAt: string            // Date de création (ISO 8601)
  phone?: string               // Numéro de téléphone
  address?: string             // Adresse complète
  servicePreferences?: {       // Préférences du client (pour les clients)
    serviceType: string        // Type de service recherché
    frequency: string          // Fréquence souhaitée
    availability: string       // Disponibilité
    preferredDate: string      // Date préférée
    preferredTime: string      // Heure préférée
    timeSlot: string          // Plage horaire
    needDescription: string   // Description du besoin
    budget: number            // Budget
    comments: string          // Commentaires
    consentMarketing: boolean // Consentement marketing
  }
}
```

**Exemple:**
```json
{
  "id": "user-123456789",
  "email": "client@example.com",
  "name": "Jean Dupont",
  "role": "client",
  "avatar": "https://i.pravatar.cc/150?img=10",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "phone": "+1 514 555 1234",
  "address": "123 Rue Principale, Montréal, QC"
}
```

---

### 2. 🔧 PRESTATAIRES (Service Providers)

**Clé KV:** `providers`

**Structure:**
```typescript
{
  id: string                    // Identifiant unique
  email: string                 // Email
  name: string                  // Nom complet
  role: 'provider'              // Rôle prestataire
  avatar?: string               // Photo de profil
  createdAt: string            // Date de création
  phone?: string               // Téléphone
  address?: string             // Adresse complète
  bio: string                  // Biographie
  services: string[]           // Liste des services offerts
  location: string             // Ville/Région
  availability: string         // Disponibilité générale
  hourlyRate: number           // Tarif horaire (CAD $)
  rating: number               // Note moyenne (0-5)
  reviewCount: number          // Nombre d'avis
  verified: boolean            // Compte vérifié par admin
  profession?: string          // Profession principale
  portfolioImages?: string[]   // Images du portfolio
  certifications?: string[]    // Certifications
  experience?: string          // Années d'expérience
  languages?: string[]         // Langues parlées
  responseTime?: string        // Temps de réponse moyen
  attachments?: [              // Pièces justificatives
    {
      id: string
      name: string
      type: 'identity' | 'certification' | 'insurance' | 'other'
      url: string
      uploadedAt: string
    }
  ]
  subscription?: {             // Abonnement actif
    plan: 'basic' | 'premium' | 'enterprise'
    startDate: string
    endDate: string
    isActive: boolean
  }
}
```

**Plans d'abonnement:**
- **ESSENTIEL (basic):** Gratuit - 5 services max, commission 15%
- **VIP (premium):** 59$/mois - 15 services, commission 10%, badge VIP
- **PREMIUM (enterprise):** 99$/mois - Services illimités, commission 5%, priorité

**Exemple:**
```json
{
  "id": "provider-987654321",
  "email": "plombier@example.com",
  "name": "Marc Tremblay",
  "role": "provider",
  "bio": "Plombier professionnel avec 15 ans d'expérience",
  "services": ["Plomberie", "Réparations"],
  "location": "Montréal",
  "hourlyRate": 65,
  "rating": 4.8,
  "reviewCount": 142,
  "verified": true,
  "subscription": {
    "plan": "premium",
    "startDate": "2024-01-01T00:00:00.000Z",
    "endDate": "2024-02-01T00:00:00.000Z",
    "isActive": true
  }
}
```

---

### 3. 📅 RÉSERVATIONS (Bookings)

**Clé KV:** `bookings`

**Structure:**
```typescript
{
  id: string                    // Identifiant unique
  providerId: string            // ID du prestataire
  clientId: string              // ID du client
  serviceType: string           // Type de service réservé
  date: string                  // Date du service (ISO 8601)
  time: string                  // Heure du service
  status: BookingStatus         // 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'disputed'
  price: number                 // Prix total (CAD $)
  paymentStatus: PaymentStatus  // 'pending' | 'held' | 'released' | 'refunded'
  createdAt: string            // Date de création
  completedAt?: string         // Date de complétion
}
```

**Statuts de réservation:**
- `pending` : En attente de confirmation
- `confirmed` : Confirmée
- `completed` : Terminée
- `cancelled` : Annulée
- `disputed` : En litige

**Statuts de paiement:**
- `pending` : En attente
- `held` : Retenu en garantie (séquestre)
- `released` : Libéré au prestataire
- `refunded` : Remboursé au client

**Exemple:**
```json
{
  "id": "booking-1705321800000",
  "providerId": "provider-987654321",
  "clientId": "user-123456789",
  "serviceType": "Plomberie",
  "date": "2024-01-20T00:00:00.000Z",
  "time": "14:00",
  "status": "completed",
  "price": 130,
  "paymentStatus": "released",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "completedAt": "2024-01-20T16:30:00.000Z"
}
```

---

### 4. ⭐ AVIS (Reviews)

**Clé KV:** `reviews`

**Structure:**
```typescript
{
  id: string           // Identifiant unique
  bookingId: string    // ID de la réservation associée
  providerId: string   // ID du prestataire évalué
  clientId: string     // ID du client qui évalue
  rating: number       // Note (1-5 étoiles)
  comment: string      // Commentaire
  createdAt: string   // Date de création
}
```

**Exemple:**
```json
{
  "id": "review-1705408200000",
  "bookingId": "booking-1705321800000",
  "providerId": "provider-987654321",
  "clientId": "user-123456789",
  "rating": 5,
  "comment": "Excellent service! Très professionnel et ponctuel.",
  "createdAt": "2024-01-20T17:00:00.000Z"
}
```

---

### 5. 📢 ANNONCES (Announcements)

**Clé KV:** `announcements`

**Structure:**
```typescript
{
  id: string                    // Identifiant unique
  providerId: string            // ID du prestataire
  title: string                 // Titre de l'annonce
  description: string           // Description détaillée
  category: string              // Catégorie de service
  hourlyRate: number            // Tarif horaire
  location: string              // Localisation
  availability: string          // Disponibilité générale
  availabilitySlots?: [         // Créneaux de disponibilité détaillés
    {
      date: string              // Date (ISO 8601)
      startTime: string         // Heure de début
      endTime: string           // Heure de fin
    }
  ]
  services: string[]            // Liste des services
  isActive: boolean             // Annonce active/inactive
  createdAt: string            // Date de création
  updatedAt: string            // Date de mise à jour
}
```

**Exemple:**
```json
{
  "id": "announcement-1705321800000",
  "providerId": "provider-987654321",
  "title": "Services de Plomberie d'Urgence",
  "description": "Disponible 24/7 pour tous vos besoins en plomberie",
  "category": "Plomberie",
  "hourlyRate": 75,
  "location": "Montréal",
  "availability": "Immédiate",
  "services": ["Plomberie", "Réparations d'urgence"],
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

---

### 6. 💬 MESSAGES (Chat Messages)

**Clé KV:** `chat-messages`

**Structure:**
```typescript
{
  id: string           // Identifiant unique
  bookingId: string    // ID de la réservation associée
  senderId: string     // ID de l'expéditeur
  senderName: string   // Nom de l'expéditeur
  senderAvatar?: string // Avatar de l'expéditeur
  message: string      // Contenu du message
  createdAt: string   // Date d'envoi
  isRead: boolean     // Message lu/non lu
}
```

**Exemple:**
```json
{
  "id": "msg-1705408200000",
  "bookingId": "booking-1705321800000",
  "senderId": "user-123456789",
  "senderName": "Jean Dupont",
  "message": "À quelle heure pouvez-vous commencer?",
  "createdAt": "2024-01-16T09:15:00.000Z",
  "isRead": true
}
```

---

### 7. 🔔 NOTIFICATIONS

**Clé KV:** `notifications`

**Structure:**
```typescript
{
  id: string              // Identifiant unique
  userId: string          // ID de l'utilisateur destinataire
  type: NotificationType  // Type de notification
  title: string           // Titre
  message: string         // Message
  link?: string          // Lien associé
  data?: object          // Données additionnelles
  isRead: boolean        // Lue/non lue
  createdAt: string      // Date de création
}
```

**Types de notifications:**
- `booking_created` : Nouvelle réservation créée
- `booking_confirmed` : Réservation confirmée
- `booking_completed` : Service terminé
- `booking_cancelled` : Réservation annulée
- `payment_received` : Paiement reçu
- `payment_released` : Paiement libéré
- `review_received` : Nouvel avis reçu
- `message_received` : Nouveau message
- `account_approved` : Compte approuvé
- `account_rejected` : Compte rejeté
- `subscription_activated` : Abonnement activé
- `subscription_expiring` : Abonnement expire bientôt
- `announcement_created` : Annonce créée
- `announcement_updated` : Annonce mise à jour
- `admin_message` : Message administrateur

**Exemple:**
```json
{
  "id": "notif-1705408200000",
  "userId": "provider-987654321",
  "type": "booking_created",
  "title": "Nouvelle réservation",
  "message": "Vous avez reçu une nouvelle réservation pour Plomberie",
  "data": {
    "bookingId": "booking-1705321800000"
  },
  "isRead": false,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

---

### 8. ⚙️ PARAMÈTRES DU SITE (Site Settings)

**Clé KV:** `site-settings`

**Structure:**
```typescript
{
  logo?: string         // URL du logo personnalisé
  smtp: {              // Configuration email
    host: string       // Serveur SMTP
    port: number       // Port SMTP
    username: string   // Nom d'utilisateur
    password: string   // Mot de passe
    fromEmail: string  // Email expéditeur
    fromName: string   // Nom expéditeur
  }
  stripe: {            // Configuration Stripe
    publishableKey: string  // Clé publique
    secretKey: string       // Clé secrète
    webhookSecret: string   // Secret webhook
  }
  updatedAt: string   // Date de dernière mise à jour
}
```

---

### 9. 📝 CONTENU DU SITE (Site Content)

**Clé KV:** `site-content`

**Structure complète:**
```typescript
{
  hero: {
    mainTitle: string           // Titre principal page d'accueil
    subtitle: string            // Sous-titre
    searchPlaceholder: string   // Placeholder recherche
  }
  about: {
    title: string
    description: string
    features: Array<{
      title: string
      description: string
    }>
  }
  whyChooseUs: {
    title: string
    subtitle: string
    reasons: Array<{
      title: string
      description: string
    }>
  }
  stats: {
    title: string
    subtitle: string
    providers: { label: string; value: string }
    clients: { label: string; value: string }
    bookings: { label: string; value: string }
    satisfaction: { label: string; value: string }
    image?: string
  }
  testimonials: {
    title: string
    subtitle: string
    items: Array<{
      name: string
      role: string
      content: string
      rating: number
      avatar?: string
      service?: string
    }>
  }
  becomeProvider: {
    title: string
    subtitle: string
    description: string
    buttonText: string
    image?: string
    benefits: Array<{
      title: string
      description: string
    }>
  }
  faq: {
    title: string
    subtitle: string
    items: Array<{
      question: string
      answer: string
    }>
  }
  footer: {
    description: string
    copyright: string
    aboutImage?: string
  }
  homeSlides: Array<{
    id: number
    title: string
    description: string
    image: string
    alt: string
    buttonText: string
  }>
}
```

---

## 🔐 COMPTE SUPER ADMINISTRATEUR

**Email:** `superadmin@proenpoche.com`  
**Mot de passe:** `SuperAdmin2024!`

**Permissions:**
- ✅ Gestion complète des utilisateurs
- ✅ Validation des comptes prestataires
- ✅ Configuration SMTP et Stripe
- ✅ Modification du logo
- ✅ Édition en ligne du contenu du site
- ✅ Création d'administrateurs
- ✅ Accès à tous les tableaux de bord
- ✅ Gestion des réservations et paiements

---

## 📊 FLUX DE DONNÉES

### Processus de Réservation

```
1. Client recherche un prestataire
   └─> Lecture: providers (filtrés par verified=true)

2. Client réserve un service
   └─> Création: booking (status='pending', paymentStatus='pending')
   └─> Paiement Stripe
   └─> Mise à jour: booking (paymentStatus='held')
   └─> Création: notification (type='booking_created') pour le prestataire
   └─> Création: notification (type='booking_confirmed') pour le client

3. Prestataire marque le service terminé
   └─> Mise à jour: booking (status='completed')
   └─> Création: notification (type='booking_completed') pour le client

4. Client laisse un avis
   └─> Création: review
   └─> Mise à jour: booking (paymentStatus='released')
   └─> Mise à jour: provider (rating, reviewCount)
   └─> Création: notification (type='review_received') pour le prestataire
   └─> Création: notification (type='payment_released') pour le prestataire
```

### Processus d'Inscription Prestataire

```
1. Création du compte prestataire
   └─> Création: provider (verified=false)
   └─> Affichage: Message "Demande en attente de validation"

2. Admin valide le compte
   └─> Mise à jour: provider (verified=true)
   └─> Ajout: users
   └─> Création: notification (type='account_approved')

3. Prestataire choisit un plan
   └─> Paiement si plan payant (VIP/PREMIUM)
   └─> Mise à jour: provider.subscription
   └─> Création: notification (type='subscription_activated')

4. Prestataire crée des annonces
   └─> Création: announcement (nécessite subscription.isActive=true)
```

---

## 🛠️ ACCÈS AUX DONNÉES

### Via React Hook (recommandé)
```typescript
import { useKV } from '@github/spark/hooks'

// Lecture et écriture
const [providers, setProviders] = useKV<ServiceProvider[]>('providers', [])

// Mise à jour fonctionnelle (évite les closures périmées)
setProviders((current) => [...current, newProvider])
```

### Via API directe
```typescript
// Lecture
const providers = await spark.kv.get<ServiceProvider[]>('providers')

// Écriture
await spark.kv.set('providers', updatedProviders)

// Suppression
await spark.kv.delete('providers')

// Lister toutes les clés
const keys = await spark.kv.keys()
```

---

## 📈 STATISTIQUES ACTUELLES

Les données statistiques affichées sur le site sont configurables via `site-content.stats`:

- **Professionnels vérifiés:** 500+
- **Clients satisfaits:** 10,000+
- **Services réservés:** 25,000+
- **Note moyenne:** 4.8/5

---

## 🇨🇦 VILLES CANADIENNES SUPPORTÉES

Le site est limité au Canada avec les villes suivantes:
- Montréal
- Toronto
- Vancouver
- Calgary
- Ottawa
- Edmonton
- Québec
- Winnipeg
- Hamilton
- Kitchener
- London
- Victoria
- Halifax
- Oshawa
- Windsor

---

## 📋 CATÉGORIES DE SERVICES

Services disponibles sur la plateforme:
1. Plomberie
2. Électricité
3. Ménage
4. Tutorat
5. Jardinage
6. Déménagement
7. Assemblage de meubles
8. Toiture
9. Réparations diverses
10. Aide à domicile
11. Déneigement
12. Autres services

---

## 🔒 SÉCURITÉ

- ✅ Paiements sécurisés via Stripe
- ✅ Données chiffrées en transit et au repos
- ✅ Validation des comptes prestataires
- ✅ Système de séquestre pour les paiements
- ✅ Authentification sécurisée
- ✅ Conformité RGPD/PIPEDA
- ✅ Politique de cookies implémentée

---

## 📧 CONTACT & SUPPORT

**Site web:** www.proenpoche.com  
**Téléphone:** +1 450 809 3831  
**Facebook:** https://www.facebook.com/ProenPoche  
**Instagram:** https://www.instagram.com/proenpoche  

**Développé par:** WEBNTIC (www.webntic.com)

---

*Dernière mise à jour: Janvier 2024*
