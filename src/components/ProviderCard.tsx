import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { MapPin, Clock, ShieldCheck } from '@phosphor-icons/react'
import { ServiceProvider } from '@/lib/types'
import { RatingDisplay } from './RatingDisplay'

interface ProviderCardProps {
  provider: ServiceProvider
  onBook: (provider: ServiceProvider) => void
}

export function ProviderCard({ provider, onBook }: ProviderCardProps) {
  const initials = provider.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={provider.avatar} alt={provider.name} />
            <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg text-foreground truncate">
                {provider.name}
              </h3>
              {provider.verified && (
                <ShieldCheck size={18} weight="fill" className="text-secondary flex-shrink-0" />
              )}
            </div>
            
            <RatingDisplay 
              rating={provider.rating} 
              reviewCount={provider.reviewCount}
              size="sm"
            />
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {provider.bio}
        </p>

        <div className="flex flex-wrap gap-2">
          {provider.services.slice(0, 3).map((service) => (
            <Badge key={service} variant="secondary" className="text-xs">
              {service}
            </Badge>
          ))}
          {provider.services.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{provider.services.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin size={14} />
              <span>{provider.location}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock size={14} />
              <span>{provider.availability}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">
                ${provider.hourlyRate}
              </div>
              <div className="text-xs text-muted-foreground">per hour</div>
            </div>
            <Button 
              onClick={() => onBook(provider)}
              className="w-full"
            >
              Book Service
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
