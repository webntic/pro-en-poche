import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { X } from '@phosphor-icons/react'
import { CANADIAN_CITIES, SERVICE_CATEGORIES } from '@/lib/demo-data'

export interface FilterState {
  category: string
  location: string
  priceRange: [number, number]
  minRating: number
}

interface FilterPanelProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  onClear: () => void
}

export function FilterPanel({ filters, onFilterChange, onClear }: FilterPanelProps) {
  return (
    <Card className="premium-card p-7 h-fit sticky top-28 border-0">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-bold text-xl premium-text-gradient tracking-tight">Filtres</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-9 px-3 hover:bg-primary/5 transition-all duration-300"
        >
          <X size={18} weight="duotone" className="mr-1.5" />
          Effacer
        </Button>
      </div>

      <div className="space-y-7">
        <div className="space-y-3">
          <Label className="font-semibold text-sm">Catégorie</Label>
          <Select 
            value={filters.category} 
            onValueChange={(value) => onFilterChange({ ...filters, category: value })}
          >
            <SelectTrigger className="h-11 border-2 hover:border-primary/30 transition-all duration-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SERVICE_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat} className="cursor-pointer">
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator className="bg-border/40" />

        <div className="space-y-3">
          <Label className="font-semibold text-sm">Ville</Label>
          <Select 
            value={filters.location} 
            onValueChange={(value) => onFilterChange({ ...filters, location: value })}
          >
            <SelectTrigger className="h-11 border-2 hover:border-primary/30 transition-all duration-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CANADIAN_CITIES.map((loc) => (
                <SelectItem key={loc} value={loc} className="cursor-pointer">
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator className="bg-border/40" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="font-semibold text-sm">Tarif horaire</Label>
            <span className="text-sm font-bold text-primary">
              {filters.priceRange[0]}$ - {filters.priceRange[1]}$
            </span>
          </div>
          <Slider
            min={0}
            max={200}
            step={10}
            value={filters.priceRange}
            onValueChange={(value) => 
              onFilterChange({ ...filters, priceRange: value as [number, number] })
            }
            className="w-full"
          />
        </div>

        <Separator className="bg-border/40" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="font-semibold text-sm">Note minimum</Label>
            <span className="text-sm font-bold text-primary">
              {filters.minRating}+ étoiles
            </span>
          </div>
          <Slider
            min={0}
            max={5}
            step={0.5}
            value={[filters.minRating]}
            onValueChange={(value) => 
              onFilterChange({ ...filters, minRating: value[0] })
            }
            className="w-full"
          />
        </div>
      </div>
    </Card>
  )
}
