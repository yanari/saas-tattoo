'use client'

import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { format } from 'date-fns'
import { Card, CardContent } from '@/components/ui/card'
import { useSearchParams } from 'next/navigation'
import { ptBR } from 'date-fns/locale'

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

      <Card className="mb-8 w-full px-5">
        <CardContent className="grid gap-2 p-0">
          <div className="flex items-center justify-between">
            <h2 className="truncate text-sm font-bold">{serviceName}</h2>
            <p className="text-sm font-bold">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(Number(servicePrice))}
            </p>
          </div>

          {date && (
            <div className="flex items-center justify-between">
              <h2 className="text-sm text-gray-400">Data</h2>
              <p className="text-sm">
                {format(new Date(date), "d 'de' MMMM", { locale: ptBR })}
              </p>
            </div>
          )}

          {startTime && (
            <div className="flex items-center justify-between">
              <h2 className="text-sm text-gray-400">Horário</h2>
              <p className="text-sm">
                {format(new Date(startTime), 'HH:mm', { locale: ptBR })}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <h2 className="text-sm text-gray-400">Estúdio</h2>
            <p className="text-sm">{studioName}</p>
          </div>
        </CardContent>
      </Card>

      <Link
        href="/"
        className="bg-primary hover:bg-primary/90 inline-block rounded-lg px-6 py-2 text-white transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}
