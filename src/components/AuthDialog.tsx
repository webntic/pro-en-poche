import { useState, useEffect } from 'react'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { User, UserRole } from '@/lib/types'
import { DEMO_ACCOUNTS, CANADIAN_CITIES } from '@/lib/demo-data'
import { toast } from 'sonner'
import { UserCircle, Briefcase, ArrowLeft, Key } from '@phosphor-icons/react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAuth: (user: User) => void
  initialRole?: UserRole
}

export function AuthDialog({ open, onOpenChange, onAuth, initialRole }: AuthDialogProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'select-role'>('signin')
  const [role, setRole] = useState<UserRole>(initialRole || 'client')

  useEffect(() => {
    if (open && initialRole === 'provider') {
      setMode('select-role')
      setRole('provider')
    } else if (open && !initialRole) {
      setMode('signin')
      setRole('client')
    }
  }, [open, initialRole])
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    services: '',
    location: '',
    availability: '',
    hourlyRate: '',
  })

  const handleDemoLogin = (accountType: 'superadmin' | 'admin' | 'client' | 'provider') => {
    const demoUser = DEMO_ACCOUNTS[accountType]
    onAuth(demoUser as User)
    toast.success(`Bienvenue ${demoUser.name}!`)
    onOpenChange(false)
  }

  const handleSubmit = () => {
    if (!formData.email || !formData.password) {
      toast.error('Veuillez remplir tous les champs requis')
      return
    }

    if (mode === 'select-role' && !formData.name) {
      toast.error('Veuillez entrer votre nom')
      return
    }

    if (mode === 'select-role' && role === 'provider') {
      if (!formData.bio || !formData.services || !formData.location || !formData.hourlyRate) {
        toast.error('Veuillez compléter tous les champs prestataire')
        return
      }
    }

    if (mode === 'select-role' && role === 'provider') {
      const newProvider: User = {
        id: `provider-${Date.now()}`,
        email: formData.email,
        name: formData.name,
        role: 'provider',
        createdAt: new Date().toISOString(),
        bio: formData.bio,
        services: formData.services.split(',').map(s => s.trim()),
        location: formData.location,
        availability: formData.availability || 'Flexible',
        hourlyRate: parseFloat(formData.hourlyRate),
        rating: 0,
        reviewCount: 0,
        verified: false,
      } as any

      onAuth(newProvider)
      toast.info('Votre compte prestataire sera disponible après validation par un administrateur')
    } else {
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: formData.email,
        name: formData.name || formData.email.split('@')[0],
        role: mode === 'select-role' ? role : 'client',
        createdAt: new Date().toISOString(),
      }

      onAuth(newUser)
      toast.success(`Bienvenue ${newUser.name}!`)
    }

    onOpenChange(false)
    
    setFormData({
      name: '',
      email: '',
      password: '',
      bio: '',
      services: '',
      location: '',
      availability: '',
      hourlyRate: '',
    })
    setMode('signin')
    setRole('client')
  }

  const handleRoleSelection = (selectedRole: UserRole) => {
    setRole(selectedRole)
    setMode('select-role')
  }

  const handleBackToSignup = () => {
    setMode('signup')
    setRole(initialRole || 'client')
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setMode('signin')
      setRole(initialRole || 'client')
    }
    onOpenChange(open)
  }

  const handleTabChange = (v: string) => {
    if (v === 'signup') {
      if (initialRole === 'provider') {
        setMode('select-role')
        setRole('provider')
      } else {
        setMode('signup')
        setRole('client')
      }
    } else {
      setMode(v as 'signin' | 'signup')
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {mode === 'signin' && 'Connexion'}
            {mode === 'signup' && 'Créer un compte'}
            {mode === 'select-role' && `Inscription ${role === 'client' ? 'Client' : 'Prestataire'}`}
          </DialogTitle>
          <DialogDescription>
            {mode === 'signin' && 'Bon retour! Entrez vos identifiants pour continuer.'}
            {mode === 'signup' && 'Choisissez votre type de compte pour commencer.'}
            {mode === 'select-role' && role === 'client' && 'Créez votre compte client pour commencer à réserver des services.'}
            {mode === 'select-role' && role === 'provider' && 'Créez votre profil prestataire pour offrir vos services.'}
          </DialogDescription>
        </DialogHeader>

        {mode === 'select-role' && (
          <Button
            variant="ghost"
            onClick={handleBackToSignup}
            className="gap-2 self-start -mt-2"
          >
            <ArrowLeft size={16} />
            Retour au type de compte
          </Button>
        )}

        <Tabs 
          value={mode === 'select-role' ? 'signup' : mode} 
          onValueChange={handleTabChange}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Connexion</TabsTrigger>
            <TabsTrigger value="signup">Inscription</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4 mt-4">
            <Card className="p-4 bg-muted/50">
              <div className="flex items-start gap-2 mb-3">
                <Key size={20} className="text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Comptes de démonstration</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Testez la plateforme avec ces comptes pré-configurés
                  </p>
                </div>
              </div>
              <div className="grid gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('superadmin')}
                  className="justify-start gap-2"
                >
                  <UserCircle size={16} />
                  <div className="text-left">
                    <div className="font-medium">Super Admin</div>
                    <div className="text-xs text-muted-foreground">{DEMO_ACCOUNTS.superadmin.email}</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('admin')}
                  className="justify-start gap-2"
                >
                  <UserCircle size={16} />
                  <div className="text-left">
                    <div className="font-medium">Admin</div>
                    <div className="text-xs text-muted-foreground">{DEMO_ACCOUNTS.admin.email}</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('client')}
                  className="justify-start gap-2"
                >
                  <UserCircle size={16} />
                  <div className="text-left">
                    <div className="font-medium">Client</div>
                    <div className="text-xs text-muted-foreground">{DEMO_ACCOUNTS.client.email}</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('provider')}
                  className="justify-start gap-2"
                >
                  <Briefcase size={16} />
                  <div className="text-left">
                    <div className="font-medium">Prestataire</div>
                    <div className="text-xs text-muted-foreground">{DEMO_ACCOUNTS.provider.email}</div>
                  </div>
                </Button>
              </div>
            </Card>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="signin-email">Email</Label>
              <Input
                id="signin-email"
                type="email"
                placeholder="vous@exemple.ca"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signin-password">Mot de passe</Label>
              <Input
                id="signin-password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <Button onClick={handleSubmit} className="w-full" size="lg">
              Se connecter
            </Button>
          </TabsContent>

          <TabsContent value="signup" className="mt-6">
            {mode === 'signup' ? (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold mb-2">Choisissez votre type de compte</h3>
                  <p className="text-sm text-muted-foreground">
                    Sélectionnez comment vous souhaitez utiliser Pro En Poche
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card 
                    className="p-6 cursor-pointer hover:border-primary hover:shadow-md transition-all"
                    onClick={() => handleRoleSelection('client')}
                  >
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserCircle size={32} className="text-primary" weight="fill" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Je suis un Client</h4>
                        <p className="text-sm text-muted-foreground">
                          Je veux trouver et réserver des services professionnels
                        </p>
                      </div>
                      <Button className="w-full" variant="outline">
                        Continuer comme Client
                      </Button>
                    </div>
                  </Card>

                  <Card 
                    className="p-6 cursor-pointer hover:border-secondary hover:shadow-md transition-all"
                    onClick={() => handleRoleSelection('provider')}
                  >
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center">
                        <Briefcase size={32} className="text-secondary" weight="fill" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Je suis un Prestataire</h4>
                        <p className="text-sm text-muted-foreground">
                          Je veux offrir mes services professionnels aux clients
                        </p>
                      </div>
                      <Button className="w-full" variant="outline">
                        Continuer comme Prestataire
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {role === 'client' ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Nom complet *</Label>
                      <Input
                        id="signup-name"
                        placeholder="Marie Tremblay"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email *</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="vous@exemple.ca"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Mot de passe *</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    </div>

                    <Button onClick={handleSubmit} className="w-full" size="lg">
                      Créer un compte Client
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="provider-name">Nom complet *</Label>
                      <Input
                        id="provider-name"
                        placeholder="Jean Lefebvre"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="provider-email">Email *</Label>
                      <Input
                        id="provider-email"
                        type="email"
                        placeholder="vous@exemple.ca"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="provider-password">Mot de passe *</Label>
                      <Input
                        id="provider-password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio professionnelle *</Label>
                      <Textarea
                        id="bio"
                        placeholder="Parlez aux clients de votre expérience et expertise..."
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="services">Services offerts (séparés par des virgules) *</Label>
                      <Input
                        id="services"
                        placeholder="ex: Plomberie, Électricité, Réparations"
                        value={formData.services}
                        onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">Séparez les services multiples par des virgules</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Ville *</Label>
                        <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une ville" />
                          </SelectTrigger>
                          <SelectContent>
                            {CANADIAN_CITIES.filter(city => city !== 'Toutes les villes').map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="rate">Tarif horaire (CAD $) *</Label>
                        <Input
                          id="rate"
                          type="number"
                          placeholder="75"
                          value={formData.hourlyRate}
                          onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="availability">Disponibilité</Label>
                      <Input
                        id="availability"
                        placeholder="ex: Lun-Ven, 9h-17h"
                        value={formData.availability}
                        onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">Optionnel: Décrivez vos heures de travail habituelles</p>
                    </div>

                    <Button onClick={handleSubmit} className="w-full" size="lg">
                      Créer un compte Prestataire
                    </Button>
                  </>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
