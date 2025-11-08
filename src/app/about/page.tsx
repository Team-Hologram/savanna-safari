import { Metadata } from 'next'
import { Shield, Award, Users, Leaf, Heart, Globe, Target, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Us - Savanna Safari',
  description: 'Learn about our mission, values, and commitment to sustainable safari tourism',
}

const values = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Your safety is our top priority. All guides are certified and vehicles are regularly inspected.',
  },
  {
    icon: Leaf,
    title: 'Eco-Conscious',
    description: 'We practice responsible tourism that protects wildlife and supports conservation efforts.',
  },
  {
    icon: Heart,
    title: 'Community Impact',
    description: '20% of profits support local communities and wildlife conservation programs.',
  },
  {
    icon: Globe,
    title: 'Cultural Respect',
    description: 'We honor local traditions and employ guides from indigenous communities.',
  },
]

const team = [
  {
    name: 'Dr. Sarah Kimani',
    role: 'Founder & Chief Guide',
    bio: '25 years of wildlife conservation experience',
    avatar: '👩🏿‍🔬',
  },
  {
    name: 'James Omondi',
    role: 'Operations Director',
    bio: 'Expert in sustainable tourism management',
    avatar: '👨🏿‍💼',
  },
  {
    name: 'Maria Santos',
    role: 'Guest Experience Manager',
    bio: 'Ensuring every safari exceeds expectations',
    avatar: '👩🏽‍💼',
  },
  {
    name: 'David Mwangi',
    role: 'Head Wildlife Tracker',
    bio: '30+ years tracking Big Five animals',
    avatar: '👨🏿‍🌾',
  },
]

