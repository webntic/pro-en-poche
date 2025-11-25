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
      toast.error('Please fill in all booking details')
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
          <DialogTitle className="text-2xl">Book Service with {provider.name}</DialogTitle>
          <DialogDescription>
            Select your preferred date, time, and service type
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Service Type</Label>
            <Select value={serviceType} onValueChange={setServiceType}>
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
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
            <Label>Select Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date < new Date()}
              className="rounded-md border border-border"
            />
          </div>

          <div className="space-y-2">
            <Label>Select Time</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select a time slot" />
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
              <span className="text-muted-foreground">Hourly Rate</span>
              <span className="font-medium">${provider.hourlyRate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Service Fee (15%)</span>
              <span className="font-medium">${(provider.hourlyRate * 0.15).toFixed(2)}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-lg">
                ${(provider.hourlyRate * 1.15).toFixed(2)}
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
              Confirm & Pay
            </Button>
            <Button 
              onClick={() => onOpenChange(false)}
              variant="outline"
              size="lg"
            >
              Cancel
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Payment will be held in escrow until service completion. You'll be charged ${(provider.hourlyRate * 1.15).toFixed(2)} now.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
