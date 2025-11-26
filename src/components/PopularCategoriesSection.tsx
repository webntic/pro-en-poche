import { Card } from '@/components/ui/card'
import { ArrowRight } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

export function PopularCategoriesSection() {
  const categories = [
    {
      title: 'Plomberie',
      description: 'Réparations et installations professionnelles',
      image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&q=80',
      providers: 45,
    },
    {
      title: 'Électricité',
      description: 'Services électriques certifiés et sécurisés',
      image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80',
      providers: 38,
    },
    {
      title: 'Jardinage',
      description: 'Entretien professionnel de vos espaces verts',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
      providers: 52,
    },
    {
      title: 'Ménage',
      description: 'Services de nettoyage pour votre domicile',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
      providers: 67,
    },
    {
      title: 'Rénovation',
      description: 'Experts en rénovation et transformation',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&q=80',
      providers: 41,
    },
    {
      title: 'Déménagement',
      description: 'Déménagez en toute tranquillité',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
      providers: 29,
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight premium-text-gradient">
              Catégories Populaires
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos services les plus demandés avec des professionnels qualifiés prêts à intervenir
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="premium-card group cursor-pointer overflow-hidden border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {category.title}
                    </h3>
                    <p className="text-sm text-white/90">
                      {category.providers} prestataires disponibles
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="group/btn p-0 h-auto font-medium text-primary hover:text-primary/80 hover:bg-transparent"
                  >
                    Explorer les services
                    <ArrowRight
                      size={16}
                      className="ml-1 group-hover/btn:translate-x-1 transition-transform"
                    />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
