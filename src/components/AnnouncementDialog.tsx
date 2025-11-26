import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Announcement } from '@/lib/types'
import { CANADIAN_CITIES, SERVICE_CATEGORIES } from '@/lib/demo-data'
import { X } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { AvailabilityCalendar, AvailabilitySlot } from '@/components/AvailabilityCalendar'

interface AnnouncementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (announcement: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>) => void
  providerId: string
  editAnnouncement?: Announcement
}

export function AnnouncementDialog({
  open,
  onOpenChange,
  onSubmit,
  providerId,
  editAnnouncement,
}: AnnouncementDialogProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')
  const [location, setLocation] = useState('')
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([])
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [newService, setNewService] = useState('')

  useEffect(() => {
    if (editAnnouncement) {
      setTitle(editAnnouncement.title)
      setDescription(editAnnouncement.description)
      setCategory(editAnnouncement.category)
      setHourlyRate(editAnnouncement.hourlyRate.toString())
      setLocation(editAnnouncement.location)
      setAvailabilitySlots(editAnnouncement.availabilitySlots || [])
      setSelectedServices(editAnnouncement.services)
    } else {
      resetForm()
    }
  }, [editAnnouncement, open])

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setCategory('')
    setHourlyRate('')
    setLocation('')
    setAvailabilitySlots([])
    setSelectedServices([])
    setNewService('')
  }

  const handleAddService = () => {
    if (newService.trim() && !selectedServices.includes(newService.trim())) {
      setSelectedServices([...selectedServices, newService.trim()])
      setNewService('')
    }
  }

  const handleRemoveService = (service: string) => {
    setSelectedServices(selectedServices.filter(s => s !== service))
  }

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error('Veuillez entrer un titre')
      return
    }
    if (!description.trim()) {
      toast.error('Veuillez entrer une description')
      return
    }
    if (!category) {
      toast.error('Veuillez sélectionner une catégorie')
      return
    }
    if (!hourlyRate || parseFloat(hourlyRate) <= 0) {
      toast.error('Veuillez entrer un tarif horaire valide')
      return
    }
    if (!location) {
      toast.error('Veuillez sélectionner une ville')
      return
    }
    if (availabilitySlots.length === 0) {
      toast.error('Veuillez ajouter au moins une disponibilité')
      return
    }
    if (selectedServices.length === 0) {
      toast.error('Veuillez ajouter au moins un service')
      return
    }

    const availabilitySummary = `${availabilitySlots.length} créneau${availabilitySlots.length > 1 ? 'x' : ''} disponible${availabilitySlots.length > 1 ? 's' : ''}`

    onSubmit({
      providerId,
      title: title.trim(),
      description: description.trim(),
      category,
      hourlyRate: parseFloat(hourlyRate),
      location,
      availability: availabilitySummary,
      availabilitySlots,
      services: selectedServices,
      isActive: editAnnouncement?.isActive ?? true,
    })

    resetForm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editAnnouncement ? 'Modifier l\'annonce' : 'Créer une nouvelle annonce'}
          </DialogTitle>
          <DialogDescription>
            Remplissez les informations pour votre annonce de service
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre de l'annonce *</Label>
            <Input
              id="title"
              placeholder="Ex: Plombier professionnel avec 15 ans d'expérience"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Décrivez vos services, votre expérience et ce qui vous distingue..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie principale *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Sélectionnez une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_CATEGORIES.filter(c => c !== 'Tous les services').map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Ville *</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger id="location">
                  <SelectValue placeholder="Sélectionnez une ville" />
                </SelectTrigger>
                <SelectContent>
                  {CANADIAN_CITIES.filter(c => c !== 'Toutes les villes').map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Tarif horaire (CAD) *</Label>
              <Input
                id="hourlyRate"
                type="number"
                min="0"
                step="5"
                placeholder="75"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Calendrier de disponibilités *</Label>
            <AvailabilityCalendar
              value={availabilitySlots}
              onChange={setAvailabilitySlots}
            />
          </div>

          <div className="space-y-2">
            <Label>Services offerts *</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Ajoutez un service"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddService()
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={handleAddService}>
                Ajouter
              </Button>
            </div>
            {selectedServices.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedServices.map((service) => (
                  <Badge key={service} variant="secondary" className="gap-1">
                    {service}
                    <button
                      type="button"
                      onClick={() => handleRemoveService(service)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSubmit}>
            {editAnnouncement ? 'Mettre à jour' : 'Créer l\'annonce'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
