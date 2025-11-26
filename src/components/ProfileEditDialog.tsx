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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, ServiceProvider } from '@/lib/types'
import { Camera, MapPin, Phone, LockKey, User as UserIcon } from '@phosphor-icons/react'
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
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [bio, setBio] = useState((user as ServiceProvider).bio || '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const isProvider = user.role === 'provider'

  const userInitials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Le fichier doit faire moins de 5 Mo')
        return
      }
      if (!file.type.startsWith('image/')) {
        toast.error('Le fichier doit être une image')
        return
      }
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

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

  const handleChangePassword = () => {
    if (!currentPassword) {
      toast.error('Veuillez entrer votre mot de passe actuel')
      return
    }

    if (!newPassword || newPassword.length < 6) {
      toast.error('Le nouveau mot de passe doit contenir au moins 6 caractères')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas')
      return
    }

    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    toast.success('Mot de passe modifié avec succès!')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Modifier mon profil</DialogTitle>
          <DialogDescription>
            Mettez à jour vos informations personnelles et votre mot de passe
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile" className="gap-2">
              <UserIcon size={18} />
              Informations
            </TabsTrigger>
            <TabsTrigger value="password" className="gap-2">
              <LockKey size={18} />
              Mot de passe
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6 mt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatar} />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="w-full space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="avatar-file" className="flex items-center gap-2">
                      <Camera size={18} />
                      Importer une photo de profil
                    </Label>
                    <Input
                      id="avatar-file"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarFileChange}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground">
                      Max 5 Mo - Formats: JPG, PNG, GIF, WebP
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">ou</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="avatar" className="flex items-center gap-2">
                      URL de l'image
                    </Label>
                    <Input
                      id="avatar"
                      type="url"
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      placeholder="https://exemple.com/photo.jpg"
                    />
                  </div>
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
          </TabsContent>

          <TabsContent value="password" className="space-y-6 mt-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Mot de passe actuel *</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Nouveau mot de passe *</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <p className="text-xs text-muted-foreground">
                  Minimum 6 caractères
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmer le nouveau mot de passe *</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setCurrentPassword('')
                    setNewPassword('')
                    setConfirmPassword('')
                  }}
                >
                  Réinitialiser
                </Button>
                <Button onClick={handleChangePassword}>
                  Changer le mot de passe
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
