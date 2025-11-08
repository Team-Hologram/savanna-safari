import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { BookingState, BookingStep, RoutePoint, BookingSnapshot } from '@/types/booking'
import mockData from '@/data/mock-data.json'

/**
 * Zustand store for booking flow state
 * Manages multi-step booking process and price calculation
 */

interface BookingStore extends BookingState {
  // Actions
  setStep: (step: BookingStep) => void
  selectCategory: (categoryId: string) => void
  selectRide: (rideId: string) => void
  selectStartingPoint: (point: RoutePoint) => void
  setDateTime: (date: string, time: string) => void
  setPartySize: (adults: number, children: number) => void
  toggleAddon: (addonId: string) => void
  calculatePrice: () => void
  createSnapshot: () => BookingSnapshot
  loadSnapshot: (snapshot: BookingSnapshot) => void
  reset: () => void
}

const initialState: BookingState = {
  adults: 2,
  children: 0,
  addons: [],
  totalPrice: 0,
  estimatedDuration: '',
  currentStep: 'category',
  completedSteps: [],
}

export const useBookingStore = create<BookingStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setStep: (step) => {
        const currentIndex = ['category', 'route', 'datetime', 'party', 'summary'].indexOf(get().currentStep)
        const newIndex = ['category', 'route', 'datetime', 'party', 'summary'].indexOf(step)
        
        set((state) => {
          const completed = new Set(state.completedSteps)
          if (newIndex > currentIndex) {
            completed.add(state.currentStep)
          }
          return {
            currentStep: step,
            completedSteps: Array.from(completed) as BookingStep[],
          }
        })
      },

      selectCategory: (categoryId) => {
        // Auto-select first ride in category
        const firstRide = mockData.rides.find(r => r.categoryId === categoryId)
        
        set({ 
          selectedCategory: categoryId,
          selectedRide: firstRide?.id,
          estimatedDuration: firstRide?.duration || '',
        })
        get().calculatePrice()
      },

      selectRide: (rideId) => {
        const ride = mockData.rides.find((r) => r.id === rideId)
        set({
          selectedRide: rideId,
          selectedCategory: ride?.categoryId,
          estimatedDuration: ride?.duration || '',
        })
        get().calculatePrice()
      },

      selectStartingPoint: (point) => {
        set({ startingPoint: point })
      },

      setDateTime: (date, time) => {
        set({ selectedDate: date, selectedTime: time })
      },

      setPartySize: (adults, children) => {
        set({ adults, children })
        get().calculatePrice()
      },

      toggleAddon: (addonId) => {
        set((state) => {
          const addons = state.addons.includes(addonId)
            ? state.addons.filter((id) => id !== addonId)
            : [...state.addons, addonId]
          return { addons }
        })
        get().calculatePrice()
      },

      calculatePrice: () => {
        const state = get()
        let total = 0

        // Base ride price
        if (state.selectedRide) {
          const ride = mockData.rides.find((r) => r.id === state.selectedRide)
          if (ride) {
            total += ride.price * (state.adults + state.children * 0.5)
          }
        }

        // Add-ons
        state.addons.forEach((addonId) => {
          const addon = mockData.addons.find((a) => a.id === addonId)
          if (addon) {
            total += addon.price
          }
        })

        // Group discount (example)
        if (state.adults + state.children >= 4) {
          total *= 0.9 // 10% discount
        }

        set({ totalPrice: Math.round(total) })
      },

      createSnapshot: () => {
        const state = get()
        const id = `booking-${Date.now()}`
        const snapshot: BookingSnapshot = {
          id,
          createdAt: new Date().toISOString(),
          state: {
            selectedCategory: state.selectedCategory,
            selectedRide: state.selectedRide,
            startingPoint: state.startingPoint,
            selectedDate: state.selectedDate,
            selectedTime: state.selectedTime,
            flexibleTime: state.flexibleTime,
            adults: state.adults,
            children: state.children,
            addons: state.addons,
            totalPrice: state.totalPrice,
            estimatedDuration: state.estimatedDuration,
            currentStep: state.currentStep,
            completedSteps: state.completedSteps,
          },
          shareUrl: `${typeof window !== 'undefined' ? window.location.origin : ''}/booking/${id}`,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
        }
        return snapshot
      },

      loadSnapshot: (snapshot) => {
        set(snapshot.state)
      },

      reset: () => {
        set(initialState)
      },
    }),
    { name: 'booking-store' }
  )
)