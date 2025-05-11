import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { createBooking } from '@/lib/actions/bookings/create-booking'
import {
  getBookingCallbackUrl,
  isBookingIncomplete,
  type DurationTime,
} from '@/utils/booking'
import { parseAvailability } from '@/utils/availability'
import { TattooStudio, TattooStudioService } from '@prisma/client'
import { constructDateWithTime, isDateUnavailable } from '@/utils/date'
import { updateSlotAvailability } from '@/lib/actions/services/update-slot-availability'
import { useBookingStore } from '@/stores/booking-store'

interface UseStudioServiceBookingParams {
  service: Pick<TattooStudioService, 'id' | 'name' | 'price' | 'availability'>
  studio: Pick<TattooStudio, 'name' | 'slug'>
}

// TODO: hide date in calendar when slot is already booked
export function useStudioServiceBooking({
  service,
  studio,
}: UseStudioServiceBookingParams) {
  const { data: session } = useSession()
  const router = useRouter()
  const { setBookingData, clearBooking } = useBookingStore()

  const [selectedDay, setSelectedDay] = useState<Date>()
  const [selectedDuration, setSelectedDuration] = useState<DurationTime>()

  const availability = parseAvailability(service.availability)

  const disabledDays = isDateUnavailable(availability)

  const selectedKey = selectedDay?.toISOString().split('T')[0] ?? ''

  const slotsForSelectedDay = availability[selectedKey] || []

  const isDisabled = isBookingIncomplete(selectedDay, selectedDuration)

  const isUserLoggedIn = Boolean(session?.user?.id)

  const { confirmationUrl, redirectUrl } = getBookingCallbackUrl({
    serviceId: service.id,
    serviceName: service.name,
    servicePrice: service.price,
    studioSlug: studio.slug ?? '',
    studioName: studio.name,
    startTime: constructDateWithTime({
      day: selectedDay,
      time: selectedDuration?.startTime,
    }),
    endTime: constructDateWithTime({
      day: selectedDay,
      time: selectedDuration?.endTime,
    }),
  })

  async function handleCreateBooking() {
    if (!selectedDay || !selectedDuration) return

    // Salva os dados no Zustand de qualquer forma
    setBookingData({
      serviceId: service.id,
      serviceName: service.name,
      servicePrice: service.price,
      studioSlug: studio.slug ?? '',
      studioName: studio.name,
      selectedDay: selectedDay.toISOString(),
      startTime: selectedDuration.startTime.toISOString(),
      endTime: selectedDuration.endTime.toISOString(),
    })

    const isLoggedIn = Boolean(session?.user?.id)

    if (!isLoggedIn) {
      return
    }

    try {
      await createBooking({
        tattooStudioServiceId: service.id,
        startTime: selectedDuration.startTime,
        endTime: selectedDuration.endTime,
        userId: session?.user.id,
      })

      await updateSlotAvailability({
        serviceId: service.id,
        date: selectedDay.toISOString().split('T')[0],
        startTime: selectedDuration.startTime
          .toISOString()
          .split('T')[1]
          .slice(0, 5),
        isAvailable: false,
      })

      clearBooking()
      toast.success('Reserva criada com sucesso.')
      router.push(confirmationUrl)
    } catch (error) {
      toast.error('Não foi possível criar a reserva.')
      console.error(error)
    }
  }

  return {
    selectedDay,
    selectedDuration,
    disabledDays,
    slotsForSelectedDay,
    setSelectedDay,
    setSelectedDuration,
    isDisabled,
    handleCreateBooking,
    confirmationUrl,
    redirectUrl,
    isUserLoggedIn,
  }
}
