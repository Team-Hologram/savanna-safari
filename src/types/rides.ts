/**
 * Core type definitions for Safari Rides
 * Shared across components, API routes, and state management
 */

export interface RideCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

export interface TimeSlot {
  time: string // "05:00"
  available: number
  price?: number // dynamic pricing
}

export interface AvailabilityDate {
  date: string // ISO date string
  slots: TimeSlot[]
}

export interface Ride {
  id: string
  categoryId: string
  title: string
  description: string
  duration: string // "4h"
  price: number
  currency: string
  highlights: string[] // ["Elephants", "Lions"]
  rating: number
  reviewCount: number
  images: string[]
  glb?: string // path to 3D model
  availability: AvailabilityDate[]
  maxGroupSize: number
  difficulty: 'easy' | 'moderate' | 'challenging'
  includes: string[]
  excludes?: string[]
  cancellationPolicy: string
  speciesLikelihood: SpeciesLikelihood[]
}

export interface SpeciesLikelihood {
  name: string
  icon: string
  probability: number // 0-100
}

export interface Addon {
  id: string
  name: string
  description: string
  price: number
  icon?: string
  category: 'experience' | 'comfort' | 'documentation'
}

export interface Review {
  id: string
  rideId: string
  author: string
  authorAvatar?: string
  rating: number
  date: string
  content: string
  photos?: string[]
}

export interface FilterOptions {
  categories: string[]
  priceRange: [number, number]
  dateRange?: [Date, Date]
  groupSize?: number
  difficulty?: string[]
  availability?: 'any' | 'today' | 'week' | 'month'
}

export interface SortOption {
  field: 'price' | 'rating' | 'duration' | 'popularity'
  direction: 'asc' | 'desc'
}