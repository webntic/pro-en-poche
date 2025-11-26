import { useState, useEffect, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PaperPlaneRight, X } from '@phosphor-icons/react'
import { ChatMessage } from '@/lib/types'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface ChatDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bookingId: string
  currentUserId: string
  currentUserName: string
  currentUserAvatar?: string
  otherUserId: string
  otherUserName: string
  otherUserAvatar?: string
  messages: ChatMessage[]
  onSendMessage: (message: string) => void
}

export function ChatDialog({
  open,
  onOpenChange,
  bookingId,
  currentUserId,
  currentUserName,
  currentUserAvatar,
  otherUserId,
  otherUserName,
  otherUserAvatar,
  messages,
  onSendMessage,
}: ChatDialogProps) {
  const [messageInput, setMessageInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (open) {
      scrollToBottom()
    }
  }, [messages, open])

  const handleSend = () => {
    if (messageInput.trim()) {
      onSendMessage(messageInput.trim())
      setMessageInput('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const groupMessagesByDate = (messages: ChatMessage[]) => {
    const groups: { [key: string]: ChatMessage[] } = {}
    
    messages.forEach(msg => {
      const date = format(new Date(msg.createdAt), 'yyyy-MM-dd')
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(msg)
    })
    
    return groups
  }

  const formatDateLabel = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    if (format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) {
      return "Aujourd'hui"
    } else if (format(date, 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd')) {
      return 'Hier'
    } else {
      return format(date, 'd MMMM yyyy', { locale: fr })
    }
  }

  const messageGroups = groupMessagesByDate(messages)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={otherUserAvatar} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials(otherUserName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle>{otherUserName}</DialogTitle>
                <p className="text-sm text-muted-foreground">En ligne</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
            >
              <X size={20} />
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-4">
            {Object.entries(messageGroups).map(([date, msgs]) => (
              <div key={date}>
                <div className="flex justify-center mb-4">
                  <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {formatDateLabel(date)}
                  </span>
                </div>
                
                {msgs.map((msg) => {
                  const isCurrentUser = msg.senderId === currentUserId
                  
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-3 mb-4 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
                    >
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={isCurrentUser ? currentUserAvatar : otherUserAvatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {getInitials(isCurrentUser ? currentUserName : otherUserName)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'} max-w-[70%]`}>
                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            isCurrentUser
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm break-words">{msg.message}</p>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">
                          {format(new Date(msg.createdAt), 'HH:mm')}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="px-6 py-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Écrivez votre message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={!messageInput.trim()}
              size="icon"
              className="flex-shrink-0"
            >
              <PaperPlaneRight size={18} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
