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
import { AuthPage } from '@/components/AuthPage'
import { ReviewDialog } from '@/components/ReviewDialog'
import { PaymentDialog } from '@/components/PaymentDialog'
import { Dashboard } from '@/components/Dashboard'
import { ProviderDashboard } from '@/components/ProviderDashboard'
import { AdminDashboard } from '@/components/AdminDashboard'
import { SuperAdminDashboard } from '@/components/SuperAdminDashboard'
import { AnnouncementDialog } from '@/components/AnnouncementDialog'
import { HeroSlider } from '@/components/HeroSlider'
import { Logo } from '@/components/Logo'
import { AboutSection } from '@/components/AboutSection'
import { ServicesSection } from '@/components/ServicesSection'
import { PricingSection } from '@/components/PricingSection'
import { ContactSection } from '@/components/ContactSection'
import { BecomeProviderSection } from '@/components/BecomeProviderSection'
import { WhyChooseUsSection } from '@/components/WhyChooseUsSection'
import { FAQSection } from '@/components/FAQSection'
import { Footer } from '@/components/Footer'
import { User, ServiceProvider, Booking, Review, Announcement, SiteSettings } from '@/lib/types'
import { DEMO_PROVIDERS } from '@/lib/demo-data'
import { toast } from 'sonner'
import logoImage from '@/assets/images/logo.svg'

