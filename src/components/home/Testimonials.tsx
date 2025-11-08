'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import mockData from '@/data/mock-data.json'

/**
 * Testimonials Component
 * Auto-playing carousel with pause on hover
 */

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const reviews = mockData.reviews

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying, reviews.length])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const currentReview = reviews[currentIndex]

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
          What Our Travelers Say
        </h2>
        <p className="text-lg text-savanna-brown/70 dark:text-savanna-sand/70">
          Real experiences from real adventurers
        </p>
      </div>

      <div 
        className="relative"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-savanna-brown-light rounded-3xl shadow-float-lg p-8 md:p-12"
          >
            <Quote className="w-12 h-12 text-savanna-gold mb-6" />
            
            <div className="flex gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < currentReview.rating
                      ? 'fill-savanna-gold text-savanna-gold'
                      : 'text-savanna-gold/30'
                  }`}
                />
              ))}
            </div>

            <p className="text-xl md:text-2xl text-savanna-brown dark:text-savanna-sand mb-8 leading-relaxed">
              &quot;{currentReview.content}&quot;
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-savanna-gold to-savanna-sunset flex items-center justify-center text-white font-bold text-lg">
                {currentReview.author.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-savanna-brown dark:text-savanna-sand">
                  {currentReview.author}
                </div>
                <div className="text-sm text-savanna-brown/60 dark:text-savanna-sand/60">
                  {new Date(currentReview.date).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrev}
            className="rounded-full"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div className="flex gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-savanna-sunset w-8'
                    : 'bg-savanna-gold/30 hover:bg-savanna-gold/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="rounded-full"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}