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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { User, UserRole } from '@/lib/types'
import { toast } from 'sonner'
import { UserCircle, Briefcase, ArrowLeft } from '@phosphor-icons/react'

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAuth: (user: User) => void
}

export function AuthDialog({ open, onOpenChange, onAuth }: AuthDialogProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'select-role'>('signin')
  const [role, setRole] = useState<UserRole>('client')
  
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

  const handleSubmit = () => {
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all required fields')
      return
    }

    if (mode === 'select-role' && !formData.name) {
      toast.error('Please enter your name')
      return
    }

    if (mode === 'select-role' && role === 'provider') {
      if (!formData.bio || !formData.services || !formData.location || !formData.hourlyRate) {
        toast.error('Please complete all provider fields')
        return
      }
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: formData.email,
      name: formData.name || formData.email.split('@')[0],
      role: mode === 'select-role' ? role : 'client',
      createdAt: new Date().toISOString(),
    }

    onAuth(newUser)
    toast.success(`Welcome ${newUser.name}!`)
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
    setRole('client')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {mode === 'signin' && 'Sign In'}
            {mode === 'signup' && 'Create Account'}
            {mode === 'select-role' && `${role === 'client' ? 'Client' : 'Provider'} Registration`}
          </DialogTitle>
          <DialogDescription>
            {mode === 'signin' && 'Welcome back! Enter your credentials to continue.'}
            {mode === 'signup' && 'Choose your account type to get started.'}
            {mode === 'select-role' && role === 'client' && 'Create your client account to start booking services.'}
            {mode === 'select-role' && role === 'provider' && 'Create your provider profile to offer your services.'}
          </DialogDescription>
        </DialogHeader>

        {mode === 'select-role' && (
          <Button
            variant="ghost"
            onClick={handleBackToSignup}
            className="gap-2 self-start -mt-2"
          >
            <ArrowLeft size={16} />
            Back to account type
          </Button>
        )}

        <Tabs 
          value={mode === 'select-role' ? 'signup' : mode} 
          onValueChange={(v) => {
            if (v === 'signup') {
              setMode('signup')
              setRole('client')
            } else {
              setMode(v as 'signin' | 'signup')
            }
          }}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="signin-email">Email</Label>
              <Input
                id="signin-email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signin-password">Password</Label>
              <Input
                id="signin-password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <Button onClick={handleSubmit} className="w-full" size="lg">
              Sign In
            </Button>
          </TabsContent>

          <TabsContent value="signup" className="mt-6">
            {mode === 'signup' ? (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold mb-2">Choose your account type</h3>
                  <p className="text-sm text-muted-foreground">
                    Select how you want to use Pro En Poche
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
                        <h4 className="font-semibold text-lg mb-2">I'm a Client</h4>
                        <p className="text-sm text-muted-foreground">
                          I want to find and book professional services
                        </p>
                      </div>
                      <Button className="w-full" variant="outline">
                        Continue as Client
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
                        <h4 className="font-semibold text-lg mb-2">I'm a Provider</h4>
                        <p className="text-sm text-muted-foreground">
                          I want to offer my professional services to clients
                        </p>
                      </div>
                      <Button className="w-full" variant="outline">
                        Continue as Provider
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
                      <Label htmlFor="signup-name">Full Name *</Label>
                      <Input
                        id="signup-name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email *</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password *</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    </div>

                    <Button onClick={handleSubmit} className="w-full" size="lg">
                      Create Client Account
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="provider-name">Full Name *</Label>
                      <Input
                        id="provider-name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="provider-email">Email *</Label>
                      <Input
                        id="provider-email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="provider-password">Password *</Label>
                      <Input
                        id="provider-password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Professional Bio *</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell clients about your experience and expertise..."
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="services">Services Offered (comma separated) *</Label>
                      <Input
                        id="services"
                        placeholder="e.g., Plumbing, Electrical Work, Home Repairs"
                        value={formData.services}
                        onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">Separate multiple services with commas</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          placeholder="e.g., Paris, Lyon"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="rate">Hourly Rate (€) *</Label>
                        <Input
                          id="rate"
                          type="number"
                          placeholder="50"
                          value={formData.hourlyRate}
                          onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="availability">Availability</Label>
                      <Input
                        id="availability"
                        placeholder="e.g., Monday-Friday, 9am-5pm"
                        value={formData.availability}
                        onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">Optional: Describe your typical working hours</p>
                    </div>

                    <Button onClick={handleSubmit} className="w-full" size="lg">
                      Create Provider Account
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
