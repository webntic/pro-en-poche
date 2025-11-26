import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

const serviceCategories = [
  {
    title: 'Assemblage de meubles',
    description: 'Faites assembler vos meubles sans prise de tête. Qu\'il s\'agisse d\'un lit, d\'une armoire ou d\'un bureau, nos professionnels s\'occupent de tout.',
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&q=80',
    gradient: 'from-blue-500/10 to-blue-600/5',
  },
  {
    title: 'Entretien d\'appartement',
    description: 'Gardez votre logement propre et agréable grâce à nos services de ménage régulier ou ponctuel.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
    gradient: 'from-purple-500/10 to-purple-600/5',
  },
  {
    title: 'Déménagement',
    description: 'Déménagez l\'esprit léger grâce à l\'aide de professionnels fiables, disponibles pour transporter vos meubles.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
    gradient: 'from-orange-500/10 to-orange-600/5',
  },
  {
    title: 'Travaux de plomberie',
    description: 'Fuites, tuyaux bouchés ou robinet à changer ? Nos plombiers se déplacent rapidement pour gérer tous les travaux.',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&q=80',
    gradient: 'from-cyan-500/10 to-cyan-600/5',
  },
  {
    title: 'Déneigement',
    description: 'L\'hiver venu, libérez vos accès sans effort. Nos professionnels s\'occupent du déneigement de entrées, trottoirs et allées.',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80',
    gradient: 'from-sky-500/10 to-sky-600/5',
  },
  {
    title: 'Jardinage',
    description: 'Prenez soin de vos espaces extérieurs sans lever le petit doigt. Nos jardiniers entretiennent votre pelouse, vos haies et vos plates-bandes.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
    gradient: 'from-green-500/10 to-green-600/5',
  },
  {
    title: 'Toiture',
    description: 'Inspection, réparation et entretien de toiture pour préserver votre maison. Que ce soit pour une fuite, des bardeaux endommagés ou une révision complète.',
    image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=600&q=80',
    gradient: 'from-red-500/10 to-red-600/5',
  },
  {
    title: 'Réparations diverses',
    description: 'Besoin de réparer un tiroir, une poignée ou une étagère bancale ? Nos bricoleurs sont là pour tous les petits travaux du quotidien.',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&q=80',
    gradient: 'from-amber-500/10 to-amber-600/5',
  },
  {
    title: 'Électricité',
    description: 'Installation ou dépannage électrique en toute sécurité. Nos électriciens interviennent pour remplacer des prises ou vérifier votre installation.',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80',
    gradient: 'from-yellow-500/10 to-yellow-600/5',
  },
  {
    title: 'Tutorat',
    description: 'Cours particuliers et soutien scolaire personnalisé pour tous les niveaux et matières. Nos tuteurs qualifiés aident vos enfants à réussir.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80',
    gradient: 'from-indigo-500/10 to-indigo-600/5',
  },
  {
    title: 'Aide à domicile',
    description: 'Assistance personnalisée pour les personnes âgées ou à mobilité réduite. Accompagnement dans les tâches quotidiennes avec bienveillance.',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&q=80',
    gradient: 'from-pink-500/10 to-pink-600/5',
  },
  {
    title: 'Autres services',
    description: 'Besoin d\'un service spécifique ? Explorez notre catalogue complet de professionnels qualifiés pour tous types de prestations.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80',
    gradient: 'from-violet-500/10 to-violet-600/5',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ServicesSection() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Nos Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une large gamme de services professionnels pour faciliter votre quotidien. Des experts qualifiés à votre service.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {serviceCategories.map((service, index) => (
              <motion.div key={index} variants={item}>
                <Card className="group overflow-hidden h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0">
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} z-10`} />
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="p-6 space-y-3">
                    <h3 className="font-semibold text-xl group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    <Button
                      variant="ghost"
                      className="group/btn p-0 h-auto font-medium text-primary hover:text-primary/80 hover:bg-transparent"
                    >
                      En savoir plus
                      <ArrowRight
                        size={16}
                        className="ml-1 group-hover/btn:translate-x-1 transition-transform"
                      />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card className="p-10 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <div className="text-center space-y-6">
                <h2 className="text-3xl font-semibold">Vous ne trouvez pas le service recherché ?</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Notre catalogue s'agrandit constamment. Utilisez notre barre de recherche pour trouver 
                  le professionnel qu'il vous faut parmi tous nos prestataires vérifiés.
                </p>
                <Button size="lg" className="mt-4">
                  Parcourir tous les prestataires
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
