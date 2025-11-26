import { Notification, NotificationType } from './types'

export function createNotification(
  userId: string,
  type: NotificationType,
  title: string,
  message: string,
  link?: string,
  data?: Record<string, any>
): Notification {
  return {
    id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    userId,
    type,
    title,
    message,
    link,
    data,
    isRead: false,
    createdAt: new Date().toISOString(),
  }
}

export function getNotificationIcon(type: NotificationType): string {
  switch (type) {
    case 'booking_created':
    case 'booking_confirmed':
      return '📅'
    case 'booking_completed':
      return '✅'
    case 'booking_cancelled':
      return '❌'
    case 'payment_received':
    case 'payment_released':
      return '💰'
    case 'review_received':
      return '⭐'
    case 'message_received':
      return '💬'
    case 'account_approved':
      return '🎉'
    case 'account_rejected':
      return '⚠️'
    case 'subscription_activated':
      return '🚀'
    case 'subscription_expiring':
      return '⏰'
    case 'announcement_created':
    case 'announcement_updated':
      return '📢'
    case 'admin_message':
      return '📩'
    default:
      return '🔔'
  }
}

export function getNotificationColor(type: NotificationType): string {
  switch (type) {
    case 'booking_completed':
    case 'payment_released':
    case 'account_approved':
    case 'subscription_activated':
      return 'bg-green-50 border-green-200'
    case 'booking_cancelled':
    case 'account_rejected':
      return 'bg-red-50 border-red-200'
    case 'subscription_expiring':
    case 'admin_message':
      return 'bg-orange-50 border-orange-200'
    case 'message_received':
      return 'bg-blue-50 border-blue-200'
    default:
      return 'bg-gray-50 border-gray-200'
  }
}
