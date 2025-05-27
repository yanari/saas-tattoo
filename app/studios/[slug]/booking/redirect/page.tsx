'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { useBookingStore } from '@/stores/booking-store'
import { createBooking } from '@/lib/actions/bookings/create-booking'
import { updateSlotAvailability } from '@/lib/actions/services/update-slot-availability'
import { Loader2 } from 'lucide-react'

export default function BookingRedirectPage() {
  const { data: session, status } = useSession()
  const { slug } = useParams() as { slug: string }
  const router = useRouter()
  const {
    serviceId,
    serviceName,
    servicePrice,
    studioSlug,
    studioName,
    selectedDay,
    startTime,
    endTime,
    clearBooking,
  } = useBookingStore()

  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    if (processing) return
    if (status !== 'authenticated') return
    if (!serviceId || !selectedDay || !startTime || !endTime) {
      toast.error('Dados do agendamento incompletos.')
      return
    }

    const create = async () => {
      setProcessing(true)
      try {
        await createBooking({
          tattooStudioServiceId: serviceId,
          userId: session.user.id,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
        })

        await updateSlotAvailability({
          serviceId,
          date: selectedDay.split('T')[0],
          startTime: startTime.split('T')[1]?.slice(0, 5) ?? '',
          isAvailable: false,
        })

        toast.success('Reserva criada com sucesso.')
        clearBooking()
        router.push(
          `/studios/${slug}/booking/confirmation?` +
            new URLSearchParams({
              serviceName: serviceName ?? '',
              servicePrice: String(servicePrice ?? ''),
              date: selectedDay,
              startTime: startTime,
              studioName: studioName ?? '',
            }).toString(),
        )
      } catch (err) {
        console.error(err)
        toast.error('Erro ao criar a reserva.')
      } finally {
        setProcessing(false)
      }
    }

    create()
  }, [
    status,
    serviceId,
    selectedDay,
    startTime,
    endTime,
    servicePrice,
    clearBooking,
    processing,
    router,
    serviceName,
    session?.user.id,
    studioSlug,
    studioName,
    slug,
  ])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <Loader2 className="text-primary mb-4 h-8 w-8 animate-spin" />
      <p className="text-muted-foreground text-sm">
        Finalizando agendamento...
      </p>
    </div>
  )
}
