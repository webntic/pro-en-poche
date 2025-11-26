import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { ArrowLeft, ArrowRight, CheckCircle } from '@phosphor-icons/react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { CANADIAN_CITIES } from '@/lib/demo-data'

interface MultiStepClientFormProps {
  onSubmit: (data: ClientFormData) => void
  onBack: () => void
}

export interface ClientFormData {
  firstName: string
  lastName: string
  phone: string
  email: string
  address1: string
  address2: string
  city: string
  province: string
  serviceType: string
  otherService: string
  frequency: string
  availability: string
  date: string
  time: string
  timeSlot: string
  needDescription: string
  budget: number
  comments: string
  consentData: boolean
  consentMarketing: boolean
  password: string
}

const CANADIAN_PROVINCES = [
  'Alberta',
  'Colombie-Britannique',
  'Manitoba',
  'Nouveau-Brunswick',
  'Terre-Neuve-et-Labrador',
  'Nouvelle-Écosse',
  'Ontario',
  'Île-du-Prince-Édouard',
  'Québec',
  'Saskatchewan',
  'Territoires du Nord-Ouest',
  'Nunavut',
  'Yukon',
]

const SERVICE_TYPES = [
  'Ménage',
  'Jardinage',
  'Bricolage',
  "Garde d'enfants",
  'Petits travaux',
  'Autre',
]

const FREQUENCY_OPTIONS = [
  'Ponctuel',
  'Hebdomadaire',
  'Mensuel',
]

const AVAILABILITY_OPTIONS = [
  'Ce weekend',
  'Semaine prochaine',
]

const TIME_SLOTS = [
  'Matin (8h-12h)',
  'Après-midi (12h-17h)',
  'Soir (17h-20h)',
  'Flexible',
]