function App() {
  const [currentUser, setCurrentUser] = useKV<User | null>('current-user', null)
  const [providers, setProviders] = useKV<ServiceProvider[]>('providers', [])
  const [users, setUsers] = useKV<User[]>('users', [])
  const [bookings, setBookings] = useKV<Booking[]>('bookings', [])
  const [reviews, setReviews] = useKV<Review[]>('reviews', [])
  const [announcements, setAnnouncements] = useKV<Announcement[]>('announcements', [])
  const [siteSettings, setSiteSettings] = useKV<SiteSettings>('site-settings', {
    smtp: {
      host: '',
      port: 587,
      username: '',
      password: '',
      fromEmail: '',
      fromName: 'Pro En Poche',
    },
    stripe: {
      publishableKey: '',
      secretKey: '',
      webhookSecret: '',
    },
    updatedAt: new Date().toISOString(),
  })

  const [authOpen, setAuthOpen] = useState(false)
  const [authInitialRole, setAuthInitialRole] = useState<'client' | 'provider' | undefined>(undefined)
  const [showAuthPage, setShowAuthPage] = useState(false)
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false)
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [announcementDialogOpen, setAnnouncementDialogOpen] = useState(false)
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number | null } | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showDashboard, setShowDashboard] = useState(false)
  const [activeSection, setActiveSection] = useState<'accueil' | 'apropos' | 'services' | 'tarifs' | 'prestataires' | 'faq'>('accueil')
  
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
    
    const existingUser = (users || []).find(u => u.id === user.id)
    if (!existingUser) {
      if (user.role === 'provider') {
        const newProvider: ServiceProvider = {
          ...(user as ServiceProvider),
          verified: false,
        }
        setProviders((current) => [...(current || []), newProvider])
        toast.success('Votre compte prestataire est en attente de validation par un administrateur')
      } else {
        setUsers((current) => [...(current || []), user])
      }
    }
  }

  const handleSignOut = () => {
    setCurrentUser(null)
    setShowDashboard(false)
    toast.success('Déconnexion réussie')
  }

  const handleBook = (provider: ServiceProvider) => {
    if (!currentUser) {
      toast.error('Veuillez vous connecter pour réserver un service')
      setAuthInitialRole(undefined)
      setShowAuthPage(true)
      return
    }
    setSelectedProvider(provider)
    setBookingDialogOpen(true)
  }

  const handleBuyPlan = (planName: string) => {
    if (!currentUser) {
      setAuthInitialRole('provider')
      setShowAuthPage(true)
      toast.info('Créez votre compte prestataire pour accéder aux plans')
    } else if (currentUser.role !== 'provider') {
      toast.error('Seuls les prestataires peuvent souscrire à un plan')
    } else {
      let planPrice: number | null = null
      
      if (planName === 'VIP') {
        planPrice = 59
      } else if (planName === 'PREMIUM') {
        planPrice = 99
      }
      
      setSelectedPlan({ name: planName, price: planPrice })
      
      if (planPrice === null) {
        activateFreePlan()
      } else {
        setPaymentDialogOpen(true)
      }
    }
  }

  const activateFreePlan = () => {
    const startDate = new Date()
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + 1)
    
    const subscription = {
      plan: 'basic' as const,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      isActive: true,
    }
    
    setProviders((current) =>
      (current || []).map((p) =>
        p.id === currentUser?.id ? { ...p, subscription } : p
      )
    )
    
    setCurrentUser((current) => {
      if (current && current.role === 'provider') {
        return { ...current, subscription } as ServiceProvider
      }
      return current || null
    })
    
    toast.success('Plan ESSENTIEL activé avec succès! Vous pouvez maintenant créer des annonces.')
    setShowDashboard(true)
    setActiveSection('accueil')
  }

  const handlePaymentSuccess = () => {
    if (!selectedPlan || !currentUser) return
    
    const startDate = new Date()
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + 1)
    
    let planType: 'basic' | 'premium' | 'enterprise' = 'basic'
    
    if (selectedPlan.name === 'VIP') {
      planType = 'premium'
    } else if (selectedPlan.name === 'PREMIUM') {
      planType = 'enterprise'
    }
    
    const subscription = {
      plan: planType,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      isActive: true,
    }
    
    setProviders((current) =>
      (current || []).map((p) =>
        p.id === currentUser.id ? { ...p, subscription } : p
      )
    )
    
    setCurrentUser((current) => {
      if (current && current.role === 'provider') {
        return { ...current, subscription } as ServiceProvider
      }
      return current || null
    })
    
    toast.success(`Plan ${selectedPlan.name} activé avec succès! Paiement de ${selectedPlan.price}$ effectué.`)
    setShowDashboard(true)
    setActiveSection('accueil')
    setSelectedPlan(null)
  }

  const handleGoToSubscription = () => {
    setShowDashboard(false)
    setActiveSection('tarifs')
    window.scrollTo({ top: 0, behavior: 'smooth' })
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

  const handleCreateAnnouncement = () => {
    setEditingAnnouncement(null)
    setAnnouncementDialogOpen(true)
  }

  const handleEditAnnouncement = (announcement: Announcement) => {
    setEditingAnnouncement(announcement)
    setAnnouncementDialogOpen(true)
  }

  const handleSubmitAnnouncement = (announcementData: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingAnnouncement) {
      setAnnouncements((current) =>
        (current || []).map((a) =>
          a.id === editingAnnouncement.id
            ? { ...a, ...announcementData, updatedAt: new Date().toISOString() }
            : a
        )
      )
      toast.success('Annonce mise à jour avec succès!')
    } else {
      const newAnnouncement: Announcement = {
        ...announcementData,
        id: `announcement-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setAnnouncements((current) => [...(current || []), newAnnouncement])
      toast.success('Annonce créée avec succès!')
    }
    setEditingAnnouncement(null)
  }

  const handleDeleteAnnouncement = (announcementId: string) => {
    setAnnouncements((current) => (current || []).filter((a) => a.id !== announcementId))
  }

  const handleToggleAnnouncementStatus = (announcementId: string, isActive: boolean) => {
    setAnnouncements((current) =>
      (current || []).map((a) =>
        a.id === announcementId ? { ...a, isActive, updatedAt: new Date().toISOString() } : a
      )
    )
    toast.success(isActive ? 'Annonce activée' : 'Annonce désactivée')
  }

  const handleApproveProvider = (providerId: string) => {
    setProviders((current) =>
      (current || []).map((p) =>
        p.id === providerId ? { ...p, verified: true } : p
      )
    )
    const provider = providers?.find(p => p.id === providerId)
    if (provider) {
      setUsers((current) => [...(current || []), provider])
    }
    toast.success('Prestataire approuvé avec succès!')
  }

  const handleRejectProvider = (providerId: string) => {
    setProviders((current) => (current || []).filter((p) => p.id !== providerId))
    toast.success('Prestataire rejeté')
  }

  const handleDeleteUser = (userId: string) => {
    setUsers((current) => (current || []).filter((u) => u.id !== userId))
    setProviders((current) => (current || []).filter((p) => p.id !== userId))
  }

  const filteredProviders = (providers || []).filter((provider) => {
    if (!provider.verified) return false
    
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
  const userAnnouncements = (announcements || []).filter(a => a.providerId === currentUser?.id)

  const userInitials = currentUser?.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U'

  const isProvider = currentUser?.role === 'provider'
  const isAdmin = currentUser?.role === 'admin'
  const isSuperAdmin = currentUser?.role === 'superadmin'
  const allUsers = [...(users || []), ...(providers || [])]

  const handleUpdateSettings = (newSettings: SiteSettings) => {
    setSiteSettings(newSettings)
  }

  const handleFooterNavigate = (section: 'faq') => {
    setShowDashboard(false)
    setActiveSection(section)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {showAuthPage ? (
        <AuthPage
          onAuth={handleAuth}
          onClose={() => setShowAuthPage(false)}
          initialRole={authInitialRole}
          logo={siteSettings?.logo}
        />
      ) : (
        <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-8">
            <button 
              onClick={() => {
                setShowDashboard(false)
                setActiveSection('accueil')
              }}
              className="flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <img src={siteSettings?.logo || logoImage} alt="Pro En Poche" className="h-12 w-auto" />
            </button>

            <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
              {[
                { key: 'accueil' as const, label: 'Accueil' },
                { key: 'apropos' as const, label: 'À Propos' },
                { key: 'services' as const, label: 'Services' },
                { key: 'tarifs' as const, label: 'Tarifs' },
                { key: 'prestataires' as const, label: 'Prestataires' },
              ].map((item) => (
                <Button
                  key={item.key}
                  variant="ghost"
                  onClick={() => {
                    setShowDashboard(false)
                    setActiveSection(item.key)
                  }}
                  className={`font-medium transition-colors ${
                    activeSection === item.key
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.label}
                </Button>
              ))}
            </nav>

            <div className="flex items-center gap-4 flex-shrink-0">
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
                <Button onClick={() => {
                  setAuthInitialRole(undefined)
                  setShowAuthPage(true)
                }} className="gap-2">
                  <UserIcon size={18} />
                  Connexion
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {showDashboard && currentUser ? (
        <main className="container mx-auto px-4 py-8">
          {isSuperAdmin && siteSettings ? (
            <SuperAdminDashboard
              settings={siteSettings}
              onUpdateSettings={handleUpdateSettings}
            />
          ) : isAdmin ? (
            <AdminDashboard
              users={allUsers}
              providers={providers || []}
              bookings={bookings || []}
              reviews={reviews || []}
              onApproveProvider={handleApproveProvider}
              onRejectProvider={handleRejectProvider}
              onDeleteUser={handleDeleteUser}
            />
          ) : isProvider ? (
            <ProviderDashboard
              providerId={currentUser.id}
              provider={currentUser as ServiceProvider}
              announcements={userAnnouncements}
              bookings={bookings || []}
              reviews={reviews || []}
              onCreateAnnouncement={handleCreateAnnouncement}
              onEditAnnouncement={handleEditAnnouncement}
              onDeleteAnnouncement={handleDeleteAnnouncement}
              onToggleAnnouncementStatus={handleToggleAnnouncementStatus}
              onGoToSubscription={handleGoToSubscription}
            />
          ) : (
            <Dashboard
              bookings={userBookings}
              reviews={userReviews}
              providers={providers || []}
              onMarkComplete={handleMarkComplete}
              onOpenReview={handleOpenReview}
            />
          )}
        </main>
      ) : activeSection === 'apropos' ? (
        <AboutSection />
      ) : activeSection === 'services' ? (
        <ServicesSection />
      ) : activeSection === 'tarifs' ? (
        <PricingSection onBuyPlan={handleBuyPlan} />
      ) : activeSection === 'faq' ? (
        <FAQSection />
      ) : activeSection === 'prestataires' || activeSection === 'accueil' ? (
        <>
          {activeSection === 'accueil' && (
            <>
              <HeroSlider />
              <WhyChooseUsSection />
              <BecomeProviderSection />
            </>
          )}

          <main className="container mx-auto px-4 py-8">
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
          </main>
        </>
      ) : null}

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

      {currentUser?.role === 'provider' && (
        <AnnouncementDialog
          open={announcementDialogOpen}
          onOpenChange={setAnnouncementDialogOpen}
          providerId={currentUser.id}
          editAnnouncement={editingAnnouncement || undefined}
          onSubmit={handleSubmitAnnouncement}
        />
      )}

      {selectedPlan && (
        <PaymentDialog
          open={paymentDialogOpen}
          onOpenChange={setPaymentDialogOpen}
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      <Footer onNavigate={handleFooterNavigate} />

      <Toaster />
        </div>
      )}
    </>
  )
}

export default App
