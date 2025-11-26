import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { PencilSimple, Check, X } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface InlineEditorProps {
  value: string
  onSave: (newValue: string) => void
  multiline?: boolean
  className?: string
  placeholder?: string
  editMode?: boolean
}

export function InlineEditor({ 
  value, 
  onSave, 
  multiline = false, 
  className = '', 
  placeholder = 'Enter text...',
  editMode = false 
}: InlineEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null)

  useEffect(() => {
    setEditValue(value)
  }, [value])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      if (multiline && inputRef.current instanceof HTMLTextAreaElement) {
        inputRef.current.setSelectionRange(editValue.length, editValue.length)
      }
    }
  }, [isEditing])

  const handleSave = () => {
    if (editValue.trim() !== value) {
      onSave(editValue.trim())
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel()
    } else if (e.key === 'Enter' && !multiline && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    }
  }

  if (!editMode) {
    return <span className={className}>{value}</span>
  }

  if (isEditing) {
    return (
      <div className="relative group">
        {multiline ? (
          <Textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={cn('min-h-[100px] resize-y', className)}
            placeholder={placeholder}
          />
        ) : (
          <Input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={className}
            placeholder={placeholder}
          />
        )}
        <div className="flex gap-2 mt-2">
          <Button 
            size="sm" 
            onClick={handleSave}
            className="gap-1.5"
          >
            <Check size={16} weight="bold" />
            Enregistrer
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleCancel}
            className="gap-1.5"
          >
            <X size={16} weight="bold" />
            Annuler
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative group inline-block w-full">
      <span className={cn(
        'inline-block w-full',
        className,
        editMode && 'cursor-pointer hover:bg-primary/5 rounded px-2 py-1 -mx-2 -my-1 transition-colors border-2 border-dashed border-transparent hover:border-primary/20'
      )}>
        {value || placeholder}
      </span>
      {editMode && (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsEditing(true)}
          className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity gap-1.5 h-7 px-2"
        >
          <PencilSimple size={14} weight="duotone" />
        </Button>
      )}
    </div>
  )
}
