import { NextResponse } from 'next/server'
import mockData from '@/data/mock-data.json'

/**
 * GET /api/availability
 * Returns availability for a specific ride and date range
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  
  const rideId = searchParams.get('rideId')
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')

  if (!rideId) {
    return NextResponse.json(
      { success: false, error: 'rideId is required' },
      { status: 400 }
    )
  }

  const ride = mockData.rides.find(r => r.id === rideId)

  if (!ride) {
    return NextResponse.json(
      { success: false, error: 'Ride not found' },
      { status: 404 }
    )
  }

  let availability = ride.availability

  // Filter by date range if provided
  if (startDate && endDate) {
    availability = availability.filter(a => {
      const date = new Date(a.date)
      return date >= new Date(startDate) && date <= new Date(endDate)
    })
  }

  return NextResponse.json({
    success: true,
    data: {
      rideId,
      availability,
    },
  })
}