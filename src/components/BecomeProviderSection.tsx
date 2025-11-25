import { Card, CardContent } from '@/components/ui/card'
import { UserPlus, CheckCircle, Briefcase } from '@phosphor-icons/react'

export function BecomeProviderSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Devenir Prestataire</h2>
          <p className="text-lg text-muted-foreground">Comment Commencer?</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-8 pb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                <UserPlus size={32} weight="duotone" />
              </div>
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold mb-3">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Créez votre profil</h3>
              <p className="text-muted-foreground">
                Renseignez vos informations, services et tarifs
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-8 pb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 text-secondary mb-6">
                <CheckCircle size={32} weight="duotone" />
              </div>
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold mb-3">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Validez votre compte</h3>
              <p className="text-muted-foreground">
                Vérifiez votre identité et vos qualifications
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-8 pb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-6">
                <Briefcase size={32} weight="duotone" />
              </div>
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold mb-3">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Recevez des demandes</h3>
              <p className="text-muted-foreground">
                Commencez à recevoir et accepter des missions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
