import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { InlineEditor } from '@/components/InlineEditor'
import { SiteContent } from '@/lib/types'

interface FAQSectionProps {
  content?: SiteContent['faq']
  onUpdateContent?: (path: string[], value: string) => void
  editMode?: boolean
}

export function FAQSection({ content, onUpdateContent, editMode = false }: FAQSectionProps) {
  const defaultFaqs = [
    {
      question: 'Comment puis-je réserver un service ?',
      answer: 'Pour réserver un service, il vous suffit de créer un compte client, de parcourir les prestataires disponibles, et de cliquer sur "Réserver" sur la fiche du professionnel de votre choix. Vous pourrez ensuite choisir la date et l\'heure qui vous conviennent.',
    },
    {
      question: 'Comment fonctionne le système de paiement ?',
      answer: 'Le paiement est conservé en garantie lors de la réservation. Une fois le service terminé, vous devez confirmer la réalisation et laisser un avis. Le paiement est alors libéré au prestataire. Ce système protège à la fois les clients et les prestataires.',
    },
    {
      question: 'Comment devenir prestataire sur la plateforme ?',
      answer: 'Pour devenir prestataire, créez un compte prestataire et souscrivez à l\'un de nos plans tarifaires (Basic, Premium ou Enterprise). Votre profil sera vérifié par nos administrateurs avant d\'être publié sur la plateforme.',
    },
    {
      question: 'Les prestataires sont-ils vérifiés ?',
      answer: 'Oui, tous les prestataires sont vérifiés par notre équipe avant d\'être publiés sur la plateforme. Nous vérifions leurs qualifications, leur expérience et leur fiabilité pour garantir la meilleure qualité de service.',
    },
    {
      question: 'Puis-je annuler une réservation ?',
      answer: 'Les modalités d\'annulation dépendent du prestataire choisi. Nous vous recommandons de contacter directement le prestataire en cas de besoin d\'annulation. Pour toute question, notre support est disponible pour vous accompagner.',
    },
  ]

  const faqContent = content || { title: 'Foire aux Questions', subtitle: 'Trouvez rapidement des réponses à vos questions', items: defaultFaqs }
  const faqs = faqContent.items || defaultFaqs

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=80"
                alt="Questions et assistance client"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight premium-text-gradient">
                {onUpdateContent && editMode ? (
                  <InlineEditor
                    value={faqContent.title}
                    onSave={(value) => onUpdateContent(['faq', 'title'], value)}
                    className="text-4xl md:text-5xl font-bold premium-text-gradient"
                    editMode={editMode}
                  />
                ) : (
                  faqContent.title
                )}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {onUpdateContent && editMode ? (
                  <InlineEditor
                    value={faqContent.subtitle}
                    onSave={(value) => onUpdateContent(['faq', 'subtitle'], value)}
                    multiline
                    className="text-xl text-muted-foreground"
                    editMode={editMode}
                  />
                ) : (
                  faqContent.subtitle
                )}
              </p>
            </div>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-2 border-border rounded-xl px-6 bg-card premium-card"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5 hover:text-primary transition-colors">
                  <span className="font-semibold text-base">
                    {onUpdateContent && editMode ? (
                      <InlineEditor
                        value={faq.question}
                        onSave={(value) => {
                          const newItems = [...faqs]
                          newItems[index] = { ...newItems[index], question: value }
                          onUpdateContent(['faq', 'items'], JSON.stringify(newItems))
                        }}
                        className="font-semibold text-base"
                        editMode={editMode}
                      />
                    ) : (
                      faq.question
                    )}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {onUpdateContent && editMode ? (
                    <InlineEditor
                      value={faq.answer}
                      onSave={(value) => {
                        const newItems = [...faqs]
                        newItems[index] = { ...newItems[index], answer: value }
                        onUpdateContent(['faq', 'items'], JSON.stringify(newItems))
                      }}
                      multiline
                      className="text-muted-foreground"
                      editMode={editMode}
                    />
                  ) : (
                    faq.answer
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
