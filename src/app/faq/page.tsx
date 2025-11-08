import { Metadata } from 'next'
import FAQAccordion from '../../components/faq/FAQAccordion'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'FAQ - Savanna Safari',
  description: 'Frequently asked questions about safari bookings, what to expect, and travel tips',
}

const faqCategories = [
  {
    category: 'Booking & Payment',
    questions: [
      {
        question: 'How do I book a safari?',
        answer: 'You can book directly through our website using the booking card on the homepage. Select your preferred experience, date, time, and party size, then proceed to payment. You can also save your booking and complete it later within 7 days.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. All payments are processed securely through Stripe.',
      },
      {
        question: 'Can I modify or cancel my booking?',
        answer: 'Yes! Most experiences offer free cancellation up to 24-72 hours before departure (check specific tour details). You can modify your booking through your account dashboard or by contacting our support team.',
      },
      {
        question: 'Do you offer group discounts?',
        answer: 'Yes! Groups of 4 or more receive an automatic 10% discount. For larger groups (8+), contact us for custom pricing and private tour options.',
      },
      {
        question: 'Is a deposit required?',
        answer: 'For standard bookings, full payment is required at time of booking. For custom/private safaris over $1000, we require a 50% deposit with the balance due 30 days before departure.',
      },
    ],
  },
  {
    category: 'Safari Experience',
    questions: [
      {
        question: 'What wildlife will I see?',
        answer: 'While we cannot guarantee specific sightings (it\'s nature!), our expert guides have a 98% success rate for Big Five sightings on our full-day tours. Each tour listing shows probability percentages for different species based on historical data.',
      },
      {
        question: 'What should I bring on a safari?',
        answer: 'Essential items include: comfortable clothing in neutral colors, sunscreen, hat, sunglasses, camera with zoom lens, binoculars (we provide these if needed), water bottle, and any personal medications. Avoid bright colors and strong perfumes.',
      },
      {
        question: 'Are safaris suitable for children?',
        answer: 'Yes! We offer family-friendly safaris specifically designed for children aged 5+. These tours are shorter, more interactive, and include child-friendly activities. Children under 12 receive a 50% discount.',
      },
      {
        question: 'How close do we get to the animals?',
        answer: 'We maintain safe, ethical distances as required by park regulations (typically 25-50 meters for most species). Our guides use radio networks to locate animals and position vehicles for optimal viewing while respecting wildlife.',
      },
      {
        question: 'What happens if the weather is bad?',
        answer: 'Safaris operate in most weather conditions (animals are often more active in light rain). If conditions are unsafe, we\'ll reschedule your tour or offer a full refund. Our vehicles have roof covers for rain protection.',
      },
    ],
  },
  {
    category: 'Safety & Health',
    questions: [
      {
        question: 'Is it safe?',
        answer: 'Absolutely. Safety is our top priority. All guides are certified professionals with extensive training. Vehicles undergo regular safety inspections. We maintain comprehensive insurance and follow strict safety protocols. No incidents in 20 years of operation.',
      },
      {
        question: 'Do I need vaccinations?',
        answer: 'Requirements vary by location. Generally recommended: Yellow Fever (may be required), Hepatitis A & B, Typhoid, and routine vaccinations. Consult your doctor or travel clinic at least 6 weeks before departure. Malaria prophylaxis may be recommended.',
      },
      {
        question: 'Are the vehicles safe and comfortable?',
        answer: 'Yes! We use custom-built 4x4 safari vehicles with reinforced frames, roll bars, and raised roofs for optimal viewing. Vehicles seat maximum 8 guests for comfort, include first aid kits, communication radios, and are serviced after every tour.',
      },
      {
        question: 'What if I have dietary restrictions?',
        answer: 'We accommodate all dietary requirements including vegetarian, vegan, gluten-free, halal, and kosher. Please inform us during booking so we can prepare appropriate meals and snacks.',
      },
      {
        question: 'Is medical assistance available?',
        answer: 'All guides are first-aid certified. Vehicles carry comprehensive medical kits. We maintain radio contact with local medical facilities. For serious emergencies, we have helicopter evacuation partnerships.',
      },
    ],
  },
  {
    category: 'Logistics',
    questions: [
      {
        question: 'Do you provide transportation to/from hotels?',
        answer: 'Yes! Hotel pickup and drop-off is included in all tours within a 30km radius of the park. For hotels outside this range, we can arrange transfers for an additional fee.',
      },
      {
        question: 'What time do tours start?',
        answer: 'Sunrise tours typically begin at 5:00-6:00 AM (optimal for wildlife viewing). Day tours start at 8:00-9:00 AM. Night safaris begin at sunset (6:00-7:00 PM depending on season). Exact pickup times provided after booking.',
      },
      {
        question: 'How many people per vehicle?',
        answer: 'Maximum 8 guests per vehicle to ensure everyone has a window seat and optimal viewing. Private tours are available for 1-4 guests who want exclusive use of a vehicle.',
      },
      {
        question: 'Can I bring my own food and drinks?',
        answer: 'You\'re welcome to bring snacks and non-alcoholic drinks (no glass bottles). All tours include bottled water. Full-day tours include meals. Alcohol is not permitted during safaris for safety reasons.',
      },
      {
        question: 'What language do guides speak?',
        answer: 'All guides are fluent in English. We also offer guides speaking Spanish, French, German, Mandarin, and Swahili upon request (select during booking or contact us in advance).',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-savanna-brown dark:text-savanna-sand mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-savanna-brown/80 dark:text-savanna-sand/80">
            Everything you need to know about booking and experiencing a safari
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqCategories.map((category, index) => (
            <div key={index}>
              <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-6">
                {category.category}
              </h2>
              <FAQAccordion items={category.questions} />
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-savanna-olive/10 rounded-2xl p-8 border border-savanna-olive/30 text-center">
          <MessageCircle className="w-12 h-12 text-savanna-olive mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-savanna-brown dark:text-savanna-sand mb-3">
            Still Have Questions?
          </h3>
          <p className="text-savanna-brown/70 dark:text-savanna-sand/70 mb-6">
            Our safari experts are here to help you plan the perfect adventure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-savanna-sunset hover:bg-savanna-sunset-dark text-white" asChild>
              <a href="/#contact">Contact Us</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="tel:+255123456789">Call: +255 123 456 789</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}