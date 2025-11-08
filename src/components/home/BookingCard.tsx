'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle2, 
  Share2,
  Save,
  ChevronRight,
  ChevronLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import TimelineSelector from '@/components/shared/TimelineSelector'
import MapPlaceholder from '@/components/shared/MapPlaceholder'
import PriceDisplay from '@/components/shared/PriceDisplay'
import { useBookingStore } from '@/store/booking-store'
import { BookingStep } from '@/types/booking'
import mockData from '@/data/mock-data.json'
import { Sunrise, Moon, Camera, Users as UsersIcon } from 'lucide-react'

/**
 * BookingCard Component
 * Innovative multi-step booking interface in a single floating card
 * - Smooth step transitions with progress indicator
 * - Timeline-based date/time selection (not traditional calendar)
 * - Availability heatmap
 * - Animated price updates
 * - Save/Share functionality
 * - Accessibility: keyboard navigation, ARIA live regions
 */

const steps: { id: BookingStep; label: string; icon: any }[] = [
  { id: 'category', label: 'Experience', icon: MapPin },
  { id: 'route', label: 'Route', icon: MapPin },
  { id: 'datetime', label: 'When', icon: Calendar },
  { id: 'party', label: 'Party', icon: Users },
  { id: 'summary', label: 'Confirm', icon: CheckCircle2 },
]

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'sunrise': Sunrise,
  'night': Moon,
  'private': Camera,
  'family': UsersIcon,
}

export default function BookingCard() {
  const { 
    currentStep, 
    completedSteps,
    setStep,
    selectedCategory,
    selectCategory,
    selectRide,
    selectedRide,
    adults,
    children,
    setPartySize,
    addons,
    toggleAddon,
    totalPrice,
  } = useBookingStore()

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const priceRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentStepIndex(steps.findIndex(s => s.id === currentStep))
  }, [currentStep])

  // Animate price changes with GSAP
  useEffect(() => {
    if (!priceRef.current) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo(
      priceRef.current,
      { scale: 1.1, color: '#FF6B35' },
      { scale: 1, color: 'inherit', duration: 0.4, ease: 'back.out(2)' }
    )
  }, [totalPrice])

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setStep(steps[currentStepIndex + 1].id)
    }
  }

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setStep(steps[currentStepIndex - 1].id)
    }
  }

  const handleSavePlan = () => {
    const snapshot = useBookingStore.getState().createSnapshot()
    navigator.clipboard.writeText(JSON.stringify(snapshot, null, 2))
    alert('Booking plan copied to clipboard!')
  }

  const handleShare = async () => {
    const snapshot = useBookingStore.getState().createSnapshot()
    const shareData = {
      title: 'My Safari Plan - Savanna Safari',
      text: 'Check out my safari booking!',
      url: `${window.location.origin}/booking/${snapshot.id}`,
    }
    
    if (navigator.share) {
      await navigator.share(shareData)
    } else {
      navigator.clipboard.writeText(shareData.url)
      alert('Share link copied to clipboard!')
    }
  }

  return (
    <Card 
      ref={cardRef}
      className="relative overflow-hidden bg-white/95 dark:bg-savanna-brown/95 backdrop-blur-xl shadow-float-lg rounded-3xl border-2 border-savanna-gold/30"
    >
      {/* Progress bar */}
      <div className="h-2 bg-savanna-sand dark:bg-savanna-brown-light">
        <motion.div 
          className="h-full bg-gradient-to-r from-savanna-gold to-savanna-sunset"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Header with steps */}
      <div className="p-6 border-b border-savanna-gold/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-savanna-brown dark:text-savanna-sand">
            Book Your Safari
          </h2>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleSavePlan}
              aria-label="Save plan"
            >
              <Save className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleShare}
              aria-label="Share plan"
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-between gap-2">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = index === currentStepIndex
            const isCompleted = completedSteps.includes(step.id)
            
            return (
              <button
                key={step.id}
                onClick={() => setStep(step.id)}
                className={`flex-1 flex flex-col items-center gap-2 p-2 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-savanna-gold/20' 
                    : isCompleted 
                    ? 'bg-savanna-olive/10' 
                    : 'opacity-50 hover:opacity-75'
                }`}
                aria-current={isActive ? 'step' : undefined}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isCompleted 
                    ? 'bg-savanna-olive text-white' 
                    : isActive 
                    ? 'bg-savanna-sunset text-white' 
                    : 'bg-savanna-sand dark:bg-savanna-brown-light'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium hidden sm:block">{step.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="p-6 min-h-[400px]" role="region" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 'category' && <CategoryStep />}
            {currentStep === 'route' && <RouteStep />}
            {currentStep === 'datetime' && <DateTimeStep />}
            {currentStep === 'party' && <PartyStep />}
            {currentStep === 'summary' && <SummaryStep />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer with navigation and price */}
      <div className="p-6 border-t border-savanna-gold/20 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStepIndex === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          {currentStepIndex < steps.length - 1 ? (
            <Button onClick={nextStep} className="bg-savanna-sunset hover:bg-savanna-sunset-dark">
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button className="bg-savanna-olive hover:bg-savanna-olive-dark">
              Complete Booking
            </Button>
          )}
        </div>

        <div ref={priceRef} className="text-right">
          <div className="text-sm text-savanna-brown/60 dark:text-savanna-sand/60">Total</div>
          <div className="text-3xl font-bold text-savanna-sunset">
            ${totalPrice}
          </div>
        </div>
      </div>
    </Card>
  )
}

