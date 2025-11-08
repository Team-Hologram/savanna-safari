import { Suspense } from 'react'
import type { Metadata } from 'next'
import RidesFilter from '@/components/rides/RidesFilter'
import RideCard from '@/components/rides/RideCard'
import mockData from '@/data/mock-data.json'
import type { Ride } from '@/types/rides'

export const metadata: Metadata = {
  title: 'Safari Rides - Savanna Safari',
  description: 'Browse our complete collection of safari experiences',
}

/**
 * Rides Page
 * Lists all available safari rides with filters
 */

export default function RidesPage() {
  // Cast rides to proper type
  const rides = mockData.rides as Ride[]

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
            Safari Experiences
          </h1>
          <p className="text-lg text-savanna-brown/70 dark:text-savanna-sand/70 max-w-2xl mx-auto">
            Choose from our curated collection of wildlife adventures
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Suspense fallback={<FilterSkeleton />}>
              <RidesFilter />
            </Suspense>
          </aside>

          {/* Rides Grid */}
          <main className="lg:col-span-3">
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-savanna-brown/60 dark:text-savanna-sand/60">
                {rides.length} {rides.length === 1 ? 'experience' : 'experiences'} found
              </p>
              <select className="px-4 py-2 border border-savanna-gold/20 rounded-lg bg-white dark:bg-savanna-brown-light text-sm focus:outline-none focus:ring-2 focus:ring-savanna-gold">
                <option>Sort by: Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
                <option>Duration</option>
              </select>
            </div>

            {rides.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rides.map((ride) => (
                  <RideCard key={ride.id} ride={ride} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-savanna-brown/60 dark:text-savanna-sand/60">
                  No safari experiences found
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

function FilterSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-10 bg-savanna-sand dark:bg-savanna-brown-light rounded" />
      <div className="h-32 bg-savanna-sand dark:bg-savanna-brown-light rounded" />
      <div className="h-32 bg-savanna-sand dark:bg-savanna-brown-light rounded" />
    </div>
  )
}