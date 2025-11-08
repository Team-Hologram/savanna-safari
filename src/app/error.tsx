'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <AlertTriangle className="w-16 h-16 text-savanna-sunset mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-savanna-brown dark:text-savanna-sand mb-4">
          Something Went Wrong
        </h1>
        <p className="text-lg text-savanna-brown/70 dark:text-savanna-sand/70 mb-8">
          We encountered an unexpected error. Our team has been notified.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            className="bg-savanna-sunset hover:bg-savanna-sunset-dark text-white"
          >
            Try Again
          </Button>
          <Button variant="outline" asChild>
            <a href="/">Go Home</a>
          </Button>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left bg-savanna-sand dark:bg-savanna-brown-light p-4 rounded-lg">
            <summary className="cursor-pointer font-semibold mb-2">
              Error Details (Dev Only)
            </summary>
            <pre className="text-xs overflow-auto">
              {error.message}
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}