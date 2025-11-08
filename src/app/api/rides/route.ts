import { NextResponse } from 'next/server'
import mockData from '@/data/mock-data.json'

/**
 * GET /api/rides
 * Returns all rides with optional filtering
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  
  const category = searchParams.get('category')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  const difficulty = searchParams.get('difficulty')
  
  let rides = mockData.rides

  // Filter by category
  if (category) {
    rides = rides.filter(ride => ride.categoryId === category)
  }

  // Filter by price
  if (minPrice) {
    rides = rides.filter(ride => ride.price >= parseInt(minPrice))
  }
  if (maxPrice) {
    rides = rides.filter(ride => ride.price <= parseInt(maxPrice))
  }

  // Filter by difficulty
  if (difficulty) {
    rides = rides.filter(ride => ride.difficulty === difficulty)
  }

  return NextResponse.json({
    success: true,
    data: rides,
    count: rides.length,
  })
}