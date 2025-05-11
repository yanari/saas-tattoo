import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface BookingState {
  serviceId?: string
  serviceName?: string
  servicePrice?: number
  studioSlug?: string
  studioName?: string
  selectedDay?: string // ISO Local
  startTime?: string // ISO Local
  endTime?: string // ISO Local
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
