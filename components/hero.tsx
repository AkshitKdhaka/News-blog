"use client"

import { useState, useEffect, useCallback } from "react"

interface CarouselSlide {
  id: number
  background: string
  alt: string
  title: string
}

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Carousel slide data with improved alt text
  const slides: CarouselSlide[] = [
    {
      id: 1,
      background: "bg-[url('https://picsum.photos/1200/600?random=1')]",
      alt: "Featured blog post about culinary workshops and food experiences",
      title: "Culinary Workshops",
    },
    {
      id: 2,
      background: "bg-[url('https://picsum.photos/1200/600?random=2')]",
      alt: "Educational camps for children featuring hands-on learning activities",
      title: "Educational Camps",
    },
    {
      id: 3,
      background: "bg-[url('https://picsum.photos/1200/600?random=1')]",
      alt: "Projects created by genius kids showcasing innovation and creativity",
      title: "Genius Kids Projects",
    },
  ]

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  return (
    <section
      aria-label="Featured content carousel"
      className="relative h-[30vh] md:h-[40vh] min-h-[320px] md:min-h-[400px] overflow-hidden"
    >
      {/* Carousel slides */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out transform ${
              currentSlide === index
                ? "opacity-100 translate-x-0"
                : index < currentSlide || (currentSlide === 0 && index === slides.length - 1)
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
            } ${slide.background} bg-cover bg-center`}
            aria-hidden={currentSlide !== index}
            role="img"
            aria-label={slide.alt}
          >
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <h2 className="text-4xl font-bold text-white sr-only">{slide.title}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10" role="tablist">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index ? "w-4 bg-blue-500" : "w-2 bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}: ${slide.title}`}
            aria-selected={currentSlide === index}
            role="tab"
          />
        ))}
      </div>
    </section>
  )
}