export function MultiStepClientForm({ onSubmit, onBack }: MultiStepClientFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ClientFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    province: '',
    serviceType: '',
    otherService: '',
    frequency: '',
    availability: '',
    date: '',
    time: '',
    timeSlot: '',
    needDescription: '',
    budget: 10,
    comments: '',
    consentData: false,
    consentMarketing: false,
    password: '',
  })

  const totalSteps = 8
  const progress = (currentStep / totalSteps) * 100

  const updateFormData = (updates: Partial<ClientFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email) {
          toast.error('Veuillez remplir tous les champs obligatoires')
          return false
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
          toast.error('Veuillez entrer une adresse email valide')
          return false
        }
        return true

      case 2:
        if (!formData.address1 || !formData.city || !formData.province) {
          toast.error('Veuillez remplir tous les champs obligatoires de l\'adresse')
          return false
        }
        return true

      case 3:
        if (!formData.serviceType) {
          toast.error('Veuillez sélectionner un type de service')
          return false
        }
        if (formData.serviceType === 'Autre' && !formData.otherService) {
          toast.error('Veuillez préciser le type de service')
          return false
        }
        return true

      case 4:
        if (!formData.frequency) {
          toast.error('Veuillez sélectionner une fréquence')
          return false
        }
        return true

      case 5:
        if (!formData.availability) {
          toast.error('Veuillez sélectionner une disponibilité')
          return false
        }
        if (!formData.date || !formData.time) {
          toast.error('Veuillez entrer une date et une heure')
          return false
        }
        return true

      case 6:
        if (!formData.timeSlot) {
          toast.error('Veuillez sélectionner une plage horaire')
          return false
        }
        return true

      case 7:
        if (!formData.needDescription || formData.needDescription.trim().length < 10) {
          toast.error('Veuillez décrire votre besoin (minimum 10 caractères)')
          return false
        }
        return true

      case 8:
        if (!formData.budget || formData.budget < 10) {
          toast.error('Veuillez définir un budget minimum de 10$')
          return false
        }
        if (!formData.consentData) {
          toast.error('Vous devez accepter l\'utilisation de vos informations pour continuer')
          return false
        }
        if (!formData.password || formData.password.length < 6) {
          toast.error('Veuillez entrer un mot de passe d\'au moins 6 caractères')
          return false
        }
        return true

      default:
        return true
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onSubmit(formData)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Étape {currentStep} sur {totalSteps}
          </h2>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}% complété</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="p-6 md:p-8">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Informations personnelles</h3>
              <p className="text-muted-foreground">Commencez par vos informations de base</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-base">
                  Prénom <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="firstName"
                  placeholder="Marie"
                  value={formData.firstName}
                  onChange={(e) => updateFormData({ firstName: e.target.value })}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-base">
                  Nom <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="lastName"
                  placeholder="Tremblay"
                  value={formData.lastName}
                  onChange={(e) => updateFormData({ lastName: e.target.value })}
                  className="h-12 text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base">
                Téléphone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(514) 555-1234"
                value={formData.phone}
                onChange={(e) => updateFormData({ phone: e.target.value })}
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="vous@exemple.ca"
                value={formData.email}
                onChange={(e) => updateFormData({ email: e.target.value })}
                className="h-12 text-base"
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Adresse</h3>
              <p className="text-muted-foreground">Où se trouve le service demandé?</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address1" className="text-base">
                Adresse ligne 1 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="address1"
                placeholder="13 All. du Chemin de Halage"
                value={formData.address1}
                onChange={(e) => updateFormData({ address1: e.target.value })}
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address2" className="text-base">
                Adresse ligne 2
              </Label>
              <Input
                id="address2"
                placeholder="Appartement, suite, etc. (optionnel)"
                value={formData.address2}
                onChange={(e) => updateFormData({ address2: e.target.value })}
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-base">
                Ville <span className="text-destructive">*</span>
              </Label>
              <Select value={formData.city} onValueChange={(value) => updateFormData({ city: value })}>
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
              <Label htmlFor="province" className="text-base">
                État / Province / Région <span className="text-destructive">*</span>
              </Label>
              <Select value={formData.province} onValueChange={(value) => updateFormData({ province: value })}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Sélectionnez une province" />
                </SelectTrigger>
                <SelectContent>
                  {CANADIAN_PROVINCES.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Type de service recherché</h3>
              <p className="text-muted-foreground">Quel service souhaitez-vous?</p>
            </div>

            <div className="space-y-2">
              <Label className="text-base">
                Sélectionnez un service <span className="text-destructive">*</span>
              </Label>
              <RadioGroup value={formData.serviceType} onValueChange={(value) => updateFormData({ serviceType: value })}>
                <div className="space-y-3">
                  {SERVICE_TYPES.map((service) => (
                    <div key={service} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value={service} id={`service-${service}`} />
                      <Label htmlFor={`service-${service}`} className="cursor-pointer flex-1 text-base">
                        {service}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {formData.serviceType === 'Autre' && (
              <div className="space-y-2">
                <Label htmlFor="otherService" className="text-base">
                  Précisez le service <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="otherService"
                  placeholder="Décrivez le service souhaité"
                  value={formData.otherService}
                  onChange={(e) => updateFormData({ otherService: e.target.value })}
                  className="h-12 text-base"
                />
              </div>
            )}
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Fréquence</h3>
              <p className="text-muted-foreground">À quelle fréquence avez-vous besoin du service?</p>
            </div>

            <div className="space-y-2">
              <Label className="text-base">
                Fréquence <span className="text-destructive">*</span>
              </Label>
              <RadioGroup value={formData.frequency} onValueChange={(value) => updateFormData({ frequency: value })}>
                <div className="space-y-3">
                  {FREQUENCY_OPTIONS.map((freq) => (
                    <div key={freq} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value={freq} id={`freq-${freq}`} />
                      <Label htmlFor={`freq-${freq}`} className="cursor-pointer flex-1 text-base font-medium">
                        {freq}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Disponibilité souhaitée</h3>
              <p className="text-muted-foreground">Quand avez-vous besoin du service?</p>
            </div>

            <div className="space-y-2">
              <Label className="text-base">
                Disponibilité souhaitée <span className="text-destructive">*</span>
              </Label>
              <RadioGroup value={formData.availability} onValueChange={(value) => updateFormData({ availability: value })}>
                <div className="space-y-3">
                  {AVAILABILITY_OPTIONS.map((avail) => (
                    <div key={avail} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value={avail} id={`avail-${avail}`} />
                      <Label htmlFor={`avail-${avail}`} className="cursor-pointer flex-1 text-base font-medium">
                        {avail}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-base">
                  Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => updateFormData({ date: e.target.value })}
                  className="h-12 text-base"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="text-base">
                  Heure <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => updateFormData({ time: e.target.value })}
                  className="h-12 text-base"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Plage horaire préférée</h3>
              <p className="text-muted-foreground">Quelle période vous convient le mieux?</p>
            </div>

            <div className="space-y-2">
              <Label className="text-base">
                Plage horaire préférée <span className="text-destructive">*</span>
              </Label>
              <RadioGroup value={formData.timeSlot} onValueChange={(value) => updateFormData({ timeSlot: value })}>
                <div className="space-y-3">
                  {TIME_SLOTS.map((slot) => (
                    <div key={slot} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value={slot} id={`slot-${slot}`} />
                      <Label htmlFor={`slot-${slot}`} className="cursor-pointer flex-1 text-base font-medium">
                        {slot}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {currentStep === 7 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Détails du besoin</h3>
              <p className="text-muted-foreground">Décrivez ce que vous souhaitez déléguer</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="needDescription" className="text-base">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="needDescription"
                placeholder="Ex: Ménage complet du salon, nettoyage des vitres, aspiration des tapis..."
                value={formData.needDescription}
                onChange={(e) => updateFormData({ needDescription: e.target.value })}
                rows={8}
                className="text-base resize-none"
              />
              <p className="text-sm text-muted-foreground">
                Soyez le plus précis possible pour recevoir des propositions adaptées (minimum 10 caractères)
              </p>
            </div>
          </div>
        )}

        {currentStep === 8 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Budget et consentement</h3>
              <p className="text-muted-foreground">Dernières informations pour finaliser votre inscription</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="budget" className="text-base">
                  Budget <span className="text-destructive">*</span>
                </Label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Prix minimum</span>
                    <span className="text-2xl font-bold text-primary">${formData.budget.toFixed(2)}</span>
                  </div>
                  <Slider
                    id="budget"
                    min={10}
                    max={500}
                    step={5}
                    value={[formData.budget]}
                    onValueChange={(value) => updateFormData({ budget: value[0] })}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>$10</span>
                    <span>$500</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comments" className="text-base">
                  Commentaires ou précisions
                </Label>
                <Textarea
                  id="comments"
                  placeholder="Allergies, animaux à domicile, accès particulier, instructions spécifiques..."
                  value={formData.comments}
                  onChange={(e) => updateFormData({ comments: e.target.value })}
                  rows={4}
                  className="text-base resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-base">
                  Mot de passe <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => updateFormData({ password: e.target.value })}
                  className="h-12 text-base"
                />
                <p className="text-sm text-muted-foreground">Minimum 6 caractères</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h4 className="font-semibold text-lg">Consentement</h4>
              
              <div className="flex items-start space-x-3 p-4 rounded-lg border bg-muted/30">
                <Checkbox
                  id="consentData"
                  checked={formData.consentData}
                  onCheckedChange={(checked) => updateFormData({ consentData: checked as boolean })}
                  className="mt-1"
                />
                <Label htmlFor="consentData" className="text-base cursor-pointer leading-relaxed">
                  J'accepte que mes informations soient utilisées pour me proposer un prestataire adapté{' '}
                  <span className="text-destructive">*</span>
                </Label>
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-lg border">
                <Checkbox
                  id="consentMarketing"
                  checked={formData.consentMarketing}
                  onCheckedChange={(checked) => updateFormData({ consentMarketing: checked as boolean })}
                  className="mt-1"
                />
                <Label htmlFor="consentMarketing" className="text-base cursor-pointer leading-relaxed">
                  Je souhaite recevoir des offres et conseils de ProEnPoche
                </Label>
              </div>
            </div>
          </div>
        )}
      </Card>

      <div className="flex items-center justify-between gap-4">
        {currentStep > 1 ? (
          <Button variant="outline" onClick={handlePrevious} className="gap-2 h-12 px-6">
            <ArrowLeft size={20} />
            Précédent
          </Button>
        ) : (
          <Button variant="outline" onClick={onBack} className="gap-2 h-12 px-6">
            <ArrowLeft size={20} />
            Retour
          </Button>
        )}

        {currentStep < totalSteps ? (
          <Button onClick={handleNext} className="gap-2 h-12 px-6 ml-auto">
            Suivant
            <ArrowRight size={20} />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="gap-2 h-12 px-6 ml-auto">
            <CheckCircle size={20} />
            Créer mon compte
          </Button>
        )}
      </div>
    </div>
  )
}