function CategoryStep() {
  const { selectCategory, selectedCategory } = useBookingStore()
  
  const handleCategorySelect = (categoryId: string) => {
    selectCategory(categoryId)
    // Could also automatically move to next step
    // useBookingStore.getState().setStep('route')
  }
  
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Choose Your Experience</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mockData.categories.map((category) => {
          const IconComponent = categoryIcons[category.id] || Sunrise
          
          return (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`p-6 rounded-xl border-2 transition-all text-left hover:shadow-lg ${
                selectedCategory === category.id
                  ? 'border-savanna-sunset bg-savanna-sunset/10'
                  : 'border-savanna-gold/20 hover:border-savanna-gold'
              }`}
              type="button"
            >
              <div className="mb-3">
                <IconComponent className="w-8 h-8 text-savanna-gold" />
              </div>
              <h4 className="font-semibold text-lg mb-2">{category.name}</h4>
              <p className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70">
                {category.description}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function RouteStep() {
  const { startingPoint, selectStartingPoint } = useBookingStore()
  
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Select Starting Point</h3>
      <div className="mb-6">
        <MapPlaceholder 
          routes={mockData.routes}
          selectedRoute={startingPoint?.id}
          onSelectRoute={(routeId) => {
            const route = mockData.routes.find(r => r.id === routeId)
            if (route) selectStartingPoint(route)
          }}
        />
      </div>
      <div className="grid gap-3">
        {mockData.routes.map((route) => (
          <button
            key={route.id}
            onClick={() => selectStartingPoint(route)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              startingPoint?.id === route.id
                ? 'border-savanna-sunset bg-savanna-sunset/10'
                : 'border-savanna-gold/20 hover:border-savanna-gold'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold">{route.name}</h4>
                <p className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70 mt-1">
                  {route.description}
                </p>
              </div>
              <Badge variant="secondary" className="ml-2">
                <Clock className="w-3 h-3 mr-1" />
                {route.popularTime}
              </Badge>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function DateTimeStep() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">When Would You Like to Go?</h3>
      <TimelineSelector />
    </div>
  )
}

function PartyStep() {
  const { adults, children, setPartySize, addons, toggleAddon } = useBookingStore()
  
  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Party Size & Add-ons</h3>
      
      {/* Party size */}
      <div className="mb-8">
        <h4 className="font-medium mb-4">Travelers</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-savanna-sand dark:bg-savanna-brown-light rounded-lg">
            <label className="text-sm font-medium mb-2 block">Adults</label>
            <div className="flex items-center gap-3">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setPartySize(Math.max(1, adults - 1), children)}
              >
                -
              </Button>
              <span className="text-xl font-semibold w-8 text-center">{adults}</span>
              <Button 
                size="sm"
                variant="outline"
                onClick={() => setPartySize(adults + 1, children)}
              >
                +
              </Button>
            </div>
          </div>
          
          <div className="p-4 bg-savanna-sand dark:bg-savanna-brown-light rounded-lg">
            <label className="text-sm font-medium mb-2 block">Children</label>
            <div className="flex items-center gap-3">
              <Button 
                size="sm"
                variant="outline"
                onClick={() => setPartySize(adults, Math.max(0, children - 1))}
              >
                -
              </Button>
              <span className="text-xl font-semibold w-8 text-center">{children}</span>
              <Button 
                size="sm"
                variant="outline"
                onClick={() => setPartySize(adults, children + 1)}
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Add-ons */}
      <div>
        <h4 className="font-medium mb-4">Enhance Your Experience</h4>
        <div className="grid gap-3">
          {mockData.addons.map((addon) => (
            <button
              key={addon.id}
              onClick={() => toggleAddon(addon.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                addons.includes(addon.id)
                  ? 'border-savanna-sunset bg-savanna-sunset/10'
                  : 'border-savanna-gold/20 hover:border-savanna-gold'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <span className="text-2xl">{addon.icon}</span>
                  <div>
                    <h5 className="font-semibold">{addon.name}</h5>
                    <p className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70">
                      {addon.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">+${addon.price}</div>
                  {addons.includes(addon.id) && (
                    <CheckCircle2 className="w-5 h-5 text-savanna-olive ml-auto mt-1" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function SummaryStep() {
  const booking = useBookingStore()
  const selectedRideData = mockData.rides.find(r => r.id === booking.selectedRide)
  
  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Booking Summary</h3>
      
      <div className="space-y-6">
        {/* Experience */}
        <div className="p-4 bg-savanna-sand dark:bg-savanna-brown-light rounded-lg">
          <h4 className="font-medium text-sm text-savanna-brown/60 dark:text-savanna-sand/60 mb-2">
            Experience
          </h4>
          <p className="font-semibold">{selectedRideData?.title || 'Not selected'}</p>
        </div>

        {/* Date & Time */}
        <div className="p-4 bg-savanna-sand dark:bg-savanna-brown-light rounded-lg">
          <h4 className="font-medium text-sm text-savanna-brown/60 dark:text-savanna-sand/60 mb-2">
            Date & Time
          </h4>
          <p className="font-semibold">
            {booking.selectedDate || 'Not selected'} at {booking.selectedTime || 'Not selected'}
          </p>
        </div>

        {/* Party */}
        <div className="p-4 bg-savanna-sand dark:bg-savanna-brown-light rounded-lg">
          <h4 className="font-medium text-sm text-savanna-brown/60 dark:text-savanna-sand/60 mb-2">
            Party
          </h4>
          <p className="font-semibold">
            {booking.adults} Adults, {booking.children} Children
          </p>
        </div>

        {/* Add-ons */}
        {booking.addons.length > 0 && (
          <div className="p-4 bg-savanna-sand dark:bg-savanna-brown-light rounded-lg">
            <h4 className="font-medium text-sm text-savanna-brown/60 dark:text-savanna-sand/60 mb-2">
              Add-ons
            </h4>
            <ul className="space-y-1">
              {booking.addons.map(addonId => {
                const addon = mockData.addons.find(a => a.id === addonId)
                return (
                  <li key={addonId} className="flex justify-between">
                    <span>{addon?.name}</span>
                    <span className="font-semibold">${addon?.price}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {/* Price Breakdown */}
        <PriceDisplay />

        {/* Species Likelihood (if available) */}
        {selectedRideData?.speciesLikelihood && (
          <div className="p-4 bg-savanna-olive/10 rounded-lg border border-savanna-olive/30">
            <h4 className="font-medium mb-3">Likely to See</h4>
            <div className="grid grid-cols-2 gap-3">
              {selectedRideData.speciesLikelihood.map((species) => (
                <div key={species.name} className="flex items-center gap-2">
                  <span className="text-2xl">{species.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{species.name}</div>
                    <div className="text-xs text-savanna-brown/60 dark:text-savanna-sand/60">
                      {species.probability}% chance
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}