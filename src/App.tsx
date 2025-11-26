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
import { MagnifyingGlass, User as UserIcon, SignOut, ChartLine, PencilSimple } from '@phosphor-icons/react'
import { ProviderCard } from '@/components/ProviderCard'
import { ProviderPublicPage } from '@/components/ProviderPublicPage'
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
import { ChatDialog } from '@/components/ChatDialog'
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
import { PopularCategoriesSection } from '@/components/PopularCategoriesSection'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { StatsSection } from '@/components/StatsSection'
import { ProviderRegistrationSuccess } from '@/components/ProviderRegistrationSuccess'
import { ProfileEditDialog } from '@/components/ProfileEditDialog'
import { CookieConsent } from '@/components/CookieConsent'
import { ContentEditToggle } from '@/components/ContentEditToggle'
import { InlineEditor } from '@/components/InlineEditor'
import { NotificationBell } from '@/components/NotificationBell'
import { NotificationCenter } from '@/components/NotificationCenter'
import { User, ServiceProvider, Booking, Review, Announcement, SiteSettings, SiteContent, ChatMessage, ChatConversation } from '@/lib/types'
import { DEMO_PROVIDERS } from '@/lib/demo-data'
import { DEFAULT_SITE_CONTENT } from '@/lib/default-content'
import { useNotifications } from '@/hooks/use-notifications'
import { toast } from 'sonner'
import logoImage from '@/assets/images/logo.svg'

