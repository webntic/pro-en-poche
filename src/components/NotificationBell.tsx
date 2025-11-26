import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bell } from '@phosphor-icons/react'
import { Notification } from '@/lib/types'

interface NotificationBellProps {
  notifications: Notification[]
  currentUserId: string
  onClick: () => void
}

export function NotificationBell({
  notifications,
  currentUserId,
  onClick,
}: NotificationBellProps) {
  const unreadCount = notifications.filter(
    n => n.userId === currentUserId && !n.isRead
  ).length

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="relative hover:bg-primary/5"
    >
      <Bell size={20} weight={unreadCount > 0 ? 'fill' : 'duotone'} />
      {unreadCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs font-semibold"
        >
          {unreadCount > 99 ? '99+' : unreadCount}
        </Badge>
      )}
    </Button>
  )
}
