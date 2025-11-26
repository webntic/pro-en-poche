import { CheckCircle, Lightning, ShieldCheck, CurrencyDollar } from '@phosphor-icons/react'
import { Card, CardContent } from '@/components/ui/card'
import { InlineEditor } from '@/components/InlineEditor'

interface WhyChooseUsSectionProps {
  content?: {
    title: string
    subtitle: string
    reasons: Array<{
      title: string
      description: string
    }>
  }
  onUpdateContent?: (path: string[], value: string) => void
  editMode?: boolean
}

export function WhyChooseUsSection({ content, onUpdateContent, editMode }: WhyChooseUsSectionProps) {
  const defaultFeatures = [
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

  const features = content?.reasons || defaultFeatures
  const title = content?.title || 'Pourquoi nous choisir ?'
  const subtitle = content?.subtitle || 'Choisir nos services, c\'est opter pour une équipe sérieuse, réactive et toujours prête à vous accompagner.'

  const handleUpdateReason = (index: number, field: 'title' | 'description', value: string) => {
    if (!onUpdateContent || !content) return
    const updatedReasons = [...features]
    updatedReasons[index] = { ...updatedReasons[index], [field]: value }
    onUpdateContent(['whyChooseUs', 'reasons'], JSON.stringify(updatedReasons))
  }

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 premium-text-gradient">
            <InlineEditor
              value={title}
              onSave={(value) => onUpdateContent?.(['whyChooseUs', 'title'], value)}
              className="text-4xl md:text-5xl font-bold tracking-tight premium-text-gradient"
              editMode={editMode}
            />
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            <InlineEditor
              value={subtitle}
              onSave={(value) => onUpdateContent?.(['whyChooseUs', 'subtitle'], value)}
              className="text-xl text-muted-foreground"
              editMode={editMode}
              multiline
            />
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const iconMap = [CurrencyDollar, CheckCircle, ShieldCheck, Lightning]
            const Icon = iconMap[index % 4]
            return (
              <Card key={index} className="premium-card border-border/50 hover:shadow-2xl transition-all group">
                <CardContent className="pt-8 pb-6">
                  <div className="flex flex-col items-center text-center space-y-5">
                    <div className="p-4 rounded-2xl premium-gradient shadow-lg group-hover:scale-110 transition-transform">
                      <Icon size={40} className="text-primary-foreground" weight="duotone" />
                    </div>
                    <h3 className="font-bold text-xl">
                      <InlineEditor
                        value={feature.title}
                        onSave={(value) => handleUpdateReason(index, 'title', value)}
                        className="font-bold text-xl"
                        editMode={editMode}
                      />
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <InlineEditor
                        value={feature.description}
                        onSave={(value) => handleUpdateReason(index, 'description', value)}
                        className="text-sm text-muted-foreground"
                        editMode={editMode}
                        multiline
                      />
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
