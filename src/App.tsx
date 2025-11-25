import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Toaster } from '@/components/ui/sonner'
import { MagnifyingGlass, User as UserIcon, SignOut, ChartLine } from '@phosphor-icons/react'
import { ProviderCard } from '@/components/ProviderCard'
import { FilterPanel, FilterState } from '@/components/FilterPanel'
import { BookingDialog } from '@/components/BookingDialog'
import { AuthDialog } from '@/components/AuthDialog'
import { ReviewDialog } from '@/components/ReviewDialog'
import { Dashboard } from '@/components/Dashboard'
import { HeroSlider } from '@/components/HeroSlider'
import { User, ServiceProvider, Booking, Review } from '@/lib/types'
import { DEMO_PROVIDERS } from '@/lib/demo-data'
import { toast } from 'sonner'

function App() {
  const [currentUser, setCurrentUser] = useKV<User | null>('current-user', null)
  const [providers, setProviders] = useKV<ServiceProvider[]>('providers', [])
  const [bookings, setBookings] = useKV<Booking[]>('bookings', [])
  const [reviews, setReviews] = useKV<Review[]>('reviews', [])

  const [authOpen, setAuthOpen] = useState(false)
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false)
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showDashboard, setShowDashboard] = useState(false)
  
  const [filters, setFilters] = useState<FilterState>({
    category: 'Tous les services',
    location: 'Toutes les villes',
    priceRange: [0, 200],
    minRating: 0,
  })

  useEffect(() => {
    if (!providers || providers.length === 0) {
      setProviders(DEMO_PROVIDERS)
    }
  }, [])

  const handleAuth = (user: User) => {
    setCurrentUser(user)
  }

  const handleSignOut = () => {
    setCurrentUser(null)
    setShowDashboard(false)
    toast.success('Déconnexion réussie')
  }

  const handleBook = (provider: ServiceProvider) => {
    if (!currentUser) {
      toast.error('Veuillez vous connecter pour réserver un service')
      setAuthOpen(true)
      return
    }
    setSelectedProvider(provider)
    setBookingDialogOpen(true)
  }

  const handleConfirmBooking = (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `booking-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    
    setBookings((current) => [...(current || []), newBooking])
    setBookingDialogOpen(false)
    toast.success('Réservation confirmée! Le paiement est conservé en garantie.')
  }

  const handleMarkComplete = (bookingId: string) => {
    setBookings((current) =>
      (current || []).map((b) =>
        b.id === bookingId ? { ...b, status: 'completed', completedAt: new Date().toISOString() } : b
      )
    )
    toast.success('Service marqué comme terminé!')
  }

  const handleOpenReview = (booking: Booking) => {
    setSelectedBooking(booking)
    setReviewDialogOpen(true)
  }

  const handleSubmitReview = (reviewData: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `review-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    
    setReviews((current) => [...(current || []), newReview])
    
    setProviders((current) =>
      (current || []).map((p) => {
        if (p.id === reviewData.providerId) {
          const providerReviews = [...(reviews || []).filter(r => r.providerId === p.id), newReview]
          const avgRating = providerReviews.reduce((sum, r) => sum + r.rating, 0) / providerReviews.length
          return {
            ...p,
            rating: avgRating,
            reviewCount: providerReviews.length,
          }
        }
        return p
      })
    )
    
    setBookings((current) =>
      (current || []).map((b) =>
        b.id === reviewData.bookingId ? { ...b, paymentStatus: 'released' } : b
      )
    )
    
    setReviewDialogOpen(false)
    toast.success('Avis soumis! Le paiement a été libéré au prestataire.')
  }

  const filteredProviders = (providers || []).filter((provider) => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = filters.category === 'Tous les services' || 
      provider.services.includes(filters.category)
    
    const matchesLocation = filters.location === 'Toutes les villes' || 
      provider.location === filters.location
    
    const matchesPrice = provider.hourlyRate >= filters.priceRange[0] && 
      provider.hourlyRate <= filters.priceRange[1]
    
    const matchesRating = provider.rating >= filters.minRating

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice && matchesRating
  })

  const userBookings = (bookings || []).filter(b => b.clientId === currentUser?.id)
  const userReviews = (reviews || []).filter(r => r.clientId === currentUser?.id)

  const userInitials = currentUser?.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U'

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setShowDashboard(false)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="text-2xl font-bold text-primary">Pro En Poche</div>
            </button>

            <div className="flex items-center gap-4">
              {currentUser ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => setShowDashboard(!showDashboard)}
                    className="gap-2"
                  >
                    <ChartLine size={18} />
                    <span className="hidden sm:inline">Tableau de bord</span>
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={currentUser.avatar} />
                          <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="hidden sm:inline">{currentUser.name}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setShowDashboard(true)}>
                        <ChartLine size={16} className="mr-2" />
                        Tableau de bord
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut}>
                        <SignOut size={16} className="mr-2" />
                        Déconnexion
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Button onClick={() => setAuthOpen(true)} className="gap-2">
                  <UserIcon size={18} />
                  Connexion
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {showDashboard && currentUser ? (
          <Dashboard
            bookings={userBookings}
            reviews={userReviews}
            providers={providers || []}
            onMarkComplete={handleMarkComplete}
            onOpenReview={handleOpenReview}
          />
        ) : (
          <>
            <HeroSlider />

            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold tracking-tight mb-3">
                Trouvez des Services Professionnels près de Chez Vous
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Connectez-vous avec des professionnels vérifiés partout au Canada
              </p>

              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <MagnifyingGlass
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    placeholder="Recherchez des services ou des professionnels..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-base"
                  />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-[280px_1fr] gap-6">
              <aside className="hidden lg:block">
                <FilterPanel
                  filters={filters}
                  onFilterChange={setFilters}
                  onClear={() =>
                    setFilters({
                      category: 'Tous les services',
                      location: 'Toutes les villes',
                      priceRange: [0, 200],
                      minRating: 0,
                    })
                  }
                />
              </aside>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">
                    {filteredProviders.length} Service{filteredProviders.length !== 1 ? 's' : ''} Disponible{filteredProviders.length !== 1 ? 's' : ''}
                  </h2>
                </div>

                {filteredProviders.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-lg text-muted-foreground">
                      Aucun service trouvé. Essayez d'ajuster vos filtres.
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredProviders.map((provider) => (
                      <ProviderCard
                        key={provider.id}
                        provider={provider}
                        onBook={handleBook}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} onAuth={handleAuth} />
      
      <BookingDialog
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
        provider={selectedProvider}
        onConfirm={handleConfirmBooking}
        currentUserId={currentUser?.id || ''}
      />

      {selectedBooking && (
        <ReviewDialog
          open={reviewDialogOpen}
          onOpenChange={setReviewDialogOpen}
          bookingId={selectedBooking.id}
          providerId={selectedBooking.providerId}
          providerName={(providers || []).find(p => p.id === selectedBooking.providerId)?.name || ''}
          clientId={currentUser?.id || ''}
          onSubmit={handleSubmitReview}
        />
      )}

      <Toaster />
    </div>
  )
}

export default App
