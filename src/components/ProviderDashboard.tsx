import { useState } from 'react'
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
import { Switch } from '@/components/ui/switch'
import { Announcement, Booking, Review, ServiceProvider, ChatMessage, ChatConversation, User } from '@/lib/types'
import {
  Calendar,
  CreditCard,
  Star,
  MegaphoneSimple,
  Plus,
  Pencil,
  Trash,
  CheckCircle,
  ChatCircle,
} from '@phosphor-icons/react'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { ChatList } from '@/components/ChatList'

interface ProviderDashboardProps {
  providerId: string
  provider: ServiceProvider
  announcements: Announcement[]
  bookings: Booking[]
  reviews: Review[]
  messages: ChatMessage[]
  users: User[]
  onCreateAnnouncement: () => void
  onEditAnnouncement: (announcement: Announcement) => void
  onDeleteAnnouncement: (announcementId: string) => void
  onToggleAnnouncementStatus: (announcementId: string, isActive: boolean) => void
  onGoToSubscription: () => void
  onOpenChat: (conversation: ChatConversation) => void
}

export function ProviderDashboard({
  providerId,
  provider,
  announcements,
  bookings,
  reviews,
  messages,
  users,
  onCreateAnnouncement,
  onEditAnnouncement,
  onDeleteAnnouncement,
  onToggleAnnouncementStatus,
  onGoToSubscription,
  onOpenChat,
}: ProviderDashboardProps) {
  const providerBookings = bookings.filter((b) => b.providerId === providerId)
  const providerReviews = reviews.filter((r) => r.providerId === providerId)

  const confirmedOrCompletedBookings = providerBookings.filter(
    b => b.status === 'confirmed' || b.status === 'completed'
  )

  const conversations: ChatConversation[] = confirmedOrCompletedBookings.map(booking => {
    const client = users.find(u => u.id === booking.clientId)
    const bookingMessages = messages.filter(m => m.bookingId === booking.id)
    const lastMessage = bookingMessages.length > 0 
      ? bookingMessages[bookingMessages.length - 1]
      : undefined
    const unreadCount = bookingMessages.filter(m => !m.isRead && m.senderId !== providerId).length

    return {
      bookingId: booking.id,
      providerId: providerId,
      providerName: provider.name,
      providerAvatar: provider.avatar,
      clientId: booking.clientId,
      clientName: client?.name || 'Client',
      clientAvatar: client?.avatar,
      lastMessage: lastMessage?.message,
      lastMessageAt: lastMessage?.createdAt,
      unreadCount,
    }
  })

  const stats = {
    totalAnnouncements: announcements.length,
    activeAnnouncements: announcements.filter((a) => a.isActive).length,
    totalBookings: providerBookings.length,
    completedBookings: providerBookings.filter((b) => b.status === 'completed').length,
    totalEarned: providerBookings
      .filter((b) => b.paymentStatus === 'released')
      .reduce((sum, b) => sum + b.price, 0),
    avgRating:
      providerReviews.length > 0
        ? providerReviews.reduce((sum, r) => sum + r.rating, 0) / providerReviews.length
        : 0,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-secondary'
      case 'completed':
        return 'bg-green-500'
      case 'cancelled':
        return 'bg-destructive'
      case 'disputed':
        return 'bg-accent'
      default:
        return 'bg-muted'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmé'
      case 'completed':
        return 'Terminé'
      case 'cancelled':
        return 'Annulé'
      case 'disputed':
        return 'Contesté'
      case 'pending':
        return 'En attente'
      default:
        return status
    }
  }

  const handleDelete = (announcementId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      onDeleteAnnouncement(announcementId)
      toast.success('Annonce supprimée avec succès')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Tableau de bord Prestataire</h2>
        <p className="text-muted-foreground">Gérez vos annonces, réservations et avis</p>
      </div>

      {provider.subscription?.isActive ? (
        <Card className="p-6 border-secondary bg-secondary/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary/20 rounded-lg">
                <CheckCircle size={24} className="text-secondary" weight="fill" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Plan {provider.subscription.plan?.toUpperCase()}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Actif jusqu'au {format(new Date(provider.subscription.endDate), 'dd/MM/yyyy')}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={onGoToSubscription}>
              Changer de plan
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="p-6 border-accent bg-accent/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/20 rounded-lg">
                <CreditCard size={24} className="text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Aucun abonnement actif</h3>
                <p className="text-sm text-muted-foreground">
                  Souscrivez à un plan pour créer des annonces
                </p>
              </div>
            </div>
            <Button onClick={onGoToSubscription} className="gap-2">
              <CreditCard size={18} />
              Voir les plans
            </Button>
          </div>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <MegaphoneSimple size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Annonces actives</p>
              <p className="text-2xl font-bold">
                {stats.activeAnnouncements} / {stats.totalAnnouncements}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary/10 rounded-lg">
              <Calendar size={24} className="text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Réservations</p>
              <p className="text-2xl font-bold">{stats.totalBookings}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <CreditCard size={24} className="text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Revenus totaux</p>
              <p className="text-2xl font-bold">{stats.totalEarned}$</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <Star size={24} className="text-yellow-500" weight="fill" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Note moyenne</p>
              <p className="text-2xl font-bold">
                {stats.avgRating > 0 ? stats.avgRating.toFixed(1) : 'N/A'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="announcements" className="space-y-4">
        <TabsList>
          <TabsTrigger value="announcements">Mes annonces</TabsTrigger>
          <TabsTrigger value="bookings">Réservations reçues</TabsTrigger>
          <TabsTrigger value="messages">
            Messagerie
            {conversations.filter(c => c.unreadCount > 0).length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {conversations.reduce((sum, c) => sum + c.unreadCount, 0)}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="reviews">Avis reçus</TabsTrigger>
        </TabsList>

        <TabsContent value="announcements" className="space-y-4">
          {!provider.subscription?.isActive ? (
            <Card className="p-8 border-accent bg-accent/5">
              <div className="text-center">
                <MegaphoneSimple size={48} className="mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-semibold mb-2">Abonnement requis</h3>
                <p className="text-muted-foreground mb-6">
                  Pour déposer des annonces, vous devez souscrire à un plan d'abonnement.
                  Choisissez le plan qui correspond à vos besoins et commencez à recevoir des clients!
                </p>
                <Button onClick={onGoToSubscription} className="gap-2">
                  <CreditCard size={18} />
                  Voir les plans d'abonnement
                </Button>
              </div>
            </Card>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Créez et gérez vos annonces de services
                </p>
                <Button onClick={onCreateAnnouncement} className="gap-2">
                  <Plus size={18} />
                  Nouvelle annonce
                </Button>
              </div>

              {announcements.length === 0 ? (
                <Card className="p-8">
                  <div className="text-center text-muted-foreground">
                    <MegaphoneSimple size={48} className="mx-auto mb-4 text-muted" />
                    <p className="mb-4">
                      Vous n'avez pas encore d'annonces. Créez votre première annonce pour
                      commencer à recevoir des clients!
                    </p>
                    <Button onClick={onCreateAnnouncement} className="gap-2">
                      <Plus size={18} />
                      Créer ma première annonce
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Titre</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Ville</TableHead>
                        <TableHead>Tarif/h</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Créée le</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {announcements.map((announcement) => (
                        <TableRow key={announcement.id}>
                          <TableCell className="font-medium max-w-xs">
                            <div className="truncate">{announcement.title}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{announcement.category}</Badge>
                          </TableCell>
                          <TableCell>{announcement.location}</TableCell>
                          <TableCell>{announcement.hourlyRate}$</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={announcement.isActive}
                                onCheckedChange={(checked) =>
                                  onToggleAnnouncementStatus(announcement.id, checked)
                                }
                              />
                              <span className="text-xs text-muted-foreground">
                                {announcement.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {format(new Date(announcement.createdAt), 'dd/MM/yyyy')}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => onEditAnnouncement(announcement)}
                              >
                                <Pencil size={16} />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(announcement.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Paiement</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {providerBookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Aucune réservation pour le moment. Vos clients verront vos annonces
                      bientôt!
                    </TableCell>
                  </TableRow>
                ) : (
                  providerBookings.map((booking) => {
                    const conversation = conversations.find(c => c.bookingId === booking.id)
                    const canChat = booking.status === 'confirmed' || booking.status === 'completed'
                    
                    return (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">Client #{booking.clientId.slice(-6)}</TableCell>
                        <TableCell>{booking.serviceType}</TableCell>
                        <TableCell>
                          {format(new Date(booking.date), 'dd MMM yyyy')} à {booking.time}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(booking.status)}>
                            {getStatusLabel(booking.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>{booking.price}$</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              booking.paymentStatus === 'released'
                                ? 'default'
                                : booking.paymentStatus === 'held'
                                ? 'secondary'
                                : 'outline'
                            }
                          >
                            {booking.paymentStatus === 'released'
                              ? 'Libéré'
                              : booking.paymentStatus === 'held'
                              ? 'En garantie'
                              : booking.paymentStatus === 'refunded'
                              ? 'Remboursé'
                              : 'En attente'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {canChat && conversation && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onOpenChat(conversation)}
                              className="gap-2"
                            >
                              <ChatCircle size={16} />
                              Chater
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

        <TabsContent value="messages" className="space-y-4">
          <ChatList
            conversations={conversations}
            currentUserId={providerId}
            onOpenChat={onOpenChat}
          />
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          {providerReviews.length === 0 ? (
            <Card className="p-8">
              <div className="text-center text-muted-foreground">
                <Star size={48} className="mx-auto mb-4 text-muted" />
                <p>
                  Aucun avis pour le moment. Complétez des services pour recevoir vos premiers
                  avis!
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {providerReviews.map((review) => (
                <Card key={review.id} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">Client #{review.clientId.slice(-6)}</h4>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(review.createdAt), 'dd MMM yyyy')}
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
                  {review.comment && <p className="text-sm">{review.comment}</p>}
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
