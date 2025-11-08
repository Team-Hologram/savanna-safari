/**
 * Booking flow state types
 * Used by BookingCard and booking store
 */

/**
 * Booking flow state types
 * Used by BookingCard and booking store
 */

export type BookingStep = 'category' | 'route' | 'datetime' | 'party' | 'summary'

export interface RoutePoint {
  id: string
  name: string
  coordinates: number[] // Changed from [number, number] to number[]
  description?: string
  popularTime?: string
}

export interface BookingState {
  // Step 1: Category
  selectedCategory?: string
  selectedRide?: string

  // Step 2: Route
  startingPoint?: RoutePoint
  customRoute?: boolean

  // Step 3: DateTime
  selectedDate?: string // ISO date
  selectedTime?: string // "05:00"
  flexibleTime?: boolean

  // Step 4: Party & Addons
  adults: number
  children: number
  addons: string[] // addon IDs

  // Computed
  totalPrice: number
  estimatedDuration: string

  // Meta
  currentStep: BookingStep
  completedSteps: BookingStep[]
}

export interface BookingSnapshot {
  id: string
  createdAt: string
  state: BookingState
  shareUrl: string
  expiresAt: string
}

export interface PriceSummary {
  basePrice: number
  addonTotal: number
  groupDiscount?: number
  taxesAndFees: number
  total: number
  currency: string
}