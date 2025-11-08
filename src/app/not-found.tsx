import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="text-9xl font-bold text-savanna-gold mb-4">404</div>
        <h1 className="text-4xl md:text-5xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-savanna-brown/70 dark:text-savanna-sand/70 mb-8">
          Looks like this path doesn't lead to any safari adventures. 
          Let's get you back on track!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-savanna-sunset hover:bg-savanna-sunset-dark text-white">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/rides">
              <Search className="w-4 h-4 mr-2" />
              Browse Safaris
            </Link>
          </Button>
        </div>

        {/* Decorative element */}
        <div className="mt-12 text-8xl opacity-20">🦁</div>
      </div>
    </div>
  )
}