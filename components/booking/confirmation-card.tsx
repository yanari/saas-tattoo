import { format } from 'date-fns'
import { Card, CardContent } from '../ui/card'
import { ptBR } from 'date-fns/locale'

interface ConfirmationCardProps {
  serviceName: string
  servicePrice: string
  date: string | null
  startTime: string | null
  studioName: string
}

export function ConfirmationCard({
  serviceName,
  servicePrice,
  date,
  startTime,
  studioName,
}: ConfirmationCardProps) {
  return (
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
  )
}
