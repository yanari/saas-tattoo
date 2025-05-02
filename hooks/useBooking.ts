import { useState, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { createBooking } from '@/lib/actions/create-booking'
import {
  getBookingCallbackUrl,
  isBookingIncomplete,
  type DurationTime,
} from '@/utils/booking'
import { parseAvailability } from '@/utils/availability'
import { TattooStudio, TattooStudioService } from '@prisma/client'

interface UseBookingParams {
  service: Omit<TattooStudioService, 'price'> & { price: number }
  studio: Pick<TattooStudio, 'name' | 'slug'>
}

export function useBooking({ service, studio }: UseBookingParams) {
  const { data: session } = useSession()
  const router = useRouter()

  const [selectedDay, setSelectedDay] = useState<Date>()
  const [selectedDuration, setSelectedDuration] = useState<DurationTime>()

  const availability = parseAvailability(service.availability)

  const disabledDays = useMemo(() => {
    return Object.keys(availability).map((date) => new Date(date))
  }, [availability])

  const selectedKey = selectedDay?.toISOString().split('T')[0] ?? ''
  const slotsForSelectedDay = availability[selectedKey] || []

  const isDisabled = isBookingIncomplete(selectedDay, selectedDuration)

  const callbackUrl = getBookingCallbackUrl({
    serviceId: service.id,
    serviceName: service.name,
    servicePrice: service.price,
    studioSlug: studio.slug,
    studioName: studio.name,
    date: selectedDay,
    startTime: selectedDuration?.startTime,
    endTime: selectedDuration?.endTime,
  })

  async function handleCreateBooking() {
    if (!selectedDay || !selectedDuration || !session?.user?.id) return

    try {
      await createBooking({
        serviceId: service.id,
        date: selectedDay,
        startTime: selectedDuration.startTime,
        endTime: selectedDuration.endTime,
        userId: session.user.id,
      })

      router.push(callbackUrl)
      toast.success('Reserva criada com sucesso.')
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
    callbackUrl,
  }
}
