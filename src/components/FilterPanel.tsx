import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { X } from '@phosphor-icons/react'

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

const categories = [
  'All Services',
  'Home Repair',
  'Cleaning',
  'Tutoring',
  'Personal Training',
  'Photography',
  'Consulting',
  'Design',
  'Writing',
]

const locations = [
  'All Locations',
  'Paris',
  'Lyon',
  'Marseille',
  'Toulouse',
  'Nice',
  'Nantes',
  'Bordeaux',
]

export function FilterPanel({ filters, onFilterChange, onClear }: FilterPanelProps) {
  return (
    <Card className="p-6 h-fit sticky top-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-8 px-2"
        >
          <X size={16} className="mr-1" />
          Clear
        </Button>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select 
            value={filters.category} 
            onValueChange={(value) => onFilterChange({ ...filters, category: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label>Location</Label>
          <Select 
            value={filters.location} 
            onValueChange={(value) => onFilterChange({ ...filters, location: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Price Range</Label>
            <span className="text-sm text-muted-foreground">
              ${filters.priceRange[0]} - ${filters.priceRange[1]}
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

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Minimum Rating</Label>
            <span className="text-sm text-muted-foreground">
              {filters.minRating}+ stars
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
