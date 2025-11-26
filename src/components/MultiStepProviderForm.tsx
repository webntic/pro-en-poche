import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { ArrowLeft, ArrowRight, Upload, Camera, CheckCircle } from '@phosphor-icons/react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { CANADIAN_CITIES } from '@/lib/demo-data'

interface MultiStepProviderFormProps {
  onSubmit: (data: ProviderFormData) => void
  onBack: () => void
}

export interface ProviderFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address1: string
  address2: string
  city: string
  province: string
  postalCode: string
  country: string
  category: string
  profession: string
  description: string
  coverageZones: string
  availability: string[]
  experienceYears: string
  priceRange: string
  idVerificationFiles: File[]
  selfieFile: File | null
  acceptsTerms: boolean
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

const SERVICE_CATEGORIES_DETAILED = [
  'Assistante à domicile',
  'Ménage / Entretien',
  'Plomberie',
  'Tutorat',
  'Déménagement',
  'Assemblage de meuble',
  'Autre',
]

const AVAILABILITY_OPTIONS = [
  'Immédiate',
  'En semaine',
  'En week-end',
  'Autres',
]

const PRICE_RANGES = [
  { label: 'A $0 - $15.00', value: 'A' },
  { label: 'B $15.00 - $25.00', value: 'B' },
  { label: 'C $25.00 - $50.00', value: 'C' },
  { label: 'D $50 - $100.00', value: 'D' },
  { label: 'E + - $100.00', value: 'E' },
]

