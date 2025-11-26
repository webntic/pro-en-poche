import { Card } from '@/components/ui/card'
import { Star, Quotes } from '@phosphor-icons/react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Marie Leclerc',
      role: 'Cliente depuis 2023',
      avatar: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      comment: 'Service exceptionnel ! J\'ai trouvé un excellent plombier en quelques minutes. La plateforme est intuitive et les professionnels sont vraiment compétents.',
      service: 'Plomberie',
    },
    {
      name: 'François Tremblay',
      role: 'Client depuis 2024',
      avatar: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      comment: 'ProEnPoche m\'a sauvé la vie lors de mon déménagement. Les déménageurs étaient professionnels, rapides et très soigneux avec mes affaires.',
      service: 'Déménagement',
    },
    {
      name: 'Sophie Gagnon',
      role: 'Cliente depuis 2023',
      avatar: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      comment: 'La qualité des prestataires est remarquable. J\'ai fait appel à plusieurs services et je n\'ai jamais été déçue. Je recommande vivement !',
      service: 'Ménage',
    },
    {
      name: 'David Côté',
      role: 'Client depuis 2024',
      avatar: 'https://i.pravatar.cc/150?img=13',
      rating: 5,
      comment: 'Système de réservation simple et paiement sécurisé. J\'apprécie particulièrement le système d\'avis qui permet de choisir en toute confiance.',
      service: 'Électricité',
    },
    {
      name: 'Isabelle Roy',
      role: 'Cliente depuis 2023',
      avatar: 'https://i.pravatar.cc/150?img=9',
      rating: 5,
      comment: 'J\'utilise ProEnPoche régulièrement pour l\'entretien de ma maison. Les prestataires sont fiables et le service client est toujours réactif.',
      service: 'Jardinage',
    },
    {
      name: 'Marc Pelletier',
      role: 'Client depuis 2024',
      avatar: 'https://i.pravatar.cc/150?img=14',
      rating: 5,
      comment: 'En tant que propriétaire, j\'ai besoin de différents services régulièrement. ProEnPoche centralise tout et me fait gagner un temps précieux.',
      service: 'Rénovation',
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight premium-text-gradient">
              Ce que disent nos clients
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Des milliers de clients satisfaits font confiance à ProEnPoche pour leurs services à domicile
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="premium-card p-6 border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative"
              >
                <div className="absolute top-4 right-4 text-primary/20">
                  <Quotes size={48} weight="fill" />
                </div>
                
                <div className="flex items-start gap-4 mb-4 relative z-10">
                  <Avatar className="h-14 w-14 ring-2 ring-primary/10">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="text-sm font-semibold bg-primary/10 text-primary">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={18} weight="fill" className="text-accent" />
                  ))}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {testimonial.comment}
                </p>

                <div className="pt-3 border-t border-border/50">
                  <span className="text-xs font-medium text-primary">
                    Service: {testimonial.service}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
