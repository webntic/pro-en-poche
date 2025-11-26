import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'

interface PricingSectionProps {
  onBuyPlan?: (planName: string) => void
}

export function PricingSection({ onBuyPlan }: PricingSectionProps) {
  const plans = [
    {
      name: 'ESSENTIEL',
      price: null,
      description: 'Parfait pour démarrer',
      features: [
        'Profil prestataire de base',
        '5 services maximum',
        'Support par email',
        'Commission de 15%',
      ],
      featured: false,
    },
    {
      name: 'VIP',
      price: 59,
      description: 'Pour les professionnels actifs',
      features: [
        'Profil prestataire complet',
        '15 services maximum',
        'Badge VIP visible',
        'Support prioritaire',
        'Commission réduite à 10%',
        'Statistiques avancées',
      ],
      featured: true,
    },
    {
      name: 'PREMIUM',
      price: 99,
      description: 'Le meilleur pour votre business',
      features: [
        'Profil prestataire illimité',
        'Services illimités',
        'Badge PREMIUM exclusif',
        'Support téléphonique dédié',
        'Commission réduite à 5%',
        'Outils marketing avancés',
        'Priorité dans les recherches',
        'Accès aux formations exclusives',
      ],
      featured: false,
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-8">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold tracking-tight premium-text-gradient">
                Grille tarifaire
              </h2>
              <p className="text-2xl font-semibold text-foreground">
                Nos packs d'adhésion
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sélectionnez le plan qui correspond le mieux à vos besoins professionnels. 
                Développez votre activité avec les outils adaptés à chaque étape de votre croissance.
              </p>
            </div>
            <div className="relative h-[350px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
                alt="Planification et stratégie professionnelle"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`premium-card relative flex flex-col transition-all duration-300 hover:shadow-2xl ${
                  plan.featured
                    ? 'border-primary border-2 shadow-xl scale-105 hover:scale-110'
                    : 'border-border/50'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <Badge className="premium-gradient text-primary-foreground px-6 py-2 text-sm shadow-lg">
                      ⭐ Populaire
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-3xl font-bold mb-2 text-foreground">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-6">
                    {plan.price ? (
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-6xl font-bold premium-text-gradient">
                          ${plan.price}
                        </span>
                        <span className="text-lg text-muted-foreground font-medium">/mois</span>
                      </div>
                    ) : (
                      <div className="text-5xl font-bold premium-text-gradient">
                        Gratuit
                      </div>
                    )}
                  </div>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check
                        size={22}
                        weight="bold"
                        className="text-primary flex-shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-foreground font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-6">
                <Button
                  className={`w-full ${plan.featured ? 'premium-gradient shadow-lg hover:shadow-xl' : ''}`}
                  variant={plan.featured ? 'default' : 'outline'}
                  size="lg"
                  onClick={() => onBuyPlan?.(plan.name)}
                >
                  {plan.price ? 'Souscrire' : 'Commencer gratuitement'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
