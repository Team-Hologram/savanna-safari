'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import useScrollDirection from '@/hooks/useScrollDirection'

/**
 * Floating Header Component
 * - Auto-hide on scroll down, reveal on scroll up (GSAP)
 * - Glass morphism design with shadow
 * - Responsive mobile menu
 * - Theme toggle
 * - Accessibility: keyboard nav, ARIA labels
 */

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Rides', href: '/rides' },
  { name: 'How it Works', href: '/#about' },
  { name: 'Testimonials', href: '/#testimonials' },
  { name: 'Contact', href: '/#contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const scrollDirection = useScrollDirection()

  // Handle scroll visibility with GSAP
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animate header appearance based on scroll direction
  useEffect(() => {
    if (!headerRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // No animation for reduced motion preference
      headerRef.current.style.transform = 'translateY(0)'
      return
    }

    if (scrollDirection === 'down' && scrolled) {
      gsap.to(headerRef.current, {
        y: -100,
        duration: 0.3,
        ease: 'power2.inOut',
      })
    } else {
      gsap.to(headerRef.current, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }, [scrollDirection, scrolled])

  return (
    <header
      ref={headerRef}
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-savanna-brown/80 backdrop-blur-lg shadow-float'
          : 'bg-white/60 dark:bg-savanna-brown/60 backdrop-blur-md'
      } rounded-2xl border border-savanna-gold/20`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
            <span className="sr-only">Savanna Safari</span>
            <div className="w-10 h-10 bg-gradient-to-br from-savanna-gold to-savanna-sunset rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-savanna-brown dark:text-savanna-sand">
              Savanna Safari
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold transition-colors relative group ${
                pathname === item.href
                  ? 'text-savanna-sunset'
                  : 'text-savanna-brown dark:text-savanna-sand hover:text-savanna-gold'
              }`}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-savanna-sunset transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Desktop CTA + Theme */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4 items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button asChild className="bg-savanna-sunset hover:bg-savanna-sunset-dark text-white">
            <Link href="/#booking">Book Safari</Link>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-savanna-gold/20">
          <div className="space-y-1 px-4 pb-4 pt-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-lg px-3 py-2 text-base font-semibold ${
                  pathname === item.href
                    ? 'bg-savanna-sunset text-white'
                    : 'text-savanna-brown dark:text-savanna-sand hover:bg-savanna-gold/20'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild className="w-full mt-4 bg-savanna-sunset hover:bg-savanna-sunset-dark text-white">
              <Link href="/#booking" onClick={() => setMobileMenuOpen(false)}>
                Book Safari
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}