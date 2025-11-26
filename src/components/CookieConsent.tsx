import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { X, Cookie } from '@phosphor-icons/react'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

export function CookieConsent() {
  const [cookieConsent, setCookieConsent] = useKV<'accepted' | 'rejected' | null>('cookie-consent', null)
  const [cookiePreferences, setCookiePreferences] = useKV<CookiePreferences>('cookie-preferences', {
    necessary: true,
    analytics: false,
    marketing: false,
  })
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (cookieConsent === null) {
      const timer = setTimeout(() => {
        setShowBanner(true)
        requestAnimationFrame(() => {
          setIsVisible(true)
        })
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [cookieConsent])

  const handleAcceptAll = () => {
    setCookiePreferences((current) => ({
      necessary: true,
      analytics: true,
      marketing: true,
    }))
    setCookieConsent('accepted')
    setIsVisible(false)
    setTimeout(() => setShowBanner(false), 300)
  }

  const handleRejectAll = () => {
    setCookiePreferences((current) => ({
      necessary: true,
      analytics: false,
      marketing: false,
    }))
    setCookieConsent('rejected')
    setIsVisible(false)
    setTimeout(() => setShowBanner(false), 300)
  }

  const handleSavePreferences = () => {
    setCookieConsent('accepted')
    setIsVisible(false)
    setTimeout(() => setShowBanner(false), 300)
  }

  const handlePreferenceChange = (key: keyof CookiePreferences, value: boolean) => {
    setCookiePreferences((current) => ({
      necessary: current?.necessary ?? true,
      analytics: current?.analytics ?? false,
      marketing: current?.marketing ?? false,
      [key]: value,
    }))
  }

  if (!showBanner) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 transition-all duration-500 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <Card className="max-w-6xl mx-auto glass-effect border-2 border-primary/10 shadow-2xl">
        <div className="p-6 md:p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-primary/10 text-primary flex-shrink-0">
              <Cookie size={28} weight="duotone" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3 text-foreground">
                🍪 Politique des Cookies
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
                Les cookies nécessaires sont requis pour le fonctionnement du site, tandis que 
                les autres nous aident à analyser l'utilisation et à personnaliser le contenu.
              </p>
            </div>
            <button
              onClick={handleRejectAll}
              className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
              aria-label="Fermer"
            >
              <X size={20} weight="bold" />
            </button>
          </div>

          {showDetails && (
            <div className="space-y-4 mb-6 overflow-hidden">
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                  <Checkbox
                    id="necessary"
                    checked={true}
                    disabled
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="necessary" className="font-semibold text-sm cursor-not-allowed block mb-1">
                      Cookies Nécessaires (Requis)
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Ces cookies sont essentiels au fonctionnement du site. Ils permettent la navigation, 
                      la gestion de compte et les fonctionnalités de base.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-muted/30 transition-colors">
                  <Checkbox
                    id="analytics"
                    checked={cookiePreferences?.analytics ?? false}
                    onCheckedChange={(checked) => handlePreferenceChange('analytics', checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="analytics" className="font-semibold text-sm cursor-pointer block mb-1">
                      Cookies Analytiques
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Nous aident à comprendre comment les visiteurs interagissent avec le site 
                      en collectant des informations anonymes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-muted/30 transition-colors">
                  <Checkbox
                    id="marketing"
                    checked={cookiePreferences?.marketing ?? false}
                    onCheckedChange={(checked) => handlePreferenceChange('marketing', checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="marketing" className="font-semibold text-sm cursor-pointer block mb-1">
                      Cookies Marketing
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Utilisés pour suivre les visiteurs et afficher des publicités pertinentes et engageantes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              onClick={() => setShowDetails(!showDetails)}
              variant="outline"
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              {showDetails ? 'Masquer les détails' : 'Personnaliser'}
            </Button>
            {showDetails && (
              <Button
                onClick={handleSavePreferences}
                variant="secondary"
                className="w-full sm:w-auto order-3"
              >
                Enregistrer les préférences
              </Button>
            )}
            <Button
              onClick={handleRejectAll}
              variant="outline"
              className="w-full sm:w-auto order-4"
            >
              Refuser tout
            </Button>
            <Button
              onClick={handleAcceptAll}
              className="w-full sm:w-auto order-1 sm:order-5 sm:ml-auto gap-2 shadow-lg"
            >
              <Cookie size={18} weight="duotone" />
              Accepter tout
            </Button>
          </div>

          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Pour plus d'informations, consultez notre{' '}
              <button className="underline hover:text-primary transition-colors">
                politique de confidentialité
              </button>
              .
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
