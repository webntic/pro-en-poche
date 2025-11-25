import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Star } from '@phosphor-icons/react'
import { Review } from '@/lib/types'
import { toast } from 'sonner'

interface ReviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bookingId: string
  providerId: string
  providerName: string
  clientId: string
  onSubmit: (review: Omit<Review, 'id' | 'createdAt'>) => void
}

export function ReviewDialog({
  open,
  onOpenChange,
  bookingId,
  providerId,
  providerName,
  clientId,
  onSubmit,
}: ReviewDialogProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error('Veuillez sélectionner une note')
      return
    }

    const review: Omit<Review, 'id' | 'createdAt'> = {
      bookingId,
      providerId,
      clientId,
      rating,
      comment,
    }

    onSubmit(review)
    
    setRating(0)
    setHoveredRating(0)
    setComment('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Évaluez votre expérience</DialogTitle>
          <DialogDescription>
            Comment s'est passé votre service avec {providerName}?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Note</Label>
            <div className="flex items-center gap-2 justify-center py-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-125"
                >
                  <Star
                    size={40}
                    weight={star <= (hoveredRating || rating) ? 'fill' : 'regular'}
                    className={
                      star <= (hoveredRating || rating)
                        ? 'text-accent'
                        : 'text-muted'
                    }
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-sm text-muted-foreground">
                {rating === 1 && 'Médiocre'}
                {rating === 2 && 'Passable'}
                {rating === 3 && 'Bon'}
                {rating === 4 && 'Très bon'}
                {rating === 5 && 'Excellent'}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-comment">Votre avis (Optionnel)</Label>
            <Textarea
              id="review-comment"
              placeholder="Partagez les détails de votre expérience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSubmit} className="flex-1" size="lg">
              Soumettre l'avis
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              size="lg"
            >
              Annuler
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
