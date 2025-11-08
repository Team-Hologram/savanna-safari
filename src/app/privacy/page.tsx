import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Savanna Safari',
  description: 'How we collect, use, and protect your personal information',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-savanna-brown dark:text-savanna-sand mb-6">
          Privacy Policy
        </h1>
        <p className="text-sm text-savanna-brown/60 dark:text-savanna-sand/60 mb-12">
          Last updated: June 1, 2025
        </p>

        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
              Introduction
            </h2>
            <p className="text-savanna-brown/80 dark:text-savanna-sand/80 leading-relaxed">
              Savanna Safari ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you visit our website or book our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
              Information We Collect
            </h2>
            
            <h3 className="text-2xl font-semibold text-savanna-brown dark:text-savanna-sand mb-3 mt-6">
              Personal Information
            </h3>
            <p className="text-savanna-brown/80 dark:text-savanna-sand/80 mb-4">
              When you book a safari or contact us, we may collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-savanna-brown/80 dark:text-savanna-sand/80">
              <li>Name, email address, phone number</li>
              <li>Payment information (processed securely through Stripe)</li>
              <li>Passport details (for international bookings)</li>
              <li>Dietary requirements and health information (optional)</li>
              <li>Emergency contact information</li>
            </ul>

            <h3 className="text-2xl font-semibold text-savanna-brown dark:text-savanna-sand mb-3 mt-6">
              Automatically Collected Information
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-savanna-brown/80 dark:text-savanna-sand/80">
              <li>IP address and browser type</li>
              <li>Device information and operating system</li>
              <li>Pages visited and time spent on site</li>
              <li>Referring website</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-savanna-brown/80 dark:text-savanna-sand/80">
              <li>Process and fulfill safari bookings</li>
              <li>Send booking confirmations and updates</li>
              <li>Provide customer support</li>
              <li>Improve our services and website</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
              Data Sharing and Disclosure
            </h2>
            <p className="text-savanna-brown/80 dark:text-savanna-sand/80 mb-4">
              We do not sell your personal information. We may share your data with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-savanna-brown/80 dark:text-savanna-sand/80">
              <li><strong>Service Providers:</strong> Payment processors, email services, analytics platforms</li>
              <li><strong>Partners:</strong> Park authorities, accommodation providers (only necessary information)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
              Data Security
            </h2>
            <p className="text-savanna-brown/80 dark:text-savanna-sand/80">
              We implement industry-standard security measures including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-savanna-brown/80 dark:text-savanna-sand/80 mt-4">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure payment processing via PCI-compliant providers</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
              <li>Data backup and recovery procedures</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
              Your Rights
            </h2>
            <p className="text-savanna-brown/80 dark:text-savanna-sand/80 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-savanna-brown/80 dark:text-savanna-sand/80">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
              <li>Opt-out of marketing communications</li>
            </ul>
            <p className="text-savanna-brown/80 dark:text-savanna-sand/80 mt-4">
              To exercise these rights, contact us at privacy@savannasafari.com
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
              Cookies
            </h2>
            <p className="text-savanna-brown/80 dark:text-savanna-sand/80">
              We use cookies to enhance your experience. You can control cookies through your 
              browser settings. Types of cookies we use:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-savanna-brown/80 dark:text-savanna-sand/80 mt-4">
              <li><strong>Essential:</strong> Required for website functionality</li>
              <li><strong>Analytics:</strong> Help us understand how visitors use our site</li>
              <li><strong>Marketing:</strong> Track effectiveness of campaigns</li>
              <li><strong>Preferences:</strong> Remember your settings (theme, language)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
              Children's Privacy
            </h2>
            <p className="text-savanna-brown/80 dark:text-savanna-sand/80">
              Our services are not directed to children under 13. We do not knowingly collect 
              personal information from children. If you believe we have collected information 
              from a child, please contact us immediately.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
              International Data Transfers
            </h2>
            <p className="text-savanna-brown/80 dark:text-savanna-sand/80">
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place for such transfers in compliance with 
              applicable data protection laws.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
              Changes to This Policy
            </h2>
            <p className="text-savanna-brown/80 dark:text-savanna-sand/80">
              We may update this Privacy Policy periodically. We will notify you of significant 
              changes via email or website notice. Continued use of our services after changes 
              constitutes acceptance.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
              Contact Us
            </h2>
            <p className="text-savanna-brown/80 dark:text-savanna-sand/80">
              For questions about this Privacy Policy or to exercise your rights:
            </p>
            <div className="mt-4 p-6 bg-savanna-sand/50 dark:bg-savanna-brown-light/50 rounded-xl">
              <p className="font-semibold mb-2">Savanna Safari Privacy Team</p>
              <p>Email: privacy@savannasafari.com</p>
              <p>Phone: +255 123 456 789</p>
              <p>Address: Serengeti National Park, Tanzania</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}