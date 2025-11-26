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
      <div className="relative h-[450px] md:h-[550px] lg:h-[650px]">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent">
              <div className="container mx-auto px-6 h-full flex flex-col justify-center">
                <div className="max-w-3xl text-white space-y-8 animate-fadeIn">
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-2xl tracking-tight">
                    {slide.title}
                  </h2>
                  <p className="text-xl md:text-2xl lg:text-3xl opacity-95 drop-shadow-lg leading-relaxed">
                    {slide.description}
                  </p>
                  <Button 
                    size="lg" 
                    className="premium-gradient shadow-2xl hover:shadow-primary/50 text-lg px-10 py-7 mt-6 font-semibold transition-all duration-300"
                  >
                    Découvrir les Professionnels
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrevious}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 text-white backdrop-blur-lg h-16 w-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
        >
          <CaretLeft size={32} weight="bold" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={goToNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 text-white backdrop-blur-lg h-16 w-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
        >
          <CaretRight size={32} weight="bold" />
        </Button>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 bg-black/25 backdrop-blur-lg px-5 py-3.5 rounded-full shadow-2xl">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-12 bg-white shadow-lg' 
                  : 'w-3 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Aller à la diapositive ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
