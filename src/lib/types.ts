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

export interface Announcement {
  id: string
  providerId: string
  title: string
  description: string
  category: string
  hourlyRate: number
  location: string
  availability: string
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
