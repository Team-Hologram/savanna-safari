import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-geist-sans' })

export const metadata: Metadata = {
  title: 'Savanna Safari – Unforgettable Wildlife Adventures',
  description: 'Experience the wild beauty of Africa with expertly guided safari tours. Book sunrise game drives, night safaris, and private expeditions.',
  keywords: 'safari, wildlife, Africa, game drive, safari booking, Big Five',
  authors: [{ name: 'Savanna Safari' }],
  openGraph: {
    title: 'Savanna Safari – Unforgettable Wildlife Adventures',
    description: 'Book your dream safari experience',
    type: 'website',
    locale: 'en_US',
    siteName: 'Savanna Safari',
  },
}

// Separate viewport export (Next.js 14 requirement)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F6E9D7' },
    { media: '(prefers-color-scheme: dark)', color: '#5C3A2E' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-savanna-sand dark:bg-savanna-brown text-savanna-brown dark:text-savanna-sand`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}