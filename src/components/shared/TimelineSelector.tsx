'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Sun, Moon, Sunrise, Sunset } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBookingStore } from '@/store/booking-store'
import mockData from '@/data/mock-data.json'
import { format, addDays } from 'date-fns'

/**
 * TimelineSelector Component
 * Innovative timeline-based date/time picker with availability heatmap
 */

// Generate time slots based on category
const generateTimeSlots = (categoryId?: string) => {
  const morningSlots = [
    { time: '05:00', available: 8 },
    { time: '05:30', available: 6 },
    { time: '06:00', available: 4 },
    { time: '06:30', available: 7 },
  ]
  
  const daySlots = [
    { time: '08:00', available: 6 },
    { time: '09:00', available: 8 },
    { time: '10:00', available: 5 },
    { time: '11:00', available: 3 },
    { time: '14:00', available: 6 },
    { time: '15:00', available: 7 },
  ]
  
  const eveningSlots = [
    { time: '17:00', available: 5 },
    { time: '18:00', available: 8 },
    { time: '19:00', available: 6 },
    { time: '20:00', available: 4 },
  ]

  // Return different slots based on category
  if (categoryId === 'sunrise') {
    return morningSlots
  } else if (categoryId === 'night') {
    return eveningSlots
  } else if (categoryId === 'private' || categoryId === 'family') {
    return [...morningSlots, ...daySlots]
  }
  
  // Default: all slots
  return [...morningSlots, ...daySlots, ...eveningSlots]
}

