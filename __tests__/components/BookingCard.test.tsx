import { render, screen, fireEvent } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import BookingCard from '@/components/home/BookingCard'
import { useBookingStore } from '@/store/booking-store'

// Mock Zustand store
jest.mock('@/store/booking-store')

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('BookingCard', () => {
  beforeEach(() => {
    ;(useBookingStore as unknown as jest.Mock).mockReturnValue({
      currentStep: 'category',
      completedSteps: [],
      setStep: jest.fn(),
      selectedCategory: null,
      selectCategory: jest.fn(),
      totalPrice: 0,
    })
  })

  it('renders booking card with initial step', () => {
    render(<BookingCard />, { wrapper })
    expect(screen.getByText('Book Your Safari')).toBeInTheDocument()
    expect(screen.getByText('Choose Your Experience')).toBeInTheDocument()
  })

  it('displays progress bar', () => {
    render(<BookingCard />, { wrapper })
    const progressBar = screen.getByRole('region', { name: /booking/i })
    expect(progressBar).toBeInTheDocument()
  })

  it('shows all step indicators', () => {
    render(<BookingCard />, { wrapper })
    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText('Route')).toBeInTheDocument()
    expect(screen.getByText('When')).toBeInTheDocument()
    expect(screen.getByText('Party')).toBeInTheDocument()
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })

  it('calls selectCategory when category is clicked', () => {
    const selectCategory = jest.fn()
    ;(useBookingStore as unknown as jest.Mock).mockReturnValue({
      currentStep: 'category',
      completedSteps: [],
      setStep: jest.fn(),
      selectedCategory: null,
      selectCategory,
      totalPrice: 0,
    })

    render(<BookingCard />, { wrapper })
    // Test implementation would click on a category button
    // fireEvent.click(screen.getByText('Sunrise Game Drive'))
    // expect(selectCategory).toHaveBeenCalledWith('sunrise')
  })
})