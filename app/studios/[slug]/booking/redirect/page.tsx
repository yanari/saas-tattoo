'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useRef } from 'react'
import { useSearchParams, useRouter, useParams } from 'next/navigation'
import { toast } from 'sonner'
import { createBooking } from '@/lib/actions/create-booking'
import { Loader2 } from 'lucide-react'

export default function StudiosBookingRedirectPage() {
  const { status, data: session } = useSession()
  const params = useSearchParams()
  const { slug } = useParams() as { slug: string }
  const router = useRouter()
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    if (status !== 'authenticated') return

    const serviceId = params.get('serviceId')
    const date = params.get('date')
    const startTime = params.get('startTime')
    const endTime = params.get('endTime')
    const userId = session?.user?.id

    if (serviceId && date && startTime && endTime && userId) {
      hasRun.current = true

      createBooking({
        serviceId,
        date: new Date(date),
        startTime,
        endTime,
        userId,
      })
        .then(() => {
          toast.success('Reserva criada com sucesso.')
          router.push(
            `/studios/${slug}/booking/confirmation?${params.toString()}`,
          )
        })
        .catch(() => {
          toast.error('Erro ao criar a reserva.')
        })
    }
  }, [status, session, params, router, slug])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <Loader2 className="text-primary mb-4 h-8 w-8 animate-spin" />
      <p className="text-muted-foreground text-sm">
        Finalizando agendamento...
      </p>
    </div>
  )
}
