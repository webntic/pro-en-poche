import { Card } from '@/components/ui/card'
import { CheckCircle } from '@phosphor-icons/react'

export function AboutSection() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">À Propos de Pro En Poche</h1>
          <p className="text-xl text-muted-foreground">
            Votre marketplace de confiance pour les services professionnels au Canada
          </p>
        </div>

        <Card className="p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-3">Notre Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                Pro En Poche a été créé pour faciliter la connexion entre les clients et les professionnels 
                qualifiés partout au Canada. Nous croyons que trouver un service de qualité ne devrait jamais 
                être compliqué ou risqué.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Nos Avantages</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Professionnels Vérifiés',
                    description: 'Tous nos prestataires sont vérifiés et approuvés par notre équipe',
                  },
                  {
                    title: 'Paiement Sécurisé',
                    description: 'Système de paiement en garantie pour votre protection',
                  },
                  {
                    title: 'Avis Authentiques',
                    description: 'Système de notation transparent basé sur des avis réels',
                  },
                  {
                    title: 'Support Client',
                    description: 'Assistance disponible pour vous accompagner',
                  },
                ].map((advantage, index) => (
                  <div key={index} className="flex gap-3">
                    <CheckCircle size={24} className="text-primary flex-shrink-0 mt-1" weight="fill" />
                    <div>
                      <h3 className="font-semibold mb-1">{advantage.title}</h3>
                      <p className="text-sm text-muted-foreground">{advantage.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Comment ça marche ?</h2>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold">Recherchez un service</h3>
                    <p className="text-sm text-muted-foreground">
                      Parcourez notre catalogue de professionnels qualifiés
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold">Réservez en toute sécurité</h3>
                    <p className="text-sm text-muted-foreground">
                      Votre paiement est conservé en garantie jusqu'à la fin du service
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold">Laissez un avis</h3>
                    <p className="text-sm text-muted-foreground">
                      Partagez votre expérience pour aider la communauté
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
