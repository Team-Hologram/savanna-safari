import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Savanna Safari',
  description: 'Terms and conditions for booking and using our safari services',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-savanna-brown dark:text-savanna-sand mb-6">
          Terms of Service
        </h1>
        <p className="text-sm text-savanna-brown/60 dark:text-savanna-sand/60 mb-12">
          Last updated: June 1, 2025
        </p>

        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-savanna-brown/80 dark:text-savanna-sand/80 leading-relaxed">
              By accessing or using Savanna Safari's website and services, you agree to be bound 
              by these Terms of Service and all applicable laws and regulations. If you do not 
              agree with any of these terms, you are prohibited from using our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
              2. Booking and Payment
            </h2>
            
            <h3 className="text-2xl font-semibold text-savanna-brown dark:text-savanna-sand mb-3 mt-6">
              2.1 Booking Process
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-savanna-brown/80 dark:text-savanna-sand/80">
              <li>All bookings are subject to availability</li>
              <li>Bookings are confirmed only upon full payment or approved deposit</li>
              <li>You must provide accurate and complete information</li>
              <li>Saved bookings expire after 7 days if not completed</li>
            </ul>

            <h3 className="text-2xl font-semibold text-savanna-brown dark:text-savanna-sand mb-3 mt-6">
              2.2 Payment Terms
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-savanna-brown/80 dark:text-savanna-sand/80">
              <li>All prices are in USD unless otherwise stated</li>
              <li>Payment is processed securely through our payment providers</li>
              <li>Prices may change without notice (confirmed bookings honored)</li>
              <li>Additional fees may apply for custom requests</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
              3. Cancellation and Refunds
            </h2>
            
            <h3 className="text-2xl font-semibold text-savanna-brown dark:text-savanna-sand mb-3 mt-6">
              3.1 Guest Cancellations
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-savanna-brown/80 dark:text-savanna-sand/80">
              <li>24-72 hours notice: Full refund (varies by tour type)</li>
              <li>Less than 24 hours: No refund</li>
              <li>No-show: No refund</li>
              <li>Refunds processed within 5-10 business days</li>
            </ul>

            <h3 className="text-2xl font-semibold text-savanna-brown dark:text-savanna-sand mb-3 mt-6">
              3.2 Operator Cancellations
            </h3>
            <p className="text-savanna-brown/80 dark:text-savanna-sand/80">
              We reserve the right to cancel tours due to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-savanna-brown/80 dark:text-savanna-sand/80 mt-2">
              <li>Unsafe weather conditions</li>
              <li>Insufficient bookings (minimum 2 guests)</li>
              <li>Force majeure events</li>
              <li>Park closures or restrictions</li>
            </ul>
            <p className="text-savanna-brown/80 dark:text-savanna-sand/80 mt-4">
              If we cancel, you'll receive a full refund or alternative date.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
              4. Participant Responsibilities
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-savanna-brown/80 dark:text-savanna-sand/80">
              <li>Arrive at pickup location on time (we cannot wait for late arrivals)</li>
              <li>Follow guide instructions at all times</li>
              <li>Respect wildlife and maintain safe distances</li>
              <li>Inform us of medical conditions or dietary requirements</li>
              <li>Have necessary travel documents and vaccinations</li>
              <li>Behave responsibly and respect other guests</li>
              <li>Not be under the influence of alcohol or drugs</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
              5. Liability and Insurance
            </h2>
            
            <h3 className="text-2xl font-semibold text-savanna-brown dark:text-savanna-sand mb-3 mt-6">
              5.1 Our Liability
            </h3>
            <p className="text-savanna-brown/80 dark:text-savanna-sand/80">
              Savanna Safari maintains comprehensive liability insurance. However, participants 
              acknowledge that wildlife viewing involves inherent risks. We are not liable for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-savanna-brown/80 dark:text-savanna-sand/80 mt-4">
              <li>Injuries resulting from failure to follow instructions</li>
              <li>Loss or damage to personal belongings</li>
              <li>Wildlife behavior (it's unpredictable nature)</li>
              <li>Delays or changes due to circumstances beyond our control</li>
              <li>Indirect or consequential damages</li>
            </ul>

            <h3 className="text-2xl font-semibold text-savanna-brown dark:text-savanna-sand mb-3 mt-6">
              5.2 Travel Insurance
            </h3>
            <p className="text-savanna-brown/80 dark:text-savanna-sand/80">
              We strongly recommend purchasing comprehensive travel insurance covering:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-savanna-brown/80 dark:text-savanna-sand/80 mt-2">
              <li>Trip cancellation/interruption</li>
              <li>Medical expenses and evacuation</li>
              <li>Personal liability</li>
              <li>Lost or damaged belongings</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
              6. Photography and Media
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-savanna-brown/80 dark:text-savanna-sand/80">
              <li>We may photograph/film tours for promotional purposes</li>
              <li>By participating, you consent to use of your image (opt-out available)</li>
              <li>You retain rights to your own photographs</li>
              <li>Commercial photography requires advance permission</li>
              <li>Drone usage prohibited without special permit</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
              7. Intellectual Property
            </h2>
            <p className="text-savanna-brown/80 dark:text-savanna-sand/80">
              All website content, logos, and materials are protected by copyright and trademark 
              laws. You may not reproduce, distribute, or create derivative works without written 
              permission.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
              8. Governing Law
            </h2>
            <p className="text-savanna-brown/80 dark:text-savanna-sand/80">
              These Terms are governed by the laws of Tanzania. Disputes will be resolved through 
              binding arbitration in Tanzania, except where prohibited by law.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
              9. Changes to Terms
            </h2>
            <p className="text-savanna-brown/80 dark:text-savanna-sand/80">
              We reserve the right to modify these terms at any time. Changes become effective 
              immediately upon posting. Continued use of services constitutes acceptance of updated 
              terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
              10. Contact Information
            </h2>
            <p className="text-savanna-brown/80 dark:text-savanna-sand/80 mb-4">
              Questions about these Terms of Service? Contact us:
            </p>
            <div className="p-6 bg-savanna-sand/50 dark:bg-savanna-brown-light/50 rounded-xl">
              <p className="font-semibold mb-2">Savanna Safari Legal Team</p>
              <p>Email: legal@savannasafari.com</p>
              <p>Phone: +255 123 456 789</p>
              <p>Address: Serengeti National Park, Tanzania</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}