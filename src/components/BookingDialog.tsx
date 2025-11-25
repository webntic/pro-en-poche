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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { ServiceProvider, Booking } from '@/lib/types'
import { CreditCard } from '@phosphor-icons/react'
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

  if (!provider) return null

  const handleConfirm = () => {
    if (!date || !time || !serviceType) {
      toast.error('Veuillez remplir tous les détails de la réservation')
      return
    }

    const booking: Omit<Booking, 'id' | 'createdAt'> = {
      providerId: provider.id,
      clientId: currentUserId,
      serviceType,
      date: date.toISOString(),
      time,
      status: 'confirmed',
      price: provider.hourlyRate,
      paymentStatus: 'held',
    }

    onConfirm(booking)
    
    setDate(undefined)
    setTime('')
    setServiceType('')
  }

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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

          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tarif horaire</span>
              <span className="font-medium">{provider.hourlyRate}$</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Frais de service (15%)</span>
              <span className="font-medium">{(provider.hourlyRate * 0.15).toFixed(2)}$</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-lg">
                {(provider.hourlyRate * 1.15).toFixed(2)}$
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={handleConfirm}
              className="flex-1"
              size="lg"
            >
              <CreditCard className="mr-2" size={18} />
              Confirmer et payer
            </Button>
            <Button 
              onClick={() => onOpenChange(false)}
              variant="outline"
              size="lg"
            >
              Annuler
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Le paiement sera conservé en garantie jusqu'à l'achèvement du service. Vous serez facturé {(provider.hourlyRate * 1.15).toFixed(2)}$ maintenant.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
