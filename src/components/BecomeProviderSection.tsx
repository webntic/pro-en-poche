import { Card, CardContent } from '@/components/ui/card'
import { UserPlus, CheckCircle, Briefcase } from '@phosphor-icons/react'

export function BecomeProviderSection() {
  return (
    <section className="py-20 bg-gradient-to-t from-muted/40 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 tracking-tight">
            Rejoignez notre réseau de professionnels
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Développez votre activité en rejoignant la plateforme de services la plus innovante
          </p>
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
              <h3 className="text-2xl font-bold mb-4">Validation rapide</h3>
              <p className="text-muted-foreground text-base">
                Votre profil est vérifié sous 24h par notre équipe
              </p>
            </CardContent>
          </Card>

          <Card className="premium-card text-center hover:shadow-2xl transition-all group border-2">
            <CardContent className="pt-10 pb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl premium-gradient text-primary-foreground mb-8 shadow-lg group-hover:scale-110 transition-transform">
                <Briefcase size={40} weight="duotone" />
              </div>
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-lg font-bold mb-4 ring-2 ring-primary/20">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Commencez à travailler</h3>
              <p className="text-muted-foreground text-base">
                Recevez des demandes et développez votre clientèle
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
