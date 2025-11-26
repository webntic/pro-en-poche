import { Card } from '@/components/ui/card'
import { Users, Briefcase, Star, MapPin, Image } from '@phosphor-icons/react'
import { InlineEditor } from '@/components/InlineEditor'

interface StatsSectionProps {
  content?: {
    title: string
    subtitle: string
    providers: { label: string; value: string }
    clients: { label: string; value: string }
    bookings: { label: string; value: string }
    satisfaction: { label: string; value: string }
    image?: string
  }
  onUpdateContent?: (path: string[], value: string) => void
  editMode?: boolean
}

export function StatsSection({ content, onUpdateContent, editMode }: StatsSectionProps) {
  const stats = [
    {
      icon: Users,
      value: content?.clients.value || '10,000+',
      label: content?.clients.label || 'Clients satisfaits',
      description: 'Des milliers de clients font confiance à nos services',
      key: 'clients',
    },
    {
      icon: Briefcase,
      value: content?.providers.value || '500+',
      label: content?.providers.label || 'Professionnels vérifiés',
      description: 'Une équipe de prestataires qualifiés et certifiés',
      key: 'providers',
    },
    {
      icon: Star,
      value: content?.satisfaction.value || '4.8/5',
      label: content?.satisfaction.label || 'Note moyenne',
      description: 'Basée sur plus de 15,000 avis clients',
      key: 'satisfaction',
    },
    {
      icon: MapPin,
      value: content?.bookings.value || '50+',
      label: content?.bookings.label || 'Villes desservies',
      description: 'Partout au Québec et au Canada',
      key: 'bookings',
    },
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && onUpdateContent) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onUpdateContent(['stats', 'image'], reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpdateStat = (key: string, field: 'label' | 'value', value: string) => {
    if (!onUpdateContent || !content) return
    const statData = content[key as keyof typeof content]
    if (typeof statData === 'object' && statData !== null && 'label' in statData && 'value' in statData) {
      const updatedStat = { ...statData, [field]: value }
      onUpdateContent(['stats', key], JSON.stringify(updatedStat))
    }
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight premium-text-gradient">
                <InlineEditor
                  value={content?.title || 'ProEnPoche en chiffres'}
                  onSave={(value) => onUpdateContent?.(['stats', 'title'], value)}
                  className="text-4xl md:text-5xl font-bold tracking-tight premium-text-gradient"
                  editMode={editMode}
                />
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                <InlineEditor
                  value={content?.subtitle || 'Une plateforme qui connecte des milliers de clients avec les meilleurs professionnels.'}
                  onSave={(value) => onUpdateContent?.(['stats', 'subtitle'], value)}
                  className="text-xl text-muted-foreground"
                  editMode={editMode}
                  multiline
                />
              </p>
            </div>
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src={content?.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80'}
                alt="Équipe collaborative de professionnels"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              {editMode && onUpdateContent && (
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="flex items-center gap-2 text-white px-4 py-2 bg-primary rounded-lg hover:bg-primary/90">
                      <Image size={20} weight="duotone" />
                      <span className="text-sm font-medium">Changer l'image</span>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card
                  key={index}
                  className="premium-card p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 group"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-2xl premium-gradient flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Icon size={32} className="text-primary-foreground" weight="duotone" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-2 premium-text-gradient">
                    <InlineEditor
                      value={stat.value}
                      onSave={(value) => handleUpdateStat(stat.key, 'value', value)}
                      className="text-4xl font-bold premium-text-gradient"
                      editMode={editMode}
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    <InlineEditor
                      value={stat.label}
                      onSave={(value) => handleUpdateStat(stat.key, 'label', value)}
                      className="font-semibold text-lg text-foreground"
                      editMode={editMode}
                    />
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {stat.description}
                  </p>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
