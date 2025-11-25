import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Booking, Review, ServiceProvider } from '@/lib/types'
import { Calendar, CreditCard, Star, Users, CheckCircle } from '@phosphor-icons/react'
import { format } from 'date-fns'

interface DashboardProps {
  bookings: Booking[]
  reviews: Review[]
  providers: ServiceProvider[]
  onMarkComplete: (bookingId: string) => void
  onOpenReview: (booking: Booking) => void
}

export function Dashboard({ 
  bookings, 
  reviews, 
  providers,
  onMarkComplete,
  onOpenReview 
}: DashboardProps) {
  const stats = {
    totalBookings: bookings.length,
    completedBookings: bookings.filter(b => b.status === 'completed').length,
    totalSpent: bookings.reduce((sum, b) => sum + b.price, 0),
    avgRating: reviews.length > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
      : 0,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-secondary'
      case 'completed': return 'bg-green-500'
      case 'cancelled': return 'bg-destructive'
      case 'disputed': return 'bg-accent'
      default: return 'bg-muted'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">My Dashboard</h2>
        <p className="text-muted-foreground">
          Manage your bookings and reviews
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Calendar size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Bookings</p>
              <p className="text-2xl font-bold">{stats.totalBookings}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary/10 rounded-lg">
              <CheckCircle size={24} className="text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold">{stats.completedBookings}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <CreditCard size={24} className="text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <p className="text-2xl font-bold">${stats.totalSpent}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <Star size={24} className="text-yellow-500" weight="fill" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
              <p className="text-2xl font-bold">{stats.avgRating.toFixed(1)}</p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="reviews">My Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Provider</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No bookings yet. Start by booking a service!
                    </TableCell>
                  </TableRow>
                ) : (
                  bookings.map((booking) => {
                    const provider = providers.find(p => p.id === booking.providerId)
                    return (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">
                          {provider?.name || 'Unknown'}
                        </TableCell>
                        <TableCell>{booking.serviceType}</TableCell>
                        <TableCell>
                          {format(new Date(booking.date), 'MMM dd, yyyy')} at {booking.time}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>${booking.price}</TableCell>
                        <TableCell>
                          {booking.status === 'confirmed' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onMarkComplete(booking.id)}
                            >
                              Mark Complete
                            </Button>
                          )}
                          {booking.status === 'completed' && !reviews.find(r => r.bookingId === booking.id) && (
                            <Button
                              size="sm"
                              onClick={() => onOpenReview(booking)}
                            >
                              Leave Review
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          {reviews.length === 0 ? (
            <Card className="p-8">
              <div className="text-center text-muted-foreground">
                <Star size={48} className="mx-auto mb-4 text-muted" />
                <p>No reviews yet. Complete a booking to leave a review!</p>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => {
                const provider = providers.find(p => p.id === review.providerId)
                return (
                  <Card key={review.id} className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{provider?.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(review.createdAt), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={18}
                            weight={star <= review.rating ? 'fill' : 'regular'}
                            className={star <= review.rating ? 'text-accent' : 'text-muted'}
                          />
                        ))}
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-sm">{review.comment}</p>
                    )}
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
