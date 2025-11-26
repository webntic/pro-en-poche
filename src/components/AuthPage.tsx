import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { User, UserRole } from '@/lib/types'
import { DEMO_ACCOUNTS, CANADIAN_CITIES } from '@/lib/demo-data'
import { toast } from 'sonner'
import { UserCircle, Briefcase, ArrowLeft, Key, X } from '@phosphor-icons/react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Logo } from '@/components/Logo'
import logoImage from '@/assets/images/logo.svg'
import { MultiStepProviderForm, ProviderFormData } from '@/components/MultiStepProviderForm'

interface AuthPageProps {
  onAuth: (user: User) => void
  onClose: () => void
  initialRole?: UserRole
  logo?: string
}

export function AuthPage({ onAuth, onClose, initialRole, logo }: AuthPageProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'select-role' | 'provider-multistep'>('signin')
  const [role, setRole] = useState<UserRole>(initialRole || 'client')

  useEffect(() => {
    if (initialRole === 'provider') {
      setMode('select-role')
      setRole('provider')
    } else if (!initialRole) {
      setMode('signin')
      setRole('client')
    }
  }, [initialRole])
  
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
    onClose()
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

    onClose()
    
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
    if (selectedRole === 'provider') {
      setMode('provider-multistep')
    } else {
      setMode('select-role')
    }
  }

  const handleBackToSignup = () => {
    setMode('signup')
    setRole(initialRole || 'client')
  }

  const handleProviderFormSubmit = (data: ProviderFormData) => {
    const hourlyRateMap: Record<string, number> = {
      A: 10,
      B: 20,
      C: 37.5,
      D: 75,
      E: 125,
    }

    const newProvider: User = {
      id: `provider-${Date.now()}`,
      email: data.email,
      name: `${data.firstName} ${data.lastName}`,
      role: 'provider',
      createdAt: new Date().toISOString(),
      bio: data.description,
      services: [data.category],
      location: data.city,
      availability: data.availability.join(', '),
      hourlyRate: hourlyRateMap[data.priceRange] || 50,
      rating: 0,
      reviewCount: 0,
      verified: false,
      phone: data.phone,
      address: `${data.address1}${data.address2 ? ', ' + data.address2 : ''}, ${data.city}, ${data.province} ${data.postalCode}`,
      coverageZones: data.coverageZones,
      experienceYears: data.experienceYears ? parseInt(data.experienceYears) : undefined,
    } as any

    onAuth(newProvider)
    toast.info('Votre compte prestataire sera disponible après validation par un administrateur')
    onClose()
  }

  const handleTabChange = (v: string) => {
    if (v === 'signup') {
      if (initialRole === 'provider') {
        setMode('provider-multistep')
        setRole('provider')
      } else {
        setMode('signup')
        setRole('client')
      }
    } else {
      setMode(v as any)
    }
  }

  if (mode === 'provider-multistep') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="border-b border-border bg-card sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={onClose}
                className="flex-shrink-0 hover:opacity-80 transition-opacity"
              >
                <img src={logo || logoImage} alt="Pro En Poche" className="h-12 w-auto" />
              </button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={24} />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Inscription Prestataire</h1>
              <p className="text-muted-foreground">
                Créez votre profil professionnel en quelques étapes
              </p>
            </div>

            <MultiStepProviderForm onSubmit={handleProviderFormSubmit} onBack={handleBackToSignup} />
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={onClose}
              className="flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <img src={logo || logoImage} alt="Pro En Poche" className="h-12 w-auto" />
            </button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X size={24} />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <Card className="p-8 md:p-12 shadow-lg">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                {mode === 'signin' && 'Connexion'}
                {mode === 'signup' && 'Créer un compte'}
                {mode === 'select-role' && `Inscription ${role === 'client' ? 'Client' : 'Prestataire'}`}
              </h1>
              <p className="text-muted-foreground">
                {mode === 'signin' && 'Bon retour! Entrez vos identifiants pour continuer.'}
                {mode === 'signup' && 'Choisissez votre type de compte pour commencer.'}
                {mode === 'select-role' && role === 'client' && 'Créez votre compte client pour commencer à réserver des services.'}
                {mode === 'select-role' && role === 'provider' && 'Créez votre profil prestataire pour offrir vos services.'}
              </p>
            </div>

            {mode === 'select-role' && (
              <Button
                variant="ghost"
                onClick={handleBackToSignup}
                className="gap-2 mb-6"
              >
                <ArrowLeft size={16} />
                Retour au type de compte
              </Button>
            )}

            <Tabs 
              value={mode === 'select-role' ? 'signup' : (mode === 'signin' || mode === 'signup' ? mode : 'signup')} 
              onValueChange={handleTabChange}
            >
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="signin" className="text-base py-3">Connexion</TabsTrigger>
                <TabsTrigger value="signup" className="text-base py-3">Inscription</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-6">
                <Card className="p-6 bg-muted/50">
                  <div className="flex items-start gap-2 mb-4">
                    <Key size={24} className="text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Comptes de démonstration</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Testez la plateforme avec ces comptes pré-configurés
                      </p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleDemoLogin('superadmin')}
                      className="justify-start gap-3 h-auto py-3"
                    >
                      <UserCircle size={20} />
                      <div className="text-left">
                        <div className="font-medium">Super Admin</div>
                        <div className="text-xs text-muted-foreground">{DEMO_ACCOUNTS.superadmin.email}</div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDemoLogin('admin')}
                      className="justify-start gap-3 h-auto py-3"
                    >
                      <UserCircle size={20} />
                      <div className="text-left">
                        <div className="font-medium">Admin</div>
                        <div className="text-xs text-muted-foreground">{DEMO_ACCOUNTS.admin.email}</div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDemoLogin('client')}
                      className="justify-start gap-3 h-auto py-3"
                    >
                      <UserCircle size={20} />
                      <div className="text-left">
                        <div className="font-medium">Client</div>
                        <div className="text-xs text-muted-foreground">{DEMO_ACCOUNTS.client.email}</div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDemoLogin('provider')}
                      className="justify-start gap-3 h-auto py-3"
                    >
                      <Briefcase size={20} />
                      <div className="text-left">
                        <div className="font-medium">Prestataire</div>
                        <div className="text-xs text-muted-foreground">{DEMO_ACCOUNTS.provider.email}</div>
                      </div>
                    </Button>
                  </div>
                </Card>

                <Separator />

                <div className="space-y-4 max-w-md mx-auto">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-base">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="vous@exemple.ca"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="text-base">Mot de passe</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="h-12 text-base"
                    />
                  </div>
                  <Button onClick={handleSubmit} className="w-full h-12 text-base" size="lg">
                    Se connecter
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="signup">
                {mode === 'signup' ? (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-semibold mb-3">Choisissez votre type de compte</h3>
                      <p className="text-muted-foreground">
                        Sélectionnez comment vous souhaitez utiliser Pro En Poche
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                      <Card 
                        className="p-8 cursor-pointer hover:border-primary hover:shadow-lg transition-all"
                        onClick={() => handleRoleSelection('client')}
                      >
                        <div className="flex flex-col items-center text-center gap-6">
                          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                            <UserCircle size={40} className="text-primary" weight="fill" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-xl mb-3">Je suis un Client</h4>
                            <p className="text-muted-foreground">
                              Je veux trouver et réserver des services professionnels
                            </p>
                          </div>
                          <Button className="w-full h-12">
                            Continuer comme Client
                          </Button>
                        </div>
                      </Card>

                      <Card 
                        className="p-8 cursor-pointer hover:border-secondary hover:shadow-lg transition-all"
                        onClick={() => handleRoleSelection('provider')}
                      >
                        <div className="flex flex-col items-center text-center gap-6">
                          <div className="h-20 w-20 rounded-full bg-secondary/10 flex items-center justify-center">
                            <Briefcase size={40} className="text-secondary" weight="fill" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-xl mb-3">Je suis un Prestataire</h4>
                            <p className="text-muted-foreground">
                              Je veux offrir mes services professionnels aux clients
                            </p>
                          </div>
                          <Button className="w-full h-12">
                            Continuer comme Prestataire
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 max-w-2xl mx-auto">
                    {role === 'client' ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="signup-name" className="text-base">Nom complet *</Label>
                          <Input
                            id="signup-name"
                            placeholder="Marie Tremblay"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="h-12 text-base"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-email" className="text-base">Email *</Label>
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="vous@exemple.ca"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="h-12 text-base"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-password" className="text-base">Mot de passe *</Label>
                          <Input
                            id="signup-password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="h-12 text-base"
                          />
                        </div>

                        <Button onClick={handleSubmit} className="w-full h-12 text-base" size="lg">
                          Créer un compte Client
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="provider-name" className="text-base">Nom complet *</Label>
                            <Input
                              id="provider-name"
                              placeholder="Jean Lefebvre"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="h-12 text-base"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="provider-email" className="text-base">Email *</Label>
                            <Input
                              id="provider-email"
                              type="email"
                              placeholder="vous@exemple.ca"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="h-12 text-base"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="provider-password" className="text-base">Mot de passe *</Label>
                          <Input
                            id="provider-password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="h-12 text-base"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio" className="text-base">Bio professionnelle *</Label>
                          <Textarea
                            id="bio"
                            placeholder="Parlez aux clients de votre expérience et expertise..."
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            rows={4}
                            className="text-base"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="services" className="text-base">Services offerts (séparés par des virgules) *</Label>
                          <Input
                            id="services"
                            placeholder="ex: Plomberie, Électricité, Réparations"
                            value={formData.services}
                            onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                            className="h-12 text-base"
                          />
                          <p className="text-sm text-muted-foreground">Séparez les services multiples par des virgules</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="location" className="text-base">Ville *</Label>
                            <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
                              <SelectTrigger className="h-12 text-base">
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
                            <Label htmlFor="rate" className="text-base">Tarif horaire (CAD $) *</Label>
                            <Input
                              id="rate"
                              type="number"
                              placeholder="75"
                              value={formData.hourlyRate}
                              onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                              className="h-12 text-base"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="availability" className="text-base">Disponibilité</Label>
                          <Input
                            id="availability"
                            placeholder="ex: Lun-Ven, 9h-17h"
                            value={formData.availability}
                            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                            className="h-12 text-base"
                          />
                          <p className="text-sm text-muted-foreground">Optionnel: Décrivez vos heures de travail habituelles</p>
                        </div>

                        <Button onClick={handleSubmit} className="w-full h-12 text-base" size="lg">
                          Créer un compte Prestataire
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
    </div>
  )
}
