import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function FAQSection() {
  const faqs = [
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
    {
      question: 'Comment puis-je contacter un prestataire ?',
      answer: 'Une fois votre réservation confirmée, vous pouvez contacter le prestataire directement via les informations de contact fournies dans votre tableau de bord.',
    },
    {
      question: 'Quels sont les avantages des différents plans tarifaires ?',
      answer: 'Le plan Basic permet de créer jusqu\'à 5 annonces, le plan Premium jusqu\'à 20 annonces avec mise en avant prioritaire, et le plan Enterprise offre des annonces illimitées avec support prioritaire et outils d\'analyse avancés.',
    },
    {
      question: 'Comment fonctionne le système d\'avis ?',
      answer: 'Après chaque prestation, les clients peuvent laisser un avis et une note sur 5 étoiles. Ces avis permettent aux autres utilisateurs de choisir les meilleurs prestataires et aident les professionnels à améliorer leurs services.',
    },
  ]

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
                Foire aux Questions
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Trouvez rapidement des réponses à vos questions. Notre équipe est également disponible pour vous accompagner.
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
                  <span className="font-semibold text-base">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
