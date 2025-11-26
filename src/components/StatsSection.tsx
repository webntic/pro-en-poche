import { Card } from '@/components/ui/card'
import { Users, Briefcase, Star, MapPin } from '@phosphor-icons/react'

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: '10,000+',
      label: 'Clients satisfaits',
      description: 'Des milliers de clients font confiance à nos services',
    },
    {
      icon: Briefcase,
      value: '500+',
      label: 'Professionnels vérifiés',
      description: 'Une équipe de prestataires qualifiés et certifiés',
    },
    {
      icon: Star,
      value: '4.8/5',
      label: 'Note moyenne',
      description: 'Basée sur plus de 15,000 avis clients',
    },
    {
      icon: MapPin,
      value: '50+',
      label: 'Villes desservies',
      description: 'Partout au Québec et au Canada',
    },
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight premium-text-gradient">
                ProEnPoche en chiffres
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Une plateforme qui connecte des milliers de clients avec les meilleurs professionnels. 
                Rejoignez notre communauté grandissante de clients et prestataires satisfaits.
              </p>
            </div>
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                alt="Équipe collaborative de professionnels"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card
                  key={index}
                  className="premium-card p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 group"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-2xl premium-gradient flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Icon size={32} className="text-primary-foreground" weight="duotone" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-2 premium-text-gradient">
                    {stat.value}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {stat.description}
                  </p>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
