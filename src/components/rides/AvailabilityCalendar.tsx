'use client'

import { useState } from 'react'
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import mockData from '@/data/mock-data.json'

interface AvailabilityCalendarProps {
  rideId: string
}

export default function AvailabilityCalendar({ rideId }: AvailabilityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const ride = mockData.rides.find(r => r.id === rideId)
  
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getAvailability = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    const availability = ride?.availability.find(a => a.date === dateStr)
    if (!availability) return 0
    return availability.slots.reduce((sum, slot) => sum + slot.available, 0)
  }

  const getAvailabilityClass = (count: number) => {
    if (count === 0) return 'bg-gray-200 dark:bg-gray-700 text-gray-400'
    if (count < 3) return 'bg-savanna-sunset/30 text-savanna-brown dark:text-savanna-sand'
    if (count < 6) return 'bg-savanna-gold/30 text-savanna-brown dark:text-savanna-sand'
    return 'bg-savanna-olive/30 text-savanna-brown dark:text-savanna-sand'
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => addDays(startOfMonth(prev), -1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(prev => addDays(endOfMonth(prev), 1))
  }

  const handleDateClick = (date: Date) => {
    const availability = getAvailability(date)
    const isPast = date < new Date()
    
    if (!isPast && availability > 0) {
      setSelectedDate(date)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{format(currentMonth, 'MMMM yyyy')}</h3>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPreviousMonth}
            className="h-8 w-8"
            type="button"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNextMonth}
            className="h-8 w-8"
            type="button"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div
            key={day}
            className="text-center text-xs font-medium text-savanna-brown/60 dark:text-savanna-sand/60 p-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: monthStart.getDay() }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        
        {daysInMonth.map(day => {
          const availability = getAvailability(day)
          const isSelected = selectedDate && format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
          const isPast = day < new Date()
          
          return (
            <button
              key={day.toISOString()}
              onClick={() => handleDateClick(day)}
              disabled={isPast || availability === 0}
              type="button"
              className={`
                aspect-square p-2 rounded-lg text-sm font-medium transition-all
                ${getAvailabilityClass(availability)}
                ${isSelected ? 'ring-2 ring-savanna-sunset' : ''}
                ${isPast ? 'opacity-40 cursor-not-allowed' : 'hover:scale-110'}
                disabled:cursor-not-allowed disabled:opacity-40
              `}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>

      {selectedDate && (
        <div className="mt-4 p-3 bg-savanna-olive/10 rounded-lg border border-savanna-olive/30">
          <div className="text-sm font-medium mb-1">
            {format(selectedDate, 'MMMM d, yyyy')}
          </div>
          <div className="text-xs text-savanna-brown/70 dark:text-savanna-sand/70">
            {getAvailability(selectedDate)} spots available
          </div>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-savanna-olive/30" />
          <span>High</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-savanna-gold/30" />
          <span>Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-savanna-sunset/30" />
          <span>Low</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-200 dark:bg-gray-700" />
          <span>Full</span>
        </div>
      </div>
    </div>
  )
}