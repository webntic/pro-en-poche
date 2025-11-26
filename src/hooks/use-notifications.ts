import { useKV } from '@github/spark/hooks'
import { Notification, NotificationType } from '@/lib/types'
import { createNotification } from '@/lib/notifications'
import { toast } from 'sonner'

export function useNotifications() {
  const [notifications, setNotifications] = useKV<Notification[]>('notifications', [])

  const addNotification = (
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
    link?: string,
    data?: Record<string, any>,
    showToast = true
  ) => {
    const notification = createNotification(userId, type, title, message, link, data)
    
    setNotifications((current) => [notification, ...(current || [])])
    
    if (showToast) {
      toast.success(title, {
        description: message,
      })
    }
    
    return notification
  }

  const markAsRead = (notificationId: string) => {
    setNotifications((current) =>
      (current || []).map((n) =>
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    )
  }

  const markAllAsRead = (userId: string) => {
    setNotifications((current) =>
      (current || []).map((n) =>
        n.userId === userId ? { ...n, isRead: true } : n
      )
    )
  }

  const deleteNotification = (notificationId: string) => {
    setNotifications((current) =>
      (current || []).filter((n) => n.id !== notificationId)
    )
  }

  const deleteAllForUser = (userId: string) => {
    setNotifications((current) =>
      (current || []).filter((n) => n.userId !== userId)
    )
  }

  const getUnreadCount = (userId: string) => {
    return (notifications || []).filter(
      (n) => n.userId === userId && !n.isRead
    ).length
  }

  return {
    notifications: notifications || [],
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllForUser,
    getUnreadCount,
  }
}
