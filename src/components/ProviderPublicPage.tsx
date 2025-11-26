import { ServiceProvider, Review } from '@/lib/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Star,
  MapPin,
  Clock,
  CurrencyDollar,
  CheckCircle,
  Certificate,
  Briefcase,
  ChatCircle,
  Translate,
  ArrowLeft,
  CalendarCheck,
} from '@phosphor-icons/react'
import { RatingDisplay } from '@/components/RatingDisplay'

interface ProviderPublicPageProps {
  provider: ServiceProvider
  reviews: Review[]
  onBook: (provider: ServiceProvider) => void
  onBack: () => void
}

export function ProviderPublicPage({
  provider,
  reviews,
  onBook,
  onBack,
}: ProviderPublicPageProps) {
  const userInitials = provider.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const providerReviews = reviews.filter(r => r.providerId === provider.id)

  return (
    <div className="min-h-screen bg-background">
      <div className="premium-header border-b">
        <div className="container mx-auto px-4 py-4">
          <Button
            onClick={onBack}
            variant="ghost"
            className="gap-2"
          >
            <ArrowLeft size={18} />
            Retour aux prestataires
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="premium-card rounded-2xl p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <Avatar className="h-40 w-40 border-4 border-primary/10 flex-shrink-0">
              <AvatarImage src={provider.avatar} />
              <AvatarFallback className="text-4xl bg-primary text-primary-foreground">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold">{provider.name}</h1>
                  {provider.verified && (
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle size={14} className="mr-1" />
                      Vérifié
                    </Badge>
                  )}
                </div>
                {provider.profession && (
                  <p className="text-2xl text-muted-foreground font-medium">
                    {provider.profession}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <RatingDisplay rating={provider.rating} size="lg" />
                <span className="text-lg text-muted-foreground">
                  ({provider.reviewCount} avis)
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-base">
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-primary" />
                  <span className="font-medium">{provider.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CurrencyDollar size={20} className="text-primary" />
                  <span className="font-semibold text-primary text-xl">{provider.hourlyRate}$ / heure</span>
                </div>
              </div>

              {provider.responseTime && (
                <div className="flex items-center gap-2 text-sm">
                  <ChatCircle size={18} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Répond généralement en {provider.responseTime}</span>
                </div>
              )}

              <Button
                onClick={() => onBook(provider)}
                size="lg"
                className="gap-2 mt-4"
              >
                <CalendarCheck size={20} />
                Réserver un Service
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">À Propos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">{provider.bio}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Briefcase size={24} />
                Services Proposés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {provider.services.map((service, index) => (
                  <Badge key={index} variant="secondary" className="text-base py-2 px-4">
                    {service}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {provider.experience && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Briefcase size={24} />
                  Expérience Professionnelle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  {provider.experience}
                </p>
              </CardContent>
            </Card>
          )}

          {provider.certifications && provider.certifications.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Certificate size={24} />
                  Certifications & Qualifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {provider.certifications.map((cert, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                      <span className="text-lg">{cert}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {provider.languages && provider.languages.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Translate size={24} />
                  Langues Parlées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {provider.languages.map((lang, index) => (
                    <Badge key={index} variant="outline" className="text-base py-2 px-4">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {provider.portfolioImages && provider.portfolioImages.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {provider.portfolioImages.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-xl overflow-hidden bg-muted shadow-md hover:shadow-xl transition-shadow"
                    >
                      <img
                        src={image}
                        alt={`Portfolio ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Star size={24} />
                Avis Clients ({providerReviews.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {providerReviews.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">
                    Aucun avis pour le moment. Soyez le premier à laisser un avis !
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {providerReviews.map((review) => (
                    <div key={review.id} className="border-b last:border-0 pb-6 last:pb-0">
                      <div className="flex items-center gap-3 mb-3">
                        <RatingDisplay rating={review.rating} />
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-center pt-6">
            <Button
              onClick={() => onBook(provider)}
              size="lg"
              className="gap-2 w-full md:w-auto"
            >
              <CalendarCheck size={20} />
              Réserver un Service
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
