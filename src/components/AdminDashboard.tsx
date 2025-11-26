import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, ServiceProvider, Booking, Review } from '@/lib/types'
import { Users, Briefcase, CheckCircle, XCircle, Clock, Star, CalendarBlank, Eye } from '@phosphor-icons/react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ProviderProfileView } from '@/components/ProviderProfileView'
import { toast } from 'sonner'

interface AdminDashboardProps {
  users: User[]
  providers: ServiceProvider[]
  bookings: Booking[]
  reviews: Review[]
  onApproveProvider: (providerId: string) => void
  onRejectProvider: (providerId: string) => void
  onDeleteUser: (userId: string) => void
}

export function AdminDashboard({
  users,
  providers,
  bookings,
  reviews,
  onApproveProvider,
  onRejectProvider,
  onDeleteUser,
}: AdminDashboardProps) {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [viewProfileOpen, setViewProfileOpen] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null)

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user)
    setDeleteConfirmOpen(true)
  }

  const handleViewProfile = (provider: ServiceProvider) => {
    setSelectedProvider(provider)
    setViewProfileOpen(true)
  }

  const handleConfirmDelete = () => {
    if (selectedUser) {
      onDeleteUser(selectedUser.id)
      toast.success(`Utilisateur ${selectedUser.name} supprimé`)
    }
    setDeleteConfirmOpen(false)
    setSelectedUser(null)
  }

  const handleApproveFromProfile = (providerId: string) => {
    onApproveProvider(providerId)
    setViewProfileOpen(false)
    setSelectedProvider(null)
  }

  const handleRejectFromProfile = (providerId: string) => {
    onRejectProvider(providerId)
    setViewProfileOpen(false)
    setSelectedProvider(null)
  }

  const clients = users.filter(u => u.role === 'client')
  const pendingProviders = providers.filter(p => !p.verified)
  const approvedProviders = providers.filter(p => p.verified)
  
  const totalBookings = bookings.length
  const completedBookings = bookings.filter(b => b.status === 'completed').length
  const totalRevenue = bookings.reduce((sum, b) => sum + b.price, 0)

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de Bord Admin</h1>
        <p className="text-muted-foreground mt-1">
          Gérez les utilisateurs, prestataires et surveillez l'activité de la plateforme
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users size={16} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-xs text-muted-foreground">Utilisateurs clients actifs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prestataires</CardTitle>
            <Briefcase size={16} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedProviders.length}</div>
            <p className="text-xs text-muted-foreground">
              {pendingProviders.length > 0 && `${pendingProviders.length} en attente`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Réservations</CardTitle>
            <CalendarBlank size={16} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground">{completedBookings} complétées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenu Total</CardTitle>
            <Star size={16} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">CAD</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="providers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="providers">Prestataires</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="bookings">Réservations</TabsTrigger>
          <TabsTrigger value="reviews">Avis</TabsTrigger>
        </TabsList>

        <TabsContent value="providers" className="space-y-4">
          {pendingProviders.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock size={20} className="text-accent" />
                  Prestataires en Attente de Validation
                </CardTitle>
                <CardDescription>
                  {pendingProviders.length} prestataire{pendingProviders.length > 1 ? 's' : ''} en attente d'approbation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingProviders.map((provider) => (
                    <div
                      key={provider.id}
                      className="flex items-start gap-4 p-4 border rounded-lg"
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={provider.avatar} />
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          {getInitials(provider.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-semibold">{provider.name}</h4>
                            <p className="text-sm text-muted-foreground">{provider.email}</p>
                          </div>
                          <Badge variant="secondary" className="gap-1">
                            <Clock size={12} />
                            En attente
                          </Badge>
                        </div>
                        <p className="text-sm mt-2">{provider.bio}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {provider.services.map((service, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2 text-xs text-muted-foreground mt-2">
                          <span>📍 {provider.location}</span>
                          <span>•</span>
                          <span>${provider.hourlyRate}/h</span>
                          <span>•</span>
                          <span>{provider.availability}</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewProfile(provider)}
                            className="gap-1"
                          >
                            <Eye size={16} />
                            Voir le profil
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => onApproveProvider(provider.id)}
                            className="gap-1"
                          >
                            <CheckCircle size={16} />
                            Approuver
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => onRejectProvider(provider.id)}
                            className="gap-1"
                          >
                            <XCircle size={16} />
                            Rejeter
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle size={20} className="text-secondary" />
                Prestataires Approuvés
              </CardTitle>
              <CardDescription>
                {approvedProviders.length} prestataire{approvedProviders.length > 1 ? 's' : ''} vérifié{approvedProviders.length > 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prestataire</TableHead>
                    <TableHead>Services</TableHead>
                    <TableHead>Localisation</TableHead>
                    <TableHead>Tarif/h</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approvedProviders.map((provider) => (
                    <TableRow key={provider.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={provider.avatar} />
                            <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">
                              {getInitials(provider.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{provider.name}</div>
                            <div className="text-xs text-muted-foreground">{provider.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {provider.services.slice(0, 2).map((service, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                          {provider.services.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{provider.services.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{provider.location}</TableCell>
                      <TableCell>${provider.hourlyRate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star size={14} weight="fill" className="text-accent" />
                          <span className="font-medium">{provider.rating.toFixed(1)}</span>
                          <span className="text-xs text-muted-foreground">({provider.reviewCount})</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewProfile(provider)}
                            className="gap-1"
                          >
                            <Eye size={14} />
                            Voir
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteClick(provider)}
                          >
                            Supprimer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tous les Clients</CardTitle>
              <CardDescription>
                {clients.length} client{clients.length > 1 ? 's' : ''} inscrit{clients.length > 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date d'inscription</TableHead>
                    <TableHead>Réservations</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.map((client) => {
                    const clientBookings = bookings.filter(b => b.clientId === client.id)
                    return (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={client.avatar} />
                              <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                                {getInitials(client.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{client.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>
                          {new Date(client.createdAt).toLocaleDateString('fr-CA')}
                        </TableCell>
                        <TableCell>{clientBookings.length}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteClick(client)}
                          >
                            Supprimer
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Toutes les Réservations</CardTitle>
              <CardDescription>
                {bookings.length} réservation{bookings.length > 1 ? 's' : ''} au total
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Prestataire</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Paiement</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => {
                    const client = users.find(u => u.id === booking.clientId)
                    const provider = providers.find(p => p.id === booking.providerId)
                    return (
                      <TableRow key={booking.id}>
                        <TableCell>{client?.name || 'Inconnu'}</TableCell>
                        <TableCell>{provider?.name || 'Inconnu'}</TableCell>
                        <TableCell>{booking.serviceType}</TableCell>
                        <TableCell>
                          {new Date(booking.date).toLocaleDateString('fr-CA')}
                        </TableCell>
                        <TableCell>${booking.price}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              booking.status === 'completed'
                                ? 'default'
                                : booking.status === 'cancelled'
                                ? 'destructive'
                                : 'secondary'
                            }
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{booking.paymentStatus}</Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tous les Avis</CardTitle>
              <CardDescription>
                {reviews.length} avis soumis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviews.map((review) => {
                  const client = users.find(u => u.id === review.clientId)
                  const provider = providers.find(p => p.id === review.providerId)
                  return (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-medium">{client?.name || 'Client inconnu'}</div>
                          <div className="text-sm text-muted-foreground">
                            sur {provider?.name || 'Prestataire inconnu'}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={16} weight="fill" className="text-accent" />
                          <span className="font-semibold">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm">{review.comment}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(review.createdAt).toLocaleDateString('fr-CA', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer l'utilisateur <strong>{selectedUser?.name}</strong> ?
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={viewProfileOpen} onOpenChange={setViewProfileOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Profil du Prestataire</DialogTitle>
          </DialogHeader>
          {selectedProvider && (
            <ProviderProfileView
              provider={selectedProvider}
              reviews={reviews}
              isAdmin={true}
              onApprove={handleApproveFromProfile}
              onReject={handleRejectFromProfile}
              onClose={() => setViewProfileOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