export default function TimelineSelector() {
  const [selectedDateIndex, setSelectedDateIndex] = useState(0)
  const { setDateTime, selectedDate, selectedTime, selectedRide, selectedCategory } = useBookingStore()
  
  // Generate next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i))
  
  // Get the selected ride to show its availability
  const ride = mockData.rides.find(r => r.id === selectedRide)
  
  // Get availability for date - use generated slots
  const getAvailabilityForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    
    // First check if we have real data
    const rideAvailability = ride?.availability.find(a => a.date === dateStr)
    if (rideAvailability?.slots && rideAvailability.slots.length > 0) {
      return rideAvailability.slots
    }
    
    // Otherwise generate slots based on category
    const category = mockData.categories.find(c => c.id === selectedCategory)
    return generateTimeSlots(category?.id)
  }

  const currentDate = dates[selectedDateIndex]
  const timeSlots = getAvailabilityForDate(currentDate)

  const getTimeIcon = (time: string) => {
    const hour = parseInt(time.split(':')[0])
    if (hour < 6) return Moon
    if (hour < 12) return Sunrise
    if (hour < 18) return Sun
    return Sunset
  }

  const getAvailabilityColor = (available: number) => {
    if (available === 0) return 'bg-gray-300 dark:bg-gray-600'
    if (available < 3) return 'bg-savanna-sunset/50'
    if (available < 6) return 'bg-savanna-gold/50'
    return 'bg-savanna-olive/50'
  }

  const handleSelectTime = (time: string) => {
    const dateStr = format(currentDate, 'yyyy-MM-dd')
    setDateTime(dateStr, time)
  }

  const handleDateChange = (index: number) => {
    setSelectedDateIndex(index)
    // Clear selected time when date changes
    const dateStr = format(dates[index], 'yyyy-MM-dd')
    // Only clear time if the current selected date is different
    if (selectedDate !== dateStr) {
      setDateTime(dateStr, '')
    }
  }

  // Update selected date index when navigating
  useEffect(() => {
    if (selectedDate) {
      const index = dates.findIndex(d => format(d, 'yyyy-MM-dd') === selectedDate)
      if (index !== -1 && index !== selectedDateIndex) {
        setSelectedDateIndex(index)
      }
    }
  }, [selectedDate])

  // If no ride is selected, show message
  if (!selectedRide) {
    return (
      <div className="text-center py-8">
        <p className="text-savanna-brown/60 dark:text-savanna-sand/60">
          Please select an experience first
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Date Timeline */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Select Date</h4>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDateChange(Math.max(0, selectedDateIndex - 1))}
              disabled={selectedDateIndex === 0}
              aria-label="Previous dates"
              type="button"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDateChange(Math.min(dates.length - 1, selectedDateIndex + 1))}
              disabled={selectedDateIndex === dates.length - 1}
              aria-label="Next dates"
              type="button"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Date cards with availability preview */}
        <div className="relative overflow-x-auto">
          <div className="flex gap-3 pb-2">
            {dates.slice(Math.max(0, selectedDateIndex - 2), selectedDateIndex + 3).map((date, index) => {
              const actualIndex = Math.max(0, selectedDateIndex - 2) + index
              const slots = getAvailabilityForDate(date)
              const totalAvailable = slots.reduce((sum, slot) => sum + slot.available, 0)
              const isSelected = actualIndex === selectedDateIndex

              return (
                <button
                  key={date.toISOString()}
                  onClick={() => handleDateChange(actualIndex)}
                  type="button"
                  className={`flex-shrink-0 w-24 p-3 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-savanna-sunset bg-savanna-sunset/10 scale-105'
                      : 'border-savanna-gold/20 hover:border-savanna-gold'
                  }`}
                >
                  <div className="text-xs text-savanna-brown/60 dark:text-savanna-sand/60 mb-1">
                    {format(date, 'EEE')}
                  </div>
                  <div className="text-2xl font-bold mb-2">
                    {format(date, 'd')}
                  </div>
                  <div className="text-xs font-medium">
                    {format(date, 'MMM')}
                  </div>
                  {/* Availability indicator */}
                  <div className="mt-2 flex gap-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded ${
                          i < Math.min(3, Math.ceil(totalAvailable / 3))
                            ? 'bg-savanna-olive'
                            : 'bg-gray-200 dark:bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Selected Date Display */}
      <div className="bg-savanna-gold/10 rounded-lg p-3 border border-savanna-gold/30">
        <div className="text-sm font-medium text-savanna-brown dark:text-savanna-sand">
          Selected: {format(currentDate, 'EEEE, MMMM d, yyyy')}
        </div>
      </div>

      {/* Time Slots */}
      <div>
        <h4 className="font-medium mb-4">
          Available Times ({timeSlots.length} slots)
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {timeSlots.length > 0 ? (
            timeSlots.map((slot) => {
              const TimeIcon = getTimeIcon(slot.time)
              const isSelected = selectedTime === slot.time
              const isAvailable = slot.available > 0

              return (
                <button
                  key={slot.time}
                  onClick={() => isAvailable && handleSelectTime(slot.time)}
                  disabled={!isAvailable}
                  type="button"
                  className={`p-4 rounded-lg border-2 transition-all ${
                    !isAvailable
                      ? 'opacity-50 cursor-not-allowed border-gray-300 dark:border-gray-600'
                      : isSelected
                      ? 'border-savanna-sunset bg-savanna-sunset/10 ring-2 ring-savanna-sunset/50'
                      : 'border-savanna-gold/20 hover:border-savanna-gold hover:bg-savanna-gold/5'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <TimeIcon className="w-4 h-4" />
                    <span className="font-semibold text-lg">{slot.time}</span>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded font-medium ${getAvailabilityColor(slot.available)}`}>
                    {slot.available > 0 ? `${slot.available} spots` : 'Sold out'}
                  </div>
                </button>
              )
            })
          ) : (
            <div className="col-span-full text-center py-8 text-savanna-brown/60 dark:text-savanna-sand/60">
              No time slots available for this date
            </div>
          )}
        </div>
      </div>

      {/* Selected Time Display */}
      {selectedTime && (
        <div className="bg-savanna-olive/10 rounded-lg p-4 border border-savanna-olive/30">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-savanna-brown/60 dark:text-savanna-sand/60">
                Selected Time
              </div>
              <div className="text-lg font-semibold text-savanna-brown dark:text-savanna-sand">
                {selectedTime}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-savanna-brown/60 dark:text-savanna-sand/60">
                Duration
              </div>
              <div className="text-lg font-semibold text-savanna-brown dark:text-savanna-sand">
                {ride?.duration || 'N/A'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Availability Legend */}
      <div className="p-4 bg-savanna-sand/50 dark:bg-savanna-brown-light/50 rounded-lg">
        <h5 className="text-xs font-semibold mb-2 text-savanna-brown/60 dark:text-savanna-sand/60">
          AVAILABILITY KEY
        </h5>
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-savanna-olive/50" />
            <span>High (6+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-savanna-gold/50" />
            <span>Medium (3-5)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-savanna-sunset/50" />
            <span>Low (1-2)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-300 dark:bg-gray-600" />
            <span>Sold Out</span>
          </div>
        </div>
      </div>
    </div>
  )
}