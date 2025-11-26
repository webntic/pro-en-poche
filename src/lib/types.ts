export type UserRole = 'client' | 'provider' | 'admin' | 'superadmin'

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'disputed'

export type PaymentStatus = 'pending' | 'held' | 'released' | 'refunded'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  createdAt: string
  phone?: string
  address?: string
  servicePreferences?: ServicePreferences
}

export interface ServicePreferences {
  serviceType: string
  frequency: string
  availability: string
  preferredDate: string
  preferredTime: string
  timeSlot: string
  needDescription: string
  budget: number
  comments: string
  consentMarketing: boolean
}

export type SubscriptionPlan = 'basic' | 'premium' | 'enterprise' | null

export interface Subscription {
  plan: SubscriptionPlan
  startDate: string
  endDate: string
  isActive: boolean
}

export interface ServiceProvider extends User {
  role: 'provider'
  bio: string
  services: string[]
  location: string
  availability: string
  hourlyRate: number
  rating: number
  reviewCount: number
  verified: boolean
  subscription?: Subscription
  profession?: string
  portfolioImages?: string[]
  certifications?: string[]
  experience?: string
  languages?: string[]
  responseTime?: string
  attachments?: ProviderAttachment[]
}

export interface ProviderAttachment {
  id: string
  name: string
  type: 'identity' | 'certification' | 'insurance' | 'other'
  url: string
  uploadedAt: string
}

export interface Client extends User {
  role: 'client'
}

export interface Booking {
  id: string
  providerId: string
  clientId: string
  serviceType: string
  date: string
  time: string
  status: BookingStatus
  price: number
  paymentStatus: PaymentStatus
  createdAt: string
  completedAt?: string
}

export interface Review {
  id: string
  bookingId: string
  providerId: string
  clientId: string
  rating: number
  comment: string
  createdAt: string
}

export interface ServiceCategory {
  id: string
  name: string
  icon: string
}

export interface AvailabilitySlot {
  date: string
  startTime: string
  endTime: string
}

export interface Announcement {
  id: string
  providerId: string
  title: string
  description: string
  category: string
  hourlyRate: number
  location: string
  availability: string
  availabilitySlots?: AvailabilitySlot[]
  services: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface SiteSettings {
  logo?: string
  smtp: {
    host: string
    port: number
    username: string
    password: string
    fromEmail: string
    fromName: string
  }
  stripe: {
    publishableKey: string
    secretKey: string
    webhookSecret: string
  }
  updatedAt: string
}

export interface SiteContent {
  hero: {
    mainTitle: string
    subtitle: string
    searchPlaceholder: string
  }
  about: {
    title: string
    description: string
    features: Array<{
      title: string
      description: string
    }>
  }
  services: {
    title: string
    description: string
    categories: Array<{
      name: string
      description: string
    }>
  }
  whyChooseUs: {
    title: string
    subtitle: string
    reasons: Array<{
      title: string
      description: string
    }>
  }
  stats: {
    title: string
    subtitle: string
    providers: { label: string; value: string }
    clients: { label: string; value: string }
    bookings: { label: string; value: string }
    satisfaction: { label: string; value: string }
    image?: string
  }
  testimonials: {
    title: string
    subtitle: string
    items: Array<{
      name: string
      role: string
      content: string
      rating: number
      avatar?: string
      service?: string
    }>
  }
  becomeProvider: {
    title: string
    subtitle: string
    description: string
    buttonText: string
    image?: string
    benefits: Array<{
      title: string
      description: string
    }>
  }
  faq: {
    title: string
    subtitle: string
    items: Array<{
      question: string
      answer: string
    }>
  }
  footer: {
    description: string
    copyright: string
    aboutImage?: string
  }
  homeSlides: Array<{
    id: number
    title: string
    description: string
    image: string
    alt: string
    buttonText: string
  }>
}

export interface ChatMessage {
  id: string
  bookingId: string
  senderId: string
  senderName: string
  senderAvatar?: string
  message: string
  createdAt: string
  isRead: boolean
}

export interface ChatConversation {
  bookingId: string
  providerId: string
  providerName: string
  providerAvatar?: string
  clientId: string
  clientName: string
  clientAvatar?: string
  lastMessage?: string
  lastMessageAt?: string
  unreadCount: number
}

export type NotificationType = 
  | 'booking_created'
  | 'booking_confirmed'
  | 'booking_completed'
  | 'booking_cancelled'
  | 'payment_received'
  | 'payment_released'
  | 'review_received'
  | 'message_received'
  | 'account_approved'
  | 'account_rejected'
  | 'subscription_activated'
  | 'subscription_expiring'
  | 'announcement_created'
  | 'announcement_updated'
  | 'admin_message'

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  link?: string
  data?: Record<string, any>
  isRead: boolean
  createdAt: string
}
