import { CheckCircle, Lightning, ShieldCheck, CurrencyDollar } from '@phosphor-icons/react'
import { Card, CardContent } from '@/components/ui/card'

export function WhyChooseUsSection() {
  const features = [
    {
      icon: CurrencyDollar,
      title: 'Tarifs clairs et transparents',
      description: 'Consultez nos offres et nos prix en toute transparence.',
    },
    {
      icon: CheckCircle,
      title: 'Services à portée de clic',
      description: 'Trouvez rapidement le service dont vous avez besoin et réservez-le en quelques clics',
    },
    {
      icon: ShieldCheck,
      title: 'Fiabilité & Confiance',
      description: 'Chaque prestataire est sélectionné avec soin pour vous garantir des services fiables',
    },
    {
      icon: Lightning,
      title: 'Interventions rapides et efficaces',
      description: 'Réactivité et efficacité à chaque demande',
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 premium-text-gradient">
            Pourquoi nous choisir ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choisir nos services, c'est opter pour une équipe sérieuse, réactive et toujours prête à vous accompagner.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="premium-card border-border/50 hover:shadow-2xl transition-all group">
                <CardContent className="pt-8 pb-6">
                  <div className="flex flex-col items-center text-center space-y-5">
                    <div className="p-4 rounded-2xl premium-gradient shadow-lg group-hover:scale-110 transition-transform">
                      <Icon size={40} className="text-primary-foreground" weight="duotone" />
                    </div>
                    <h3 className="font-bold text-xl">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
