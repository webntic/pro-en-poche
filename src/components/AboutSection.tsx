import { Card } from '@/components/ui/card'
import { CheckCircle, Wrench, Shield, Clock, Heart, Question } from '@phosphor-icons/react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { InlineEditor } from '@/components/InlineEditor'
import { SiteContent } from '@/lib/types'

interface AboutSectionProps {
  content?: SiteContent['about']
  onUpdateContent?: (path: string[], value: string) => void
  editMode?: boolean
}

export function AboutSection({ content, onUpdateContent, editMode = false }: AboutSectionProps) {
  const defaultContent = {
    title: 'Votre solution maison tout-en-un',
    description: 'De la petite réparation aux gros travaux, trouvez le bon professionnel en quelques clics. Grâce à ProenPoche, mettez-vous en relation avec des prestataires qualifiés.',
    features: [
      {
        title: 'Experts vérifiés et assurés',
        description: 'Tous nos prestataires sont rigoureusement contrôlés et possèdent les assurances nécessaires',
      },
      {
        title: 'Des années d\'expérience',
        description: 'Des professionnels expérimentés avec un savoir-faire reconnu dans leur domaine',
      },
      {
        title: 'Engagés pour la qualité',
        description: 'Un engagement fort pour vous offrir des prestations de qualité supérieure',
      },
      {
        title: 'Satisfaire nos clients',
        description: 'Votre satisfaction est notre priorité absolue, nous nous engageons à vous offrir le meilleur service',
      },
    ],
  }

  const sectionContent = content || defaultContent
  const icons = [Shield, Clock, CheckCircle, Heart]

  return (
    <div className="bg-background">
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h1 className="text-6xl font-bold tracking-tight leading-tight premium-text-gradient">
                  {onUpdateContent && editMode ? (
                    <InlineEditor
                      value={sectionContent.title}
                      onSave={(value) => onUpdateContent(['about', 'title'], value)}
                      className="text-6xl font-bold tracking-tight premium-text-gradient"
                      editMode={editMode}
                    />
                  ) : (
                    sectionContent.title
                  )}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {onUpdateContent && editMode ? (
                    <InlineEditor
                      value={sectionContent.description}
                      onSave={(value) => onUpdateContent(['about', 'description'], value)}
                      multiline
                      className="text-xl text-muted-foreground"
                      editMode={editMode}
                    />
                  ) : (
                    sectionContent.description
                  )}
                </p>
              </div>
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-primary/20">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                  alt="Équipe de professionnels"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sectionContent.features.map((feature, index) => {
                const Icon = icons[index]
                return (
                  <Card key={index} className="premium-card p-8 text-center space-y-6">
                    <div className="flex justify-center">
                      <div className="h-16 w-16 rounded-2xl premium-gradient flex items-center justify-center shadow-lg">
                        <Icon size={32} weight="duotone" className="text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {onUpdateContent && editMode ? (
                        <InlineEditor
                          value={feature.title}
                          onSave={(value) => {
                            const newFeatures = [...sectionContent.features]
                            newFeatures[index] = { ...newFeatures[index], title: value }
                            onUpdateContent(['about', 'features'], JSON.stringify(newFeatures))
                          }}
                          className="text-xl font-semibold"
                          editMode={editMode}
                        />
                      ) : (
                        feature.title
                      )}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {onUpdateContent && editMode ? (
                        <InlineEditor
                          value={feature.description}
                          onSave={(value) => {
                            const newFeatures = [...sectionContent.features]
                            newFeatures[index] = { ...newFeatures[index], description: value }
                            onUpdateContent(['about', 'features'], JSON.stringify(newFeatures))
                          }}
                          multiline
                          className="text-muted-foreground"
                          editMode={editMode}
                        />
                      ) : (
                        feature.description
                      )}
                    </p>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
                  alt="Ouvrier professionnel au travail"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                  <Wrench size={20} className="text-primary" weight="duotone" />
                  <span className="text-sm font-semibold text-primary">Notre Expertise</span>
                </div>
                <h2 className="text-4xl font-bold tracking-tight">
                  Des professionnels à votre service
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Chaque prestataire sur ProenPoche est sélectionné avec soin. Nous vérifions leurs qualifications, 
                  leurs assurances et leur réputation avant de les intégrer à notre plateforme.
                </p>
                <div className="space-y-4">
                  {[
                    'Vérification d\'identité et des qualifications',
                    'Contrôle des assurances professionnelles',
                    'Validation des références et expériences',
                    'Suivi continu des performances',
                  ].map((item, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <CheckCircle size={24} className="text-secondary flex-shrink-0" weight="fill" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full">
                  <Question size={20} className="text-accent" weight="duotone" />
                  <span className="text-sm font-semibold text-accent-foreground">Support Client</span>
                </div>
                <h2 className="text-4xl font-bold tracking-tight">
                  Sécurité et tranquillité d'esprit
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Votre satisfaction est notre priorité. Système de paiement sécurisé, support client réactif 
                  et garantie de qualité sur tous les services.
                </p>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1590402494756-2c31f86e47e8?w=800&q=80"
                  alt="Service client professionnel"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">Foire aux questions</h2>
              <p className="text-xl text-muted-foreground">Questions Fréquentes</p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-background rounded-lg px-6 border-2">
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  Comment fonctionne ProenPoche ?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  ProenPoche met en relation des particuliers avec des prestataires de services locaux. 
                  Vous décrivez votre besoin, nous vous proposons des prestataires qualifiés près de chez vous, 
                  et vous choisissez celui qui vous convient le mieux.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-background rounded-lg px-6 border-2">
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  Comment sont vérifiés les prestataires ?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Chaque prestataire passe par un processus de vérification rigoureux incluant la validation 
                  de leur identité, de leurs qualifications professionnelles, de leurs assurances et de leurs 
                  références. Seuls les prestataires approuvés peuvent apparaître sur la plateforme.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-background rounded-lg px-6 border-2">
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  Comment fonctionne le système de prix ?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Chaque prestataire définit ses propres tarifs horaires et forfaits. Les prix sont clairement 
                  affichés sur leur profil. Lors de la réservation, vous payez le montant convenu qui est conservé 
                  en garantie jusqu'à la fin de la prestation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-background rounded-lg px-6 border-2">
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  ProenPoche prend-elle une commission ?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Oui, ProenPoche prélève une commission sur chaque transaction pour maintenir et améliorer la 
                  plateforme. Le taux varie selon le plan d'abonnement du prestataire (entre 5% et 15%). 
                  Les clients ne paient aucun frais supplémentaire.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-background rounded-lg px-6 border-2">
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  Que se passe-t-il si je ne suis pas satisfait ?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Votre satisfaction est notre priorité. Si vous n'êtes pas satisfait d'une prestation, 
                  contactez notre support client dans les 48 heures suivant le service. Nous examinerons 
                  votre cas et trouverons une solution appropriée, incluant potentiellement un remboursement.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-background rounded-lg px-6 border-2">
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  Comment puis-je devenir prestataire ?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  C'est simple ! Créez un compte prestataire, choisissez votre plan d'abonnement, remplissez 
                  votre profil avec vos qualifications et services. Une fois votre compte validé par notre 
                  équipe, vous pourrez commencer à recevoir des demandes de clients.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="bg-background rounded-lg px-6 border-2">
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  Mes données personnelles sont-elles protégées ?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Absolument. Nous prenons la protection de vos données très au sérieux. Toutes les informations 
                  sont cryptées et stockées en toute sécurité. Nous ne partageons jamais vos données personnelles 
                  avec des tiers sans votre consentement explicite.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="bg-background rounded-lg px-6 border-2">
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  Puis-je annuler une réservation ?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Oui, vous pouvez annuler une réservation depuis votre tableau de bord. Les conditions 
                  d'annulation dépendent du délai : annulation gratuite jusqu'à 24h avant la prestation, 
                  des frais peuvent s'appliquer pour les annulations de dernière minute.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-12 text-center">
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-2">
                <h3 className="text-2xl font-bold mb-4">Vous ne trouvez pas la réponse à votre question ?</h3>
                <p className="text-muted-foreground mb-6">
                  Notre équipe de support est là pour vous aider
                </p>
                <Button size="lg" className="gap-2">
                  <Question size={20} weight="duotone" />
                  Contactez le support
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
