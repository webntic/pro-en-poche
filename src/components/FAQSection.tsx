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
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Foire aux Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Trouvez rapidement des réponses à vos questions
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
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
