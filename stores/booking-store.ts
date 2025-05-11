import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface BookingState {
  serviceId?: string
  serviceName?: string
  servicePrice?: number
  studioSlug?: string
  studioName?: string
  selectedDay?: string // ISO string
  startTime?: string // ISO string
  endTime?: string // ISO string
  setBookingData: (data: Partial<BookingState>) => void
  clearBooking: () => void
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      setBookingData: (data) => set(data),
      clearBooking: () => set({}),
    }),
    {
      name: 'pending-booking',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
