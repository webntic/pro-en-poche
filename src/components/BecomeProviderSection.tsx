import { Card, CardContent } from '@/components/ui/card'
import { UserPlus, CheckCircle, Briefcase } from '@phosphor-icons/react'

export function BecomeProviderSection() {
  return (
    <section className="py-20 bg-gradient-to-t from-muted/40 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold premium-text-gradient">Devenir Prestataire</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Rejoignez notre réseau de professionnels et développez votre activité. 
                Des milliers de clients recherchent vos services chaque jour.
              </p>
            </div>
            <div className="relative h-[350px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80"
                alt="Équipe de professionnels collaborant"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <Card className="premium-card text-center hover:shadow-2xl transition-all group border-2">
              <CardContent className="pt-10 pb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl premium-gradient text-primary-foreground mb-8 shadow-lg group-hover:scale-110 transition-transform">
                  <UserPlus size={40} weight="duotone" />
                </div>
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-lg font-bold mb-4 ring-2 ring-primary/20">
                    1
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Créez votre profil</h3>
                <p className="text-muted-foreground text-base">
                  Renseignez vos informations, services et tarifs
                </p>
              </CardContent>
            </Card>

            <Card className="premium-card text-center hover:shadow-2xl transition-all group border-2 md:scale-105">
              <CardContent className="pt-10 pb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl premium-gradient text-secondary-foreground mb-8 shadow-lg group-hover:scale-110 transition-transform">
                  <CheckCircle size={40} weight="duotone" />
                </div>
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-lg font-bold mb-4 ring-2 ring-primary/20">
                    2
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Validez votre compte</h3>
                <p className="text-muted-foreground text-base">
                  Vérifiez votre identité et vos qualifications
                </p>
              </CardContent>
            </Card>

            <Card className="premium-card text-center hover:shadow-2xl transition-all group border-2">
              <CardContent className="pt-10 pb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl premium-gradient text-accent-foreground mb-8 shadow-lg group-hover:scale-110 transition-transform">
                  <Briefcase size={40} weight="duotone" />
                </div>
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-lg font-bold mb-4 ring-2 ring-primary/20">
                    3
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Recevez des demandes</h3>
                <p className="text-muted-foreground text-base">
                  Commencez à recevoir et accepter des missions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