export function MultiStepProviderForm({ onSubmit, onBack }: MultiStepProviderFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ProviderFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'Canada',
    category: '',
    profession: '',
    description: '',
    coverageZones: '',
    availability: [],
    experienceYears: '',
    priceRange: '',
    idVerificationFiles: [],
    selfieFile: null,
    acceptsTerms: false,
    password: '',
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const updateFormData = (updates: Partial<ProviderFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
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
        if (!formData.address1 || !formData.city || !formData.province || !formData.postalCode) {
          toast.error('Veuillez remplir tous les champs obligatoires de l\'adresse')
          return false
        }
        const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/
        if (!postalCodeRegex.test(formData.postalCode)) {
          toast.error('Veuillez entrer un code postal canadien valide (ex: A1A 1A1)')
          return false
        }
        return true

      case 3:
        if (!formData.category) {
          toast.error('Veuillez choisir un secteur d\'activité')
          return false
        }
        return true

      case 4:
        if (!formData.description || !formData.coverageZones || formData.availability.length === 0 || !formData.priceRange) {
          toast.error('Veuillez remplir tous les champs obligatoires')
          return false
        }
        if (formData.idVerificationFiles.length === 0) {
          toast.error('Veuillez téléverser au moins un document de vérification d\'identité')
          return false
        }
        if (!formData.selfieFile) {
          toast.error('Veuillez prendre un selfie pour la vérification')
          return false
        }
        if (!formData.acceptsTerms) {
          toast.error('Veuillez accepter les conditions d\'utilisation')
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

  const handleIdFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 4)
      updateFormData({ idVerificationFiles: filesArray })
    }
  }

  const handleSelfieCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateFormData({ selfieFile: e.target.files[0] })
    }
  }

  const toggleAvailability = (option: string) => {
    const current = formData.availability
    if (current.includes(option)) {
      updateFormData({ availability: current.filter((a) => a !== option) })
    } else {
      updateFormData({ availability: [...current, option] })
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
                  placeholder="Jean"
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
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Adresse</h3>
              <p className="text-muted-foreground">Où êtes-vous situé?</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address1" className="text-base">
                Adresse ligne 1 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="address1"
                placeholder="123 rue Principale"
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

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-base">
                  Ville <span className="text-destructive">*</span>
                </Label>
                <Select value={formData.city} onValueChange={(value) => updateFormData({ city: value })}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Sélectionnez une ville" />
                  </SelectTrigger>
                  <SelectContent>
                    {CANADIAN_CITIES.filter((city) => city !== 'Toutes les villes').map((city) => (
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

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="postalCode" className="text-base">
                  Code postal <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="postalCode"
                  placeholder="A1A 1A1"
                  value={formData.postalCode}
                  onChange={(e) => updateFormData({ postalCode: e.target.value.toUpperCase() })}
                  className="h-12 text-base"
                  maxLength={7}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-base">
                  Pays <span className="text-destructive">*</span>
                </Label>
                <Input id="country" value="Canada" disabled className="h-12 text-base bg-muted" />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Secteur d'activité</h3>
              <p className="text-muted-foreground">Quel type de service offrez-vous?</p>
            </div>

            <div className="space-y-2">
              <Label className="text-base">
                Choisissez votre secteur d'activités <span className="text-destructive">*</span>
              </Label>
              <div className="grid sm:grid-cols-2 gap-3">
                {SERVICE_CATEGORIES_DETAILED.map((category) => (
                  <Card
                    key={category}
                    className={`p-4 cursor-pointer transition-all hover:border-primary ${
                      formData.category === category ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => updateFormData({ category })}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                          formData.category === category ? 'border-primary bg-primary' : 'border-muted-foreground'
                        }`}
                      >
                        {formData.category === category && <CheckCircle weight="fill" className="text-primary-foreground" size={20} />}
                      </div>
                      <span className="font-medium">{category}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profession" className="text-base">
                Titre professionnel <span className="text-destructive">*</span>
              </Label>
              <Input
                id="profession"
                placeholder="Ex: Plombier Certifié, Designer d'Intérieur, etc."
                value={formData.profession}
                onChange={(e) => updateFormData({ profession: e.target.value })}
                className="h-12 text-base"
              />
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Détails du service</h3>
              <p className="text-muted-foreground">Complétez votre profil professionnel</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-base">
                Description de vos services <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Décrivez votre expertise, vos services et ce qui vous distingue..."
                value={formData.description}
                onChange={(e) => updateFormData({ description: e.target.value })}
                rows={6}
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverageZones" className="text-base">
                Zones couvertes <span className="text-destructive">*</span>
              </Label>
              <Input
                id="coverageZones"
                placeholder="Ex: Montréal, Laval, Longueuil"
                value={formData.coverageZones}
                onChange={(e) => updateFormData({ coverageZones: e.target.value })}
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base">
                Disponibilité <span className="text-destructive">*</span>
              </Label>
              <div className="grid sm:grid-cols-2 gap-3">
                {AVAILABILITY_OPTIONS.map((option) => (
                  <Card
                    key={option}
                    className={`p-4 cursor-pointer transition-all hover:border-primary ${
                      formData.availability.includes(option) ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => toggleAvailability(option)}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox checked={formData.availability.includes(option)} />
                      <span className="font-medium">{option}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experienceYears" className="text-base">
                Années d'expérience
              </Label>
              <Input
                id="experienceYears"
                type="number"
                placeholder="Ex: 5"
                value={formData.experienceYears}
                onChange={(e) => updateFormData({ experienceYears: e.target.value })}
                className="h-12 text-base"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base">
                Tarif <span className="text-destructive">*</span>
              </Label>
              <div className="space-y-2">
                {PRICE_RANGES.map((range) => (
                  <Card
                    key={range.value}
                    className={`p-4 cursor-pointer transition-all hover:border-primary ${
                      formData.priceRange === range.value ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => updateFormData({ priceRange: range.value })}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                          formData.priceRange === range.value ? 'border-primary bg-primary' : 'border-muted-foreground'
                        }`}
                      >
                        {formData.priceRange === range.value && (
                          <div className="h-2.5 w-2.5 rounded-full bg-primary-foreground" />
                        )}
                      </div>
                      <span className="font-medium">{range.label}</span>
                    </div>
                  </Card>
                ))}
                <p className="text-sm text-muted-foreground px-4">hors taxe et frais d'utilisation</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="idVerification" className="text-base">
                Vérification d'identité <span className="text-destructive">*</span>
              </Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 hover:border-primary transition-colors">
                <div className="flex flex-col items-center gap-4">
                  <Upload size={48} className="text-muted-foreground" />
                  <div className="text-center">
                    <p className="font-medium mb-1">Glissez-déposez vos fichiers ici</p>
                    <p className="text-sm text-muted-foreground mb-4">ou cliquez pour sélectionner</p>
                    <Input
                      id="idVerification"
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                      onChange={handleIdFileChange}
                      className="hidden"
                    />
                    <Button type="button" variant="outline" onClick={() => document.getElementById('idVerification')?.click()}>
                      Choisir les fichiers
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Vous pouvez téléverser jusqu'à 4 fichiers</p>
                  {formData.idVerificationFiles.length > 0 && (
                    <div className="w-full">
                      <p className="text-sm font-medium mb-2">{formData.idVerificationFiles.length} fichier(s) sélectionné(s):</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {formData.idVerificationFiles.map((file, index) => (
                          <li key={index}>• {file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="selfie" className="text-base">
                Selfie <span className="text-destructive">*</span>
              </Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 hover:border-primary transition-colors">
                <div className="flex flex-col items-center gap-4">
                  <Camera size={48} className="text-muted-foreground" />
                  <div className="text-center">
                    <p className="font-medium mb-1">Prenez une photo avec votre caméra</p>
                    <p className="text-sm text-muted-foreground mb-4">ou sélectionnez une image</p>
                    <Input
                      id="selfie"
                      type="file"
                      accept="image/*"
                      capture="user"
                      onChange={handleSelfieCapture}
                      className="hidden"
                    />
                    <Button type="button" variant="outline" onClick={() => document.getElementById('selfie')?.click()}>
                      Capturer avec votre caméra
                    </Button>
                  </div>
                  {formData.selfieFile && (
                    <div className="text-sm text-muted-foreground">✓ Selfie capturé: {formData.selfieFile.name}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptsTerms}
                  onCheckedChange={(checked) => updateFormData({ acceptsTerms: checked as boolean })}
                />
                <div className="flex-1">
                  <Label htmlFor="acceptTerms" className="text-base cursor-pointer">
                    Éléments multiples <span className="text-destructive">*</span>
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    J'accepte les conditions d'utilisation et la politique de confidentialité de Pro En Poche. Je confirme que toutes les
                    informations fournies sont exactes et véridiques.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>

      <div className="flex items-center justify-between gap-4">
        <Button variant="outline" onClick={currentStep === 1 ? onBack : handlePrevious} className="gap-2 h-12 px-6">
          <ArrowLeft size={18} />
          {currentStep === 1 ? 'Retour' : 'Précédent'}
        </Button>

        {currentStep < totalSteps ? (
          <Button onClick={handleNext} className="gap-2 h-12 px-6">
            Suivant
            <ArrowRight size={18} />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="gap-2 h-12 px-6">
            Créer mon compte
            <CheckCircle size={18} />
          </Button>
        )}
      </div>
    </div>
  )
}
