import { useState, useEffect } from 'react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

const SLIDES = [
  {
    id: 1,
    title: 'Trouvez des Professionnels Qualifiés',
    description: 'Connectez-vous avec des experts vérifiés partout au Canada',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=400&fit=crop',
    alt: 'Professionnel au travail',
  },
  {
    id: 2,
    title: 'Services de Qualité à Votre Porte',
    description: 'Des prestataires expérimentés pour tous vos besoins',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=400&fit=crop',
    alt: 'Équipe de professionnels',
  },
  {
    id: 3,
    title: 'Réservation Simple et Sécurisée',
    description: 'Paiement sécurisé et satisfaction garantie',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=400&fit=crop',
    alt: 'Artisan professionnel',
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
  }

  return (
    <div className="relative overflow-hidden w-full">
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30">
              <div className="container mx-auto px-4 h-full flex flex-col justify-center">
                <div className="max-w-2xl text-white">
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                    {slide.title}
                  </h2>
                  <p className="text-xl md:text-2xl lg:text-3xl opacity-90">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm h-12 w-12"
        >
          <CaretLeft size={24} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm h-12 w-12"
        >
          <CaretRight size={24} />
        </Button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'w-8 bg-white' 
                  : 'w-2 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Aller à la diapositive ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
