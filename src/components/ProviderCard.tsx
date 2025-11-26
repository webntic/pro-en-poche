import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { MapPin, Clock, ShieldCheck, Eye } from '@phosphor-icons/react'
import { ServiceProvider } from '@/lib/types'
import { RatingDisplay } from './RatingDisplay'

interface ProviderCardProps {
  provider: ServiceProvider
  onBook: (provider: ServiceProvider) => void
  onViewProfile?: (provider: ServiceProvider) => void
}

export function ProviderCard({ provider, onBook, onViewProfile }: ProviderCardProps) {
  const initials = provider.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <Card className="premium-card p-7 border-0 group overflow-hidden">
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-4">
          <Avatar className="h-20 w-20 ring-4 ring-primary/10 shadow-lg group-hover:ring-primary/20 transition-all duration-300">
            <AvatarImage src={provider.avatar} alt={provider.name} />
            <AvatarFallback className="text-xl font-bold premium-gradient text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-2">
              <h3 className="font-bold text-xl text-foreground truncate tracking-tight">
                {provider.name}
              </h3>
              {provider.verified && (
                <ShieldCheck size={20} weight="fill" className="text-secondary flex-shrink-0" />
              )}
            </div>
            
            {provider.profession && (
              <p className="text-sm text-muted-foreground font-medium mb-2">{provider.profession}</p>
            )}
            
            <RatingDisplay 
              rating={provider.rating} 
              reviewCount={provider.reviewCount}
              size="sm"
            />
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {provider.bio}
        </p>

        <div className="flex flex-wrap gap-2">
          {provider.services.slice(0, 3).map((service) => (
            <Badge key={service} variant="secondary" className="text-xs font-medium px-3 py-1">
              {service}
            </Badge>
          ))}
          {provider.services.length > 3 && (
            <Badge variant="outline" className="text-xs font-medium px-3 py-1">
              +{provider.services.length - 3} autres
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={16} weight="duotone" />
              <span className="font-medium">{provider.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock size={16} weight="duotone" />
              <span className="font-medium">{provider.availability}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-1">
            <div className="text-right">
              <div className="text-3xl font-bold text-foreground tracking-tight">
                {provider.hourlyRate}$
              </div>
              <div className="text-xs text-muted-foreground font-medium">par heure</div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          {onViewProfile && (
            <Button 
              onClick={() => onViewProfile(provider)}
              variant="outline"
              className="flex-1 gap-2 font-medium hover:bg-primary/5 hover:border-primary/30 transition-all duration-300"
            >
              <Eye size={18} weight="duotone" />
              Voir le profil
            </Button>
          )}
          <Button 
            onClick={() => onBook(provider)}
            className="flex-1 premium-gradient shadow-md hover:shadow-xl font-medium transition-all duration-300"
          >
            Réserver
          </Button>
        </div>
      </div>
    </Card>
  )
}
