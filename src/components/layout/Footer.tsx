'use client'

import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

/**
 * Footer Component
 * Contains links, contact info, social media, and newsletter signup
 */

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-savanna-brown dark:bg-savanna-brown text-savanna-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-savanna-gold to-savanna-sunset rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold">Savanna Safari</span>
            </div>
            <p className="text-savanna-sand/80 text-sm mb-4">
              Experience the wild beauty of Africa with expertly guided safari tours. 
              Your adventure of a lifetime awaits.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-savanna-sand/10 hover:bg-savanna-gold flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-savanna-sand/10 hover:bg-savanna-gold flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-savanna-sand/10 hover:bg-savanna-gold flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-savanna-sand/80 hover:text-savanna-gold transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/rides" className="text-savanna-sand/80 hover:text-savanna-gold transition-colors text-sm">
                  Safari Rides
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-savanna-sand/80 hover:text-savanna-gold transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="text-savanna-sand/80 hover:text-savanna-gold transition-colors text-sm">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-savanna-sand/80 hover:text-savanna-gold transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Experiences */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Experiences</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/rides?category=sunrise" className="text-savanna-sand/80 hover:text-savanna-gold transition-colors text-sm">
                  Sunrise Game Drive
                </Link>
              </li>
              <li>
                <Link href="/rides?category=night" className="text-savanna-sand/80 hover:text-savanna-gold transition-colors text-sm">
                  Night Safari
                </Link>
              </li>
              <li>
                <Link href="/rides?category=private" className="text-savanna-sand/80 hover:text-savanna-gold transition-colors text-sm">
                  Private Safari
                </Link>
              </li>
              <li>
                <Link href="/rides?category=family" className="text-savanna-sand/80 hover:text-savanna-gold transition-colors text-sm">
                  Family Safari
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-savanna-sand/80">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Serengeti National Park<br />Tanzania, East Africa</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-savanna-sand/80">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+255123456789" className="hover:text-savanna-gold transition-colors">
                  +255 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-savanna-sand/80">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:info@savannasafari.com" className="hover:text-savanna-gold transition-colors">
                  info@savannasafari.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-savanna-sand/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-savanna-sand/60">
              © {currentYear} Savanna Safari. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-savanna-sand/60 hover:text-savanna-gold transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-savanna-sand/60 hover:text-savanna-gold transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-savanna-sand/60 hover:text-savanna-gold transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}