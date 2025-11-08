'use client'

import { useBookingStore } from '@/store/booking-store'
import mockData from '@/data/mock-data.json'

/**
 * PriceDisplay Component
 * Shows detailed price breakdown in booking summary
 */

export default function PriceDisplay() {
  const { selectedRide, adults, children, addons } = useBookingStore()
  
  const ride = mockData.rides.find(r => r.id === selectedRide)
  
  if (!ride) {
    return (
      <div className="p-4 bg-savanna-sand dark:bg-savanna-brown-light rounded-lg text-center text-savanna-brown/60 dark:text-savanna-sand/60">
        Select a ride to see pricing
      </div>
    )
  }

  const basePrice = ride.price * adults + ride.price * 0.5 * children
  const addonTotal = addons.reduce((sum, addonId) => {
    const addon = mockData.addons.find(a => a.id === addonId)
    return sum + (addon?.price || 0)
  }, 0)
  
  const groupDiscount = (adults + children >= 4) ? basePrice * 0.1 : 0
  const subtotal = basePrice + addonTotal - groupDiscount
  const taxesAndFees = subtotal * 0.08 // 8% taxes
  const total = subtotal + taxesAndFees

  return (
    <div className="p-4 bg-savanna-sand dark:bg-savanna-brown-light rounded-lg space-y-2">
      <h4 className="font-medium text-sm text-savanna-brown/60 dark:text-savanna-sand/60 mb-3">
        Price Breakdown
      </h4>
      
      <div className="flex justify-between text-sm">
        <span>Base Price ({adults} adults, {children} children)</span>
        <span className="font-semibold">${basePrice.toFixed(2)}</span>
      </div>

      {addonTotal > 0 && (
        <div className="flex justify-between text-sm">
          <span>Add-ons</span>
          <span className="font-semibold">${addonTotal.toFixed(2)}</span>
        </div>
      )}

      {groupDiscount > 0 && (
        <div className="flex justify-between text-sm text-savanna-olive">
          <span>Group Discount (4+ travelers)</span>
          <span className="font-semibold">-${groupDiscount.toFixed(2)}</span>
        </div>
      )}

      <div className="flex justify-between text-sm">
        <span>Taxes & Fees</span>
        <span className="font-semibold">${taxesAndFees.toFixed(2)}</span>
      </div>

      <div className="border-t border-savanna-gold/30 pt-2 mt-2">
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-savanna-sunset">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="text-xs text-savanna-brown/60 dark:text-savanna-sand/60 mt-3">
        {ride.cancellationPolicy}
      </div>
    </div>
  )
}