function App() {
  const [currentUser, setCurrentUser] = useKV<User | null>('current-user', null)
  const [providers, setProviders] = useKV<ServiceProvider[]>('providers', [])
  const [users, setUsers] = useKV<User[]>('users', [])
  const [bookings, setBookings] = useKV<Booking[]>('bookings', [])
  const [reviews, setReviews] = useKV<Review[]>('reviews', [])
  const [messages, setMessages] = useKV<ChatMessage[]>('chat-messages', [])
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
  const [siteContent, setSiteContent] = useKV<SiteContent>('site-content', DEFAULT_SITE_CONTENT)
  const [contentEditMode, setContentEditMode] = useState(false)
  
  const { 
    notifications, 
    addNotification, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
  } = useNotifications()

  const [authOpen, setAuthOpen] = useState(false)
  const [authInitialRole, setAuthInitialRole] = useState<'client' | 'provider' | undefined>(undefined)
  const [showAuthPage, setShowAuthPage] = useState(false)
  const [showProviderSuccess, setShowProviderSuccess] = useState(false)
  const [pendingProviderData, setPendingProviderData] = useState<{ name: string; email: string } | null>(null)
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false)
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [announcementDialogOpen, setAnnouncementDialogOpen] = useState(false)
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [chatDialogOpen, setChatDialogOpen] = useState(false)
  const [profileEditOpen, setProfileEditOpen] = useState(false)
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null)
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number | null } | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showDashboard, setShowDashboard] = useState(false)
  const [showProviderProfile, setShowProviderProfile] = useState(false)
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
    const existingUser = (users || []).find(u => u.id === user.id || u.email === user.email)
    if (!existingUser) {
      if (user.role === 'provider') {
        const newProvider: ServiceProvider = {
          ...(user as ServiceProvider),
          verified: false,
        }
        setProviders((current) => [...(current || []), newProvider])
        setPendingProviderData({ name: user.name, email: user.email })
        setShowProviderSuccess(true)
        setShowAuthPage(false)
      } else if (user.role === 'admin') {
        setCurrentUser(user)
        setUsers((current) => [...(current || []), user])
        setShowAuthPage(false)
        toast.success('Bienvenue administrateur!')
      } else {
        setCurrentUser(user)
        setUsers((current) => [...(current || []), user])
        setShowAuthPage(false)
      }
    } else {
      setCurrentUser(existingUser)
      setShowAuthPage(false)
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
    setShowProviderProfile(false)
    setBookingDialogOpen(true)
  }

  const handleViewProviderProfile = (provider: ServiceProvider) => {
    setSelectedProvider(provider)
    setShowProviderProfile(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackFromProfile = () => {
    setShowProviderProfile(false)
    setSelectedProvider(null)
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
    
    if (currentUser) {
      addNotification(
        currentUser.id,
        'subscription_activated',
        'Plan activé!',
        'Votre plan ESSENTIEL a été activé avec succès. Vous pouvez maintenant créer des annonces.',
        undefined,
        { plan: 'basic' },
        false
      )
    }
    
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
    
    addNotification(
      currentUser.id,
      'subscription_activated',
      `Plan ${selectedPlan.name} activé!`,
      `Votre plan ${selectedPlan.name} a été activé avec succès. Paiement de ${selectedPlan.price}$ effectué.`,
      undefined,
      { plan: planType, price: selectedPlan.price },
      false
    )
    
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
    
    const provider = providers?.find(p => p.id === bookingData.providerId)
    
    addNotification(
      bookingData.providerId,
      'booking_created',
      'Nouvelle réservation',
      `Vous avez reçu une nouvelle réservation pour ${bookingData.serviceType}`,
      undefined,
      { bookingId: newBooking.id },
      false
    )
    
    addNotification(
      bookingData.clientId,
      'booking_confirmed',
      'Réservation confirmée',
      `Votre réservation avec ${provider?.name || 'le prestataire'} a été confirmée`,
      undefined,
      { bookingId: newBooking.id },
      false
    )
    
    toast.success('Paiement effectué avec succès! Réservation confirmée. Le montant est conservé en garantie jusqu\'à la fin du service.', {
      duration: 5000,
    })
  }

  const handleMarkComplete = (bookingId: string) => {
    const booking = bookings?.find(b => b.id === bookingId)
    
    setBookings((current) =>
      (current || []).map((b) =>
        b.id === bookingId ? { ...b, status: 'completed', completedAt: new Date().toISOString() } : b
      )
    )
    
    if (booking) {
      addNotification(
        booking.clientId,
        'booking_completed',
        'Service terminé',
        'Le prestataire a marqué le service comme terminé. Vous pouvez maintenant laisser un avis.',
        undefined,
        { bookingId },
        false
      )
    }
    
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
    
    addNotification(
      reviewData.providerId,
      'review_received',
      'Nouvel avis reçu',
      `Vous avez reçu un avis ${reviewData.rating} étoiles`,
      undefined,
      { reviewId: newReview.id, rating: reviewData.rating },
      false
    )
    
    addNotification(
      reviewData.providerId,
      'payment_released',
      'Paiement libéré',
      'Le paiement pour votre service a été libéré suite à l\'avis du client',
      undefined,
      { bookingId: reviewData.bookingId },
      false
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
      
      if (currentUser) {
        addNotification(
          currentUser.id,
          'announcement_updated',
          'Annonce mise à jour',
          `Votre annonce "${announcementData.title}" a été mise à jour avec succès`,
          undefined,
          { announcementId: editingAnnouncement.id },
          false
        )
      }
      
      toast.success('Annonce mise à jour avec succès!')
    } else {
      const newAnnouncement: Announcement = {
        ...announcementData,
        id: `announcement-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setAnnouncements((current) => [...(current || []), newAnnouncement])
      
      if (currentUser) {
        addNotification(
          currentUser.id,
          'announcement_created',
          'Annonce créée',
          `Votre annonce "${announcementData.title}" a été créée avec succès`,
          undefined,
          { announcementId: newAnnouncement.id },
          false
        )
      }
      
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
      
      addNotification(
        providerId,
        'account_approved',
        'Compte approuvé!',
        'Félicitations! Votre compte prestataire a été approuvé. Vous pouvez maintenant commencer à recevoir des réservations.',
        undefined,
        undefined,
        false
      )
    }
    toast.success('Prestataire approuvé avec succès! Un email de confirmation a été envoyé.')
  }

  const handleRejectProvider = (providerId: string) => {
    const provider = providers?.find(p => p.id === providerId)
    
    if (provider) {
      addNotification(
        providerId,
        'account_rejected',
        'Demande refusée',
        'Votre demande de compte prestataire a été refusée. Veuillez nous contacter pour plus d\'informations.',
        undefined,
        undefined,
        false
      )
    }
    
    setProviders((current) => (current || []).filter((p) => p.id !== providerId))
    toast.success('Prestataire rejeté. Un email d\'information a été envoyé.')
  }

  const handleDeleteUser = (userId: string) => {
    setUsers((current) => (current || []).filter((u) => u.id !== userId))
    setProviders((current) => (current || []).filter((p) => p.id !== userId))
  }

  const handleUpdateContent = (path: string[], value: string) => {
    setSiteContent((current) => {
      if (!current) return DEFAULT_SITE_CONTENT
      const newContent = JSON.parse(JSON.stringify(current))
      let target: any = newContent
      
      for (let i = 0; i < path.length - 1; i++) {
        target = target[path[i]]
      }
      
      const lastKey = path[path.length - 1]
      
      try {
        target[lastKey] = JSON.parse(value)
      } catch {
        target[lastKey] = value
      }
      
      return newContent
    })
    
    toast.success('Contenu mis à jour avec succès!')
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

  const handleCreateAdmin = (admin: User) => {
    setUsers((current) => [...(current || []), admin])
  }

  const handleDeleteAdmin = (adminId: string) => {
    setUsers((current) => (current || []).filter((u) => u.id !== adminId))
  }

  const handleOpenChat = (conversation: ChatConversation) => {
    setSelectedConversation(conversation)
    setChatDialogOpen(true)
    
    setMessages((current) =>
      (current || []).map((m) =>
        m.bookingId === conversation.bookingId && m.senderId !== currentUser?.id
          ? { ...m, isRead: true }
          : m
      )
    )
  }

  const handleSendMessage = (messageText: string) => {
    if (!selectedConversation || !currentUser) return
    
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      bookingId: selectedConversation.bookingId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      message: messageText,
      createdAt: new Date().toISOString(),
      isRead: false,
    }
    
    setMessages((current) => [...(current || []), newMessage])
    
    const recipientId = currentUser.id === selectedConversation.providerId
      ? selectedConversation.clientId
      : selectedConversation.providerId
    
    addNotification(
      recipientId,
      'message_received',
      'Nouveau message',
      `${currentUser.name} vous a envoyé un message`,
      undefined,
      { bookingId: selectedConversation.bookingId },
      false
    )
  }

  const handleFooterNavigate = (section: 'faq') => {
    setShowDashboard(false)
    setActiveSection(section)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleUpdateProfile = (updates: Partial<User | ServiceProvider>) => {
    if (!currentUser) return

    const updatedUser = { ...currentUser, ...updates }
    setCurrentUser(updatedUser)

    setUsers((current) =>
      (current || []).map((u) =>
        u.id === currentUser.id ? { ...u, ...updates } : u
      )
    )

    if (currentUser.role === 'provider') {
      setProviders((current) =>
        (current || []).map((p) =>
          p.id === currentUser.id ? { ...p, ...updates } as ServiceProvider : p
        )
      )
    }
  }

  return (
    <>
      {showProviderSuccess && pendingProviderData ? (
        <ProviderRegistrationSuccess
          providerName={pendingProviderData.name}
          providerEmail={pendingProviderData.email}
          onClose={() => {
            setShowProviderSuccess(false)
            setPendingProviderData(null)
          }}
          logo={siteSettings?.logo}
        />
      ) : showAuthPage ? (
        <AuthPage
          onAuth={handleAuth}
          onClose={() => setShowAuthPage(false)}
          initialRole={authInitialRole}
          logo={siteSettings?.logo}
          existingUsers={[...(users || []), ...(providers || [])]}
        />
      ) : showProviderProfile && selectedProvider ? (
        <ProviderPublicPage
          provider={selectedProvider}
          reviews={reviews || []}
          onBook={handleBook}
          onBack={handleBackFromProfile}
        />
      ) : (
        <div className="min-h-screen bg-background flex flex-col">
      <header className="premium-header sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between gap-8">
            <button 
              onClick={() => {
                setShowDashboard(false)
                setActiveSection('accueil')
              }}
              className="flex-shrink-0 hover:opacity-75 transition-all duration-300"
            >
              <img src={siteSettings?.logo || logoImage} alt="Pro En Poche" className="h-11 w-auto" />
            </button>

            <nav className="hidden md:flex items-center gap-2 flex-1 justify-center">
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
                  className={`font-medium tracking-tight transition-all duration-300 relative group ${
                    activeSection === item.key
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-primary'
                  }`}
                >
                  {item.label}
                  {activeSection === item.key && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary rounded-full" />
                  )}
                </Button>
              ))}
            </nav>

            <div className="flex items-center gap-3 flex-shrink-0">
              {currentUser ? (
                <>
                  <NotificationBell
                    notifications={notifications}
                    currentUserId={currentUser.id}
                    onClick={() => setNotificationCenterOpen(true)}
                  />
                  
                  <Button
                    variant="ghost"
                    onClick={() => setShowDashboard(!showDashboard)}
                    className="gap-2.5 hover:bg-primary/5"
                  >
                    <ChartLine size={18} weight="duotone" />
                    <span className="hidden sm:inline font-medium">Tableau de bord</span>
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="gap-2.5 hover:bg-primary/5">
                        <Avatar className="h-9 w-9 ring-2 ring-primary/10">
                          <AvatarImage src={currentUser.avatar} />
                          <AvatarFallback className="text-xs font-semibold bg-primary text-primary-foreground">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="hidden sm:inline font-medium">{currentUser.name}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem onClick={() => setShowDashboard(true)} className="cursor-pointer">
                        <ChartLine size={16} className="mr-3" weight="duotone" />
                        Tableau de bord
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setProfileEditOpen(true)} className="cursor-pointer">
                        <PencilSimple size={16} className="mr-3" weight="duotone" />
                        Modifier mon profil
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                        <SignOut size={16} className="mr-3" weight="duotone" />
                        Déconnexion
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Button onClick={() => {
                  setAuthInitialRole(undefined)
                  setShowAuthPage(true)
                }} className="gap-2 px-6 font-medium shadow-sm hover:shadow-md transition-all duration-300">
                  <UserIcon size={18} weight="duotone" />
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
              admins={(users || []).filter(u => u.role === 'admin')}
              onCreateAdmin={handleCreateAdmin}
              onDeleteAdmin={handleDeleteAdmin}
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
              messages={messages || []}
              users={allUsers}
              onCreateAnnouncement={handleCreateAnnouncement}
              onEditAnnouncement={handleEditAnnouncement}
              onDeleteAnnouncement={handleDeleteAnnouncement}
              onToggleAnnouncementStatus={handleToggleAnnouncementStatus}
              onGoToSubscription={handleGoToSubscription}
              onOpenChat={handleOpenChat}
              onEditProfile={() => setProfileEditOpen(true)}
            />
          ) : (
            <Dashboard
              bookings={userBookings}
              reviews={userReviews}
              providers={providers || []}
              messages={messages || []}
              currentUserId={currentUser.id}
              currentUserName={currentUser.name}
              currentUserAvatar={currentUser.avatar}
              onMarkComplete={handleMarkComplete}
              onOpenReview={handleOpenReview}
              onOpenChat={handleOpenChat}
              onEditProfile={() => setProfileEditOpen(true)}
            />
          )}
        </main>
      ) : activeSection === 'apropos' ? (
        <AboutSection
          content={siteContent?.about}
          onUpdateContent={handleUpdateContent}
          editMode={contentEditMode}
        />
      ) : activeSection === 'services' ? (
        <ServicesSection />
      ) : activeSection === 'tarifs' ? (
        <PricingSection onBuyPlan={handleBuyPlan} />
      ) : activeSection === 'faq' ? (
        <FAQSection
          content={siteContent?.faq}
          onUpdateContent={handleUpdateContent}
          editMode={contentEditMode}
        />
      ) : activeSection === 'prestataires' || activeSection === 'accueil' ? (
        <>
          {activeSection === 'accueil' && (
            <>
              <HeroSlider 
                slides={siteContent?.homeSlides}
                onUpdateContent={handleUpdateContent}
                editMode={contentEditMode}
              />
              <WhyChooseUsSection 
                content={siteContent?.whyChooseUs}
                onUpdateContent={handleUpdateContent}
                editMode={contentEditMode}
              />
              <PopularCategoriesSection />
              <StatsSection 
                content={siteContent?.stats}
                onUpdateContent={handleUpdateContent}
                editMode={contentEditMode}
              />
              <TestimonialsSection />
              <BecomeProviderSection />
            </>
          )}

          <main className="container mx-auto px-6 py-12">
            <div className="mb-12 text-center space-y-6">
              <h1 className="text-6xl font-bold tracking-tight mb-6 premium-text-gradient leading-tight whitespace-pre-line">
                <InlineEditor
                  value={siteContent?.hero.mainTitle || ''}
                  onSave={(value) => handleUpdateContent(['hero', 'mainTitle'], value)}
                  multiline
                  className="text-6xl font-bold tracking-tight premium-text-gradient leading-tight"
                  editMode={contentEditMode}
                />
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                <InlineEditor
                  value={siteContent?.hero.subtitle || ''}
                  onSave={(value) => handleUpdateContent(['hero', 'subtitle'], value)}
                  className="text-xl text-muted-foreground"
                  editMode={contentEditMode}
                />
              </p>

              <div className="max-w-2xl mx-auto pt-4">
                <div className="relative group">
                  <MagnifyingGlass
                    size={22}
                    weight="duotone"
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
                  />
                  <Input
                    placeholder={siteContent?.hero.searchPlaceholder || 'Recherchez...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-14 h-14 text-base rounded-full border-2 hover:border-primary/30 focus:border-primary transition-all duration-300 elegant-shadow"
                  />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-[300px_1fr] gap-8">
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

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-semibold tracking-tight">
                    {filteredProviders.length} Service{filteredProviders.length !== 1 ? 's' : ''} Disponible{filteredProviders.length !== 1 ? 's' : ''}
                  </h2>
                </div>

                {filteredProviders.length === 0 ? (
                  <div className="text-center py-24">
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
                        onViewProfile={handleViewProviderProfile}
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

      {selectedConversation && currentUser && (
        <ChatDialog
          open={chatDialogOpen}
          onOpenChange={setChatDialogOpen}
          bookingId={selectedConversation.bookingId}
          currentUserId={currentUser.id}
          currentUserName={currentUser.name}
          currentUserAvatar={currentUser.avatar}
          otherUserId={
            currentUser.id === selectedConversation.providerId
              ? selectedConversation.clientId
              : selectedConversation.providerId
          }
          otherUserName={
            currentUser.id === selectedConversation.providerId
              ? selectedConversation.clientName
              : selectedConversation.providerName
          }
          otherUserAvatar={
            currentUser.id === selectedConversation.providerId
              ? selectedConversation.clientAvatar
              : selectedConversation.providerAvatar
          }
          messages={(messages || []).filter(m => m.bookingId === selectedConversation.bookingId)}
          onSendMessage={handleSendMessage}
        />
      )}

      {currentUser && (
        <ProfileEditDialog
          open={profileEditOpen}
          onOpenChange={setProfileEditOpen}
          user={currentUser}
          onSave={handleUpdateProfile}
        />
      )}

      {currentUser && (
        <NotificationCenter
          open={notificationCenterOpen}
          onOpenChange={setNotificationCenterOpen}
          currentUserId={currentUser.id}
          notifications={notifications}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={() => markAllAsRead(currentUser.id)}
          onDelete={deleteNotification}
          onNavigate={(link) => {
            if (link) {
              setShowDashboard(true)
            }
          }}
        />
      )}

      {isSuperAdmin && !showDashboard && !showProviderProfile && !showAuthPage && !showProviderSuccess && (
        <ContentEditToggle
          isEditing={contentEditMode}
          onToggle={() => setContentEditMode(!contentEditMode)}
        />
      )}

      <Footer 
        onNavigate={handleFooterNavigate}
        aboutImage={siteContent?.footer.aboutImage}
        footerDescription={siteContent?.footer.description}
        onUpdateContent={handleUpdateContent}
        editMode={contentEditMode}
        logo={siteSettings?.logo}
      />

      <CookieConsent />

      <Toaster />
        </div>
      )}
    </>
  )
}

export default App
