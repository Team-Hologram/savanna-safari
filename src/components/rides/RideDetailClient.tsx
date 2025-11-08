'use client'

import { Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import type { Ride } from '@/types/rides'

// Dynamically import the calendar to avoid SSR issues
const AvailabilityCalendar = dynamic(
  () => import('@/components/rides/AvailabilityCalendar'),
  { ssr: false, loading: () => <div className="h-64 bg-savanna-sand/50 animate-pulse rounded-lg" /> }
)

interface RideDetailClientProps {
  ride: Ride
}

export default function RideDetailClient({ ride }: RideDetailClientProps) {
  const handleBookNow = () => {
    window.location.href = '/#booking'
  }

  return (
    <div className="sticky top-32 space-y-6">
      {/* Booking Card */}
      <div className="bg-white dark:bg-savanna-brown-light rounded-2xl shadow-float-lg p-6">
        <div className="mb-6">
          <div className="text-sm text-savanna-brown/60 dark:text-savanna-sand/60 mb-1">
            From
          </div>
          <div className="text-4xl font-bold text-savanna-sunset">
            ${ride.price}
          </div>
          <div className="text-sm text-savanna-brown/60 dark:text-savanna-sand/60">
            per person
          </div>
        </div>

        <AvailabilityCalendar rideId={ride.id} />

        <Button
          className="w-full bg-savanna-sunset hover:bg-savanna-sunset-dark text-white text-lg py-6 mt-6"
          onClick={handleBookNow}
          type="button"
        >
          Book Now
        </Button>

        <div className="mt-4 text-center text-sm text-savanna-brown/60 dark:text-savanna-sand/60">
          {ride.cancellationPolicy}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-savanna-olive/10 rounded-2xl p-6 border border-savanna-olive/30">
        <h3 className="font-semibold mb-3">Need Help?</h3>
        <p className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70 mb-4">
          Our safari experts are here to answer your questions
        </p>
        <Button variant="outline" className="w-full" asChild>
          <a href="/#contact">Contact Us</a>
        </Button>
      </div>

      {/* Safety Badge */}
      <div className="bg-savanna-sand/50 dark:bg-savanna-brown-light/50 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="w-8 h-8 text-savanna-olive" />
          <h3 className="font-semibold">Safety Certified</h3>
        </div>
        <p className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70">
          All our tours meet international safety standards with certified guides and
          well-maintained vehicles.
        </p>
      </div>
    </div>
  )
}