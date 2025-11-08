'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Clock, Users, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import mockData from '@/data/mock-data.json'

/**
 * RideCategoriesGrid Component
 * Displays ride cards with hover effects and quick view
 */

export default function RideCategoriesGrid() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {mockData.rides.map((ride) => (
        <motion.div
          key={ride.id}
          className="group relative"
          onHoverStart={() => setHoveredCard(ride.id)}
          onHoverEnd={() => setHoveredCard(null)}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white dark:bg-savanna-brown-light rounded-2xl overflow-hidden shadow-float hover:shadow-float-lg transition-shadow">
            {/* Image */}
            <div className="relative h-56 overflow-hidden bg-savanna-sand dark:bg-savanna-brown">
              <div className="absolute inset-0 bg-gradient-to-br from-savanna-gold/20 to-savanna-olive/20 flex items-center justify-center">
                <span className="text-6xl opacity-50">📷</span>
                <span className="absolute bottom-2 right-2 text-xs text-white/70 bg-black/30 px-2 py-1 rounded">
                  {ride.images[0]}
                </span>
              </div>
              
              {/* Category badge */}
              <Badge className="absolute top-3 left-3 bg-savanna-sunset text-white">
                {mockData.categories.find(c => c.id === ride.categoryId)?.name}
              </Badge>

              {/* Rating badge */}
              <div className="absolute top-3 right-3 bg-white/95 dark:bg-savanna-brown/95 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1">
                <Star className="w-4 h-4 fill-savanna-gold text-savanna-gold" />
                <span className="text-sm font-semibold">{ride.rating}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-savanna-brown dark:text-savanna-sand group-hover:text-savanna-sunset transition-colors">
                {ride.title}
              </h3>
              
              <p className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70 mb-4 line-clamp-2">
                {ride.description}
              </p>

              {/* Meta info */}
              <div className="flex items-center gap-4 mb-4 text-sm text-savanna-brown/60 dark:text-savanna-sand/60">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{ride.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>Max {ride.maxGroupSize}</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mb-4">
                {ride.highlights.slice(0, 3).map((highlight, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {highlight}
                  </Badge>
                ))}
              </div>

              {/* Price and CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-savanna-gold/20">
                <div>
                  <div className="text-sm text-savanna-brown/60 dark:text-savanna-sand/60">From</div>
                  <div className="text-2xl font-bold text-savanna-sunset">
                    ${ride.price}
                  </div>
                </div>
                <Button asChild className="bg-savanna-gold hover:bg-savanna-gold-dark text-savanna-brown">
                  <Link href={`/rides/${ride.id}`}>
                    View Details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* 3D preview indicator (placeholder) */}
          {hoveredCard === ride.id && ride.glb && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-savanna-sunset rounded-full flex items-center justify-center shadow-glow z-10"
            >
              <span className="text-2xl">🚙</span>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  )
}