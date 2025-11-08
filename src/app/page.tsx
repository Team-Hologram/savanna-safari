import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import BookingCard from '@/components/home/BookingCard'
import AboutSection from '@/components/home/AboutSection'
import RideCategoriesGrid from '@/components/home/RideCategoriesGrid'
import Testimonials from '@/components/home/Testimonials'
import ContactForm from '@/components/shared/ContactForm'

/**
 * Home Page
 * Dynamically import 3D Hero to optimize initial bundle
 * Load heavy components only when needed
 */

const Hero3D = dynamic(() => import('@/components/home/Hero3D'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full bg-gradient-to-br from-savanna-sand to-savanna-gold animate-pulse" />
  ),
})

export default function HomePage() {
  return (
    <>
      {/* Hero Section with 3D */}
      <section id="hero" className="relative">
        <Suspense fallback={<div className="h-screen bg-savanna-sand" />}>
          <Hero3D />
        </Suspense>
      </section>

      {/* Booking Card - Prominently placed */}
      <section id="booking" className="relative -mt-32 z-20 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-5xl mx-auto">
          <BookingCard />
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-savanna-brown-light">
        <AboutSection />
      </section>

      {/* Ride Categories */}
      <section id="rides" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
              Choose Your Adventure
            </h2>
            <p className="text-lg text-savanna-brown/70 dark:text-savanna-sand/70 max-w-2xl mx-auto">
              From sunrise game drives to exclusive private safaris, find the perfect experience
            </p>
          </div>
          <RideCategoriesGrid />
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-savanna-olive/10">
        <Testimonials />
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
              Let's Plan Your Safari
            </h2>
            <p className="text-lg text-savanna-brown/70 dark:text-savanna-sand/70">
              Have questions? Our safari experts are here to help.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  )
}