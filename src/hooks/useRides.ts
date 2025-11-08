import { useQuery } from '@tanstack/react-query'
import { Ride, FilterOptions } from '@/types/rides'

/**
 * Custom hook for fetching rides with filters
 */

async function fetchRides(filters?: FilterOptions): Promise<Ride[]> {
  const params = new URLSearchParams()
  
  if (filters?.categories?.length) {
    params.append('category', filters.categories[0]) // Simplified
  }
  if (filters?.priceRange) {
    params.append('minPrice', filters.priceRange[0].toString())
    params.append('maxPrice', filters.priceRange[1].toString())
  }
  if (filters?.difficulty?.length) {
    params.append('difficulty', filters.difficulty[0])
  }

  const response = await fetch(`/api/rides?${params.toString()}`)
  const data = await response.json()
  
  if (!data.success) {
    throw new Error('Failed to fetch rides')
  }
  
  return data.data
}

export function useRides(filters?: FilterOptions) {
  return useQuery({
    queryKey: ['rides', filters],
    queryFn: () => fetchRides(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useRide(id: string) {
  return useQuery({
    queryKey: ['ride', id],
    queryFn: async () => {
      const response = await fetch(`/api/rides`)
      const data = await response.json()
      return data.data.find((r: Ride) => r.id === id)
    },
    enabled: !!id,
  })
}