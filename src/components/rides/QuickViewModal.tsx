'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Ride } from '@/types/rides'

interface QuickViewModalProps {
  ride: Ride | null
  isOpen: boolean
  onClose: () => void
  onBook: (rideId: string) => void
}

export default function QuickViewModal({ ride, isOpen, onClose, onBook }: QuickViewModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!ride) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % ride.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + ride.images.length) % ride.images.length)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] bg-white dark:bg-savanna-brown rounded-2xl shadow-float-lg z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-savanna-gold/20">
              <div className="flex-1">
                <Badge className="mb-2 bg-savanna-sunset text-white">
                  {ride.categoryId}
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-savanna-brown dark:text-savanna-sand">
                  {ride.title}
                </h2>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-savanna-gold text-savanna-gold" />
                    <span className="font-semibold">{ride.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{ride.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>Max {ride.maxGroupSize}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Image Gallery */}
                <div>
                  <div className="relative aspect-video bg-savanna-sand dark:bg-savanna-brown rounded-xl overflow-hidden mb-3">
                    <div className="absolute inset-0 bg-gradient-to-br from-savanna-gold/20 to-savanna-olive/20 flex items-center justify-center">
                      <span className="text-6xl opacity-50">📷</span>
                    </div>
                    
                    {ride.images.length > 1 && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-savanna-brown/90"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-savanna-brown/90"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      </>
                    )}
                  </div>
                  
                  {/* Thumbnails */}
                  <div className="flex gap-2">
                    {ride.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-1 aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex
                            ? 'border-savanna-sunset'
                            : 'border-transparent'
                        }`}
                      >
                        <div className="w-full h-full bg-savanna-sand/50 dark:bg-savanna-brown-light/50 flex items-center justify-center">
                          <span className="text-2xl opacity-50">📷</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70">
                      {ride.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Highlights</h3>
                    <div className="flex flex-wrap gap-2">
                      {ride.highlights.map((highlight, index) => (
                        <Badge key={index} variant="secondary">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {ride.speciesLikelihood && (
                    <div>
                      <h3 className="font-semibold mb-2">Wildlife</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {ride.speciesLikelihood.slice(0, 4).map((species) => (
                          <div
                            key={species.name}
                            className="flex items-center gap-2 p-2 bg-savanna-olive/10 rounded-lg"
                          >
                            <span className="text-2xl">{species.icon}</span>
                            <div className="flex-1">
                              <div className="text-xs font-medium">{species.name}</div>
                              <div className="text-xs text-savanna-brown/60 dark:text-savanna-sand/60">
                                {species.probability}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-savanna-gold/20">
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <div className="text-sm text-savanna-brown/60 dark:text-savanna-sand/60">
                          From
                        </div>
                        <div className="text-3xl font-bold text-savanna-sunset">
                          ${ride.price}
                        </div>
                      </div>
                      <div className="text-right text-xs text-savanna-brown/60 dark:text-savanna-sand/60">
                        per person
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => onBook(ride.id)}
                      className="w-full bg-savanna-sunset hover:bg-savanna-sunset-dark text-white"
                    >
                      Book This Experience
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}