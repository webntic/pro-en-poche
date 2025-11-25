import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { EnvelopeSimple, Phone, MapPin } from '@phosphor-icons/react'
import { toast } from 'sonner'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Message envoyé! Nous vous répondrons dans les plus brefs délais.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Contactez-nous</h1>
          <p className="text-xl text-muted-foreground">
            Une question ? Notre équipe est là pour vous aider
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="p-6 text-center space-y-3">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <EnvelopeSimple size={24} className="text-primary" weight="duotone" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-sm text-muted-foreground">contact@proenpoche.ca</p>
            </div>
          </Card>

          <Card className="p-6 text-center space-y-3">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone size={24} className="text-primary" weight="duotone" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Téléphone</h3>
              <p className="text-sm text-muted-foreground">1-800-PRO-POCHE</p>
            </div>
          </Card>

          <Card className="p-6 text-center space-y-3">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin size={24} className="text-primary" weight="duotone" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Adresse</h3>
              <p className="text-sm text-muted-foreground">Montréal, QC, Canada</p>
            </div>
          </Card>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Votre nom"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Sujet</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Objet de votre message"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Décrivez votre demande..."
                rows={6}
                required
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Envoyer le message
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
