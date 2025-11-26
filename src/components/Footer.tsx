import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { EnvelopeSimple, Question } from '@phosphor-icons/react'

interface FooterProps {
  onNavigate: (section: 'contact' | 'faq') => void
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contactez le support</h3>
            <p className="text-sm text-muted-foreground">
              Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans vos démarches.
            </p>
            <Button 
              onClick={() => onNavigate('contact')} 
              className="gap-2"
            >
              <EnvelopeSimple size={18} />
              Nous contacter
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Foires aux questions</h3>
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
