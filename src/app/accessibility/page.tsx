import { Metadata } from 'next'
import { Keyboard, Eye, Volume2, MousePointer } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Accessibility - Savanna Safari',
  description: 'Our commitment to making safari experiences accessible to everyone',
}

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-savanna-brown dark:text-savanna-sand mb-6">
          Accessibility Statement
        </h1>
        <p className="text-xl text-savanna-brown/80 dark:text-savanna-sand/80 mb-12">
          We're committed to making safari experiences accessible to all travelers
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-6">
              Website Accessibility
            </h2>
            <p className="text-savanna-brown/80 dark:text-savanna-sand/80 mb-6">
              Our website is designed to meet WCAG 2.1 Level AA standards. We've implemented:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-savanna-brown-light p-6 rounded-xl shadow-float">
                <Keyboard className="w-10 h-10 text-savanna-gold mb-4" />
                <h3 className="text-xl font-semibold mb-3">Keyboard Navigation</h3>
                <p className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70">
                  Full keyboard accessibility with visible focus indicators and logical tab order
                </p>
              </div>

              <div className="bg-white dark:bg-savanna-brown-light p-6 rounded-xl shadow-float">
                <Eye className="w-10 h-10 text-savanna-gold mb-4" />
                <h3 className="text-xl font-semibold mb-3">Screen Readers</h3>
                <p className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70">
                  Semantic HTML, ARIA labels, and alternative text for all images
                </p>
              </div>

              <div className="bg-white dark:bg-savanna-brown-light p-6 rounded-xl shadow-float">
                <Volume2 className="w-10 h-10 text-savanna-gold mb-4" />
                <h3 className="text-xl font-semibold mb-3">Reduced Motion</h3>
                <p className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70">
                  Respects prefers-reduced-motion settings to minimize animations
                </p>
              </div>

              <div className="bg-white dark:bg-savanna-brown-light p-6 rounded-xl shadow-float">
                <MousePointer className="w-10 h-10 text-savanna-gold mb-4" />
                <h3 className="text-xl font-semibold mb-3">Color Contrast</h3>
                <p className="text-sm text-savanna-brown/70 dark:text-savanna-sand/70">
                  All text meets minimum 4.5:1 contrast ratio for readability
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-6">
              Safari Accessibility
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-savanna-brown dark:text-savanna-sand mb-3">
                  Mobility Accommodations
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-savanna-brown/80 dark:text-savanna-sand/80">
                  <li>Wheelchair-accessible vehicles available (advance booking required)</li>
                  <li>Assistance with boarding and transfers</li>
                  <li>Modified itineraries for limited mobility</li>
                  <li>Accessible lodge accommodations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-savanna-brown dark:text-savanna-sand mb-3">
                  Visual Accommodations
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-savanna-brown/80 dark:text-savanna-sand/80">
                  <li>Detailed verbal descriptions by guides</li>
                  <li>Tactile experiences where appropriate</li>
                  <li>Binoculars and magnification equipment</li>
                  <li>Service animals welcome</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-savanna-brown dark:text-savanna-sand mb-3">
                  Hearing Accommodations
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-savanna-brown/80 dark:text-savanna-sand/80">
                  <li>Written briefing materials available</li>
                  <li>Visual alert systems in vehicles</li>
                  <li>Sign language interpreters (48 hours notice)</li>
                  <li>Clear face masks for lip reading</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-6">
              Request Accommodations
            </h2>
            <p className="text-savanna-brown/80 dark:text-savanna-sand/80 mb-6">
              Please contact us at least 48 hours before your tour to arrange specific accommodations. 
              We'll work with you to ensure a comfortable and enjoyable experience.
            </p>
            <div className="bg-savanna-olive/10 p-6 rounded-xl border border-savanna-olive/30">
              <p className="font-semibold mb-2">Accessibility Coordinator</p>
              <p>Email: accessibility@savannasafari.com</p>
              <p>Phone: +255 123 456 789</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-6">
              Continuous Improvement
            </h2>
            <p className="text-savanna-brown/80 dark:text-savanna-sand/80">
              We're continuously working to improve accessibility. If you encounter any barriers 
              or have suggestions, please let us know. Your feedback helps us create better 
              experiences for all guests.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}