import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, ServiceProvider } from '@/lib/types'
import { Camera, MapPin, Phone } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface ProfileEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | ServiceProvider
  onSave: (updatedUser: Partial<User | ServiceProvider>) => void
}

export function ProfileEditDialog({ open, onOpenChange, user, onSave }: ProfileEditDialogProps) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone || '')
  const [address, setAddress] = useState(user.address || '')
  const [avatar, setAvatar] = useState(user.avatar || '')
  const [bio, setBio] = useState((user as ServiceProvider).bio || '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isProvider = user.role === 'provider'

  const userInitials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const updates: Partial<User | ServiceProvider> = {
      name,
      email,
      phone,
      address,
      avatar,
    }

    if (isProvider) {
      (updates as Partial<ServiceProvider>).bio = bio
    }

    onSave(updates)
    setIsSubmitting(false)
    onOpenChange(false)
    toast.success('Profil mis à jour avec succès!')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Modifier mon profil</DialogTitle>
          <DialogDescription>
            Mettez à jour vos informations personnelles
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatar} />
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            
            <div className="w-full space-y-2">
              <Label htmlFor="avatar" className="flex items-center gap-2">
                <Camera size={18} />
                Photo de profil (URL)
              </Label>
              <Input
                id="avatar"
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="https://exemple.com/photo.jpg"
              />
              <p className="text-xs text-muted-foreground">
                Entrez l'URL de votre photo de profil
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Jean Dupont"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="jean@exemple.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone size={18} />
              Numéro de téléphone
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (514) 555-0123"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin size={18} />
              Adresse
            </Label>
            <Textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Rue Exemple, Montréal, QC H2X 1Y1"
              rows={3}
            />
          </div>

          {isProvider && (
            <div className="space-y-2">
              <Label htmlFor="bio">Biographie</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Parlez-nous de votre expérience et de vos compétences..."
                rows={4}
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
