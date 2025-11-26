import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChatCircle } from '@phosphor-icons/react'
import { ChatConversation, Booking, ServiceProvider } from '@/lib/types'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface ChatListProps {
  conversations: ChatConversation[]
  currentUserId: string
  onOpenChat: (conversation: ChatConversation) => void
}

export function ChatList({
  conversations,
  currentUserId,
  onOpenChat,
}: ChatListProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (conversations.length === 0) {
    return (
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChatCircle size={24} className="text-primary" />
            Messagerie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <ChatCircle size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Aucune conversation disponible. Les conversations sont créées automatiquement après une réservation confirmée.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="premium-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChatCircle size={24} className="text-primary" />
          Messagerie
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {conversations.map((conversation) => {
          const isProvider = currentUserId === conversation.providerId
          const otherUserName = isProvider ? conversation.clientName : conversation.providerName
          const otherUserAvatar = isProvider ? conversation.clientAvatar : conversation.providerAvatar
          
          return (
            <button
              key={conversation.bookingId}
              onClick={() => onOpenChat(conversation)}
              className="w-full text-left hover:bg-muted/50 rounded-lg p-4 transition-colors border border-border"
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12 flex-shrink-0">
                  <AvatarImage src={otherUserAvatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(otherUserName)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold truncate">{otherUserName}</h4>
                    {conversation.unreadCount > 0 && (
                      <Badge variant="default" className="ml-2 flex-shrink-0">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                  
                  {conversation.lastMessage && (
                    <p className="text-sm text-muted-foreground truncate mb-1">
                      {conversation.lastMessage}
                    </p>
                  )}
                  
                  {conversation.lastMessageAt && (
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(conversation.lastMessageAt), 'd MMM, HH:mm', { locale: fr })}
                    </p>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </CardContent>
    </Card>
  )
}
