'use client'

import { Shield, Award, Users, Leaf } from 'lucide-react'

/**
 * AboutSection Component
 * Mission statement and safety badges
 */

const features = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Certified guides and maintained vehicles ensure your security throughout the journey.',
  },
  {
    icon: Award,
    title: '20+ Years Experience',
    description: 'Expert knowledge of wildlife behavior and optimal viewing locations.',
  },
  {
    icon: Users,
    title: 'Small Groups',
    description: 'Intimate experiences with maximum 8 guests per vehicle for better wildlife viewing.',
  },
  {
    icon: Leaf,
    title: 'Eco-Conscious',
    description: 'Sustainable tourism practices that protect wildlife and support local communities.',
  },
]

export default function AboutSection() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
          Your Trusted Safari Partner
        </h2>
        <p className="text-lg text-savanna-brown/70 dark:text-savanna-sand/70 max-w-3xl mx-auto">
          For over two decades, we've been guiding adventurers through Africa's most spectacular landscapes. 
          Our commitment to safety, sustainability, and unforgettable experiences sets us apart.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-white dark:bg-savanna-brown-light shadow-float hover:shadow-float-lg transition-shadow"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-savanna-gold to-savanna-sunset rounded-2xl flex items-center justify-center">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-savanna-brown dark:text-savanna-sand">
                {feature.title}
              </h3>
              <p className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70">
                {feature.description}
              </p>
            </div>
          )
        })}
      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-bold text-savanna-sunset mb-2">15K+</div>
          <div className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70">Happy Travelers</div>
        </div>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-bold text-savanna-sunset mb-2">4.9</div>
          <div className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70">Average Rating</div>
        </div>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-bold text-savanna-sunset mb-2">98%</div>
          <div className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70">Wildlife Sightings</div>
        </div>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-bold text-savanna-sunset mb-2">24/7</div>
          <div className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70">Support Available</div>
        </div>
      </div>
    </div>
  )
}