import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import RideDetailClient from '@/components/rides/RideDetailClient'
import mockData from '@/data/mock-data.json'
import { Star, Clock, Users, MapPin, Shield, Camera } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Ride } from '@/types/rides'

const RideModel3D = dynamic(() => import('@/components/rides/RideModel3D'), {
  ssr: false,
  loading: () => <div className="h-64 bg-savanna-sand animate-pulse rounded-xl" />,
})

interface RideDetailPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: RideDetailPageProps): Promise<Metadata> {
  const ride = mockData.rides.find(r => r.id === params.id) as Ride | undefined
  
  if (!ride) {
    return {
      title: 'Ride Not Found',
    }
  }

  return {
    title: `${ride.title} - Savanna Safari`,
    description: ride.description,
    openGraph: {
      title: ride.title,
      description: ride.description,
      images: ride.images,
    },
  }
}

export default function RideDetailPage({ params }: RideDetailPageProps) {
  const ride = mockData.rides.find(r => r.id === params.id) as Ride | undefined
  const category = mockData.categories.find(c => c.id === ride?.categoryId)
  const reviews = mockData.reviews.filter(r => r.rideId === params.id)

  if (!ride) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><a href="/" className="text-savanna-brown/60 hover:text-savanna-gold">Home</a></li>
            <li>/</li>
            <li><a href="/rides" className="text-savanna-brown/60 hover:text-savanna-gold">Rides</a></li>
            <li>/</li>
            <li className="text-savanna-brown dark:text-savanna-sand font-medium">{ride.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="mb-3 bg-savanna-sunset text-white">
                    {category?.name}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
                    {ride.title}
                  </h1>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 fill-savanna-gold text-savanna-gold" />
                    <span className="text-2xl font-bold">{ride.rating}</span>
                  </div>
                  <div className="text-sm text-savanna-brown/60 dark:text-savanna-sand/60">
                    {ride.reviewCount} reviews
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-savanna-gold" />
                  <span>{ride.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-savanna-gold" />
                  <span>Max {ride.maxGroupSize} people</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-savanna-gold" />
                  <span className="capitalize">{ride.difficulty}</span>
                </div>
              </div>
            </div>

            {/* 3D Model */}
            <div className="bg-gradient-to-br from-savanna-sand to-savanna-gold/20 rounded-2xl overflow-hidden">
              <Suspense fallback={<div className="h-96 animate-pulse bg-savanna-sand/50" />}>
                <RideModel3D modelPath={ride.glb || '/models/jeep.glb'} />
              </Suspense>
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ride.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-video bg-savanna-sand dark:bg-savanna-brown rounded-xl overflow-hidden relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-savanna-gold/20 to-savanna-olive/20 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-savanna-brown/30" />
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm">View Full Size</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">About This Experience</h2>
              <p className="text-savanna-brown/80 dark:text-savanna-sand/80 leading-relaxed">
                {ride.description}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Highlights</h2>
              <div className="grid grid-cols-2 gap-3">
                {ride.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-savanna-olive/10 rounded-lg"
                  >
                    <Shield className="w-5 h-5 text-savanna-olive" />
                    <span className="font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Species Likelihood */}
            {ride.speciesLikelihood && ride.speciesLikelihood.length > 0 && (
              <div className="bg-savanna-sand/50 dark:bg-savanna-brown-light/50 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4">Wildlife You&apos;ll Likely See</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {ride.speciesLikelihood.map((species) => (
                    <div key={species.name} className="text-center">
                      <div className="text-4xl mb-2">{species.icon}</div>
                      <div className="font-medium mb-1">{species.name}</div>
                      <div className="text-sm text-savanna-brown/60 dark:text-savanna-sand/60">
                        {species.probability}% chance
                      </div>
                      <div className="mt-2 h-2 bg-savanna-sand dark:bg-savanna-brown rounded-full overflow-hidden">
                        <div
                          className="h-full bg-savanna-olive"
                          style={{ width: `${species.probability}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's Included */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-savanna-olive" />
                  Included
                </h2>
                <ul className="space-y-2">
                  {ride.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-savanna-olive mt-1">✓</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {ride.excludes && ride.excludes.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    Not Included
                  </h2>
                  <ul className="space-y-2">
                    {ride.excludes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-savanna-brown/40 mt-1">✗</span>
                        <span className="text-sm text-savanna-brown/60 dark:text-savanna-sand/60">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Reviews */}
            {reviews.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Guest Reviews</h2>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white dark:bg-savanna-brown-light p-6 rounded-xl shadow-float"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-savanna-gold to-savanna-sunset rounded-full flex items-center justify-center text-white font-bold">
                            {review.author.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold">{review.author}</div>
                            <div className="text-sm text-savanna-brown/60 dark:text-savanna-sand/60">
                              {new Date(review.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-savanna-gold text-savanna-gold'
                                  : 'text-savanna-gold/30'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-savanna-brown/80 dark:text-savanna-sand/80">
                        {review.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <RideDetailClient ride={ride} />
          </div>
        </div>
      </div>
    </div>
  )
}