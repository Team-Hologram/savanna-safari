import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * Booking Confirmation/Share Page
 * Shows saved booking snapshot
 */

interface BookingPageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: 'Booking Details - Savanna Safari',
  description: 'View your safari booking details',
}

export default function BookingPage({ params }: BookingPageProps) {
  // In production, fetch booking snapshot from API/database
  // For now, show placeholder
  
  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <CheckCircle2 className="w-16 h-16 text-savanna-olive mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
            Booking Saved
          </h1>
          <p className="text-lg text-savanna-brown/70 dark:text-savanna-sand/70">
            Booking ID: {params.id}
          </p>
        </div>

        <div className="bg-white dark:bg-savanna-brown-light rounded-2xl shadow-float-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Booking Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-savanna-gold/20">
              <span className="text-savanna-brown/60 dark:text-savanna-sand/60">Experience</span>
              <span className="font-semibold">Sunrise Big Five Drive</span>
            </div>
            
            <div className="flex justify-between py-3 border-b border-savanna-gold/20">
              <span className="text-savanna-brown/60 dark:text-savanna-sand/60">Date</span>
              <span className="font-semibold">June 10, 2025</span>
            </div>
            
            <div className="flex justify-between py-3 border-b border-savanna-gold/20">
              <span className="text-savanna-brown/60 dark:text-savanna-sand/60">Time</span>
              <span className="font-semibold">05:00 AM</span>
            </div>
            
            <div className="flex justify-between py-3 border-b border-savanna-gold/20">
              <span className="text-savanna-brown/60 dark:text-savanna-sand/60">Party Size</span>
              <span className="font-semibold">2 Adults, 1 Child</span>
            </div>
            
            <div className="flex justify-between py-3">
              <span className="text-savanna-brown/60 dark:text-savanna-sand/60">Total</span>
              <span className="text-2xl font-bold text-savanna-sunset">$356</span>
            </div>
          </div>
        </div>

        <div className="bg-savanna-olive/10 rounded-2xl p-6 border border-savanna-olive/30 mb-8">
          <h3 className="font-semibold mb-2">What's Next?</h3>
          <p className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70 mb-4">
            This booking has been saved and can be completed within 7 days. 
            Continue to payment to confirm your reservation.
          </p>
          <Button className="w-full bg-savanna-sunset hover:bg-savanna-sunset-dark text-white">
            Complete Booking
          </Button>
        </div>

        <div className="text-center">
          <Button variant="outline" asChild>
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </div>
    </div>
  )
}