import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { EnvelopeSimple, Question, Phone, FacebookLogo, InstagramLogo, Image } from '@phosphor-icons/react'
import logoImage from '@/assets/images/logo.svg'
import { InlineEditor } from '@/components/InlineEditor'

interface FooterProps {
  onNavigate: (section: 'faq') => void
  aboutImage?: string
  footerDescription?: string
  onUpdateContent?: (path: string[], value: string) => void
  editMode?: boolean
  logo?: string
}

export function Footer({ onNavigate, aboutImage, footerDescription, onUpdateContent, editMode, logo }: FooterProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && onUpdateContent) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onUpdateContent(['footer', 'aboutImage'], reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <footer className="border-t border-border/30 premium-header mt-auto">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-5">
            <h3 className="text-lg font-semibold tracking-tight">Contactez-nous</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3.5 group">
                <EnvelopeSimple size={22} className="text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" weight="duotone" />
                <div>
                  <p className="font-semibold mb-1.5 text-foreground/80">Email</p>
                  <a href="mailto:contact@proenpoche.ca" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                    contact@proenpoche.ca
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3.5 group">
                <Phone size={22} className="text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" weight="duotone" />
                <div>
                  <p className="font-semibold mb-1.5 text-foreground/80">Téléphone</p>
                  <a href="tel:+14508093831" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                    +1 450 809-3831
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3.5 group">
                <FacebookLogo size={22} className="text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" weight="duotone" />
                <div>
                  <p className="font-semibold mb-1.5 text-foreground/80">Facebook</p>
                  <a 
                    href="https://www.facebook.com/ProenPoche" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    @ProenPoche
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3.5 group">
                <InstagramLogo size={22} className="text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" weight="duotone" />
                <div>
                  <p className="font-semibold mb-1.5 text-foreground/80">Instagram</p>
                  <a 
                    href="https://www.instagram.com/proenpoche" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    @proenpoche
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-lg font-semibold tracking-tight">Support</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans vos démarches.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Consultez notre FAQ pour trouver rapidement des réponses aux questions les plus fréquentes.
            </p>
            <Button 
              onClick={() => onNavigate('faq')} 
              variant="outline" 
              className="gap-2.5 mt-2 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300"
            >
              <Question size={18} weight="duotone" />
              Voir la FAQ
            </Button>
          </div>

          <div className="space-y-5">
            {aboutImage && (
              <div className="mb-4 relative group">
                <img 
                  src={aboutImage} 
                  alt="À propos de Pro En Poche" 
                  className="w-full h-32 object-cover rounded-lg shadow-md"
                />
                {editMode && onUpdateContent && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <div className="flex items-center gap-2 text-white px-4 py-2 bg-primary rounded-lg hover:bg-primary/90">
                        <Image size={20} weight="duotone" />
                        <span className="text-sm font-medium">Changer l'image</span>
                      </div>
                    </label>
                  </div>
                )}
              </div>
            )}
            
            {editMode && !aboutImage && onUpdateContent && (
              <div className="mb-4">
                <label className="cursor-pointer block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 hover:border-primary/60 transition-colors flex flex-col items-center justify-center text-center">
                    <Image size={32} weight="duotone" className="text-primary mb-2" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Ajouter une image
                    </span>
                  </div>
                </label>
              </div>
            )}

            <img src={logo || logoImage} alt="Pro En Poche" className="h-11 w-auto mb-3" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <InlineEditor
                value={footerDescription || 'Pro En Poche est la plateforme qui connecte les professionnels de services avec les clients partout au Canada.'}
                onSave={(value) => onUpdateContent?.(['footer', 'description'], value)}
                className="text-sm text-muted-foreground"
                editMode={editMode}
                multiline
              />
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Une solution fiable, sécurisée et transparente pour tous vos besoins en services professionnels.
            </p>
            <div className="flex items-center gap-4 pt-3">
              <a
                href="https://www.facebook.com/ProenPoche"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label="Suivez-nous sur Facebook"
              >
                <FacebookLogo size={32} weight="fill" />
              </a>
              <a
                href="https://www.instagram.com/proenpoche"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label="Suivez-nous sur Instagram"
              >
                <InstagramLogo size={32} weight="fill" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-border/40" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="tracking-tight">
            © {new Date().getFullYear()} Pro En Poche. Tous droits réservés.
          </p>
          <p className="tracking-tight">
            Créé par{' '}
            <a 
              href="https://www.webntic.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold transition-colors duration-300"
            >
              webntic
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
