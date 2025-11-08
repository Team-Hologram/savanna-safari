import { MetadataRoute } from 'next'
import mockData from '@/data/mock-data.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://savannasafari.com'
  
  // Static pages
  const staticPages = [
    '',
    '/rides',
    '/about',
    '/faq',
    '/privacy',
    '/terms',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic ride pages
  const ridePages = mockData.rides.map(ride => ({
    url: `${baseUrl}/rides/${ride.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...ridePages]
}