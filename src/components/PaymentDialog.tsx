import { useState } from 'react'
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
import { CreditCard, Lock } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface PaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  planName: string
  planPrice: number | null
  onPaymentSuccess: () => void
}

export function PaymentDialog({
  open,
  onOpenChange,
  planName,
  planPrice,
  onPaymentSuccess,
}: PaymentDialogProps) {
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [cardName, setCardName] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!cardNumber || !expiryDate || !cvv || !cardName) {
      toast.error('Veuillez remplir tous les champs')
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
      setIsProcessing(false)
      onPaymentSuccess()
      onOpenChange(false)
      
      setCardNumber('')
      setExpiryDate('')
      setCvv('')
      setCardName('')
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard size={24} />
            Paiement Sécurisé
          </DialogTitle>
          <DialogDescription>
            Paiement pour le plan {planName} - {planPrice ? `${planPrice}$ CAD/mois` : 'Gratuit'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
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
                />
                <Lock
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-md">
            <Lock size={16} className="flex-shrink-0" />
            <span>
              Vos informations de paiement sont sécurisées et cryptées
            </span>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isProcessing}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isProcessing} className="gap-2">
              {isProcessing ? (
                <>
                  <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Traitement...
                </>
              ) : (
                <>
                  Payer {planPrice ? `${planPrice}$` : '0$'}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
