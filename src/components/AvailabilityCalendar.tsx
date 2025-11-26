import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { X } from '@phosphor-icons/react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export interface AvailabilitySlot {
  date: string
  startTime: string
  endTime: string
}

interface AvailabilityCalendarProps {
  value: AvailabilitySlot[]
  onChange: (slots: AvailabilitySlot[]) => void
}

const TIME_OPTIONS = [
  '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30',
  '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30',
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
]

export function AvailabilityCalendar({ value, onChange }: AvailabilityCalendarProps) {
  const [selectedDates, setSelectedDates] = useState<Date[] | undefined>(undefined)
  const [startTime, setStartTime] = useState<string>('09:00')
  const [endTime, setEndTime] = useState<string>('17:00')

  const handleAddSlots = () => {
    if (!selectedDates || selectedDates.length === 0) {
      return
    }

    const newSlots: AvailabilitySlot[] = selectedDates.map((date) => ({
      date: format(date, 'yyyy-MM-dd'),
      startTime,
      endTime,
    }))

    const existingDates = value.map((slot) => slot.date)
    const uniqueNewSlots = newSlots.filter((slot) => !existingDates.includes(slot.date))

    onChange([...value, ...uniqueNewSlots])
    setSelectedDates(undefined)
  }

  const handleRemoveSlot = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const sortedSlots = [...value].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label>Sélectionnez les dates</Label>
          <Card className="p-4">
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onSelect={setSelectedDates}
              locale={fr}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              className="rounded-md"
            />
          </Card>
        </div>

        <div className="space-y-3">
          <Label>Définissez vos horaires</Label>
          <Card className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">Heure de début</Label>
              <Select value={startTime} onValueChange={setStartTime}>
                <SelectTrigger id="start-time">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {TIME_OPTIONS.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="end-time">Heure de fin</Label>
              <Select value={endTime} onValueChange={setEndTime}>
                <SelectTrigger id="end-time">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {TIME_OPTIONS.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="button"
              onClick={handleAddSlots}
              disabled={!selectedDates || selectedDates.length === 0}
              className="w-full"
            >
              Ajouter les disponibilités
            </Button>
          </Card>
        </div>
      </div>

      {sortedSlots.length > 0 && (
        <div className="space-y-2">
          <Label>Vos disponibilités ({sortedSlots.length})</Label>
          <div className="grid gap-2 max-h-[200px] overflow-y-auto p-2 border border-border rounded-md">
            {sortedSlots.map((slot, index) => {
              const actualIndex = value.findIndex(
                (s) => s.date === slot.date && s.startTime === slot.startTime
              )
              return (
                <div
                  key={`${slot.date}-${slot.startTime}-${index}`}
                  className="flex items-center justify-between gap-2 p-2 bg-muted rounded-md"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="font-normal">
                      {format(new Date(slot.date + 'T00:00:00'), 'EEEE d MMMM yyyy', { locale: fr })}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {slot.startTime} - {slot.endTime}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveSlot(actualIndex)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
