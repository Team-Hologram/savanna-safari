/**
 * API Client
 * Centralized API calls with error handling
 */

class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'APIError'
  }
}

async function fetchAPI(endpoint: string, options?: RequestInit) {
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new APIError(response.status, data.error || 'An error occurred')
  }

  return data
}

export const api = {
  rides: {
    getAll: (filters?: any) => {
      const params = new URLSearchParams(filters)
      return fetchAPI(`/api/rides?${params}`)
    },
    getById: (id: string) => fetchAPI(`/api/rides/${id}`),
  },
  
  availability: {
    get: (rideId: string, startDate?: string, endDate?: string) => {
      const params = new URLSearchParams({ rideId })
      if (startDate) params.append('startDate', startDate)
      if (endDate) params.append('endDate', endDate)
      return fetchAPI(`/api/availability?${params}`)
    },
  },

  bookings: {
    create: (bookingData: any) =>
      fetchAPI('/api/bookings', {
        method: 'POST',
        body: JSON.stringify(bookingData),
      }),
    getById: (id: string) => fetchAPI(`/api/bookings/${id}`),
  },
}