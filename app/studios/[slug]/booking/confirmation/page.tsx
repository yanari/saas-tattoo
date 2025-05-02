'use client'

import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { ConfirmationCard } from '@/components/booking/confirmation-card'

// TODO: query booking by id instead of receiving params
export default function StudiosBookingConfirmationPage() {
  const params = useSearchParams()

  const serviceName = params.get('serviceName') ?? ''
  const servicePrice = params.get('servicePrice') ?? ''
  const date = params.get('date')
  const startTime = params.get('startTime')
  const studioName = params.get('studioName') ?? ''

  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center px-4 text-center">
      <CheckCircle className="mb-4 h-16 w-16 text-green-600" />
      <h1 className="mb-2 text-2xl font-semibold">Agendamento confirmado</h1>

      <p className="text-muted-foreground mb-6">
        Seu agendamento foi confirmado com sucesso. Confira os detalhes abaixo.
      </p>

      <ConfirmationCard
        className="mb-8 w-full px-5 sm:w-xl"
        serviceName={serviceName}
        servicePrice={servicePrice}
        dateInISOString={date}
        startTimeInISOString={startTime}
        studioName={studioName}
      />

      <Link
        href="/"
        className="bg-primary hover:bg-primary/90 inline-block rounded-lg px-6 py-2 text-white transition-colors"
      >
        Voltar para o início
      </Link>
    </div>
  )
}
