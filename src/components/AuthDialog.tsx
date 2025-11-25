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
import { User, UserRole } from '@/lib/types'
import { toast } from 'sonner'

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAuth: (user: User) => void
}

export function AuthDialog({ open, onOpenChange, onAuth }: AuthDialogProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
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
    if (!formData.email || !formData.password || (mode === 'signup' && !formData.name)) {
      toast.error('Please fill in all required fields')
      return
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: formData.email,
      name: formData.name || formData.email.split('@')[0],
      role: mode === 'signup' ? role : 'client',
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
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'signin' 
              ? 'Welcome back! Enter your credentials to continue.'
              : 'Join Pro En Poche to find services or offer your expertise.'}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={mode} onValueChange={(v) => setMode(v as 'signin' | 'signup')}>
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

          <TabsContent value="signup" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>I want to</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={role === 'client' ? 'default' : 'outline'}
                  onClick={() => setRole('client')}
                  className="w-full"
                >
                  Find Services
                </Button>
                <Button
                  type="button"
                  variant={role === 'provider' ? 'default' : 'outline'}
                  onClick={() => setRole('provider')}
                  className="w-full"
                >
                  Offer Services
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-name">Full Name</Label>
              <Input
                id="signup-name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            {role === 'provider' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about your expertise..."
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="services">Services (comma separated)</Label>
                  <Input
                    id="services"
                    placeholder="Plumbing, Electrical, Carpentry"
                    value={formData.services}
                    onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Paris"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rate">Rate ($/hr)</Label>
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
                    placeholder="Mon-Fri, 9am-5pm"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  />
                </div>
              </>
            )}

            <Button onClick={handleSubmit} className="w-full" size="lg">
              Create Account
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
