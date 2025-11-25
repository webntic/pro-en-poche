import { Card } from '@/components/ui/card'
import { Wrench, PaintBrush, Lightning, Leaf, HardHat, Scissors, Users, Laptop } from '@phosphor-icons/react'

const serviceCategories = [
  {
    icon: Wrench,
    title: 'Plomberie',
    description: 'Installation, réparation de tuyauterie, débouchage',
    color: 'text-blue-600',
  },
  {
    icon: Lightning,
    title: 'Électricité',
    description: 'Installation électrique, dépannage, mise aux normes',
    color: 'text-yellow-600',
  },
  {
    icon: PaintBrush,
    title: 'Peinture',
    description: 'Peinture intérieure et extérieure, décoration',
    color: 'text-purple-600',
  },
  {
    icon: Leaf,
    title: 'Jardinage',
    description: 'Entretien de jardin, aménagement paysager',
    color: 'text-green-600',
  },
  {
    icon: HardHat,
    title: 'Rénovation',
    description: 'Travaux de rénovation, construction',
    color: 'text-orange-600',
  },
  {
    icon: Scissors,
    title: 'Coiffure & Beauté',
    description: 'Services de coiffure et soins esthétiques',
    color: 'text-pink-600',
  },
  {
    icon: Users,
    title: 'Aide à domicile',
    description: 'Ménage, garde d\'enfants, assistance',
    color: 'text-indigo-600',
  },
  {
    icon: Laptop,
    title: 'Services IT',
    description: 'Dépannage informatique, installation réseau',
    color: 'text-cyan-600',
  },
]

export function ServicesSection() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Nos Services</h1>
          <p className="text-xl text-muted-foreground">
            Une large gamme de services professionnels pour tous vos besoins
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {serviceCategories.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="space-y-3">
                  <div className={`${service.color} group-hover:scale-110 transition-transform`}>
                    <Icon size={40} weight="duotone" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <Card className="p-8 bg-muted/50">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold">Vous ne trouvez pas le service recherché ?</h2>
            <p className="text-muted-foreground">
              Notre catalogue s'agrandit constamment. Utilisez notre barre de recherche pour trouver 
              le professionnel qu'il vous faut parmi tous nos prestataires vérifiés.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
