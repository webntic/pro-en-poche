import { useState } from 'react'
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
import { X, CaretLeft, CaretRight } from '@phosphor-icons/react'
import { format, addWeeks, startOfWeek, addDays } from 'date-fns'
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
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  )
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set())
  const [startTime, setStartTime] = useState<string>('09:00')
  const [endTime, setEndTime] = useState<string>('17:00')

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i))

  const goToPreviousWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, -1))
  }

  const goToNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1))
  }

  const goToToday = () => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }))
  }

  const toggleDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    const newSelected = new Set(selectedDates)
    
    if (newSelected.has(dateStr)) {
      newSelected.delete(dateStr)
    } else {
      newSelected.add(dateStr)
    }
    
    setSelectedDates(newSelected)
  }

  const handleAddSlots = () => {
    if (selectedDates.size === 0) {
      return
    }

    const newSlots: AvailabilitySlot[] = Array.from(selectedDates).map((dateStr) => ({
      date: dateStr,
      startTime,
      endTime,
    }))

    const existingDates = value.map((slot) => slot.date)
    const uniqueNewSlots = newSlots.filter((slot) => !existingDates.includes(slot.date))

    onChange([...value, ...uniqueNewSlots])
    setSelectedDates(new Set())
  }

  const handleRemoveSlot = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const sortedSlots = [...value].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  const isDateInPast = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label>Sélectionnez les dates</Label>
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousWeek}
                >
                  <CaretLeft size={16} />
                </Button>
                
                <div className="flex flex-col items-center gap-1">
                  <span className="text-sm font-medium">
                    {format(currentWeekStart, 'MMMM yyyy', { locale: fr })}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={goToToday}
                    className="text-xs h-6"
                  >
                    Aujourd'hui
                  </Button>
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={goToNextWeek}
                >
                  <CaretRight size={16} />
                </Button>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {weekDays.map((date) => {
                  const dateStr = format(date, 'yyyy-MM-dd')
                  const isSelected = selectedDates.has(dateStr)
                  const isPast = isDateInPast(date)
                  const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                  
                  return (
                    <div key={dateStr} className="flex flex-col items-center">
                      <span className="text-xs text-muted-foreground mb-1">
                        {format(date, 'EEE', { locale: fr })}
                      </span>
                      <button
                        type="button"
                        onClick={() => !isPast && toggleDate(date)}
                        disabled={isPast}
                        className={`
                          w-10 h-10 rounded-md text-sm font-medium
                          transition-colors
                          ${isPast
                            ? 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                            : isSelected
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : isToday
                            ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                            : 'bg-background border border-border hover:bg-muted'
                          }
                        `}
                      >
                        {format(date, 'd')}
                      </button>
                    </div>
                  )
                })}
              </div>
              
              {selectedDates.size > 0 && (
                <div className="text-sm text-muted-foreground">
                  {selectedDates.size} date{selectedDates.size > 1 ? 's' : ''} sélectionnée{selectedDates.size > 1 ? 's' : ''}
                </div>
              )}
            </div>
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
              disabled={selectedDates.size === 0}
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
