import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'sonner'
import { Gear, Image as ImageIcon, Envelope, CreditCard, ShieldCheck, UserPlus, Trash } from '@phosphor-icons/react'
import { SiteSettings, User } from '@/lib/types'

interface SuperAdminDashboardProps {
  settings: SiteSettings
  onUpdateSettings: (settings: SiteSettings) => void
  admins?: User[]
  onCreateAdmin?: (admin: User) => void
  onDeleteAdmin?: (adminId: string) => void
}

export function SuperAdminDashboard({ settings, onUpdateSettings, admins = [], onCreateAdmin, onDeleteAdmin }: SuperAdminDashboardProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | undefined>(settings.logo)
  
  const [smtpData, setSmtpData] = useState({
    host: settings.smtp.host,
    port: settings.smtp.port,
    username: settings.smtp.username,
    password: settings.smtp.password,
    fromEmail: settings.smtp.fromEmail,
    fromName: settings.smtp.fromName,
  })

  const [stripeData, setStripeData] = useState({
    publishableKey: settings.stripe.publishableKey,
    secretKey: settings.stripe.secretKey,
    webhookSecret: settings.stripe.webhookSecret,
  })

  const [createAdminOpen, setCreateAdminOpen] = useState(false)
  const [adminName, setAdminName] = useState('')
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [adminAvatar, setAdminAvatar] = useState('')

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setLogoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveLogo = () => {
    if (!logoPreview) {
      toast.error('Aucun logo sélectionné')
      return
    }

    onUpdateSettings({
      ...settings,
      logo: logoPreview,
      updatedAt: new Date().toISOString(),
    })
    toast.success('Logo mis à jour avec succès!')
    setLogoFile(null)
  }

  const handleSaveSmtp = () => {
    if (!smtpData.host || !smtpData.port || !smtpData.username || !smtpData.fromEmail || !smtpData.fromName) {
      toast.error('Veuillez remplir tous les champs obligatoires')
      return
    }

    onUpdateSettings({
      ...settings,
      smtp: smtpData,
      updatedAt: new Date().toISOString(),
    })
    toast.success('Configuration SMTP mise à jour avec succès!')
  }

  const handleSaveStripe = () => {
    if (!stripeData.publishableKey || !stripeData.secretKey) {
      toast.error('Veuillez remplir les clés Stripe')
      return
    }

    onUpdateSettings({
      ...settings,
      stripe: stripeData,
      updatedAt: new Date().toISOString(),
    })
    toast.success('Configuration Stripe mise à jour avec succès!')
  }

  const handleCreateAdmin = () => {
    if (!adminName || !adminEmail || !adminPassword) {
      toast.error('Veuillez remplir tous les champs obligatoires')
      return
    }

    if (adminPassword.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(adminEmail)) {
      toast.error('Veuillez entrer une adresse email valide')
      return
    }

    const newAdmin: User = {
      id: `admin-${Date.now()}`,
      name: adminName,
      email: adminEmail,
      role: 'admin',
      avatar: adminAvatar || undefined,
      createdAt: new Date().toISOString(),
    }

    if (onCreateAdmin) {
      onCreateAdmin(newAdmin)
    }

    setAdminName('')
    setAdminEmail('')
    setAdminPassword('')
    setAdminAvatar('')
    setCreateAdminOpen(false)
    toast.success('Administrateur créé avec succès!')
  }

  const handleDeleteAdmin = (adminId: string, adminName: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'administrateur "${adminName}" ?`)) {
      if (onDeleteAdmin) {
        onDeleteAdmin(adminId)
      }
      toast.success('Administrateur supprimé avec succès')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-primary/10">
          <ShieldCheck size={28} className="text-primary" weight="duotone" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Super Admin</h1>
          <p className="text-muted-foreground">Gérez les paramètres globaux de la plateforme</p>
        </div>
      </div>

      <Tabs defaultValue="logo" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="logo" className="gap-2">
            <ImageIcon size={18} />
            Logo
          </TabsTrigger>
          <TabsTrigger value="admins" className="gap-2">
            <UserPlus size={18} />
            Admins
          </TabsTrigger>
          <TabsTrigger value="smtp" className="gap-2">
            <Envelope size={18} />
            SMTP
          </TabsTrigger>
          <TabsTrigger value="stripe" className="gap-2">
            <CreditCard size={18} />
            Stripe
          </TabsTrigger>
        </TabsList>

        <TabsContent value="logo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon size={24} />
                Logo du Site
              </CardTitle>
              <CardDescription>
                Téléchargez une image pour remplacer le logo actuel (max 5 Mo, formats: PNG, JPG, SVG)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-6">
                  <div className="space-y-2">
                    <Label>Logo actuel</Label>
                    {logoPreview ? (
                      <div className="border border-border rounded-lg p-4 bg-card w-64 h-32 flex items-center justify-center">
                        <img 
                          src={logoPreview} 
                          alt="Logo Preview" 
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="border border-dashed border-border rounded-lg p-4 bg-muted w-64 h-32 flex items-center justify-center text-muted-foreground">
                        Aucun logo défini
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo-upload">Choisir un nouveau logo</Label>
                  <Input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="cursor-pointer"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSaveLogo} disabled={!logoFile && !logoPreview}>
                    Enregistrer le logo
                  </Button>
                  {logoFile && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setLogoFile(null)
                        setLogoPreview(settings.logo)
                      }}
                    >
                      Annuler
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admins" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus size={24} />
                    Gestion des Administrateurs
                  </CardTitle>
                  <CardDescription>
                    Créez et gérez les comptes administrateurs de la plateforme
                  </CardDescription>
                </div>
                <Dialog open={createAdminOpen} onOpenChange={setCreateAdminOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <UserPlus size={18} />
                      Créer un admin
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Créer un nouveau administrateur</DialogTitle>
                      <DialogDescription>
                        Remplissez les informations pour créer un compte administrateur
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="admin-name">Nom complet *</Label>
                        <Input
                          id="admin-name"
                          value={adminName}
                          onChange={(e) => setAdminName(e.target.value)}
                          placeholder="Jean Dupont"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="admin-email">Email *</Label>
                        <Input
                          id="admin-email"
                          type="email"
                          value={adminEmail}
                          onChange={(e) => setAdminEmail(e.target.value)}
                          placeholder="jean.dupont@proenpoche.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="admin-password">Mot de passe *</Label>
                        <Input
                          id="admin-password"
                          type="password"
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          placeholder="••••••••"
                        />
                        <p className="text-xs text-muted-foreground">
                          Minimum 6 caractères
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="admin-avatar">Photo de profil (URL)</Label>
                        <Input
                          id="admin-avatar"
                          type="url"
                          value={adminAvatar}
                          onChange={(e) => setAdminAvatar(e.target.value)}
                          placeholder="https://exemple.com/avatar.jpg"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setCreateAdminOpen(false)}
                        >
                          Annuler
                        </Button>
                        <Button onClick={handleCreateAdmin}>
                          Créer l'administrateur
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {admins.length === 0 ? (
                <div className="text-center py-12 border border-dashed rounded-lg">
                  <UserPlus size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Aucun administrateur. Créez-en un pour commencer.
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Administrateur</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Date de création</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {admins.map((admin) => {
                      const initials = admin.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')
                        .toUpperCase()
                        .slice(0, 2)
                      
                      return (
                        <TableRow key={admin.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={admin.avatar} />
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                  {initials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{admin.name}</div>
                                <Badge variant="secondary" className="mt-1">
                                  Administrateur
                                </Badge>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{admin.email}</TableCell>
                          <TableCell>
                            {new Date(admin.createdAt).toLocaleDateString('fr-FR')}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteAdmin(admin.id, admin.name)}
                              className="text-destructive hover:text-destructive gap-2"
                            >
                              <Trash size={16} />
                              Supprimer
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="smtp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Envelope size={24} />
                Configuration SMTP
              </CardTitle>
              <CardDescription>
                Configurez les paramètres d'envoi d'emails pour les notifications de la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-host">Serveur SMTP *</Label>
                    <Input
                      id="smtp-host"
                      placeholder="smtp.gmail.com"
                      value={smtpData.host}
                      onChange={(e) => setSmtpData({ ...smtpData, host: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">Port *</Label>
                    <Input
                      id="smtp-port"
                      type="number"
                      placeholder="587"
                      value={smtpData.port}
                      onChange={(e) => setSmtpData({ ...smtpData, port: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtp-username">Nom d'utilisateur *</Label>
                  <Input
                    id="smtp-username"
                    placeholder="votre-email@domaine.com"
                    value={smtpData.username}
                    onChange={(e) => setSmtpData({ ...smtpData, username: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtp-password">Mot de passe</Label>
                  <Input
                    id="smtp-password"
                    type="password"
                    placeholder="••••••••"
                    value={smtpData.password}
                    onChange={(e) => setSmtpData({ ...smtpData, password: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtp-from-email">Email d'expéditeur *</Label>
                  <Input
                    id="smtp-from-email"
                    type="email"
                    placeholder="noreply@proenpoche.com"
                    value={smtpData.fromEmail}
                    onChange={(e) => setSmtpData({ ...smtpData, fromEmail: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtp-from-name">Nom d'expéditeur *</Label>
                  <Input
                    id="smtp-from-name"
                    placeholder="Pro En Poche"
                    value={smtpData.fromName}
                    onChange={(e) => setSmtpData({ ...smtpData, fromName: e.target.value })}
                  />
                </div>

                <Button onClick={handleSaveSmtp} className="w-fit">
                  Enregistrer la configuration SMTP
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stripe" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard size={24} />
                Configuration Stripe
              </CardTitle>
              <CardDescription>
                Configurez les clés API Stripe pour activer les paiements sécurisés
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stripe-publishable">Clé publique (Publishable Key) *</Label>
                  <Input
                    id="stripe-publishable"
                    placeholder="pk_test_..."
                    value={stripeData.publishableKey}
                    onChange={(e) => setStripeData({ ...stripeData, publishableKey: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stripe-secret">Clé secrète (Secret Key) *</Label>
                  <Input
                    id="stripe-secret"
                    type="password"
                    placeholder="sk_test_..."
                    value={stripeData.secretKey}
                    onChange={(e) => setStripeData({ ...stripeData, secretKey: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stripe-webhook">Secret Webhook</Label>
                  <Input
                    id="stripe-webhook"
                    type="password"
                    placeholder="whsec_..."
                    value={stripeData.webhookSecret}
                    onChange={(e) => setStripeData({ ...stripeData, webhookSecret: e.target.value })}
                  />
                  <p className="text-sm text-muted-foreground">
                    Optionnel - Nécessaire pour la validation des webhooks Stripe
                  </p>
                </div>

                <div className="bg-muted/50 border border-border rounded-lg p-4 space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Gear size={18} />
                    Obtenir vos clés Stripe
                  </h4>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Connectez-vous à votre compte Stripe</li>
                    <li>Allez dans Développeurs → Clés API</li>
                    <li>Copiez la clé publique et la clé secrète</li>
                    <li>Pour les webhooks: Développeurs → Webhooks → Ajouter un endpoint</li>
                  </ol>
                </div>

                <Button onClick={handleSaveStripe} className="w-fit">
                  Enregistrer la configuration Stripe
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
