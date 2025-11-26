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
  XCircle,
  Certificate,
  Briefcase,
  ChatCircle,
  Translate,
  File,
  FileText,
  Download,
  IdentificationCard,
  ShieldCheck,
  Paperclip,
} from '@phosphor-icons/react'
import { RatingDisplay } from '@/components/RatingDisplay'

interface ProviderProfileViewProps {
  provider: ServiceProvider
  reviews: Review[]
  isAdmin?: boolean
  onApprove?: (providerId: string) => void
  onReject?: (providerId: string) => void
  onClose?: () => void
}

export function ProviderProfileView({
  provider,
  reviews,
  isAdmin = false,
  onApprove,
  onReject,
  onClose,
}: ProviderProfileViewProps) {
  const userInitials = provider.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const providerReviews = reviews.filter(r => r.providerId === provider.id)

  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case 'identity':
        return <IdentificationCard size={20} className="text-blue-500" />
      case 'certification':
        return <Certificate size={20} className="text-green-500" />
      case 'insurance':
        return <ShieldCheck size={20} className="text-purple-500" />
      default:
        return <FileText size={20} className="text-gray-500" />
    }
  }

  const getAttachmentLabel = (type: string) => {
    switch (type) {
      case 'identity':
        return 'Pièce d\'identité'
      case 'certification':
        return 'Certification'
      case 'insurance':
        return 'Assurance'
      default:
        return 'Autre document'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-6 flex-1">
          <Avatar className="h-32 w-32 border-4 border-primary/10 flex-shrink-0">
            <AvatarImage src={provider.avatar} />
            <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-3 flex-1">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-3xl font-bold">{provider.name}</h1>
                {provider.verified && (
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle size={14} className="mr-1" />
                    Vérifié
                  </Badge>
                )}
                {!provider.verified && (
                  <Badge variant="secondary">
                    <Clock size={14} className="mr-1" />
                    En attente
                  </Badge>
                )}
              </div>
              {provider.profession && (
                <p className="text-xl text-muted-foreground font-medium">
                  {provider.profession}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <RatingDisplay rating={provider.rating} />
              <span className="text-sm text-muted-foreground">
                ({provider.reviewCount} avis)
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-muted-foreground" />
                <span>{provider.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <CurrencyDollar size={16} className="text-muted-foreground" />
                <span className="font-semibold">{provider.hourlyRate}$ / heure</span>
              </div>
              {provider.responseTime && (
                <div className="flex items-center gap-2">
                  <ChatCircle size={16} className="text-muted-foreground" />
                  <span>{provider.responseTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {isAdmin && !provider.verified && onApprove && onReject && (
          <div className="flex gap-2 flex-shrink-0">
            <Button
              onClick={() => onApprove(provider.id)}
              className="gap-2"
            >
              <CheckCircle size={18} />
              Approuver
            </Button>
            <Button
              onClick={() => onReject(provider.id)}
              variant="destructive"
              className="gap-2"
            >
              <XCircle size={18} />
              Rejeter
            </Button>
          </div>
        )}
      </div>

      <Separator />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informations de Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{provider.email}</p>
            </div>
            {provider.phone && (
              <div>
                <p className="text-sm text-muted-foreground">Téléphone</p>
                <p className="font-medium">{provider.phone}</p>
              </div>
            )}
            {provider.address && (
              <div>
                <p className="text-sm text-muted-foreground">Adresse</p>
                <p className="font-medium">{provider.address}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Abonnement</CardTitle>
          </CardHeader>
          <CardContent>
            {provider.subscription ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Plan</p>
                  <Badge className={
                    provider.subscription.plan === 'enterprise' ? 'bg-purple-500' :
                    provider.subscription.plan === 'premium' ? 'bg-blue-500' :
                    'bg-gray-500'
                  }>
                    {provider.subscription.plan === 'enterprise' ? 'PREMIUM' :
                     provider.subscription.plan === 'premium' ? 'VIP' :
                     'ESSENTIEL'}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Statut</p>
                  <Badge variant={provider.subscription.isActive ? 'default' : 'secondary'}>
                    {provider.subscription.isActive ? 'Actif' : 'Inactif'}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date de fin</p>
                  <p className="font-medium">
                    {new Date(provider.subscription.endDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Aucun abonnement actif</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Disponibilité</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Horaires</p>
              <p className="font-medium">{provider.availability}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date d'inscription</p>
              <p className="font-medium">
                {new Date(provider.createdAt).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">À Propos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{provider.bio}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Briefcase size={20} />
              Services Proposés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {provider.services.map((service, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {service}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {provider.languages && provider.languages.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Translate size={20} />
                Langues Parlées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {provider.languages.map((lang, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {lang}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {provider.experience && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Briefcase size={20} />
              Expérience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{provider.experience}</p>
          </CardContent>
        </Card>
      )}

      {provider.certifications && provider.certifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Certificate size={20} />
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {provider.certifications.map((cert, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {provider.attachments && provider.attachments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Paperclip size={20} />
              Pièces Jointes ({provider.attachments.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {provider.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex-shrink-0 mt-1">
                    {getAttachmentIcon(attachment.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-medium truncate">{attachment.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {getAttachmentLabel(attachment.type)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(attachment.uploadedAt).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => window.open(attachment.url, '_blank')}
                      >
                        <Download size={16} />
                      </Button>
                    </div>
                    {attachment.url && (
                      <div className="mt-3">
                        {attachment.url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                          <div className="relative rounded-md overflow-hidden border cursor-pointer hover:border-primary transition-colors">
                            <img
                              src={attachment.url}
                              alt={attachment.name}
                              className="w-full h-48 object-cover"
                              onClick={() => window.open(attachment.url, '_blank')}
                            />
                          </div>
                        ) : attachment.url.match(/\.(pdf)$/i) ? (
                          <div className="relative rounded-md border overflow-hidden">
                            <iframe
                              src={`${attachment.url}#toolbar=0`}
                              className="w-full h-96"
                              title={attachment.name}
                            />
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            className="w-full gap-2"
                            onClick={() => window.open(attachment.url, '_blank')}
                          >
                            <File size={16} />
                            Ouvrir le document
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {provider.portfolioImages && provider.portfolioImages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {provider.portfolioImages.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                  onClick={() => window.open(image, '_blank')}
                >
                  <img
                    src={image}
                    alt={`Portfolio ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Star size={20} />
            Avis Clients ({providerReviews.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {providerReviews.length === 0 ? (
            <p className="text-muted-foreground">Aucun avis pour le moment</p>
          ) : (
            <div className="space-y-4">
              {providerReviews.slice(0, 5).map((review) => (
                <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <RatingDisplay rating={review.rating} />
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {onClose && (
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} variant="outline">
            Fermer
          </Button>
        </div>
      )}
    </div>
  )
}