const milestones = [
  { year: '2003', event: 'Savanna Safari founded', icon: Target },
  { year: '2008', event: 'Reached 10,000 happy travelers', icon: Users },
  { year: '2015', event: 'Launched conservation fund', icon: Leaf },
  { year: '2020', event: 'Carbon-neutral operations achieved', icon: Globe },
  { year: '2023', event: 'Awarded Best Safari Operator', icon: Award },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-savanna-brown dark:text-savanna-sand mb-6">
                Connecting People with
                <span className="gradient-text"> Wild Africa</span>
              </h1>
              <p className="text-xl text-savanna-brown/80 dark:text-savanna-sand/80 mb-8 leading-relaxed">
                For over 20 years, we've been creating transformative safari experiences 
                that inspire conservation and celebrate Africa's incredible wildlife heritage.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-savanna-sunset hover:bg-savanna-sunset-dark text-white" asChild>
                  <a href="/#booking">Book Your Safari</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="#team">Meet Our Team</a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-savanna-gold/20 to-savanna-olive/20 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-9xl opacity-30">🦁</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-savanna-olive/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-savanna-brown dark:text-savanna-sand mb-6">
            Our Mission
          </h2>
          <p className="text-2xl text-savanna-brown/80 dark:text-savanna-sand/80 leading-relaxed italic">
            "To create meaningful connections between people and wildlife while 
            championing conservation and supporting local communities through 
            responsible, sustainable tourism."
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-savanna-brown dark:text-savanna-sand mb-4">
            Our Core Values
          </h2>
          <p className="text-center text-savanna-brown/70 dark:text-savanna-sand/70 mb-12 max-w-2xl mx-auto">
            These principles guide everything we do
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-savanna-brown-light p-8 rounded-2xl shadow-float hover:shadow-float-lg transition-shadow text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-savanna-gold to-savanna-sunset rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-savanna-brown dark:text-savanna-sand">
                    {value.title}
                  </h3>
                  <p className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-savanna-sand dark:bg-savanna-brown-light">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-savanna-brown dark:text-savanna-sand mb-16">
            Our Journey
          </h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-savanna-gold/30 hidden md:block" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon
                const isEven = index % 2 === 0
                
                return (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    } flex-col gap-8`}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'} text-center md:text-inherit`}>
                      <div className="inline-block bg-white dark:bg-savanna-brown p-6 rounded-xl shadow-float">
                        <div className="text-3xl font-bold text-savanna-sunset mb-2">
                          {milestone.year}
                        </div>
                        <p className="text-lg font-medium text-savanna-brown dark:text-savanna-sand">
                          {milestone.event}
                        </p>
                      </div>
                    </div>
                    
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-savanna-gold to-savanna-sunset rounded-full flex items-center justify-center shadow-glow z-10">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Spacer */}
                    <div className="flex-1 hidden md:block" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-savanna-brown dark:text-savanna-sand mb-4">
            Meet Our Team
          </h2>
          <p className="text-center text-savanna-brown/70 dark:text-savanna-sand/70 mb-12 max-w-2xl mx-auto">
            Passionate experts dedicated to creating unforgettable experiences
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-savanna-brown-light rounded-2xl overflow-hidden shadow-float hover:shadow-float-lg transition-all card-hover"
              >
                <div className="aspect-square bg-gradient-to-br from-savanna-gold/20 to-savanna-olive/20 flex items-center justify-center text-8xl">
                  {member.avatar}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-savanna-brown dark:text-savanna-sand">
                    {member.name}
                  </h3>
                  <p className="text-sm text-savanna-sunset font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conservation Impact */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-savanna-olive/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-savanna-brown dark:text-savanna-sand mb-6">
                Our Conservation Impact
              </h2>
              <p className="text-lg text-savanna-brown/80 dark:text-savanna-sand/80 mb-6">
                We believe tourism should give back. That's why we're committed to protecting 
                the wildlife and ecosystems that make our safaris possible.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-savanna-olive rounded-lg flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Wildlife Conservation Fund</h3>
                    <p className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70">
                      20% of all bookings support anti-poaching efforts and habitat restoration
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-savanna-olive rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Community Programs</h3>
                    <p className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70">
                      Education and employment opportunities for local communities
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-savanna-olive rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Carbon Neutral Operations</h3>
                    <p className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70">
                      100% offset of carbon emissions through reforestation projects
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-savanna-brown-light p-8 rounded-2xl shadow-float-lg">
              <h3 className="text-2xl font-bold mb-6 text-savanna-brown dark:text-savanna-sand">
                Impact By The Numbers
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-savanna-sand/50 dark:bg-savanna-brown/50 rounded-xl">
                  <div className="text-4xl font-bold text-savanna-sunset mb-2">50K+</div>
                  <div className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70">
                    Trees Planted
                  </div>
                </div>
                <div className="text-center p-4 bg-savanna-sand/50 dark:bg-savanna-brown/50 rounded-xl">
                  <div className="text-4xl font-bold text-savanna-sunset mb-2">$2M+</div>
                  <div className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70">
                    Conservation Funds
                  </div>
                </div>
                <div className="text-center p-4 bg-savanna-sand/50 dark:bg-savanna-brown/50 rounded-xl">
                  <div className="text-4xl font-bold text-savanna-sunset mb-2">200+</div>
                  <div className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70">
                    Local Jobs Created
                  </div>
                </div>
                <div className="text-center p-4 bg-savanna-sand/50 dark:bg-savanna-brown/50 rounded-xl">
                  <div className="text-4xl font-bold text-savanna-sunset mb-2">15</div>
                  <div className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70">
                    Schools Supported
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-savanna-brown dark:text-savanna-sand mb-6">
            Join Us on This Journey
          </h2>
          <p className="text-xl text-savanna-brown/80 dark:text-savanna-sand/80 mb-8">
            Every safari you book contributes to wildlife conservation and community development.
          </p>
          <Button className="bg-savanna-sunset hover:bg-savanna-sunset-dark text-white text-lg px-8 py-6" asChild>
            <a href="/#booking">Book Your Safari Today</a>
          </Button>
        </div>
      </section>
    </div>
  )
}