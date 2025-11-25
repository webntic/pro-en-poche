import { Star } from '@phosphor-icons/react'

interface RatingDisplayProps {
  rating: number
  reviewCount?: number
  size?: 'sm' | 'md' | 'lg'
  showNumber?: boolean
}

export function RatingDisplay({ 
  rating, 
  reviewCount, 
  size = 'md', 
  showNumber = true 
}: RatingDisplayProps) {
  const sizeMap = {
    sm: 14,
    md: 18,
    lg: 24
  }
  
  const iconSize = sizeMap[size]
  
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={iconSize}
            weight={star <= Math.round(rating) ? 'fill' : 'regular'}
            className={star <= Math.round(rating) ? 'text-accent' : 'text-muted'}
          />
        ))}
      </div>
      {showNumber && (
        <span className="text-sm font-medium text-foreground">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-sm text-muted-foreground">
          ({reviewCount})
        </span>
      )}
    </div>
  )
}
