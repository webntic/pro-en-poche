import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Bell, Check, Checks, Trash } from '@phosphor-icons/react'
import { Notification } from '@/lib/types'
import { getNotificationIcon, getNotificationColor } from '@/lib/notifications'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

interface NotificationCenterProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentUserId: string
  notifications: Notification[]
  onMarkAsRead: (notificationId: string) => void
  onMarkAllAsRead: () => void
  onDelete: (notificationId: string) => void
  onNavigate?: (link?: string) => void
}

export function NotificationCenter({
  open,
  onOpenChange,
  currentUserId,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onNavigate,
}: NotificationCenterProps) {
  const userNotifications = notifications
    .filter(n => n.userId === currentUserId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const unreadCount = userNotifications.filter(n => !n.isRead).length

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id)
    }
    if (notification.link && onNavigate) {
      onNavigate(notification.link)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-2xl font-semibold">Notifications</DialogTitle>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="rounded-full">
                  {unreadCount}
                </Badge>
              )}
            </div>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMarkAllAsRead}
                className="gap-2"
              >
                <Checks size={16} weight="duotone" />
                Tout marquer comme lu
              </Button>
            )}
          </div>
        </DialogHeader>

        <ScrollArea className="h-[calc(80vh-120px)]">
          <div className="p-6 space-y-2">
            {userNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell size={48} weight="duotone" className="mx-auto text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground">Aucune notification</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Vous serez notifié ici de toutes les activités importantes
                </p>
              </div>
            ) : (
              userNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`
                    relative p-4 rounded-lg border transition-all duration-200
                    ${!notification.isRead ? getNotificationColor(notification.type) : 'bg-white border-gray-200'}
                    ${notification.link ? 'cursor-pointer hover:shadow-md' : ''}
                  `}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 text-2xl mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {formatDistanceToNow(new Date(notification.createdAt), {
                              addSuffix: true,
                              locale: fr,
                            })}
                          </p>
                        </div>
                        
                        {!notification.isRead && (
                          <Badge variant="default" className="rounded-full px-2 py-0.5">
                            Nouveau
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      {!notification.isRead && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            onMarkAsRead(notification.id)
                          }}
                          className="h-8 w-8"
                        >
                          <Check size={16} weight="bold" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          onDelete(notification.id)
                        }}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash size={16} weight="duotone" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
