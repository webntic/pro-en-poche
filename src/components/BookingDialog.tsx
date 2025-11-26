import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Separator } from '@/components/ui/separator'
import { ServiceProvider, Booking } from '@/lib/types'
import { CreditCard, Lock, ArrowLeft, Check } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface BookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  provider: ServiceProvider | null
  onConfirm: (booking: Omit<Booking, 'id' | 'createdAt'>) => void
  currentUserId: string
}

export function BookingDialog({ 
  open, 
  onOpenChange, 
  provider,
  onConfirm,
  currentUserId
}: BookingDialogProps) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>('')
  const [serviceType, setServiceType] = useState<string>('')
  const [step, setStep] = useState<'booking' | 'payment'>('booking')
  
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [cardName, setCardName] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  if (!provider) return null

  const totalAmount = (provider.hourlyRate * 1.15).toFixed(2)
  const serviceFee = (provider.hourlyRate * 0.15).toFixed(2)

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '').replace(/\D/g, '')
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned
    return formatted.slice(0, 19)
  }

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
    }
    return cleaned
  }

  const formatCVV = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 3)
  }

  const handleContinueToPayment = () => {
    if (!date || !time || !serviceType) {
      toast.error('Veuillez remplir tous les détails de la réservation')
      return
    }
    setStep('payment')
  }

  const handlePayment = async () => {
    if (!cardNumber || !expiryDate || !cvv || !cardName) {
      toast.error('Veuillez remplir tous les champs de paiement')
      return
    }

    if (cardNumber.replace(/\s/g, '').length !== 16) {
      toast.error('Numéro de carte invalide')
      return
    }

    if (expiryDate.length !== 5) {
      toast.error('Date d\'expiration invalide')
      return
    }

    if (cvv.length !== 3) {
      toast.error('CVV invalide')
      return
    }

    setIsProcessing(true)

    setTimeout(() => {
      const booking: Omit<Booking, 'id' | 'createdAt'> = {
        providerId: provider.id,
        clientId: currentUserId,
        serviceType,
        date: date!.toISOString(),
        time,
        status: 'confirmed',
        price: provider.hourlyRate,
        paymentStatus: 'held',
      }

      onConfirm(booking)
      setIsProcessing(false)
      
      setDate(undefined)
      setTime('')
      setServiceType('')
      setCardNumber('')
      setExpiryDate('')
      setCvv('')
      setCardName('')
      setStep('booking')
      onOpenChange(false)
    }, 2000)
  }

  const handleBackToBooking = () => {
    setStep('booking')
  }

  const handleClose = () => {
    setStep('booking')
    onOpenChange(false)
  }

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ]

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {step === 'booking' ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Réserver un service avec {provider.name}</DialogTitle>
              <DialogDescription>
                Sélectionnez votre date, heure et type de service préférés
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>Type de service</Label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un service" />
                  </SelectTrigger>
                  <SelectContent>
                    {provider.services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Sélectionnez une date</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>Sélectionnez une heure</Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un créneau horaire" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="bg-muted/50 p-5 rounded-lg space-y-3 border border-border">
                <h3 className="font-semibold text-base flex items-center gap-2">
                  <CreditCard size={18} />
                  Résumé de la réservation
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tarif horaire</span>
                    <span className="font-medium">{provider.hourlyRate}$</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frais de service (15%)</span>
                    <span className="font-medium">{serviceFee}$</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between pt-1">
                    <span className="font-semibold text-base">Total à payer</span>
                    <span className="font-bold text-xl text-primary">
                      {totalAmount}$
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleContinueToPayment}
                  className="flex-1 gap-2"
                  size="lg"
                >
                  Continuer vers le paiement
                  <CreditCard size={18} />
                </Button>
                <Button 
                  onClick={handleClose}
                  variant="outline"
                  size="lg"
                >
                  Annuler
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Le paiement sera conservé en garantie jusqu'à l'achèvement du service
              </p>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToBooking}
                  className="gap-1"
                >
                  <ArrowLeft size={16} />
                  Retour
                </Button>
              </div>
              <DialogTitle className="text-2xl flex items-center gap-2 pt-2">
                <Lock size={24} className="text-primary" />
                Paiement Sécurisé
              </DialogTitle>
              <DialogDescription>
                Entrez vos informations de paiement pour confirmer la réservation
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Montant à payer</p>
                    <p className="text-2xl font-bold text-primary">{totalAmount}$ CAD</p>
                  </div>
                  <Check size={32} weight="duotone" className="text-primary" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-name">Nom sur la carte</Label>
                  <Input
                    id="card-name"
                    placeholder="Jean Dupont"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    disabled={isProcessing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="card-number">Numéro de carte</Label>
                  <div className="relative">
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      disabled={isProcessing}
                      className="pr-10"
                    />
                    <CreditCard
                      size={20}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Date d'expiration</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/AA"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                      disabled={isProcessing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <div className="relative">
                      <Input
                        id="cvv"
                        placeholder="123"
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(formatCVV(e.target.value))}
                        disabled={isProcessing}
                        className="pr-10"
                      />
                      <Lock
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-md border border-border">
                <Lock size={16} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Paiement 100% sécurisé</p>
                  <p>Vos informations de paiement sont cryptées et sécurisées. Le montant sera conservé en garantie jusqu'à la fin du service.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleBackToBooking}
                  variant="outline"
                  size="lg"
                  disabled={isProcessing}
                >
                  Retour
                </Button>
                <Button 
                  onClick={handlePayment}
                  className="flex-1 gap-2"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      Confirmer le paiement de {totalAmount}$
                    </>
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
