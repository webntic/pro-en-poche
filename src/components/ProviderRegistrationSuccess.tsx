import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle, EnvelopeSimple, Clock, ShieldCheck } from '@phosphor-icons/react'
import logoImage from '@/assets/images/logo.svg'

interface ProviderRegistrationSuccessProps {
  providerName: string
  providerEmail: string
  onClose: () => void
  logo?: string
}

export function ProviderRegistrationSuccess({ 
  providerName, 
  providerEmail, 
  onClose,
  logo 
}: ProviderRegistrationSuccessProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <button 
            onClick={onClose}
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <img src={logo || logoImage} alt="Pro En Poche" className="h-12 w-auto" />
          </button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <Card className="p-8 md:p-12 shadow-lg">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="h-20 w-20 rounded-full bg-secondary/20 flex items-center justify-center">
                <CheckCircle size={48} className="text-secondary" weight="fill" />
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl font-bold">
                  Demande reçue avec succès!
                </h1>
                <p className="text-xl text-muted-foreground">
                  Merci {providerName} pour votre inscription
                </p>
              </div>

              <Card className="p-6 bg-muted/50 w-full text-left space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Étape suivante</h3>
                    <p className="text-muted-foreground">
                      Un de nos conseillers va vérifier votre dossier sous peu. Cette vérification nous permet de garantir la qualité et la sécurité de notre plateforme.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <EnvelopeSimple size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Notification par email</h3>
                    <p className="text-muted-foreground">
                      Vous serez prévenu par email à <strong className="text-foreground">{providerEmail}</strong> dès l'activation de votre compte.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Délai de traitement</h3>
                    <p className="text-muted-foreground">
                      Le processus de vérification prend généralement entre 24 et 48 heures. Nous examinerons vos documents et vérifierons vos informations.
                    </p>
                  </div>
                </div>
              </Card>

              <div className="w-full space-y-3 pt-4">
                <Button onClick={onClose} className="w-full h-12 text-base" size="lg">
                  Retour à l'accueil
                </Button>
                <p className="text-sm text-muted-foreground">
                  Une question? Contactez notre support à support@proenpoche.ca
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
