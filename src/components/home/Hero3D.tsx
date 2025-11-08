'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause,
  Star,
  Clock,
  Users,
  TrendingUp,
  Award,
  MapPin
} from 'lucide-react'

/**
 * Ultra-Modern 3D Carousel Hero with Wildlife Images
 * - Real safari/wildlife imagery
 * - Perspective 3D carousel effect
 * - Swipe gesture support
 * - Auto-play with smooth transitions
 */

interface SafariSlide {
  id: number
  image: string
}

const slides: SafariSlide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1477949775154-d739b82400b3?w=1200&q=80',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=1200&q=80',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1532012309514-750e6faec832?w=1200&q=80',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1637162918718-bb754dc9ab01?w=1200&q=80',
  },
]

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [direction, setDirection] = useState(0)
  const [imageLoaded, setImageLoaded] = useState<{ [key: number]: boolean }>({})
  
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-play
  useEffect(() => {
    if (!isPlaying) return
    
    const interval = setInterval(() => {
      nextSlide()
    }, 4000)

    return () => clearInterval(interval)
  }, [isPlaying, currentIndex])

  // GSAP animations for stats
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.from('.stat-item', {
      scale: 0.5,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.7)',
    })
  }, [currentIndex])

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50
    if (info.offset.x > swipeThreshold) {
      prevSlide()
    } else if (info.offset.x < -swipeThreshold) {
      nextSlide()
    }
  }

  // Calculate visible slides for 3D effect
  const getVisibleSlides = () => {
    const result = []
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + slides.length) % slides.length
      result.push({ ...slides[index], offset: i })
    }
    return result
  }

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-savanna-sand via-savanna-gold/10 to-white dark:from-savanna-brown dark:via-savanna-brown-light dark:to-savanna-brown">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-savanna-sunset/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse" />
        <div className="absolute w-96 h-96 bg-savanna-olive/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute w-64 h-64 bg-savanna-gold/10 rounded-full blur-3xl top-1/2 left-1/2 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        
        {/* Main Carousel */}
        <div ref={containerRef} className="relative max-w-7xl mx-auto w-full">
          {/* 3D Carousel Container */}
          <div className="relative h-[600px] flex items-center justify-center perspective-1000">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              {getVisibleSlides().map((slide) => {
                const isCenter = slide.offset === 0
                const zIndex = 5 - Math.abs(slide.offset)
                
                return (
                  <motion.div
                    key={slide.id}
                    custom={slide.offset}
                    initial={{
                      x: slide.offset * 400,
                      scale: 1 - Math.abs(slide.offset) * 0.2,
                      opacity: Math.abs(slide.offset) > 2 ? 0 : 1 - Math.abs(slide.offset) * 0.3,
                      rotateY: slide.offset * -25,
                      z: -Math.abs(slide.offset) * 200,
                    }}
                    animate={{
                      x: slide.offset * 400,
                      scale: 1 - Math.abs(slide.offset) * 0.2,
                      opacity: Math.abs(slide.offset) > 2 ? 0 : 1 - Math.abs(slide.offset) * 0.3,
                      rotateY: slide.offset * -25,
                      z: -Math.abs(slide.offset) * 200,
                    }}
                    exit={{
                      x: direction > 0 ? -400 : 400,
                      opacity: 0,
                      scale: 0.5,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                    }}
                    drag={isCenter ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={isCenter ? handleDragEnd : undefined}
                    className={`absolute w-full max-w-2xl ${!isCenter && 'pointer-events-none'}`}
                    style={{
                      zIndex,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <div className={`relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-300 ${
                      isCenter ? 'shadow-savanna-sunset/50 ring-4 ring-savanna-sunset/20' : ''
                    }`}>
                      {/* Safari Image Background */}
                      <div className="relative h-[500px]">
                        <Image
                          src={slide.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 800px"
                          priority={Math.abs(slide.offset) <= 1}
                          onLoad={() => setImageLoaded(prev => ({ ...prev, [slide.id]: true }))}
                        />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-savanna-sand dark:from-savanna-brown to-transparent pointer-events-none" />
    </div>
  )
}