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
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-3">
            Grille tarifaire
          </h2>
          <p className="text-xl text-muted-foreground mb-2">
            Nos packs d'adhésion
          </p>
          <p className="text-lg text-muted-foreground">
            Sélectionnez le plan qui correspond le mieux à vos besoins professionnels
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col transition-all duration-300 hover:shadow-lg ${
                plan.featured
                  ? 'border-primary shadow-md scale-105'
                  : 'border-border'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm">
                    Populaire
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold mb-2">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  {plan.price ? (
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold text-foreground">
                        ${plan.price}
                      </span>
                      <span className="text-muted-foreground">/mois</span>
                    </div>
                  ) : (
                    <div className="text-4xl font-bold text-foreground">
                      Gratuit
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check
                        size={20}
                        weight="bold"
                        className="text-secondary flex-shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.featured ? 'default' : 'outline'}
                  size="lg"
                  onClick={() => onBuyPlan?.(plan.name)}
                >
                  Buy Plan
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
