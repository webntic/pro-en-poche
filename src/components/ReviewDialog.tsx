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
      toast.error('Please select a rating')
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
          <DialogTitle className="text-2xl">Rate Your Experience</DialogTitle>
          <DialogDescription>
            How was your service with {providerName}?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Rating</Label>
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
                {rating === 1 && 'Poor'}
                {rating === 2 && 'Fair'}
                {rating === 3 && 'Good'}
                {rating === 4 && 'Very Good'}
                {rating === 5 && 'Excellent'}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-comment">Your Review (Optional)</Label>
            <Textarea
              id="review-comment"
              placeholder="Share details about your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSubmit} className="flex-1" size="lg">
              Submit Review
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              size="lg"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
