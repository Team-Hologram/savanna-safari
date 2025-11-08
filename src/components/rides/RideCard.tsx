'use client'

import Link from 'next/link'
import { Star, Clock, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Ride } from '@/types/rides'
import mockData from '@/data/mock-data.json'

interface RideCardProps {
  ride: Ride
}

export default function RideCard({ ride }: RideCardProps) {
  const category = mockData.categories.find(c => c.id === ride.categoryId)

  return (
    <div className="bg-white dark:bg-savanna-brown-light rounded-2xl overflow-hidden shadow-float hover:shadow-float-lg transition-all card-hover">
      {/* Image */}
      <div className="relative h-48 bg-savanna-sand dark:bg-savanna-brown">
        <div className="absolute inset-0 bg-gradient-to-br from-savanna-gold/20 to-savanna-olive/20 flex items-center justify-center">
          <span className="text-6xl opacity-50">📷</span>
        </div>
        
        <Badge className="absolute top-3 left-3 bg-savanna-sunset text-white">
          {category?.name}
        </Badge>

        <div className="absolute top-3 right-3 bg-white/95 dark:bg-savanna-brown/95 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1">
          <Star className="w-4 h-4 fill-savanna-gold text-savanna-gold" />
          <span className="text-sm font-semibold">{ride.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-savanna-brown dark:text-savanna-sand line-clamp-1">
          {ride.title}
        </h3>
        
        <p className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70 mb-3 line-clamp-2">
          {ride.description}
        </p>

        <div className="flex items-center gap-4 mb-3 text-xs text-savanna-brown/60 dark:text-savanna-sand/60">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{ride.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>Max {ride.maxGroupSize}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-savanna-gold/20">
          <div>
            <div className="text-xs text-savanna-brown/60 dark:text-savanna-sand/60">From</div>
            <div className="text-xl font-bold text-savanna-sunset">${ride.price}</div>
          </div>
          <Button asChild size="sm" className="bg-savanna-gold hover:bg-savanna-gold-dark text-savanna-brown">
            <Link href={`/rides/${ride.id}`}>Details</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}