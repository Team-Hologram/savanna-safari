'use client'

import { useState } from 'react'
import { MapPin } from 'lucide-react'

/**
 * MapPlaceholder Component
 * Placeholder for Mapbox/Leaflet integration
 * Shows interactive route selection
 */

interface Route {
  id: string
  name: string
  coordinates: number[] // Changed from [number, number] to number[]
  description?: string
  popularTime?: string
}

interface MapPlaceholderProps {
  routes: Route[]
  selectedRoute?: string
  onSelectRoute: (routeId: string) => void
}

export default function MapPlaceholder({ routes, selectedRoute, onSelectRoute }: MapPlaceholderProps) {
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null)

  // Calculate position for pins (simplified layout)
  const getPosition = (index: number) => {
    const positions = [
      { top: '30%', left: '20%' },
      { top: '50%', left: '60%' },
      { top: '70%', left: '35%' },
    ]
    return positions[index] || { top: '50%', left: '50%' }
  }

  const handlePinClick = (routeId: string) => {
    onSelectRoute(routeId)
  }

  const handlePinMouseEnter = (routeId: string) => {
    setHoveredRoute(routeId)
  }

  const handlePinMouseLeave = () => {
    setHoveredRoute(null)
  }

  return (
    <div className="relative w-full h-[300px] bg-gradient-to-br from-savanna-olive/20 to-savanna-stone/20 rounded-xl overflow-hidden border-2 border-savanna-gold/20">
      {/* Map background pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Integration note */}
      <div className="absolute top-2 right-2 px-3 py-1 bg-white/90 dark:bg-savanna-brown/90 rounded-full text-xs font-medium">
        🗺️ Mapbox/Leaflet Ready
      </div>

      {/* Route pins */}
      {routes.map((route, index) => {
        const position = getPosition(index)
        const isSelected = selectedRoute === route.id
        const isHovered = hoveredRoute === route.id

        return (
          <div
            key={route.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={position}
          >
            <button
              onClick={() => handlePinClick(route.id)}
              onMouseEnter={() => handlePinMouseEnter(route.id)}
              onMouseLeave={handlePinMouseLeave}
              className={`relative transition-all ${
                isSelected || isHovered ? 'scale-125' : 'scale-100'
              }`}
              aria-label={`Select ${route.name}`}
              type="button"
            >
              <MapPin
                className={`w-8 h-8 ${
                  isSelected
                    ? 'text-savanna-sunset fill-savanna-sunset/20'
                    : 'text-savanna-brown dark:text-savanna-gold'
                }`}
                strokeWidth={2.5}
              />
              
              {/* Tooltip */}
              {(isSelected || isHovered) && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-3 bg-white dark:bg-savanna-brown shadow-float rounded-lg border border-savanna-gold/20 z-10">
                  <div className="text-sm font-semibold text-savanna-brown dark:text-savanna-sand">
                    {route.name}
                  </div>
                  {route.description && (
                    <div className="text-xs text-savanna-brown/70 dark:text-savanna-sand/70 mt-1">
                      {route.description}
                    </div>
                  )}
                  {route.popularTime && (
                    <div className="text-xs text-savanna-gold mt-1">
                      ⭐ Best: {route.popularTime}
                    </div>
                  )}
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <div className="w-2 h-2 bg-white dark:bg-savanna-brown rotate-45 border-r border-b border-savanna-gold/20" />
                  </div>
                </div>
              )}
            </button>

            {/* Pulse animation for selected */}
            {isSelected && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-savanna-sunset opacity-75" />
              </span>
            )}
          </div>
        )
      })}

      {/* Legend */}
      <div className="absolute bottom-3 left-3 px-3 py-2 bg-white/95 dark:bg-savanna-brown/95 backdrop-blur rounded-lg text-xs">
        <div className="font-semibold mb-1">Starting Points</div>
        <div className="text-savanna-brown/70 dark:text-savanna-sand/70">
          Click pins to select route
        </div>
      </div>
    </div>
  )
}