import { SiteContent } from './types'

export const DEFAULT_SITE_CONTENT: SiteContent = {
  hero: {
    mainTitle: 'Trouvez des Services Professionnels\nprès de Chez Vous',
    subtitle: 'Connectez-vous avec des professionnels vérifiés partout au Canada',
    searchPlaceholder: 'Recherchez des services ou des professionnels...',
  },
  about: {
    title: 'À Propos de Pro En Poche',
    description: 'Pro En Poche est votre plateforme de confiance pour trouver des professionnels qualifiés dans votre région. Nous connectons les clients avec des prestataires de services vérifiés pour tous vos besoins.',
    features: [
      {
        title: 'Professionnels Vérifiés',
        description: 'Tous nos prestataires sont soigneusement vérifiés pour garantir la qualité du service.',
      },
      {
        title: 'Réservation Facile',
        description: 'Réservez vos services en quelques clics avec notre système de paiement sécurisé.',
      },
      {
        title: 'Paiement Protégé',
        description: 'Votre paiement est conservé en garantie jusqu\'à la fin du service.',
      },
      {
        title: 'Avis Clients',
        description: 'Consultez les avis authentiques d\'autres clients avant de réserver.',
      },
    ],
  },
  services: {
    title: 'Nos Services',
    description: 'Découvrez notre large gamme de services professionnels disponibles dans votre région.',
    categories: [
      { name: 'Plomberie', description: 'Installation, réparation et entretien' },
      { name: 'Électricité', description: 'Services électriques résidentiels et commerciaux' },
      { name: 'Ménage', description: 'Nettoyage professionnel de qualité' },
      { name: 'Jardinage', description: 'Entretien de jardin et paysagisme' },
      { name: 'Rénovation', description: 'Travaux de rénovation et d\'amélioration' },
      { name: 'Déménagement', description: 'Services de déménagement complets' },
    ],
  },
  whyChooseUs: {
    title: 'Pourquoi Choisir Pro En Poche?',
    subtitle: 'La solution idéale pour tous vos besoins en services professionnels',
    reasons: [
      {
        title: 'Qualité Garantie',
        description: 'Des professionnels qualifiés et vérifiés pour un service de qualité supérieure.',
      },
      {
        title: 'Paiement Sécurisé',
        description: 'Système de paiement protégé avec garantie de satisfaction.',
      },
      {
        title: 'Support 24/7',
        description: 'Notre équipe est disponible pour vous aider à tout moment.',
      },
      {
        title: 'Meilleurs Prix',
        description: 'Comparez les prix et choisissez l\'offre qui vous convient le mieux.',
      },
    ],
  },
  stats: {
    providers: { label: 'Prestataires Actifs', value: '500+' },
    clients: { label: 'Clients Satisfaits', value: '10,000+' },
    bookings: { label: 'Services Réservés', value: '25,000+' },
    satisfaction: { label: 'Taux de Satisfaction', value: '98%' },
  },
  testimonials: {
    title: 'Ce Que Disent Nos Clients',
    subtitle: 'Des milliers de clients satisfaits nous font confiance',
    items: [
      {
        name: 'Marie Dupont',
        role: 'Propriétaire',
        content: 'Service exceptionnel! J\'ai trouvé un plombier qualifié en quelques minutes. La réservation était simple et le service impeccable.',
        rating: 5,
      },
      {
        name: 'Jean Martin',
        role: 'Entrepreneur',
        content: 'Pro En Poche m\'a permis de développer mon activité de rénovation. Les clients sont sérieux et le paiement est sécurisé.',
        rating: 5,
      },
      {
        name: 'Sophie Tremblay',
        role: 'Gestionnaire',
        content: 'Plateforme très professionnelle. J\'ai réservé plusieurs services et je n\'ai jamais été déçue. Je recommande vivement!',
        rating: 5,
      },
    ],
  },
  becomeProvider: {
    title: 'Devenez Prestataire',
    subtitle: 'Développez votre activité avec Pro En Poche',
    description: 'Rejoignez notre réseau de professionnels et accédez à des milliers de clients potentiels.',
    buttonText: 'Créer mon compte prestataire',
    benefits: [
      {
        title: 'Visibilité Accrue',
        description: 'Soyez visible auprès de milliers de clients potentiels.',
      },
      {
        title: 'Gestion Simplifiée',
        description: 'Gérez vos réservations et paiements en un seul endroit.',
      },
      {
        title: 'Paiement Sécurisé',
        description: 'Recevez vos paiements rapidement et en toute sécurité.',
      },
      {
        title: 'Support Dédié',
        description: 'Bénéficiez d\'un accompagnement personnalisé.',
      },
    ],
  },
  faq: {
    title: 'Questions Fréquentes',
    subtitle: 'Trouvez rapidement les réponses à vos questions',
    items: [
      {
        question: 'Comment réserver un service?',
        answer: 'Pour réserver un service, parcourez les profils des prestataires, sélectionnez celui qui vous convient, choisissez une date et complétez le paiement. Votre réservation sera confirmée instantanément.',
      },
      {
        question: 'Comment fonctionne le paiement?',
        answer: 'Le paiement est effectué lors de la réservation et conservé en garantie. Une fois le service terminé et validé, le paiement est libéré au prestataire.',
      },
      {
        question: 'Puis-je annuler une réservation?',
        answer: 'Oui, vous pouvez annuler une réservation selon les conditions d\'annulation du prestataire. Les remboursements sont traités rapidement.',
      },
      {
        question: 'Comment devenir prestataire?',
        answer: 'Créez un compte prestataire, complétez votre profil avec vos qualifications, choisissez un plan d\'abonnement et commencez à recevoir des demandes de clients.',
      },
      {
        question: 'Les prestataires sont-ils vérifiés?',
        answer: 'Oui, tous les prestataires passent par un processus de vérification incluant la validation des documents professionnels et des références.',
      },
    ],
  },
  footer: {
    description: 'Pro En Poche - Votre plateforme de confiance pour trouver des professionnels qualifiés partout au Canada.',
    copyright: '© 2024 Pro En Poche. Tous droits réservés.',
  },
}
