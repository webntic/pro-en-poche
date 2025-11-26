import { Button } from '@/components/ui/button'
import { PencilSimple, Eye } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface ContentEditToggleProps {
  isEditing: boolean
  onToggle: () => void
  className?: string
}

export function ContentEditToggle({ isEditing, onToggle, className }: ContentEditToggleProps) {
  return (
    <Button
      onClick={onToggle}
      variant={isEditing ? 'default' : 'outline'}
      className={cn('gap-2 fixed bottom-6 right-6 z-50 shadow-lg', className)}
      size="lg"
    >
      {isEditing ? (
        <>
          <Eye size={20} weight="duotone" />
          Mode Aperçu
        </>
      ) : (
        <>
          <PencilSimple size={20} weight="duotone" />
          Modifier le Contenu
        </>
      )}
    </Button>
  )
}
