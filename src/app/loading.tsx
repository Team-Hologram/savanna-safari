export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-savanna-gold/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-savanna-sunset border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-lg text-savanna-brown/70 dark:text-savanna-sand/70">
          Loading your adventure...
        </p>
      </div>
    </div>
  )
}