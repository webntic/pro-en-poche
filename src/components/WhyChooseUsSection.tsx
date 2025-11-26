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
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Pourquoi nous choisir ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choisir nos services, c'est opter pour une équipe sérieuse, réactive et toujours prête à vous accompagner.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Icon size={32} className="text-primary" weight="duotone" />
                    </div>
                    <h3 className="font-semibold text-lg">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
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
