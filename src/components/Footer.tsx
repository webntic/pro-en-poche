import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { EnvelopeSimple, Question, Phone, MapPin } from '@phosphor-icons/react'

interface FooterProps {
  onNavigate: (section: 'faq') => void
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-border/50 premium-header mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contactez-nous</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <EnvelopeSimple size={20} className="text-primary flex-shrink-0 mt-0.5" weight="duotone" />
                <div>
                  <p className="font-medium mb-1">Email</p>
                  <a href="mailto:contact@proenpoche.ca" className="text-muted-foreground hover:text-primary transition-colors">
                    contact@proenpoche.ca
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone size={20} className="text-primary flex-shrink-0 mt-0.5" weight="duotone" />
                <div>
                  <p className="font-medium mb-1">Téléphone</p>
                  <a href="tel:1-800-PRO-POCHE" className="text-muted-foreground hover:text-primary transition-colors">
                    1-800-PRO-POCHE
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-primary flex-shrink-0 mt-0.5" weight="duotone" />
                <div>
                  <p className="font-medium mb-1">Adresse</p>
                  <p className="text-muted-foreground">
                    Montréal, QC, Canada
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <p className="text-sm text-muted-foreground">
              Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans vos démarches.
            </p>
            <p className="text-sm text-muted-foreground">
              Consultez notre FAQ pour trouver rapidement des réponses aux questions les plus fréquentes.
            </p>
            <Button 
              onClick={() => onNavigate('faq')} 
              variant="outline" 
              className="gap-2"
            >
              <Question size={18} />
              Voir la FAQ
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">À propos</h3>
            <p className="text-sm text-muted-foreground">
              Pro En Poche est la plateforme qui connecte les professionnels de services avec les clients partout au Canada.
            </p>
            <p className="text-sm text-muted-foreground">
              Une solution fiable, sécurisée et transparente pour tous vos besoins en services professionnels.
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Pro En Poche. Tous droits réservés.
          </p>
          <p>
            Créé par{' '}
            <a 
              href="https://www.webntic.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              webntic
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
